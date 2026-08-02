/* ============================================================
   AURA Depth-360 Viewer
   Pure vanilla JS — turns a flat image + optional depth map
   into a pseudo-3D parallax viewer (no external libraries).
   - Without depth: simple horizontal pan (drag/scroll)
   - With depth:   true 3D parallax using depth as offset
   ============================================================ */
(function(){
  'use strict';

  const AURA = window.AURA || {};
  AURA.Depth360 = {
    /* Mount a viewer into a container element.
       opts = {
         img:    'path/to/image.jpg'   (required)
         depth:  'path/to/depth.jpg'   (optional — grayscale)
         title:  'Room name'           (optional)
         height: '60vh'                (optional, default 60vh)
         onHotspot: (id) => {...}      (optional — hotspot click)
         hotspots: [{x:0.5, y:0.5, id:'door', label:'Door'}]  (optional)
       } */
    mount(container, opts){
      if(!container) return null;
      opts = opts || {};
      const o = Object.assign({
        img:'',
        depth:'',
        title:'',
        height:'60vh',
        hotspots:[]
      }, opts);

      // Build DOM
      container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'depth360-wrap';
      wrap.style.cssText = 'position:relative;width:100%;height:'+o.height+';overflow:hidden;border-radius:14px;background:#000;cursor:grab;user-select:none;touch-action:none';

      const loader = document.createElement('div');
      loader.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;background:#1A1A1C;z-index:5';
      loader.innerHTML = '<div style="text-align:center"><div style="font-size:32px;margin-bottom:8px">⟲</div>Loading 360°...</div>';

      const main = new Image();
      main.crossOrigin='anonymous';
      main.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;will-change:transform;transform-origin:center center;pointer-events:none';
      main.draggable = false;

      const depth = new Image();
      depth.crossOrigin='anonymous';
      depth.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none';
      depth.draggable = false;

      const title = document.createElement('div');
      title.style.cssText = 'position:absolute;top:14px;left:14px;z-index:4;background:rgba(0,0,0,.6);color:#fff;padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;backdrop-filter:blur(8px)';
      title.textContent = o.title||'';

      const hint = document.createElement('div');
      hint.style.cssText = 'position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:4;background:rgba(0,0,0,.55);color:#fff;padding:7px 16px;border-radius:100px;font-size:11.5px;font-weight:500;backdrop-filter:blur(8px);pointer-events:none';
      hint.textContent = o.depth ? 'اسحب للنظر حولك (3D) · Drag to look around' : 'اسحب للنظر حولك · Drag to look around';

      const hotspotLayer = document.createElement('div');
      hotspotLayer.style.cssText = 'position:absolute;inset:0;z-index:3;pointer-events:none';

      wrap.appendChild(loader);
      wrap.appendChild(main);
      if(o.depth) wrap.appendChild(depth);
      wrap.appendChild(title);
      wrap.appendChild(hint);
      wrap.appendChild(hotspotLayer);
      container.appendChild(wrap);

      // Loading state
      let loaded = false;
      let depthLoaded = !!o.depth;
      function ready(){
        if(loaded && (depthLoaded || !o.depth)){
          loader.style.opacity='0';
          loader.style.transition='opacity .4s';
          setTimeout(()=>loader.remove(),400);
          renderHotspots();
        }
      }
      main.onload = ()=>{ loaded=true; ready(); };
      main.onerror = ()=>{ loader.innerHTML='<div style="color:#ff6b6b;text-align:center;padding:20px">⚠ Failed to load image</div>'; };
      depth.onload = ()=>{ depthLoaded=true; ready(); };
      depth.onerror = ()=>{ depthLoaded=true; ready(); };
      if(o.img) main.src = o.img; else { loader.innerHTML='<div style="color:#aaa">No image URL</div>'; return wrap; }
      if(o.depth) depth.src = o.depth;

      // Pan state
      let tx=0, ty=0;        // translation
      let rot=0, tilt=0;     // rotation
      let scale = 1;          // depth-based scale
      let dragging = false;
      let lastX=0, lastY=0;
      let pointerX=0, pointerY=0;   // mouse / touch for auto-parallax

      function applyTransform(){
        // parallax translation
        const px = (tx)*0.5;
        const py = (ty)*0.5;
        main.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${1+Math.abs(rot)*0.1})`;
        if(o.depth){
          // depth map drives true 3D parallax: shift the depth layer opposite direction
          const dpx = -px*0.7;
          const dpy = -py*0.7;
          depth.style.opacity = '0.55';
          depth.style.mixBlendMode = 'multiply';
          depth.style.transform = `translate3d(${dpx}px, ${dpy}px, 0) scale(${1+Math.abs(rot)*0.05})`;
        }
        updateHotspotPositions();
      }

      function onDown(e){
        dragging = true;
        wrap.style.cursor = 'grabbing';
        const p = (e.touches && e.touches[0]) || e;
        lastX = p.clientX; lastY = p.clientY;
        if(e.cancelable) e.preventDefault();
      }
      function onMove(e){
        const p = (e.touches && e.touches[0]) || e;
        pointerX = p.clientX; pointerY = p.clientY;
        if(!dragging) return;
        const dx = p.clientX - lastX;
        const dy = p.clientY - lastY;
        lastX = p.clientX; lastY = p.clientY;
        // horizontal pan
        tx = Math.max(-120, Math.min(120, tx + dx*0.6));
        ty = Math.max(-80, Math.min(80, ty + dy*0.6));
        rot = dx*0.01;
        applyTransform();
      }
      function onUp(){
        dragging = false;
        wrap.style.cursor = 'grab';
        // gentle return to center
        animateReturn();
      }
      function animateReturn(){
        const startTx=tx, startTy=ty;
        const startT = performance.now();
        const dur = 600;
        function tick(t){
          const p = Math.min(1, (t-startT)/dur);
          const ease = 1 - Math.pow(1-p, 3);
          tx = startTx * (1-ease);
          ty = startTy * (1-ease);
          rot = rot * (1-ease);
          applyTransform();
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }

      // Mouse / touch events
      wrap.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      wrap.addEventListener('touchstart', onDown, {passive:false});
      wrap.addEventListener('touchmove', onMove, {passive:false});
      wrap.addEventListener('touchend', onUp);

      // Auto-parallax (subtle) on mouse move without drag
      wrap.addEventListener('mousemove', e=>{
        if(dragging) return;
        const r = wrap.getBoundingClientRect();
        const cx = (e.clientX - r.left)/r.width - 0.5;
        const cy = (e.clientY - r.top)/r.height - 0.5;
        tx = cx*40; ty = cy*30;
        applyTransform();
      });

      // Hotspots
      function renderHotspots(){
        if(!o.hotspots || !o.hotspots.length) return;
        hotspotLayer.innerHTML = '';
        o.hotspots.forEach(h=>{
          const dot = document.createElement('div');
          dot.className = 'depth360-hotspot';
          dot.style.cssText = 'position:absolute;left:'+((h.x*100).toFixed(1))+'%;top:'+((h.y*100).toFixed(1))+'%;transform:translate(-50%,-50%);width:34px;height:34px;border-radius:50%;background:rgba(191,167,106,.85);border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;cursor:pointer;pointer-events:auto;box-shadow:0 4px 14px rgba(0,0,0,.4);transition:transform .2s;z-index:4';
          dot.textContent = h.icon || '◉';
          dot.title = h.label || h.id || '';
          dot.onmouseover = ()=>{ dot.style.transform = 'translate(-50%,-50%) scale(1.2)'; };
          dot.onmouseout  = ()=>{ dot.style.transform = 'translate(-50%,-50%) scale(1)'; };
          dot.onclick = (e)=>{ e.stopPropagation(); if(typeof o.onHotspot==='function') o.onHotspot(h); };
          hotspotLayer.appendChild(dot);
        });
      }
      function updateHotspotPositions(){
        // shift hotspots the opposite direction of pan to feel anchored
        const dx = (tx)*0.5;
        const dy = (ty)*0.5;
        hotspotLayer.querySelectorAll('.depth360-hotspot').forEach((dot,i)=>{
          const h = o.hotspots[i];
          if(!h) return;
          // anchor them to a moving offset based on panning
          dot.style.marginLeft = (-dx*0.4)+'px';
          dot.style.marginTop  = (-dy*0.4)+'px';
        });
      }

      return {
        element: wrap,
        destroy(){ wrap.remove(); },
        go(hotspotId){
          if(typeof o.onHotspot==='function') o.onHotspot({id:hotspotId});
        }
      };
    }
  };
})();
