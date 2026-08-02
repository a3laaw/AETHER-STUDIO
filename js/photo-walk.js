/* ============================================================
   AURA Photo Walk — first-person walkthrough from flat images
   Pure vanilla JS, no external libraries.
   - Each scene = a flat image
   - Mouse move → pan + zoom (Ken Burns)
   - Reach edge → crossfade to next/prev scene
   - Optional hotspots for jumping between scenes
   ============================================================ */
(function(){
  'use strict';
  const AURA = window.AURA = window.AURA || {};

  AURA.PhotoWalk = {

    /* Mount a photo-walk viewer.
       opts = {
         scenes: [{ id, img, title, titleAr }],
         onClose: () => {...}
       }
       Returns { go(id), next(), prev(), close() } */
    mount(container, opts){
      if(!container) return null;
      opts = opts || {};
      const scenes = opts.scenes || [];
      if(!scenes.length){ container.innerHTML = '<div style="padding:40px;text-align:center;color:#888">No scenes</div>'; return null; }

      let currentIdx = 0;
      let mouseX = 0.5, mouseY = 0.5;  // normalized 0-1
      let targetTx = 0, targetTy = 0;   // target translate
      let tx = 0, ty = 0;               // current translate
      let scale = 1;
      let targetScale = 1;
      let transitioning = false;

      // Build DOM
      container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;width:100%;height:'+(opts.height||'70vh')+';overflow:hidden;border-radius:14px;background:#000;cursor:crosshair;user-select:none;touch-action:none';

      const imgEl = document.createElement('img');
      imgEl.style.cssText = 'position:absolute;inset:0;width:120%;height:120%;object-fit:cover;will-change:transform;transition:opacity .6s ease;pointer-events:none';
      imgEl.draggable = false;

      const imgEl2 = document.createElement('img');  // for crossfade
      imgEl2.style.cssText = 'position:absolute;inset:0;width:120%;height:120%;object-fit:cover;will-change:transform;opacity:0;transition:opacity .6s ease;pointer-events:none';
      imgEl2.draggable = false;

      const titleEl = document.createElement('div');
      titleEl.style.cssText = 'position:absolute;top:14px;left:14px;z-index:4;background:rgba(0,0,0,.6);color:#fff;padding:8px 16px;border-radius:100px;font-size:13px;font-weight:600;backdrop-filter:blur(8px)';

      const navEl = document.createElement('div');
      navEl.style.cssText = 'position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:4;display:flex;gap:8px;align-items:center;background:rgba(0,0,0,.5);padding:8px 14px;border-radius:100px;backdrop-filter:blur(8px)';

      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '◀';
      prevBtn.style.cssText = 'background:rgba(255,255,255,.2);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;transition:.2s';
      prevBtn.onmouseover = () => prevBtn.style.background = 'rgba(255,255,255,.4)';
      prevBtn.onmouseout = () => prevBtn.style.background = 'rgba(255,255,255,.2)';

      const counter = document.createElement('span');
      counter.style.cssText = 'color:#fff;font-size:12px;font-weight:600;min-width:50px;text-align:center';

      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '▶';
      nextBtn.style.cssText = 'background:rgba(255,255,255,.2);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;transition:.2s';
      nextBtn.onmouseover = () => nextBtn.style.background = 'rgba(255,255,255,.4)';
      nextBtn.onmouseout = () => nextBtn.style.background = 'rgba(255,255,255,.2)';

      const hintEl = document.createElement('div');
      hintEl.style.cssText = 'position:absolute;top:14px;right:14px;z-index:4;background:rgba(0,0,0,.5);color:#fff;padding:6px 14px;border-radius:100px;font-size:10px;font-weight:500;backdrop-filter:blur(8px);pointer-events:none';

      const dotsEl = document.createElement('div');
      dotsEl.style.cssText = 'position:absolute;bottom:60px;left:50%;transform:translateX(-50%);z-index:4;display:flex;gap:6px';

      navEl.appendChild(prevBtn);
      navEl.appendChild(counter);
      navEl.appendChild(nextBtn);

      wrap.appendChild(imgEl2);
      wrap.appendChild(imgEl);
      wrap.appendChild(titleEl);
      wrap.appendChild(hintEl);
      wrap.appendChild(dotsEl);
      wrap.appendChild(navEl);
      container.appendChild(wrap);

      const isAr = (typeof AURA_I18N !== 'undefined' && AURA_I18N.lang === 'ar');

      // Build dots
      function buildDots(){
        dotsEl.innerHTML = '';
        scenes.forEach((s, i) => {
          const dot = document.createElement('div');
          dot.style.cssText = 'width:'+(i===currentIdx?'20px':'8px')+';height:8px;border-radius:4px;background:'+(i===currentIdx?'#BFA76A':'rgba(255,255,255,.4)')+';cursor:pointer;transition:.3s';
          dot.onclick = () => goTo(i);
          dotsEl.appendChild(dot);
        });
      }

      function updateUI(){
        const s = scenes[currentIdx];
        if(!s) return;
        titleEl.textContent = isAr ? (s.titleAr || s.title || ('مشهد '+(currentIdx+1))) : (s.title || ('Scene '+(currentIdx+1)));
        counter.textContent = (currentIdx+1) + ' / ' + scenes.length;
        hintEl.textContent = isAr ? 'حرّك الماوس للاستكشاف · حافة الشاشة للانتقال' : 'Move mouse to explore · edge to advance';
        buildDots();
      }

      function loadScene(idx, direction){
        if(idx < 0) idx = scenes.length - 1;
        if(idx >= scenes.length) idx = 0;
        if(idx === currentIdx && !transitioning) return;

        transitioning = true;
        const s = scenes[idx];
        const newImg = s.img || '';

        // crossfade: load into imgEl2, then swap
        imgEl2.src = newImg;
        imgEl2.onload = () => {
          imgEl2.style.opacity = '1';
          setTimeout(() => {
            imgEl.src = newImg;
            imgEl.style.opacity = '1';
            imgEl2.style.opacity = '0';
            currentIdx = idx;
            updateUI();
            transitioning = false;
          }, 600);
        };
        imgEl2.onerror = () => {
          transitioning = false;
          toast(isAr ? 'فشل تحميل الصورة' : 'Failed to load image');
        };
      }

      function goTo(idx){ if(!transitioning) loadScene(idx, 'jump'); }
      function next(){ if(!transitioning) loadScene(currentIdx + 1, 'next'); }
      function prev(){ if(!transitioning) loadScene(currentIdx - 1, 'prev'); }

      prevBtn.onclick = (e) => { e.stopPropagation(); prev(); };
      nextBtn.onclick = (e) => { e.stopPropagation(); next(); };

      // Mouse interaction: pan + zoom + edge detection
      wrap.addEventListener('mousemove', e => {
        const r = wrap.getBoundingClientRect();
        mouseX = (e.clientX - r.left) / r.width;
        mouseY = (e.clientY - r.top) / r.height;

        // pan offset (max ±8% of width)
        targetTx = (mouseX - 0.5) * -80;
        targetTy = (mouseY - 0.5) * -50;

        // zoom: center = 1.0, edges = 1.15
        const distFromCenter = Math.abs(mouseX - 0.5);
        targetScale = 1.0 + distFromCenter * 0.3;

        // edge detection → advance
        if(!transitioning){
          if(mouseX > 0.92){
            next();
          } else if(mouseX < 0.08){
            prev();
          }
        }
      });

      // Touch support
      let touchStartX = 0;
      wrap.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, {passive:true});
      wrap.addEventListener('touchmove', e => {
        const r = wrap.getBoundingClientRect();
        mouseX = (e.touches[0].clientX - r.left) / r.width;
        mouseY = (e.touches[0].clientY - r.top) / r.height;
        targetTx = (mouseX - 0.5) * -80;
        targetTy = (mouseY - 0.5) * -50;
        targetScale = 1.0 + Math.abs(mouseX - 0.5) * 0.3;
      }, {passive:true});
      wrap.addEventListener('touchend', e => {
        const dx = (e.changedTouches[0].clientX - touchStartX);
        if(Math.abs(dx) > 60){
          if(dx < 0) next(); else prev();
        }
      });

      // Animation loop: smooth pan + zoom (lerp)
      function animate(){
        tx += (targetTx - tx) * 0.08;
        ty += (targetTy - ty) * 0.08;
        scale += (targetScale - scale) * 0.06;
        imgEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        imgEl2.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        requestAnimationFrame(animate);
      }
      animate();

      // Keyboard
      function onKey(e){
        if(e.key === 'ArrowRight') next();
        else if(e.key === 'ArrowLeft') prev();
        else if(e.key === 'Escape' && typeof opts.onClose === 'function') opts.onClose();
      }
      addEventListener('keydown', onKey);

      // Init
      const initScene = scenes[0];
      if(initScene){
        imgEl.src = initScene.img || '';
        imgEl.onload = () => { updateUI(); };
      }

      return {
        go: goTo,
        next,
        prev,
        close(){
          removeEventListener('keydown', onKey);
          wrap.remove();
        },
        get currentId(){ return scenes[currentIdx]?.id; }
      };
    }
  };
})();
