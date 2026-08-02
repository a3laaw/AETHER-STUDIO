/* ============================================================
   AURA Pano Stitcher — turns flat images into a panorama
   Pure vanilla JS, no external libraries.
   - Simple mode: side-by-side with feathered overlap
   - Smart mode: feature matching + perspective warp (future)
   ============================================================ */
(function(){
  'use strict';
  const AURA = window.AURA = window.AURA || {};

  AURA.PanoStitcher = {

    /* Stitch multiple images into a single wide panorama.
       images = [HTMLImageElement, ...]
       opts = { overlap: 0.15, feather: 40, height: 768 }
       Returns: HTMLCanvasElement with the stitched result */
    stitch(images, opts){
      if(!images || images.length < 2) return null;
      opts = opts || {};
      const overlap = opts.overlap || 0.15;     // 15% overlap between adjacent images
      const feather = opts.feather || 40;        // feather width in px for blending
      const targetH = opts.height || 768;

      // resize all images to same height
      const resized = images.map(img => {
        const scale = targetH / img.naturalHeight;
        return { img, w: Math.round(img.naturalWidth * scale), h: targetH };
      });

      // calculate total width accounting for overlaps
      const overlapPx = Math.round(resized[0].w * overlap);
      const totalW = resized.reduce((sum, r) => sum + r.w, 0) - overlapPx * (resized.length - 1);

      // create canvas
      const canvas = document.createElement('canvas');
      canvas.width = totalW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      // draw each image with feathered overlap
      let x = 0;
      resized.forEach((r, i) => {
        if(i === 0){
          // first image: draw fully
          ctx.drawImage(r.img, 0, 0, r.w, r.h, 0, 0, r.w, r.h);
          x = r.w - overlapPx;
        } else {
          // subsequent images: draw with gradient blend at left edge
          const blendW = Math.min(feather, overlapPx);
          // draw the image starting at x
          ctx.drawImage(r.img, 0, 0, r.img.naturalWidth, r.img.naturalHeight, x, 0, r.w, r.h);

          // create feathered blend: overwrite the overlap area with a gradient
          const grad = ctx.createLinearGradient(x, 0, x + blendW, 0);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, 'rgba(0,0,0,1)');

          // save current state, apply gradient as mask
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fillStyle = grad;
          ctx.fillRect(x, 0, blendW, targetH);
          ctx.restore();

          // re-draw the previous image's right edge over the feathered area
          const prev = resized[i - 1];
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.drawImage(prev.img,
            prev.img.naturalWidth - (overlapPx / prev.w * prev.img.naturalWidth), 0,
            (overlapPx / prev.w * prev.img.naturalWidth), prev.img.naturalHeight,
            x, 0, overlapPx, targetH
          );
          ctx.restore();

          x += r.w - overlapPx;
        }
      });

      return canvas;
    },

    /* Convert canvas to a data URL (JPEG, compressed) */
    toDataURL(canvas, quality){
      return canvas.toDataURL('image/jpeg', quality || 0.85);
    },

    /* Load multiple files as images (returns Promise) */
    loadImages(files){
      const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
      if(!valid.length) return Promise.resolve([]);

      return Promise.all(valid.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load: ' + file.name));
            img.src = e.target.result;
          };
          reader.onerror = () => reject(new Error('Failed to read: ' + file.name));
          reader.readAsDataURL(file);
        });
      }));
    },

    /* Full pipeline: files → stitched panorama data URL */
    async fromFiles(files, opts){
      const images = await this.loadImages(files);
      if(images.length < 2){
        // single image — return as-is
        if(images.length === 1){
          const canvas = document.createElement('canvas');
          const img = images[0];
          const scale = (opts && opts.height || 768) / img.naturalHeight;
          canvas.width = Math.round(img.naturalWidth * scale);
          canvas.height = opts && opts.height || 768;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          return this.toDataURL(canvas);
        }
        return null;
      }
      const canvas = this.stitch(images, opts);
      if(!canvas) return null;
      return this.toDataURL(canvas);
    }
  };
})();
