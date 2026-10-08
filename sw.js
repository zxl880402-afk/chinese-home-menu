const CACHE='home-menu-v2';
const ASSETS=[
  './','./index.html','./style.css','./script.js','./manifest.json','./assets/bear-chef.svg',
  './dishes/tomato-eggplant.jpg','./dishes/pepper-tofu-pork.jpg','./dishes/king-oyster-egg.jpg',
  './dishes/potato-chicken.jpg','./dishes/celery-yuba.jpg','./dishes/roast-lamb.jpg','./dishes/pepper-potato.jpg',
  './dishes/vegetable-noodles.jpg','./dishes/egg-fried-rice.jpg','./dishes/dumplings.jpg','./dishes/egg-pancake.jpg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return resp}).catch(()=>caches.match('./index.html'))));});
