/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
/*
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '103953800507'
});

const messaging = firebase.messaging();*/
/*
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Moft!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});*/
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "9c3f69d6504f8109ae88622c487f4c30"
  },
  {
    "url": "favicon.ico",
    "revision": "b802fba5761ac4b0d89b812f4d637f4c"
  },
  {
    "url": "images/about-hero-image.jpg",
    "revision": "8416519ae2b5a1cf9a15b750afaf3994"
  },
  {
    "url": "images/delete.svg",
    "revision": "c3473e39fabe23e47a9971b00e15be29"
  },
  {
    "url": "images/footer-background.png",
    "revision": "8baa656efb23ae4e9274a6deb88a2de2"
  },
  {
    "url": "images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },
  {
    "url": "images/header-bg.jpg",
    "revision": "1c38155a29f918a6fc4e4b7d1d45ce69"
  },
  {
    "url": "images/log.png",
    "revision": "2f8040a68be7dc650fe682980911c3a7"
  },
  {
    "url": "images/logo.png",
    "revision": "2f8040a68be7dc650fe682980911c3a7"
  },
  {
    "url": "images/og_image.jpg",
    "revision": "2aa407d02a881716d22daaf4d035adce"
  },
  {
    "url": "images/products/BarrelChair.jpg",
    "revision": "8d89264d1515ef42e72a8550f1bf6b95"
  },
  {
    "url": "images/products/C10.jpg",
    "revision": "ff2c26fd99e5711308eaade646b554e2"
  },
  {
    "url": "images/products/Cl2.jpg",
    "revision": "f66af06555ec2ab57331fa804833459d"
  },
  {
    "url": "images/products/CP03_blue.jpg",
    "revision": "327073b6bdb702024ce6332cef29f586"
  },
  {
    "url": "images/products/CPC_RECYCLED.jpg",
    "revision": "86f6d6874edc03e48543099ad058e138"
  },
  {
    "url": "images/products/CPFS.jpg",
    "revision": "5a9f02005fc429b627350e8db675cb2f"
  },
  {
    "url": "images/products/CPO2_red.jpg",
    "revision": "d7744e1acb43af8dbc74f67fb923fd46"
  },
  {
    "url": "images/products/CPT.jpg",
    "revision": "853b21b5c962e555b4b6eacf89529848"
  },
  {
    "url": "images/products/CS1.jpg",
    "revision": "cffcd8f427eab15d91925fc261853e53"
  },
  {
    "url": "images/products/house.jpg",
    "revision": "a7821b4c4e7ffc6d51caba3f229fd912"
  },
  {
    "url": "images/products/nota1.jpg",
    "revision": "ed39e99df2af96e91e5a14cf1456ffa1"
  },
  {
    "url": "images/products/nota2.jpg",
    "revision": "cfd8f26b842000639da12a6f95b362dc"
  },
  {
    "url": "images/products/nota3.jpg",
    "revision": "74f59e3b8d3940b371ee3a802628d444"
  },
  {
    "url": "images/products/nota4.jpg",
    "revision": "b19c1d127d387983f3d6fc18c61f5caa"
  },
  {
    "url": "images/products/notarizedSign.jpg",
    "revision": "89f1a075775c074b14aefd68841f3ba2"
  },
  {
    "url": "images/products/notary.jpg",
    "revision": "5e37be15e6b64e252bc499a5fd140ffb"
  },
  {
    "url": "images/products/sailletter.jpg",
    "revision": "e09d5744b116051d714c4888fdf652ba"
  },
  {
    "url": "images/products/sheet bulk.jpg",
    "revision": "f6c0e41eb4aedd08e492927485b02985"
  },
  {
    "url": "images/products/tesla.jpg",
    "revision": "9561c9e5135ffb597b5967b71f434e58"
  },
  {
    "url": "images/products/uscis.jpg",
    "revision": "9aa3bde5e8173c44ce0f9b56650a319b"
  },
  {
    "url": "images/products/uscis1.jpg",
    "revision": "286ac9462a6444f4ec7ab61674b9e6e1"
  },
  {
    "url": "images/products/uscis2.jpg",
    "revision": "f6d89558193c7bdaf2c5c1b827e523a9"
  },
  {
    "url": "images/products/wedding.jpg",
    "revision": "88832a6aaa33179491f0ed544c654e72"
  },
  {
    "url": "images/stripe.jpg",
    "revision": "c37cc6ca5a2e214f56894b27a579f19e"
  },
  {
    "url": "images/touch/apple-touch-icon.png",
    "revision": "7326f54bfe6776293f08b34c3a5fde7b"
  },
  {
    "url": "images/touch/chrome-touch-icon-192x192.png",
    "revision": "571f134f59f14a6d298ddd66c015b293"
  },
  {
    "url": "images/touch/icon-128x128.png",
    "revision": "7c46d686765c49b813ac5eb34fabf712"
  },
  {
    "url": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "revision": "452d90b250d6f41a0c8f9db729113ffd"
  },
  {
    "url": "index.html",
    "revision": "cfea94468180c3358f11f7eeafd26fe4"
  },
  {
    "url": "manifest.json",
    "revision": "497175cc23856ee9a7407594cb97a35c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
