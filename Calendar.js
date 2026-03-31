(function () {
  'use strict';

  const CAL_ICON = `<span class="jf-tab-icon"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/></svg></span>`;

  const CSS = `
    #jf-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,.55);
      backdrop-filter: blur(24px) saturate(1.4);
      -webkit-backdrop-filter: blur(24px) saturate(1.4);
      display: flex; flex-direction: column; overflow: hidden;
    }
    #jf-overlay-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 3.5%;
      border-bottom: 1px solid rgba(var(--accent-rgb, 255,255,255), .15);
      flex-shrink: 0;
      background: rgba(0,0,0,.2);
    }
    #jf-overlay-title {
      font-size: 1.4em; font-weight: 300; letter-spacing: .03em;
      display: flex; align-items: center; gap: 10px;
      color: rgba(255,255,255,.95);
    }
    #jf-overlay-week {
      font-size: .7em; opacity: .5; margin-left: 8px; font-weight: 300;
    }
    #jf-overlay-close {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.18);
      color: rgba(255,255,255,.85); border-radius: 50%;
      width: 36px; height: 36px; font-size: 1.1em;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background .2s;
    }
    #jf-overlay-close:hover {
      background: rgba(255,255,255,.18);
      color: #fff;
    }
    #jf-overlay-body {
      flex: 1; overflow-y: auto; padding: 0 3.5% 3em;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,.2) transparent;
    }
    #jf-overlay-body::-webkit-scrollbar { width: 4px; }
    #jf-overlay-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 2px; }
    .jf-day { padding-top: 40px; }
    .jf-day h2 {
      font-size: 1.3em; font-weight: 300; letter-spacing: .04em;
      margin: 0 0 .6em;
      color: rgba(255,255,255,.9);
    }
    .jf-cards { display: flex; flex-wrap: wrap; gap: 12px; }
    .jf-card {
      width: 150px; flex-shrink: 0; cursor: pointer;
      transition: transform .2s, opacity .2s;
    }
    .jf-card:hover { transform: scale(1.05); opacity: .85; }
    .jf-card-img {
      width: 150px; height: 225px;
      border-radius: 8px; overflow: hidden;
      background: rgba(255,255,255,.06);
      position: relative;
      border: 1px solid rgba(255,255,255,.08);
    }
    .jf-card-img img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .jf-card-t {
      font-size: .82em; margin-top: 6px;
      text-align: center; color: rgba(255,255,255,.9);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-weight: 400;
    }
    .jf-card-s {
      font-size: .74em; color: rgba(255,255,255,.45);
      text-align: center;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .jf-spinner { padding: 3em; text-align: center; color: rgba(255,255,255,.4); font-size: 1em; }
    .jf-empty { padding: 3em; text-align: center; color: rgba(255,255,255,.35); font-size: 1em; }
    @media(max-width:600px){
      .jf-card,.jf-card-img { width: calc(33vw - 14px); height: calc((33vw - 14px)*1.5); }
    }
  `;

  const injectCSS = () => {
    if (document.getElementById('jf-cal-css')) return;
    const s = document.createElement('style');
    s.id = 'jf-cal-css'; s.textContent = CSS;
    document.head.appendChild(s);
  };

  const pad      = n => String(n).padStart(2,'0');
  const fmtDate  = iso => { try { return new Date(iso+'T12:00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'}); } catch { return iso; } };
  const fmtShort = d => d.toLocaleDateString('de-DE',{day:'numeric',month:'long'});
  const escHandler = e => { if (e.key==='Escape') closeCalendar(); };

  const closeCalendar = () => {
    document.removeEventListener('keydown', escHandler);
    const o = document.getElementById('jf-overlay'); if (o) o.remove();
    document.querySelectorAll('[id^="customTabButton"]').forEach(b => {
      if (b.textContent.trim().toLowerCase().includes('calend'))
        b.classList.remove('emby-tab-button-active');
    });
  };

  const openCalendar = async () => {
    injectCSS();
    const today  = new Date(); today.setHours(0,0,0,0);
    const cutoff = new Date(today); cutoff.setDate(today.getDate()+7); cutoff.setHours(23,59,59,999);
    const weekLabel = `${fmtShort(today)} – ${fmtShort(cutoff)}`;

    const overlay = document.createElement('div');
    overlay.id = 'jf-overlay';
    overlay.innerHTML = `
      <div id="jf-overlay-header">
        <div id="jf-overlay-title">
          <svg viewBox="0 0 24 24" width="22" height="22" style="flex-shrink:0;opacity:.9">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
          </svg>
          Demnächst
          <span id="jf-overlay-week">${weekLabel}</span>
        </div>
        <button id="jf-overlay-close">✕</button>
      </div>
      <div id="jf-overlay-body"><div class="jf-spinner">Lade…</div></div>`;

    document.body.appendChild(overlay);
    document.getElementById('jf-overlay-close').onclick = closeCalendar;
    document.addEventListener('keydown', escHandler);

    try {
      const userId = ApiClient.getCurrentUserId();
      const server = ApiClient.serverAddress();
      const token  = ApiClient.accessToken();

      const data = await ApiClient.getJSON(ApiClient.getUrl('Shows/Upcoming', {
        UserId: userId, Limit: 500,
        Fields: 'PremiereDate,SeriesInfo,PrimaryImageAspectRatio,SeriesPrimaryImageTag',
        ImageTypeLimit: 1, EnableImageTypes: 'Primary'
      }));

      const body = document.getElementById('jf-overlay-body');
      if (!body) return;

      const items = (data.Items || []).filter(i => {
        const raw = i.PremiereDate || i.StartDate || '';
        if (!raw) return false;
        const d = new Date(raw);
        if (isNaN(d.getTime())) return false;
        d.setHours(0,0,0,0);
        return d >= today && d <= cutoff;
      });

      if (!items.length) { body.innerHTML = '<div class="jf-empty">Keine Folgen in den nächsten 7 Tagen.</div>'; return; }

      const groups = {}, order = [];
      items.forEach(i => {
        const d = new Date(i.PremiereDate || i.StartDate); d.setHours(0,0,0,0);
        const k = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
        if (!groups[k]) { groups[k]=[]; order.push(k); }
        groups[k].push(i);
      });
      order.sort();

      body.innerHTML = order.map(k => `
        <div class="jf-day"><h2>${fmtDate(k)}</h2><div class="jf-cards">
          ${groups[k].map(item => {
            const sid = item.SeriesId || item.Id;
            const tag = item.SeriesPrimaryImageTag || (item.ImageTags&&item.ImageTags.Primary) || '';
            const img = sid && tag ? `${server}/Items/${sid}/Images/Primary?maxHeight=300&quality=85&tag=${tag}&api_key=${token}` : '';
            const title = item.SeriesName || item.Name || '';
            const ep  = (item.ParentIndexNumber!=null&&item.IndexNumber!=null) ? `S${pad(item.ParentIndexNumber)}:E${pad(item.IndexNumber)}` : '';
            const sub = ep ? `${ep}${item.Name?' – '+item.Name:' – TBA'}` : (item.Name||'');
            return `<div class="jf-card" onclick="document.getElementById('jf-overlay').remove();window.location.hash='/details?id=${sid}'">
              <div class="jf-card-img">${img?`<img src="${img}" alt="" onerror="this.remove()">`:''}
              </div><div class="jf-card-t">${title}</div><div class="jf-card-s">${sub}</div>
            </div>`;
          }).join('')}
        </div></div>`).join('');

    } catch (e) {
      const b = document.getElementById('jf-overlay-body');
      if (b) b.innerHTML = `<div class="jf-spin" style="color:#f88">Fehler: ${e.message}</div>`;
    }
  };

  const patchCalTab = () => {
    const btn = [...document.querySelectorAll('[id^="customTabButton"]')]
                .find(b => b.textContent.trim().toLowerCase().includes('calend'));
    if (!btn) return;
    if (!btn.querySelector('.jf-tab-icon')) btn.insertAdjacentHTML('afterbegin', CAL_ICON);
    if (!btn.dataset.jfCal) {
      btn.dataset.jfCal = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (document.getElementById('jf-overlay')) { closeCalendar(); return; }
        openCalendar();
      }, true);
    }
  };

  setInterval(() => {
    if (typeof ApiClient !== 'undefined') { injectCSS(); patchCalTab(); }
  }, 400);

})();
