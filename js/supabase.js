/* ============================================================
   AURA Studio — Supabase Client (v2 — full sync)
   Handles: projects, site content, inquiries, images, hotspots
   Falls back to localStorage if Supabase is unavailable
   ============================================================ */

const SUPABASE_URL = 'https://ykhlvghqrnpwkipaowem.supabase.co';
const SUPABASE_KEY = 'sb_publishable_LA4t2YWeyThQ_M7azbPx8g_fkRH0flK';

(function loadSupabase() {
  if (window.supabase) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload = () => {
    window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false }
    });
    console.log('[AURA] Supabase connected');
    window.dispatchEvent(new Event('supabase-ready'));
  };
  document.head.appendChild(s);
})();

window.AURA_DB = (function () {
  const LS_KEY = 'aura.cms';
  const INQ_KEY = 'aura.inquiries';

  function isReady() { return !!window.sb; }

  function waitReady() {
    return new Promise((resolve) => {
      if (isReady()) return resolve();
      const check = setInterval(() => {
        if (isReady()) { clearInterval(check); resolve(); }
      }, 200);
      setTimeout(() => { clearInterval(check); resolve(); }, 5000);
    });
  }

  /* ---------- FULL CONFIG (all projects + site content) ---------- */
  async function loadAll() {
    try {
      await waitReady();
      /* load all projects */
      const { data: projRows, error: projErr } = await window.sb.from('projects')
        .select('id,data,is_default,sort_order').order('sort_order');
      if (projErr) throw projErr;
      /* load site content */
      const { data: siteRow, error: siteErr } = await window.sb.from('site_content')
        .select('data').eq('id', 'main').single();

      const cfg = { projects: [], currentProjectId: 'villa-solara', siteContent: {} };

      if (projRows && projRows.length) {
        cfg.projects = projRows.map(r => r.data);
        const def = projRows.find(r => r.is_default);
        cfg.currentProjectId = def ? def.id : projRows[0].id;
      }
      if (siteRow && siteRow.data) {
        cfg.siteContent = siteRow.data;
      }
      if (cfg.projects.length > 0) return cfg;
      throw new Error('No data in Supabase, using localStorage');
    } catch (e) {
      console.warn('[AURA DB] loadAll fallback:', e.message);
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    }
  }

  async function saveAll(cfg) {
    /* save to localStorage first (always) */
    cfg._lastUpdate = Date.now().toString();
    localStorage.setItem(LS_KEY, JSON.stringify(cfg));
    /* try Supabase */
    try {
      await waitReady();
      /* save each project */
      if (cfg.projects) {
        for (const p of cfg.projects) {
          await window.sb.from('projects').upsert({
            id: p.id, data: p,
            is_default: p.id === cfg.currentProjectId,
            updated_at: new Date().toISOString()
          });
        }
      }
      /* save site content */
      if (cfg.siteContent) {
        await window.sb.from('site_content').upsert({
          id: 'main', data: cfg.siteContent,
          updated_at: new Date().toISOString()
        });
      }
      return true;
    } catch (e) {
      console.warn('[AURA DB] saveAll Supabase failed (localStorage OK):', e.message);
      return false;
    }
  }

  /* ---------- PROJECTS ---------- */
  async function loadProjects() { return loadAll(); }

  async function saveProject(project) {
    try {
      await waitReady();
      const { error } = await window.sb.from('projects').upsert({
        id: project.id, data: project,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      return true;
    } catch (e) { console.warn('[AURA DB] saveProject:', e.message); return false; }
  }

  /* ---------- SITE CONTENT ---------- */
  async function loadSiteContent() {
    try {
      await waitReady();
      const { data, error } = await window.sb.from('site_content').select('data').eq('id', 'main').single();
      if (error) throw error;
      return data?.data || null;
    } catch (e) { console.warn('[AURA DB] siteContent:', e.message); return null; }
  }

  async function saveSiteContent(content) {
    try {
      await waitReady();
      const { error } = await window.sb.from('site_content').upsert({
        id: 'main', data: content, updated_at: new Date().toISOString()
      });
      if (error) throw error;
      return true;
    } catch (e) { console.warn('[AURA DB] saveSiteContent:', e.message); return false; }
  }

  /* ---------- INQUIRIES ---------- */
  async function loadInquiries() {
    try {
      await waitReady();
      const { data, error } = await window.sb.from('inquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[AURA DB] inquiries fallback:', e.message);
      return JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
    }
  }

  async function saveInquiry(inq) {
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
      all.unshift(inq);
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}
    try {
      await waitReady();
      const { error } = await window.sb.from('inquiries').insert({
        id: inq.id, name: inq.name, phone: inq.phone,
        company: inq.company || '', message: inq.msg || inq.message || '',
        project_type: inq.projectType || '', source: inq.source || 'contact-form',
        status: 'new'
      });
      if (error) throw error;
      return true;
    } catch (e) { console.warn('[AURA DB] saveInquiry:', e.message); return false; }
  }

  async function updateInquiryStatus(id, status) {
    try { await waitReady(); await window.sb.from('inquiries').update({ status }).eq('id', id); } catch (e) {}
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
      const item = all.find(i => i.id === id); if (item) item.status = status;
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  async function deleteInquiry(id) {
    try { await waitReady(); await window.sb.from('inquiries').delete().eq('id', id); } catch (e) {}
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]').filter(i => i.id !== id);
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  /* delete ALL inquiries (admin "clear" action) — Supabase + localStorage */
  async function clearInquiries() {
    try {
      await waitReady();
      await window.sb.from('inquiries').delete().neq('id', '');
      localStorage.removeItem(INQ_KEY);
      return true;
    } catch (e) {
      console.warn('[AURA DB] clearInquiries:', e.message);
      try { localStorage.removeItem(INQ_KEY); } catch (e2) {}
      return false;
    }
  }

  /* ---------- MEDIA UPLOAD (images + videos) ---------- */
  async function uploadMedia(file, folder = 'misc') {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    /* try Supabase Storage first */
    try {
      await waitReady();
      const ext = file.name.split('.').pop() || (isImage ? 'jpg' : isVideo ? 'mp4' : 'bin');
      const filename = folder + '/' + Date.now() + '.' + ext;
      const { error } = await window.sb.storage.from('aura-images').upload(filename, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      const { data: urlData } = window.sb.storage.from('aura-images').getPublicUrl(filename);
      return urlData.publicUrl;
    } catch (e) {
      console.warn('[AURA DB] uploadMedia Supabase failed, using fallback:', e.message);
      /* image fallback: compress to Base64 JPEG */
      if (isImage) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const maxW = 1600; let w = img.width, h = img.height;
              if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
              canvas.width = w; canvas.height = h;
              canvas.getContext('2d').drawImage(img, 0, 0, w, h);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }
      /* video fallback: Base64 only for small files (<15MB), else throw */
      if (isVideo) {
        if (file.size > 15 * 1024 * 1024) {
          throw new Error('الفيديو كبير جداً للتخزين المحلي. استخدم رابط فيديو مباشر، أو فعّل Supabase. · Video too large for offline storage. Use a direct URL or enable Supabase.');
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = () => reject(new Error('Failed to read video file'));
          reader.readAsDataURL(file);
        });
      }
      throw new Error('Unsupported file type');
    }
  }
  /* alias kept for backwards compatibility */
  const uploadImage = uploadMedia;

  /* ---------- HOTSPOTS ---------- */
  async function saveHotspots(projectId, hotspots) {
    /* hotspots are part of project data, so we just save the project */
    try {
      await waitReady();
      /* load existing project, merge hotspots, save */
      const { data, error } = await window.sb.from('projects').select('data').eq('id', projectId).single();
      if (error) throw error;
      if (data && data.data) {
        data.data.hotspots = hotspots;
        await window.sb.from('projects').upsert({
          id: projectId, data: data.data, updated_at: new Date().toISOString()
        });
      }
      return true;
    } catch (e) { console.warn('[AURA DB] saveHotspots:', e.message); return false; }
  }

  return {
    isReady, loadAll, saveAll,
    loadProjects, saveProject,
    loadSiteContent, saveSiteContent,
    loadInquiries, saveInquiry, updateInquiryStatus, deleteInquiry, clearInquiries,
    uploadImage, uploadMedia, saveHotspots
  };
})();
