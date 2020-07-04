importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
      { url: './', revision: '1' },
      { url: './manifest.json', revision: '1' },
      { url: './index.html', revision: '1' },
      { url: './nav.html', revision: '1' },
      { url: './detailteam.html', revision: '1' },
      { url: './images/404.jpg', revision: '1' },
      { url: './images/bl.jpg', revision: '1' },
      { url: './images/icon.png', revision: '1' },
      { url: './images/icon1.png', revision: '1' },
      { url: './pages/home.html', revision: '1' },
      { url: './pages/team.html', revision: '1' },
      { url: './pages/pertandingan.html', revision: '1' },
      { url: './pages/favorite.html', revision: '1' },
      { url: './styles/style.css', revision: '1' },
      { url: './styles/materialize.min.css', revision: '1' },
      { url: './scripts/api.js', revision: '1' },
      { url: './scripts/materialize.min.js', revision: '1' },
      { url: './scripts/detail.js', revision: '1' },
      { url: './scripts/generate.js', revision: '1' },
      { url: './scripts/idb.js', revision: '1' },
      { url: './scripts/indexDb.js', revision: '1' },
      { url: './scripts/nav.js', revision: '1' }],
      {
        // Ignore all URL parameters.
        ignoreURLParametersMatching: [/.*/]
      });

  workbox.routing.registerRoute(
      /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
      workbox.strategies.cacheFirst({
          cacheName: 'images-cache',
          plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
          }),
          new workbox.expiration.Plugin({
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
          ]
      })
      );


    workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/'),
    workbox.strategies.staleWhileRevalidate()
    )

    // Caching Google Fonts
    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
      );

    workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
    );

    workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
    );

    workbox.routing.registerRoute(
    new RegExp('/detailteam.html'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'detailteam'
      })
    );

}else{
  console.log(`Workbox gagal dimuat`);
}



self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'images/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Notisikasi Dari Bal Balan', options)
  );
});




// Maaf Gak saya hapus buat Belajar
// const CACHE_NAME = "bal-balan";
// let urlsToCache = [
//   "./",
//   "./nav.html",
//   "./index.html",
//   "./detailteam.html",
//   "./pages/home.html",
//   "./pages/pertandingan.html",
//   "./pages/team.html",
//   "./pages/favorite.html",
//   "./styles/materialize.min.css",
//   "./styles/style.css",
//   "./scripts/materialize.min.js",
//   "./scripts/nav.js",
//   "./scripts/api.js",
//   "./scripts/indexDb.js",
//   "./scripts/idb.js",
//   "./scripts/detail.js",
//   "./scripts/generate.js",
//   "./manifest.json",
//   "./images/icon.png",
//   "./images/icon1.png",
//   "./images/bl.jpg",
//   "./images/404.jpg",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
//   "https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900&display=swap"
// ];
 
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );

// });

// self.addEventListener("fetch", function(event) {
//   const base_url = "https://api.football-data.org/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           // console.log(response)
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch : true }).then(function(response) {
//           return response || fetch (event.request);
//       })
//   )
//   }
// });

// //hapus cache jika nama tidak samadengan nama cache
// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

