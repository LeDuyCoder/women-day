// Sends interaction events (letter opened, gift picked/sent, …) to the endpoint in
// VITE_TRACK_ENDPOINT — a Google Apps Script web app that appends rows to a Sheet.
// Without an endpoint (e.g. local dev) events are only printed to the console.

const ENDPOINT = import.meta.env.VITE_TRACK_ENDPOINT;
const SESSION_KEY = "wd-session";
const OPT_OUT_KEY = "wd-notrack";

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: tracking still works, just without a stable session id.
  }
}

// Open the site once with ?notrack to stop logging from your own browser while testing.
function isOptedOut() {
  if (new URLSearchParams(window.location.search).has("notrack")) {
    writeStorage(localStorage, OPT_OUT_KEY, "1");
  }
  return readStorage(localStorage, OPT_OUT_KEY) === "1";
}

function sessionId() {
  let id = readStorage(sessionStorage, SESSION_KEY);
  if (!id) {
    id = Math.random().toString(36).slice(2, 10);
    writeStorage(sessionStorage, SESSION_KEY, id);
  }
  return id;
}

export function track(event, detail = "") {
  const payload = {
    event,
    detail,
    session: sessionId(),
    at: new Date().toISOString(),
    device: `${window.innerWidth}x${window.innerHeight} · ${navigator.userAgent}`,
  };

  if (!ENDPOINT || isOptedOut()) {
    if (import.meta.env.DEV) console.info("[track]", event, detail);
    return;
  }

  // text/plain keeps this a "simple" request, so Apps Script accepts it without a CORS preflight.
  const body = JSON.stringify(payload);
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
  fetch(ENDPOINT, { method: "POST", mode: "no-cors", keepalive: true, body }).catch(() => {});
}
