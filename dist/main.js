!function(e){function t(t){for(var i,l,o=t[0],r=t[1],s=0,c=[];s<o.length;s++)l=o[s],n[l]&&c.push(n[l][0]),n[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(d&&d(t);c.length;)c.shift()()}var i={},n={0:0};function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise(function(t,l){i=n[e]=[t,l]});t.push(i[2]=o);var r,s=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=function(e){return l.p+""+e+".main.js"}(e),r=function(t){d.onerror=d.onload=null,clearTimeout(c);var i=n[e];if(0!==i){if(i){var l=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,r=new Error("Loading chunk "+e+" failed.\n("+l+": "+o+")");r.type=l,r.request=o,i[1](r)}n[e]=void 0}};var c=setTimeout(function(){r({type:"timeout",target:d})},12e4);d.onerror=d.onload=r,s.appendChild(d)}return Promise.all(t)},l.m=e,l.c=i,l.d=function(e,t,i){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(l.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(i,n,function(t){return e[t]}.bind(null,n));return i},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l.oe=function(e){throw console.error(e),e};var o=window.webpackJsonp=window.webpackJsonp||[],r=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var d=r;l(l.s=0)}([function(e,t,i){i.e(1).then(i.t.bind(null,1,7));const n="AIzaSyAGVuHbtIE5RqdfoKV-GJqA4tzkuEgfecs";let l;document.addEventListener("keydown",e=>{document.querySelector("input").value&&13===e.keyCode&&(l=document.querySelector("input").value,fetch(`https://www.googleapis.com/youtube/v3/search?key=${n}&type=video&part=snippet&maxResults=15&q=${l}`,{method:"GET"}).then(e=>e.json()).then(e=>{let t=[];for(let i=0;i<15;i++)t[i]=e.items[i].id.videoId;!function(e){document.querySelector(".slider").style.visibility="visible",document.querySelector(".dots-wrapper").style.visibility="visible",fetch(`https://www.googleapis.com/youtube/v3/videos?key=${n}&id=${e}&part=snippet,statistics`,{method:"GET"}).then(e=>e.json()).then(e=>{let t=[];for(let i=0;i<e.items.length;i++){const n={title:e.items[i].snippet.title,date:e.items[i].snippet.publishedAt.slice(0,10),views:e.items[i].statistics.viewCount,chanel:e.items[i].snippet.channelTitle,description:e.items[i].snippet.description.slice(0,150)+"...",image:e.items[i].snippet.thumbnails.default.url};t.push(n)}!function(e){console.log(document.querySelectorAll(".slide").length);for(let t=0;t<document.querySelectorAll(".block").length;t++)document.querySelectorAll("#textTitle")[t].innerHTML=e[t].title,document.querySelectorAll("#image")[t].style.background="url("+e[t].image+") no-repeat",document.querySelectorAll("#image")[t].style.backgroundSize="100% 100%",document.querySelectorAll("#author")[t].innerHTML=e[t].chanel,document.querySelectorAll("#day")[t].innerHTML=e[t].date,document.querySelectorAll("#count")[t].innerHTML=e[t].views,document.querySelectorAll("#text")[t].innerHTML=e[t].description}(t)}).catch(e=>console.error(e))}(t)}).catch(e=>console.error(e)))},!1),document.write('<html><body><div class="main"><div class = "search"><div class="icon"></div><input id = "input" class = "input" type="text"></div> <div class="slider"><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div></div><div class="dots-wrapper"></div></body></html>')}]);