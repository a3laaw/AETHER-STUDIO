/* ============================================================
   AURA Walk3D — first-person 3D walkthrough
   Each scene = a panorama image with hotspots that jump to
   other scenes. Camera pans with the mouse, hotspots show
   the connected destination (room / stairs / elevator).
   Reuses AURA.Depth360 for panorama rendering + parallax,
   and overlays interactive hotspots for navigation.
   ============================================================ */
(function(){
  'use strict';
  const AURA = window.AURA = window.AURA || {};

  AURA.Walk3D = {
    /* Mount a walkthrough player.
       opts = {
         scenes: [
           { id:'living', title:'Living Room', titleAr:'غرفة المعيشة',
             img:'pano.jpg', depth:'', hotspots:[{x:.5,y:.5,id:'kitchen',icon:'◉'}] },
           ...
         ]
         onClose: () => {...}   // optional, called when user exits
       }
       Returns an object with: { go(id), close(), currentId }
    */
    mount(container, opts){
      if(!container) return null;
      opts = opts || {};
      const o = Object.assign({
        scenes: [],
        startId: '',
        onClose: null
      }, opts);
      if(!o.scenes.length){ container.innerHTML='<div style="padding:40px;text-align:center;color:#999">No scenes configured</div>'; return null; }
      if(!o.startId) o.startId = o.scenes[0].id;

      const state = {
        currentId: o.startId,
        history: [],  /* back-stack of visited scenes for the "back" button */
        viewer: null
      };

      // Top toolbar (title + back + close)
      const top = document.createElement('div');
      top.style.cssText = 'position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;gap:8px;padding:14px 18px;background:linear-gradient(180deg,rgba(0,0,0,.65) 0%,transparent 100%)';

      const backBtn = document.createElement('button');
      backBtn.className = 'w3d-back';
      backBtn.innerHTML = '← رجوع · Back';
      backBtn.style.cssText = 'background:rgba(0,0,0,.55);color:#fff;border:1px solid rgba(255,255,255,.2);padding:7px 14px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;backdrop-filter:blur(10px);font-family:inherit';
      backBtn.onclick = ()=> goBack();

      const titleEl = document.createElement('div');
      titleEl.style.cssText = 'flex:1;color:#fff;font-size:14px;font-weight:700;text-shadow:0 2px 8px rgba(0,0,0,.6);text-align:center';

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '✕';
      closeBtn.style.cssText = 'background:rgba(255,69,58,.7);color:#fff;border:0;width:32px;height:32px;border-radius:50%;font-size:14px;font-weight:700;cursor:pointer;backdrop-filter:blur(10px)';
      closeBtn.onclick = ()=> close();

      const stepIndicator = document.createElement('div');
      stepIndicator.style.cssText = 'position:absolute;bottom:16px;left:50%;transform:translateX(-50%);z-index:20;background:rgba(0,0,0,.55);color:#fff;padding:7px 16px;border-radius:100px;font-size:11.5px;font-weight:600;backdrop-filter:blur(10px);display:flex;align-items:center;gap:8px;pointer-events:none';
      stepIndicator.innerHTML = '<span>◉</span> <span id="w3d-step">1 / '+o.scenes.length+'</span>';

      // scene container
      const sceneBox = document.createElement('div');
      sceneBox.id = 'w3dScene';
      sceneBox.style.cssText = 'position:relative;width:100%;height:100%;background:#000';

      // transition overlay (fades when switching scenes)
      const fade = document.createElement('div');
      fade.style.cssText = 'position:absolute;inset:0;z-index:30;background:#000;opacity:0;pointer-events:none;transition:opacity .35s ease';

      container.style.cssText = 'position:relative;width:100%;height:100%;background:#000;border-radius:14px;overflow:hidden;min-height:60vh';
      container.appendChild(sceneBox);
      container.appendChild(fade);
      container.appendChild(top);
      top.appendChild(backBtn);
      top.appendChild(titleEl);
      top.appendChild(closeBtn);
      container.appendChild(stepIndicator);

      function getScene(id){ return o.scenes.find(s=>s.id===id); }

      function renderScene(id, fromHistory){
        if(!fromHistory) state.history.push(state.currentId);
        const scene = getScene(id);
        if(!scene) return;
        state.currentId = id;

        // fade transition
        fade.style.opacity = '1';
        setTimeout(()=>{
          sceneBox.innerHTML = '';
          if(state.viewer){ try{ state.viewer.destroy(); }catch(e){} state.viewer=null; }
          if(!window.AURA || !AURA.Depth360){
            // graceful fallback
            sceneBox.innerHTML='<img src="'+scene.img+'" style="width:100%;height:100%;object-fit:cover">';
          } else {
            state.viewer = AURA.Depth360.mount(sceneBox, {
              img: scene.img,
              depth: scene.depth || '',
              title: '',
              height: '100%',
              hotspots: (scene.hotspots||[]).map(h=>({
                x: h.x, y: h.y, id: h.id, icon: h.icon||'◉',
                label: (window.AURA_I18N && window.AURA_I18N.lang==='ar') ? (h.labelAr||h.label) : (h.label||h.labelAr)
              })),
              onHotspot: hs => {
                if(hs && hs.id){
                  // jump to a connected scene if it exists
                  const next = getScene(hs.id);
                  if(next){
                    renderScene(next.id, false);
                  } else {
                    /* fallback: call user's onHotspot if provided */
                    if(typeof o.onHotspot==='function') o.onHotspot(hs);
                  }
                }
              }
            });
          }
          const isAr = (window.AURA_I18N && window.AURA_I18N.lang==='ar');
          titleEl.textContent = isAr ? (scene.titleAr||scene.title||scene.id) : (scene.title||scene.titleAr||scene.id);
          backBtn.disabled = state.history.length<=1;
          backBtn.style.opacity = state.history.length<=1 ? '0.4' : '1';
          backBtn.style.pointerEvents = state.history.length<=1 ? 'none' : 'auto';
          const idx = o.scenes.findIndex(s=>s.id===id);
          stepIndicator.querySelector('#w3d-step').textContent = (idx+1)+' / '+o.scenes.length;
          fade.style.opacity = '0';
        }, 380);
      }
      function goBack(){
        if(state.history.length<=1) return;
        state.history.pop();             // pop current
        const prev = state.history.pop(); // get previous
        if(prev) renderScene(prev, true);
      }
      function close(){
        if(state.viewer){ try{ state.viewer.destroy(); }catch(e){} state.viewer=null; }
        if(typeof o.onClose==='function') o.onClose();
        else if(container) container.innerHTML='';
      }

      // start
      state.history = [];  // reset for initial
      renderScene(o.startId, false);

      return {
        element: container,
        currentId: () => state.currentId,
        go(id){ renderScene(id, false); },
        back: goBack,
        close
      };
    }
  };
})();
