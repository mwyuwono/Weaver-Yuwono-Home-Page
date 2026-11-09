var Gl=Object.defineProperty;var Vl=(i,t,e)=>t in i?Gl(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Wt=(i,t,e)=>Vl(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Wl="modulepreload",Xl=function(i,t){return new URL(i,t).href},ha={},Bs=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(e.map(l=>{if(l=Xl(l,n),l in ha)return;ha[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let g=o.length-1;g>=0;g--){const _=o[g];if(_.href===l&&(!h||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":Wl,h||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((g,_)=>{d.addEventListener("load",g),d.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="170",gi={ROTATE:0,DOLLY:1,PAN:2},di={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yl=0,ua=1,ql=2,Zc=1,Zl=2,Ke=3,Cn=0,Ce=1,Ye=2,An=0,_i=1,fa=2,da=3,pa=4,jl=5,Bn=100,Kl=101,$l=102,Jl=103,Ql=104,th=200,eh=201,nh=202,ih=203,ks=204,Hs=205,rh=206,sh=207,oh=208,ah=209,ch=210,lh=211,hh=212,uh=213,fh=214,Gs=0,Vs=1,Ws=2,Si=3,Xs=4,Ys=5,qs=6,Zs=7,Io=0,dh=1,ph=2,Rn=0,mh=1,gh=2,_h=3,vh=4,xh=5,Mh=6,Sh=7,jc=300,yi=301,Ei=302,js=303,Ks=304,Yr=306,$s=1e3,Hn=1001,Js=1002,Pe=1003,yh=1004,ir=1005,Qe=1006,es=1007,Gn=1008,dn=1009,Kc=1010,$c=1011,qi=1012,No=1013,Vn=1014,ln=1015,Ai=1016,Fo=1017,Oo=1018,bi=1020,Jc=35902,Qc=1021,tl=1022,qe=1023,el=1024,nl=1025,vi=1026,Ti=1027,il=1028,zo=1029,rl=1030,Bo=1031,ko=1033,Ur=33776,Ir=33777,Nr=33778,Fr=33779,Qs=35840,to=35841,eo=35842,no=35843,io=36196,ro=37492,so=37496,oo=37808,ao=37809,co=37810,lo=37811,ho=37812,uo=37813,fo=37814,po=37815,mo=37816,go=37817,_o=37818,vo=37819,xo=37820,Mo=37821,Or=36492,So=36494,yo=36495,sl=36283,Eo=36284,bo=36285,To=36286,Eh=3200,bh=3201,ol=0,Th=1,Tn="",ze="srgb",Ri="srgb-linear",qr="linear",Qt="srgb",Kn=7680,ma=519,wh=512,Ah=513,Rh=514,al=515,Ch=516,Ph=517,Lh=518,Dh=519,ga=35044,_a="300 es",hn=2e3,Hr=2001;class Yn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Se=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let va=1234567;const xi=Math.PI/180,Zi=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Se[i&255]+Se[i>>8&255]+Se[i>>16&255]+Se[i>>24&255]+"-"+Se[t&255]+Se[t>>8&255]+"-"+Se[t>>16&15|64]+Se[t>>24&255]+"-"+Se[e&63|128]+Se[e>>8&255]+"-"+Se[e>>16&255]+Se[e>>24&255]+Se[n&255]+Se[n>>8&255]+Se[n>>16&255]+Se[n>>24&255]).toLowerCase()}function ge(i,t,e){return Math.max(t,Math.min(e,i))}function Ho(i,t){return(i%t+t)%t}function Uh(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function Ih(i,t,e){return i!==t?(e-i)/(t-i):0}function Wi(i,t,e){return(1-e)*i+e*t}function Nh(i,t,e,n){return Wi(i,t,1-Math.exp(-e*n))}function Fh(i,t=1){return t-Math.abs(Ho(i,t*2)-t)}function Oh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Bh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function kh(i,t){return i+Math.random()*(t-i)}function Hh(i){return i*(.5-Math.random())}function Gh(i){i!==void 0&&(va=i);let t=va+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vh(i){return i*xi}function Wh(i){return i*Zi}function Xh(i){return(i&i-1)===0&&i!==0}function Yh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Zh(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(r){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function fi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Go={DEG2RAD:xi,RAD2DEG:Zi,generateUUID:qn,clamp:ge,euclideanModulo:Ho,mapLinear:Uh,inverseLerp:Ih,lerp:Wi,damp:Nh,pingpong:Fh,smoothstep:Oh,smootherstep:zh,randInt:Bh,randFloat:kh,randFloatSpread:Hh,seededRandom:Gh,degToRad:Vh,radToDeg:Wh,isPowerOfTwo:Xh,ceilPowerOfTwo:Yh,floorPowerOfTwo:qh,setQuaternionFromProperEuler:Zh,normalize:be,denormalize:fi};class J{constructor(t=0,e=0){J.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(t,e,n,r,s,o,a,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l)}set(t,e,n,r,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],M=r[1],S=r[4],v=r[7],L=r[2],A=r[5],R=r[8];return s[0]=o*_+a*M+c*L,s[3]=o*m+a*S+c*A,s[6]=o*p+a*v+c*R,s[1]=l*_+h*M+u*L,s[4]=l*m+h*S+u*A,s[7]=l*p+h*v+u*R,s[2]=f*_+d*M+g*L,s[5]=f*m+d*S+g*A,s[8]=f*p+d*v+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*s,d=l*s-o*c,g=e*u+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*l-h*n)*_,t[2]=(a*n-r*o)*_,t[3]=f*_,t[4]=(h*e-r*c)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ns.makeScale(t,e)),this}rotate(t){return this.premultiply(ns.makeRotation(-t)),this}translate(t,e){return this.premultiply(ns.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ns=new zt;function cl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jh(){const i=Gr("canvas");return i.style.display="block",i}const xa={};function ki(i){i in xa||(xa[i]=!0,console.warn(i))}function Kh(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function $h(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xt={enabled:!0,workingColorSpace:Ri,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Qt&&(i.r=un(i.r),i.g=un(i.g),i.b=un(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Qt&&(i.r=Mi(i.r),i.g=Mi(i.g),i.b=Mi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Tn?qr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Mi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ma=[.64,.33,.3,.6,.15,.06],Sa=[.2126,.7152,.0722],ya=[.3127,.329],Ea=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ba=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xt.define({[Ri]:{primaries:Ma,whitePoint:ya,transfer:qr,toXYZ:Ea,fromXYZ:ba,luminanceCoefficients:Sa,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:Ma,whitePoint:ya,transfer:Qt,toXYZ:Ea,fromXYZ:ba,luminanceCoefficients:Sa,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}});let $n;class Qh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{$n===void 0&&($n=Gr("canvas")),$n.width=t.width,$n.height=t.height;const n=$n.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=$n}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Gr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=un(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(un(e[n]/255)*255):e[n]=un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let tu=0;class ll{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(is(r[o].image)):s.push(is(r[o]))}else s=is(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function is(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eu=0;class Le extends Yn{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=Hn,r=Hn,s=Qe,o=Gn,a=qe,c=dn,l=Le.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=qn(),this.name="",this.source=new ll(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $s:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case Js:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $s:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case Js:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=jc;Le.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,r=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(d+1)/2,L=(p+1)/2,A=(h+f)/4,R=(u+_)/4,D=(g+m)/4;return S>v&&S>L?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=A/n,s=R/n):v>L?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=A/r,s=D/r):L<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),n=R/s,r=D/s),this.set(n,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nu extends Yn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Le(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ll(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends nu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class hl extends Le{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class iu extends Le{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],l=n[r+1],h=n[r+2],u=n[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-a;const p=c*f+l*d+h*g+u*_,M=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const L=Math.sqrt(S),A=Math.atan2(L,p*M);m=Math.sin(m*A)/L,a=Math.sin(a*A)/L}const v=a*M;if(c=c*m+f*v,l=l*m+d*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],h=n[r+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(r/2),u=a(s/2),f=c(n/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-r*a,this._w=o*h-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ta.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ta.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*n),h=2*(a*e-s*r),u=2*(s*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=r+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return rs.copy(this).projectOnVector(t),this.sub(rs)}reflect(t){return this.sub(rs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const rs=new C,Ta=new pn;class Zn{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ve):Ve.fromBufferAttribute(s,o),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ni),sr.subVectors(this.max,Ni),Jn.subVectors(t.a,Ni),Qn.subVectors(t.b,Ni),ti.subVectors(t.c,Ni),vn.subVectors(Qn,Jn),xn.subVectors(ti,Qn),Dn.subVectors(Jn,ti);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Dn.z,Dn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Dn.z,0,-Dn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Dn.y,Dn.x,0];return!ss(e,Jn,Qn,ti,sr)||(e=[1,0,0,0,1,0,0,0,1],!ss(e,Jn,Qn,ti,sr))?!1:(or.crossVectors(vn,xn),e=[or.x,or.y,or.z],ss(e,Jn,Qn,ti,sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rn=[new C,new C,new C,new C,new C,new C,new C,new C],Ve=new C,rr=new Zn,Jn=new C,Qn=new C,ti=new C,vn=new C,xn=new C,Dn=new C,Ni=new C,sr=new C,or=new C,Un=new C;function ss(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Un.fromArray(i,s);const a=r.x*Math.abs(Un.x)+r.y*Math.abs(Un.y)+r.z*Math.abs(Un.z),c=t.dot(Un),l=e.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const ru=new Zn,Fi=new C,os=new C;class Zr{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ru.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);const e=Fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Fi,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(os.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(os)),this.expandByPoint(Fi.copy(t.center).sub(os))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new C,as=new C,ar=new C,Mn=new C,cs=new C,cr=new C,ls=new C;class Vo{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){as.copy(t).add(e).multiplyScalar(.5),ar.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(as);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ar),a=Mn.dot(this.direction),c=-Mn.dot(ar),l=Mn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-c),s),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-c),s),d=-u*u+f*(f+2*c)+l);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(as).addScaledVector(ar,f),d}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const n=sn.dot(this.direction),r=sn.dot(sn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,r,s){cs.subVectors(e,t),cr.subVectors(n,t),ls.crossVectors(cs,cr);let o=this.direction.dot(ls),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mn.subVectors(this.origin,t);const c=a*this.direction.dot(cr.crossVectors(Mn,cr));if(c<0)return null;const l=a*this.direction.dot(cs.cross(Mn));if(l<0||c+l>o)return null;const h=-a*Mn.dot(ls);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(t,e,n,r,s,o,a,c,l,h,u,f,d,g,_,m){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l,h,u,f,d,g,_,m)}set(t,e,n,r,s,o,a,c,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/ei.setFromMatrixColumn(t,0).length(),s=1/ei.setFromMatrixColumn(t,1).length(),o=1/ei.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(su,t,ou)}lookAt(t,e,n){const r=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),Sn.crossVectors(n,Ue),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),Sn.crossVectors(n,Ue)),Sn.normalize(),lr.crossVectors(Ue,Sn),r[0]=Sn.x,r[4]=lr.x,r[8]=Ue.x,r[1]=Sn.y,r[5]=lr.y,r[9]=Ue.y,r[2]=Sn.z,r[6]=lr.z,r[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],S=n[7],v=n[11],L=n[15],A=r[0],R=r[4],D=r[8],b=r[12],E=r[1],P=r[5],Y=r[9],B=r[13],V=r[2],$=r[6],G=r[10],et=r[14],k=r[3],at=r[7],pt=r[11],Mt=r[15];return s[0]=o*A+a*E+c*V+l*k,s[4]=o*R+a*P+c*$+l*at,s[8]=o*D+a*Y+c*G+l*pt,s[12]=o*b+a*B+c*et+l*Mt,s[1]=h*A+u*E+f*V+d*k,s[5]=h*R+u*P+f*$+d*at,s[9]=h*D+u*Y+f*G+d*pt,s[13]=h*b+u*B+f*et+d*Mt,s[2]=g*A+_*E+m*V+p*k,s[6]=g*R+_*P+m*$+p*at,s[10]=g*D+_*Y+m*G+p*pt,s[14]=g*b+_*B+m*et+p*Mt,s[3]=M*A+S*E+v*V+L*k,s[7]=M*R+S*P+v*$+L*at,s[11]=M*D+S*Y+v*G+L*pt,s[15]=M*b+S*B+v*et+L*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*c*u-r*l*u-s*a*f+n*l*f+r*a*d-n*c*d)+_*(+e*c*d-e*l*f+s*o*f-r*o*d+r*l*h-s*c*h)+m*(+e*l*u-e*a*d-s*o*u+n*o*d+s*a*h-n*l*h)+p*(-r*a*h-e*c*u+e*a*f+r*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=u*m*l-_*f*l+_*c*d-a*m*d-u*c*p+a*f*p,S=g*f*l-h*m*l-g*c*d+o*m*d+h*c*p-o*f*p,v=h*_*l-g*u*l+g*a*d-o*_*d-h*a*p+o*u*p,L=g*u*c-h*_*c-g*a*f+o*_*f+h*a*m-o*u*m,A=e*M+n*S+r*v+s*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=M*R,t[1]=(_*f*s-u*m*s-_*r*d+n*m*d+u*r*p-n*f*p)*R,t[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*p+n*c*p)*R,t[3]=(u*c*s-a*f*s-u*r*l+n*f*l+a*r*d-n*c*d)*R,t[4]=S*R,t[5]=(h*m*s-g*f*s+g*r*d-e*m*d-h*r*p+e*f*p)*R,t[6]=(g*c*s-o*m*s-g*r*l+e*m*l+o*r*p-e*c*p)*R,t[7]=(o*f*s-h*c*s+h*r*l-e*f*l-o*r*d+e*c*d)*R,t[8]=v*R,t[9]=(g*u*s-h*_*s-g*n*d+e*_*d+h*n*p-e*u*p)*R,t[10]=(o*_*s-g*a*s+g*n*l-e*_*l-o*n*p+e*a*p)*R,t[11]=(h*a*s-o*u*s-h*n*l+e*u*l+o*n*d-e*a*d)*R,t[12]=L*R,t[13]=(h*_*r-g*u*r+g*n*f-e*_*f-h*n*m+e*u*m)*R,t[14]=(g*a*r-o*_*r-g*n*c+e*_*c+o*n*m-e*a*m)*R,t[15]=(o*u*r-h*a*r+h*n*c-e*u*c-o*n*f+e*a*f)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+n,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,u=a+a,f=s*l,d=s*h,g=s*u,_=o*h,m=o*u,p=a*u,M=c*l,S=c*h,v=c*u,L=n.x,A=n.y,R=n.z;return r[0]=(1-(_+p))*L,r[1]=(d+v)*L,r[2]=(g-S)*L,r[3]=0,r[4]=(d-v)*A,r[5]=(1-(f+p))*A,r[6]=(m+M)*A,r[7]=0,r[8]=(g+S)*R,r[9]=(m-M)*R,r[10]=(1-(f+_))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=ei.set(r[0],r[1],r[2]).length();const o=ei.set(r[4],r[5],r[6]).length(),a=ei.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],We.copy(this);const l=1/s,h=1/o,u=1/a;return We.elements[0]*=l,We.elements[1]*=l,We.elements[2]*=l,We.elements[4]*=h,We.elements[5]*=h,We.elements[6]*=h,We.elements[8]*=u,We.elements[9]*=u,We.elements[10]*=u,e.setFromRotationMatrix(We),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=hn){const c=this.elements,l=2*s/(e-t),h=2*s/(n-r),u=(e+t)/(e-t),f=(n+r)/(n-r);let d,g;if(a===hn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Hr)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=hn){const c=this.elements,l=1/(e-t),h=1/(n-r),u=1/(o-s),f=(e+t)*l,d=(n+r)*h;let g,_;if(a===hn)g=(o+s)*u,_=-2*u;else if(a===Hr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ei=new C,We=new Zt,su=new C(0,0,0),ou=new C(1,1,1),Sn=new C,lr=new C,Ue=new C,wa=new Zt,Aa=new pn;class Ze{constructor(t=0,e=0,n=0,r=Ze.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],u=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Aa.setFromEuler(this),this.setFromQuaternion(Aa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ze.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let au=0;const Ra=new C,ni=new pn,on=new Zt,hr=new C,Oi=new C,cu=new C,lu=new pn,Ca=new C(1,0,0),Pa=new C(0,1,0),La=new C(0,0,1),Da={type:"added"},hu={type:"removed"},ii={type:"childadded",child:null},hs={type:"childremoved",child:null};class xe extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new C,e=new Ze,n=new pn,r=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Zt},normalMatrix:{value:new zt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.multiply(ni),this}rotateOnWorldAxis(t,e){return ni.setFromAxisAngle(t,e),this.quaternion.premultiply(ni),this}rotateX(t){return this.rotateOnAxis(Ca,t)}rotateY(t){return this.rotateOnAxis(Pa,t)}rotateZ(t){return this.rotateOnAxis(La,t)}translateOnAxis(t,e){return Ra.copy(t).applyQuaternion(this.quaternion),this.position.add(Ra.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ca,t)}translateY(t){return this.translateOnAxis(Pa,t)}translateZ(t){return this.translateOnAxis(La,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hr.copy(t):hr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Oi,hr,this.up):on.lookAt(hr,Oi,this.up),this.quaternion.setFromRotationMatrix(on),r&&(on.extractRotation(r.matrixWorld),ni.setFromRotationMatrix(on),this.quaternion.premultiply(ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Da),ii.child=t,this.dispatchEvent(ii),ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hu),hs.child=t,this.dispatchEvent(hs),hs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),on.multiply(t.parent.matrixWorld)),t.applyMatrix4(on),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Da),ii.child=t,this.dispatchEvent(ii),ii.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,t,cu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,lu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}xe.DEFAULT_UP=new C(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xe=new C,an=new C,us=new C,cn=new C,ri=new C,si=new C,Ua=new C,fs=new C,ds=new C,ps=new C,ms=new se,gs=new se,_s=new se;class ke{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Xe.subVectors(t,e),r.cross(Xe);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Xe.subVectors(r,e),an.subVectors(n,e),us.subVectors(t,e);const o=Xe.dot(Xe),a=Xe.dot(an),c=Xe.dot(us),l=an.dot(an),h=an.dot(us),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,cn.x),c.addScaledVector(o,cn.y),c.addScaledVector(a,cn.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return ms.setScalar(0),gs.setScalar(0),_s.setScalar(0),ms.fromBufferAttribute(t,e),gs.fromBufferAttribute(t,n),_s.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ms,s.x),o.addScaledVector(gs,s.y),o.addScaledVector(_s,s.z),o}static isFrontFacing(t,e,n,r){return Xe.subVectors(n,e),an.subVectors(t,e),Xe.cross(an).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xe.subVectors(this.c,this.b),an.subVectors(this.a,this.b),Xe.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return ke.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;ri.subVectors(r,n),si.subVectors(s,n),fs.subVectors(t,n);const c=ri.dot(fs),l=si.dot(fs);if(c<=0&&l<=0)return e.copy(n);ds.subVectors(t,r);const h=ri.dot(ds),u=si.dot(ds);if(h>=0&&u<=h)return e.copy(r);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ri,o);ps.subVectors(t,s);const d=ri.dot(ps),g=si.dot(ps);if(g>=0&&d<=g)return e.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(si,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Ua.subVectors(s,r),a=(u-h)/(u-h+(d-g)),e.copy(r).addScaledVector(Ua,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(ri,o).addScaledVector(si,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const fl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},ur={h:0,s:0,l:0};function vs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Xt.workingColorSpace){if(t=Ho(t,1),e=ge(e,0,1),n=ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=vs(o,s,t+1/3),this.g=vs(o,s,t),this.b=vs(o,s,t-1/3)}return Xt.toWorkingColorSpace(this,r),this}setStyle(t,e=ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){const n=fl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=un(t.r),this.g=un(t.g),this.b=un(t.b),this}copyLinearToSRGB(t){return this.r=Mi(t.r),this.g=Mi(t.g),this.b=Mi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return Xt.fromWorkingColorSpace(ye.copy(this),t),Math.round(ge(ye.r*255,0,255))*65536+Math.round(ge(ye.g*255,0,255))*256+Math.round(ge(ye.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(ye.copy(this),e);const n=ye.r,r=ye.g,s=ye.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(ye.copy(this),e),t.r=ye.r,t.g=ye.g,t.b=ye.b,t}getStyle(t=ze){Xt.fromWorkingColorSpace(ye.copy(this),t);const e=ye.r,n=ye.g,r=ye.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(ur);const n=Wi(yn.h,ur.h,e),r=Wi(yn.s,ur.s,e),s=Wi(yn.l,ur.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ye=new qt;qt.NAMES=fl;let uu=0;class Ci extends Yn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=qn(),this.name="",this.blending=_i,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ks,this.blendDst=Hs,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Si,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ks&&(n.blendSrc=this.blendSrc),this.blendDst!==Hs&&(n.blendDst=this.blendDst),this.blendEquation!==Bn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Si&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class dl extends Ci{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ce=new C,fr=new J;class Ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ga,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fr.fromBufferAttribute(this,e),fr.applyMatrix3(t),this.setXY(e,fr.x,fr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix3(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix4(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ce.fromBufferAttribute(this,e),ce.applyNormalMatrix(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ce.fromBufferAttribute(this,e),ce.transformDirection(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),r=be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),r=be(r,this.array),s=be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ga&&(t.usage=this.usage),t}}class pl extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ml extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let fu=0;const Oe=new Zt,xs=new xe,oi=new C,Ie=new Zn,zi=new Zn,pe=new C;class Ee extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(cl(t)?ml:pl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new zt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,n){return Oe.makeTranslation(t,e,n),this.applyMatrix4(Oe),this}scale(t,e,n){return Oe.makeScale(t,e,n),this.applyMatrix4(Oe),this}lookAt(t){return xs.lookAt(t),xs.updateMatrix(),this.applyMatrix4(xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oi).negate(),this.translate(oi.x,oi.y,oi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _e(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Ie.setFromBufferAttribute(s),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];zi.setFromBufferAttribute(a),this.morphTargetsRelative?(pe.addVectors(Ie.min,zi.min),Ie.expandByPoint(pe),pe.addVectors(Ie.max,zi.max),Ie.expandByPoint(pe)):(Ie.expandByPoint(zi.min),Ie.expandByPoint(zi.max))}Ie.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)pe.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(pe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)pe.fromBufferAttribute(a,l),c&&(oi.fromBufferAttribute(t,l),pe.add(oi)),r=Math.max(r,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new C,c[D]=new C;const l=new C,h=new C,u=new C,f=new J,d=new J,g=new J,_=new C,m=new C;function p(D,b,E){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,E),f.fromBufferAttribute(s,D),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,E),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[D].add(_),a[b].add(_),a[E].add(_),c[D].add(m),c[b].add(m),c[E].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let D=0,b=M.length;D<b;++D){const E=M[D],P=E.start,Y=E.count;for(let B=P,V=P+Y;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const S=new C,v=new C,L=new C,A=new C;function R(D){L.fromBufferAttribute(r,D),A.copy(L);const b=a[D];S.copy(b),S.sub(L.multiplyScalar(L.dot(b))).normalize(),v.crossVectors(A,b);const P=v.dot(c[D])<0?-1:1;o.setXYZW(D,S.x,S.y,S.z,P)}for(let D=0,b=M.length;D<b;++D){const E=M[D],P=E.start,Y=E.count;for(let B=P,V=P+Y;B<V;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new C,s=new C,o=new C,a=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Ne(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ia=new Zt,In=new Vo,dr=new Zr,Na=new C,pr=new C,mr=new C,gr=new C,Ms=new C,_r=new C,Fa=new C,vr=new C;class we extends xe{constructor(t=new Ee,e=new dl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){_r.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Ms.fromBufferAttribute(u,t),o?_r.addScaledVector(Ms,h):_r.addScaledVector(Ms.sub(e),h))}e.add(_r)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),In.copy(t.ray).recast(t.near),!(dr.containsPoint(In.origin)===!1&&(In.intersectSphere(dr,Na)===null||In.origin.distanceToSquared(Na)>(t.far-t.near)**2))&&(Ia.copy(s).invert(),In.copy(t.ray).applyMatrix4(Ia),!(n.boundingBox!==null&&In.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,In)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,L=S;v<L;v+=3){const A=a.getX(v),R=a.getX(v+1),D=a.getX(v+2);r=xr(this,p,t,n,l,h,u,A,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);r=xr(this,o,t,n,l,h,u,M,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,L=S;v<L;v+=3){const A=v,R=v+1,D=v+2;r=xr(this,p,t,n,l,h,u,A,R,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,S=m+1,v=m+2;r=xr(this,o,t,n,l,h,u,M,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function du(i,t,e,n,r,s,o,a){let c;if(t.side===Ce?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===Cn,a),c===null)return null;vr.copy(a),vr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(vr);return l<e.near||l>e.far?null:{distance:l,point:vr.clone(),object:i}}function xr(i,t,e,n,r,s,o,a,c,l){i.getVertexPosition(a,pr),i.getVertexPosition(c,mr),i.getVertexPosition(l,gr);const h=du(i,t,e,n,pr,mr,gr,Fa);if(h){const u=new C;ke.getBarycoord(Fa,pr,mr,gr,u),r&&(h.uv=ke.getInterpolatedAttribute(r,a,c,l,u,new J)),s&&(h.uv1=ke.getInterpolatedAttribute(s,a,c,l,u,new J)),o&&(h.normal=ke.getInterpolatedAttribute(o,a,c,l,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new C,materialIndex:0};ke.getNormal(pr,mr,gr,f.normal),h.face=f,h.barycoord=u}return h}class Pi extends Ee{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(h,3)),this.setAttribute("uv",new _e(u,2));function g(_,m,p,M,S,v,L,A,R,D,b){const E=v/R,P=L/D,Y=v/2,B=L/2,V=A/2,$=R+1,G=D+1;let et=0,k=0;const at=new C;for(let pt=0;pt<G;pt++){const Mt=pt*P-B;for(let Nt=0;Nt<$;Nt++){const jt=Nt*E-Y;at[_]=jt*M,at[m]=Mt*S,at[p]=V,l.push(at.x,at.y,at.z),at[_]=0,at[m]=0,at[p]=A>0?1:-1,h.push(at.x,at.y,at.z),u.push(Nt/R),u.push(1-pt/D),et+=1}}for(let pt=0;pt<D;pt++)for(let Mt=0;Mt<R;Mt++){const Nt=f+Mt+$*pt,jt=f+Mt+$*(pt+1),q=f+(Mt+1)+$*(pt+1),it=f+(Mt+1)+$*pt;c.push(Nt,jt,it),c.push(jt,q,it),k+=6}a.addGroup(d,k,b),d+=k,f+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function wi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Te(i){const t={};for(let e=0;e<i.length;e++){const n=wi(i[e]);for(const r in n)t[r]=n[r]}return t}function pu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const mu={clone:wi,merge:Te};var gu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_u=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mn extends Ci{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gu,this.fragmentShader=_u,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wi(t.uniforms),this.uniformsGroups=pu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class _l extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new C,Oa=new J,za=new J;class Be extends _l{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(xi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,Oa,za),e.subVectors(za,Oa)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xi*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,ci=1;class vu extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Be(ai,ci,t,e);r.layers=this.layers,this.add(r);const s=new Be(ai,ci,t,e);s.layers=this.layers,this.add(s);const o=new Be(ai,ci,t,e);o.layers=this.layers,this.add(o);const a=new Be(ai,ci,t,e);a.layers=this.layers,this.add(a);const c=new Be(ai,ci,t,e);c.layers=this.layers,this.add(c);const l=new Be(ai,ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===hn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class vl extends Le{constructor(t,e,n,r,s,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:yi,super(t,e,n,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class xu extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new vl(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Qe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Pi(5,5,5),s=new mn({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:An});s.uniforms.tEquirect.value=e;const o=new we(r,s),a=e.minFilter;return e.minFilter===Gn&&(e.minFilter=Qe),new vu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const Ss=new C,Mu=new C,Su=new zt;class bn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Ss.subVectors(n,e).cross(Mu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ss),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Su.getNormalMatrix(t),r=this.coplanarPoint(Ss).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new Zr,Mr=new C;class Wo{constructor(t=new bn,e=new bn,n=new bn,r=new bn,s=new bn,o=new bn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hn){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],h=r[5],u=r[6],f=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],M=r[13],S=r[14],v=r[15];if(n[0].setComponents(c-s,f-l,m-d,v-p).normalize(),n[1].setComponents(c+s,f+l,m+d,v+p).normalize(),n[2].setComponents(c+o,f+h,m+g,v+M).normalize(),n[3].setComponents(c-o,f-h,m-g,v-M).normalize(),n[4].setComponents(c-a,f-u,m-_,v-S).normalize(),e===hn)n[5].setComponents(c+a,f+u,m+_,v+S).normalize();else if(e===Hr)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(t){return Nn.center.set(0,0,0),Nn.radius=.7071067811865476,Nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Mr.x=r.normal.x>0?t.max.x:t.min.x,Mr.y=r.normal.y>0?t.max.y:t.min.y,Mr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xl(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function yu(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Ji extends Ee{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*f-o;for(let S=0;S<l;S++){const v=S*u-s;g.push(v,-M,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const S=M+l*p,v=M+l*(p+1),L=M+1+l*(p+1),A=M+1+l*p;d.push(S,v,A),d.push(v,L,A)}this.setIndex(d),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(_,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.width,t.height,t.widthSegments,t.heightSegments)}}var Eu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Tu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Du=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Uu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ou=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ku=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",tf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ff=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_f=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ef=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Af=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Uf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ff=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,td=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ed=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,id=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ad=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ld=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ud=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,md=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_d=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Md=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ed=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ad=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ld=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ud=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Id=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Od=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Eu,alphahash_pars_fragment:bu,alphamap_fragment:Tu,alphamap_pars_fragment:wu,alphatest_fragment:Au,alphatest_pars_fragment:Ru,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Lu,batching_vertex:Du,begin_vertex:Uu,beginnormal_vertex:Iu,bsdfs:Nu,iridescence_fragment:Fu,bumpmap_pars_fragment:Ou,clipping_planes_fragment:zu,clipping_planes_pars_fragment:Bu,clipping_planes_pars_vertex:ku,clipping_planes_vertex:Hu,color_fragment:Gu,color_pars_fragment:Vu,color_pars_vertex:Wu,color_vertex:Xu,common:Yu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Zu,displacementmap_pars_vertex:ju,displacementmap_vertex:Ku,emissivemap_fragment:$u,emissivemap_pars_fragment:Ju,colorspace_fragment:Qu,colorspace_pars_fragment:tf,envmap_fragment:ef,envmap_common_pars_fragment:nf,envmap_pars_fragment:rf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:gf,envmap_vertex:of,fog_vertex:af,fog_pars_vertex:cf,fog_fragment:lf,fog_pars_fragment:hf,gradientmap_pars_fragment:uf,lightmap_pars_fragment:ff,lights_lambert_fragment:df,lights_lambert_pars_fragment:pf,lights_pars_begin:mf,lights_toon_fragment:_f,lights_toon_pars_fragment:vf,lights_phong_fragment:xf,lights_phong_pars_fragment:Mf,lights_physical_fragment:Sf,lights_physical_pars_fragment:yf,lights_fragment_begin:Ef,lights_fragment_maps:bf,lights_fragment_end:Tf,logdepthbuf_fragment:wf,logdepthbuf_pars_fragment:Af,logdepthbuf_pars_vertex:Rf,logdepthbuf_vertex:Cf,map_fragment:Pf,map_pars_fragment:Lf,map_particle_fragment:Df,map_particle_pars_fragment:Uf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Nf,morphinstance_vertex:Ff,morphcolor_vertex:Of,morphnormal_vertex:zf,morphtarget_pars_vertex:Bf,morphtarget_vertex:kf,normal_fragment_begin:Hf,normal_fragment_maps:Gf,normal_pars_fragment:Vf,normal_pars_vertex:Wf,normal_vertex:Xf,normalmap_pars_fragment:Yf,clearcoat_normal_fragment_begin:qf,clearcoat_normal_fragment_maps:Zf,clearcoat_pars_fragment:jf,iridescence_pars_fragment:Kf,opaque_fragment:$f,packing:Jf,premultiplied_alpha_fragment:Qf,project_vertex:td,dithering_fragment:ed,dithering_pars_fragment:nd,roughnessmap_fragment:id,roughnessmap_pars_fragment:rd,shadowmap_pars_fragment:sd,shadowmap_pars_vertex:od,shadowmap_vertex:ad,shadowmask_pars_fragment:cd,skinbase_vertex:ld,skinning_pars_vertex:hd,skinning_vertex:ud,skinnormal_vertex:fd,specularmap_fragment:dd,specularmap_pars_fragment:pd,tonemapping_fragment:md,tonemapping_pars_fragment:gd,transmission_fragment:_d,transmission_pars_fragment:vd,uv_pars_fragment:xd,uv_pars_vertex:Md,uv_vertex:Sd,worldpos_vertex:yd,background_vert:Ed,background_frag:bd,backgroundCube_vert:Td,backgroundCube_frag:wd,cube_vert:Ad,cube_frag:Rd,depth_vert:Cd,depth_frag:Pd,distanceRGBA_vert:Ld,distanceRGBA_frag:Dd,equirect_vert:Ud,equirect_frag:Id,linedashed_vert:Nd,linedashed_frag:Fd,meshbasic_vert:Od,meshbasic_frag:zd,meshlambert_vert:Bd,meshlambert_frag:kd,meshmatcap_vert:Hd,meshmatcap_frag:Gd,meshnormal_vert:Vd,meshnormal_frag:Wd,meshphong_vert:Xd,meshphong_frag:Yd,meshphysical_vert:qd,meshphysical_frag:Zd,meshtoon_vert:jd,meshtoon_frag:Kd,points_vert:$d,points_frag:Jd,shadow_vert:Qd,shadow_frag:tp,sprite_vert:ep,sprite_frag:np},ct={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},$e={basic:{uniforms:Te([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Te([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Te([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Te([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Te([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Te([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Te([ct.points,ct.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Te([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Te([ct.common,ct.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Te([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Te([ct.sprite,ct.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Te([ct.common,ct.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Te([ct.lights,ct.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};$e.physical={uniforms:Te([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const Sr={r:0,b:0,g:0},Fn=new Ze,ip=new Zt;function rp(i,t,e,n,r,s,o){const a=new qt(0);let c=s===!0?0:1,l,h,u=null,f=0,d=null;function g(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?e:t).get(S)),S}function _(M){let S=!1;const v=g(M);v===null?p(a,c):v&&v.isColor&&(p(v,1),S=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===Yr)?(h===void 0&&(h=new we(new Pi(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:wi($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Fn.copy(S.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ip.makeRotationFromEuler(Fn)),h.material.toneMapped=Xt.getTransfer(v.colorSpace)!==Qt,(u!==v||f!==v.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new we(new Ji(2,2),new mn({name:"BackgroundMaterial",uniforms:wi($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(v.colorSpace)!==Qt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,S){M.getRGB(Sr,gl(i)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,p(a,c)},render:_,addToRenderList:m}}function sp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(E,P,Y,B,V){let $=!1;const G=u(B,Y,P);s!==G&&(s=G,l(s.object)),$=d(E,B,Y,V),$&&g(E,B,Y,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(E,P,Y,B),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function h(E){return i.deleteVertexArray(E)}function u(E,P,Y){const B=Y.wireframe===!0;let V=n[E.id];V===void 0&&(V={},n[E.id]=V);let $=V[P.id];$===void 0&&($={},V[P.id]=$);let G=$[B];return G===void 0&&(G=f(c()),$[B]=G),G}function f(E){const P=[],Y=[],B=[];for(let V=0;V<e;V++)P[V]=0,Y[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:Y,attributeDivisors:B,object:E,attributes:{},index:null}}function d(E,P,Y,B){const V=s.attributes,$=P.attributes;let G=0;const et=Y.getAttributes();for(const k in et)if(et[k].location>=0){const pt=V[k];let Mt=$[k];if(Mt===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(Mt=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(Mt=E.instanceColor)),pt===void 0||pt.attribute!==Mt||Mt&&pt.data!==Mt.data)return!0;G++}return s.attributesNum!==G||s.index!==B}function g(E,P,Y,B){const V={},$=P.attributes;let G=0;const et=Y.getAttributes();for(const k in et)if(et[k].location>=0){let pt=$[k];pt===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(pt=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(pt=E.instanceColor));const Mt={};Mt.attribute=pt,pt&&pt.data&&(Mt.data=pt.data),V[k]=Mt,G++}s.attributes=V,s.attributesNum=G,s.index=B}function _(){const E=s.newAttributes;for(let P=0,Y=E.length;P<Y;P++)E[P]=0}function m(E){p(E,0)}function p(E,P){const Y=s.newAttributes,B=s.enabledAttributes,V=s.attributeDivisors;Y[E]=1,B[E]===0&&(i.enableVertexAttribArray(E),B[E]=1),V[E]!==P&&(i.vertexAttribDivisor(E,P),V[E]=P)}function M(){const E=s.newAttributes,P=s.enabledAttributes;for(let Y=0,B=P.length;Y<B;Y++)P[Y]!==E[Y]&&(i.disableVertexAttribArray(Y),P[Y]=0)}function S(E,P,Y,B,V,$,G){G===!0?i.vertexAttribIPointer(E,P,Y,V,$):i.vertexAttribPointer(E,P,Y,B,V,$)}function v(E,P,Y,B){_();const V=B.attributes,$=Y.getAttributes(),G=P.defaultAttributeValues;for(const et in $){const k=$[et];if(k.location>=0){let at=V[et];if(at===void 0&&(et==="instanceMatrix"&&E.instanceMatrix&&(at=E.instanceMatrix),et==="instanceColor"&&E.instanceColor&&(at=E.instanceColor)),at!==void 0){const pt=at.normalized,Mt=at.itemSize,Nt=t.get(at);if(Nt===void 0)continue;const jt=Nt.buffer,q=Nt.type,it=Nt.bytesPerElement,St=q===i.INT||q===i.UNSIGNED_INT||at.gpuType===No;if(at.isInterleavedBufferAttribute){const st=at.data,Rt=st.stride,Ut=at.offset;if(st.isInstancedInterleavedBuffer){for(let Lt=0;Lt<k.locationSize;Lt++)p(k.location+Lt,st.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Lt=0;Lt<k.locationSize;Lt++)m(k.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let Lt=0;Lt<k.locationSize;Lt++)S(k.location+Lt,Mt/k.locationSize,q,pt,Rt*it,(Ut+Mt/k.locationSize*Lt)*it,St)}else{if(at.isInstancedBufferAttribute){for(let st=0;st<k.locationSize;st++)p(k.location+st,at.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let st=0;st<k.locationSize;st++)m(k.location+st);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let st=0;st<k.locationSize;st++)S(k.location+st,Mt/k.locationSize,q,pt,Mt*it,Mt/k.locationSize*st*it,St)}}else if(G!==void 0){const pt=G[et];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(k.location,pt);break;case 3:i.vertexAttrib3fv(k.location,pt);break;case 4:i.vertexAttrib4fv(k.location,pt);break;default:i.vertexAttrib1fv(k.location,pt)}}}}M()}function L(){D();for(const E in n){const P=n[E];for(const Y in P){const B=P[Y];for(const V in B)h(B[V].object),delete B[V];delete P[Y]}delete n[E]}}function A(E){if(n[E.id]===void 0)return;const P=n[E.id];for(const Y in P){const B=P[Y];for(const V in B)h(B[V].object),delete B[V];delete P[Y]}delete n[E.id]}function R(E){for(const P in n){const Y=n[P];if(Y[E.id]===void 0)continue;const B=Y[E.id];for(const V in B)h(B[V].object),delete B[V];delete Y[E.id]}}function D(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:b,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function op(i,t,e){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function ap(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==qe&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===Ai&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==dn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ln&&!D)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:L,maxSamples:A}}function cp(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new bn,a=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||r;return r=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const M=s?0:n,S=M*4;let v=p.clippingState||null;c.value=v,v=h(g,f,S,d);for(let L=0;L!==S;++L)v[L]=e[L];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==_;++S,v+=4)o.copy(u[S]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function lp(i){let t=new WeakMap;function e(o,a){return a===js?o.mapping=yi:a===Ks&&(o.mapping=Ei),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===js||a===Ks)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new xu(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Xo extends _l{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const pi=4,Ba=[.125,.215,.35,.446,.526,.582],kn=20,ys=new Xo,ka=new qt;let Es=null,bs=0,Ts=0,ws=!1;const zn=(1+Math.sqrt(5))/2,li=1/zn,Ha=[new C(-zn,li,0),new C(zn,li,0),new C(-li,0,zn),new C(li,0,zn),new C(0,zn,-li),new C(0,zn,li),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Ga{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Es=this._renderer.getRenderTarget(),bs=this._renderer.getActiveCubeFace(),Ts=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Es,bs,Ts),this._renderer.xr.enabled=ws,t.scissorTest=!1,yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===Ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Es=this._renderer.getRenderTarget(),bs=this._renderer.getActiveCubeFace(),Ts=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:Ai,format:qe,colorSpace:Ri,depthBuffer:!1},r=Va(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Va(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hp(s)),this._blurMaterial=up(s,t,e)}return r}_compileMaterial(t){const e=new we(this._lodPlanes[0],t);this._renderer.compile(e,ys)}_sceneToCubeUV(t,e,n,r){const a=new Be(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ka),h.toneMapping=Rn,h.autoClear=!1;const d=new dl({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new we(new Pi,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(ka),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):M===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const S=this._cubeSize;yr(r,M*S,p>2?S:0,S,S),h.setRenderTarget(r),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===yi||t.mapping===Ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wa());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;yr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ys)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ha[(r-s-1)%Ha.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new we(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*kn-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):kn;m>kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${kn}`);const p=[];let M=0;for(let R=0;R<kn;++R){const D=R/_,b=Math.exp(-D*D/2);p.push(b),R===0?M+=b:R<m&&(M+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[r],L=3*v*(r>S-pi?r-S+pi:0),A=4*(this._cubeSize-v);yr(e,L,A,3*v,2*v),c.setRenderTarget(e),c.render(u,ys)}}function hp(i){const t=[],e=[],n=[];let r=i;const s=i-pi+1+Ba.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>i-pi?c=Ba[o-i+pi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),S=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let A=0;A<d;A++){const R=A%3*2/3-1,D=A>2?0:-1,b=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];M.set(b,_*g*A),S.set(f,m*g*A);const E=[A,A,A,A,A,A];v.set(E,p*g*A)}const L=new Ee;L.setAttribute("position",new Ne(M,_)),L.setAttribute("uv",new Ne(S,m)),L.setAttribute("faceIndex",new Ne(v,p)),t.push(L),r>pi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Va(i,t,e){const n=new Pn(i,t,e);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function up(i,t,e){const n=new Float32Array(kn),r=new C(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Wa(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Xa(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===js||c===Ks,h=c===yi||c===Ei;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ga(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&r(d)?(e===null&&(e=new Ga(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function dp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ki("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function pp(i,t,e,n){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let S=0,v=M.length;S<v;S+=3){const L=M[S+0],A=M[S+1],R=M[S+2];f.push(L,A,A,R,R,L)}}else if(g!==void 0){const M=g.array;_=g.version;for(let S=0,v=M.length/3-1;S<v;S+=3){const L=S+0,A=S+1,R=S+2;f.push(L,A,A,R,R,L)}}else return;const m=new(cl(f)?ml:pl)(f,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function mp(i,t,e){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,s,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function gp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function _p(i,t,e){const n=new WeakMap,r=new se;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,L=1;v>t.maxTextureSize&&(L=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const A=new Float32Array(v*L*4*u),R=new hl(A,v,L,u);R.type=ln,R.needsUpdate=!0;const D=S*4;for(let E=0;E<u;E++){const P=m[E],Y=p[E],B=M[E],V=v*L*4*E;for(let $=0;$<P.count;$++){const G=$*D;d===!0&&(r.fromBufferAttribute(P,$),A[V+G+0]=r.x,A[V+G+1]=r.y,A[V+G+2]=r.z,A[V+G+3]=0),g===!0&&(r.fromBufferAttribute(Y,$),A[V+G+4]=r.x,A[V+G+5]=r.y,A[V+G+6]=r.z,A[V+G+7]=0),_===!0&&(r.fromBufferAttribute(B,$),A[V+G+8]=r.x,A[V+G+9]=r.y,A[V+G+10]=r.z,A[V+G+11]=B.itemSize===4?r.w:1)}}f={count:u,texture:R,size:new J(v,L)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function vp(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class qo extends Le{constructor(t,e,n,r,s,o,a,c,l,h=vi){if(h!==vi&&h!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===vi&&(n=Vn),n===void 0&&h===Ti&&(n=bi),super(null,r,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Pe,this.minFilter=c!==void 0?c:Pe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ml=new Le,Ya=new qo(1,1),Sl=new hl,yl=new iu,El=new vl,qa=[],Za=[],ja=new Float32Array(16),Ka=new Float32Array(9),$a=new Float32Array(4);function Li(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=qa[r];if(s===void 0&&(s=new Float32Array(r),qa[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function jr(i,t){let e=Za[t];e===void 0&&(e=new Int32Array(t),Za[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function xp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function Sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function Ep(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;$a.set(n),i.uniformMatrix2fv(this.addr,!1,$a),de(e,n)}}function bp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;Ka.set(n),i.uniformMatrix3fv(this.addr,!1,Ka),de(e,n)}}function Tp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;ja.set(n),i.uniformMatrix4fv(this.addr,!1,ja),de(e,n)}}function wp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ap(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function Rp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function Cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function Pp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Lp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function Dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function Ip(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ya.compareFunction=al,s=Ya):s=Ml,e.setTexture2D(t||s,r)}function Np(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||yl,r)}function Fp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||El,r)}function Op(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Sl,r)}function zp(i){switch(i){case 5126:return xp;case 35664:return Mp;case 35665:return Sp;case 35666:return yp;case 35674:return Ep;case 35675:return bp;case 35676:return Tp;case 5124:case 35670:return wp;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Pp;case 36294:return Lp;case 36295:return Dp;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Np;case 35680:case 36300:case 36308:case 36293:return Fp;case 36289:case 36303:case 36311:case 36292:return Op}}function Bp(i,t){i.uniform1fv(this.addr,t)}function kp(i,t){const e=Li(t,this.size,2);i.uniform2fv(this.addr,e)}function Hp(i,t){const e=Li(t,this.size,3);i.uniform3fv(this.addr,e)}function Gp(i,t){const e=Li(t,this.size,4);i.uniform4fv(this.addr,e)}function Vp(i,t){const e=Li(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Wp(i,t){const e=Li(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Xp(i,t){const e=Li(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yp(i,t){i.uniform1iv(this.addr,t)}function qp(i,t){i.uniform2iv(this.addr,t)}function Zp(i,t){i.uniform3iv(this.addr,t)}function jp(i,t){i.uniform4iv(this.addr,t)}function Kp(i,t){i.uniform1uiv(this.addr,t)}function $p(i,t){i.uniform2uiv(this.addr,t)}function Jp(i,t){i.uniform3uiv(this.addr,t)}function Qp(i,t){i.uniform4uiv(this.addr,t)}function tm(i,t,e){const n=this.cache,r=t.length,s=jr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Ml,s[o])}function em(i,t,e){const n=this.cache,r=t.length,s=jr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||yl,s[o])}function nm(i,t,e){const n=this.cache,r=t.length,s=jr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||El,s[o])}function im(i,t,e){const n=this.cache,r=t.length,s=jr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Sl,s[o])}function rm(i){switch(i){case 5126:return Bp;case 35664:return kp;case 35665:return Hp;case 35666:return Gp;case 35674:return Vp;case 35675:return Wp;case 35676:return Xp;case 5124:case 35670:return Yp;case 35667:case 35671:return qp;case 35668:case 35672:return Zp;case 35669:case 35673:return jp;case 5125:return Kp;case 36294:return $p;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return im}}class sm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zp(e.type)}}class om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rm(e.type)}}class am{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const As=/(\w+)(\])?(\[|\.)?/g;function Ja(i,t){i.seq.push(t),i.map[t.id]=t}function cm(i,t,e){const n=i.name,r=n.length;for(As.lastIndex=0;;){const s=As.exec(n),o=As.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ja(e,l===void 0?new sm(a,i,t):new om(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new am(a),Ja(e,u)),e=u}}}class zr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);cm(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Qa(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const lm=37297;let hm=0;function um(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const tc=new zt;function fm(i){Xt._getMatrix(tc,Xt.workingColorSpace,i);const t=`mat3( ${tc.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(i)){case qr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ec(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+um(i.getShaderSource(t),o)}else return r}function dm(i,t){const e=fm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function pm(i,t){let e;switch(t){case mh:e="Linear";break;case gh:e="Reinhard";break;case _h:e="Cineon";break;case vh:e="ACESFilmic";break;case Mh:e="AgX";break;case Sh:e="Neutral";break;case xh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Er=new C;function mm(){Xt.getLuminanceCoefficients(Er);const i=Er.x.toFixed(4),t=Er.y.toFixed(4),e=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hi).join(`
`)}function _m(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function vm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hi(i){return i!==""}function nc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function wo(i){return i.replace(xm,Sm)}const Mm=new Map;function Sm(i,t){let e=kt[t];if(e===void 0){const n=Mm.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wo(e)}const ym=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(i){return i.replace(ym,Em)}function Em(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function sc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function bm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Zc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ke&&(t="SHADOWMAP_TYPE_VSM"),t}function Tm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case yi:case Ei:t="ENVMAP_TYPE_CUBE";break;case Yr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function wm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ei:t="ENVMAP_MODE_REFRACTION";break}return t}function Am(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Io:t="ENVMAP_BLENDING_MULTIPLY";break;case dh:t="ENVMAP_BLENDING_MIX";break;case ph:t="ENVMAP_BLENDING_ADD";break}return t}function Rm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Cm(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=bm(e),l=Tm(e),h=wm(e),u=Am(e),f=Rm(e),d=gm(e),g=_m(s),_=r.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),p.length>0&&(p+=`
`)):(m=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),p=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?kt.tonemapping_pars_fragment:"",e.toneMapping!==Rn?pm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,dm("linearToOutputTexel",e.outputColorSpace),mm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hi).join(`
`)),o=wo(o),o=nc(o,e),o=ic(o,e),a=wo(a),a=nc(a,e),a=ic(a,e),o=rc(o),a=rc(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===_a?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+m+o,v=M+p+a,L=Qa(r,r.VERTEX_SHADER,S),A=Qa(r,r.FRAGMENT_SHADER,v);r.attachShader(_,L),r.attachShader(_,A),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(P){if(i.debug.checkShaderErrors){const Y=r.getProgramInfoLog(_).trim(),B=r.getShaderInfoLog(L).trim(),V=r.getShaderInfoLog(A).trim();let $=!0,G=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,L,A);else{const et=ec(r,L,"vertex"),k=ec(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Y+`
`+et+`
`+k)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(B===""||V==="")&&(G=!1);G&&(P.diagnostics={runnable:$,programLog:Y,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}r.deleteShader(L),r.deleteShader(A),D=new zr(r,_),b=vm(r,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,lm)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=A,this}let Pm=0;class Lm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Dm(t),e.set(t,n)),n}}class Dm{constructor(t){this.id=Pm++,this.code=t,this.usedTimes=0}}function Um(i,t,e,n,r,s,o){const a=new ul,c=new Lm,l=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,E,P,Y,B){const V=Y.fog,$=B.geometry,G=b.isMeshStandardMaterial?Y.environment:null,et=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),k=et&&et.mapping===Yr?et.image.height:null,at=g[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const pt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Mt=pt!==void 0?pt.length:0;let Nt=0;$.morphAttributes.position!==void 0&&(Nt=1),$.morphAttributes.normal!==void 0&&(Nt=2),$.morphAttributes.color!==void 0&&(Nt=3);let jt,q,it,St;if(at){const Jt=$e[at];jt=Jt.vertexShader,q=Jt.fragmentShader}else jt=b.vertexShader,q=b.fragmentShader,c.update(b),it=c.getVertexShaderID(b),St=c.getFragmentShaderID(b);const st=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Ut=B.isInstancedMesh===!0,Lt=B.isBatchedMesh===!0,Vt=!!b.map,j=!!b.matcap,nt=!!et,w=!!b.aoMap,wt=!!b.lightMap,Q=!!b.bumpMap,_t=!!b.normalMap,ot=!!b.displacementMap,Ct=!!b.emissiveMap,mt=!!b.metalnessMap,T=!!b.roughnessMap,x=b.anisotropy>0,F=b.clearcoat>0,W=b.dispersion>0,K=b.iridescence>0,X=b.sheen>0,yt=b.transmission>0,lt=x&&!!b.anisotropyMap,gt=F&&!!b.clearcoatMap,Ht=F&&!!b.clearcoatNormalMap,tt=F&&!!b.clearcoatRoughnessMap,vt=K&&!!b.iridescenceMap,Pt=K&&!!b.iridescenceThicknessMap,Dt=X&&!!b.sheenColorMap,xt=X&&!!b.sheenRoughnessMap,Gt=!!b.specularMap,Bt=!!b.specularColorMap,ee=!!b.specularIntensityMap,U=yt&&!!b.transmissionMap,ht=yt&&!!b.thicknessMap,H=!!b.gradientMap,Z=!!b.alphaMap,dt=b.alphaTest>0,ut=!!b.alphaHash,Ft=!!b.extensions;let ae=Rn;b.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ae=i.toneMapping);const Me={shaderID:at,shaderType:b.type,shaderName:b.name,vertexShader:jt,fragmentShader:q,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:St,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&B._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,instancingMorph:Ut&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Ri,alphaToCoverage:!!b.alphaToCoverage,map:Vt,matcap:j,envMap:nt,envMapMode:nt&&et.mapping,envMapCubeUVHeight:k,aoMap:w,lightMap:wt,bumpMap:Q,normalMap:_t,displacementMap:f&&ot,emissiveMap:Ct,normalMapObjectSpace:_t&&b.normalMapType===Th,normalMapTangentSpace:_t&&b.normalMapType===ol,metalnessMap:mt,roughnessMap:T,anisotropy:x,anisotropyMap:lt,clearcoat:F,clearcoatMap:gt,clearcoatNormalMap:Ht,clearcoatRoughnessMap:tt,dispersion:W,iridescence:K,iridescenceMap:vt,iridescenceThicknessMap:Pt,sheen:X,sheenColorMap:Dt,sheenRoughnessMap:xt,specularMap:Gt,specularColorMap:Bt,specularIntensityMap:ee,transmission:yt,transmissionMap:U,thicknessMap:ht,gradientMap:H,opaque:b.transparent===!1&&b.blending===_i&&b.alphaToCoverage===!1,alphaMap:Z,alphaTest:dt,alphaHash:ut,combine:b.combine,mapUv:Vt&&_(b.map.channel),aoMapUv:w&&_(b.aoMap.channel),lightMapUv:wt&&_(b.lightMap.channel),bumpMapUv:Q&&_(b.bumpMap.channel),normalMapUv:_t&&_(b.normalMap.channel),displacementMapUv:ot&&_(b.displacementMap.channel),emissiveMapUv:Ct&&_(b.emissiveMap.channel),metalnessMapUv:mt&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:lt&&_(b.anisotropyMap.channel),clearcoatMapUv:gt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Ht&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(b.sheenRoughnessMap.channel),specularMapUv:Gt&&_(b.specularMap.channel),specularColorMapUv:Bt&&_(b.specularColorMap.channel),specularIntensityMapUv:ee&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ht&&_(b.thicknessMap.channel),alphaMapUv:Z&&_(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(_t||x),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!$.attributes.uv&&(Vt||Z),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:B.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Nt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:Vt&&b.map.isVideoTexture===!0&&Xt.getTransfer(b.map.colorSpace)===Qt,decodeVideoTextureEmissive:Ct&&b.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(b.emissiveMap.colorSpace)===Qt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ye,flipSided:b.side===Ce,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ft&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&b.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)E.push(P),E.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(M(E,b),S(E,b),E.push(i.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function M(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function S(b,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const E=g[b.type];let P;if(E){const Y=$e[E];P=mu.clone(Y.uniforms)}else P=b.uniforms;return P}function L(b,E){let P;for(let Y=0,B=h.length;Y<B;Y++){const V=h[Y];if(V.cacheKey===E){P=V,++P.usedTimes;break}}return P===void 0&&(P=new Cm(i,E,b,s),h.push(P)),P}function A(b){if(--b.usedTimes===0){const E=h.indexOf(b);h[E]=h[h.length-1],h.pop(),b.destroy()}}function R(b){c.remove(b)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:L,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:D}}function Im(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Nm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function oc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ac(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(u,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):e.push(p)}function c(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||Nm),n.length>1&&n.sort(f||oc),r.length>1&&r.sort(f||oc)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function Fm(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new ac,i.set(n,[o])):r>=s.length?(o=new ac,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Om(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new qt};break;case"SpotLight":e={position:new C,direction:new C,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function zm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Bm=0;function km(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Hm(i){const t=new Om,e=zm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const r=new C,s=new Zt,o=new Zt;function a(l){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,S=0,v=0,L=0,A=0,R=0;l.sort(km);for(let b=0,E=l.length;b<E;b++){const P=l[b],Y=P.color,B=P.intensity,V=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=Y.r*B,u+=Y.g*B,f+=Y.b*B;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],B);R++}else if(P.isDirectionalLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const et=P.shadow,k=e.get(P);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=$,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=G,d++}else if(P.isSpotLight){const G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(Y).multiplyScalar(B),G.distance=V,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[_]=G;const et=P.shadow;if(P.map&&(n.spotLightMap[L]=P.map,L++,et.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=et.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=$,v++}_++}else if(P.isRectAreaLight){const G=t.get(P);G.color.copy(Y).multiplyScalar(B),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=G,m++}else if(P.isPointLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const et=P.shadow,k=e.get(P);k.shadowIntensity=et.intensity,k.shadowBias=et.bias,k.shadowNormalBias=et.normalBias,k.shadowRadius=et.radius,k.shadowMapSize=et.mapSize,k.shadowCameraNear=et.camera.near,k.shadowCameraFar=et.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=G,g++}else if(P.isHemisphereLight){const G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(B),G.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==M||D.numPointShadows!==S||D.numSpotShadows!==v||D.numSpotMaps!==L||D.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,D.directionalLength=d,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=M,D.numPointShadows=S,D.numSpotShadows=v,D.numSpotMaps=L,D.numLightProbes=R,n.version=Bm++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),u++}else if(S.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function cc(i){const t=new Hm(i),e=[],n=[];function r(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Gm(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new cc(i),t.set(r,[a])):s>=o.length?(a=new cc(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Vm extends Ci{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Wm extends Ci{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ym=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qm(i,t,e){let n=new Wo;const r=new J,s=new J,o=new se,a=new Vm({depthPacking:bh}),c=new Wm,l={},h=e.maxTextureSize,u={[Cn]:Ce,[Ce]:Cn,[Ye]:Ye},f=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:Xm,fragmentShader:Ym}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ee;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zc;let p=this.type;this.render=function(A,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const b=i.getRenderTarget(),E=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(An),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const B=p!==Ke&&this.type===Ke,V=p===Ke&&this.type!==Ke;for(let $=0,G=A.length;$<G;$++){const et=A[$],k=et.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const at=k.getFrameExtents();if(r.multiply(at),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/at.x),r.x=s.x*at.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/at.y),r.y=s.y*at.y,k.mapSize.y=s.y)),k.map===null||B===!0||V===!0){const Mt=this.type!==Ke?{minFilter:Pe,magFilter:Pe}:{};k.map!==null&&k.map.dispose(),k.map=new Pn(r.x,r.y,Mt),k.map.texture.name=et.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const pt=k.getViewportCount();for(let Mt=0;Mt<pt;Mt++){const Nt=k.getViewport(Mt);o.set(s.x*Nt.x,s.y*Nt.y,s.x*Nt.z,s.y*Nt.w),Y.viewport(o),k.updateMatrices(et,Mt),n=k.getFrustum(),v(R,D,k.camera,et,this.type)}k.isPointLightShadow!==!0&&this.type===Ke&&M(k,D),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,E,P)};function M(A,R){const D=t.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Pn(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,D,f,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,D,d,_,null)}function S(A,R,D,b){let E=null;const P=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)E=P;else if(E=D.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const Y=E.uuid,B=R.uuid;let V=l[Y];V===void 0&&(V={},l[Y]=V);let $=V[B];$===void 0&&($=E.clone(),V[B]=$,R.addEventListener("dispose",L)),E=$}if(E.visible=R.visible,E.wireframe=R.wireframe,b===Ke?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:u[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,D.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const Y=i.properties.get(E);Y.light=D}return E}function v(A,R,D,b,E){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===Ke)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const B=t.update(A),V=A.material;if(Array.isArray(V)){const $=B.groups;for(let G=0,et=$.length;G<et;G++){const k=$[G],at=V[k.materialIndex];if(at&&at.visible){const pt=S(A,at,b,E);A.onBeforeShadow(i,A,R,D,B,pt,k),i.renderBufferDirect(D,null,B,pt,A,k),A.onAfterShadow(i,A,R,D,B,pt,k)}}}else if(V.visible){const $=S(A,V,b,E);A.onBeforeShadow(i,A,R,D,B,$,null),i.renderBufferDirect(D,null,B,$,A,null),A.onAfterShadow(i,A,R,D,B,$,null)}}const Y=A.children;for(let B=0,V=Y.length;B<V;B++)v(Y[B],R,D,b,E)}function L(A){A.target.removeEventListener("dispose",L);for(const D in l){const b=l[D],E=A.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const Zm={[Gs]:Vs,[Ws]:qs,[Xs]:Zs,[Si]:Ys,[Vs]:Gs,[qs]:Ws,[Zs]:Xs,[Ys]:Si};function jm(i,t){function e(){let U=!1;const ht=new se;let H=null;const Z=new se(0,0,0,0);return{setMask:function(dt){H!==dt&&!U&&(i.colorMask(dt,dt,dt,dt),H=dt)},setLocked:function(dt){U=dt},setClear:function(dt,ut,Ft,ae,Me){Me===!0&&(dt*=ae,ut*=ae,Ft*=ae),ht.set(dt,ut,Ft,ae),Z.equals(ht)===!1&&(i.clearColor(dt,ut,Ft,ae),Z.copy(ht))},reset:function(){U=!1,H=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,ht=!1,H=null,Z=null,dt=null;return{setReversed:function(ut){if(ht!==ut){const Ft=t.get("EXT_clip_control");ht?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const ae=dt;dt=null,this.setClear(ae)}ht=ut},getReversed:function(){return ht},setTest:function(ut){ut?st(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(ut){H!==ut&&!U&&(i.depthMask(ut),H=ut)},setFunc:function(ut){if(ht&&(ut=Zm[ut]),Z!==ut){switch(ut){case Gs:i.depthFunc(i.NEVER);break;case Vs:i.depthFunc(i.ALWAYS);break;case Ws:i.depthFunc(i.LESS);break;case Si:i.depthFunc(i.LEQUAL);break;case Xs:i.depthFunc(i.EQUAL);break;case Ys:i.depthFunc(i.GEQUAL);break;case qs:i.depthFunc(i.GREATER);break;case Zs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ut}},setLocked:function(ut){U=ut},setClear:function(ut){dt!==ut&&(ht&&(ut=1-ut),i.clearDepth(ut),dt=ut)},reset:function(){U=!1,H=null,Z=null,dt=null,ht=!1}}}function r(){let U=!1,ht=null,H=null,Z=null,dt=null,ut=null,Ft=null,ae=null,Me=null;return{setTest:function(Jt){U||(Jt?st(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(Jt){ht!==Jt&&!U&&(i.stencilMask(Jt),ht=Jt)},setFunc:function(Jt,He,en){(H!==Jt||Z!==He||dt!==en)&&(i.stencilFunc(Jt,He,en),H=Jt,Z=He,dt=en)},setOp:function(Jt,He,en){(ut!==Jt||Ft!==He||ae!==en)&&(i.stencilOp(Jt,He,en),ut=Jt,Ft=He,ae=en)},setLocked:function(Jt){U=Jt},setClear:function(Jt){Me!==Jt&&(i.clearStencil(Jt),Me=Jt)},reset:function(){U=!1,ht=null,H=null,Z=null,dt=null,ut=null,Ft=null,ae=null,Me=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,S=null,v=null,L=null,A=null,R=new qt(0,0,0),D=0,b=!1,E=null,P=null,Y=null,B=null,V=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,et=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(k)[1]),G=et>=1):k.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),G=et>=2);let at=null,pt={};const Mt=i.getParameter(i.SCISSOR_BOX),Nt=i.getParameter(i.VIEWPORT),jt=new se().fromArray(Mt),q=new se().fromArray(Nt);function it(U,ht,H,Z){const dt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(U,ut),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<H;Ft++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(ht+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ut}const St={};St[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),St[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),St[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(i.DEPTH_TEST),o.setFunc(Si),Q(!1),_t(ua),st(i.CULL_FACE),w(An);function st(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Rt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ut(U,ht){return u[U]!==ht?(i.bindFramebuffer(U,ht),u[U]=ht,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ht),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function Lt(U,ht){let H=d,Z=!1;if(U){H=f.get(ht),H===void 0&&(H=[],f.set(ht,H));const dt=U.textures;if(H.length!==dt.length||H[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ft=dt.length;ut<Ft;ut++)H[ut]=i.COLOR_ATTACHMENT0+ut;H.length=dt.length,Z=!0}}else H[0]!==i.BACK&&(H[0]=i.BACK,Z=!0);Z&&i.drawBuffers(H)}function Vt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const j={[Bn]:i.FUNC_ADD,[Kl]:i.FUNC_SUBTRACT,[$l]:i.FUNC_REVERSE_SUBTRACT};j[Jl]=i.MIN,j[Ql]=i.MAX;const nt={[th]:i.ZERO,[eh]:i.ONE,[nh]:i.SRC_COLOR,[ks]:i.SRC_ALPHA,[ch]:i.SRC_ALPHA_SATURATE,[oh]:i.DST_COLOR,[rh]:i.DST_ALPHA,[ih]:i.ONE_MINUS_SRC_COLOR,[Hs]:i.ONE_MINUS_SRC_ALPHA,[ah]:i.ONE_MINUS_DST_COLOR,[sh]:i.ONE_MINUS_DST_ALPHA,[lh]:i.CONSTANT_COLOR,[hh]:i.ONE_MINUS_CONSTANT_COLOR,[uh]:i.CONSTANT_ALPHA,[fh]:i.ONE_MINUS_CONSTANT_ALPHA};function w(U,ht,H,Z,dt,ut,Ft,ae,Me,Jt){if(U===An){_===!0&&(Rt(i.BLEND),_=!1);return}if(_===!1&&(st(i.BLEND),_=!0),U!==jl){if(U!==m||Jt!==b){if((p!==Bn||v!==Bn)&&(i.blendEquation(i.FUNC_ADD),p=Bn,v=Bn),Jt)switch(U){case _i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fa:i.blendFunc(i.ONE,i.ONE);break;case da:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case _i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case da:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,S=null,L=null,A=null,R.set(0,0,0),D=0,m=U,b=Jt}return}dt=dt||ht,ut=ut||H,Ft=Ft||Z,(ht!==p||dt!==v)&&(i.blendEquationSeparate(j[ht],j[dt]),p=ht,v=dt),(H!==M||Z!==S||ut!==L||Ft!==A)&&(i.blendFuncSeparate(nt[H],nt[Z],nt[ut],nt[Ft]),M=H,S=Z,L=ut,A=Ft),(ae.equals(R)===!1||Me!==D)&&(i.blendColor(ae.r,ae.g,ae.b,Me),R.copy(ae),D=Me),m=U,b=!1}function wt(U,ht){U.side===Ye?Rt(i.CULL_FACE):st(i.CULL_FACE);let H=U.side===Ce;ht&&(H=!H),Q(H),U.blending===_i&&U.transparent===!1?w(An):w(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ct(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(U){E!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),E=U)}function _t(U){U!==Yl?(st(i.CULL_FACE),U!==P&&(U===ua?i.cullFace(i.BACK):U===ql?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),P=U}function ot(U){U!==Y&&(G&&i.lineWidth(U),Y=U)}function Ct(U,ht,H){U?(st(i.POLYGON_OFFSET_FILL),(B!==ht||V!==H)&&(i.polygonOffset(ht,H),B=ht,V=H)):Rt(i.POLYGON_OFFSET_FILL)}function mt(U){U?st(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+$-1),at!==U&&(i.activeTexture(U),at=U)}function x(U,ht,H){H===void 0&&(at===null?H=i.TEXTURE0+$-1:H=at);let Z=pt[H];Z===void 0&&(Z={type:void 0,texture:void 0},pt[H]=Z),(Z.type!==U||Z.texture!==ht)&&(at!==H&&(i.activeTexture(H),at=H),i.bindTexture(U,ht||St[U]),Z.type=U,Z.texture=ht)}function F(){const U=pt[at];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function W(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function gt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function vt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Dt(U){jt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),jt.copy(U))}function xt(U){q.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),q.copy(U))}function Gt(U,ht){let H=l.get(ht);H===void 0&&(H=new WeakMap,l.set(ht,H));let Z=H.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(ht,U.name),H.set(U,Z))}function Bt(U,ht){const Z=l.get(ht).get(U);c.get(ht)!==Z&&(i.uniformBlockBinding(ht,Z,U.__bindingPointIndex),c.set(ht,Z))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},at=null,pt={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,S=null,v=null,L=null,A=null,R=new qt(0,0,0),D=0,b=!1,E=null,P=null,Y=null,B=null,V=null,jt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:st,disable:Rt,bindFramebuffer:Ut,drawBuffers:Lt,useProgram:Vt,setBlending:w,setMaterial:wt,setFlipSided:Q,setCullFace:_t,setLineWidth:ot,setPolygonOffset:Ct,setScissorTest:mt,activeTexture:T,bindTexture:x,unbindTexture:F,compressedTexImage2D:W,compressedTexImage3D:K,texImage2D:vt,texImage3D:Pt,updateUBOMapping:Gt,uniformBlockBinding:Bt,texStorage2D:Ht,texStorage3D:tt,texSubImage2D:X,texSubImage3D:yt,compressedTexSubImage2D:lt,compressedTexSubImage3D:gt,scissor:Dt,viewport:xt,reset:ee}}function lc(i,t,e,n){const r=Km(n);switch(e){case Qc:return i*t;case el:return i*t;case nl:return i*t*2;case il:return i*t/r.components*r.byteLength;case zo:return i*t/r.components*r.byteLength;case rl:return i*t*2/r.components*r.byteLength;case Bo:return i*t*2/r.components*r.byteLength;case tl:return i*t*3/r.components*r.byteLength;case qe:return i*t*4/r.components*r.byteLength;case ko:return i*t*4/r.components*r.byteLength;case Ur:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Nr:case Fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case to:case no:return Math.max(i,16)*Math.max(t,8)/4;case Qs:case eo:return Math.max(i,8)*Math.max(t,8)/2;case io:case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Or:case So:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case sl:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case bo:case To:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Km(i){switch(i){case dn:case Kc:return{byteLength:1,components:1};case qi:case $c:case Ai:return{byteLength:2,components:1};case Fo:case Oo:return{byteLength:2,components:4};case Vn:case No:case ln:return{byteLength:4,components:1};case Jc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function $m(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return d?new OffscreenCanvas(T,x):Gr("canvas")}function _(T,x,F){let W=1;const K=mt(T);if((K.width>F||K.height>F)&&(W=F/Math.max(K.width,K.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(W*K.width),yt=Math.floor(W*K.height);u===void 0&&(u=g(X,yt));const lt=x?g(X,yt):u;return lt.width=X,lt.height=yt,lt.getContext("2d").drawImage(T,0,0,X,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+yt+")."),lt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(T,x,F,W,K=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=x;if(x===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),x===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),x===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),x===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),x===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),x===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),x===i.RGBA){const yt=K?qr:Xt.getTransfer(W);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=yt===Qt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function v(T,x){let F;return T?x===null||x===Vn||x===bi?F=i.DEPTH24_STENCIL8:x===ln?F=i.DEPTH32F_STENCIL8:x===qi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Vn||x===bi?F=i.DEPTH_COMPONENT24:x===ln?F=i.DEPTH_COMPONENT32F:x===qi&&(F=i.DEPTH_COMPONENT16),F}function L(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Pe&&T.minFilter!==Qe?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function A(T){const x=T.target;x.removeEventListener("dispose",A),D(x),x.isVideoTexture&&h.delete(x)}function R(T){const x=T.target;x.removeEventListener("dispose",R),E(x)}function D(T){const x=n.get(T);if(x.__webglInit===void 0)return;const F=T.source,W=f.get(F);if(W){const K=W[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(T),Object.keys(W).length===0&&f.delete(F)}n.remove(T)}function b(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const F=T.source,W=f.get(F);delete W[x.__cacheKey],o.memory.textures--}function E(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let K=0;K<x.__webglFramebuffer[W].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[W][K]);else i.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)i.deleteFramebuffer(x.__webglFramebuffer[W]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const F=T.textures;for(let W=0,K=F.length;W<K;W++){const X=n.get(F[W]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(F[W])}n.remove(T)}let P=0;function Y(){P=0}function B(){const T=P;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),P+=1,T}function V(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function $(T,x){const F=n.get(T);if(T.isVideoTexture&&ot(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const W=T.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,T,x);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function G(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function et(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){q(F,T,x);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function k(T,x){const F=n.get(T);if(T.version>0&&F.__version!==T.version){it(F,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}const at={[$s]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[Js]:i.MIRRORED_REPEAT},pt={[Pe]:i.NEAREST,[yh]:i.NEAREST_MIPMAP_NEAREST,[ir]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[es]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},Mt={[wh]:i.NEVER,[Dh]:i.ALWAYS,[Ah]:i.LESS,[al]:i.LEQUAL,[Rh]:i.EQUAL,[Lh]:i.GEQUAL,[Ch]:i.GREATER,[Ph]:i.NOTEQUAL};function Nt(T,x){if(x.type===ln&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Qe||x.magFilter===es||x.magFilter===ir||x.magFilter===Gn||x.minFilter===Qe||x.minFilter===es||x.minFilter===ir||x.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,at[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,at[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,at[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,pt[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,pt[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Mt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Pe||x.minFilter!==ir&&x.minFilter!==Gn||x.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function jt(T,x){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",A));const W=x.source;let K=f.get(W);K===void 0&&(K={},f.set(W,K));const X=V(x);if(X!==T.__cacheKey){K[X]===void 0&&(K[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[X].usedTimes++;const yt=K[T.__cacheKey];yt!==void 0&&(K[T.__cacheKey].usedTimes--,yt.usedTimes===0&&b(x)),T.__cacheKey=X,T.__webglTexture=K[X].texture}return F}function q(T,x,F){let W=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=i.TEXTURE_3D);const K=jt(T,x),X=x.source;e.bindTexture(W,T.__webglTexture,i.TEXTURE0+F);const yt=n.get(X);if(X.version!==yt.__version||K===!0){e.activeTexture(i.TEXTURE0+F);const lt=Xt.getPrimaries(Xt.workingColorSpace),gt=x.colorSpace===Tn?null:Xt.getPrimaries(x.colorSpace),Ht=x.colorSpace===Tn||lt===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht);let tt=_(x.image,!1,r.maxTextureSize);tt=Ct(x,tt);const vt=s.convert(x.format,x.colorSpace),Pt=s.convert(x.type);let Dt=S(x.internalFormat,vt,Pt,x.colorSpace,x.isVideoTexture);Nt(W,x);let xt;const Gt=x.mipmaps,Bt=x.isVideoTexture!==!0,ee=yt.__version===void 0||K===!0,U=X.dataReady,ht=L(x,tt);if(x.isDepthTexture)Dt=v(x.format===Ti,x.type),ee&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,Dt,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,Dt,tt.width,tt.height,0,vt,Pt,null));else if(x.isDataTexture)if(Gt.length>0){Bt&&ee&&e.texStorage2D(i.TEXTURE_2D,ht,Dt,Gt[0].width,Gt[0].height);for(let H=0,Z=Gt.length;H<Z;H++)xt=Gt[H],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,xt.width,xt.height,vt,Pt,xt.data):e.texImage2D(i.TEXTURE_2D,H,Dt,xt.width,xt.height,0,vt,Pt,xt.data);x.generateMipmaps=!1}else Bt?(ee&&e.texStorage2D(i.TEXTURE_2D,ht,Dt,tt.width,tt.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt.width,tt.height,vt,Pt,tt.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,tt.width,tt.height,0,vt,Pt,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Bt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Dt,Gt[0].width,Gt[0].height,tt.depth);for(let H=0,Z=Gt.length;H<Z;H++)if(xt=Gt[H],x.format!==qe)if(vt!==null)if(Bt){if(U)if(x.layerUpdates.size>0){const dt=lc(xt.width,xt.height,x.format,x.type);for(const ut of x.layerUpdates){const Ft=xt.data.subarray(ut*dt/xt.data.BYTES_PER_ELEMENT,(ut+1)*dt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,ut,xt.width,xt.height,1,vt,Ft)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,xt.width,xt.height,tt.depth,vt,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,H,Dt,xt.width,xt.height,tt.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,xt.width,xt.height,tt.depth,vt,Pt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,H,Dt,xt.width,xt.height,tt.depth,0,vt,Pt,xt.data)}else{Bt&&ee&&e.texStorage2D(i.TEXTURE_2D,ht,Dt,Gt[0].width,Gt[0].height);for(let H=0,Z=Gt.length;H<Z;H++)xt=Gt[H],x.format!==qe?vt!==null?Bt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,H,0,0,xt.width,xt.height,vt,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,H,Dt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?U&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,xt.width,xt.height,vt,Pt,xt.data):e.texImage2D(i.TEXTURE_2D,H,Dt,xt.width,xt.height,0,vt,Pt,xt.data)}else if(x.isDataArrayTexture)if(Bt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,Dt,tt.width,tt.height,tt.depth),U)if(x.layerUpdates.size>0){const H=lc(tt.width,tt.height,x.format,x.type);for(const Z of x.layerUpdates){const dt=tt.data.subarray(Z*H/tt.data.BYTES_PER_ELEMENT,(Z+1)*H/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,vt,Pt,dt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,vt,Pt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,tt.width,tt.height,tt.depth,0,vt,Pt,tt.data);else if(x.isData3DTexture)Bt?(ee&&e.texStorage3D(i.TEXTURE_3D,ht,Dt,tt.width,tt.height,tt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,vt,Pt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,tt.width,tt.height,tt.depth,0,vt,Pt,tt.data);else if(x.isFramebufferTexture){if(ee)if(Bt)e.texStorage2D(i.TEXTURE_2D,ht,Dt,tt.width,tt.height);else{let H=tt.width,Z=tt.height;for(let dt=0;dt<ht;dt++)e.texImage2D(i.TEXTURE_2D,dt,Dt,H,Z,0,vt,Pt,null),H>>=1,Z>>=1}}else if(Gt.length>0){if(Bt&&ee){const H=mt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,ht,Dt,H.width,H.height)}for(let H=0,Z=Gt.length;H<Z;H++)xt=Gt[H],Bt?U&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,vt,Pt,xt):e.texImage2D(i.TEXTURE_2D,H,Dt,vt,Pt,xt);x.generateMipmaps=!1}else if(Bt){if(ee){const H=mt(tt);e.texStorage2D(i.TEXTURE_2D,ht,Dt,H.width,H.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,Pt,tt)}else e.texImage2D(i.TEXTURE_2D,0,Dt,vt,Pt,tt);m(x)&&p(W),yt.__version=X.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function it(T,x,F){if(x.image.length!==6)return;const W=jt(T,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+F);const X=n.get(K);if(K.version!==X.__version||W===!0){e.activeTexture(i.TEXTURE0+F);const yt=Xt.getPrimaries(Xt.workingColorSpace),lt=x.colorSpace===Tn?null:Xt.getPrimaries(x.colorSpace),gt=x.colorSpace===Tn||yt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Ht=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,vt=[];for(let Z=0;Z<6;Z++)!Ht&&!tt?vt[Z]=_(x.image[Z],!0,r.maxCubemapSize):vt[Z]=tt?x.image[Z].image:x.image[Z],vt[Z]=Ct(x,vt[Z]);const Pt=vt[0],Dt=s.convert(x.format,x.colorSpace),xt=s.convert(x.type),Gt=S(x.internalFormat,Dt,xt,x.colorSpace),Bt=x.isVideoTexture!==!0,ee=X.__version===void 0||W===!0,U=K.dataReady;let ht=L(x,Pt);Nt(i.TEXTURE_CUBE_MAP,x);let H;if(Ht){Bt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Gt,Pt.width,Pt.height);for(let Z=0;Z<6;Z++){H=vt[Z].mipmaps;for(let dt=0;dt<H.length;dt++){const ut=H[dt];x.format!==qe?Dt!==null?Bt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ut.width,ut.height,Dt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Gt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ut.width,ut.height,Dt,xt,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,Gt,ut.width,ut.height,0,Dt,xt,ut.data)}}}else{if(H=x.mipmaps,Bt&&ee){H.length>0&&ht++;const Z=mt(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,Gt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,vt[Z].width,vt[Z].height,Dt,xt,vt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Gt,vt[Z].width,vt[Z].height,0,Dt,xt,vt[Z].data);for(let dt=0;dt<H.length;dt++){const Ft=H[dt].image[Z].image;Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Ft.width,Ft.height,Dt,xt,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Gt,Ft.width,Ft.height,0,Dt,xt,Ft.data)}}else{Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Dt,xt,vt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Gt,Dt,xt,vt[Z]);for(let dt=0;dt<H.length;dt++){const ut=H[dt];Bt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Dt,xt,ut.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,Gt,Dt,xt,ut.image[Z])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),X.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function St(T,x,F,W,K,X){const yt=s.convert(F.format,F.colorSpace),lt=s.convert(F.type),gt=S(F.internalFormat,yt,lt,F.colorSpace),Ht=n.get(x),tt=n.get(F);if(tt.__renderTarget=x,!Ht.__hasExternalTextures){const vt=Math.max(1,x.width>>X),Pt=Math.max(1,x.height>>X);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,X,gt,vt,Pt,x.depth,0,yt,lt,null):e.texImage2D(K,X,gt,vt,Pt,0,yt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),_t(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,K,tt.__webglTexture,0,Q(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,K,tt.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(T,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const W=x.depthTexture,K=W&&W.isDepthTexture?W.type:null,X=v(x.stencilBuffer,K),yt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Q(x);_t(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,X,x.width,x.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,X,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,X,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,T)}else{const W=x.textures;for(let K=0;K<W.length;K++){const X=W[K],yt=s.convert(X.format,X.colorSpace),lt=s.convert(X.type),gt=S(X.internalFormat,yt,lt,X.colorSpace),Ht=Q(x);F&&_t(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,gt,x.width,x.height):_t(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ht,gt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,gt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=n.get(x.depthTexture);W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$(x.depthTexture,0);const K=W.__webglTexture,X=Q(x);if(x.depthTexture.format===vi)_t(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(x.depthTexture.format===Ti)_t(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ut(T){const x=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const W=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",K)};W.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=W}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Rt(x.__webglFramebuffer,T)}else if(F){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=i.createRenderbuffer(),st(x.__webglDepthbuffer[W],T,!1);else{const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,X)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),st(x.__webglDepthbuffer,T,!1);else{const W=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(T,x,F){const W=n.get(T);x!==void 0&&St(W.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ut(T)}function Vt(T){const x=T.texture,F=n.get(T),W=n.get(x);T.addEventListener("dispose",R);const K=T.textures,X=T.isWebGLCubeRenderTarget===!0,yt=K.length>1;if(yt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=x.version,o.memory.textures++),X){F.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[lt]=[];for(let gt=0;gt<x.mipmaps.length;gt++)F.__webglFramebuffer[lt][gt]=i.createFramebuffer()}else F.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let lt=0;lt<x.mipmaps.length;lt++)F.__webglFramebuffer[lt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(yt)for(let lt=0,gt=K.length;lt<gt;lt++){const Ht=n.get(K[lt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&_t(T)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const gt=K[lt];F.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[lt]);const Ht=s.convert(gt.format,gt.colorSpace),tt=s.convert(gt.type),vt=S(gt.internalFormat,Ht,tt,gt.colorSpace,T.isXRRenderTarget===!0),Pt=Q(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,vt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,F.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),st(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,x);for(let lt=0;lt<6;lt++)if(x.mipmaps&&x.mipmaps.length>0)for(let gt=0;gt<x.mipmaps.length;gt++)St(F.__webglFramebuffer[lt][gt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,gt);else St(F.__webglFramebuffer[lt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let lt=0,gt=K.length;lt<gt;lt++){const Ht=K[lt],tt=n.get(Ht);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture),Nt(i.TEXTURE_2D,Ht),St(F.__webglFramebuffer,T,Ht,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(Ht)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(lt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,W.__webglTexture),Nt(lt,x),x.mipmaps&&x.mipmaps.length>0)for(let gt=0;gt<x.mipmaps.length;gt++)St(F.__webglFramebuffer[gt],T,x,i.COLOR_ATTACHMENT0,lt,gt);else St(F.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,lt,0);m(x)&&p(lt),e.unbindTexture()}T.depthBuffer&&Ut(T)}function j(T){const x=T.textures;for(let F=0,W=x.length;F<W;F++){const K=x[F];if(m(K)){const X=M(T),yt=n.get(K).__webglTexture;e.bindTexture(X,yt),p(X),e.unbindTexture()}}}const nt=[],w=[];function wt(T){if(T.samples>0){if(_t(T)===!1){const x=T.textures,F=T.width,W=T.height;let K=i.COLOR_BUFFER_BIT;const X=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(T),lt=x.length>1;if(lt)for(let gt=0;gt<x.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let gt=0;gt<x.length;gt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const Ht=n.get(x[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ht,0)}i.blitFramebuffer(0,0,F,W,0,0,F,W,K,i.NEAREST),c===!0&&(nt.length=0,w.length=0,nt.push(i.COLOR_ATTACHMENT0+gt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(nt.push(X),w.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let gt=0;gt<x.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const Ht=n.get(x[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,Ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Q(T){return Math.min(r.maxSamples,T.samples)}function _t(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ot(T){const x=o.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Ct(T,x){const F=T.colorSpace,W=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Ri&&F!==Tn&&(Xt.getTransfer(F)===Qt?(W!==qe||K!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}function mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=Y,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=et,this.setTextureCube=k,this.rebindTextures=Lt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=St,this.useMultisampledRTT=_t}function Jm(i,t){function e(n,r=Tn){let s;const o=Xt.getTransfer(r);if(n===dn)return i.UNSIGNED_BYTE;if(n===Fo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kc)return i.BYTE;if(n===$c)return i.SHORT;if(n===qi)return i.UNSIGNED_SHORT;if(n===No)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===Ai)return i.HALF_FLOAT;if(n===Qc)return i.ALPHA;if(n===tl)return i.RGB;if(n===qe)return i.RGBA;if(n===el)return i.LUMINANCE;if(n===nl)return i.LUMINANCE_ALPHA;if(n===vi)return i.DEPTH_COMPONENT;if(n===Ti)return i.DEPTH_STENCIL;if(n===il)return i.RED;if(n===zo)return i.RED_INTEGER;if(n===rl)return i.RG;if(n===Bo)return i.RG_INTEGER;if(n===ko)return i.RGBA_INTEGER;if(n===Ur||n===Ir||n===Nr||n===Fr)if(o===Qt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ur)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ur)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qs||n===to||n===eo||n===no)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Qs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===to)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===eo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===ro||n===so)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===io||n===ro)return o===Qt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===so)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===oo||n===ao||n===co||n===lo||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===oo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===co)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ho)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===po)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===go)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_o)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return o===Qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Or||n===So||n===yo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Or)return o===Qt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===So)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sl||n===Eo||n===bo||n===To)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Or)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Eo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===To)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Qm extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class wn extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tg={type:"move"};class Rs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tg)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ng=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Le,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new mn({vertexShader:eg,fragmentShader:ng,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new Ji(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rg extends Yn{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=new ig,m=e.getContextAttributes();let p=null,M=null;const S=[],v=[],L=new J;let A=null;const R=new Be;R.viewport=new se;const D=new Be;D.viewport=new se;const b=[R,D],E=new Qm;let P=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let it=S[q];return it===void 0&&(it=new Rs,S[q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(q){let it=S[q];return it===void 0&&(it=new Rs,S[q]=it),it.getGripSpace()},this.getHand=function(q){let it=S[q];return it===void 0&&(it=new Rs,S[q]=it),it.getHandSpace()};function B(q){const it=v.indexOf(q.inputSource);if(it===-1)return;const St=S[it];St!==void 0&&(St.update(q.inputSource,q.frame,l||o),St.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",$);for(let q=0;q<S.length;q++){const it=v[q];it!==null&&(v[q]=null,S[q].disconnect(it))}P=null,Y=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,r=null,M=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",V),r.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),r.renderState.layers===void 0){const it={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,it),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Pn(d.framebufferWidth,d.framebufferHeight,{format:qe,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let it=null,St=null,st=null;m.depth&&(st=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=m.stencil?Ti:vi,St=m.stencil?bi:Vn);const Rt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:s};u=new XRWebGLBinding(r,e),f=u.createProjectionLayer(Rt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Pn(f.textureWidth,f.textureHeight,{format:qe,type:dn,depthTexture:new qo(f.textureWidth,f.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),jt.setContext(r),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(q){for(let it=0;it<q.removed.length;it++){const St=q.removed[it],st=v.indexOf(St);st>=0&&(v[st]=null,S[st].disconnect(St))}for(let it=0;it<q.added.length;it++){const St=q.added[it];let st=v.indexOf(St);if(st===-1){for(let Ut=0;Ut<S.length;Ut++)if(Ut>=v.length){v.push(St),st=Ut;break}else if(v[Ut]===null){v[Ut]=St,st=Ut;break}if(st===-1)break}const Rt=S[st];Rt&&Rt.connect(St)}}const G=new C,et=new C;function k(q,it,St){G.setFromMatrixPosition(it.matrixWorld),et.setFromMatrixPosition(St.matrixWorld);const st=G.distanceTo(et),Rt=it.projectionMatrix.elements,Ut=St.projectionMatrix.elements,Lt=Rt[14]/(Rt[10]-1),Vt=Rt[14]/(Rt[10]+1),j=(Rt[9]+1)/Rt[5],nt=(Rt[9]-1)/Rt[5],w=(Rt[8]-1)/Rt[0],wt=(Ut[8]+1)/Ut[0],Q=Lt*w,_t=Lt*wt,ot=st/(-w+wt),Ct=ot*-w;if(it.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ct),q.translateZ(ot),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Rt[10]===-1)q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const mt=Lt+ot,T=Vt+ot,x=Q-Ct,F=_t+(st-Ct),W=j*Vt/T*mt,K=nt*Vt/T*mt;q.projectionMatrix.makePerspective(x,F,W,K,mt,T),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function at(q,it){it===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(it.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let it=q.near,St=q.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(St=_.depthFar)),E.near=D.near=R.near=it,E.far=D.far=R.far=St,(P!==E.near||Y!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),P=E.near,Y=E.far),R.layers.mask=q.layers.mask|2,D.layers.mask=q.layers.mask|4,E.layers.mask=R.layers.mask|D.layers.mask;const st=q.parent,Rt=E.cameras;at(E,st);for(let Ut=0;Ut<Rt.length;Ut++)at(Rt[Ut],st);Rt.length===2?k(E,R,D):E.projectionMatrix.copy(R.projectionMatrix),pt(q,E,st)};function pt(q,it,St){St===null?q.matrix.copy(it.matrixWorld):(q.matrix.copy(St.matrixWorld),q.matrix.invert(),q.matrix.multiply(it.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(it.projectionMatrix),q.projectionMatrixInverse.copy(it.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Zi*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let Mt=null;function Nt(q,it){if(h=it.getViewerPose(l||o),g=it,h!==null){const St=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let st=!1;St.length!==E.cameras.length&&(E.cameras.length=0,st=!0);for(let Ut=0;Ut<St.length;Ut++){const Lt=St[Ut];let Vt=null;if(d!==null)Vt=d.getViewport(Lt);else{const nt=u.getViewSubImage(f,Lt);Vt=nt.viewport,Ut===0&&(t.setRenderTargetTextures(M,nt.colorTexture,f.ignoreDepthValues?void 0:nt.depthStencilTexture),t.setRenderTarget(M))}let j=b[Ut];j===void 0&&(j=new Be,j.layers.enable(Ut),j.viewport=new se,b[Ut]=j),j.matrix.fromArray(Lt.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Lt.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),Ut===0&&(E.matrix.copy(j.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),st===!0&&E.cameras.push(j)}const Rt=r.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Ut=u.getDepthInformation(St[0]);Ut&&Ut.isValid&&Ut.texture&&_.init(t,Ut,r.renderState)}}for(let St=0;St<S.length;St++){const st=v[St],Rt=S[St];st!==null&&Rt!==void 0&&Rt.update(st,it,l||o)}Mt&&Mt(q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const jt=new xl;jt.setAnimationLoop(Nt),this.setAnimationLoop=function(q){Mt=q},this.dispose=function(){}}}const On=new Ze,sg=new Zt;function og(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,gl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ce&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ce&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),S=M.envMap,v=M.envMapRotation;S&&(m.envMap.value=S,On.copy(v),On.x*=-1,On.y*=-1,On.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(On)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ce&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function ag(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,S){const v=S.program;n.uniformBlockBinding(M,v)}function l(M,S){let v=r[M.id];v===void 0&&(g(M),v=h(M),r[M.id]=v,M.addEventListener("dispose",m));const L=S.program;n.updateUBOMapping(M,L);const A=t.render.frame;s[M.id]!==A&&(f(M),s[M.id]=A)}function h(M){const S=u();M.__bindingPointIndex=S;const v=i.createBuffer(),L=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const S=r[M.id],v=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,R=v.length;A<R;A++){const D=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,E=D.length;b<E;b++){const P=D[b];if(d(P,A,b,L)===!0){const Y=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let $=0;$<B.length;$++){const G=B[$],et=_(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,Y+V,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,V),V+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,S,v,L){const A=M.value,R=S+"_"+v;if(L[R]===void 0)return typeof A=="number"||typeof A=="boolean"?L[R]=A:L[R]=A.clone(),!0;{const D=L[R];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return L[R]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(M){const S=M.uniforms;let v=0;const L=16;for(let R=0,D=S.length;R<D;R++){const b=Array.isArray(S[R])?S[R]:[S[R]];for(let E=0,P=b.length;E<P;E++){const Y=b[E],B=Array.isArray(Y.value)?Y.value:[Y.value];for(let V=0,$=B.length;V<$;V++){const G=B[V],et=_(G),k=v%L,at=k%et.boundary,pt=k+at;v+=at,pt!==0&&L-pt<et.storage&&(v+=L-pt),Y.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=v,v+=et.storage}}}const A=v%L;return A>0&&(v+=L-A),M.__size=v,M.__cache={},this}function _(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function m(M){const S=M.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const M in r)i.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class cg{constructor(t={}){const{canvas:e=jh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this.toneMapping=Rn,this.toneMappingExposure=1;const v=this;let L=!1,A=0,R=0,D=null,b=-1,E=null;const P=new se,Y=new se;let B=null;const V=new qt(0);let $=0,G=e.width,et=e.height,k=1,at=null,pt=null;const Mt=new se(0,0,G,et),Nt=new se(0,0,G,et);let jt=!1;const q=new Wo;let it=!1,St=!1;const st=new Zt,Rt=new Zt,Ut=new C,Lt=new se,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let j=!1;function nt(){return D===null?k:1}let w=n;function wt(y,I){return e.getContext(y,I)}try{const y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),w===null){const I="webgl2";if(w=wt(I,y),w===null)throw wt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Q,_t,ot,Ct,mt,T,x,F,W,K,X,yt,lt,gt,Ht,tt,vt,Pt,Dt,xt,Gt,Bt,ee,U;function ht(){Q=new dp(w),Q.init(),Bt=new Jm(w,Q),_t=new ap(w,Q,t,Bt),ot=new jm(w,Q),_t.reverseDepthBuffer&&f&&ot.buffers.depth.setReversed(!0),Ct=new gp(w),mt=new Im,T=new $m(w,Q,ot,mt,_t,Bt,Ct),x=new lp(v),F=new fp(v),W=new yu(w),ee=new sp(w,W),K=new pp(w,W,Ct,ee),X=new vp(w,K,W,Ct),Dt=new _p(w,_t,T),tt=new cp(mt),yt=new Um(v,x,F,Q,_t,ee,tt),lt=new og(v,mt),gt=new Fm,Ht=new Gm(Q),Pt=new rp(v,x,F,ot,X,d,c),vt=new qm(v,X,_t),U=new ag(w,Ct,_t,ot),xt=new op(w,Q,Ct),Gt=new mp(w,Q,Ct),Ct.programs=yt.programs,v.capabilities=_t,v.extensions=Q,v.properties=mt,v.renderLists=gt,v.shadowMap=vt,v.state=ot,v.info=Ct}ht();const H=new rg(v,w);this.xr=H,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=Q.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Q.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(y){y!==void 0&&(k=y,this.setSize(G,et,!1))},this.getSize=function(y){return y.set(G,et)},this.setSize=function(y,I,O=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=y,et=I,e.width=Math.floor(y*k),e.height=Math.floor(I*k),O===!0&&(e.style.width=y+"px",e.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(G*k,et*k).floor()},this.setDrawingBufferSize=function(y,I,O){G=y,et=I,k=O,e.width=Math.floor(y*O),e.height=Math.floor(I*O),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(Mt)},this.setViewport=function(y,I,O,z){y.isVector4?Mt.set(y.x,y.y,y.z,y.w):Mt.set(y,I,O,z),ot.viewport(P.copy(Mt).multiplyScalar(k).round())},this.getScissor=function(y){return y.copy(Nt)},this.setScissor=function(y,I,O,z){y.isVector4?Nt.set(y.x,y.y,y.z,y.w):Nt.set(y,I,O,z),ot.scissor(Y.copy(Nt).multiplyScalar(k).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(y){ot.setScissorTest(jt=y)},this.setOpaqueSort=function(y){at=y},this.setTransparentSort=function(y){pt=y},this.getClearColor=function(y){return y.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(y=!0,I=!0,O=!0){let z=0;if(y){let N=!1;if(D!==null){const rt=D.texture.format;N=rt===ko||rt===Bo||rt===zo}if(N){const rt=D.texture.type,ft=rt===dn||rt===Vn||rt===qi||rt===bi||rt===Fo||rt===Oo,Et=Pt.getClearColor(),bt=Pt.getClearAlpha(),It=Et.r,Ot=Et.g,Tt=Et.b;ft?(g[0]=It,g[1]=Ot,g[2]=Tt,g[3]=bt,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=It,_[1]=Ot,_[2]=Tt,_[3]=bt,w.clearBufferiv(w.COLOR,0,_))}else z|=w.COLOR_BUFFER_BIT}I&&(z|=w.DEPTH_BUFFER_BIT),O&&(z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),gt.dispose(),Ht.dispose(),mt.dispose(),x.dispose(),F.dispose(),X.dispose(),ee.dispose(),U.dispose(),yt.dispose(),H.dispose(),H.removeEventListener("sessionstart",na),H.removeEventListener("sessionend",ia),Ln.stop()};function Z(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const y=Ct.autoReset,I=vt.enabled,O=vt.autoUpdate,z=vt.needsUpdate,N=vt.type;ht(),Ct.autoReset=y,vt.enabled=I,vt.autoUpdate=O,vt.needsUpdate=z,vt.type=N}function ut(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ft(y){const I=y.target;I.removeEventListener("dispose",Ft),ae(I)}function ae(y){Me(y),mt.remove(y)}function Me(y){const I=mt.get(y).programs;I!==void 0&&(I.forEach(function(O){yt.releaseProgram(O)}),y.isShaderMaterial&&yt.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,O,z,N,rt){I===null&&(I=Vt);const ft=N.isMesh&&N.matrixWorld.determinant()<0,Et=Bl(y,I,O,z,N);ot.setMaterial(z,ft);let bt=O.index,It=1;if(z.wireframe===!0){if(bt=K.getWireframeAttribute(O),bt===void 0)return;It=2}const Ot=O.drawRange,Tt=O.attributes.position;let Yt=Ot.start*It,ne=(Ot.start+Ot.count)*It;rt!==null&&(Yt=Math.max(Yt,rt.start*It),ne=Math.min(ne,(rt.start+rt.count)*It)),bt!==null?(Yt=Math.max(Yt,0),ne=Math.min(ne,bt.count)):Tt!=null&&(Yt=Math.max(Yt,0),ne=Math.min(ne,Tt.count));const ie=ne-Yt;if(ie<0||ie===1/0)return;ee.setup(N,z,Et,O,bt);let Ae,Kt=xt;if(bt!==null&&(Ae=W.get(bt),Kt=Gt,Kt.setIndex(Ae)),N.isMesh)z.wireframe===!0?(ot.setLineWidth(z.wireframeLinewidth*nt()),Kt.setMode(w.LINES)):Kt.setMode(w.TRIANGLES);else if(N.isLine){let At=z.linewidth;At===void 0&&(At=1),ot.setLineWidth(At*nt()),N.isLineSegments?Kt.setMode(w.LINES):N.isLineLoop?Kt.setMode(w.LINE_LOOP):Kt.setMode(w.LINE_STRIP)}else N.isPoints?Kt.setMode(w.POINTS):N.isSprite&&Kt.setMode(w.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Kt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))Kt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const At=N._multiDrawStarts,nn=N._multiDrawCounts,$t=N._multiDrawCount,Ge=bt?W.get(bt).bytesPerElement:1,jn=mt.get(z).currentProgram.getUniforms();for(let De=0;De<$t;De++)jn.setValue(w,"_gl_DrawID",De),Kt.render(At[De]/Ge,nn[De])}else if(N.isInstancedMesh)Kt.renderInstances(Yt,ie,N.count);else if(O.isInstancedBufferGeometry){const At=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,nn=Math.min(O.instanceCount,At);Kt.renderInstances(Yt,ie,nn)}else Kt.render(Yt,ie)};function Jt(y,I,O){y.transparent===!0&&y.side===Ye&&y.forceSinglePass===!1?(y.side=Ce,y.needsUpdate=!0,nr(y,I,O),y.side=Cn,y.needsUpdate=!0,nr(y,I,O),y.side=Ye):nr(y,I,O)}this.compile=function(y,I,O=null){O===null&&(O=y),p=Ht.get(O),p.init(I),S.push(p),O.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==O&&y.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const rt=N.material;if(rt)if(Array.isArray(rt))for(let ft=0;ft<rt.length;ft++){const Et=rt[ft];Jt(Et,O,N),z.add(Et)}else Jt(rt,O,N),z.add(rt)}),S.pop(),p=null,z},this.compileAsync=function(y,I,O=null){const z=this.compile(y,I,O);return new Promise(N=>{function rt(){if(z.forEach(function(ft){mt.get(ft).currentProgram.isReady()&&z.delete(ft)}),z.size===0){N(y);return}setTimeout(rt,10)}Q.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let He=null;function en(y){He&&He(y)}function na(){Ln.stop()}function ia(){Ln.start()}const Ln=new xl;Ln.setAnimationLoop(en),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(y){He=y,H.setAnimationLoop(y),y===null?Ln.stop():Ln.start()},H.addEventListener("sessionstart",na),H.addEventListener("sessionend",ia),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(I),I=H.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,I,D),p=Ht.get(y,S.length),p.init(I),S.push(p),Rt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),q.setFromProjectionMatrix(Rt),St=this.localClippingEnabled,it=tt.init(this.clippingPlanes,St),m=gt.get(y,M.length),m.init(),M.push(m),H.enabled===!0&&H.isPresenting===!0){const rt=v.xr.getDepthSensingMesh();rt!==null&&ts(rt,I,-1/0,v.sortObjects)}ts(y,I,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(at,pt),j=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,j&&Pt.addToRenderList(m,y),this.info.render.frame++,it===!0&&tt.beginShadows();const O=p.state.shadowsArray;vt.render(O,y,I),it===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(p.setupLights(),I.isArrayCamera){const rt=I.cameras;if(N.length>0)for(let ft=0,Et=rt.length;ft<Et;ft++){const bt=rt[ft];sa(z,N,y,bt)}j&&Pt.render(y);for(let ft=0,Et=rt.length;ft<Et;ft++){const bt=rt[ft];ra(m,y,bt,bt.viewport)}}else N.length>0&&sa(z,N,y,I),j&&Pt.render(y),ra(m,y,I);D!==null&&(T.updateMultisampleRenderTarget(D),T.updateRenderTargetMipmap(D)),y.isScene===!0&&y.onAfterRender(v,y,I),ee.resetDefaultState(),b=-1,E=null,S.pop(),S.length>0?(p=S[S.length-1],it===!0&&tt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function ts(y,I,O,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||q.intersectsSprite(y)){z&&Lt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Rt);const ft=X.update(y),Et=y.material;Et.visible&&m.push(y,ft,Et,O,Lt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||q.intersectsObject(y))){const ft=X.update(y),Et=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Lt.copy(y.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Lt.copy(ft.boundingSphere.center)),Lt.applyMatrix4(y.matrixWorld).applyMatrix4(Rt)),Array.isArray(Et)){const bt=ft.groups;for(let It=0,Ot=bt.length;It<Ot;It++){const Tt=bt[It],Yt=Et[Tt.materialIndex];Yt&&Yt.visible&&m.push(y,ft,Yt,O,Lt.z,Tt)}}else Et.visible&&m.push(y,ft,Et,O,Lt.z,null)}}const rt=y.children;for(let ft=0,Et=rt.length;ft<Et;ft++)ts(rt[ft],I,O,z)}function ra(y,I,O,z){const N=y.opaque,rt=y.transmissive,ft=y.transparent;p.setupLightsView(O),it===!0&&tt.setGlobalState(v.clippingPlanes,O),z&&ot.viewport(P.copy(z)),N.length>0&&er(N,I,O),rt.length>0&&er(rt,I,O),ft.length>0&&er(ft,I,O),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function sa(y,I,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Pn(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?Ai:dn,minFilter:Gn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const rt=p.state.transmissionRenderTarget[z.id],ft=z.viewport||P;rt.setSize(ft.z,ft.w);const Et=v.getRenderTarget();v.setRenderTarget(rt),v.getClearColor(V),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),j&&Pt.render(O);const bt=v.toneMapping;v.toneMapping=Rn;const It=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),it===!0&&tt.setGlobalState(v.clippingPlanes,z),er(y,O,z),T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Tt=0,Yt=I.length;Tt<Yt;Tt++){const ne=I[Tt],ie=ne.object,Ae=ne.geometry,Kt=ne.material,At=ne.group;if(Kt.side===Ye&&ie.layers.test(z.layers)){const nn=Kt.side;Kt.side=Ce,Kt.needsUpdate=!0,oa(ie,O,z,Ae,Kt,At),Kt.side=nn,Kt.needsUpdate=!0,Ot=!0}}Ot===!0&&(T.updateMultisampleRenderTarget(rt),T.updateRenderTargetMipmap(rt))}v.setRenderTarget(Et),v.setClearColor(V,$),It!==void 0&&(z.viewport=It),v.toneMapping=bt}function er(y,I,O){const z=I.isScene===!0?I.overrideMaterial:null;for(let N=0,rt=y.length;N<rt;N++){const ft=y[N],Et=ft.object,bt=ft.geometry,It=z===null?ft.material:z,Ot=ft.group;Et.layers.test(O.layers)&&oa(Et,I,O,bt,It,Ot)}}function oa(y,I,O,z,N,rt){y.onBeforeRender(v,I,O,z,N,rt),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(v,I,O,z,y,rt),N.transparent===!0&&N.side===Ye&&N.forceSinglePass===!1?(N.side=Ce,N.needsUpdate=!0,v.renderBufferDirect(O,I,z,N,y,rt),N.side=Cn,N.needsUpdate=!0,v.renderBufferDirect(O,I,z,N,y,rt),N.side=Ye):v.renderBufferDirect(O,I,z,N,y,rt),y.onAfterRender(v,I,O,z,N,rt)}function nr(y,I,O){I.isScene!==!0&&(I=Vt);const z=mt.get(y),N=p.state.lights,rt=p.state.shadowsArray,ft=N.state.version,Et=yt.getParameters(y,N.state,rt,I,O),bt=yt.getProgramCacheKey(Et);let It=z.programs;z.environment=y.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(y.isMeshStandardMaterial?F:x).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,It===void 0&&(y.addEventListener("dispose",Ft),It=new Map,z.programs=It);let Ot=It.get(bt);if(Ot!==void 0){if(z.currentProgram===Ot&&z.lightsStateVersion===ft)return ca(y,Et),Ot}else Et.uniforms=yt.getUniforms(y),y.onBeforeCompile(Et,v),Ot=yt.acquireProgram(Et,bt),It.set(bt,Ot),z.uniforms=Et.uniforms;const Tt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Tt.clippingPlanes=tt.uniform),ca(y,Et),z.needsLights=Hl(y),z.lightsStateVersion=ft,z.needsLights&&(Tt.ambientLightColor.value=N.state.ambient,Tt.lightProbe.value=N.state.probe,Tt.directionalLights.value=N.state.directional,Tt.directionalLightShadows.value=N.state.directionalShadow,Tt.spotLights.value=N.state.spot,Tt.spotLightShadows.value=N.state.spotShadow,Tt.rectAreaLights.value=N.state.rectArea,Tt.ltc_1.value=N.state.rectAreaLTC1,Tt.ltc_2.value=N.state.rectAreaLTC2,Tt.pointLights.value=N.state.point,Tt.pointLightShadows.value=N.state.pointShadow,Tt.hemisphereLights.value=N.state.hemi,Tt.directionalShadowMap.value=N.state.directionalShadowMap,Tt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Tt.spotShadowMap.value=N.state.spotShadowMap,Tt.spotLightMatrix.value=N.state.spotLightMatrix,Tt.spotLightMap.value=N.state.spotLightMap,Tt.pointShadowMap.value=N.state.pointShadowMap,Tt.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Ot,z.uniformsList=null,Ot}function aa(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=zr.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function ca(y,I){const O=mt.get(y);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function Bl(y,I,O,z,N){I.isScene!==!0&&(I=Vt),T.resetTextureUnits();const rt=I.fog,ft=z.isMeshStandardMaterial?I.environment:null,Et=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ri,bt=(z.isMeshStandardMaterial?F:x).get(z.envMap||ft),It=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ot=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Tt=!!O.morphAttributes.position,Yt=!!O.morphAttributes.normal,ne=!!O.morphAttributes.color;let ie=Rn;z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ie=v.toneMapping);const Ae=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=Ae!==void 0?Ae.length:0,At=mt.get(z),nn=p.state.lights;if(it===!0&&(St===!0||y!==E)){const Fe=y===E&&z.id===b;tt.setState(z,y,Fe)}let $t=!1;z.version===At.__version?(At.needsLights&&At.lightsStateVersion!==nn.state.version||At.outputColorSpace!==Et||N.isBatchedMesh&&At.batching===!1||!N.isBatchedMesh&&At.batching===!0||N.isBatchedMesh&&At.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&At.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&At.instancing===!1||!N.isInstancedMesh&&At.instancing===!0||N.isSkinnedMesh&&At.skinning===!1||!N.isSkinnedMesh&&At.skinning===!0||N.isInstancedMesh&&At.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&At.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&At.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&At.instancingMorph===!1&&N.morphTexture!==null||At.envMap!==bt||z.fog===!0&&At.fog!==rt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==tt.numPlanes||At.numIntersection!==tt.numIntersection)||At.vertexAlphas!==It||At.vertexTangents!==Ot||At.morphTargets!==Tt||At.morphNormals!==Yt||At.morphColors!==ne||At.toneMapping!==ie||At.morphTargetsCount!==Kt)&&($t=!0):($t=!0,At.__version=z.version);let Ge=At.currentProgram;$t===!0&&(Ge=nr(z,I,N));let jn=!1,De=!1,Ui=!1;const re=Ge.getUniforms(),je=At.uniforms;if(ot.useProgram(Ge.program)&&(jn=!0,De=!0,Ui=!0),z.id!==b&&(b=z.id,De=!0),jn||E!==y){ot.buffers.depth.getReversed()?(st.copy(y.projectionMatrix),$h(st),Jh(st),re.setValue(w,"projectionMatrix",st)):re.setValue(w,"projectionMatrix",y.projectionMatrix),re.setValue(w,"viewMatrix",y.matrixWorldInverse);const gn=re.map.cameraPosition;gn!==void 0&&gn.setValue(w,Ut.setFromMatrixPosition(y.matrixWorld)),_t.logarithmicDepthBuffer&&re.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&re.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),E!==y&&(E=y,De=!0,Ui=!0)}if(N.isSkinnedMesh){re.setOptional(w,N,"bindMatrix"),re.setOptional(w,N,"bindMatrixInverse");const Fe=N.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),re.setValue(w,"boneTexture",Fe.boneTexture,T))}N.isBatchedMesh&&(re.setOptional(w,N,"batchingTexture"),re.setValue(w,"batchingTexture",N._matricesTexture,T),re.setOptional(w,N,"batchingIdTexture"),re.setValue(w,"batchingIdTexture",N._indirectTexture,T),re.setOptional(w,N,"batchingColorTexture"),N._colorsTexture!==null&&re.setValue(w,"batchingColorTexture",N._colorsTexture,T));const Ii=O.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&Dt.update(N,O,Ge),(De||At.receiveShadow!==N.receiveShadow)&&(At.receiveShadow=N.receiveShadow,re.setValue(w,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(je.envMap.value=bt,je.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(je.envMapIntensity.value=I.environmentIntensity),De&&(re.setValue(w,"toneMappingExposure",v.toneMappingExposure),At.needsLights&&kl(je,Ui),rt&&z.fog===!0&&lt.refreshFogUniforms(je,rt),lt.refreshMaterialUniforms(je,z,k,et,p.state.transmissionRenderTarget[y.id]),zr.upload(w,aa(At),je,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(zr.upload(w,aa(At),je,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&re.setValue(w,"center",N.center),re.setValue(w,"modelViewMatrix",N.modelViewMatrix),re.setValue(w,"normalMatrix",N.normalMatrix),re.setValue(w,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Fe=z.uniformsGroups;for(let gn=0,_n=Fe.length;gn<_n;gn++){const la=Fe[gn];U.update(la,Ge),U.bind(la,Ge)}}return Ge}function kl(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Hl(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(y,I,O){mt.get(y.texture).__webglTexture=I,mt.get(y.depthTexture).__webglTexture=O;const z=mt.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,I){const O=mt.get(y);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,O=0){D=y,A=I,R=O;let z=!0,N=null,rt=!1,ft=!1;if(y){const bt=mt.get(y);if(bt.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(w.FRAMEBUFFER,null),z=!1;else if(bt.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(bt.__hasExternalTextures)T.rebindTextures(y,mt.get(y.texture).__webglTexture,mt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Tt=y.depthTexture;if(bt.__boundDepthTexture!==Tt){if(Tt!==null&&mt.has(Tt)&&(y.width!==Tt.image.width||y.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const It=y.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ft=!0);const Ot=mt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ot[I])?N=Ot[I][O]:N=Ot[I],rt=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?N=mt.get(y).__webglMultisampledFramebuffer:Array.isArray(Ot)?N=Ot[O]:N=Ot,P.copy(y.viewport),Y.copy(y.scissor),B=y.scissorTest}else P.copy(Mt).multiplyScalar(k).floor(),Y.copy(Nt).multiplyScalar(k).floor(),B=jt;if(ot.bindFramebuffer(w.FRAMEBUFFER,N)&&z&&ot.drawBuffers(y,N),ot.viewport(P),ot.scissor(Y),ot.setScissorTest(B),rt){const bt=mt.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+I,bt.__webglTexture,O)}else if(ft){const bt=mt.get(y.texture),It=I||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,bt.__webglTexture,O||0,It)}b=-1},this.readRenderTargetPixels=function(y,I,O,z,N,rt,ft){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=mt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ft!==void 0&&(Et=Et[ft]),Et){ot.bindFramebuffer(w.FRAMEBUFFER,Et);try{const bt=y.texture,It=bt.format,Ot=bt.type;if(!_t.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&O>=0&&O<=y.height-N&&w.readPixels(I,O,z,N,Bt.convert(It),Bt.convert(Ot),rt)}finally{const bt=D!==null?mt.get(D).__webglFramebuffer:null;ot.bindFramebuffer(w.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(y,I,O,z,N,rt,ft){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=mt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ft!==void 0&&(Et=Et[ft]),Et){const bt=y.texture,It=bt.format,Ot=bt.type;if(!_t.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=y.width-z&&O>=0&&O<=y.height-N){ot.bindFramebuffer(w.FRAMEBUFFER,Et);const Tt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Tt),w.bufferData(w.PIXEL_PACK_BUFFER,rt.byteLength,w.STREAM_READ),w.readPixels(I,O,z,N,Bt.convert(It),Bt.convert(Ot),0);const Yt=D!==null?mt.get(D).__webglFramebuffer:null;ot.bindFramebuffer(w.FRAMEBUFFER,Yt);const ne=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Kh(w,ne,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Tt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,rt),w.deleteBuffer(Tt),w.deleteSync(ne),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,I=null,O=0){y.isTexture!==!0&&(ki("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-O),N=Math.floor(y.image.width*z),rt=Math.floor(y.image.height*z),ft=I!==null?I.x:0,Et=I!==null?I.y:0;T.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,O,0,0,ft,Et,N,rt),ot.unbindTexture()},this.copyTextureToTexture=function(y,I,O=null,z=null,N=0){y.isTexture!==!0&&(ki("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],I=arguments[2],N=arguments[3]||0,O=null);let rt,ft,Et,bt,It,Ot,Tt,Yt,ne;const ie=y.isCompressedTexture?y.mipmaps[N]:y.image;O!==null?(rt=O.max.x-O.min.x,ft=O.max.y-O.min.y,Et=O.isBox3?O.max.z-O.min.z:1,bt=O.min.x,It=O.min.y,Ot=O.isBox3?O.min.z:0):(rt=ie.width,ft=ie.height,Et=ie.depth||1,bt=0,It=0,Ot=0),z!==null?(Tt=z.x,Yt=z.y,ne=z.z):(Tt=0,Yt=0,ne=0);const Ae=Bt.convert(I.format),Kt=Bt.convert(I.type);let At;I.isData3DTexture?(T.setTexture3D(I,0),At=w.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(T.setTexture2DArray(I,0),At=w.TEXTURE_2D_ARRAY):(T.setTexture2D(I,0),At=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);const nn=w.getParameter(w.UNPACK_ROW_LENGTH),$t=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Ge=w.getParameter(w.UNPACK_SKIP_PIXELS),jn=w.getParameter(w.UNPACK_SKIP_ROWS),De=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ie.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ie.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,bt),w.pixelStorei(w.UNPACK_SKIP_ROWS,It),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ot);const Ui=y.isDataArrayTexture||y.isData3DTexture,re=I.isDataArrayTexture||I.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const je=mt.get(y),Ii=mt.get(I),Fe=mt.get(je.__renderTarget),gn=mt.get(Ii.__renderTarget);ot.bindFramebuffer(w.READ_FRAMEBUFFER,Fe.__webglFramebuffer),ot.bindFramebuffer(w.DRAW_FRAMEBUFFER,gn.__webglFramebuffer);for(let _n=0;_n<Et;_n++)Ui&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,mt.get(y).__webglTexture,N,Ot+_n),y.isDepthTexture?(re&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,mt.get(I).__webglTexture,N,ne+_n),w.blitFramebuffer(bt,It,rt,ft,Tt,Yt,rt,ft,w.DEPTH_BUFFER_BIT,w.NEAREST)):re?w.copyTexSubImage3D(At,N,Tt,Yt,ne+_n,bt,It,rt,ft):w.copyTexSubImage2D(At,N,Tt,Yt,ne+_n,bt,It,rt,ft);ot.bindFramebuffer(w.READ_FRAMEBUFFER,null),ot.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else re?y.isDataTexture||y.isData3DTexture?w.texSubImage3D(At,N,Tt,Yt,ne,rt,ft,Et,Ae,Kt,ie.data):I.isCompressedArrayTexture?w.compressedTexSubImage3D(At,N,Tt,Yt,ne,rt,ft,Et,Ae,ie.data):w.texSubImage3D(At,N,Tt,Yt,ne,rt,ft,Et,Ae,Kt,ie):y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,N,Tt,Yt,rt,ft,Ae,Kt,ie.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,N,Tt,Yt,ie.width,ie.height,Ae,ie.data):w.texSubImage2D(w.TEXTURE_2D,N,Tt,Yt,rt,ft,Ae,Kt,ie);w.pixelStorei(w.UNPACK_ROW_LENGTH,nn),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,$t),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ge),w.pixelStorei(w.UNPACK_SKIP_ROWS,jn),w.pixelStorei(w.UNPACK_SKIP_IMAGES,De),N===0&&I.generateMipmaps&&w.generateMipmap(At),ot.unbindTexture()},this.copyTextureToTexture3D=function(y,I,O=null,z=null,N=0){return y.isTexture!==!0&&(ki("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,y=arguments[2],I=arguments[3],N=arguments[4]||0),ki('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,I,O,z,N)},this.initRenderTarget=function(y){mt.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),ot.unbindTexture()},this.resetState=function(){A=0,R=0,D=null,ot.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}class bl extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class lg extends Ci{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Vr=new C,Wr=new C,hc=new Zt,Bi=new Vo,br=new Zr,Cs=new C,uc=new C;class hg extends xe{constructor(t=new Ee,e=new lg){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Vr.fromBufferAttribute(e,r-1),Wr.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Vr.distanceTo(Wr);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),br.radius+=s,t.ray.intersectsSphere(br)===!1)return;hc.copy(r).invert(),Bi.copy(t.ray).applyMatrix4(hc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),S=Tr(this,t,Bi,c,p,M);S&&e.push(S)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=Tr(this,t,Bi,c,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=Tr(this,t,Bi,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Tr(this,t,Bi,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Tr(i,t,e,n,r,s){const o=i.geometry.attributes.position;if(Vr.fromBufferAttribute(o,r),Wr.fromBufferAttribute(o,s),e.distanceSqToSegment(Vr,Wr,Cs,uc)>n)return;Cs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Cs);if(!(c<t.near||c>t.far))return{distance:c,point:uc.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const fc=new C,dc=new C;class k0 extends hg{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)fc.fromBufferAttribute(e,r),dc.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+fc.distanceTo(dc);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const h=n[r],f=n[r+1]-h,d=(o-h)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=e||(o.isVector2?new J:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,r=[],s=[],o=[],a=new C,c=new Zt;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new C)}s[0]=new C,o[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ge(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(ge(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Zo extends tn{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new J){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ug extends Zo{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function jo(){let i=0,t=0,e=0,n=0;function r(s,o,a,c){i=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let f=(o-s)/l-(a-s)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const wr=new C,Ps=new jo,Ls=new jo,Ds=new jo;class fg extends tn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new C){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(wr.subVectors(r[0],r[1]).add(r[0]),l=wr);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(wr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=wr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ps.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Ls.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),Ds.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Ps.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Ls.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Ds.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Ps.calc(c),Ls.calc(c),Ds.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new C().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function pc(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,c=i*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*i+e}function dg(i,t){const e=1-i;return e*e*t}function pg(i,t){return 2*(1-i)*i*t}function mg(i,t){return i*i*t}function Xi(i,t,e,n){return dg(i,t)+pg(i,e)+mg(i,n)}function gg(i,t){const e=1-i;return e*e*e*t}function _g(i,t){const e=1-i;return 3*e*e*i*t}function vg(i,t){return 3*(1-i)*i*i*t}function xg(i,t){return i*i*i*t}function Yi(i,t,e,n,r){return gg(i,t)+_g(i,e)+vg(i,n)+xg(i,r)}class Tl extends tn{constructor(t=new J,e=new J,n=new J,r=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new J){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,r.x,s.x,o.x,a.x),Yi(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mg extends tn{constructor(t=new C,e=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Yi(t,r.x,s.x,o.x,a.x),Yi(t,r.y,s.y,o.y,a.y),Yi(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class wl extends tn{constructor(t=new J,e=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sg extends tn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Al extends tn{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Xi(t,r.x,s.x,o.x),Xi(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yg extends tn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Xi(t,r.x,s.x,o.x),Xi(t,r.y,s.y,o.y),Xi(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rl extends tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new J){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(pc(a,c.x,l.x,h.x,u.x),pc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new J().fromArray(r))}return this}}var Ao=Object.freeze({__proto__:null,ArcCurve:ug,CatmullRomCurve3:fg,CubicBezierCurve:Tl,CubicBezierCurve3:Mg,EllipseCurve:Zo,LineCurve:wl,LineCurve3:Sg,QuadraticBezierCurve:Al,QuadraticBezierCurve3:yg,SplineCurve:Rl});class Eg extends tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ao[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Ao[r.type]().fromJSON(r))}return this}}class Ro extends Eg{constructor(t){super(),this.type="Path",this.currentPoint=new J,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new wl(this.currentPoint.clone(),new J(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new Al(this.currentPoint.clone(),new J(t,e),new J(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new Tl(this.currentPoint.clone(),new J(t,e),new J(n,r),new J(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Rl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,r,s,o,a,c),this}absellipse(t,e,n,r,s,o,a,c){const l=new Zo(t,e,n,r,s,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}const Ar=new C,Rr=new C,Us=new C,Cr=new ke;class H0 extends Ee{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),s=Math.cos(xi*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=Cr;if(_.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),Cr.getNormal(Us),u[0]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){const S=(M+1)%3,v=u[M],L=u[S],A=Cr[h[M]],R=Cr[h[S]],D=`${v}_${L}`,b=`${L}_${v}`;b in f&&f[b]?(Us.dot(f[b].normal)<=s&&(d.push(A.x,A.y,A.z),d.push(R.x,R.y,R.z)),f[b]=null):D in f||(f[D]={index0:l[M],index1:l[S],normal:Us.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];Ar.fromBufferAttribute(a,_),Rr.fromBufferAttribute(a,m),d.push(Ar.x,Ar.y,Ar.z),d.push(Rr.x,Rr.y,Rr.z)}this.setAttribute("position",new _e(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Di extends Ro{constructor(t){super(t),this.uuid=qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Ro().fromJSON(r))}return this}}const bg={triangulate:function(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=Cl(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,h,u,f,d;if(n&&(s=Cg(i,t,s,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<r;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-a,h-c),d=d!==0?32767/d:0}return ji(s,o,e,a,c,d,0),o}};function Cl(i,t,e,n,r){let s,o;if(r===kg(i,t,e,n)>0)for(s=t;s<e;s+=n)o=mc(s,i[s],i[s+1],o);else for(s=e-n;s>=t;s-=n)o=mc(s,i[s],i[s+1],o);return o&&Kr(o,o.next)&&($i(o),o=o.next),o}function Wn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Kr(e,e.next)||oe(e.prev,e,e.next)===0)){if($i(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ji(i,t,e,n,r,s,o){if(!i)return;!o&&s&&Ig(i,n,r,s);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,s?wg(i,n,r,s):Tg(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),$i(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Ag(Wn(i),t,e),ji(i,t,e,n,r,s,2)):o===2&&Rg(i,t,e,n,r,s):ji(Wn(i),t,e,n,r,s,1);break}}}function Tg(i){const t=i.prev,e=i,n=i.next;if(oe(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=r<s?r<o?r:o:s<o?s:o,u=a<c?a<l?a:l:c<l?c:l,f=r>s?r>o?r:o:s>o?s:o,d=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&mi(r,a,s,c,o,l,g.x,g.y)&&oe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function wg(i,t,e,n){const r=i.prev,s=i,o=i.next;if(oe(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,h=r.y,u=s.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,p=Co(d,g,t,e,n),M=Co(_,m,t,e,n);let S=i.prevZ,v=i.nextZ;for(;S&&S.z>=p&&v&&v.z<=M;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&mi(a,h,c,u,l,f,S.x,S.y)&&oe(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&mi(a,h,c,u,l,f,v.x,v.y)&&oe(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&mi(a,h,c,u,l,f,S.x,S.y)&&oe(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&mi(a,h,c,u,l,f,v.x,v.y)&&oe(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Ag(i,t,e){let n=i;do{const r=n.prev,s=n.next.next;!Kr(r,s)&&Pl(r,n,n.next,s)&&Ki(r,s)&&Ki(s,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),$i(n),$i(n.next),n=i=s),n=n.next}while(n!==i);return Wn(n)}function Rg(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Og(o,a)){let c=Ll(o,a);o=Wn(o,o.next),c=Wn(c,c.next),ji(o,t,e,n,r,s,0),ji(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Cg(i,t,e,n){const r=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,l=Cl(i,a,c,n,!1),l===l.next&&(l.steiner=!0),r.push(Fg(l));for(r.sort(Pg),s=0;s<r.length;s++)e=Lg(r[s],e);return e}function Pg(i,t){return i.x-t.x}function Lg(i,t){const e=Dg(i,t);if(!e)return t;const n=Ll(e,i);return Wn(n,n.next),Wn(e,e.next)}function Dg(i,t){let e=t,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=s&&f>n&&(n=f,r=e.x<e.next.x?e:e.next,f===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,c=r.x,l=r.y;let h=1/0,u;e=r;do s>=e.x&&e.x>=c&&s!==e.x&&mi(o<l?s:n,o,c,l,o<l?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),Ki(e,i)&&(u<h||u===h&&(e.x>r.x||e.x===r.x&&Ug(r,e)))&&(r=e,h=u)),e=e.next;while(e!==a);return r}function Ug(i,t){return oe(i.prev,i,t.prev)<0&&oe(t.next,i,i.next)<0}function Ig(i,t,e,n){let r=i;do r.z===0&&(r.z=Co(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Ng(r)}function Ng(i){let t,e,n,r,s,o,a,c,l=1;do{for(e=i,i=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,a--):(r=n,n=n.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;e=n}s.nextZ=null,l*=2}while(o>1);return i}function Co(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Fg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function mi(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function Og(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!zg(i,t)&&(Ki(i,t)&&Ki(t,i)&&Bg(i,t)&&(oe(i.prev,i,t.prev)||oe(i,t.prev,t))||Kr(i,t)&&oe(i.prev,i,i.next)>0&&oe(t.prev,t,t.next)>0)}function oe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Kr(i,t){return i.x===t.x&&i.y===t.y}function Pl(i,t,e,n){const r=Lr(oe(i,t,e)),s=Lr(oe(i,t,n)),o=Lr(oe(e,n,i)),a=Lr(oe(e,n,t));return!!(r!==s&&o!==a||r===0&&Pr(i,e,t)||s===0&&Pr(i,n,t)||o===0&&Pr(e,i,n)||a===0&&Pr(e,t,n))}function Pr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Lr(i){return i>0?1:i<0?-1:0}function zg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Pl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ki(i,t){return oe(i.prev,i,i.next)<0?oe(i,t,i.next)>=0&&oe(i,i.prev,t)>=0:oe(i,t,i.prev)<0||oe(i,i.next,t)<0}function Bg(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Ll(i,t){const e=new Po(i.i,i.x,i.y),n=new Po(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function mc(i,t,e,n){const r=new Po(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function $i(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Po(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function kg(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class fn{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return fn.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];gc(t),_c(n,t);let o=t.length;e.forEach(gc);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,_c(n,e[c]);const a=bg.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function gc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function _c(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Qi extends Ee{constructor(t=new Di([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new _e(r,3)),this.setAttribute("uv",new _e(s,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Hg;let S,v=!1,L,A,R,D;p&&(S=p.getSpacedPoints(h),v=!0,f=!1,L=p.computeFrenetFrames(h,!1),A=new C,R=new C,D=new C),f||(m=0,d=0,g=0,_=0);const b=a.extractPoints(l);let E=b.shape;const P=b.holes;if(!fn.isClockWise(E)){E=E.reverse();for(let j=0,nt=P.length;j<nt;j++){const w=P[j];fn.isClockWise(w)&&(P[j]=w.reverse())}}const B=fn.triangulateShape(E,P),V=E;for(let j=0,nt=P.length;j<nt;j++){const w=P[j];E=E.concat(w)}function $(j,nt,w){return nt||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(nt,w)}const G=E.length,et=B.length;function k(j,nt,w){let wt,Q,_t;const ot=j.x-nt.x,Ct=j.y-nt.y,mt=w.x-j.x,T=w.y-j.y,x=ot*ot+Ct*Ct,F=ot*T-Ct*mt;if(Math.abs(F)>Number.EPSILON){const W=Math.sqrt(x),K=Math.sqrt(mt*mt+T*T),X=nt.x-Ct/W,yt=nt.y+ot/W,lt=w.x-T/K,gt=w.y+mt/K,Ht=((lt-X)*T-(gt-yt)*mt)/(ot*T-Ct*mt);wt=X+ot*Ht-j.x,Q=yt+Ct*Ht-j.y;const tt=wt*wt+Q*Q;if(tt<=2)return new J(wt,Q);_t=Math.sqrt(tt/2)}else{let W=!1;ot>Number.EPSILON?mt>Number.EPSILON&&(W=!0):ot<-Number.EPSILON?mt<-Number.EPSILON&&(W=!0):Math.sign(Ct)===Math.sign(T)&&(W=!0),W?(wt=-Ct,Q=ot,_t=Math.sqrt(x)):(wt=ot,Q=Ct,_t=Math.sqrt(x/2))}return new J(wt/_t,Q/_t)}const at=[];for(let j=0,nt=V.length,w=nt-1,wt=j+1;j<nt;j++,w++,wt++)w===nt&&(w=0),wt===nt&&(wt=0),at[j]=k(V[j],V[w],V[wt]);const pt=[];let Mt,Nt=at.concat();for(let j=0,nt=P.length;j<nt;j++){const w=P[j];Mt=[];for(let wt=0,Q=w.length,_t=Q-1,ot=wt+1;wt<Q;wt++,_t++,ot++)_t===Q&&(_t=0),ot===Q&&(ot=0),Mt[wt]=k(w[wt],w[_t],w[ot]);pt.push(Mt),Nt=Nt.concat(Mt)}for(let j=0;j<m;j++){const nt=j/m,w=d*Math.cos(nt*Math.PI/2),wt=g*Math.sin(nt*Math.PI/2)+_;for(let Q=0,_t=V.length;Q<_t;Q++){const ot=$(V[Q],at[Q],wt);st(ot.x,ot.y,-w)}for(let Q=0,_t=P.length;Q<_t;Q++){const ot=P[Q];Mt=pt[Q];for(let Ct=0,mt=ot.length;Ct<mt;Ct++){const T=$(ot[Ct],Mt[Ct],wt);st(T.x,T.y,-w)}}}const jt=g+_;for(let j=0;j<G;j++){const nt=f?$(E[j],Nt[j],jt):E[j];v?(R.copy(L.normals[0]).multiplyScalar(nt.x),A.copy(L.binormals[0]).multiplyScalar(nt.y),D.copy(S[0]).add(R).add(A),st(D.x,D.y,D.z)):st(nt.x,nt.y,0)}for(let j=1;j<=h;j++)for(let nt=0;nt<G;nt++){const w=f?$(E[nt],Nt[nt],jt):E[nt];v?(R.copy(L.normals[j]).multiplyScalar(w.x),A.copy(L.binormals[j]).multiplyScalar(w.y),D.copy(S[j]).add(R).add(A),st(D.x,D.y,D.z)):st(w.x,w.y,u/h*j)}for(let j=m-1;j>=0;j--){const nt=j/m,w=d*Math.cos(nt*Math.PI/2),wt=g*Math.sin(nt*Math.PI/2)+_;for(let Q=0,_t=V.length;Q<_t;Q++){const ot=$(V[Q],at[Q],wt);st(ot.x,ot.y,u+w)}for(let Q=0,_t=P.length;Q<_t;Q++){const ot=P[Q];Mt=pt[Q];for(let Ct=0,mt=ot.length;Ct<mt;Ct++){const T=$(ot[Ct],Mt[Ct],wt);v?st(T.x,T.y+S[h-1].y,S[h-1].x+w):st(T.x,T.y,u+w)}}}q(),it();function q(){const j=r.length/3;if(f){let nt=0,w=G*nt;for(let wt=0;wt<et;wt++){const Q=B[wt];Rt(Q[2]+w,Q[1]+w,Q[0]+w)}nt=h+m*2,w=G*nt;for(let wt=0;wt<et;wt++){const Q=B[wt];Rt(Q[0]+w,Q[1]+w,Q[2]+w)}}else{for(let nt=0;nt<et;nt++){const w=B[nt];Rt(w[2],w[1],w[0])}for(let nt=0;nt<et;nt++){const w=B[nt];Rt(w[0]+G*h,w[1]+G*h,w[2]+G*h)}}n.addGroup(j,r.length/3-j,0)}function it(){const j=r.length/3;let nt=0;St(V,nt),nt+=V.length;for(let w=0,wt=P.length;w<wt;w++){const Q=P[w];St(Q,nt),nt+=Q.length}n.addGroup(j,r.length/3-j,1)}function St(j,nt){let w=j.length;for(;--w>=0;){const wt=w;let Q=w-1;Q<0&&(Q=j.length-1);for(let _t=0,ot=h+m*2;_t<ot;_t++){const Ct=G*_t,mt=G*(_t+1),T=nt+wt+Ct,x=nt+Q+Ct,F=nt+Q+mt,W=nt+wt+mt;Ut(T,x,F,W)}}}function st(j,nt,w){c.push(j),c.push(nt),c.push(w)}function Rt(j,nt,w){Lt(j),Lt(nt),Lt(w);const wt=r.length/3,Q=M.generateTopUV(n,r,wt-3,wt-2,wt-1);Vt(Q[0]),Vt(Q[1]),Vt(Q[2])}function Ut(j,nt,w,wt){Lt(j),Lt(nt),Lt(wt),Lt(nt),Lt(w),Lt(wt);const Q=r.length/3,_t=M.generateSideWallUV(n,r,Q-6,Q-3,Q-2,Q-1);Vt(_t[0]),Vt(_t[1]),Vt(_t[3]),Vt(_t[1]),Vt(_t[2]),Vt(_t[3])}function Lt(j){r.push(c[j*3+0]),r.push(c[j*3+1]),r.push(c[j*3+2])}function Vt(j){s.push(j.x),s.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Gg(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Ao[r.type]().fromJSON(r)),new Qi(n,t.options)}}const Hg={generateTopUV:function(i,t,e,n,r){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[r*3],h=t[r*3+1];return[new J(s,o),new J(a,c),new J(l,h)]},generateSideWallUV:function(i,t,e,n,r,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[r*3],d=t[r*3+1],g=t[r*3+2],_=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new J(o,1-c),new J(l,1-u),new J(f,1-g),new J(_,1-p)]:[new J(a,1-c),new J(h,1-u),new J(d,1-g),new J(m,1-p)]}};function Gg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ko extends Ee{constructor(t=new Di([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(s,3)),this.setAttribute("uv",new _e(o,2));function l(h){const u=r.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;fn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];fn.isClockWise(M)===!0&&(g[m]=M.reverse())}const _=fn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){const M=d[m];r.push(M.x,M.y,0),s.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=_.length;m<p;m++){const M=_[m],S=M[0]+u,v=M[1]+u,L=M[2]+u;n.push(S,v,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Vg(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new Ko(n,t.curveSegments)}}function Vg(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class Wg extends Ci{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ol,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xg extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Is=new Zt,vc=new C,xc=new C;class Yg{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wo,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;vc.setFromMatrixPosition(t.matrixWorld),e.position.copy(vc),xc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xc),e.updateMatrixWorld(),Is.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Is),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Is)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class qg extends Yg{constructor(){super(new Xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zg extends Xg{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new qg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Mc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ge(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}let jg=class extends Yn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);const Sc=Object.assign({"./house.json":()=>Bs(()=>import("./house-pm1y-Ty4.js"),[],import.meta.url).then(i=>i.default),"./house.sample.json":()=>Bs(()=>import("./house.sample-0FZyrEZo.js"),[],import.meta.url).then(i=>i.default)});async function Kg(){const i=Sc["./house.json"]??Sc["./house.sample.json"];if(!i)throw new Error("No house.json or house.sample.json found in src/data");return i()}function Dl(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new Ee;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in s){const u=yc(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);const g=yc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function yc(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),a=new Ne(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const _=h.getComponent(f,g);a.setComponent(f+u,g,_)}}else o.set(h.array,c);c+=h.count*e}return r!==void 0&&(a.gpuType=r),a}const Ul=`
float hash12(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i), hash13(i + vec3(1, 0, 0)), f.x), mix(hash13(i + vec3(0, 1, 0)), hash13(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0, 0, 1)), hash13(i + vec3(1, 0, 1)), f.x), mix(hash13(i + vec3(0, 1, 1)), hash13(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
float vnoise2(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec3 p) { return 0.5 * vnoise(p) + 0.3 * vnoise(p * 2.1 + 7.0) + 0.2 * vnoise(p * 4.3 + 13.0); }
`,$g="vec3(0.353, 0.263, 0.188)",Il={value:new C(0,1,0)},Ec=i=>{const t=parseInt(i.slice(1),16);return new C((t>>16)/255,(t>>8&255)/255,(t&255)/255)},Jg={lit:"#ffffff",shade:"#cccccc",ink:.5};class $o extends Wg{constructor(e=Jg){super({color:16777215});Wt(this,"spec");Wt(this,"fade",null);this.spec=e,this.onBeforeCompile=n=>this.compile(n)}get castsShadow(){return this.spec.castShadow!==!1}copy(e){return super.copy(e),this.spec=e.spec,this.fade=e.fade,this}customProgramCacheKey(){return`wash-${this.spec.detail??"none"}-${this.fade?"fade":""}`}compile(e){const n=this.spec;Object.assign(e.uniforms,{uLit:{value:Ec(n.lit)},uShade:{value:Ec(n.shade)},uInk:{value:n.ink},uParams:{value:new se(n.shadeRange??.8,n.shadowWeight??.3,n.mottle??.05,n.period??1)},uPoche:{value:n.poche??0},uFade:{value:new se(...this.fade??[0,0,1e5,1e5])},uSunDir:Il});const r=`#define DETAIL_${(n.detail??"none").toUpperCase()}
${this.fade?`#define FADE
`:""}`;e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPos;`).replace("#include <project_vertex>",`#include <project_vertex>
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=r+e.fragmentShader.replace("#include <common>",`#include <common>
layout(location = 1) out highp vec4 gNormal;
${Qg}`).replace("#include <opaque_fragment>",t_).replace("#include <tonemapping_fragment>","").replace("#include <colorspace_fragment>","").replace("#include <fog_fragment>","").replace("#include <premultiplied_alpha_fragment>","").replace("#include <dithering_fragment>","")}}const Qg=`
varying vec3 vWPos;
uniform vec3 uLit, uShade, uSunDir;
uniform float uInk, uPoche;
uniform vec4 uParams; // x shade range, y shadow weight, z mottle, w seam period (ft)
uniform vec4 uFade;   // ground fade: centre xz, start, end
${Ul}
const vec3 INK_MUL = vec3(0.55, 0.47, 0.40); // a hairline darkens the wash towards sepia

/** Anti-aliased line through every integer of x, w = width as a fraction of the period. */
float stripe(float x, float w) {
  float fw = fwidth(x);
  float d = abs(fract(x + 0.5) - 0.5);
  return 1.0 - smoothstep(w * 0.5 - fw * 0.75, w * 0.5 + fw * 0.75, d);
}
/** 1 while the period of x is wide enough on screen to draw, fading out before it turns to moire. */
float legible(float x) { return smoothstep(2.4, 5.0, 1.0 / max(fwidth(x), 1e-5)); }

/** Coordinates in the plane of the face (dominant normal axis), feet. */
vec2 planeUV(vec3 p, vec3 n) {
  vec3 a = abs(n);
  return (a.x >= a.y && a.x >= a.z) ? p.zy : (a.z >= a.y ? p.xy : p.xz);
}

`,t_=`
{
  vec3 wn = normalize(inverseTransformDirection(normal, viewMatrix));
  vec3 p = vWPos;
  float ndl = dot(wn, uSunDir);
  // The sun is a PI-intensity light on a white material, so directDiffuse is max(N.L, 0) * shadow.
  float shadow = ndl > 0.04 ? clamp(reflectedLight.directDiffuse.r / ndl, 0.0, 1.0) : 1.0;
  float facing = clamp(ndl, 0.0, 1.0);
  float t3 = facing * 3.0;
  float banded = min((floor(t3) + smoothstep(0.3, 0.7, fract(t3))) / 3.0, 1.0); // three soft bands
  float tone = (1.0 - mix(facing, banded, 0.6)) * uParams.x;
  float spill = (1.0 - smoothstep(0.2, 0.8, shadow)) * uParams.y;
  float dark = 1.0 - (1.0 - tone) * (1.0 - spill);

  vec3 col = mix(uLit, uShade, dark);
  col = 1.0 - (1.0 - col) * (1.0 + (fbm(p * 0.3) - 0.5) * uParams.z * 2.0); // pigment density
  float line = 0.0; // hairline opacity

  #ifdef DETAIL_CLAPBOARD
  if (abs(wn.y) < 0.5) {
    // 4.5" laps as one fine, even hairline; fades out completely well before the laps get close enough to moire
    float c = p.y / 0.375;
    line = stripe(c, 0.05) * smoothstep(5.0, 11.0, 1.0 / max(fwidth(c), 1e-5)) * 0.2;
  }
  #endif

  #ifdef DETAIL_SEAMS
  if (wn.y > 0.78 && wn.y < 0.9995) {
    // Standing seams run down the fall line: t counts seam periods across it. Ridge caps and rake edges are steeper than this.
    vec2 h = normalize(wn.xz);
    float t = dot(p.xz, vec2(-h.y, h.x)) / uParams.w;
    line = stripe(t, 0.03) * smoothstep(7.0, 16.0, 1.0 / max(fwidth(t), 1e-5)) * 0.34;
  }
  #endif

  col = mix(col, col * INK_MUL, line);
  if (uPoche > 0.0 && wn.y > 0.85) { // wall cut by the section plane
    col = mix(col, vec3(0.66, 0.6, 0.53), uPoche);
  }

  float a = diffuseColor.a;
  float cover = a; // what the ink pass sees
  #ifdef FADE
  float away = smoothstep(uFade.z, uFade.w, distance(p.xz, uFade.xy));
  col = mix(col, vec3(1.0), away); // fade in pigment, not alpha: the ground stays opaque
  cover *= 1.0 - away;
  #endif
  gl_FragColor = vec4(col, a);
  gNormal = vec4(normal.xy * 0.5 + 0.5, uInk, cover);
  #ifdef FADE
  gNormal.rgb *= cover; // the ink pass un-premultiplies by alpha, as it must for blended levels; the fade is not blended, so premultiply it here
  #endif
}
`,bc={siding:{lit:"#fcf8ef",shade:"#e4d9c6",ink:1,detail:"clapboard",shadowWeight:.35,poche:.9},roof:{lit:"#d6ccc0",shade:"#b9ada0",ink:.98,shadowWeight:.3,mottle:.06,detail:"seams",period:31.25/12},concrete:{lit:"#e6dfd3",shade:"#c9bfb1",ink:.93,poche:.5},brick:{lit:"#d3bdb1",shade:"#b9a397",ink:.91,shadowWeight:.35,mottle:.05},trim:{lit:"#fefdf8",shade:"#ebe3d4",ink:.56,shadowWeight:.3},railing:{lit:"#fdfaf3",shade:"#e8dfce",ink:.54,shadowWeight:.25},sash:{lit:"#fcf9f2",shade:"#e6dccb",ink:.52},door:{lit:"#7d6352",shade:"#64503f",ink:.6},glass:{lit:"#9a928a",shade:"#8a8178",ink:.42,shadeRange:.25,shadowWeight:0,mottle:0,castShadow:!1},interior:{lit:"#f9f3e7",shade:"#e6dcc9",ink:.46,shadowWeight:.2,poche:.9},floor:{lit:"#e8dcc6",shade:"#d4c6ac",ink:.47,shadowWeight:.2,mottle:.05},wood:{lit:"#dccfba",shade:"#c4b59f",ink:.48},cabinet:{lit:"#e8e0d2",shade:"#d0c5b2",ink:.44},soapstone:{lit:"#a29a92",shade:"#8c837b",ink:.43,shadeRange:.4},porcelain:{lit:"#fdfaf4",shade:"#ebe3d4",ink:.41},appliance:{lit:"#e9e4da",shade:"#d3cabb",ink:.4},ground:{lit:"#f3efe3",shade:"#e0d8c6",ink:.3,shadeRange:0,shadowWeight:.7,mottle:.08}};function e_(){const i={};for(const t of Object.keys(bc)){const e=new $o(bc[t]);e.name=t,t==="roof"&&(e.side=Ye),i[t]=e}return i}const he=e_(),me=1/12;function Tc(i,t=0){return new C(i[0]*me,t*me,i[1]*me)}const n_=new Pi(1,1,1);function $r(i,t){let e=!1;for(let n=0,r=t.length-1;n<t.length;r=n++){const[s,o]=t[n],[a,c]=t[r];o>i[1]!=c>i[1]&&i[0]<(a-s)*(i[1]-o)/(c-o)+s&&(e=!e)}return e}function i_(i,t=[]){const e=new Di(i.map(([n,r])=>new J(n,-r)));for(const n of t)e.holes.push(new Ro(n.map(([r,s])=>new J(r,-s))));return e}function Xn(i,t,e,n){const r=new Qi(i_(i,t),{depth:n-e,bevelEnabled:!1,curveSegments:1});return r.applyMatrix4(new Zt().makeBasis(new C(1,0,0),new C(0,0,-1),new C(0,1,0))),r.translate(0,e,0),r}function tr(i,t,e){const n=new Di(i.map(([s,o])=>new J(-s,o))),r=new Qi(n,{depth:e-t,bevelEnabled:!1,curveSegments:1});return r.applyMatrix4(new Zt().makeBasis(new C(0,0,-1),new C(0,1,0),new C(1,0,0))),r.translate(t,0,0),r}function wc(i,t,e){const n=new Qi(new Di(i.map(([r,s])=>new J(r,s))),{depth:e-t,bevelEnabled:!1,curveSegments:1});return n.translate(0,0,t),n}function r_(i){const t=i.index?i.toNonIndexed():i,e=t.getAttribute("normal"),n=[];for(let s=0;s<e.count/3;s++)e.getY(3*s)<-.9&&e.getY(3*s+1)<-.9&&e.getY(3*s+2)<-.9||n.push(s);const r=new Ee;for(const s of["position","normal","uv"]){const o=t.getAttribute(s);if(!o)continue;const a=new Float32Array(n.length*3*o.itemSize);n.forEach((c,l)=>{for(let h=0;h<3;h++)for(let u=0;u<o.itemSize;u++)a[(l*3+h)*o.itemSize+u]=o.array[(3*c+h)*o.itemSize+u]}),r.setAttribute(s,new Ne(a,o.itemSize))}return t!==i&&t.dispose(),r}function Lo(i){const t=(r,s)=>{const o=new Ee;for(const a of["position","normal","uv"]){const c=i.getAttribute(a),l=c.itemSize;o.setAttribute(a,new Ne(c.array.slice(r*l,(r+s)*l),l))}return o},[e,n]=i.groups;return{caps:t(e.start,e.count),sides:t(n.start,n.count)}}const s_=new Zt,Ac=new pn,o_=new Ze;class le{constructor(){Wt(this,"buckets",new Map)}add(t,e,n){let r=t.index?t.toNonIndexed():t.clone();n&&r.applyMatrix4(n);for(const o of Object.keys(r.attributes))["position","normal","uv"].includes(o)||r.deleteAttribute(o);r.clearGroups();const s=this.buckets.get(e)??[];return s.push(r),this.buckets.set(e,s),this}box(t,e,n,r=[0,0,0]){return Ac.setFromEuler(o_.set(r[0],r[1],r[2])),this.add(n_,t,s_.compose(new C(...n),Ac,new C(...e)))}addBatch(t,e){for(const[n,r]of t.buckets)for(const s of r)this.add(s,n,e);return this}toGroup(t){const e=new wn;e.name=t;for(const[n,r]of this.buckets){const s=Dl(r,!1);if(!s)continue;s.scale(me,me,me);const o=new we(s,n);o.castShadow=!(n instanceof $o)||n.castsShadow,o.receiveShadow=!0,e.add(o)}return e}}function Rc(i,t,e,n,r,s,o,a){const c=s[0]-r[0],l=s[1]-r[1],h=Math.hypot(c,l);let u=-l/h,f=c/h;f<0&&(u=-u,f=-f);const d=Math.atan2(-l,c);i.box(t,[n,o,h],[e,(r[1]+s[1])/2+f*a,(r[0]+s[0])/2+u*a],[d,0,0])}function a_(i){let t=0,e=0,n=0;const r=i.length/3;for(let o=0;o<i.length;o+=3)t+=i[o],e+=i[o+1],n+=i[o+2];t/=r,e/=r,n/=r;let s=0;for(let o=0;o<i.length;o+=9){const a=i[o+3]-i[o],c=i[o+4]-i[o+1],l=i[o+5]-i[o+2],h=i[o+6]-i[o],u=i[o+7]-i[o+1],f=i[o+8]-i[o+2],d=c*f-l*u,g=l*h-a*f,_=a*u-c*h;s+=d*((i[o]+i[o+3]+i[o+6])/3-t)+g*((i[o+1]+i[o+4]+i[o+7])/3-e)+_*((i[o+2]+i[o+5]+i[o+8])/3-n)}if(!(s>=0))for(let o=0;o<i.length;o+=9)for(let a=0;a<3;a++){const c=i[o+3+a];i[o+3+a]=i[o+6+a],i[o+6+a]=c}}function Nl(i,t=!0){const e=[...i];t&&a_(e);const n=new Ee;return n.setAttribute("position",new _e(e,3)),n.computeVertexNormals(),n.setAttribute("uv",new _e(new Array(e.length/3*2).fill(0),2)),n}function Jr(i,t,e=!1){const r=t.reduce((u,[f,d],g)=>u+f*t[(g+1)%t.length][1]-t[(g+1)%t.length][0]*d,0)<0?[...t].reverse():t,s=i.length,o=[];for(let u=0;u<(e?s:s-1);u++){const[f,d]=i[u],[g,_]=i[(u+1)%s],m=Math.hypot(g-f,_-d);o.push([-(_-d)/m,(g-f)/m])}const a=i.map((u,f)=>{const d=e?o[(f-1+o.length)%o.length]:o[Math.max(f-1,0)],g=e?o[f%o.length]:o[Math.min(f,o.length-1)],_=d[0]+g[0],m=d[1]+g[1],p=Math.hypot(_,m),M=_/p*g[0]+m/p*g[1];return[_/p/M,m/p/M]}),c=(u,[f,d])=>[i[u][0]+a[u][0]*f,d,i[u][1]+a[u][1]*f],l=[],h=e?s:s-1;for(let u=0;u<h;u++){const f=(u+1)%s;for(let d=0;d<r.length;d++){const g=(d+1)%r.length,_=c(u,r[d]),m=c(f,r[d]),p=c(f,r[g]),M=c(u,r[g]);l.push(..._,...m,...p,..._,...p,...M)}}if(!e){const u=fn.triangulateShape(r.map(([f,d])=>new J(f,d)),[]);for(const[f,d]of[[0,-1],[s-1,1]]){const g=f===0?0:o.length-1,_=[o[g][1],-o[g][0]];for(const[m,p,M]of u){const S=c(f,r[m]),v=c(f,r[p]),L=c(f,r[M]),A=v[0]-S[0],R=v[1]-S[1],D=v[2]-S[2],b=L[0]-S[0],E=L[1]-S[1],P=L[2]-S[2],Y=(R*P-D*E)*_[0]+(A*E-R*b)*_[1];l.push(...S,...Y*d>=0?[...v,...L]:[...L,...v])}}}return Nl(l,!1)}function c_(i){const t=i.map(n=>n[0]),e=i.map(n=>n[1]);return{x0:Math.min(...t),x1:Math.max(...t),z0:Math.min(...e),z1:Math.max(...e)}}function Cc(i,t,e,n,r){const s=Math.max(t,i.baseY),o=Math.min(e,i.topY);if(o-s<.01)return null;const a=new le,c=Xn(i.outline,void 0,s,o);if(a.add(c,r.brick),c.dispose(),n&&o>=i.topY-.01){const l=c_(i.outline),h=(l.x0+l.x1)/2,u=(l.z0+l.z1)/2,f=l.x1-l.x0,d=l.z1-l.z0;a.box(r.brick,[f+3,4,d+3],[h,o+2,u]),a.box(r.concrete,[f+6,3,d+6],[h,o+5.5,u]),a.box(r.brick,[f*.45,12,d*.45],[h,o+13,u])}return a.toGroup("chimney")}function Jo(i,t){const e=[Math.sin(i.angle),Math.cos(i.angle)];let n=i.angle;if(i.exterior){const r=[i.center[0]+e[0]*(i.depth/2+3),i.center[1]+e[1]*(i.depth/2+3)];t.floor.some(s=>$r(r,s))&&(n+=Math.PI)}return new Zt().compose(new C(i.center[0],t.floorY,i.center[1]),new pn().setFromAxisAngle(new C(0,1,0),n),new C(1,1,1))}function Br(i,t,e){const n=e.stile??2,r=e.rail??2,s=1.5,o=e.w-2*n,a=e.h-2*r,c=e.y0+e.h/2;for(const l of[-1,1])i.box(t.sash,[n,e.h,s],[e.cx+l*(e.w/2-n/2),c,e.z]);i.box(t.sash,[o,r,s],[e.cx,e.y0+r/2,e.z]),i.box(t.sash,[o,r,s],[e.cx,e.y0+e.h-r/2,e.z]),i.box(t.glass,[o,a,.3],[e.cx,c,e.z]);for(let l=1;l<e.lites[0];l++)i.box(t.sash,[.8,a,.9],[e.cx-o/2+o*l/e.lites[0],c,e.z]);for(let l=1;l<e.lites[1];l++)i.box(t.sash,[o,.8,.9],[e.cx,e.y0+r+a*l/e.lites[1],e.z])}function Je(i,t,e,n,r,s,o,a,c){const l=e.outer,h=e.proud,u=o+a*h/2,f=e.side,d=n/2+l-f/2;for(const _ of[-1,1])i.box(t.trim,[f,s+e.headAboveOpening,h],[_*d,r+(s+e.headAboveOpening)/2,u]);const g=r+s+e.headAboveOpening;i.box(t.trim,[n+2*l,e.headHeight,h],[0,g-e.headHeight/2,u]),c&&(i.box(t.trim,[n+2*l+1.6,.8,e.dripProud],[0,g+.4,o+a*e.dripProud/2]),i.box(t.trim,[n+2*e.sillWider,e.sillHeight,e.sillProud],[0,r-e.sillHeight/2,o+a*e.sillProud/2]))}function l_(i,t,e){const n=new le,{width:r,depth:s,sill:o}=i,a=i.head-i.sill,c=s/2;if(i.kind==="window"){for(const f of[-1,1])n.box(t.trim,[1.5,a,3.5],[f*(r/2-.75),o+a/2,0]);n.box(t.trim,[r-3,1.5,3.5],[0,o+a-.75,0]),n.box(t.trim,[r-3,1.5,3.5],[0,o+.75,0]);const l=r-3,h=a-3,u=i.lites??[2,2];if(i.style==="double-hung"||i.style===void 0){const f=h/2+.5;Br(n,t,{cx:0,y0:o+1.5,w:l,h:f,z:.8,lites:u}),Br(n,t,{cx:0,y0:o+1.5+h-f,w:l,h:f,z:-.8,lites:u})}else Br(n,t,{cx:0,y0:o+1.5,w:l,h,z:0,lites:u});i.sym!=="D"&&Je(n,t,e,r,o,a,c,1,i.exterior),i.exterior||Je(n,t,e,r,o,a,-c,-1,!1)}else Je(n,t,e,r,o,a,c,1,!1),Je(n,t,e,r,o,a,-c,-1,!1);return n}const Pc=new Map;function h_(i,t,e){const n=new le;for(const r of i.openings){if(r.kind==="door")continue;const s=JSON.stringify([r.kind,r.sym,r.width,r.depth,r.sill,r.head,r.lites,r.style,r.exterior]);let o=Pc.get(s);o||(o=l_(r,t,e),Pc.set(s,o)),n.addBatch(o,Jo(r,i))}return n.toGroup(`windows-${i.id}`)}function Lc(i,t,e,n,r){const o=n-2.75;i.box(t,[e,o,r],[0,.75+o/2,0]);const a=4.5,c=5,l=(e-3*a)/2,h=(o-4*c)/3;for(let u=0;u<2;u++)for(let f=0;f<3;f++){const d=-e/2+a+l/2+u*(l+a),g=.75+c+h/2+f*(h+c);for(const _ of[-1,1])i.box(t,[l,h,.5],[d,g,_*(r/2+.2)])}}function u_(i,t,e,n){const[r,s]=e.pilasterX,[o,a]=e.pilasterY,c=s-r,l=n;for(const p of[-1,1]){const M=p*(r+s)/2;i.box(t.trim,[c,a-o,e.proud],[M,(o+a)/2,l+e.proud/2]),i.box(t.trim,[c+1.6,e.baseY[1]-e.baseY[0],e.proud+.8],[M,(e.baseY[0]+e.baseY[1])/2,l+(e.proud+.8)/2]),i.box(t.trim,[c+1.6,e.capitalTopY-a,e.proud+.8],[M,(a+e.capitalTopY)/2,l+(e.proud+.8)/2])}const[h,u]=e.headY,[f,d]=e.corniceY,[g,_]=e.corniceHalfWidth,m=(f+d)/2;i.box(t.trim,[2*s+1.6,u-h,e.proud],[0,(h+u)/2,l+e.proud/2]),i.box(t.trim,[2*g,m-f,e.proud+2.2],[0,(f+m)/2,l+(e.proud+2.2)/2]),i.box(t.trim,[2*_,d-m,e.proud+3.4],[0,(m+d)/2,l+(e.proud+3.4)/2])}function f_(i,t,e,n){const r=new le,{width:s,depth:o,head:a}=i,c=o/2,l=i.sym==="E";for(const h of[-1,1])r.box(t.trim,[2,a,3.5],[h*(s/2-1),a/2,0]);return r.box(t.trim,[s-4,2,3.5],[0,a-1,0]),r.box(t.trim,[s,1,6],[0,.5,0]),l?(Lc(r,t.door,s-4,a,1.75),Je(r,t,e,s,0,a,c,1,!1),u_(r,t,n,c),Je(r,t,e,s,0,a,-c,-1,!1)):i.exterior?(Br(r,t,{cx:0,y0:1,w:s-4,h:a-3,z:0,lites:i.lites??[2,4],stile:4,rail:4}),Je(r,t,e,s,0,a,c,1,!0),Je(r,t,e,s,0,a,-c,-1,!1)):(Lc(r,t.trim,s-4,a,1.75),Je(r,t,e,s,0,a,c,1,!1),Je(r,t,e,s,0,a,-c,-1,!1)),r}const Dc=new Map;function d_(i,t,e){const n=new le;for(const r of i.openings){if(r.kind!=="door")continue;const s=JSON.stringify([r.sym,r.width,r.depth,r.head,r.lites,r.exterior]);let o=Dc.get(s);o||(o=f_(r,t,e.casing,e.doorSurround),Dc.set(s,o)),n.addBatch(o,Jo(r,i))}return n.toGroup(`doors-${i.id}`)}const p_=1.5;function m_(i,t){switch(i){case"cabinet-base":case"cabinet-upper":case"island":case"vanity":return t.cabinet;case"counter":return t.soapstone;case"fireplace":case"hearth":return t.brick;case"tub":case"shower":case"toilet":return t.porcelain;case"appliance":return t.appliance;case"shelving":return t.wood}}function g_(i,t){const e=new le;for(const n of i.fixtures){const r=i.floorY+n.baseY,s=n.kind==="cabinet-base"||n.kind==="island"||n.kind==="vanity",o=s?n.height-p_:n.height,a=Xn(n.outline,void 0,r,r+o);if(e.add(a,m_(n.kind,t)),a.dispose(),s){const c=Xn(n.outline,void 0,r+o,r+n.height);e.add(c,t.soapstone),c.dispose()}}return e.toGroup(`fixtures-${i.id}`)}function Do(i,t,e){return t?i.id==="basement"?e.concrete:e.siding:e.interior}function __(i,t){const e=[Math.cos(t.angle),-Math.sin(t.angle)],n=t.width/2+1;for(const r of[1,-1]){const s=[t.center[0]+e[0]*n*r,t.center[1]+e[1]*n*r],o=i.walls.find(a=>$r(s,a.outline));if(o)return o.height??i.ceilingHeight}return i.ceilingHeight}function v_(i){const t=i.slice(),e=(n,r)=>Math.hypot(r[0]-n[0],r[1]-n[1]);for(let n=0;n<t.length&&t.length>4;n++){const r=t.length,s=l=>t[(n+l)%r],o=[s(1)[0]-s(0)[0],s(1)[1]-s(0)[1]],a=[s(3)[0]-s(2)[0],s(3)[1]-s(2)[1]],c=Math.abs(o[0]*a[0]+o[1]*a[1]+e(s(0),s(1))*e(s(2),s(3)))<1e-6;if(e(s(0),s(1))<.5&&e(s(2),s(3))<.5&&c&&e(s(1),s(2))<12){const l=new Set([(n+1)%r,(n+2)%r]),h=t.filter((u,f)=>!l.has(f));t.splice(0,t.length,...h),n=-1}}return t}const Uc=i=>i.id==="basement"?0:i.floorThickness;function x_(i,t,e){const n=new le;for(const r of i.walls){let s=i.floorY+(r.height??i.ceilingHeight);if(e&&!r.exterior){const l=r.outline.map(h=>h[1]);s=Math.min(s,e(Math.min(...l),Math.max(...l)))}const o=r.exterior?Uc(i):0,a=Xn(r.exterior?v_(r.outline):r.outline,r.holes,i.floorY-o,s),c=o?r_(a):a;n.add(c,Do(i,r.exterior,t)),c.dispose(),c!==a&&a.dispose()}for(const r of i.openings){const s=Do(i,r.exterior,t),o=Jo(r,i);let a=__(i,r);if(e&&!r.exterior){const l=(Math.abs(Math.sin(r.angle))*r.width+Math.abs(Math.cos(r.angle))*r.depth)/2;a=Math.min(a,e(r.center[1]-l,r.center[1]+l)-i.floorY)}const c=(l,h)=>{if(h-l<.01)return;const u=new le().box(s,[r.width,h-l,r.depth],[0,(l+h)/2,0]);n.addBatch(u,o)};c(r.exterior?-Uc(i):0,r.sill),c(r.head,a)}return n.toGroup(`walls-${i.id}`)}const M_=.5;function S_(i,t){const e=i.length,r=i.reduce((o,a,c)=>o+(a[0]*i[(c+1)%e][1]-i[(c+1)%e][0]*a[1]),0)>0?1:-1,s=(o,a)=>{const c=Math.hypot(a[0]-o[0],a[1]-o[1])||1;return[-(a[1]-o[1])/c*r,(a[0]-o[0])/c*r]};return i.map((o,a)=>{const c=s(i[(a+e-1)%e],o),l=s(o,i[(a+1)%e]),h=1+c[0]*l[0]+c[1]*l[1];return h<1e-6?o:[o[0]+(c[0]+l[0])*t/h,o[1]+(c[1]+l[1])*t/h]})}function y_(i,t,e=[]){const n=new le,r=i.id==="basement"?t.concrete:t.floor,s=i.floorY-i.floorThickness;for(const o of i.floor){const a=S_(o,M_),c=e.filter(u=>u.every(f=>$r(f,a))),l=Xn(a,c,s,i.floorY),h=c.length?Xn(a,void 0,s,i.floorY):l;n.add(Lo(l).caps,r).add(Lo(h).sides,Do(i,!0,t));for(const u of c)u.forEach((f,d)=>{const g=u[(d+1)%u.length],_=Math.hypot(g[0]-f[0],g[1]-f[1]);n.box(r,[_,i.floorThickness,.3],[(f[0]+g[0])/2,s+i.floorThickness/2,(f[1]+g[1])/2],[0,Math.atan2(-(g[1]-f[1]),g[0]-f[0]),0])});l.dispose(),h!==l&&h.dispose()}return n.toGroup(`floor-${i.id}`)}function Qo(i,t){const e=n=>{if(n>=i[0][0])return i[0][1];for(let r=0;r<i.length-1;r++){const[s,o]=i[r],[a,c]=i[r+1];if(n<=s&&n>=a)return o+(c-o)*(n-s)/(a-s)}return i[i.length-1][1]};return{path:i,thickness:t,top:e,under:n=>e(n)-t,breaks:i.slice(1,-1).map(n=>n[0])}}function ta(i){const t=(i.zFront+i.zRear)/2,e=(i.ridgeY-i.eaveY)/((i.zFront-i.zRear)/2),n=i.zFront+i.overhangEave,r=i.zRear-i.overhangEave;return Qo([[n,i.ridgeY-e*(n-t)],[t,i.ridgeY],[r,i.ridgeY-e*(t-r)]],i.thickness)}function E_(i,t){const e=i.path.filter(n=>n[0]>t);return Qo([...e,[t,i.top(t)]],i.thickness)}function Fl(i){const t=i.rearDormer;return t?Qo([[t.zJoin,t.joinY],[t.tipZ,t.tipY]],i.thickness):null}const ve=6,b_=8.8;function T_(i,t,e,n){const r=i.breaks.filter(o=>o<e&&o>n).sort((o,a)=>a-o),s=[e,...r,n].map(o=>[o,i.under(o)]);return[[e,t],[n,t],...s.reverse()]}function Gi(i,t,e,n,r,s,o=["full","full"],a=0){const{path:c,thickness:l}=e,h=g=>[...g,...[...g].reverse().map(([_,m])=>[_,m-l])],u=tr(h(c),n,r),[f,d]=o;if(f==="full"&&d==="full")i.add(u,t.roof);else{i.add(Lo(u).sides,t.roof);for(const[g,_]of[[f,n],[d,r]]){if(g==="none")continue;let m=c;g==="rear"&&(m=[[a,e.top(a)],...c.filter(([M])=>M<a)]),g==="full"&&(m=c);const p=new Ko(new Di(h(m).map(([M,S])=>new J(-M,S))));p.applyMatrix4(new Zt().makeBasis(new C(0,0,-1),new C(0,1,0),new C(1,0,0))),p.translate(_,0,0),i.add(p,t.roof),p.dispose()}u.dispose()}for(let g=0;g<c.length-1;g++){const _=Math.abs(c[g+1][0]-c[g][0])/Math.hypot(c[g+1][0]-c[g][0],c[g+1][1]-c[g][1]),m=b_*_,p=-(l*_+m/2);s[0]&&Rc(i,t.trim,n-.75,1.5,c[g],c[g+1],m,p),s[1]&&Rc(i,t.trim,r+.75,1.5,c[g],c[g+1],m,p)}}function Ic(i,t,e,n,r,s,o,a,c){const l=r===1?e.path[0]:e.path[e.path.length-1],h=n-r*ve,u=Math.max(e.under(l[0]),s+.5);i.add(tr([[h,s],[l[0],s],[l[0],u],[h,e.under(h)]],a,c),t.trim),i.box(t.trim,[c-a,l[1]-o,1.5],[(a+c)/2,(l[1]+o)/2,l[0]+r*.75])}function w_(i,t,e,n){const r=t.roof.main,s=r.rearDormer,o=Fl(r);if(!s||!o)return;Gi(i,e,o,s.roofXMin,s.roofXMax,[!0,!0]);const a=t.trim.dormerCornice.bands[t.trim.dormerCornice.bands.length-1][0];i.box(e.trim,[s.roofXMax-s.roofXMin,s.tipY-a,1.5],[(s.roofXMin+s.roofXMax)/2,(s.tipY+a)/2,s.tipZ-.75]);let c=s.zJoin,l=r.zRear;for(let d=0;d<40;d++){const g=(c+l)/2;o.under(g)>n.top(g)?l=g:c=g}const h=l,u=r.zRear,f=[[h,n.top(h)],[u,n.top(u)],[u,o.under(u)],[h,o.under(h)]];for(const[d,g]of[[s.xMin,s.xMin+ve],[s.xMax-ve,s.xMax]])i.add(tr(f,d,g),e.siding)}function A_(i,t){var u;const e=i.roof.main,n=e.rearDormer,r=ta(e),s=new le,o=e.xMin-e.overhangRake,a=e.xMax+e.overhangRake,c=(o+a)/2,l=((u=i.roof.frieze)==null?void 0:u.topY)??e.eaveY-e.thickness;n?(Gi(s,t,r,o,n.xMin,[!0,!1],["full","rear"],e.zRear+ve/2),Gi(s,t,r,n.xMax,a,[!1,!0],["rear","full"],e.zRear+ve/2),Gi(s,t,E_(r,e.zRear+ve/2),n.xMin,n.xMax,[!1,!1],["none","none"])):Gi(s,t,r,o,a,[!0,!0]),s.box(t.roof,[a-o,3,3],[c,e.ridgeY-2.1,(e.zFront+e.zRear)/2],[Math.PI/4,0,0]);const h=i.trim.entablature.cornice.y1;Ic(s,t,r,e.zFront,1,l,h,o,a);for(const[f,d]of n?[[o,n.xMin],[n.xMax,a]]:[[o,a]])Ic(s,t,r,e.zRear,-1,l,h,f,d);return w_(s,i,t,r),s.toGroup("roof-main")}function R_(i,t){const e=i.levels.find(n=>n.id==="second");return e?e.openings.filter(n=>n.exterior&&t(n)).map(n=>({op:n,sill:e.floorY+n.sill,head:e.floorY+n.head})):[]}function C_(i,t){var o;const e=i.roof.main,n=ta(e),r=((o=i.roof.frieze)==null?void 0:o.topY)??e.eaveY-e.thickness,s=new le;for(const[a,c]of[[e.xMin,e.xMin+ve],[e.xMax-ve,e.xMax]]){const l=R_(i,f=>Math.abs(Math.sin(f.angle))>.5&&f.center[0]>a-4&&f.center[0]<c+4).sort((f,d)=>d.op.center[1]-f.op.center[1]);let h=e.zFront;const u=(f,d,g)=>{d-g>.01&&s.add(tr(T_(n,f,d,g),a,c),t.siding)};for(const{op:f,head:d}of l){const g=f.center[1]+f.width/2,_=f.center[1]-f.width/2;u(r,h,g),u(d,g,_),h=_}u(r,h,e.zRear)}return s.toGroup("gable-infill")}function P_(i,t){const e=[],n=i.length,r=i.map(([s,o,a])=>[s,o-t,a]);for(let s=1;s<n-1;s++)e.push(...i[0],...i[s],...i[s+1],...r[0],...r[s+1],...r[s]);for(let s=0;s<n;s++){const o=(s+1)%n;e.push(...i[s],...r[s],...r[o],...i[s],...r[o],...i[o])}return Nl(e)}function L_(i,t){const e=i.roof.wing;if(!e)return null;const n=e.hip,r=e.thickness,s=e.zNear,o=new le,a=[n.apex[0],n.apexY,n.apex[1]],c=(A,R)=>[A,n.eaveY,R],l=[[c(n.x0,n.zFar),c(n.x1,n.zFar),a],[c(n.x1,n.zFar),c(n.x1,s),a],[c(n.x0,s),c(n.x0,n.zFar),a]];for(const A of l){const R=P_(A,r);o.add(R,t.roof),R.dispose()}const h=s-n.zFar,u=n.apexY-n.eaveY,f=i.trim.wingCornice.bands,d=n.fascia,g=f[f.length-1][1],_=n.eaveY-g,m=(n.eaveY+g)/2;o.box(t.trim,[n.x1-n.x0+2*d,_,d],[(n.x0+n.x1)/2,m,n.zFar-d/2]);for(const A of[n.x0-d/2,n.x1+d/2])o.box(t.trim,[d,_,s-n.zFar],[A,m,(s+n.zFar)/2]);const p=u/h,M=u/(n.x1-a[0]),S=A=>n.eaveY+p*(A-n.zFar)-r;o.add(tr([[e.zFar,e.wallTopY],[e.zFar+ve,e.wallTopY],[e.zFar+ve,S(e.zFar+ve)],[e.zFar,S(e.zFar)]],e.xMin,e.xMax),t.siding);const v=A=>n.eaveY+M*(A-n.x0)-r,L=A=>n.eaveY+M*(n.x1-A)-r;return o.add(wc([[e.xMin,e.wallTopY],[e.xMin+ve,e.wallTopY],[e.xMin+ve,v(e.xMin+ve)],[e.xMin,v(e.xMin)]],e.zFar,s),t.siding),o.add(wc([[e.xMax-ve,e.wallTopY],[e.xMax,e.wallTopY],[e.xMax,L(e.xMax)],[e.xMax-ve,L(e.xMax-ve)]],e.zFar,s),t.siding),o.toGroup("roof-wing")}function Nc(i,t,e,n,r,s){const o=e.rail,a=Math.hypot(r[0]-n[0],r[1]-n[1]),c=Math.atan2(-(r[1]-n[1]),r[0]-n[0]),l=[(n[0]+r[0])/2,(n[1]+r[1])/2];i.box(t.railing,[a,2.4,3.5],[l[0],s+o.topY-1.2,l[1]],[0,c,0]),i.box(t.railing,[a,2,2],[l[0],s+o.balusterY0-1,l[1]],[0,c,0]);const h=Math.max(2,Math.floor(a/4.5));for(let u=1;u<h;u++){const f=n[0]+(r[0]-n[0])*u/h,d=n[1]+(r[1]-n[1])*u/h;i.box(t.railing,[1.25,o.balusterY1-o.balusterY0,1.25],[f,s+(o.balusterY0+o.balusterY1)/2,d])}}function Fc(i,t,e,n,r,s){const o=Math.hypot(n[0]-e[0],n[1]-e[1]),a=Math.atan2(-(n[1]-e[1]),n[0]-e[0]),c=[(e[0]+n[0])/2,(e[1]+n[1])/2],l=s-r,h=(r+s)/2;i.box(t.railing,[o,1.5,1.5],[c[0],r+.75,c[1]],[0,a,0]),i.box(t.railing,[o,1.5,1.5],[c[0],s-.75,c[1]],[0,a,0]);for(let u=3;u<o;u+=4){const f=e[0]+(n[0]-e[0])*(u/o),d=e[1]+(n[1]-e[1])*(u/o);i.box(t.railing,[.6,l,.6],[f,h,d])}for(let u=3;u<l;u+=4)i.box(t.railing,[o,.6,.5],[c[0],r+u,c[1]],[0,a,0])}function D_(i,t){const e=i.site.porch;if(!e)return null;const n=new le,r=e.deck,s=e.stair,o=e.post;n.box(t.wood,[r.x1-r.x0,r.topY-r.bottomY,r.z1-r.z0],[(r.x0+r.x1)/2,(r.topY+r.bottomY)/2,(r.z0+r.z1)/2]);const a=s.x1-s.x0,c=a/s.risers,l=(r.topY-s.bottomY)/s.risers;for(let p=1;p<s.risers;p++){const M=p*c;n.box(t.wood,[M,r.topY-l*p-s.bottomY,s.z1-s.z0],[s.x1-M/2,s.bottomY+(r.topY-l*p-s.bottomY)/2,(s.z0+s.z1)/2])}const h=Math.atan2(l,c),u=e.rail,f=s.z0+1.75,d=Math.hypot(a-c,l*(s.risers-1)),g=s.x1-(a-c)/2,_=r.topY-l*(s.risers-1)/2;n.box(t.railing,[d,2.4,3.5],[g,_+u.topY-1.2,f],[0,0,h]),n.box(t.railing,[d,2,2],[g,_+u.balusterY0-1,f],[0,0,h]);for(let p=0;p<s.risers-1;p++){const M=s.x1-c*(p+.5),S=r.topY-l*(p+1);n.box(t.railing,[1.25,u.balusterY1-u.balusterY0,1.25],[M,S+(u.balusterY0+u.balusterY1)/2,f])}Nc(n,t,e,[r.x0,r.z0+1.75],[r.x1,r.z0+1.75],r.topY),Nc(n,t,e,[r.x0+1.75,r.z0],[r.x0+1.75,s.z0],r.topY),Fc(n,t,[r.x0,r.z0+.75],[r.x1,r.z0+.75],e.lattice.y0,e.lattice.y1),Fc(n,t,[r.x0+.75,r.z0],[r.x0+.75,s.z0],e.lattice.y0,e.lattice.y1);const m=o.shaftY1-o.shaftY0;return n.box(t.railing,[o.width+2,o.shaftY0-r.topY,o.width+2],[o.x,(r.topY+o.shaftY0)/2,o.z]),n.box(t.railing,[o.width,m,o.width],[o.x,(o.shaftY0+o.shaftY1)/2,o.z]),n.box(t.railing,[o.width+1.5,1.8,o.width+1.5],[o.x,o.shaftY1+.9,o.z]),n.box(t.railing,[o.capWidth,o.capY1-o.shaftY1-1.8,o.capWidth],[o.x,(o.shaftY1+1.8+o.capY1)/2,o.z]),n.toGroup("porch")}function U_(i,t,e){const n=t.site.fence;if(!n)return;const r=n.postWidth;for(const[a,c]of n.posts)i.box(e.railing,[r,n.capY0-n.shaftY0,r],[a,(n.shaftY0+n.capY0)/2,c]),i.box(e.railing,[r+1.5,n.capY1-n.capY0,r+1.5],[a,(n.capY0+n.capY1)/2,c]);const s=t.roof.main.zRear,o=[[n.posts[0][0],s],...n.posts];for(let a=0;a<o.length-1;a++){const[c,l]=[o[a],o[a+1]],h=Math.hypot(l[0]-c[0],l[1]-c[1])-r,u=Math.atan2(-(l[1]-c[1]),l[0]-c[0]),f=[(c[0]+l[0])/2,(c[1]+l[1])/2];for(const[p,M]of n.rails)i.box(e.railing,[h,M-p,2],[f[0],(p+M)/2,f[1]],[0,u,0]);const d=n.rails[1][0],g=n.rails[2][1],_=d-g,m=Math.atan2(_,h-2*r);for(const p of[-1,1])i.box(e.railing,[Math.hypot(h-2*r,_),3,1.5],[f[0],(d+g)/2,f[1]],[0,u,p*m]);i.box(e.concrete,[h+r,n.curbY[1]-n.curbY[0],6],[f[0],(n.curbY[0]+n.curbY[1])/2,f[1]],[0,u,0])}}function Oc(i){const t=i.map(n=>n[0]),e=i.map(n=>n[1]);return{x0:Math.min(...t),x1:Math.max(...t),z0:Math.min(...e),z1:Math.max(...e)}}function I_(i,t){const e=new le;for(const r of i.site.retainingWalls){const s=Xn(r.outline,void 0,r.baseY,r.topY);e.add(s,t.brick),s.dispose();const o=Oc(r.outline);e.box(t.concrete,[o.x1-o.x0+2,2,o.z1-o.z0+2],[(o.x0+o.x1)/2,r.topY+1,(o.z0+o.z1)/2])}const n=i.site.frontSteps;if(n){const r=Oc(n.outline),s=(r.z1-r.z0)/n.risers,o=(n.topY-n.bottomY)/n.risers;for(let a=1;a<=n.risers;a++){const c=(n.risers-a+1)*s;e.box(t.concrete,[r.x1-r.x0,a*o,c],[(r.x0+r.x1)/2,n.bottomY+a*o/2,r.z0+c/2])}}return U_(e,i,t),e.toGroup("site")}const N_=26,F_=72,O_=900,z_=140,Xr=60,kr=60,B_=110;function hi(i,t){if(t>=i[0][0])return i[0][1];for(let e=0;e<i.length-1;e++){const[n,r]=i[e],[s,o]=i[e+1];if(t<=n&&t>=s)return r+(o-r)*(t-n)/(s-n)}return i[i.length-1][1]}function k_(i){const t=i.findIndex((e,n)=>n<i.length-1&&Math.abs(e[1]-i[n+1][1])>Math.abs(e[0]-i[n+1][0]));return t<0?null:{ramp:i.filter((e,n)=>n>t||e[0]>=i[t][0]+B_),stepZ:(i[t][0]+i[t+1][0])/2}}class H_{constructor(t){Wt(this,"eased");Wt(this,"wallEndX");Wt(this,"seamRearZ");this.data=t;const e=k_(t.site.terrain.right);this.eased=(e==null?void 0:e.ramp)??null;const n=t.site.retainingWalls.find(s=>s.outline.some(o=>Math.abs(o[1]-((e==null?void 0:e.stepZ)??0))<15)),r=t.site.retainingWalls.find(s=>s.outline.every(o=>Math.abs(o[0]-t.site.terrain.stepX)<15));this.seamRearZ=r?Math.min(...r.outline.map(s=>s[1])):-1/0,this.wallEndX=n?Math.max(...n.outline.map(s=>s[0])):t.roof.main.xMax}y(t,e,n=t){const{left:r,right:s,stepX:o}=this.data.site.terrain,a=this.data.roof.main,c=()=>{const l=hi(s,e);if(!this.eased||t<=this.wallEndX)return l;const h=Math.min(1,(t-this.wallEndX)/z_),u=h*h*(3-2*h);return l*(1-u)+hi(this.eased,e)*u};if(e>a.zRear){const l=Math.min(1,Math.max(0,(t-a.xMin)/(a.xMax-a.xMin)));return hi(r,e)*(1-l)+c()*l}if(e<this.seamRearZ+kr){const l=Math.min(1,Math.max(0,(t-(o-Xr))/(2*Xr))),h=hi(r,e)*(1-l*l*(3-2*l))+c()*(l*l*(3-2*l)),u=Math.min(1,(this.seamRearZ+kr-e)/kr),f=n<o?hi(r,e):c(),d=u*u*(3-2*u);return f*(1-d)+h*d}return n<o?hi(r,e):c()}}function zc(i,t){const e=[...new Set(i.map(r=>Math.round(r*100)/100))].sort((r,s)=>r-s),n=[];for(let r=0;r<e.length-1;r++){const s=Math.max(1,Math.ceil((e[r+1]-e[r])/t));for(let o=0;o<s;o++)n.push(e[r]+(e[r+1]-e[r])*o/s)}return n.push(e[e.length-1]),n}function G_(i,t){const e=i.ground.clone();return e.fade=[t.x,t.z,N_,F_],e}function V_(i,t,e){const n=new H_(i),r=(i.levels.find(M=>M.id==="basement")??i.levels[0]).floor,s=r.flat(),o=s.map(M=>M[0]),a=s.map(M=>M[1]),c=i.site.margin,l=i.site.terrain,h=zc([Math.min(...o)-c,Math.max(...o)+c,...o,l.stepX,l.stepX-Xr,l.stepX+Xr,...i.site.retainingWalls.flatMap(M=>M.outline.map(S=>S[0]))],100),u=zc([Math.min(...a)-c,Math.max(...a)+c,...a,...l.left.map(M=>M[0]),...l.right.map(M=>M[0]),...i.site.retainingWalls.flatMap(M=>M.outline.map(S=>S[1])),n.seamRearZ+kr].filter(M=>Math.abs(M)<2e3),100),f=[],d=(M,S,v)=>{const L=n.y(M,S,v);f.push(M*me,L*me,S*me)},g=[];for(let M=0;M<h.length-1;M++)for(let S=0;S<u.length-1;S++){const v=(h[M]+h[M+1])/2;if(r.some(b=>$r([v,(u[S]+u[S+1])/2],b)))continue;const[L,A,R,D]=[h[M],h[M+1],u[S],u[S+1]];d(L,R,v),d(L,D,v),d(A,R,v),d(A,R,v),d(L,D,v),d(A,D,v),M===0&&g.push([L,R,n.y(L,R,v)],[L,D,n.y(L,D,v)]),M===h.length-2&&g.push([A,R,n.y(A,R,v)],[A,D,n.y(A,D,v)]),S===0&&g.push([L,R,n.y(L,R,v)],[A,R,n.y(A,R,v)]),S===u.length-2&&g.push([L,D,n.y(L,D,v)],[A,D,n.y(A,D,v)])}for(let M=0;M<g.length;M+=2){const[S,v]=[g[M],g[M+1]],L=R=>[R[0]*me,(R[2]-O_)*me,R[1]*me],A=R=>[R[0]*me,R[2]*me,R[1]*me];for(const R of[A(S),L(S),A(v),A(v),L(S),L(v)])f.push(...R)}const _=new Ee;_.setAttribute("position",new _e(f,3)),_.computeVertexNormals();const m=G_(t,e);m.side=Ye;const p=new we(_,m);return p.receiveShadow=!0,p.name="terrain",{mesh:p,grade:n}}const W_=i=>i?i.floorY+i.ceilingHeight:0;function Qr(i){const t=[[0,i[0][0]]];for(const[e,n,r]of i)t.push([r,e],[r,n]);return t.push([0,i[i.length-1][1]]),t}function X_(i){return i.reduce((e,[n,r],s)=>e+n*i[(s+1)%i.length][1]-i[(s+1)%i.length][0]*r,0)>0?[...i].reverse():i}function Y_(i,t){const e=i.trim.waterTable,n=i.levels.find(s=>s.id==="first"),r=new le;for(const s of(n==null?void 0:n.floor)??[]){const o=Jr(X_(s),Qr([[e.y0,e.y1,e.proud]]),!0);r.add(o,t.trim),o.dispose()}return r.toGroup("water-table")}function q_(i,t){const e=i.levels.find(a=>a.id==="second"),{bands:n}=i.trim.entablature,r=n[0][0],s=n[n.length-1][1],o=a=>a.exterior&&a.kind==="window"&&Math.abs(Math.sin(a.angle))<.5&&Math.abs(a.center[1]-t)<10;return((e==null?void 0:e.openings)??[]).filter(o).map(a=>({wa:a.center[0]-a.width/2,wb:a.center[0]+a.width/2,sill:e.floorY+a.sill,head:e.floorY+a.head})).filter(a=>a.sill<s&&a.head>r).sort((a,c)=>a.wa-c.wa)}function Bc(i,t,e,n){const{entablature:r}=t.trim,s=t.roof.main,o=n==="front",a=o?s.zFront:s.zRear,c=o?1:-1,l=Qr(r.bands),h=(_,m,p)=>{const M=Jr(o?_:[..._].reverse(),m);i.add(M,p),M.dispose()},u=o?void 0:s.rearDormer,f=u?[[s.xMin,u.xMin],[u.xMax,s.xMax]]:[[s.xMin,s.xMax]],d=r.cornice,g=[[0,d.y0],[d.proud-1.2,d.y0],[d.proud,d.y0+.8],[d.proud,d.y1],[0,d.y1]];for(const[_,m]of f){const p=_===s.xMin,M=m===s.xMax,S=q_(t,a).filter(L=>L.wa>=_&&L.wb<=m),v=[_,...S.flatMap(L=>[L.wa,L.wb]),m];for(let L=0;L<v.length;L+=2){const A=v[L],R=v[L+1],D=[];L===0&&p&&D.push([_,a-c*r.bandReturn]),D.push([A,a],[R,a]),L+2>=v.length&&M&&D.push([m,a-c*r.bandReturn]),R-A>.01&&h(D,l,e.trim)}for(const L of S)for(const[A,R,D]of r.bands)for(const[b,E]of[[A,Math.min(R,L.sill)],[Math.max(A,L.head),R]])E-b>.01&&i.box(e.trim,[L.wb-L.wa,E-b,D],[(L.wa+L.wb)/2,(b+E)/2,a+c*D/2]);h([...p?[[_,a-c*r.corniceReturn]]:[],[_,a],[m,a],...M?[[m,a-c*r.corniceReturn]]:[]],g,e.trim)}}function Z_(i,t){const e=new le;return Bc(e,i,t,"front"),Bc(e,i,t,"rear"),e.toGroup("entablature")}function j_(i,t){const e=i.roof.wing;if(!e)return null;const n=[[e.xMin,e.zNear],[e.xMin,e.zFar],[e.xMax,e.zFar],[e.xMax,e.zNear]],r=Jr([...n].reverse(),Qr(i.trim.wingCornice.bands)),s=new le().add(r,t.trim);return r.dispose(),s.toGroup("wing-cornice")}function K_(i,t){const e=i.roof.main,n=e.rearDormer;if(!n)return null;const r=i.trim.dormerCornice,s=new le,o=Jr([[n.xMax,e.zRear],[n.xMin,e.zRear]],Qr(r.bands));s.add(o,t.trim),o.dispose();const a=r.cornerBoard;for(const c of[n.xMin+a.width/2,n.xMax-a.width/2])s.box(t.trim,[a.width,a.y1-a.y0,a.proud],[c,(a.y0+a.y1)/2,e.zRear-a.proud/2]);return s.toGroup("dormer-trim")}function $_(i,t,e){const n=i.roof.main,r=i.trim.pilaster,s=new le,o=t.floorY-t.floorThickness,a=t.id==="second"?r.shaftTopY:W_(t),c=r.width,l=(h,u,f,d,g,_,m,p)=>{if(_-g<.01)return;const M=(g+_)/2,S=_-g,v=r.panel.proud;s.box(e.trim,[m,S,v],[h+f*(c/2-r.proud),M,u+d*(r.proud+p+v/2)]),s.box(e.trim,[v,S,m],[h-f*(r.proud+p+v/2),M,u+d*(r.proud-c/2)])};for(const[h,u]of[[1,n.xMin],[-1,n.xMax]])for(const[f,d]of[[1,n.zFront],[-1,n.zRear]]){s.box(e.trim,[c,a-o,c],[u+h*(c/2-r.proud),(o+a)/2,d+f*(r.proud-c/2)]);const g=Math.max(o,r.panel.y0),_=Math.min(a,r.panel.y1);if(l(u,d,h,f,g,_,r.panel.width,0),l(u,d,h,f,g,_,r.panel.innerWidth,r.panel.proud),t.id==="second")for(const[m,p,M]of r.capital){const S=c+2*M;s.box(e.trim,[S,p-m,S],[u+h*(c/2-r.proud),(m+p)/2,d+f*(r.proud-c/2)])}}return s.toGroup(`pilasters-${t.id}`)}const kc=1.25,Hc=.75,Ns=1,Gc=1.5,Vc=10,J_=80;function Ol(i){const[t,e]=i.direction,n=-e,r=t;let s=1/0,o=-1/0,a=1/0,c=-1/0;for(const[l,h]of i.outline){const u=l*t+h*e,f=l*n+h*r;s=Math.min(s,u),o=Math.max(o,u),a=Math.min(a,f),c=Math.max(c,f)}return{dx:t,dz:e,lx:n,lz:r,a0:s,a1:o,l0:a,l1:c,lc:(a+c)/2}}const Vi=(i,t,e)=>[i.dx*t+i.lx*e,i.dz*t+i.lz*e];function Q_(i){const t=Ol(i),e=(i.topY-i.bottomY)/(t.a1-t.a0),n=Math.max(t.a0,t.a1-J_/e);return[Vi(t,n,t.l0),Vi(t,t.a1,t.l0),Vi(t,t.a1,t.l1),Vi(t,n,t.l1)]}function t0(i,t){const e=new le;for(const n of i.stairs){const r=Ol(n),s=Math.atan2(-r.dz,r.dx),o=(r.a1-r.a0)/n.risers,a=(n.topY-n.bottomY)/n.risers,c=(d,g,_=0)=>{const[m,p]=Vi(r,d,r.lc+_);return[m,g,p]};for(let d=1;d<=n.risers;d++){const g=n.bottomY+d*a,_=r.a0+(d-1)*o;e.box(t.wood,[Hc,a,n.width],c(_+Hc/2,g-a/2),[0,s,0]),d<n.risers&&e.box(t.wood,[o+Ns,kc,n.width],c(_+(o+Ns)/2-Ns,g-kc/2),[0,s,0])}const l=r.a1-r.a0,h=n.topY-n.bottomY,u=Math.hypot(l,h),f=Math.atan2(h,l);for(const d of[-1,1]){const g=d*(n.width/2-Gc/2);e.box(t.wood,[u,Vc,Gc],c(r.a0+l/2,n.bottomY+h/2-Vc/2+1,g),[0,s,f])}}return e.toGroup(`stairs-${i.id}`)}const e0=12;function Fs(i,t){const e=new Map;for(const r of t)r==null||r.traverse(s=>{if(!(s instanceof we))return;const o=e.get(s.material)??[];o.push(s.geometry),e.set(s.material,o)});const n=new wn;n.name=i;for(const[r,s]of e){const o=Dl(s,!1);if(s.forEach(c=>c.dispose()),!o)continue;const a=new we(o,r.clone());a.castShadow=!(r instanceof $o)||r.castsShadow,a.receiveShadow=!0,n.add(a)}return n}class n0{constructor(t){Wt(this,"root",new wn);Wt(this,"levels",new Map);Wt(this,"site");Wt(this,"grade");Wt(this,"bounds",new Map);Wt(this,"center");var g;const e=new Map(t.levels.map(_=>[_.id,_])),n=e.get("first"),r=e.get("second"),s=r?r.floorY+r.ceilingHeight:1/0,o=t.chimney,a=ta(t.roof.main),c=Fl(t.roof.main),l=((g=t.roof.main.rearDormer)==null?void 0:g.zJoin)??-1/0,h=(_,m)=>Math.min(...[_,m].map(p=>(c&&p<l?c:a).under(p)))-e0,u=t.levels.flatMap(_=>_.stairs);for(const _ of t.levels){const m=u.filter(v=>Math.abs(v.topY-_.floorY)<1).map(Q_),p=[y_(_,he,m),x_(_,he,_.id==="second"?h:void 0),h_(_,he,t.trim.casing),d_(_,he,t.trim),t0(_,he),g_(_,he)];_.id!=="basement"&&p.push($_(t,_,he)),_.id==="first"&&p.push(Y_(t,he),L_(t,he),j_(t,he),D_(t,he)),_.id==="second"&&p.push(Z_(t,he),C_(t,he));const M=_.id==="basement"?(n==null?void 0:n.floorY)??0:_.id==="first"?(r==null?void 0:r.floorY)??s:s,S=_.id==="basement"?-1/0:_.floorY;p.push(Cc(o,S,M,!1,he)),this.levels.set(_.id,Fs(_.id,p))}this.levels.set("roof",Fs("roof",[A_(t,he),K_(t,he),Cc(o,s,1/0,!0,he)]));for(const[_,m]of this.levels)this.root.add(m),this.bounds.set(_,new Zn().setFromObject(m));const f=V_(t,he,Tc([(t.roof.main.xMin+t.roof.main.xMax)/2,(t.roof.main.zFront+t.roof.main.zRear)/2]));this.grade=f.grade,this.site=new wn,this.site.name="site",this.site.add(f.mesh,Fs("site-structures",[I_(t,he)])),this.root.add(this.site);const d=t.roof.main;this.center=Tc([(d.xMin+d.xMax)/2,(d.zFront+d.zRear)/2])}}function i0(i,t=!1){const e=new cg({antialias:t,powerPreference:"high-performance"});return e.setPixelRatio(Math.min(t?window.devicePixelRatio:Math.max(window.devicePixelRatio,1.5),2)),e.shadowMap.enabled=!0,e.shadowMap.type=Ke,e.setClearColor(0,0),e.domElement.setAttribute("role","img"),e.domElement.setAttribute("aria-label","Hand-drafted 3D model of the Connecticut Cottage. Drag to orbit, scroll to zoom."),i.appendChild(e.domElement),e}const r0=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,s0=`
precision highp float;
uniform sampler2D tColor, tNorm, tDepth;
uniform vec2 uRes;
uniform float uDpr, uNear, uFar;
uniform mat4 uProjInv, uCamWorld;
varying vec2 vUv;
${Ul}

const vec3 PAPER = vec3(0.955, 0.925, 0.862);
const vec3 INK = ${$g};

float linearDepth(float d) { return 2.0 * uNear * uFar / ((uFar + uNear) - (d * 2.0 - 1.0) * (uFar - uNear)); }

struct Tap { float z; vec3 n; float w; float a; };
Tap tap(vec2 uv) {
  vec4 g = texture2D(tNorm, uv);
  Tap t;
  t.a = g.a;
  float k = 1.0 / max(g.a, 1e-3); // un-premultiply (fading levels are blended)
  vec2 xy = clamp(g.xy * k, 0.0, 1.0) * 2.0 - 1.0;
  t.n = vec3(xy, sqrt(max(0.0, 1.0 - dot(xy, xy))));
  t.w = g.b * k;
  t.z = linearDepth(texture2D(tDepth, uv).r);
  return t;
}

/** x: depth second difference (relative), y: normal crease, z: ink-weight change, w: crease between primary materials; cover: opacity found. */
vec4 edges(vec2 uv, float r, out float cover) {
  const vec2 DIRS[4] = vec2[4](vec2(1.0, 0.0), vec2(0.0, 1.0), vec2(0.7071, 0.7071), vec2(0.7071, -0.7071));
  Tap c = tap(uv);
  vec4 e = vec4(0.0);
  cover = c.a;
  for (int i = 0; i < 4; i++) {
    vec2 d = DIRS[i] * r / uRes;
    Tap a = tap(uv + d), b = tap(uv - d);
    cover = max(cover, max(a.a, b.a));
    // Terrain against terrain is never inked: grade breaks and ramps are suggested by the wash, not drawn as stray lines.
    if (min(c.a, min(a.a, b.a)) > 0.02 && max(c.w, max(a.w, b.w)) < 0.35) continue; // (alpha test is loose: a fading ground must not flicker in and out of this rule)
    e.x = max(e.x, min(abs(a.z + b.z - 2.0 * c.z) / c.z, 1.0));
    if (a.a > 0.5 && b.a > 0.5 && abs(a.z - b.z) < 0.04 * c.z) {
      float crease = 1.0 - dot(a.n, b.n);
      float dw = abs(a.w - b.w);
      // A real edge has both of its sides running on for a pixel more. A one-pixel sliver (an end face lying edge-on inside a joint,
      // tying in depth with the surface beside it) does not: one tap further out we are back on the surface's own value, so it
      // is not an edge. Without this, every coincident-face joint in the model is inked as a dotted line.
      if (crease > 0.1 || dw > 0.02) {
        vec2 step1 = 2.0 * DIRS[i] / uRes;
        Tap a2 = tap(uv + d + step1), b2 = tap(uv - d - step1); // two device pixels further out
        float persistN = smoothstep(0.85, 0.97, min(dot(a.n, a2.n), dot(b.n, b2.n)));
        float persistW = 1.0 - smoothstep(0.02, 0.06, max(abs(a.w - a2.w), abs(b.w - b2.w)));
        crease *= persistN;
        dw *= persistW;
      }
      e.y = max(e.y, crease);
      e.z = max(e.z, dw);
      e.w = max(e.w, crease * smoothstep(0.8, 0.9, min(a.w, b.w)));
    }
  }
  return e;
}

void main() {
  vec2 uv = vUv;
  vec4 colour = texture2D(tColor, uv);
  vec3 wash = colour.rgb + (1.0 - colour.a); // pigment multiplier over bare paper
  float depth = texture2D(tDepth, uv).r;
  float cover = 0.0;

  // world position of this pixel, for stable noise
  vec4 v = uProjInv * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec3 wp = (uCamWorld * vec4(v.xyz / v.w, 1.0)).xyz;
  vec2 css = gl_FragCoord.xy / uDpr;

  // hand wobble: shift the sampling point by up to ~0.2 css px
  vec2 wob = (vec2(vnoise(wp * 2.3), vnoise(wp * 2.3 + 9.0)) - 0.5) * 0.45 * uDpr / uRes;
  float c1, c2;
  vec4 fine = edges(uv + wob, 0.5 * uDpr, c1);
  vec4 bold = edges(uv + wob, 0.95 * uDpr, c2);

  float pressure = 0.72 + 0.28 * vnoise(wp * 0.45);
  float dry = 0.8 + 0.2 * smoothstep(0.1, 0.45, vnoise(wp * 1.3 + 5.0)); // gentle pressure variation; a skipping pen reads as dotted shimmer
  float thin = max(max(smoothstep(0.012, 0.055, fine.x), smoothstep(0.10, 0.35, fine.y)), smoothstep(0.02, 0.06, fine.z)) * dry;
  float thick = max(smoothstep(0.03, 0.10, bold.x), 0.6 * smoothstep(0.12, 0.40, bold.w)); // creases a touch lighter than silhouettes
  float lineA = max(thin * 0.5, thick * 0.78) * pressure * smoothstep(0.35, 0.9, max(c1, c2));

  // pigment pools along the edges of a wash
  #ifndef LITE
  float pcover;
  vec4 wide = edges(uv, 2.6 * uDpr, pcover);
  float pool = max(smoothstep(0.01, 0.06, wide.x), smoothstep(0.15, 0.5, wide.y)) * texture2D(tNorm, uv).a;
  wash *= 1.0 - 0.06 * pool;
  #endif

  // paper: grain (screen space, fixed), mottling and granulation
  float grain = 0.55 * vnoise2(css * 1.1) + 0.3 * vnoise2(css * 2.7 + 11.0) + 0.15 * hash12(floor(gl_FragCoord.xy));
  float mottle = vnoise2(css * 0.006 + 3.0) * 0.6 + vnoise2(css * 0.02) * 0.4;
  vec3 paper = PAPER * (1.0 + (grain - 0.5) * 0.016 + (mottle - 0.5) * 0.04);
  wash = 1.0 - (1.0 - wash) * (0.93 + 0.14 * grain);

  vec3 col = paper * wash;
  col = mix(col, INK * (0.9 + 0.2 * grain), clamp(lineA, 0.0, 1.0));

  vec2 q = (uv - 0.5) * vec2(1.0, 0.92);
  col *= 1.0 - 0.07 * smoothstep(0.3, 0.85, length(q));
  gl_FragColor = vec4(col, 1.0);
}
`,o0=600;class a0{constructor(t){Wt(this,"domElement");Wt(this,"target");Wt(this,"quad");Wt(this,"quadScene",new bl);Wt(this,"quadCamera",new Xo(-1,1,1,-1,0,1));Wt(this,"uniforms");Wt(this,"lite",null);this.renderer=t,this.domElement=t.domElement;const e=new qo(1,1);this.target=new Pn(1,1,{count:2,samples:4,type:Ai,depthTexture:e,minFilter:Pe,magFilter:Pe}),this.target.textures[1].minFilter=this.target.textures[1].magFilter=Pe,this.uniforms={tColor:{value:this.target.textures[0]},tNorm:{value:this.target.textures[1]},tDepth:{value:e},uRes:{value:new J(1,1)},uDpr:{value:1},uNear:{value:1},uFar:{value:1e3},uProjInv:{value:new Zt},uCamWorld:{value:new Zt}},this.quad=new we(new Ji(2,2),this.compositeMaterial(!1)),this.quadScene.add(this.quad),t.info.autoReset=!1}compositeMaterial(t){return new mn({uniforms:this.uniforms,vertexShader:r0,fragmentShader:(t?`#define LITE
`:"")+s0,depthTest:!1,depthWrite:!1})}setSize(t,e){this.renderer.setSize(t,e,!1);const n=this.renderer.getDrawingBufferSize(new J);this.target.setSize(n.x,n.y),this.uniforms.uRes.value.copy(n),this.uniforms.uDpr.value=this.renderer.getPixelRatio();const r=Math.min(t,e)<o0;r!==this.lite&&(this.lite=r,this.quad.material.dispose(),this.quad.material=this.compositeMaterial(r))}render(t,e){const n=this.renderer;n.info.reset(),n.setRenderTarget(this.target),n.clear(),n.render(t,e),n.setRenderTarget(null),this.uniforms.uNear.value=e.near,this.uniforms.uFar.value=e.far,this.uniforms.uProjInv.value.copy(e.projectionMatrixInverse),this.uniforms.uCamWorld.value.copy(e.matrixWorld),n.render(this.quadScene,this.quadCamera)}get stats(){return{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles}}}const Wc={type:"change"},ea={type:"start"},zl={type:"end"},Dr=new Vo,Xc=new bn,c0=Math.cos(70*Go.DEG2RAD),ue=new C,Re=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Os=1e-6;class l0 extends jg{constructor(t,e=null){super(t,e),this.state=te.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:di.ROTATE,TWO:di.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new pn,this._lastTargetPosition=new C,this._quat=new pn().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mc,this._sphericalDelta=new Mc,this._scale=1,this._panOffset=new C,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new C,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u0.bind(this),this._onPointerDown=h0.bind(this),this._onPointerUp=f0.bind(this),this._onContextMenu=x0.bind(this),this._onMouseWheel=m0.bind(this),this._onKeyDown=g0.bind(this),this._onTouchStart=_0.bind(this),this._onTouchMove=v0.bind(this),this._onMouseDown=d0.bind(this),this._onMouseMove=p0.bind(this),this._interceptControlDown=M0.bind(this),this._interceptControlUp=S0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wc),this.update(),this.state=te.NONE}update(t=null){const e=this.object.position;ue.copy(e).sub(this.target),ue.applyQuaternion(this._quat),this._spherical.setFromVector3(ue),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Re:n>Math.PI&&(n-=Re),r<-Math.PI?r+=Re:r>Math.PI&&(r-=Re),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(ue.setFromSpherical(this._spherical),ue.applyQuaternion(this._quatInverse),e.copy(this.target).add(ue),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ue.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ue.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Dr.origin.copy(this.object.position),Dr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Dr.direction))<c0?this.object.lookAt(this.target):(Xc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Dr.intersectPlane(Xc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Os||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Os||this._lastTargetPosition.distanceToSquared(this.target)>Os?(this.dispatchEvent(Wc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Re/60*this.autoRotateSpeed*t:Re/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ue.setFromMatrixColumn(e,0),ue.multiplyScalar(-t),this._panOffset.add(ue)}_panUp(t,e){this.screenSpacePanning===!0?ue.setFromMatrixColumn(e,1):(ue.setFromMatrixColumn(e,0),ue.crossVectors(this.object.up,ue)),ue.multiplyScalar(t),this._panOffset.add(ue)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;ue.copy(r).sub(this.target);let s=ue.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Re*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Re*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Re*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Re*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Re*this._rotateDelta.x/e.clientHeight),this._rotateUp(Re*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new J,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function h0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function u0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function f0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zl),this.state=te.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function d0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case gi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=te.DOLLY;break;case gi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}break;case gi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(ea)}function p0(i){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function m0(i){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(i.preventDefault(),this.dispatchEvent(ea),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(zl))}function g0(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function _0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case di.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=te.TOUCH_ROTATE;break;case di.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case di.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=te.TOUCH_DOLLY_PAN;break;case di.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(ea)}function v0(i){switch(this._trackPointer(i),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=te.NONE}}function x0(i){this.enabled!==!1&&i.preventDefault()}function M0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function S0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function y0(){return new Be(32,1,1,1500)}function E0(i,t,e){const n=new l0(i,t);return n.enableDamping=!0,n.dampingFactor=.09,n.minDistance=10,n.maxDistance=260,n.maxPolarAngle=Math.PI/2-.03,n.screenSpacePanning=!1,n.addEventListener("change",()=>{const r=e(i.position.x,i.position.z);i.position.y<r&&(i.position.y=r)}),n}function b0(i,t){const e=new Zg(16777215,Math.PI);e.position.copy(t).add(new C(-45,70,60)),e.target.position.copy(t),e.castShadow=!0,e.shadow.mapSize.set(2048,2048);const n=e.shadow.camera;n.left=n.bottom=-55,n.right=n.top=55,n.near=10,n.far=220,e.shadow.bias=-8e-4,e.shadow.normalBias=.09,e.shadow.radius=5,e.shadow.blurSamples=16,i.add(e,e.target),Il.value.copy(e.position).sub(t).normalize()}class T0{constructor(t,e,n,r,s){Wt(this,"raf",0);Wt(this,"dirty",!0);Wt(this,"onScreen",!0);Wt(this,"frames",0);Wt(this,"onFirstFrame",null);this.pipeline=t,this.scene=e,this.camera=n,this.controls=r,this.tweens=s,r.addEventListener("change",()=>this.invalidate()),r.addEventListener("start",()=>this.invalidate()),s.onStart=()=>this.invalidate(),document.addEventListener("visibilitychange",()=>this.invalidate()),new IntersectionObserver(o=>{this.onScreen=o.some(a=>a.isIntersecting),this.invalidate()}).observe(t.domElement)}invalidate(){this.dirty=!0,!this.raf&&this.onScreen&&!document.hidden&&(this.raf=requestAnimationFrame(t=>this.frame(t)))}frame(t){var r;if(this.raf=0,!this.onScreen||document.hidden)return;const e=this.tweens.update(t),n=this.controls.update();(e||n||this.dirty)&&(this.dirty=!1,this.pipeline.render(this.scene,this.camera),++this.frames===1&&((r=this.onFirstFrame)==null||r.call(this)),this.raf||(this.raf=requestAnimationFrame(s=>this.frame(s))))}}function w0(i,t,e,n=1.12,r){const s=i.getCenter(new C),o=t.clone().normalize(),a=o.clone().negate(),c=new C().crossVectors(a,new C(0,1,0)).normalize(),l=new C().crossVectors(c,a).normalize(),h=Math.tan(Go.degToRad(e.fov)/2),u=r?Math.max(.3,(r.height-r.top-r.bottom)/r.height):1,f=h*u,d=h*e.aspect;let g=0;const _=new C;for(let p=0;p<8;p++){_.set(p&1?i.max.x:i.min.x,p&2?i.max.y:i.min.y,p&4?i.max.z:i.min.z).sub(s);const M=_.dot(a);g=Math.max(g,Math.abs(_.dot(c))/d-M,Math.abs(_.dot(l))/f-M)}const m=g*n;if(r){const p=(r.top-r.bottom)/r.height;s.addScaledVector(l,p*h*m)}return{target:s,position:s.clone().addScaledVector(o,m)}}const ui=["basement","first","second","roof"],A0={basement:0,first:7,second:14,roof:22},R0=16,Yc=1100,C0=80,P0=Go.degToRad(32),zs=new C(-.72,.42,1);class L0{constructor(t,e,n,r){Wt(this,"nodes",new Map);Wt(this,"current",{kind:"assembled"});Wt(this,"reduceMotion",window.matchMedia("(prefers-reduced-motion: reduce)").matches);Wt(this,"onState",null);Wt(this,"insets",null);this.house=t,this.camera=e,this.controls=n,this.tweens=r;for(const s of[...ui,"site"]){const o=s==="site"?t.site:t.levels.get(s);if(!o)continue;const a=new Set;o.traverse(c=>{c instanceof we&&a.add(c.material)}),this.nodes.set(s,{group:o,materials:[...a],y:0,opacity:1})}n.addEventListener("start",()=>r.cancel("camera"))}get state(){return this.current}get groundActive(){return this.current.kind==="assembled"}assemble(){this.go({kind:"assembled"})}explode(){this.go({kind:"exploded"})}isolate(t){this.go({kind:"isolate",level:t})}resetView(){this.moveCamera(this.frame(this.current,zs))}snapCamera(){const t=this.frame(this.current,zs);this.camera.position.copy(t.position),this.controls.target.copy(t.target),this.controls.update()}go(t){var r;this.current=t;const e=this.targets(t),n=t.kind!=="assembled";[...ui,"site"].forEach((s,o)=>{const a=this.nodes.get(s),c=e.get(s);if(!a||!c)return;const l=a.y,h=a.opacity,u=s==="site"?0:n?o:ui.length-1-o;this.tweens.start(`level:${s}`,{delay:this.reduceMotion?0:u*C0,duration:this.reduceMotion?0:Yc,update:f=>this.apply(a,l+(c.y-l)*f,h+(c.opacity-h)*f),done:()=>this.apply(a,c.y,c.opacity)})}),this.moveCamera(this.frame(t)),(r=this.onState)==null||r.call(this,t)}targets(t){const e=new Map;e.set("site",t.kind==="assembled"?{y:0,opacity:1}:{y:-60,opacity:0});const n=t.kind==="isolate"?ui.indexOf(t.level):ui.length;return ui.forEach((r,s)=>{t.kind==="assembled"?e.set(r,{y:0,opacity:1}):t.kind==="exploded"?e.set(r,{y:A0[r],opacity:1}):e.set(r,s<=n?{y:0,opacity:1}:{y:R0+s,opacity:0})}),e}apply(t,e,n){t.y=e,t.opacity=n,t.group.position.y=e,t.group.visible=n>.01;const r=n<.999;for(const s of t.materials)s.opacity=n,s.depthWrite=!r,s.transparent!==r&&(s.transparent=r,s.needsUpdate=!0)}frame(t,e){var o;const n=this.targets(t),r=new Zn;for(const[a,c]of n){const l=this.house.bounds.get(a);l&&c.opacity>0&&r.union(l.clone().translate(new C(0,c.y,0)))}let s=e==null?void 0:e.clone();if(!s){s=this.camera.position.clone().sub(this.controls.target);const a=Math.hypot(s.x,s.z);a<1e-6?s.copy(zs):t.kind!=="assembled"&&(s.y=Math.max(s.y,a*Math.tan(P0)))}return w0(r,s,this.camera,1.12,t.kind==="assembled"||(o=this.insets)==null?void 0:o.call(this))}moveCamera(t){const e=this.camera.position.clone(),n=this.controls.target.clone();this.tweens.start("camera",{duration:this.reduceMotion?0:Yc+200,update:r=>{this.camera.position.lerpVectors(e,t.position,r),this.controls.target.lerpVectors(n,t.target,r)}})}}const D0=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;class U0{constructor(){Wt(this,"tweens",new Map);Wt(this,"onStart",null)}start(t,e){var n;this.tweens.set(t,{t0:performance.now(),delay:e.delay??0,duration:e.duration,update:e.update,done:e.done}),(n=this.onStart)==null||n.call(this)}cancel(t){this.tweens.delete(t)}update(t){var e;for(const[n,r]of this.tweens){const s=t-r.t0-r.delay;if(s<0)continue;const o=r.duration<=0?1:Math.min(1,s/r.duration);r.update(D0(o)),o>=1&&(this.tweens.delete(n),(e=r.done)==null||e.call(r))}return this.tweens.size>0}}const I0=[{id:"basement",label:"Basement"},{id:"first",label:"First"},{id:"second",label:"Second"}];class N0{constructor(t,e,n){Wt(this,"buttons",new Map);const r=document.createElement("div");r.className="ctl-bar",r.setAttribute("role","toolbar"),r.setAttribute("aria-label","Model view controls");const s=this.group(r,"View");this.toggle(s,"assembled","Assembled",()=>e.assemble()),this.toggle(s,"exploded","Explode",()=>e.explode());const o=this.group(r,"Isolate floor");for(const c of I0.filter(l=>n.includes(l.id)))this.toggle(o,c.id,c.label,()=>{var l;((l=this.buttons.get(c.id))==null?void 0:l.getAttribute("aria-pressed"))==="true"?e.assemble():e.isolate(c.id)});const a=document.createElement("button");a.type="button",a.className="ctl-btn ctl-reset",a.textContent="Reset view",a.addEventListener("click",()=>e.resetView()),r.appendChild(a),t.appendChild(r),this.setState({kind:"assembled"})}group(t,e){const n=document.createElement("div");return n.className="ctl-group",n.setAttribute("role","group"),n.setAttribute("aria-label",e),t.appendChild(n),n}toggle(t,e,n,r){const s=document.createElement("button");s.type="button",s.className="ctl-btn",s.textContent=n,s.setAttribute("aria-pressed","false"),s.addEventListener("click",r),t.appendChild(s),this.buttons.set(e,s)}setState(t){const e=t.kind==="isolate"?t.level:t.kind;for(const[n,r]of this.buttons)r.setAttribute("aria-pressed",String(n===e))}}const F0=1.5;function O0(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}async function z0(i){var p;const t=document.getElementById("cottage-loading");if(!O0()){t==null||t.setAttribute("hidden",""),(p=document.getElementById("cottage-fallback"))==null||p.removeAttribute("hidden");return}const e=await Kg(),n=new URLSearchParams(location.search).get("qa"),r=["front","rear","left","right"].includes(n??"")?n:null,s=i0(i,r!==null),o=new bl,a=y0(),c=new n0(e);let l=null;const h=E0(a,s.domElement,(M,S)=>(l==null?void 0:l.groundActive)===!1?-1/0:c.grade.y(M/me,S/me)*me+F0);if(o.add(c.root),b0(o,c.center),r){const{applyQaView:M}=await Bs(async()=>{const{applyQaView:A}=await import("./qaView-VoVisRRq.js");return{applyQaView:A}},[],import.meta.url),{clientWidth:S,clientHeight:v}=i;s.setSize(S,v,!1);const L=M(o,s,c,e,r,c.center,{w:S,h:v});s.render(o,L),t==null||t.classList.add("done"),document.body.dataset.qaReady="1";return}const u=new U0,f=new a0(s),d=new T0(f,o,a,h,u);l=new L0(c,a,h,u);const g=l,_=()=>{const{clientWidth:M,clientHeight:S}=i;f.setSize(M,S),a.aspect=M/Math.max(S,1),a.updateProjectionMatrix(),d.invalidate()};_(),g.snapCamera(),new ResizeObserver(_).observe(i);const m=new N0(i,{assemble:()=>g.assemble(),explode:()=>g.explode(),isolate:M=>g.isolate(M),resetView:()=>g.resetView()},e.levels.map(M=>M.id));g.onState=M=>m.setState(M),g.insets=()=>{var L,A;const M=i.getBoundingClientRect(),S=((L=document.querySelector(".site-header"))==null?void 0:L.getBoundingClientRect().bottom)??M.top,v=((A=document.querySelector(".ctl-bar"))==null?void 0:A.getBoundingClientRect().top)??M.bottom;return{top:Math.max(0,S-M.top)+8,bottom:Math.max(0,M.bottom-v)+8,height:M.height}},d.onFirstFrame=()=>{console.info(`[cottage-3d] draw calls (first frame, both passes): ${f.stats.calls}, triangles: ${f.stats.triangles}`),i.setAttribute("aria-busy","false"),t==null||t.classList.add("done")},d.invalidate()}const qc=document.getElementById("cottage-root");qc&&z0(qc).catch(i=>{console.error(i);const t=document.getElementById("cottage-loading");t&&(t.textContent="Sorry, the model could not be loaded.")});export{Ee as B,qt as C,Ye as D,H0 as E,_e as F,me as I,lg as L,dl as M,Xo as O,C as V,we as a,k0 as b};
