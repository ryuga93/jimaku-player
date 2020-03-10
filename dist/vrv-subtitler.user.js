// ==UserScript==
// @name         VRV Subtitler
// @namespace    http://tampermonkey.net/
// @version      0.1.18
// @description  Display SRT format subtitles on VRV
// @author       sheodox
// @match        https://static.vrv.co/vilos/player.html
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

!function(t){var e={};function n(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=class{constructor(t,e){this.format=t,this.fileName=e,this.subs=[]}getSubs(t){return this.subs.filter(e=>e.start<=t&&e.end>=t)}timeToMs(t){const[e,n,s]=t.split(":");return 36e5*+e+6e4*+n+1e3*parseFloat(s)}firstSubtitle(){return this.subs.reduce((t,e)=>e.start<t.start?e:t,{start:1/0})}}},function(t,e,n){const s=n(0),r=t=>(t.charAt(0).toLowerCase()+t.substring(1)).replace(" ",""),o=t=>{if(t){t=(t=t.replace(/[&H]/g,"")).padStart(8,"0");const[e,n,s,r,o]=t.match(/([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i),l=t=>parseInt(t,16);return`rgba(${l(o)}, ${l(r)}, ${l(s)}, ${255-l(n)})`}},l=(t,e,n="transparent",s=0,r=0)=>{const o=t||n;s*=2,r=`${r}px`;const l=[];for(let t=-1*(e=2*(void 0===e?1:e));t<=e;t++)for(let n=-1*e;n<=e;n++)l.push(`${t}px ${n}px ${r} ${o}`);return`text-shadow: ${l.join(", ")}, ${s}px ${s}px ${r} ${n}`};function i(t,e,n=!1){const s=new RegExp(n?`\\\\${e}\\((.*?)\\)`:`\\\\${e}([^\\\\}]*)`),r=t.match(s);if(r)return{overrides:t.replace(r[0],""),params:n?r[1].split(","):r[1]}}t.exports=class extends s{constructor(t,e){super("ass",e),t=t.replace(/\r\n/g,"\n");try{this.blocks=this.parseBlocks(t),this.subs=this.parseBlock(this.blocks.subs),this.parseInfo(this.blocks.info),this.parseSubTimings(),this.parseStyles(this.parseBlock(this.blocks.styles)),this.parseSubOverrideTags()}catch(t){console.error("ASS PARSE ERROR",t),this.subs=[]}}serialize(){return JSON.stringify({info:this.info,styles:this.styles,subs:this.subs},null,4)}debugInfo(){return[{title:"Number of styles",detail:Object.keys(this.styles).length},{title:"Number of subtitles",detail:this.subs.length}]}parseInfo(){this.info={},this.blocks.info.split("\n").forEach(t=>{const[e,n]=t.split(": ");this.info[r(e)]=n})}scaleHeight(t){return`${t/+this.info.playResY*100}vh`}scaleWidth(t){return`${t/+this.info.playResX*100}vw`}parseBlocks(t){const e=t.split(/\n(?=\[)/),n=t=>e.find(e=>{e=e.trim();const[n,s]=e.match(/^\[(.*?)]/);return s===t}).replace(/.*\n/,"").trim();return{info:n("Script Info"),styles:n("V4+ Styles"),subs:n("Events")}}parseBlock(t){const[e,...n]=t.split("\n"),s=(t,e=1/0)=>{let[n,s,r]=t.match(/(\w*): (.*)/);return r=r.split(","),r.length>e&&(r[e-1]=r.slice(e-1).join(","),r.splice(e,1/0)),{type:s,attributes:r}},o=s(e);return n.reduce((t,e)=>{if(!e||";"===e.charAt(0)||0===e.indexOf("Comment: "))return t;const n=s(e,o.attributes.length),l={dataType:n.type.toLowerCase()};return o.attributes.forEach((t,e)=>{t=t.trim();const s=r(t);l[s]=n.attributes[e]}),l.style="*Default"===l.style?"Default":l.style,t.push(l),t},[])}parseSubTimings(){this.subs.forEach(t=>{t.start=this.timeToMs(t.start),t.end=this.timeToMs(t.end)})}parseStyles(t){const e={};t.forEach(t=>{for(const e of Object.keys(t).filter(t=>/colour/i.test(t)))t[e]=o(t[e]);t.name="*Default"===t.name?"Default":t.name;const n=[],{primaryColour:s,secondaryColour:r,outlineColour:i,backColour:a,borderStyle:c,outline:u,shadow:p,fontname:d,fontsize:f,bold:x,italic:h,underline:g,strikeOut:b}=t;s&&n.push(`color: ${s}`),d&&n.push(`font-family: "${d}"`),"1"===c?n.push(l(i,u,a,p)):"3"===c&&n.push(`background-color: ${a}`),"-1"===x&&n.push("font-weight: bold"),"-1"===h&&n.push("font-style: italic"),"-1"!==g&&"-1"!==b||n.push(`text-decoration: ${"-1"===g?"underline":""} ${"-1"===b?"line-through":""}`),e[t.name]={inline:n.join(";"),...this.genScaledFont(f),raw:t}}),this.styles=e}genScaledFont(t){return{fontScaled:this.scaleHeight(.75*t),fontMax:`${t}px`,fontScalingThreshold:+this.info.playResY,fontRaw:t}}parseSubOverrideTags(){this.subs.forEach(t=>{if(t.rawText=t.text,t.text=t.text.replace("\\N","\n"),!/{.+?}/.test(t.text))return;const e=t=>t.replace(/{.*?}/g,"");t.styledText=[];const n=function*(t){const e=/({.*?}[^{]*)/g;let n;const s=t.indexOf("{");for(s>0&&(yield t.substring(0,s));null!==(n=e.exec(t));)yield n[1]}(t.text);let s=[];for(const c of n){const n=[],u={text:e(c),fadeIn:0,fadeOut:0,inline:""};let p,d,f,x,h,g=c.match(/{.*?}/),b=g?g[0]:"";function r(t,e=!1,n=(()=>{})){const s=i(b,t,e);s&&(n(s.params),b=s.overrides)}function a(t,e,n){const s=t.map((t,n)=>{const s=Array.isArray(e)?e[n]:e,r=i(b,t,s);if(r)return b=r.overrides,r.params});s.some(t=>void 0!==t)&&n(...s)}if(r("fscx"),r("fscy"),r("3c",!1,t=>{p=t}),r("4c",!1,t=>{d=t}),r("bord",!1,t=>{f=t}),r("shad",!1,t=>{x=t}),r("blur",!1,t=>{h=t}),r("be",!1,t=>{h=t}),[p,d,f,x,h].some(t=>void 0!==t)){const e=this.styles[t.style],n=(t,n)=>void 0!==t?t:e.raw[n];e&&(p=n(o(p),"outlineColour"),d=n(o(d),"backColour"),f=n(f,"outline"),x=n(x,"shadow"),s.push(l(p,f,d,x,h)))}a(["pos","an"],[!0,!1],(t,e="5")=>{if(t){const[s,r]=t;n.push(`position: fixed; left: ${this.scaleWidth(s)}; top: ${this.scaleHeight(r)}`);const o={1:"50%, -150%",2:"-50%, -150%",3:"-150%, -150%",4:"50%, -50%",5:"-50%, -50%",6:"-150%, -50%",7:"50%, 50%",8:"-50%, 50%",9:"-150%, 50%"}[e];n.push(`transform: translate(${o})`)}}),a(["frx","fry","frz"],!1,(t,e,n)=>{const r=[],o=(t,e,n=1)=>{if(void 0!==t)return t=parseFloat(t)*n,r.push(`rotate${e}(${t}deg)`)};o(t,"X"),o(e,"Y",-1),o(n,"Z",-1),r.length&&s.push(`display: block; transform: ${r.join(" ")}`)}),r("fad",!0,([e,n])=>{u.fadeIn=e,u.fadeOut=n,t.end-=n}),r("fsp",!1,t=>{s.push(`letter-spacing: ${t}px`)}),r("fs",!1,t=>{Object.assign(u,this.genScaledFont(t))});const m=[];r("u",!1,t=>{m.push("underline")}),r("s",!1,t=>{m.push("line-through")}),s.push(`text-decoration: ${m.length?m.join(" "):"none"}`),r("b",!1,t=>{s.push(`font-weight: ${t?"bold":"normal"}`)}),r("i",!1,t=>{s.push(`font-style: ${t?"italic":"normal"}`)}),r("fn",!1,t=>{s.push(`font-family: "${t}"`)}),r("1c",!1,t=>{s.push(`color: ${o(t)}`)}),r("r",!1,t=>{if(t){const e=this.styles[t];s=[e.inline],Object.assign(u,this.genScaledFont(e.fontRaw))}else s=[]}),u.inline=s.join(";"),t.styledText.push(u),n.length&&(t.inline=n.join(";"))}t.text=e(t.text)})}}},function(t,e,n){"use strict";function s(){}n.r(e);const r=t=>t;function o(t){return t()}function l(){return Object.create(null)}function i(t){t.forEach(o)}function a(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}const u="undefined"!=typeof window;let p=u?()=>window.performance.now():()=>Date.now(),d=u?t=>requestAnimationFrame(t):s;const f=new Set;function x(t){f.forEach(e=>{e.c(t)||(f.delete(e),e.f())}),0!==f.size&&d(x)}function h(t){let e;return 0===f.size&&d(x),{promise:new Promise(n=>{f.add(e={c:t,f:n})}),abort(){f.delete(e)}}}function g(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function m(t){t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function w(){return $(" ")}function k(){return $("")}function S(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function C(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t,e){e=""+e,t.data!==e&&(t.data=e)}function j(t,e,n){t.classList[n?"add":"remove"](e)}function _(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let O,T,R=0,I={};function M(t,e,n,s,r,o,l,i=0){const a=16.666/s;let c="{\n";for(let t=0;t<=1;t+=a){const s=e+(n-e)*o(t);c+=100*t+`%{${l(s,1-s)}}\n`}const u=c+`100% {${l(n,1-n)}}\n}`,p=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${i}`;if(!I[p]){if(!O){const t=y("style");document.head.appendChild(t),O=t.sheet}I[p]=!0,O.insertRule(`@keyframes ${p} ${u}`,O.cssRules.length)}const d=t.style.animation||"";return t.style.animation=`${d?`${d}, `:""}${p} ${s}ms linear ${r}ms 1 both`,R+=1,p}function A(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--R&&d(()=>{if(R)return;let t=O.cssRules.length;for(;t--;)O.deleteRule(t);I={}})}function P(t){T=t}function F(){if(!T)throw new Error("Function called outside component initialization");return T}function N(){const t=F();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const r=_(e,n);s.slice().forEach(e=>{e.call(t,r)})}}}const z=[],B=[],L=[],q=[],D=Promise.resolve();let H=!1;function V(){H||(H=!0,D.then(G))}function U(t){L.push(t)}let J=!1;const Y=new Set;function G(){if(!J){J=!0;do{for(let t=0;t<z.length;t+=1){const e=z[t];P(e),W(e.$$)}for(z.length=0;B.length;)B.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];Y.has(e)||(Y.add(e),e())}L.length=0}while(z.length);for(;q.length;)q.pop()();H=!1,J=!1,Y.clear()}}function W(t){if(null!==t.fragment){t.update(),i(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(U)}}let X;function Z(){return X||(X=Promise.resolve(),X.then(()=>{X=null})),X}function K(t,e,n){t.dispatchEvent(_(`${e?"intro":"outro"}${n}`))}const Q=new Set;let tt;function et(){tt={r:0,c:[],p:tt}}function nt(){tt.r||i(tt.c),tt=tt.p}function st(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function rt(t,e,n,s){if(t&&t.o){if(Q.has(t))return;Q.add(t),tt.c.push(()=>{Q.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}const ot={duration:0};function lt(t,e,n){let o,l,i=e(t,n),c=!1,u=0;function d(){o&&A(t,o)}function f(){const{delay:e=0,duration:n=300,easing:a=r,tick:f=s,css:x}=i||ot;x&&(o=M(t,0,1,n,e,a,x,u++)),f(0,1);const g=p()+e,b=g+n;l&&l.abort(),c=!0,U(()=>K(t,!0,"start")),l=h(e=>{if(c){if(e>=b)return f(1,0),K(t,!0,"end"),d(),c=!1;if(e>=g){const t=a((e-g)/n);f(t,1-t)}}return c})}let x=!1;return{start(){x||(A(t),a(i)?(i=i(),Z().then(f)):f())},invalidate(){x=!1},end(){c&&(d(),c=!1)}}}function it(t,e,n){let o,l=e(t,n),c=!0;const u=tt;function d(){const{delay:e=0,duration:n=300,easing:a=r,tick:d=s,css:f}=l||ot;f&&(o=M(t,1,0,n,e,a,f));const x=p()+e,g=x+n;U(()=>K(t,!1,"start")),h(e=>{if(c){if(e>=g)return d(0,1),K(t,!1,"end"),--u.r||i(u.c),!1;if(e>=x){const t=a((e-x)/n);d(1-t,t)}}return c})}return u.r+=1,a(l)?Z().then(()=>{l=l(),d()}):d(),{end(e){e&&l.tick&&l.tick(1,0),c&&(o&&A(t,o),c=!1)}}}const at="undefined"!=typeof window?window:global;function ct(t,e){rt(t,1,1,()=>{e.delete(t.key)})}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let ut;function pt(t){t&&t.c()}function dt(t,e,n){const{fragment:s,on_mount:r,on_destroy:l,after_update:c}=t.$$;s&&s.m(e,n),U(()=>{const e=r.map(o).filter(a);l?l.push(...e):i(e),t.$$.on_mount=[]}),c.forEach(U)}function ft(t,e){const n=t.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function xt(t,e,n,r,o,a,c=[-1]){const u=T;P(t);const p=e.props||{},d=t.$$={fragment:null,ctx:null,props:a,update:s,not_equal:o,bound:l(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:l(),dirty:c};let f=!1;var x;d.ctx=n?n(t,p,(e,n,...s)=>{const r=s.length?s[0]:n;return d.ctx&&o(d.ctx[e],d.ctx[e]=r)&&(d.bound[e]&&d.bound[e](r),f&&function(t,e){-1===t.$$.dirty[0]&&(z.push(t),V(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n}):[],d.update(),f=!0,i(d.before_update),d.fragment=!!r&&r(d.ctx),e.target&&(e.hydrate?d.fragment&&d.fragment.l((x=e.target,Array.from(x.childNodes))):d.fragment&&d.fragment.c(),e.intro&&st(t.$$.fragment),dt(t,e.target,e.anchor),G()),P(u)}"function"==typeof HTMLElement&&(ut=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}$destroy(){ft(this,1),this.$destroy=s}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}});class ht{$destroy(){ft(this,1),this.$destroy=s}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function gt(t){const e=t-1;return e*e*e+1}function bt(t,{delay:e=0,duration:n=400,easing:s=r}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:t=>`opacity: ${t*o}`}}function mt(t,{delay:e=0,duration:n=400,easing:s=gt,x:r=0,y:o=0,opacity:l=0}){const i=getComputedStyle(t),a=+i.opacity,c="none"===i.transform?"":i.transform,u=a*(1-l);return{delay:e,duration:n,easing:s,css:(t,e)=>`\n\t\t\ttransform: ${c} translate(${(1-t)*r}px, ${(1-t)*o}px);\n\t\t\topacity: ${a-u*e}`}}function vt(t,e,n){const s=t.slice();return s[20]=e[n],s}function yt(t,e,n){const s=t.slice();return s[23]=e[n],s}function $t(t){let e,n,s,r,o,l,a,c,u,p,d,f,x,h,k,_,O,T,R,I,M,A,P,F,N,z,B,L,q,D,H,V,U,J,Y,G,W,X,Z,K,Q,tt,ot,lt,it,at,ut,pt,dt,ft,xt,ht,gt,bt,mt,$t=[],wt=new Map,Ct=t[1].fileName+"",Et=t[2]>0?"+":"",jt=(t[2]/1e3).toFixed(1)+"",_t=t[0];const Ot=t=>t[23].text;for(let e=0;e<_t.length;e+=1){let n=yt(t,_t,e),s=Ot(n);wt.set(s,$t[e]=kt(s,n))}let Tt=t[1].debugInfo(),Rt=[];for(let e=0;e<Tt.length;e+=1)Rt[e]=St(vt(t,Tt,e));return{c(){e=y("div"),n=y("button"),s=$("Recent Subtitles"),o=w(),l=y("button"),a=$("Settings"),u=w(),p=y("button"),d=$("Debug"),x=w(),h=y("div"),k=y("h2"),k.textContent="Recent Subtitles",_=w(),O=y("ul");for(let t=0;t<$t.length;t+=1)$t[t].c();T=w(),R=y("div"),I=y("h2"),I.textContent="Settings",M=w(),A=y("button"),A.textContent="Reselect subtitles",P=w(),F=y("button"),F.textContent="Realign subtitles",N=w(),z=y("br"),B=w(),L=y("input"),q=w(),D=y("label"),D.textContent="Show subs over video",H=w(),V=y("br"),U=w(),J=y("input"),Y=w(),G=y("label"),G.textContent="Pause when tray is open",W=w(),X=y("div"),Z=y("h2"),Z.textContent="Debug Information",K=w(),Q=y("dl"),tt=y("dt"),tt.textContent="Subtitles File",ot=y("dd"),lt=$(Ct),it=y("dt"),it.textContent="Alignment",at=y("dd"),ut=$(Et),pt=$(jt),dt=$(" seconds");for(let t=0;t<Rt.length;t+=1)Rt[t].c();ft=w(),xt=y("a"),ht=$("⬇ Download Parsed Subtitles"),n.disabled=r="recent"===t[4],l.disabled=c="settings"===t[4],p.disabled=f="debug"===t[4],C(e,"class","tray-tab-buttons svelte-2rdhge"),C(k,"class","svelte-2rdhge"),C(O,"class","recent-subs svelte-2rdhge"),C(h,"class","tab svelte-2rdhge"),j(h,"tab-active","recent"===t[4]),C(I,"class","svelte-2rdhge"),C(L,"id","show-subs"),C(L,"type","checkbox"),L.checked=!0,C(D,"for","show-subs"),C(J,"id","pause-on-tray"),C(J,"type","checkbox"),C(G,"for","pause-on-tray"),C(R,"class","tab svelte-2rdhge"),j(R,"tab-active","settings"===t[4]),C(Z,"class","svelte-2rdhge"),C(tt,"class","svelte-2rdhge"),C(ot,"class","svelte-2rdhge"),C(it,"class","svelte-2rdhge"),C(at,"class","svelte-2rdhge"),C(xt,"href",gt=t[7]()),C(xt,"download","parsed-subtitles.json"),C(xt,"class","svelte-2rdhge"),C(X,"class","tab svelte-2rdhge"),j(X,"tab-active","debug"===t[4])},m(r,i){b(r,e,i),g(e,n),g(n,s),g(e,o),g(e,l),g(l,a),g(e,u),g(e,p),g(p,d),b(r,x,i),b(r,h,i),g(h,k),g(h,_),g(h,O);for(let t=0;t<$t.length;t+=1)$t[t].m(O,null);b(r,T,i),b(r,R,i),g(R,I),g(R,M),g(R,A),g(R,P),g(R,F),g(R,N),g(R,z),g(R,B),g(R,L),g(R,q),g(R,D),g(R,H),g(R,V),g(R,U),g(R,J),J.checked=t[5],g(R,Y),g(R,G),b(r,W,i),b(r,X,i),g(X,Z),g(X,K),g(X,Q),g(Q,tt),g(Q,ot),g(ot,lt),g(Q,it),g(Q,at),g(at,ut),g(at,pt),g(at,dt);for(let t=0;t<Rt.length;t+=1)Rt[t].m(Q,null);g(X,ft),g(X,xt),g(xt,ht),bt=!0,mt=[S(n,"click",t[13]),S(l,"click",t[14]),S(p,"click",t[15]),S(A,"click",t[17]),S(F,"click",t[18]),S(L,"change",t[9]("show-subs")),S(J,"change",t[19])]},p(t,e){if((!bt||16&e&&r!==(r="recent"===t[4]))&&(n.disabled=r),(!bt||16&e&&c!==(c="settings"===t[4]))&&(l.disabled=c),(!bt||16&e&&f!==(f="debug"===t[4]))&&(p.disabled=f),65&e){const n=t[0];et(),$t=function(t,e,n,s,r,o,l,i,a,c,u,p){let d=t.length,f=o.length,x=d;const h={};for(;x--;)h[t[x].key]=x;const g=[],b=new Map,m=new Map;for(x=f;x--;){const t=p(r,o,x),i=n(t);let a=l.get(i);a?s&&a.p(t,e):(a=c(i,t),a.c()),b.set(i,g[x]=a),i in h&&m.set(i,Math.abs(x-h[i]))}const v=new Set,y=new Set;function $(t){st(t,1),t.m(i,u),l.set(t.key,t),u=t.first,f--}for(;d&&f;){const e=g[f-1],n=t[d-1],s=e.key,r=n.key;e===n?(u=e.first,d--,f--):b.has(r)?!l.has(s)||v.has(s)?$(e):y.has(r)?d--:m.get(s)>m.get(r)?(y.add(s),$(e)):(v.add(r),d--):(a(n,l),d--)}for(;d--;){const e=t[d];b.has(e.key)||a(e,l)}for(;f;)$(g[f-1]);return g}($t,e,Ot,1,t,n,wt,O,ct,kt,null,yt),nt()}if(16&e&&j(h,"tab-active","recent"===t[4]),32&e&&(J.checked=t[5]),16&e&&j(R,"tab-active","settings"===t[4]),(!bt||2&e)&&Ct!==(Ct=t[1].fileName+"")&&E(lt,Ct),(!bt||4&e)&&Et!==(Et=t[2]>0?"+":"")&&E(ut,Et),(!bt||4&e)&&jt!==(jt=(t[2]/1e3).toFixed(1)+"")&&E(pt,jt),2&e){let n;for(Tt=t[1].debugInfo(),n=0;n<Tt.length;n+=1){const s=vt(t,Tt,n);Rt[n]?Rt[n].p(s,e):(Rt[n]=St(s),Rt[n].c(),Rt[n].m(Q,null))}for(;n<Rt.length;n+=1)Rt[n].d(1);Rt.length=Tt.length}16&e&&j(X,"tab-active","debug"===t[4])},i(t){if(!bt){for(let t=0;t<_t.length;t+=1)st($t[t]);bt=!0}},o(t){for(let t=0;t<$t.length;t+=1)rt($t[t]);bt=!1},d(t){t&&m(e),t&&m(x),t&&m(h);for(let t=0;t<$t.length;t+=1)$t[t].d();t&&m(T),t&&m(R),t&&m(W),t&&m(X),v(Rt,t),i(mt)}}}function wt(t){let e,n;return{c(){e=y("button"),e.textContent="Select Subtitles",C(e,"class","svelte-2rdhge")},m(s,r){b(s,e,r),n=S(e,"click",t[12])},p:s,i:s,o:s,d(t){t&&m(e),n()}}}function kt(t,e){let n,s,r,o,l,i,a,c,u,p=e[23].text+"";return{key:t,first:null,c(){n=y("li"),s=y("a"),r=$(p),l=w(),C(s,"target","_blank"),C(s,"href",o=`https://jisho.org/search/${encodeURIComponent(e[23].text.trim())}`),C(s,"rel","noopener noreferrer"),C(s,"class","svelte-2rdhge"),C(n,"class","svelte-2rdhge"),this.first=n},m(t,o){b(t,n,o),g(n,s),g(s,r),g(n,l),c=!0,u=S(s,"click",e[16])},p(t,e){(!c||1&e)&&p!==(p=t[23].text+"")&&E(r,p),(!c||1&e&&o!==(o=`https://jisho.org/search/${encodeURIComponent(t[23].text.trim())}`))&&C(s,"href",o)},i(t){c||(U(()=>{a&&a.end(1),i||(i=lt(n,mt,{y:50,duration:200})),i.start()}),c=!0)},o(t){i&&i.invalidate(),a=it(n,mt,{y:-50,duration:200}),c=!1},d(t){t&&m(n),t&&a&&a.end(),u()}}}function St(t){let e,n,s,r,o=t[20].title+"",l=t[20].detail+"";return{c(){e=y("dt"),n=$(o),s=y("dd"),r=$(l),C(e,"class","svelte-2rdhge"),C(s,"class","svelte-2rdhge")},m(t,o){b(t,e,o),g(e,n),b(t,s,o),g(s,r)},p(t,e){2&e&&o!==(o=t[20].title+"")&&E(n,o),2&e&&l!==(l=t[20].detail+"")&&E(r,l)},d(t){t&&m(e),t&&m(s)}}}function Ct(t){let e,n,s,r,o,l,a;const c=[wt,$t],u=[];function p(t,e){return"cancelled"===t[3]?0:"normal"===t[3]?1:-1}return~(r=p(t))&&(o=u[r]=c[r](t)),{c(){e=y("div"),n=y("h1"),n.textContent="VRV Subtitler",s=w(),o&&o.c(),C(n,"class","svelte-2rdhge"),C(e,"class","tray svelte-2rdhge")},m(o,i){b(o,e,i),g(e,n),g(e,s),~r&&u[r].m(e,null),l=!0,a=[S(e,"mouseenter",t[8](!0)),S(e,"mouseleave",t[8](!1))]},p(t,[n]){let s=r;r=p(t),r===s?~r&&u[r].p(t,n):(o&&(et(),rt(u[s],1,1,()=>{u[s]=null}),nt()),~r?(o=u[r],o||(o=u[r]=c[r](t),o.c()),st(o,1),o.m(e,null)):o=null)},i(t){l||(st(o),l=!0)},o(t){rt(o),l=!1},d(t){t&&m(e),~r&&u[r].d(),i(a)}}}function Et(t,e,n){const s=N();let{recentSubs:r=[]}=e,{subtitles:o={}}=e,{alignment:l=0}=e,{mode:i="normal"}=e,a="recent",c=!0;return t.$set=t=>{"recentSubs"in t&&n(0,r=t.recentSubs),"subtitles"in t&&n(1,o=t.subtitles),"alignment"in t&&n(2,l=t.alignment),"mode"in t&&n(3,i=t.mode)},[r,o,l,i,a,c,s,function(){const t=new Blob([o.serialize()],{type:"application/json"});return URL.createObjectURL(t)},function(t){return()=>{t&&!c||s("tray-pauser",t)}},function(t){return e=>{s(t,e.target.checked)}},!1,!0,()=>s("restart"),()=>n(4,a="recent"),()=>n(4,a="settings"),()=>n(4,a="debug"),()=>s("define-pauser"),()=>s("restart"),()=>s("realign"),function(){c=this.checked,n(5,c)}]}var jt=class extends ht{constructor(t){var e;super(),document.getElementById("svelte-2rdhge-style")||((e=y("style")).id="svelte-2rdhge-style",e.textContent=".tray.svelte-2rdhge.svelte-2rdhge{margin-top:0.5rem;width:2vw;background:rgba(255, 255, 255, 0.2);position:fixed;right:0;top:0;color:white;height:calc(100% - 5rem);display:flex;flex-direction:column}.tray.svelte-2rdhge>.svelte-2rdhge{visibility:hidden}.tray.svelte-2rdhge.svelte-2rdhge:hover{width:40vw;max-width:40rem;background:#111218;overflow:auto;border-radius:3px}.tray.svelte-2rdhge:hover>.svelte-2rdhge{visibility:visible}.tray.svelte-2rdhge h1.svelte-2rdhge{font-size:2rem;padding:0.5rem 0;border-radius:3px;margin:0}.tray.svelte-2rdhge h2.svelte-2rdhge{text-decoration:underline;margin:0 0 0.4rem}ul.svelte-2rdhge.svelte-2rdhge{list-style:none}a.svelte-2rdhge.svelte-2rdhge{color:white;transform:scaleY(0);transform-origin:top;transition:transform 0.5s ease;font-size:1rem;text-decoration:none}a.svelte-2rdhge.svelte-2rdhge:hover{color:#0aff8c;cursor:pointer;text-decoration:underline}li.svelte-2rdhge.svelte-2rdhge{padding-bottom:0.2rem}li.svelte-2rdhge.svelte-2rdhge:not(:first-of-type)::before{content:' ';position:relative;border:1px solid #7b724e;display:block;margin:0 auto;border-radius:4px}dt.svelte-2rdhge.svelte-2rdhge{font-weight:bold}dd.svelte-2rdhge.svelte-2rdhge{font-style:italic}.tab.svelte-2rdhge.svelte-2rdhge{display:none;text-align:left;padding:2rem;background:#1c1825}.tab-active.svelte-2rdhge.svelte-2rdhge{display:block;flex:1}.tray-tab-buttons.svelte-2rdhge.svelte-2rdhge{margin:0.2rem;border-bottom:2px solid #f47521}",g(document.head,e)),xt(this,t,Et,Ct,c,{recentSubs:0,subtitles:1,alignment:2,mode:3})}};function _t(t,e,n){const s=t.slice();return s[11]=e[n],s}function Ot(t,e,n){const s=t.slice();return s[8]=e[n],s}function Tt(t){let e,n,s=t[0],r=[];for(let e=0;e<s.length;e+=1)r[e]=At(Ot(t,s,e));const o=t=>rt(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=k()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);b(t,e,s),n=!0},p(t,n){if(13&n){let l;for(s=t[0],l=0;l<s.length;l+=1){const o=Ot(t,s,l);r[l]?(r[l].p(o,n),st(r[l],1)):(r[l]=At(o),r[l].c(),st(r[l],1),r[l].m(e.parentNode,e))}for(et(),l=s.length;l<r.length;l+=1)o(l);nt()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)st(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)rt(r[t]);n=!1},d(t){v(r,t),t&&m(e)}}}function Rt(t){let e,n=t[8].text+"";return{c(){e=$(n)},m(t,n){b(t,e,n)},p(t,s){1&s&&n!==(n=t[8].text+"")&&E(e,n)},i:s,o:s,d(t){t&&m(e)}}}function It(t){let e,n,s=t[8].styledText,r=[];for(let e=0;e<s.length;e+=1)r[e]=Mt(_t(t,s,e));const o=t=>rt(r[t],1,1,()=>{r[t]=null});return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=k()},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);b(t,e,s),n=!0},p(t,n){if(1&n){let l;for(s=t[8].styledText,l=0;l<s.length;l+=1){const o=_t(t,s,l);r[l]?(r[l].p(o,n),st(r[l],1)):(r[l]=Mt(o),r[l].c(),st(r[l],1),r[l].m(e.parentNode,e))}for(et(),l=s.length;l<r.length;l+=1)o(l);nt()}},i(t){if(!n){for(let t=0;t<s.length;t+=1)st(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)rt(r[t]);n=!1},d(t){v(r,t),t&&m(e)}}}function Mt(t){let e,n,s,r,o,l,i=t[11].text+"";return{c(){e=y("span"),n=$(i),C(e,"style",s=zt(t[11]))},m(t,s){b(t,e,s),g(e,n),l=!0},p(t,r){(!l||1&r)&&i!==(i=t[11].text+"")&&E(n,i),(!l||1&r&&s!==(s=zt(t[11])))&&C(e,"style",s)},i(n){l||(U(()=>{o&&o.end(1),r||(r=lt(e,bt,t[11].fadeIn)),r.start()}),l=!0)},o(n){r&&r.invalidate(),o=it(e,bt,t[11].fadeOut),l=!1},d(t){t&&m(e),t&&o&&o.end()}}}function At(t){let e,n,s,r,o,l,i,a;const c=[It,Rt],u=[];function p(t,e){return t[8].styledText?0:1}function d(...e){return t[7](t[8],...e)}return n=p(t),s=u[n]=c[n](t),{c(){e=y("p"),s.c(),r=w(),C(e,"style",o=t[3](t[8])),C(e,"data-sub-style",l=t[8].style),C(e,"title","click to search this phrase on Jisho.org"),C(e,"class","svelte-1w98obp")},m(t,s){b(t,e,s),u[n].m(e,null),g(e,r),i=!0,a=S(e,"click",d)},p(a,d){let f=n;n=p(t=a),n===f?u[n].p(t,d):(et(),rt(u[f],1,1,()=>{u[f]=null}),nt(),s=u[n],s||(s=u[n]=c[n](t),s.c()),st(s,1),s.m(e,r)),(!i||1&d&&o!==(o=t[3](t[8])))&&C(e,"style",o),(!i||1&d&&l!==(l=t[8].style))&&C(e,"data-sub-style",l)},i(t){i||(st(s),i=!0)},o(t){rt(s),i=!1},d(t){t&&m(e),u[n].d(),a()}}}function Pt(t){let e,n,s=t[1]&&Tt(t);return{c(){e=y("div"),s&&s.c(),C(e,"class","subtitles")},m(t,r){b(t,e,r),s&&s.m(e,null),n=!0},p(t,[n]){t[1]?s?(s.p(t,n),st(s,1)):(s=Tt(t),s.c(),st(s,1),s.m(e,null)):s&&(et(),rt(s,1,1,()=>{s=null}),nt())},i(t){n||(st(s),n=!0)},o(t){rt(s),n=!1},d(t){t&&m(e),s&&s.d()}}}function Ft(t){return t.fontScaled?`font-size: ${window.innerHeight>t.fontScalingThreshold?t.fontMax:t.fontScaled}`:""}function Nt(t){return t.filter(t=>!!t).join(";")}function zt(t){return Nt([t.inline,Ft(t)])}function Bt(t,e,n){let{current:s=[]}=e,{styles:r={}}=e,{format:o=""}=e,{visible:l=!0}=e;const i=N();function a(t){i("define-pauser"),window.open(`https://jisho.org/search/${encodeURIComponent(t.trim())}`)}return t.$set=t=>{"current"in t&&n(0,s=t.current),"styles"in t&&n(4,r=t.styles),"format"in t&&n(5,o=t.format),"visible"in t&&n(1,l=t.visible)},[s,l,a,function(t){return"srt"===o?`font-size: ${1.5+1.5*(t.line?t.line:1)}rem; text-shadow: -4px -4px 0px rgba(9, 9, 9, 255), -4px -3px 0px rgba(9, 9, 9, 255), -4px -2px 0px rgba(9, 9, 9, 255), -4px -1px 0px rgba(9, 9, 9, 255), -4px 0px 0px rgba(9, 9, 9, 255), -4px 1px 0px rgba(9, 9, 9, 255), -4px 2px 0px rgba(9, 9, 9, 255), -4px 3px 0px rgba(9, 9, 9, 255), -4px 4px 0px rgba(9, 9, 9, 255), -3px -4px 0px rgba(9, 9, 9, 255), -3px -3px 0px rgba(9, 9, 9, 255), -3px -2px 0px rgba(9, 9, 9, 255), -3px -1px 0px rgba(9, 9, 9, 255), -3px 0px 0px rgba(9, 9, 9, 255), -3px 1px 0px rgba(9, 9, 9, 255), -3px 2px 0px rgba(9, 9, 9, 255), -3px 3px 0px rgba(9, 9, 9, 255), -3px 4px 0px rgba(9, 9, 9, 255), -2px -4px 0px rgba(9, 9, 9, 255), -2px -3px 0px rgba(9, 9, 9, 255), -2px -2px 0px rgba(9, 9, 9, 255), -2px -1px 0px rgba(9, 9, 9, 255), -2px 0px 0px rgba(9, 9, 9, 255), -2px 1px 0px rgba(9, 9, 9, 255), -2px 2px 0px rgba(9, 9, 9, 255), -2px 3px 0px rgba(9, 9, 9, 255), -2px 4px 0px rgba(9, 9, 9, 255), -1px -4px 0px rgba(9, 9, 9, 255), -1px -3px 0px rgba(9, 9, 9, 255), -1px -2px 0px rgba(9, 9, 9, 255), -1px -1px 0px rgba(9, 9, 9, 255), -1px 0px 0px rgba(9, 9, 9, 255), -1px 1px 0px rgba(9, 9, 9, 255), -1px 2px 0px rgba(9, 9, 9, 255), -1px 3px 0px rgba(9, 9, 9, 255), -1px 4px 0px rgba(9, 9, 9, 255), 0px -4px 0px rgba(9, 9, 9, 255), 0px -3px 0px rgba(9, 9, 9, 255), 0px -2px 0px rgba(9, 9, 9, 255), 0px -1px 0px rgba(9, 9, 9, 255), 0px 0px 0px rgba(9, 9, 9, 255), 0px 1px 0px rgba(9, 9, 9, 255), 0px 2px 0px rgba(9, 9, 9, 255), 0px 3px 0px rgba(9, 9, 9, 255), 0px 4px 0px rgba(9, 9, 9, 255), 1px -4px 0px rgba(9, 9, 9, 255), 1px -3px 0px rgba(9, 9, 9, 255), 1px -2px 0px rgba(9, 9, 9, 255), 1px -1px 0px rgba(9, 9, 9, 255), 1px 0px 0px rgba(9, 9, 9, 255), 1px 1px 0px rgba(9, 9, 9, 255), 1px 2px 0px rgba(9, 9, 9, 255), 1px 3px 0px rgba(9, 9, 9, 255), 1px 4px 0px rgba(9, 9, 9, 255), 2px -4px 0px rgba(9, 9, 9, 255), 2px -3px 0px rgba(9, 9, 9, 255), 2px -2px 0px rgba(9, 9, 9, 255), 2px -1px 0px rgba(9, 9, 9, 255), 2px 0px 0px rgba(9, 9, 9, 255), 2px 1px 0px rgba(9, 9, 9, 255), 2px 2px 0px rgba(9, 9, 9, 255), 2px 3px 0px rgba(9, 9, 9, 255), 2px 4px 0px rgba(9, 9, 9, 255), 3px -4px 0px rgba(9, 9, 9, 255), 3px -3px 0px rgba(9, 9, 9, 255), 3px -2px 0px rgba(9, 9, 9, 255), 3px -1px 0px rgba(9, 9, 9, 255), 3px 0px 0px rgba(9, 9, 9, 255), 3px 1px 0px rgba(9, 9, 9, 255), 3px 2px 0px rgba(9, 9, 9, 255), 3px 3px 0px rgba(9, 9, 9, 255), 3px 4px 0px rgba(9, 9, 9, 255), 4px -4px 0px rgba(9, 9, 9, 255), 4px -3px 0px rgba(9, 9, 9, 255), 4px -2px 0px rgba(9, 9, 9, 255), 4px -1px 0px rgba(9, 9, 9, 255), 4px 0px 0px rgba(9, 9, 9, 255), 4px 1px 0px rgba(9, 9, 9, 255), 4px 2px 0px rgba(9, 9, 9, 255), 4px 3px 0px rgba(9, 9, 9, 255), 4px 4px 0px rgba(9, 9, 9, 255), 2px 2px 0px rgba(20, 20, 20, 195)`:"ass"===o&&t.style in r?Nt([r[t.style].inline,Ft(r[t.style]),t.inline||"",Ft(t)]):void 0},r,o,i,t=>a(t.text)]}var Lt=class extends ht{constructor(t){var e;super(),document.getElementById("svelte-1w98obp-style")||((e=y("style")).id="svelte-1w98obp-style",e.textContent="p.svelte-1w98obp{cursor:pointer;color:white;margin:0;padding:0;white-space:pre}p.svelte-1w98obp:hover{color:#0aff8c !important}",g(document.head,e)),xt(this,t,Bt,Pt,c,{current:0,styles:4,format:5,visible:1})}};class qt{constructor(){this.video=null,this.reasons=[]}setVideo(t){this.reasons=[],this.video=t}addPauser(t){this.reasons.push(t),this._checkPause()}removePauser(t){const e=this.reasons.indexOf(t);-1!==e&&(this.reasons.splice(e,1),this._checkPause())}_checkPause(){this.reasons.length?this.video.pause():this.video.play()}}var Dt=n(1),Ht=n.n(Dt),Vt=n(0),Ut=n.n(Vt);class Jt extends Ut.a{constructor(t,e){super("srt",e);const n=t.replace(/\r/g,"").split("\n\n");this.subs=n.reduce((t,e)=>{let n=e.trim().split("\n");function s(){n.shift()}try{/^\d*$/.test(n[0])&&s();let[e,r]=n[0].replace(/,/g,".").match(/^([\d:\.\-> ]*)/)[0].split(/\-\->/),o=n[0].match(/([a-zA-Z].*)/);o=o&&o.length?o[1]:"";const l=(t=>{const e=o.match(new RegExp(`${t}:([\\d\\.]*)%`));if(e)return parseInt(e[1],10)/100})("line")||1;s(),t.push({start:this.timeToMs(e),end:this.timeToMs(r),text:n.join("\n").replace(/<\/?c.Japanese>/g,""),line:l})}catch(t){}return t},[])}serialize(){return JSON.stringify(this.subs,null,4)}debugInfo(){return[{title:"Number of subtitles",detail:this.subs.length}]}}function Yt(t){let e,n,r,o,l,a,c;return{c(){e=y("div"),n=y("button"),n.textContent="⨯ Skip Subtitling For This Episode",r=w(),o=y("label"),o.textContent="≡ Select a subtitle file to begin",l=w(),a=y("input"),C(n,"class","small-button svelte-1n5tabm"),C(o,"for","srt-upload"),C(o,"class","svelte-1n5tabm"),C(a,"type","file"),C(a,"id","srt-upload"),C(a,"accept",".srt,.ass,.ssa"),C(a,"class","svelte-1n5tabm"),C(e,"class","column svelte-1n5tabm")},m(s,i){b(s,e,i),g(e,n),g(e,r),g(e,o),g(e,l),g(e,a),c=[S(n,"click",t[1]),S(a,"change",t[0])]},p:s,i:s,o:s,d(t){t&&m(e),i(c)}}}function Gt(t){const e=N();return[function(t){const n=t.target.files[0],s=new FileReader;s.onload=t=>{const s={ass:Ht.a,ssa:Ht.a,srt:Jt},[r,o]=n.name.match(/\.(\w{3})$/);e("subtitles-loaded",new s[o](t.target.result,n.name))},s.readAsText(n)},function(){e("cancel")}]}var Wt=class extends ht{constructor(t){var e;super(),document.getElementById("svelte-1n5tabm-style")||((e=y("style")).id="svelte-1n5tabm-style",e.textContent=".column.svelte-1n5tabm.svelte-1n5tabm{display:flex;flex-direction:column}.column.svelte-1n5tabm>.svelte-1n5tabm{align-self:center;margin:0.5rem}label.svelte-1n5tabm.svelte-1n5tabm{background:#fd0;border:none;cursor:pointer;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase;display:inline-block;font-size:1.2rem}label.svelte-1n5tabm.svelte-1n5tabm:hover{background:#ffea6d}input.svelte-1n5tabm.svelte-1n5tabm{display:none}",g(document.head,e)),xt(this,t,Gt,Yt,c,{})}};const{document:Xt}=at;function Zt(t){let e,n,r,o,l,a,c,u,p,d,f,x,h,v,k,j,_=t[0].text+"",O="number"==typeof t[3]&&function(t){let e,n,r,o,l,i,a,c=t[4]()+"";return{c(){e=y("button"),n=$("Use the last alignment for "),r=y("span"),r.textContent=`${t[2]}`,o=$(" ("),l=$(c),i=$(")"),C(r,"class","show-name svelte-n31nxo"),C(e,"class","svelte-n31nxo")},m(s,c){b(s,e,c),g(e,n),g(e,r),g(e,o),g(e,l),g(e,i),a=S(e,"click",t[5])},p:s,d(t){t&&m(e),a()}}}(t);return{c(){e=y("div"),n=y("button"),n.textContent="↺ Reselect Subtitles",r=w(),o=y("div"),O&&O.c(),l=w(),a=y("button"),a.innerHTML="No alignment adjustment<br>(use when you know the subtitles are timed properly)",c=w(),u=y("button"),u.textContent="Enter alignment manually",p=w(),d=y("button"),f=$("⇌ Click when the first line is said:\n\t\t"),x=y("br"),h=w(),v=y("pre"),k=$(_),C(n,"class","small-button svelte-n31nxo"),C(a,"class","svelte-n31nxo"),C(u,"class","svelte-n31nxo"),C(o,"class","row svelte-n31nxo"),C(d,"class","svelte-n31nxo"),C(e,"class","alignment-buttons svelte-n31nxo")},m(s,i){b(s,e,i),g(e,n),g(e,r),g(e,o),O&&O.m(o,null),g(o,l),g(o,a),g(o,c),g(o,u),g(e,p),g(e,d),g(d,f),g(d,x),g(d,h),g(d,v),g(v,k),j=[S(n,"click",t[11]),S(a,"click",t[12]),S(u,"click",t[6]),S(d,"click",t[7])]},p(t,[e]){"number"==typeof t[3]&&O.p(t,e),1&e&&_!==(_=t[0].text+"")&&E(k,_)},i:s,o:s,d(t){t&&m(e),O&&O.d(),i(j)}}}function Kt(t,e,n){let{firstSubtitle:s={}}=e;const r=N(),o=document.querySelector(".video-title"),l=o?o.textContent:"",i=`last-used-alignment-${l}`,a=parseInt(GM_getValue(i),10),c=(a/1e3).toFixed(1);function u(t){const e=document.querySelector("video"),n="number"==typeof t?t:1e3*e.currentTime-s.start-400;GM_setValue(i,n),r("set-align",n)}return t.$set=t=>{"firstSubtitle"in t&&n(0,s=t.firstSubtitle)},[s,r,l,a,function(){return 0===a?"no adjustment":a>0?`subtitles delayed by ${c} seconds`:`subtitles hastened by ${Math.abs(c)} seconds`},function(){u(a)},function(){const t=parseFloat(prompt("Enter an alignment in seconds. Positive numbers are for when the subtitles need to be delayed (subtitle file starts too soon). \nNegative numbers will play the subtitles earlier (subtitle file is too late).",c||""));isNaN(t)||u(1e3*t)},u,o,i,c,()=>r("reselect"),()=>u(0)]}var Qt=class extends ht{constructor(t){var e;super(),Xt.getElementById("svelte-n31nxo-style")||((e=y("style")).id="svelte-n31nxo-style",e.textContent=".alignment-buttons.svelte-n31nxo.svelte-n31nxo{display:flex;flex-direction:column}.alignment-buttons.svelte-n31nxo button.svelte-n31nxo{margin:0.5rem;align-self:center}.row.svelte-n31nxo.svelte-n31nxo{display:flex;flex-direction:row;justify-content:center}.row.svelte-n31nxo button.svelte-n31nxo{max-width:15rem}.show-name.svelte-n31nxo.svelte-n31nxo{font-style:italic}",g(Xt.head,e)),xt(this,t,Kt,Zt,c,{firstSubtitle:0})}};const{document:te}=at;function ee(t){let e;const n=new jt({props:{mode:"cancelled"}});return n.$on("restart",t[7]),{c(){pt(n.$$.fragment)},m(t,s){dt(n,t,s),e=!0},p:s,i(t){e||(st(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function ne(t){let e,n;const s=new Lt({props:{format:t[2].format,styles:t[2].styles,current:t[1],currentTime:t[6],visible:t[5]}});s.$on("define-pauser",t[11]);const r=new jt({props:{recentSubs:t[4],subtitles:t[2],alignment:t[3]}});return r.$on("restart",t[7]),r.$on("tray-pauser",t[10]),r.$on("define-pauser",t[11]),r.$on("realign",t[19]),r.$on("show-subs",t[20]),{c(){pt(s.$$.fragment),e=w(),pt(r.$$.fragment)},m(t,o){dt(s,t,o),b(t,e,o),dt(r,t,o),n=!0},p(t,e){const n={};4&e&&(n.format=t[2].format),4&e&&(n.styles=t[2].styles),2&e&&(n.current=t[1]),32&e&&(n.visible=t[5]),s.$set(n);const o={};16&e&&(o.recentSubs=t[4]),4&e&&(o.subtitles=t[2]),8&e&&(o.alignment=t[3]),r.$set(o)},i(t){n||(st(s.$$.fragment,t),st(r.$$.fragment,t),n=!0)},o(t){rt(s.$$.fragment,t),rt(r.$$.fragment,t),n=!1},d(t){ft(s,t),t&&m(e),ft(r,t)}}}function se(t){let e;const n=new Qt({props:{firstSubtitle:t[2].firstSubtitle()}});return n.$on("set-align",t[8]),n.$on("reselect",t[18]),{c(){pt(n.$$.fragment)},m(t,s){dt(n,t,s),e=!0},p(t,e){const s={};4&e&&(s.firstSubtitle=t[2].firstSubtitle()),n.$set(s)},i(t){e||(st(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function re(t){let e;const n=new Wt({});return n.$on("subtitles-loaded",t[9]),n.$on("cancel",t[17]),{c(){pt(n.$$.fragment)},m(t,s){dt(n,t,s),e=!0},p:s,i(t){e||(st(n.$$.fragment,t),e=!0)},o(t){rt(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function oe(t){let e,n,s,r;const o=[re,se,ne,ee],l=[];function i(t,e){return"prompt"===t[0]?0:"align"===t[0]?1:"play"===t[0]?2:"cancelled"===t[0]?3:-1}return~(n=i(t))&&(s=l[n]=o[n](t)),{c(){e=y("div"),s&&s.c(),C(e,"class","subtitles-app svelte-1noo31a")},m(t,s){b(t,e,s),~n&&l[n].m(e,null),r=!0},p(t,[r]){let a=n;n=i(t),n===a?~n&&l[n].p(t,r):(s&&(et(),rt(l[a],1,1,()=>{l[a]=null}),nt()),~n?(s=l[n],s||(s=l[n]=o[n](t),s.c()),st(s,1),s.m(e,null)):s=null)},i(t){r||(st(s),r=!0)},o(t){rt(s),r=!1},d(t){t&&m(e),~n&&l[n].d()}}}function le(t,e,n){const s=new qt;let r="prompt",o=[],l=null,i=null,a=-1,c=[],u=!0;function p(){n(0,r="prompt"),n(2,l=null),n(1,o=[])}var d;function f(t){let e=t[t.length-1],s=c[c.length-1];!e||s&&e.text===s.text||n(4,c=[...c,e]),c.length>10&&n(4,c=c.slice(c.length-10))}function x(){"play"===r&&(n(1,o=l.getSubs(1e3*i.currentTime-a)),f(o),requestAnimationFrame(x))}d=()=>{document.addEventListener("visibilitychange",()=>{document.hidden||s.removePauser("define")});let t="";setInterval(()=>{const e=document.querySelector("video").getAttribute("src");e&&e!==t&&(t=e,p())},50)},F().$$.on_mount.push(d);return[r,o,l,a,c,u,"",p,function(t){i=document.querySelector("video"),s.setVideo(i),n(3,a=t.detail),n(4,c=[]),n(0,r="play"),x()},function(t){n(2,l=t.detail),0===l.subs.length?(console.log("subtitles object failed to parse: ",l),alert(`No subtitles were parsed from the selected .${l.format} file, verify nothing is wrong with the file. If it appears normal please submit a bug report with the episode and the subtitles file you used to the issue tracker!`)):n(0,r="align")},function(t){t.detail?s.addPauser("tray"):s.removePauser("tray")},function(){s.addPauser("define")},i,"last-used-alignment",s,f,x,()=>n(0,r="cancelled"),()=>n(0,r="prompt"),()=>n(0,r="align"),t=>n(5,u=t.detail)]}var ie=class extends ht{constructor(t){var e;super(),te.getElementById("svelte-1noo31a-style")||((e=y("style")).id="svelte-1noo31a-style",e.textContent=".subtitles-app.svelte-1noo31a{position:relative}.subtitles-app.svelte-1noo31a>*{z-index:1000000000}.subtitles-app.svelte-1noo31a button{background:#fd0;border:none;padding:10px;line-height:1;font-weight:bold;color:black;text-transform:uppercase;font-size:0.9rem}.subtitles-app.svelte-1noo31a .small-button{font-size:0.6rem}.subtitles-app.svelte-1noo31a button:disabled{background:#2a3450}.subtitles-app.svelte-1noo31a button:not(:disabled):hover{background:#ffea6d;cursor:pointer}",g(te.head,e)),xt(this,t,le,oe,c,{})}};const ae=document.createElement("div");document.body.appendChild(ae),ae.id="sheodox-vrv-subtitler",ae.style.height="100%",ae.style.width="100%";new ie({target:ae})}]);
