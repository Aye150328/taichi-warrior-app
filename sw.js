const C='tw-v7';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){var cl=r.clone();caches.open(C).then(function(c){c.put('./index.html',cl);});return r;}).catch(function(){return caches.match('./index.html');}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(res){var cl=res.clone();caches.open(C).then(function(c){c.put(e.request,cl);});return res;});}));
});
