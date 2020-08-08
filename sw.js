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

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "05d954cf-f0092df7c7e86bdc851b.js"
  },
  {
    "url": "05d954cf-f0092df7c7e86bdc851b.js.map",
    "revision": "9371cdbe940d1373295b96cd2662fa9d"
  },
  {
    "url": "404.html",
    "revision": "459c71ef3903f09ea38069aa3ebad47b"
  },
  {
    "url": "404/index.html",
    "revision": "07e83a3223d80f61fd6b1bbca88197ba"
  },
  {
    "url": "app-d9f4a28e7240954f2b1d.js"
  },
  {
    "url": "app-d9f4a28e7240954f2b1d.js.map",
    "revision": "86ce20031426a93a0c92bfa4726fcfcb"
  },
  {
    "url": "back-to-top.svg",
    "revision": "52cb66ead3f640a8f9eea00a889b34ba"
  },
  {
    "url": "chunk-map.json",
    "revision": "a01a2f48066dba04f8b35420600f3754"
  },
  {
    "url": "CNAME",
    "revision": "44fb323af59f633d047b1ff336699412"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-235e751eb037707e5d1a.js"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-235e751eb037707e5d1a.js.map",
    "revision": "755d0a975ff8f556e9fc9307c0431cb7"
  },
  {
    "url": "component---src-pages-404-js-88be21d15411b8b0c378.js"
  },
  {
    "url": "component---src-pages-404-js-88be21d15411b8b0c378.js.map",
    "revision": "f1af83addf0a5677536b39fbcb4837e0"
  },
  {
    "url": "component---src-pages-index-js-e289706e5b23db8eb16c.js"
  },
  {
    "url": "component---src-pages-index-js-e289706e5b23db8eb16c.js.map",
    "revision": "b8c354953cf4623d51928c23561bd81e"
  },
  {
    "url": "directory_images/Adewale_Haroun_v1.webp",
    "revision": "cc06df19a15865fa7a530872d3055fef"
  },
  {
    "url": "directory_images/Ajari_Wilson_v1.webp",
    "revision": "b5f19645f903862b0f5ad05d15f9ad4f"
  },
  {
    "url": "directory_images/Akira_Thompson_v1.gif",
    "revision": "ad5601080f9fc9324adb216629b1452a"
  },
  {
    "url": "directory_images/Alex_Okafor_v1.webp",
    "revision": "37933a0b4a8a3db6f3ea31a2dba4b2ae"
  },
  {
    "url": "directory_images/Alexander_Francois_v1.webp",
    "revision": "e080d2b9dc21527299e820f0dc96d11e"
  },
  {
    "url": "directory_images/Algitt_Studios_v1.webp",
    "revision": "cd6f4b3f6d5a16d91bf9669b099e8479"
  },
  {
    "url": "directory_images/Algorythmic_Studios_v1.webp",
    "revision": "10a1d4f6ac65fef9c9d3e35e820d345c"
  },
  {
    "url": "directory_images/Andreas_J_Hester_v1.webp",
    "revision": "5c7ef91c55d0efdcd9fd68ffa79033d9"
  },
  {
    "url": "directory_images/Andy_James_Nicholis_v1.webp",
    "revision": "01cddf8508c771a4c2dc249e5a76c857"
  },
  {
    "url": "directory_images/Anisiuba_Uche_v1.webp",
    "revision": "5fb2e24cbc1f7839b5b3429d576369c9"
  },
  {
    "url": "directory_images/Anthony_G_Smith_IV_v1.webp",
    "revision": "1e2db49dfc12329b11df9301ded63823"
  },
  {
    "url": "directory_images/ardydo_v1.webp",
    "revision": "83d93097d073a974bd6e9fb04dc2e798"
  },
  {
    "url": "directory_images/Arthur_Ward_Jr_v1.webp",
    "revision": "c1da634fdebcbe960fd65fcc16129be1"
  },
  {
    "url": "directory_images/Audley_Gordon_v1.webp",
    "revision": "3cb6dec72a14d509ac7f2a814a8b8547"
  },
  {
    "url": "directory_images/Ava_Brumfield_v1.webp",
    "revision": "19903722007c6dfe11b0eb839f19285f"
  },
  {
    "url": "directory_images/Ben_Wilson_v1.webp",
    "revision": "da2f7e9938458e2e88d83d36273f1988"
  },
  {
    "url": "directory_images/Biru_Jones_v1.webp",
    "revision": "7504c4ab3829a8c98013d272cbbf17fa"
  },
  {
    "url": "directory_images/Catt_Small_v1.webp",
    "revision": "b649122c1a0a2ac84ba540f1ff043a6d"
  },
  {
    "url": "directory_images/Cedric_J_Adams_v1.webp",
    "revision": "13f6365874f23c0df49155991696bde2"
  },
  {
    "url": "directory_images/Chris_Wells_v1.webp",
    "revision": "43aa06718b880723a6cf3167985fc194"
  },
  {
    "url": "directory_images/Christian_Howard_v1.webp",
    "revision": "29411724ba7799707d81bee6360d924e"
  },
  {
    "url": "directory_images/DanDylan_Lavictoire_v1.webp",
    "revision": "313fcb84d9ee5fe7413cd3fb16087353"
  },
  {
    "url": "directory_images/Dani_Lalonders_v1.webp",
    "revision": "bdc60da078b500449b6b7f5bd8028896"
  },
  {
    "url": "directory_images/Daniel_Otaigbe_v1.webp",
    "revision": "21029c827c726e7f8f8cc9e92ae96bc6"
  },
  {
    "url": "directory_images/Derrick_Fields_v1.webp",
    "revision": "92856bcefe775863f45eb7829aa3b786"
  },
  {
    "url": "directory_images/Donald_Harris_v1.webp",
    "revision": "2f5a5ae531479bf69e9f1d7a67a319af"
  },
  {
    "url": "directory_images/DVNC_Tech_v1.webp",
    "revision": "288a4524ac06d31c5fa4f930d7d9e162"
  },
  {
    "url": "directory_images/Edible_Entertainment_v1.webp",
    "revision": "b71738be55a2f09e44055faa4fce66a0"
  },
  {
    "url": "directory_images/Endless_Fluff_v1.webp",
    "revision": "2f70144bcbef5ae6c282fad37c7d7644"
  },
  {
    "url": "directory_images/Evan_Higgins_v1.webp",
    "revision": "a568988802854573b5b408df6083cd9e"
  },
  {
    "url": "directory_images/GN_Games_v1.webp",
    "revision": "0c6b3ad74798ae44f06eb80c69739bcb"
  },
  {
    "url": "directory_images/Grand_Scheme_Games_v1.gif",
    "revision": "a84f6bcb0d403508ced81ced0c515ff1"
  },
  {
    "url": "directory_images/Grover_Wimberly_IV_v1.webp",
    "revision": "24cfcdbce0f95e00b39c0ae63700d988"
  },
  {
    "url": "directory_images/Hermann_Kayode_v1.webp",
    "revision": "68a993aad33a13a1afdbce26c20fdf83"
  },
  {
    "url": "directory_images/Hughes_Who_Technologies_Studio_v1.webp",
    "revision": "7a13e23ff38462ab247cdb31213e26f6"
  },
  {
    "url": "directory_images/Jord_Farrell_v1.webp",
    "revision": "e62da986961d8b078c9b7d70e2e33f81"
  },
  {
    "url": "directory_images/KIROO_Games_v1.webp",
    "revision": "5fff304d3a71d87f973bfac9c488c274"
  },
  {
    "url": "directory_images/Kola_Studios_v1.webp",
    "revision": "d7cd53fb9f4c9d0124b22d15fbea692b"
  },
  {
    "url": "directory_images/Legeci_Studios_v1.webp",
    "revision": "5e120298883e948aa5d0e9c4ab8d7209"
  },
  {
    "url": "directory_images/Leonard_J_Paul_v1.webp",
    "revision": "fcb763569ba8ffdebf592da98d0f1295"
  },
  {
    "url": "directory_images/Lucky_Shot_Media_v1.webp",
    "revision": "d27af3dcf9cd44090ccb1bf62add1674"
  },
  {
    "url": "directory_images/MABManZ_v1.webp",
    "revision": "11ec2e1227d2d98c548e86771db6ec93"
  },
  {
    "url": "directory_images/Mattieau_Manikk_StCyr_v1.webp",
    "revision": "1784d6843984e37726ce41e151001730"
  },
  {
    "url": "directory_images/Mel_Cummings_v1.webp",
    "revision": "44aa808eff3cad738255fe95abd92539"
  },
  {
    "url": "directory_images/Miscellaneum_Studios_v1.webp",
    "revision": "c04be1b8a899636cfa0e1723028eca42"
  },
  {
    "url": "directory_images/More_Fire_Games_v1.webp",
    "revision": "a554b6089e568c4faae2f9013993eef5"
  },
  {
    "url": "directory_images/Nathan_McClain_v1.webp",
    "revision": "1755c71467fe87948b4ad07622342df4"
  },
  {
    "url": "directory_images/Noohkema_Interactive_v1.webp",
    "revision": "57c091326d3efbb4097e28a1ac90f645"
  },
  {
    "url": "directory_images/Nyabingi_Studio_v1.webp",
    "revision": "74a4e76b1e768f0330ec85c5b5e771ed"
  },
  {
    "url": "directory_images/OMC_Games_v1.webp",
    "revision": "2a9678128f281a644f507e60747c09cd"
  },
  {
    "url": "directory_images/One_Man_Left_Studios_v1.webp",
    "revision": "d681572d4ca6ba10b4be6d06fa6cf4b0"
  },
  {
    "url": "directory_images/Patrick_Gordon_v1.webp",
    "revision": "a37129d2b1d11bedc78427aefb66b15c"
  },
  {
    "url": "directory_images/PawByte_v1.webp",
    "revision": "7fe028805397af4f948ebf7a205f69f1"
  },
  {
    "url": "directory_images/Quinn_George_v1.webp",
    "revision": "cca111d1c2fb2af6f68647b4cf4752a9"
  },
  {
    "url": "directory_images/Revelation_Interactive_v1.webp",
    "revision": "ac2dcaaaa456a6aff72b1e56e202e11a"
  },
  {
    "url": "directory_images/Sholto_Tiger_Collins_v1.webp",
    "revision": "d0ac1f91889ed4b4829218e5a4e4047b"
  },
  {
    "url": "directory_images/Shont_MurrayDaniels_v1.webp",
    "revision": "f4ef78302400aa52d900fed923ee20fe"
  },
  {
    "url": "directory_images/Stormy_Nights_v1.webp",
    "revision": "c33a4ca30afc6940706d7d4428d253e5"
  },
  {
    "url": "directory_images/SwordSharp_v1.webp",
    "revision": "0a1fed45146a69103b59025b13de7128"
  },
  {
    "url": "directory_images/Sylverstone_Khandr_v1.webp",
    "revision": "33734abc8d63acae57e33aedd1a03e7e"
  },
  {
    "url": "directory_images/TJ_Hughes_Terrifying_Jellyfish_v1.gif",
    "revision": "62fb730472af7fec36bf8b9cb1283be1"
  },
  {
    "url": "directory_images/TQ_Jefferson_v1.webp",
    "revision": "53f5aa26d79057310aa7184863afe72f"
  },
  {
    "url": "directory_images/Trey_Douglas_v1.webp",
    "revision": "27a9a95858d702eac7d8cbfdd3064a7d"
  },
  {
    "url": "directory_images/Tyler_Rotheram_v1.webp",
    "revision": "63dcb4b39476b4a767690ef61ca9ef63"
  },
  {
    "url": "directory_images/Victor_Burgos_v1.gif",
    "revision": "3101329bd75447156d5235ef410cbe12"
  },
  {
    "url": "directory_images/Vince_Quarles_v1.webp",
    "revision": "c1f9fda1fb38442e10932306cf1a0e64"
  },
  {
    "url": "directory_images/Waking_Oni_v1.webp",
    "revision": "92856bcefe775863f45eb7829aa3b786"
  },
  {
    "url": "directory_images/Whim_Independent_Studios_v1.webp",
    "revision": "1941c41c30f09b753ef12a751f7ee5b0"
  },
  {
    "url": "directory_images/White_Guardian_Studios_v1.webp",
    "revision": "e809e0cd6ca4e9f194692161beee6551"
  },
  {
    "url": "favicon.ico",
    "revision": "938c71886066fe4578e0aabe00f32f71"
  },
  {
    "url": "framework-dd95e8b3d258d85252e9.js"
  },
  {
    "url": "framework-dd95e8b3d258d85252e9.js.map",
    "revision": "dc018e62b3b01ec872b1a8ee8f5883f5"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiByp8kv8JHgFVrLCz7Z1xlEw.woff",
    "revision": "05c0ebe6c48bf8062f16cb0bb6b00218"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    "revision": "f4f17fd53c7d040e56f91a3ecb692b22"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiByp8kv8JHgFVrLDz8Z1xlEw.woff",
    "revision": "081c758544b2bd948eb5d9cc419a597e"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2",
    "revision": "9ddc04912d6e8f88d9de4045b8b89c59"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiEyp8kv8JHgFVrJJfecg.woff2",
    "revision": "9ed361bba8488aeb2797b82befda20f1"
  },
  {
    "url": "google-fonts/s/poppins/v12/pxiEyp8kv8JHgFVrJJfedA.woff",
    "revision": "4fc29212bd42883c45edd0bfbd91ad72"
  },
  {
    "url": "icon-business.svg",
    "revision": "a98975b2535e0a2931cfbc92abd7a3e6"
  },
  {
    "url": "icon-game.svg",
    "revision": "60003856d1cbc26979da891923d8b813"
  },
  {
    "url": "icon-location.svg",
    "revision": "df6c040143ab5ebbf985d5b7df7fffad"
  },
  {
    "url": "icon-user.svg",
    "revision": "3094d4585c21cdb1d35cef05f3a08fc2"
  },
  {
    "url": "icon-world.svg",
    "revision": "0408054aedcd6dc784931256d7c82315"
  },
  {
    "url": "icons/android-icon-144x144.png",
    "revision": "082b5fcd0a6edc4c8e6959ba96377438"
  },
  {
    "url": "icons/android-icon-192x192.png",
    "revision": "260211d2c14395a5e150933f26a77886"
  },
  {
    "url": "icons/android-icon-36x36.png",
    "revision": "e9b6f6ad8c8c856b3b37793302485e14"
  },
  {
    "url": "icons/android-icon-48x48.png",
    "revision": "67a54bb6dcdec22dae0092c73a05c784"
  },
  {
    "url": "icons/android-icon-72x72.png",
    "revision": "8381ab2f7ae17f5a6191b34d8f188c3f"
  },
  {
    "url": "icons/android-icon-96x96.png",
    "revision": "c84a9be9da32372c65abd8f3c3c4e491"
  },
  {
    "url": "icons/apple-icon-114x114.png",
    "revision": "160ca94a1e4fe72ded9a10431595c41b"
  },
  {
    "url": "icons/apple-icon-120x120.png",
    "revision": "da879066f813352cb6c7f6f08d37937b"
  },
  {
    "url": "icons/apple-icon-144x144.png",
    "revision": "082b5fcd0a6edc4c8e6959ba96377438"
  },
  {
    "url": "icons/apple-icon-152x152.png",
    "revision": "282e563d2ed79e7d0c6f15816c362b59"
  },
  {
    "url": "icons/apple-icon-180x180.png",
    "revision": "635f9d88354eb5386a21f47669e34f65"
  },
  {
    "url": "icons/apple-icon-57x57.png",
    "revision": "5eb7cc482f9dcad998fd6d2d40b8040c"
  },
  {
    "url": "icons/apple-icon-60x60.png",
    "revision": "06b65cfc1bdcd33d6a284daeb63739aa"
  },
  {
    "url": "icons/apple-icon-72x72.png",
    "revision": "8381ab2f7ae17f5a6191b34d8f188c3f"
  },
  {
    "url": "icons/apple-icon-76x76.png",
    "revision": "5954662046f48c964771c7808421758d"
  },
  {
    "url": "icons/apple-icon-precomposed.png",
    "revision": "16cd7f7660839f50ddb49dfdc3563c53"
  },
  {
    "url": "icons/apple-icon.png",
    "revision": "16cd7f7660839f50ddb49dfdc3563c53"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "082b5fcd0a6edc4c8e6959ba96377438"
  },
  {
    "url": "icons/icon-16x16.png",
    "revision": "a03389cd8df91dc1decb6bd4f4cf26d4"
  },
  {
    "url": "icons/icon-32x32.png",
    "revision": "c2a87a7136584ba9e28cf6c739587100"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "c84a9be9da32372c65abd8f3c3c4e491"
  },
  {
    "url": "icons/ms-icon-144x144.png",
    "revision": "082b5fcd0a6edc4c8e6959ba96377438"
  },
  {
    "url": "icons/ms-icon-150x150.png",
    "revision": "b2778900013dfc8216aad5c960076db1"
  },
  {
    "url": "icons/ms-icon-310x310.png",
    "revision": "c91296976fb7d8a7624b88fa85cd6576"
  },
  {
    "url": "icons/ms-icon-70x70.png",
    "revision": "90855c769bc615a0ce361aa1988fdc84"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "65c4f24a1a48a412d9099f770e33320a"
  },
  {
    "url": "loading.png",
    "revision": "aafd7f19d6acb23c905c411287cb4d98"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "a87f70e52ea21ce9f9807db6a50a2f6c"
  },
  {
    "url": "minus-icon.svg",
    "revision": "69b30251c6aa797f09b4e1938c3fd6dc"
  },
  {
    "url": "no-company-image.png",
    "revision": "153041c5fc8829bccf58691403f06e8d"
  },
  {
    "url": "no-user-image.png",
    "revision": "b09dc8c8c22620dee72392c6845b9b15"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5cc2ef65f0ab2960ad5243cd1518f73d"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "d2d3612af1df181302e193fa8c922dd4"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "885296f794bc4c06d05f9cb1f0a23695"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "c53a8f0952a80f65b17d69bb569e7b08"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "7ccb1677a3924eb7498e27ccb409e361"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "43232b01cc861c0701a3ece4bd67720b"
  },
  {
    "url": "search_icon.svg",
    "revision": "45a8c2b349965b518c83ccd8ec6d4b57"
  },
  {
    "url": "site-logo.png",
    "revision": "3ca632803a91e307fef48a669bfefb36"
  },
  {
    "url": "sitemap.xml",
    "revision": "e7fd5f56184025854d49d47f02ab698e"
  },
  {
    "url": "static/d/2602323158.json"
  },
  {
    "url": "static/d/2844921279.json"
  },
  {
    "url": "static/d/3595299048.json"
  },
  {
    "url": "static/d/3599092153.json"
  },
  {
    "url": "static/d/3856722062.json"
  },
  {
    "url": "static/no-company-image-153041c5fc8829bccf58691403f06e8d.png"
  },
  {
    "url": "webpack-runtime-40836f17580e7cf8828f.js"
  },
  {
    "url": "webpack-runtime-40836f17580e7cf8828f.js.map",
    "revision": "6fb38d0f75ef4912781e96d4b5a26fb0"
  },
  {
    "url": "webpack.stats.json",
    "revision": "72111109623da95dd3842acb671097c5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/app-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^/blackgamedevs_v2`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/blackgamedevs_v2/app-d9f4a28e7240954f2b1d.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/blackgamedevs_v2/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
