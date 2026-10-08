const CACHE='home-menu-v1';
const ASSETS=[
  './','./index.html','./style.css','./script.js','./manifest.json','./assets/bear-chef.svg',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png',
  './assets/dishes/tomato-eggplant.jpg','./assets/dishes/pepper-tofu-pork.jpg','./assets/dishes/king-oyster-egg.jpg',
  './assets/dishes/potato-chicken.jpg','./assets/dishes/celery-yuba.jpg','./assets/dishes/roast-lamb.jpg','./assets/dishes/pepper-potato.jpg',
  './assets/dishes/vegetable-noodles.jpg','./assets/dishes/egg-fried-rice.jpg','./assets/dishes/dumplings.jpg','./assets/dishes/egg-pancake.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp}).catch(()=>caches.match('./index.html'))));});
