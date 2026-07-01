const CACHE = 'sertek-v1';

const FILES = [
  './',
  './index.html',
  './Comparatif_Ajax_Jablotron_Interactive.html',
  './Comparatif_Ajax_Jablotron_Light.html',
  './Comparatif_Ajax_Jablotron_EM_Dark.html',
  './Comparatif_Ajax_Jablotron_EM_Light.html',
  './Comparatif_Ajax_Jablotron_EM_Dark_DE.html',
  './Comparatif_Ajax_Jablotron_EM_Light_DE.html',
  './images/apple-touch-icon.png',
  './images/logo_ajax.png',
  './images/logo_ajax_Noir.png',
  './images/logo_em_haustechnik.png',
  './images/logo_jablotron.png',
  './images/logo_jablotron_noir.png',
  './images/logo_sertek.png',
  './images/logo_sertek_black.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
