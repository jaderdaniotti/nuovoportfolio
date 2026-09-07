/**
 * jaderweb service worker — shell only.
 * NON precache /comuni/* (silo ~190K). Network-first navigations; offline → /offline.
 */
const CACHE = "jaderweb-shell-v2";
const PRECACHE = [
  "/",
  "/offline",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/apple-touch-icon.png",
];

function isComuniPath(pathname) {
  return pathname === "/comuni" || pathname.startsWith("/comuni/");
}

function isApiPath(pathname) {
  return pathname.startsWith("/api/");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isApiPath(url.pathname) || isComuniPath(url.pathname)) {
    // Mai mettere in cache silo/API: passa alla rete
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(networkFirstNavigate(req));
    return;
  }

  // Asset shell: cache-first solo per precache noti
  if (PRECACHE.includes(url.pathname) || url.pathname.startsWith("/icons/")) {
    event.respondWith(cacheFirst(req));
  }
});

async function networkFirstNavigate(req) {
  try {
    const fresh = await fetch(req);
    return fresh;
  } catch {
    const cached = await caches.match("/offline");
    if (cached) return cached;
    const home = await caches.match("/");
    if (home) return home;
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    return new Response("", { status: 504 });
  }
}
