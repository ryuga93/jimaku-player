// ==UserScript==
// @name         VRV Subtitler
// @namespace    http://tampermonkey.net/
// @version      0.1.6
// @description  Display SRT format subtitles on VRV
// @author       sheodox
// @match        https://static.vrv.co/vilos/player.html
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

!function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(){}n.r(e);const s=t=>t;function o(t){return t()}function i(){return Object.create(null)}function l(t){t.forEach(o)}function c(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?t=>requestAnimationFrame(t):r;const p=new Set;function h(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),0!==p.size&&f(h)}function m(t){let e;return 0===p.size&&f(h),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}function g(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function y(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function $(){return x(" ")}function w(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function S(t,e){e=""+e,t.data!==e&&(t.data=e)}function _(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function C(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let E,M,P=0,T={};function j(t,e,n,r,s,o,i,l=0){const c=16.666/r;let a="{\n";for(let t=0;t<=1;t+=c){const r=e+(n-e)*o(t);a+=100*t+`%{${i(r,1-r)}}\n`}const u=a+`100% {${i(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`;if(!T[d]){if(!E){const t=y("style");document.head.appendChild(t),E=t.sheet}T[d]=!0,E.insertRule(`@keyframes ${d} ${u}`,E.cssRules.length)}const f=t.style.animation||"";return t.style.animation=`${f?`${f}, `:""}${d} ${r}ms linear ${s}ms 1 both`,P+=1,d}function O(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--P&&f(()=>{if(P)return;let t=E.cssRules.length;for(;t--;)E.deleteRule(t);T={}})}function q(t){M=t}function R(){if(!M)throw new Error("Function called outside component initialization");return M}function I(){const t=R();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const s=C(e,n);r.slice().forEach(e=>{e.call(t,s)})}}}const A=[],B=[],z=[],V=[],F=Promise.resolve();let L=!1;function N(){L||(L=!0,F.then(D))}function H(t){z.push(t)}let U=!1;const G=new Set;function D(){if(!U){U=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];q(e),J(e.$$)}for(A.length=0;B.length;)B.pop()();for(let t=0;t<z.length;t+=1){const e=z[t];G.has(e)||(G.add(e),e())}z.length=0}while(A.length);for(;V.length;)V.pop()();L=!1,U=!1,G.clear()}}function J(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let Y;function Z(){return Y||(Y=Promise.resolve(),Y.then(()=>{Y=null})),Y}function K(t,e,n){t.dispatchEvent(C(`${e?"intro":"outro"}${n}`))}const Q=new Set;let W;function X(){W={r:0,c:[],p:W}}function tt(){W.r||l(W.c),W=W.p}function et(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function nt(t,e,n,r){if(t&&t.o){if(Q.has(t))return;Q.add(t),W.c.push(()=>{Q.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}const rt={duration:0};const st="undefined"!=typeof window?window:global;function ot(t,e){nt(t,1,1,()=>{e.delete(t.key)})}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let it;function lt(t){t&&t.c()}function ct(t,e,n){const{fragment:r,on_mount:s,on_destroy:i,after_update:a}=t.$$;r&&r.m(e,n),H(()=>{const e=s.map(o).filter(c);i?i.push(...e):l(e),t.$$.on_mount=[]}),a.forEach(H)}function at(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ut(t,e,n,s,o,c,a=[-1]){const u=M;q(t);const d=e.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:r,not_equal:o,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:i(),dirty:a};let p=!1;var h;f.ctx=n?n(t,d,(e,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&o(f.ctx[e],f.ctx[e]=s)&&(f.bound[e]&&f.bound[e](s),p&&function(t,e){-1===t.$$.dirty[0]&&(A.push(t),N(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n}):[],f.update(),p=!0,l(f.before_update),f.fragment=!!s&&s(f.ctx),e.target&&(e.hydrate?f.fragment&&f.fragment.l((h=e.target,Array.from(h.childNodes))):f.fragment&&f.fragment.c(),e.intro&&et(t.$$.fragment),ct(t,e.target,e.anchor),D()),q(u)}"function"==typeof HTMLElement&&(it=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){at(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class dt{$destroy(){at(this,1),this.$destroy=r}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function ft(t){const e=t-1;return e*e*e+1}function pt(t,{delay:e=0,duration:n=400,easing:r=ft,x:s=0,y:o=0,opacity:i=0}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-i);return{delay:e,duration:n,easing:r,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*s}px, ${(1-t)*o}px);\n\t\t\topacity: ${c-u*e}`}}function ht(t,e,n){const r=t.slice();return r[12]=e[n],r}function mt(t){let e,n,r,s,o,i,c,a,u,d,f,p,h,m,x,S,_,C,E;return{c(){e=y("div"),n=y("h2"),n.textContent="Settings",r=$(),s=y("button"),s.textContent="Reselect subtitles",o=$(),i=y("button"),i.textContent="Realign subtitles",c=$(),a=y("br"),u=$(),d=y("input"),f=$(),p=y("label"),p.textContent="Show subs over video",h=$(),m=y("br"),x=$(),S=y("input"),_=$(),C=y("label"),C.textContent="Pause when tray is open",k(n,"class","svelte-pvtdrn"),k(s,"class","svelte-pvtdrn"),k(i,"class","svelte-pvtdrn"),k(d,"id","show-subs"),k(d,"type","checkbox"),d.checked=!0,k(p,"for","show-subs"),k(S,"id","pause-on-tray"),k(S,"type","checkbox"),k(C,"for","pause-on-tray"),k(e,"class","settings svelte-pvtdrn")},m(l,b){v(l,e,b),g(e,n),g(e,r),g(e,s),g(e,o),g(e,i),g(e,c),g(e,a),g(e,u),g(e,d),g(e,f),g(e,p),g(e,h),g(e,m),g(e,x),g(e,S),S.checked=t[2],g(e,_),g(e,C),E=[w(s,"click",t[8]),w(i,"click",t[9]),w(d,"change",t[5]("show-subs")),w(S,"change",t[10])]},p(t,e){4&e&&(S.checked=t[2])},d(t){t&&b(e),l(E)}}}function gt(t,e){let n,o,i,a,u,f,p,h,_,C=e[12].text+"";return{key:t,first:null,c(){n=y("li"),o=y("a"),i=x(C),u=$(),k(o,"target","_blank"),k(o,"href",a=`https://jisho.org/search/${encodeURIComponent(e[12].text.trim())}`),k(o,"rel","noopener noreferrer"),k(o,"class","svelte-pvtdrn"),k(n,"class","svelte-pvtdrn"),this.first=n},m(t,r){v(t,n,r),g(n,o),g(o,i),g(n,u),h=!0,_=w(o,"click",e[11])},p(t,e){(!h||1&e)&&C!==(C=t[12].text+"")&&S(i,C),(!h||1&e&&a!==(a=`https://jisho.org/search/${encodeURIComponent(t[12].text.trim())}`))&&k(o,"href",a)},i(t){h||(H(()=>{p&&p.end(1),f||(f=function(t,e,n){let o,i,l=e(t,n),a=!1,u=0;function f(){o&&O(t,o)}function p(){const{delay:e=0,duration:n=300,easing:c=s,tick:p=r,css:h}=l||rt;h&&(o=j(t,0,1,n,e,c,h,u++)),p(0,1);const g=d()+e,v=g+n;i&&i.abort(),a=!0,H(()=>K(t,!0,"start")),i=m(e=>{if(a){if(e>=v)return p(1,0),K(t,!0,"end"),f(),a=!1;if(e>=g){const t=c((e-g)/n);p(t,1-t)}}return a})}let h=!1;return{start(){h||(O(t),c(l)?(l=l(),Z().then(p)):p())},invalidate(){h=!1},end(){a&&(f(),a=!1)}}}(n,pt,{y:50,duration:200})),f.start()}),h=!0)},o(t){f&&f.invalidate(),p=function(t,e,n){let o,i=e(t,n),a=!0;const u=W;function f(){const{delay:e=0,duration:n=300,easing:c=s,tick:f=r,css:p}=i||rt;p&&(o=j(t,1,0,n,e,c,p));const h=d()+e,g=h+n;H(()=>K(t,!1,"start")),m(e=>{if(a){if(e>=g)return f(0,1),K(t,!1,"end"),--u.r||l(u.c),!1;if(e>=h){const t=c((e-h)/n);f(1-t,t)}}return a})}return u.r+=1,c(i)?Z().then(()=>{i=i(),f()}):f(),{end(e){e&&i.tick&&i.tick(1,0),a&&(o&&O(t,o),a=!1)}}}(n,pt,{y:-50,duration:200}),h=!1},d(t){t&&b(n),t&&p&&p.end(),_()}}}function vt(t){let e,n,r,s,o,i,c,a,u,d,f,p,h,m=t[1]?"Hide":"Show",_=[],C=new Map,E=t[1]&&mt(t),M=t[0];const P=t=>t[12].text;for(let e=0;e<M.length;e+=1){let n=ht(t,M,e),r=P(n);C.set(r,_[e]=gt(r,n))}return{c(){e=y("div"),n=y("h1"),n.textContent="VRV Subtitler",r=$(),s=y("button"),o=x(m),i=x(" Settings"),c=$(),E&&E.c(),a=$(),u=y("h2"),u.textContent="Recent Subtitles",d=$(),f=y("ul");for(let t=0;t<_.length;t+=1)_[t].c();k(n,"class","svelte-pvtdrn"),k(s,"class","svelte-pvtdrn"),k(u,"class","svelte-pvtdrn"),k(f,"class","recent-subs svelte-pvtdrn"),k(e,"class","tray svelte-pvtdrn")},m(l,m){v(l,e,m),g(e,n),g(e,r),g(e,s),g(s,o),g(s,i),g(e,c),E&&E.m(e,null),g(e,a),g(e,u),g(e,d),g(e,f);for(let t=0;t<_.length;t+=1)_[t].m(f,null);p=!0,h=[w(s,"click",t[7]),w(e,"mouseenter",t[4](!0)),w(e,"mouseleave",t[4](!1))]},p(t,[n]){if((!p||2&n)&&m!==(m=t[1]?"Hide":"Show")&&S(o,m),t[1]?E?E.p(t,n):(E=mt(t),E.c(),E.m(e,a)):E&&(E.d(1),E=null),9&n){const e=t[0];X(),_=function(t,e,n,r,s,o,i,l,c,a,u,d){let f=t.length,p=o.length,h=f;const m={};for(;h--;)m[t[h].key]=h;const g=[],v=new Map,b=new Map;for(h=p;h--;){const t=d(s,o,h),l=n(t);let c=i.get(l);c?r&&c.p(t,e):(c=a(l,t),c.c()),v.set(l,g[h]=c),l in m&&b.set(l,Math.abs(h-m[l]))}const y=new Set,x=new Set;function $(t){et(t,1),t.m(l,u),i.set(t.key,t),u=t.first,p--}for(;f&&p;){const e=g[p-1],n=t[f-1],r=e.key,s=n.key;e===n?(u=e.first,f--,p--):v.has(s)?!i.has(r)||y.has(r)?$(e):x.has(s)?f--:b.get(r)>b.get(s)?(x.add(r),$(e)):(y.add(s),f--):(c(n,i),f--)}for(;f--;){const e=t[f];v.has(e.key)||c(e,i)}for(;p;)$(g[p-1]);return g}(_,n,P,1,t,e,C,f,ot,gt,null,ht),tt()}},i(t){if(!p){for(let t=0;t<M.length;t+=1)et(_[t]);p=!0}},o(t){for(let t=0;t<_.length;t+=1)nt(_[t]);p=!1},d(t){t&&b(e),E&&E.d();for(let t=0;t<_.length;t+=1)_[t].d();l(h)}}}function bt(t,e,n){const r=I();let{recentSubs:s=[]}=e,o=!1,i=!0;return t.$set=t=>{"recentSubs"in t&&n(0,s=t.recentSubs)},[s,o,i,r,function(t){return()=>{t&&!i||r("tray-pauser",t)}},function(t){return e=>{r(t,e.target.checked)}},!0,()=>n(1,o=!o),()=>r("restart"),()=>r("realign"),function(){i=this.checked,n(2,i)},()=>r("define-pauser")]}var yt=class extends dt{constructor(t){var e;super(),document.getElementById("svelte-pvtdrn-style")||((e=y("style")).id="svelte-pvtdrn-style",e.textContent=".tray.svelte-pvtdrn.svelte-pvtdrn{margin-top:0.5rem;width:2vw;background:rgba(255, 255, 255, 0.2);position:fixed;right:0;top:0;color:white;height:calc(100% - 5rem)}.tray.svelte-pvtdrn>.svelte-pvtdrn{visibility:hidden}.tray.svelte-pvtdrn.svelte-pvtdrn:hover{width:40vw;max-width:40rem;background:rgb(33, 39, 55);overflow:auto;border-radius:3px}.tray.svelte-pvtdrn:hover>.svelte-pvtdrn{visibility:visible}.tray.svelte-pvtdrn h1.svelte-pvtdrn{font-size:2rem;background:rgb(27, 26, 38);padding:0.5rem 0;border-radius:3px;margin:0 0 0.5rem 0;border-bottom:2px solid #f47521}.tray.svelte-pvtdrn h2.svelte-pvtdrn{margin:0;text-decoration:underline}button.svelte-pvtdrn.svelte-pvtdrn{margin:0.5rem}.settings.svelte-pvtdrn.svelte-pvtdrn{background:#1a1d2b;margin:1rem;padding:1rem;box-shadow:inset 0 0 0.5rem black;border-radius:3px}ul.svelte-pvtdrn.svelte-pvtdrn{list-style:none}a.svelte-pvtdrn.svelte-pvtdrn{color:white;transform:scaleY(0);transform-origin:top;transition:transform 0.5s ease;font-size:1rem;text-decoration:none}a.svelte-pvtdrn.svelte-pvtdrn:hover{color:#0aff8c;cursor:pointer;text-decoration:underline}li.svelte-pvtdrn.svelte-pvtdrn:not(:first-of-type)::before{content:' ';position:relative;background:#f47521;height:0.1rem;width:3.2rem;display:block;margin:0 auto;border-radius:4px}",g(document.head,e)),ut(this,t,bt,vt,a,{recentSubs:0})}};function xt(t,e,n){const r=t.slice();return r[5]=e[n],r}function $t(t){let e,n=t[0],r=[];for(let e=0;e<n.length;e+=1)r[e]=wt(xt(t,n,e));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=x("")},m(t,n){for(let e=0;e<r.length;e+=1)r[e].m(t,n);v(t,e,n)},p(t,s){if(5&s){let o;for(n=t[0],o=0;o<n.length;o+=1){const i=xt(t,n,o);r[o]?r[o].p(i,s):(r[o]=wt(i),r[o].c(),r[o].m(e.parentNode,e))}for(;o<r.length;o+=1)r[o].d(1);r.length=n.length}},d(t){!function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t),t&&b(e)}}}function wt(t){let e,n,r,s=t[5].text+"";function o(...e){return t[4](t[5],...e)}return{c(){e=y("p"),n=x(s),_(e,"font-size",1.5+1.5*(t[5].line?t[5].line:1)+"rem"),k(e,"title","click to search this phrase on Jisho.org"),k(e,"class","svelte-1n7ymnp")},m(t,s){v(t,e,s),g(e,n),r=w(e,"click",o)},p(r,o){t=r,1&o&&s!==(s=t[5].text+"")&&S(n,s),1&o&&_(e,"font-size",1.5+1.5*(t[5].line?t[5].line:1)+"rem")},d(t){t&&b(e),r()}}}function kt(t){let e,n=t[1]&&$t(t);return{c(){e=y("div"),n&&n.c(),k(e,"class","subtitles")},m(t,r){v(t,e,r),n&&n.m(e,null)},p(t,[r]){t[1]?n?n.p(t,r):(n=$t(t),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i:r,o:r,d(t){t&&b(e),n&&n.d()}}}function St(t,e,n){let{current:r=[]}=e,{visible:s=!0}=e;const o=I();function i(t){o("define-pauser"),window.open(`https://jisho.org/search/${encodeURIComponent(t.trim())}`)}return t.$set=t=>{"current"in t&&n(0,r=t.current),"visible"in t&&n(1,s=t.visible)},[r,s,i,o,t=>i(t.text)]}var _t=class extends dt{constructor(t){var e;super(),document.getElementById("svelte-1n7ymnp-style")||((e=y("style")).id="svelte-1n7ymnp-style",e.textContent="p.svelte-1n7ymnp{cursor:pointer;color:white;margin:0;padding:0;text-shadow:black 2px 2px 0, black 2px -2px 0, black -2px 2px 0, black -2px -2px 0, black 2px 0 0, black 0 2px 0, black -2px 0 0, black 0 -2px 0, black 2px 2px 2px}p.svelte-1n7ymnp:hover{color:#0aff8c}",g(document.head,e)),ut(this,t,St,kt,a,{current:0,visible:1})}};class Ct{constructor(){this.video=null,this.reasons=[]}setVideo(t){this.reasons=[],this.video=t}addPauser(t){this.reasons.push(t),this._checkPause()}removePauser(t){const e=this.reasons.indexOf(t);-1!==e&&(this.reasons.splice(e,1),this._checkPause())}_checkPause(){this.reasons.length?this.video.pause():this.video.play()}}class Et{constructor(t){this.format=t,this.subs=[]}getSubs(t){return this.subs.filter(e=>e.start<=t&&e.end>=t)}timeToMs(t){const[e,n,r]=t.split(":");return 36e5*+e+6e4*+n+1e3*parseFloat(r)}firstSubtitle(){return this.subs.reduce((t,e)=>e.start<t.start?e:t,{start:1/0})}}class Mt extends Et{constructor(t){super("ass"),t=t.replace("\r","");try{this.blocks=this.parseBlocks(t),this.styles=this.parseBlock(this.blocks.styles),this.subs=this.parseBlock(this.blocks.subs),this.parseSubTimings(),this.parseSubOverrideTags()}catch(t){this.subs=[]}}parseBlocks(t){const e=t.split(/\n(?=\[)/),n=t=>e.find(e=>{const[n,r]=e.match(/^\[(.*?)]/);return r===t}).replace(/.*\n/,"").trim();return{info:n("Script Info"),styles:n("V4+ Styles"),subs:n("Events")}}parseBlock(t){const[e,...n]=t.split("\n"),r=(t,e=1/0)=>{let[n,r,s]=t.match(/(\w*): (.*)/);return s=s.split(","),s.length>e&&(s[e-1]=s.slice(e-1).join(","),s.splice(e,1/0)),{type:r,attributes:s}},s=r(e);return n.reduce((t,e)=>{if(!e)return t;const n=r(e,s.attributes.length);if("Dialogue"===n.type){const e={};s.attributes.forEach((t,r)=>{e[t.trim().toLowerCase()]=n.attributes[r]}),t.push(e)}return t},[])}parseSubTimings(){this.subs.forEach(t=>{t.start=this.timeToMs(t.start),t.end=this.timeToMs(t.end)})}parseSubOverrideTags(){}}class Pt extends Et{constructor(t){super("srt");const e=t.split("\n\n");this.subs=e.reduce((t,e)=>{let n=e.trim().split("\n");function r(){n.shift()}try{/^\d*$/.test(n[0])&&r();let[e,s]=n[0].replace(/,/g,".").match(/^([\d:\.\-> ]*)/)[0].split(/\-\->/),o=n[0].match(/([a-zA-Z].*)/);o=o&&o.length?o[1]:"";const i=(t=>{const e=o.match(new RegExp(`${t}:([\\d\\.]*)%`));if(e)return parseInt(e[1],10)/100})("line")||1;r(),t.push({start:this.timeToMs(e),end:this.timeToMs(s),text:n.join("\n").replace(/<\/?c.Japanese>/g,""),line:i})}catch(t){}return t},[])}}function Tt(t){let e,n,s,o;return{c(){e=y("label"),e.textContent="Select a subtitle file to begin",n=$(),s=y("input"),k(e,"for","srt-upload"),k(e,"class","svelte-7fhqwx"),k(s,"type","file"),k(s,"id","srt-upload"),k(s,"accept",".srt,.ass"),k(s,"class","svelte-7fhqwx")},m(r,i){v(r,e,i),v(r,n,i),v(r,s,i),o=w(s,"change",t[0])},p:r,i:r,o:r,d(t){t&&b(e),t&&b(n),t&&b(s),o()}}}function jt(t){const e=I();return[function(t){const n=t.target.files[0],r=new FileReader;r.onload=t=>{const r={ass:Mt,srt:Pt},[s,o]=n.name.match(/\.(\w{3})$/);e("subtitles-loaded",new r[o](t.target.result))},r.readAsText(n)}]}var Ot=class extends dt{constructor(t){var e;super(),document.getElementById("svelte-7fhqwx-style")||((e=y("style")).id="svelte-7fhqwx-style",e.textContent="label.svelte-7fhqwx{background:#fd0;border:none;cursor:pointer;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase;display:inline-block;margin:2rem}label.svelte-7fhqwx:hover{background:#ffea6d}input.svelte-7fhqwx{display:none}",g(document.head,e)),ut(this,t,jt,Tt,a,{})}};const{document:qt}=st;function Rt(t){let e,n;const r=new _t({props:{current:t[2],currentTime:t[6],visible:t[5]}});r.$on("define-pauser",t[12]);const s=new yt({props:{recentSubs:t[4]}});return s.$on("restart",t[7]),s.$on("tray-pauser",t[11]),s.$on("define-pauser",t[12]),s.$on("realign",t[19]),s.$on("show-subs",t[20]),{c(){lt(r.$$.fragment),e=$(),lt(s.$$.fragment)},m(t,o){ct(r,t,o),v(t,e,o),ct(s,t,o),n=!0},p(t,e){const n={};4&e&&(n.current=t[2]),32&e&&(n.visible=t[5]),r.$set(n);const o={};16&e&&(o.recentSubs=t[4]),s.$set(o)},i(t){n||(et(r.$$.fragment,t),et(s.$$.fragment,t),n=!0)},o(t){nt(r.$$.fragment,t),nt(s.$$.fragment,t),n=!1},d(t){at(r,t),t&&b(e),at(s,t)}}}function It(t){let e,n,s,o,i,l,c,a,u,d=t[3].firstSubtitle().text+"",f="number"==typeof t[1]&&Bt(t);return{c(){e=y("div"),n=y("button"),s=x("Click when the first line is said:\n\t\t\t\t"),o=y("br"),i=$(),l=y("pre"),c=x(d),a=$(),f&&f.c(),k(n,"class","svelte-gi9goe"),k(e,"class","alignment-buttons svelte-gi9goe")},m(r,d){v(r,e,d),g(e,n),g(n,s),g(n,o),g(n,i),g(n,l),g(l,c),g(e,a),f&&f.m(e,null),u=w(n,"click",t[8])},p(t,n){8&n&&d!==(d=t[3].firstSubtitle().text+"")&&S(c,d),"number"==typeof t[1]?f?f.p(t,n):(f=Bt(t),f.c(),f.m(e,null)):f&&(f.d(1),f=null)},i:r,o:r,d(t){t&&b(e),f&&f.d(),u()}}}function At(t){let e;const n=new Ot({});return n.$on("subtitles-loaded",t[10]),{c(){lt(n.$$.fragment)},m(t,r){ct(n,t,r),e=!0},p:r,i(t){e||(et(n.$$.fragment,t),e=!0)},o(t){nt(n.$$.fragment,t),e=!1},d(t){at(n,t)}}}function Bt(t){let e,n,r,s,o,i=(t[1]/1e3).toFixed(1)+"";return{c(){e=y("button"),n=x("Use the last alignment (first line at "),r=x(i),s=x(" seconds)."),k(e,"class","svelte-gi9goe")},m(i,l){v(i,e,l),g(e,n),g(e,r),g(e,s),o=w(e,"click",t[9])},p(t,e){2&e&&i!==(i=(t[1]/1e3).toFixed(1)+"")&&S(r,i)},d(t){t&&b(e),o()}}}function zt(t){let e,n,r,s;const o=[At,It,Rt],i=[];function l(t,e){return"prompt"===t[0]?0:"align"===t[0]?1:"play"===t[0]?2:-1}return~(n=l(t))&&(r=i[n]=o[n](t)),{c(){e=y("div"),r&&r.c(),k(e,"class","subtitles-app svelte-gi9goe")},m(t,r){v(t,e,r),~n&&i[n].m(e,null),s=!0},p(t,[s]){let c=n;n=l(t),n===c?~n&&i[n].p(t,s):(r&&(X(),nt(i[c],1,1,()=>{i[c]=null}),tt()),~n?(r=i[n],r||(r=i[n]=o[n](t),r.c()),et(r,1),r.m(e,null)):r=null)},i(t){s||(et(r),s=!0)},o(t){nt(r),s=!1},d(t){t&&b(e),~n&&i[n].d()}}}function Vt(t,e,n){const r="last-used-alignment",s=new Ct;let o="prompt",i=GM_getValue(r),l=[],c=null,a=null,u=-1,d=[],f=!0;function p(){n(0,o="prompt"),n(3,c=null),n(2,l=[])}var h;function m(t){a=document.querySelector("video"),s.setVideo(a),u="number"==typeof t?t:1e3*a.currentTime-c.firstSubtitle().start-400,GM_setValue(r,u),n(4,d=[]),n(0,o="play"),v()}function g(t){let e=t[t.length-1],r=d[d.length-1];!e||r&&e.text===r.text||n(4,d=[...d,e]),d.length>10&&n(4,d=d.slice(d.length-10))}function v(){"play"===o&&(n(2,l=c.getSubs(1e3*a.currentTime-u)),g(l),requestAnimationFrame(v))}h=()=>{document.addEventListener("visibilitychange",()=>{document.hidden||s.removePauser("define")});let t="";setInterval(()=>{const e=document.querySelector("video").getAttribute("src");e&&e!==t&&(t=e,p())},50)},R().$$.on_mount.push(h);return[o,i,l,c,d,f,"",p,m,function(){m(i)},function(t){n(3,c=t.detail),0===c.subs.length?(console.log("subtitles object failed to parse: ",c),alert(`No subtitles were parsed from the selected .${c.format} file, verify nothing is wrong with the file. If it appears normal please submit a bug report with the episode and the subtitles file you used to the issue tracker!`)):(n(1,i=GM_getValue(r)),n(0,o="align"))},function(t){t.detail?s.addPauser("tray"):s.removePauser("tray")},function(){s.addPauser("define")},a,u,r,s,g,v,()=>n(0,o="align"),t=>n(5,f=t.detail)]}var Ft=class extends dt{constructor(t){var e;super(),qt.getElementById("svelte-gi9goe-style")||((e=y("style")).id="svelte-gi9goe-style",e.textContent=".subtitles-app.svelte-gi9goe.svelte-gi9goe{position:relative}.subtitles-app.svelte-gi9goe.svelte-gi9goe>*{z-index:1000000000}.subtitles-app.svelte-gi9goe.svelte-gi9goe button{background:#fd0;border:none;cursor:pointer;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase}.subtitles-app.svelte-gi9goe.svelte-gi9goe button:hover{background:#ffea6d}.alignment-buttons.svelte-gi9goe.svelte-gi9goe{display:flex;flex-direction:column}.alignment-buttons.svelte-gi9goe button.svelte-gi9goe{margin:0.5rem;align-self:center}",g(qt.head,e)),ut(this,t,Vt,zt,a,{})}};const Lt=document.createElement("div");document.body.appendChild(Lt),Lt.id="sheodox-vrv-subtitler",Lt.style.height="100%",Lt.style.width="100%";new Ft({target:Lt})}]);
