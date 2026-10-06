import { API_URL } from './ApiUrl';

const VISITOR_KEY = 'evo.analytics.visitor';

export function trackVisit() {
  if (!API_URL) return () => {};
  let visitorId;
  try {
    if (JSON.parse(localStorage.getItem('account') || 'null')?.nivel === 'SUPER_ADMIN') return () => {};
    visitorId = localStorage.getItem(VISITOR_KEY) || crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, visitorId);
  } catch {
    visitorId = crypto.randomUUID();
  }
  const id = crypto.randomUUID();
  let elapsed = 0;
  let visibleSince = document.visibilityState === 'visible' ? performance.now() : null;
  let started = false;
  const endpoint = `${API_URL}/analytics/visits`;
  const base = { id, visitorId, path: location.pathname, referrer: document.referrer ? new URL(document.referrer).hostname : '', language: navigator.language };
  function send() {
    if (!started) return;
    if (visibleSince !== null) {
      const now = performance.now();
      elapsed += now - visibleSince;
      visibleSince = now;
    }
    fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...base, durationSeconds: Math.floor(elapsed / 1000) }), keepalive: true,
    }).catch(() => {});
  }
  function visibility() {
    send();
    visibleSince = document.visibilityState === 'visible' ? performance.now() : null;
  }
  function restore() {
    visibleSince = document.visibilityState === 'visible' ? performance.now() : null;
  }
  // Deferring avoids creating two visits during React StrictMode's effect replay.
  const start = setTimeout(() => { started = true; send(); }, 0);
  const interval = setInterval(send, 15000);
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('pagehide', visibility);
  window.addEventListener('pageshow', restore);
  return () => {
    clearTimeout(start);
    clearInterval(interval);
    send();
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('pagehide', visibility);
    window.removeEventListener('pageshow', restore);
  };
}
