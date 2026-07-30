/* ============================================================
   AURA Studio — Supabase Client
   Handles: projects, site content, inquiries, image uploads
   Falls back to localStorage if Supabase is not configured
   ============================================================ */

const SUPABASE_URL = 'https://ykhlvghqrnpwkipaowem.supabase.co';
const SUPABASE_KEY = 'sb_publishable_LA4t2YWeyThQ_M7azbPx8g_fkRH0flK';

/* Load Supabase JS client from CDN */
(function loadSupabase() {
  if (window.supabase) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload = () => {
    window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false }
    });
    console.log('[AURA] Supabase connected');
  };
  document.head.appendChild(s);
})();

/* ============================================================
   AURA DB — unified data layer (Supabase primary, localStorage fallback)
   ============================================================ */
window.AURA_DB = (function () {
  const LS_KEY = 'aura.cms';
  const INQ_KEY = 'aura.inquiries';

  function isReady() {
    return !!window.sb;
  }

  function waitReady() {
    return new Promise((resolve) => {
      if (isReady()) return resolve();
      const check = setInterval(() => {
        if (isReady()) { clearInterval(check); resolve(); }
      }, 200);
      setTimeout(() => { clearInterval(check); resolve(); }, 5000);
    });
  }

  /* ---------- PROJECTS ---------- */
  async function loadProjects() {
    try {
      await waitReady();
      const { data, error } = await window.sb.from('projects').select('id,data,is_default,sort_order').order('sort_order');
      if (error) throw error;
      if (data && data.length) {
        const projects = data.map(r => r.data);
        const defaultRow = data.find(r => r.is_default);
        return {
          currentProjectId: defaultRow ? defaultRow.id : (data[0]?.id || 'villa-solara'),
          projects: projects
        };
      }
      throw new Error('No projects in DB');
    } catch (e) {
      console.warn('[AURA DB] Using localStorage fallback for projects:', e.message);
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    }
  }

  async function saveProject(project) {
    try {
      await waitReady();
      const { error } = await window.sb.from('projects').upsert({
        id: project.id,
        data: project,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('[AURA DB] Save project fallback to localStorage:', e.message);
      return false;
    }
  }

  /* ---------- SITE CONTENT ---------- */
  async function loadSiteContent() {
    try {
      await waitReady();
      const { data, error } = await window.sb.from('site_content').select('data').eq('id', 'main').single();
      if (error) throw error;
      return data?.data || null;
    } catch (e) {
      console.warn('[AURA DB] Site content fallback to defaults:', e.message);
      return null;
    }
  }

  async function saveSiteContent(content) {
    try {
      await waitReady();
      const { error } = await window.sb.from('site_content').upsert({
        id: 'main',
        data: content,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('[AURA DB] Save site content fallback:', e.message);
      return false;
    }
  }

  /* ---------- INQUIRIES ---------- */
  async function loadInquiries() {
    try {
      await waitReady();
      const { data, error } = await window.sb.from('inquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[AURA DB] Inquiries fallback to localStorage:', e.message);
      return JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
    }
  }

  async function saveInquiry(inq) {
    /* always save to localStorage as backup */
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
      all.unshift(inq);
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}

    /* try Supabase */
    try {
      await waitReady();
      const { error } = await window.sb.from('inquiries').insert({
        id: inq.id,
        name: inq.name,
        phone: inq.phone,
        company: inq.company || '',
        message: inq.msg || inq.message || '',
        project_type: inq.projectType || '',
        source: inq.source || 'contact-form',
        status: 'new'
      });
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn('[AURA DB] Inquiry save fallback:', e.message);
      return false;
    }
  }

  async function updateInquiryStatus(id, status) {
    try {
      await waitReady();
      const { error } = await window.sb.from('inquiries').update({ status }).eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.warn('[AURA DB] Update inquiry fallback:', e.message);
    }
    /* also update localStorage */
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]');
      const item = all.find(i => i.id === id);
      if (item) item.status = status;
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  async function deleteInquiry(id) {
    try {
      await waitReady();
      await window.sb.from('inquiries').delete().eq('id', id);
    } catch (e) {}
    try {
      const all = JSON.parse(localStorage.getItem(INQ_KEY) || '[]').filter(i => i.id !== id);
      localStorage.setItem(INQ_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  /* ---------- IMAGE UPLOAD ---------- */
  async function uploadImage(file, folder = 'misc') {
    try {
      await waitReady();
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}.${ext}`;
      const { data, error } = await window.sb.storage
        .from('aura-images')
        .upload(filename, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      /* get public URL */
      const { data: urlData } = window.sb.storage.from('aura-images').getPublicUrl(filename);
      return urlData.publicUrl;
    } catch (e) {
      console.warn('[AURA DB] Image upload fallback to Base64:', e.message);
      /* fallback: Base64 compression */
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxW = 1200; let w = img.width, h = img.height;
            if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.82));
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  return {
    isReady,
    loadProjects,
    saveProject,
    loadSiteContent,
    saveSiteContent,
    loadInquiries,
    saveInquiry,
    updateInquiryStatus,
    deleteInquiry,
    uploadImage
  };
})();
