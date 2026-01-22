function Fv(n,a){for(var i=0;i<a.length;i++){const u=a[i];if(typeof u!="string"&&!Array.isArray(u)){for(const s in u)if(s!=="default"&&!(s in n)){const c=Object.getOwnPropertyDescriptor(u,s);c&&Object.defineProperty(n,s,c.get?c:{enumerable:!0,get:()=>u[s]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function i(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(s){if(s.ep)return;s.ep=!0;const c=i(s);fetch(s.href,c)}})();var Hv=Object.defineProperty,Lv=(n,a,i)=>a in n?Hv(n,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[a]=i,g0=(n,a,i)=>(Lv(n,typeof a!="symbol"?a+"":a,i),i),Vv=(n,a,i)=>{if(!a.has(n))throw TypeError("Cannot "+i)},y0=(n,a)=>{if(Object(a)!==a)throw TypeError('Cannot use the "in" operator on this value');return n.has(a)},ds=(n,a,i)=>{if(a.has(n))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(n):a.set(n,i)},fm=(n,a,i)=>(Vv(n,a,"access private method"),i);function Eb(n,a){return Object.is(n,a)}let at=null,Di=!1,_s=1;const Es=Symbol("SIGNAL");function nu(n){const a=at;return at=n,a}function Gv(){return at}function Yv(){return Di}const Cd={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Fs(n){if(Di)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(at===null)return;at.consumerOnSignalRead(n);const a=at.nextProducerIndex++;if(lu(at),a<at.producerNode.length&&at.producerNode[a]!==n&&id(at)){const i=at.producerNode[a];Hs(i,at.producerIndexOfThis[a])}at.producerNode[a]!==n&&(at.producerNode[a]=n,at.producerIndexOfThis[a]=id(at)?Db(n,at,a):0),at.producerLastReadVersion[a]=n.version}function Zv(){_s++}function kb(n){if(!(!n.dirty&&n.lastCleanEpoch===_s)){if(!n.producerMustRecompute(n)&&!Kv(n)){n.dirty=!1,n.lastCleanEpoch=_s;return}n.producerRecomputeValue(n),n.dirty=!1,n.lastCleanEpoch=_s}}function Ab(n){if(n.liveConsumerNode===void 0)return;const a=Di;Di=!0;try{for(const i of n.liveConsumerNode)i.dirty||Qv(i)}finally{Di=a}}function Xv(){return at?.consumerAllowSignalWrites!==!1}function Qv(n){var a;n.dirty=!0,Ab(n),(a=n.consumerMarkedDirty)==null||a.call(n.wrapper??n)}function Iv(n){return n&&(n.nextProducerIndex=0),nu(n)}function Jv(n,a){if(nu(a),!(!n||n.producerNode===void 0||n.producerIndexOfThis===void 0||n.producerLastReadVersion===void 0)){if(id(n))for(let i=n.nextProducerIndex;i<n.producerNode.length;i++)Hs(n.producerNode[i],n.producerIndexOfThis[i]);for(;n.producerNode.length>n.nextProducerIndex;)n.producerNode.pop(),n.producerLastReadVersion.pop(),n.producerIndexOfThis.pop()}}function Kv(n){lu(n);for(let a=0;a<n.producerNode.length;a++){const i=n.producerNode[a],u=n.producerLastReadVersion[a];if(u!==i.version||(kb(i),u!==i.version))return!0}return!1}function Db(n,a,i){var u;if(Ed(n),lu(n),n.liveConsumerNode.length===0){(u=n.watched)==null||u.call(n.wrapper);for(let s=0;s<n.producerNode.length;s++)n.producerIndexOfThis[s]=Db(n.producerNode[s],n,s)}return n.liveConsumerIndexOfThis.push(i),n.liveConsumerNode.push(a)-1}function Hs(n,a){var i;if(Ed(n),lu(n),typeof ngDevMode<"u"&&ngDevMode&&a>=n.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${a} is out of bounds of ${n.liveConsumerNode.length} consumers)`);if(n.liveConsumerNode.length===1){(i=n.unwatched)==null||i.call(n.wrapper);for(let s=0;s<n.producerNode.length;s++)Hs(n.producerNode[s],n.producerIndexOfThis[s])}const u=n.liveConsumerNode.length-1;if(n.liveConsumerNode[a]=n.liveConsumerNode[u],n.liveConsumerIndexOfThis[a]=n.liveConsumerIndexOfThis[u],n.liveConsumerNode.length--,n.liveConsumerIndexOfThis.length--,a<n.liveConsumerNode.length){const s=n.liveConsumerIndexOfThis[a],c=n.liveConsumerNode[a];lu(c),c.producerIndexOfThis[s]=a}}function id(n){var a;return n.consumerIsAlwaysLive||(((a=n?.liveConsumerNode)==null?void 0:a.length)??0)>0}function lu(n){n.producerNode??(n.producerNode=[]),n.producerIndexOfThis??(n.producerIndexOfThis=[]),n.producerLastReadVersion??(n.producerLastReadVersion=[])}function Ed(n){n.liveConsumerNode??(n.liveConsumerNode=[]),n.liveConsumerIndexOfThis??(n.liveConsumerIndexOfThis=[])}function Tb(n){if(kb(n),Fs(n),n.value===ld)throw n.error;return n.value}function Wv(n){const a=Object.create(Pv);a.computation=n;const i=()=>Tb(a);return i[Es]=a,i}const v0=Symbol("UNSET"),_0=Symbol("COMPUTING"),ld=Symbol("ERRORED"),Pv={...Cd,value:v0,dirty:!0,error:null,equal:Eb,producerMustRecompute(n){return n.value===v0||n.value===_0},producerRecomputeValue(n){if(n.value===_0)throw new Error("Detected cycle in computations.");const a=n.value;n.value=_0;const i=Iv(n);let u,s=!1;try{u=n.computation.call(n.wrapper),s=a!==v0&&a!==ld&&n.equal.call(n.wrapper,a,u)}catch(c){u=ld,n.error=c}finally{Jv(n,i)}if(s){n.value=a;return}n.value=u,n.version++}};function e3(){throw new Error}let t3=e3;function n3(){t3()}function a3(n){const a=Object.create(i3);a.value=n;const i=()=>(Fs(a),a.value);return i[Es]=a,i}function r3(){return Fs(this),this.value}function u3(n,a){Xv()||n3(),n.equal.call(n.wrapper,n.value,a)||(n.value=a,l3(n))}const i3={...Cd,equal:Eb,value:void 0};function l3(n){n.version++,Zv(),Ab(n)}const xt=Symbol("node");var lr;(n=>{var a,i,u,s;class c{constructor(b,m={}){ds(this,i),g0(this,a);const p=a3(b)[Es];if(this[xt]=p,p.wrapper=this,m){const _=m.equals;_&&(p.equal=_),p.watched=m[n.subtle.watched],p.unwatched=m[n.subtle.unwatched]}}get(){if(!(0,n.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return r3.call(this[xt])}set(b){if(!(0,n.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(Yv())throw new Error("Writes to signals not permitted during Watcher callback");const m=this[xt];u3(m,b)}}a=xt,i=new WeakSet,n.isState=h=>typeof h=="object"&&y0(i,h),n.State=c;class f{constructor(b,m){ds(this,s),g0(this,u);const p=Wv(b)[Es];if(p.consumerAllowSignalWrites=!0,this[xt]=p,p.wrapper=this,m){const _=m.equals;_&&(p.equal=_),p.watched=m[n.subtle.watched],p.unwatched=m[n.subtle.unwatched]}}get(){if(!(0,n.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return Tb(this[xt])}}u=xt,s=new WeakSet,n.isComputed=h=>typeof h=="object"&&y0(s,h),n.Computed=f,(h=>{var b,m,y,p;function _(R){let z,$=null;try{$=nu(null),z=R()}finally{nu($)}return z}h.untrack=_;function x(R){var z;if(!(0,n.isComputed)(R)&&!(0,n.isWatcher)(R))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((z=R[xt].producerNode)==null?void 0:z.map($=>$.wrapper))??[]}h.introspectSources=x;function v(R){var z;if(!(0,n.isComputed)(R)&&!(0,n.isState)(R))throw new TypeError("Called introspectSinks without a Signal argument");return((z=R[xt].liveConsumerNode)==null?void 0:z.map($=>$.wrapper))??[]}h.introspectSinks=v;function w(R){if(!(0,n.isComputed)(R)&&!(0,n.isState)(R))throw new TypeError("Called hasSinks without a Signal argument");const z=R[xt].liveConsumerNode;return z?z.length>0:!1}h.hasSinks=w;function C(R){if(!(0,n.isComputed)(R)&&!(0,n.isWatcher)(R))throw new TypeError("Called hasSources without a Computed or Watcher argument");const z=R[xt].producerNode;return z?z.length>0:!1}h.hasSources=C;class E{constructor(z){ds(this,m),ds(this,y),g0(this,b);let $=Object.create(Cd);$.wrapper=this,$.consumerMarkedDirty=z,$.consumerIsAlwaysLive=!0,$.consumerAllowSignalWrites=!1,$.producerNode=[],this[xt]=$}watch(...z){if(!(0,n.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");fm(this,y,p).call(this,z);const $=this[xt];$.dirty=!1;const Y=nu($);for(const K of z)Fs(K[xt]);nu(Y)}unwatch(...z){if(!(0,n.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");fm(this,y,p).call(this,z);const $=this[xt];lu($);for(let Y=$.producerNode.length-1;Y>=0;Y--)if(z.includes($.producerNode[Y].wrapper)){Hs($.producerNode[Y],$.producerIndexOfThis[Y]);const K=$.producerNode.length-1;if($.producerNode[Y]=$.producerNode[K],$.producerIndexOfThis[Y]=$.producerIndexOfThis[K],$.producerNode.length--,$.producerIndexOfThis.length--,$.nextProducerIndex--,Y<$.producerNode.length){const ce=$.producerIndexOfThis[Y],we=$.producerNode[Y];Ed(we),we.liveConsumerIndexOfThis[ce]=Y}}}getPending(){if(!(0,n.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[xt].producerNode.filter($=>$.dirty).map($=>$.wrapper)}}b=xt,m=new WeakSet,y=new WeakSet,p=function(R){for(const z of R)if(!(0,n.isComputed)(z)&&!(0,n.isState)(z))throw new TypeError("Called watch/unwatch without a Computed or State argument")},n.isWatcher=R=>y0(m,R),h.Watcher=E;function q(){var R;return(R=Gv())==null?void 0:R.wrapper}h.currentComputed=q,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(n.subtle||(n.subtle={}))})(lr||(lr={}));const s3=Symbol("SignalWatcherBrand"),o3=new FinalizationRegistry((({watcher:n,signal:a})=>{n.unwatch(a)})),hm=new WeakMap;function c3(n){return n[s3]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),n):class extends n{constructor(){super(...arguments),this._$St=new lr.State(0),this._$Si=!1,this._$So=!0,this._$Sh=new Set}_$Sl(){if(this._$Su!==void 0)return;this._$Sv=new lr.Computed((()=>{this._$St.get(),super.performUpdate()}));const a=this._$Su=new lr.subtle.Watcher((function(){const i=hm.get(this);i!==void 0&&(i._$Si===!1&&i.requestUpdate(),this.watch())}));hm.set(a,this),o3.register(this,{watcher:a,signal:this._$Sv}),a.watch(this._$Sv)}_$Sp(){this._$Su!==void 0&&(this._$Su.unwatch(this._$Sv),this._$Sv=void 0,this._$Su=void 0)}performUpdate(){this.isUpdatePending&&(this._$Sl(),this._$Si=!0,this._$St.set(this._$St.get()+1),this._$Si=!1,this._$Sv.get())}update(a){try{this._$So?(this._$So=!1,super.update(a)):this._$Sh.forEach((i=>i.commit()))}finally{this.isUpdatePending=!1,this._$Sh.clear()}}requestUpdate(a,i,u){this._$So=!0,super.requestUpdate(a,i,u)}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask((()=>{this.isConnected===!1&&this._$Sp()}))}_(a){this._$Sh.add(a);const i=this._$So;this.requestUpdate(),this._$So=i}m(a){this._$Sh.delete(a)}}}const Li={ATTRIBUTE:1,CHILD:2},fu=n=>(...a)=>({_$litDirective$:n,values:a});let hu=class{constructor(a){}get _$AU(){return this._$AM._$AU}_$AT(a,i,u){this._$Ct=a,this._$AM=i,this._$Ci=u}_$AS(a,i){return this.update(a,i)}update(a,i){return this.render(...i)}};const kd=globalThis,ks=kd.trustedTypes,pm=ks?ks.createPolicy("lit-html",{createHTML:n=>n}):void 0,zb="$lit$",ka=`lit$${Math.random().toFixed(9).slice(2)}$`,$b="?"+ka,d3=`<${$b}>`,or=document,Ri=()=>or.createComment(""),ji=n=>n===null||typeof n!="object"&&typeof n!="function",Ad=Array.isArray,f3=n=>Ad(n)||typeof n?.[Symbol.iterator]=="function",x0=`[ 	
\f\r]`,fi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mm=/-->/g,bm=/>/g,Ka=RegExp(`>|${x0}(?:([^\\s"'>=/]+)(${x0}*=${x0}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gm=/'/g,ym=/"/g,Ob=/^(?:script|style|textarea|title)$/i,h3=n=>(a,...i)=>({_$litType$:n,strings:a,values:i}),G=h3(1),pn=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),vm=new WeakMap,ur=or.createTreeWalker(or,129);function Mb(n,a){if(!Ad(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return pm!==void 0?pm.createHTML(a):a}const p3=(n,a)=>{const i=n.length-1,u=[];let s,c=a===2?"<svg>":a===3?"<math>":"",f=fi;for(let h=0;h<i;h++){const b=n[h];let m,y,p=-1,_=0;for(;_<b.length&&(f.lastIndex=_,y=f.exec(b),y!==null);)_=f.lastIndex,f===fi?y[1]==="!--"?f=mm:y[1]!==void 0?f=bm:y[2]!==void 0?(Ob.test(y[2])&&(s=RegExp("</"+y[2],"g")),f=Ka):y[3]!==void 0&&(f=Ka):f===Ka?y[0]===">"?(f=s??fi,p=-1):y[1]===void 0?p=-2:(p=f.lastIndex-y[2].length,m=y[1],f=y[3]===void 0?Ka:y[3]==='"'?ym:gm):f===ym||f===gm?f=Ka:f===mm||f===bm?f=fi:(f=Ka,s=void 0);const x=f===Ka&&n[h+1].startsWith("/>")?" ":"";c+=f===fi?b+d3:p>=0?(u.push(m),b.slice(0,p)+zb+b.slice(p)+ka+x):b+ka+(p===-2?h:x)}return[Mb(n,c+(n[i]||"<?>")+(a===2?"</svg>":a===3?"</math>":"")),u]};class Ui{constructor({strings:a,_$litType$:i},u){let s;this.parts=[];let c=0,f=0;const h=a.length-1,b=this.parts,[m,y]=p3(a,i);if(this.el=Ui.createElement(m,u),ur.currentNode=this.el.content,i===2||i===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=ur.nextNode())!==null&&b.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(zb)){const _=y[f++],x=s.getAttribute(p).split(ka),v=/([.?@])?(.*)/.exec(_);b.push({type:1,index:c,name:v[2],strings:x,ctor:v[1]==="."?b3:v[1]==="?"?g3:v[1]==="@"?y3:Ls}),s.removeAttribute(p)}else p.startsWith(ka)&&(b.push({type:6,index:c}),s.removeAttribute(p));if(Ob.test(s.tagName)){const p=s.textContent.split(ka),_=p.length-1;if(_>0){s.textContent=ks?ks.emptyScript:"";for(let x=0;x<_;x++)s.append(p[x],Ri()),ur.nextNode(),b.push({type:2,index:++c});s.append(p[_],Ri())}}}else if(s.nodeType===8)if(s.data===$b)b.push({type:2,index:c});else{let p=-1;for(;(p=s.data.indexOf(ka,p+1))!==-1;)b.push({type:7,index:c}),p+=ka.length-1}c++}}static createElement(a,i){const u=or.createElement("template");return u.innerHTML=a,u}}function su(n,a,i=n,u){if(a===pn)return a;let s=u!==void 0?i._$Co?.[u]:i._$Cl;const c=ji(a)?void 0:a._$litDirective$;return s?.constructor!==c&&(s?._$AO?.(!1),c===void 0?s=void 0:(s=new c(n),s._$AT(n,i,u)),u!==void 0?(i._$Co??=[])[u]=s:i._$Cl=s),s!==void 0&&(a=su(n,s._$AS(n,a.values),s,u)),a}let m3=class{constructor(a,i){this._$AV=[],this._$AN=void 0,this._$AD=a,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(a){const{el:{content:i},parts:u}=this._$AD,s=(a?.creationScope??or).importNode(i,!0);ur.currentNode=s;let c=ur.nextNode(),f=0,h=0,b=u[0];for(;b!==void 0;){if(f===b.index){let m;b.type===2?m=new pu(c,c.nextSibling,this,a):b.type===1?m=new b.ctor(c,b.name,b.strings,this,a):b.type===6&&(m=new v3(c,this,a)),this._$AV.push(m),b=u[++h]}f!==b?.index&&(c=ur.nextNode(),f++)}return ur.currentNode=or,s}p(a){let i=0;for(const u of this._$AV)u!==void 0&&(u.strings!==void 0?(u._$AI(a,u,i),i+=u.strings.length-2):u._$AI(a[i])),i++}};class pu{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(a,i,u,s){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=a,this._$AB=i,this._$AM=u,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let a=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&a?.nodeType===11&&(a=i.parentNode),a}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(a,i=this){a=su(this,a,i),ji(a)?a===I||a==null||a===""?(this._$AH!==I&&this._$AR(),this._$AH=I):a!==this._$AH&&a!==pn&&this._(a):a._$litType$!==void 0?this.$(a):a.nodeType!==void 0?this.T(a):f3(a)?this.k(a):this._(a)}O(a){return this._$AA.parentNode.insertBefore(a,this._$AB)}T(a){this._$AH!==a&&(this._$AR(),this._$AH=this.O(a))}_(a){this._$AH!==I&&ji(this._$AH)?this._$AA.nextSibling.data=a:this.T(or.createTextNode(a)),this._$AH=a}$(a){const{values:i,_$litType$:u}=a,s=typeof u=="number"?this._$AC(a):(u.el===void 0&&(u.el=Ui.createElement(Mb(u.h,u.h[0]),this.options)),u);if(this._$AH?._$AD===s)this._$AH.p(i);else{const c=new m3(s,this),f=c.u(this.options);c.p(i),this.T(f),this._$AH=c}}_$AC(a){let i=vm.get(a.strings);return i===void 0&&vm.set(a.strings,i=new Ui(a)),i}k(a){Ad(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let u,s=0;for(const c of a)s===i.length?i.push(u=new pu(this.O(Ri()),this.O(Ri()),this,this.options)):u=i[s],u._$AI(c),s++;s<i.length&&(this._$AR(u&&u._$AB.nextSibling,s),i.length=s)}_$AR(a=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);a!==this._$AB;){const u=a.nextSibling;a.remove(),a=u}}setConnected(a){this._$AM===void 0&&(this._$Cv=a,this._$AP?.(a))}}class Ls{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(a,i,u,s,c){this.type=1,this._$AH=I,this._$AN=void 0,this.element=a,this.name=i,this._$AM=s,this.options=c,u.length>2||u[0]!==""||u[1]!==""?(this._$AH=Array(u.length-1).fill(new String),this.strings=u):this._$AH=I}_$AI(a,i=this,u,s){const c=this.strings;let f=!1;if(c===void 0)a=su(this,a,i,0),f=!ji(a)||a!==this._$AH&&a!==pn,f&&(this._$AH=a);else{const h=a;let b,m;for(a=c[0],b=0;b<c.length-1;b++)m=su(this,h[u+b],i,b),m===pn&&(m=this._$AH[b]),f||=!ji(m)||m!==this._$AH[b],m===I?a=I:a!==I&&(a+=(m??"")+c[b+1]),this._$AH[b]=m}f&&!s&&this.j(a)}j(a){a===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,a??"")}}class b3 extends Ls{constructor(){super(...arguments),this.type=3}j(a){this.element[this.name]=a===I?void 0:a}}class g3 extends Ls{constructor(){super(...arguments),this.type=4}j(a){this.element.toggleAttribute(this.name,!!a&&a!==I)}}class y3 extends Ls{constructor(a,i,u,s,c){super(a,i,u,s,c),this.type=5}_$AI(a,i=this){if((a=su(this,a,i,0)??I)===pn)return;const u=this._$AH,s=a===I&&u!==I||a.capture!==u.capture||a.once!==u.once||a.passive!==u.passive,c=a!==I&&(u===I||s);s&&this.element.removeEventListener(this.name,this,u),c&&this.element.addEventListener(this.name,this,a),this._$AH=a}handleEvent(a){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,a):this._$AH.handleEvent(a)}}class v3{constructor(a,i,u){this.element=a,this.type=6,this._$AN=void 0,this._$AM=i,this.options=u}get _$AU(){return this._$AM._$AU}_$AI(a){su(this,a)}}const _3={I:pu},x3=kd.litHtmlPolyfillSupport;x3?.(Ui,pu),(kd.litHtmlVersions??=[]).push("3.3.1");const Dd=(n,a,i)=>{const u=i?.renderBefore??a;let s=u._$litPart$;if(s===void 0){const c=i?.renderBefore??null;u._$litPart$=s=new pu(a.insertBefore(Ri(),c),c,void 0,i??{})}return s._$AI(n),s};const{I:w3}=_3,S3=n=>n.strings===void 0,_m=()=>document.createComment(""),hi=(n,a,i)=>{const u=n._$AA.parentNode,s=a===void 0?n._$AB:a._$AA;if(i===void 0){const c=u.insertBefore(_m(),s),f=u.insertBefore(_m(),s);i=new w3(c,f,n,n.options)}else{const c=i._$AB.nextSibling,f=i._$AM,h=f!==n;if(h){let b;i._$AQ?.(n),i._$AM=n,i._$AP!==void 0&&(b=n._$AU)!==f._$AU&&i._$AP(b)}if(c!==s||h){let b=i._$AA;for(;b!==c;){const m=b.nextSibling;u.insertBefore(b,s),b=m}}}return i},Wa=(n,a,i=n)=>(n._$AI(a,i),n),C3={},E3=(n,a=C3)=>n._$AH=a,k3=n=>n._$AH,w0=n=>{n._$AR(),n._$AA.remove()};const Ti=(n,a)=>{const i=n._$AN;if(i===void 0)return!1;for(const u of i)u._$AO?.(a,!1),Ti(u,a);return!0},As=n=>{let a,i;do{if((a=n._$AM)===void 0)break;i=a._$AN,i.delete(n),n=a}while(i?.size===0)},Nb=n=>{for(let a;a=n._$AM;n=a){let i=a._$AN;if(i===void 0)a._$AN=i=new Set;else if(i.has(n))break;i.add(n),T3(a)}};function A3(n){this._$AN!==void 0?(As(this),this._$AM=n,Nb(this)):this._$AM=n}function D3(n,a=!1,i=0){const u=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(a)if(Array.isArray(u))for(let c=i;c<u.length;c++)Ti(u[c],!1),As(u[c]);else u!=null&&(Ti(u,!1),As(u));else Ti(this,n)}const T3=n=>{n.type==Li.CHILD&&(n._$AP??=D3,n._$AQ??=A3)};let z3=class extends hu{constructor(){super(...arguments),this._$AN=void 0}_$AT(a,i,u){super._$AT(a,i,u),Nb(this),this.isConnected=a._$AU}_$AO(a,i=!0){a!==this.isConnected&&(this.isConnected=a,a?this.reconnected?.():this.disconnected?.()),i&&(Ti(this,a),As(this))}setValue(a){if(S3(this._$Ct))this._$Ct._$AI(a,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=a,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}};lr.State;lr.Computed;let $3=class extends Event{constructor(a,i,u,s){super("context-request",{bubbles:!0,composed:!0}),this.context=a,this.contextTarget=i,this.callback=u,this.subscribe=s??!1}};let O3=class{get value(){return this.o}set value(a){this.setValue(a)}setValue(a,i=!1){const u=i||!Object.is(a,this.o);this.o=a,u&&this.updateObservers()}constructor(a){this.subscriptions=new Map,this.updateObservers=()=>{for(const[i,{disposer:u}]of this.subscriptions)i(this.o,u)},a!==void 0&&(this.value=a)}addCallback(a,i,u){if(!u)return void a(this.value);this.subscriptions.has(a)||this.subscriptions.set(a,{disposer:()=>{this.subscriptions.delete(a)},consumerHost:i});const{disposer:s}=this.subscriptions.get(a);a(this.value,s)}clearCallbacks(){this.subscriptions.clear()}};let M3=class extends Event{constructor(a,i){super("context-provider",{bubbles:!0,composed:!0}),this.context=a,this.contextTarget=i}},xm=class extends O3{constructor(a,i,u){super(i.context!==void 0?i.initialValue:u),this.onContextRequest=s=>{if(s.context!==this.context)return;const c=s.contextTarget??s.composedPath()[0];c!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,c,s.subscribe))},this.onProviderRequest=s=>{if(s.context!==this.context||(s.contextTarget??s.composedPath()[0])===this.host)return;const c=new Set;for(const[f,{consumerHost:h}]of this.subscriptions)c.has(f)||(c.add(f),h.dispatchEvent(new $3(this.context,h,f,!0)));s.stopPropagation()},this.host=a,i.context!==void 0?this.context=i.context:this.context=i,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new M3(this.context,this.host))}};function N3({context:n}){return(a,i)=>{const u=new WeakMap;if(typeof i=="object")return{get(){return a.get.call(this)},set(s){return u.get(this).setValue(s),a.set.call(this,s)},init(s){return u.set(this,new xm(this,{context:n,initialValue:s})),s}};{a.constructor.addInitializer((f=>{u.set(f,new xm(f,{context:n}))}));const s=Object.getOwnPropertyDescriptor(a,i);let c;if(s===void 0){const f=new WeakMap;c={get(){return f.get(this)},set(h){u.get(this).setValue(h),f.set(this,h)},configurable:!0,enumerable:!0}}else{const f=s.set;c={...s,set(h){u.get(this).setValue(h),f?.call(this,h)}}}return void Object.defineProperty(a,i,c)}}}const xs=globalThis,Td=xs.ShadowRoot&&(xs.ShadyCSS===void 0||xs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,zd=Symbol(),wm=new WeakMap;let Rb=class{constructor(a,i,u){if(this._$cssResult$=!0,u!==zd)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=a,this.t=i}get styleSheet(){let a=this.o;const i=this.t;if(Td&&a===void 0){const u=i!==void 0&&i.length===1;u&&(a=wm.get(i)),a===void 0&&((this.o=a=new CSSStyleSheet).replaceSync(this.cssText),u&&wm.set(i,a))}return a}toString(){return this.cssText}};const Vi=n=>new Rb(typeof n=="string"?n:n+"",void 0,zd),Ve=(n,...a)=>{const i=n.length===1?n[0]:a.reduce(((u,s,c)=>u+(f=>{if(f._$cssResult$===!0)return f.cssText;if(typeof f=="number")return f;throw Error("Value passed to 'css' function must be a 'css' function result: "+f+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[c+1]),n[0]);return new Rb(i,n,zd)},R3=(n,a)=>{if(Td)n.adoptedStyleSheets=a.map((i=>i instanceof CSSStyleSheet?i:i.styleSheet));else for(const i of a){const u=document.createElement("style"),s=xs.litNonce;s!==void 0&&u.setAttribute("nonce",s),u.textContent=i.cssText,n.appendChild(u)}},Sm=Td?n=>n:n=>n instanceof CSSStyleSheet?(a=>{let i="";for(const u of a.cssRules)i+=u.cssText;return Vi(i)})(n):n;const{is:j3,defineProperty:U3,getOwnPropertyDescriptor:B3,getOwnPropertyNames:q3,getOwnPropertySymbols:F3,getPrototypeOf:H3}=Object,Vs=globalThis,Cm=Vs.trustedTypes,L3=Cm?Cm.emptyScript:"",V3=Vs.reactiveElementPolyfillSupport,zi=(n,a)=>n,Ds={toAttribute(n,a){switch(a){case Boolean:n=n?L3:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,a){let i=n;switch(a){case Boolean:i=n!==null;break;case Number:i=n===null?null:Number(n);break;case Object:case Array:try{i=JSON.parse(n)}catch{i=null}}return i}},$d=(n,a)=>!j3(n,a),Em={attribute:!0,type:String,converter:Ds,reflect:!1,useDefault:!1,hasChanged:$d};Symbol.metadata??=Symbol("metadata"),Vs.litPropertyMetadata??=new WeakMap;class eu extends HTMLElement{static addInitializer(a){this._$Ei(),(this.l??=[]).push(a)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(a,i=Em){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(a)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(a,i),!i.noAccessor){const u=Symbol(),s=this.getPropertyDescriptor(a,u,i);s!==void 0&&U3(this.prototype,a,s)}}static getPropertyDescriptor(a,i,u){const{get:s,set:c}=B3(this.prototype,a)??{get(){return this[i]},set(f){this[i]=f}};return{get:s,set(f){const h=s?.call(this);c?.call(this,f),this.requestUpdate(a,h,u)},configurable:!0,enumerable:!0}}static getPropertyOptions(a){return this.elementProperties.get(a)??Em}static _$Ei(){if(this.hasOwnProperty(zi("elementProperties")))return;const a=H3(this);a.finalize(),a.l!==void 0&&(this.l=[...a.l]),this.elementProperties=new Map(a.elementProperties)}static finalize(){if(this.hasOwnProperty(zi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(zi("properties"))){const i=this.properties,u=[...q3(i),...F3(i)];for(const s of u)this.createProperty(s,i[s])}const a=this[Symbol.metadata];if(a!==null){const i=litPropertyMetadata.get(a);if(i!==void 0)for(const[u,s]of i)this.elementProperties.set(u,s)}this._$Eh=new Map;for(const[i,u]of this.elementProperties){const s=this._$Eu(i,u);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(a){const i=[];if(Array.isArray(a)){const u=new Set(a.flat(1/0).reverse());for(const s of u)i.unshift(Sm(s))}else a!==void 0&&i.push(Sm(a));return i}static _$Eu(a,i){const u=i.attribute;return u===!1?void 0:typeof u=="string"?u:typeof a=="string"?a.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((a=>this.enableUpdating=a)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((a=>a(this)))}addController(a){(this._$EO??=new Set).add(a),this.renderRoot!==void 0&&this.isConnected&&a.hostConnected?.()}removeController(a){this._$EO?.delete(a)}_$E_(){const a=new Map,i=this.constructor.elementProperties;for(const u of i.keys())this.hasOwnProperty(u)&&(a.set(u,this[u]),delete this[u]);a.size>0&&(this._$Ep=a)}createRenderRoot(){const a=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return R3(a,this.constructor.elementStyles),a}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((a=>a.hostConnected?.()))}enableUpdating(a){}disconnectedCallback(){this._$EO?.forEach((a=>a.hostDisconnected?.()))}attributeChangedCallback(a,i,u){this._$AK(a,u)}_$ET(a,i){const u=this.constructor.elementProperties.get(a),s=this.constructor._$Eu(a,u);if(s!==void 0&&u.reflect===!0){const c=(u.converter?.toAttribute!==void 0?u.converter:Ds).toAttribute(i,u.type);this._$Em=a,c==null?this.removeAttribute(s):this.setAttribute(s,c),this._$Em=null}}_$AK(a,i){const u=this.constructor,s=u._$Eh.get(a);if(s!==void 0&&this._$Em!==s){const c=u.getPropertyOptions(s),f=typeof c.converter=="function"?{fromAttribute:c.converter}:c.converter?.fromAttribute!==void 0?c.converter:Ds;this._$Em=s;const h=f.fromAttribute(i,c.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(a,i,u){if(a!==void 0){const s=this.constructor,c=this[a];if(u??=s.getPropertyOptions(a),!((u.hasChanged??$d)(c,i)||u.useDefault&&u.reflect&&c===this._$Ej?.get(a)&&!this.hasAttribute(s._$Eu(a,u))))return;this.C(a,i,u)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(a,i,{useDefault:u,reflect:s,wrapped:c},f){u&&!(this._$Ej??=new Map).has(a)&&(this._$Ej.set(a,f??i??this[a]),c!==!0||f!==void 0)||(this._$AL.has(a)||(this.hasUpdated||u||(i=void 0),this._$AL.set(a,i)),s===!0&&this._$Em!==a&&(this._$Eq??=new Set).add(a))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const a=this.scheduleUpdate();return a!=null&&await a,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,c]of this._$Ep)this[s]=c;this._$Ep=void 0}const u=this.constructor.elementProperties;if(u.size>0)for(const[s,c]of u){const{wrapped:f}=c,h=this[s];f!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,c,h)}}let a=!1;const i=this._$AL;try{a=this.shouldUpdate(i),a?(this.willUpdate(i),this._$EO?.forEach((u=>u.hostUpdate?.())),this.update(i)):this._$EM()}catch(u){throw a=!1,this._$EM(),u}a&&this._$AE(i)}willUpdate(a){}_$AE(a){this._$EO?.forEach((i=>i.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(a)),this.updated(a)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(a){return!0}update(a){this._$Eq&&=this._$Eq.forEach((i=>this._$ET(i,this[i]))),this._$EM()}updated(a){}firstUpdated(a){}}eu.elementStyles=[],eu.shadowRootOptions={mode:"open"},eu[zi("elementProperties")]=new Map,eu[zi("finalized")]=new Map,V3?.({ReactiveElement:eu}),(Vs.reactiveElementVersions??=[]).push("2.1.1");const Od=globalThis;let sr=class extends eu{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const a=super.createRenderRoot();return this.renderOptions.renderBefore??=a.firstChild,a}update(a){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(a),this._$Do=Dd(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return pn}};sr._$litElement$=!0,sr.finalized=!0,Od.litElementHydrateSupport?.({LitElement:sr});const G3=Od.litElementPolyfillSupport;G3?.({LitElement:sr});(Od.litElementVersions??=[]).push("4.2.1");const Xe=n=>(a,i)=>{i!==void 0?i.addInitializer((()=>{customElements.define(n,a)})):customElements.define(n,a)};const Y3={attribute:!0,type:String,converter:Ds,reflect:!1,hasChanged:$d},Z3=(n=Y3,a,i)=>{const{kind:u,metadata:s}=i;let c=globalThis.litPropertyMetadata.get(s);if(c===void 0&&globalThis.litPropertyMetadata.set(s,c=new Map),u==="setter"&&((n=Object.create(n)).wrapped=!0),c.set(i.name,n),u==="accessor"){const{name:f}=i;return{set(h){const b=a.get.call(this);a.set.call(this,h),this.requestUpdate(f,b,n)},init(h){return h!==void 0&&this.C(f,void 0,n,h),h}}}if(u==="setter"){const{name:f}=i;return function(h){const b=this[f];a.call(this,h),this.requestUpdate(f,b,n)}}throw Error("Unsupported decorator location: "+u)};function re(n){return(a,i)=>typeof i=="object"?Z3(n,a,i):((u,s,c)=>{const f=s.hasOwnProperty(c);return s.constructor.createProperty(c,u),f?Object.getOwnPropertyDescriptor(s,c):void 0})(n,a,i)}function ar(n){return re({...n,state:!0,attribute:!1})}const X3=(n,a,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof a!="object"&&Object.defineProperty(n,a,i),i);function Q3(n,a){return(i,u,s)=>{const c=f=>f.renderRoot?.querySelector(n)??null;return X3(i,u,{get(){return c(this)}})}}const I3={bubbles:!0,cancelable:!0,composed:!0};class Md extends CustomEvent{static{this.eventName="a2uiaction"}constructor(a){super(Md.eventName,{detail:a,...I3}),this.payload=a}}const J3=`
  &:not([disabled]) {
    cursor: pointer;
    opacity: var(--opacity, 0);
    transition: opacity var(--speed, 0.2s) cubic-bezier(0, 0, 0.3, 1);

    &:hover,
    &:focus {
      opacity: 1;
    }
  }`,K3=`
  ${new Array(21).fill(0).map((n,a)=>`.behavior-ho-${a*5} {
          --opacity: ${a/20};
          ${J3}
        }`).join(`
`)}

  .behavior-o-s {
    overflow: scroll;
  }

  .behavior-o-a {
    overflow: auto;
  }

  .behavior-o-h {
    overflow: hidden;
  }

  .behavior-sw-n {
    scrollbar-width: none;
  }
`,lt=4,W3=`
  ${new Array(25).fill(0).map((n,a)=>`
        .border-bw-${a} { border-width: ${a}px; }
        .border-btw-${a} { border-top-width: ${a}px; }
        .border-bbw-${a} { border-bottom-width: ${a}px; }
        .border-blw-${a} { border-left-width: ${a}px; }
        .border-brw-${a} { border-right-width: ${a}px; }

        .border-ow-${a} { outline-width: ${a}px; }
        .border-br-${a} { border-radius: ${a*lt}px; overflow: hidden;}`).join(`
`)}

  .border-br-50pc {
    border-radius: 50%;
  }

  .border-bs-s {
    border-style: solid;
  }
`,jb=[0,5,10,15,20,25,30,35,40,50,60,70,80,90,95,98,99,100];function Kt(...n){const a={};for(const i of n)for(const[u,s]of Object.entries(i)){const c=u.split("-").with(-1,"").join("-"),f=Object.keys(a).filter(h=>h.startsWith(c));for(const h of f)delete a[h];a[u]=s}return a}function P3(n,a,...i){const u=structuredClone(n);for(const s of i)for(const c of Object.keys(s)){const f=c.split("-").with(-1,"").join("-");for(const[h,b]of Object.entries(u)){if(a.includes(h))continue;let m=!1;for(let y=0;y<b.length;y++)b[y].startsWith(f)&&(m=!0,b[y]=c);m||b.push(c)}}return u}function _n(n){return n.startsWith("nv")?`--nv-${n.slice(2)}`:`--${n[0]}-${n.slice(1)}`}const Jr=n=>`
    ${n.map(a=>{const i=S0(a);return`.color-bc-${a} { border-color: light-dark(var(${_n(a)}), var(${_n(i)})); }`}).join(`
`)}

    ${n.map(a=>{const i=S0(a),u=[`.color-bgc-${a} { background-color: light-dark(var(${_n(a)}), var(${_n(i)})); }`,`.color-bbgc-${a}::backdrop { background-color: light-dark(var(${_n(a)}), var(${_n(i)})); }`];for(let s=.1;s<1;s+=.1)u.push(`.color-bbgc-${a}_${(s*100).toFixed(0)}::backdrop {
            background-color: light-dark(oklch(from var(${_n(a)}) l c h / calc(alpha * ${s.toFixed(1)})), oklch(from var(${_n(i)}) l c h / calc(alpha * ${s.toFixed(1)})) );
          }
        `);return u.join(`
`)}).join(`
`)}

  ${n.map(a=>{const i=S0(a);return`.color-c-${a} { color: light-dark(var(${_n(a)}), var(${_n(i)})); }`}).join(`
`)}
  `,S0=n=>{const a=n.match(/^([a-z]+)(\d+)$/);if(!a)return n;const[,i,u]=a,c=100-parseInt(u,10),f=jb.reduce((h,b)=>Math.abs(b-c)<Math.abs(h-c)?b:h);return`${i}${f}`},Kr=n=>jb.map(a=>`${n}${a}`),e_=[Jr(Kr("p")),Jr(Kr("s")),Jr(Kr("t")),Jr(Kr("n")),Jr(Kr("nv")),Jr(Kr("e")),`
    .color-bgc-transparent {
      background-color: transparent;
    }

    :host {
      color-scheme: var(--color-scheme);
    }
  `],t_=`
  .g-icon {
    font-family: "Material Symbols Outlined", "Google Symbols";
    font-weight: normal;
    font-style: normal;
    font-display: optional;
    font-size: 20px;
    width: 1em;
    height: 1em;
    user-select: none;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    overflow: hidden;

    font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 48,
      "ROND" 100;

    &.filled {
      font-variation-settings: "FILL" 1, "wght" 300, "GRAD" 0, "opsz" 48,
        "ROND" 100;
    }

    &.filled-heavy {
      font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48,
        "ROND" 100;
    }
  }
`,n_=`
  :host {
    ${new Array(16).fill(0).map((n,a)=>`--g-${a+1}: ${(a+1)*lt}px;`).join(`
`)}
  }

  ${new Array(49).fill(0).map((n,a)=>{const i=a-24,u=i<0?`n${Math.abs(i)}`:i.toString();return`
        .layout-p-${u} { --padding: ${i*lt}px; padding: var(--padding); }
        .layout-pt-${u} { padding-top: ${i*lt}px; }
        .layout-pr-${u} { padding-right: ${i*lt}px; }
        .layout-pb-${u} { padding-bottom: ${i*lt}px; }
        .layout-pl-${u} { padding-left: ${i*lt}px; }

        .layout-m-${u} { --margin: ${i*lt}px; margin: var(--margin); }
        .layout-mt-${u} { margin-top: ${i*lt}px; }
        .layout-mr-${u} { margin-right: ${i*lt}px; }
        .layout-mb-${u} { margin-bottom: ${i*lt}px; }
        .layout-ml-${u} { margin-left: ${i*lt}px; }

        .layout-t-${u} { top: ${i*lt}px; }
        .layout-r-${u} { right: ${i*lt}px; }
        .layout-b-${u} { bottom: ${i*lt}px; }
        .layout-l-${u} { left: ${i*lt}px; }`}).join(`
`)}

  ${new Array(25).fill(0).map((n,a)=>`
        .layout-g-${a} { gap: ${a*lt}px; }`).join(`
`)}

  ${new Array(8).fill(0).map((n,a)=>`
        .layout-grd-col${a+1} { grid-template-columns: ${"1fr ".repeat(a+1).trim()}; }`).join(`
`)}

  .layout-pos-a {
    position: absolute;
  }

  .layout-pos-rel {
    position: relative;
  }

  .layout-dsp-none {
    display: none;
  }

  .layout-dsp-block {
    display: block;
  }

  .layout-dsp-grid {
    display: grid;
  }

  .layout-dsp-iflex {
    display: inline-flex;
  }

  .layout-dsp-flexvert {
    display: flex;
    flex-direction: column;
  }

  .layout-dsp-flexhor {
    display: flex;
    flex-direction: row;
  }

  .layout-fw-w {
    flex-wrap: wrap;
  }

  .layout-al-fs {
    align-items: start;
  }

  .layout-al-fe {
    align-items: end;
  }

  .layout-al-c {
    align-items: center;
  }

  .layout-as-n {
    align-self: normal;
  }

  .layout-js-c {
    justify-self: center;
  }

  .layout-sp-c {
    justify-content: center;
  }

  .layout-sp-ev {
    justify-content: space-evenly;
  }

  .layout-sp-bt {
    justify-content: space-between;
  }

  .layout-sp-s {
    justify-content: start;
  }

  .layout-sp-e {
    justify-content: end;
  }

  .layout-ji-e {
    justify-items: end;
  }

  .layout-r-none {
    resize: none;
  }

  .layout-fs-c {
    field-sizing: content;
  }

  .layout-fs-n {
    field-sizing: none;
  }

  .layout-flx-0 {
    flex: 0 0 auto;
  }

  .layout-flx-1 {
    flex: 1 0 auto;
  }

  .layout-c-s {
    contain: strict;
  }

  /** Widths **/

  ${new Array(10).fill(0).map((n,a)=>{const i=(a+1)*10;return`.layout-w-${i} { width: ${i}%; max-width: ${i}%; }`}).join(`
`)}

  ${new Array(16).fill(0).map((n,a)=>{const i=a*lt;return`.layout-wp-${a} { width: ${i}px; }`}).join(`
`)}

  /** Heights **/

  ${new Array(10).fill(0).map((n,a)=>{const i=(a+1)*10;return`.layout-h-${i} { height: ${i}%; }`}).join(`
`)}

  ${new Array(16).fill(0).map((n,a)=>{const i=a*lt;return`.layout-hp-${a} { height: ${i}px; }`}).join(`
`)}

  .layout-el-cv {
    & img,
    & video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
    }
  }

  .layout-ar-sq {
    aspect-ratio: 1 / 1;
  }

  .layout-ex-fb {
    margin: calc(var(--padding) * -1) 0 0 calc(var(--padding) * -1);
    width: calc(100% + var(--padding) * 2);
    height: calc(100% + var(--padding) * 2);
  }
`,a_=`
  ${new Array(21).fill(0).map((n,a)=>`.opacity-el-${a*5} { opacity: ${a/20}; }`).join(`
`)}
`,r_=`
  :host {
    --default-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    --default-font-family-mono: "Courier New", Courier, monospace;
  }

  .typography-f-s {
    font-family: var(--font-family, var(--default-font-family));
    font-optical-sizing: auto;
    font-variation-settings: "slnt" 0, "wdth" 100, "GRAD" 0;
  }

  .typography-f-sf {
    font-family: var(--font-family-flex, var(--default-font-family));
    font-optical-sizing: auto;
  }

  .typography-f-c {
    font-family: var(--font-family-mono, var(--default-font-family));
    font-optical-sizing: auto;
    font-variation-settings: "slnt" 0, "wdth" 100, "GRAD" 0;
  }

  .typography-v-r {
    font-variation-settings: "slnt" 0, "wdth" 100, "GRAD" 0, "ROND" 100;
  }

  .typography-ta-s {
    text-align: start;
  }

  .typography-ta-c {
    text-align: center;
  }

  .typography-fs-n {
    font-style: normal;
  }

  .typography-fs-i {
    font-style: italic;
  }

  .typography-sz-ls {
    font-size: 11px;
    line-height: 16px;
  }

  .typography-sz-lm {
    font-size: 12px;
    line-height: 16px;
  }

  .typography-sz-ll {
    font-size: 14px;
    line-height: 20px;
  }

  .typography-sz-bs {
    font-size: 12px;
    line-height: 16px;
  }

  .typography-sz-bm {
    font-size: 14px;
    line-height: 20px;
  }

  .typography-sz-bl {
    font-size: 16px;
    line-height: 24px;
  }

  .typography-sz-ts {
    font-size: 14px;
    line-height: 20px;
  }

  .typography-sz-tm {
    font-size: 16px;
    line-height: 24px;
  }

  .typography-sz-tl {
    font-size: 22px;
    line-height: 28px;
  }

  .typography-sz-hs {
    font-size: 24px;
    line-height: 32px;
  }

  .typography-sz-hm {
    font-size: 28px;
    line-height: 36px;
  }

  .typography-sz-hl {
    font-size: 32px;
    line-height: 40px;
  }

  .typography-sz-ds {
    font-size: 36px;
    line-height: 44px;
  }

  .typography-sz-dm {
    font-size: 45px;
    line-height: 52px;
  }

  .typography-sz-dl {
    font-size: 57px;
    line-height: 64px;
  }

  .typography-ws-p {
    white-space: pre-line;
  }

  .typography-ws-nw {
    white-space: nowrap;
  }

  .typography-td-none {
    text-decoration: none;
  }

  /** Weights **/

  ${new Array(9).fill(0).map((n,a)=>{const i=(a+1)*100;return`.typography-w-${i} { font-weight: ${i}; }`}).join(`
`)}
`,Nd=[K3,W3,e_,t_,n_,a_,r_].flat(1/0).join(`
`);function u_(n){return _e(n)&&"key"in n}function Ub(n,a){return n==="path"&&typeof a=="string"}function _e(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Bb(n){return _e(n)?"explicitList"in n||"template"in n:!1}function Kn(n){return _e(n)&&("path"in n||"literal"in n&&typeof n.literal=="string"||"literalString"in n)}function i_(n){return _e(n)&&("path"in n||"literal"in n&&typeof n.literal=="number"||"literalNumber"in n)}function l_(n){return _e(n)&&("path"in n||"literal"in n&&typeof n.literal=="boolean"||"literalBoolean"in n)}function Jn(n){return!(!_e(n)||!("id"in n&&"type"in n&&"properties"in n))}function qb(n){return _e(n)&&"url"in n&&Kn(n.url)}function Fb(n){return _e(n)&&"child"in n&&Jn(n.child)&&"action"in n}function Hb(n){return _e(n)?"child"in n?Jn(n.child):"children"in n?Array.isArray(n.children)&&n.children.every(Jn):!1:!1}function Lb(n){return _e(n)&&"label"in n&&Kn(n.label)&&"value"in n&&l_(n.value)}function Vb(n){return _e(n)&&"children"in n&&Array.isArray(n.children)&&n.children.every(Jn)}function Gb(n){return _e(n)&&"value"in n&&Kn(n.value)}function Yb(n){return _e(n)}function Zb(n){return _e(n)&&"url"in n&&Kn(n.url)}function Xb(n){return _e(n)&&"name"in n&&Kn(n.name)}function Qb(n){return _e(n)&&"children"in n&&Array.isArray(n.children)&&n.children.every(Jn)}function Ib(n){return _e(n)&&"entryPointChild"in n&&Jn(n.entryPointChild)&&"contentChild"in n&&Jn(n.contentChild)}function Jb(n){return _e(n)&&"selections"in n}function Kb(n){return _e(n)&&"children"in n&&Array.isArray(n.children)&&n.children.every(Jn)}function Wb(n){return _e(n)&&"value"in n&&i_(n.value)}function s_(n){return _e(n)&&"title"in n&&Kn(n.title)&&"child"in n&&Jn(n.child)}function Pb(n){return _e(n)&&"tabItems"in n&&Array.isArray(n.tabItems)&&n.tabItems.every(s_)}function eg(n){return _e(n)&&"text"in n&&Kn(n.text)}function tg(n){return _e(n)&&"label"in n&&Kn(n.label)}function ng(n){return _e(n)&&"url"in n&&Kn(n.url)}const o_=Object.freeze(Object.defineProperty({__proto__:null,isComponentArrayReference:Bb,isObject:_e,isPath:Ub,isResolvedAudioPlayer:qb,isResolvedButton:Fb,isResolvedCard:Hb,isResolvedCheckbox:Lb,isResolvedColumn:Vb,isResolvedDateTimeInput:Gb,isResolvedDivider:Yb,isResolvedIcon:Xb,isResolvedImage:Zb,isResolvedList:Qb,isResolvedModal:Ib,isResolvedMultipleChoice:Jb,isResolvedRow:Kb,isResolvedSlider:Wb,isResolvedTabs:Pb,isResolvedText:eg,isResolvedTextField:tg,isResolvedVideo:ng,isValueMap:u_},Symbol.toStringTag,{value:"Module"}));class Ze{static{this.DEFAULT_SURFACE_ID="@default"}constructor(a={mapCtor:Map,arrayCtor:Array,setCtor:Set,objCtor:Object}){this.opts=a,this.mapCtor=Map,this.arrayCtor=Array,this.setCtor=Set,this.objCtor=Object,this.arrayCtor=a.arrayCtor,this.mapCtor=a.mapCtor,this.setCtor=a.setCtor,this.objCtor=a.objCtor,this.surfaces=new a.mapCtor}getSurfaces(){return this.surfaces}clearSurfaces(){this.surfaces.clear()}processMessages(a){for(const i of a)i.beginRendering&&this.handleBeginRendering(i.beginRendering,i.beginRendering.surfaceId),i.surfaceUpdate&&this.handleSurfaceUpdate(i.surfaceUpdate,i.surfaceUpdate.surfaceId),i.dataModelUpdate&&this.handleDataModelUpdate(i.dataModelUpdate,i.dataModelUpdate.surfaceId),i.deleteSurface&&this.handleDeleteSurface(i.deleteSurface)}getData(a,i,u=Ze.DEFAULT_SURFACE_ID){const s=this.getOrCreateSurface(u);if(!s)return null;let c;return i==="."||i===""?c=a.dataContextPath??"/":c=this.resolvePath(i,a.dataContextPath),this.getDataByPath(s.dataModel,c)}setData(a,i,u,s=Ze.DEFAULT_SURFACE_ID){if(!a){console.warn("No component node set");return}const c=this.getOrCreateSurface(s);if(!c)return;let f;i==="."||i===""?f=a.dataContextPath??"/":f=this.resolvePath(i,a.dataContextPath),this.setDataByPath(c.dataModel,f,u)}resolvePath(a,i){return a.startsWith("/")?a:i&&i!=="/"?i.endsWith("/")?`${i}${a}`:`${i}/${a}`:`/${a}`}parseIfJsonString(a){if(typeof a!="string")return a;const i=a.trim();if(i.startsWith("{")&&i.endsWith("}")||i.startsWith("[")&&i.endsWith("]"))try{return JSON.parse(a)}catch(u){return console.warn(`Failed to parse potential JSON string: "${a.substring(0,50)}..."`,u),a}return a}convertKeyValueArrayToMap(a){const i=new this.mapCtor;for(const u of a){if(!_e(u)||!("key"in u))continue;const s=u.key,c=this.findValueKey(u);if(!c)continue;let f=u[c];c==="valueMap"&&Array.isArray(f)?f=this.convertKeyValueArrayToMap(f):typeof f=="string"&&(f=this.parseIfJsonString(f)),this.setDataByPath(i,s,f)}return i}setDataByPath(a,i,u){if(Array.isArray(u)&&(u.length===0||_e(u[0])&&"key"in u[0]))if(u.length===1&&_e(u[0])&&u[0].key==="."){const b=u[0],m=this.findValueKey(b);m?(u=b[m],m==="valueMap"&&Array.isArray(u)?u=this.convertKeyValueArrayToMap(u):typeof u=="string"&&(u=this.parseIfJsonString(u))):u=this.convertKeyValueArrayToMap(u)}else u=this.convertKeyValueArrayToMap(u);const s=this.normalizePath(i).split("/").filter(b=>b);if(s.length===0){if(u instanceof Map||_e(u)){!(u instanceof Map)&&_e(u)&&(u=new this.mapCtor(Object.entries(u))),a.clear();for(const[b,m]of u.entries())a.set(b,m)}else console.error("Cannot set root of DataModel to a non-Map value.");return}let c=a;for(let b=0;b<s.length-1;b++){const m=s[b];let y;c instanceof Map?y=c.get(m):Array.isArray(c)&&/^\d+$/.test(m)&&(y=c[parseInt(m,10)]),(y===void 0||typeof y!="object"||y===null)&&(y=new this.mapCtor,c instanceof this.mapCtor?c.set(m,y):Array.isArray(c)&&(c[parseInt(m,10)]=y)),c=y}const f=s[s.length-1],h=u;c instanceof this.mapCtor?c.set(f,h):Array.isArray(c)&&/^\d+$/.test(f)&&(c[parseInt(f,10)]=h)}normalizePath(a){return"/"+a.replace(/\[(\d+)\]/g,".$1").split(".").filter(s=>s.length>0).join("/")}getDataByPath(a,i){const u=this.normalizePath(i).split("/").filter(c=>c);let s=a;for(const c of u){if(s==null)return null;if(s instanceof Map)s=s.get(c);else if(Array.isArray(s)&&/^\d+$/.test(c))s=s[parseInt(c,10)];else if(_e(s))s=s[c];else return null}return s}getOrCreateSurface(a){let i=this.surfaces.get(a);return i||(i=new this.objCtor({rootComponentId:null,componentTree:null,dataModel:new this.mapCtor,components:new this.mapCtor,styles:new this.objCtor}),this.surfaces.set(a,i)),i}handleBeginRendering(a,i){const u=this.getOrCreateSurface(i);u.rootComponentId=a.root,u.styles=a.styles??{},this.rebuildComponentTree(u)}handleSurfaceUpdate(a,i){const u=this.getOrCreateSurface(i);for(const s of a.components)u.components.set(s.id,s);this.rebuildComponentTree(u)}handleDataModelUpdate(a,i){const u=this.getOrCreateSurface(i),s=a.path??"/";this.setDataByPath(u.dataModel,s,a.contents),this.rebuildComponentTree(u)}handleDeleteSurface(a){this.surfaces.delete(a.surfaceId)}rebuildComponentTree(a){if(!a.rootComponentId){a.componentTree=null;return}const i=new this.setCtor;a.componentTree=this.buildNodeRecursive(a.rootComponentId,a,i,"/","")}findValueKey(a){return Object.keys(a).find(i=>i.startsWith("value"))}buildNodeRecursive(a,i,u,s,c=""){const f=`${a}${c}`,{components:h}=i;if(!h.has(a))return null;if(u.has(f))throw new Error(`Circular dependency for component "${f}".`);u.add(f);const b=h.get(a),m=b.component??{},y=Object.keys(m)[0],p=m[y],_=new this.objCtor;if(_e(p))for(const[v,w]of Object.entries(p))_[v]=this.resolvePropertyValue(w,i,u,s,c);u.delete(f);const x={id:f,dataContextPath:s,weight:b.weight??"initial"};switch(y){case"Text":if(!eg(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Text",properties:_});case"Image":if(!Zb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Image",properties:_});case"Icon":if(!Xb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Icon",properties:_});case"Video":if(!ng(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Video",properties:_});case"AudioPlayer":if(!qb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"AudioPlayer",properties:_});case"Row":if(!Kb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Row",properties:_});case"Column":if(!Vb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Column",properties:_});case"List":if(!Qb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"List",properties:_});case"Card":if(!Hb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Card",properties:_});case"Tabs":if(!Pb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Tabs",properties:_});case"Divider":if(!Yb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Divider",properties:_});case"Modal":if(!Ib(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Modal",properties:_});case"Button":if(!Fb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Button",properties:_});case"CheckBox":if(!Lb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"CheckBox",properties:_});case"TextField":if(!tg(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"TextField",properties:_});case"DateTimeInput":if(!Gb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"DateTimeInput",properties:_});case"MultipleChoice":if(!Jb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"MultipleChoice",properties:_});case"Slider":if(!Wb(_))throw new Error(`Invalid data; expected ${y}`);return new this.objCtor({...x,type:"Slider",properties:_});default:return new this.objCtor({...x,type:y,properties:_})}}resolvePropertyValue(a,i,u,s,c=""){if(typeof a=="string"&&i.components.has(a))return this.buildNodeRecursive(a,i,u,s,c);if(Bb(a)){if(a.explicitList)return a.explicitList.map(f=>this.buildNodeRecursive(f,i,u,s,c));if(a.template){const f=this.resolvePath(a.template.dataBinding,s),h=this.getDataByPath(i.dataModel,f),b=a.template;if(Array.isArray(h))return h.map((y,p)=>{const v=`:${[...s.split("/").filter(C=>/^\d+$/.test(C)),p].join(":")}`,w=`${f}/${p}`;return this.buildNodeRecursive(b.componentId,i,u,w,v)});const m=this.mapCtor;return h instanceof m?Array.from(h.keys(),y=>{const p=`:${y}`,_=`${f}/${y}`;return this.buildNodeRecursive(b.componentId,i,u,_,p)}):new this.arrayCtor}}if(Array.isArray(a))return a.map(f=>this.resolvePropertyValue(f,i,u,s,c));if(_e(a)){const f=new this.objCtor;for(const[h,b]of Object.entries(a)){let m=b;if(Ub(h,b)&&s!=="/"){m=b.replace(/^\.?\/item/,"").replace(/^\.?\/text/,"").replace(/^\.?\/label/,"").replace(/^\.?\//,""),f[h]=m;continue}f[h]=this.resolvePropertyValue(m,i,u,s,c)}return f}return a}}var c_=Object.defineProperty,d_=(n,a,i)=>a in n?c_(n,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[a]=i,C0=(n,a,i)=>(d_(n,typeof a!="symbol"?a+"":a,i),i),f_=(n,a,i)=>{if(!a.has(n))throw TypeError("Cannot "+i)},E0=(n,a)=>{if(Object(a)!==a)throw TypeError('Cannot use the "in" operator on this value');return n.has(a)},fs=(n,a,i)=>{if(a.has(n))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(n):a.set(n,i)},km=(n,a,i)=>(f_(n,a,"access private method"),i);function ag(n,a){return Object.is(n,a)}let rt=null,$i=!1,ws=1;const Ts=Symbol("SIGNAL");function au(n){const a=rt;return rt=n,a}function h_(){return rt}function p_(){return $i}const Rd={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Gs(n){if($i)throw new Error(typeof ngDevMode<"u"&&ngDevMode?"Assertion error: signal read during notification phase":"");if(rt===null)return;rt.consumerOnSignalRead(n);const a=rt.nextProducerIndex++;if(ou(rt),a<rt.producerNode.length&&rt.producerNode[a]!==n&&sd(rt)){const i=rt.producerNode[a];Ys(i,rt.producerIndexOfThis[a])}rt.producerNode[a]!==n&&(rt.producerNode[a]=n,rt.producerIndexOfThis[a]=sd(rt)?ig(n,rt,a):0),rt.producerLastReadVersion[a]=n.version}function m_(){ws++}function rg(n){if(!(!n.dirty&&n.lastCleanEpoch===ws)){if(!n.producerMustRecompute(n)&&!__(n)){n.dirty=!1,n.lastCleanEpoch=ws;return}n.producerRecomputeValue(n),n.dirty=!1,n.lastCleanEpoch=ws}}function ug(n){if(n.liveConsumerNode===void 0)return;const a=$i;$i=!0;try{for(const i of n.liveConsumerNode)i.dirty||g_(i)}finally{$i=a}}function b_(){return rt?.consumerAllowSignalWrites!==!1}function g_(n){var a;n.dirty=!0,ug(n),(a=n.consumerMarkedDirty)==null||a.call(n.wrapper??n)}function y_(n){return n&&(n.nextProducerIndex=0),au(n)}function v_(n,a){if(au(a),!(!n||n.producerNode===void 0||n.producerIndexOfThis===void 0||n.producerLastReadVersion===void 0)){if(sd(n))for(let i=n.nextProducerIndex;i<n.producerNode.length;i++)Ys(n.producerNode[i],n.producerIndexOfThis[i]);for(;n.producerNode.length>n.nextProducerIndex;)n.producerNode.pop(),n.producerLastReadVersion.pop(),n.producerIndexOfThis.pop()}}function __(n){ou(n);for(let a=0;a<n.producerNode.length;a++){const i=n.producerNode[a],u=n.producerLastReadVersion[a];if(u!==i.version||(rg(i),u!==i.version))return!0}return!1}function ig(n,a,i){var u;if(jd(n),ou(n),n.liveConsumerNode.length===0){(u=n.watched)==null||u.call(n.wrapper);for(let s=0;s<n.producerNode.length;s++)n.producerIndexOfThis[s]=ig(n.producerNode[s],n,s)}return n.liveConsumerIndexOfThis.push(i),n.liveConsumerNode.push(a)-1}function Ys(n,a){var i;if(jd(n),ou(n),typeof ngDevMode<"u"&&ngDevMode&&a>=n.liveConsumerNode.length)throw new Error(`Assertion error: active consumer index ${a} is out of bounds of ${n.liveConsumerNode.length} consumers)`);if(n.liveConsumerNode.length===1){(i=n.unwatched)==null||i.call(n.wrapper);for(let s=0;s<n.producerNode.length;s++)Ys(n.producerNode[s],n.producerIndexOfThis[s])}const u=n.liveConsumerNode.length-1;if(n.liveConsumerNode[a]=n.liveConsumerNode[u],n.liveConsumerIndexOfThis[a]=n.liveConsumerIndexOfThis[u],n.liveConsumerNode.length--,n.liveConsumerIndexOfThis.length--,a<n.liveConsumerNode.length){const s=n.liveConsumerIndexOfThis[a],c=n.liveConsumerNode[a];ou(c),c.producerIndexOfThis[s]=a}}function sd(n){var a;return n.consumerIsAlwaysLive||(((a=n?.liveConsumerNode)==null?void 0:a.length)??0)>0}function ou(n){n.producerNode??(n.producerNode=[]),n.producerIndexOfThis??(n.producerIndexOfThis=[]),n.producerLastReadVersion??(n.producerLastReadVersion=[])}function jd(n){n.liveConsumerNode??(n.liveConsumerNode=[]),n.liveConsumerIndexOfThis??(n.liveConsumerIndexOfThis=[])}function lg(n){if(rg(n),Gs(n),n.value===od)throw n.error;return n.value}function x_(n){const a=Object.create(w_);a.computation=n;const i=()=>lg(a);return i[Ts]=a,i}const k0=Symbol("UNSET"),A0=Symbol("COMPUTING"),od=Symbol("ERRORED"),w_={...Rd,value:k0,dirty:!0,error:null,equal:ag,producerMustRecompute(n){return n.value===k0||n.value===A0},producerRecomputeValue(n){if(n.value===A0)throw new Error("Detected cycle in computations.");const a=n.value;n.value=A0;const i=y_(n);let u,s=!1;try{u=n.computation.call(n.wrapper),s=a!==k0&&a!==od&&n.equal.call(n.wrapper,a,u)}catch(c){u=od,n.error=c}finally{v_(n,i)}if(s){n.value=a;return}n.value=u,n.version++}};function S_(){throw new Error}let C_=S_;function E_(){C_()}function k_(n){const a=Object.create(T_);a.value=n;const i=()=>(Gs(a),a.value);return i[Ts]=a,i}function A_(){return Gs(this),this.value}function D_(n,a){b_()||E_(),n.equal.call(n.wrapper,n.value,a)||(n.value=a,z_(n))}const T_={...Rd,equal:ag,value:void 0};function z_(n){n.version++,m_(),ug(n)}const wt=Symbol("node");var En;(n=>{var a,i,u,s;class c{constructor(b,m={}){fs(this,i),C0(this,a);const p=k_(b)[Ts];if(this[wt]=p,p.wrapper=this,m){const _=m.equals;_&&(p.equal=_),p.watched=m[n.subtle.watched],p.unwatched=m[n.subtle.unwatched]}}get(){if(!(0,n.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.get");return A_.call(this[wt])}set(b){if(!(0,n.isState)(this))throw new TypeError("Wrong receiver type for Signal.State.prototype.set");if(p_())throw new Error("Writes to signals not permitted during Watcher callback");const m=this[wt];D_(m,b)}}a=wt,i=new WeakSet,n.isState=h=>typeof h=="object"&&E0(i,h),n.State=c;class f{constructor(b,m){fs(this,s),C0(this,u);const p=x_(b)[Ts];if(p.consumerAllowSignalWrites=!0,this[wt]=p,p.wrapper=this,m){const _=m.equals;_&&(p.equal=_),p.watched=m[n.subtle.watched],p.unwatched=m[n.subtle.unwatched]}}get(){if(!(0,n.isComputed)(this))throw new TypeError("Wrong receiver type for Signal.Computed.prototype.get");return lg(this[wt])}}u=wt,s=new WeakSet,n.isComputed=h=>typeof h=="object"&&E0(s,h),n.Computed=f,(h=>{var b,m,y,p;function _(R){let z,$=null;try{$=au(null),z=R()}finally{au($)}return z}h.untrack=_;function x(R){var z;if(!(0,n.isComputed)(R)&&!(0,n.isWatcher)(R))throw new TypeError("Called introspectSources without a Computed or Watcher argument");return((z=R[wt].producerNode)==null?void 0:z.map($=>$.wrapper))??[]}h.introspectSources=x;function v(R){var z;if(!(0,n.isComputed)(R)&&!(0,n.isState)(R))throw new TypeError("Called introspectSinks without a Signal argument");return((z=R[wt].liveConsumerNode)==null?void 0:z.map($=>$.wrapper))??[]}h.introspectSinks=v;function w(R){if(!(0,n.isComputed)(R)&&!(0,n.isState)(R))throw new TypeError("Called hasSinks without a Signal argument");const z=R[wt].liveConsumerNode;return z?z.length>0:!1}h.hasSinks=w;function C(R){if(!(0,n.isComputed)(R)&&!(0,n.isWatcher)(R))throw new TypeError("Called hasSources without a Computed or Watcher argument");const z=R[wt].producerNode;return z?z.length>0:!1}h.hasSources=C;class E{constructor(z){fs(this,m),fs(this,y),C0(this,b);let $=Object.create(Rd);$.wrapper=this,$.consumerMarkedDirty=z,$.consumerIsAlwaysLive=!0,$.consumerAllowSignalWrites=!1,$.producerNode=[],this[wt]=$}watch(...z){if(!(0,n.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");km(this,y,p).call(this,z);const $=this[wt];$.dirty=!1;const Y=au($);for(const K of z)Gs(K[wt]);au(Y)}unwatch(...z){if(!(0,n.isWatcher)(this))throw new TypeError("Called unwatch without Watcher receiver");km(this,y,p).call(this,z);const $=this[wt];ou($);for(let Y=$.producerNode.length-1;Y>=0;Y--)if(z.includes($.producerNode[Y].wrapper)){Ys($.producerNode[Y],$.producerIndexOfThis[Y]);const K=$.producerNode.length-1;if($.producerNode[Y]=$.producerNode[K],$.producerIndexOfThis[Y]=$.producerIndexOfThis[K],$.producerNode.length--,$.producerIndexOfThis.length--,$.nextProducerIndex--,Y<$.producerNode.length){const ce=$.producerIndexOfThis[Y],we=$.producerNode[Y];jd(we),we.liveConsumerIndexOfThis[ce]=Y}}}getPending(){if(!(0,n.isWatcher)(this))throw new TypeError("Called getPending without Watcher receiver");return this[wt].producerNode.filter($=>$.dirty).map($=>$.wrapper)}}b=wt,m=new WeakSet,y=new WeakSet,p=function(R){for(const z of R)if(!(0,n.isComputed)(z)&&!(0,n.isState)(z))throw new TypeError("Called watch/unwatch without a Computed or State argument")},n.isWatcher=R=>E0(m,R),h.Watcher=E;function q(){var R;return(R=h_())==null?void 0:R.wrapper}h.currentComputed=q,h.watched=Symbol("watched"),h.unwatched=Symbol("unwatched")})(n.subtle||(n.subtle={}))})(En||(En={}));const Ta=(n=null)=>new En.State(n,{equals:()=>!1}),$_=new Set([Symbol.iterator,"concat","entries","every","filter","find","findIndex","flat","flatMap","forEach","includes","indexOf","join","keys","lastIndexOf","map","reduce","reduceRight","slice","some","values"]),O_=new Set(["fill","push","unshift"]);function Am(n){if(typeof n=="symbol")return null;const a=Number(n);return isNaN(a)?null:a%1===0?a:null}class ir{static from(a,i,u){return i?new ir(Array.from(a,i,u)):new ir(Array.from(a))}static of(...a){return new ir(a)}constructor(a=[]){let i=a.slice(),u=this,s=new Map,c=!1;return new Proxy(i,{get(f,h){let b=Am(h);if(b!==null)return u.#a(b),u.#e.get(),f[b];if(h==="length")return c?c=!1:u.#e.get(),f[h];if(O_.has(h)&&(c=!0),$_.has(h)){let m=s.get(h);return m===void 0&&(m=(...y)=>(u.#e.get(),f[h](...y)),s.set(h,m)),m}return f[h]},set(f,h,b){f[h]=b;let m=Am(h);return m!==null?(u.#n(m),u.#e.set(null)):h==="length"&&u.#e.set(null),!0},getPrototypeOf(){return ir.prototype}})}#e=Ta();#t=new Map;#a(a){let i=this.#t.get(a);i===void 0&&(i=Ta(),this.#t.set(a,i)),i.get()}#n(a){const i=this.#t.get(a);i&&i.set(null)}}Object.setPrototypeOf(ir.prototype,Array.prototype);class sg{collection=Ta();storages=new Map;vals;readStorageFor(a){const{storages:i}=this;let u=i.get(a);u===void 0&&(u=Ta(),i.set(a,u)),u.get()}dirtyStorageFor(a){const i=this.storages.get(a);i&&i.set(null)}constructor(a){this.vals=a?new Map(a):new Map}get(a){return this.readStorageFor(a),this.vals.get(a)}has(a){return this.readStorageFor(a),this.vals.has(a)}entries(){return this.collection.get(),this.vals.entries()}keys(){return this.collection.get(),this.vals.keys()}values(){return this.collection.get(),this.vals.values()}forEach(a){this.collection.get(),this.vals.forEach(a)}get size(){return this.collection.get(),this.vals.size}[Symbol.iterator](){return this.collection.get(),this.vals[Symbol.iterator]()}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}set(a,i){return this.dirtyStorageFor(a),this.collection.set(null),this.vals.set(a,i),this}delete(a){return this.dirtyStorageFor(a),this.collection.set(null),this.vals.delete(a)}clear(){this.storages.forEach(a=>a.set(null)),this.collection.set(null),this.vals.clear()}}Object.setPrototypeOf(sg.prototype,Map.prototype);class zs{static fromEntries(a){return new zs(Object.fromEntries(a))}#e=new Map;#t=Ta();constructor(a={}){let i=Object.getPrototypeOf(a),u=Object.getOwnPropertyDescriptors(a),s=Object.create(i);for(let f in u)Object.defineProperty(s,f,u[f]);let c=this;return new Proxy(s,{get(f,h,b){return c.#a(h),Reflect.get(f,h,b)},has(f,h){return c.#a(h),h in f},ownKeys(f){return c.#t.get(),Reflect.ownKeys(f)},set(f,h,b,m){let y=Reflect.set(f,h,b,m);return c.#n(h),c.#r(),y},deleteProperty(f,h){return h in f&&(delete f[h],c.#n(h),c.#r()),!0},getPrototypeOf(){return zs.prototype}})}#a(a){let i=this.#e.get(a);i===void 0&&(i=Ta(),this.#e.set(a,i)),i.get()}#n(a){const i=this.#e.get(a);i&&i.set(null)}#r(){this.#t.set(null)}}const M_=zs;class og{collection=Ta();storages=new Map;vals;storageFor(a){const i=this.storages;let u=i.get(a);return u===void 0&&(u=Ta(),i.set(a,u)),u}dirtyStorageFor(a){const i=this.storages.get(a);i&&i.set(null)}constructor(a){this.vals=new Set(a)}has(a){return this.storageFor(a).get(),this.vals.has(a)}entries(){return this.collection.get(),this.vals.entries()}keys(){return this.collection.get(),this.vals.keys()}values(){return this.collection.get(),this.vals.values()}forEach(a){this.collection.get(),this.vals.forEach(a)}get size(){return this.collection.get(),this.vals.size}[Symbol.iterator](){return this.collection.get(),this.vals[Symbol.iterator]()}get[Symbol.toStringTag](){return this.vals[Symbol.toStringTag]}add(a){return this.dirtyStorageFor(a),this.collection.set(null),this.vals.add(a),this}delete(a){return this.dirtyStorageFor(a),this.collection.set(null),this.vals.delete(a)}clear(){this.storages.forEach(a=>a.set(null)),this.collection.set(null),this.vals.clear()}}Object.setPrototypeOf(og.prototype,Set.prototype);function N_(){return new Ze({arrayCtor:ir,mapCtor:sg,objCtor:M_,setCtor:og})}const R_={createSignalA2uiMessageProcessor:N_,A2uiMessageProcessor:Ze,Guards:o_};const j_=Symbol("SignalWatcherBrand"),U_=new FinalizationRegistry((({watcher:n,signal:a})=>{n.unwatch(a)})),Dm=new WeakMap;function B_(n){return n[j_]===!0?(console.warn("SignalWatcher should not be applied to the same class more than once."),n):class extends n{constructor(){super(...arguments),this._$St=new En.State(0),this._$Si=!1,this._$So=!0,this._$Sh=new Set}_$Sl(){if(this._$Su!==void 0)return;this._$Sv=new En.Computed((()=>{this._$St.get(),super.performUpdate()}));const a=this._$Su=new En.subtle.Watcher((function(){const i=Dm.get(this);i!==void 0&&(i._$Si===!1&&i.requestUpdate(),this.watch())}));Dm.set(a,this),U_.register(this,{watcher:a,signal:this._$Sv}),a.watch(this._$Sv)}_$Sp(){this._$Su!==void 0&&(this._$Su.unwatch(this._$Sv),this._$Sv=void 0,this._$Su=void 0)}performUpdate(){this.isUpdatePending&&(this._$Sl(),this._$Si=!0,this._$St.set(this._$St.get()+1),this._$Si=!1,this._$Sv.get())}update(a){try{this._$So?(this._$So=!1,super.update(a)):this._$Sh.forEach((i=>i.commit()))}finally{this.isUpdatePending=!1,this._$Sh.clear()}}requestUpdate(a,i,u){this._$So=!0,super.requestUpdate(a,i,u)}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask((()=>{this.isConnected===!1&&this._$Sp()}))}_(a){this._$Sh.add(a);const i=this._$So;this.requestUpdate(),this._$So=i}m(a){this._$Sh.delete(a)}}}En.State;En.Computed;let q_=class extends Event{constructor(a,i,u,s){super("context-request",{bubbles:!0,composed:!0}),this.context=a,this.contextTarget=i,this.callback=u,this.subscribe=s??!1}};class Tm{constructor(a,i,u,s){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(c,f)=>{this.unsubscribe&&(this.unsubscribe!==f&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=c,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(c,f)),this.unsubscribe=f},this.host=a,i.context!==void 0){const c=i;this.context=c.context,this.callback=c.callback,this.subscribe=c.subscribe??!1}else this.context=i,this.callback=u,this.subscribe=s??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new q_(this.context,this.host,this.t,this.subscribe))}}function F_({context:n,subscribe:a}){return(i,u)=>{typeof u=="object"?u.addInitializer((function(){new Tm(this,{context:n,callback:s=>{i.set.call(this,s)},subscribe:a})})):i.constructor.addInitializer((s=>{new Tm(s,{context:n,callback:c=>{s[u]=c},subscribe:a})}))}}function*H_(n,a){if(n!==void 0){let i=0;for(const u of n)yield a(u,i++)}}let D0=!1,$s=new En.subtle.Watcher(()=>{D0||(D0=!0,queueMicrotask(()=>{D0=!1,L_()}))});function L_(){for(const n of $s.getPending())n.get();$s.watch()}function V_(n){let a=new En.Computed(()=>n());return $s.watch(a),a.get(),()=>{$s.unwatch(a)}}const cg="A2UITheme",ot=Vi(Nd);class G_{constructor(){this.registry=new Map}register(a,i,u){if(!/^[a-zA-Z0-9]+$/.test(a))throw new Error(`[Registry] Invalid typeName '${a}'. Must be alphanumeric.`);this.registry.set(a,i);const s=u||`a2ui-custom-${a.toLowerCase()}`,c=customElements.getName(i);if(c){if(c!==s)throw new Error(`Component ${a} is already registered as ${c}, but requested as ${s}.`);return}customElements.get(s)||customElements.define(s,i)}get(a){return this.registry.get(a)}}const zm=new G_;var St=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0},Zn=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0};let ct=(()=>{let n=[Xe("a2ui-root")],a,i=[],u,s=B_(sr),c=[],f,h=[],b=[],m,y=[],p=[],_,x=[],v=[],w,C=[],E=[],q,R=[],z=[],$,Y=[],K=[],ce,we=[],ut=[],Qe;return class extends s{static{u=this}static{const Q=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;f=[re()],m=[re()],_=[F_({context:cg})],w=[re({attribute:!1})],q=[re({attribute:!1})],$=[re()],ce=[re()],Qe=[re()],Zn(this,null,f,{kind:"accessor",name:"surfaceId",static:!1,private:!1,access:{has:Z=>"surfaceId"in Z,get:Z=>Z.surfaceId,set:(Z,A)=>{Z.surfaceId=A}},metadata:Q},h,b),Zn(this,null,m,{kind:"accessor",name:"component",static:!1,private:!1,access:{has:Z=>"component"in Z,get:Z=>Z.component,set:(Z,A)=>{Z.component=A}},metadata:Q},y,p),Zn(this,null,_,{kind:"accessor",name:"theme",static:!1,private:!1,access:{has:Z=>"theme"in Z,get:Z=>Z.theme,set:(Z,A)=>{Z.theme=A}},metadata:Q},x,v),Zn(this,null,w,{kind:"accessor",name:"childComponents",static:!1,private:!1,access:{has:Z=>"childComponents"in Z,get:Z=>Z.childComponents,set:(Z,A)=>{Z.childComponents=A}},metadata:Q},C,E),Zn(this,null,q,{kind:"accessor",name:"processor",static:!1,private:!1,access:{has:Z=>"processor"in Z,get:Z=>Z.processor,set:(Z,A)=>{Z.processor=A}},metadata:Q},R,z),Zn(this,null,$,{kind:"accessor",name:"dataContextPath",static:!1,private:!1,access:{has:Z=>"dataContextPath"in Z,get:Z=>Z.dataContextPath,set:(Z,A)=>{Z.dataContextPath=A}},metadata:Q},Y,K),Zn(this,null,ce,{kind:"accessor",name:"enableCustomElements",static:!1,private:!1,access:{has:Z=>"enableCustomElements"in Z,get:Z=>Z.enableCustomElements,set:(Z,A)=>{Z.enableCustomElements=A}},metadata:Q},we,ut),Zn(this,null,Qe,{kind:"setter",name:"weight",static:!1,private:!1,access:{has:Z=>"weight"in Z,set:(Z,A)=>{Z.weight=A}},metadata:Q},null,c),Zn(null,a={value:u},n,{kind:"class",name:u.name,metadata:Q},null,i),u=a.value,Q&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:Q})}#e=(St(this,c),St(this,h,null));get surfaceId(){return this.#e}set surfaceId(Q){this.#e=Q}#t=(St(this,b),St(this,y,null));get component(){return this.#t}set component(Q){this.#t=Q}#a=(St(this,p),St(this,x,void 0));get theme(){return this.#a}set theme(Q){this.#a=Q}#n=(St(this,v),St(this,C,null));get childComponents(){return this.#n}set childComponents(Q){this.#n=Q}#r=(St(this,E),St(this,R,null));get processor(){return this.#r}set processor(Q){this.#r=Q}#i=(St(this,z),St(this,Y,""));get dataContextPath(){return this.#i}set dataContextPath(Q){this.#i=Q}#l=(St(this,K),St(this,we,!1));get enableCustomElements(){return this.#l}set enableCustomElements(Q){this.#l=Q}set weight(Q){this.#s=Q,this.style.setProperty("--weight",`${Q}`)}get weight(){return this.#s}#s=(St(this,ut),1);static{this.styles=[ot,Ve`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 80%;
      }
    `]}#u=null;willUpdate(Q){Q.has("childComponents")&&(this.#u&&this.#u(),this.#u=V_(()=>{const Z=this.childComponents??null,A=this.renderComponentTree(Z);Dd(A,this,{host:this})}))}disconnectedCallback(){super.disconnectedCallback(),this.#u&&this.#u()}renderComponentTree(Q){return!Q||!Array.isArray(Q)?I:G` ${H_(Q,Z=>{if(this.enableCustomElements){const de=zm.get(Z.type)||customElements.get(Z.type);if(de){const U=Z,X=new de;X.id=U.id,U.slotName&&(X.slot=U.slotName),X.component=U,X.weight=U.weight??"initial",X.processor=this.processor,X.surfaceId=this.surfaceId,X.dataContextPath=U.dataContextPath??"/";for(const[te,me]of Object.entries(Z.properties))X[te]=me;return G`${X}`}}switch(Z.type){case"List":{const A=Z,de=A.properties.children;return G`<a2ui-list
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .direction=${A.properties.direction??"vertical"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .childComponents=${de}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-list>`}case"Card":{const A=Z;let de=A.properties.children;return!de&&A.properties.child&&(de=[A.properties.child]),G`<a2ui-card
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .childComponents=${de}
            .dataContextPath=${A.dataContextPath??""}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-card>`}case"Column":{const A=Z;return G`<a2ui-column
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .childComponents=${A.properties.children??null}
            .dataContextPath=${A.dataContextPath??""}
            .alignment=${A.properties.alignment??"stretch"}
            .distribution=${A.properties.distribution??"start"}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-column>`}case"Row":{const A=Z;return G`<a2ui-row
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .childComponents=${A.properties.children??null}
            .dataContextPath=${A.dataContextPath??""}
            .alignment=${A.properties.alignment??"stretch"}
            .distribution=${A.properties.distribution??"start"}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-row>`}case"Image":{const A=Z;return G`<a2ui-image
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .url=${A.properties.url??null}
            .dataContextPath=${A.dataContextPath??""}
            .usageHint=${A.properties.usageHint}
            .fit=${A.properties.fit}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-image>`}case"Icon":{const A=Z;return G`<a2ui-icon
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .name=${A.properties.name??null}
            .dataContextPath=${A.dataContextPath??""}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-icon>`}case"AudioPlayer":{const A=Z;return G`<a2ui-audioplayer
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .url=${A.properties.url??null}
            .dataContextPath=${A.dataContextPath??""}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-audioplayer>`}case"Button":{const A=Z;return G`<a2ui-button
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath??""}
            .action=${A.properties.action}
            .childComponents=${[A.properties.child]}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-button>`}case"Text":{const A=Z;return G`<a2ui-text
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .model=${this.processor}
            .surfaceId=${this.surfaceId}
            .processor=${this.processor}
            .dataContextPath=${A.dataContextPath}
            .text=${A.properties.text}
            .usageHint=${A.properties.usageHint}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-text>`}case"CheckBox":{const A=Z;return G`<a2ui-checkbox
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath??""}
            .label=${A.properties.label}
            .value=${A.properties.value}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-checkbox>`}case"DateTimeInput":{const A=Z;return G`<a2ui-datetimeinput
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath??""}
            .enableDate=${A.properties.enableDate??!0}
            .enableTime=${A.properties.enableTime??!0}
            .value=${A.properties.value}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-datetimeinput>`}case"Divider":{const A=Z;return G`<a2ui-divider
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .thickness=${A.properties.thickness}
            .axis=${A.properties.axis}
            .color=${A.properties.color}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-divider>`}case"MultipleChoice":{const A=Z;return G`<a2ui-multiplechoice
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .options=${A.properties.options}
            .maxAllowedSelections=${A.properties.maxAllowedSelections}
            .selections=${A.properties.selections}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-multiplechoice>`}case"Slider":{const A=Z;return G`<a2ui-slider
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .value=${A.properties.value}
            .minValue=${A.properties.minValue}
            .maxValue=${A.properties.maxValue}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-slider>`}case"TextField":{const A=Z;return G`<a2ui-textfield
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .label=${A.properties.label}
            .text=${A.properties.text}
            .type=${A.properties.type}
            .validationRegexp=${A.properties.validationRegexp}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-textfield>`}case"Video":{const A=Z;return G`<a2ui-video
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .url=${A.properties.url}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-video>`}case"Tabs":{const A=Z,de=[],U=[];if(A.properties.tabItems)for(const X of A.properties.tabItems)de.push(X.title),U.push(X.child);return G`<a2ui-tabs
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .titles=${de}
            .childComponents=${U}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-tabs>`}case"Modal":{const A=Z,de=[A.properties.entryPointChild,A.properties.contentChild];return A.properties.entryPointChild.slotName="entry",G`<a2ui-modal
            id=${A.id}
            slot=${A.slotName?A.slotName:I}
            .component=${A}
            .weight=${A.weight??"initial"}
            .processor=${this.processor}
            .surfaceId=${this.surfaceId}
            .dataContextPath=${A.dataContextPath}
            .childComponents=${de}
            .enableCustomElements=${this.enableCustomElements}
          ></a2ui-modal>`}default:return this.renderCustomComponent(Z)}})}`}renderCustomComponent(Q){if(!this.enableCustomElements)return;const Z=Q,de=zm.get(Q.type)||customElements.get(Q.type);if(!de)return G`Unknown element ${Q.type}`;const U=new de;U.id=Z.id,Z.slotName&&(U.slot=Z.slotName),U.component=Z,U.weight=Z.weight??"initial",U.processor=this.processor,U.surfaceId=this.surfaceId,U.dataContextPath=Z.dataContextPath??"/";for(const[X,te]of Object.entries(Q.properties))U[X]=te;return G`${U}`}render(){return G`<slot></slot>`}static{St(u,i)}},u})();const xe=fu(class extends hu{constructor(n){if(super(n),n.type!==Li.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter((a=>n[a])).join(" ")+" "}update(n,[a]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter((u=>u!==""))));for(const u in a)a[u]&&!this.nt?.has(u)&&this.st.add(u);return this.render(a)}const i=n.element.classList;for(const u of this.st)u in a||(i.remove(u),this.st.delete(u));for(const u in a){const s=!!a[u];s===this.st.has(u)||this.nt?.has(u)||(s?(i.add(u),this.st.add(u)):(i.remove(u),this.st.delete(u)))}return pn}});const dg="important",Y_=" !"+dg,dt=fu(class extends hu{constructor(n){if(super(n),n.type!==Li.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce(((a,i)=>{const u=n[i];return u==null?a:a+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${u};`}),"")}update(n,[a]){const{style:i}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(a)),this.render(a);for(const u of this.ft)a[u]==null&&(this.ft.delete(u),u.includes("-")?i.removeProperty(u):i[u]=null);for(const u in a){const s=a[u];if(s!=null){this.ft.add(u);const c=typeof s=="string"&&s.endsWith(Y_);u.includes("-")||c?i.setProperty(u,c?s.slice(0,-11):s,c?dg:""):i[u]=s}}return pn}});var $m=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},T0=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-audioplayer")],a,i=[],u,s=ct,c,f=[],h=[];return class extends s{static{u=this}static{const b=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],$m(this,null,c,{kind:"accessor",name:"url",static:!1,private:!1,access:{has:m=>"url"in m,get:m=>m.url,set:(m,y)=>{m.url=y}},metadata:b},f,h),$m(null,a={value:u},n,{kind:"class",name:u.name,metadata:b},null,i),u=a.value,b&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:b})}#e=T0(this,f,null);get url(){return this.#e}set url(b){this.#e=b}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      audio {
        display: block;
        width: 100%;
      }
    `]}#t(){if(!this.url)return I;if(this.url&&typeof this.url=="object"){if("literalString"in this.url)return G`<audio controls src=${this.url.literalString} />`;if("literal"in this.url)return G`<audio controls src=${this.url.literal} />`;if(this.url&&"path"in this.url&&this.url.path){if(!this.processor||!this.component)return G`(no processor)`;const b=this.processor.getData(this.component,this.url.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return b?typeof b!="string"?G`Invalid audio URL`:G`<audio controls src=${b} />`:G`Invalid audio URL`}}return G`(empty)`}render(){return G`<section
      class=${xe(this.theme.components.AudioPlayer)}
      style=${this.theme.additionalStyles?.AudioPlayer?dt(this.theme.additionalStyles?.AudioPlayer):I}
    >
      ${this.#t()}
    </section>`}constructor(){super(...arguments),T0(this,h)}static{T0(u,i)}},u})();var Om=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},z0=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-button")],a,i=[],u,s=ct,c,f=[],h=[];return class extends s{static{u=this}static{const b=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],Om(this,null,c,{kind:"accessor",name:"action",static:!1,private:!1,access:{has:m=>"action"in m,get:m=>m.action,set:(m,y)=>{m.action=y}},metadata:b},f,h),Om(null,a={value:u},n,{kind:"class",name:u.name,metadata:b},null,i),u=a.value,b&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:b})}#e=z0(this,f,null);get action(){return this.#e}set action(b){this.#e=b}static{this.styles=[ot,Ve`
      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
      }
    `]}render(){return G`<button
      class=${xe(this.theme.components.Button)}
      style=${this.theme.additionalStyles?.Button?dt(this.theme.additionalStyles?.Button):I}
      @click=${()=>{if(!this.action)return;const b=new Md({eventType:"a2ui.action",action:this.action,dataContextPath:this.dataContextPath,sourceComponentId:this.id,sourceComponent:this.component});this.dispatchEvent(b)}}
    >
      <slot></slot>
    </button>`}constructor(){super(...arguments),z0(this,h)}static{z0(u,i)}},u})();var Z_=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},X_=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-card")],a,i=[],u,s=ct;return class extends s{static{u=this}static{const c=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;Z_(null,a={value:u},n,{kind:"class",name:u.name,metadata:c},null,i),u=a.value,c&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:c})}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      section {
        height: 100%;
        width: 100%;
        min-height: 0;
        overflow: auto;

        ::slotted(*) {
          height: 100%;
          width: 100%;
        }
      }
    `]}render(){return G` <section
      class=${xe(this.theme.components.Card)}
      style=${this.theme.additionalStyles?.Card?dt(this.theme.additionalStyles?.Card):I}
    >
      <slot></slot>
    </section>`}static{X_(u,i)}},u})();var $0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},pi=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-checkbox")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[];return class extends s{static{u=this}static{const p=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],$0(this,null,c,{kind:"accessor",name:"value",static:!1,private:!1,access:{has:_=>"value"in _,get:_=>_.value,set:(_,x)=>{_.value=x}},metadata:p},f,h),$0(this,null,b,{kind:"accessor",name:"label",static:!1,private:!1,access:{has:_=>"label"in _,get:_=>_.label,set:(_,x)=>{_.label=x}},metadata:p},m,y),$0(null,a={value:u},n,{kind:"class",name:u.name,metadata:p},null,i),u=a.value,p&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:p})}#e=pi(this,f,null);get value(){return this.#e}set value(p){this.#e=p}#t=(pi(this,h),pi(this,m,null));get label(){return this.#t}set label(p){this.#t=p}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      input {
        display: block;
        width: 100%;
      }

      .description {
        font-size: 14px;
        margin-bottom: 4px;
      }
    `]}#a(p){!this.value||!this.processor||"path"in this.value&&this.value.path&&this.processor.setData(this.component,this.value.path,p,this.surfaceId??Ze.DEFAULT_SURFACE_ID)}#n(p){return G` <section
      class=${xe(this.theme.components.CheckBox.container)}
      style=${this.theme.additionalStyles?.CheckBox?dt(this.theme.additionalStyles?.CheckBox):I}
    >
      <input
        class=${xe(this.theme.components.CheckBox.element)}
        autocomplete="off"
        @input=${_=>{_.target instanceof HTMLInputElement&&this.#a(_.target.value)}}
        id="data"
        type="checkbox"
        .value=${p}
      />
      <label class=${xe(this.theme.components.CheckBox.label)} for="data"
        >${this.label?.literalString}</label
      >
    </section>`}render(){if(this.value&&typeof this.value=="object"){if("literalBoolean"in this.value&&this.value.literalBoolean)return this.#n(this.value.literalBoolean);if("literal"in this.value&&this.value.literal!==void 0)return this.#n(this.value.literal);if(this.value&&"path"in this.value&&this.value.path){if(!this.processor||!this.component)return G`(no model)`;const p=this.processor.getData(this.component,this.value.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return p===null?G`Invalid label`:typeof p!="boolean"?G`Invalid label`:this.#n(p)}}return I}constructor(){super(...arguments),pi(this,y)}static{pi(u,i)}},u})();var O0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},mi=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-column")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[];return class extends s{static{u=this}static{const p=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re({reflect:!0,type:String})],b=[re({reflect:!0,type:String})],O0(this,null,c,{kind:"accessor",name:"alignment",static:!1,private:!1,access:{has:_=>"alignment"in _,get:_=>_.alignment,set:(_,x)=>{_.alignment=x}},metadata:p},f,h),O0(this,null,b,{kind:"accessor",name:"distribution",static:!1,private:!1,access:{has:_=>"distribution"in _,get:_=>_.distribution,set:(_,x)=>{_.distribution=x}},metadata:p},m,y),O0(null,a={value:u},n,{kind:"class",name:u.name,metadata:p},null,i),u=a.value,p&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:p})}#e=mi(this,f,"stretch");get alignment(){return this.#e}set alignment(p){this.#e=p}#t=(mi(this,h),mi(this,m,"start"));get distribution(){return this.#t}set distribution(p){this.#t=p}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        flex: var(--weight);
      }

      section {
        display: flex;
        flex-direction: column;
        min-width: 100%;
        height: 100%;
      }

      :host([alignment="start"]) section {
        align-items: start;
      }

      :host([alignment="center"]) section {
        align-items: center;
      }

      :host([alignment="end"]) section {
        align-items: end;
      }

      :host([alignment="stretch"]) section {
        align-items: stretch;
      }

      :host([distribution="start"]) section {
        justify-content: start;
      }

      :host([distribution="center"]) section {
        justify-content: center;
      }

      :host([distribution="end"]) section {
        justify-content: end;
      }

      :host([distribution="spaceBetween"]) section {
        justify-content: space-between;
      }

      :host([distribution="spaceAround"]) section {
        justify-content: space-around;
      }

      :host([distribution="spaceEvenly"]) section {
        justify-content: space-evenly;
      }
    `]}render(){return G`<section
      class=${xe(this.theme.components.Column)}
      style=${this.theme.additionalStyles?.Column?dt(this.theme.additionalStyles?.Column):I}
    >
      <slot></slot>
    </section>`}constructor(){super(...arguments),mi(this,y)}static{mi(u,i)}},u})();var bi=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},Xn=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-datetimeinput")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[],v,w=[],C=[];return class extends s{static{u=this}static{const E=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re({reflect:!1,type:Boolean})],v=[re({reflect:!1,type:Boolean})],bi(this,null,c,{kind:"accessor",name:"value",static:!1,private:!1,access:{has:q=>"value"in q,get:q=>q.value,set:(q,R)=>{q.value=R}},metadata:E},f,h),bi(this,null,b,{kind:"accessor",name:"label",static:!1,private:!1,access:{has:q=>"label"in q,get:q=>q.label,set:(q,R)=>{q.label=R}},metadata:E},m,y),bi(this,null,p,{kind:"accessor",name:"enableDate",static:!1,private:!1,access:{has:q=>"enableDate"in q,get:q=>q.enableDate,set:(q,R)=>{q.enableDate=R}},metadata:E},_,x),bi(this,null,v,{kind:"accessor",name:"enableTime",static:!1,private:!1,access:{has:q=>"enableTime"in q,get:q=>q.enableTime,set:(q,R)=>{q.enableTime=R}},metadata:E},w,C),bi(null,a={value:u},n,{kind:"class",name:u.name,metadata:E},null,i),u=a.value,E&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:E})}#e=Xn(this,f,null);get value(){return this.#e}set value(E){this.#e=E}#t=(Xn(this,h),Xn(this,m,null));get label(){return this.#t}set label(E){this.#t=E}#a=(Xn(this,y),Xn(this,_,!0));get enableDate(){return this.#a}set enableDate(E){this.#a=E}#n=(Xn(this,x),Xn(this,w,!0));get enableTime(){return this.#n}set enableTime(E){this.#n=E}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      input {
        display: block;
        border-radius: 8px;
        padding: 8px;
        border: 1px solid #ccc;
        width: 100%;
      }
    `]}#r(E){!this.value||!this.processor||"path"in this.value&&this.value.path&&this.processor.setData(this.component,this.value.path,E,this.surfaceId??Ze.DEFAULT_SURFACE_ID)}#i(E){return G`<section
      class=${xe(this.theme.components.DateTimeInput.container)}
    >
      <label
        for="data"
        class=${xe(this.theme.components.DateTimeInput.label)}
        >${this.#o()}</label
      >
      <input
        autocomplete="off"
        class=${xe(this.theme.components.DateTimeInput.element)}
        style=${this.theme.additionalStyles?.DateTimeInput?dt(this.theme.additionalStyles?.DateTimeInput):I}
        @input=${q=>{q.target instanceof HTMLInputElement&&this.#r(q.target.value)}}
        id="data"
        name="data"
        .value=${this.#s(E)}
        .placeholder=${this.#o()}
        .type=${this.#l()}
      />
    </section>`}#l(){return this.enableDate&&this.enableTime?"datetime-local":this.enableDate?"date":this.enableTime?"time":"datetime-local"}#s(E){const q=this.#l(),R=E?new Date(E):null;if(!R||isNaN(R.getTime()))return"";const z=this.#u(R.getFullYear()),$=this.#u(R.getMonth()),Y=this.#u(R.getDate()),K=this.#u(R.getHours()),ce=this.#u(R.getMinutes());return q==="date"?`${z}-${$}-${Y}`:q==="time"?`${K}:${ce}`:`${z}-${$}-${Y}T${K}:${ce}`}#u(E){return E.toString().padStart(2,"0")}#o(){const E=this.#l();return E==="date"?"Date":E==="time"?"Time":"Date & Time"}render(){if(this.value&&typeof this.value=="object"){if("literalString"in this.value&&this.value.literalString)return this.#i(this.value.literalString);if("literal"in this.value&&this.value.literal!==void 0)return this.#i(this.value.literal);if(this.value&&"path"in this.value&&this.value.path){if(!this.processor||!this.component)return G`(no model)`;const E=this.processor.getData(this.component,this.value.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return typeof E!="string"?G`(invalid)`:this.#i(E)}}return I}constructor(){super(...arguments),Xn(this,C)}static{Xn(u,i)}},u})();var Q_=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},I_=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-divider")],a,i=[],u,s=ct;return class extends s{static{u=this}static{const c=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;Q_(null,a={value:u},n,{kind:"class",name:u.name,metadata:c},null,i),u=a.value,c&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:c})}static{this.styles=[ot,Ve`
      :host {
        display: block;
        min-height: 0;
        overflow: auto;
      }

      hr {
        height: 1px;
        background: #ccc;
        border: none;
      }
    `]}render(){return G`<hr
      class=${xe(this.theme.components.Divider)}
      style=${this.theme.additionalStyles?.Divider?dt(this.theme.additionalStyles?.Divider):I}
    />`}static{I_(u,i)}},u})();var Mm=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},M0=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-icon")],a,i=[],u,s=ct,c,f=[],h=[];return class extends s{static{u=this}static{const b=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],Mm(this,null,c,{kind:"accessor",name:"name",static:!1,private:!1,access:{has:m=>"name"in m,get:m=>m.name,set:(m,y)=>{m.name=y}},metadata:b},f,h),Mm(null,a={value:u},n,{kind:"class",name:u.name,metadata:b},null,i),u=a.value,b&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:b})}#e=M0(this,f,null);get name(){return this.#e}set name(b){this.#e=b}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }
    `]}#t(){if(!this.name)return I;const b=m=>(m=m.replace(/([A-Z])/gm,"_$1").toLocaleLowerCase(),G`<span class="g-icon">${m}</span>`);if(this.name&&typeof this.name=="object"){if("literalString"in this.name){const m=this.name.literalString??"";return b(m)}else if("literal"in this.name){const m=this.name.literal??"";return b(m)}else if(this.name&&"path"in this.name&&this.name.path){if(!this.processor||!this.component)return G`(no model)`;const m=this.processor.getData(this.component,this.name.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return m?typeof m!="string"?G`Invalid icon name`:b(m):G`Invalid icon name`}}return G`(empty)`}render(){return G`<section
      class=${xe(this.theme.components.Icon)}
      style=${this.theme.additionalStyles?.Icon?dt(this.theme.additionalStyles?.Icon):I}
    >
      ${this.#t()}
    </section>`}constructor(){super(...arguments),M0(this,h)}static{M0(u,i)}},u})();var hs=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},Pa=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-image")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[];return class extends s{static{u=this}static{const v=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re()],hs(this,null,c,{kind:"accessor",name:"url",static:!1,private:!1,access:{has:w=>"url"in w,get:w=>w.url,set:(w,C)=>{w.url=C}},metadata:v},f,h),hs(this,null,b,{kind:"accessor",name:"usageHint",static:!1,private:!1,access:{has:w=>"usageHint"in w,get:w=>w.usageHint,set:(w,C)=>{w.usageHint=C}},metadata:v},m,y),hs(this,null,p,{kind:"accessor",name:"fit",static:!1,private:!1,access:{has:w=>"fit"in w,get:w=>w.fit,set:(w,C)=>{w.fit=C}},metadata:v},_,x),hs(null,a={value:u},n,{kind:"class",name:u.name,metadata:v},null,i),u=a.value,v&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}#e=Pa(this,f,null);get url(){return this.#e}set url(v){this.#e=v}#t=(Pa(this,h),Pa(this,m,null));get usageHint(){return this.#t}set usageHint(v){this.#t=v}#a=(Pa(this,y),Pa(this,_,null));get fit(){return this.#a}set fit(v){this.#a=v}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: var(--object-fit, fill);
      }
    `]}#n(){if(!this.url)return I;const v=w=>G`<img src=${w} />`;if(this.url&&typeof this.url=="object"){if("literalString"in this.url){const w=this.url.literalString??"";return v(w)}else if("literal"in this.url){const w=this.url.literal??"";return v(w)}else if(this.url&&"path"in this.url&&this.url.path){if(!this.processor||!this.component)return G`(no model)`;const w=this.processor.getData(this.component,this.url.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return w?typeof w!="string"?G`Invalid image URL`:v(w):G`Invalid image URL`}}return G`(empty)`}render(){const v=Kt(this.theme.components.Image.all,this.usageHint?this.theme.components.Image[this.usageHint]:{});return G`<section
      class=${xe(v)}
      style=${dt({...this.theme.additionalStyles?.Image??{},"--object-fit":this.fit??"fill"})}
    >
      ${this.#n()}
    </section>`}constructor(){super(...arguments),Pa(this,x)}static{Pa(u,i)}},u})();var Nm=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},N0=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-list")],a,i=[],u,s=ct,c,f=[],h=[];return class extends s{static{u=this}static{const b=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re({reflect:!0,type:String})],Nm(this,null,c,{kind:"accessor",name:"direction",static:!1,private:!1,access:{has:m=>"direction"in m,get:m=>m.direction,set:(m,y)=>{m.direction=y}},metadata:b},f,h),Nm(null,a={value:u},n,{kind:"class",name:u.name,metadata:b},null,i),u=a.value,b&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:b})}#e=N0(this,f,"vertical");get direction(){return this.#e}set direction(b){this.#e=b}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      :host([direction="vertical"]) section {
        display: grid;
      }

      :host([direction="horizontal"]) section {
        display: flex;
        max-width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;

        > ::slotted(*) {
          flex: 1 0 fit-content;
          max-width: min(80%, 400px);
        }
      }
    `]}render(){return G`<section
      class=${xe(this.theme.components.List)}
      style=${this.theme.additionalStyles?.List?dt(this.theme.additionalStyles?.List):I}
    >
      <slot></slot>
    </section>`}constructor(){super(...arguments),N0(this,h)}static{N0(u,i)}},u})();function cd(n,a,i,u){if(n!==null&&typeof n=="object"){if("literalString"in n)return n.literalString??"";if("literal"in n&&n.literal!==void 0)return n.literal??"";if(n&&"path"in n&&n.path){if(!i||!a)return"(no model)";const s=i.getData(a,n.path,u??Ze.DEFAULT_SURFACE_ID);return s===null||typeof s!="string"?"":s}}return""}function J_(n,a,i,u){if(n!==null&&typeof n=="object"){if("literalNumber"in n)return n.literalNumber??0;if("literal"in n&&n.literal!==void 0)return n.literal??0;if(n&&"path"in n&&n.path){if(!i||!a)return-1;let s=i.getData(a,n.path,u??Ze.DEFAULT_SURFACE_ID);return typeof s=="string"&&(s=Number.parseInt(s,10),Number.isNaN(s)&&(s=null)),s===null||typeof s!="number"?-1:s}}return 0}var ps=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},er=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-multiplechoice")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[];return class extends s{static{u=this}static{const v=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re()],ps(this,null,c,{kind:"accessor",name:"description",static:!1,private:!1,access:{has:w=>"description"in w,get:w=>w.description,set:(w,C)=>{w.description=C}},metadata:v},f,h),ps(this,null,b,{kind:"accessor",name:"options",static:!1,private:!1,access:{has:w=>"options"in w,get:w=>w.options,set:(w,C)=>{w.options=C}},metadata:v},m,y),ps(this,null,p,{kind:"accessor",name:"selections",static:!1,private:!1,access:{has:w=>"selections"in w,get:w=>w.selections,set:(w,C)=>{w.selections=C}},metadata:v},_,x),ps(null,a={value:u},n,{kind:"class",name:u.name,metadata:v},null,i),u=a.value,v&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}#e=er(this,f,null);get description(){return this.#e}set description(v){this.#e=v}#t=(er(this,h),er(this,m,[]));get options(){return this.#t}set options(v){this.#t=v}#a=(er(this,y),er(this,_,[]));get selections(){return this.#a}set selections(v){this.#a=v}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      select {
        width: 100%;
      }

      .description {
      }
    `]}#n(v){console.log(v),!(!this.selections||!this.processor)&&"path"in this.selections&&this.selections.path&&this.processor.setData(this.component,this.selections.path,v,this.surfaceId??Ze.DEFAULT_SURFACE_ID)}willUpdate(v){if(!v.has("options")||!this.processor||!this.component||Array.isArray(this.selections))return;this.selections;const C=this.processor.getData(this.component,this.selections.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);Array.isArray(C)&&this.#n(C)}render(){return G`<section class=${xe(this.theme.components.MultipleChoice.container)}>
      <label class=${xe(this.theme.components.MultipleChoice.label)} for="data">${this.description??"Select an item"}</div>
      <select
        name="data"
        id="data"
        class=${xe(this.theme.components.MultipleChoice.element)}
        style=${this.theme.additionalStyles?.MultipleChoice?dt(this.theme.additionalStyles?.MultipleChoice):I}
        @change=${v=>{v.target instanceof HTMLSelectElement&&this.#n([v.target.value])}}
      >
        ${this.options.map(v=>{const w=cd(v.label,this.component,this.processor,this.surfaceId);return G`<option ${v.value}>${w}</option>`})}
      </select>
    </section>`}constructor(){super(...arguments),er(this,x)}static{er(u,i)}},u})();const R0=new WeakMap,K_=fu(class extends z3{render(n){return I}update(n,[a]){const i=a!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=a,this.ht=n.options?.host,this.rt(this.ct=n.element)),I}rt(n){if(this.isConnected||(n=void 0),typeof this.G=="function"){const a=this.ht??globalThis;let i=R0.get(a);i===void 0&&(i=new WeakMap,R0.set(a,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,n),n!==void 0&&this.G.call(this.ht,n)}else this.G.value=n}get lt(){return typeof this.G=="function"?R0.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var j0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},gi=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0},ms=function(n,a,i){return typeof a=="symbol"&&(a=a.description?"[".concat(a.description,"]"):""),Object.defineProperty(n,"name",{configurable:!0,value:i?"".concat(i," ",a):a})};(()=>{let n=[Xe("a2ui-modal")],a,i=[],u,s=ct,c,f=[],h=[],b,m,y=[],p=[],_;return class extends s{static{u=this}static{const x=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[ar()],m=[Q3("dialog")],j0(this,b={get:ms(function(){return this.#e},"#showModal","get"),set:ms(function(v){this.#e=v},"#showModal","set")},c,{kind:"accessor",name:"#showModal",static:!1,private:!0,access:{has:v=>#t in v,get:v=>v.#t,set:(v,w)=>{v.#t=w}},metadata:x},f,h),j0(this,_={get:ms(function(){return this.#a},"#modalRef","get"),set:ms(function(v){this.#a=v},"#modalRef","set")},m,{kind:"accessor",name:"#modalRef",static:!1,private:!0,access:{has:v=>#n in v,get:v=>v.#n,set:(v,w)=>{v.#n=w}},metadata:x},y,p),j0(null,a={value:u},n,{kind:"class",name:u.name,metadata:x},null,i),u=a.value,x&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      dialog {
        padding: 0 0 0 0;
        border: none;
        background: none;

        & section {
          & #controls {
            display: flex;
            justify-content: end;
            margin-bottom: 4px;

            & button {
              padding: 0;
              background: none;
              width: 20px;
              height: 20px;
              pointer: cursor;
              border: none;
              cursor: pointer;
            }
          }
        }
      }
    `]}#e=gi(this,f,!1);get#t(){return b.get.call(this)}set#t(x){return b.set.call(this,x)}#a=(gi(this,h),gi(this,y,null));get#n(){return _.get.call(this)}set#n(x){return _.set.call(this,x)}#r(){this.#n&&(this.#n.open&&this.#n.close(),this.#t=!1)}render(){return this.#t?G`<dialog
      class=${xe(this.theme.components.Modal.backdrop)}
      @click=${x=>{const[v]=x.composedPath();v instanceof HTMLDialogElement&&this.#r()}}
      ${K_(x=>{requestAnimationFrame(()=>{!(x&&x instanceof HTMLDialogElement)||x.open||x.showModal()})})}
    >
      <section
        class=${xe(this.theme.components.Modal.element)}
        style=${this.theme.additionalStyles?.Modal?dt(this.theme.additionalStyles?.Modal):I}
      >
        <div id="controls">
          <button
            @click=${()=>{this.#r()}}
          >
            <span class="g-icon">close</span>
          </button>
        </div>
        <slot></slot>
      </section>
    </dialog>`:G`<section
        @click=${()=>{this.#t=!0}}
      >
        <slot name="entry"></slot>
      </section>`}constructor(){super(...arguments),gi(this,p)}static{gi(u,i)}},u})();var U0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},yi=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-row")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[];return class extends s{static{u=this}static{const p=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re({reflect:!0,type:String})],b=[re({reflect:!0,type:String})],U0(this,null,c,{kind:"accessor",name:"alignment",static:!1,private:!1,access:{has:_=>"alignment"in _,get:_=>_.alignment,set:(_,x)=>{_.alignment=x}},metadata:p},f,h),U0(this,null,b,{kind:"accessor",name:"distribution",static:!1,private:!1,access:{has:_=>"distribution"in _,get:_=>_.distribution,set:(_,x)=>{_.distribution=x}},metadata:p},m,y),U0(null,a={value:u},n,{kind:"class",name:u.name,metadata:p},null,i),u=a.value,p&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:p})}#e=yi(this,f,"stretch");get alignment(){return this.#e}set alignment(p){this.#e=p}#t=(yi(this,h),yi(this,m,"start"));get distribution(){return this.#t}set distribution(p){this.#t=p}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        flex: var(--weight);
      }

      section {
        display: flex;
        flex-direction: row;
        width: 100%;
        min-height: 100%;
      }

      :host([alignment="start"]) section {
        align-items: start;
      }

      :host([alignment="center"]) section {
        align-items: center;
      }

      :host([alignment="end"]) section {
        align-items: end;
      }

      :host([alignment="stretch"]) section {
        align-items: stretch;
      }

      :host([distribution="start"]) section {
        justify-content: start;
      }

      :host([distribution="center"]) section {
        justify-content: center;
      }

      :host([distribution="end"]) section {
        justify-content: end;
      }

      :host([distribution="spaceBetween"]) section {
        justify-content: space-between;
      }

      :host([distribution="spaceAround"]) section {
        justify-content: space-around;
      }

      :host([distribution="spaceEvenly"]) section {
        justify-content: space-evenly;
      }
    `]}render(){return G`<section
      class=${xe(this.theme.components.Row)}
      style=${this.theme.additionalStyles?.Row?dt(this.theme.additionalStyles?.Row):I}
    >
      <slot></slot>
    </section>`}constructor(){super(...arguments),yi(this,y)}static{yi(u,i)}},u})();var Wr=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},hn=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-slider")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[],v,w=[],C=[],E,q=[],R=[];return class extends s{static{u=this}static{const z=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re()],v=[re()],E=[re()],Wr(this,null,c,{kind:"accessor",name:"value",static:!1,private:!1,access:{has:$=>"value"in $,get:$=>$.value,set:($,Y)=>{$.value=Y}},metadata:z},f,h),Wr(this,null,b,{kind:"accessor",name:"minValue",static:!1,private:!1,access:{has:$=>"minValue"in $,get:$=>$.minValue,set:($,Y)=>{$.minValue=Y}},metadata:z},m,y),Wr(this,null,p,{kind:"accessor",name:"maxValue",static:!1,private:!1,access:{has:$=>"maxValue"in $,get:$=>$.maxValue,set:($,Y)=>{$.maxValue=Y}},metadata:z},_,x),Wr(this,null,v,{kind:"accessor",name:"label",static:!1,private:!1,access:{has:$=>"label"in $,get:$=>$.label,set:($,Y)=>{$.label=Y}},metadata:z},w,C),Wr(this,null,E,{kind:"accessor",name:"inputType",static:!1,private:!1,access:{has:$=>"inputType"in $,get:$=>$.inputType,set:($,Y)=>{$.inputType=Y}},metadata:z},q,R),Wr(null,a={value:u},n,{kind:"class",name:u.name,metadata:z},null,i),u=a.value,z&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:z})}#e=hn(this,f,null);get value(){return this.#e}set value(z){this.#e=z}#t=(hn(this,h),hn(this,m,0));get minValue(){return this.#t}set minValue(z){this.#t=z}#a=(hn(this,y),hn(this,_,0));get maxValue(){return this.#a}set maxValue(z){this.#a=z}#n=(hn(this,x),hn(this,w,null));get label(){return this.#n}set label(z){this.#n=z}#r=(hn(this,C),hn(this,q,null));get inputType(){return this.#r}set inputType(z){this.#r=z}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
      }

      input {
        display: block;
        width: 100%;
      }

      .description {
      }
    `]}#i(z){!this.value||!this.processor||"path"in this.value&&this.value.path&&this.processor.setData(this.component,this.value.path,z,this.surfaceId??Ze.DEFAULT_SURFACE_ID)}#l(z){return G`<section
      class=${xe(this.theme.components.Slider.container)}
    >
      <label class=${xe(this.theme.components.Slider.label)} for="data">
        ${this.label?.literalString??""}
      </label>
      <input
        autocomplete="off"
        class=${xe(this.theme.components.Slider.element)}
        style=${this.theme.additionalStyles?.Slider?dt(this.theme.additionalStyles?.Slider):I}
        @input=${$=>{$.target instanceof HTMLInputElement&&this.#i($.target.value)}}
        id="data"
        name="data"
        .value=${z}
        type="range"
        min=${this.minValue??"0"}
        max=${this.maxValue??"0"}
      />
      <span class=${xe(this.theme.components.Slider.label)}
        >${this.value?J_(this.value,this.component,this.processor,this.surfaceId):"0"}</span
      >
    </section>`}render(){if(this.value&&typeof this.value=="object"){if("literalNumber"in this.value&&this.value.literalNumber)return this.#l(this.value.literalNumber);if("literal"in this.value&&this.value.literal!==void 0)return this.#l(this.value.literal);if(this.value&&"path"in this.value&&this.value.path){if(!this.processor||!this.component)return G`(no processor)`;const z=this.processor.getData(this.component,this.value.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return z===null?G`Invalid value`:typeof z!="string"&&typeof z!="number"?G`Invalid value`:this.#l(z)}}return I}constructor(){super(...arguments),hn(this,R)}static{hn(u,i)}},u})();var bs=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},tr=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-surface")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[];return class extends s{static{u=this}static{const v=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re()],bs(this,null,c,{kind:"accessor",name:"surfaceId",static:!1,private:!1,access:{has:w=>"surfaceId"in w,get:w=>w.surfaceId,set:(w,C)=>{w.surfaceId=C}},metadata:v},f,h),bs(this,null,b,{kind:"accessor",name:"surface",static:!1,private:!1,access:{has:w=>"surface"in w,get:w=>w.surface,set:(w,C)=>{w.surface=C}},metadata:v},m,y),bs(this,null,p,{kind:"accessor",name:"processor",static:!1,private:!1,access:{has:w=>"processor"in w,get:w=>w.processor,set:(w,C)=>{w.processor=C}},metadata:v},_,x),bs(null,a={value:u},n,{kind:"class",name:u.name,metadata:v},null,i),u=a.value,v&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}#e=tr(this,f,null);get surfaceId(){return this.#e}set surfaceId(v){this.#e=v}#t=(tr(this,h),tr(this,m,null));get surface(){return this.#t}set surface(v){this.#t=v}#a=(tr(this,y),tr(this,_,null));get processor(){return this.#a}set processor(v){this.#a=v}static{this.styles=[Ve`
      :host {
        display: flex;
        min-height: 0;
        max-height: 100%;
        flex-direction: column;
        gap: 16px;
      }

      #surface-logo {
        display: flex;
        justify-content: center;

        & img {
          width: 50%;
          max-width: 220px;
        }
      }

      a2ui-root {
        flex: 1;
      }
    `]}#n(){return this.surface?.styles.logoUrl?G`<div id="surface-logo">
      <img src=${this.surface.styles.logoUrl} />
    </div>`:I}#r(){const v={};if(this.surface?.styles)for(const[w,C]of Object.entries(this.surface.styles))switch(w){case"primaryColor":{v["--p-100"]="#ffffff",v["--p-99"]=`color-mix(in srgb, ${C} 2%, white 98%)`,v["--p-98"]=`color-mix(in srgb, ${C} 4%, white 96%)`,v["--p-95"]=`color-mix(in srgb, ${C} 10%, white 90%)`,v["--p-90"]=`color-mix(in srgb, ${C} 20%, white 80%)`,v["--p-80"]=`color-mix(in srgb, ${C} 40%, white 60%)`,v["--p-70"]=`color-mix(in srgb, ${C} 60%, white 40%)`,v["--p-60"]=`color-mix(in srgb, ${C} 80%, white 20%)`,v["--p-50"]=C,v["--p-40"]=`color-mix(in srgb, ${C} 80%, black 20%)`,v["--p-35"]=`color-mix(in srgb, ${C} 70%, black 30%)`,v["--p-30"]=`color-mix(in srgb, ${C} 60%, black 40%)`,v["--p-25"]=`color-mix(in srgb, ${C} 50%, black 50%)`,v["--p-20"]=`color-mix(in srgb, ${C} 40%, black 60%)`,v["--p-15"]=`color-mix(in srgb, ${C} 30%, black 70%)`,v["--p-10"]=`color-mix(in srgb, ${C} 20%, black 80%)`,v["--p-5"]=`color-mix(in srgb, ${C} 10%, black 90%)`,v["--0"]="#00000";break}case"font":{v["--font-family"]=C,v["--font-family-flex"]=C;break}}return G`<a2ui-root
      style=${dt(v)}
      .surfaceId=${this.surfaceId}
      .processor=${this.processor}
      .childComponents=${this.surface?.componentTree?[this.surface.componentTree]:null}
    ></a2ui-root>`}render(){return this.surface?G`${[this.#n(),this.#r()]}`:I}constructor(){super(...arguments),tr(this,x)}static{tr(u,i)}},u})();const Rm=(n,a,i)=>{const u=new Map;for(let s=a;s<=i;s++)u.set(n[s],s);return u},Oi=fu(class extends hu{constructor(n){if(super(n),n.type!==Li.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,a,i){let u;i===void 0?i=a:a!==void 0&&(u=a);const s=[],c=[];let f=0;for(const h of n)s[f]=u?u(h,f):f,c[f]=i(h,f),f++;return{values:c,keys:s}}render(n,a,i){return this.dt(n,a,i).values}update(n,[a,i,u]){const s=k3(n),{values:c,keys:f}=this.dt(a,i,u);if(!Array.isArray(s))return this.ut=f,c;const h=this.ut??=[],b=[];let m,y,p=0,_=s.length-1,x=0,v=c.length-1;for(;p<=_&&x<=v;)if(s[p]===null)p++;else if(s[_]===null)_--;else if(h[p]===f[x])b[x]=Wa(s[p],c[x]),p++,x++;else if(h[_]===f[v])b[v]=Wa(s[_],c[v]),_--,v--;else if(h[p]===f[v])b[v]=Wa(s[p],c[v]),hi(n,b[v+1],s[p]),p++,v--;else if(h[_]===f[x])b[x]=Wa(s[_],c[x]),hi(n,s[p],s[_]),_--,x++;else if(m===void 0&&(m=Rm(f,x,v),y=Rm(h,p,_)),m.has(h[p]))if(m.has(h[_])){const w=y.get(f[x]),C=w!==void 0?s[w]:null;if(C===null){const E=hi(n,s[p]);Wa(E,c[x]),b[x]=E}else b[x]=Wa(C,c[x]),hi(n,s[p],C),s[w]=null;x++}else w0(s[_]),_--;else w0(s[p]),p++;for(;x<=v;){const w=hi(n,b[v+1]);Wa(w,c[x]),b[x++]=w}for(;p<=_;){const w=s[p++];w!==null&&w0(w)}return this.ut=f,E3(n,b),pn}});var B0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},vi=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-tabs")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[];return class extends s{static{u=this}static{const p=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],B0(this,null,c,{kind:"accessor",name:"titles",static:!1,private:!1,access:{has:_=>"titles"in _,get:_=>_.titles,set:(_,x)=>{_.titles=x}},metadata:p},f,h),B0(this,null,b,{kind:"accessor",name:"selected",static:!1,private:!1,access:{has:_=>"selected"in _,get:_=>_.selected,set:(_,x)=>{_.selected=x}},metadata:p},m,y),B0(null,a={value:u},n,{kind:"class",name:u.name,metadata:p},null,i),u=a.value,p&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:p})}#e=vi(this,f,null);get titles(){return this.#e}set titles(p){this.#e=p}#t=(vi(this,h),vi(this,m,0));get selected(){return this.#t}set selected(p){this.#t=p}static{this.styles=[ot,Ve`
      :host {
        display: block;
        flex: var(--weight);
      }
    `]}willUpdate(p){if(super.willUpdate(p),p.has("selected")){for(const x of this.children)x.removeAttribute("slot");const _=this.children[this.selected];if(!_)return;_.slot="current"}}#a(){return this.titles?G`<div
      id="buttons"
      class=${xe(this.theme.components.Tabs.element)}
    >
      ${Oi(this.titles,(p,_)=>{let x="";if("literalString"in p&&p.literalString)x=p.literalString;else if("literal"in p&&p.literal!==void 0)x=p.literal;else if(p&&"path"in p&&p.path){if(!this.processor||!this.component)return G`(no model)`;const w=this.processor.getData(this.component,p.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);if(typeof w!="string")return G`(invalid)`;x=w}let v;return this.selected===_?v=Kt(this.theme.components.Tabs.controls.all,this.theme.components.Tabs.controls.selected):v={...this.theme.components.Tabs.controls.all},G`<button
          ?disabled=${this.selected===_}
          class=${xe(v)}
          @click=${()=>{this.selected=_}}
        >
          ${x}
        </button>`})}
    </div>`:I}#n(){return G`<slot name="current"></slot>`}render(){return G`<section
      class=${xe(this.theme.components.Tabs.container)}
      style=${this.theme.additionalStyles?.Tabs?dt(this.theme.additionalStyles?.Tabs):I}
    >
      ${[this.#a(),this.#n()]}
    </section>`}constructor(){super(...arguments),vi(this,y)}static{vi(u,i)}},u})();var gs=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},nr=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-textfield")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[],p,_=[],x=[];return class extends s{static{u=this}static{const v=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re()],p=[re()],gs(this,null,c,{kind:"accessor",name:"text",static:!1,private:!1,access:{has:w=>"text"in w,get:w=>w.text,set:(w,C)=>{w.text=C}},metadata:v},f,h),gs(this,null,b,{kind:"accessor",name:"label",static:!1,private:!1,access:{has:w=>"label"in w,get:w=>w.label,set:(w,C)=>{w.label=C}},metadata:v},m,y),gs(this,null,p,{kind:"accessor",name:"inputType",static:!1,private:!1,access:{has:w=>"inputType"in w,get:w=>w.inputType,set:(w,C)=>{w.inputType=C}},metadata:v},_,x),gs(null,a={value:u},n,{kind:"class",name:u.name,metadata:v},null,i),u=a.value,v&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}#e=nr(this,f,null);get text(){return this.#e}set text(v){this.#e=v}#t=(nr(this,h),nr(this,m,null));get label(){return this.#t}set label(v){this.#t=v}#a=(nr(this,y),nr(this,_,null));get inputType(){return this.#a}set inputType(v){this.#a=v}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: flex;
        flex: var(--weight);
      }

      input {
        display: block;
        width: 100%;
      }

      label {
        display: block;
        margin-bottom: 4px;
      }
    `]}#n(v){!this.text||!this.processor||"path"in this.text&&this.text.path&&this.processor.setData(this.component,this.text.path,v,this.surfaceId??Ze.DEFAULT_SURFACE_ID)}#r(v,w){return G` <section
      class=${xe(this.theme.components.TextField.container)}
    >
      ${w&&w!==""?G`<label
            class=${xe(this.theme.components.TextField.label)}
            for="data"
            >${w}</label
          >`:I}
      <input
        autocomplete="off"
        class=${xe(this.theme.components.TextField.element)}
        style=${this.theme.additionalStyles?.TextField?dt(this.theme.additionalStyles?.TextField):I}
        @input=${C=>{C.target instanceof HTMLInputElement&&this.#n(C.target.value)}}
        name="data"
        id="data"
        .value=${v}
        .placeholder=${"Please enter a value"}
        type=${this.inputType==="number"?"number":"text"}
      />
    </section>`}render(){const v=cd(this.label,this.component,this.processor,this.surfaceId),w=cd(this.text,this.component,this.processor,this.surfaceId);return this.#r(w,v)}constructor(){super(...arguments),nr(this,x)}static{nr(u,i)}},u})();class dd extends hu{constructor(a){if(super(a),this.it=I,a.type!==Li.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(a){if(a===I||a==null)return this._t=void 0,this.it=a;if(a===pn)return a;if(typeof a!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(a===this.it)return this._t;this.it=a;const i=[a];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}dd.directiveName="unsafeHTML",dd.resultType=1;const W_=fu(dd),jm={};function P_(n){let a=jm[n];if(a)return a;a=jm[n]=[];for(let i=0;i<128;i++){const u=String.fromCharCode(i);a.push(u)}for(let i=0;i<n.length;i++){const u=n.charCodeAt(i);a[u]="%"+("0"+u.toString(16).toUpperCase()).slice(-2)}return a}function cu(n,a){typeof a!="string"&&(a=cu.defaultChars);const i=P_(a);return n.replace(/(%[a-f0-9]{2})+/gi,function(u){let s="";for(let c=0,f=u.length;c<f;c+=3){const h=parseInt(u.slice(c+1,c+3),16);if(h<128){s+=i[h];continue}if((h&224)===192&&c+3<f){const b=parseInt(u.slice(c+4,c+6),16);if((b&192)===128){const m=h<<6&1984|b&63;m<128?s+="��":s+=String.fromCharCode(m),c+=3;continue}}if((h&240)===224&&c+6<f){const b=parseInt(u.slice(c+4,c+6),16),m=parseInt(u.slice(c+7,c+9),16);if((b&192)===128&&(m&192)===128){const y=h<<12&61440|b<<6&4032|m&63;y<2048||y>=55296&&y<=57343?s+="���":s+=String.fromCharCode(y),c+=6;continue}}if((h&248)===240&&c+9<f){const b=parseInt(u.slice(c+4,c+6),16),m=parseInt(u.slice(c+7,c+9),16),y=parseInt(u.slice(c+10,c+12),16);if((b&192)===128&&(m&192)===128&&(y&192)===128){let p=h<<18&1835008|b<<12&258048|m<<6&4032|y&63;p<65536||p>1114111?s+="����":(p-=65536,s+=String.fromCharCode(55296+(p>>10),56320+(p&1023))),c+=9;continue}}s+="�"}return s})}cu.defaultChars=";/?:@&=+$,#";cu.componentChars="";const Um={};function ex(n){let a=Um[n];if(a)return a;a=Um[n]=[];for(let i=0;i<128;i++){const u=String.fromCharCode(i);/^[0-9a-z]$/i.test(u)?a.push(u):a.push("%"+("0"+i.toString(16).toUpperCase()).slice(-2))}for(let i=0;i<n.length;i++)a[n.charCodeAt(i)]=n[i];return a}function Gi(n,a,i){typeof a!="string"&&(i=a,a=Gi.defaultChars),typeof i>"u"&&(i=!0);const u=ex(a);let s="";for(let c=0,f=n.length;c<f;c++){const h=n.charCodeAt(c);if(i&&h===37&&c+2<f&&/^[0-9a-f]{2}$/i.test(n.slice(c+1,c+3))){s+=n.slice(c,c+3),c+=2;continue}if(h<128){s+=u[h];continue}if(h>=55296&&h<=57343){if(h>=55296&&h<=56319&&c+1<f){const b=n.charCodeAt(c+1);if(b>=56320&&b<=57343){s+=encodeURIComponent(n[c]+n[c+1]),c++;continue}}s+="%EF%BF%BD";continue}s+=encodeURIComponent(n[c])}return s}Gi.defaultChars=";/?:@&=+$,-_.!~*'()#";Gi.componentChars="-_.!~*'()";function Ud(n){let a="";return a+=n.protocol||"",a+=n.slashes?"//":"",a+=n.auth?n.auth+"@":"",n.hostname&&n.hostname.indexOf(":")!==-1?a+="["+n.hostname+"]":a+=n.hostname||"",a+=n.port?":"+n.port:"",a+=n.pathname||"",a+=n.search||"",a+=n.hash||"",a}function Os(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const tx=/^([a-z0-9.+-]+:)/i,nx=/:[0-9]*$/,ax=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,rx=["<",">",'"',"`"," ","\r",`
`,"	"],ux=["{","}","|","\\","^","`"].concat(rx),ix=["'"].concat(ux),Bm=["%","/","?",";","#"].concat(ix),qm=["/","?","#"],lx=255,Fm=/^[+a-z0-9A-Z_-]{0,63}$/,sx=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Hm={javascript:!0,"javascript:":!0},Lm={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Bd(n,a){if(n&&n instanceof Os)return n;const i=new Os;return i.parse(n,a),i}Os.prototype.parse=function(n,a){let i,u,s,c=n;if(c=c.trim(),!a&&n.split("#").length===1){const m=ax.exec(c);if(m)return this.pathname=m[1],m[2]&&(this.search=m[2]),this}let f=tx.exec(c);if(f&&(f=f[0],i=f.toLowerCase(),this.protocol=f,c=c.substr(f.length)),(a||f||c.match(/^\/\/[^@\/]+@[^@\/]+/))&&(s=c.substr(0,2)==="//",s&&!(f&&Hm[f])&&(c=c.substr(2),this.slashes=!0)),!Hm[f]&&(s||f&&!Lm[f])){let m=-1;for(let v=0;v<qm.length;v++)u=c.indexOf(qm[v]),u!==-1&&(m===-1||u<m)&&(m=u);let y,p;m===-1?p=c.lastIndexOf("@"):p=c.lastIndexOf("@",m),p!==-1&&(y=c.slice(0,p),c=c.slice(p+1),this.auth=y),m=-1;for(let v=0;v<Bm.length;v++)u=c.indexOf(Bm[v]),u!==-1&&(m===-1||u<m)&&(m=u);m===-1&&(m=c.length),c[m-1]===":"&&m--;const _=c.slice(0,m);c=c.slice(m),this.parseHost(_),this.hostname=this.hostname||"";const x=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!x){const v=this.hostname.split(/\./);for(let w=0,C=v.length;w<C;w++){const E=v[w];if(E&&!E.match(Fm)){let q="";for(let R=0,z=E.length;R<z;R++)E.charCodeAt(R)>127?q+="x":q+=E[R];if(!q.match(Fm)){const R=v.slice(0,w),z=v.slice(w+1),$=E.match(sx);$&&(R.push($[1]),z.unshift($[2])),z.length&&(c=z.join(".")+c),this.hostname=R.join(".");break}}}}this.hostname.length>lx&&(this.hostname=""),x&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const h=c.indexOf("#");h!==-1&&(this.hash=c.substr(h),c=c.slice(0,h));const b=c.indexOf("?");return b!==-1&&(this.search=c.substr(b),c=c.slice(0,b)),c&&(this.pathname=c),Lm[i]&&this.hostname&&!this.pathname&&(this.pathname=""),this};Os.prototype.parseHost=function(n){let a=nx.exec(n);a&&(a=a[0],a!==":"&&(this.port=a.substr(1)),n=n.substr(0,n.length-a.length)),n&&(this.hostname=n)};const ox=Object.freeze(Object.defineProperty({__proto__:null,decode:cu,encode:Gi,format:Ud,parse:Bd},Symbol.toStringTag,{value:"Module"})),fg=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,hg=/[\0-\x1F\x7F-\x9F]/,cx=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,qd=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,pg=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,mg=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,dx=Object.freeze(Object.defineProperty({__proto__:null,Any:fg,Cc:hg,Cf:cx,P:qd,S:pg,Z:mg},Symbol.toStringTag,{value:"Module"})),fx=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(n=>n.charCodeAt(0))),hx=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(n=>n.charCodeAt(0)));var q0;const px=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),mx=(q0=String.fromCodePoint)!==null&&q0!==void 0?q0:function(n){let a="";return n>65535&&(n-=65536,a+=String.fromCharCode(n>>>10&1023|55296),n=56320|n&1023),a+=String.fromCharCode(n),a};function bx(n){var a;return n>=55296&&n<=57343||n>1114111?65533:(a=px.get(n))!==null&&a!==void 0?a:n}var mt;(function(n){n[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_F=102]="LOWER_F",n[n.LOWER_X=120]="LOWER_X",n[n.LOWER_Z=122]="LOWER_Z",n[n.UPPER_A=65]="UPPER_A",n[n.UPPER_F=70]="UPPER_F",n[n.UPPER_Z=90]="UPPER_Z"})(mt||(mt={}));const gx=32;var Da;(function(n){n[n.VALUE_LENGTH=49152]="VALUE_LENGTH",n[n.BRANCH_LENGTH=16256]="BRANCH_LENGTH",n[n.JUMP_TABLE=127]="JUMP_TABLE"})(Da||(Da={}));function fd(n){return n>=mt.ZERO&&n<=mt.NINE}function yx(n){return n>=mt.UPPER_A&&n<=mt.UPPER_F||n>=mt.LOWER_A&&n<=mt.LOWER_F}function vx(n){return n>=mt.UPPER_A&&n<=mt.UPPER_Z||n>=mt.LOWER_A&&n<=mt.LOWER_Z||fd(n)}function _x(n){return n===mt.EQUALS||vx(n)}var pt;(function(n){n[n.EntityStart=0]="EntityStart",n[n.NumericStart=1]="NumericStart",n[n.NumericDecimal=2]="NumericDecimal",n[n.NumericHex=3]="NumericHex",n[n.NamedEntity=4]="NamedEntity"})(pt||(pt={}));var Aa;(function(n){n[n.Legacy=0]="Legacy",n[n.Strict=1]="Strict",n[n.Attribute=2]="Attribute"})(Aa||(Aa={}));class xx{constructor(a,i,u){this.decodeTree=a,this.emitCodePoint=i,this.errors=u,this.state=pt.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=Aa.Strict}startEntity(a){this.decodeMode=a,this.state=pt.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(a,i){switch(this.state){case pt.EntityStart:return a.charCodeAt(i)===mt.NUM?(this.state=pt.NumericStart,this.consumed+=1,this.stateNumericStart(a,i+1)):(this.state=pt.NamedEntity,this.stateNamedEntity(a,i));case pt.NumericStart:return this.stateNumericStart(a,i);case pt.NumericDecimal:return this.stateNumericDecimal(a,i);case pt.NumericHex:return this.stateNumericHex(a,i);case pt.NamedEntity:return this.stateNamedEntity(a,i)}}stateNumericStart(a,i){return i>=a.length?-1:(a.charCodeAt(i)|gx)===mt.LOWER_X?(this.state=pt.NumericHex,this.consumed+=1,this.stateNumericHex(a,i+1)):(this.state=pt.NumericDecimal,this.stateNumericDecimal(a,i))}addToNumericResult(a,i,u,s){if(i!==u){const c=u-i;this.result=this.result*Math.pow(s,c)+parseInt(a.substr(i,c),s),this.consumed+=c}}stateNumericHex(a,i){const u=i;for(;i<a.length;){const s=a.charCodeAt(i);if(fd(s)||yx(s))i+=1;else return this.addToNumericResult(a,u,i,16),this.emitNumericEntity(s,3)}return this.addToNumericResult(a,u,i,16),-1}stateNumericDecimal(a,i){const u=i;for(;i<a.length;){const s=a.charCodeAt(i);if(fd(s))i+=1;else return this.addToNumericResult(a,u,i,10),this.emitNumericEntity(s,2)}return this.addToNumericResult(a,u,i,10),-1}emitNumericEntity(a,i){var u;if(this.consumed<=i)return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(a===mt.SEMI)this.consumed+=1;else if(this.decodeMode===Aa.Strict)return 0;return this.emitCodePoint(bx(this.result),this.consumed),this.errors&&(a!==mt.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(a,i){const{decodeTree:u}=this;let s=u[this.treeIndex],c=(s&Da.VALUE_LENGTH)>>14;for(;i<a.length;i++,this.excess++){const f=a.charCodeAt(i);if(this.treeIndex=wx(u,s,this.treeIndex+Math.max(1,c),f),this.treeIndex<0)return this.result===0||this.decodeMode===Aa.Attribute&&(c===0||_x(f))?0:this.emitNotTerminatedNamedEntity();if(s=u[this.treeIndex],c=(s&Da.VALUE_LENGTH)>>14,c!==0){if(f===mt.SEMI)return this.emitNamedEntityData(this.treeIndex,c,this.consumed+this.excess);this.decodeMode!==Aa.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var a;const{result:i,decodeTree:u}=this,s=(u[i]&Da.VALUE_LENGTH)>>14;return this.emitNamedEntityData(i,s,this.consumed),(a=this.errors)===null||a===void 0||a.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(a,i,u){const{decodeTree:s}=this;return this.emitCodePoint(i===1?s[a]&~Da.VALUE_LENGTH:s[a+1],u),i===3&&this.emitCodePoint(s[a+2],u),u}end(){var a;switch(this.state){case pt.NamedEntity:return this.result!==0&&(this.decodeMode!==Aa.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case pt.NumericDecimal:return this.emitNumericEntity(0,2);case pt.NumericHex:return this.emitNumericEntity(0,3);case pt.NumericStart:return(a=this.errors)===null||a===void 0||a.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case pt.EntityStart:return 0}}}function bg(n){let a="";const i=new xx(n,u=>a+=mx(u));return function(s,c){let f=0,h=0;for(;(h=s.indexOf("&",h))>=0;){a+=s.slice(f,h),i.startEntity(c);const m=i.write(s,h+1);if(m<0){f=h+i.end();break}f=h+m,h=m===0?f+1:f}const b=a+s.slice(f);return a="",b}}function wx(n,a,i,u){const s=(a&Da.BRANCH_LENGTH)>>7,c=a&Da.JUMP_TABLE;if(s===0)return c!==0&&u===c?i:-1;if(c){const b=u-c;return b<0||b>=s?-1:n[i+b]-1}let f=i,h=f+s-1;for(;f<=h;){const b=f+h>>>1,m=n[b];if(m<u)f=b+1;else if(m>u)h=b-1;else return n[b+s]}return-1}const Sx=bg(fx);bg(hx);function gg(n,a=Aa.Legacy){return Sx(n,a)}function Cx(n){return Object.prototype.toString.call(n)}function Fd(n){return Cx(n)==="[object String]"}const Ex=Object.prototype.hasOwnProperty;function kx(n,a){return Ex.call(n,a)}function Zs(n){return Array.prototype.slice.call(arguments,1).forEach(function(i){if(i){if(typeof i!="object")throw new TypeError(i+"must be object");Object.keys(i).forEach(function(u){n[u]=i[u]})}}),n}function yg(n,a,i){return[].concat(n.slice(0,a),i,n.slice(a+1))}function Hd(n){return!(n>=55296&&n<=57343||n>=64976&&n<=65007||(n&65535)===65535||(n&65535)===65534||n>=0&&n<=8||n===11||n>=14&&n<=31||n>=127&&n<=159||n>1114111)}function Ms(n){if(n>65535){n-=65536;const a=55296+(n>>10),i=56320+(n&1023);return String.fromCharCode(a,i)}return String.fromCharCode(n)}const vg=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Ax=/&([a-z#][a-z0-9]{1,31});/gi,Dx=new RegExp(vg.source+"|"+Ax.source,"gi"),Tx=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function zx(n,a){if(a.charCodeAt(0)===35&&Tx.test(a)){const u=a[1].toLowerCase()==="x"?parseInt(a.slice(2),16):parseInt(a.slice(1),10);return Hd(u)?Ms(u):n}const i=gg(n);return i!==n?i:n}function $x(n){return n.indexOf("\\")<0?n:n.replace(vg,"$1")}function du(n){return n.indexOf("\\")<0&&n.indexOf("&")<0?n:n.replace(Dx,function(a,i,u){return i||zx(a,u)})}const Ox=/[&<>"]/,Mx=/[&<>"]/g,Nx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Rx(n){return Nx[n]}function za(n){return Ox.test(n)?n.replace(Mx,Rx):n}const jx=/[.?*+^$[\]\\(){}|-]/g;function Ux(n){return n.replace(jx,"\\$&")}function je(n){switch(n){case 9:case 32:return!0}return!1}function Bi(n){if(n>=8192&&n<=8202)return!0;switch(n){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function qi(n){return qd.test(n)||pg.test(n)}function Fi(n){switch(n){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function Xs(n){return n=n.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(n=n.replace(/ẞ/g,"ß")),n.toLowerCase().toUpperCase()}const Bx={mdurl:ox,ucmicro:dx},qx=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:yg,assign:Zs,escapeHtml:za,escapeRE:Ux,fromCodePoint:Ms,has:kx,isMdAsciiPunct:Fi,isPunctChar:qi,isSpace:je,isString:Fd,isValidEntityCode:Hd,isWhiteSpace:Bi,lib:Bx,normalizeReference:Xs,unescapeAll:du,unescapeMd:$x},Symbol.toStringTag,{value:"Module"}));function Fx(n,a,i){let u,s,c,f;const h=n.posMax,b=n.pos;for(n.pos=a+1,u=1;n.pos<h;){if(c=n.src.charCodeAt(n.pos),c===93&&(u--,u===0)){s=!0;break}if(f=n.pos,n.md.inline.skipToken(n),c===91){if(f===n.pos-1)u++;else if(i)return n.pos=b,-1}}let m=-1;return s&&(m=n.pos),n.pos=b,m}function Hx(n,a,i){let u,s=a;const c={ok:!1,pos:0,str:""};if(n.charCodeAt(s)===60){for(s++;s<i;){if(u=n.charCodeAt(s),u===10||u===60)return c;if(u===62)return c.pos=s+1,c.str=du(n.slice(a+1,s)),c.ok=!0,c;if(u===92&&s+1<i){s+=2;continue}s++}return c}let f=0;for(;s<i&&(u=n.charCodeAt(s),!(u===32||u<32||u===127));){if(u===92&&s+1<i){if(n.charCodeAt(s+1)===32)break;s+=2;continue}if(u===40&&(f++,f>32))return c;if(u===41){if(f===0)break;f--}s++}return a===s||f!==0||(c.str=du(n.slice(a,s)),c.pos=s,c.ok=!0),c}function Lx(n,a,i,u){let s,c=a;const f={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(u)f.str=u.str,f.marker=u.marker;else{if(c>=i)return f;let h=n.charCodeAt(c);if(h!==34&&h!==39&&h!==40)return f;a++,c++,h===40&&(h=41),f.marker=h}for(;c<i;){if(s=n.charCodeAt(c),s===f.marker)return f.pos=c+1,f.str+=du(n.slice(a,c)),f.ok=!0,f;if(s===40&&f.marker===41)return f;s===92&&c+1<i&&c++,c++}return f.can_continue=!0,f.str+=du(n.slice(a,c)),f}const Vx=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:Hx,parseLinkLabel:Fx,parseLinkTitle:Lx},Symbol.toStringTag,{value:"Module"})),kn={};kn.code_inline=function(n,a,i,u,s){const c=n[a];return"<code"+s.renderAttrs(c)+">"+za(c.content)+"</code>"};kn.code_block=function(n,a,i,u,s){const c=n[a];return"<pre"+s.renderAttrs(c)+"><code>"+za(n[a].content)+`</code></pre>
`};kn.fence=function(n,a,i,u,s){const c=n[a],f=c.info?du(c.info).trim():"";let h="",b="";if(f){const y=f.split(/(\s+)/g);h=y[0],b=y.slice(2).join("")}let m;if(i.highlight?m=i.highlight(c.content,h,b)||za(c.content):m=za(c.content),m.indexOf("<pre")===0)return m+`
`;if(f){const y=c.attrIndex("class"),p=c.attrs?c.attrs.slice():[];y<0?p.push(["class",i.langPrefix+h]):(p[y]=p[y].slice(),p[y][1]+=" "+i.langPrefix+h);const _={attrs:p};return`<pre><code${s.renderAttrs(_)}>${m}</code></pre>
`}return`<pre><code${s.renderAttrs(c)}>${m}</code></pre>
`};kn.image=function(n,a,i,u,s){const c=n[a];return c.attrs[c.attrIndex("alt")][1]=s.renderInlineAsText(c.children,i,u),s.renderToken(n,a,i)};kn.hardbreak=function(n,a,i){return i.xhtmlOut?`<br />
`:`<br>
`};kn.softbreak=function(n,a,i){return i.breaks?i.xhtmlOut?`<br />
`:`<br>
`:`
`};kn.text=function(n,a){return za(n[a].content)};kn.html_block=function(n,a){return n[a].content};kn.html_inline=function(n,a){return n[a].content};function mu(){this.rules=Zs({},kn)}mu.prototype.renderAttrs=function(a){let i,u,s;if(!a.attrs)return"";for(s="",i=0,u=a.attrs.length;i<u;i++)s+=" "+za(a.attrs[i][0])+'="'+za(a.attrs[i][1])+'"';return s};mu.prototype.renderToken=function(a,i,u){const s=a[i];let c="";if(s.hidden)return"";s.block&&s.nesting!==-1&&i&&a[i-1].hidden&&(c+=`
`),c+=(s.nesting===-1?"</":"<")+s.tag,c+=this.renderAttrs(s),s.nesting===0&&u.xhtmlOut&&(c+=" /");let f=!1;if(s.block&&(f=!0,s.nesting===1&&i+1<a.length)){const h=a[i+1];(h.type==="inline"||h.hidden||h.nesting===-1&&h.tag===s.tag)&&(f=!1)}return c+=f?`>
`:">",c};mu.prototype.renderInline=function(n,a,i){let u="";const s=this.rules;for(let c=0,f=n.length;c<f;c++){const h=n[c].type;typeof s[h]<"u"?u+=s[h](n,c,a,i,this):u+=this.renderToken(n,c,a)}return u};mu.prototype.renderInlineAsText=function(n,a,i){let u="";for(let s=0,c=n.length;s<c;s++)switch(n[s].type){case"text":u+=n[s].content;break;case"image":u+=this.renderInlineAsText(n[s].children,a,i);break;case"html_inline":case"html_block":u+=n[s].content;break;case"softbreak":case"hardbreak":u+=`
`;break}return u};mu.prototype.render=function(n,a,i){let u="";const s=this.rules;for(let c=0,f=n.length;c<f;c++){const h=n[c].type;h==="inline"?u+=this.renderInline(n[c].children,a,i):typeof s[h]<"u"?u+=s[h](n,c,a,i,this):u+=this.renderToken(n,c,a,i)}return u};function jt(){this.__rules__=[],this.__cache__=null}jt.prototype.__find__=function(n){for(let a=0;a<this.__rules__.length;a++)if(this.__rules__[a].name===n)return a;return-1};jt.prototype.__compile__=function(){const n=this,a=[""];n.__rules__.forEach(function(i){i.enabled&&i.alt.forEach(function(u){a.indexOf(u)<0&&a.push(u)})}),n.__cache__={},a.forEach(function(i){n.__cache__[i]=[],n.__rules__.forEach(function(u){u.enabled&&(i&&u.alt.indexOf(i)<0||n.__cache__[i].push(u.fn))})})};jt.prototype.at=function(n,a,i){const u=this.__find__(n),s=i||{};if(u===-1)throw new Error("Parser rule not found: "+n);this.__rules__[u].fn=a,this.__rules__[u].alt=s.alt||[],this.__cache__=null};jt.prototype.before=function(n,a,i,u){const s=this.__find__(n),c=u||{};if(s===-1)throw new Error("Parser rule not found: "+n);this.__rules__.splice(s,0,{name:a,enabled:!0,fn:i,alt:c.alt||[]}),this.__cache__=null};jt.prototype.after=function(n,a,i,u){const s=this.__find__(n),c=u||{};if(s===-1)throw new Error("Parser rule not found: "+n);this.__rules__.splice(s+1,0,{name:a,enabled:!0,fn:i,alt:c.alt||[]}),this.__cache__=null};jt.prototype.push=function(n,a,i){const u=i||{};this.__rules__.push({name:n,enabled:!0,fn:a,alt:u.alt||[]}),this.__cache__=null};jt.prototype.enable=function(n,a){Array.isArray(n)||(n=[n]);const i=[];return n.forEach(function(u){const s=this.__find__(u);if(s<0){if(a)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[s].enabled=!0,i.push(u)},this),this.__cache__=null,i};jt.prototype.enableOnly=function(n,a){Array.isArray(n)||(n=[n]),this.__rules__.forEach(function(i){i.enabled=!1}),this.enable(n,a)};jt.prototype.disable=function(n,a){Array.isArray(n)||(n=[n]);const i=[];return n.forEach(function(u){const s=this.__find__(u);if(s<0){if(a)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[s].enabled=!1,i.push(u)},this),this.__cache__=null,i};jt.prototype.getRules=function(n){return this.__cache__===null&&this.__compile__(),this.__cache__[n]||[]};function mn(n,a,i){this.type=n,this.tag=a,this.attrs=null,this.map=null,this.nesting=i,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}mn.prototype.attrIndex=function(a){if(!this.attrs)return-1;const i=this.attrs;for(let u=0,s=i.length;u<s;u++)if(i[u][0]===a)return u;return-1};mn.prototype.attrPush=function(a){this.attrs?this.attrs.push(a):this.attrs=[a]};mn.prototype.attrSet=function(a,i){const u=this.attrIndex(a),s=[a,i];u<0?this.attrPush(s):this.attrs[u]=s};mn.prototype.attrGet=function(a){const i=this.attrIndex(a);let u=null;return i>=0&&(u=this.attrs[i][1]),u};mn.prototype.attrJoin=function(a,i){const u=this.attrIndex(a);u<0?this.attrPush([a,i]):this.attrs[u][1]=this.attrs[u][1]+" "+i};function _g(n,a,i){this.src=n,this.env=i,this.tokens=[],this.inlineMode=!1,this.md=a}_g.prototype.Token=mn;const Gx=/\r\n?|\n/g,Yx=/\0/g;function Zx(n){let a;a=n.src.replace(Gx,`
`),a=a.replace(Yx,"�"),n.src=a}function Xx(n){let a;n.inlineMode?(a=new n.Token("inline","",0),a.content=n.src,a.map=[0,1],a.children=[],n.tokens.push(a)):n.md.block.parse(n.src,n.md,n.env,n.tokens)}function Qx(n){const a=n.tokens;for(let i=0,u=a.length;i<u;i++){const s=a[i];s.type==="inline"&&n.md.inline.parse(s.content,n.md,n.env,s.children)}}function Ix(n){return/^<a[>\s]/i.test(n)}function Jx(n){return/^<\/a\s*>/i.test(n)}function Kx(n){const a=n.tokens;if(n.md.options.linkify)for(let i=0,u=a.length;i<u;i++){if(a[i].type!=="inline"||!n.md.linkify.pretest(a[i].content))continue;let s=a[i].children,c=0;for(let f=s.length-1;f>=0;f--){const h=s[f];if(h.type==="link_close"){for(f--;s[f].level!==h.level&&s[f].type!=="link_open";)f--;continue}if(h.type==="html_inline"&&(Ix(h.content)&&c>0&&c--,Jx(h.content)&&c++),!(c>0)&&h.type==="text"&&n.md.linkify.test(h.content)){const b=h.content;let m=n.md.linkify.match(b);const y=[];let p=h.level,_=0;m.length>0&&m[0].index===0&&f>0&&s[f-1].type==="text_special"&&(m=m.slice(1));for(let x=0;x<m.length;x++){const v=m[x].url,w=n.md.normalizeLink(v);if(!n.md.validateLink(w))continue;let C=m[x].text;m[x].schema?m[x].schema==="mailto:"&&!/^mailto:/i.test(C)?C=n.md.normalizeLinkText("mailto:"+C).replace(/^mailto:/,""):C=n.md.normalizeLinkText(C):C=n.md.normalizeLinkText("http://"+C).replace(/^http:\/\//,"");const E=m[x].index;if(E>_){const $=new n.Token("text","",0);$.content=b.slice(_,E),$.level=p,y.push($)}const q=new n.Token("link_open","a",1);q.attrs=[["href",w]],q.level=p++,q.markup="linkify",q.info="auto",y.push(q);const R=new n.Token("text","",0);R.content=C,R.level=p,y.push(R);const z=new n.Token("link_close","a",-1);z.level=--p,z.markup="linkify",z.info="auto",y.push(z),_=m[x].lastIndex}if(_<b.length){const x=new n.Token("text","",0);x.content=b.slice(_),x.level=p,y.push(x)}a[i].children=s=yg(s,f,y)}}}}const xg=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Wx=/\((c|tm|r)\)/i,Px=/\((c|tm|r)\)/ig,ew={c:"©",r:"®",tm:"™"};function tw(n,a){return ew[a.toLowerCase()]}function nw(n){let a=0;for(let i=n.length-1;i>=0;i--){const u=n[i];u.type==="text"&&!a&&(u.content=u.content.replace(Px,tw)),u.type==="link_open"&&u.info==="auto"&&a--,u.type==="link_close"&&u.info==="auto"&&a++}}function aw(n){let a=0;for(let i=n.length-1;i>=0;i--){const u=n[i];u.type==="text"&&!a&&xg.test(u.content)&&(u.content=u.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),u.type==="link_open"&&u.info==="auto"&&a--,u.type==="link_close"&&u.info==="auto"&&a++}}function rw(n){let a;if(n.md.options.typographer)for(a=n.tokens.length-1;a>=0;a--)n.tokens[a].type==="inline"&&(Wx.test(n.tokens[a].content)&&nw(n.tokens[a].children),xg.test(n.tokens[a].content)&&aw(n.tokens[a].children))}const uw=/['"]/,Vm=/['"]/g,Gm="’";function ys(n,a,i){return n.slice(0,a)+i+n.slice(a+1)}function iw(n,a){let i;const u=[];for(let s=0;s<n.length;s++){const c=n[s],f=n[s].level;for(i=u.length-1;i>=0&&!(u[i].level<=f);i--);if(u.length=i+1,c.type!=="text")continue;let h=c.content,b=0,m=h.length;e:for(;b<m;){Vm.lastIndex=b;const y=Vm.exec(h);if(!y)break;let p=!0,_=!0;b=y.index+1;const x=y[0]==="'";let v=32;if(y.index-1>=0)v=h.charCodeAt(y.index-1);else for(i=s-1;i>=0&&!(n[i].type==="softbreak"||n[i].type==="hardbreak");i--)if(n[i].content){v=n[i].content.charCodeAt(n[i].content.length-1);break}let w=32;if(b<m)w=h.charCodeAt(b);else for(i=s+1;i<n.length&&!(n[i].type==="softbreak"||n[i].type==="hardbreak");i++)if(n[i].content){w=n[i].content.charCodeAt(0);break}const C=Fi(v)||qi(String.fromCharCode(v)),E=Fi(w)||qi(String.fromCharCode(w)),q=Bi(v),R=Bi(w);if(R?p=!1:E&&(q||C||(p=!1)),q?_=!1:C&&(R||E||(_=!1)),w===34&&y[0]==='"'&&v>=48&&v<=57&&(_=p=!1),p&&_&&(p=C,_=E),!p&&!_){x&&(c.content=ys(c.content,y.index,Gm));continue}if(_)for(i=u.length-1;i>=0;i--){let z=u[i];if(u[i].level<f)break;if(z.single===x&&u[i].level===f){z=u[i];let $,Y;x?($=a.md.options.quotes[2],Y=a.md.options.quotes[3]):($=a.md.options.quotes[0],Y=a.md.options.quotes[1]),c.content=ys(c.content,y.index,Y),n[z.token].content=ys(n[z.token].content,z.pos,$),b+=Y.length-1,z.token===s&&(b+=$.length-1),h=c.content,m=h.length,u.length=i;continue e}}p?u.push({token:s,pos:y.index,single:x,level:f}):_&&x&&(c.content=ys(c.content,y.index,Gm))}}}function lw(n){if(n.md.options.typographer)for(let a=n.tokens.length-1;a>=0;a--)n.tokens[a].type!=="inline"||!uw.test(n.tokens[a].content)||iw(n.tokens[a].children,n)}function sw(n){let a,i;const u=n.tokens,s=u.length;for(let c=0;c<s;c++){if(u[c].type!=="inline")continue;const f=u[c].children,h=f.length;for(a=0;a<h;a++)f[a].type==="text_special"&&(f[a].type="text");for(a=i=0;a<h;a++)f[a].type==="text"&&a+1<h&&f[a+1].type==="text"?f[a+1].content=f[a].content+f[a+1].content:(a!==i&&(f[i]=f[a]),i++);a!==i&&(f.length=i)}}const F0=[["normalize",Zx],["block",Xx],["inline",Qx],["linkify",Kx],["replacements",rw],["smartquotes",lw],["text_join",sw]];function Ld(){this.ruler=new jt;for(let n=0;n<F0.length;n++)this.ruler.push(F0[n][0],F0[n][1])}Ld.prototype.process=function(n){const a=this.ruler.getRules("");for(let i=0,u=a.length;i<u;i++)a[i](n)};Ld.prototype.State=_g;function An(n,a,i,u){this.src=n,this.md=a,this.env=i,this.tokens=u,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const s=this.src;for(let c=0,f=0,h=0,b=0,m=s.length,y=!1;f<m;f++){const p=s.charCodeAt(f);if(!y)if(je(p)){h++,p===9?b+=4-b%4:b++;continue}else y=!0;(p===10||f===m-1)&&(p!==10&&f++,this.bMarks.push(c),this.eMarks.push(f),this.tShift.push(h),this.sCount.push(b),this.bsCount.push(0),y=!1,h=0,b=0,c=f+1)}this.bMarks.push(s.length),this.eMarks.push(s.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}An.prototype.push=function(n,a,i){const u=new mn(n,a,i);return u.block=!0,i<0&&this.level--,u.level=this.level,i>0&&this.level++,this.tokens.push(u),u};An.prototype.isEmpty=function(a){return this.bMarks[a]+this.tShift[a]>=this.eMarks[a]};An.prototype.skipEmptyLines=function(a){for(let i=this.lineMax;a<i&&!(this.bMarks[a]+this.tShift[a]<this.eMarks[a]);a++);return a};An.prototype.skipSpaces=function(a){for(let i=this.src.length;a<i;a++){const u=this.src.charCodeAt(a);if(!je(u))break}return a};An.prototype.skipSpacesBack=function(a,i){if(a<=i)return a;for(;a>i;)if(!je(this.src.charCodeAt(--a)))return a+1;return a};An.prototype.skipChars=function(a,i){for(let u=this.src.length;a<u&&this.src.charCodeAt(a)===i;a++);return a};An.prototype.skipCharsBack=function(a,i,u){if(a<=u)return a;for(;a>u;)if(i!==this.src.charCodeAt(--a))return a+1;return a};An.prototype.getLines=function(a,i,u,s){if(a>=i)return"";const c=new Array(i-a);for(let f=0,h=a;h<i;h++,f++){let b=0;const m=this.bMarks[h];let y=m,p;for(h+1<i||s?p=this.eMarks[h]+1:p=this.eMarks[h];y<p&&b<u;){const _=this.src.charCodeAt(y);if(je(_))_===9?b+=4-(b+this.bsCount[h])%4:b++;else if(y-m<this.tShift[h])b++;else break;y++}b>u?c[f]=new Array(b-u+1).join(" ")+this.src.slice(y,p):c[f]=this.src.slice(y,p)}return c.join("")};An.prototype.Token=mn;const ow=65536;function H0(n,a){const i=n.bMarks[a]+n.tShift[a],u=n.eMarks[a];return n.src.slice(i,u)}function Ym(n){const a=[],i=n.length;let u=0,s=n.charCodeAt(u),c=!1,f=0,h="";for(;u<i;)s===124&&(c?(h+=n.substring(f,u-1),f=u):(a.push(h+n.substring(f,u)),h="",f=u+1)),c=s===92,u++,s=n.charCodeAt(u);return a.push(h+n.substring(f)),a}function cw(n,a,i,u){if(a+2>i)return!1;let s=a+1;if(n.sCount[s]<n.blkIndent||n.sCount[s]-n.blkIndent>=4)return!1;let c=n.bMarks[s]+n.tShift[s];if(c>=n.eMarks[s])return!1;const f=n.src.charCodeAt(c++);if(f!==124&&f!==45&&f!==58||c>=n.eMarks[s])return!1;const h=n.src.charCodeAt(c++);if(h!==124&&h!==45&&h!==58&&!je(h)||f===45&&je(h))return!1;for(;c<n.eMarks[s];){const z=n.src.charCodeAt(c);if(z!==124&&z!==45&&z!==58&&!je(z))return!1;c++}let b=H0(n,a+1),m=b.split("|");const y=[];for(let z=0;z<m.length;z++){const $=m[z].trim();if(!$){if(z===0||z===m.length-1)continue;return!1}if(!/^:?-+:?$/.test($))return!1;$.charCodeAt($.length-1)===58?y.push($.charCodeAt(0)===58?"center":"right"):$.charCodeAt(0)===58?y.push("left"):y.push("")}if(b=H0(n,a).trim(),b.indexOf("|")===-1||n.sCount[a]-n.blkIndent>=4)return!1;m=Ym(b),m.length&&m[0]===""&&m.shift(),m.length&&m[m.length-1]===""&&m.pop();const p=m.length;if(p===0||p!==y.length)return!1;if(u)return!0;const _=n.parentType;n.parentType="table";const x=n.md.block.ruler.getRules("blockquote"),v=n.push("table_open","table",1),w=[a,0];v.map=w;const C=n.push("thead_open","thead",1);C.map=[a,a+1];const E=n.push("tr_open","tr",1);E.map=[a,a+1];for(let z=0;z<m.length;z++){const $=n.push("th_open","th",1);y[z]&&($.attrs=[["style","text-align:"+y[z]]]);const Y=n.push("inline","",0);Y.content=m[z].trim(),Y.children=[],n.push("th_close","th",-1)}n.push("tr_close","tr",-1),n.push("thead_close","thead",-1);let q,R=0;for(s=a+2;s<i&&!(n.sCount[s]<n.blkIndent);s++){let z=!1;for(let Y=0,K=x.length;Y<K;Y++)if(x[Y](n,s,i,!0)){z=!0;break}if(z||(b=H0(n,s).trim(),!b)||n.sCount[s]-n.blkIndent>=4||(m=Ym(b),m.length&&m[0]===""&&m.shift(),m.length&&m[m.length-1]===""&&m.pop(),R+=p-m.length,R>ow))break;if(s===a+2){const Y=n.push("tbody_open","tbody",1);Y.map=q=[a+2,0]}const $=n.push("tr_open","tr",1);$.map=[s,s+1];for(let Y=0;Y<p;Y++){const K=n.push("td_open","td",1);y[Y]&&(K.attrs=[["style","text-align:"+y[Y]]]);const ce=n.push("inline","",0);ce.content=m[Y]?m[Y].trim():"",ce.children=[],n.push("td_close","td",-1)}n.push("tr_close","tr",-1)}return q&&(n.push("tbody_close","tbody",-1),q[1]=s),n.push("table_close","table",-1),w[1]=s,n.parentType=_,n.line=s,!0}function dw(n,a,i){if(n.sCount[a]-n.blkIndent<4)return!1;let u=a+1,s=u;for(;u<i;){if(n.isEmpty(u)){u++;continue}if(n.sCount[u]-n.blkIndent>=4){u++,s=u;continue}break}n.line=s;const c=n.push("code_block","code",0);return c.content=n.getLines(a,s,4+n.blkIndent,!1)+`
`,c.map=[a,n.line],!0}function fw(n,a,i,u){let s=n.bMarks[a]+n.tShift[a],c=n.eMarks[a];if(n.sCount[a]-n.blkIndent>=4||s+3>c)return!1;const f=n.src.charCodeAt(s);if(f!==126&&f!==96)return!1;let h=s;s=n.skipChars(s,f);let b=s-h;if(b<3)return!1;const m=n.src.slice(h,s),y=n.src.slice(s,c);if(f===96&&y.indexOf(String.fromCharCode(f))>=0)return!1;if(u)return!0;let p=a,_=!1;for(;p++,!(p>=i||(s=h=n.bMarks[p]+n.tShift[p],c=n.eMarks[p],s<c&&n.sCount[p]<n.blkIndent));)if(n.src.charCodeAt(s)===f&&!(n.sCount[p]-n.blkIndent>=4)&&(s=n.skipChars(s,f),!(s-h<b)&&(s=n.skipSpaces(s),!(s<c)))){_=!0;break}b=n.sCount[a],n.line=p+(_?1:0);const x=n.push("fence","code",0);return x.info=y,x.content=n.getLines(a+1,p,b,!0),x.markup=m,x.map=[a,n.line],!0}function hw(n,a,i,u){let s=n.bMarks[a]+n.tShift[a],c=n.eMarks[a];const f=n.lineMax;if(n.sCount[a]-n.blkIndent>=4||n.src.charCodeAt(s)!==62)return!1;if(u)return!0;const h=[],b=[],m=[],y=[],p=n.md.block.ruler.getRules("blockquote"),_=n.parentType;n.parentType="blockquote";let x=!1,v;for(v=a;v<i;v++){const R=n.sCount[v]<n.blkIndent;if(s=n.bMarks[v]+n.tShift[v],c=n.eMarks[v],s>=c)break;if(n.src.charCodeAt(s++)===62&&!R){let $=n.sCount[v]+1,Y,K;n.src.charCodeAt(s)===32?(s++,$++,K=!1,Y=!0):n.src.charCodeAt(s)===9?(Y=!0,(n.bsCount[v]+$)%4===3?(s++,$++,K=!1):K=!0):Y=!1;let ce=$;for(h.push(n.bMarks[v]),n.bMarks[v]=s;s<c;){const we=n.src.charCodeAt(s);if(je(we))we===9?ce+=4-(ce+n.bsCount[v]+(K?1:0))%4:ce++;else break;s++}x=s>=c,b.push(n.bsCount[v]),n.bsCount[v]=n.sCount[v]+1+(Y?1:0),m.push(n.sCount[v]),n.sCount[v]=ce-$,y.push(n.tShift[v]),n.tShift[v]=s-n.bMarks[v];continue}if(x)break;let z=!1;for(let $=0,Y=p.length;$<Y;$++)if(p[$](n,v,i,!0)){z=!0;break}if(z){n.lineMax=v,n.blkIndent!==0&&(h.push(n.bMarks[v]),b.push(n.bsCount[v]),y.push(n.tShift[v]),m.push(n.sCount[v]),n.sCount[v]-=n.blkIndent);break}h.push(n.bMarks[v]),b.push(n.bsCount[v]),y.push(n.tShift[v]),m.push(n.sCount[v]),n.sCount[v]=-1}const w=n.blkIndent;n.blkIndent=0;const C=n.push("blockquote_open","blockquote",1);C.markup=">";const E=[a,0];C.map=E,n.md.block.tokenize(n,a,v);const q=n.push("blockquote_close","blockquote",-1);q.markup=">",n.lineMax=f,n.parentType=_,E[1]=n.line;for(let R=0;R<y.length;R++)n.bMarks[R+a]=h[R],n.tShift[R+a]=y[R],n.sCount[R+a]=m[R],n.bsCount[R+a]=b[R];return n.blkIndent=w,!0}function pw(n,a,i,u){const s=n.eMarks[a];if(n.sCount[a]-n.blkIndent>=4)return!1;let c=n.bMarks[a]+n.tShift[a];const f=n.src.charCodeAt(c++);if(f!==42&&f!==45&&f!==95)return!1;let h=1;for(;c<s;){const m=n.src.charCodeAt(c++);if(m!==f&&!je(m))return!1;m===f&&h++}if(h<3)return!1;if(u)return!0;n.line=a+1;const b=n.push("hr","hr",0);return b.map=[a,n.line],b.markup=Array(h+1).join(String.fromCharCode(f)),!0}function Zm(n,a){const i=n.eMarks[a];let u=n.bMarks[a]+n.tShift[a];const s=n.src.charCodeAt(u++);if(s!==42&&s!==45&&s!==43)return-1;if(u<i){const c=n.src.charCodeAt(u);if(!je(c))return-1}return u}function Xm(n,a){const i=n.bMarks[a]+n.tShift[a],u=n.eMarks[a];let s=i;if(s+1>=u)return-1;let c=n.src.charCodeAt(s++);if(c<48||c>57)return-1;for(;;){if(s>=u)return-1;if(c=n.src.charCodeAt(s++),c>=48&&c<=57){if(s-i>=10)return-1;continue}if(c===41||c===46)break;return-1}return s<u&&(c=n.src.charCodeAt(s),!je(c))?-1:s}function mw(n,a){const i=n.level+2;for(let u=a+2,s=n.tokens.length-2;u<s;u++)n.tokens[u].level===i&&n.tokens[u].type==="paragraph_open"&&(n.tokens[u+2].hidden=!0,n.tokens[u].hidden=!0,u+=2)}function bw(n,a,i,u){let s,c,f,h,b=a,m=!0;if(n.sCount[b]-n.blkIndent>=4||n.listIndent>=0&&n.sCount[b]-n.listIndent>=4&&n.sCount[b]<n.blkIndent)return!1;let y=!1;u&&n.parentType==="paragraph"&&n.sCount[b]>=n.blkIndent&&(y=!0);let p,_,x;if((x=Xm(n,b))>=0){if(p=!0,f=n.bMarks[b]+n.tShift[b],_=Number(n.src.slice(f,x-1)),y&&_!==1)return!1}else if((x=Zm(n,b))>=0)p=!1;else return!1;if(y&&n.skipSpaces(x)>=n.eMarks[b])return!1;if(u)return!0;const v=n.src.charCodeAt(x-1),w=n.tokens.length;p?(h=n.push("ordered_list_open","ol",1),_!==1&&(h.attrs=[["start",_]])):h=n.push("bullet_list_open","ul",1);const C=[b,0];h.map=C,h.markup=String.fromCharCode(v);let E=!1;const q=n.md.block.ruler.getRules("list"),R=n.parentType;for(n.parentType="list";b<i;){c=x,s=n.eMarks[b];const z=n.sCount[b]+x-(n.bMarks[b]+n.tShift[b]);let $=z;for(;c<s;){const de=n.src.charCodeAt(c);if(de===9)$+=4-($+n.bsCount[b])%4;else if(de===32)$++;else break;c++}const Y=c;let K;Y>=s?K=1:K=$-z,K>4&&(K=1);const ce=z+K;h=n.push("list_item_open","li",1),h.markup=String.fromCharCode(v);const we=[b,0];h.map=we,p&&(h.info=n.src.slice(f,x-1));const ut=n.tight,Qe=n.tShift[b],Q=n.sCount[b],Z=n.listIndent;if(n.listIndent=n.blkIndent,n.blkIndent=ce,n.tight=!0,n.tShift[b]=Y-n.bMarks[b],n.sCount[b]=$,Y>=s&&n.isEmpty(b+1)?n.line=Math.min(n.line+2,i):n.md.block.tokenize(n,b,i,!0),(!n.tight||E)&&(m=!1),E=n.line-b>1&&n.isEmpty(n.line-1),n.blkIndent=n.listIndent,n.listIndent=Z,n.tShift[b]=Qe,n.sCount[b]=Q,n.tight=ut,h=n.push("list_item_close","li",-1),h.markup=String.fromCharCode(v),b=n.line,we[1]=b,b>=i||n.sCount[b]<n.blkIndent||n.sCount[b]-n.blkIndent>=4)break;let A=!1;for(let de=0,U=q.length;de<U;de++)if(q[de](n,b,i,!0)){A=!0;break}if(A)break;if(p){if(x=Xm(n,b),x<0)break;f=n.bMarks[b]+n.tShift[b]}else if(x=Zm(n,b),x<0)break;if(v!==n.src.charCodeAt(x-1))break}return p?h=n.push("ordered_list_close","ol",-1):h=n.push("bullet_list_close","ul",-1),h.markup=String.fromCharCode(v),C[1]=b,n.line=b,n.parentType=R,m&&mw(n,w),!0}function gw(n,a,i,u){let s=n.bMarks[a]+n.tShift[a],c=n.eMarks[a],f=a+1;if(n.sCount[a]-n.blkIndent>=4||n.src.charCodeAt(s)!==91)return!1;function h(q){const R=n.lineMax;if(q>=R||n.isEmpty(q))return null;let z=!1;if(n.sCount[q]-n.blkIndent>3&&(z=!0),n.sCount[q]<0&&(z=!0),!z){const K=n.md.block.ruler.getRules("reference"),ce=n.parentType;n.parentType="reference";let we=!1;for(let ut=0,Qe=K.length;ut<Qe;ut++)if(K[ut](n,q,R,!0)){we=!0;break}if(n.parentType=ce,we)return null}const $=n.bMarks[q]+n.tShift[q],Y=n.eMarks[q];return n.src.slice($,Y+1)}let b=n.src.slice(s,c+1);c=b.length;let m=-1;for(s=1;s<c;s++){const q=b.charCodeAt(s);if(q===91)return!1;if(q===93){m=s;break}else if(q===10){const R=h(f);R!==null&&(b+=R,c=b.length,f++)}else if(q===92&&(s++,s<c&&b.charCodeAt(s)===10)){const R=h(f);R!==null&&(b+=R,c=b.length,f++)}}if(m<0||b.charCodeAt(m+1)!==58)return!1;for(s=m+2;s<c;s++){const q=b.charCodeAt(s);if(q===10){const R=h(f);R!==null&&(b+=R,c=b.length,f++)}else if(!je(q))break}const y=n.md.helpers.parseLinkDestination(b,s,c);if(!y.ok)return!1;const p=n.md.normalizeLink(y.str);if(!n.md.validateLink(p))return!1;s=y.pos;const _=s,x=f,v=s;for(;s<c;s++){const q=b.charCodeAt(s);if(q===10){const R=h(f);R!==null&&(b+=R,c=b.length,f++)}else if(!je(q))break}let w=n.md.helpers.parseLinkTitle(b,s,c);for(;w.can_continue;){const q=h(f);if(q===null)break;b+=q,s=c,c=b.length,f++,w=n.md.helpers.parseLinkTitle(b,s,c,w)}let C;for(s<c&&v!==s&&w.ok?(C=w.str,s=w.pos):(C="",s=_,f=x);s<c;){const q=b.charCodeAt(s);if(!je(q))break;s++}if(s<c&&b.charCodeAt(s)!==10&&C)for(C="",s=_,f=x;s<c;){const q=b.charCodeAt(s);if(!je(q))break;s++}if(s<c&&b.charCodeAt(s)!==10)return!1;const E=Xs(b.slice(1,m));return E?(u||(typeof n.env.references>"u"&&(n.env.references={}),typeof n.env.references[E]>"u"&&(n.env.references[E]={title:C,href:p}),n.line=f),!0):!1}const yw=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],vw="[a-zA-Z_:][a-zA-Z0-9:._-]*",_w="[^\"'=<>`\\x00-\\x20]+",xw="'[^']*'",ww='"[^"]*"',Sw="(?:"+_w+"|"+xw+"|"+ww+")",Cw="(?:\\s+"+vw+"(?:\\s*=\\s*"+Sw+")?)",wg="<[A-Za-z][A-Za-z0-9\\-]*"+Cw+"*\\s*\\/?>",Sg="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",Ew="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",kw="<[?][\\s\\S]*?[?]>",Aw="<![A-Za-z][^>]*>",Dw="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Tw=new RegExp("^(?:"+wg+"|"+Sg+"|"+Ew+"|"+kw+"|"+Aw+"|"+Dw+")"),zw=new RegExp("^(?:"+wg+"|"+Sg+")"),Pr=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+yw.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(zw.source+"\\s*$"),/^$/,!1]];function $w(n,a,i,u){let s=n.bMarks[a]+n.tShift[a],c=n.eMarks[a];if(n.sCount[a]-n.blkIndent>=4||!n.md.options.html||n.src.charCodeAt(s)!==60)return!1;let f=n.src.slice(s,c),h=0;for(;h<Pr.length&&!Pr[h][0].test(f);h++);if(h===Pr.length)return!1;if(u)return Pr[h][2];let b=a+1;if(!Pr[h][1].test(f)){for(;b<i&&!(n.sCount[b]<n.blkIndent);b++)if(s=n.bMarks[b]+n.tShift[b],c=n.eMarks[b],f=n.src.slice(s,c),Pr[h][1].test(f)){f.length!==0&&b++;break}}n.line=b;const m=n.push("html_block","",0);return m.map=[a,b],m.content=n.getLines(a,b,n.blkIndent,!0),!0}function Ow(n,a,i,u){let s=n.bMarks[a]+n.tShift[a],c=n.eMarks[a];if(n.sCount[a]-n.blkIndent>=4)return!1;let f=n.src.charCodeAt(s);if(f!==35||s>=c)return!1;let h=1;for(f=n.src.charCodeAt(++s);f===35&&s<c&&h<=6;)h++,f=n.src.charCodeAt(++s);if(h>6||s<c&&!je(f))return!1;if(u)return!0;c=n.skipSpacesBack(c,s);const b=n.skipCharsBack(c,35,s);b>s&&je(n.src.charCodeAt(b-1))&&(c=b),n.line=a+1;const m=n.push("heading_open","h"+String(h),1);m.markup="########".slice(0,h),m.map=[a,n.line];const y=n.push("inline","",0);y.content=n.src.slice(s,c).trim(),y.map=[a,n.line],y.children=[];const p=n.push("heading_close","h"+String(h),-1);return p.markup="########".slice(0,h),!0}function Mw(n,a,i){const u=n.md.block.ruler.getRules("paragraph");if(n.sCount[a]-n.blkIndent>=4)return!1;const s=n.parentType;n.parentType="paragraph";let c=0,f,h=a+1;for(;h<i&&!n.isEmpty(h);h++){if(n.sCount[h]-n.blkIndent>3)continue;if(n.sCount[h]>=n.blkIndent){let x=n.bMarks[h]+n.tShift[h];const v=n.eMarks[h];if(x<v&&(f=n.src.charCodeAt(x),(f===45||f===61)&&(x=n.skipChars(x,f),x=n.skipSpaces(x),x>=v))){c=f===61?1:2;break}}if(n.sCount[h]<0)continue;let _=!1;for(let x=0,v=u.length;x<v;x++)if(u[x](n,h,i,!0)){_=!0;break}if(_)break}if(!c)return!1;const b=n.getLines(a,h,n.blkIndent,!1).trim();n.line=h+1;const m=n.push("heading_open","h"+String(c),1);m.markup=String.fromCharCode(f),m.map=[a,n.line];const y=n.push("inline","",0);y.content=b,y.map=[a,n.line-1],y.children=[];const p=n.push("heading_close","h"+String(c),-1);return p.markup=String.fromCharCode(f),n.parentType=s,!0}function Nw(n,a,i){const u=n.md.block.ruler.getRules("paragraph"),s=n.parentType;let c=a+1;for(n.parentType="paragraph";c<i&&!n.isEmpty(c);c++){if(n.sCount[c]-n.blkIndent>3||n.sCount[c]<0)continue;let m=!1;for(let y=0,p=u.length;y<p;y++)if(u[y](n,c,i,!0)){m=!0;break}if(m)break}const f=n.getLines(a,c,n.blkIndent,!1).trim();n.line=c;const h=n.push("paragraph_open","p",1);h.map=[a,n.line];const b=n.push("inline","",0);return b.content=f,b.map=[a,n.line],b.children=[],n.push("paragraph_close","p",-1),n.parentType=s,!0}const vs=[["table",cw,["paragraph","reference"]],["code",dw],["fence",fw,["paragraph","reference","blockquote","list"]],["blockquote",hw,["paragraph","reference","blockquote","list"]],["hr",pw,["paragraph","reference","blockquote","list"]],["list",bw,["paragraph","reference","blockquote"]],["reference",gw],["html_block",$w,["paragraph","reference","blockquote"]],["heading",Ow,["paragraph","reference","blockquote"]],["lheading",Mw],["paragraph",Nw]];function Qs(){this.ruler=new jt;for(let n=0;n<vs.length;n++)this.ruler.push(vs[n][0],vs[n][1],{alt:(vs[n][2]||[]).slice()})}Qs.prototype.tokenize=function(n,a,i){const u=this.ruler.getRules(""),s=u.length,c=n.md.options.maxNesting;let f=a,h=!1;for(;f<i&&(n.line=f=n.skipEmptyLines(f),!(f>=i||n.sCount[f]<n.blkIndent));){if(n.level>=c){n.line=i;break}const b=n.line;let m=!1;for(let y=0;y<s;y++)if(m=u[y](n,f,i,!1),m){if(b>=n.line)throw new Error("block rule didn't increment state.line");break}if(!m)throw new Error("none of the block rules matched");n.tight=!h,n.isEmpty(n.line-1)&&(h=!0),f=n.line,f<i&&n.isEmpty(f)&&(h=!0,f++,n.line=f)}};Qs.prototype.parse=function(n,a,i,u){if(!n)return;const s=new this.State(n,a,i,u);this.tokenize(s,s.line,s.lineMax)};Qs.prototype.State=An;function Yi(n,a,i,u){this.src=n,this.env=i,this.md=a,this.tokens=u,this.tokens_meta=Array(u.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}Yi.prototype.pushPending=function(){const n=new mn("text","",0);return n.content=this.pending,n.level=this.pendingLevel,this.tokens.push(n),this.pending="",n};Yi.prototype.push=function(n,a,i){this.pending&&this.pushPending();const u=new mn(n,a,i);let s=null;return i<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),u.level=this.level,i>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],s={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(u),this.tokens_meta.push(s),u};Yi.prototype.scanDelims=function(n,a){const i=this.posMax,u=this.src.charCodeAt(n),s=n>0?this.src.charCodeAt(n-1):32;let c=n;for(;c<i&&this.src.charCodeAt(c)===u;)c++;const f=c-n,h=c<i?this.src.charCodeAt(c):32,b=Fi(s)||qi(String.fromCharCode(s)),m=Fi(h)||qi(String.fromCharCode(h)),y=Bi(s),p=Bi(h),_=!p&&(!m||y||b),x=!y&&(!b||p||m);return{can_open:_&&(a||!x||b),can_close:x&&(a||!_||m),length:f}};Yi.prototype.Token=mn;function Rw(n){switch(n){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function jw(n,a){let i=n.pos;for(;i<n.posMax&&!Rw(n.src.charCodeAt(i));)i++;return i===n.pos?!1:(a||(n.pending+=n.src.slice(n.pos,i)),n.pos=i,!0)}const Uw=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Bw(n,a){if(!n.md.options.linkify||n.linkLevel>0)return!1;const i=n.pos,u=n.posMax;if(i+3>u||n.src.charCodeAt(i)!==58||n.src.charCodeAt(i+1)!==47||n.src.charCodeAt(i+2)!==47)return!1;const s=n.pending.match(Uw);if(!s)return!1;const c=s[1],f=n.md.linkify.matchAtStart(n.src.slice(i-c.length));if(!f)return!1;let h=f.url;if(h.length<=c.length)return!1;h=h.replace(/\*+$/,"");const b=n.md.normalizeLink(h);if(!n.md.validateLink(b))return!1;if(!a){n.pending=n.pending.slice(0,-c.length);const m=n.push("link_open","a",1);m.attrs=[["href",b]],m.markup="linkify",m.info="auto";const y=n.push("text","",0);y.content=n.md.normalizeLinkText(h);const p=n.push("link_close","a",-1);p.markup="linkify",p.info="auto"}return n.pos+=h.length-c.length,!0}function qw(n,a){let i=n.pos;if(n.src.charCodeAt(i)!==10)return!1;const u=n.pending.length-1,s=n.posMax;if(!a)if(u>=0&&n.pending.charCodeAt(u)===32)if(u>=1&&n.pending.charCodeAt(u-1)===32){let c=u-1;for(;c>=1&&n.pending.charCodeAt(c-1)===32;)c--;n.pending=n.pending.slice(0,c),n.push("hardbreak","br",0)}else n.pending=n.pending.slice(0,-1),n.push("softbreak","br",0);else n.push("softbreak","br",0);for(i++;i<s&&je(n.src.charCodeAt(i));)i++;return n.pos=i,!0}const Vd=[];for(let n=0;n<256;n++)Vd.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(n){Vd[n.charCodeAt(0)]=1});function Fw(n,a){let i=n.pos;const u=n.posMax;if(n.src.charCodeAt(i)!==92||(i++,i>=u))return!1;let s=n.src.charCodeAt(i);if(s===10){for(a||n.push("hardbreak","br",0),i++;i<u&&(s=n.src.charCodeAt(i),!!je(s));)i++;return n.pos=i,!0}let c=n.src[i];if(s>=55296&&s<=56319&&i+1<u){const h=n.src.charCodeAt(i+1);h>=56320&&h<=57343&&(c+=n.src[i+1],i++)}const f="\\"+c;if(!a){const h=n.push("text_special","",0);s<256&&Vd[s]!==0?h.content=c:h.content=f,h.markup=f,h.info="escape"}return n.pos=i+1,!0}function Hw(n,a){let i=n.pos;if(n.src.charCodeAt(i)!==96)return!1;const s=i;i++;const c=n.posMax;for(;i<c&&n.src.charCodeAt(i)===96;)i++;const f=n.src.slice(s,i),h=f.length;if(n.backticksScanned&&(n.backticks[h]||0)<=s)return a||(n.pending+=f),n.pos+=h,!0;let b=i,m;for(;(m=n.src.indexOf("`",b))!==-1;){for(b=m+1;b<c&&n.src.charCodeAt(b)===96;)b++;const y=b-m;if(y===h){if(!a){const p=n.push("code_inline","code",0);p.markup=f,p.content=n.src.slice(i,m).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return n.pos=b,!0}n.backticks[y]=m}return n.backticksScanned=!0,a||(n.pending+=f),n.pos+=h,!0}function Lw(n,a){const i=n.pos,u=n.src.charCodeAt(i);if(a||u!==126)return!1;const s=n.scanDelims(n.pos,!0);let c=s.length;const f=String.fromCharCode(u);if(c<2)return!1;let h;c%2&&(h=n.push("text","",0),h.content=f,c--);for(let b=0;b<c;b+=2)h=n.push("text","",0),h.content=f+f,n.delimiters.push({marker:u,length:0,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close});return n.pos+=s.length,!0}function Qm(n,a){let i;const u=[],s=a.length;for(let c=0;c<s;c++){const f=a[c];if(f.marker!==126||f.end===-1)continue;const h=a[f.end];i=n.tokens[f.token],i.type="s_open",i.tag="s",i.nesting=1,i.markup="~~",i.content="",i=n.tokens[h.token],i.type="s_close",i.tag="s",i.nesting=-1,i.markup="~~",i.content="",n.tokens[h.token-1].type==="text"&&n.tokens[h.token-1].content==="~"&&u.push(h.token-1)}for(;u.length;){const c=u.pop();let f=c+1;for(;f<n.tokens.length&&n.tokens[f].type==="s_close";)f++;f--,c!==f&&(i=n.tokens[f],n.tokens[f]=n.tokens[c],n.tokens[c]=i)}}function Vw(n){const a=n.tokens_meta,i=n.tokens_meta.length;Qm(n,n.delimiters);for(let u=0;u<i;u++)a[u]&&a[u].delimiters&&Qm(n,a[u].delimiters)}const Cg={tokenize:Lw,postProcess:Vw};function Gw(n,a){const i=n.pos,u=n.src.charCodeAt(i);if(a||u!==95&&u!==42)return!1;const s=n.scanDelims(n.pos,u===42);for(let c=0;c<s.length;c++){const f=n.push("text","",0);f.content=String.fromCharCode(u),n.delimiters.push({marker:u,length:s.length,token:n.tokens.length-1,end:-1,open:s.can_open,close:s.can_close})}return n.pos+=s.length,!0}function Im(n,a){const i=a.length;for(let u=i-1;u>=0;u--){const s=a[u];if(s.marker!==95&&s.marker!==42||s.end===-1)continue;const c=a[s.end],f=u>0&&a[u-1].end===s.end+1&&a[u-1].marker===s.marker&&a[u-1].token===s.token-1&&a[s.end+1].token===c.token+1,h=String.fromCharCode(s.marker),b=n.tokens[s.token];b.type=f?"strong_open":"em_open",b.tag=f?"strong":"em",b.nesting=1,b.markup=f?h+h:h,b.content="";const m=n.tokens[c.token];m.type=f?"strong_close":"em_close",m.tag=f?"strong":"em",m.nesting=-1,m.markup=f?h+h:h,m.content="",f&&(n.tokens[a[u-1].token].content="",n.tokens[a[s.end+1].token].content="",u--)}}function Yw(n){const a=n.tokens_meta,i=n.tokens_meta.length;Im(n,n.delimiters);for(let u=0;u<i;u++)a[u]&&a[u].delimiters&&Im(n,a[u].delimiters)}const Eg={tokenize:Gw,postProcess:Yw};function Zw(n,a){let i,u,s,c,f="",h="",b=n.pos,m=!0;if(n.src.charCodeAt(n.pos)!==91)return!1;const y=n.pos,p=n.posMax,_=n.pos+1,x=n.md.helpers.parseLinkLabel(n,n.pos,!0);if(x<0)return!1;let v=x+1;if(v<p&&n.src.charCodeAt(v)===40){for(m=!1,v++;v<p&&(i=n.src.charCodeAt(v),!(!je(i)&&i!==10));v++);if(v>=p)return!1;if(b=v,s=n.md.helpers.parseLinkDestination(n.src,v,n.posMax),s.ok){for(f=n.md.normalizeLink(s.str),n.md.validateLink(f)?v=s.pos:f="",b=v;v<p&&(i=n.src.charCodeAt(v),!(!je(i)&&i!==10));v++);if(s=n.md.helpers.parseLinkTitle(n.src,v,n.posMax),v<p&&b!==v&&s.ok)for(h=s.str,v=s.pos;v<p&&(i=n.src.charCodeAt(v),!(!je(i)&&i!==10));v++);}(v>=p||n.src.charCodeAt(v)!==41)&&(m=!0),v++}if(m){if(typeof n.env.references>"u")return!1;if(v<p&&n.src.charCodeAt(v)===91?(b=v+1,v=n.md.helpers.parseLinkLabel(n,v),v>=0?u=n.src.slice(b,v++):v=x+1):v=x+1,u||(u=n.src.slice(_,x)),c=n.env.references[Xs(u)],!c)return n.pos=y,!1;f=c.href,h=c.title}if(!a){n.pos=_,n.posMax=x;const w=n.push("link_open","a",1),C=[["href",f]];w.attrs=C,h&&C.push(["title",h]),n.linkLevel++,n.md.inline.tokenize(n),n.linkLevel--,n.push("link_close","a",-1)}return n.pos=v,n.posMax=p,!0}function Xw(n,a){let i,u,s,c,f,h,b,m,y="";const p=n.pos,_=n.posMax;if(n.src.charCodeAt(n.pos)!==33||n.src.charCodeAt(n.pos+1)!==91)return!1;const x=n.pos+2,v=n.md.helpers.parseLinkLabel(n,n.pos+1,!1);if(v<0)return!1;if(c=v+1,c<_&&n.src.charCodeAt(c)===40){for(c++;c<_&&(i=n.src.charCodeAt(c),!(!je(i)&&i!==10));c++);if(c>=_)return!1;for(m=c,h=n.md.helpers.parseLinkDestination(n.src,c,n.posMax),h.ok&&(y=n.md.normalizeLink(h.str),n.md.validateLink(y)?c=h.pos:y=""),m=c;c<_&&(i=n.src.charCodeAt(c),!(!je(i)&&i!==10));c++);if(h=n.md.helpers.parseLinkTitle(n.src,c,n.posMax),c<_&&m!==c&&h.ok)for(b=h.str,c=h.pos;c<_&&(i=n.src.charCodeAt(c),!(!je(i)&&i!==10));c++);else b="";if(c>=_||n.src.charCodeAt(c)!==41)return n.pos=p,!1;c++}else{if(typeof n.env.references>"u")return!1;if(c<_&&n.src.charCodeAt(c)===91?(m=c+1,c=n.md.helpers.parseLinkLabel(n,c),c>=0?s=n.src.slice(m,c++):c=v+1):c=v+1,s||(s=n.src.slice(x,v)),f=n.env.references[Xs(s)],!f)return n.pos=p,!1;y=f.href,b=f.title}if(!a){u=n.src.slice(x,v);const w=[];n.md.inline.parse(u,n.md,n.env,w);const C=n.push("image","img",0),E=[["src",y],["alt",""]];C.attrs=E,C.children=w,C.content=u,b&&E.push(["title",b])}return n.pos=c,n.posMax=_,!0}const Qw=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Iw=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Jw(n,a){let i=n.pos;if(n.src.charCodeAt(i)!==60)return!1;const u=n.pos,s=n.posMax;for(;;){if(++i>=s)return!1;const f=n.src.charCodeAt(i);if(f===60)return!1;if(f===62)break}const c=n.src.slice(u+1,i);if(Iw.test(c)){const f=n.md.normalizeLink(c);if(!n.md.validateLink(f))return!1;if(!a){const h=n.push("link_open","a",1);h.attrs=[["href",f]],h.markup="autolink",h.info="auto";const b=n.push("text","",0);b.content=n.md.normalizeLinkText(c);const m=n.push("link_close","a",-1);m.markup="autolink",m.info="auto"}return n.pos+=c.length+2,!0}if(Qw.test(c)){const f=n.md.normalizeLink("mailto:"+c);if(!n.md.validateLink(f))return!1;if(!a){const h=n.push("link_open","a",1);h.attrs=[["href",f]],h.markup="autolink",h.info="auto";const b=n.push("text","",0);b.content=n.md.normalizeLinkText(c);const m=n.push("link_close","a",-1);m.markup="autolink",m.info="auto"}return n.pos+=c.length+2,!0}return!1}function Kw(n){return/^<a[>\s]/i.test(n)}function Ww(n){return/^<\/a\s*>/i.test(n)}function Pw(n){const a=n|32;return a>=97&&a<=122}function e6(n,a){if(!n.md.options.html)return!1;const i=n.posMax,u=n.pos;if(n.src.charCodeAt(u)!==60||u+2>=i)return!1;const s=n.src.charCodeAt(u+1);if(s!==33&&s!==63&&s!==47&&!Pw(s))return!1;const c=n.src.slice(u).match(Tw);if(!c)return!1;if(!a){const f=n.push("html_inline","",0);f.content=c[0],Kw(f.content)&&n.linkLevel++,Ww(f.content)&&n.linkLevel--}return n.pos+=c[0].length,!0}const t6=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,n6=/^&([a-z][a-z0-9]{1,31});/i;function a6(n,a){const i=n.pos,u=n.posMax;if(n.src.charCodeAt(i)!==38||i+1>=u)return!1;if(n.src.charCodeAt(i+1)===35){const c=n.src.slice(i).match(t6);if(c){if(!a){const f=c[1][0].toLowerCase()==="x"?parseInt(c[1].slice(1),16):parseInt(c[1],10),h=n.push("text_special","",0);h.content=Hd(f)?Ms(f):Ms(65533),h.markup=c[0],h.info="entity"}return n.pos+=c[0].length,!0}}else{const c=n.src.slice(i).match(n6);if(c){const f=gg(c[0]);if(f!==c[0]){if(!a){const h=n.push("text_special","",0);h.content=f,h.markup=c[0],h.info="entity"}return n.pos+=c[0].length,!0}}}return!1}function Jm(n){const a={},i=n.length;if(!i)return;let u=0,s=-2;const c=[];for(let f=0;f<i;f++){const h=n[f];if(c.push(0),(n[u].marker!==h.marker||s!==h.token-1)&&(u=f),s=h.token,h.length=h.length||0,!h.close)continue;a.hasOwnProperty(h.marker)||(a[h.marker]=[-1,-1,-1,-1,-1,-1]);const b=a[h.marker][(h.open?3:0)+h.length%3];let m=u-c[u]-1,y=m;for(;m>b;m-=c[m]+1){const p=n[m];if(p.marker===h.marker&&p.open&&p.end<0){let _=!1;if((p.close||h.open)&&(p.length+h.length)%3===0&&(p.length%3!==0||h.length%3!==0)&&(_=!0),!_){const x=m>0&&!n[m-1].open?c[m-1]+1:0;c[f]=f-m+x,c[m]=x,h.open=!1,p.end=f,p.close=!1,y=-1,s=-2;break}}}y!==-1&&(a[h.marker][(h.open?3:0)+(h.length||0)%3]=y)}}function r6(n){const a=n.tokens_meta,i=n.tokens_meta.length;Jm(n.delimiters);for(let u=0;u<i;u++)a[u]&&a[u].delimiters&&Jm(a[u].delimiters)}function u6(n){let a,i,u=0;const s=n.tokens,c=n.tokens.length;for(a=i=0;a<c;a++)s[a].nesting<0&&u--,s[a].level=u,s[a].nesting>0&&u++,s[a].type==="text"&&a+1<c&&s[a+1].type==="text"?s[a+1].content=s[a].content+s[a+1].content:(a!==i&&(s[i]=s[a]),i++);a!==i&&(s.length=i)}const L0=[["text",jw],["linkify",Bw],["newline",qw],["escape",Fw],["backticks",Hw],["strikethrough",Cg.tokenize],["emphasis",Eg.tokenize],["link",Zw],["image",Xw],["autolink",Jw],["html_inline",e6],["entity",a6]],V0=[["balance_pairs",r6],["strikethrough",Cg.postProcess],["emphasis",Eg.postProcess],["fragments_join",u6]];function Zi(){this.ruler=new jt;for(let n=0;n<L0.length;n++)this.ruler.push(L0[n][0],L0[n][1]);this.ruler2=new jt;for(let n=0;n<V0.length;n++)this.ruler2.push(V0[n][0],V0[n][1])}Zi.prototype.skipToken=function(n){const a=n.pos,i=this.ruler.getRules(""),u=i.length,s=n.md.options.maxNesting,c=n.cache;if(typeof c[a]<"u"){n.pos=c[a];return}let f=!1;if(n.level<s){for(let h=0;h<u;h++)if(n.level++,f=i[h](n,!0),n.level--,f){if(a>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}else n.pos=n.posMax;f||n.pos++,c[a]=n.pos};Zi.prototype.tokenize=function(n){const a=this.ruler.getRules(""),i=a.length,u=n.posMax,s=n.md.options.maxNesting;for(;n.pos<u;){const c=n.pos;let f=!1;if(n.level<s){for(let h=0;h<i;h++)if(f=a[h](n,!1),f){if(c>=n.pos)throw new Error("inline rule didn't increment state.pos");break}}if(f){if(n.pos>=u)break;continue}n.pending+=n.src[n.pos++]}n.pending&&n.pushPending()};Zi.prototype.parse=function(n,a,i,u){const s=new this.State(n,a,i,u);this.tokenize(s);const c=this.ruler2.getRules(""),f=c.length;for(let h=0;h<f;h++)c[h](s)};Zi.prototype.State=Yi;function i6(n){const a={};n=n||{},a.src_Any=fg.source,a.src_Cc=hg.source,a.src_Z=mg.source,a.src_P=qd.source,a.src_ZPCc=[a.src_Z,a.src_P,a.src_Cc].join("|"),a.src_ZCc=[a.src_Z,a.src_Cc].join("|");const i="[><｜]";return a.src_pseudo_letter="(?:(?!"+i+"|"+a.src_ZPCc+")"+a.src_Any+")",a.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",a.src_auth="(?:(?:(?!"+a.src_ZCc+"|[@/\\[\\]()]).)+@)?",a.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",a.src_host_terminator="(?=$|"+i+"|"+a.src_ZPCc+")(?!"+(n["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+a.src_ZPCc+"))",a.src_path="(?:[/?#](?:(?!"+a.src_ZCc+"|"+i+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+a.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+a.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+a.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+a.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+a.src_ZCc+"|[']).)+\\'|\\'(?="+a.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+a.src_ZCc+"|[.]|$)|"+(n["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+a.src_ZCc+"|$)|;(?!"+a.src_ZCc+"|$)|\\!+(?!"+a.src_ZCc+"|[!]|$)|\\?(?!"+a.src_ZCc+"|[?]|$))+|\\/)?",a.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',a.src_xn="xn--[a-z0-9\\-]{1,59}",a.src_domain_root="(?:"+a.src_xn+"|"+a.src_pseudo_letter+"{1,63})",a.src_domain="(?:"+a.src_xn+"|(?:"+a.src_pseudo_letter+")|(?:"+a.src_pseudo_letter+"(?:-|"+a.src_pseudo_letter+"){0,61}"+a.src_pseudo_letter+"))",a.src_host="(?:(?:(?:(?:"+a.src_domain+")\\.)*"+a.src_domain+"))",a.tpl_host_fuzzy="(?:"+a.src_ip4+"|(?:(?:(?:"+a.src_domain+")\\.)+(?:%TLDS%)))",a.tpl_host_no_ip_fuzzy="(?:(?:(?:"+a.src_domain+")\\.)+(?:%TLDS%))",a.src_host_strict=a.src_host+a.src_host_terminator,a.tpl_host_fuzzy_strict=a.tpl_host_fuzzy+a.src_host_terminator,a.src_host_port_strict=a.src_host+a.src_port+a.src_host_terminator,a.tpl_host_port_fuzzy_strict=a.tpl_host_fuzzy+a.src_port+a.src_host_terminator,a.tpl_host_port_no_ip_fuzzy_strict=a.tpl_host_no_ip_fuzzy+a.src_port+a.src_host_terminator,a.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+a.src_ZPCc+"|>|$))",a.tpl_email_fuzzy="(^|"+i+'|"|\\(|'+a.src_ZCc+")("+a.src_email_name+"@"+a.tpl_host_fuzzy_strict+")",a.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+a.src_ZPCc+"))((?![$+<=>^`|｜])"+a.tpl_host_port_fuzzy_strict+a.src_path+")",a.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+a.src_ZPCc+"))((?![$+<=>^`|｜])"+a.tpl_host_port_no_ip_fuzzy_strict+a.src_path+")",a}function hd(n){return Array.prototype.slice.call(arguments,1).forEach(function(i){i&&Object.keys(i).forEach(function(u){n[u]=i[u]})}),n}function Is(n){return Object.prototype.toString.call(n)}function l6(n){return Is(n)==="[object String]"}function s6(n){return Is(n)==="[object Object]"}function o6(n){return Is(n)==="[object RegExp]"}function Km(n){return Is(n)==="[object Function]"}function c6(n){return n.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const kg={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function d6(n){return Object.keys(n||{}).reduce(function(a,i){return a||kg.hasOwnProperty(i)},!1)}const f6={"http:":{validate:function(n,a,i){const u=n.slice(a);return i.re.http||(i.re.http=new RegExp("^\\/\\/"+i.re.src_auth+i.re.src_host_port_strict+i.re.src_path,"i")),i.re.http.test(u)?u.match(i.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(n,a,i){const u=n.slice(a);return i.re.no_http||(i.re.no_http=new RegExp("^"+i.re.src_auth+"(?:localhost|(?:(?:"+i.re.src_domain+")\\.)+"+i.re.src_domain_root+")"+i.re.src_port+i.re.src_host_terminator+i.re.src_path,"i")),i.re.no_http.test(u)?a>=3&&n[a-3]===":"||a>=3&&n[a-3]==="/"?0:u.match(i.re.no_http)[0].length:0}},"mailto:":{validate:function(n,a,i){const u=n.slice(a);return i.re.mailto||(i.re.mailto=new RegExp("^"+i.re.src_email_name+"@"+i.re.src_host_strict,"i")),i.re.mailto.test(u)?u.match(i.re.mailto)[0].length:0}}},h6="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",p6="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function m6(n){n.__index__=-1,n.__text_cache__=""}function b6(n){return function(a,i){const u=a.slice(i);return n.test(u)?u.match(n)[0].length:0}}function Wm(){return function(n,a){a.normalize(n)}}function Ns(n){const a=n.re=i6(n.__opts__),i=n.__tlds__.slice();n.onCompile(),n.__tlds_replaced__||i.push(h6),i.push(a.src_xn),a.src_tlds=i.join("|");function u(h){return h.replace("%TLDS%",a.src_tlds)}a.email_fuzzy=RegExp(u(a.tpl_email_fuzzy),"i"),a.link_fuzzy=RegExp(u(a.tpl_link_fuzzy),"i"),a.link_no_ip_fuzzy=RegExp(u(a.tpl_link_no_ip_fuzzy),"i"),a.host_fuzzy_test=RegExp(u(a.tpl_host_fuzzy_test),"i");const s=[];n.__compiled__={};function c(h,b){throw new Error('(LinkifyIt) Invalid schema "'+h+'": '+b)}Object.keys(n.__schemas__).forEach(function(h){const b=n.__schemas__[h];if(b===null)return;const m={validate:null,link:null};if(n.__compiled__[h]=m,s6(b)){o6(b.validate)?m.validate=b6(b.validate):Km(b.validate)?m.validate=b.validate:c(h,b),Km(b.normalize)?m.normalize=b.normalize:b.normalize?c(h,b):m.normalize=Wm();return}if(l6(b)){s.push(h);return}c(h,b)}),s.forEach(function(h){n.__compiled__[n.__schemas__[h]]&&(n.__compiled__[h].validate=n.__compiled__[n.__schemas__[h]].validate,n.__compiled__[h].normalize=n.__compiled__[n.__schemas__[h]].normalize)}),n.__compiled__[""]={validate:null,normalize:Wm()};const f=Object.keys(n.__compiled__).filter(function(h){return h.length>0&&n.__compiled__[h]}).map(c6).join("|");n.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+a.src_ZPCc+"))("+f+")","i"),n.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+a.src_ZPCc+"))("+f+")","ig"),n.re.schema_at_start=RegExp("^"+n.re.schema_search.source,"i"),n.re.pretest=RegExp("("+n.re.schema_test.source+")|("+n.re.host_fuzzy_test.source+")|@","i"),m6(n)}function g6(n,a){const i=n.__index__,u=n.__last_index__,s=n.__text_cache__.slice(i,u);this.schema=n.__schema__.toLowerCase(),this.index=i+a,this.lastIndex=u+a,this.raw=s,this.text=s,this.url=s}function pd(n,a){const i=new g6(n,a);return n.__compiled__[i.schema].normalize(i,n),i}function It(n,a){if(!(this instanceof It))return new It(n,a);a||d6(n)&&(a=n,n={}),this.__opts__=hd({},kg,a),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=hd({},f6,n),this.__compiled__={},this.__tlds__=p6,this.__tlds_replaced__=!1,this.re={},Ns(this)}It.prototype.add=function(a,i){return this.__schemas__[a]=i,Ns(this),this};It.prototype.set=function(a){return this.__opts__=hd(this.__opts__,a),this};It.prototype.test=function(a){if(this.__text_cache__=a,this.__index__=-1,!a.length)return!1;let i,u,s,c,f,h,b,m,y;if(this.re.schema_test.test(a)){for(b=this.re.schema_search,b.lastIndex=0;(i=b.exec(a))!==null;)if(c=this.testSchemaAt(a,i[2],b.lastIndex),c){this.__schema__=i[2],this.__index__=i.index+i[1].length,this.__last_index__=i.index+i[0].length+c;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(m=a.search(this.re.host_fuzzy_test),m>=0&&(this.__index__<0||m<this.__index__)&&(u=a.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(f=u.index+u[1].length,(this.__index__<0||f<this.__index__)&&(this.__schema__="",this.__index__=f,this.__last_index__=u.index+u[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(y=a.indexOf("@"),y>=0&&(s=a.match(this.re.email_fuzzy))!==null&&(f=s.index+s[1].length,h=s.index+s[0].length,(this.__index__<0||f<this.__index__||f===this.__index__&&h>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=f,this.__last_index__=h))),this.__index__>=0};It.prototype.pretest=function(a){return this.re.pretest.test(a)};It.prototype.testSchemaAt=function(a,i,u){return this.__compiled__[i.toLowerCase()]?this.__compiled__[i.toLowerCase()].validate(a,u,this):0};It.prototype.match=function(a){const i=[];let u=0;this.__index__>=0&&this.__text_cache__===a&&(i.push(pd(this,u)),u=this.__last_index__);let s=u?a.slice(u):a;for(;this.test(s);)i.push(pd(this,u)),s=s.slice(this.__last_index__),u+=this.__last_index__;return i.length?i:null};It.prototype.matchAtStart=function(a){if(this.__text_cache__=a,this.__index__=-1,!a.length)return null;const i=this.re.schema_at_start.exec(a);if(!i)return null;const u=this.testSchemaAt(a,i[2],i[0].length);return u?(this.__schema__=i[2],this.__index__=i.index+i[1].length,this.__last_index__=i.index+i[0].length+u,pd(this,0)):null};It.prototype.tlds=function(a,i){return a=Array.isArray(a)?a:[a],i?(this.__tlds__=this.__tlds__.concat(a).sort().filter(function(u,s,c){return u!==c[s-1]}).reverse(),Ns(this),this):(this.__tlds__=a.slice(),this.__tlds_replaced__=!0,Ns(this),this)};It.prototype.normalize=function(a){a.schema||(a.url="http://"+a.url),a.schema==="mailto:"&&!/^mailto:/i.test(a.url)&&(a.url="mailto:"+a.url)};It.prototype.onCompile=function(){};const ru=2147483647,Sn=36,Gd=1,Hi=26,y6=38,v6=700,Ag=72,Dg=128,Tg="-",_6=/^xn--/,x6=/[^\0-\x7F]/,w6=/[\x2E\u3002\uFF0E\uFF61]/g,S6={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},G0=Sn-Gd,Cn=Math.floor,Y0=String.fromCharCode;function Ea(n){throw new RangeError(S6[n])}function C6(n,a){const i=[];let u=n.length;for(;u--;)i[u]=a(n[u]);return i}function zg(n,a){const i=n.split("@");let u="";i.length>1&&(u=i[0]+"@",n=i[1]),n=n.replace(w6,".");const s=n.split("."),c=C6(s,a).join(".");return u+c}function $g(n){const a=[];let i=0;const u=n.length;for(;i<u;){const s=n.charCodeAt(i++);if(s>=55296&&s<=56319&&i<u){const c=n.charCodeAt(i++);(c&64512)==56320?a.push(((s&1023)<<10)+(c&1023)+65536):(a.push(s),i--)}else a.push(s)}return a}const E6=n=>String.fromCodePoint(...n),k6=function(n){return n>=48&&n<58?26+(n-48):n>=65&&n<91?n-65:n>=97&&n<123?n-97:Sn},Pm=function(n,a){return n+22+75*(n<26)-((a!=0)<<5)},Og=function(n,a,i){let u=0;for(n=i?Cn(n/v6):n>>1,n+=Cn(n/a);n>G0*Hi>>1;u+=Sn)n=Cn(n/G0);return Cn(u+(G0+1)*n/(n+y6))},Mg=function(n){const a=[],i=n.length;let u=0,s=Dg,c=Ag,f=n.lastIndexOf(Tg);f<0&&(f=0);for(let h=0;h<f;++h)n.charCodeAt(h)>=128&&Ea("not-basic"),a.push(n.charCodeAt(h));for(let h=f>0?f+1:0;h<i;){const b=u;for(let y=1,p=Sn;;p+=Sn){h>=i&&Ea("invalid-input");const _=k6(n.charCodeAt(h++));_>=Sn&&Ea("invalid-input"),_>Cn((ru-u)/y)&&Ea("overflow"),u+=_*y;const x=p<=c?Gd:p>=c+Hi?Hi:p-c;if(_<x)break;const v=Sn-x;y>Cn(ru/v)&&Ea("overflow"),y*=v}const m=a.length+1;c=Og(u-b,m,b==0),Cn(u/m)>ru-s&&Ea("overflow"),s+=Cn(u/m),u%=m,a.splice(u++,0,s)}return String.fromCodePoint(...a)},Ng=function(n){const a=[];n=$g(n);const i=n.length;let u=Dg,s=0,c=Ag;for(const b of n)b<128&&a.push(Y0(b));const f=a.length;let h=f;for(f&&a.push(Tg);h<i;){let b=ru;for(const y of n)y>=u&&y<b&&(b=y);const m=h+1;b-u>Cn((ru-s)/m)&&Ea("overflow"),s+=(b-u)*m,u=b;for(const y of n)if(y<u&&++s>ru&&Ea("overflow"),y===u){let p=s;for(let _=Sn;;_+=Sn){const x=_<=c?Gd:_>=c+Hi?Hi:_-c;if(p<x)break;const v=p-x,w=Sn-x;a.push(Y0(Pm(x+v%w,0))),p=Cn(v/w)}a.push(Y0(Pm(p,0))),c=Og(s,m,h===f),s=0,++h}++s,++u}return a.join("")},A6=function(n){return zg(n,function(a){return _6.test(a)?Mg(a.slice(4).toLowerCase()):a})},D6=function(n){return zg(n,function(a){return x6.test(a)?"xn--"+Ng(a):a})},Rg={version:"2.3.1",ucs2:{decode:$g,encode:E6},decode:Mg,encode:Ng,toASCII:D6,toUnicode:A6},T6={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},z6={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},$6={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},O6={default:T6,zero:z6,commonmark:$6},M6=/^(vbscript|javascript|file|data):/,N6=/^data:image\/(gif|png|jpeg|webp);/;function R6(n){const a=n.trim().toLowerCase();return M6.test(a)?N6.test(a):!0}const jg=["http:","https:","mailto:"];function j6(n){const a=Bd(n,!0);if(a.hostname&&(!a.protocol||jg.indexOf(a.protocol)>=0))try{a.hostname=Rg.toASCII(a.hostname)}catch{}return Gi(Ud(a))}function U6(n){const a=Bd(n,!0);if(a.hostname&&(!a.protocol||jg.indexOf(a.protocol)>=0))try{a.hostname=Rg.toUnicode(a.hostname)}catch{}return cu(Ud(a),cu.defaultChars+"%")}function Jt(n,a){if(!(this instanceof Jt))return new Jt(n,a);a||Fd(n)||(a=n||{},n="default"),this.inline=new Zi,this.block=new Qs,this.core=new Ld,this.renderer=new mu,this.linkify=new It,this.validateLink=R6,this.normalizeLink=j6,this.normalizeLinkText=U6,this.utils=qx,this.helpers=Zs({},Vx),this.options={},this.configure(n),a&&this.set(a)}Jt.prototype.set=function(n){return Zs(this.options,n),this};Jt.prototype.configure=function(n){const a=this;if(Fd(n)){const i=n;if(n=O6[i],!n)throw new Error('Wrong `markdown-it` preset "'+i+'", check name')}if(!n)throw new Error("Wrong `markdown-it` preset, can't be empty");return n.options&&a.set(n.options),n.components&&Object.keys(n.components).forEach(function(i){n.components[i].rules&&a[i].ruler.enableOnly(n.components[i].rules),n.components[i].rules2&&a[i].ruler2.enableOnly(n.components[i].rules2)}),this};Jt.prototype.enable=function(n,a){let i=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(function(s){i=i.concat(this[s].ruler.enable(n,!0))},this),i=i.concat(this.inline.ruler2.enable(n,!0));const u=n.filter(function(s){return i.indexOf(s)<0});if(u.length&&!a)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+u);return this};Jt.prototype.disable=function(n,a){let i=[];Array.isArray(n)||(n=[n]),["core","block","inline"].forEach(function(s){i=i.concat(this[s].ruler.disable(n,!0))},this),i=i.concat(this.inline.ruler2.disable(n,!0));const u=n.filter(function(s){return i.indexOf(s)<0});if(u.length&&!a)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+u);return this};Jt.prototype.use=function(n){const a=[this].concat(Array.prototype.slice.call(arguments,1));return n.apply(n,a),this};Jt.prototype.parse=function(n,a){if(typeof n!="string")throw new Error("Input data should be a String");const i=new this.core.State(n,this,a);return this.core.process(i),i.tokens};Jt.prototype.render=function(n,a){return a=a||{},this.renderer.render(this.parse(n,a),this.options,a)};Jt.prototype.parseInline=function(n,a){const i=new this.core.State(n,this,a);return i.inlineMode=!0,this.core.process(i),i.tokens};Jt.prototype.renderInline=function(n,a){return a=a||{},this.renderer.render(this.parseInline(n,a),this.options,a)};function B6(n){const a=document.createElement("div");return Dd(G`${n}`,a),a.innerHTML.replaceAll(/<!--([^-]*)-->/gim,"")}class q6 extends hu{#e=Jt({highlight:(a,i)=>{switch(i){case"html":{const u=document.createElement("iframe");return u.classList.add("html-view"),u.srcdoc=a,u.sandbox="",u.innerHTML}default:return B6(a)}}});#t=null;#a=null;update(a,[i,u]){return this.#t===i&&JSON.stringify(u)===this.#a?pn:(this.#t=i,this.#a=JSON.stringify(u),this.render(i,u))}#n=new Map;#r(a){Object.entries(a).forEach(([i])=>{let u;switch(i){case"p":u="paragraph";break;case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":u="heading";break;case"ul":u="bullet_list";break;case"ol":u="ordered_list";break;case"li":u="list_item";break;case"a":u="link";break;case"strong":u="strong";break;case"em":u="em";break}if(!u)return;const s=`${u}_open`;this.#e.renderer.rules[s]=(c,f,h,b,m)=>{const y=c[f],p=a[y.tag]??[];for(const _ of p)y.attrJoin("class",_);return m.renderToken(c,f,h)}})}#i(){for(const[a]of this.#n)delete this.#e.renderer.rules[a];this.#n.clear()}render(a,i){i&&this.#r(i);const u=this.#e.render(a);return this.#i(),W_(u)}}const F6=fu(q6);Jt();var Z0=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},_i=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-text")],a,i=[],u,s=ct,c,f=[],h=[],b,m=[],y=[];return class extends s{static{u=this}static{const p=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],b=[re({reflect:!0,attribute:"usage-hint"})],Z0(this,null,c,{kind:"accessor",name:"text",static:!1,private:!1,access:{has:_=>"text"in _,get:_=>_.text,set:(_,x)=>{_.text=x}},metadata:p},f,h),Z0(this,null,b,{kind:"accessor",name:"usageHint",static:!1,private:!1,access:{has:_=>"usageHint"in _,get:_=>_.usageHint,set:(_,x)=>{_.usageHint=x}},metadata:p},m,y),Z0(null,a={value:u},n,{kind:"class",name:u.name,metadata:p},null,i),u=a.value,p&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:p})}#e=_i(this,f,null);get text(){return this.#e}set text(p){this.#e=p}#t=(_i(this,h),_i(this,m,null));get usageHint(){return this.#t}set usageHint(p){this.#t=p}static{this.styles=[ot,Ve`
      :host {
        display: block;
        flex: var(--weight);
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        line-height: inherit;
        font: inherit;
      }
    `]}#a(){let p=null;if(this.text&&typeof this.text=="object"){if("literalString"in this.text&&this.text.literalString)p=this.text.literalString;else if("literal"in this.text&&this.text.literal!==void 0)p=this.text.literal;else if(this.text&&"path"in this.text&&this.text.path){if(!this.processor||!this.component)return G`(no model)`;const x=this.processor.getData(this.component,this.text.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);x!=null&&(p=x.toString())}}if(p==null)return G`(empty)`;let _=p;switch(this.usageHint){case"h1":_=`# ${_}`;break;case"h2":_=`## ${_}`;break;case"h3":_=`### ${_}`;break;case"h4":_=`#### ${_}`;break;case"h5":_=`##### ${_}`;break;case"caption":_=`*${_}*`;break}return G`${F6(_,P3(this.theme.markdown,["ol","ul","li"],{}))}`}#n(p){return typeof p!="object"||Array.isArray(p)||!p?!1:["h1","h2","h3","h4","h5","h6","caption","body"].every(x=>x in p)}#r(){let p={};const _=this.theme.additionalStyles?.Text;if(!_)return p;if(this.#n(_)){const x=this.usageHint??"body";p=_[x]}else p=_;return p}render(){const p=Kt(this.theme.components.Text.all,this.usageHint?this.theme.components.Text[this.usageHint]:{});return G`<section
      class=${xe(p)}
      style=${this.theme.additionalStyles?.Text?dt(this.#r()):I}
    >
      ${this.#a()}
    </section>`}constructor(){super(...arguments),_i(this,y)}static{_i(u,i)}},u})();var eb=function(n,a,i,u,s,c){function f(E){if(E!==void 0&&typeof E!="function")throw new TypeError("Function expected");return E}for(var h=u.kind,b=h==="getter"?"get":h==="setter"?"set":"value",m=!a&&n?u.static?n:n.prototype:null,y=a||(m?Object.getOwnPropertyDescriptor(m,u.name):{}),p,_=!1,x=i.length-1;x>=0;x--){var v={};for(var w in u)v[w]=w==="access"?{}:u[w];for(var w in u.access)v.access[w]=u.access[w];v.addInitializer=function(E){if(_)throw new TypeError("Cannot add initializers after decoration has completed");c.push(f(E||null))};var C=(0,i[x])(h==="accessor"?{get:y.get,set:y.set}:y[b],v);if(h==="accessor"){if(C===void 0)continue;if(C===null||typeof C!="object")throw new TypeError("Object expected");(p=f(C.get))&&(y.get=p),(p=f(C.set))&&(y.set=p),(p=f(C.init))&&s.unshift(p)}else(p=f(C))&&(h==="field"?s.unshift(p):y[b]=p)}m&&Object.defineProperty(m,u.name,y),_=!0},X0=function(n,a,i){for(var u=arguments.length>2,s=0;s<a.length;s++)i=u?a[s].call(n,i):a[s].call(n);return u?i:void 0};(()=>{let n=[Xe("a2ui-video")],a,i=[],u,s=ct,c,f=[],h=[];return class extends s{static{u=this}static{const b=typeof Symbol=="function"&&Symbol.metadata?Object.create(s[Symbol.metadata]??null):void 0;c=[re()],eb(this,null,c,{kind:"accessor",name:"url",static:!1,private:!1,access:{has:m=>"url"in m,get:m=>m.url,set:(m,y)=>{m.url=y}},metadata:b},f,h),eb(null,a={value:u},n,{kind:"class",name:u.name,metadata:b},null,i),u=a.value,b&&Object.defineProperty(u,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:b})}#e=X0(this,f,null);get url(){return this.#e}set url(b){this.#e=b}static{this.styles=[ot,Ve`
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        flex: var(--weight);
        min-height: 0;
        overflow: auto;
      }

      video {
        display: block;
        width: 100%;
      }
    `]}#t(){if(!this.url)return I;if(this.url&&typeof this.url=="object"){if("literalString"in this.url)return G`<video controls src=${this.url.literalString} />`;if("literal"in this.url)return G`<video controls src=${this.url.literal} />`;if(this.url&&"path"in this.url&&this.url.path){if(!this.processor||!this.component)return G`(no processor)`;const b=this.processor.getData(this.component,this.url.path,this.surfaceId??Ze.DEFAULT_SURFACE_ID);return b?typeof b!="string"?G`Invalid video URL`:G`<video controls src=${b} />`:G`Invalid video URL`}}return G`(empty)`}render(){return G`<section
      class=${xe(this.theme.components.Video)}
      style=${this.theme.additionalStyles?.Video?dt(this.theme.additionalStyles?.Video):I}
    >
      ${this.#t()}
    </section>`}constructor(){super(...arguments),X0(this,h)}static{X0(u,i)}},u})();const H6={"typography-f-sf":!0,"typography-fs-n":!0,"typography-w-500":!0,"layout-as-n":!0,"layout-dis-iflx":!0,"layout-al-c":!0,"typography-td-none":!0,"color-c-p40":!0},L6={"layout-w-100":!0},V6={"typography-f-s":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-mt-0":!0,"layout-mb-2":!0,"typography-sz-bm":!0,"color-c-n10":!0},G6={"typography-f-sf":!0,"typography-fs-n":!0,"typography-w-500":!0,"layout-pt-3":!0,"layout-pb-3":!0,"layout-pl-5":!0,"layout-pr-5":!0,"layout-mb-1":!0,"border-br-16":!0,"border-bw-0":!0,"border-c-n70":!0,"border-bs-s":!0,"color-bgc-s30":!0,"behavior-ho-80":!0},xn={"typography-f-sf":!0,"typography-fs-n":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mb-2":!0},Y6={"behavior-sw-n":!0},Ug={"typography-f-sf":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-pl-4":!0,"layout-pr-4":!0,"layout-pt-2":!0,"layout-pb-2":!0,"border-br-6":!0,"border-bw-1":!0,"color-bc-s70":!0,"border-bs-s":!0,"layout-as-n":!0,"color-c-n10":!0},Z6={"typography-f-s":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-m-0":!0,"typography-sz-bm":!0,"layout-as-n":!0,"color-c-n10":!0},X6={"typography-f-s":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-m-0":!0,"typography-sz-bm":!0,"layout-as-n":!0,"color-c-n10":!0},Q6={"typography-f-s":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-m-0":!0,"typography-sz-bm":!0,"layout-as-n":!0,"color-c-n10":!0},I6={"typography-f-s":!0,"typography-fs-n":!0,"typography-w-400":!0,"layout-m-0":!0,"typography-sz-bm":!0,"layout-as-n":!0,"color-c-n10":!0},J6={"typography-f-c":!0,"typography-fs-n":!0,"typography-w-400":!0,"typography-sz-bm":!0,"typography-ws-p":!0,"layout-as-n":!0},K6={...Ug,"layout-r-none":!0,"layout-fs-c":!0},W6={"layout-el-cv":!0},tb=Kt(H6,{}),P6=Kt(Ug,{}),e4=Kt(K6,{}),t4=Kt(G6,{}),n4=Kt(V6,{}),nb=Kt(Z6,{}),a4=Kt(J6,{}),r4=Kt(X6,{}),u4=Kt(Q6,{}),i4=Kt(I6,{}),Bg={additionalStyles:{Button:{"--n-35":"var(--n-100)","--n-10":"var(--n-0)",background:"linear-gradient(135deg, light-dark(#818cf8, #06b6d4) 0%, light-dark(#a78bfa, #3b82f6) 100%)",boxShadow:"0 4px 15px rgba(102, 126, 234, 0.4)",padding:"12px 28px",textTransform:"uppercase"},Text:{h1:{color:"transparent",background:"linear-gradient(135deg, light-dark(#818cf8, #06b6d4) 0%, light-dark(#a78bfa, #3b82f6) 100%)","-webkit-background-clip":"text","background-clip":"text","-webkit-text-fill-color":"transparent"},h2:{color:"transparent",background:"linear-gradient(135deg, light-dark(#818cf8, #06b6d4) 0%, light-dark(#a78bfa, #3b82f6) 100%)","-webkit-background-clip":"text","background-clip":"text","-webkit-text-fill-color":"transparent"},h3:{color:"transparent",background:"linear-gradient(135deg, light-dark(#818cf8, #06b6d4) 0%, light-dark(#a78bfa, #3b82f6) 100%)","-webkit-background-clip":"text","background-clip":"text","-webkit-text-fill-color":"transparent"},h4:{},h5:{},body:{},caption:{}},Card:{background:"radial-gradient(circle at top left, light-dark(transparent, rgba(6, 182, 212, 0.15)), transparent 40%), radial-gradient(circle at bottom right, light-dark(transparent, rgba(139, 92, 246, 0.15)), transparent 40%), linear-gradient(135deg, light-dark(rgba(255, 255, 255, 0.7), rgba(30, 41, 59, 0.7)), light-dark(rgba(255, 255, 255, 0.7), rgba(15, 23, 42, 0.8)))"},TextField:{"--p-0":"light-dark(var(--n-0), #1e293b)"}},components:{AudioPlayer:{},Button:{"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-3":!0,"layout-pr-3":!0,"border-br-12":!0,"border-bw-0":!0,"border-bs-s":!0,"color-bgc-p30":!0,"behavior-ho-70":!0,"typography-w-400":!0},Card:{"border-br-9":!0,"layout-p-4":!0,"color-bgc-n100":!0},CheckBox:{element:{"layout-m-0":!0,"layout-mr-2":!0,"layout-p-2":!0,"border-br-12":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0,"color-c-p30":!0},label:{"color-c-p30":!0,"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-flx-1":!0,"typography-sz-ll":!0},container:{"layout-dsp-iflex":!0,"layout-al-c":!0}},Column:{"layout-g-2":!0},DateTimeInput:{container:{"typography-sz-bm":!0,"layout-w-100":!0,"layout-g-2":!0,"layout-dsp-flexhor":!0,"layout-al-c":!0,"typography-ws-nw":!0},label:{"color-c-p30":!0,"typography-sz-bm":!0},element:{"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-3":!0,"layout-pr-3":!0,"border-br-2":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0,"color-c-p30":!0}},Divider:{},Image:{all:{"border-br-5":!0,"layout-el-cv":!0,"layout-w-100":!0,"layout-h-100":!0},avatar:{"is-avatar":!0},header:{},icon:{},largeFeature:{},mediumFeature:{},smallFeature:{}},Icon:{},List:{"layout-g-4":!0,"layout-p-2":!0},Modal:{backdrop:{"color-bbgc-p60_20":!0},element:{"border-br-2":!0,"color-bgc-p100":!0,"layout-p-4":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bc-p80":!0}},MultipleChoice:{container:{},label:{},element:{}},Row:{"layout-g-4":!0},Slider:{container:{},label:{},element:{}},Tabs:{container:{},controls:{all:{},selected:{}},element:{}},Text:{all:{"layout-w-100":!0,"layout-g-2":!0},h1:{"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-m-0":!0,"layout-p-0":!0,"typography-sz-hs":!0},h2:{"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-m-0":!0,"layout-p-0":!0,"typography-sz-tl":!0},h3:{"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-m-0":!0,"layout-p-0":!0,"typography-sz-tl":!0},h4:{"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-m-0":!0,"layout-p-0":!0,"typography-sz-bl":!0},h5:{"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-m-0":!0,"layout-p-0":!0,"typography-sz-bm":!0},body:{},caption:{}},TextField:{container:{"typography-sz-bm":!0,"layout-w-100":!0,"layout-g-2":!0,"layout-dsp-flexhor":!0,"layout-al-c":!0,"typography-ws-nw":!0},label:{"layout-flx-0":!0,"color-c-p30":!0},element:{"typography-sz-bm":!0,"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-3":!0,"layout-pr-3":!0,"border-br-2":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0,"color-c-p30":!0}},Video:{"border-br-5":!0,"layout-el-cv":!0}},elements:{a:tb,audio:L6,body:n4,button:t4,h1:xn,h2:xn,h3:xn,h4:xn,h5:xn,iframe:Y6,input:P6,p:nb,pre:a4,textarea:e4,video:W6},markdown:{p:[...Object.keys(nb)],h1:[...Object.keys(xn)],h2:[...Object.keys(xn)],h3:[...Object.keys(xn)],h4:[...Object.keys(xn)],h5:[...Object.keys(xn)],ul:[...Object.keys(u4)],ol:[...Object.keys(r4)],li:[...Object.keys(i4)],a:[...Object.keys(tb)],strong:[],em:[]}};var l4=".well-known/agent-card.json",s4=class extends Error{constructor(n){super(n??"Task not found"),this.name="TaskNotFoundError"}},o4=class extends Error{constructor(n){super(n??"Task cannot be canceled"),this.name="TaskNotCancelableError"}},c4=class extends Error{constructor(n){super(n??"Push Notification is not supported"),this.name="PushNotificationNotSupportedError"}},d4=class extends Error{constructor(n){super(n??"This operation is not supported"),this.name="UnsupportedOperationError"}},f4=class extends Error{constructor(n){super(n??"Incompatible content types"),this.name="ContentTypeNotSupportedError"}},h4=class extends Error{constructor(n){super(n??"Invalid agent response type"),this.name="InvalidAgentResponseError"}},p4=class extends Error{constructor(n){super(n??"Authenticated Extended Card not configured"),this.name="AuthenticatedExtendedCardNotConfiguredError"}},m4=class md{customFetchImpl;endpoint;requestIdCounter=1;constructor(a){this.endpoint=a.endpoint,this.customFetchImpl=a.fetchImpl}async getExtendedAgentCard(a,i){return(await this._sendRpcRequest("agent/getAuthenticatedExtendedCard",void 0,i,a)).result}async sendMessage(a,i,u){return(await this._sendRpcRequest("message/send",a,u,i)).result}async*sendMessageStream(a,i){yield*this._sendStreamingRequest("message/stream",a,i)}async setTaskPushNotificationConfig(a,i,u){return(await this._sendRpcRequest("tasks/pushNotificationConfig/set",a,u,i)).result}async getTaskPushNotificationConfig(a,i,u){return(await this._sendRpcRequest("tasks/pushNotificationConfig/get",a,u,i)).result}async listTaskPushNotificationConfig(a,i,u){return(await this._sendRpcRequest("tasks/pushNotificationConfig/list",a,u,i)).result}async deleteTaskPushNotificationConfig(a,i,u){await this._sendRpcRequest("tasks/pushNotificationConfig/delete",a,u,i)}async getTask(a,i,u){return(await this._sendRpcRequest("tasks/get",a,u,i)).result}async cancelTask(a,i,u){return(await this._sendRpcRequest("tasks/cancel",a,u,i)).result}async*resubscribeTask(a,i){yield*this._sendStreamingRequest("tasks/resubscribe",a,i)}async callExtensionMethod(a,i,u,s){return await this._sendRpcRequest(a,i,u,s)}_fetch(...a){if(this.customFetchImpl)return this.customFetchImpl(...a);if(typeof fetch=="function")return fetch(...a);throw new Error("A `fetch` implementation was not provided and is not available in the global scope. Please provide a `fetchImpl` in the A2ATransportOptions. ")}async _sendRpcRequest(a,i,u,s){const c=u??this.requestIdCounter++,f={jsonrpc:"2.0",method:a,params:i,id:c},h=await this._fetchRpc(f,"application/json",s);if(!h.ok){let m="(empty or non-JSON response)",y;try{m=await h.text(),y=JSON.parse(m)}catch(p){throw new Error(`HTTP error for ${a}! Status: ${h.status} ${h.statusText}. Response: ${m}`,{cause:p})}throw y.jsonrpc&&y.error?md.mapToError(y):new Error(`HTTP error for ${a}! Status: ${h.status} ${h.statusText}. Response: ${m}`)}const b=await h.json();if(b.id!==c&&console.error(`CRITICAL: RPC response ID mismatch for method ${a}. Expected ${c}, got ${b.id}.`),"error"in b)throw md.mapToError(b);return b}async _fetchRpc(a,i="application/json",u){const s={method:"POST",headers:{...u?.serviceParameters,"Content-Type":"application/json",Accept:i},body:JSON.stringify(a),signal:u?.signal};return this._fetch(this.endpoint,s)}async*_sendStreamingRequest(a,i,u){const s=this.requestIdCounter++,c={jsonrpc:"2.0",method:a,params:i,id:s},f=await this._fetchRpc(c,"text/event-stream",u);if(!f.ok){let h="",b;try{h=await f.text(),b=JSON.parse(h)}catch(m){throw new Error(`HTTP error establishing stream for ${a}: ${f.status} ${f.statusText}. Response: ${h||"(empty)"}`,{cause:m})}throw b.error?new Error(`HTTP error establishing stream for ${a}: ${f.status} ${f.statusText}. RPC Error: ${b.error.message} (Code: ${b.error.code})`):new Error(`HTTP error establishing stream for ${a}: ${f.status} ${f.statusText}`)}if(!f.headers.get("Content-Type")?.startsWith("text/event-stream"))throw new Error(`Invalid response Content-Type for SSE stream for ${a}. Expected 'text/event-stream'.`);yield*this._parseA2ASseStream(f,s)}async*_parseA2ASseStream(a,i){if(!a.body)throw new Error("SSE response body is undefined. Cannot read stream.");const u=a.body.pipeThrough(new TextDecoderStream).getReader();let s="",c="";try{for(;;){const{done:f,value:h}=await u.read();if(f){c.trim()&&(yield this._processSseEventData(c,i));break}s+=h;let b;for(;(b=s.indexOf(`
`))>=0;){const m=s.substring(0,b).trim();s=s.substring(b+1),m===""?c&&(yield this._processSseEventData(c,i),c=""):m.startsWith("data:")&&(c+=m.substring(5).trimStart()+`
`)}}}catch(f){throw console.error("Error reading or parsing SSE stream:",f instanceof Error&&f.message||"Error unknown"),f}finally{u.releaseLock()}}_processSseEventData(a,i){if(!a.trim())throw new Error("Attempted to process empty SSE event data.");try{const s=JSON.parse(a.replace(/\n$/,""));if(s.id!==i&&console.warn(`SSE Event's JSON-RPC response ID mismatch. Client request ID: ${i}, event response ID: ${s.id}.`),"error"in s){const c=s.error;throw new Error(`SSE event contained an error: ${c.message} (Code: ${c.code}) Data: ${JSON.stringify(c.data||{})}`)}if(!("result"in s)||typeof s.result>"u")throw new Error(`SSE event JSON-RPC response is missing 'result' field. Data: ${a}`);return s.result}catch(u){throw u instanceof Error&&(u.message.startsWith("SSE event contained an error")||u.message.startsWith("SSE event JSON-RPC response is missing 'result' field"))?u:(console.error("Failed to parse SSE event data string or unexpected JSON-RPC structure:",a,u),new Error(`Failed to parse SSE event data: "${a.substring(0,100)}...". Original error: ${u instanceof Error&&u.message||"Unknown error"}`))}}static mapToError(a){switch(a.error.code){case-32001:return new g4(a);case-32002:return new y4(a);case-32003:return new v4(a);case-32004:return new _4(a);case-32005:return new x4(a);case-32006:return new w4(a);case-32007:return new S4(a);default:return new b4(a)}}},b4=class extends Error{constructor(n){super(`JSON-RPC error: ${n.error.message} (Code: ${n.error.code}) Data: ${JSON.stringify(n.error.data||{})}`),this.errorResponse=n}},g4=class extends s4{constructor(n){super(),this.errorResponse=n}},y4=class extends o4{constructor(n){super(),this.errorResponse=n}},v4=class extends c4{constructor(n){super(),this.errorResponse=n}},_4=class extends d4{constructor(n){super(),this.errorResponse=n}},x4=class extends f4{constructor(n){super(),this.errorResponse=n}},w4=class extends h4{constructor(n){super(),this.errorResponse=n}},S4=class extends p4{constructor(n){super(),this.errorResponse=n}},C4=class In{static emptyOptions=void 0;agentCardPromise;customFetchImpl;serviceEndpointUrl;transport;requestIdCounter=1;constructor(a,i){if(this.customFetchImpl=i?.fetchImpl,typeof a=="string")console.warn("Warning: Constructing A2AClient with a URL is deprecated. Please use A2AClient.fromCardUrl() instead."),this.agentCardPromise=this._fetchAndCacheAgentCard(a,i?.agentCardPath);else{if(!a.url)throw new Error("Provided Agent Card does not contain a valid 'url' for the service endpoint.");this.serviceEndpointUrl=a.url,this.agentCardPromise=Promise.resolve(a)}}_fetch(...a){if(this.customFetchImpl)return this.customFetchImpl(...a);if(typeof fetch=="function")return fetch(...a);throw new Error("A `fetch` implementation was not provided and is not available in the global scope. Please provide a `fetchImpl` in the A2AClientOptions. For earlier Node.js versions (pre-v18), you can use a library like `node-fetch`.")}static async fromCardUrl(a,i){const u=i?.fetchImpl,s={headers:{Accept:"application/json"}};let c;if(u)c=await u(a,s);else if(typeof fetch=="function")c=await fetch(a,s);else throw new Error("A `fetch` implementation was not provided and is not available in the global scope. Please provide a `fetchImpl` in the A2AClientOptions. For earlier Node.js versions (pre-v18), you can use a library like `node-fetch`.");if(!c.ok)throw new Error(`Failed to fetch Agent Card from ${a}: ${c.status} ${c.statusText}`);let f;try{f=await c.json()}catch(h){throw console.error("Failed to parse Agent Card JSON:",h),new Error(`Failed to parse Agent Card JSON from ${a}. Original error: ${h.message}`)}return new In(f,i)}async sendMessage(a){return await this.invokeJsonRpc((i,u,s)=>i.sendMessage(u,In.emptyOptions,s),a)}async*sendMessageStream(a){if(!(await this.agentCardPromise).capabilities?.streaming)throw new Error("Agent does not support streaming (AgentCard.capabilities.streaming is not true).");yield*(await this._getOrCreateTransport()).sendMessageStream(a)}async setTaskPushNotificationConfig(a){if(!(await this.agentCardPromise).capabilities?.pushNotifications)throw new Error("Agent does not support push notifications (AgentCard.capabilities.pushNotifications is not true).");return await this.invokeJsonRpc((u,s,c)=>u.setTaskPushNotificationConfig(s,In.emptyOptions,c),a)}async getTaskPushNotificationConfig(a){return await this.invokeJsonRpc((i,u,s)=>i.getTaskPushNotificationConfig(u,In.emptyOptions,s),a)}async listTaskPushNotificationConfig(a){return await this.invokeJsonRpc((i,u,s)=>i.listTaskPushNotificationConfig(u,In.emptyOptions,s),a)}async deleteTaskPushNotificationConfig(a){return await this.invokeJsonRpc((i,u,s)=>i.deleteTaskPushNotificationConfig(u,In.emptyOptions,s),a)}async getTask(a){return await this.invokeJsonRpc((i,u,s)=>i.getTask(u,In.emptyOptions,s),a)}async cancelTask(a){return await this.invokeJsonRpc((i,u,s)=>i.cancelTask(u,In.emptyOptions,s),a)}async callExtensionMethod(a,i){const u=await this._getOrCreateTransport();try{return await u.callExtensionMethod(a,i,this.requestIdCounter++)}catch(s){const c=ab(s);if(c)return c;throw s}}async*resubscribeTask(a){if(!(await this.agentCardPromise).capabilities?.streaming)throw new Error("Agent does not support streaming (required for tasks/resubscribe).");yield*(await this._getOrCreateTransport()).resubscribeTask(a)}async _getOrCreateTransport(){if(this.transport)return this.transport;const a=await this._getServiceEndpoint();return this.transport=new m4({fetchImpl:this.customFetchImpl,endpoint:a}),this.transport}async _fetchAndCacheAgentCard(a,i){try{const u=this.resolveAgentCardUrl(a,i),s=await this._fetch(u,{headers:{Accept:"application/json"}});if(!s.ok)throw new Error(`Failed to fetch Agent Card from ${u}: ${s.status} ${s.statusText}`);const c=await s.json();if(!c.url)throw new Error("Fetched Agent Card does not contain a valid 'url' for the service endpoint.");return this.serviceEndpointUrl=c.url,c}catch(u){throw console.error("Error fetching or parsing Agent Card:",u),u}}async getAgentCard(a,i){if(a){const u=this.resolveAgentCardUrl(a,i),s=await this._fetch(u,{headers:{Accept:"application/json"}});if(!s.ok)throw new Error(`Failed to fetch Agent Card from ${u}: ${s.status} ${s.statusText}`);return await s.json()}return this.agentCardPromise}resolveAgentCardUrl(a,i=l4){return`${a.replace(/\/$/,"")}/${i.replace(/^\//,"")}`}async _getServiceEndpoint(){if(this.serviceEndpointUrl)return this.serviceEndpointUrl;if(await this.agentCardPromise,!this.serviceEndpointUrl)throw new Error("Agent Card URL for RPC endpoint is not available. Fetching might have failed.");return this.serviceEndpointUrl}async invokeJsonRpc(a,i){const u=await this._getOrCreateTransport(),s=this.requestIdCounter++;try{const c=await a(u,i,s);return{id:s,jsonrpc:"2.0",result:c??null}}catch(c){const f=ab(c);if(f)return f;throw c}}};function ab(n){if(n instanceof Object&&"errorResponse"in n&&n.errorResponse instanceof Object&&"jsonrpc"in n.errorResponse&&n.errorResponse.jsonrpc==="2.0"&&"error"in n.errorResponse&&n.errorResponse.error!==null)return n.errorResponse}const rb="application/json+a2ui";class ub{#e;#t=null;#a;constructor(a="",i){this.#e=a,this.#a=i}#n=Promise.resolve();get ready(){return this.#n}async#r(){if(!this.#t){const a=this.#e||"http://localhost:10002";this.#t=await C4.fromCardUrl(`${a}/.well-known/agent-card.json`,{fetchImpl:async(i,u)=>{const s=new Headers(u?.headers);s.set("X-A2A-Extensions","https://a2ui.org/a2a-extension/a2ui/v0.8");const c={...u,headers:s};return this.#a?this.#a(i,c,(f,h)=>fetch(f,h)):fetch(i,c)}})}return this.#t}async send(a){const i=await this.#r();let u=[];if(typeof a=="string")try{const f=JSON.parse(a);typeof f=="object"&&f!==null?u=[{kind:"data",data:f,mimeType:rb}]:u=[{kind:"text",text:a}]}catch{u=[{kind:"text",text:a}]}else u=[{kind:"data",data:a,mimeType:rb}];const s=await i.sendMessage({message:{messageId:crypto.randomUUID(),role:"user",parts:u,kind:"message"}});if(console.log(`client recive res: ${JSON.stringify(s)}`),"error"in s)throw new Error(s.error.message);const c=s.result;if(c.kind==="task"&&c.status.message?.parts){const f=[];for(const h of c.status.message.parts)h.kind==="data"&&f.push(h.data);return f}return[]}}var Mi=(n=>(n.NONE="none",n.INFORMATION="information",n.WARNING="warning",n.ERROR="error",n.PENDING="pending",n))(Mi||{});function E4(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Q0={exports:{}},xi={};var ib;function k4(){if(ib)return xi;ib=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function i(u,s,c){var f=null;if(c!==void 0&&(f=""+c),s.key!==void 0&&(f=""+s.key),"key"in s){c={};for(var h in s)h!=="key"&&(c[h]=s[h])}else c=s;return s=c.ref,{$$typeof:n,type:u,key:f,ref:s!==void 0?s:null,props:c}}return xi.Fragment=a,xi.jsx=i,xi.jsxs=i,xi}var lb;function A4(){return lb||(lb=1,Q0.exports=k4()),Q0.exports}var Ne=A4(),I0={exports:{}},wi={},J0={exports:{}},K0={};var sb;function D4(){return sb||(sb=1,(function(n){function a(U,X){var te=U.length;U.push(X);e:for(;0<te;){var me=te-1>>>1,ke=U[me];if(0<s(ke,X))U[me]=X,U[te]=ke,te=me;else break e}}function i(U){return U.length===0?null:U[0]}function u(U){if(U.length===0)return null;var X=U[0],te=U.pop();if(te!==X){U[0]=te;e:for(var me=0,ke=U.length,D=ke>>>1;me<D;){var V=2*(me+1)-1,J=U[V],P=V+1,ie=U[P];if(0>s(J,te))P<ke&&0>s(ie,J)?(U[me]=ie,U[P]=te,me=P):(U[me]=J,U[V]=te,me=V);else if(P<ke&&0>s(ie,te))U[me]=ie,U[P]=te,me=P;else break e}}return X}function s(U,X){var te=U.sortIndex-X.sortIndex;return te!==0?te:U.id-X.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;n.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();n.unstable_now=function(){return f.now()-h}}var b=[],m=[],y=1,p=null,_=3,x=!1,v=!1,w=!1,C=!1,E=typeof setTimeout=="function"?setTimeout:null,q=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;function z(U){for(var X=i(m);X!==null;){if(X.callback===null)u(m);else if(X.startTime<=U)u(m),X.sortIndex=X.expirationTime,a(b,X);else break;X=i(m)}}function $(U){if(w=!1,z(U),!v)if(i(b)!==null)v=!0,Y||(Y=!0,Q());else{var X=i(m);X!==null&&de($,X.startTime-U)}}var Y=!1,K=-1,ce=5,we=-1;function ut(){return C?!0:!(n.unstable_now()-we<ce)}function Qe(){if(C=!1,Y){var U=n.unstable_now();we=U;var X=!0;try{e:{v=!1,w&&(w=!1,q(K),K=-1),x=!0;var te=_;try{t:{for(z(U),p=i(b);p!==null&&!(p.expirationTime>U&&ut());){var me=p.callback;if(typeof me=="function"){p.callback=null,_=p.priorityLevel;var ke=me(p.expirationTime<=U);if(U=n.unstable_now(),typeof ke=="function"){p.callback=ke,z(U),X=!0;break t}p===i(b)&&u(b),z(U)}else u(b);p=i(b)}if(p!==null)X=!0;else{var D=i(m);D!==null&&de($,D.startTime-U),X=!1}}break e}finally{p=null,_=te,x=!1}X=void 0}}finally{X?Q():Y=!1}}}var Q;if(typeof R=="function")Q=function(){R(Qe)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,A=Z.port2;Z.port1.onmessage=Qe,Q=function(){A.postMessage(null)}}else Q=function(){E(Qe,0)};function de(U,X){K=E(function(){U(n.unstable_now())},X)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(U){U.callback=null},n.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ce=0<U?Math.floor(1e3/U):5},n.unstable_getCurrentPriorityLevel=function(){return _},n.unstable_next=function(U){switch(_){case 1:case 2:case 3:var X=3;break;default:X=_}var te=_;_=X;try{return U()}finally{_=te}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(U,X){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var te=_;_=U;try{return X()}finally{_=te}},n.unstable_scheduleCallback=function(U,X,te){var me=n.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?me+te:me):te=me,U){case 1:var ke=-1;break;case 2:ke=250;break;case 5:ke=1073741823;break;case 4:ke=1e4;break;default:ke=5e3}return ke=te+ke,U={id:y++,callback:X,priorityLevel:U,startTime:te,expirationTime:ke,sortIndex:-1},te>me?(U.sortIndex=te,a(m,U),i(b)===null&&U===i(m)&&(w?(q(K),K=-1):w=!0,de($,te-me))):(U.sortIndex=ke,a(b,U),v||x||(v=!0,Y||(Y=!0,Q()))),U},n.unstable_shouldYield=ut,n.unstable_wrapCallback=function(U){var X=_;return function(){var te=_;_=X;try{return U.apply(this,arguments)}finally{_=te}}}})(K0)),K0}var ob;function T4(){return ob||(ob=1,J0.exports=D4()),J0.exports}var W0={exports:{}},ue={};var cb;function z4(){if(cb)return ue;cb=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),p=Symbol.for("react.activity"),_=Symbol.iterator;function x(D){return D===null||typeof D!="object"?null:(D=_&&D[_]||D["@@iterator"],typeof D=="function"?D:null)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,C={};function E(D,V,J){this.props=D,this.context=V,this.refs=C,this.updater=J||v}E.prototype.isReactComponent={},E.prototype.setState=function(D,V){if(typeof D!="object"&&typeof D!="function"&&D!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,D,V,"setState")},E.prototype.forceUpdate=function(D){this.updater.enqueueForceUpdate(this,D,"forceUpdate")};function q(){}q.prototype=E.prototype;function R(D,V,J){this.props=D,this.context=V,this.refs=C,this.updater=J||v}var z=R.prototype=new q;z.constructor=R,w(z,E.prototype),z.isPureReactComponent=!0;var $=Array.isArray;function Y(){}var K={H:null,A:null,T:null,S:null},ce=Object.prototype.hasOwnProperty;function we(D,V,J){var P=J.ref;return{$$typeof:n,type:D,key:V,ref:P!==void 0?P:null,props:J}}function ut(D,V){return we(D.type,V,D.props)}function Qe(D){return typeof D=="object"&&D!==null&&D.$$typeof===n}function Q(D){var V={"=":"=0",":":"=2"};return"$"+D.replace(/[=:]/g,function(J){return V[J]})}var Z=/\/+/g;function A(D,V){return typeof D=="object"&&D!==null&&D.key!=null?Q(""+D.key):V.toString(36)}function de(D){switch(D.status){case"fulfilled":return D.value;case"rejected":throw D.reason;default:switch(typeof D.status=="string"?D.then(Y,Y):(D.status="pending",D.then(function(V){D.status==="pending"&&(D.status="fulfilled",D.value=V)},function(V){D.status==="pending"&&(D.status="rejected",D.reason=V)})),D.status){case"fulfilled":return D.value;case"rejected":throw D.reason}}throw D}function U(D,V,J,P,ie){var fe=typeof D;(fe==="undefined"||fe==="boolean")&&(D=null);var Ae=!1;if(D===null)Ae=!0;else switch(fe){case"bigint":case"string":case"number":Ae=!0;break;case"object":switch(D.$$typeof){case n:case a:Ae=!0;break;case y:return Ae=D._init,U(Ae(D._payload),V,J,P,ie)}}if(Ae)return ie=ie(D),Ae=P===""?"."+A(D,0):P,$(ie)?(J="",Ae!=null&&(J=Ae.replace(Z,"$&/")+"/"),U(ie,V,J,"",function(vu){return vu})):ie!=null&&(Qe(ie)&&(ie=ut(ie,J+(ie.key==null||D&&D.key===ie.key?"":(""+ie.key).replace(Z,"$&/")+"/")+Ae)),V.push(ie)),1;Ae=0;var Et=P===""?".":P+":";if($(D))for(var Ie=0;Ie<D.length;Ie++)P=D[Ie],fe=Et+A(P,Ie),Ae+=U(P,V,J,fe,ie);else if(Ie=x(D),typeof Ie=="function")for(D=Ie.call(D),Ie=0;!(P=D.next()).done;)P=P.value,fe=Et+A(P,Ie++),Ae+=U(P,V,J,fe,ie);else if(fe==="object"){if(typeof D.then=="function")return U(de(D),V,J,P,ie);throw V=String(D),Error("Objects are not valid as a React child (found: "+(V==="[object Object]"?"object with keys {"+Object.keys(D).join(", ")+"}":V)+"). If you meant to render a collection of children, use an array instead.")}return Ae}function X(D,V,J){if(D==null)return D;var P=[],ie=0;return U(D,P,"","",function(fe){return V.call(J,fe,ie++)}),P}function te(D){if(D._status===-1){var V=D._result;V=V(),V.then(function(J){(D._status===0||D._status===-1)&&(D._status=1,D._result=J)},function(J){(D._status===0||D._status===-1)&&(D._status=2,D._result=J)}),D._status===-1&&(D._status=0,D._result=V)}if(D._status===1)return D._result.default;throw D._result}var me=typeof reportError=="function"?reportError:function(D){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var V=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof D=="object"&&D!==null&&typeof D.message=="string"?String(D.message):String(D),error:D});if(!window.dispatchEvent(V))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",D);return}console.error(D)},ke={map:X,forEach:function(D,V,J){X(D,function(){V.apply(this,arguments)},J)},count:function(D){var V=0;return X(D,function(){V++}),V},toArray:function(D){return X(D,function(V){return V})||[]},only:function(D){if(!Qe(D))throw Error("React.Children.only expected to receive a single React element child.");return D}};return ue.Activity=p,ue.Children=ke,ue.Component=E,ue.Fragment=i,ue.Profiler=s,ue.PureComponent=R,ue.StrictMode=u,ue.Suspense=b,ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=K,ue.__COMPILER_RUNTIME={__proto__:null,c:function(D){return K.H.useMemoCache(D)}},ue.cache=function(D){return function(){return D.apply(null,arguments)}},ue.cacheSignal=function(){return null},ue.cloneElement=function(D,V,J){if(D==null)throw Error("The argument must be a React element, but you passed "+D+".");var P=w({},D.props),ie=D.key;if(V!=null)for(fe in V.key!==void 0&&(ie=""+V.key),V)!ce.call(V,fe)||fe==="key"||fe==="__self"||fe==="__source"||fe==="ref"&&V.ref===void 0||(P[fe]=V[fe]);var fe=arguments.length-2;if(fe===1)P.children=J;else if(1<fe){for(var Ae=Array(fe),Et=0;Et<fe;Et++)Ae[Et]=arguments[Et+2];P.children=Ae}return we(D.type,ie,P)},ue.createContext=function(D){return D={$$typeof:f,_currentValue:D,_currentValue2:D,_threadCount:0,Provider:null,Consumer:null},D.Provider=D,D.Consumer={$$typeof:c,_context:D},D},ue.createElement=function(D,V,J){var P,ie={},fe=null;if(V!=null)for(P in V.key!==void 0&&(fe=""+V.key),V)ce.call(V,P)&&P!=="key"&&P!=="__self"&&P!=="__source"&&(ie[P]=V[P]);var Ae=arguments.length-2;if(Ae===1)ie.children=J;else if(1<Ae){for(var Et=Array(Ae),Ie=0;Ie<Ae;Ie++)Et[Ie]=arguments[Ie+2];ie.children=Et}if(D&&D.defaultProps)for(P in Ae=D.defaultProps,Ae)ie[P]===void 0&&(ie[P]=Ae[P]);return we(D,fe,ie)},ue.createRef=function(){return{current:null}},ue.forwardRef=function(D){return{$$typeof:h,render:D}},ue.isValidElement=Qe,ue.lazy=function(D){return{$$typeof:y,_payload:{_status:-1,_result:D},_init:te}},ue.memo=function(D,V){return{$$typeof:m,type:D,compare:V===void 0?null:V}},ue.startTransition=function(D){var V=K.T,J={};K.T=J;try{var P=D(),ie=K.S;ie!==null&&ie(J,P),typeof P=="object"&&P!==null&&typeof P.then=="function"&&P.then(Y,me)}catch(fe){me(fe)}finally{V!==null&&J.types!==null&&(V.types=J.types),K.T=V}},ue.unstable_useCacheRefresh=function(){return K.H.useCacheRefresh()},ue.use=function(D){return K.H.use(D)},ue.useActionState=function(D,V,J){return K.H.useActionState(D,V,J)},ue.useCallback=function(D,V){return K.H.useCallback(D,V)},ue.useContext=function(D){return K.H.useContext(D)},ue.useDebugValue=function(){},ue.useDeferredValue=function(D,V){return K.H.useDeferredValue(D,V)},ue.useEffect=function(D,V){return K.H.useEffect(D,V)},ue.useEffectEvent=function(D){return K.H.useEffectEvent(D)},ue.useId=function(){return K.H.useId()},ue.useImperativeHandle=function(D,V,J){return K.H.useImperativeHandle(D,V,J)},ue.useInsertionEffect=function(D,V){return K.H.useInsertionEffect(D,V)},ue.useLayoutEffect=function(D,V){return K.H.useLayoutEffect(D,V)},ue.useMemo=function(D,V){return K.H.useMemo(D,V)},ue.useOptimistic=function(D,V){return K.H.useOptimistic(D,V)},ue.useReducer=function(D,V,J){return K.H.useReducer(D,V,J)},ue.useRef=function(D){return K.H.useRef(D)},ue.useState=function(D){return K.H.useState(D)},ue.useSyncExternalStore=function(D,V,J){return K.H.useSyncExternalStore(D,V,J)},ue.useTransition=function(){return K.H.useTransition()},ue.version="19.2.3",ue}var db;function Yd(){return db||(db=1,W0.exports=z4()),W0.exports}var P0={exports:{}},Ct={};var fb;function $4(){if(fb)return Ct;fb=1;var n=Yd();function a(b){var m="https://react.dev/errors/"+b;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)m+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+b+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var u={d:{f:i,r:function(){throw Error(a(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");function c(b,m,y){var p=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:p==null?null:""+p,children:b,containerInfo:m,implementation:y}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(b,m){if(b==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,Ct.createPortal=function(b,m){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(a(299));return c(b,m,null,y)},Ct.flushSync=function(b){var m=f.T,y=u.p;try{if(f.T=null,u.p=2,b)return b()}finally{f.T=m,u.p=y,u.d.f()}},Ct.preconnect=function(b,m){typeof b=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,u.d.C(b,m))},Ct.prefetchDNS=function(b){typeof b=="string"&&u.d.D(b)},Ct.preinit=function(b,m){if(typeof b=="string"&&m&&typeof m.as=="string"){var y=m.as,p=h(y,m.crossOrigin),_=typeof m.integrity=="string"?m.integrity:void 0,x=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;y==="style"?u.d.S(b,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:p,integrity:_,fetchPriority:x}):y==="script"&&u.d.X(b,{crossOrigin:p,integrity:_,fetchPriority:x,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Ct.preinitModule=function(b,m){if(typeof b=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var y=h(m.as,m.crossOrigin);u.d.M(b,{crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&u.d.M(b)},Ct.preload=function(b,m){if(typeof b=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var y=m.as,p=h(y,m.crossOrigin);u.d.L(b,y,{crossOrigin:p,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Ct.preloadModule=function(b,m){if(typeof b=="string")if(m){var y=h(m.as,m.crossOrigin);u.d.m(b,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else u.d.m(b)},Ct.requestFormReset=function(b){u.d.r(b)},Ct.unstable_batchedUpdates=function(b,m){return b(m)},Ct.useFormState=function(b,m,y){return f.H.useFormState(b,m,y)},Ct.useFormStatus=function(){return f.H.useHostTransitionStatus()},Ct.version="19.2.3",Ct}var hb;function O4(){if(hb)return P0.exports;hb=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),P0.exports=$4(),P0.exports}var pb;function M4(){if(pb)return wi;pb=1;var n=T4(),a=Yd(),i=O4();function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function h(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function b(e){if(c(e)!==e)throw Error(u(188))}function m(e){var t=e.alternate;if(!t){if(t=c(e),t===null)throw Error(u(188));return t!==e?null:e}for(var r=e,l=t;;){var o=r.return;if(o===null)break;var d=o.alternate;if(d===null){if(l=o.return,l!==null){r=l;continue}break}if(o.child===d.child){for(d=o.child;d;){if(d===r)return b(o),e;if(d===l)return b(o),t;d=d.sibling}throw Error(u(188))}if(r.return!==l.return)r=o,l=d;else{for(var g=!1,S=o.child;S;){if(S===r){g=!0,r=o,l=d;break}if(S===l){g=!0,l=o,r=d;break}S=S.sibling}if(!g){for(S=d.child;S;){if(S===r){g=!0,r=d,l=o;break}if(S===l){g=!0,l=d,r=o;break}S=S.sibling}if(!g)throw Error(u(189))}}if(r.alternate!==l)throw Error(u(190))}if(r.tag!==3)throw Error(u(188));return r.stateNode.current===r?e:t}function y(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=y(e),t!==null)return t;e=e.sibling}return null}var p=Object.assign,_=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),v=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),q=Symbol.for("react.consumer"),R=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),$=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),we=Symbol.for("react.activity"),ut=Symbol.for("react.memo_cache_sentinel"),Qe=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=Qe&&e[Qe]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Symbol.for("react.client.reference");function A(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Z?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case E:return"Profiler";case C:return"StrictMode";case $:return"Suspense";case Y:return"SuspenseList";case we:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case v:return"Portal";case R:return e.displayName||"Context";case q:return(e._context.displayName||"Context")+".Consumer";case z:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case K:return t=e.displayName||null,t!==null?t:A(e.type)||"Memo";case ce:t=e._payload,e=e._init;try{return A(e(t))}catch{}}return null}var de=Array.isArray,U=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te={pending:!1,data:null,method:null,action:null},me=[],ke=-1;function D(e){return{current:e}}function V(e){0>ke||(e.current=me[ke],me[ke]=null,ke--)}function J(e,t){ke++,me[ke]=e.current,e.current=t}var P=D(null),ie=D(null),fe=D(null),Ae=D(null);function Et(e,t){switch(J(fe,t),J(ie,e),J(P,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?R1(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=R1(t),e=j1(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}V(P),J(P,e)}function Ie(){V(P),V(ie),V(fe)}function vu(e){e.memoizedState!==null&&J(Ae,e);var t=P.current,r=j1(t,e.type);t!==r&&(J(ie,e),J(P,r))}function Xi(e){ie.current===e&&(V(P),V(ie)),Ae.current===e&&(V(Ae),si._currentValue=te)}var Ws,df;function Oa(e){if(Ws===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Ws=t&&t[1]||"",df=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ws+e+df}var Ps=!1;function eo(e,t){if(!e||Ps)return"";Ps=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(t){var L=function(){throw Error()};if(Object.defineProperty(L.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(L,[])}catch(B){var j=B}Reflect.construct(e,[],L)}else{try{L.call()}catch(B){j=B}e.call(L.prototype)}}else{try{throw Error()}catch(B){j=B}(L=e())&&typeof L.catch=="function"&&L.catch(function(){})}}catch(B){if(B&&j&&typeof B.stack=="string")return[B.stack,j.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),g=d[0],S=d[1];if(g&&S){var k=g.split(`
`),N=S.split(`
`);for(o=l=0;l<k.length&&!k[l].includes("DetermineComponentFrameRoot");)l++;for(;o<N.length&&!N[o].includes("DetermineComponentFrameRoot");)o++;if(l===k.length||o===N.length)for(l=k.length-1,o=N.length-1;1<=l&&0<=o&&k[l]!==N[o];)o--;for(;1<=l&&0<=o;l--,o--)if(k[l]!==N[o]){if(l!==1||o!==1)do if(l--,o--,0>o||k[l]!==N[o]){var F=`
`+k[l].replace(" at new "," at ");return e.displayName&&F.includes("<anonymous>")&&(F=F.replace("<anonymous>",e.displayName)),F}while(1<=l&&0<=o);break}}}finally{Ps=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Oa(r):""}function g2(e,t){switch(e.tag){case 26:case 27:case 5:return Oa(e.type);case 16:return Oa("Lazy");case 13:return e.child!==t&&t!==null?Oa("Suspense Fallback"):Oa("Suspense");case 19:return Oa("SuspenseList");case 0:case 15:return eo(e.type,!1);case 11:return eo(e.type.render,!1);case 1:return eo(e.type,!0);case 31:return Oa("Activity");default:return""}}function ff(e){try{var t="",r=null;do t+=g2(e,r),r=e,e=e.return;while(e);return t}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var to=Object.prototype.hasOwnProperty,no=n.unstable_scheduleCallback,ao=n.unstable_cancelCallback,y2=n.unstable_shouldYield,v2=n.unstable_requestPaint,Ut=n.unstable_now,_2=n.unstable_getCurrentPriorityLevel,hf=n.unstable_ImmediatePriority,pf=n.unstable_UserBlockingPriority,Qi=n.unstable_NormalPriority,x2=n.unstable_LowPriority,mf=n.unstable_IdlePriority,w2=n.log,S2=n.unstable_setDisableYieldValue,_u=null,Bt=null;function Wn(e){if(typeof w2=="function"&&S2(e),Bt&&typeof Bt.setStrictMode=="function")try{Bt.setStrictMode(_u,e)}catch{}}var qt=Math.clz32?Math.clz32:k2,C2=Math.log,E2=Math.LN2;function k2(e){return e>>>=0,e===0?32:31-(C2(e)/E2|0)|0}var Ii=256,Ji=262144,Ki=4194304;function Ma(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Wi(e,t,r){var l=e.pendingLanes;if(l===0)return 0;var o=0,d=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var S=l&134217727;return S!==0?(l=S&~d,l!==0?o=Ma(l):(g&=S,g!==0?o=Ma(g):r||(r=S&~e,r!==0&&(o=Ma(r))))):(S=l&~d,S!==0?o=Ma(S):g!==0?o=Ma(g):r||(r=l&~e,r!==0&&(o=Ma(r)))),o===0?0:t!==0&&t!==o&&(t&d)===0&&(d=o&-o,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:o}function xu(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function A2(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bf(){var e=Ki;return Ki<<=1,(Ki&62914560)===0&&(Ki=4194304),e}function ro(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function wu(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function D2(e,t,r,l,o,d){var g=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var S=e.entanglements,k=e.expirationTimes,N=e.hiddenUpdates;for(r=g&~r;0<r;){var F=31-qt(r),L=1<<F;S[F]=0,k[F]=-1;var j=N[F];if(j!==null)for(N[F]=null,F=0;F<j.length;F++){var B=j[F];B!==null&&(B.lane&=-536870913)}r&=~L}l!==0&&gf(e,l,0),d!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=d&~(g&~t))}function gf(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var l=31-qt(t);e.entangledLanes|=t,e.entanglements[l]=e.entanglements[l]|1073741824|r&261930}function yf(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var l=31-qt(r),o=1<<l;o&t|e[l]&t&&(e[l]|=t),r&=~o}}function vf(e,t){var r=t&-t;return r=(r&42)!==0?1:uo(r),(r&(e.suspendedLanes|t))!==0?0:r}function uo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function io(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function _f(){var e=X.p;return e!==0?e:(e=window.event,e===void 0?32:um(e.type))}function xf(e,t){var r=X.p;try{return X.p=e,t()}finally{X.p=r}}var Pn=Math.random().toString(36).slice(2),bt="__reactFiber$"+Pn,Tt="__reactProps$"+Pn,fr="__reactContainer$"+Pn,lo="__reactEvents$"+Pn,T2="__reactListeners$"+Pn,z2="__reactHandles$"+Pn,wf="__reactResources$"+Pn,Su="__reactMarker$"+Pn;function so(e){delete e[bt],delete e[Tt],delete e[lo],delete e[T2],delete e[z2]}function hr(e){var t=e[bt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[fr]||r[bt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=V1(e);e!==null;){if(r=e[bt])return r;e=V1(e)}return t}e=r,r=e.parentNode}return null}function pr(e){if(e=e[bt]||e[fr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Cu(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(u(33))}function mr(e){var t=e[wf];return t||(t=e[wf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ft(e){e[Su]=!0}var Sf=new Set,Cf={};function Na(e,t){br(e,t),br(e+"Capture",t)}function br(e,t){for(Cf[e]=t,e=0;e<t.length;e++)Sf.add(t[e])}var $2=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ef={},kf={};function O2(e){return to.call(kf,e)?!0:to.call(Ef,e)?!1:$2.test(e)?kf[e]=!0:(Ef[e]=!0,!1)}function Pi(e,t,r){if(O2(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var l=t.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function el(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function Dn(e,t,r,l){if(l===null)e.removeAttribute(r);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+l)}}function Wt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Af(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function M2(e,t,r){var l=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var o=l.get,d=l.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(g){r=""+g,d.call(this,g)}}),Object.defineProperty(e,t,{enumerable:l.enumerable}),{getValue:function(){return r},setValue:function(g){r=""+g},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function oo(e){if(!e._valueTracker){var t=Af(e)?"checked":"value";e._valueTracker=M2(e,t,""+e[t])}}function Df(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),l="";return e&&(l=Af(e)?e.checked?"true":"false":e.value),e=l,e!==r?(t.setValue(e),!0):!1}function tl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var N2=/[\n"\\]/g;function Pt(e){return e.replace(N2,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function co(e,t,r,l,o,d,g,S){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),t!=null?g==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Wt(t)):e.value!==""+Wt(t)&&(e.value=""+Wt(t)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),t!=null?fo(e,g,Wt(t)):r!=null?fo(e,g,Wt(r)):l!=null&&e.removeAttribute("value"),o==null&&d!=null&&(e.defaultChecked=!!d),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?e.name=""+Wt(S):e.removeAttribute("name")}function Tf(e,t,r,l,o,d,g,S){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){oo(e);return}r=r!=null?""+Wt(r):"",t=t!=null?""+Wt(t):r,S||t===e.value||(e.value=t),e.defaultValue=t}l=l??o,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=S?e.checked:!!l,e.defaultChecked=!!l,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),oo(e)}function fo(e,t,r){t==="number"&&tl(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function gr(e,t,r,l){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&l&&(e[r].defaultSelected=!0)}else{for(r=""+Wt(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,l&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function zf(e,t,r){if(t!=null&&(t=""+Wt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Wt(r):""}function $f(e,t,r,l){if(t==null){if(l!=null){if(r!=null)throw Error(u(92));if(de(l)){if(1<l.length)throw Error(u(93));l=l[0]}r=l}r==null&&(r=""),t=r}r=Wt(t),e.defaultValue=r,l=e.textContent,l===r&&l!==""&&l!==null&&(e.value=l),oo(e)}function yr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var R2=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Of(e,t,r){var l=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?l?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":l?e.setProperty(t,r):typeof r!="number"||r===0||R2.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function Mf(e,t,r){if(t!=null&&typeof t!="object")throw Error(u(62));if(e=e.style,r!=null){for(var l in r)!r.hasOwnProperty(l)||t!=null&&t.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var o in t)l=t[o],t.hasOwnProperty(o)&&r[o]!==l&&Of(e,o,l)}else for(var d in t)t.hasOwnProperty(d)&&Of(e,d,t[d])}function ho(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var j2=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),U2=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function nl(e){return U2.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Tn(){}var po=null;function mo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var vr=null,_r=null;function Nf(e){var t=pr(e);if(t&&(e=t.stateNode)){var r=e[Tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(co(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Pt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var l=r[t];if(l!==e&&l.form===e.form){var o=l[Tt]||null;if(!o)throw Error(u(90));co(l,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(t=0;t<r.length;t++)l=r[t],l.form===e.form&&Df(l)}break e;case"textarea":zf(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&gr(e,!!r.multiple,t,!1)}}}var bo=!1;function Rf(e,t,r){if(bo)return e(t,r);bo=!0;try{var l=e(t);return l}finally{if(bo=!1,(vr!==null||_r!==null)&&(Vl(),vr&&(t=vr,e=_r,_r=vr=null,Nf(t),e)))for(t=0;t<e.length;t++)Nf(e[t])}}function Eu(e,t){var r=e.stateNode;if(r===null)return null;var l=r[Tt]||null;if(l===null)return null;r=l[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(u(231,t,typeof r));return r}var zn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),go=!1;if(zn)try{var ku={};Object.defineProperty(ku,"passive",{get:function(){go=!0}}),window.addEventListener("test",ku,ku),window.removeEventListener("test",ku,ku)}catch{go=!1}var ea=null,yo=null,al=null;function jf(){if(al)return al;var e,t=yo,r=t.length,l,o="value"in ea?ea.value:ea.textContent,d=o.length;for(e=0;e<r&&t[e]===o[e];e++);var g=r-e;for(l=1;l<=g&&t[r-l]===o[d-l];l++);return al=o.slice(e,1<l?1-l:void 0)}function rl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ul(){return!0}function Uf(){return!1}function zt(e){function t(r,l,o,d,g){this._reactName=r,this._targetInst=o,this.type=l,this.nativeEvent=d,this.target=g,this.currentTarget=null;for(var S in e)e.hasOwnProperty(S)&&(r=e[S],this[S]=r?r(d):d[S]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?ul:Uf,this.isPropagationStopped=Uf,this}return p(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ul)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ul)},persist:function(){},isPersistent:ul}),t}var Ra={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},il=zt(Ra),Au=p({},Ra,{view:0,detail:0}),B2=zt(Au),vo,_o,Du,ll=p({},Au,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Du&&(Du&&e.type==="mousemove"?(vo=e.screenX-Du.screenX,_o=e.screenY-Du.screenY):_o=vo=0,Du=e),vo)},movementY:function(e){return"movementY"in e?e.movementY:_o}}),Bf=zt(ll),q2=p({},ll,{dataTransfer:0}),F2=zt(q2),H2=p({},Au,{relatedTarget:0}),xo=zt(H2),L2=p({},Ra,{animationName:0,elapsedTime:0,pseudoElement:0}),V2=zt(L2),G2=p({},Ra,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Y2=zt(G2),Z2=p({},Ra,{data:0}),qf=zt(Z2),X2={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Q2={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},I2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function J2(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=I2[e])?!!t[e]:!1}function wo(){return J2}var K2=p({},Au,{key:function(e){if(e.key){var t=X2[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=rl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Q2[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wo,charCode:function(e){return e.type==="keypress"?rl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?rl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),W2=zt(K2),P2=p({},ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ff=zt(P2),ey=p({},Au,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wo}),ty=zt(ey),ny=p({},Ra,{propertyName:0,elapsedTime:0,pseudoElement:0}),ay=zt(ny),ry=p({},ll,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),uy=zt(ry),iy=p({},Ra,{newState:0,oldState:0}),ly=zt(iy),sy=[9,13,27,32],So=zn&&"CompositionEvent"in window,Tu=null;zn&&"documentMode"in document&&(Tu=document.documentMode);var oy=zn&&"TextEvent"in window&&!Tu,Hf=zn&&(!So||Tu&&8<Tu&&11>=Tu),Lf=" ",Vf=!1;function Gf(e,t){switch(e){case"keyup":return sy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Yf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var xr=!1;function cy(e,t){switch(e){case"compositionend":return Yf(t);case"keypress":return t.which!==32?null:(Vf=!0,Lf);case"textInput":return e=t.data,e===Lf&&Vf?null:e;default:return null}}function dy(e,t){if(xr)return e==="compositionend"||!So&&Gf(e,t)?(e=jf(),al=yo=ea=null,xr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Hf&&t.locale!=="ko"?null:t.data;default:return null}}var fy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!fy[e.type]:t==="textarea"}function Xf(e,t,r,l){vr?_r?_r.push(l):_r=[l]:vr=l,t=Jl(t,"onChange"),0<t.length&&(r=new il("onChange","change",null,r,l),e.push({event:r,listeners:t}))}var zu=null,$u=null;function hy(e){T1(e,0)}function sl(e){var t=Cu(e);if(Df(t))return e}function Qf(e,t){if(e==="change")return t}var If=!1;if(zn){var Co;if(zn){var Eo="oninput"in document;if(!Eo){var Jf=document.createElement("div");Jf.setAttribute("oninput","return;"),Eo=typeof Jf.oninput=="function"}Co=Eo}else Co=!1;If=Co&&(!document.documentMode||9<document.documentMode)}function Kf(){zu&&(zu.detachEvent("onpropertychange",Wf),$u=zu=null)}function Wf(e){if(e.propertyName==="value"&&sl($u)){var t=[];Xf(t,$u,e,mo(e)),Rf(hy,t)}}function py(e,t,r){e==="focusin"?(Kf(),zu=t,$u=r,zu.attachEvent("onpropertychange",Wf)):e==="focusout"&&Kf()}function my(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return sl($u)}function by(e,t){if(e==="click")return sl(t)}function gy(e,t){if(e==="input"||e==="change")return sl(t)}function yy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ft=typeof Object.is=="function"?Object.is:yy;function Ou(e,t){if(Ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),l=Object.keys(t);if(r.length!==l.length)return!1;for(l=0;l<r.length;l++){var o=r[l];if(!to.call(t,o)||!Ft(e[o],t[o]))return!1}return!0}function Pf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function eh(e,t){var r=Pf(e);e=0;for(var l;r;){if(r.nodeType===3){if(l=e+r.textContent.length,e<=t&&l>=t)return{node:r,offset:t-e};e=l}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Pf(r)}}function th(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?th(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function nh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=tl(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=tl(e.document)}return t}function ko(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var vy=zn&&"documentMode"in document&&11>=document.documentMode,wr=null,Ao=null,Mu=null,Do=!1;function ah(e,t,r){var l=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Do||wr==null||wr!==tl(l)||(l=wr,"selectionStart"in l&&ko(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Mu&&Ou(Mu,l)||(Mu=l,l=Jl(Ao,"onSelect"),0<l.length&&(t=new il("onSelect","select",null,t,r),e.push({event:t,listeners:l}),t.target=wr)))}function ja(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Sr={animationend:ja("Animation","AnimationEnd"),animationiteration:ja("Animation","AnimationIteration"),animationstart:ja("Animation","AnimationStart"),transitionrun:ja("Transition","TransitionRun"),transitionstart:ja("Transition","TransitionStart"),transitioncancel:ja("Transition","TransitionCancel"),transitionend:ja("Transition","TransitionEnd")},To={},rh={};zn&&(rh=document.createElement("div").style,"AnimationEvent"in window||(delete Sr.animationend.animation,delete Sr.animationiteration.animation,delete Sr.animationstart.animation),"TransitionEvent"in window||delete Sr.transitionend.transition);function Ua(e){if(To[e])return To[e];if(!Sr[e])return e;var t=Sr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in rh)return To[e]=t[r];return e}var uh=Ua("animationend"),ih=Ua("animationiteration"),lh=Ua("animationstart"),_y=Ua("transitionrun"),xy=Ua("transitionstart"),wy=Ua("transitioncancel"),sh=Ua("transitionend"),oh=new Map,zo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zo.push("scrollEnd");function cn(e,t){oh.set(e,t),Na(t,[e])}var ol=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},en=[],Cr=0,$o=0;function cl(){for(var e=Cr,t=$o=Cr=0;t<e;){var r=en[t];en[t++]=null;var l=en[t];en[t++]=null;var o=en[t];en[t++]=null;var d=en[t];if(en[t++]=null,l!==null&&o!==null){var g=l.pending;g===null?o.next=o:(o.next=g.next,g.next=o),l.pending=o}d!==0&&ch(r,o,d)}}function dl(e,t,r,l){en[Cr++]=e,en[Cr++]=t,en[Cr++]=r,en[Cr++]=l,$o|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function Oo(e,t,r,l){return dl(e,t,r,l),fl(e)}function Ba(e,t){return dl(e,null,null,t),fl(e)}function ch(e,t,r){e.lanes|=r;var l=e.alternate;l!==null&&(l.lanes|=r);for(var o=!1,d=e.return;d!==null;)d.childLanes|=r,l=d.alternate,l!==null&&(l.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(o=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,o&&t!==null&&(o=31-qt(r),e=d.hiddenUpdates,l=e[o],l===null?e[o]=[t]:l.push(t),t.lane=r|536870912),d):null}function fl(e){if(50<ti)throw ti=0,Hc=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Er={};function Sy(e,t,r,l){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ht(e,t,r,l){return new Sy(e,t,r,l)}function Mo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $n(e,t){var r=e.alternate;return r===null?(r=Ht(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function dh(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function hl(e,t,r,l,o,d){var g=0;if(l=e,typeof e=="function")Mo(e)&&(g=1);else if(typeof e=="string")g=Dv(e,r,P.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case we:return e=Ht(31,r,t,o),e.elementType=we,e.lanes=d,e;case w:return qa(r.children,o,d,t);case C:g=8,o|=24;break;case E:return e=Ht(12,r,t,o|2),e.elementType=E,e.lanes=d,e;case $:return e=Ht(13,r,t,o),e.elementType=$,e.lanes=d,e;case Y:return e=Ht(19,r,t,o),e.elementType=Y,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case R:g=10;break e;case q:g=9;break e;case z:g=11;break e;case K:g=14;break e;case ce:g=16,l=null;break e}g=29,r=Error(u(130,e===null?"null":typeof e,"")),l=null}return t=Ht(g,r,t,o),t.elementType=e,t.type=l,t.lanes=d,t}function qa(e,t,r,l){return e=Ht(7,e,l,t),e.lanes=r,e}function No(e,t,r){return e=Ht(6,e,null,t),e.lanes=r,e}function fh(e){var t=Ht(18,null,null,0);return t.stateNode=e,t}function Ro(e,t,r){return t=Ht(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var hh=new WeakMap;function tn(e,t){if(typeof e=="object"&&e!==null){var r=hh.get(e);return r!==void 0?r:(t={value:e,source:t,stack:ff(t)},hh.set(e,t),t)}return{value:e,source:t,stack:ff(t)}}var kr=[],Ar=0,pl=null,Nu=0,nn=[],an=0,ta=null,bn=1,gn="";function On(e,t){kr[Ar++]=Nu,kr[Ar++]=pl,pl=e,Nu=t}function ph(e,t,r){nn[an++]=bn,nn[an++]=gn,nn[an++]=ta,ta=e;var l=bn;e=gn;var o=32-qt(l)-1;l&=~(1<<o),r+=1;var d=32-qt(t)+o;if(30<d){var g=o-o%5;d=(l&(1<<g)-1).toString(32),l>>=g,o-=g,bn=1<<32-qt(t)+o|r<<o|l,gn=d+e}else bn=1<<d|r<<o|l,gn=e}function jo(e){e.return!==null&&(On(e,1),ph(e,1,0))}function Uo(e){for(;e===pl;)pl=kr[--Ar],kr[Ar]=null,Nu=kr[--Ar],kr[Ar]=null;for(;e===ta;)ta=nn[--an],nn[an]=null,gn=nn[--an],nn[an]=null,bn=nn[--an],nn[an]=null}function mh(e,t){nn[an++]=bn,nn[an++]=gn,nn[an++]=ta,bn=t.id,gn=t.overflow,ta=e}var gt=null,Ue=null,ve=!1,na=null,rn=!1,Bo=Error(u(519));function aa(e){var t=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ru(tn(t,e)),Bo}function bh(e){var t=e.stateNode,r=e.type,l=e.memoizedProps;switch(t[bt]=e,t[Tt]=l,r){case"dialog":pe("cancel",t),pe("close",t);break;case"iframe":case"object":case"embed":pe("load",t);break;case"video":case"audio":for(r=0;r<ai.length;r++)pe(ai[r],t);break;case"source":pe("error",t);break;case"img":case"image":case"link":pe("error",t),pe("load",t);break;case"details":pe("toggle",t);break;case"input":pe("invalid",t),Tf(t,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":pe("invalid",t);break;case"textarea":pe("invalid",t),$f(t,l.value,l.defaultValue,l.children)}r=l.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||l.suppressHydrationWarning===!0||M1(t.textContent,r)?(l.popover!=null&&(pe("beforetoggle",t),pe("toggle",t)),l.onScroll!=null&&pe("scroll",t),l.onScrollEnd!=null&&pe("scrollend",t),l.onClick!=null&&(t.onclick=Tn),t=!0):t=!1,t||aa(e,!0)}function gh(e){for(gt=e.return;gt;)switch(gt.tag){case 5:case 31:case 13:rn=!1;return;case 27:case 3:rn=!0;return;default:gt=gt.return}}function Dr(e){if(e!==gt)return!1;if(!ve)return gh(e),ve=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||n0(e.type,e.memoizedProps)),r=!r),r&&Ue&&aa(e),gh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Ue=L1(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));Ue=L1(e)}else t===27?(t=Ue,ga(e.type)?(e=l0,l0=null,Ue=e):Ue=t):Ue=gt?ln(e.stateNode.nextSibling):null;return!0}function Fa(){Ue=gt=null,ve=!1}function qo(){var e=na;return e!==null&&(Nt===null?Nt=e:Nt.push.apply(Nt,e),na=null),e}function Ru(e){na===null?na=[e]:na.push(e)}var Fo=D(null),Ha=null,Mn=null;function ra(e,t,r){J(Fo,t._currentValue),t._currentValue=r}function Nn(e){e._currentValue=Fo.current,V(Fo)}function Ho(e,t,r){for(;e!==null;){var l=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,l!==null&&(l.childLanes|=t)):l!==null&&(l.childLanes&t)!==t&&(l.childLanes|=t),e===r)break;e=e.return}}function Lo(e,t,r,l){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var d=o.dependencies;if(d!==null){var g=o.child;d=d.firstContext;e:for(;d!==null;){var S=d;d=o;for(var k=0;k<t.length;k++)if(S.context===t[k]){d.lanes|=r,S=d.alternate,S!==null&&(S.lanes|=r),Ho(d.return,r,e),l||(g=null);break e}d=S.next}}else if(o.tag===18){if(g=o.return,g===null)throw Error(u(341));g.lanes|=r,d=g.alternate,d!==null&&(d.lanes|=r),Ho(g,r,e),g=null}else g=o.child;if(g!==null)g.return=o;else for(g=o;g!==null;){if(g===e){g=null;break}if(o=g.sibling,o!==null){o.return=g.return,g=o;break}g=g.return}o=g}}function Tr(e,t,r,l){e=null;for(var o=t,d=!1;o!==null;){if(!d){if((o.flags&524288)!==0)d=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var g=o.alternate;if(g===null)throw Error(u(387));if(g=g.memoizedProps,g!==null){var S=o.type;Ft(o.pendingProps.value,g.value)||(e!==null?e.push(S):e=[S])}}else if(o===Ae.current){if(g=o.alternate,g===null)throw Error(u(387));g.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(si):e=[si])}o=o.return}e!==null&&Lo(t,e,r,l),t.flags|=262144}function ml(e){for(e=e.firstContext;e!==null;){if(!Ft(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function La(e){Ha=e,Mn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function yt(e){return yh(Ha,e)}function bl(e,t){return Ha===null&&La(e),yh(e,t)}function yh(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Mn===null){if(e===null)throw Error(u(308));Mn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Mn=Mn.next=t;return r}var Cy=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,l){e.push(l)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},Ey=n.unstable_scheduleCallback,ky=n.unstable_NormalPriority,We={$$typeof:R,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Vo(){return{controller:new Cy,data:new Map,refCount:0}}function ju(e){e.refCount--,e.refCount===0&&Ey(ky,function(){e.controller.abort()})}var Uu=null,Go=0,zr=0,$r=null;function Ay(e,t){if(Uu===null){var r=Uu=[];Go=0,zr=Xc(),$r={status:"pending",value:void 0,then:function(l){r.push(l)}}}return Go++,t.then(vh,vh),t}function vh(){if(--Go===0&&Uu!==null){$r!==null&&($r.status="fulfilled");var e=Uu;Uu=null,zr=0,$r=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Dy(e,t){var r=[],l={status:"pending",value:null,reason:null,then:function(o){r.push(o)}};return e.then(function(){l.status="fulfilled",l.value=t;for(var o=0;o<r.length;o++)(0,r[o])(t)},function(o){for(l.status="rejected",l.reason=o,o=0;o<r.length;o++)(0,r[o])(void 0)}),l}var _h=U.S;U.S=function(e,t){a1=Ut(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Ay(e,t),_h!==null&&_h(e,t)};var Va=D(null);function Yo(){var e=Va.current;return e!==null?e:Me.pooledCache}function gl(e,t){t===null?J(Va,Va.current):J(Va,t.pool)}function xh(){var e=Yo();return e===null?null:{parent:We._currentValue,pool:e}}var Or=Error(u(460)),Zo=Error(u(474)),yl=Error(u(542)),vl={then:function(){}};function wh(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Sh(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Tn,Tn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Eh(e),e;default:if(typeof t.status=="string")t.then(Tn,Tn);else{if(e=Me,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(l){if(t.status==="pending"){var o=t;o.status="fulfilled",o.value=l}},function(l){if(t.status==="pending"){var o=t;o.status="rejected",o.reason=l}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Eh(e),e}throw Ya=t,Or}}function Ga(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Ya=r,Or):r}}var Ya=null;function Ch(){if(Ya===null)throw Error(u(459));var e=Ya;return Ya=null,e}function Eh(e){if(e===Or||e===yl)throw Error(u(483))}var Mr=null,Bu=0;function _l(e){var t=Bu;return Bu+=1,Mr===null&&(Mr=[]),Sh(Mr,e,t)}function qu(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function xl(e,t){throw t.$$typeof===_?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function kh(e){function t(O,T){if(e){var M=O.deletions;M===null?(O.deletions=[T],O.flags|=16):M.push(T)}}function r(O,T){if(!e)return null;for(;T!==null;)t(O,T),T=T.sibling;return null}function l(O){for(var T=new Map;O!==null;)O.key!==null?T.set(O.key,O):T.set(O.index,O),O=O.sibling;return T}function o(O,T){return O=$n(O,T),O.index=0,O.sibling=null,O}function d(O,T,M){return O.index=M,e?(M=O.alternate,M!==null?(M=M.index,M<T?(O.flags|=67108866,T):M):(O.flags|=67108866,T)):(O.flags|=1048576,T)}function g(O){return e&&O.alternate===null&&(O.flags|=67108866),O}function S(O,T,M,H){return T===null||T.tag!==6?(T=No(M,O.mode,H),T.return=O,T):(T=o(T,M),T.return=O,T)}function k(O,T,M,H){var ne=M.type;return ne===w?F(O,T,M.props.children,H,M.key):T!==null&&(T.elementType===ne||typeof ne=="object"&&ne!==null&&ne.$$typeof===ce&&Ga(ne)===T.type)?(T=o(T,M.props),qu(T,M),T.return=O,T):(T=hl(M.type,M.key,M.props,null,O.mode,H),qu(T,M),T.return=O,T)}function N(O,T,M,H){return T===null||T.tag!==4||T.stateNode.containerInfo!==M.containerInfo||T.stateNode.implementation!==M.implementation?(T=Ro(M,O.mode,H),T.return=O,T):(T=o(T,M.children||[]),T.return=O,T)}function F(O,T,M,H,ne){return T===null||T.tag!==7?(T=qa(M,O.mode,H,ne),T.return=O,T):(T=o(T,M),T.return=O,T)}function L(O,T,M){if(typeof T=="string"&&T!==""||typeof T=="number"||typeof T=="bigint")return T=No(""+T,O.mode,M),T.return=O,T;if(typeof T=="object"&&T!==null){switch(T.$$typeof){case x:return M=hl(T.type,T.key,T.props,null,O.mode,M),qu(M,T),M.return=O,M;case v:return T=Ro(T,O.mode,M),T.return=O,T;case ce:return T=Ga(T),L(O,T,M)}if(de(T)||Q(T))return T=qa(T,O.mode,M,null),T.return=O,T;if(typeof T.then=="function")return L(O,_l(T),M);if(T.$$typeof===R)return L(O,bl(O,T),M);xl(O,T)}return null}function j(O,T,M,H){var ne=T!==null?T.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return ne!==null?null:S(O,T,""+M,H);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case x:return M.key===ne?k(O,T,M,H):null;case v:return M.key===ne?N(O,T,M,H):null;case ce:return M=Ga(M),j(O,T,M,H)}if(de(M)||Q(M))return ne!==null?null:F(O,T,M,H,null);if(typeof M.then=="function")return j(O,T,_l(M),H);if(M.$$typeof===R)return j(O,T,bl(O,M),H);xl(O,M)}return null}function B(O,T,M,H,ne){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return O=O.get(M)||null,S(T,O,""+H,ne);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case x:return O=O.get(H.key===null?M:H.key)||null,k(T,O,H,ne);case v:return O=O.get(H.key===null?M:H.key)||null,N(T,O,H,ne);case ce:return H=Ga(H),B(O,T,M,H,ne)}if(de(H)||Q(H))return O=O.get(M)||null,F(T,O,H,ne,null);if(typeof H.then=="function")return B(O,T,M,_l(H),ne);if(H.$$typeof===R)return B(O,T,M,bl(T,H),ne);xl(T,H)}return null}function W(O,T,M,H){for(var ne=null,Se=null,ee=T,se=T=0,ge=null;ee!==null&&se<M.length;se++){ee.index>se?(ge=ee,ee=null):ge=ee.sibling;var Ce=j(O,ee,M[se],H);if(Ce===null){ee===null&&(ee=ge);break}e&&ee&&Ce.alternate===null&&t(O,ee),T=d(Ce,T,se),Se===null?ne=Ce:Se.sibling=Ce,Se=Ce,ee=ge}if(se===M.length)return r(O,ee),ve&&On(O,se),ne;if(ee===null){for(;se<M.length;se++)ee=L(O,M[se],H),ee!==null&&(T=d(ee,T,se),Se===null?ne=ee:Se.sibling=ee,Se=ee);return ve&&On(O,se),ne}for(ee=l(ee);se<M.length;se++)ge=B(ee,O,se,M[se],H),ge!==null&&(e&&ge.alternate!==null&&ee.delete(ge.key===null?se:ge.key),T=d(ge,T,se),Se===null?ne=ge:Se.sibling=ge,Se=ge);return e&&ee.forEach(function(wa){return t(O,wa)}),ve&&On(O,se),ne}function ae(O,T,M,H){if(M==null)throw Error(u(151));for(var ne=null,Se=null,ee=T,se=T=0,ge=null,Ce=M.next();ee!==null&&!Ce.done;se++,Ce=M.next()){ee.index>se?(ge=ee,ee=null):ge=ee.sibling;var wa=j(O,ee,Ce.value,H);if(wa===null){ee===null&&(ee=ge);break}e&&ee&&wa.alternate===null&&t(O,ee),T=d(wa,T,se),Se===null?ne=wa:Se.sibling=wa,Se=wa,ee=ge}if(Ce.done)return r(O,ee),ve&&On(O,se),ne;if(ee===null){for(;!Ce.done;se++,Ce=M.next())Ce=L(O,Ce.value,H),Ce!==null&&(T=d(Ce,T,se),Se===null?ne=Ce:Se.sibling=Ce,Se=Ce);return ve&&On(O,se),ne}for(ee=l(ee);!Ce.done;se++,Ce=M.next())Ce=B(ee,O,se,Ce.value,H),Ce!==null&&(e&&Ce.alternate!==null&&ee.delete(Ce.key===null?se:Ce.key),T=d(Ce,T,se),Se===null?ne=Ce:Se.sibling=Ce,Se=Ce);return e&&ee.forEach(function(qv){return t(O,qv)}),ve&&On(O,se),ne}function Oe(O,T,M,H){if(typeof M=="object"&&M!==null&&M.type===w&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case x:e:{for(var ne=M.key;T!==null;){if(T.key===ne){if(ne=M.type,ne===w){if(T.tag===7){r(O,T.sibling),H=o(T,M.props.children),H.return=O,O=H;break e}}else if(T.elementType===ne||typeof ne=="object"&&ne!==null&&ne.$$typeof===ce&&Ga(ne)===T.type){r(O,T.sibling),H=o(T,M.props),qu(H,M),H.return=O,O=H;break e}r(O,T);break}else t(O,T);T=T.sibling}M.type===w?(H=qa(M.props.children,O.mode,H,M.key),H.return=O,O=H):(H=hl(M.type,M.key,M.props,null,O.mode,H),qu(H,M),H.return=O,O=H)}return g(O);case v:e:{for(ne=M.key;T!==null;){if(T.key===ne)if(T.tag===4&&T.stateNode.containerInfo===M.containerInfo&&T.stateNode.implementation===M.implementation){r(O,T.sibling),H=o(T,M.children||[]),H.return=O,O=H;break e}else{r(O,T);break}else t(O,T);T=T.sibling}H=Ro(M,O.mode,H),H.return=O,O=H}return g(O);case ce:return M=Ga(M),Oe(O,T,M,H)}if(de(M))return W(O,T,M,H);if(Q(M)){if(ne=Q(M),typeof ne!="function")throw Error(u(150));return M=ne.call(M),ae(O,T,M,H)}if(typeof M.then=="function")return Oe(O,T,_l(M),H);if(M.$$typeof===R)return Oe(O,T,bl(O,M),H);xl(O,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,T!==null&&T.tag===6?(r(O,T.sibling),H=o(T,M),H.return=O,O=H):(r(O,T),H=No(M,O.mode,H),H.return=O,O=H),g(O)):r(O,T)}return function(O,T,M,H){try{Bu=0;var ne=Oe(O,T,M,H);return Mr=null,ne}catch(ee){if(ee===Or||ee===yl)throw ee;var Se=Ht(29,ee,null,O.mode);return Se.lanes=H,Se.return=O,Se}}}var Za=kh(!0),Ah=kh(!1),ua=!1;function Xo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Qo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function la(e,t,r){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(Ee&2)!==0){var o=l.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),l.pending=t,t=fl(e),ch(e,null,r),t}return dl(e,l,t,r),fl(e)}function Fu(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var l=t.lanes;l&=e.pendingLanes,r|=l,t.lanes=r,yf(e,r)}}function Io(e,t){var r=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,r===l)){var o=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var g={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?o=d=g:d=d.next=g,r=r.next}while(r!==null);d===null?o=d=t:d=d.next=t}else o=d=t;r={baseState:l.baseState,firstBaseUpdate:o,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Jo=!1;function Hu(){if(Jo){var e=$r;if(e!==null)throw e}}function Lu(e,t,r,l){Jo=!1;var o=e.updateQueue;ua=!1;var d=o.firstBaseUpdate,g=o.lastBaseUpdate,S=o.shared.pending;if(S!==null){o.shared.pending=null;var k=S,N=k.next;k.next=null,g===null?d=N:g.next=N,g=k;var F=e.alternate;F!==null&&(F=F.updateQueue,S=F.lastBaseUpdate,S!==g&&(S===null?F.firstBaseUpdate=N:S.next=N,F.lastBaseUpdate=k))}if(d!==null){var L=o.baseState;g=0,F=N=k=null,S=d;do{var j=S.lane&-536870913,B=j!==S.lane;if(B?(be&j)===j:(l&j)===j){j!==0&&j===zr&&(Jo=!0),F!==null&&(F=F.next={lane:0,tag:S.tag,payload:S.payload,callback:null,next:null});e:{var W=e,ae=S;j=t;var Oe=r;switch(ae.tag){case 1:if(W=ae.payload,typeof W=="function"){L=W.call(Oe,L,j);break e}L=W;break e;case 3:W.flags=W.flags&-65537|128;case 0:if(W=ae.payload,j=typeof W=="function"?W.call(Oe,L,j):W,j==null)break e;L=p({},L,j);break e;case 2:ua=!0}}j=S.callback,j!==null&&(e.flags|=64,B&&(e.flags|=8192),B=o.callbacks,B===null?o.callbacks=[j]:B.push(j))}else B={lane:j,tag:S.tag,payload:S.payload,callback:S.callback,next:null},F===null?(N=F=B,k=L):F=F.next=B,g|=j;if(S=S.next,S===null){if(S=o.shared.pending,S===null)break;B=S,S=B.next,B.next=null,o.lastBaseUpdate=B,o.shared.pending=null}}while(!0);F===null&&(k=L),o.baseState=k,o.firstBaseUpdate=N,o.lastBaseUpdate=F,d===null&&(o.shared.lanes=0),fa|=g,e.lanes=g,e.memoizedState=L}}function Dh(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function Th(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)Dh(r[e],t)}var Nr=D(null),wl=D(0);function zh(e,t){e=Vn,J(wl,e),J(Nr,t),Vn=e|t.baseLanes}function Ko(){J(wl,Vn),J(Nr,Nr.current)}function Wo(){Vn=wl.current,V(Nr),V(wl)}var Lt=D(null),un=null;function sa(e){var t=e.alternate;J(Je,Je.current&1),J(Lt,e),un===null&&(t===null||Nr.current!==null||t.memoizedState!==null)&&(un=e)}function Po(e){J(Je,Je.current),J(Lt,e),un===null&&(un=e)}function $h(e){e.tag===22?(J(Je,Je.current),J(Lt,e),un===null&&(un=e)):oa()}function oa(){J(Je,Je.current),J(Lt,Lt.current)}function Vt(e){V(Lt),un===e&&(un=null),V(Je)}var Je=D(0);function Sl(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||u0(r)||i0(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Rn=0,le=null,ze=null,Pe=null,Cl=!1,Rr=!1,Xa=!1,El=0,Vu=0,jr=null,Ty=0;function Ge(){throw Error(u(321))}function ec(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ft(e[r],t[r]))return!1;return!0}function tc(e,t,r,l,o,d){return Rn=d,le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?pp:bc,Xa=!1,d=r(l,o),Xa=!1,Rr&&(d=Mh(t,r,l,o)),Oh(e),d}function Oh(e){U.H=Zu;var t=ze!==null&&ze.next!==null;if(Rn=0,Pe=ze=le=null,Cl=!1,Vu=0,jr=null,t)throw Error(u(300));e===null||et||(e=e.dependencies,e!==null&&ml(e)&&(et=!0))}function Mh(e,t,r,l){le=e;var o=0;do{if(Rr&&(jr=null),Vu=0,Rr=!1,25<=o)throw Error(u(301));if(o+=1,Pe=ze=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=mp,d=t(r,l)}while(Rr);return d}function zy(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?Gu(t):t,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(le.flags|=1024),t}function nc(){var e=El!==0;return El=0,e}function ac(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function rc(e){if(Cl){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Cl=!1}Rn=0,Pe=ze=le=null,Rr=!1,Vu=El=0,jr=null}function kt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Pe===null?le.memoizedState=Pe=e:Pe=Pe.next=e,Pe}function Ke(){if(ze===null){var e=le.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var t=Pe===null?le.memoizedState:Pe.next;if(t!==null)Pe=t,ze=e;else{if(e===null)throw le.alternate===null?Error(u(467)):Error(u(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},Pe===null?le.memoizedState=Pe=e:Pe=Pe.next=e}return Pe}function kl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Gu(e){var t=Vu;return Vu+=1,jr===null&&(jr=[]),e=Sh(jr,e,t),t=le,(Pe===null?t.memoizedState:Pe.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?pp:bc),e}function Al(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Gu(e);if(e.$$typeof===R)return yt(e)}throw Error(u(438,String(e)))}function uc(e){var t=null,r=le.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var l=le.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(t={data:l.data.map(function(o){return o.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=kl(),le.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),l=0;l<e;l++)r[l]=ut;return t.index++,r}function jn(e,t){return typeof t=="function"?t(e):t}function Dl(e){var t=Ke();return ic(t,ze,e)}function ic(e,t,r){var l=e.queue;if(l===null)throw Error(u(311));l.lastRenderedReducer=r;var o=e.baseQueue,d=l.pending;if(d!==null){if(o!==null){var g=o.next;o.next=d.next,d.next=g}t.baseQueue=o=d,l.pending=null}if(d=e.baseState,o===null)e.memoizedState=d;else{t=o.next;var S=g=null,k=null,N=t,F=!1;do{var L=N.lane&-536870913;if(L!==N.lane?(be&L)===L:(Rn&L)===L){var j=N.revertLane;if(j===0)k!==null&&(k=k.next={lane:0,revertLane:0,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null}),L===zr&&(F=!0);else if((Rn&j)===j){N=N.next,j===zr&&(F=!0);continue}else L={lane:0,revertLane:N.revertLane,gesture:null,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},k===null?(S=k=L,g=d):k=k.next=L,le.lanes|=j,fa|=j;L=N.action,Xa&&r(d,L),d=N.hasEagerState?N.eagerState:r(d,L)}else j={lane:L,revertLane:N.revertLane,gesture:N.gesture,action:N.action,hasEagerState:N.hasEagerState,eagerState:N.eagerState,next:null},k===null?(S=k=j,g=d):k=k.next=j,le.lanes|=L,fa|=L;N=N.next}while(N!==null&&N!==t);if(k===null?g=d:k.next=S,!Ft(d,e.memoizedState)&&(et=!0,F&&(r=$r,r!==null)))throw r;e.memoizedState=d,e.baseState=g,e.baseQueue=k,l.lastRenderedState=d}return o===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function lc(e){var t=Ke(),r=t.queue;if(r===null)throw Error(u(311));r.lastRenderedReducer=e;var l=r.dispatch,o=r.pending,d=t.memoizedState;if(o!==null){r.pending=null;var g=o=o.next;do d=e(d,g.action),g=g.next;while(g!==o);Ft(d,t.memoizedState)||(et=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,l]}function Nh(e,t,r){var l=le,o=Ke(),d=ve;if(d){if(r===void 0)throw Error(u(407));r=r()}else r=t();var g=!Ft((ze||o).memoizedState,r);if(g&&(o.memoizedState=r,et=!0),o=o.queue,cc(Uh.bind(null,l,o,e),[e]),o.getSnapshot!==t||g||Pe!==null&&Pe.memoizedState.tag&1){if(l.flags|=2048,Ur(9,{destroy:void 0},jh.bind(null,l,o,r,t),null),Me===null)throw Error(u(349));d||(Rn&127)!==0||Rh(l,t,r)}return r}function Rh(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=le.updateQueue,t===null?(t=kl(),le.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function jh(e,t,r,l){t.value=r,t.getSnapshot=l,Bh(t)&&qh(e)}function Uh(e,t,r){return r(function(){Bh(t)&&qh(e)})}function Bh(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ft(e,r)}catch{return!0}}function qh(e){var t=Ba(e,2);t!==null&&Rt(t,e,2)}function sc(e){var t=kt();if(typeof e=="function"){var r=e;if(e=r(),Xa){Wn(!0);try{r()}finally{Wn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jn,lastRenderedState:e},t}function Fh(e,t,r,l){return e.baseState=r,ic(e,ze,typeof l=="function"?l:jn)}function $y(e,t,r,l,o){if($l(e))throw Error(u(485));if(e=t.action,e!==null){var d={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){d.listeners.push(g)}};U.T!==null?r(!0):d.isTransition=!1,l(d),r=t.pending,r===null?(d.next=t.pending=d,Hh(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Hh(e,t){var r=t.action,l=t.payload,o=e.state;if(t.isTransition){var d=U.T,g={};U.T=g;try{var S=r(o,l),k=U.S;k!==null&&k(g,S),Lh(e,t,S)}catch(N){oc(e,t,N)}finally{d!==null&&g.types!==null&&(d.types=g.types),U.T=d}}else try{d=r(o,l),Lh(e,t,d)}catch(N){oc(e,t,N)}}function Lh(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(l){Vh(e,t,l)},function(l){return oc(e,t,l)}):Vh(e,t,r)}function Vh(e,t,r){t.status="fulfilled",t.value=r,Gh(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Hh(e,r)))}function oc(e,t,r){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do t.status="rejected",t.reason=r,Gh(t),t=t.next;while(t!==l)}e.action=null}function Gh(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Yh(e,t){return t}function Zh(e,t){if(ve){var r=Me.formState;if(r!==null){e:{var l=le;if(ve){if(Ue){t:{for(var o=Ue,d=rn;o.nodeType!==8;){if(!d){o=null;break t}if(o=ln(o.nextSibling),o===null){o=null;break t}}d=o.data,o=d==="F!"||d==="F"?o:null}if(o){Ue=ln(o.nextSibling),l=o.data==="F!";break e}}aa(l)}l=!1}l&&(t=r[0])}}return r=kt(),r.memoizedState=r.baseState=t,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yh,lastRenderedState:t},r.queue=l,r=dp.bind(null,le,l),l.dispatch=r,l=sc(!1),d=mc.bind(null,le,!1,l.queue),l=kt(),o={state:t,dispatch:null,action:e,pending:null},l.queue=o,r=$y.bind(null,le,o,d,r),o.dispatch=r,l.memoizedState=e,[t,r,!1]}function Xh(e){var t=Ke();return Qh(t,ze,e)}function Qh(e,t,r){if(t=ic(e,t,Yh)[0],e=Dl(jn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var l=Gu(t)}catch(g){throw g===Or?yl:g}else l=t;t=Ke();var o=t.queue,d=o.dispatch;return r!==t.memoizedState&&(le.flags|=2048,Ur(9,{destroy:void 0},Oy.bind(null,o,r),null)),[l,d,e]}function Oy(e,t){e.action=t}function Ih(e){var t=Ke(),r=ze;if(r!==null)return Qh(t,r,e);Ke(),t=t.memoizedState,r=Ke();var l=r.queue.dispatch;return r.memoizedState=e,[t,l,!1]}function Ur(e,t,r,l){return e={tag:e,create:r,deps:l,inst:t,next:null},t=le.updateQueue,t===null&&(t=kl(),le.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(l=r.next,r.next=e,e.next=l,t.lastEffect=e),e}function Jh(){return Ke().memoizedState}function Tl(e,t,r,l){var o=kt();le.flags|=e,o.memoizedState=Ur(1|t,{destroy:void 0},r,l===void 0?null:l)}function zl(e,t,r,l){var o=Ke();l=l===void 0?null:l;var d=o.memoizedState.inst;ze!==null&&l!==null&&ec(l,ze.memoizedState.deps)?o.memoizedState=Ur(t,d,r,l):(le.flags|=e,o.memoizedState=Ur(1|t,d,r,l))}function Kh(e,t){Tl(8390656,8,e,t)}function cc(e,t){zl(2048,8,e,t)}function My(e){le.flags|=4;var t=le.updateQueue;if(t===null)t=kl(),le.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Wh(e){var t=Ke().memoizedState;return My({ref:t,nextImpl:e}),function(){if((Ee&2)!==0)throw Error(u(440));return t.impl.apply(void 0,arguments)}}function Ph(e,t){return zl(4,2,e,t)}function ep(e,t){return zl(4,4,e,t)}function tp(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function np(e,t,r){r=r!=null?r.concat([e]):null,zl(4,4,tp.bind(null,t,e),r)}function dc(){}function ap(e,t){var r=Ke();t=t===void 0?null:t;var l=r.memoizedState;return t!==null&&ec(t,l[1])?l[0]:(r.memoizedState=[e,t],e)}function rp(e,t){var r=Ke();t=t===void 0?null:t;var l=r.memoizedState;if(t!==null&&ec(t,l[1]))return l[0];if(l=e(),Xa){Wn(!0);try{e()}finally{Wn(!1)}}return r.memoizedState=[l,t],l}function fc(e,t,r){return r===void 0||(Rn&1073741824)!==0&&(be&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=u1(),le.lanes|=e,fa|=e,r)}function up(e,t,r,l){return Ft(r,t)?r:Nr.current!==null?(e=fc(e,r,l),Ft(e,t)||(et=!0),e):(Rn&42)===0||(Rn&1073741824)!==0&&(be&261930)===0?(et=!0,e.memoizedState=r):(e=u1(),le.lanes|=e,fa|=e,t)}function ip(e,t,r,l,o){var d=X.p;X.p=d!==0&&8>d?d:8;var g=U.T,S={};U.T=S,mc(e,!1,t,r);try{var k=o(),N=U.S;if(N!==null&&N(S,k),k!==null&&typeof k=="object"&&typeof k.then=="function"){var F=Dy(k,l);Yu(e,t,F,Zt(e))}else Yu(e,t,l,Zt(e))}catch(L){Yu(e,t,{then:function(){},status:"rejected",reason:L},Zt())}finally{X.p=d,g!==null&&S.types!==null&&(g.types=S.types),U.T=g}}function Ny(){}function hc(e,t,r,l){if(e.tag!==5)throw Error(u(476));var o=lp(e).queue;ip(e,o,t,te,r===null?Ny:function(){return sp(e),r(l)})}function lp(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:te,baseState:te,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jn,lastRenderedState:te},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function sp(e){var t=lp(e);t.next===null&&(t=e.alternate.memoizedState),Yu(e,t.next.queue,{},Zt())}function pc(){return yt(si)}function op(){return Ke().memoizedState}function cp(){return Ke().memoizedState}function Ry(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Zt();e=ia(r);var l=la(t,e,r);l!==null&&(Rt(l,t,r),Fu(l,t,r)),t={cache:Vo()},e.payload=t;return}t=t.return}}function jy(e,t,r){var l=Zt();r={lane:l,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},$l(e)?fp(t,r):(r=Oo(e,t,r,l),r!==null&&(Rt(r,e,l),hp(r,t,l)))}function dp(e,t,r){var l=Zt();Yu(e,t,r,l)}function Yu(e,t,r,l){var o={lane:l,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if($l(e))fp(t,o);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var g=t.lastRenderedState,S=d(g,r);if(o.hasEagerState=!0,o.eagerState=S,Ft(S,g))return dl(e,t,o,0),Me===null&&cl(),!1}catch{}if(r=Oo(e,t,o,l),r!==null)return Rt(r,e,l),hp(r,t,l),!0}return!1}function mc(e,t,r,l){if(l={lane:2,revertLane:Xc(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},$l(e)){if(t)throw Error(u(479))}else t=Oo(e,r,l,2),t!==null&&Rt(t,e,2)}function $l(e){var t=e.alternate;return e===le||t!==null&&t===le}function fp(e,t){Rr=Cl=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function hp(e,t,r){if((r&4194048)!==0){var l=t.lanes;l&=e.pendingLanes,r|=l,t.lanes=r,yf(e,r)}}var Zu={readContext:yt,use:Al,useCallback:Ge,useContext:Ge,useEffect:Ge,useImperativeHandle:Ge,useLayoutEffect:Ge,useInsertionEffect:Ge,useMemo:Ge,useReducer:Ge,useRef:Ge,useState:Ge,useDebugValue:Ge,useDeferredValue:Ge,useTransition:Ge,useSyncExternalStore:Ge,useId:Ge,useHostTransitionStatus:Ge,useFormState:Ge,useActionState:Ge,useOptimistic:Ge,useMemoCache:Ge,useCacheRefresh:Ge};Zu.useEffectEvent=Ge;var pp={readContext:yt,use:Al,useCallback:function(e,t){return kt().memoizedState=[e,t===void 0?null:t],e},useContext:yt,useEffect:Kh,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,Tl(4194308,4,tp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Tl(4194308,4,e,t)},useInsertionEffect:function(e,t){Tl(4,2,e,t)},useMemo:function(e,t){var r=kt();t=t===void 0?null:t;var l=e();if(Xa){Wn(!0);try{e()}finally{Wn(!1)}}return r.memoizedState=[l,t],l},useReducer:function(e,t,r){var l=kt();if(r!==void 0){var o=r(t);if(Xa){Wn(!0);try{r(t)}finally{Wn(!1)}}}else o=t;return l.memoizedState=l.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},l.queue=e,e=e.dispatch=jy.bind(null,le,e),[l.memoizedState,e]},useRef:function(e){var t=kt();return e={current:e},t.memoizedState=e},useState:function(e){e=sc(e);var t=e.queue,r=dp.bind(null,le,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:dc,useDeferredValue:function(e,t){var r=kt();return fc(r,e,t)},useTransition:function(){var e=sc(!1);return e=ip.bind(null,le,e.queue,!0,!1),kt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var l=le,o=kt();if(ve){if(r===void 0)throw Error(u(407));r=r()}else{if(r=t(),Me===null)throw Error(u(349));(be&127)!==0||Rh(l,t,r)}o.memoizedState=r;var d={value:r,getSnapshot:t};return o.queue=d,Kh(Uh.bind(null,l,d,e),[e]),l.flags|=2048,Ur(9,{destroy:void 0},jh.bind(null,l,d,r,t),null),r},useId:function(){var e=kt(),t=Me.identifierPrefix;if(ve){var r=gn,l=bn;r=(l&~(1<<32-qt(l)-1)).toString(32)+r,t="_"+t+"R_"+r,r=El++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=Ty++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:pc,useFormState:Zh,useActionState:Zh,useOptimistic:function(e){var t=kt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=mc.bind(null,le,!0,r),r.dispatch=t,[e,t]},useMemoCache:uc,useCacheRefresh:function(){return kt().memoizedState=Ry.bind(null,le)},useEffectEvent:function(e){var t=kt(),r={impl:e};return t.memoizedState=r,function(){if((Ee&2)!==0)throw Error(u(440));return r.impl.apply(void 0,arguments)}}},bc={readContext:yt,use:Al,useCallback:ap,useContext:yt,useEffect:cc,useImperativeHandle:np,useInsertionEffect:Ph,useLayoutEffect:ep,useMemo:rp,useReducer:Dl,useRef:Jh,useState:function(){return Dl(jn)},useDebugValue:dc,useDeferredValue:function(e,t){var r=Ke();return up(r,ze.memoizedState,e,t)},useTransition:function(){var e=Dl(jn)[0],t=Ke().memoizedState;return[typeof e=="boolean"?e:Gu(e),t]},useSyncExternalStore:Nh,useId:op,useHostTransitionStatus:pc,useFormState:Xh,useActionState:Xh,useOptimistic:function(e,t){var r=Ke();return Fh(r,ze,e,t)},useMemoCache:uc,useCacheRefresh:cp};bc.useEffectEvent=Wh;var mp={readContext:yt,use:Al,useCallback:ap,useContext:yt,useEffect:cc,useImperativeHandle:np,useInsertionEffect:Ph,useLayoutEffect:ep,useMemo:rp,useReducer:lc,useRef:Jh,useState:function(){return lc(jn)},useDebugValue:dc,useDeferredValue:function(e,t){var r=Ke();return ze===null?fc(r,e,t):up(r,ze.memoizedState,e,t)},useTransition:function(){var e=lc(jn)[0],t=Ke().memoizedState;return[typeof e=="boolean"?e:Gu(e),t]},useSyncExternalStore:Nh,useId:op,useHostTransitionStatus:pc,useFormState:Ih,useActionState:Ih,useOptimistic:function(e,t){var r=Ke();return ze!==null?Fh(r,ze,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:uc,useCacheRefresh:cp};mp.useEffectEvent=Wh;function gc(e,t,r,l){t=e.memoizedState,r=r(l,t),r=r==null?t:p({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var yc={enqueueSetState:function(e,t,r){e=e._reactInternals;var l=Zt(),o=ia(l);o.payload=t,r!=null&&(o.callback=r),t=la(e,o,l),t!==null&&(Rt(t,e,l),Fu(t,e,l))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var l=Zt(),o=ia(l);o.tag=1,o.payload=t,r!=null&&(o.callback=r),t=la(e,o,l),t!==null&&(Rt(t,e,l),Fu(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Zt(),l=ia(r);l.tag=2,t!=null&&(l.callback=t),t=la(e,l,r),t!==null&&(Rt(t,e,r),Fu(t,e,r))}};function bp(e,t,r,l,o,d,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,d,g):t.prototype&&t.prototype.isPureReactComponent?!Ou(r,l)||!Ou(o,d):!0}function gp(e,t,r,l){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,l),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,l),t.state!==e&&yc.enqueueReplaceState(t,t.state,null)}function Qa(e,t){var r=t;if("ref"in t){r={};for(var l in t)l!=="ref"&&(r[l]=t[l])}if(e=e.defaultProps){r===t&&(r=p({},r));for(var o in e)r[o]===void 0&&(r[o]=e[o])}return r}function yp(e){ol(e)}function vp(e){console.error(e)}function _p(e){ol(e)}function Ol(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(l){setTimeout(function(){throw l})}}function xp(e,t,r){try{var l=e.onCaughtError;l(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function vc(e,t,r){return r=ia(r),r.tag=3,r.payload={element:null},r.callback=function(){Ol(e,t)},r}function wp(e){return e=ia(e),e.tag=3,e}function Sp(e,t,r,l){var o=r.type.getDerivedStateFromError;if(typeof o=="function"){var d=l.value;e.payload=function(){return o(d)},e.callback=function(){xp(t,r,l)}}var g=r.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){xp(t,r,l),typeof o!="function"&&(ha===null?ha=new Set([this]):ha.add(this));var S=l.stack;this.componentDidCatch(l.value,{componentStack:S!==null?S:""})})}function Uy(e,t,r,l,o){if(r.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(t=r.alternate,t!==null&&Tr(t,r,o,!0),r=Lt.current,r!==null){switch(r.tag){case 31:case 13:return un===null?Gl():r.alternate===null&&Ye===0&&(Ye=3),r.flags&=-257,r.flags|=65536,r.lanes=o,l===vl?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([l]):t.add(l),Gc(e,l,o)),!1;case 22:return r.flags|=65536,l===vl?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([l])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([l]):r.add(l)),Gc(e,l,o)),!1}throw Error(u(435,r.tag))}return Gc(e,l,o),Gl(),!1}if(ve)return t=Lt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=o,l!==Bo&&(e=Error(u(422),{cause:l}),Ru(tn(e,r)))):(l!==Bo&&(t=Error(u(423),{cause:l}),Ru(tn(t,r))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,l=tn(l,r),o=vc(e.stateNode,l,o),Io(e,o),Ye!==4&&(Ye=2)),!1;var d=Error(u(520),{cause:l});if(d=tn(d,r),ei===null?ei=[d]:ei.push(d),Ye!==4&&(Ye=2),t===null)return!0;l=tn(l,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=o&-o,r.lanes|=e,e=vc(r.stateNode,l,e),Io(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ha===null||!ha.has(d))))return r.flags|=65536,o&=-o,r.lanes|=o,o=wp(o),Sp(o,e,r,l),Io(r,o),!1}r=r.return}while(r!==null);return!1}var _c=Error(u(461)),et=!1;function vt(e,t,r,l){t.child=e===null?Ah(t,null,r,l):Za(t,e.child,r,l)}function Cp(e,t,r,l,o){r=r.render;var d=t.ref;if("ref"in l){var g={};for(var S in l)S!=="ref"&&(g[S]=l[S])}else g=l;return La(t),l=tc(e,t,r,g,d,o),S=nc(),e!==null&&!et?(ac(e,t,o),Un(e,t,o)):(ve&&S&&jo(t),t.flags|=1,vt(e,t,l,o),t.child)}function Ep(e,t,r,l,o){if(e===null){var d=r.type;return typeof d=="function"&&!Mo(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,kp(e,t,d,l,o)):(e=hl(r.type,null,l,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!Dc(e,o)){var g=d.memoizedProps;if(r=r.compare,r=r!==null?r:Ou,r(g,l)&&e.ref===t.ref)return Un(e,t,o)}return t.flags|=1,e=$n(d,l),e.ref=t.ref,e.return=t,t.child=e}function kp(e,t,r,l,o){if(e!==null){var d=e.memoizedProps;if(Ou(d,l)&&e.ref===t.ref)if(et=!1,t.pendingProps=l=d,Dc(e,o))(e.flags&131072)!==0&&(et=!0);else return t.lanes=e.lanes,Un(e,t,o)}return xc(e,t,r,l,o)}function Ap(e,t,r,l){var o=l.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(l=t.child=e.child,o=0;l!==null;)o=o|l.lanes|l.childLanes,l=l.sibling;l=o&~d}else l=0,t.child=null;return Dp(e,t,d,r,l)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&gl(t,d!==null?d.cachePool:null),d!==null?zh(t,d):Ko(),$h(t);else return l=t.lanes=536870912,Dp(e,t,d!==null?d.baseLanes|r:r,r,l)}else d!==null?(gl(t,d.cachePool),zh(t,d),oa(),t.memoizedState=null):(e!==null&&gl(t,null),Ko(),oa());return vt(e,t,o,r),t.child}function Xu(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Dp(e,t,r,l,o){var d=Yo();return d=d===null?null:{parent:We._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&gl(t,null),Ko(),$h(t),e!==null&&Tr(e,t,l,!0),t.childLanes=o,null}function Ml(e,t){return t=Rl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Tp(e,t,r){return Za(t,e.child,null,r),e=Ml(t,t.pendingProps),e.flags|=2,Vt(t),t.memoizedState=null,e}function By(e,t,r){var l=t.pendingProps,o=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ve){if(l.mode==="hidden")return e=Ml(t,l),t.lanes=536870912,Xu(null,e);if(Po(t),(e=Ue)?(e=H1(e,rn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta!==null?{id:bn,overflow:gn}:null,retryLane:536870912,hydrationErrors:null},r=fh(e),r.return=t,t.child=r,gt=t,Ue=null)):e=null,e===null)throw aa(t);return t.lanes=536870912,null}return Ml(t,l)}var d=e.memoizedState;if(d!==null){var g=d.dehydrated;if(Po(t),o)if(t.flags&256)t.flags&=-257,t=Tp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(u(558));else if(et||Tr(e,t,r,!1),o=(r&e.childLanes)!==0,et||o){if(l=Me,l!==null&&(g=vf(l,r),g!==0&&g!==d.retryLane))throw d.retryLane=g,Ba(e,g),Rt(l,e,g),_c;Gl(),t=Tp(e,t,r)}else e=d.treeContext,Ue=ln(g.nextSibling),gt=t,ve=!0,na=null,rn=!1,e!==null&&mh(t,e),t=Ml(t,l),t.flags|=4096;return t}return e=$n(e.child,{mode:l.mode,children:l.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Nl(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(u(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function xc(e,t,r,l,o){return La(t),r=tc(e,t,r,l,void 0,o),l=nc(),e!==null&&!et?(ac(e,t,o),Un(e,t,o)):(ve&&l&&jo(t),t.flags|=1,vt(e,t,r,o),t.child)}function zp(e,t,r,l,o,d){return La(t),t.updateQueue=null,r=Mh(t,l,r,o),Oh(e),l=nc(),e!==null&&!et?(ac(e,t,d),Un(e,t,d)):(ve&&l&&jo(t),t.flags|=1,vt(e,t,r,d),t.child)}function $p(e,t,r,l,o){if(La(t),t.stateNode===null){var d=Er,g=r.contextType;typeof g=="object"&&g!==null&&(d=yt(g)),d=new r(l,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=yc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=l,d.state=t.memoizedState,d.refs={},Xo(t),g=r.contextType,d.context=typeof g=="object"&&g!==null?yt(g):Er,d.state=t.memoizedState,g=r.getDerivedStateFromProps,typeof g=="function"&&(gc(t,r,g,l),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(g=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),g!==d.state&&yc.enqueueReplaceState(d,d.state,null),Lu(t,l,d,o),Hu(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),l=!0}else if(e===null){d=t.stateNode;var S=t.memoizedProps,k=Qa(r,S);d.props=k;var N=d.context,F=r.contextType;g=Er,typeof F=="object"&&F!==null&&(g=yt(F));var L=r.getDerivedStateFromProps;F=typeof L=="function"||typeof d.getSnapshotBeforeUpdate=="function",S=t.pendingProps!==S,F||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S||N!==g)&&gp(t,d,l,g),ua=!1;var j=t.memoizedState;d.state=j,Lu(t,l,d,o),Hu(),N=t.memoizedState,S||j!==N||ua?(typeof L=="function"&&(gc(t,r,L,l),N=t.memoizedState),(k=ua||bp(t,r,k,l,j,N,g))?(F||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=l,t.memoizedState=N),d.props=l,d.state=N,d.context=g,l=k):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),l=!1)}else{d=t.stateNode,Qo(e,t),g=t.memoizedProps,F=Qa(r,g),d.props=F,L=t.pendingProps,j=d.context,N=r.contextType,k=Er,typeof N=="object"&&N!==null&&(k=yt(N)),S=r.getDerivedStateFromProps,(N=typeof S=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(g!==L||j!==k)&&gp(t,d,l,k),ua=!1,j=t.memoizedState,d.state=j,Lu(t,l,d,o),Hu();var B=t.memoizedState;g!==L||j!==B||ua||e!==null&&e.dependencies!==null&&ml(e.dependencies)?(typeof S=="function"&&(gc(t,r,S,l),B=t.memoizedState),(F=ua||bp(t,r,F,l,j,B,k)||e!==null&&e.dependencies!==null&&ml(e.dependencies))?(N||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,B,k),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,B,k)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||g===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),t.memoizedProps=l,t.memoizedState=B),d.props=l,d.state=B,d.context=k,l=F):(typeof d.componentDidUpdate!="function"||g===e.memoizedProps&&j===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&j===e.memoizedState||(t.flags|=1024),l=!1)}return d=l,Nl(e,t),l=(t.flags&128)!==0,d||l?(d=t.stateNode,r=l&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&l?(t.child=Za(t,e.child,null,o),t.child=Za(t,null,r,o)):vt(e,t,r,o),t.memoizedState=d.state,e=t.child):e=Un(e,t,o),e}function Op(e,t,r,l){return Fa(),t.flags|=256,vt(e,t,r,l),t.child}var wc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:xh()}}function Cc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Yt),e}function Mp(e,t,r){var l=t.pendingProps,o=!1,d=(t.flags&128)!==0,g;if((g=d)||(g=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),g&&(o=!0,t.flags&=-129),g=(t.flags&32)!==0,t.flags&=-33,e===null){if(ve){if(o?sa(t):oa(),(e=Ue)?(e=H1(e,rn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ta!==null?{id:bn,overflow:gn}:null,retryLane:536870912,hydrationErrors:null},r=fh(e),r.return=t,t.child=r,gt=t,Ue=null)):e=null,e===null)throw aa(t);return i0(e)?t.lanes=32:t.lanes=536870912,null}var S=l.children;return l=l.fallback,o?(oa(),o=t.mode,S=Rl({mode:"hidden",children:S},o),l=qa(l,o,r,null),S.return=t,l.return=t,S.sibling=l,t.child=S,l=t.child,l.memoizedState=Sc(r),l.childLanes=Cc(e,g,r),t.memoizedState=wc,Xu(null,l)):(sa(t),Ec(t,S))}var k=e.memoizedState;if(k!==null&&(S=k.dehydrated,S!==null)){if(d)t.flags&256?(sa(t),t.flags&=-257,t=kc(e,t,r)):t.memoizedState!==null?(oa(),t.child=e.child,t.flags|=128,t=null):(oa(),S=l.fallback,o=t.mode,l=Rl({mode:"visible",children:l.children},o),S=qa(S,o,r,null),S.flags|=2,l.return=t,S.return=t,l.sibling=S,t.child=l,Za(t,e.child,null,r),l=t.child,l.memoizedState=Sc(r),l.childLanes=Cc(e,g,r),t.memoizedState=wc,t=Xu(null,l));else if(sa(t),i0(S)){if(g=S.nextSibling&&S.nextSibling.dataset,g)var N=g.dgst;g=N,l=Error(u(419)),l.stack="",l.digest=g,Ru({value:l,source:null,stack:null}),t=kc(e,t,r)}else if(et||Tr(e,t,r,!1),g=(r&e.childLanes)!==0,et||g){if(g=Me,g!==null&&(l=vf(g,r),l!==0&&l!==k.retryLane))throw k.retryLane=l,Ba(e,l),Rt(g,e,l),_c;u0(S)||Gl(),t=kc(e,t,r)}else u0(S)?(t.flags|=192,t.child=e.child,t=null):(e=k.treeContext,Ue=ln(S.nextSibling),gt=t,ve=!0,na=null,rn=!1,e!==null&&mh(t,e),t=Ec(t,l.children),t.flags|=4096);return t}return o?(oa(),S=l.fallback,o=t.mode,k=e.child,N=k.sibling,l=$n(k,{mode:"hidden",children:l.children}),l.subtreeFlags=k.subtreeFlags&65011712,N!==null?S=$n(N,S):(S=qa(S,o,r,null),S.flags|=2),S.return=t,l.return=t,l.sibling=S,t.child=l,Xu(null,l),l=t.child,S=e.child.memoizedState,S===null?S=Sc(r):(o=S.cachePool,o!==null?(k=We._currentValue,o=o.parent!==k?{parent:k,pool:k}:o):o=xh(),S={baseLanes:S.baseLanes|r,cachePool:o}),l.memoizedState=S,l.childLanes=Cc(e,g,r),t.memoizedState=wc,Xu(e.child,l)):(sa(t),r=e.child,e=r.sibling,r=$n(r,{mode:"visible",children:l.children}),r.return=t,r.sibling=null,e!==null&&(g=t.deletions,g===null?(t.deletions=[e],t.flags|=16):g.push(e)),t.child=r,t.memoizedState=null,r)}function Ec(e,t){return t=Rl({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Rl(e,t){return e=Ht(22,e,null,t),e.lanes=0,e}function kc(e,t,r){return Za(t,e.child,null,r),e=Ec(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Np(e,t,r){e.lanes|=t;var l=e.alternate;l!==null&&(l.lanes|=t),Ho(e.return,t,r)}function Ac(e,t,r,l,o,d){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:l,tail:r,tailMode:o,treeForkCount:d}:(g.isBackwards=t,g.rendering=null,g.renderingStartTime=0,g.last=l,g.tail=r,g.tailMode=o,g.treeForkCount=d)}function Rp(e,t,r){var l=t.pendingProps,o=l.revealOrder,d=l.tail;l=l.children;var g=Je.current,S=(g&2)!==0;if(S?(g=g&1|2,t.flags|=128):g&=1,J(Je,g),vt(e,t,l,r),l=ve?Nu:0,!S&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Np(e,r,t);else if(e.tag===19)Np(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&Sl(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),Ac(t,!1,o,r,d,l);break;case"backwards":case"unstable_legacy-backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Sl(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}Ac(t,!0,r,null,d,l);break;case"together":Ac(t,!1,null,null,void 0,l);break;default:t.memoizedState=null}return t.child}function Un(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),fa|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(Tr(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,r=$n(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=$n(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Dc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&ml(e)))}function qy(e,t,r){switch(t.tag){case 3:Et(t,t.stateNode.containerInfo),ra(t,We,e.memoizedState.cache),Fa();break;case 27:case 5:vu(t);break;case 4:Et(t,t.stateNode.containerInfo);break;case 10:ra(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Po(t),null;break;case 13:var l=t.memoizedState;if(l!==null)return l.dehydrated!==null?(sa(t),t.flags|=128,null):(r&t.child.childLanes)!==0?Mp(e,t,r):(sa(t),e=Un(e,t,r),e!==null?e.sibling:null);sa(t);break;case 19:var o=(e.flags&128)!==0;if(l=(r&t.childLanes)!==0,l||(Tr(e,t,r,!1),l=(r&t.childLanes)!==0),o){if(l)return Rp(e,t,r);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),J(Je,Je.current),l)break;return null;case 22:return t.lanes=0,Ap(e,t,r,t.pendingProps);case 24:ra(t,We,e.memoizedState.cache)}return Un(e,t,r)}function jp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)et=!0;else{if(!Dc(e,r)&&(t.flags&128)===0)return et=!1,qy(e,t,r);et=(e.flags&131072)!==0}else et=!1,ve&&(t.flags&1048576)!==0&&ph(t,Nu,t.index);switch(t.lanes=0,t.tag){case 16:e:{var l=t.pendingProps;if(e=Ga(t.elementType),t.type=e,typeof e=="function")Mo(e)?(l=Qa(e,l),t.tag=1,t=$p(null,t,e,l,r)):(t.tag=0,t=xc(null,t,e,l,r));else{if(e!=null){var o=e.$$typeof;if(o===z){t.tag=11,t=Cp(null,t,e,l,r);break e}else if(o===K){t.tag=14,t=Ep(null,t,e,l,r);break e}}throw t=A(e)||e,Error(u(306,t,""))}}return t;case 0:return xc(e,t,t.type,t.pendingProps,r);case 1:return l=t.type,o=Qa(l,t.pendingProps),$p(e,t,l,o,r);case 3:e:{if(Et(t,t.stateNode.containerInfo),e===null)throw Error(u(387));l=t.pendingProps;var d=t.memoizedState;o=d.element,Qo(e,t),Lu(t,l,null,r);var g=t.memoizedState;if(l=g.cache,ra(t,We,l),l!==d.cache&&Lo(t,[We],r,!0),Hu(),l=g.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:g.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=Op(e,t,l,r);break e}else if(l!==o){o=tn(Error(u(424)),t),Ru(o),t=Op(e,t,l,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ue=ln(e.firstChild),gt=t,ve=!0,na=null,rn=!0,r=Ah(t,null,l,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Fa(),l===o){t=Un(e,t,r);break e}vt(e,t,l,r)}t=t.child}return t;case 26:return Nl(e,t),e===null?(r=X1(t.type,null,t.pendingProps,null))?t.memoizedState=r:ve||(r=t.type,e=t.pendingProps,l=Kl(fe.current).createElement(r),l[bt]=t,l[Tt]=e,_t(l,r,e),ft(l),t.stateNode=l):t.memoizedState=X1(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return vu(t),e===null&&ve&&(l=t.stateNode=G1(t.type,t.pendingProps,fe.current),gt=t,rn=!0,o=Ue,ga(t.type)?(l0=o,Ue=ln(l.firstChild)):Ue=o),vt(e,t,t.pendingProps.children,r),Nl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ve&&((o=l=Ue)&&(l=mv(l,t.type,t.pendingProps,rn),l!==null?(t.stateNode=l,gt=t,Ue=ln(l.firstChild),rn=!1,o=!0):o=!1),o||aa(t)),vu(t),o=t.type,d=t.pendingProps,g=e!==null?e.memoizedProps:null,l=d.children,n0(o,d)?l=null:g!==null&&n0(o,g)&&(t.flags|=32),t.memoizedState!==null&&(o=tc(e,t,zy,null,null,r),si._currentValue=o),Nl(e,t),vt(e,t,l,r),t.child;case 6:return e===null&&ve&&((e=r=Ue)&&(r=bv(r,t.pendingProps,rn),r!==null?(t.stateNode=r,gt=t,Ue=null,e=!0):e=!1),e||aa(t)),null;case 13:return Mp(e,t,r);case 4:return Et(t,t.stateNode.containerInfo),l=t.pendingProps,e===null?t.child=Za(t,null,l,r):vt(e,t,l,r),t.child;case 11:return Cp(e,t,t.type,t.pendingProps,r);case 7:return vt(e,t,t.pendingProps,r),t.child;case 8:return vt(e,t,t.pendingProps.children,r),t.child;case 12:return vt(e,t,t.pendingProps.children,r),t.child;case 10:return l=t.pendingProps,ra(t,t.type,l.value),vt(e,t,l.children,r),t.child;case 9:return o=t.type._context,l=t.pendingProps.children,La(t),o=yt(o),l=l(o),t.flags|=1,vt(e,t,l,r),t.child;case 14:return Ep(e,t,t.type,t.pendingProps,r);case 15:return kp(e,t,t.type,t.pendingProps,r);case 19:return Rp(e,t,r);case 31:return By(e,t,r);case 22:return Ap(e,t,r,t.pendingProps);case 24:return La(t),l=yt(We),e===null?(o=Yo(),o===null&&(o=Me,d=Vo(),o.pooledCache=d,d.refCount++,d!==null&&(o.pooledCacheLanes|=r),o=d),t.memoizedState={parent:l,cache:o},Xo(t),ra(t,We,o)):((e.lanes&r)!==0&&(Qo(e,t),Lu(t,null,null,r),Hu()),o=e.memoizedState,d=t.memoizedState,o.parent!==l?(o={parent:l,cache:l},t.memoizedState=o,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=o),ra(t,We,l)):(l=d.cache,ra(t,We,l),l!==o.cache&&Lo(t,[We],r,!0))),vt(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function Bn(e){e.flags|=4}function Tc(e,t,r,l,o){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(o1())e.flags|=8192;else throw Ya=vl,Zo}else e.flags&=-16777217}function Up(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!W1(t))if(o1())e.flags|=8192;else throw Ya=vl,Zo}function jl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?bf():536870912,e.lanes|=t,Hr|=t)}function Qu(e,t){if(!ve)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var l=null;r!==null;)r.alternate!==null&&(l=r),r=r.sibling;l===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function Be(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,l=0;if(t)for(var o=e.child;o!==null;)r|=o.lanes|o.childLanes,l|=o.subtreeFlags&65011712,l|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)r|=o.lanes|o.childLanes,l|=o.subtreeFlags,l|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=l,e.childLanes=r,t}function Fy(e,t,r){var l=t.pendingProps;switch(Uo(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Be(t),null;case 1:return Be(t),null;case 3:return r=t.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Nn(We),Ie(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Dr(t)?Bn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,qo())),Be(t),null;case 26:var o=t.type,d=t.memoizedState;return e===null?(Bn(t),d!==null?(Be(t),Up(t,d)):(Be(t),Tc(t,o,null,l,r))):d?d!==e.memoizedState?(Bn(t),Be(t),Up(t,d)):(Be(t),t.flags&=-16777217):(e=e.memoizedProps,e!==l&&Bn(t),Be(t),Tc(t,o,e,l,r)),null;case 27:if(Xi(t),r=fe.current,o=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Bn(t);else{if(!l){if(t.stateNode===null)throw Error(u(166));return Be(t),null}e=P.current,Dr(t)?bh(t):(e=G1(o,l,r),t.stateNode=e,Bn(t))}return Be(t),null;case 5:if(Xi(t),o=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==l&&Bn(t);else{if(!l){if(t.stateNode===null)throw Error(u(166));return Be(t),null}if(d=P.current,Dr(t))bh(t);else{var g=Kl(fe.current);switch(d){case 1:d=g.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:d=g.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":d=g.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":d=g.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":d=g.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof l.is=="string"?g.createElement("select",{is:l.is}):g.createElement("select"),l.multiple?d.multiple=!0:l.size&&(d.size=l.size);break;default:d=typeof l.is=="string"?g.createElement(o,{is:l.is}):g.createElement(o)}}d[bt]=t,d[Tt]=l;e:for(g=t.child;g!==null;){if(g.tag===5||g.tag===6)d.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===t)break e;for(;g.sibling===null;){if(g.return===null||g.return===t)break e;g=g.return}g.sibling.return=g.return,g=g.sibling}t.stateNode=d;e:switch(_t(d,o,l),o){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&Bn(t)}}return Be(t),Tc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==l&&Bn(t);else{if(typeof l!="string"&&t.stateNode===null)throw Error(u(166));if(e=fe.current,Dr(t)){if(e=t.stateNode,r=t.memoizedProps,l=null,o=gt,o!==null)switch(o.tag){case 27:case 5:l=o.memoizedProps}e[bt]=t,e=!!(e.nodeValue===r||l!==null&&l.suppressHydrationWarning===!0||M1(e.nodeValue,r)),e||aa(t,!0)}else e=Kl(e).createTextNode(l),e[bt]=t,t.stateNode=e}return Be(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(l=Dr(t),r!==null){if(e===null){if(!l)throw Error(u(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));e[bt]=t}else Fa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Be(t),e=!1}else r=qo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(Vt(t),t):(Vt(t),null);if((t.flags&128)!==0)throw Error(u(558))}return Be(t),null;case 13:if(l=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Dr(t),l!==null&&l.dehydrated!==null){if(e===null){if(!o)throw Error(u(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(u(317));o[bt]=t}else Fa(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Be(t),o=!1}else o=qo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return t.flags&256?(Vt(t),t):(Vt(t),null)}return Vt(t),(t.flags&128)!==0?(t.lanes=r,t):(r=l!==null,e=e!==null&&e.memoizedState!==null,r&&(l=t.child,o=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(o=l.alternate.memoizedState.cachePool.pool),d=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==o&&(l.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),jl(t,t.updateQueue),Be(t),null);case 4:return Ie(),e===null&&Kc(t.stateNode.containerInfo),Be(t),null;case 10:return Nn(t.type),Be(t),null;case 19:if(V(Je),l=t.memoizedState,l===null)return Be(t),null;if(o=(t.flags&128)!==0,d=l.rendering,d===null)if(o)Qu(l,!1);else{if(Ye!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=Sl(e),d!==null){for(t.flags|=128,Qu(l,!1),e=d.updateQueue,t.updateQueue=e,jl(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)dh(r,e),r=r.sibling;return J(Je,Je.current&1|2),ve&&On(t,l.treeForkCount),t.child}e=e.sibling}l.tail!==null&&Ut()>Hl&&(t.flags|=128,o=!0,Qu(l,!1),t.lanes=4194304)}else{if(!o)if(e=Sl(d),e!==null){if(t.flags|=128,o=!0,e=e.updateQueue,t.updateQueue=e,jl(t,e),Qu(l,!0),l.tail===null&&l.tailMode==="hidden"&&!d.alternate&&!ve)return Be(t),null}else 2*Ut()-l.renderingStartTime>Hl&&r!==536870912&&(t.flags|=128,o=!0,Qu(l,!1),t.lanes=4194304);l.isBackwards?(d.sibling=t.child,t.child=d):(e=l.last,e!==null?e.sibling=d:t.child=d,l.last=d)}return l.tail!==null?(e=l.tail,l.rendering=e,l.tail=e.sibling,l.renderingStartTime=Ut(),e.sibling=null,r=Je.current,J(Je,o?r&1|2:r&1),ve&&On(t,l.treeForkCount),e):(Be(t),null);case 22:case 23:return Vt(t),Wo(),l=t.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(t.flags|=8192):l&&(t.flags|=8192),l?(r&536870912)!==0&&(t.flags&128)===0&&(Be(t),t.subtreeFlags&6&&(t.flags|=8192)):Be(t),r=t.updateQueue,r!==null&&jl(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),l=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(l=t.memoizedState.cachePool.pool),l!==r&&(t.flags|=2048),e!==null&&V(Va),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Nn(We),Be(t),null;case 25:return null;case 30:return null}throw Error(u(156,t.tag))}function Hy(e,t){switch(Uo(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Nn(We),Ie(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Xi(t),null;case 31:if(t.memoizedState!==null){if(Vt(t),t.alternate===null)throw Error(u(340));Fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Vt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));Fa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(Je),null;case 4:return Ie(),null;case 10:return Nn(t.type),null;case 22:case 23:return Vt(t),Wo(),e!==null&&V(Va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Nn(We),null;case 25:return null;default:return null}}function Bp(e,t){switch(Uo(t),t.tag){case 3:Nn(We),Ie();break;case 26:case 27:case 5:Xi(t);break;case 4:Ie();break;case 31:t.memoizedState!==null&&Vt(t);break;case 13:Vt(t);break;case 19:V(Je);break;case 10:Nn(t.type);break;case 22:case 23:Vt(t),Wo(),e!==null&&V(Va);break;case 24:Nn(We)}}function Iu(e,t){try{var r=t.updateQueue,l=r!==null?r.lastEffect:null;if(l!==null){var o=l.next;r=o;do{if((r.tag&e)===e){l=void 0;var d=r.create,g=r.inst;l=d(),g.destroy=l}r=r.next}while(r!==o)}}catch(S){Te(t,t.return,S)}}function ca(e,t,r){try{var l=t.updateQueue,o=l!==null?l.lastEffect:null;if(o!==null){var d=o.next;l=d;do{if((l.tag&e)===e){var g=l.inst,S=g.destroy;if(S!==void 0){g.destroy=void 0,o=t;var k=r,N=S;try{N()}catch(F){Te(o,k,F)}}}l=l.next}while(l!==d)}}catch(F){Te(t,t.return,F)}}function qp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{Th(t,r)}catch(l){Te(e,e.return,l)}}}function Fp(e,t,r){r.props=Qa(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(l){Te(e,t,l)}}function Ju(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var l=e.stateNode;break;case 30:l=e.stateNode;break;default:l=e.stateNode}typeof r=="function"?e.refCleanup=r(l):r.current=l}}catch(o){Te(e,t,o)}}function yn(e,t){var r=e.ref,l=e.refCleanup;if(r!==null)if(typeof l=="function")try{l()}catch(o){Te(e,t,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(o){Te(e,t,o)}else r.current=null}function Hp(e){var t=e.type,r=e.memoizedProps,l=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&l.focus();break e;case"img":r.src?l.src=r.src:r.srcSet&&(l.srcset=r.srcSet)}}catch(o){Te(e,e.return,o)}}function zc(e,t,r){try{var l=e.stateNode;ov(l,e.type,r,t),l[Tt]=t}catch(o){Te(e,e.return,o)}}function Lp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ga(e.type)||e.tag===4}function $c(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Lp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ga(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Oc(e,t,r){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Tn));else if(l!==4&&(l===27&&ga(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(Oc(e,t,r),e=e.sibling;e!==null;)Oc(e,t,r),e=e.sibling}function Ul(e,t,r){var l=e.tag;if(l===5||l===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(l!==4&&(l===27&&ga(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(Ul(e,t,r),e=e.sibling;e!==null;)Ul(e,t,r),e=e.sibling}function Vp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var l=e.type,o=t.attributes;o.length;)t.removeAttributeNode(o[0]);_t(t,l,r),t[bt]=e,t[Tt]=r}catch(d){Te(e,e.return,d)}}var qn=!1,tt=!1,Mc=!1,Gp=typeof WeakSet=="function"?WeakSet:Set,ht=null;function Ly(e,t){if(e=e.containerInfo,e0=rs,e=nh(e),ko(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var l=r.getSelection&&r.getSelection();if(l&&l.rangeCount!==0){r=l.anchorNode;var o=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var g=0,S=-1,k=-1,N=0,F=0,L=e,j=null;t:for(;;){for(var B;L!==r||o!==0&&L.nodeType!==3||(S=g+o),L!==d||l!==0&&L.nodeType!==3||(k=g+l),L.nodeType===3&&(g+=L.nodeValue.length),(B=L.firstChild)!==null;)j=L,L=B;for(;;){if(L===e)break t;if(j===r&&++N===o&&(S=g),j===d&&++F===l&&(k=g),(B=L.nextSibling)!==null)break;L=j,j=L.parentNode}L=B}r=S===-1||k===-1?null:{start:S,end:k}}else r=null}r=r||{start:0,end:0}}else r=null;for(t0={focusedElem:e,selectionRange:r},rs=!1,ht=t;ht!==null;)if(t=ht,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ht=e;else for(;ht!==null;){switch(t=ht,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)o=e[r],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,o=d.memoizedProps,d=d.memoizedState,l=r.stateNode;try{var W=Qa(r.type,o);e=l.getSnapshotBeforeUpdate(W,d),l.__reactInternalSnapshotBeforeUpdate=e}catch(ae){Te(r,r.return,ae)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)r0(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":r0(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(u(163))}if(e=t.sibling,e!==null){e.return=t.return,ht=e;break}ht=t.return}}function Yp(e,t,r){var l=r.flags;switch(r.tag){case 0:case 11:case 15:Hn(e,r),l&4&&Iu(5,r);break;case 1:if(Hn(e,r),l&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(g){Te(r,r.return,g)}else{var o=Qa(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(o,t,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Te(r,r.return,g)}}l&64&&qp(r),l&512&&Ju(r,r.return);break;case 3:if(Hn(e,r),l&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{Th(e,t)}catch(g){Te(r,r.return,g)}}break;case 27:t===null&&l&4&&Vp(r);case 26:case 5:Hn(e,r),t===null&&l&4&&Hp(r),l&512&&Ju(r,r.return);break;case 12:Hn(e,r);break;case 31:Hn(e,r),l&4&&Qp(e,r);break;case 13:Hn(e,r),l&4&&Ip(e,r),l&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=Ky.bind(null,r),gv(e,r))));break;case 22:if(l=r.memoizedState!==null||qn,!l){t=t!==null&&t.memoizedState!==null||tt,o=qn;var d=tt;qn=l,(tt=t)&&!d?Ln(e,r,(r.subtreeFlags&8772)!==0):Hn(e,r),qn=o,tt=d}break;case 30:break;default:Hn(e,r)}}function Zp(e){var t=e.alternate;t!==null&&(e.alternate=null,Zp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&so(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var He=null,$t=!1;function Fn(e,t,r){for(r=r.child;r!==null;)Xp(e,t,r),r=r.sibling}function Xp(e,t,r){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(_u,r)}catch{}switch(r.tag){case 26:tt||yn(r,t),Fn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:tt||yn(r,t);var l=He,o=$t;ga(r.type)&&(He=r.stateNode,$t=!1),Fn(e,t,r),ui(r.stateNode),He=l,$t=o;break;case 5:tt||yn(r,t);case 6:if(l=He,o=$t,He=null,Fn(e,t,r),He=l,$t=o,He!==null)if($t)try{(He.nodeType===9?He.body:He.nodeName==="HTML"?He.ownerDocument.body:He).removeChild(r.stateNode)}catch(d){Te(r,t,d)}else try{He.removeChild(r.stateNode)}catch(d){Te(r,t,d)}break;case 18:He!==null&&($t?(e=He,q1(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Ir(e)):q1(He,r.stateNode));break;case 4:l=He,o=$t,He=r.stateNode.containerInfo,$t=!0,Fn(e,t,r),He=l,$t=o;break;case 0:case 11:case 14:case 15:ca(2,r,t),tt||ca(4,r,t),Fn(e,t,r);break;case 1:tt||(yn(r,t),l=r.stateNode,typeof l.componentWillUnmount=="function"&&Fp(r,t,l)),Fn(e,t,r);break;case 21:Fn(e,t,r);break;case 22:tt=(l=tt)||r.memoizedState!==null,Fn(e,t,r),tt=l;break;default:Fn(e,t,r)}}function Qp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ir(e)}catch(r){Te(t,t.return,r)}}}function Ip(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ir(e)}catch(r){Te(t,t.return,r)}}function Vy(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Gp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Gp),t;default:throw Error(u(435,e.tag))}}function Bl(e,t){var r=Vy(e);t.forEach(function(l){if(!r.has(l)){r.add(l);var o=Wy.bind(null,e,l);l.then(o,o)}})}function Ot(e,t){var r=t.deletions;if(r!==null)for(var l=0;l<r.length;l++){var o=r[l],d=e,g=t,S=g;e:for(;S!==null;){switch(S.tag){case 27:if(ga(S.type)){He=S.stateNode,$t=!1;break e}break;case 5:He=S.stateNode,$t=!1;break e;case 3:case 4:He=S.stateNode.containerInfo,$t=!0;break e}S=S.return}if(He===null)throw Error(u(160));Xp(d,g,o),He=null,$t=!1,d=o.alternate,d!==null&&(d.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Jp(t,e),t=t.sibling}var dn=null;function Jp(e,t){var r=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ot(t,e),Mt(e),l&4&&(ca(3,e,e.return),Iu(3,e),ca(5,e,e.return));break;case 1:Ot(t,e),Mt(e),l&512&&(tt||r===null||yn(r,r.return)),l&64&&qn&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?l:r.concat(l))));break;case 26:var o=dn;if(Ot(t,e),Mt(e),l&512&&(tt||r===null||yn(r,r.return)),l&4){var d=r!==null?r.memoizedState:null;if(l=e.memoizedState,r===null)if(l===null)if(e.stateNode===null){e:{l=e.type,r=e.memoizedProps,o=o.ownerDocument||o;t:switch(l){case"title":d=o.getElementsByTagName("title")[0],(!d||d[Su]||d[bt]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=o.createElement(l),o.head.insertBefore(d,o.querySelector("head > title"))),_t(d,l,r),d[bt]=e,ft(d),l=d;break e;case"link":var g=J1("link","href",o).get(l+(r.href||""));if(g){for(var S=0;S<g.length;S++)if(d=g[S],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){g.splice(S,1);break t}}d=o.createElement(l),_t(d,l,r),o.head.appendChild(d);break;case"meta":if(g=J1("meta","content",o).get(l+(r.content||""))){for(S=0;S<g.length;S++)if(d=g[S],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){g.splice(S,1);break t}}d=o.createElement(l),_t(d,l,r),o.head.appendChild(d);break;default:throw Error(u(468,l))}d[bt]=e,ft(d),l=d}e.stateNode=l}else K1(o,e.type,e.stateNode);else e.stateNode=I1(o,l,e.memoizedProps);else d!==l?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,l===null?K1(o,e.type,e.stateNode):I1(o,l,e.memoizedProps)):l===null&&e.stateNode!==null&&zc(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ot(t,e),Mt(e),l&512&&(tt||r===null||yn(r,r.return)),r!==null&&l&4&&zc(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ot(t,e),Mt(e),l&512&&(tt||r===null||yn(r,r.return)),e.flags&32){o=e.stateNode;try{yr(o,"")}catch(W){Te(e,e.return,W)}}l&4&&e.stateNode!=null&&(o=e.memoizedProps,zc(e,o,r!==null?r.memoizedProps:o)),l&1024&&(Mc=!0);break;case 6:if(Ot(t,e),Mt(e),l&4){if(e.stateNode===null)throw Error(u(162));l=e.memoizedProps,r=e.stateNode;try{r.nodeValue=l}catch(W){Te(e,e.return,W)}}break;case 3:if(es=null,o=dn,dn=Wl(t.containerInfo),Ot(t,e),dn=o,Mt(e),l&4&&r!==null&&r.memoizedState.isDehydrated)try{Ir(t.containerInfo)}catch(W){Te(e,e.return,W)}Mc&&(Mc=!1,Kp(e));break;case 4:l=dn,dn=Wl(e.stateNode.containerInfo),Ot(t,e),Mt(e),dn=l;break;case 12:Ot(t,e),Mt(e);break;case 31:Ot(t,e),Mt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Bl(e,l)));break;case 13:Ot(t,e),Mt(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Fl=Ut()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Bl(e,l)));break;case 22:o=e.memoizedState!==null;var k=r!==null&&r.memoizedState!==null,N=qn,F=tt;if(qn=N||o,tt=F||k,Ot(t,e),tt=F,qn=N,Mt(e),l&8192)e:for(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,o&&(r===null||k||qn||tt||Ia(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){k=r=t;try{if(d=k.stateNode,o)g=d.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{S=k.stateNode;var L=k.memoizedProps.style,j=L!=null&&L.hasOwnProperty("display")?L.display:null;S.style.display=j==null||typeof j=="boolean"?"":(""+j).trim()}}catch(W){Te(k,k.return,W)}}}else if(t.tag===6){if(r===null){k=t;try{k.stateNode.nodeValue=o?"":k.memoizedProps}catch(W){Te(k,k.return,W)}}}else if(t.tag===18){if(r===null){k=t;try{var B=k.stateNode;o?F1(B,!0):F1(k.stateNode,!1)}catch(W){Te(k,k.return,W)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}l&4&&(l=e.updateQueue,l!==null&&(r=l.retryQueue,r!==null&&(l.retryQueue=null,Bl(e,r))));break;case 19:Ot(t,e),Mt(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Bl(e,l)));break;case 30:break;case 21:break;default:Ot(t,e),Mt(e)}}function Mt(e){var t=e.flags;if(t&2){try{for(var r,l=e.return;l!==null;){if(Lp(l)){r=l;break}l=l.return}if(r==null)throw Error(u(160));switch(r.tag){case 27:var o=r.stateNode,d=$c(e);Ul(e,d,o);break;case 5:var g=r.stateNode;r.flags&32&&(yr(g,""),r.flags&=-33);var S=$c(e);Ul(e,S,g);break;case 3:case 4:var k=r.stateNode.containerInfo,N=$c(e);Oc(e,N,k);break;default:throw Error(u(161))}}catch(F){Te(e,e.return,F)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Kp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Hn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Yp(e,t.alternate,t),t=t.sibling}function Ia(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ca(4,t,t.return),Ia(t);break;case 1:yn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Fp(t,t.return,r),Ia(t);break;case 27:ui(t.stateNode);case 26:case 5:yn(t,t.return),Ia(t);break;case 22:t.memoizedState===null&&Ia(t);break;case 30:Ia(t);break;default:Ia(t)}e=e.sibling}}function Ln(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var l=t.alternate,o=e,d=t,g=d.flags;switch(d.tag){case 0:case 11:case 15:Ln(o,d,r),Iu(4,d);break;case 1:if(Ln(o,d,r),l=d,o=l.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(N){Te(l,l.return,N)}if(l=d,o=l.updateQueue,o!==null){var S=l.stateNode;try{var k=o.shared.hiddenCallbacks;if(k!==null)for(o.shared.hiddenCallbacks=null,o=0;o<k.length;o++)Dh(k[o],S)}catch(N){Te(l,l.return,N)}}r&&g&64&&qp(d),Ju(d,d.return);break;case 27:Vp(d);case 26:case 5:Ln(o,d,r),r&&l===null&&g&4&&Hp(d),Ju(d,d.return);break;case 12:Ln(o,d,r);break;case 31:Ln(o,d,r),r&&g&4&&Qp(o,d);break;case 13:Ln(o,d,r),r&&g&4&&Ip(o,d);break;case 22:d.memoizedState===null&&Ln(o,d,r),Ju(d,d.return);break;case 30:break;default:Ln(o,d,r)}t=t.sibling}}function Nc(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&ju(r))}function Rc(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ju(e))}function fn(e,t,r,l){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Wp(e,t,r,l),t=t.sibling}function Wp(e,t,r,l){var o=t.flags;switch(t.tag){case 0:case 11:case 15:fn(e,t,r,l),o&2048&&Iu(9,t);break;case 1:fn(e,t,r,l);break;case 3:fn(e,t,r,l),o&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ju(e)));break;case 12:if(o&2048){fn(e,t,r,l),e=t.stateNode;try{var d=t.memoizedProps,g=d.id,S=d.onPostCommit;typeof S=="function"&&S(g,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(k){Te(t,t.return,k)}}else fn(e,t,r,l);break;case 31:fn(e,t,r,l);break;case 13:fn(e,t,r,l);break;case 23:break;case 22:d=t.stateNode,g=t.alternate,t.memoizedState!==null?d._visibility&2?fn(e,t,r,l):Ku(e,t):d._visibility&2?fn(e,t,r,l):(d._visibility|=2,Br(e,t,r,l,(t.subtreeFlags&10256)!==0||!1)),o&2048&&Nc(g,t);break;case 24:fn(e,t,r,l),o&2048&&Rc(t.alternate,t);break;default:fn(e,t,r,l)}}function Br(e,t,r,l,o){for(o=o&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,g=t,S=r,k=l,N=g.flags;switch(g.tag){case 0:case 11:case 15:Br(d,g,S,k,o),Iu(8,g);break;case 23:break;case 22:var F=g.stateNode;g.memoizedState!==null?F._visibility&2?Br(d,g,S,k,o):Ku(d,g):(F._visibility|=2,Br(d,g,S,k,o)),o&&N&2048&&Nc(g.alternate,g);break;case 24:Br(d,g,S,k,o),o&&N&2048&&Rc(g.alternate,g);break;default:Br(d,g,S,k,o)}t=t.sibling}}function Ku(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,l=t,o=l.flags;switch(l.tag){case 22:Ku(r,l),o&2048&&Nc(l.alternate,l);break;case 24:Ku(r,l),o&2048&&Rc(l.alternate,l);break;default:Ku(r,l)}t=t.sibling}}var Wu=8192;function qr(e,t,r){if(e.subtreeFlags&Wu)for(e=e.child;e!==null;)Pp(e,t,r),e=e.sibling}function Pp(e,t,r){switch(e.tag){case 26:qr(e,t,r),e.flags&Wu&&e.memoizedState!==null&&Tv(r,dn,e.memoizedState,e.memoizedProps);break;case 5:qr(e,t,r);break;case 3:case 4:var l=dn;dn=Wl(e.stateNode.containerInfo),qr(e,t,r),dn=l;break;case 22:e.memoizedState===null&&(l=e.alternate,l!==null&&l.memoizedState!==null?(l=Wu,Wu=16777216,qr(e,t,r),Wu=l):qr(e,t,r));break;default:qr(e,t,r)}}function e1(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Pu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];ht=l,n1(l,e)}e1(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)t1(e),e=e.sibling}function t1(e){switch(e.tag){case 0:case 11:case 15:Pu(e),e.flags&2048&&ca(9,e,e.return);break;case 3:Pu(e);break;case 12:Pu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ql(e)):Pu(e);break;default:Pu(e)}}function ql(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var l=t[r];ht=l,n1(l,e)}e1(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ca(8,t,t.return),ql(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,ql(t));break;default:ql(t)}e=e.sibling}}function n1(e,t){for(;ht!==null;){var r=ht;switch(r.tag){case 0:case 11:case 15:ca(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var l=r.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ju(r.memoizedState.cache)}if(l=r.child,l!==null)l.return=r,ht=l;else e:for(r=e;ht!==null;){l=ht;var o=l.sibling,d=l.return;if(Zp(l),l===r){ht=null;break e}if(o!==null){o.return=d,ht=o;break e}ht=d}}}var Gy={getCacheForType:function(e){var t=yt(We),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return yt(We).controller.signal}},Yy=typeof WeakMap=="function"?WeakMap:Map,Ee=0,Me=null,he=null,be=0,De=0,Gt=null,da=!1,Fr=!1,jc=!1,Vn=0,Ye=0,fa=0,Ja=0,Uc=0,Yt=0,Hr=0,ei=null,Nt=null,Bc=!1,Fl=0,a1=0,Hl=1/0,Ll=null,ha=null,it=0,pa=null,Lr=null,Gn=0,qc=0,Fc=null,r1=null,ti=0,Hc=null;function Zt(){return(Ee&2)!==0&&be!==0?be&-be:U.T!==null?Xc():_f()}function u1(){if(Yt===0)if((be&536870912)===0||ve){var e=Ji;Ji<<=1,(Ji&3932160)===0&&(Ji=262144),Yt=e}else Yt=536870912;return e=Lt.current,e!==null&&(e.flags|=32),Yt}function Rt(e,t,r){(e===Me&&(De===2||De===9)||e.cancelPendingCommit!==null)&&(Vr(e,0),ma(e,be,Yt,!1)),wu(e,r),((Ee&2)===0||e!==Me)&&(e===Me&&((Ee&2)===0&&(Ja|=r),Ye===4&&ma(e,be,Yt,!1)),vn(e))}function i1(e,t,r){if((Ee&6)!==0)throw Error(u(327));var l=!r&&(t&127)===0&&(t&e.expiredLanes)===0||xu(e,t),o=l?Qy(e,t):Vc(e,t,!0),d=l;do{if(o===0){Fr&&!l&&ma(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!Zy(r)){o=Vc(e,t,!1),d=!1;continue}if(o===2){if(d=t,e.errorRecoveryDisabledLanes&d)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){t=g;e:{var S=e;o=ei;var k=S.current.memoizedState.isDehydrated;if(k&&(Vr(S,g).flags|=256),g=Vc(S,g,!1),g!==2){if(jc&&!k){S.errorRecoveryDisabledLanes|=d,Ja|=d,o=4;break e}d=Nt,Nt=o,d!==null&&(Nt===null?Nt=d:Nt.push.apply(Nt,d))}o=g}if(d=!1,o!==2)continue}}if(o===1){Vr(e,0),ma(e,t,0,!0);break}e:{switch(l=e,d=o,d){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t)break;case 6:ma(l,t,Yt,!da);break e;case 2:Nt=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(o=Fl+300-Ut(),10<o)){if(ma(l,t,Yt,!da),Wi(l,0,!0)!==0)break e;Gn=t,l.timeoutHandle=U1(l1.bind(null,l,r,Nt,Ll,Bc,t,Yt,Ja,Hr,da,d,"Throttled",-0,0),o);break e}l1(l,r,Nt,Ll,Bc,t,Yt,Ja,Hr,da,d,null,-0,0)}}break}while(!0);vn(e)}function l1(e,t,r,l,o,d,g,S,k,N,F,L,j,B){if(e.timeoutHandle=-1,L=t.subtreeFlags,L&8192||(L&16785408)===16785408){L={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Tn},Pp(t,d,L);var W=(d&62914560)===d?Fl-Ut():(d&4194048)===d?a1-Ut():0;if(W=zv(L,W),W!==null){Gn=d,e.cancelPendingCommit=W(m1.bind(null,e,t,d,r,l,o,g,S,k,F,L,null,j,B)),ma(e,d,g,!N);return}}m1(e,t,d,r,l,o,g,S,k)}function Zy(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var l=0;l<r.length;l++){var o=r[l],d=o.getSnapshot;o=o.value;try{if(!Ft(d(),o))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ma(e,t,r,l){t&=~Uc,t&=~Ja,e.suspendedLanes|=t,e.pingedLanes&=~t,l&&(e.warmLanes|=t),l=e.expirationTimes;for(var o=t;0<o;){var d=31-qt(o),g=1<<d;l[d]=-1,o&=~g}r!==0&&gf(e,r,t)}function Vl(){return(Ee&6)===0?(ni(0),!1):!0}function Lc(){if(he!==null){if(De===0)var e=he.return;else e=he,Mn=Ha=null,rc(e),Mr=null,Bu=0,e=he;for(;e!==null;)Bp(e.alternate,e),e=e.return;he=null}}function Vr(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,fv(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Gn=0,Lc(),Me=e,he=r=$n(e.current,null),be=t,De=0,Gt=null,da=!1,Fr=xu(e,t),jc=!1,Hr=Yt=Uc=Ja=fa=Ye=0,Nt=ei=null,Bc=!1,(t&8)!==0&&(t|=t&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=t;0<l;){var o=31-qt(l),d=1<<o;t|=e[o],l&=~d}return Vn=t,cl(),r}function s1(e,t){le=null,U.H=Zu,t===Or||t===yl?(t=Ch(),De=3):t===Zo?(t=Ch(),De=4):De=t===_c?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Gt=t,he===null&&(Ye=1,Ol(e,tn(t,e.current)))}function o1(){var e=Lt.current;return e===null?!0:(be&4194048)===be?un===null:(be&62914560)===be||(be&536870912)!==0?e===un:!1}function c1(){var e=U.H;return U.H=Zu,e===null?Zu:e}function d1(){var e=U.A;return U.A=Gy,e}function Gl(){Ye=4,da||(be&4194048)!==be&&Lt.current!==null||(Fr=!0),(fa&134217727)===0&&(Ja&134217727)===0||Me===null||ma(Me,be,Yt,!1)}function Vc(e,t,r){var l=Ee;Ee|=2;var o=c1(),d=d1();(Me!==e||be!==t)&&(Ll=null,Vr(e,t)),t=!1;var g=Ye;e:do try{if(De!==0&&he!==null){var S=he,k=Gt;switch(De){case 8:Lc(),g=6;break e;case 3:case 2:case 9:case 6:Lt.current===null&&(t=!0);var N=De;if(De=0,Gt=null,Gr(e,S,k,N),r&&Fr){g=0;break e}break;default:N=De,De=0,Gt=null,Gr(e,S,k,N)}}Xy(),g=Ye;break}catch(F){s1(e,F)}while(!0);return t&&e.shellSuspendCounter++,Mn=Ha=null,Ee=l,U.H=o,U.A=d,he===null&&(Me=null,be=0,cl()),g}function Xy(){for(;he!==null;)f1(he)}function Qy(e,t){var r=Ee;Ee|=2;var l=c1(),o=d1();Me!==e||be!==t?(Ll=null,Hl=Ut()+500,Vr(e,t)):Fr=xu(e,t);e:do try{if(De!==0&&he!==null){t=he;var d=Gt;t:switch(De){case 1:De=0,Gt=null,Gr(e,t,d,1);break;case 2:case 9:if(wh(d)){De=0,Gt=null,h1(t);break}t=function(){De!==2&&De!==9||Me!==e||(De=7),vn(e)},d.then(t,t);break e;case 3:De=7;break e;case 4:De=5;break e;case 7:wh(d)?(De=0,Gt=null,h1(t)):(De=0,Gt=null,Gr(e,t,d,7));break;case 5:var g=null;switch(he.tag){case 26:g=he.memoizedState;case 5:case 27:var S=he;if(g?W1(g):S.stateNode.complete){De=0,Gt=null;var k=S.sibling;if(k!==null)he=k;else{var N=S.return;N!==null?(he=N,Yl(N)):he=null}break t}}De=0,Gt=null,Gr(e,t,d,5);break;case 6:De=0,Gt=null,Gr(e,t,d,6);break;case 8:Lc(),Ye=6;break e;default:throw Error(u(462))}}Iy();break}catch(F){s1(e,F)}while(!0);return Mn=Ha=null,U.H=l,U.A=o,Ee=r,he!==null?0:(Me=null,be=0,cl(),Ye)}function Iy(){for(;he!==null&&!y2();)f1(he)}function f1(e){var t=jp(e.alternate,e,Vn);e.memoizedProps=e.pendingProps,t===null?Yl(e):he=t}function h1(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=zp(r,t,t.pendingProps,t.type,void 0,be);break;case 11:t=zp(r,t,t.pendingProps,t.type.render,t.ref,be);break;case 5:rc(t);default:Bp(r,t),t=he=dh(t,Vn),t=jp(r,t,Vn)}e.memoizedProps=e.pendingProps,t===null?Yl(e):he=t}function Gr(e,t,r,l){Mn=Ha=null,rc(t),Mr=null,Bu=0;var o=t.return;try{if(Uy(e,o,t,r,be)){Ye=1,Ol(e,tn(r,e.current)),he=null;return}}catch(d){if(o!==null)throw he=o,d;Ye=1,Ol(e,tn(r,e.current)),he=null;return}t.flags&32768?(ve||l===1?e=!0:Fr||(be&536870912)!==0?e=!1:(da=e=!0,(l===2||l===9||l===3||l===6)&&(l=Lt.current,l!==null&&l.tag===13&&(l.flags|=16384))),p1(t,e)):Yl(t)}function Yl(e){var t=e;do{if((t.flags&32768)!==0){p1(t,da);return}e=t.return;var r=Fy(t.alternate,t,Vn);if(r!==null){he=r;return}if(t=t.sibling,t!==null){he=t;return}he=t=e}while(t!==null);Ye===0&&(Ye=5)}function p1(e,t){do{var r=Hy(e.alternate,e);if(r!==null){r.flags&=32767,he=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){he=e;return}he=e=r}while(e!==null);Ye=6,he=null}function m1(e,t,r,l,o,d,g,S,k){e.cancelPendingCommit=null;do Zl();while(it!==0);if((Ee&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));if(d=t.lanes|t.childLanes,d|=$o,D2(e,r,d,g,S,k),e===Me&&(he=Me=null,be=0),Lr=t,pa=e,Gn=r,qc=d,Fc=o,r1=l,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Py(Qi,function(){return _1(),null})):(e.callbackNode=null,e.callbackPriority=0),l=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||l){l=U.T,U.T=null,o=X.p,X.p=2,g=Ee,Ee|=4;try{Ly(e,t,r)}finally{Ee=g,X.p=o,U.T=l}}it=1,b1(),g1(),y1()}}function b1(){if(it===1){it=0;var e=pa,t=Lr,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=U.T,U.T=null;var l=X.p;X.p=2;var o=Ee;Ee|=4;try{Jp(t,e);var d=t0,g=nh(e.containerInfo),S=d.focusedElem,k=d.selectionRange;if(g!==S&&S&&S.ownerDocument&&th(S.ownerDocument.documentElement,S)){if(k!==null&&ko(S)){var N=k.start,F=k.end;if(F===void 0&&(F=N),"selectionStart"in S)S.selectionStart=N,S.selectionEnd=Math.min(F,S.value.length);else{var L=S.ownerDocument||document,j=L&&L.defaultView||window;if(j.getSelection){var B=j.getSelection(),W=S.textContent.length,ae=Math.min(k.start,W),Oe=k.end===void 0?ae:Math.min(k.end,W);!B.extend&&ae>Oe&&(g=Oe,Oe=ae,ae=g);var O=eh(S,ae),T=eh(S,Oe);if(O&&T&&(B.rangeCount!==1||B.anchorNode!==O.node||B.anchorOffset!==O.offset||B.focusNode!==T.node||B.focusOffset!==T.offset)){var M=L.createRange();M.setStart(O.node,O.offset),B.removeAllRanges(),ae>Oe?(B.addRange(M),B.extend(T.node,T.offset)):(M.setEnd(T.node,T.offset),B.addRange(M))}}}}for(L=[],B=S;B=B.parentNode;)B.nodeType===1&&L.push({element:B,left:B.scrollLeft,top:B.scrollTop});for(typeof S.focus=="function"&&S.focus(),S=0;S<L.length;S++){var H=L[S];H.element.scrollLeft=H.left,H.element.scrollTop=H.top}}rs=!!e0,t0=e0=null}finally{Ee=o,X.p=l,U.T=r}}e.current=t,it=2}}function g1(){if(it===2){it=0;var e=pa,t=Lr,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=U.T,U.T=null;var l=X.p;X.p=2;var o=Ee;Ee|=4;try{Yp(e,t.alternate,t)}finally{Ee=o,X.p=l,U.T=r}}it=3}}function y1(){if(it===4||it===3){it=0,v2();var e=pa,t=Lr,r=Gn,l=r1;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?it=5:(it=0,Lr=pa=null,v1(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(ha=null),io(r),t=t.stateNode,Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(_u,t,void 0,(t.current.flags&128)===128)}catch{}if(l!==null){t=U.T,o=X.p,X.p=2,U.T=null;try{for(var d=e.onRecoverableError,g=0;g<l.length;g++){var S=l[g];d(S.value,{componentStack:S.stack})}}finally{U.T=t,X.p=o}}(Gn&3)!==0&&Zl(),vn(e),o=e.pendingLanes,(r&261930)!==0&&(o&42)!==0?e===Hc?ti++:(ti=0,Hc=e):ti=0,ni(0)}}function v1(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ju(t)))}function Zl(){return b1(),g1(),y1(),_1()}function _1(){if(it!==5)return!1;var e=pa,t=qc;qc=0;var r=io(Gn),l=U.T,o=X.p;try{X.p=32>r?32:r,U.T=null,r=Fc,Fc=null;var d=pa,g=Gn;if(it=0,Lr=pa=null,Gn=0,(Ee&6)!==0)throw Error(u(331));var S=Ee;if(Ee|=4,t1(d.current),Wp(d,d.current,g,r),Ee=S,ni(0,!1),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(_u,d)}catch{}return!0}finally{X.p=o,U.T=l,v1(e,t)}}function x1(e,t,r){t=tn(r,t),t=vc(e.stateNode,t,2),e=la(e,t,2),e!==null&&(wu(e,2),vn(e))}function Te(e,t,r){if(e.tag===3)x1(e,e,r);else for(;t!==null;){if(t.tag===3){x1(t,e,r);break}else if(t.tag===1){var l=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(ha===null||!ha.has(l))){e=tn(r,e),r=wp(2),l=la(t,r,2),l!==null&&(Sp(r,l,t,e),wu(l,2),vn(l));break}}t=t.return}}function Gc(e,t,r){var l=e.pingCache;if(l===null){l=e.pingCache=new Yy;var o=new Set;l.set(t,o)}else o=l.get(t),o===void 0&&(o=new Set,l.set(t,o));o.has(r)||(jc=!0,o.add(r),e=Jy.bind(null,e,t,r),t.then(e,e))}function Jy(e,t,r){var l=e.pingCache;l!==null&&l.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Me===e&&(be&r)===r&&(Ye===4||Ye===3&&(be&62914560)===be&&300>Ut()-Fl?(Ee&2)===0&&Vr(e,0):Uc|=r,Hr===be&&(Hr=0)),vn(e)}function w1(e,t){t===0&&(t=bf()),e=Ba(e,t),e!==null&&(wu(e,t),vn(e))}function Ky(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),w1(e,r)}function Wy(e,t){var r=0;switch(e.tag){case 31:case 13:var l=e.stateNode,o=e.memoizedState;o!==null&&(r=o.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(u(314))}l!==null&&l.delete(t),w1(e,r)}function Py(e,t){return no(e,t)}var Xl=null,Yr=null,Yc=!1,Ql=!1,Zc=!1,ba=0;function vn(e){e!==Yr&&e.next===null&&(Yr===null?Xl=Yr=e:Yr=Yr.next=e),Ql=!0,Yc||(Yc=!0,tv())}function ni(e,t){if(!Zc&&Ql){Zc=!0;do for(var r=!1,l=Xl;l!==null;){if(e!==0){var o=l.pendingLanes;if(o===0)var d=0;else{var g=l.suspendedLanes,S=l.pingedLanes;d=(1<<31-qt(42|e)+1)-1,d&=o&~(g&~S),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,k1(l,d))}else d=be,d=Wi(l,l===Me?d:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(d&3)===0||xu(l,d)||(r=!0,k1(l,d));l=l.next}while(r);Zc=!1}}function ev(){S1()}function S1(){Ql=Yc=!1;var e=0;ba!==0&&dv()&&(e=ba);for(var t=Ut(),r=null,l=Xl;l!==null;){var o=l.next,d=C1(l,t);d===0?(l.next=null,r===null?Xl=o:r.next=o,o===null&&(Yr=r)):(r=l,(e!==0||(d&3)!==0)&&(Ql=!0)),l=o}it!==0&&it!==5||ni(e),ba!==0&&(ba=0)}function C1(e,t){for(var r=e.suspendedLanes,l=e.pingedLanes,o=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var g=31-qt(d),S=1<<g,k=o[g];k===-1?((S&r)===0||(S&l)!==0)&&(o[g]=A2(S,t)):k<=t&&(e.expiredLanes|=S),d&=~S}if(t=Me,r=be,r=Wi(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l=e.callbackNode,r===0||e===t&&(De===2||De===9)||e.cancelPendingCommit!==null)return l!==null&&l!==null&&ao(l),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||xu(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(l!==null&&ao(l),io(r)){case 2:case 8:r=pf;break;case 32:r=Qi;break;case 268435456:r=mf;break;default:r=Qi}return l=E1.bind(null,e),r=no(r,l),e.callbackPriority=t,e.callbackNode=r,t}return l!==null&&l!==null&&ao(l),e.callbackPriority=2,e.callbackNode=null,2}function E1(e,t){if(it!==0&&it!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(Zl()&&e.callbackNode!==r)return null;var l=be;return l=Wi(e,e===Me?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),l===0?null:(i1(e,l,t),C1(e,Ut()),e.callbackNode!=null&&e.callbackNode===r?E1.bind(null,e):null)}function k1(e,t){if(Zl())return null;i1(e,t,!0)}function tv(){hv(function(){(Ee&6)!==0?no(hf,ev):S1()})}function Xc(){if(ba===0){var e=zr;e===0&&(e=Ii,Ii<<=1,(Ii&261888)===0&&(Ii=256)),ba=e}return ba}function A1(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:nl(""+e)}function D1(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function nv(e,t,r,l,o){if(t==="submit"&&r&&r.stateNode===o){var d=A1((o[Tt]||null).action),g=l.submitter;g&&(t=(t=g[Tt]||null)?A1(t.formAction):g.getAttribute("formAction"),t!==null&&(d=t,g=null));var S=new il("action","action",null,l,o);e.push({event:S,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ba!==0){var k=g?D1(o,g):new FormData(o);hc(r,{pending:!0,data:k,method:o.method,action:d},null,k)}}else typeof d=="function"&&(S.preventDefault(),k=g?D1(o,g):new FormData(o),hc(r,{pending:!0,data:k,method:o.method,action:d},d,k))},currentTarget:o}]})}}for(var Qc=0;Qc<zo.length;Qc++){var Ic=zo[Qc],av=Ic.toLowerCase(),rv=Ic[0].toUpperCase()+Ic.slice(1);cn(av,"on"+rv)}cn(uh,"onAnimationEnd"),cn(ih,"onAnimationIteration"),cn(lh,"onAnimationStart"),cn("dblclick","onDoubleClick"),cn("focusin","onFocus"),cn("focusout","onBlur"),cn(_y,"onTransitionRun"),cn(xy,"onTransitionStart"),cn(wy,"onTransitionCancel"),cn(sh,"onTransitionEnd"),br("onMouseEnter",["mouseout","mouseover"]),br("onMouseLeave",["mouseout","mouseover"]),br("onPointerEnter",["pointerout","pointerover"]),br("onPointerLeave",["pointerout","pointerover"]),Na("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Na("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Na("onBeforeInput",["compositionend","keypress","textInput","paste"]),Na("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Na("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Na("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ai="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),uv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ai));function T1(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var l=e[r],o=l.event;l=l.listeners;e:{var d=void 0;if(t)for(var g=l.length-1;0<=g;g--){var S=l[g],k=S.instance,N=S.currentTarget;if(S=S.listener,k!==d&&o.isPropagationStopped())break e;d=S,o.currentTarget=N;try{d(o)}catch(F){ol(F)}o.currentTarget=null,d=k}else for(g=0;g<l.length;g++){if(S=l[g],k=S.instance,N=S.currentTarget,S=S.listener,k!==d&&o.isPropagationStopped())break e;d=S,o.currentTarget=N;try{d(o)}catch(F){ol(F)}o.currentTarget=null,d=k}}}}function pe(e,t){var r=t[lo];r===void 0&&(r=t[lo]=new Set);var l=e+"__bubble";r.has(l)||(z1(t,e,2,!1),r.add(l))}function Jc(e,t,r){var l=0;t&&(l|=4),z1(r,e,l,t)}var Il="_reactListening"+Math.random().toString(36).slice(2);function Kc(e){if(!e[Il]){e[Il]=!0,Sf.forEach(function(r){r!=="selectionchange"&&(uv.has(r)||Jc(r,!1,e),Jc(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Il]||(t[Il]=!0,Jc("selectionchange",!1,t))}}function z1(e,t,r,l){switch(um(t)){case 2:var o=Mv;break;case 8:o=Nv;break;default:o=f0}r=o.bind(null,t,r,e),o=void 0,!go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),l?o!==void 0?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):o!==void 0?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function Wc(e,t,r,l,o){var d=l;if((t&1)===0&&(t&2)===0&&l!==null)e:for(;;){if(l===null)return;var g=l.tag;if(g===3||g===4){var S=l.stateNode.containerInfo;if(S===o)break;if(g===4)for(g=l.return;g!==null;){var k=g.tag;if((k===3||k===4)&&g.stateNode.containerInfo===o)return;g=g.return}for(;S!==null;){if(g=hr(S),g===null)return;if(k=g.tag,k===5||k===6||k===26||k===27){l=d=g;continue e}S=S.parentNode}}l=l.return}Rf(function(){var N=d,F=mo(r),L=[];e:{var j=oh.get(e);if(j!==void 0){var B=il,W=e;switch(e){case"keypress":if(rl(r)===0)break e;case"keydown":case"keyup":B=W2;break;case"focusin":W="focus",B=xo;break;case"focusout":W="blur",B=xo;break;case"beforeblur":case"afterblur":B=xo;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=Bf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=F2;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=ty;break;case uh:case ih:case lh:B=V2;break;case sh:B=ay;break;case"scroll":case"scrollend":B=B2;break;case"wheel":B=uy;break;case"copy":case"cut":case"paste":B=Y2;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=Ff;break;case"toggle":case"beforetoggle":B=ly}var ae=(t&4)!==0,Oe=!ae&&(e==="scroll"||e==="scrollend"),O=ae?j!==null?j+"Capture":null:j;ae=[];for(var T=N,M;T!==null;){var H=T;if(M=H.stateNode,H=H.tag,H!==5&&H!==26&&H!==27||M===null||O===null||(H=Eu(T,O),H!=null&&ae.push(ri(T,H,M))),Oe)break;T=T.return}0<ae.length&&(j=new B(j,W,null,r,F),L.push({event:j,listeners:ae}))}}if((t&7)===0){e:{if(j=e==="mouseover"||e==="pointerover",B=e==="mouseout"||e==="pointerout",j&&r!==po&&(W=r.relatedTarget||r.fromElement)&&(hr(W)||W[fr]))break e;if((B||j)&&(j=F.window===F?F:(j=F.ownerDocument)?j.defaultView||j.parentWindow:window,B?(W=r.relatedTarget||r.toElement,B=N,W=W?hr(W):null,W!==null&&(Oe=c(W),ae=W.tag,W!==Oe||ae!==5&&ae!==27&&ae!==6)&&(W=null)):(B=null,W=N),B!==W)){if(ae=Bf,H="onMouseLeave",O="onMouseEnter",T="mouse",(e==="pointerout"||e==="pointerover")&&(ae=Ff,H="onPointerLeave",O="onPointerEnter",T="pointer"),Oe=B==null?j:Cu(B),M=W==null?j:Cu(W),j=new ae(H,T+"leave",B,r,F),j.target=Oe,j.relatedTarget=M,H=null,hr(F)===N&&(ae=new ae(O,T+"enter",W,r,F),ae.target=M,ae.relatedTarget=Oe,H=ae),Oe=H,B&&W)t:{for(ae=iv,O=B,T=W,M=0,H=O;H;H=ae(H))M++;H=0;for(var ne=T;ne;ne=ae(ne))H++;for(;0<M-H;)O=ae(O),M--;for(;0<H-M;)T=ae(T),H--;for(;M--;){if(O===T||T!==null&&O===T.alternate){ae=O;break t}O=ae(O),T=ae(T)}ae=null}else ae=null;B!==null&&$1(L,j,B,ae,!1),W!==null&&Oe!==null&&$1(L,Oe,W,ae,!0)}}e:{if(j=N?Cu(N):window,B=j.nodeName&&j.nodeName.toLowerCase(),B==="select"||B==="input"&&j.type==="file")var Se=Qf;else if(Zf(j))if(If)Se=gy;else{Se=my;var ee=py}else B=j.nodeName,!B||B.toLowerCase()!=="input"||j.type!=="checkbox"&&j.type!=="radio"?N&&ho(N.elementType)&&(Se=Qf):Se=by;if(Se&&(Se=Se(e,N))){Xf(L,Se,r,F);break e}ee&&ee(e,j,N),e==="focusout"&&N&&j.type==="number"&&N.memoizedProps.value!=null&&fo(j,"number",j.value)}switch(ee=N?Cu(N):window,e){case"focusin":(Zf(ee)||ee.contentEditable==="true")&&(wr=ee,Ao=N,Mu=null);break;case"focusout":Mu=Ao=wr=null;break;case"mousedown":Do=!0;break;case"contextmenu":case"mouseup":case"dragend":Do=!1,ah(L,r,F);break;case"selectionchange":if(vy)break;case"keydown":case"keyup":ah(L,r,F)}var se;if(So)e:{switch(e){case"compositionstart":var ge="onCompositionStart";break e;case"compositionend":ge="onCompositionEnd";break e;case"compositionupdate":ge="onCompositionUpdate";break e}ge=void 0}else xr?Gf(e,r)&&(ge="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(ge="onCompositionStart");ge&&(Hf&&r.locale!=="ko"&&(xr||ge!=="onCompositionStart"?ge==="onCompositionEnd"&&xr&&(se=jf()):(ea=F,yo="value"in ea?ea.value:ea.textContent,xr=!0)),ee=Jl(N,ge),0<ee.length&&(ge=new qf(ge,e,null,r,F),L.push({event:ge,listeners:ee}),se?ge.data=se:(se=Yf(r),se!==null&&(ge.data=se)))),(se=oy?cy(e,r):dy(e,r))&&(ge=Jl(N,"onBeforeInput"),0<ge.length&&(ee=new qf("onBeforeInput","beforeinput",null,r,F),L.push({event:ee,listeners:ge}),ee.data=se)),nv(L,e,N,r,F)}T1(L,t)})}function ri(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Jl(e,t){for(var r=t+"Capture",l=[];e!==null;){var o=e,d=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||d===null||(o=Eu(e,r),o!=null&&l.unshift(ri(e,o,d)),o=Eu(e,t),o!=null&&l.push(ri(e,o,d))),e.tag===3)return l;e=e.return}return[]}function iv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function $1(e,t,r,l,o){for(var d=t._reactName,g=[];r!==null&&r!==l;){var S=r,k=S.alternate,N=S.stateNode;if(S=S.tag,k!==null&&k===l)break;S!==5&&S!==26&&S!==27||N===null||(k=N,o?(N=Eu(r,d),N!=null&&g.unshift(ri(r,N,k))):o||(N=Eu(r,d),N!=null&&g.push(ri(r,N,k)))),r=r.return}g.length!==0&&e.push({event:t,listeners:g})}var lv=/\r\n?/g,sv=/\u0000|\uFFFD/g;function O1(e){return(typeof e=="string"?e:""+e).replace(lv,`
`).replace(sv,"")}function M1(e,t){return t=O1(t),O1(e)===t}function $e(e,t,r,l,o,d){switch(r){case"children":typeof l=="string"?t==="body"||t==="textarea"&&l===""||yr(e,l):(typeof l=="number"||typeof l=="bigint")&&t!=="body"&&yr(e,""+l);break;case"className":el(e,"class",l);break;case"tabIndex":el(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":el(e,r,l);break;case"style":Mf(e,l,d);break;case"data":if(t!=="object"){el(e,"data",l);break}case"src":case"href":if(l===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(r);break}l=nl(""+l),e.setAttribute(r,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&$e(e,t,"name",o.name,o,null),$e(e,t,"formEncType",o.formEncType,o,null),$e(e,t,"formMethod",o.formMethod,o,null),$e(e,t,"formTarget",o.formTarget,o,null)):($e(e,t,"encType",o.encType,o,null),$e(e,t,"method",o.method,o,null),$e(e,t,"target",o.target,o,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(r);break}l=nl(""+l),e.setAttribute(r,l);break;case"onClick":l!=null&&(e.onclick=Tn);break;case"onScroll":l!=null&&pe("scroll",e);break;case"onScrollEnd":l!=null&&pe("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(u(61));if(r=l.__html,r!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=r}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}r=nl(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,""+l):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":l===!0?e.setAttribute(r,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(r,l):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(r,l):e.removeAttribute(r);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(r):e.setAttribute(r,l);break;case"popover":pe("beforetoggle",e),pe("toggle",e),Pi(e,"popover",l);break;case"xlinkActuate":Dn(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Dn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Dn(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Dn(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Dn(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Dn(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Dn(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Dn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Dn(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Pi(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=j2.get(r)||r,Pi(e,r,l))}}function Pc(e,t,r,l,o,d){switch(r){case"style":Mf(e,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(u(61));if(r=l.__html,r!=null){if(o.children!=null)throw Error(u(60));e.innerHTML=r}}break;case"children":typeof l=="string"?yr(e,l):(typeof l=="number"||typeof l=="bigint")&&yr(e,""+l);break;case"onScroll":l!=null&&pe("scroll",e);break;case"onScrollEnd":l!=null&&pe("scrollend",e);break;case"onClick":l!=null&&(e.onclick=Tn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Cf.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(o=r.endsWith("Capture"),t=r.slice(2,o?r.length-7:void 0),d=e[Tt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,o),typeof l=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,l,o);break e}r in e?e[r]=l:l===!0?e.setAttribute(r,""):Pi(e,r,l)}}}function _t(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":pe("error",e),pe("load",e);var l=!1,o=!1,d;for(d in r)if(r.hasOwnProperty(d)){var g=r[d];if(g!=null)switch(d){case"src":l=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:$e(e,t,d,g,r,null)}}o&&$e(e,t,"srcSet",r.srcSet,r,null),l&&$e(e,t,"src",r.src,r,null);return;case"input":pe("invalid",e);var S=d=g=o=null,k=null,N=null;for(l in r)if(r.hasOwnProperty(l)){var F=r[l];if(F!=null)switch(l){case"name":o=F;break;case"type":g=F;break;case"checked":k=F;break;case"defaultChecked":N=F;break;case"value":d=F;break;case"defaultValue":S=F;break;case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(u(137,t));break;default:$e(e,t,l,F,r,null)}}Tf(e,d,S,k,N,g,o,!1);return;case"select":pe("invalid",e),l=g=d=null;for(o in r)if(r.hasOwnProperty(o)&&(S=r[o],S!=null))switch(o){case"value":d=S;break;case"defaultValue":g=S;break;case"multiple":l=S;default:$e(e,t,o,S,r,null)}t=d,r=g,e.multiple=!!l,t!=null?gr(e,!!l,t,!1):r!=null&&gr(e,!!l,r,!0);return;case"textarea":pe("invalid",e),d=o=l=null;for(g in r)if(r.hasOwnProperty(g)&&(S=r[g],S!=null))switch(g){case"value":l=S;break;case"defaultValue":o=S;break;case"children":d=S;break;case"dangerouslySetInnerHTML":if(S!=null)throw Error(u(91));break;default:$e(e,t,g,S,r,null)}$f(e,l,o,d);return;case"option":for(k in r)if(r.hasOwnProperty(k)&&(l=r[k],l!=null))switch(k){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:$e(e,t,k,l,r,null)}return;case"dialog":pe("beforetoggle",e),pe("toggle",e),pe("cancel",e),pe("close",e);break;case"iframe":case"object":pe("load",e);break;case"video":case"audio":for(l=0;l<ai.length;l++)pe(ai[l],e);break;case"image":pe("error",e),pe("load",e);break;case"details":pe("toggle",e);break;case"embed":case"source":case"link":pe("error",e),pe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(N in r)if(r.hasOwnProperty(N)&&(l=r[N],l!=null))switch(N){case"children":case"dangerouslySetInnerHTML":throw Error(u(137,t));default:$e(e,t,N,l,r,null)}return;default:if(ho(t)){for(F in r)r.hasOwnProperty(F)&&(l=r[F],l!==void 0&&Pc(e,t,F,l,r,void 0));return}}for(S in r)r.hasOwnProperty(S)&&(l=r[S],l!=null&&$e(e,t,S,l,r,null))}function ov(e,t,r,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,d=null,g=null,S=null,k=null,N=null,F=null;for(B in r){var L=r[B];if(r.hasOwnProperty(B)&&L!=null)switch(B){case"checked":break;case"value":break;case"defaultValue":k=L;default:l.hasOwnProperty(B)||$e(e,t,B,null,l,L)}}for(var j in l){var B=l[j];if(L=r[j],l.hasOwnProperty(j)&&(B!=null||L!=null))switch(j){case"type":d=B;break;case"name":o=B;break;case"checked":N=B;break;case"defaultChecked":F=B;break;case"value":g=B;break;case"defaultValue":S=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(u(137,t));break;default:B!==L&&$e(e,t,j,B,l,L)}}co(e,g,S,k,N,F,d,o);return;case"select":B=g=S=j=null;for(d in r)if(k=r[d],r.hasOwnProperty(d)&&k!=null)switch(d){case"value":break;case"multiple":B=k;default:l.hasOwnProperty(d)||$e(e,t,d,null,l,k)}for(o in l)if(d=l[o],k=r[o],l.hasOwnProperty(o)&&(d!=null||k!=null))switch(o){case"value":j=d;break;case"defaultValue":S=d;break;case"multiple":g=d;default:d!==k&&$e(e,t,o,d,l,k)}t=S,r=g,l=B,j!=null?gr(e,!!r,j,!1):!!l!=!!r&&(t!=null?gr(e,!!r,t,!0):gr(e,!!r,r?[]:"",!1));return;case"textarea":B=j=null;for(S in r)if(o=r[S],r.hasOwnProperty(S)&&o!=null&&!l.hasOwnProperty(S))switch(S){case"value":break;case"children":break;default:$e(e,t,S,null,l,o)}for(g in l)if(o=l[g],d=r[g],l.hasOwnProperty(g)&&(o!=null||d!=null))switch(g){case"value":j=o;break;case"defaultValue":B=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(u(91));break;default:o!==d&&$e(e,t,g,o,l,d)}zf(e,j,B);return;case"option":for(var W in r)if(j=r[W],r.hasOwnProperty(W)&&j!=null&&!l.hasOwnProperty(W))switch(W){case"selected":e.selected=!1;break;default:$e(e,t,W,null,l,j)}for(k in l)if(j=l[k],B=r[k],l.hasOwnProperty(k)&&j!==B&&(j!=null||B!=null))switch(k){case"selected":e.selected=j&&typeof j!="function"&&typeof j!="symbol";break;default:$e(e,t,k,j,l,B)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ae in r)j=r[ae],r.hasOwnProperty(ae)&&j!=null&&!l.hasOwnProperty(ae)&&$e(e,t,ae,null,l,j);for(N in l)if(j=l[N],B=r[N],l.hasOwnProperty(N)&&j!==B&&(j!=null||B!=null))switch(N){case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(u(137,t));break;default:$e(e,t,N,j,l,B)}return;default:if(ho(t)){for(var Oe in r)j=r[Oe],r.hasOwnProperty(Oe)&&j!==void 0&&!l.hasOwnProperty(Oe)&&Pc(e,t,Oe,void 0,l,j);for(F in l)j=l[F],B=r[F],!l.hasOwnProperty(F)||j===B||j===void 0&&B===void 0||Pc(e,t,F,j,l,B);return}}for(var O in r)j=r[O],r.hasOwnProperty(O)&&j!=null&&!l.hasOwnProperty(O)&&$e(e,t,O,null,l,j);for(L in l)j=l[L],B=r[L],!l.hasOwnProperty(L)||j===B||j==null&&B==null||$e(e,t,L,j,l,B)}function N1(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function cv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),l=0;l<r.length;l++){var o=r[l],d=o.transferSize,g=o.initiatorType,S=o.duration;if(d&&S&&N1(g)){for(g=0,S=o.responseEnd,l+=1;l<r.length;l++){var k=r[l],N=k.startTime;if(N>S)break;var F=k.transferSize,L=k.initiatorType;F&&N1(L)&&(k=k.responseEnd,g+=F*(k<S?1:(S-N)/(k-N)))}if(--l,t+=8*(d+g)/(o.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var e0=null,t0=null;function Kl(e){return e.nodeType===9?e:e.ownerDocument}function R1(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function j1(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function n0(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var a0=null;function dv(){var e=window.event;return e&&e.type==="popstate"?e===a0?!1:(a0=e,!0):(a0=null,!1)}var U1=typeof setTimeout=="function"?setTimeout:void 0,fv=typeof clearTimeout=="function"?clearTimeout:void 0,B1=typeof Promise=="function"?Promise:void 0,hv=typeof queueMicrotask=="function"?queueMicrotask:typeof B1<"u"?function(e){return B1.resolve(null).then(e).catch(pv)}:U1;function pv(e){setTimeout(function(){throw e})}function ga(e){return e==="head"}function q1(e,t){var r=t,l=0;do{var o=r.nextSibling;if(e.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"||r==="/&"){if(l===0){e.removeChild(o),Ir(t);return}l--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")l++;else if(r==="html")ui(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,ui(r);for(var d=r.firstChild;d;){var g=d.nextSibling,S=d.nodeName;d[Su]||S==="SCRIPT"||S==="STYLE"||S==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=g}}else r==="body"&&ui(e.ownerDocument.body);r=o}while(r);Ir(t)}function F1(e,t){var r=e;e=0;do{var l=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),l&&l.nodeType===8)if(r=l.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=l}while(r)}function r0(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":r0(r),so(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function mv(e,t,r,l){for(;e.nodeType===1;){var o=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Su])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=ln(e.nextSibling),e===null)break}return null}function bv(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=ln(e.nextSibling),e===null))return null;return e}function H1(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ln(e.nextSibling),e===null))return null;return e}function u0(e){return e.data==="$?"||e.data==="$~"}function i0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function gv(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var l=function(){t(),r.removeEventListener("DOMContentLoaded",l)};r.addEventListener("DOMContentLoaded",l),e._reactRetry=l}}function ln(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var l0=null;function L1(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return ln(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function V1(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function G1(e,t,r){switch(t=Kl(r),e){case"html":if(e=t.documentElement,!e)throw Error(u(452));return e;case"head":if(e=t.head,!e)throw Error(u(453));return e;case"body":if(e=t.body,!e)throw Error(u(454));return e;default:throw Error(u(451))}}function ui(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);so(e)}var sn=new Map,Y1=new Set;function Wl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Yn=X.d;X.d={f:yv,r:vv,D:_v,C:xv,L:wv,m:Sv,X:Ev,S:Cv,M:kv};function yv(){var e=Yn.f(),t=Vl();return e||t}function vv(e){var t=pr(e);t!==null&&t.tag===5&&t.type==="form"?sp(t):Yn.r(e)}var Zr=typeof document>"u"?null:document;function Z1(e,t,r){var l=Zr;if(l&&typeof t=="string"&&t){var o=Pt(t);o='link[rel="'+e+'"][href="'+o+'"]',typeof r=="string"&&(o+='[crossorigin="'+r+'"]'),Y1.has(o)||(Y1.add(o),e={rel:e,crossOrigin:r,href:t},l.querySelector(o)===null&&(t=l.createElement("link"),_t(t,"link",e),ft(t),l.head.appendChild(t)))}}function _v(e){Yn.D(e),Z1("dns-prefetch",e,null)}function xv(e,t){Yn.C(e,t),Z1("preconnect",e,t)}function wv(e,t,r){Yn.L(e,t,r);var l=Zr;if(l&&e&&t){var o='link[rel="preload"][as="'+Pt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(o+='[imagesrcset="'+Pt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(o+='[imagesizes="'+Pt(r.imageSizes)+'"]')):o+='[href="'+Pt(e)+'"]';var d=o;switch(t){case"style":d=Xr(e);break;case"script":d=Qr(e)}sn.has(d)||(e=p({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),sn.set(d,e),l.querySelector(o)!==null||t==="style"&&l.querySelector(ii(d))||t==="script"&&l.querySelector(li(d))||(t=l.createElement("link"),_t(t,"link",e),ft(t),l.head.appendChild(t)))}}function Sv(e,t){Yn.m(e,t);var r=Zr;if(r&&e){var l=t&&typeof t.as=="string"?t.as:"script",o='link[rel="modulepreload"][as="'+Pt(l)+'"][href="'+Pt(e)+'"]',d=o;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Qr(e)}if(!sn.has(d)&&(e=p({rel:"modulepreload",href:e},t),sn.set(d,e),r.querySelector(o)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(li(d)))return}l=r.createElement("link"),_t(l,"link",e),ft(l),r.head.appendChild(l)}}}function Cv(e,t,r){Yn.S(e,t,r);var l=Zr;if(l&&e){var o=mr(l).hoistableStyles,d=Xr(e);t=t||"default";var g=o.get(d);if(!g){var S={loading:0,preload:null};if(g=l.querySelector(ii(d)))S.loading=5;else{e=p({rel:"stylesheet",href:e,"data-precedence":t},r),(r=sn.get(d))&&s0(e,r);var k=g=l.createElement("link");ft(k),_t(k,"link",e),k._p=new Promise(function(N,F){k.onload=N,k.onerror=F}),k.addEventListener("load",function(){S.loading|=1}),k.addEventListener("error",function(){S.loading|=2}),S.loading|=4,Pl(g,t,l)}g={type:"stylesheet",instance:g,count:1,state:S},o.set(d,g)}}}function Ev(e,t){Yn.X(e,t);var r=Zr;if(r&&e){var l=mr(r).hoistableScripts,o=Qr(e),d=l.get(o);d||(d=r.querySelector(li(o)),d||(e=p({src:e,async:!0},t),(t=sn.get(o))&&o0(e,t),d=r.createElement("script"),ft(d),_t(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(o,d))}}function kv(e,t){Yn.M(e,t);var r=Zr;if(r&&e){var l=mr(r).hoistableScripts,o=Qr(e),d=l.get(o);d||(d=r.querySelector(li(o)),d||(e=p({src:e,async:!0,type:"module"},t),(t=sn.get(o))&&o0(e,t),d=r.createElement("script"),ft(d),_t(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(o,d))}}function X1(e,t,r,l){var o=(o=fe.current)?Wl(o):null;if(!o)throw Error(u(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Xr(r.href),r=mr(o).hoistableStyles,l=r.get(t),l||(l={type:"style",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Xr(r.href);var d=mr(o).hoistableStyles,g=d.get(e);if(g||(o=o.ownerDocument||o,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,g),(d=o.querySelector(ii(e)))&&!d._p&&(g.instance=d,g.state.loading=5),sn.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},sn.set(e,r),d||Av(o,e,r,g.state))),t&&l===null)throw Error(u(528,""));return g}if(t&&l!==null)throw Error(u(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Qr(r),r=mr(o).hoistableScripts,l=r.get(t),l||(l={type:"script",instance:null,count:0,state:null},r.set(t,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(u(444,e))}}function Xr(e){return'href="'+Pt(e)+'"'}function ii(e){return'link[rel="stylesheet"]['+e+"]"}function Q1(e){return p({},e,{"data-precedence":e.precedence,precedence:null})}function Av(e,t,r,l){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?l.loading=1:(t=e.createElement("link"),l.preload=t,t.addEventListener("load",function(){return l.loading|=1}),t.addEventListener("error",function(){return l.loading|=2}),_t(t,"link",r),ft(t),e.head.appendChild(t))}function Qr(e){return'[src="'+Pt(e)+'"]'}function li(e){return"script[async]"+e}function I1(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var l=e.querySelector('style[data-href~="'+Pt(r.href)+'"]');if(l)return t.instance=l,ft(l),l;var o=p({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),ft(l),_t(l,"style",o),Pl(l,r.precedence,e),t.instance=l;case"stylesheet":o=Xr(r.href);var d=e.querySelector(ii(o));if(d)return t.state.loading|=4,t.instance=d,ft(d),d;l=Q1(r),(o=sn.get(o))&&s0(l,o),d=(e.ownerDocument||e).createElement("link"),ft(d);var g=d;return g._p=new Promise(function(S,k){g.onload=S,g.onerror=k}),_t(d,"link",l),t.state.loading|=4,Pl(d,r.precedence,e),t.instance=d;case"script":return d=Qr(r.src),(o=e.querySelector(li(d)))?(t.instance=o,ft(o),o):(l=r,(o=sn.get(d))&&(l=p({},r),o0(l,o)),e=e.ownerDocument||e,o=e.createElement("script"),ft(o),_t(o,"link",l),e.head.appendChild(o),t.instance=o);case"void":return null;default:throw Error(u(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(l=t.instance,t.state.loading|=4,Pl(l,r.precedence,e));return t.instance}function Pl(e,t,r){for(var l=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=l.length?l[l.length-1]:null,d=o,g=0;g<l.length;g++){var S=l[g];if(S.dataset.precedence===t)d=S;else if(d!==o)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function s0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function o0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var es=null;function J1(e,t,r){if(es===null){var l=new Map,o=es=new Map;o.set(r,l)}else o=es,l=o.get(r),l||(l=new Map,o.set(r,l));if(l.has(e))return l;for(l.set(e,null),r=r.getElementsByTagName(e),o=0;o<r.length;o++){var d=r[o];if(!(d[Su]||d[bt]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var g=d.getAttribute(t)||"";g=e+g;var S=l.get(g);S?S.push(d):l.set(g,[d])}}return l}function K1(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function Dv(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function W1(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Tv(e,t,r,l){if(r.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var o=Xr(l.href),d=t.querySelector(ii(o));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=ts.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,ft(d);return}d=t.ownerDocument||t,l=Q1(l),(o=sn.get(o))&&s0(l,o),d=d.createElement("link"),ft(d);var g=d;g._p=new Promise(function(S,k){g.onload=S,g.onerror=k}),_t(d,"link",l),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=ts.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var c0=0;function zv(e,t){return e.stylesheets&&e.count===0&&as(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var l=setTimeout(function(){if(e.stylesheets&&as(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&c0===0&&(c0=62500*cv());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&as(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>c0?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(l),clearTimeout(o)}}:null}function ts(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)as(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ns=null;function as(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ns=new Map,t.forEach($v,e),ns=null,ts.call(e))}function $v(e,t){if(!(t.state.loading&4)){var r=ns.get(e);if(r)var l=r.get(null);else{r=new Map,ns.set(e,r);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<o.length;d++){var g=o[d];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(r.set(g.dataset.precedence,g),l=g)}l&&r.set(null,l)}o=t.instance,g=o.getAttribute("data-precedence"),d=r.get(g)||l,d===l&&r.set(null,o),r.set(g,o),this.count++,l=ts.bind(this),o.addEventListener("load",l),o.addEventListener("error",l),d?d.parentNode.insertBefore(o,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),t.state.loading|=4}}var si={$$typeof:R,Provider:null,Consumer:null,_currentValue:te,_currentValue2:te,_threadCount:0};function Ov(e,t,r,l,o,d,g,S,k){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ro(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ro(0),this.hiddenUpdates=ro(null),this.identifierPrefix=l,this.onUncaughtError=o,this.onCaughtError=d,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=k,this.incompleteTransitions=new Map}function P1(e,t,r,l,o,d,g,S,k,N,F,L){return e=new Ov(e,t,r,g,k,N,F,L,S),t=1,d===!0&&(t|=24),d=Ht(3,null,null,t),e.current=d,d.stateNode=e,t=Vo(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:l,isDehydrated:r,cache:t},Xo(d),e}function em(e){return e?(e=Er,e):Er}function tm(e,t,r,l,o,d){o=em(o),l.context===null?l.context=o:l.pendingContext=o,l=ia(t),l.payload={element:r},d=d===void 0?null:d,d!==null&&(l.callback=d),r=la(e,l,t),r!==null&&(Rt(r,e,t),Fu(r,e,t))}function nm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function d0(e,t){nm(e,t),(e=e.alternate)&&nm(e,t)}function am(e){if(e.tag===13||e.tag===31){var t=Ba(e,67108864);t!==null&&Rt(t,e,67108864),d0(e,67108864)}}function rm(e){if(e.tag===13||e.tag===31){var t=Zt();t=uo(t);var r=Ba(e,t);r!==null&&Rt(r,e,t),d0(e,t)}}var rs=!0;function Mv(e,t,r,l){var o=U.T;U.T=null;var d=X.p;try{X.p=2,f0(e,t,r,l)}finally{X.p=d,U.T=o}}function Nv(e,t,r,l){var o=U.T;U.T=null;var d=X.p;try{X.p=8,f0(e,t,r,l)}finally{X.p=d,U.T=o}}function f0(e,t,r,l){if(rs){var o=h0(l);if(o===null)Wc(e,t,l,us,r),im(e,l);else if(jv(o,e,t,r,l))l.stopPropagation();else if(im(e,l),t&4&&-1<Rv.indexOf(e)){for(;o!==null;){var d=pr(o);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var g=Ma(d.pendingLanes);if(g!==0){var S=d;for(S.pendingLanes|=2,S.entangledLanes|=2;g;){var k=1<<31-qt(g);S.entanglements[1]|=k,g&=~k}vn(d),(Ee&6)===0&&(Hl=Ut()+500,ni(0))}}break;case 31:case 13:S=Ba(d,2),S!==null&&Rt(S,d,2),Vl(),d0(d,2)}if(d=h0(l),d===null&&Wc(e,t,l,us,r),d===o)break;o=d}o!==null&&l.stopPropagation()}else Wc(e,t,l,null,r)}}function h0(e){return e=mo(e),p0(e)}var us=null;function p0(e){if(us=null,e=hr(e),e!==null){var t=c(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=h(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return us=e,null}function um(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(_2()){case hf:return 2;case pf:return 8;case Qi:case x2:return 32;case mf:return 268435456;default:return 32}default:return 32}}var m0=!1,ya=null,va=null,_a=null,oi=new Map,ci=new Map,xa=[],Rv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function im(e,t){switch(e){case"focusin":case"focusout":ya=null;break;case"dragenter":case"dragleave":va=null;break;case"mouseover":case"mouseout":_a=null;break;case"pointerover":case"pointerout":oi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ci.delete(t.pointerId)}}function di(e,t,r,l,o,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:l,nativeEvent:d,targetContainers:[o]},t!==null&&(t=pr(t),t!==null&&am(t)),e):(e.eventSystemFlags|=l,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function jv(e,t,r,l,o){switch(t){case"focusin":return ya=di(ya,e,t,r,l,o),!0;case"dragenter":return va=di(va,e,t,r,l,o),!0;case"mouseover":return _a=di(_a,e,t,r,l,o),!0;case"pointerover":var d=o.pointerId;return oi.set(d,di(oi.get(d)||null,e,t,r,l,o)),!0;case"gotpointercapture":return d=o.pointerId,ci.set(d,di(ci.get(d)||null,e,t,r,l,o)),!0}return!1}function lm(e){var t=hr(e.target);if(t!==null){var r=c(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,xf(e.priority,function(){rm(r)});return}}else if(t===31){if(t=h(r),t!==null){e.blockedOn=t,xf(e.priority,function(){rm(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function is(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=h0(e.nativeEvent);if(r===null){r=e.nativeEvent;var l=new r.constructor(r.type,r);po=l,r.target.dispatchEvent(l),po=null}else return t=pr(r),t!==null&&am(t),e.blockedOn=r,!1;t.shift()}return!0}function sm(e,t,r){is(e)&&r.delete(t)}function Uv(){m0=!1,ya!==null&&is(ya)&&(ya=null),va!==null&&is(va)&&(va=null),_a!==null&&is(_a)&&(_a=null),oi.forEach(sm),ci.forEach(sm)}function ls(e,t){e.blockedOn===t&&(e.blockedOn=null,m0||(m0=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Uv)))}var ss=null;function om(e){ss!==e&&(ss=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){ss===e&&(ss=null);for(var t=0;t<e.length;t+=3){var r=e[t],l=e[t+1],o=e[t+2];if(typeof l!="function"){if(p0(l||r)===null)continue;break}var d=pr(r);d!==null&&(e.splice(t,3),t-=3,hc(d,{pending:!0,data:o,method:r.method,action:l},l,o))}}))}function Ir(e){function t(k){return ls(k,e)}ya!==null&&ls(ya,e),va!==null&&ls(va,e),_a!==null&&ls(_a,e),oi.forEach(t),ci.forEach(t);for(var r=0;r<xa.length;r++){var l=xa[r];l.blockedOn===e&&(l.blockedOn=null)}for(;0<xa.length&&(r=xa[0],r.blockedOn===null);)lm(r),r.blockedOn===null&&xa.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(l=0;l<r.length;l+=3){var o=r[l],d=r[l+1],g=o[Tt]||null;if(typeof d=="function")g||om(r);else if(g){var S=null;if(d&&d.hasAttribute("formAction")){if(o=d,g=d[Tt]||null)S=g.formAction;else if(p0(o)!==null)continue}else S=g.action;typeof S=="function"?r[l+1]=S:(r.splice(l,3),l-=3),om(r)}}}function cm(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(g){return o=g})},focusReset:"manual",scroll:"manual"})}function t(){o!==null&&(o(),o=null),l||setTimeout(r,20)}function r(){if(!l&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){l=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),o!==null&&(o(),o=null)}}}function b0(e){this._internalRoot=e}os.prototype.render=b0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(u(409));var r=t.current,l=Zt();tm(r,l,e,t,null,null)},os.prototype.unmount=b0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;tm(e.current,2,null,e,null,null),Vl(),t[fr]=null}};function os(e){this._internalRoot=e}os.prototype.unstable_scheduleHydration=function(e){if(e){var t=_f();e={blockedOn:null,target:e,priority:t};for(var r=0;r<xa.length&&t!==0&&t<xa[r].priority;r++);xa.splice(r,0,e),r===0&&lm(e)}};var dm=a.version;if(dm!=="19.2.3")throw Error(u(527,dm,"19.2.3"));X.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=m(t),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var Bv={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var cs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!cs.isDisabled&&cs.supportsFiber)try{_u=cs.inject(Bv),Bt=cs}catch{}}return wi.createRoot=function(e,t){if(!s(e))throw Error(u(299));var r=!1,l="",o=yp,d=vp,g=_p;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(g=t.onRecoverableError)),t=P1(e,1,!1,null,null,r,l,null,o,d,g,cm),e[fr]=t.current,Kc(e),new b0(t)},wi.hydrateRoot=function(e,t,r){if(!s(e))throw Error(u(299));var l=!1,o="",d=yp,g=vp,S=_p,k=null;return r!=null&&(r.unstable_strictMode===!0&&(l=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(g=r.onCaughtError),r.onRecoverableError!==void 0&&(S=r.onRecoverableError),r.formState!==void 0&&(k=r.formState)),t=P1(e,1,!0,t,r??null,l,o,k,d,g,S,cm),t.context=em(null),r=t.current,l=Zt(),l=uo(l),o=ia(l),o.callback=null,la(r,o,l),r=l,t.current.lanes=r,wu(t,r),vn(t),e[fr]=t.current,Kc(e),new os(t)},wi.version="19.2.3",wi}var mb;function N4(){if(mb)return I0.exports;mb=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),I0.exports=M4(),I0.exports}var R4=N4(),Fe=Yd();const j4=E4(Fe),U4=Fv({__proto__:null,default:j4},[Fe]);const B4=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),q4=n=>n.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,i,u)=>u?u.toUpperCase():i.toLowerCase()),bb=n=>{const a=q4(n);return a.charAt(0).toUpperCase()+a.slice(1)},qg=(...n)=>n.filter((a,i,u)=>!!a&&a.trim()!==""&&u.indexOf(a)===i).join(" ").trim(),F4=n=>{for(const a in n)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};var H4={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const L4=Fe.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:u,className:s="",children:c,iconNode:f,...h},b)=>Fe.createElement("svg",{ref:b,...H4,width:a,height:a,stroke:n,strokeWidth:u?Number(i)*24/Number(a):i,className:qg("lucide",s),...!c&&!F4(h)&&{"aria-hidden":"true"},...h},[...f.map(([m,y])=>Fe.createElement(m,y)),...Array.isArray(c)?c:[c]]));const Zd=(n,a)=>{const i=Fe.forwardRef(({className:u,...s},c)=>Fe.createElement(L4,{ref:c,iconNode:a,className:qg(`lucide-${B4(bb(n))}`,`lucide-${n}`,u),...s}));return i.displayName=bb(n),i};const V4=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],G4=Zd("keyboard",V4);const Y4=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],gb=Zd("mic",Y4);const Z4=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],X4=Zd("send",Z4);function yb(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function Q4(...n){return a=>{let i=!1;const u=n.map(s=>{const c=yb(s,a);return!i&&typeof c=="function"&&(i=!0),c});if(i)return()=>{for(let s=0;s<u.length;s++){const c=u[s];typeof c=="function"?c():yb(n[s],null)}}}}var I4=Symbol.for("react.lazy"),Rs=U4[" use ".trim().toString()];function J4(n){return typeof n=="object"&&n!==null&&"then"in n}function Fg(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===I4&&"_payload"in n&&J4(n._payload)}function K4(n){const a=P4(n),i=Fe.forwardRef((u,s)=>{let{children:c,...f}=u;Fg(c)&&typeof Rs=="function"&&(c=Rs(c._payload));const h=Fe.Children.toArray(c),b=h.find(t5);if(b){const m=b.props.children,y=h.map(p=>p===b?Fe.Children.count(m)>1?Fe.Children.only(null):Fe.isValidElement(m)?m.props.children:null:p);return Ne.jsx(a,{...f,ref:s,children:Fe.isValidElement(m)?Fe.cloneElement(m,void 0,y):null})}return Ne.jsx(a,{...f,ref:s,children:c})});return i.displayName=`${n}.Slot`,i}var W4=K4("Slot");function P4(n){const a=Fe.forwardRef((i,u)=>{let{children:s,...c}=i;if(Fg(s)&&typeof Rs=="function"&&(s=Rs(s._payload)),Fe.isValidElement(s)){const f=a5(s),h=n5(c,s.props);return s.type!==Fe.Fragment&&(h.ref=u?Q4(u,f):f),Fe.cloneElement(s,h)}return Fe.Children.count(s)>1?Fe.Children.only(null):null});return a.displayName=`${n}.SlotClone`,a}var e5=Symbol("radix.slottable");function t5(n){return Fe.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===e5}function n5(n,a){const i={...a};for(const u in a){const s=n[u],c=a[u];/^on[A-Z]/.test(u)?s&&c?i[u]=(...h)=>{const b=c(...h);return s(...h),b}:s&&(i[u]=s):u==="style"?i[u]={...s,...c}:u==="className"&&(i[u]=[s,c].filter(Boolean).join(" "))}return{...n,...i}}function a5(n){let a=Object.getOwnPropertyDescriptor(n.props,"ref")?.get,i=a&&"isReactWarning"in a&&a.isReactWarning;return i?n.ref:(a=Object.getOwnPropertyDescriptor(n,"ref")?.get,i=a&&"isReactWarning"in a&&a.isReactWarning,i?n.props.ref:n.props.ref||n.ref)}function Hg(n){var a,i,u="";if(typeof n=="string"||typeof n=="number")u+=n;else if(typeof n=="object")if(Array.isArray(n)){var s=n.length;for(a=0;a<s;a++)n[a]&&(i=Hg(n[a]))&&(u&&(u+=" "),u+=i)}else for(i in n)n[i]&&(u&&(u+=" "),u+=i);return u}function Lg(){for(var n,a,i=0,u="",s=arguments.length;i<s;i++)(n=arguments[i])&&(a=Hg(n))&&(u&&(u+=" "),u+=a);return u}const vb=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,_b=Lg,r5=(n,a)=>i=>{var u;if(a?.variants==null)return _b(n,i?.class,i?.className);const{variants:s,defaultVariants:c}=a,f=Object.keys(s).map(m=>{const y=i?.[m],p=c?.[m];if(y===null)return null;const _=vb(y)||vb(p);return s[m][_]}),h=i&&Object.entries(i).reduce((m,y)=>{let[p,_]=y;return _===void 0||(m[p]=_),m},{}),b=a==null||(u=a.compoundVariants)===null||u===void 0?void 0:u.reduce((m,y)=>{let{class:p,className:_,...x}=y;return Object.entries(x).every(v=>{let[w,C]=v;return Array.isArray(C)?C.includes({...c,...h}[w]):{...c,...h}[w]===C})?[...m,p,_]:m},[]);return _b(n,f,b,i?.class,i?.className)},Xd="-",u5=n=>{const a=l5(n),{conflictingClassGroups:i,conflictingClassGroupModifiers:u}=n;return{getClassGroupId:f=>{const h=f.split(Xd);return h[0]===""&&h.length!==1&&h.shift(),Vg(h,a)||i5(f)},getConflictingClassGroupIds:(f,h)=>{const b=i[f]||[];return h&&u[f]?[...b,...u[f]]:b}}},Vg=(n,a)=>{if(n.length===0)return a.classGroupId;const i=n[0],u=a.nextPart.get(i),s=u?Vg(n.slice(1),u):void 0;if(s)return s;if(a.validators.length===0)return;const c=n.join(Xd);return a.validators.find(({validator:f})=>f(c))?.classGroupId},xb=/^\[(.+)\]$/,i5=n=>{if(xb.test(n)){const a=xb.exec(n)[1],i=a?.substring(0,a.indexOf(":"));if(i)return"arbitrary.."+i}},l5=n=>{const{theme:a,prefix:i}=n,u={nextPart:new Map,validators:[]};return o5(Object.entries(n.classGroups),i).forEach(([c,f])=>{bd(f,u,c,a)}),u},bd=(n,a,i,u)=>{n.forEach(s=>{if(typeof s=="string"){const c=s===""?a:wb(a,s);c.classGroupId=i;return}if(typeof s=="function"){if(s5(s)){bd(s(u),a,i,u);return}a.validators.push({validator:s,classGroupId:i});return}Object.entries(s).forEach(([c,f])=>{bd(f,wb(a,c),i,u)})})},wb=(n,a)=>{let i=n;return a.split(Xd).forEach(u=>{i.nextPart.has(u)||i.nextPart.set(u,{nextPart:new Map,validators:[]}),i=i.nextPart.get(u)}),i},s5=n=>n.isThemeGetter,o5=(n,a)=>a?n.map(([i,u])=>{const s=u.map(c=>typeof c=="string"?a+c:typeof c=="object"?Object.fromEntries(Object.entries(c).map(([f,h])=>[a+f,h])):c);return[i,s]}):n,c5=n=>{if(n<1)return{get:()=>{},set:()=>{}};let a=0,i=new Map,u=new Map;const s=(c,f)=>{i.set(c,f),a++,a>n&&(a=0,u=i,i=new Map)};return{get(c){let f=i.get(c);if(f!==void 0)return f;if((f=u.get(c))!==void 0)return s(c,f),f},set(c,f){i.has(c)?i.set(c,f):s(c,f)}}},Gg="!",d5=n=>{const{separator:a,experimentalParseClassName:i}=n,u=a.length===1,s=a[0],c=a.length,f=h=>{const b=[];let m=0,y=0,p;for(let C=0;C<h.length;C++){let E=h[C];if(m===0){if(E===s&&(u||h.slice(C,C+c)===a)){b.push(h.slice(y,C)),y=C+c;continue}if(E==="/"){p=C;continue}}E==="["?m++:E==="]"&&m--}const _=b.length===0?h:h.substring(y),x=_.startsWith(Gg),v=x?_.substring(1):_,w=p&&p>y?p-y:void 0;return{modifiers:b,hasImportantModifier:x,baseClassName:v,maybePostfixModifierPosition:w}};return i?h=>i({className:h,parseClassName:f}):f},f5=n=>{if(n.length<=1)return n;const a=[];let i=[];return n.forEach(u=>{u[0]==="["?(a.push(...i.sort(),u),i=[]):i.push(u)}),a.push(...i.sort()),a},h5=n=>({cache:c5(n.cacheSize),parseClassName:d5(n),...u5(n)}),p5=/\s+/,m5=(n,a)=>{const{parseClassName:i,getClassGroupId:u,getConflictingClassGroupIds:s}=a,c=[],f=n.trim().split(p5);let h="";for(let b=f.length-1;b>=0;b-=1){const m=f[b],{modifiers:y,hasImportantModifier:p,baseClassName:_,maybePostfixModifierPosition:x}=i(m);let v=!!x,w=u(v?_.substring(0,x):_);if(!w){if(!v){h=m+(h.length>0?" "+h:h);continue}if(w=u(_),!w){h=m+(h.length>0?" "+h:h);continue}v=!1}const C=f5(y).join(":"),E=p?C+Gg:C,q=E+w;if(c.includes(q))continue;c.push(q);const R=s(w,v);for(let z=0;z<R.length;++z){const $=R[z];c.push(E+$)}h=m+(h.length>0?" "+h:h)}return h};function b5(){let n=0,a,i,u="";for(;n<arguments.length;)(a=arguments[n++])&&(i=Yg(a))&&(u&&(u+=" "),u+=i);return u}const Yg=n=>{if(typeof n=="string")return n;let a,i="";for(let u=0;u<n.length;u++)n[u]&&(a=Yg(n[u]))&&(i&&(i+=" "),i+=a);return i};function g5(n,...a){let i,u,s,c=f;function f(b){const m=a.reduce((y,p)=>p(y),n());return i=h5(m),u=i.cache.get,s=i.cache.set,c=h,h(b)}function h(b){const m=u(b);if(m)return m;const y=m5(b,i);return s(b,y),y}return function(){return c(b5.apply(null,arguments))}}const qe=n=>{const a=i=>i[n]||[];return a.isThemeGetter=!0,a},Zg=/^\[(?:([a-z-]+):)?(.+)\]$/i,y5=/^\d+\/\d+$/,v5=new Set(["px","full","screen"]),_5=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,x5=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,w5=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,S5=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,C5=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Qn=n=>uu(n)||v5.has(n)||y5.test(n),Sa=n=>bu(n,"length",O5),uu=n=>!!n&&!Number.isNaN(Number(n)),ed=n=>bu(n,"number",uu),Si=n=>!!n&&Number.isInteger(Number(n)),E5=n=>n.endsWith("%")&&uu(n.slice(0,-1)),oe=n=>Zg.test(n),Ca=n=>_5.test(n),k5=new Set(["length","size","percentage"]),A5=n=>bu(n,k5,Xg),D5=n=>bu(n,"position",Xg),T5=new Set(["image","url"]),z5=n=>bu(n,T5,N5),$5=n=>bu(n,"",M5),Ci=()=>!0,bu=(n,a,i)=>{const u=Zg.exec(n);return u?u[1]?typeof a=="string"?u[1]===a:a.has(u[1]):i(u[2]):!1},O5=n=>x5.test(n)&&!w5.test(n),Xg=()=>!1,M5=n=>S5.test(n),N5=n=>C5.test(n),R5=()=>{const n=qe("colors"),a=qe("spacing"),i=qe("blur"),u=qe("brightness"),s=qe("borderColor"),c=qe("borderRadius"),f=qe("borderSpacing"),h=qe("borderWidth"),b=qe("contrast"),m=qe("grayscale"),y=qe("hueRotate"),p=qe("invert"),_=qe("gap"),x=qe("gradientColorStops"),v=qe("gradientColorStopPositions"),w=qe("inset"),C=qe("margin"),E=qe("opacity"),q=qe("padding"),R=qe("saturate"),z=qe("scale"),$=qe("sepia"),Y=qe("skew"),K=qe("space"),ce=qe("translate"),we=()=>["auto","contain","none"],ut=()=>["auto","hidden","clip","visible","scroll"],Qe=()=>["auto",oe,a],Q=()=>[oe,a],Z=()=>["",Qn,Sa],A=()=>["auto",uu,oe],de=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],U=()=>["solid","dashed","dotted","double","none"],X=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],te=()=>["start","end","center","between","around","evenly","stretch"],me=()=>["","0",oe],ke=()=>["auto","avoid","all","avoid-page","page","left","right","column"],D=()=>[uu,oe];return{cacheSize:500,separator:":",theme:{colors:[Ci],spacing:[Qn,Sa],blur:["none","",Ca,oe],brightness:D(),borderColor:[n],borderRadius:["none","","full",Ca,oe],borderSpacing:Q(),borderWidth:Z(),contrast:D(),grayscale:me(),hueRotate:D(),invert:me(),gap:Q(),gradientColorStops:[n],gradientColorStopPositions:[E5,Sa],inset:Qe(),margin:Qe(),opacity:D(),padding:Q(),saturate:D(),scale:D(),sepia:me(),skew:D(),space:Q(),translate:Q()},classGroups:{aspect:[{aspect:["auto","square","video",oe]}],container:["container"],columns:[{columns:[Ca]}],"break-after":[{"break-after":ke()}],"break-before":[{"break-before":ke()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...de(),oe]}],overflow:[{overflow:ut()}],"overflow-x":[{"overflow-x":ut()}],"overflow-y":[{"overflow-y":ut()}],overscroll:[{overscroll:we()}],"overscroll-x":[{"overscroll-x":we()}],"overscroll-y":[{"overscroll-y":we()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[w]}],"inset-x":[{"inset-x":[w]}],"inset-y":[{"inset-y":[w]}],start:[{start:[w]}],end:[{end:[w]}],top:[{top:[w]}],right:[{right:[w]}],bottom:[{bottom:[w]}],left:[{left:[w]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Si,oe]}],basis:[{basis:Qe()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",oe]}],grow:[{grow:me()}],shrink:[{shrink:me()}],order:[{order:["first","last","none",Si,oe]}],"grid-cols":[{"grid-cols":[Ci]}],"col-start-end":[{col:["auto",{span:["full",Si,oe]},oe]}],"col-start":[{"col-start":A()}],"col-end":[{"col-end":A()}],"grid-rows":[{"grid-rows":[Ci]}],"row-start-end":[{row:["auto",{span:[Si,oe]},oe]}],"row-start":[{"row-start":A()}],"row-end":[{"row-end":A()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",oe]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",oe]}],gap:[{gap:[_]}],"gap-x":[{"gap-x":[_]}],"gap-y":[{"gap-y":[_]}],"justify-content":[{justify:["normal",...te()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...te(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...te(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[q]}],px:[{px:[q]}],py:[{py:[q]}],ps:[{ps:[q]}],pe:[{pe:[q]}],pt:[{pt:[q]}],pr:[{pr:[q]}],pb:[{pb:[q]}],pl:[{pl:[q]}],m:[{m:[C]}],mx:[{mx:[C]}],my:[{my:[C]}],ms:[{ms:[C]}],me:[{me:[C]}],mt:[{mt:[C]}],mr:[{mr:[C]}],mb:[{mb:[C]}],ml:[{ml:[C]}],"space-x":[{"space-x":[K]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[K]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",oe,a]}],"min-w":[{"min-w":[oe,a,"min","max","fit"]}],"max-w":[{"max-w":[oe,a,"none","full","min","max","fit","prose",{screen:[Ca]},Ca]}],h:[{h:[oe,a,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[oe,a,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[oe,a,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[oe,a,"auto","min","max","fit"]}],"font-size":[{text:["base",Ca,Sa]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",ed]}],"font-family":[{font:[Ci]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",oe]}],"line-clamp":[{"line-clamp":["none",uu,ed]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Qn,oe]}],"list-image":[{"list-image":["none",oe]}],"list-style-type":[{list:["none","disc","decimal",oe]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[n]}],"placeholder-opacity":[{"placeholder-opacity":[E]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[n]}],"text-opacity":[{"text-opacity":[E]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...U(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Qn,Sa]}],"underline-offset":[{"underline-offset":["auto",Qn,oe]}],"text-decoration-color":[{decoration:[n]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:Q()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",oe]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",oe]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[E]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...de(),D5]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",A5]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},z5]}],"bg-color":[{bg:[n]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[x]}],"gradient-via":[{via:[x]}],"gradient-to":[{to:[x]}],rounded:[{rounded:[c]}],"rounded-s":[{"rounded-s":[c]}],"rounded-e":[{"rounded-e":[c]}],"rounded-t":[{"rounded-t":[c]}],"rounded-r":[{"rounded-r":[c]}],"rounded-b":[{"rounded-b":[c]}],"rounded-l":[{"rounded-l":[c]}],"rounded-ss":[{"rounded-ss":[c]}],"rounded-se":[{"rounded-se":[c]}],"rounded-ee":[{"rounded-ee":[c]}],"rounded-es":[{"rounded-es":[c]}],"rounded-tl":[{"rounded-tl":[c]}],"rounded-tr":[{"rounded-tr":[c]}],"rounded-br":[{"rounded-br":[c]}],"rounded-bl":[{"rounded-bl":[c]}],"border-w":[{border:[h]}],"border-w-x":[{"border-x":[h]}],"border-w-y":[{"border-y":[h]}],"border-w-s":[{"border-s":[h]}],"border-w-e":[{"border-e":[h]}],"border-w-t":[{"border-t":[h]}],"border-w-r":[{"border-r":[h]}],"border-w-b":[{"border-b":[h]}],"border-w-l":[{"border-l":[h]}],"border-opacity":[{"border-opacity":[E]}],"border-style":[{border:[...U(),"hidden"]}],"divide-x":[{"divide-x":[h]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[h]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[E]}],"divide-style":[{divide:U()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...U()]}],"outline-offset":[{"outline-offset":[Qn,oe]}],"outline-w":[{outline:[Qn,Sa]}],"outline-color":[{outline:[n]}],"ring-w":[{ring:Z()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[n]}],"ring-opacity":[{"ring-opacity":[E]}],"ring-offset-w":[{"ring-offset":[Qn,Sa]}],"ring-offset-color":[{"ring-offset":[n]}],shadow:[{shadow:["","inner","none",Ca,$5]}],"shadow-color":[{shadow:[Ci]}],opacity:[{opacity:[E]}],"mix-blend":[{"mix-blend":[...X(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":X()}],filter:[{filter:["","none"]}],blur:[{blur:[i]}],brightness:[{brightness:[u]}],contrast:[{contrast:[b]}],"drop-shadow":[{"drop-shadow":["","none",Ca,oe]}],grayscale:[{grayscale:[m]}],"hue-rotate":[{"hue-rotate":[y]}],invert:[{invert:[p]}],saturate:[{saturate:[R]}],sepia:[{sepia:[$]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[i]}],"backdrop-brightness":[{"backdrop-brightness":[u]}],"backdrop-contrast":[{"backdrop-contrast":[b]}],"backdrop-grayscale":[{"backdrop-grayscale":[m]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[y]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[E]}],"backdrop-saturate":[{"backdrop-saturate":[R]}],"backdrop-sepia":[{"backdrop-sepia":[$]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[f]}],"border-spacing-x":[{"border-spacing-x":[f]}],"border-spacing-y":[{"border-spacing-y":[f]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",oe]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",oe]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",oe]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[z]}],"scale-x":[{"scale-x":[z]}],"scale-y":[{"scale-y":[z]}],rotate:[{rotate:[Si,oe]}],"translate-x":[{"translate-x":[ce]}],"translate-y":[{"translate-y":[ce]}],"skew-x":[{"skew-x":[Y]}],"skew-y":[{"skew-y":[Y]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",oe]}],accent:[{accent:["auto",n]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",oe]}],"caret-color":[{caret:[n]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":Q()}],"scroll-mx":[{"scroll-mx":Q()}],"scroll-my":[{"scroll-my":Q()}],"scroll-ms":[{"scroll-ms":Q()}],"scroll-me":[{"scroll-me":Q()}],"scroll-mt":[{"scroll-mt":Q()}],"scroll-mr":[{"scroll-mr":Q()}],"scroll-mb":[{"scroll-mb":Q()}],"scroll-ml":[{"scroll-ml":Q()}],"scroll-p":[{"scroll-p":Q()}],"scroll-px":[{"scroll-px":Q()}],"scroll-py":[{"scroll-py":Q()}],"scroll-ps":[{"scroll-ps":Q()}],"scroll-pe":[{"scroll-pe":Q()}],"scroll-pt":[{"scroll-pt":Q()}],"scroll-pr":[{"scroll-pr":Q()}],"scroll-pb":[{"scroll-pb":Q()}],"scroll-pl":[{"scroll-pl":Q()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",oe]}],fill:[{fill:[n,"none"]}],"stroke-w":[{stroke:[Qn,Sa,ed]}],stroke:[{stroke:[n,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},j5=g5(R5);function U5(...n){return j5(Lg(n))}const B5=r5("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),Ss=Fe.forwardRef(({className:n,variant:a,size:i,asChild:u=!1,...s},c)=>{const f=u?W4:"button";return Ne.jsx(f,{className:U5(B5({variant:a,size:i,className:n})),ref:c,...s})});Ss.displayName="Button";function q5(){return Ne.jsx("div",{className:"flex items-center gap-[3px] h-5",children:[...Array(5)].map((n,a)=>Ne.jsx("div",{className:"w-[3px] bg-primary rounded-full animate-voice-wave",style:{animationDelay:`${a*.1}s`,height:"100%"}},a))})}function F5({onSearch:n,isLoading:a,placeholder:i="纽约排名前5的中餐馆"}){const[u,s]=Fe.useState(""),[c,f]=Fe.useState("voice"),[h,b]=Fe.useState(!1),m=x=>{x.preventDefault(),u.trim()&&n(u.trim())},y=()=>{b(!0)},p=()=>{b(!1);const x="北京烤鸭餐厅推荐";s(x),n(x)},_=()=>{f(c==="voice"?"keyboard":"voice")};return Ne.jsx("div",{className:"w-full max-w-md px-4",children:c==="voice"?Ne.jsxs("div",{className:`flex items-center py-3 px-4 card-glass rounded-full transition-all duration-300 ${h?"bg-primary/15 border-primary/50 shadow-[0_0_24px_rgba(139,92,246,0.25)]":""}`,children:[Ne.jsx("div",{className:"flex-1 flex items-center justify-center cursor-pointer select-none gap-2",onTouchStart:y,onTouchEnd:p,onMouseDown:y,onMouseUp:p,onMouseLeave:()=>h&&b(!1),children:h?Ne.jsxs(Ne.Fragment,{children:[Ne.jsx(q5,{}),Ne.jsx("span",{className:"text-sm text-primary font-medium ml-2",children:"松开发送"})]}):Ne.jsxs(Ne.Fragment,{children:[Ne.jsx(gb,{className:"h-4 w-4 text-muted-foreground"}),Ne.jsx("span",{className:"text-sm text-muted-foreground",children:"按住说话"})]})}),Ne.jsx(Ss,{type:"button",variant:"ghost",size:"icon",className:"h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary ml-2",onClick:_,disabled:a,children:Ne.jsx(G4,{className:"h-4 w-4"})})]}):Ne.jsxs("form",{onSubmit:m,className:"flex items-center py-2 pl-4 pr-2 card-glass rounded-full",children:[Ne.jsx("input",{type:"text",value:u,onChange:x=>s(x.target.value),placeholder:i,className:"flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm",disabled:a,autoFocus:!0}),Ne.jsxs("div",{className:"flex items-center gap-1 ml-2",children:[Ne.jsx(Ss,{type:"button",variant:"ghost",size:"icon",className:"h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",onClick:_,disabled:a,children:Ne.jsx(gb,{className:"h-4 w-4"})}),Ne.jsx(Ss,{type:"submit",size:"icon",className:"btn-primary-gradient rounded-full h-9 w-9 flex-shrink-0",disabled:a||!u.trim(),children:Ne.jsx(X4,{className:"h-4 w-4"})})]})]})})}function H5({onSearch:n,isLoading:a,placeholder:i="纽约排名前5的中餐馆"}){return Ne.jsx(F5,{onSearch:n,isLoading:a,placeholder:i})}class L5 extends HTMLElement{constructor(){super(...arguments),this._isLoading=!1,this._placeholder="纽约排名前5的中餐馆"}connectedCallback(){const a=document.createElement("div");a.style.width="100%",this.appendChild(a),this.root=R4.createRoot(a),this.render()}disconnectedCallback(){this.root?.unmount()}set onSearch(a){this.render(a,this.isLoading,this.placeholder)}set isLoading(a){this.render(this.onSearch,a,this.placeholder)}set placeholder(a){this.render(this.onSearch,this.isLoading,a)}render(a=this._onSearch,i=this._isLoading,u=this._placeholder){this._onSearch=a,this._isLoading=i,this._placeholder=u,this.root?.render(Ne.jsx(H5,{onSearch:a,isLoading:i,placeholder:u}))}}const V5={bubbles:!0,cancelable:!0,composed:!0};class js extends Event{constructor(a,i,u){super(js.eventName,{...V5}),this.action=a,this.value=i,this.callback=u}static{this.eventName="snackbaraction"}}var G5=Object.create,Qd=Object.defineProperty,Y5=Object.getOwnPropertyDescriptor,Qg=(n,a)=>(a=Symbol[n])?a:Symbol.for("Symbol."+n),gu=n=>{throw TypeError(n)},Z5=(n,a,i)=>a in n?Qd(n,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[a]=i,Sb=(n,a)=>Qd(n,"name",{value:a,configurable:!0}),X5=n=>[,,,G5(n?.[Qg("metadata")]??null)],Ig=["class","method","getter","setter","accessor","field","value","get","set"],ki=n=>n!==void 0&&typeof n!="function"?gu("Function expected"):n,Q5=(n,a,i,u,s)=>({kind:Ig[n],name:a,metadata:u,addInitializer:c=>i._?gu("Already initialized"):s.push(ki(c||null))}),I5=(n,a)=>Z5(a,Qg("metadata"),n[3]),rr=(n,a,i,u)=>{for(var s=0,c=n[a>>1],f=c&&c.length;s<f;s++)a&1?c[s].call(i):u=c[s].call(i,u);return u},Js=(n,a,i,u,s,c)=>{var f,h,b,m,y,p=a&7,_=!!(a&8),x=!!(a&16),v=p>3?n.length+1:p?_?1:2:0,w=Ig[p+5],C=p>3&&(n[v-1]=[]),E=n[v]||(n[v]=[]),q=p&&(!x&&!_&&(s=s.prototype),p<5&&(p>3||!x)&&Y5(p<4?s:{get[i](){return nt(this,c)},set[i](z){return gd(this,c,z)}},i));p?x&&p<4&&Sb(c,(p>2?"set ":p>1?"get ":"")+i):Sb(s,i);for(var R=u.length-1;R>=0;R--)m=Q5(p,i,b={},n[3],E),p&&(m.static=_,m.private=x,y=m.access={has:x?z=>J5(s,z):z=>i in z},p^3&&(y.get=x?z=>(p^1?nt:K5)(z,s,p^4?c:q.get):z=>z[i]),p>2&&(y.set=x?(z,$)=>gd(z,s,$,p^4?c:q.set):(z,$)=>z[i]=$)),h=(0,u[R])(p?p<4?x?c:q[w]:p>4?void 0:{get:q.get,set:q.set}:s,m),b._=1,p^4||h===void 0?ki(h)&&(p>4?C.unshift(h):p?x?c=h:q[w]=h:s=h):typeof h!="object"||h===null?gu("Object expected"):(ki(f=h.get)&&(q.get=f),ki(f=h.set)&&(q.set=f),ki(f=h.init)&&C.unshift(f));return p||I5(n,s),q&&Qd(s,i,q),x?p^4?c:q:s},Id=(n,a,i)=>a.has(n)||gu("Cannot "+i),J5=(n,a)=>Object(a)!==a?gu('Cannot use the "in" operator on this value'):n.has(a),nt=(n,a,i)=>(Id(n,a,"read from private field"),i?i.call(n):a.get(n)),Ei=(n,a,i)=>a.has(n)?gu("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(n):a.set(n,i),gd=(n,a,i,u)=>(Id(n,a,"write to private field"),u?u.call(n,i):a.set(n,i),i),K5=(n,a,i)=>(Id(n,a,"access private method"),i),Jg,Kg,Wg,yd,Pg,on,Jd,Kd,Wd,st,Cs;const W5=8e3;Pg=[Xe("ui-snackbar")];class cr extends(yd=sr,Wg=[re({reflect:!0,type:Boolean})],Kg=[re({reflect:!0,type:Boolean})],Jg=[re()],yd){constructor(){super(...arguments),Ei(this,Jd,rr(on,8,this,!1)),rr(on,11,this),Ei(this,Kd,rr(on,12,this,!1)),rr(on,15,this),Ei(this,Wd,rr(on,16,this,W5)),rr(on,19,this),Ei(this,st,[]),Ei(this,Cs,0)}show(a,i=!1){const u=nt(this,st).findIndex(s=>s.id===a.id);return u===-1?(i&&(nt(this,st).length=0),nt(this,st).push(a)):nt(this,st)[u]=a,window.clearTimeout(nt(this,Cs)),nt(this,st).every(s=>s.persistent)||gd(this,Cs,window.setTimeout(()=>{this.hide()},this.timeout)),this.error=nt(this,st).some(s=>s.type===Mi.ERROR),this.active=!0,this.requestUpdate(),a.id}hide(a){if(a){const i=nt(this,st).findIndex(u=>u.id===a);i!==-1&&nt(this,st).splice(i,1)}else nt(this,st).length=0;this.active=nt(this,st).length!==0,this.updateComplete.then(i=>{i&&this.requestUpdate()})}render(){let a=!1,i="";for(let u=nt(this,st).length-1;u>=0;u--)if(!(!nt(this,st)[u].type||nt(this,st)[u].type===Mi.NONE)){i=nt(this,st)[u].type,nt(this,st)[u].type===Mi.PENDING&&(i="progress_activity",a=!0);break}return G` ${i?G`<span
            class=${xe({"g-icon":!0,round:!0,filled:!0,rotate:a})}
            >${i}</span
          >`:I}
      <div id="messages">
        ${Oi(nt(this,st),u=>u.id,u=>G`<div>${u.message}</div>`)}
      </div>
      <div id="actions">
        ${Oi(nt(this,st),u=>u.id,u=>u.actions?G`${Oi(u.actions,s=>s.value,s=>G`<button
                  @click=${()=>{this.hide(),this.dispatchEvent(new js(s.action,s.value,s.callback))}}
                >
                  ${s.title}
                </button>`)}`:I)}
      </div>
      <button
        id="close"
        @click=${()=>{this.hide(),this.dispatchEvent(new js("dismiss"))}}
      >
        <span class="g-icon">close</span>
      </button>`}}on=X5(yd);Jd=new WeakMap;Kd=new WeakMap;Wd=new WeakMap;st=new WeakMap;Cs=new WeakMap;Js(on,4,"active",Wg,cr,Jd);Js(on,4,"error",Kg,cr,Kd);Js(on,4,"timeout",Jg,cr,Wd);cr=Js(on,0,"Snackbar",Pg,cr);cr.styles=[Vi(Nd),Ve`
      :host {
        --text-color: var(--n-0);
        --bb-body-medium: 16px;
        --bb-body-line-height-medium: 24px;

        display: flex;
        align-items: center;
        position: fixed;
        bottom: var(--bb-grid-size-7);
        left: 50%;
        translate: -50% 0;
        opacity: 0;
        pointer-events: none;
        border-radius: var(--bb-grid-size-2);
        background: var(--n-90);
        padding: var(--bb-grid-size-3) var(--bb-grid-size-6);
        width: 60svw;
        max-width: 720px;
        z-index: 1800;
        scrollbar-width: none;
        overflow-x: scroll;
        font: 400 var(--bb-body-medium) / var(--bb-body-line-height-medium)
          var(--bb-font-family);
      }

      :host([active]) {
        transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1) 0.2s;
        opacity: 1;
        pointer-events: auto;
      }

      :host([error]) {
        background: var(--e-90);
        --text-color: var(--e-40);
      }

      .g-icon {
        flex: 0 0 auto;
        color: var(--text-color);
        margin-right: var(--bb-grid-size-4);

        &.rotate {
          animation: 1s linear 0s infinite normal forwards running rotate;
        }
      }

      #messages {
        color: var(--text-color);
        flex: 1 1 auto;
        margin-right: var(--bb-grid-size-11);

        a,
        a:visited {
          color: var(--bb-ui-600);
          text-decoration: none;

          &:hover {
            color: var(--bb-ui-500);
            text-decoration: underline;
          }
        }
      }

      #actions {
        flex: 0 1 auto;
        width: fit-content;
        margin-right: var(--bb-grid-size-3);

        & button {
          font: 500 var(--bb-body-medium) / var(--bb-body-line-height-medium)
            var(--bb-font-family);
          padding: 0;
          background: transparent;
          border: none;
          margin: 0 var(--bb-grid-size-4);
          color: var(--text-color);
          opacity: 0.7;
          transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);

          &:not([disabled]) {
            cursor: pointer;

            &:hover,
            &:focus {
              opacity: 1;
            }
          }
        }
      }

      #close {
        display: flex;
        align-items: center;
        padding: 0;
        color: var(--text-color);
        background: transparent;
        border: none;
        margin: 0 0 0 var(--bb-grid-size-2);
        opacity: 0.7;
        transition: opacity 0.2s cubic-bezier(0, 0, 0.3, 1);

        .g-icon {
          margin-right: 0;
        }

        &:not([disabled]) {
          cursor: pointer;

          &:hover,
          &:focus {
            opacity: 1;
          }
        }
      }

      @keyframes rotate {
        from {
          rotate: 0deg;
        }

        to {
          rotate: 360deg;
        }
      }
    `];rr(on,1,cr);const P5={key:"restaurant",title:"智能订餐助手",heroImage:"/hero.png",heroImageDark:"/hero-dark.png",background:`radial-gradient(
    at 0% 0%,
    light-dark(rgba(161, 196, 253, 0.3), rgba(6, 182, 212, 0.15)) 0px,
    transparent 50%
  ),
  radial-gradient(
    at 100% 0%,
    light-dark(rgba(255, 226, 226, 0.3), rgba(59, 130, 246, 0.15)) 0px,
    transparent 50%
  ),
  radial-gradient(
    at 100% 100%,
    light-dark(rgba(162, 210, 255, 0.3), rgba(20, 184, 166, 0.15)) 0px,
    transparent 50%
  ),
  radial-gradient(
    at 0% 100%,
    light-dark(rgba(255, 200, 221, 0.3), rgba(99, 102, 241, 0.15)) 0px,
    transparent 50%
  ),
  linear-gradient(
    120deg,
    light-dark(#f0f4f8, #0f172a) 0%,
    light-dark(#e2e8f0, #1e293b) 100%
  )`,placeholder:"Find the top 5 most popular Chinese restaurants in New York",loadingText:["正在为你筛选优质好去处...","正在查看真实评价...","正在查询可预订座位...","马上就好..."],serverUrl:"http://localhost:10002"};function e8(){return structuredClone(Bg)}const t8={...e8(),additionalStyles:{Card:{"min-width":"320px","max-width":"400px",margin:"0 auto",background:"linear-gradient(135deg, light-dark(#ffffff99, #ffffff44) 0%, light-dark(#ffffff, #ffffff04) 100%)",border:"1px solid light-dark(transparent, #ffffff35)",boxShadow:"inset 0 20px 48px light-dark(rgba(0, 0, 0, 0.02), rgba(255, 255, 255, 0.08))"},Button:{"--p-70":"light-dark(var(--p-60), var(--n-10))","--n-60":"light-dark(var(--n-100), var(--n-0))"},Image:{"max-width":"120px","max-height":"120px",marginLeft:"auto",marginRight:"auto"},Text:{"--n-40":"light-dark(var(--p-60), var(--n-90))"}},components:{AudioPlayer:{},Button:{"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-5":!0,"layout-pr-5":!0,"border-br-2":!0,"border-bw-0":!0,"border-bs-s":!0,"color-bgc-p30":!0,"color-c-n100":!0,"behavior-ho-70":!0},Card:{"border-br-4":!0,"color-bgc-p100":!0,"layout-pt-10":!0,"layout-pb-10":!0,"layout-pl-4":!0,"layout-pr-4":!0},CheckBox:{element:{"layout-m-0":!0,"layout-mr-2":!0,"layout-p-2":!0,"border-br-12":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0,"color-c-p30":!0},label:{"color-c-p30":!0,"typography-f-sf":!0,"typography-v-r":!0,"typography-w-400":!0,"layout-flx-1":!0,"typography-sz-ll":!0},container:{"layout-dsp-iflex":!0,"layout-al-c":!0}},Column:{},DateTimeInput:{container:{},label:{},element:{"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-3":!0,"layout-pr-3":!0,"border-br-12":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0}},Divider:{"color-bgc-n90":!0,"layout-mt-6":!0,"layout-mb-6":!0},Image:{all:{"border-br-50pc":!0,"layout-el-cv":!0,"layout-w-100":!0,"layout-h-100":!0,"layout-dsp-flexhor":!0,"layout-al-c":!0,"layout-sp-c":!0,"layout-mb-3":!0},avatar:{},header:{},icon:{},largeFeature:{},mediumFeature:{},smallFeature:{}},Icon:{"border-br-1":!0,"layout-p-2":!0,"color-bgc-n98":!0,"layout-dsp-flexhor":!0,"layout-al-c":!0,"layout-sp-c":!0},List:{"layout-g-4":!0,"layout-p-2":!0},Modal:{backdrop:{"color-bbgc-p60_20":!0},element:{"border-br-2":!0,"color-bgc-p100":!0,"layout-p-4":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bc-p80":!0}},MultipleChoice:{container:{},label:{},element:{}},Row:{"layout-g-4":!0,"layout-mb-3":!0},Slider:{container:{},label:{},element:{}},Tabs:{container:{},controls:{all:{},selected:{}},element:{}},Text:{all:{"layout-w-100":!0,"layout-g-2":!0,"color-c-p30":!0},h1:{"typography-f-sf":!0,"typography-ta-c":!0,"typography-v-r":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mr-0":!0,"layout-ml-0":!0,"layout-mb-2":!0,"layout-p-0":!0,"typography-sz-tl":!0},h2:{"typography-f-sf":!0,"typography-ta-c":!0,"typography-v-r":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mr-0":!0,"layout-ml-0":!0,"layout-mb-2":!0,"layout-p-0":!0,"typography-sz-tl":!0},h3:{"typography-f-sf":!0,"typography-ta-c":!0,"typography-v-r":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mr-0":!0,"layout-ml-0":!0,"layout-mb-0":!0,"layout-p-0":!0,"typography-sz-ts":!0},h4:{"typography-f-sf":!0,"typography-ta-c":!0,"typography-v-r":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mr-0":!0,"layout-ml-0":!0,"layout-mb-0":!0,"layout-p-0":!0,"typography-sz-bl":!0},h5:{"typography-f-sf":!0,"typography-ta-c":!0,"typography-v-r":!0,"typography-w-500":!0,"layout-mt-0":!0,"layout-mr-0":!0,"layout-ml-0":!0,"layout-mb-0":!0,"layout-p-0":!0,"color-c-n30":!0,"typography-sz-bm":!0,"layout-mb-1":!0},body:{},caption:{}},TextField:{container:{"typography-sz-bm":!0,"layout-w-100":!0,"layout-g-2":!0,"layout-dsp-flexhor":!0,"layout-al-c":!0},label:{"layout-flx-0":!0},element:{"typography-sz-bm":!0,"layout-pt-2":!0,"layout-pb-2":!0,"layout-pl-3":!0,"layout-pr-3":!0,"border-br-12":!0,"border-bw-1":!0,"border-bs-s":!0,"color-bgc-p100":!0,"color-bc-p60":!0,"color-c-n30":!0,"color-c-p30":!0}},Video:{"border-br-5":!0,"layout-el-cv":!0}}},n8={key:"contacts",title:"Contact Manager",background:`radial-gradient(at 0% 0%, light-dark(rgba(45, 212, 191, 0.4), rgba(20, 184, 166, 0.2)) 0px, transparent 50%),
     radial-gradient(at 100% 0%, light-dark(rgba(56, 189, 248, 0.4), rgba(14, 165, 233, 0.2)) 0px, transparent 50%),
     radial-gradient(at 100% 100%, light-dark(rgba(163, 230, 53, 0.4), rgba(132, 204, 22, 0.2)) 0px, transparent 50%),
     radial-gradient(at 0% 100%, light-dark(rgba(52, 211, 153, 0.4), rgba(16, 185, 129, 0.2)) 0px, transparent 50%),
     linear-gradient(120deg, light-dark(#f0fdf4, #022c22) 0%, light-dark(#dcfce7, #064e3b) 100%)`,placeholder:"Alex Jordan",loadingText:["Searching contacts...","Looking up details...","Verifying information...","Just a moment..."],serverUrl:"http://localhost:10003",theme:t8},a8=`@import"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap";

*,
:before,
:after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style:
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / .5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style:
}

*,
:before,
:after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb
}

:before,
:after {
  --tw-content: ""
}

html,
:host {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  font-family: Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -webkit-tap-highlight-color: transparent
}

body {
  margin: 0;
  line-height: inherit
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px
}

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit
}

a {
  color: inherit;
  text-decoration: inherit
}

b,
strong {
  font-weight: bolder
}

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-feature-settings: normal;
  font-variation-settings: normal;
  font-size: 1em
}

small {
  font-size: 80%
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline
}

sub {
  bottom: -.25em
}

sup {
  top: -.5em
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-feature-settings: inherit;
  font-variation-settings: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: inherit;
  margin: 0;
  padding: 0
}

button,
select {
  text-transform: none
}

button,
input:where([type=button]),
input:where([type=reset]),
input:where([type=submit]) {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none
}

:-moz-focusring {
  outline: auto
}

:-moz-ui-invalid {
  box-shadow: none
}

progress {
  vertical-align: baseline
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto
}

[type=search] {
  -webkit-appearance: textfield;
  outline-offset: -2px
}

::-webkit-search-decoration {
  -webkit-appearance: none
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit
}

summary {
  display: list-item
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0
}

fieldset {
  margin: 0;
  padding: 0
}

legend {
  padding: 0
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0
}

dialog {
  padding: 0
}

textarea {
  resize: vertical
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  opacity: 1;
  color: #9ca3af
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af
}

button,
[role=button] {
  cursor: pointer
}

:disabled {
  cursor: default
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle
}

img,
video {
  max-width: 100%;
  height: auto
}

[hidden]:where(:not([hidden=until-found])) {
  display: none
}

:root {
  --background: 240 20% 98%;
  --foreground: 240 10% 15%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 15%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 15%;
  --primary: 250 80% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 20% 96%;
  --secondary-foreground: 240 10% 30%;
  --muted: 240 15% 95%;
  --muted-foreground: 240 10% 45%;
  --accent: 280 70% 65%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 15% 90%;
  --input: 240 15% 90%;
  --ring: 250 80% 60%;
  --radius: 1rem;
  --gradient-bg: linear-gradient(135deg, hsl(240, 30%, 97%) 0%, hsl(280, 30%, 95%) 50%, hsl(250, 40%, 94%) 100%);
  --gradient-card: linear-gradient(180deg, hsla(0, 0%, 100%, .9) 0%, hsla(0, 0%, 100%, .7) 100%);
  --gradient-primary: linear-gradient(135deg, hsl(250, 80%, 60%) 0%, hsl(280, 70%, 55%) 100%);
  --gradient-accent: linear-gradient(135deg, hsl(280, 70%, 65%) 0%, hsl(320, 60%, 60%) 100%);
  --shadow-soft: 0 4px 20px -4px hsla(250, 50%, 50%, .12);
  --shadow-card: 0 8px 32px -8px hsla(250, 50%, 40%, .15);
  --shadow-elevated: 0 16px 48px -12px hsla(250, 50%, 40%, .2);
  --glass-bg: hsla(0, 0%, 100%, .7);
  --glass-border: hsla(0, 0%, 100%, .5);
  --glass-blur: blur(20px);
  --sidebar-background: 240 20% 98%;
  --sidebar-foreground: 240 10% 26%;
  --sidebar-primary: 250 80% 55%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 280 60% 95%;
  --sidebar-accent-foreground: 250 80% 45%;
  --sidebar-border: 240 15% 91%;
  --sidebar-ring: 250 70% 60%
}

.dark {
  --background: 240 20% 8%;
  --foreground: 240 10% 95%;
  --card: 240 20% 12%;
  --card-foreground: 240 10% 95%;
  --popover: 240 20% 12%;
  --popover-foreground: 240 10% 95%;
  --primary: 250 80% 65%;
  --primary-foreground: 240 20% 10%;
  --secondary: 240 15% 18%;
  --secondary-foreground: 240 10% 90%;
  --muted: 240 15% 18%;
  --muted-foreground: 240 10% 60%;
  --accent: 280 70% 60%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 15% 22%;
  --input: 240 15% 22%;
  --ring: 250 70% 65%;
  --gradient-bg: linear-gradient(135deg, hsl(240, 25%, 8%) 0%, hsl(280, 30%, 12%) 50%, hsl(250, 35%, 10%) 100%);
  --gradient-card: linear-gradient(180deg, hsla(240, 20%, 16%, .9) 0%, hsla(240, 20%, 14%, .7) 100%);
  --gradient-primary: linear-gradient(135deg, hsl(250, 75%, 65%) 0%, hsl(280, 65%, 60%) 100%);
  --gradient-accent: linear-gradient(135deg, hsl(280, 65%, 60%) 0%, hsl(320, 55%, 55%) 100%);
  --shadow-soft: 0 4px 20px -4px hsla(250, 50%, 10%, .4);
  --shadow-card: 0 8px 32px -8px hsla(250, 50%, 10%, .5);
  --shadow-elevated: 0 16px 48px -12px hsla(250, 50%, 10%, .6);
  --glass-bg: hsla(240, 20%, 15%, .7);
  --glass-border: hsla(240, 20%, 25%, .5);
  --glass-blur: blur(20px);
  --sidebar-background: 240 20% 10%;
  --sidebar-foreground: 240 10% 96%;
  --sidebar-primary: 250 75% 60%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 280 50% 20%;
  --sidebar-accent-foreground: 280 70% 80%;
  --sidebar-border: 240 15% 18%;
  --sidebar-ring: 250 70% 65%
}

* {
  border-color: hsl(var(--border))
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--gradient-bg);
  min-height: 100vh;
  font-family: Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif
}

.card-glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-card);
  border-radius: 1.25rem
}

.card-elevated {
  background: var(--gradient-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-card);
  border-radius: 1.25rem;
  border-width: 1px;
  border-color: #ffffff4d
}

.btn-primary-gradient {
  background: var(--gradient-primary);
  box-shadow: 0 4px 16px -4px #3b19e666;
  font-weight: 500;
  color: hsl(var(--primary-foreground))
}

.skeleton-shimmer {
  background: linear-gradient(90deg, hsl(var(--border)), hsl(var(--muted-foreground) / .12), hsl(var(--border)));
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite
}

@keyframes shimmer {
  0% {
    background-position: 200% 0
  }

  to {
    background-position: -200% 0
  }
}

.animate-voice-wave {
  animation: voiceWave .6s ease-in-out infinite alternate
}

@keyframes voiceWave {
  0% {
    height: 8px
  }

  to {
    height: 20px
  }
}

.fade-in {
  animation: fadeIn .3s ease-out forwards
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(8px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

.slide-up {
  animation: slideUp .4s ease-out forwards
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(16px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0
}

.pointer-events-none {
  pointer-events: none
}

.pointer-events-auto {
  pointer-events: auto
}

.visible {
  visibility: visible
}

.invisible {
  visibility: hidden
}

.fixed {
  position: fixed
}

.absolute {
  position: absolute
}

.relative {
  position: relative
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}

.inset-x-0 {
  left: 0;
  right: 0
}

.inset-y-0 {
  top: 0;
  bottom: 0
}

.-bottom-12 {
  bottom: -3rem
}

.-left-12 {
  left: -3rem
}

.-right-12 {
  right: -3rem
}

.-top-12 {
  top: -3rem
}

.bottom-0 {
  bottom: 0
}

.left-0 {
  left: 0
}

.left-1 {
  left: .25rem
}

.left-1\\/2 {
  left: 50%
}

.left-2 {
  left: .5rem
}

.left-\\[50\\%\\] {
  left: 50%
}

.right-0 {
  right: 0
}

.right-1 {
  right: .25rem
}

.right-2 {
  right: .5rem
}

.right-3 {
  right: .75rem
}

.right-4 {
  right: 1rem
}

.top-0 {
  top: 0
}

.top-1\\.5 {
  top: .375rem
}

.top-1\\/2 {
  top: 50%
}

.top-2 {
  top: .5rem
}

.top-3\\.5 {
  top: .875rem
}

.top-4 {
  top: 1rem
}

.top-\\[1px\\] {
  top: 1px
}

.top-\\[50\\%\\] {
  top: 50%
}

.top-\\[60\\%\\] {
  top: 60%
}

.top-full {
  top: 100%
}

.z-10 {
  z-index: 10
}

.z-20 {
  z-index: 20
}

.z-50 {
  z-index: 50
}

.z-\\[100\\] {
  z-index: 100
}

.z-\\[1\\] {
  z-index: 1
}

.-mx-1 {
  margin-left: -.25rem;
  margin-right: -.25rem
}

.mx-2 {
  margin-left: .5rem;
  margin-right: .5rem
}

.mx-3\\.5 {
  margin-left: .875rem;
  margin-right: .875rem
}

.mx-auto {
  margin-left: auto;
  margin-right: auto
}

.my-0\\.5 {
  margin-top: .125rem;
  margin-bottom: .125rem
}

.my-1 {
  margin-top: .25rem;
  margin-bottom: .25rem
}

.-ml-2 {
  margin-left: -.5rem
}

.-ml-4 {
  margin-left: -1rem
}

.-mt-4 {
  margin-top: -1rem
}

.mb-1 {
  margin-bottom: .25rem
}

.mb-3 {
  margin-bottom: .75rem
}

.mb-4 {
  margin-bottom: 1rem
}

.mb-5 {
  margin-bottom: 1.25rem
}

.mb-6 {
  margin-bottom: 1.5rem
}

.ml-0\\.5 {
  margin-left: .125rem
}

.ml-1 {
  margin-left: .25rem
}

.ml-2 {
  margin-left: .5rem
}

.ml-auto {
  margin-left: auto
}

.mr-1 {
  margin-right: .25rem
}

.mr-2 {
  margin-right: .5rem
}

.mt-1 {
  margin-top: .25rem
}

.mt-1\\.5 {
  margin-top: .375rem
}

.mt-2 {
  margin-top: .5rem
}

.mt-24 {
  margin-top: 6rem
}

.mt-4 {
  margin-top: 1rem
}

.mt-6 {
  margin-top: 1.5rem
}

.mt-auto {
  margin-top: auto
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2
}

.block {
  display: block
}

.flex {
  display: flex
}

.inline-flex {
  display: inline-flex
}

.table {
  display: table
}

.grid {
  display: grid
}

.hidden {
  display: none
}

.aspect-square {
  aspect-ratio: 1 / 1
}

.aspect-video {
  aspect-ratio: 16 / 9
}

.size-4 {
  width: 1rem;
  height: 1rem
}

.h-1\\.5 {
  height: .375rem
}

.h-10 {
  height: 2.5rem
}

.h-11 {
  height: 2.75rem
}

.h-12 {
  height: 3rem
}

.h-2 {
  height: .5rem
}

.h-2\\.5 {
  height: .625rem
}

.h-20 {
  height: 5rem
}

.h-24 {
  height: 6rem
}

.h-3 {
  height: .75rem
}

.h-3\\.5 {
  height: .875rem
}

.h-4 {
  height: 1rem
}

.h-48 {
  height: 12rem
}

.h-5 {
  height: 1.25rem
}

.h-6 {
  height: 1.5rem
}

.h-64 {
  height: 16rem
}

.h-7 {
  height: 1.75rem
}

.h-8 {
  height: 2rem
}

.h-9 {
  height: 2.25rem
}

.h-\\[1px\\] {
  height: 1px
}

.h-\\[var\\(--radix-navigation-menu-viewport-height\\)\\] {
  height: var(--radix-navigation-menu-viewport-height)
}

.h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height)
}

.h-auto {
  height: auto
}

.h-full {
  height: 100%
}

.h-px {
  height: 1px
}

.h-svh {
  height: 100svh
}

.max-h-96 {
  max-height: 24rem
}

.max-h-\\[300px\\] {
  max-height: 300px
}

.max-h-screen {
  max-height: 100vh
}

.min-h-0 {
  min-height: 0px
}

.min-h-\\[80px\\] {
  min-height: 80px
}

.min-h-screen {
  min-height: 100vh
}

.min-h-svh {
  min-height: 100svh
}

.w-0 {
  width: 0px
}

.w-1 {
  width: .25rem
}

.w-10 {
  width: 2.5rem
}

.w-11 {
  width: 2.75rem
}

.w-16 {
  width: 4rem
}

.w-2 {
  width: .5rem
}

.w-2\\.5 {
  width: .625rem
}

.w-20 {
  width: 5rem
}

.w-24 {
  width: 6rem
}

.w-28 {
  width: 7rem
}

.w-3 {
  width: .75rem
}

.w-3\\.5 {
  width: .875rem
}

.w-3\\/4 {
  width: 75%
}

.w-32 {
  width: 8rem
}

.w-4 {
  width: 1rem
}

.w-44 {
  width: 11rem
}

.w-48 {
  width: 12rem
}

.w-5 {
  width: 1.25rem
}

.w-56 {
  width: 14rem
}

.w-64 {
  width: 16rem
}

.w-7 {
  width: 1.75rem
}

.w-72 {
  width: 18rem
}

.w-8 {
  width: 2rem
}

.w-9 {
  width: 2.25rem
}

.w-\\[--sidebar-width\\] {
  width: var(--sidebar-width)
}

.w-\\[100px\\] {
  width: 100px
}

.w-\\[1px\\] {
  width: 1px
}

.w-\\[3px\\] {
  width: 3px
}

.w-auto {
  width: auto
}

.w-full {
  width: 100%
}

.w-max {
  width: -moz-max-content;
  width: max-content
}

.w-px {
  width: 1px
}

.min-w-0 {
  min-width: 0px
}

.min-w-5 {
  min-width: 1.25rem
}

.min-w-\\[12rem\\] {
  min-width: 12rem
}

.min-w-\\[8rem\\] {
  min-width: 8rem
}

.min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width)
}

.max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width)
}

.max-w-lg {
  max-width: 32rem
}

.max-w-max {
  max-width: -moz-max-content;
  max-width: max-content
}

.max-w-md {
  max-width: 28rem
}

.flex-1 {
  flex: 1 1 0%
}

.flex-shrink-0,
.shrink-0 {
  flex-shrink: 0
}

.grow {
  flex-grow: 1
}

.grow-0 {
  flex-grow: 0
}

.basis-full {
  flex-basis: 100%
}

.caption-bottom {
  caption-side: bottom
}

.border-collapse {
  border-collapse: collapse
}

.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.-translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.rotate-45 {
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

@keyframes pulse {
  50% {
    opacity: .5
  }

  0%,
  to {
    opacity: 1
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite
}

.cursor-default {
  cursor: default
}

.cursor-pointer {
  cursor: pointer
}

.touch-none {
  touch-action: none
}

.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none
}

.list-none {
  list-style-type: none
}

.flex-row {
  flex-direction: row
}

.flex-col {
  flex-direction: column
}

.flex-col-reverse {
  flex-direction: column-reverse
}

.flex-wrap {
  flex-wrap: wrap
}

.items-start {
  align-items: flex-start
}

.items-end {
  align-items: flex-end
}

.items-center {
  align-items: center
}

.items-stretch {
  align-items: stretch
}

.justify-center {
  justify-content: center
}

.justify-between {
  justify-content: space-between
}

.gap-0\\.5 {
  gap: .125rem
}

.gap-1 {
  gap: .25rem
}

.gap-1\\.5 {
  gap: .375rem
}

.gap-2 {
  gap: .5rem
}

.gap-3 {
  gap: .75rem
}

.gap-4 {
  gap: 1rem
}

.gap-6 {
  gap: 1.5rem
}

.gap-\\[3px\\] {
  gap: 3px
}

.space-x-1>:not([hidden])~:not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(.25rem * var(--tw-space-x-reverse));
  margin-left: calc(.25rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-x-4>:not([hidden])~:not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-y-1>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(.25rem * var(--tw-space-y-reverse))
}

.space-y-1\\.5>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(.375rem * var(--tw-space-y-reverse))
}

.space-y-2>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(.5rem * var(--tw-space-y-reverse))
}

.space-y-3>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(.75rem * var(--tw-space-y-reverse))
}

.space-y-4>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse))
}

.space-y-5>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.25rem * var(--tw-space-y-reverse))
}

.space-y-6>:not([hidden])~:not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse))
}

.overflow-auto {
  overflow: auto
}

.overflow-hidden {
  overflow: hidden
}

.overflow-y-auto {
  overflow-y: auto
}

.overflow-x-hidden {
  overflow-x: hidden
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.whitespace-nowrap {
  white-space: nowrap
}

.break-words {
  overflow-wrap: break-word
}

.rounded-2xl {
  border-radius: 1.25rem
}

.rounded-\\[2px\\] {
  border-radius: 2px
}

.rounded-\\[inherit\\] {
  border-radius: inherit
}

.rounded-full {
  border-radius: 9999px
}

.rounded-lg {
  border-radius: var(--radius)
}

.rounded-md {
  border-radius: calc(var(--radius) - 2px)
}

.rounded-sm {
  border-radius: calc(var(--radius) - 4px)
}

.rounded-xl {
  border-radius: .75rem
}

.rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px
}

.rounded-tl-sm {
  border-top-left-radius: calc(var(--radius) - 4px)
}

.border {
  border-width: 1px
}

.border-2 {
  border-width: 2px
}

.border-\\[1\\.5px\\] {
  border-width: 1.5px
}

.border-y {
  border-top-width: 1px;
  border-bottom-width: 1px
}

.border-b {
  border-bottom-width: 1px
}

.border-l {
  border-left-width: 1px
}

.border-r {
  border-right-width: 1px
}

.border-t {
  border-top-width: 1px
}

.border-dashed {
  border-style: dashed
}

.border-\\[--color-border\\] {
  border-color: var(--color-border)
}

.border-border\\/50 {
  border-color: hsl(var(--border) / .5)
}

.border-destructive {
  border-color: hsl(var(--destructive))
}

.border-destructive\\/50 {
  border-color: hsl(var(--destructive) / .5)
}

.border-input {
  border-color: hsl(var(--input))
}

.border-primary {
  border-color: hsl(var(--primary))
}

.border-primary\\/20 {
  border-color: hsl(var(--primary) / .2)
}

.border-primary\\/50 {
  border-color: hsl(var(--primary) / .5)
}

.border-sidebar-border {
  border-color: hsl(var(--sidebar-border))
}

.border-transparent {
  border-color: transparent
}

.border-l-transparent {
  border-left-color: transparent
}

.border-t-transparent {
  border-top-color: transparent
}

.bg-\\[--color-bg\\] {
  background-color: var(--color-bg)
}

.bg-accent {
  background-color: hsl(var(--accent))
}

.bg-background {
  background-color: hsl(var(--background))
}

.bg-black\\/80 {
  background-color: #000c
}

.bg-border {
  background-color: hsl(var(--border))
}

.bg-card {
  background-color: hsl(var(--card))
}

.bg-destructive {
  background-color: hsl(var(--destructive))
}

.bg-foreground {
  background-color: hsl(var(--foreground))
}

.bg-muted {
  background-color: hsl(var(--muted))
}

.bg-muted\\/50 {
  background-color: hsl(var(--muted) / .5)
}

.bg-popover {
  background-color: hsl(var(--popover))
}

.bg-primary {
  background-color: hsl(var(--primary))
}

.bg-primary\\/10 {
  background-color: hsl(var(--primary) / .1)
}

.bg-primary\\/15 {
  background-color: hsl(var(--primary) / .15)
}

.bg-secondary {
  background-color: hsl(var(--secondary))
}

.bg-sidebar {
  background-color: hsl(var(--sidebar-background))
}

.bg-sidebar-border {
  background-color: hsl(var(--sidebar-border))
}

.bg-transparent {
  background-color: transparent
}

.bg-white\\/80 {
  background-color: #fffc
}

.fill-current {
  fill: currentColor
}

.fill-muted {
  fill: hsl(var(--muted))
}

.fill-rating-star {
  fill: #e7b008
}

.fill-rating-star\\/50 {
  fill: #e7b00880
}

.object-cover {
  -o-object-fit: cover;
  object-fit: cover
}

.p-0 {
  padding: 0
}

.p-1 {
  padding: .25rem
}

.p-2 {
  padding: .5rem
}

.p-3 {
  padding: .75rem
}

.p-4 {
  padding: 1rem
}

.p-6 {
  padding: 1.5rem
}

.p-\\[1px\\] {
  padding: 1px
}

.px-1 {
  padding-left: .25rem;
  padding-right: .25rem
}

.px-2 {
  padding-left: .5rem;
  padding-right: .5rem
}

.px-2\\.5 {
  padding-left: .625rem;
  padding-right: .625rem
}

.px-3 {
  padding-left: .75rem;
  padding-right: .75rem
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem
}

.py-0\\.5 {
  padding-top: .125rem;
  padding-bottom: .125rem
}

.py-1 {
  padding-top: .25rem;
  padding-bottom: .25rem
}

.py-1\\.5 {
  padding-top: .375rem;
  padding-bottom: .375rem
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem
}

.py-2 {
  padding-top: .5rem;
  padding-bottom: .5rem
}

.py-3 {
  padding-top: .75rem;
  padding-bottom: .75rem
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem
}

.pb-3 {
  padding-bottom: .75rem
}

.pb-4 {
  padding-bottom: 1rem
}

.pb-8 {
  padding-bottom: 2rem
}

.pl-2\\.5 {
  padding-left: .625rem
}

.pl-4 {
  padding-left: 1rem
}

.pl-8 {
  padding-left: 2rem
}

.pr-2 {
  padding-right: .5rem
}

.pr-2\\.5 {
  padding-right: .625rem
}

.pr-8 {
  padding-right: 2rem
}

.pt-0 {
  padding-top: 0
}

.pt-1 {
  padding-top: .25rem
}

.pt-3 {
  padding-top: .75rem
}

.pt-4 {
  padding-top: 1rem
}

.text-left {
  text-align: left
}

.text-center {
  text-align: center
}

.align-middle {
  vertical-align: middle
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem
}

.text-\\[0\\.8rem\\] {
  font-size: .8rem
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem
}

.text-sm {
  font-size: .875rem;
  line-height: 1.25rem
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem
}

.text-xs {
  font-size: .75rem;
  line-height: 1rem
}

.font-bold {
  font-weight: 700
}

.font-medium {
  font-weight: 500
}

.font-normal {
  font-weight: 400
}

.font-semibold {
  font-weight: 600
}

.tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)
}

.leading-none {
  line-height: 1
}

.leading-relaxed {
  line-height: 1.625
}

.tracking-tight {
  letter-spacing: -.025em
}

.tracking-widest {
  letter-spacing: .1em
}

.text-accent-foreground {
  color: hsl(var(--accent-foreground))
}

.text-card-foreground {
  color: hsl(var(--card-foreground))
}

.text-current {
  color: currentColor
}

.text-destructive {
  color: hsl(var(--destructive))
}

.text-destructive-foreground {
  color: hsl(var(--destructive-foreground))
}

.text-foreground {
  color: hsl(var(--foreground))
}

.text-foreground\\/50 {
  color: hsl(var(--foreground) / .5)
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground))
}

.text-muted-foreground\\/30 {
  color: hsl(var(--muted-foreground) / .3)
}

.text-popover-foreground {
  color: hsl(var(--popover-foreground))
}

.text-primary {
  color: hsl(var(--primary))
}

.text-primary-foreground {
  color: hsl(var(--primary-foreground))
}

.text-rating-star {
  --tw-text-opacity: 1;
  color: hsl(45 93% 47% / var(--tw-text-opacity, 1))
}

.text-secondary-foreground {
  color: hsl(var(--secondary-foreground))
}

.text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground))
}

.text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / .7)
}

.underline {
  text-decoration-line: underline
}

.underline-offset-4 {
  text-underline-offset: 4px
}

.opacity-0 {
  opacity: 0
}

.opacity-100 {
  opacity: 1
}

.opacity-50 {
  opacity: .5
}

.opacity-60 {
  opacity: .6
}

.opacity-70 {
  opacity: .7
}

.opacity-90 {
  opacity: .9
}

.shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-\\[0_0_24px_rgba\\(139\\,92\\,246\\,0\\.25\\)\\] {
  --tw-shadow: 0 0 24px rgba(139, 92, 246, .25);
  --tw-shadow-colored: 0 0 24px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-card {
  --tw-shadow: var(--shadow-card);
  --tw-shadow-colored: var(--shadow-card);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-card {
  --tw-shadow-color: hsl(var(--card));
  --tw-shadow: var(--tw-shadow-colored)
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px
}

.outline {
  outline-style: solid
}

.ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.ring-ring {
  --tw-ring-color: hsl(var(--ring))
}

.ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring))
}

.ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background))
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-\\[left\\,right\\,width\\] {
  transition-property: left, right, width;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-\\[margin\\,opa\\] {
  transition-property: margin, opa;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-\\[width\\,height\\,padding\\] {
  transition-property: width, height, padding;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s
}

.duration-1000 {
  transition-duration: 1s
}

.duration-200 {
  transition-duration: .2s
}

.duration-300 {
  transition-duration: .3s
}

.duration-500 {
  transition-duration: .5s
}

.ease-in-out {
  transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.ease-linear {
  transition-timing-function: linear
}

@keyframes enter {
  0% {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))
  }
}

@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))
  }
}

.animate-in {
  animation-name: enter;
  animation-duration: .15s;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial
}

.fade-in,
.fade-in-0 {
  --tw-enter-opacity: 0
}

.fade-in-80 {
  --tw-enter-opacity: .8
}

.zoom-in-95 {
  --tw-enter-scale: .95
}

.duration-1000 {
  animation-duration: 1s
}

.duration-200 {
  animation-duration: .2s
}

.duration-300 {
  animation-duration: .3s
}

.duration-500 {
  animation-duration: .5s
}

.ease-in-out {
  animation-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.ease-linear {
  animation-timing-function: linear
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom)
}

.data-\\[motion\\^\\=from-\\]\\:fade-in[data-motion^=from-],
.data-\\[state\\=visible\\]\\:fade-in[data-state=visible] {
  animation: fadeIn .3s ease-out forwards
}

.file\\:border-0::file-selector-button {
  border-width: 0px
}

.file\\:bg-transparent::file-selector-button {
  background-color: transparent
}

.file\\:text-sm::file-selector-button {
  font-size: .875rem;
  line-height: 1.25rem
}

.file\\:font-medium::file-selector-button {
  font-weight: 500
}

.file\\:text-foreground::file-selector-button {
  color: hsl(var(--foreground))
}

.placeholder\\:text-muted-foreground::-moz-placeholder {
  color: hsl(var(--muted-foreground))
}

.placeholder\\:text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground))
}

.after\\:absolute:after {
  content: var(--tw-content);
  position: absolute
}

.after\\:-inset-2:after {
  content: var(--tw-content);
  top: -.5rem;
  right: -.5rem;
  bottom: -.5rem;
  left: -.5rem
}

.after\\:inset-y-0:after {
  content: var(--tw-content);
  top: 0;
  bottom: 0
}

.after\\:left-1\\/2:after {
  content: var(--tw-content);
  left: 50%
}

.after\\:w-1:after {
  content: var(--tw-content);
  width: .25rem
}

.after\\:w-\\[2px\\]:after {
  content: var(--tw-content);
  width: 2px
}

.after\\:-translate-x-1\\/2:after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.first\\:rounded-l-md:first-child {
  border-top-left-radius: calc(var(--radius) - 2px);
  border-bottom-left-radius: calc(var(--radius) - 2px)
}

.first\\:border-l:first-child {
  border-left-width: 1px
}

.last\\:rounded-r-md:last-child {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px)
}

.focus-within\\:relative:focus-within {
  position: relative
}

.focus-within\\:z-20:focus-within {
  z-index: 20
}

.hover\\:bg-accent:hover {
  background-color: hsl(var(--accent))
}

.hover\\:bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / .8)
}

.hover\\:bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / .9)
}

.hover\\:bg-muted:hover {
  background-color: hsl(var(--muted))
}

.hover\\:bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / .5)
}

.hover\\:bg-primary:hover {
  background-color: hsl(var(--primary))
}

.hover\\:bg-primary\\/20:hover {
  background-color: hsl(var(--primary) / .2)
}

.hover\\:bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / .8)
}

.hover\\:bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / .9)
}

.hover\\:bg-secondary:hover {
  background-color: hsl(var(--secondary))
}

.hover\\:bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / .8)
}

.hover\\:bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent))
}

.hover\\:bg-transparent:hover {
  background-color: transparent
}

.hover\\:text-accent-foreground:hover {
  color: hsl(var(--accent-foreground))
}

.hover\\:text-foreground:hover {
  color: hsl(var(--foreground))
}

.hover\\:text-muted-foreground:hover {
  color: hsl(var(--muted-foreground))
}

.hover\\:text-primary:hover {
  color: hsl(var(--primary))
}

.hover\\:text-primary-foreground:hover {
  color: hsl(var(--primary-foreground))
}

.hover\\:text-primary\\/90:hover {
  color: hsl(var(--primary) / .9)
}

.hover\\:text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground))
}

.hover\\:underline:hover {
  text-decoration-line: underline
}

.hover\\:opacity-100:hover {
  opacity: 1
}

.hover\\:shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]: hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.hover\\:after\\:bg-sidebar-border:hover:after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border))
}

.focus\\:border-primary\\/40:focus {
  border-color: hsl(var(--primary) / .4)
}

.focus\\:bg-accent:focus {
  background-color: hsl(var(--accent))
}

.focus\\:bg-primary:focus {
  background-color: hsl(var(--primary))
}

.focus\\:bg-transparent:focus {
  background-color: transparent
}

.focus\\:text-accent-foreground:focus {
  color: hsl(var(--accent-foreground))
}

.focus\\:text-primary-foreground:focus {
  color: hsl(var(--primary-foreground))
}

.focus\\:opacity-100:focus {
  opacity: 1
}

.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px
}

.focus\\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.focus\\:ring-primary\\/20:focus {
  --tw-ring-color: hsl(var(--primary) / .2)
}

.focus\\:ring-ring:focus {
  --tw-ring-color: hsl(var(--ring))
}

.focus\\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px
}

.focus-visible\\:outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px
}

.focus-visible\\:ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.focus-visible\\:ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.focus-visible\\:ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring))
}

.focus-visible\\:ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring))
}

.focus-visible\\:ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px
}

.focus-visible\\:ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px
}

.focus-visible\\:ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background))
}

.active\\:bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent))
}

.active\\:bg-transparent:active {
  background-color: transparent
}

.active\\:text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground))
}

.disabled\\:pointer-events-none:disabled {
  pointer-events: none
}

.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed
}

.disabled\\:opacity-50:disabled {
  opacity: .5
}

.group\\/menu-item:focus-within .group-focus-within\\/menu-item\\:opacity-100 {
  opacity: 1
}

.group\\/menu-item:hover .group-hover\\/menu-item\\:opacity-100,
.group:hover .group-hover\\:opacity-100 {
  opacity: 1
}

.group.destructive .group-\\[\\.destructive\\]\\:border-muted\\/40 {
  border-color: hsl(var(--muted) / .4)
}

.group.toaster .group-\\[\\.toaster\\]\\:border-border {
  border-color: hsl(var(--border))
}

.group.toast .group-\\[\\.toast\\]\\:bg-muted {
  background-color: hsl(var(--muted))
}

.group.toast .group-\\[\\.toast\\]\\:bg-primary {
  background-color: hsl(var(--primary))
}

.group.toaster .group-\\[\\.toaster\\]\\:bg-background {
  background-color: hsl(var(--background))
}

.group.destructive .group-\\[\\.destructive\\]\\:text-red-300 {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity, 1))
}

.group.toast .group-\\[\\.toast\\]\\:text-muted-foreground {
  color: hsl(var(--muted-foreground))
}

.group.toast .group-\\[\\.toast\\]\\:text-primary-foreground {
  color: hsl(var(--primary-foreground))
}

.group.toaster .group-\\[\\.toaster\\]\\:text-foreground {
  color: hsl(var(--foreground))
}

.group.toaster .group-\\[\\.toaster\\]\\:shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:border-destructive\\/30:hover {
  border-color: hsl(var(--destructive) / .3)
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:bg-destructive:hover {
  background-color: hsl(var(--destructive))
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-destructive-foreground:hover {
  color: hsl(var(--destructive-foreground))
}

.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-red-50:hover {
  --tw-text-opacity: 1;
  color: rgb(254 242 242 / var(--tw-text-opacity, 1))
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-destructive:focus {
  --tw-ring-color: hsl(var(--destructive))
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-red-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity, 1))
}

.group.destructive .group-\\[\\.destructive\\]\\:focus\\:ring-offset-red-600:focus {
  --tw-ring-offset-color: #dc2626
}

.peer\\/menu-button:hover~.peer-hover\\/menu-button\\:text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground))
}

.peer:disabled~.peer-disabled\\:cursor-not-allowed {
  cursor: not-allowed
}

.peer:disabled~.peer-disabled\\:opacity-70 {
  opacity: .7
}

.has-\\[\\[data-variant\\=inset\\]\\]\\:bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background))
}

.has-\\[\\:disabled\\]\\:opacity-50:has(:disabled) {
  opacity: .5
}

.group\\/menu-item:has([data-sidebar=menu-action]) .group-has-\\[\\[data-sidebar\\=menu-action\\]\\]\\/menu-item\\:pr-8 {
  padding-right: 2rem
}

.aria-disabled\\:pointer-events-none[aria-disabled=true] {
  pointer-events: none
}

.aria-disabled\\:opacity-50[aria-disabled=true] {
  opacity: .5
}

.aria-selected\\:bg-accent[aria-selected=true] {
  background-color: hsl(var(--accent))
}

.aria-selected\\:bg-accent\\/50[aria-selected=true] {
  background-color: hsl(var(--accent) / .5)
}

.aria-selected\\:text-accent-foreground[aria-selected=true] {
  color: hsl(var(--accent-foreground))
}

.aria-selected\\:text-muted-foreground[aria-selected=true] {
  color: hsl(var(--muted-foreground))
}

.aria-selected\\:opacity-100[aria-selected=true] {
  opacity: 1
}

.aria-selected\\:opacity-30[aria-selected=true] {
  opacity: .3
}

.data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true],
.data-\\[disabled\\]\\:pointer-events-none[data-disabled] {
  pointer-events: none
}

.data-\\[panel-group-direction\\=vertical\\]\\:h-px[data-panel-group-direction=vertical] {
  height: 1px
}

.data-\\[panel-group-direction\\=vertical\\]\\:w-full[data-panel-group-direction=vertical] {
  width: 100%
}

.data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom] {
  --tw-translate-y: .25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[side\\=left\\]\\:-translate-x-1[data-side=left] {
  --tw-translate-x: -.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[side\\=right\\]\\:translate-x-1[data-side=right] {
  --tw-translate-x: .25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[side\\=top\\]\\:-translate-y-1[data-side=top] {
  --tw-translate-y: -.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[state\\=unchecked\\]\\:translate-x-0[data-state=unchecked],
.data-\\[swipe\\=cancel\\]\\:translate-x-0[data-swipe=cancel] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[swipe\\=end\\]\\:translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe=end] {
  --tw-translate-x: var(--radix-toast-swipe-end-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[swipe\\=move\\]\\:translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe=move] {
  --tw-translate-x: var(--radix-toast-swipe-move-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

@keyframes accordion-up {
  0% {
    height: var(--radix-accordion-content-height)
  }

  to {
    height: 0
  }
}

.data-\\[state\\=closed\\]\\:animate-accordion-up[data-state=closed] {
  animation: accordion-up .2s ease-out
}

@keyframes accordion-down {
  0% {
    height: 0
  }

  to {
    height: var(--radix-accordion-content-height)
  }
}

.data-\\[state\\=open\\]\\:animate-accordion-down[data-state=open] {
  animation: accordion-down .2s ease-out
}

.data-\\[panel-group-direction\\=vertical\\]\\:flex-col[data-panel-group-direction=vertical] {
  flex-direction: column
}

.data-\\[active\\=true\\]\\:bg-sidebar-accent[data-active=true] {
  background-color: hsl(var(--sidebar-accent))
}

.data-\\[active\\]\\:bg-accent\\/50[data-active] {
  background-color: hsl(var(--accent) / .5)
}

.data-\\[selected\\=\\'true\\'\\]\\:bg-accent[data-selected=true] {
  background-color: hsl(var(--accent))
}

.data-\\[state\\=active\\]\\:bg-background[data-state=active] {
  background-color: hsl(var(--background))
}

.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked] {
  background-color: hsl(var(--primary))
}

.data-\\[state\\=on\\]\\:bg-accent[data-state=on],
.data-\\[state\\=open\\]\\:bg-accent[data-state=open] {
  background-color: hsl(var(--accent))
}

.data-\\[state\\=open\\]\\:bg-accent\\/50[data-state=open] {
  background-color: hsl(var(--accent) / .5)
}

.data-\\[state\\=open\\]\\:bg-secondary[data-state=open] {
  background-color: hsl(var(--secondary))
}

.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected] {
  background-color: hsl(var(--muted))
}

.data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked] {
  background-color: hsl(var(--input))
}

.data-\\[active\\=true\\]\\:font-medium[data-active=true] {
  font-weight: 500
}

.data-\\[active\\=true\\]\\:text-sidebar-accent-foreground[data-active=true] {
  color: hsl(var(--sidebar-accent-foreground))
}

.data-\\[selected\\=true\\]\\:text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground))
}

.data-\\[state\\=active\\]\\:text-foreground[data-state=active] {
  color: hsl(var(--foreground))
}

.data-\\[state\\=checked\\]\\:text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground))
}

.data-\\[state\\=on\\]\\:text-accent-foreground[data-state=on],
.data-\\[state\\=open\\]\\:text-accent-foreground[data-state=open] {
  color: hsl(var(--accent-foreground))
}

.data-\\[state\\=open\\]\\:text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground))
}

.data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true],
.data-\\[disabled\\]\\:opacity-50[data-disabled] {
  opacity: .5
}

.data-\\[state\\=open\\]\\:opacity-100[data-state=open] {
  opacity: 1
}

.data-\\[state\\=active\\]\\:shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.data-\\[swipe\\=move\\]\\:transition-none[data-swipe=move] {
  transition-property: none
}

.data-\\[state\\=closed\\]\\:duration-300[data-state=closed] {
  transition-duration: .3s
}

.data-\\[state\\=open\\]\\:duration-500[data-state=open] {
  transition-duration: .5s
}

.data-\\[motion\\^\\=from-\\]\\:animate-in[data-motion^=from-],
.data-\\[state\\=open\\]\\:animate-in[data-state=open],
.data-\\[state\\=visible\\]\\:animate-in[data-state=visible] {
  animation-name: enter;
  animation-duration: .15s;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial
}

.data-\\[motion\\^\\=to-\\]\\:animate-out[data-motion^=to-],
.data-\\[state\\=closed\\]\\:animate-out[data-state=closed],
.data-\\[state\\=hidden\\]\\:animate-out[data-state=hidden],
.data-\\[swipe\\=end\\]\\:animate-out[data-swipe=end] {
  animation-name: exit;
  animation-duration: .15s;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial
}

.data-\\[motion\\^\\=from-\\]\\:fade-in[data-motion^=from-] {
  --tw-enter-opacity: 0
}

.data-\\[motion\\^\\=to-\\]\\:fade-out[data-motion^=to-],
.data-\\[state\\=closed\\]\\:fade-out-0[data-state=closed] {
  --tw-exit-opacity: 0
}

.data-\\[state\\=closed\\]\\:fade-out-80[data-state=closed] {
  --tw-exit-opacity: .8
}

.data-\\[state\\=hidden\\]\\:fade-out[data-state=hidden] {
  --tw-exit-opacity: 0
}

.data-\\[state\\=open\\]\\:fade-in-0[data-state=open],
.data-\\[state\\=visible\\]\\:fade-in[data-state=visible] {
  --tw-enter-opacity: 0
}

.data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed] {
  --tw-exit-scale: .95
}

.data-\\[state\\=open\\]\\:zoom-in-90[data-state=open] {
  --tw-enter-scale: .9
}

.data-\\[state\\=open\\]\\:zoom-in-95[data-state=open] {
  --tw-enter-scale: .95
}

.data-\\[motion\\=from-end\\]\\:slide-in-from-right-52[data-motion=from-end] {
  --tw-enter-translate-x: 13rem
}

.data-\\[motion\\=from-start\\]\\:slide-in-from-left-52[data-motion=from-start] {
  --tw-enter-translate-x: -13rem
}

.data-\\[motion\\=to-end\\]\\:slide-out-to-right-52[data-motion=to-end] {
  --tw-exit-translate-x: 13rem
}

.data-\\[motion\\=to-start\\]\\:slide-out-to-left-52[data-motion=to-start] {
  --tw-exit-translate-x: -13rem
}

.data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom] {
  --tw-enter-translate-y: -.5rem
}

.data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left] {
  --tw-enter-translate-x: .5rem
}

.data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right] {
  --tw-enter-translate-x: -.5rem
}

.data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top] {
  --tw-enter-translate-y: .5rem
}

.data-\\[state\\=closed\\]\\:slide-out-to-bottom[data-state=closed] {
  --tw-exit-translate-y: 100%
}

.data-\\[state\\=closed\\]\\:slide-out-to-left[data-state=closed] {
  --tw-exit-translate-x: -100%
}

.data-\\[state\\=closed\\]\\:slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%
}

.data-\\[state\\=closed\\]\\:slide-out-to-right[data-state=closed],
.data-\\[state\\=closed\\]\\:slide-out-to-right-full[data-state=closed] {
  --tw-exit-translate-x: 100%
}

.data-\\[state\\=closed\\]\\:slide-out-to-top[data-state=closed] {
  --tw-exit-translate-y: -100%
}

.data-\\[state\\=closed\\]\\:slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%
}

.data-\\[state\\=open\\]\\:slide-in-from-bottom[data-state=open] {
  --tw-enter-translate-y: 100%
}

.data-\\[state\\=open\\]\\:slide-in-from-left[data-state=open] {
  --tw-enter-translate-x: -100%
}

.data-\\[state\\=open\\]\\:slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%
}

.data-\\[state\\=open\\]\\:slide-in-from-right[data-state=open] {
  --tw-enter-translate-x: 100%
}

.data-\\[state\\=open\\]\\:slide-in-from-top[data-state=open] {
  --tw-enter-translate-y: -100%
}

.data-\\[state\\=open\\]\\:slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%
}

.data-\\[state\\=open\\]\\:slide-in-from-top-full[data-state=open] {
  --tw-enter-translate-y: -100%
}

.data-\\[state\\=closed\\]\\:duration-300[data-state=closed] {
  animation-duration: .3s
}

.data-\\[state\\=open\\]\\:duration-500[data-state=open] {
  animation-duration: .5s
}

.data-\\[panel-group-direction\\=vertical\\]\\:after\\:left-0[data-panel-group-direction=vertical]:after {
  content: var(--tw-content);
  left: 0
}

.data-\\[panel-group-direction\\=vertical\\]\\:after\\:h-1[data-panel-group-direction=vertical]:after {
  content: var(--tw-content);
  height: .25rem
}

.data-\\[panel-group-direction\\=vertical\\]\\:after\\:w-full[data-panel-group-direction=vertical]:after {
  content: var(--tw-content);
  width: 100%
}

.data-\\[panel-group-direction\\=vertical\\]\\:after\\:-translate-y-1\\/2[data-panel-group-direction=vertical]:after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[panel-group-direction\\=vertical\\]\\:after\\:translate-x-0[data-panel-group-direction=vertical]:after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.data-\\[state\\=open\\]\\:hover\\:bg-sidebar-accent:hover[data-state=open] {
  background-color: hsl(var(--sidebar-accent))
}

.data-\\[state\\=open\\]\\:hover\\:text-sidebar-accent-foreground:hover[data-state=open] {
  color: hsl(var(--sidebar-accent-foreground))
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1)
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1)
}

.group[data-side=left] .group-data-\\[side\\=left\\]\\:-right-4 {
  right: -1rem
}

.group[data-side=right] .group-data-\\[side\\=right\\]\\:left-0 {
  left: 0
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:-mt-8 {
  margin-top: -2rem
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:hidden {
  display: none
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!size-8 {
  width: 2rem !important;
  height: 2rem !important
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon)
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem)
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px)
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:w-0 {
  width: 0px
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.group[data-side=right] .group-data-\\[side\\=right\\]\\:rotate-180,
.group[data-state=open] .group-data-\\[state\\=open\\]\\:rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:overflow-hidden {
  overflow: hidden
}

.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:rounded-lg {
  border-radius: var(--radius)
}

.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:border {
  border-width: 1px
}

.group[data-side=left] .group-data-\\[side\\=left\\]\\:border-r {
  border-right-width: 1px
}

.group[data-side=right] .group-data-\\[side\\=right\\]\\:border-l {
  border-left-width: 1px
}

.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:border-sidebar-border {
  border-color: hsl(var(--sidebar-border))
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!p-0 {
  padding: 0 !important
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:\\!p-2 {
  padding: .5rem !important
}

.group[data-collapsible=icon] .group-data-\\[collapsible\\=icon\\]\\:opacity-0 {
  opacity: 0
}

.group[data-variant=floating] .group-data-\\[variant\\=floating\\]\\:shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:left-full:after {
  content: var(--tw-content);
  left: 100%
}

.group[data-collapsible=offcanvas] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background))
}

.peer\\/menu-button[data-size=default]~.peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5 {
  top: .375rem
}

.peer\\/menu-button[data-size=lg]~.peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5 {
  top: .625rem
}

.peer\\/menu-button[data-size=sm]~.peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1 {
  top: .25rem
}

.peer[data-variant=inset]~.peer-data-\\[variant\\=inset\\]\\:min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem)
}

.peer\\/menu-button[data-active=true]~.peer-data-\\[active\\=true\\]\\/menu-button\\:text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground))
}

.dark\\:border-destructive:is(.dark *) {
  border-color: hsl(var(--destructive))
}

@media (min-width: 640px) {
  .sm\\:bottom-0 {
    bottom: 0
  }

  .sm\\:right-0 {
    right: 0
  }

  .sm\\:top-auto {
    top: auto
  }

  .sm\\:mt-0 {
    margin-top: 0
  }

  .sm\\:flex {
    display: flex
  }

  .sm\\:h-24 {
    height: 6rem
  }

  .sm\\:h-56 {
    height: 14rem
  }

  .sm\\:w-28 {
    width: 7rem
  }

  .sm\\:w-80 {
    width: 20rem
  }

  .sm\\:max-w-sm {
    max-width: 24rem
  }

  .sm\\:flex-row {
    flex-direction: row
  }

  .sm\\:flex-col {
    flex-direction: column
  }

  .sm\\:justify-end {
    justify-content: flex-end
  }

  .sm\\:gap-2\\.5 {
    gap: .625rem
  }

  .sm\\:space-x-2>:not([hidden])~:not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(.5rem * var(--tw-space-x-reverse));
    margin-left: calc(.5rem * calc(1 - var(--tw-space-x-reverse)))
  }

  .sm\\:space-x-4>:not([hidden])~:not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)))
  }

  .sm\\:space-y-0>:not([hidden])~:not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse))
  }

  .sm\\:rounded-lg {
    border-radius: var(--radius)
  }

  .sm\\:text-left {
    text-align: left
  }

  .sm\\:text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem
  }

  .data-\\[state\\=open\\]\\:sm\\:slide-in-from-bottom-full[data-state=open] {
    --tw-enter-translate-y: 100%
  }
}

@media (min-width: 768px) {
  .md\\:absolute {
    position: absolute
  }

  .md\\:block {
    display: block
  }

  .md\\:flex {
    display: flex
  }

  .md\\:w-\\[var\\(--radix-navigation-menu-viewport-width\\)\\] {
    width: var(--radix-navigation-menu-viewport-width)
  }

  .md\\:w-auto {
    width: auto
  }

  .md\\:max-w-\\[420px\\] {
    max-width: 420px
  }

  .md\\:text-sm {
    font-size: .875rem;
    line-height: 1.25rem
  }

  .md\\:opacity-0 {
    opacity: 0
  }

  .after\\:md\\:hidden:after {
    content: var(--tw-content);
    display: none
  }

  .peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:m-2 {
    margin: .5rem
  }

  .peer[data-state=collapsed][data-variant=inset]~.md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:ml-2 {
    margin-left: .5rem
  }

  .peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:ml-0 {
    margin-left: 0
  }

  .peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl {
    border-radius: .75rem
  }

  .peer[data-variant=inset]~.md\\:peer-data-\\[variant\\=inset\\]\\:shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
  }
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:bg-accent:has([aria-selected]) {
  background-color: hsl(var(--accent))
}

.first\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-l-md:has([aria-selected]):first-child {
  border-top-left-radius: calc(var(--radius) - 2px);
  border-bottom-left-radius: calc(var(--radius) - 2px)
}

.last\\:\\[\\&\\:has\\(\\[aria-selected\\]\\)\\]\\:rounded-r-md:has([aria-selected]):last-child {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px)
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-outside\\)\\]\\:bg-accent\\/50:has([aria-selected].day-outside) {
  background-color: hsl(var(--accent) / .5)
}

.\\[\\&\\:has\\(\\[aria-selected\\]\\.day-range-end\\)\\]\\:rounded-r-md:has([aria-selected].day-range-end) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px)
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]) {
  padding-right: 0
}

.\\[\\&\\>button\\]\\:hidden>button {
  display: none
}

.\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.\\[\\&\\>span\\]\\:line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1
}

.\\[\\&\\>svg\\+div\\]\\:translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.\\[\\&\\>svg\\]\\:absolute>svg {
  position: absolute
}

.\\[\\&\\>svg\\]\\:left-4>svg {
  left: 1rem
}

.\\[\\&\\>svg\\]\\:top-4>svg {
  top: 1rem
}

.\\[\\&\\>svg\\]\\:size-3\\.5>svg {
  width: .875rem;
  height: .875rem
}

.\\[\\&\\>svg\\]\\:size-4>svg {
  width: 1rem;
  height: 1rem
}

.\\[\\&\\>svg\\]\\:h-2\\.5>svg {
  height: .625rem
}

.\\[\\&\\>svg\\]\\:h-3>svg {
  height: .75rem
}

.\\[\\&\\>svg\\]\\:w-2\\.5>svg {
  width: .625rem
}

.\\[\\&\\>svg\\]\\:w-3>svg {
  width: .75rem
}

.\\[\\&\\>svg\\]\\:shrink-0>svg {
  flex-shrink: 0
}

.\\[\\&\\>svg\\]\\:text-destructive>svg {
  color: hsl(var(--destructive))
}

.\\[\\&\\>svg\\]\\:text-foreground>svg {
  color: hsl(var(--foreground))
}

.\\[\\&\\>svg\\]\\:text-muted-foreground>svg {
  color: hsl(var(--muted-foreground))
}

.\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground))
}

.\\[\\&\\>svg\\~\\*\\]\\:pl-7>svg~* {
  padding-left: 1.75rem
}

.\\[\\&\\>tr\\]\\:last\\:border-b-0:last-child>tr {
  border-bottom-width: 0px
}

.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.\\[\\&\\[data-state\\=open\\]\\>svg\\]\\:rotate-180[data-state=open]>svg {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.\\[\\&_\\.recharts-cartesian-axis-tick_text\\]\\:fill-muted-foreground .recharts-cartesian-axis-tick text {
  fill: hsl(var(--muted-foreground))
}

.\\[\\&_\\.recharts-cartesian-grid_line\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border\\/50 .recharts-cartesian-grid line[stroke="#ccc"] {
  stroke: hsl(var(--border) / .5)
}

.\\[\\&_\\.recharts-curve\\.recharts-tooltip-cursor\\]\\:stroke-border .recharts-curve.recharts-tooltip-cursor {
  stroke: hsl(var(--border))
}

.\\[\\&_\\.recharts-dot\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-dot[stroke="#fff"] {
  stroke: transparent
}

.\\[\\&_\\.recharts-layer\\]\\:outline-none .recharts-layer {
  outline: 2px solid transparent;
  outline-offset: 2px
}

.\\[\\&_\\.recharts-polar-grid_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-polar-grid [stroke="#ccc"] {
  stroke: hsl(var(--border))
}

.\\[\\&_\\.recharts-radial-bar-background-sector\\]\\:fill-muted .recharts-radial-bar-background-sector,
.\\[\\&_\\.recharts-rectangle\\.recharts-tooltip-cursor\\]\\:fill-muted .recharts-rectangle.recharts-tooltip-cursor {
  fill: hsl(var(--muted))
}

.\\[\\&_\\.recharts-reference-line_\\[stroke\\=\\'\\#ccc\\'\\]\\]\\:stroke-border .recharts-reference-line [stroke="#ccc"] {
  stroke: hsl(var(--border))
}

.\\[\\&_\\.recharts-sector\\[stroke\\=\\'\\#fff\\'\\]\\]\\:stroke-transparent .recharts-sector[stroke="#fff"] {
  stroke: transparent
}

.\\[\\&_\\.recharts-sector\\]\\:outline-none .recharts-sector,
.\\[\\&_\\.recharts-surface\\]\\:outline-none .recharts-surface {
  outline: 2px solid transparent;
  outline-offset: 2px
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading] {
  padding-left: .5rem;
  padding-right: .5rem
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading] {
  padding-top: .375rem;
  padding-bottom: .375rem
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading] {
  font-size: .75rem;
  line-height: 1rem
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading] {
  font-weight: 500
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground))
}

.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pt-0 [cmdk-group]:not([hidden])~[cmdk-group] {
  padding-top: 0
}

.\\[\\&_\\[cmdk-group\\]\\]\\:px-2 [cmdk-group] {
  padding-left: .5rem;
  padding-right: .5rem
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem
}

.\\[\\&_\\[cmdk-input\\]\\]\\:h-12 [cmdk-input] {
  height: 3rem
}

.\\[\\&_\\[cmdk-item\\]\\]\\:px-2 [cmdk-item] {
  padding-left: .5rem;
  padding-right: .5rem
}

.\\[\\&_\\[cmdk-item\\]\\]\\:py-3 [cmdk-item] {
  padding-top: .75rem;
  padding-bottom: .75rem
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:h-5 [cmdk-item] svg {
  height: 1.25rem
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:w-5 [cmdk-item] svg {
  width: 1.25rem
}

.\\[\\&_p\\]\\:leading-relaxed p {
  line-height: 1.625
}

.\\[\\&_svg\\]\\:pointer-events-none svg {
  pointer-events: none
}

.\\[\\&_svg\\]\\:size-4 svg {
  width: 1rem;
  height: 1rem
}

.\\[\\&_svg\\]\\:shrink-0 svg {
  flex-shrink: 0
}

.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child {
  border-width: 0px
}

.\\[\\&_tr\\]\\:border-b tr {
  border-bottom-width: 1px
}

[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-right-2 {
  right: -.5rem
}

[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize {
  cursor: e-resize
}

[data-side=left] .\\[\\[data-side\\=left\\]_\\&\\]\\:cursor-w-resize {
  cursor: w-resize
}

[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-left-2 {
  left: -.5rem
}

[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize {
  cursor: w-resize
}

[data-side=right] .\\[\\[data-side\\=right\\]_\\&\\]\\:cursor-e-resize {
  cursor: e-resize
}`,r8=Ve`${Vi(a8)}`;var u8=Object.create,Pd=Object.defineProperty,i8=Object.getOwnPropertyDescriptor,e2=(n,a)=>(a=Symbol[n])?a:Symbol.for("Symbol."+n),yu=n=>{throw TypeError(n)},l8=(n,a,i)=>a in n?Pd(n,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[a]=i,Cb=(n,a)=>Pd(n,"name",{value:a,configurable:!0}),s8=n=>[,,,u8(n?.[e2("metadata")]??null)],t2=["class","method","getter","setter","accessor","field","value","get","set"],Ai=n=>n!==void 0&&typeof n!="function"?yu("Function expected"):n,o8=(n,a,i,u,s)=>({kind:t2[n],name:a,metadata:u,addInitializer:c=>i._?yu("Already initialized"):s.push(Ai(c||null))}),c8=(n,a)=>l8(a,e2("metadata"),n[3]),At=(n,a,i,u)=>{for(var s=0,c=n[a>>1],f=c&&c.length;s<f;s++)a&1?c[s].call(i):u=c[s].call(i,u);return u},$a=(n,a,i,u,s,c)=>{var f,h,b,m,y,p=a&7,_=!!(a&8),x=!!(a&16),v=p>3?n.length+1:p?_?1:2:0,w=t2[p+5],C=p>3&&(n[v-1]=[]),E=n[v]||(n[v]=[]),q=p&&(!x&&!_&&(s=s.prototype),p<5&&(p>3||!x)&&i8(p<4?s:{get[i](){return Re(this,c)},set[i](z){return Qt(this,c,z)}},i));p?x&&p<4&&Cb(c,(p>2?"set ":p>1?"get ":"")+i):Cb(s,i);for(var R=u.length-1;R>=0;R--)m=o8(p,i,b={},n[3],E),p&&(m.static=_,m.private=x,y=m.access={has:x?z=>d8(s,z):z=>i in z},p^3&&(y.get=x?z=>(p^1?Re:Dt)(z,s,p^4?c:q.get):z=>z[i]),p>2&&(y.set=x?(z,$)=>Qt(z,s,$,p^4?c:q.set):(z,$)=>z[i]=$)),h=(0,u[R])(p?p<4?x?c:q[w]:p>4?void 0:{get:q.get,set:q.set}:s,m),b._=1,p^4||h===void 0?Ai(h)&&(p>4?C.unshift(h):p?x?c=h:q[w]=h:s=h):typeof h!="object"||h===null?yu("Object expected"):(Ai(f=h.get)&&(q.get=f),Ai(f=h.set)&&(q.set=f),Ai(f=h.init)&&C.unshift(f));return p||c8(n,s),q&&Pd(s,i,q),x?p^4?c:q:s},ef=(n,a,i)=>a.has(n)||yu("Cannot "+i),d8=(n,a)=>Object(a)!==a?yu('Cannot use the "in" operator on this value'):n.has(a),Re=(n,a,i)=>(ef(n,a,"read from private field"),i?i.call(n):a.get(n)),Xt=(n,a,i)=>a.has(n)?yu("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(n):a.set(n,i),Qt=(n,a,i,u)=>(ef(n,a,"write to private field"),u?u.call(n,i):a.set(n,i),i),Dt=(n,a,i)=>(ef(n,a,"access private method"),i),n2,a2,r2,u2,i2,l2,s2,vd,o2,Le,tf,nf,td,Us,Ni,ye,af,nd,_d,rf,ad,c2,uf,lf,sf,rd,of,xd,iu,cf,wn,Bs,tu,wd,d2,f2,h2,Sd,p2,qs,m2,b2,Ks;const ud={restaurant:P5,contacts:n8};customElements.get("search-input")||customElements.define("search-input",L5);o2=[Xe("a2ui-shell")];class dr extends(vd=c3(sr),s2=[N3({context:cg})],l2=[ar()],i2=[ar()],u2=[ar()],r2=[ar()],a2=[ar()],n2=[ar()],vd){constructor(){super(...arguments),Xt(this,ye),Xt(this,tf,At(Le,8,this,Bg)),At(Le,11,this),Xt(this,nf,At(Le,12,this,!1)),At(Le,15,this),Xt(this,af,At(Le,16,this,null)),At(Le,19,this),Xt(this,rf,At(Le,20,this,[])),At(Le,23,this),Xt(this,lf,At(Le,24,this,ud.restaurant)),At(Le,27,this),Xt(this,sf,At(Le,28,this,0)),At(Le,31,this),Xt(this,iu),Xt(this,cf,At(Le,32,this,!1)),At(Le,35,this),Xt(this,wn,R_.createSignalA2uiMessageProcessor()),Xt(this,Bs,new ub),Xt(this,tu),Xt(this,wd,[])}connectedCallback(){super.connectedCallback();const i=new URLSearchParams(window.location.search).get("app")||"restaurant";if(this.config=ud[i]||ud.restaurant,this.config.theme&&(this.theme=this.config.theme),window.document.title=this.config.title,window.document.documentElement.style.setProperty("--background",this.config.background),window.AgentWebView&&(window.AgentWebView.initialize({DASHSCOPE_API_KEY:"sk-xxxxx",DASHSCOPE_MODEL:"glm-4.7",DASHSCOPE_BASE_URL:"https://dashscope.aliyuncs.com/compatible-mode/v1",BASE_URL:"http://localhost:10002"}),window.AgentWebView.agentMessageBus&&!window.AgentWebView.agentMessageBus.__patched)){const u=window.AgentWebView.agentMessageBus,s=u._postToNative;u._postToNative=function(c,f){s&&s.call(this,c,f),this._emit(c,f)},u.__patched=!0,console.log("AgentWebView bus patched for local events")}Qt(this,Bs,new ub(this.config.serverUrl,async(u,s,c)=>{const f=u.toString(),h=(s?.method||"GET").toUpperCase(),b=s?.body;if(f==="http://localhost:10002/.well-known/agent-card.json"&&h==="GET")return console.log(`[getAgentCard]: ${JSON.stringify(window.AgentWebView.getAgentCard())}`),new Response(JSON.stringify(window.AgentWebView.getAgentCard()),{status:200,headers:{"Content-Type":"application/json"}});if(f.includes("http://localhost:10002")&&h==="POST"&&typeof b=="string")try{const m=JSON.parse(b);if(m&&m.method&&m.params&&m.params.message&&m.params.message.kind&&m.params.message.parts&&(console.log(`Intercepting matched request based on payload criteria: body: ${JSON.stringify(m)}`),window.AgentWebView)){const p=m.params.message.parts.find(x=>x.kind==="text"),_=p?p.text:"";if(_)try{const x=await new Promise((v,w)=>{const C=E=>{console.log(`get message: ${JSON.stringify(E)}`),E.id&&E.jsonrpc&&E.result&&(window.AgentWebView.off("full-response",C),console.log(`resolve message: ${JSON.stringify(E)}`),v(E))};window.AgentWebView.on("full-response",C),setTimeout(()=>{window.AgentWebView.off("full-response",C),w(new Error("Timeout waiting for agent response"))},6e4),window.AgentWebView.sendTextMessage(_).catch(E=>{window.AgentWebView.off("full-response",C),w(E)})});return new Response(JSON.stringify(x),{status:200,headers:{"Content-Type":"application/json"}})}catch(x){console.error("Error calling AgentWebView:",x)}else if(m.params.message.parts.find(x=>x.kind==="data")){console.log("****data part to send");try{const x=await new Promise((v,w)=>{const C=E=>{console.log(`get UI message: ${JSON.stringify(E)}`),E.id&&E.jsonrpc&&E.result&&(window.AgentWebView.off("full-response",C),console.log(`resolve UI message: ${JSON.stringify(E)}`),v(E))};window.AgentWebView.on("full-response",C),setTimeout(()=>{window.AgentWebView.off("full-response",C),w(new Error("Timeout waiting for agent response"))},6e4),window.AgentWebView.sendCommonEvent(JSON.stringify(m)).catch(E=>{window.AgentWebView.off("full-response",C),w(E)})});return new Response(JSON.stringify(x),{status:200,headers:{"Content-Type":"application/json"}})}catch(x){console.error("Error calling AgentWebView:",x)}}}}catch{}return console.log("Intercepted Request URL:",u),c(u,s)}))}render(){return[Dt(this,ye,h2).call(this),Dt(this,ye,b2).call(this),Dt(this,ye,f2).call(this)]}snackbar(a,i,u=[],s=!1,c=globalThis.crypto.randomUUID(),f=!1){if(!Re(this,tu)){Re(this,wd).push({message:{id:c,message:a,type:i,persistent:s,actions:u},replaceAll:f});return}return Re(this,tu).show({id:c,message:a,type:i,persistent:s,actions:u},f)}unsnackbar(a){Re(this,tu)&&Re(this,tu).hide(a)}}Le=s8(vd);tf=new WeakMap;nf=new WeakMap;ye=new WeakSet;af=new WeakMap;rf=new WeakMap;lf=new WeakMap;sf=new WeakMap;iu=new WeakMap;cf=new WeakMap;wn=new WeakMap;Bs=new WeakMap;tu=new WeakMap;wd=new WeakMap;d2=function(n){const a=n;Dt(this,ye,Ks).call(this,a)};f2=function(){return Re(this,ye,_d)?G`<div class="error">${Re(this,ye,_d)}</div>`:I};h2=function(){return Re(this,ye,Us)||Re(this,ye,c2).length>0?I:G`
    <div class="flex flex-col items-center justify-center min-h-screen p-4 safe-area-bottom">
      <div class="flex flex-col items-center gap-6 w-full fade-in">
        
        <!-- 英雄图：完全照搬 React 结构 -->
        <div class="relative">
          <img
            src=${this.config.heroImage}
            alt="智能订餐助手"
            class="w-72 h-48 sm:w-80 sm:h-56 object-cover rounded-2xl shadow-card transition-opacity duration-500 ${this._imageLoaded?"opacity-100":"opacity-0"}"
            @load=${()=>{this._imageLoaded=!0}}
          />
          ${this._imageLoaded?I:G`
            <div class="absolute inset-0 w-72 h-48 sm:w-80 sm:h-56 rounded-2xl bg-muted skeleton-shimmer"></div>
          `}
        </div>

        <!-- 标题 & 副标题 -->
        <div class="text-center space-y-2">
          <h1 class="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            ${this.config.title}
          </h1>
          <p class="text-sm text-muted-foreground">
            告诉我您想吃什么，为您推荐最佳餐厅
          </p>
        </div>

        <search-input
          .onSearch=${n=>Dt(this,ye,d2).call(this,n)}   // 属性注入
          .isLoading=${Re(this,ye,Us)}
          @submit=${async n=>{n.preventDefault();const i=new FormData(n.target).get("body");i&&(await Dt(this,ye,Ks).call(this,i),n.target.reset())}}
        ></search-input>
      </div>
    </div>
  `};Sd=function(){Qt(this,ye,[],uf),Qt(this,ye,!1,Ni),Dt(this,ye,qs).call(this),Re(this,wn).clearSurfaces()};p2=function(){Array.isArray(this.config.loadingText)&&this.config.loadingText.length>1&&(Qt(this,ye,0,xd),Qt(this,iu,window.setInterval(()=>{Qt(this,ye,(Re(this,ye,of)+1)%this.config.loadingText.length,xd)},2e3)))};qs=function(){Re(this,iu)&&(clearInterval(Re(this,iu)),Qt(this,iu,void 0))};m2=async function(n){try{Qt(this,ye,!0,Ni),Dt(this,ye,p2).call(this);const a=Re(this,Bs).send(n);return await a,Qt(this,ye,!1,Ni),Dt(this,ye,qs).call(this),a}catch(a){this.snackbar(a,Mi.ERROR)}finally{Qt(this,ye,!1,Ni),Dt(this,ye,qs).call(this)}return[]};b2=function(){if(Re(this,ye,Us)){let a="Awaiting an answer...";return this.config.loadingText&&(Array.isArray(this.config.loadingText)?a=this.config.loadingText[Re(this,ye,of)]:a=this.config.loadingText),G`
       <div class="surface-toolbar">
        <button class="back-btn" @click=${Dt(this,ye,Sd)}>返回</button>
      </div>
      <div class="pending">
        <div class="spinner"></div>
        <div class="loading-text">${a}</div>
      </div>`}return Re(this,wn).getSurfaces().size===0?I:G`<section id="surfaces">
      <div class="surface-toolbar">
        <button class="back-btn" @click=${Dt(this,ye,Sd)}>返回</button>
      </div>
      ${Oi(Re(this,wn).getSurfaces(),([a])=>a,([a,i])=>G`<a2ui-surface
              @a2uiaction=${async u=>{const[s]=u.composedPath();if(!(s instanceof HTMLElement))return;const c={};if(u.detail.action.context){const h=u.detail.action.context;for(const b of h)if(b.value.literalBoolean)c[b.key]=b.value.literalBoolean;else if(b.value.literalNumber)c[b.key]=b.value.literalNumber;else if(b.value.literalString)c[b.key]=b.value.literalString;else if(b.value.path){const m=Re(this,wn).resolvePath(b.value.path,u.detail.dataContextPath),y=Re(this,wn).getData(u.detail.sourceComponent,m,a);c[b.key]=y}}const f={userAction:{name:u.detail.action.name,surfaceId:a,sourceComponentId:s.id,timestamp:new Date().toISOString(),context:c}};await Dt(this,ye,Ks).call(this,f)}}
              .surfaceId=${a}
              .surface=${i}
              .processor=${Re(this,wn)}
            ></a2-uisurface>`)}
    </section>`};Ks=async function(n){const a=await Dt(this,ye,m2).call(this,n);console.log(a),Qt(this,ye,a,uf),Re(this,wn).clearSurfaces(),Re(this,wn).processMessages(a)};$a(Le,4,"theme",s2,dr,tf);td=$a(Le,20,"#requesting",l2,ye,nf),Us=td.get,Ni=td.set;nd=$a(Le,20,"#error",i2,ye,af),_d=nd.get,nd.set;ad=$a(Le,20,"#lastMessages",u2,ye,rf),c2=ad.get,uf=ad.set;$a(Le,4,"config",r2,dr,lf);rd=$a(Le,20,"#loadingTextIndex",a2,ye,sf),of=rd.get,xd=rd.set;$a(Le,4,"_imageLoaded",n2,dr,cf);dr=$a(Le,0,"A2UILayoutEditor",o2,dr);dr.styles=[Vi(Nd),r8,Ve`
      search-input {
        max-width: 28rem;
        width: 100%;
    }
     /* 返回按钮容器 - 加载页 */
  .pending .back-btn {
    margin-top: 24px;
  }

  /* 返回按钮容器 - 结果页 */
  .surface-toolbar {
    width: 100%;
    padding: 12px 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /* 按钮本体 */
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: 1px solid var(--n-70);
    background: linear-gradient(135deg, var(--n-95) 0%, var(--n-100) 100%);
    color: var(--n-20);
    border-radius: 999px;          /* 药丸形状 */
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    box-shadow: 0 2px 6px rgba(0,0,0,.08);
    user-select: none;
  }

  /* 图标 */
  .back-btn .icon {
    font-family: 'Material Icons';
    font-size: 20px;
    line-height: 1;
    transition: transform 0.3s;
  }

  /* 悬停动效 */
  .back-btn:hover {
    border-color: var(--p-60);
    background: linear-gradient(135deg, var(--p-95) 0%, var(--p-90) 100%);
    color: var(--p-40);
    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.25);
  }
  .back-btn:hover .icon {
    transform: translateX(-4px);
  }

  /* 点击微缩 */
  .back-btn:active {
    transform: scale(0.96);
    box-shadow: 0 1px 4px rgba(0,0,0,.12);
  }

  /* 暗色主题适配 */
  @container style(--color-scheme: dark) {
    .back-btn {
      border-color: var(--n-50);
      background: linear-gradient(135deg, var(--n-20) 0%, var(--n-10) 100%);
      color: var(--n-90);
    }
    .back-btn:hover {
      border-color: var(--p-40);
      background: linear-gradient(135deg, var(--p-20) 0%, var(--p-10) 100%);
      color: white;
    }
  }
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
        max-width: 640px;
        margin: 0 auto;
        min-height: 100%;
        color: light-dark(var(--n-10), var(--n-90));
        font-family: var(--font-family);
      }

      #hero-img {
        width: 100%;
        max-width: 400px;
        aspect-ratio: 1280/720;
        height: auto;
        margin-bottom: var(--bb-grid-size-6);
        display: block;
        margin: 0 auto;
        background: var(--background-image-light) center center / contain
          no-repeat;
      }

      #surfaces {
        width: 100%;
        max-width: 100svw;
        padding: var(--bb-grid-size-3);
        animation: fadeIn 1s cubic-bezier(0, 0, 0.3, 1) 0.3s backwards;
      }

      .rotate {
        animation: rotate 1s linear infinite;
      }

      .pending {
        width: 100%;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation: fadeIn 1s cubic-bezier(0, 0, 0.3, 1) 0.3s backwards;
        gap: 16px;
      }

      .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-left-color: var(--p-60);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      .theme-toggle {
        padding: 0;
        margin: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: var(--bb-grid-size-3);
        right: var(--bb-grid-size-4);
        background: light-dark(var(--n-100), var(--n-0));
        border-radius: 50%;
        color: var(--p-30);
        cursor: pointer;
        width: 48px;
        height: 48px;
        font-size: 32px;

        & .g-icon {
          pointer-events: none;

          &::before {
            content: "dark_mode";
          }
        }
      }

      @container style(--color-scheme: dark) {
        .theme-toggle .g-icon::before {
          content: "light_mode";
          color: var(--n-90);
        }

        #hero-img {
          background-image: var(--background-image-dark);
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.6;
        }
      }

      .error {
        color: var(--e-40);
        background-color: var(--e-95);
        border: 1px solid var(--e-80);
        padding: 16px;
        border-radius: 8px;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes rotate {
        from {
          rotate: 0deg;
        }

        to {
          rotate: 360deg;
        }
      }
    `];At(Le,1,dr);
