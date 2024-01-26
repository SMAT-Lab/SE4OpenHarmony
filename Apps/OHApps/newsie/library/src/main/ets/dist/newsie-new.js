/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import socket from '@ohos.net.socket';
import connection from '@ohos.net.connection';
import buffer from '@ohos.buffer';
import * as t$2 from '@ohos.hilog';
import * as e$2 from '@ohos.process';
import * as r$2 from '@ohos.util';
import require$$0$1 from '@ohos.url';

/*! For license information please see buffer.js.LICENSE.txt */
var t$1={483:(t,e,r)=>{const n=r(525),o=r(921),i="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.lW=u,e.bY=g,e.h2=50,e.ZP={Buffer:u,SlowBuffer:g,INSPECT_MAX_BYTES:50};const f=2147483647;function s(t){if(t>f)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,u.prototype),e}function u(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,e,r)}function h(t,e,r){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|w(t,e);let n=s(r);const o=n.write(t,e);return o!==r&&(n=n.slice(0,o)),n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(X(t,Uint8Array)){const e=new Uint8Array(t);return l(e.buffer,e.byteOffset,e.byteLength)}return p(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(X(t,ArrayBuffer)||t&&X(t.buffer,ArrayBuffer))return l(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(X(t,SharedArrayBuffer)||t&&X(t.buffer,SharedArrayBuffer)))return l(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return u.from(n,e,r);const o=function(t){if(u.isBuffer(t)){const e=0|y(t.length),r=s(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||J(t.length)?s(0):p(t):"Buffer"===t.type&&Array.isArray(t.data)?p(t.data):void 0}(t);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return a(t),s(t<0?0:0|y(t))}function p(t){const e=t.length<0?0:0|y(t.length),r=s(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function l(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,u.prototype),n}function y(t){if(t>=f)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+f.toString(16)+" bytes");return 0|t}function g(t){return +t!=t&&(t=0),u.alloc(+t)}function w(t,e){if(u.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||X(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return q(t).length;default:if(o)return n?-1:W(t).length;e=(""+e).toLowerCase(),o=!0;}}function d(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return "";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return "";if((r>>>=0)<=(e>>>=0))return "";for(t||(t="utf8");;)switch(t){case"hex":return _(this,e,r);case"utf8":case"utf-8":return T(this,e,r);case"ascii":return L(this,e,r);case"latin1":case"binary":return S(this,e,r);case"base64":return R(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return x(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function b(t,e,r){const n=t[e];t[e]=t[r],t[r]=n;}function B(t,e,r,n,o){if(0===t.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),J(r=+r)&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(o)return -1;r=t.length-1;}else if(r<0){if(!o)return -1;r=0;}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:E(t,e,r,n,o);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):E(t,[e],r,n,o);throw new TypeError("val must be string, number or Buffer")}function E(t,e,r,n,o){let i,f=1,s=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return -1;f=2,s/=2,u/=2,r/=2;}function h(t,e){return 1===f?t[e]:t.readUInt16BE(e*f)}if(o){let n=-1;for(i=r;i<s;i++)if(h(t,i)===h(e,-1===n?0:i-n)){if(-1===n&&(n=i),i-n+1===u)return n*f}else -1!==n&&(i-=i-n),n=-1;}else for(r+u>s&&(r=s-u),i=r;i>=0;i--){let r=!0;for(let n=0;n<u;n++)if(h(t,i+n)!==h(e,n)){r=!1;break}if(r)return i}return -1}function m(t,e,r,n){r=Number(r)||0;const o=t.length-r;n?(n=Number(n))>o&&(n=o):n=o;const i=e.length;let f;for(n>i/2&&(n=i/2),f=0;f<n;++f){const n=parseInt(e.substr(2*f,2),16);if(J(n))return f;t[r+f]=n;}return f}function A(t,e,r,n){return K(W(e,t.length-r),t,r,n)}function I(t,e,r,n){return K(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function U(t,e,r,n){return K(q(e),t,r,n)}function v(t,e,r,n){return K(function(t,e){let r,n,o;const i=[];for(let f=0;f<t.length&&!((e-=2)<0);++f)r=t.charCodeAt(f),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(e,t.length-r),t,r,n)}function R(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function T(t,e,r){r=Math.min(t.length,r);const n=[];let o=e;for(;o<r;){const e=t[o];let i=null,f=e>239?4:e>223?3:e>191?2:1;if(o+f<=r){let r,n,s,u;switch(f){case 1:e<128&&(i=e);break;case 2:r=t[o+1],128==(192&r)&&(u=(31&e)<<6|63&r,u>127&&(i=u));break;case 3:r=t[o+1],n=t[o+2],128==(192&r)&&128==(192&n)&&(u=(15&e)<<12|(63&r)<<6|63&n,u>2047&&(u<55296||u>57343)&&(i=u));break;case 4:r=t[o+1],n=t[o+2],s=t[o+3],128==(192&r)&&128==(192&n)&&128==(192&s)&&(u=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&s,u>65535&&u<1114112&&(i=u));}}null===i?(i=65533,f=1):i>65535&&(i-=65536,n.push(i>>>10&1023|55296),i=56320|1023&i),n.push(i),o+=f;}return function(t){const e=t.length;if(e<=O)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=O));return r}(n)}e.ZK=f,u.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return !1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),u.poolSize=8192,u.from=function(t,e,r){return h(t,e,r)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(t,e,r){return function(t,e,r){return a(t),t<=0?s(t):void 0!==e?"string"==typeof r?s(t).fill(e,r):s(t).fill(e):s(t)}(t,e,r)},u.allocUnsafe=function(t){return c(t)},u.allocUnsafeSlow=function(t){return c(t)},u.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u.prototype},u.compare=function(t,e){if(X(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),X(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let o=0,i=Math.min(r,n);o<i;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},u.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=u.allocUnsafe(e);let o=0;for(r=0;r<t.length;++r){let e=t[r];if(X(e,Uint8Array))o+e.length>n.length?(u.isBuffer(e)||(e=u.from(e.buffer,e.byteOffset,e.byteLength)),e.copy(n,o)):Uint8Array.prototype.set.call(n,e,o);else {if(!u.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,o);}o+=e.length;}return n},u.byteLength=w,u.prototype._isBuffer=!0,u.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)b(this,e,e+1);return this},u.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)b(this,e,e+3),b(this,e+1,e+2);return this},u.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)b(this,e,e+7),b(this,e+1,e+6),b(this,e+2,e+5),b(this,e+3,e+4);return this},u.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?T(this,0,t):d.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){let t="";const r=e.h2;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},i&&(u.prototype[i]=u.prototype.inspect),u.prototype.compare=function(t,e,r,n,o){if(X(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),e<0||r>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&e>=r)return 0;if(n>=o)return -1;if(e>=r)return 1;if(this===t)return 0;let i=(o>>>=0)-(n>>>=0),f=(r>>>=0)-(e>>>=0);const s=Math.min(i,f),h=this.slice(n,o),a=t.slice(e,r);for(let t=0;t<s;++t)if(h[t]!==a[t]){i=h[t],f=a[t];break}return i<f?-1:f<i?1:0},u.prototype.includes=function(t,e,r){return -1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return B(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return B(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else {if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);}const o=this.length-e;if((void 0===r||r>o)&&(r=o),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let i=!1;for(;;)switch(n){case"hex":return m(this,t,e,r);case"utf8":case"utf-8":return A(this,t,e,r);case"ascii":case"latin1":case"binary":return I(this,t,e,r);case"base64":return U(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,t,e,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0;}},u.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const O=4096;function L(t,e,r){let n="";r=Math.min(t.length,r);for(let o=e;o<r;++o)n+=String.fromCharCode(127&t[o]);return n}function S(t,e,r){let n="";r=Math.min(t.length,r);for(let o=e;o<r;++o)n+=String.fromCharCode(t[o]);return n}function _(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let o="";for(let n=e;n<r;++n)o+=H[t[n]];return o}function x(t,e,r){const n=t.slice(e,r);let o="";for(let t=0;t<n.length-1;t+=2)o+=String.fromCharCode(n[t]+256*n[t+1]);return o}function C(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function $(t,e,r,n,o,i){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function M(t,e,r,n,o){z(e,n,o,t,r,7);let i=Number(e&BigInt(4294967295));t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,r}function N(t,e,r,n,o){z(e,n,o,t,r,7);let i=Number(e&BigInt(4294967295));t[r+7]=i,i>>=8,t[r+6]=i,i>>=8,t[r+5]=i,i>>=8,t[r+4]=i;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=f,f>>=8,t[r+2]=f,f>>=8,t[r+1]=f,f>>=8,t[r]=f,r+8}function P(t,e,r,n,o,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function k(t,e,r,n,i){return e=+e,r>>>=0,i||P(t,0,r,4),o.write(t,e,r,n,23,4),r+4}function j(t,e,r,n,i){return e=+e,r>>>=0,i||P(t,0,r,8),o.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,u.prototype),n},u.prototype.readUintLE=u.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t],o=1,i=0;for(;++i<e&&(o*=256);)n+=this[t+i]*o;return n},u.prototype.readUintBE=u.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t+--e],o=1;for(;e>0&&(o*=256);)n+=this[t+--e]*o;return n},u.prototype.readUint8=u.prototype.readUInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),this[t]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readBigUInt64LE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,o=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(o)<<BigInt(32))})),u.prototype.readBigUInt64BE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],o=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return (BigInt(n)<<BigInt(32))+BigInt(o)})),u.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t],o=1,i=0;for(;++i<e&&(o*=256);)n+=this[t+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=e,o=1,i=this[t+--n];for(;n>0&&(o*=256);)i+=this[t+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},u.prototype.readInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){t>>>=0,e||C(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){t>>>=0,e||C(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readBigInt64LE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return (BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),u.prototype.readBigInt64BE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return (BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),u.prototype.readFloatLE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!1,52,8)},u.prototype.writeUintLE=u.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||$(this,t,e,r,Math.pow(2,8*r)-1,0);let o=1,i=0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||$(this,t,e,r,Math.pow(2,8*r)-1,0);let o=r-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUint8=u.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,1,255,0),this[e]=255&t,e+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigUInt64LE=Q((function(t,e=0){return M(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeBigUInt64BE=Q((function(t,e=0){return N(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);$(this,t,e,r,n-1,-n);}let o=0,i=1,f=0;for(this[e]=255&t;++o<r&&(i*=256);)t<0&&0===f&&0!==this[e+o-1]&&(f=1),this[e+o]=(t/i>>0)-f&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);$(this,t,e,r,n-1,-n);}let o=r-1,i=1,f=0;for(this[e+o]=255&t;--o>=0&&(i*=256);)t<0&&0===f&&0!==this[e+o+1]&&(f=1),this[e+o]=(t/i>>0)-f&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigInt64LE=Q((function(t,e=0){return M(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeBigInt64BE=Q((function(t,e=0){return N(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeFloatLE=function(t,e,r){return k(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return k(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return j(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return j(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(!u.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const o=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),o},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e);}}else "number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else {const i=u.isBuffer(t)?t:u.from(t,n),f=i.length;if(0===f)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=i[o%f];}return this};const F={};function D(t,e,r){F[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name;}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0});}toString(){return `${this.name} [${t}]: ${this.message}`}};}function Y(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return `${t.slice(0,r)}${e}`}function z(t,e,r,n,o,i){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let o;throw o=i>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(i+1)}${n}`:`>= -(2${n} ** ${8*(i+1)-1}${n}) and < 2 ** ${8*(i+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new F.ERR_OUT_OF_RANGE("value",o,t)}!function(t,e,r){G(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||Z(e,t.length-(r+1));}(n,o,i);}function G(t,e){if("number"!=typeof t)throw new F.ERR_INVALID_ARG_TYPE(e,"number",t)}function Z(t,e,r){if(Math.floor(t)!==t)throw G(t,r),new F.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new F.ERR_BUFFER_OUT_OF_BOUNDS;throw new F.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}D("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),D("ERR_INVALID_ARG_TYPE",(function(t,e){return `The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),D("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,o=r;return Number.isInteger(r)&&Math.abs(r)>2**32?o=Y(String(r)):"bigint"==typeof r&&(o=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(o=Y(o)),o+="n"),n+=` It must be ${e}. Received ${o}`,n}),RangeError);const V=/[^+/0-9A-Za-z-_]/g;function W(t,e){let r;e=e||1/0;const n=t.length;let o=null;const i=[];for(let f=0;f<n;++f){if(r=t.charCodeAt(f),r>55295&&r<57344){if(!o){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(f+1===n){(e-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320);}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;i.push(r);}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128);}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128);}else {if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);}}return i}function q(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(V,"")).length<2)return "";for(;t.length%4!=0;)t+="=";return t}(t))}function K(t,e,r,n){let o;for(o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}function X(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function J(t){return t!=t}const H=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let o=0;o<16;++o)e[n+o]=t[r]+t[o];}return e}();function Q(t){return "undefined"==typeof BigInt?tt:t}function tt(){throw new Error("BigInt not supported")}},525:(t,e)=>{e.byteLength=function(t){var e=s(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,i=s(t),f=i[0],u=i[1],h=new o(function(t,e,r){return 3*(e+r)/4-r}(0,f,u)),a=0,c=u>0?f-4:f;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],h[a++]=e>>16&255,h[a++]=e>>8&255,h[a++]=255&e;return 2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,h[a++]=255&e),1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,h[a++]=e>>8&255,h[a++]=255&e),h},e.fromByteArray=function(t){for(var e,n=t.length,o=n%3,i=[],f=16383,s=0,h=n-o;s<h;s+=f)i.push(u(t,s,s+f>h?h:s+f));return 1===o?(e=t[n-1],i.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],i.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),i.join("")};for(var r=[],n=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0;f<64;++f)r[f]=i[f],n[i.charCodeAt(f)]=f;function s(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return -1===r&&(r=e),[r,r===e?0:4-r%4]}function u(t,e,n){for(var o,i,f=[],s=e;s<n;s+=3)o=(t[s]<<16&16711680)+(t[s+1]<<8&65280)+(255&t[s+2]),f.push(r[(i=o)>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return f.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63;},921:(t,e)=>{e.read=function(t,e,r,n,o){let i,f;const s=8*o-n-1,u=(1<<s)-1,h=u>>1;let a=-7,c=r?o-1:0;const p=r?-1:1;let l=t[e+c];for(c+=p,i=l&(1<<-a)-1,l>>=-a,a+=s;a>0;)i=256*i+t[e+c],c+=p,a-=8;for(f=i&(1<<-a)-1,i>>=-a,a+=n;a>0;)f=256*f+t[e+c],c+=p,a-=8;if(0===i)i=1-h;else {if(i===u)return f?NaN:1/0*(l?-1:1);f+=Math.pow(2,n),i-=h;}return (l?-1:1)*f*Math.pow(2,i-n)},e.write=function(t,e,r,n,o,i){let f,s,u,h=8*i-o-1;const a=(1<<h)-1,c=a>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0;let l=n?0:i-1;const y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,f=a):(f=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-f))<1&&(f--,u*=2),(e+=f+c>=1?p/u:p*Math.pow(2,1-c))*u>=2&&(f++,u/=2),f+c>=a?(s=0,f=a):f+c>=1?(s=(e*u-1)*Math.pow(2,o),f+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,o),f=0));o>=8;)t[r+l]=255&s,l+=y,s/=256,o-=8;for(f=f<<o|s,h+=o;h>0;)t[r+l]=255&f,l+=y,f/=256,h-=8;t[r+l-y]|=128*g;};}},e$1={},r$1=function r(n){var o=e$1[n];if(void 0!==o)return o.exports;var i=e$1[n]={exports:{}};return t$1[n](i,i.exports,r),i.exports}(483),n$2=r$1.lW;r$1.h2;r$1.bY;r$1.ZP;r$1.ZK;

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

var events = {exports: {}};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var R = (typeof Reflect === "undefined" ? "undefined" : _typeof$1(Reflect)) === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}
var NumberIsNaN$1 = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
var EventEmitter_1 = events.exports.EventEmitter = EventEmitter;
events.exports = EventEmitter;
events.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof$1(listener));
  }
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN$1(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || NumberIsNaN$1(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === "error";
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;
  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit("newListener", type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }
  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
      w.name = "MaxListenersExceededWarning";
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === "removeListener") continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === "function") {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }
  return this;
};
function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, {
      once: true
    });
    if (name !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, {
        once: true
      });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + _typeof$1(emitter));
  }
}

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf$1(o, p);
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result);
  };
}
function _toPrimitive$1(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var tag = "dudu---";
var OhosTcpSocket = /*#__PURE__*/function () {
  function OhosTcpSocket(options) {
    _classCallCheck$1(this, OhosTcpSocket);
    _defineProperty$1(this, "tcp_socket", void 0);
    // TcpSocket实例
    _defineProperty$1(this, "options", void 0);
    //配置
    _defineProperty$1(this, "net_handle", void 0);
    //网络句柄
    _defineProperty$1(this, "net_address", void 0);
    //网络地址
    _defineProperty$1(this, "connecting", void 0);
    this.tcp_socket = socket.constructTCPSocketInstance();
    this.options = options;
  }
  _createClass$1(OhosTcpSocket, [{
    key: "getDefaultNet",
    value: function () {
      var _getDefaultNet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return connection.getDefaultNet();
            case 2:
              this.net_handle = _context.sent;
              return _context.abrupt("return", this);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getDefaultNet() {
        return _getDefaultNet.apply(this, arguments);
      }
      return getDefaultNet;
    }()
  }, {
    key: "getConnectionProperties",
    value: function () {
      var _getConnectionProperties = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var res;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return connection.getConnectionProperties(this.net_handle);
            case 2:
              res = _context2.sent;
              if (!(!res || !res.linkAddresses || res.linkAddresses.length === 0)) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return");
            case 5:
              this.net_address = res.linkAddresses[0].address;
              return _context2.abrupt("return", this);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getConnectionProperties() {
        return _getConnectionProperties.apply(this, arguments);
      }
      return getConnectionProperties;
    }()
  }, {
    key: "bind",
    value: function () {
      var _bind = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.tcp_socket.bind(this.net_address);
            case 2:
              return _context3.abrupt("return", this);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function bind() {
        return _bind.apply(this, arguments);
      }
      return bind;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.tcp_socket.connect({
                address: {
                  address: this.options.host,
                  port: this.options.port,
                  family: 1
                },
                timeout: 6000
              });
            case 2:
              return _context4.abrupt("return", this);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }]);
  return OhosTcpSocket;
}();
var Socket = /*#__PURE__*/function (_EventEmitter) {
  _inherits$1(Socket, _EventEmitter);
  var _super = _createSuper$1(Socket);
  function Socket(options) {
    var _this;
    _classCallCheck$1(this, Socket);
    _this = _super.call(this);
    _defineProperty$1(_assertThisInitialized$1(_this), "ohos_tcp_socket", void 0);
    _this.options = options;
    _this.ohos_tcp_socket = new OhosTcpSocket(options);
    _this.ohos_tcp_socket.tcp_socket.on("message", function (data) {
      console.log(tag + "\u670D\u52A1\u7AEF\u53D1\u6765\u6D88\u606F :".concat(buffer.from(data.message).toString()));
      _this.emit("data", buffer.from(data.message).toString());
    });
    return _this;
  }
  _createClass$1(Socket, [{
    key: "connect",
    value: function () {
      var _connect2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              this.ohos_tcp_socket.connecting = true;
              _context5.next = 4;
              return this.ohos_tcp_socket.getDefaultNet();
            case 4:
              console.log(tag + "getDefaultNet \u6210\u529F");
              _context5.next = 7;
              return this.ohos_tcp_socket.getConnectionProperties();
            case 7:
              console.log(tag + "getConnectionProperties \u6210\u529F");
              _context5.next = 10;
              return this.ohos_tcp_socket.bind();
            case 10:
              console.log(tag + "bind \u6210\u529F");
              _context5.next = 13;
              return this.ohos_tcp_socket.connect();
            case 13:
              console.log(tag + "connect \u6210\u529F");
              this.ohos_tcp_socket.connecting = false;
              this.emit("connect");
              _context5.next = 23;
              break;
            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](0);
              console.log(tag + "connect \u51FA\u73B0\u5F02\u5E38 ".concat(JSON.stringify(_context5.t0)));
              this.ohos_tcp_socket.connecting = false;
              this.emit("error", _context5.t0);
            case 23:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 18]]);
      }));
      function connect() {
        return _connect2.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "write",
    value: function write(data, encoding, cb) {
      var _this2 = this;
      console.log(tag + "write \u5F00\u59CB\u53D1\u9001\u6D88\u606F");
      if (this.ohos_tcp_socket.connecting) {
        console.log(tag + "\u8FDB\u5165\u7F13\u51B2\u961F\u5217");
        this.once("connect", function () {
          _this2.write(data, encoding, cb);
        });
      } else {
        console.log(tag + "write \u771F\u6B63\u53D1\u9001\u4E00\u6761\u6D88\u606F" + data);
        this.ohos_tcp_socket.tcp_socket.send({
          data: data,
          encoding: encoding
        }, cb);
      }
    }
  }, {
    key: "end",
    value: function end() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {}
  }, {
    key: "unref",
    value: function unref() {}
  }]);
  return Socket;
}(EventEmitter_1);
function createConnection(port, host, connectionListener) {
  var socket = new Socket({
    port: port,
    host: host,
    connectionListener: connectionListener
  });
  socket.connect();
  return socket;
}

/**
 * TODO: reject on promises on timeout
 * TODO: support compression (doesn't yet work)
 */
class Connection {
    constructor(host, port, tlsPort, tlsOptions) {
        this.connect = () => {
            this._socket = createConnection(this._port, this._host);
            this._addSocketHandlers();
            return Promise.resolve(this._socket);
        };
        this.disconnect = () => {
            // Close connection
            this._socket.end();
            this._socket.destroy();
            this._socket.removeAllListeners();
            this._socket.unref();
            if (this._tlsPromiseReject) {
                this._tlsPromiseReject();
            }
            // Empty the queue
            this._queue.forEach(h => h.reject(new Error('Disconnected from server')));
            this._queue = [];
        };
        this.write = (str) => {
            // if (this._compress) {
            //   str = zlib.deflateSync(str).toString('base64')
            // }
            return new Promise((resolve, reject) => this._socket.write(str, 'utf8', err => (err ? reject(err) : resolve())));
        };
        this.addCallback = (callback, resolve, reject) => {
            this._queue.push({ callback, resolve, reject });
        };
        this.upgradeTls = () => {
            // return   new Promise((resolve, reject) => {
            //   this._tlsPromiseReject = reject
            //   this._socket = tlsConnect(
            //     ({
            //       ...this._tlsOptions,
            //       socket: this._socket
            //     } as unknown) as TlsConnectionOptions, // tslint:disable-line
            //     () => {
            //       this._tlsPromiseReject = undefined
            //       resolve(this._socket)
            //     }
            //   )
            //   this._addSocketHandlers()
            // })
        };
        this.enableCompression = () => {
            this._compress = 'deflate';
            /* tslint:disable:no-console */
            this._socket.on('drain', () => console.log('drain'));
            this._socket.on('end', () => console.log('end'));
            this._socket.on('lookup', () => console.log('lookup'));
            this._socket.on('timeout', () => console.log('timeout'));
            /* tslint:enable:no-console */
        };
        this._handler = (frame) => {
            // if (this._compress) {
            //   frame = zlib.inflateSync(Buffer.from(frame)).toString()
            // }
            this._frames += frame;
            const responseHandler = this._queue[0];
            let response;
            try {
                response = responseHandler.callback(this._frames);
            }
            catch (err) {
                // TODO: remove console.error method
                // tslint:disable-next-line
                console.error('Fatal parse error, terminating connection', err);
                this.disconnect();
                return;
            }
            if (!response) {
                return;
            }
            this._frames = this._frames.slice(response._i);
            this._queue.shift();
            delete response._i;
            responseHandler.resolve(response);
            // Handle pipelined responses sent in single frame
            if (this._frames !== '') {
                this._handler('');
            }
        };
        this._addSocketHandlers = () => {
            this._socket.on('data', this._handler);
            this._socket.on('error', err => {
                this._queue.forEach(h => h.reject(err));
                this.disconnect();
                throw err;
            });
            this._socket.on('end', () => {
                const err = new Error('Received FIN packet from server, closing connection automatically');
                this._queue.forEach(h => h.reject(err));
                this.disconnect();
            });
            this._socket.on('tlsClientError', err => {
                this._queue.forEach(h => h.reject(err));
                this.disconnect();
                throw err;
            });
            this._socket.once('close', () => {
                this._queue.forEach(h => h.reject(new Error('Connection closed')));
                this._socket.removeAllListeners();
            });
        };
        this._host = host;
        this._port = port;
        this._tlsPort = tlsPort;
        this._tlsOptions = tlsOptions;
        this._queue = [];
        this._frames = '';
        this._compress = undefined;
    }
}

var Command;
(function (Command) {
    Command["ARTICLE"] = "ARTICLE";
    Command["BODY"] = "BODY";
    Command["CAPABILITIES"] = "CAPABILITIES";
    Command["DATE"] = "DATE";
    Command["GROUP"] = "GROUP";
    Command["HDR"] = "HDR";
    Command["HEAD"] = "HEAD";
    Command["HELP"] = "HELP";
    Command["LAST"] = "LAST";
    Command["LIST"] = "LIST";
    Command["LIST_ACTIVE_TIMES"] = "LIST ACTIVE.TIMES";
    Command["LIST_ACTIVE"] = "LIST ACTIVE";
    Command["LIST_DISTRIB_PATS"] = "LIST DISTRIB.PATS";
    Command["LIST_HEADERS"] = "LIST HEADERS";
    Command["LIST_NEWSGROUPS"] = "LIST NEWSGROUPS";
    Command["LIST_OVERVIEW_FMT"] = "LIST OVERVIEW.FMT";
    Command["LISTGROUP"] = "LISTGROUP";
    Command["MODE_READER"] = "MODE READER";
    Command["NEWGROUPS"] = "NEWGROUPS";
    Command["NEWNEWS"] = "NEWNEWS";
    Command["NEXT"] = "NEXT";
    Command["OVER"] = "OVER";
    Command["POST"] = "POST";
    Command["POST_SEND"] = "POST_SEND";
    Command["IHAVE"] = "IHAVE";
    Command["IHAVE_SEND"] = "IHAVE_SEND";
    Command["QUIT"] = "QUIT";
    Command["STAT"] = "STAT";
    Command["GREETING"] = "GREETING";
    Command["AUTHINFO_USER"] = "AUTHINFO USER";
    Command["AUTHINFO_PASS"] = "AUTHINFO PASS";
    Command["STARTTLS"] = "STARTTLS";
    Command["AUTHINFO_SASL"] = "AUTHINFO SASL";
    Command["COMPRESS"] = "COMPRESS";
    Command["MODE_STREAM"] = "MODE STREAM";
    Command["CHECK"] = "CHECK";
    Command["TAKETHIS"] = "TAKETHIS";
    Command["SLAVE"] = "SLAVE";
})(Command || (Command = {}));
var CapabilityLabel$1;
(function (CapabilityLabel) {
    CapabilityLabel["STARTTLS"] = "STARTTLS";
    CapabilityLabel["AUTHINFO"] = "AUTHINFO";
    CapabilityLabel["READER"] = "READER";
    CapabilityLabel["NEWNEWS"] = "NEWNEWS";
    CapabilityLabel["COMPRESS"] = "COMPRESS";
    CapabilityLabel["POST"] = "POST";
    CapabilityLabel["IHAVE"] = "IHAVE";
    CapabilityLabel["OVER"] = "OVER";
    CapabilityLabel["VERSION"] = "VERSION";
    CapabilityLabel["LIST"] = "LIST";
    CapabilityLabel["IMPLEMENTATION"] = "IMPLEMENTATION";
    CapabilityLabel["STREAMING"] = "STREAMING";
    CapabilityLabel["HDR"] = "HDR";
    CapabilityLabel["MODE_READER"] = "MODE-READER";
})(CapabilityLabel$1 || (CapabilityLabel$1 = {}));

const parseHeaders = (lines) => lines.reduce((obj, line) => {
    const i = line.indexOf(': ');
    obj[line.slice(0, i).toUpperCase()] = line.slice(i + 2);
    return obj;
}, {});
const parseArticle = (lines) => {
    const pivot = lines.indexOf(''); // empty line divides header and article
    return {
        headers: parseHeaders(lines.slice(0, pivot)),
        body: lines.slice(pivot + 1)
    };
};
const parseGroups = (lines) => lines.map(line => {
    // separated from each other by one or more spaces
    const fields = line.split(/ +/);
    return {
        name: fields[0],
        high: parseInt(fields[1]),
        low: parseInt(fields[2]),
        status: fields[3]
    };
});
const parseUnixTime = (unixTime) => new Date(unixTime * 1000).toISOString();
/**
 * TODO: Client should have a list of patterns and capability labels, ie:
 * command 'OVER .*' requires 'OVER' label
 *
 * this is unrelated to response handling and does not belong here
 */
var CapabilityLabel;
(function (CapabilityLabel) {
    CapabilityLabel["MANDATORY"] = "MANDATORY";
    CapabilityLabel["READER"] = "READER";
    CapabilityLabel["NEWNEWS"] = "NEWNEWS";
    CapabilityLabel["COMPRESS"] = "COMPRESS";
    CapabilityLabel["POST"] = "POST";
    CapabilityLabel["IHAVE"] = "IHAVE";
    CapabilityLabel["OVER"] = "OVER";
})(CapabilityLabel || (CapabilityLabel = {}));
const build = (description) => ({
    multiLine: false,
    numberOfArgs: 0,
    callback: args => ({ description })
});
const commands = {
    // 3.2.1  Generic Response Codes
    '*': {
        400: build('service not available or no longer available'),
        401: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                capabilityLabel: args[0],
                description: 'the server is in the wrong mode; the indicated capability should be used to change the mode.'
            })
        },
        403: build('internal fault or problem preventing action being taken'),
        480: build('command unavailable until the client has authenticated itself'),
        483: build('command unavailable until suitable privacy has been arranged'),
        500: build('unknown command'),
        501: build('syntax error in command'),
        502: build('command not permitted (and there is no way for the client to change this)'),
        503: build('feature not supported'),
        504: build('error in base64-encoding [RFC4648] of an argument')
    },
    // 5.1.  Initial Connection
    GREETING: {
        200: build('Service available, posting allowed'),
        201: build('Service available, posting prohibited'),
        400: build('Service temporarily unavailable'),
        502: build('Service permanently unavailable')
    },
    // 5.2.  CAPABILITIES
    CAPABILITIES: {
        101: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => {
                if (!block)
                    throw new Error('block undefined');
                return {
                    description: 'Capability list follows (multi-line)',
                    capabilities: block.lines
                        .map(l => l.toUpperCase()) // tokens are case insensitive
                        .reduce((obj, line) => {
                        const s = line.split(/[ \t]+/); // separated by one or more space or TAB characters
                        obj[s[0]] = s.slice(1);
                        return obj;
                    }, {})
                };
            }
        }
    },
    // 5.3.  MODE READER
    'MODE READER': {
        200: build('Posting allowed'),
        201: build('Posting prohibited'),
        502: build('Reading service permanently unavailable')
    },
    // 5.4.  QUIT
    QUIT: {
        205: build('Connection closing')
    },
    // 6.1.1.  GROUP
    GROUP: {
        211: {
            multiLine: false,
            numberOfArgs: 4,
            callback: args => ({
                description: 'Group successfully selected',
                group: {
                    name: args[3],
                    number: parseInt(args[0]),
                    low: parseInt(args[1]),
                    high: parseInt(args[2])
                }
            })
        },
        411: build('No such newsgroup')
    },
    // 6.1.2.  LISTGROUP
    LISTGROUP: {
        211: {
            multiLine: true,
            numberOfArgs: 4,
            callback: (args, block) => ({
                description: 'Article numbers follow (multi-line)',
                group: {
                    name: args[3],
                    number: parseInt(args[0]),
                    low: parseInt(args[1]),
                    high: parseInt(args[2]),
                    articleNumbers: block.lines.map(n => parseInt(n))
                }
            })
        },
        411: build('No such newsgroup'),
        412: build('No newsgroup selected')
    },
    // 6.1.3.  LAST
    LAST: {
        223: {
            multiLine: false,
            numberOfArgs: 2,
            callback: args => ({
                description: 'Article found',
                article: {
                    articleNumber: parseInt(args[0]),
                    messageId: args[1]
                }
            })
        },
        412: build('No newsgroup selected'),
        420: build('Current article number is invalid'),
        422: build('No previous article in this group')
    },
    // 6.1.4.  NEXT
    NEXT: {
        223: {
            multiLine: false,
            numberOfArgs: 2,
            callback: args => ({
                description: 'Article found',
                article: {
                    articleNumber: parseInt(args[0]),
                    messageId: args[1]
                }
            })
        },
        412: build('No newsgroup selected'),
        420: build('Current article number is invalid'),
        421: build('No next article in this group')
    },
    // 6.2.1.  ARTICLE
    ARTICLE: {
        220: {
            multiLine: true,
            numberOfArgs: 2,
            callback: (args, block) => {
                const { headers, body } = parseArticle(block.lines);
                return {
                    description: 'Article follows (multi-line)',
                    article: {
                        articleNumber: parseInt(args[0]),
                        messageId: args[1],
                        headers,
                        body
                    }
                };
            }
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No article with that number'),
        420: build('Current article number is invalid')
    },
    // 6.2.2.  HEAD
    HEAD: {
        221: {
            multiLine: true,
            numberOfArgs: 2,
            callback: (args, block) => ({
                description: 'Headers follow (multi-line)',
                article: {
                    articleNumber: parseInt(args[0]),
                    messageId: args[1],
                    headers: parseHeaders(block.lines)
                }
            })
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No article with that number'),
        420: build('Current article number is invalid')
    },
    // 6.2.3.  BODY
    BODY: {
        222: {
            multiLine: true,
            numberOfArgs: 2,
            callback: (args, block) => ({
                description: 'Body follows (multi-line)',
                article: {
                    articleNumber: parseInt(args[0]),
                    messageId: args[1],
                    body: block.lines
                }
            })
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No article with that number'),
        420: build('Current article number is invalid')
    },
    // 6.2.4.  STAT
    STAT: {
        223: {
            multiLine: false,
            numberOfArgs: 2,
            callback: args => ({
                description: 'Article exists',
                article: {
                    articleNumber: parseInt(args[0]),
                    messageId: args[1]
                }
            })
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No article with that number'),
        420: build('Current article number is invalid')
    },
    // 6.3.1.  POST
    POST: {
        indicatingCapability: CapabilityLabel.POST,
        340: build('Send article to be posted'),
        440: build('Posting not permitted')
    },
    POST_SEND: {
        240: build('Article received OK'),
        441: build('Posting failed')
    },
    // 6.3.2.  IHAVE
    IHAVE: {
        indicatingCapability: CapabilityLabel.IHAVE,
        335: build('Send article to be transferred'),
        435: build('Article not wanted'),
        436: build('Transfer not possible; try again later')
    },
    IHAVE_SEND: {
        235: build('Article transferred OK'),
        436: build('Transfer failed; try again later'),
        437: build('Transfer rejected; do not retry')
    },
    // 7.1.  DATE
    DATE: {
        111: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => {
                const m = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/.exec(args[0]);
                return {
                    description: 'Server date and time',
                    isoDateTime: new Date(Date.UTC(parseInt(m[1]), parseInt(m[2]) - 1, // mm is the month (01-12)
                    parseInt(m[3]), // dd is the day of the month (01-31)
                    parseInt(m[4]), parseInt(m[5]), parseInt(m[6]))).toISOString()
                };
            }
        }
    },
    // 7.2.  HELP
    HELP: {
        100: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Help text follows (multi-line)',
                text: block.lines
            })
        }
    },
    NEWGROUPS: {
        indicatingCapability: CapabilityLabel.READER,
        231: {
            // Same as LIST ACTIVE
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'List of new newsgroups follows (multi-line)',
                newsgroups: parseGroups(block.lines)
            })
        }
    },
    NEWNEWS: {
        indicatingCapability: CapabilityLabel.NEWNEWS,
        230: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'List of new articles follows (multi-line)',
                messageIds: block.lines
            })
        }
    },
    'LIST ACTIVE': {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Information follows (multi-line)',
                newsgroups: parseGroups(block.lines)
            })
        }
    },
    LIST: {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Information follows (multi-line)',
                newsgroups: parseGroups(block.lines)
            })
        }
    },
    'LIST ACTIVE.TIMES': {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Information follows (multi-line)',
                newsgroups: block.lines.map(line => {
                    const fields = line.split(/ +/);
                    return {
                        name: fields[0],
                        created: parseUnixTime(parseInt(fields[1])),
                        creator: fields[2]
                    };
                })
            })
        }
    },
    'LIST DISTRIB.PATS': {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Information follows (multi-line)',
                distributionPatterns: block.lines.map(line => {
                    const fields = line.split(':');
                    return {
                        weight: parseInt(fields[0]),
                        wildmat: fields[1],
                        distributionHeader: fields[2]
                    };
                })
            })
        }
    },
    'LIST NEWSGROUPS': {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Information follows (multi-line)',
                newsgroups: block.lines.map(line => {
                    const m = /(.+?)([ \t]+(.*))?$/.exec(line);
                    if (!m)
                        throw new Error('Regex not matched');
                    const description = !m[3] ? '' : m[3];
                    return {
                        name: m[1],
                        description
                    };
                })
            })
        }
    },
    OVER: {
        indicatingCapability: CapabilityLabel.OVER,
        224: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Overview information follows (multi-line)',
                articles: block.lines.map(line => {
                    const fields = line.split('\t');
                    const article = {
                        articleNumber: parseInt(fields[0]),
                        headers: {
                            SUBJECT: fields[1],
                            FROM: fields[2],
                            DATE: fields[3],
                            'MESSAGE-ID': fields[4],
                            REFERENCES: fields[5]
                        },
                        metadata: {
                            ':bytes': parseInt(fields[6]),
                            ':lines': parseInt(fields[7])
                        }
                    };
                    for (let i = 8; i < fields.length; i++) {
                        const h = /^([^\s]+): (.*)$/.exec(fields[i]);
                        const m = /^(:.+?) (.*)$/.exec(fields[i]);
                        if (h) {
                            article.headers[h[1].toUpperCase()] = h[2];
                        }
                        else if (m) {
                            article.metadata[m[1].toLowerCase()] = m[2];
                        }
                        else if (fields[i] === '') ;
                        else {
                            throw new Error('Unable to parse header or metadata in OVER command');
                        }
                    }
                    return article;
                })
            })
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No articles in that range'),
        420: build('Current article number is invalid')
    },
    'LIST OVERVIEW.FMT': {
        indicatingCapability: CapabilityLabel.OVER,
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => {
                const lines = block.lines.map(line => {
                    if (line.match(/^Bytes:/i))
                        return ':bytes';
                    if (line.match(/^Lines:/i))
                        return ':lines';
                    return line.replace(/:full$/i, ':');
                });
                const headerFields = lines
                    .filter(line => line.endsWith(':'))
                    .map(line => line.replace(':', '').toUpperCase());
                const metadataFields = lines
                    .filter(line => line.startsWith(':'))
                    .map(line => line.toLowerCase());
                return {
                    description: 'Information follows (multi-line)',
                    headerFields,
                    metadataFields
                };
            }
        }
    },
    HDR: {
        225: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Headers follow (multi-line)',
                articles: block.lines.map(line => {
                    // 1) The line consists of the article number, a space, and then the contents of the field
                    const m = /^(\d+) (.*)$/.exec(line);
                    // 2) the space after the article number MAY be retained or omitted
                    const n = /^(\d+)/.exec(line);
                    if (!m && !n) {
                        throw new Error('Unable to parse field contents in HDR response');
                    }
                    return {
                        articleNumber: parseInt(m ? m[1] : n[1]),
                        fieldContents: m ? m[2] : ''
                    };
                })
            })
        },
        430: build('No article with that message-id'),
        412: build('No newsgroup selected'),
        423: build('No articles in that range'),
        420: build('Current article number is invalid')
    },
    'LIST HEADERS': {
        215: {
            multiLine: true,
            numberOfArgs: 0,
            callback: (args, block) => ({
                description: 'Field list follows (multi-line)',
                fields: block.lines.map(line => line.startsWith(':') ? line.toLowerCase() : line.toUpperCase())
            })
        }
    },
    // [RFC 4642] 2.2. STARTTLS Command
    STARTTLS: {
        382: build('Continue with TLS negotiation'),
        502: build('Command unavailable'),
        580: build('Can not initiate TLS negotiation')
    },
    // [RFC 4643] 2.3.  AUTHINFO USER/PASS Command
    'AUTHINFO USER': {
        281: build('Authentication accepted'),
        381: build('Password required'),
        481: build('Authentication failed/rejected'),
        482: build('Authentication commands issued out of sequence'),
        502: build('Command unavailable')
    },
    'AUTHINFO PASS': {
        281: build('Authentication accepted'),
        481: build('Authentication failed/rejected'),
        482: build('Authentication commands issued out of sequence'),
        502: build('Command unavailable')
    },
    // [RFC 4643] 2.4.  AUTHINFO SASL Command
    'AUTHINFO SASL': {
        281: build('Authentication accepted'),
        283: {
            multiLine: false,
            numberOfArgs: 1,
            callback: (args, block) => ({
                description: 'Authentication accepted (with success data)',
                challenge: args[0]
            })
        },
        383: {
            multiLine: false,
            numberOfArgs: 1,
            callback: (args, block) => ({
                description: 'Continue with SASL exchange',
                challenge: args[0]
            })
        },
        481: build('Authentication failed/rejected'),
        482: build('SASL protocol error'),
        502: build('Command unavailable')
    },
    // [rfc8054] 2.2.  COMPRESS Command
    COMPRESS: {
        206: build('compression layer activated'),
        403: build('Unable to activate compression'),
        502: build('Command unavailable')
    },
    // [rfc4644] 2.3.  MODE STREAM Command
    'MODE STREAM': {
        203: build('Streaming permitted')
    },
    // [rfc4644] 2.4.  CHECK Command
    CHECK: {
        238: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                description: 'Send article to be transferred',
                article: {
                    messageId: args[0]
                }
            })
        },
        431: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                description: 'Transfer not possible; try again later',
                article: {
                    messageId: args[0]
                }
            })
        },
        438: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                description: 'Article not wanted',
                article: {
                    messageId: args[0]
                }
            })
        }
    },
    // [rfc4644] 2.5.  TAKETHIS Command
    TAKETHIS: {
        239: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                description: 'Article transferred OK',
                article: {
                    messageId: args[0]
                }
            })
        },
        439: {
            multiLine: false,
            numberOfArgs: 1,
            callback: args => ({
                description: 'Transfer rejected; do not retry',
                article: {
                    messageId: args[0]
                }
            })
        }
    },
    // [rfc977] 3.12.  The SLAVE command
    SLAVE: {
        202: build('slave status noted')
    }
};
const addHandler = (command, code, handler) => {
    commands[command] = commands[command] || {};
    commands[command][code] = handler;
};
const findHandler = (command, code) => {
    const cmd = commands[command];
    if (!cmd) {
        return commands['*'][code];
    }
    return cmd[code] ? cmd[code] : commands['*'][code];
};

const parseLine = (reply) => {
    const m = /^(.*?\r\n)/.exec(reply);
    return m ? m[1] : undefined;
};
const parseCode = (reply) => {
    const m = /^(\d{3}).*?\r\n/.exec(reply);
    return m ? parseInt(m[1]) : undefined;
};
const parseBlock = (reply) => {
    // empty block
    if (reply.startsWith('.\r\n')) {
        return { lines: [], _i: 3 };
    }
    // non-empty block
    const i = reply.indexOf('\r\n.\r\n');
    if (i === -1)
        return undefined;
    const block = reply.slice(0, i);
    const lines = block.split('\r\n').map(l => (l.startsWith('.') ? l.slice(1) : l)); // "dot-stuffing" MUST be undone
    return { lines, _i: i + 5 };
};
const parseArgs = (line, numArgs) => {
    const s = line.slice(0, line.length - 2).split(' ');
    const args = s.slice(1, numArgs + 1);
    const comment = s.slice(numArgs + 1).join(' ');
    return { args, comment };
};
const parse$2 = (command, buffer) => {
    const line = parseLine(buffer);
    if (!line)
        return undefined;
    const code = parseCode(line);
    if (!code)
        return undefined;
    const handler = findHandler(command, code);
    if (!handler)
        throw new Error(`Unhandled command ${command} and code ${code} combination`);
    let block;
    if (handler.multiLine) {
        block = parseBlock(buffer.slice(line.length));
        if (!block)
            return undefined;
    }
    const parsedArgs = parseArgs(line, handler.numberOfArgs);
    const response = handler.callback(parsedArgs.args, block);
    return {
        _i: line.length + (block ? block._i : 0),
        code,
        comment: parsedArgs.comment,
        ...response
    };
};

const rangeToString = (range) => `${range.start}-${range.end ? range.end : ''}`;
/** Converts ISO 8601 strings to { date: yyyymmdd, time: hhmmss } format */
const parseIsoString = (isoDateTime) => {
    const parsed = new Date(Date.parse(isoDateTime));
    if (!parsed)
        throw new Error('Invalid date');
    const year = `${parsed.getUTCFullYear()}`;
    const month = `${parsed.getUTCMonth() + 1}`.padStart(2, '0');
    const day = `${parsed.getUTCDate()}`.padStart(2, '0');
    const date = year + month + day;
    const hours = `${parsed.getUTCHours()}`.padStart(2, '0');
    const minutes = `${parsed.getUTCMinutes()}`.padStart(2, '0');
    const seconds = `${parsed.getUTCSeconds()}`.padStart(2, '0');
    const time = hours + minutes + seconds;
    return { date, time };
};
const articleToString = (article) => [
    ...Object.keys(article.headers).map((h) => `${h}: ${article.headers[h]}`),
    '',
    ...article.body.map(line => (line.startsWith('.') ? `.${line}` : line)),
    '.',
    ''
].join('\r\n');
const encode$2 = (data) => n$2.from(data).toString('base64');
class Client {
    constructor(options) {
        this.connect = async () => {
            const socket = await this._connection.connect();
            const response = await this.sendData(Command.GREETING);
            return {
                ...response,
                socket
            };
        };
        this.disconnect = () => this._connection.disconnect();
        this.command = (command, ...args) => {
            return this.sendData(command, [command].concat(args.filter(arg => !!arg)).join(' ') + '\r\n');
        };
        // RFC 2980
        // xreplic = () => {}
        // listSubscriptions = () => {}
        // xgtitle = (wildmat?: string) => {} // note: conflict in response codes
        // xhdr = () => {}
        // xindex = () => {}
        // xover = () => {}
        // xpat = () => {}
        // xpath = () => {}
        // xrover = () => {}
        // xthread = () => {}
        // RFC 6048
        // public listCounts = () => {}
        // public listDistributions = () => {}
        // public listModerators = () => {}
        // public listMessageOfTheDay = () => {}
        // public listSubscriptions = () => {}
        // and list active additions
        /**
         * TODO: should reject an Error object
         */
        this.sendData = async (command, payload) => {
            const p = new Promise((resolve, reject) => {
                this._connection.addCallback((text) => parse$2(command, text), resolve, reject);
            });
            if (payload) {
                await this._connection.write(payload);
            }
            return p
                .then(this._interceptor)
                .then(response => (response.code < 400 ? response : Promise.reject(response)));
        };
        const { host, port = 119, tlsPort = false, responseInterceptor = (r) => r, tlsOptions = {} } = options;
        this._connection = new Connection(host, port, tlsPort, tlsOptions);
        this._interceptor = responseInterceptor;
      this.list = Client.prototype.list;
      this.group = Client.prototype.group;
      this.newgroups = Client.prototype.newgroups;
      this.newnews = Client.prototype.newnews;
      this.listActive = Client.prototype.listActive;
      this.listNewsgroups = Client.prototype.listNewsgroups;
      this.listOverviewFmt = Client.prototype.listOverviewFmt;
      this.hdr = Client.prototype.hdr;
      this.listHeaders = Client.prototype.listHeaders;
      this.last = Client.prototype.last;
      this.next = Client.prototype.next;
      this.listActiveTimes = Client.prototype.listActiveTimes;
      this.listDistribPats = Client.prototype.listDistribPats;
      this.listGroup = Client.prototype.listGroup;
      this.article = Client.prototype.article;
      this.head = Client.prototype.head;
      this.body = Client.prototype.body;
      this.stat = Client.prototype.stat;
      this.over = Client.prototype.over;
      this.post = Client.prototype.post;
      this.ihave = Client.prototype.ihave;
      this.check = Client.prototype.check;
      this.help = Client.prototype.help;
      this.capabilities = Client.prototype.capabilities;
      this.date = Client.prototype.date;
      this.modeReader = Client.prototype.modeReader;
      this.quit = Client.prototype.quit;
      this.modeStream = Client.prototype.modeStream;
      this.slave = Client.prototype.slave;
      this.compressDeflate = Client.prototype.compressDeflate;
    }
}
function rfc977() {
    /**
     * @deprecated from RFC 977 removed in RFC 3977
     */
    Client.prototype.slave = function () {
        return this.command(Command.SLAVE);
    };
}
function rfc3977() {
    // 5.  Session Administration Commands
    Client.prototype.capabilities = function (keyword) {
        return this.command(Command.CAPABILITIES, keyword);
    };
    Client.prototype.modeReader = function () {
        return this.command(Command.MODE_READER);
    };
    Client.prototype.quit = function () {
        return this.command(Command.QUIT);
    };
    // 6.  Article Posting and Retrieval
    Client.prototype.group = function (group) {
        return this.command(Command.GROUP, group);
    };
    Client.prototype.listGroup = function (group, range) {
        if (!group && range)
            throw new Error('Cannot define range without group');
        return this.command(Command.LISTGROUP, group, range && rangeToString(range));
    };
    Client.prototype.last = function () {
        return this.command(Command.LAST);
    };
    Client.prototype.next = function () {
        return this.command(Command.NEXT);
    };
    Client.prototype.article = function (articleNumberOrMessageId) {
        return this.command(Command.ARTICLE, articleNumberOrMessageId ? `${articleNumberOrMessageId}` : undefined);
    };
    Client.prototype.head = function (articleNumberOrMessageId) {
        return this.command(Command.HEAD, articleNumberOrMessageId ? `${articleNumberOrMessageId}` : undefined);
    };
    Client.prototype.body = function (articleNumberOrMessageId) {
        return this.command(Command.BODY, articleNumberOrMessageId ? `${articleNumberOrMessageId}` : undefined);
    };
    Client.prototype.stat = function (articleNumberOrMessageId) {
        return this.command(Command.STAT, articleNumberOrMessageId ? `${articleNumberOrMessageId}` : undefined);
    };
    Client.prototype.post = function () {
        return this.command(Command.POST).then(response => ({
            ...response,
            send: (article) => this.sendData(Command.POST_SEND, articleToString(article))
        }));
    };
    Client.prototype.ihave = function (messageId) {
        return this.command(Command.IHAVE, messageId).then(response => ({
            ...response,
            send: (article) => this.sendData(Command.IHAVE_SEND, articleToString(article))
        }));
    };
    // 7.  Information Commands
    Client.prototype.date = function () {
        return this.command(Command.DATE);
    };
    Client.prototype.help = function () {
        return this.command(Command.HELP);
    };
    Client.prototype.newgroups = function (isoDateTime) {
        const { date, time } = parseIsoString(isoDateTime);
        return this.command(Command.NEWGROUPS, date, time, 'GMT');
    };
    Client.prototype.newnews = function (wildmat, isoDateTime) {
        const { date, time } = parseIsoString(isoDateTime);
        return this.command(Command.NEWNEWS, wildmat, date, time, 'GMT');
    };
    Client.prototype.list = function () {
        return this.command(Command.LIST);
    };
    Client.prototype.listActive = function (wildmat) {
        return this.command(Command.LIST_ACTIVE, wildmat);
    };
    Client.prototype.listActiveTimes = function (wildmat) {
        return this.command(Command.LIST_ACTIVE_TIMES, wildmat);
    };
    Client.prototype.listDistribPats = function (wildmat) {
        return this.command(Command.LIST_DISTRIB_PATS, wildmat);
    };
    Client.prototype.listNewsgroups = function (wildmat) {
        return this.command(Command.LIST_NEWSGROUPS, wildmat);
    };
    // 8.  Article Field Access Commands
    Client.prototype.over = function (messageIdOrRange) {
        const params = [];
        if (typeof messageIdOrRange === 'string' || messageIdOrRange instanceof String) {
            params.push(messageIdOrRange);
        }
        if (typeof messageIdOrRange === 'number' || messageIdOrRange instanceof Number) {
            params.push(`${messageIdOrRange}`);
        }
        if (messageIdOrRange instanceof Object) {
            params.push(rangeToString(messageIdOrRange));
        }
        return this.command(Command.OVER, ...params);
    };
    Client.prototype.listOverviewFmt = function (wildmat) {
        return this.command(Command.LIST_OVERVIEW_FMT, wildmat);
    };
    Client.prototype.hdr = function (field, messageIdOrRange) {
        const params = [field];
        if (typeof messageIdOrRange === 'string' || messageIdOrRange instanceof String) {
            params.push(messageIdOrRange);
        }
        if (messageIdOrRange instanceof Object) {
            params.push(rangeToString(messageIdOrRange));
        }
        return this.command(Command.HDR, ...params);
    };
    Client.prototype.listHeaders = function (argument) {
        return this.command(Command.LIST_HEADERS, argument);
    };
}
function rfc4642() {
    Client.prototype.startTls = function () {
        return this.command(Command.STARTTLS).then(async (response) => ({
            ...response,
            socket: await this._connection.upgradeTls()
        }));
    };
}
function rfc4643() {
    Client.prototype.authInfoUser = function (username) {
        return this.command(Command.AUTHINFO_USER, username).then(response => response.code === 381
            ? {
                ...response,
                authInfoPass: (password) => this.command(Command.AUTHINFO_PASS, password)
            }
            : response);
    };
    Client.prototype.authInfoSasl = function (mechanism, initialResponse) {
        const addMethods = (response) => response.code === 383
            ? {
                ...response,
                continue: (clientResponse) => this.sendData(Command.AUTHINFO_SASL, `${clientResponse}\r\n`).then(addMethods),
                cancel: () => this.sendData(Command.AUTHINFO_SASL, '*\r\n')
            }
            : response;
        return this.command(Command.AUTHINFO_SASL, mechanism, initialResponse).then(addMethods);
    };
    /**
     * https://tools.ietf.org/html/rfc4616
     */
    Client.prototype.authInfoSaslPlain = function (authzid, authcid, passwd) {
        const initialResponse = encode$2(`${authzid || ''}\u0000${authcid}\u0000${passwd}`);
        return this.authInfoSasl('PLAIN', initialResponse);
    };
}
function rfc8054() {
    /**
     * WARNING: compression over TLS leaks information to eavesdroppers. Can still
     * improve efficiency if you're okay with information leaks.
     *
     * TODO: implement compression in Connection (it doesn't work yet)
     */
    Client.prototype.compressDeflate = async function () {
        const response = await this.command(Command.COMPRESS, 'DEFLATE');
        this._connection.enableCompression();
        return response;
    };
}
function rfc4644() {
    Client.prototype.modeStream = function () {
        return this.command(Command.MODE_STREAM);
    };
    Client.prototype.check = function (messageId) {
        return this.command(Command.CHECK, messageId);
    };
    Client.prototype.takeThis = function (article) {
        return this.sendData(Command.TAKETHIS, `${Command.TAKETHIS} ${article.messageId}\r\n${articleToString(article)}`);
    };
}
rfc977();
rfc3977();
rfc4642();
rfc4643();
rfc8054();
rfc4644();

/*! For license information please see buffer.js.LICENSE.txt */
var t={483:(t,e,r)=>{const n=r(525),o=r(921),i="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.lW=u,e.bY=g,e.h2=50,e.ZP={Buffer:u,SlowBuffer:g,INSPECT_MAX_BYTES:50};const f=2147483647;function s(t){if(t>f)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,u.prototype),e}function u(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,e,r)}function h(t,e,r){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|w(t,e);let n=s(r);const o=n.write(t,e);return o!==r&&(n=n.slice(0,o)),n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(X(t,Uint8Array)){const e=new Uint8Array(t);return l(e.buffer,e.byteOffset,e.byteLength)}return p(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(X(t,ArrayBuffer)||t&&X(t.buffer,ArrayBuffer))return l(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(X(t,SharedArrayBuffer)||t&&X(t.buffer,SharedArrayBuffer)))return l(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return u.from(n,e,r);const o=function(t){if(u.isBuffer(t)){const e=0|y(t.length),r=s(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||J(t.length)?s(0):p(t):"Buffer"===t.type&&Array.isArray(t.data)?p(t.data):void 0}(t);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return a(t),s(t<0?0:0|y(t))}function p(t){const e=t.length<0?0:0|y(t.length),r=s(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function l(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,u.prototype),n}function y(t){if(t>=f)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+f.toString(16)+" bytes");return 0|t}function g(t){return +t!=t&&(t=0),u.alloc(+t)}function w(t,e){if(u.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||X(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return q(t).length;default:if(o)return n?-1:W(t).length;e=(""+e).toLowerCase(),o=!0;}}function d(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return "";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return "";if((r>>>=0)<=(e>>>=0))return "";for(t||(t="utf8");;)switch(t){case"hex":return _(this,e,r);case"utf8":case"utf-8":return T(this,e,r);case"ascii":return L(this,e,r);case"latin1":case"binary":return S(this,e,r);case"base64":return R(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return x(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function b(t,e,r){const n=t[e];t[e]=t[r],t[r]=n;}function B(t,e,r,n,o){if(0===t.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),J(r=+r)&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(o)return -1;r=t.length-1;}else if(r<0){if(!o)return -1;r=0;}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:E(t,e,r,n,o);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):E(t,[e],r,n,o);throw new TypeError("val must be string, number or Buffer")}function E(t,e,r,n,o){let i,f=1,s=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return -1;f=2,s/=2,u/=2,r/=2;}function h(t,e){return 1===f?t[e]:t.readUInt16BE(e*f)}if(o){let n=-1;for(i=r;i<s;i++)if(h(t,i)===h(e,-1===n?0:i-n)){if(-1===n&&(n=i),i-n+1===u)return n*f}else -1!==n&&(i-=i-n),n=-1;}else for(r+u>s&&(r=s-u),i=r;i>=0;i--){let r=!0;for(let n=0;n<u;n++)if(h(t,i+n)!==h(e,n)){r=!1;break}if(r)return i}return -1}function m(t,e,r,n){r=Number(r)||0;const o=t.length-r;n?(n=Number(n))>o&&(n=o):n=o;const i=e.length;let f;for(n>i/2&&(n=i/2),f=0;f<n;++f){const n=parseInt(e.substr(2*f,2),16);if(J(n))return f;t[r+f]=n;}return f}function A(t,e,r,n){return K(W(e,t.length-r),t,r,n)}function I(t,e,r,n){return K(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function U(t,e,r,n){return K(q(e),t,r,n)}function v(t,e,r,n){return K(function(t,e){let r,n,o;const i=[];for(let f=0;f<t.length&&!((e-=2)<0);++f)r=t.charCodeAt(f),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(e,t.length-r),t,r,n)}function R(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function T(t,e,r){r=Math.min(t.length,r);const n=[];let o=e;for(;o<r;){const e=t[o];let i=null,f=e>239?4:e>223?3:e>191?2:1;if(o+f<=r){let r,n,s,u;switch(f){case 1:e<128&&(i=e);break;case 2:r=t[o+1],128==(192&r)&&(u=(31&e)<<6|63&r,u>127&&(i=u));break;case 3:r=t[o+1],n=t[o+2],128==(192&r)&&128==(192&n)&&(u=(15&e)<<12|(63&r)<<6|63&n,u>2047&&(u<55296||u>57343)&&(i=u));break;case 4:r=t[o+1],n=t[o+2],s=t[o+3],128==(192&r)&&128==(192&n)&&128==(192&s)&&(u=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&s,u>65535&&u<1114112&&(i=u));}}null===i?(i=65533,f=1):i>65535&&(i-=65536,n.push(i>>>10&1023|55296),i=56320|1023&i),n.push(i),o+=f;}return function(t){const e=t.length;if(e<=O)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=O));return r}(n)}e.ZK=f,u.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return !1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),u.poolSize=8192,u.from=function(t,e,r){return h(t,e,r)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(t,e,r){return function(t,e,r){return a(t),t<=0?s(t):void 0!==e?"string"==typeof r?s(t).fill(e,r):s(t).fill(e):s(t)}(t,e,r)},u.allocUnsafe=function(t){return c(t)},u.allocUnsafeSlow=function(t){return c(t)},u.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u.prototype},u.compare=function(t,e){if(X(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),X(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let o=0,i=Math.min(r,n);o<i;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},u.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=u.allocUnsafe(e);let o=0;for(r=0;r<t.length;++r){let e=t[r];if(X(e,Uint8Array))o+e.length>n.length?(u.isBuffer(e)||(e=u.from(e.buffer,e.byteOffset,e.byteLength)),e.copy(n,o)):Uint8Array.prototype.set.call(n,e,o);else {if(!u.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,o);}o+=e.length;}return n},u.byteLength=w,u.prototype._isBuffer=!0,u.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)b(this,e,e+1);return this},u.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)b(this,e,e+3),b(this,e+1,e+2);return this},u.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)b(this,e,e+7),b(this,e+1,e+6),b(this,e+2,e+5),b(this,e+3,e+4);return this},u.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?T(this,0,t):d.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){let t="";const r=e.h2;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},i&&(u.prototype[i]=u.prototype.inspect),u.prototype.compare=function(t,e,r,n,o){if(X(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),e<0||r>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&e>=r)return 0;if(n>=o)return -1;if(e>=r)return 1;if(this===t)return 0;let i=(o>>>=0)-(n>>>=0),f=(r>>>=0)-(e>>>=0);const s=Math.min(i,f),h=this.slice(n,o),a=t.slice(e,r);for(let t=0;t<s;++t)if(h[t]!==a[t]){i=h[t],f=a[t];break}return i<f?-1:f<i?1:0},u.prototype.includes=function(t,e,r){return -1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return B(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return B(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else {if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);}const o=this.length-e;if((void 0===r||r>o)&&(r=o),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let i=!1;for(;;)switch(n){case"hex":return m(this,t,e,r);case"utf8":case"utf-8":return A(this,t,e,r);case"ascii":case"latin1":case"binary":return I(this,t,e,r);case"base64":return U(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,t,e,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0;}},u.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const O=4096;function L(t,e,r){let n="";r=Math.min(t.length,r);for(let o=e;o<r;++o)n+=String.fromCharCode(127&t[o]);return n}function S(t,e,r){let n="";r=Math.min(t.length,r);for(let o=e;o<r;++o)n+=String.fromCharCode(t[o]);return n}function _(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let o="";for(let n=e;n<r;++n)o+=H[t[n]];return o}function x(t,e,r){const n=t.slice(e,r);let o="";for(let t=0;t<n.length-1;t+=2)o+=String.fromCharCode(n[t]+256*n[t+1]);return o}function C(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function $(t,e,r,n,o,i){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function M(t,e,r,n,o){z(e,n,o,t,r,7);let i=Number(e&BigInt(4294967295));t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i,i>>=8,t[r++]=i;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,f>>=8,t[r++]=f,r}function N(t,e,r,n,o){z(e,n,o,t,r,7);let i=Number(e&BigInt(4294967295));t[r+7]=i,i>>=8,t[r+6]=i,i>>=8,t[r+5]=i,i>>=8,t[r+4]=i;let f=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=f,f>>=8,t[r+2]=f,f>>=8,t[r+1]=f,f>>=8,t[r]=f,r+8}function P(t,e,r,n,o,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function k(t,e,r,n,i){return e=+e,r>>>=0,i||P(t,0,r,4),o.write(t,e,r,n,23,4),r+4}function j(t,e,r,n,i){return e=+e,r>>>=0,i||P(t,0,r,8),o.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,u.prototype),n},u.prototype.readUintLE=u.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t],o=1,i=0;for(;++i<e&&(o*=256);)n+=this[t+i]*o;return n},u.prototype.readUintBE=u.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t+--e],o=1;for(;e>0&&(o*=256);)n+=this[t+--e]*o;return n},u.prototype.readUint8=u.prototype.readUInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),this[t]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readBigUInt64LE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,o=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(o)<<BigInt(32))})),u.prototype.readBigUInt64BE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],o=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return (BigInt(n)<<BigInt(32))+BigInt(o)})),u.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=this[t],o=1,i=0;for(;++i<e&&(o*=256);)n+=this[t+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||C(t,e,this.length);let n=e,o=1,i=this[t+--n];for(;n>0&&(o*=256);)i+=this[t+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},u.prototype.readInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){t>>>=0,e||C(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){t>>>=0,e||C(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readBigInt64LE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return (BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),u.prototype.readBigInt64BE=Q((function(t){G(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||Z(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return (BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),u.prototype.readFloatLE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!1,52,8)},u.prototype.writeUintLE=u.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||$(this,t,e,r,Math.pow(2,8*r)-1,0);let o=1,i=0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||$(this,t,e,r,Math.pow(2,8*r)-1,0);let o=r-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUint8=u.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,1,255,0),this[e]=255&t,e+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigUInt64LE=Q((function(t,e=0){return M(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeBigUInt64BE=Q((function(t,e=0){return N(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);$(this,t,e,r,n-1,-n);}let o=0,i=1,f=0;for(this[e]=255&t;++o<r&&(i*=256);)t<0&&0===f&&0!==this[e+o-1]&&(f=1),this[e+o]=(t/i>>0)-f&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);$(this,t,e,r,n-1,-n);}let o=r-1,i=1,f=0;for(this[e+o]=255&t;--o>=0&&(i*=256);)t<0&&0===f&&0!==this[e+o+1]&&(f=1),this[e+o]=(t/i>>0)-f&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||$(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigInt64LE=Q((function(t,e=0){return M(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeBigInt64BE=Q((function(t,e=0){return N(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeFloatLE=function(t,e,r){return k(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return k(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return j(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return j(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(!u.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const o=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),o},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e);}}else "number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else {const i=u.isBuffer(t)?t:u.from(t,n),f=i.length;if(0===f)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=i[o%f];}return this};const F={};function D(t,e,r){F[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name;}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0});}toString(){return `${this.name} [${t}]: ${this.message}`}};}function Y(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return `${t.slice(0,r)}${e}`}function z(t,e,r,n,o,i){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let o;throw o=i>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(i+1)}${n}`:`>= -(2${n} ** ${8*(i+1)-1}${n}) and < 2 ** ${8*(i+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new F.ERR_OUT_OF_RANGE("value",o,t)}!function(t,e,r){G(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||Z(e,t.length-(r+1));}(n,o,i);}function G(t,e){if("number"!=typeof t)throw new F.ERR_INVALID_ARG_TYPE(e,"number",t)}function Z(t,e,r){if(Math.floor(t)!==t)throw G(t,r),new F.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new F.ERR_BUFFER_OUT_OF_BOUNDS;throw new F.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}D("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),D("ERR_INVALID_ARG_TYPE",(function(t,e){return `The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),D("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,o=r;return Number.isInteger(r)&&Math.abs(r)>2**32?o=Y(String(r)):"bigint"==typeof r&&(o=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(o=Y(o)),o+="n"),n+=` It must be ${e}. Received ${o}`,n}),RangeError);const V=/[^+/0-9A-Za-z-_]/g;function W(t,e){let r;e=e||1/0;const n=t.length;let o=null;const i=[];for(let f=0;f<n;++f){if(r=t.charCodeAt(f),r>55295&&r<57344){if(!o){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(f+1===n){(e-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320);}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;i.push(r);}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128);}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128);}else {if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128);}}return i}function q(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(V,"")).length<2)return "";for(;t.length%4!=0;)t+="=";return t}(t))}function K(t,e,r,n){let o;for(o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}function X(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function J(t){return t!=t}const H=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let o=0;o<16;++o)e[n+o]=t[r]+t[o];}return e}();function Q(t){return "undefined"==typeof BigInt?tt:t}function tt(){throw new Error("BigInt not supported")}},525:(t,e)=>{e.byteLength=function(t){var e=s(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,i=s(t),f=i[0],u=i[1],h=new o(function(t,e,r){return 3*(e+r)/4-r}(0,f,u)),a=0,c=u>0?f-4:f;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],h[a++]=e>>16&255,h[a++]=e>>8&255,h[a++]=255&e;return 2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,h[a++]=255&e),1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,h[a++]=e>>8&255,h[a++]=255&e),h},e.fromByteArray=function(t){for(var e,n=t.length,o=n%3,i=[],f=16383,s=0,h=n-o;s<h;s+=f)i.push(u(t,s,s+f>h?h:s+f));return 1===o?(e=t[n-1],i.push(r[e>>2]+r[e<<4&63]+"==")):2===o&&(e=(t[n-2]<<8)+t[n-1],i.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"=")),i.join("")};for(var r=[],n=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0;f<64;++f)r[f]=i[f],n[i.charCodeAt(f)]=f;function s(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return -1===r&&(r=e),[r,r===e?0:4-r%4]}function u(t,e,n){for(var o,i,f=[],s=e;s<n;s+=3)o=(t[s]<<16&16711680)+(t[s+1]<<8&65280)+(255&t[s+2]),f.push(r[(i=o)>>18&63]+r[i>>12&63]+r[i>>6&63]+r[63&i]);return f.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63;},921:(t,e)=>{e.read=function(t,e,r,n,o){let i,f;const s=8*o-n-1,u=(1<<s)-1,h=u>>1;let a=-7,c=r?o-1:0;const p=r?-1:1;let l=t[e+c];for(c+=p,i=l&(1<<-a)-1,l>>=-a,a+=s;a>0;)i=256*i+t[e+c],c+=p,a-=8;for(f=i&(1<<-a)-1,i>>=-a,a+=n;a>0;)f=256*f+t[e+c],c+=p,a-=8;if(0===i)i=1-h;else {if(i===u)return f?NaN:1/0*(l?-1:1);f+=Math.pow(2,n),i-=h;}return (l?-1:1)*f*Math.pow(2,i-n)},e.write=function(t,e,r,n,o,i){let f,s,u,h=8*i-o-1;const a=(1<<h)-1,c=a>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0;let l=n?0:i-1;const y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,f=a):(f=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-f))<1&&(f--,u*=2),(e+=f+c>=1?p/u:p*Math.pow(2,1-c))*u>=2&&(f++,u/=2),f+c>=a?(s=0,f=a):f+c>=1?(s=(e*u-1)*Math.pow(2,o),f+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,o),f=0));o>=8;)t[r+l]=255&s,l+=y,s/=256,o-=8;for(f=f<<o|s,h+=o;h>0;)t[r+l]=255&f,l+=y,f/=256,h-=8;t[r+l-y]|=128*g;};}},e={},r=function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}(483),n$1=r.lW;r.h2;r.bY;var f=r.ZP;r.ZK;

var n={2737:(t,e,r)=>{var o=r(8750),n=r(4573),i=n(o("String.prototype.indexOf"));t.exports=function(t,e){var r=o(t,!!e);return "function"==typeof r&&i(t,".prototype.")>-1?n(r):r};},4573:(t,e,r)=>{var o=r(132),n=r(8750),i=n("%Function.prototype.apply%"),a=n("%Function.prototype.call%"),u=n("%Reflect.apply%",!0)||o.call(a,i),p=n("%Object.getOwnPropertyDescriptor%",!0),c=n("%Object.defineProperty%",!0),l=n("%Math.max%");if(c)try{c({},"a",{value:1});}catch(t){c=null;}t.exports=function(t){var e=u(o,a,arguments);return p&&c&&p(e,"length").configurable&&c(e,"length",{value:1+l(0,t.length-(arguments.length-1))}),e};var f=function(){return u(o,i,arguments)};c?c(t.exports,"apply",{value:f}):t.exports.apply=f;},7392:(t,e,r)=>{var o=r(4733),n="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),i=Object.prototype.toString,a=Array.prototype.concat,u=Object.defineProperty,p=r(1365)(),c=u&&p,l=function(t,e,r,o){if(e in t)if(!0===o){if(t[e]===r)return}else if("function"!=typeof(n=o)||"[object Function]"!==i.call(n)||!o())return;var n;c?u(t,e,{configurable:!0,enumerable:!1,value:r,writable:!0}):t[e]=r;},f=function(t,e){var r=arguments.length>2?arguments[2]:{},i=o(e);n&&(i=a.call(i,Object.getOwnPropertySymbols(e)));for(var u=0;u<i.length;u+=1)l(t,i[u],e[i[u]],r[i[u]]);};f.supportsDescriptors=!!c,t.exports=f;},1919:(t,e,r)=>{var o=r(6597),n=r(3512),i=r(2435),a=r(1819),u=r(7057),p=r(8429),c=r(5627),l=r(9517),f=r(8750),y=r(4602),s=r(1365)(),b=f("%Error%");function g(t,e){var r=new b(e);c(r,h),delete r.constructor;var i=p(t,y({AdvanceStringIndex:o,GetMethod:a,IsArray:u,Type:l},t));return n(r,"errors",i),r}s&&Object.defineProperty(g,"prototype",{writable:!1});var h=g.prototype;if(!i(h,"constructor",g)||!i(h,"message","")||!i(h,"name","AggregateError"))throw new b("unable to install AggregateError.prototype properties; please report this!");c(g.prototype,Error.prototype),t.exports=g;},216:(t,e,r)=>{var o=r(132),n=r(7392),i=r(222).functionsHaveConfigurableNames(),a=r(1919),u=r(6810),p=r(116),c=u(),l=o.call(c);Object.defineProperty&&(i&&Object.defineProperty(l,"name",{value:c.name}),Object.defineProperty(l,"prototype",{value:c.prototype})),n(l,{getPolyfill:u,implementation:a,shim:p}),t.exports=l;},6810:(t,e,r)=>{var o=r(1919);t.exports=function(){return "function"==typeof AggregateError?AggregateError:o};},116:(t,e,r)=>{var o=r(7392),n=r(1913)(),i=r(6810);t.exports=function(){var t=i();return o(n,{AggregateError:t},{AggregateError:function(){return n.AggregateError!==t}}),t};},8458:t=>{var e=Array.prototype.slice,r=Object.prototype.toString;t.exports=function(t){var o=this;if("function"!=typeof o||"[object Function]"!==r.call(o))throw new TypeError("Function.prototype.bind called on incompatible "+o);for(var n,i=e.call(arguments,1),a=Math.max(0,o.length-i.length),u=[],p=0;p<a;p++)u.push("$"+p);if(n=Function("binder","return function ("+u.join(",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof n){var r=o.apply(this,i.concat(e.call(arguments)));return Object(r)===r?r:this}return o.apply(t,i.concat(e.call(arguments)))})),o.prototype){var c=function(){};c.prototype=o.prototype,n.prototype=new c,c.prototype=null;}return n};},132:(t,e,r)=>{var o=r(8458);t.exports=Function.prototype.bind||o;},222:t=>{var e=function(){return "string"==typeof function(){}.name},r=Object.getOwnPropertyDescriptor;if(r)try{r([],"length");}catch(t){r=null;}e.functionsHaveConfigurableNames=function(){if(!e()||!r)return !1;var t=r((function(){}),"name");return !!t&&!!t.configurable};var o=Function.prototype.bind;e.boundFunctionsHaveNames=function(){return e()&&"function"==typeof o&&""!==function(){}.bind().name},t.exports=e;},8750:(t,e,r)=>{var o,n=SyntaxError,i=Function,a=TypeError,u=function(t){try{return i('"use strict"; return ('+t+").constructor;")()}catch(t){}},p=Object.getOwnPropertyDescriptor;if(p)try{p({},"");}catch(t){p=null;}var c=function(){throw new a},l=p?function(){try{return c}catch(t){try{return p(arguments,"callee").get}catch(t){return c}}}():c,f=r(679)(),y=r(2574)(),s=Object.getPrototypeOf||(y?function(t){return t.__proto__}:null),b={},g="undefined"!=typeof Uint8Array&&s?s(Uint8Array):o,h={"%AggregateError%":"undefined"==typeof AggregateError?o:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?o:ArrayBuffer,"%ArrayIteratorPrototype%":f&&s?s([][Symbol.iterator]()):o,"%AsyncFromSyncIteratorPrototype%":o,"%AsyncFunction%":b,"%AsyncGenerator%":b,"%AsyncGeneratorFunction%":b,"%AsyncIteratorPrototype%":b,"%Atomics%":"undefined"==typeof Atomics?o:Atomics,"%BigInt%":"undefined"==typeof BigInt?o:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?o:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?o:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?o:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?o:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?o:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?o:FinalizationRegistry,"%Function%":i,"%GeneratorFunction%":b,"%Int8Array%":"undefined"==typeof Int8Array?o:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?o:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?o:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":f&&s?s(s([][Symbol.iterator]())):o,"%JSON%":"object"==typeof JSON?JSON:o,"%Map%":"undefined"==typeof Map?o:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&f&&s?s((new Map)[Symbol.iterator]()):o,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?o:Promise,"%Proxy%":"undefined"==typeof Proxy?o:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?o:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?o:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&f&&s?s((new Set)[Symbol.iterator]()):o,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?o:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":f&&s?s(""[Symbol.iterator]()):o,"%Symbol%":f?Symbol:o,"%SyntaxError%":n,"%ThrowTypeError%":l,"%TypedArray%":g,"%TypeError%":a,"%Uint8Array%":"undefined"==typeof Uint8Array?o:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?o:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?o:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?o:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?o:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?o:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?o:WeakSet};if(s)try{null.error;}catch(t){var d=s(s(t));h["%Error.prototype%"]=d;}var m=function t(e){var r;if("%AsyncFunction%"===e)r=u("async function () {}");else if("%GeneratorFunction%"===e)r=u("function* () {}");else if("%AsyncGeneratorFunction%"===e)r=u("async function* () {}");else if("%AsyncGenerator%"===e){var o=t("%AsyncGeneratorFunction%");o&&(r=o.prototype);}else if("%AsyncIteratorPrototype%"===e){var n=t("%AsyncGenerator%");n&&s&&(r=s(n.prototype));}return h[e]=r,r},v={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},S=r(132),A=r(7492),w=S.call(Function.call,Array.prototype.concat),P=S.call(Function.apply,Array.prototype.splice),j=S.call(Function.call,String.prototype.replace),O=S.call(Function.call,String.prototype.slice),E=S.call(Function.call,RegExp.prototype.exec),x=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,I=/\\(\\)?/g,M=function(t,e){var r,o=t;if(A(v,o)&&(o="%"+(r=v[o])[0]+"%"),A(h,o)){var i=h[o];if(i===b&&(i=m(o)),void 0===i&&!e)throw new a("intrinsic "+t+" exists, but is not available. Please file an issue!");return {alias:r,name:o,value:i}}throw new n("intrinsic "+t+" does not exist!")};t.exports=function(t,e){if("string"!=typeof t||0===t.length)throw new a("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new a('"allowMissing" argument must be a boolean');if(null===E(/^%?[^%]*%?$/,t))throw new n("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=function(t){var e=O(t,0,1),r=O(t,-1);if("%"===e&&"%"!==r)throw new n("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==e)throw new n("invalid intrinsic syntax, expected opening `%`");var o=[];return j(t,x,(function(t,e,r,n){o[o.length]=r?j(n,I,"$1"):e||t;})),o}(t),o=r.length>0?r[0]:"",i=M("%"+o+"%",e),u=i.name,c=i.value,l=!1,f=i.alias;f&&(o=f[0],P(r,w([0,1],f)));for(var y=1,s=!0;y<r.length;y+=1){var b=r[y],g=O(b,0,1),d=O(b,-1);if(('"'===g||"'"===g||"`"===g||'"'===d||"'"===d||"`"===d)&&g!==d)throw new n("property names with quotes must have matching quotes");if("constructor"!==b&&s||(l=!0),A(h,u="%"+(o+="."+b)+"%"))c=h[u];else if(null!=c){if(!(b in c)){if(!e)throw new a("base intrinsic for "+t+" exists, but the property is not available.");return}if(p&&y+1>=r.length){var m=p(c,b);c=(s=!!m)&&"get"in m&&!("originalValue"in m.get)?m.get:c[b];}else s=A(c,b),c=c[b];s&&!l&&(h[u]=c);}}return c};},1403:t=>{"undefined"!=typeof self?t.exports=self:"undefined"!=typeof window?t.exports=window:t.exports=Function("return this")();},1913:(t,e,r)=>{var o=r(7392),n=r(1403),i=r(9958),a=r(7493),u=i(),p=function(){return u};o(p,{getPolyfill:i,implementation:n,shim:a}),t.exports=p;},9958:(t,e,r)=>{var o=r(1403);t.exports=function(){return "object"==typeof r.g&&r.g&&r.g.Math===Math&&r.g.Array===Array?r.g:o};},7493:(t,e,r)=>{var o=r(7392),n=r(9958);t.exports=function(){var t=n();if(o.supportsDescriptors){var e=Object.getOwnPropertyDescriptor(t,"globalThis");e&&(!e.configurable||!e.enumerable&&e.writable&&globalThis===t)||Object.defineProperty(t,"globalThis",{configurable:!0,enumerable:!1,value:t,writable:!0});}else "object"==typeof globalThis&&globalThis===t||(t.globalThis=t);return t};},7502:(t,e,r)=>{var o=r(8750)("%Object.getOwnPropertyDescriptor%",!0);if(o)try{o([],"length");}catch(t){o=null;}t.exports=o;},1365:(t,e,r)=>{var o=r(8750)("%Object.defineProperty%",!0),n=function(){if(o)try{return o({},"a",{value:1}),!0}catch(t){return !1}return !1};n.hasArrayLengthDefineBug=function(){if(!n())return null;try{return 1!==o([],"length",{value:1}).length}catch(t){return !0}},t.exports=n;},2574:t=>{var e={foo:{}},r=Object;t.exports=function(){return {__proto__:e}.foo===e.foo&&!({__proto__:null}instanceof r)};},679:(t,e,r)=>{var o="undefined"!=typeof Symbol&&Symbol,n=r(8186);t.exports=function(){return "function"==typeof o&&"function"==typeof Symbol&&"symbol"==typeof o("foo")&&"symbol"==typeof Symbol("bar")&&n()};},8186:t=>{t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return !1;if("symbol"==typeof Symbol.iterator)return !0;var t={},e=Symbol("test"),r=Object(e);if("string"==typeof e)return !1;if("[object Symbol]"!==Object.prototype.toString.call(e))return !1;if("[object Symbol]"!==Object.prototype.toString.call(r))return !1;for(e in t[e]=42,t)return !1;if("function"==typeof Object.keys&&0!==Object.keys(t).length)return !1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return !1;var o=Object.getOwnPropertySymbols(t);if(1!==o.length||o[0]!==e)return !1;if(!Object.prototype.propertyIsEnumerable.call(t,e))return !1;if("function"==typeof Object.getOwnPropertyDescriptor){var n=Object.getOwnPropertyDescriptor(t,e);if(42!==n.value||!0!==n.enumerable)return !1}return !0};},698:(t,e,r)=>{var o=r(8186);t.exports=function(){return o()&&!!Symbol.toStringTag};},7492:(t,e,r)=>{var o=r(132);t.exports=o.call(Function.call,Object.prototype.hasOwnProperty);},2922:t=>{var e,r,o=Function.prototype.toString,n="object"==typeof Reflect&&null!==Reflect&&Reflect.apply;if("function"==typeof n&&"function"==typeof Object.defineProperty)try{e=Object.defineProperty({},"length",{get:function(){throw r}}),r={},n((function(){throw 42}),null,e);}catch(t){t!==r&&(n=null);}else n=null;var i=/^\s*class\b/,a=function(t){try{var e=o.call(t);return i.test(e)}catch(t){return !1}},u=function(t){try{return !a(t)&&(o.call(t),!0)}catch(t){return !1}},p=Object.prototype.toString,c="function"==typeof Symbol&&!!Symbol.toStringTag,l=!(0 in[,]),f=function(){return !1};if("object"==typeof document){var y=document.all;p.call(y)===p.call(document.all)&&(f=function(t){if((l||!t)&&(void 0===t||"object"==typeof t))try{var e=p.call(t);return ("[object HTMLAllCollection]"===e||"[object HTML document.all class]"===e||"[object HTMLCollection]"===e||"[object Object]"===e)&&null==t("")}catch(t){}return !1});}t.exports=n?function(t){if(f(t))return !0;if(!t)return !1;if("function"!=typeof t&&"object"!=typeof t)return !1;try{n(t,null,e);}catch(t){if(t!==r)return !1}return !a(t)&&u(t)}:function(t){if(f(t))return !0;if(!t)return !1;if("function"!=typeof t&&"object"!=typeof t)return !1;if(c)return u(t);if(a(t))return !1;var e=p.call(t);return !("[object Function]"!==e&&"[object GeneratorFunction]"!==e&&!/^\[object HTML/.test(e))&&u(t)};},8559:(t,e,r)=>{var o=String.prototype.valueOf,n=Object.prototype.toString,i=r(698)();t.exports=function(t){return "string"==typeof t||"object"==typeof t&&(i?function(t){try{return o.call(t),!0}catch(t){return !1}}(t):"[object String]"===n.call(t))};},6524:(t,e,r)=>{var o="function"==typeof Map&&Map.prototype,n=Object.getOwnPropertyDescriptor&&o?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,i=o&&n&&"function"==typeof n.get?n.get:null,a=o&&Map.prototype.forEach,u="function"==typeof Set&&Set.prototype,p=Object.getOwnPropertyDescriptor&&u?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,c=u&&p&&"function"==typeof p.get?p.get:null,l=u&&Set.prototype.forEach,f="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,y="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,s="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,b=Boolean.prototype.valueOf,g=Object.prototype.toString,h=Function.prototype.toString,d=String.prototype.match,m=String.prototype.slice,v=String.prototype.replace,S=String.prototype.toUpperCase,A=String.prototype.toLowerCase,w=RegExp.prototype.test,P=Array.prototype.concat,j=Array.prototype.join,O=Array.prototype.slice,E=Math.floor,x="function"==typeof BigInt?BigInt.prototype.valueOf:null,I=Object.getOwnPropertySymbols,M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,R="function"==typeof Symbol&&"object"==typeof Symbol.iterator,T="function"==typeof Symbol&&Symbol.toStringTag&&(1)?Symbol.toStringTag:null,D=Object.prototype.propertyIsEnumerable,_=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(t){return t.__proto__}:null);function N(t,e){if(t===1/0||t===-1/0||t!=t||t&&t>-1e3&&t<1e3||w.call(/e/,e))return e;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"==typeof t){var o=t<0?-E(-t):E(t);if(o!==t){var n=String(o),i=m.call(e,n.length+1);return v.call(n,r,"$&_")+"."+v.call(v.call(i,/([0-9]{3})/g,"$&_"),/_$/,"")}}return v.call(e,r,"$&_")}var C=r(6553),F=C.custom,G=B(F)?F:null;function U(t,e,r){var o="double"===(r.quoteStyle||e)?'"':"'";return o+t+o}function k(t){return v.call(String(t),/"/g,"&quot;")}function W(t){return !("[object Array]"!==H(t)||T&&"object"==typeof t&&T in t)}function V(t){return !("[object RegExp]"!==H(t)||T&&"object"==typeof t&&T in t)}function B(t){if(R)return t&&"object"==typeof t&&t instanceof Symbol;if("symbol"==typeof t)return !0;if(!t||"object"!=typeof t||!M)return !1;try{return M.call(t),!0}catch(t){}return !1}t.exports=function t(e,r,o,n){var u=r||{};if($(u,"quoteStyle")&&"single"!==u.quoteStyle&&"double"!==u.quoteStyle)throw new TypeError('option "quoteStyle" must be "single" or "double"');if($(u,"maxStringLength")&&("number"==typeof u.maxStringLength?u.maxStringLength<0&&u.maxStringLength!==1/0:null!==u.maxStringLength))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var p=!$(u,"customInspect")||u.customInspect;if("boolean"!=typeof p&&"symbol"!==p)throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if($(u,"indent")&&null!==u.indent&&"\t"!==u.indent&&!(parseInt(u.indent,10)===u.indent&&u.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if($(u,"numericSeparator")&&"boolean"!=typeof u.numericSeparator)throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var g=u.numericSeparator;if(void 0===e)return "undefined";if(null===e)return "null";if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e)return J(e,u);if("number"==typeof e){if(0===e)return 1/0/e>0?"0":"-0";var S=String(e);return g?N(e,S):S}if("bigint"==typeof e){var w=String(e)+"n";return g?N(e,w):w}var E=void 0===u.depth?5:u.depth;if(void 0===o&&(o=0),o>=E&&E>0&&"object"==typeof e)return W(e)?"[Array]":"[Object]";var I,F=function(t,e){var r;if("\t"===t.indent)r="\t";else {if(!("number"==typeof t.indent&&t.indent>0))return null;r=j.call(Array(t.indent+1)," ");}return {base:r,prev:j.call(Array(e+1),r)}}(u,o);if(void 0===n)n=[];else if(q(n,e)>=0)return "[Circular]";function L(e,r,i){if(r&&(n=O.call(n)).push(r),i){var a={depth:u.depth};return $(u,"quoteStyle")&&(a.quoteStyle=u.quoteStyle),t(e,a,o+1,n)}return t(e,u,o+1,n)}if("function"==typeof e&&!V(e)){var Y=function(t){if(t.name)return t.name;var e=d.call(h.call(t),/^function\s*([\w$]+)/);return e?e[1]:null}(e),tt=Q(e,L);return "[Function"+(Y?": "+Y:" (anonymous)")+"]"+(tt.length>0?" { "+j.call(tt,", ")+" }":"")}if(B(e)){var et=R?v.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):M.call(e);return "object"!=typeof e||R?et:K(et)}if((I=e)&&"object"==typeof I&&("undefined"!=typeof HTMLElement&&I instanceof HTMLElement||"string"==typeof I.nodeName&&"function"==typeof I.getAttribute)){for(var rt="<"+A.call(String(e.nodeName)),ot=e.attributes||[],nt=0;nt<ot.length;nt++)rt+=" "+ot[nt].name+"="+U(k(ot[nt].value),"double",u);return rt+=">",e.childNodes&&e.childNodes.length&&(rt+="..."),rt+"</"+A.call(String(e.nodeName))+">"}if(W(e)){if(0===e.length)return "[]";var it=Q(e,L);return F&&!function(t){for(var e=0;e<t.length;e++)if(q(t[e],"\n")>=0)return !1;return !0}(it)?"["+X(it,F)+"]":"[ "+j.call(it,", ")+" ]"}if(function(t){return !("[object Error]"!==H(t)||T&&"object"==typeof t&&T in t)}(e)){var at=Q(e,L);return "cause"in Error.prototype||!("cause"in e)||D.call(e,"cause")?0===at.length?"["+String(e)+"]":"{ ["+String(e)+"] "+j.call(at,", ")+" }":"{ ["+String(e)+"] "+j.call(P.call("[cause]: "+L(e.cause),at),", ")+" }"}if("object"==typeof e&&p){if(G&&"function"==typeof e[G]&&C)return C(e,{depth:E-o});if("symbol"!==p&&"function"==typeof e.inspect)return e.inspect()}if(function(t){if(!i||!t||"object"!=typeof t)return !1;try{i.call(t);try{c.call(t);}catch(t){return !0}return t instanceof Map}catch(t){}return !1}(e)){var ut=[];return a&&a.call(e,(function(t,r){ut.push(L(r,e,!0)+" => "+L(t,e));})),Z("Map",i.call(e),ut,F)}if(function(t){if(!c||!t||"object"!=typeof t)return !1;try{c.call(t);try{i.call(t);}catch(t){return !0}return t instanceof Set}catch(t){}return !1}(e)){var pt=[];return l&&l.call(e,(function(t){pt.push(L(t,e));})),Z("Set",c.call(e),pt,F)}if(function(t){if(!f||!t||"object"!=typeof t)return !1;try{f.call(t,f);try{y.call(t,y);}catch(t){return !0}return t instanceof WeakMap}catch(t){}return !1}(e))return z("WeakMap");if(function(t){if(!y||!t||"object"!=typeof t)return !1;try{y.call(t,y);try{f.call(t,f);}catch(t){return !0}return t instanceof WeakSet}catch(t){}return !1}(e))return z("WeakSet");if(function(t){if(!s||!t||"object"!=typeof t)return !1;try{return s.call(t),!0}catch(t){}return !1}(e))return z("WeakRef");if(function(t){return !("[object Number]"!==H(t)||T&&"object"==typeof t&&T in t)}(e))return K(L(Number(e)));if(function(t){if(!t||"object"!=typeof t||!x)return !1;try{return x.call(t),!0}catch(t){}return !1}(e))return K(L(x.call(e)));if(function(t){return !("[object Boolean]"!==H(t)||T&&"object"==typeof t&&T in t)}(e))return K(b.call(e));if(function(t){return !("[object String]"!==H(t)||T&&"object"==typeof t&&T in t)}(e))return K(L(String(e)));if(!function(t){return !("[object Date]"!==H(t)||T&&"object"==typeof t&&T in t)}(e)&&!V(e)){var ct=Q(e,L),lt=_?_(e)===Object.prototype:e instanceof Object||e.constructor===Object,ft=e instanceof Object?"":"null prototype",yt=!lt&&T&&Object(e)===e&&T in e?m.call(H(e),8,-1):ft?"Object":"",st=(lt||"function"!=typeof e.constructor?"":e.constructor.name?e.constructor.name+" ":"")+(yt||ft?"["+j.call(P.call([],yt||[],ft||[]),": ")+"] ":"");return 0===ct.length?st+"{}":F?st+"{"+X(ct,F)+"}":st+"{ "+j.call(ct,", ")+" }"}return String(e)};var L=Object.prototype.hasOwnProperty||function(t){return t in this};function $(t,e){return L.call(t,e)}function H(t){return g.call(t)}function q(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,o=t.length;r<o;r++)if(t[r]===e)return r;return -1}function J(t,e){if(t.length>e.maxStringLength){var r=t.length-e.maxStringLength,o="... "+r+" more character"+(r>1?"s":"");return J(m.call(t,0,e.maxStringLength),e)+o}return U(v.call(v.call(t,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,Y),"single",e)}function Y(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\"+r:"\\x"+(e<16?"0":"")+S.call(e.toString(16))}function K(t){return "Object("+t+")"}function z(t){return t+" { ? }"}function Z(t,e,r,o){return t+" ("+e+") {"+(o?X(r,o):j.call(r,", "))+"}"}function X(t,e){if(0===t.length)return "";var r="\n"+e.prev+e.base;return r+j.call(t,","+r)+"\n"+e.prev}function Q(t,e){var r=W(t),o=[];if(r){o.length=t.length;for(var n=0;n<t.length;n++)o[n]=$(t,n)?e(t[n],t):"";}var i,a="function"==typeof I?I(t):[];if(R){i={};for(var u=0;u<a.length;u++)i["$"+a[u]]=a[u];}for(var p in t)$(t,p)&&(r&&String(Number(p))===p&&p<t.length||R&&i["$"+p]instanceof Symbol||(w.call(/[^\w$]/,p)?o.push(e(p,t)+": "+e(t[p],t)):o.push(p+": "+e(t[p],t))));if("function"==typeof I)for(var c=0;c<a.length;c++)D.call(t,a[c])&&o.push("["+e(a[c])+"]: "+e(t[a[c]],t));return o}},9538:(t,e,r)=>{var o;if(!Object.keys){var n=Object.prototype.hasOwnProperty,i=Object.prototype.toString,a=r(1030),u=Object.prototype.propertyIsEnumerable,p=!u.call({toString:null},"toString"),c=u.call((function(){}),"prototype"),l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=function(t){var e=t.constructor;return e&&e.prototype===t},y={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},s=function(){if("undefined"==typeof window)return !1;for(var t in window)try{if(!y["$"+t]&&n.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{f(window[t]);}catch(t){return !0}}catch(t){return !0}return !1}();o=function(t){var e=null!==t&&"object"==typeof t,r="[object Function]"===i.call(t),o=a(t),u=e&&"[object String]"===i.call(t),y=[];if(!e&&!r&&!o)throw new TypeError("Object.keys called on a non-object");var b=c&&r;if(u&&t.length>0&&!n.call(t,0))for(var g=0;g<t.length;++g)y.push(String(g));if(o&&t.length>0)for(var h=0;h<t.length;++h)y.push(String(h));else for(var d in t)b&&"prototype"===d||!n.call(t,d)||y.push(String(d));if(p)for(var m=function(t){if("undefined"==typeof window||!s)return f(t);try{return f(t)}catch(t){return !1}}(t),v=0;v<l.length;++v)m&&"constructor"===l[v]||!n.call(t,l[v])||y.push(l[v]);return y};}t.exports=o;},4733:(t,e,r)=>{var o=Array.prototype.slice,n=r(1030),i=Object.keys,a=i?function(t){return i(t)}:r(9538),u=Object.keys;a.shim=function(){if(Object.keys){var t=function(){var t=Object.keys(arguments);return t&&t.length===arguments.length}(1,2);t||(Object.keys=function(t){return n(t)?u(o.call(t)):u(t)});}else Object.keys=a;return Object.keys||a},t.exports=a;},1030:t=>{var e=Object.prototype.toString;t.exports=function(t){var r=e.call(t),o="[object Arguments]"===r;return o||(o="[object Array]"!==r&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===e.call(t.callee)),o};},3849:(t,e,r)=>{var o=r(216);t.exports=o;},3018:(t,e,r)=>{t.exports={uncurryThis:function(){const{apply:t,bind:e,call:r}=Function.prototype;return e.bind(r)}(),JSONParse:t=>JSON.parse(t),MathAbs:t=>Math.abs(t),MathAcos:t=>Math.acos(t),MathAcosh:t=>Math.acosh(t),MathAsin:t=>Math.asin(t),MathAsinh:t=>Math.asinh(t),MathAtan:t=>Math.atan(t),MathAtanh:t=>Math.atanh(t),MathAtan2:t=>Math.atan2(t),MathCeil:t=>Math.ceil(t),MathCbrt:t=>Math.cbrt(t),MathExpm1:t=>Math.expm1(t),MathClz32:t=>Math.clz32(t),MathCos:t=>Math.cos(t),MathCosh:t=>Math.cosh(t),MathExp:t=>Math.exp(t),MathFround:t=>Math.fround(t),MathHypot:t=>Math.hypot(t),MathImul:t=>Math.imul(t),MathLog:t=>Math.log(t),MathLog1p:t=>Math.log(t),MathLog2:t=>Math.log2(t),MathLog10:t=>Math.log10(t),MathMax:(...t)=>Math.max(...t),MathMaxApply:t=>Math.max.apply(null,t),MathMin:t=>Math.min(t),MathPow:t=>Math.pow(t),MathRandom:()=>Math.random(),MathRound:t=>Math.round(t),MathSign:t=>Math.sign(t),MathSin:t=>Math.sin(t),MathSinh:t=>Math.sinh(t),MathSqrt:t=>Math.sqrt(t),MathTan:t=>Math.tan(t),MathTanh:t=>Math.tanh(t),MathTrunc:t=>Math.trunc(t),MathE:()=>Math.E,MathLN10:()=>Math.LN10,MathLN2:()=>Math.LN2,MathLOG10E:()=>Math.LOG10E,MathLOG2E:()=>Math.LOG2E,MathPI:()=>Math.PI,MathSQRT1_2:()=>Math.SQRT1_2,MathSQRT2:()=>Math.SQRT2,ReflectDefineProperty:Reflect.defineProperty,ReflectDeleteProperty:Reflect.deleteProperty,ReflectApply:Reflect.apply,ReflectConstruct:Reflect.construct,ReflectGet:Reflect.get,ReflectGetOwnPropertyDescriptor:Reflect.getOwnPropertyDescriptor,ReflectGetPrototypeOf:Reflect.getPrototypeOf,ReflectHas:Reflect.has,ReflectIsExtensible:Reflect.isExtensible,ReflectOwnKeys:Reflect.ownKeys,ReflectPreventExtensions:Reflect.preventExtensions,ReflectSet:Reflect.set,ReflectSetPrototypeOf:Reflect.setPrototypeOf,AggregateError:r(3849),ArrayFrom:(t,e)=>Array.from(t,e),ArrayIsArray:t=>Array.isArray(t),ArrayPrototypeIncludes:(t,e)=>t.includes(e),ArrayPrototypeFilter:(t,e)=>t.filter(e),ArrayPrototypeIndexOf:(t,e)=>t.indexOf(e),ArrayPrototypeJoin:(t,e)=>t.join(e),ArrayPrototypeMap:(t,e)=>t.map(e),ArrayPrototypePop:(t,e)=>t.pop(e),ArrayPrototypePush:(t,e)=>t.push(e),ArrayPrototypeSlice:(t,e,r)=>t.slice(e,r),ArrayPrototypeSplice:(t,e,r,...o)=>t.splice(e,r,...o),ArrayPrototypeUnshift:(t,e)=>t.unshift(e),MapPrototypeGet:Map.prototype.get,Error,ErrorCaptureStackTrace:Error.captureStackTrace,ErrorPrototypeToString:Error.prototype.toString,RangeError,JSONStringify:JSON.stringify,FunctionPrototypeCall:(t,e,...r)=>t.call(e,...r),FunctionPrototypeBind:(t,e,...r)=>t.bind(e,...r),FunctionPrototypeSymbolHasInstance:(t,e)=>Function.prototype[Symbol.hasInstance].call(t,e),MathFloor:Math.floor,Number,NumberIsInteger:Number.isInteger,NumberIsNaN:Number.isNaN,NumberMAX_SAFE_INTEGER:Number.MAX_SAFE_INTEGER,NumberMIN_SAFE_INTEGER:Number.MIN_SAFE_INTEGER,NumberParseInt:Number.parseInt,NumberIsFinite:Number.isFinite,NumberPrototypeToString:(t,e)=>t.toString(e),ObjectPrototypeHasOwnProperty:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),ObjectAssign:Object.assign,ObjectDefineProperties:(t,e)=>Object.defineProperties(t,e),ObjectDefineProperty:(t,e,r)=>Object.defineProperty(t,e,r),ObjectGetOwnPropertyDescriptor:(t,e)=>Object.getOwnPropertyDescriptor(t,e),ObjectKeys:t=>Object.keys(t),ObjectCreate:t=>Object.create(t),ObjectFreeze:t=>Object.freeze(t),ObjectEntries:t=>Object.entries(t),ObjectSetPrototypeOf:(t,e)=>Object.setPrototypeOf(t,e),ObjectPrototypeToString:t=>t.toString(),ObjectPrototypePropertyIsEnumerable:(t,e)=>t.propertyIsEnumerable(e),ObjectIsExtensible:Object.isExtensible,Promise,PromisePrototypeCatch:(t,e)=>t.catch(e),PromisePrototypeThen:(t,e,r)=>t.then(e,r),PromiseReject:t=>Promise.reject(t),RegExpPrototypeTest:(t,e)=>t.test(e),SafeSet:Set,String,StringPrototypeSlice:(t,e,r)=>t.slice(e,r),StringPrototypeToLowerCase:t=>t.toLowerCase(),StringPrototypeToUpperCase:t=>t.toUpperCase(),StringPrototypeTrim:t=>t.trim(),StringPrototypeCharCodeAt:(t,e)=>t.charCodeAt(e),StringPrototypeLastIndexOf:(t,e)=>t.lastIndexOf(e),StringPrototypeCharAt:(t,e)=>t.charAt(e),StringPrototypeIndexOf:(t,e)=>t.indexOf(e),StringPrototypeStartsWith:(t,e)=>t.startsWith(e),StringPrototypeIncludes:(t,e,r)=>t.includes(e,r),StringPrototypePadStart:(t,e,r)=>t.padStart(e,r),StringPrototypeReplace:(t,e,r)=>t.replace(e,r),DatePrototypeGetDate:t=>t.getDate(),DatePrototypeGetHours:t=>t.getHours(),DatePrototypeGetMinutes:t=>t.getMinutes(),DatePrototypeGetMonth:t=>t.getMonth(),DatePrototypeGetSeconds:t=>t.getSeconds(),Symbol,SymbolAsyncIterator:Symbol.asyncIterator,SymbolHasInstance:Symbol.hasInstance,SymbolIterator:Symbol.iterator,TypedArrayPrototypeSet:(t,e,r)=>t.set(e,r),decodeURIComponent,Uint8Array,Int8Array,Array,Date};},3966:t=>{var e=Array.prototype.slice,r="function"==typeof Object.keys?Object.keys:function(t){var e=[];for(var r in t)e.push(r);return e};function o(t,e){if(0===t&&0===e)return 1/t==1/e;if(t===e)return !0;if(!(t instanceof Date&&e instanceof Date))return y(t)?y(e):"object"!=typeof t&&"object"!=typeof e?t===e:f(t)||f(e)?(o=e,!(!f(r=t)||!f(o))&&(a(r)?a(o)&&((n=r.valueOf())===(i=o.valueOf())?0!==n||1/n==1/i:n!=n&&i!=i):u(r)?u(o)&&r.valueOf()===o.valueOf():p(r)?p(o)&&r.valueOf()===o.valueOf():c(r)?c(o)&&r.valueOf()===o.valueOf():l(r)?l(o)&&Object(r).toString()===Object(o).toString():s(r,o))):s(t,e);var r,o,n,i;try{return t.getTime()===e.getTime()}catch(t){return !1}}function n(t){return null==t}function i(t){return "[object Arguments]"==Object.prototype.toString.call(t)}function a(t){return "[object Number]"==Object.prototype.toString.call(t)}function u(t){return "[object String]"==Object.prototype.toString.call(t)}function p(t){return "[object Boolean]"==Object.prototype.toString.call(t)}function c(t){return "[object BigInt]"==Object.prototype.toString.call(t)}function l(t){return "[object Symbol]"==Object.prototype.toString.call(t)}function f(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t}function y(t){return "number"==typeof t&&t!=t}function s(t,a){if(n(t)||n(a))return !1;if(t.prototype!==a.prototype)return !1;if(i(t))return !!i(a)&&o(t=e.call(t),a=e.call(a));try{var u,p,c=r(t),l=r(a);}catch(t){return !1}if(c.length!=l.length)return !1;for(c.sort(),l.sort(),p=c.length-1;p>=0;p--)if(c[p]!=l[p])return !1;for(p=c.length-1;p>=0;p--)if(!o(t[u=c[p]],a[u]))return !1;return !0}t.exports={isDeepStrictEqual:o};},4338:(t,e,r)=>{const o=r(1350),n=r(2727),i=r(4597),{ObjectCreate:a,ObjectDefineProperty:u,StringPrototypeToUpperCase:p,ArrayPrototypeSlice:c}=r(3018);let l=a(null);const f=()=>{};t.exports={debuglog:function(t,e){function r(){t=p(t),a=!0;}let a,y=(...u)=>{switch(r(),y=function(t,e){if(void 0===l[e])if(t){const t=o.pid;l[e]=function(r,...o){var a=i.printf(r,...o);n.debug(t,e,"%{public}s %{public}s: %{public}s",e,t,a);};}else l[e]=f;return l[e]}(a,t),"function"==typeof e&&e(y),u.length){case 1:return y(u[0]);case 2:return y(u[0],u[1]);default:return y(u[0],...c(u,1))}},s=()=>(r(),s=()=>a,a);const b=(...t)=>{switch(t.length){case 1:return y(t[0]);case 2:return y(t[0],t[1]);default:return y(t[0],...c(t,1))}};return u(b,"enabled",{__proto__:null,get:()=>s(),configurable:!0,enumerable:!0}),b}};},3823:(t,e,r)=>{const{ObjectDefineProperty:o,ArrayIsArray:n,ArrayPrototypeIncludes:i,NumberIsNaN:a}=r(3018),u=t=>{const e="__node_internal_"+t.name;return o(t,"name",{__proto__:null,value:e}),t};e.validateString=u(((t,e)=>{if("string"!=typeof t)throw new Error("ERR_INVALID_ARG_TYPE value:"+t+" name:"+e)})),e.validateFunction=u(((t,e)=>{if("function"!=typeof t)throw new Error("ERR_INVALID_ARG_TYPE value:"+t+" name:"+e)})),e.validateAbortSignal=u(((t,e)=>{if(void 0!==t&&(null===t||"object"!=typeof t||!("aborted"in t)))throw new Error("ERR_INVALID_ARG_TYPE value:"+value+" name:"+e)})),e.validateObject=u(((t,e,r)=>{const o=null==r,i=!o&&r.allowArray,a=!o&&r.allowFunction;if((o||!r.nullable)&&null===t||!i&&n(t)||"object"!=typeof t&&(!a||"function"!=typeof t))throw new Error("ERR_INVALID_ARG_TYPE value:"+t+" name:"+e)})),e.validateNumber=function(t,e,r=void 0,o){if("number"!=typeof t)throw new Error("ERR_INVALID_ARG_TYPE value:"+t+" name:"+e);if(null!=r&&t<r||null!=o&&t>o||(null!=r||null!=o)&&a(t))throw new Error("ERR_OUT_OF_RANGE, name:"+e+", "+`${null!=r?`>= ${r}`:""}${null!=r&&null!=o?" && ":""}${null!=o?`<= ${o}`:""}`+t)},e.validateBoolean=function(t,e){if("boolean"!=typeof t)throw new Error("ERR_INVALID_ARG_TYPE value:"+t+" name:"+e)},e.validateArray=u(((t,e,r=0)=>{if(!Array.isArray(t))throw new Error("Array:"+e);if(t.length<r)throw new Error("ERR_INVALID_ARG_VALUE name:"+e+",value:"+t+",reason:"+`must be longer than ${r}`)})),e.validateUnion=function(t,e,r){if(!i(r,t))throw new Error("ERR_INVALID_ARG_TYPE, name:"+e+",union:"+r+",value:"+t)};},2727:e=>{e.exports=t$2;},1350:t=>{t.exports=e$2;},4597:t=>{t.exports=r$2;},3368:(t,e,r)=>{var n,i;t.exports=(n={Buffer:()=>n$1},i={},r.d(i,n),i);},6553:()=>{},6597:(t,e,r)=>{var o=r(8750),n=r(1883),i=r(3771),a=r(9517),u=r(1554),p=o("%TypeError%");t.exports=function(t,e,r){if("String"!==a(t))throw new p("Assertion failed: `S` must be a String");if(!i(e)||e<0||e>u)throw new p("Assertion failed: `length` must be an integer >= 0 and <= 2**53");if("Boolean"!==a(r))throw new p("Assertion failed: `unicode` must be a Boolean");return r?e+1>=t.length?e+1:e+n(t,e)["[[CodeUnitCount]]"]:e+1};},4101:(t,e,r)=>{var o=r(8750),n=r(2737),i=o("%TypeError%"),a=r(7057),u=o("%Reflect.apply%",!0)||n("Function.prototype.apply");t.exports=function(t,e){var r=arguments.length>2?arguments[2]:[];if(!a(r))throw new i("Assertion failed: optional `argumentsList`, if provided, must be a List");return u(t,e,r)};},1883:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(2737),i=r(8714),a=r(5722),u=r(9517),p=r(2955),c=n("String.prototype.charAt"),l=n("String.prototype.charCodeAt");t.exports=function(t,e){if("String"!==u(t))throw new o("Assertion failed: `string` must be a String");var r=t.length;if(e<0||e>=r)throw new o("Assertion failed: `position` must be >= 0, and < the length of `string`");var n=l(t,e),f=c(t,e),y=i(n),s=a(n);if(!y&&!s)return {"[[CodePoint]]":f,"[[CodeUnitCount]]":1,"[[IsUnpairedSurrogate]]":!1};if(s||e+1===r)return {"[[CodePoint]]":f,"[[CodeUnitCount]]":1,"[[IsUnpairedSurrogate]]":!0};var b=l(t,e+1);return a(b)?{"[[CodePoint]]":p(n,b),"[[CodeUnitCount]]":2,"[[IsUnpairedSurrogate]]":!1}:{"[[CodePoint]]":f,"[[CodeUnitCount]]":1,"[[IsUnpairedSurrogate]]":!0}};},7232:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(8831),i=r(323),a=r(9517);t.exports=function(t,e,r){if("Object"!==a(t))throw new o("Assertion failed: Type(O) is not Object");if(!n(e))throw new o("Assertion failed: IsPropertyKey(P) is not true");return i(t,e,{"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Value]]":r,"[[Writable]]":!0})};},3512:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(7232),i=r(8831),a=r(9517);t.exports=function(t,e,r){if("Object"!==a(t))throw new o("Assertion failed: Type(O) is not Object");if(!i(e))throw new o("Assertion failed: IsPropertyKey(P) is not true");var u=n(t,e,r);if(!u)throw new o("unable to create data property");return u};},2435:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(5628),i=r(9623),a=r(9121),u=r(8831),p=r(5403),c=r(9517);t.exports=function(t,e,r){if("Object"!==c(t))throw new o("Assertion failed: Type(O) is not Object");if(!u(e))throw new o("Assertion failed: IsPropertyKey(P) is not true");return n(a,p,i,t,e,{"[[Configurable]]":!0,"[[Enumerable]]":!1,"[[Value]]":r,"[[Writable]]":!0})};},9623:(t,e,r)=>{var o=r(6688),n=r(7226),i=r(9517);t.exports=function(t){return void 0!==t&&o(i,"Property Descriptor","Desc",t),n(t)};},2010:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(6524),i=r(8831),a=r(9517);t.exports=function(t,e){if("Object"!==a(t))throw new o("Assertion failed: Type(O) is not Object");if(!i(e))throw new o("Assertion failed: IsPropertyKey(P) is not true, got "+n(e));return t[e]};},1414:(t,e,r)=>{var o=r(8750),n=o("%TypeError%"),i=o("%SyntaxError%"),a=o("%Symbol.asyncIterator%",!0),u=r(6524),p=r(679)(),c=r(4602),l=r(6597),f=r(4101),y=r(1819),s=r(7057),b=r(9517);t.exports=function(t,e,r){var o=e;if(arguments.length<2&&(o="sync"),"sync"!==o&&"async"!==o)throw new n("Assertion failed: `hint` must be one of 'sync' or 'async', got "+u(e));var g=r;if(arguments.length<3)if("async"===o){if(p&&a&&(g=y(t,a)),void 0===g)throw new i("async from sync iterators aren't currently supported")}else g=c({AdvanceStringIndex:l,GetMethod:y,IsArray:s},t);var h=f(g,t);if("Object"!==b(h))throw new n("iterator must return an object");return h};},1819:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(267),i=r(212),a=r(8831),u=r(6524);t.exports=function(t,e){if(!a(e))throw new o("Assertion failed: IsPropertyKey(P) is not true");var r=n(t,e);if(null!=r){if(!i(r))throw new o(u(e)+" is not a function: "+u(r));return r}};},267:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(8831),i=r(9424);t.exports=function(t,e){if(!n(e))throw new o("Assertion failed: IsPropertyKey(P) is not true");return i(t)[e]};},5522:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(4101),i=r(7057),a=r(267),u=r(8831);t.exports=function(t,e){if(!u(e))throw new o("Assertion failed: P must be a Property Key");var r=arguments.length>2?arguments[2]:[];if(!i(r))throw new o("Assertion failed: optional `argumentsList`, if provided, must be a List");var p=a(t,e);return n(p,t,r)};},6445:(t,e,r)=>{var o=r(7492),n=r(9517),i=r(6688);t.exports=function(t){return void 0!==t&&(i(n,"Property Descriptor","Desc",t),!(!o(t,"[[Get]]")&&!o(t,"[[Set]]")))};},7057:(t,e,r)=>{t.exports=r(2924);},212:(t,e,r)=>{t.exports=r(2922);},9121:(t,e,r)=>{var o=r(7492),n=r(9517),i=r(6688);t.exports=function(t){return void 0!==t&&(i(n,"Property Descriptor","Desc",t),!(!o(t,"[[Value]]")&&!o(t,"[[Writable]]")))};},4996:(t,e,r)=>{var o=r(8750),n=o("%Object.preventExtensions%",!0),i=o("%Object.isExtensible%",!0),a=r(2410);t.exports=n?function(t){return !a(t)&&i(t)}:function(t){return !a(t)};},4635:(t,e,r)=>{var o=r(6688),n=r(6445),i=r(9121),a=r(9517);t.exports=function(t){return void 0!==t&&(o(a,"Property Descriptor","Desc",t),!n(t)&&!i(t))};},3771:(t,e,r)=>{var o=r(4642),n=r(1068),i=r(9517),a=r(7152),u=r(8426);t.exports=function(t){if("Number"!==i(t)||a(t)||!u(t))return !1;var e=o(t);return n(e)===e};},8831:t=>{t.exports=function(t){return "string"==typeof t||"symbol"==typeof t};},8429:(t,e,r)=>{var o=r(2737)("Array.prototype.push"),n=r(1414),i=r(806),a=r(564);t.exports=function(t){var e;e=arguments.length>1?n(t,"sync",arguments[1]):n(t,"sync");for(var r=[],u=!0;u;)if(u=i(e)){var p=a(u);o(r,p);}return r};},5389:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(2010),i=r(2975),a=r(9517);t.exports=function(t){if("Object"!==a(t))throw new o("Assertion failed: Type(iterResult) is not Object");return i(n(t,"done"))};},1673:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(5522),i=r(9517);t.exports=function(t,e){var r=n(t,"next",arguments.length<2?[]:[e]);if("Object"!==i(r))throw new o("iterator next must return an object");return r};},806:(t,e,r)=>{var o=r(5389),n=r(1673);t.exports=function(t){var e=n(t);return !0!==o(e)&&e};},564:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(2010),i=r(9517);t.exports=function(t){if("Object"!==i(t))throw new o("Assertion failed: Type(iterResult) is not Object");return n(t,"value")};},323:(t,e,r)=>{var o=r(8750),n=r(7502),i=o("%SyntaxError%"),a=o("%TypeError%"),u=r(5505),p=r(6445),c=r(9121),l=r(4996),f=r(8831),y=r(6212),s=r(5403),b=r(9517),g=r(7299);t.exports=function(t,e,r){if("Object"!==b(t))throw new a("Assertion failed: O must be an Object");if(!f(e))throw new a("Assertion failed: P must be a Property Key");if(!u({Type:b,IsDataDescriptor:c,IsAccessorDescriptor:p},r))throw new a("Assertion failed: Desc must be a Property Descriptor");if(!n){if(p(r))throw new i("This environment does not support accessor property descriptors.");var o=!(e in t)&&r["[[Writable]]"]&&r["[[Enumerable]]"]&&r["[[Configurable]]"]&&"[[Value]]"in r,h=e in t&&(!("[[Configurable]]"in r)||r["[[Configurable]]"])&&(!("[[Enumerable]]"in r)||r["[[Enumerable]]"])&&(!("[[Writable]]"in r)||r["[[Writable]]"])&&"[[Value]]"in r;if(o||h)return t[e]=r["[[Value]]"],s(t[e],r["[[Value]]"]);throw new i("This environment does not support defining non-writable, non-enumerable, or non-configurable properties")}var d=n(t,e),m=d&&y(d),v=l(t);return g(t,e,v,r,m)};},7685:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(3330),i=r(9517);t.exports=function(t){if("Object"!==i(t))throw new o("Assertion failed: O must be an Object");if(!n)throw new o("This environment does not support fetching prototypes.");return n(t)};},5627:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(8780),i=r(7685),a=r(9517);t.exports=function(t,e){if("Object"!==a(e)&&"Null"!==a(e))throw new o("Assertion failed: V must be Object or Null");try{n(t,e);}catch(t){return !1}return i(t)===e};},2355:(t,e,r)=>{t.exports=r(3802);},5403:(t,e,r)=>{var o=r(7152);t.exports=function(t,e){return t===e?0!==t||1/t==1/e:o(t)&&o(e)};},2975:t=>{t.exports=function(t){return !!t};},9424:(t,e,r)=>{var o=r(8750)("%Object%"),n=r(2355);t.exports=function(t){return n(t),o(t)};},6212:(t,e,r)=>{var o=r(7492),n=r(8750)("%TypeError%"),i=r(9517),a=r(2975),u=r(212);t.exports=function(t){if("Object"!==i(t))throw new n("ToPropertyDescriptor requires an object");var e={};if(o(t,"enumerable")&&(e["[[Enumerable]]"]=a(t.enumerable)),o(t,"configurable")&&(e["[[Configurable]]"]=a(t.configurable)),o(t,"value")&&(e["[[Value]]"]=t.value),o(t,"writable")&&(e["[[Writable]]"]=a(t.writable)),o(t,"get")){var r=t.get;if(void 0!==r&&!u(r))throw new n("getter must be a function");e["[[Get]]"]=r;}if(o(t,"set")){var p=t.set;if(void 0!==p&&!u(p))throw new n("setter must be a function");e["[[Set]]"]=p;}if((o(e,"[[Get]]")||o(e,"[[Set]]"))&&(o(e,"[[Value]]")||o(e,"[[Writable]]")))throw new n("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");return e};},9517:(t,e,r)=>{var o=r(224);t.exports=function(t){return "symbol"==typeof t?"Symbol":"bigint"==typeof t?"BigInt":o(t)};},2955:(t,e,r)=>{var o=r(8750),n=o("%TypeError%"),i=o("%String.fromCharCode%"),a=r(8714),u=r(5722);t.exports=function(t,e){if(!a(t)||!u(e))throw new n("Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code");return i(t)+i(e)};},7299:(t,e,r)=>{var o=r(8750)("%TypeError%"),n=r(5628),i=r(9283),a=r(5505),u=r(9623),p=r(6445),c=r(9121),l=r(4635),f=r(8831),y=r(5403),s=r(9517);t.exports=function(t,e,r,b,g){var h,d,m=s(t);if("Undefined"!==m&&"Object"!==m)throw new o("Assertion failed: O must be undefined or an Object");if(!f(e))throw new o("Assertion failed: P must be a Property Key");if("Boolean"!==s(r))throw new o("Assertion failed: extensible must be a Boolean");if(!a({Type:s,IsDataDescriptor:c,IsAccessorDescriptor:p},b))throw new o("Assertion failed: Desc must be a Property Descriptor");if("Undefined"!==s(g)&&!a({Type:s,IsDataDescriptor:c,IsAccessorDescriptor:p},g))throw new o("Assertion failed: current must be a Property Descriptor, or undefined");if("Undefined"===s(g))return !!r&&("Undefined"===m||(p(b)?n(c,y,u,t,e,b):n(c,y,u,t,e,{"[[Configurable]]":!!b["[[Configurable]]"],"[[Enumerable]]":!!b["[[Enumerable]]"],"[[Value]]":b["[[Value]]"],"[[Writable]]":!!b["[[Writable]]"]})));if(!i({IsAccessorDescriptor:p,IsDataDescriptor:c},g))throw new o("`current`, when present, must be a fully populated and valid Property Descriptor");if(!g["[[Configurable]]"]){if("[[Configurable]]"in b&&b["[[Configurable]]"])return !1;if("[[Enumerable]]"in b&&!y(b["[[Enumerable]]"],g["[[Enumerable]]"]))return !1;if(!l(b)&&!y(p(b),p(g)))return !1;if(p(g)){if("[[Get]]"in b&&!y(b["[[Get]]"],g["[[Get]]"]))return !1;if("[[Set]]"in b&&!y(b["[[Set]]"],g["[[Set]]"]))return !1}else if(!g["[[Writable]]"]){if("[[Writable]]"in b&&b["[[Writable]]"])return !1;if("[[Value]]"in b&&!y(b["[[Value]]"],g["[[Value]]"]))return !1}}return "Undefined"===m||(c(g)&&p(b)?(h=("[[Configurable]]"in b?b:g)["[[Configurable]]"],d=("[[Enumerable]]"in b?b:g)["[[Enumerable]]"],n(c,y,u,t,e,{"[[Configurable]]":!!h,"[[Enumerable]]":!!d,"[[Get]]":("[[Get]]"in b?b:g)["[[Get]]"],"[[Set]]":("[[Set]]"in b?b:g)["[[Set]]"]})):p(g)&&c(b)?(h=("[[Configurable]]"in b?b:g)["[[Configurable]]"],d=("[[Enumerable]]"in b?b:g)["[[Enumerable]]"],n(c,y,u,t,e,{"[[Configurable]]":!!h,"[[Enumerable]]":!!d,"[[Value]]":("[[Value]]"in b?b:g)["[[Value]]"],"[[Writable]]":!!("[[Writable]]"in b?b:g)["[[Writable]]"]})):n(c,y,u,t,e,b))};},4642:(t,e,r)=>{var o=r(8750)("%Math.abs%");t.exports=function(t){return o(t)};},1068:(t,e,r)=>{var o=r(9517),n=Math.floor;t.exports=function(t){return "BigInt"===o(t)?t:n(t)};},3802:(t,e,r)=>{var o=r(8750)("%TypeError%");t.exports=function(t,e){if(null==t)throw new o(e||"Cannot call method on "+t);return t};},224:t=>{t.exports=function(t){return null===t?"Null":void 0===t?"Undefined":"function"==typeof t||"object"==typeof t?"Object":"number"==typeof t?"Number":"boolean"==typeof t?"Boolean":"string"==typeof t?"String":void 0};},5628:(t,e,r)=>{var o=r(1365),n=r(8750),i=o()&&n("%Object.defineProperty%",!0),a=o.hasArrayLengthDefineBug(),u=a&&r(2924),p=r(2737)("Object.prototype.propertyIsEnumerable");t.exports=function(t,e,r,o,n,c){if(!i){if(!t(c))return !1;if(!c["[[Configurable]]"]||!c["[[Writable]]"])return !1;if(n in o&&p(o,n)!==!!c["[[Enumerable]]"])return !1;var l=c["[[Value]]"];return o[n]=l,e(o[n],l)}return a&&"length"===n&&"[[Value]]"in c&&u(o)&&o.length!==c["[[Value]]"]?(o.length=c["[[Value]]"],o.length===c["[[Value]]"]):(i(o,n,r(c)),!0)};},2924:(t,e,r)=>{var o=r(8750)("%Array%"),n=!o.isArray&&r(2737)("Object.prototype.toString");t.exports=o.isArray||function(t){return "[object Array]"===n(t)};},6688:(t,e,r)=>{var o=r(8750),n=o("%TypeError%"),i=o("%SyntaxError%"),a=r(7492),u={"Property Descriptor":function(t){var e={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};if(!t)return !1;for(var r in t)if(a(t,r)&&!e[r])return !1;var o=a(t,"[[Value]]"),i=a(t,"[[Get]]")||a(t,"[[Set]]");if(o&&i)throw new n("Property Descriptors may not be both accessor and data descriptors");return !0},"Match Record":r(1271),"Iterator Record":function(t){return a(t,"[[Iterator]]")&&a(t,"[[NextMethod]]")&&a(t,"[[Done]]")},"PromiseCapability Record":function(t){return !!t&&a(t,"[[Resolve]]")&&"function"==typeof t["[[Resolve]]"]&&a(t,"[[Reject]]")&&"function"==typeof t["[[Reject]]"]&&a(t,"[[Promise]]")&&t["[[Promise]]"]&&"function"==typeof t["[[Promise]]"].then},"AsyncGeneratorRequest Record":function(t){return !!t&&a(t,"[[Completion]]")&&a(t,"[[Capability]]")&&u["PromiseCapability Record"](t["[[Capability]]"])}};t.exports=function(t,e,r,o){var a=u[e];if("function"!=typeof a)throw new i("unknown record type: "+e);if("Object"!==t(o)||!a(o))throw new n(r+" must be a "+e)};},7226:t=>{t.exports=function(t){if(void 0===t)return t;var e={};return "[[Value]]"in t&&(e.value=t["[[Value]]"]),"[[Writable]]"in t&&(e.writable=!!t["[[Writable]]"]),"[[Get]]"in t&&(e.get=t["[[Get]]"]),"[[Set]]"in t&&(e.set=t["[[Set]]"]),"[[Enumerable]]"in t&&(e.enumerable=!!t["[[Enumerable]]"]),"[[Configurable]]"in t&&(e.configurable=!!t["[[Configurable]]"]),e};},4602:(t,e,r)=>{var o=r(679)(),n=r(8750),i=r(2737),a=r(8559),u=n("%Symbol.iterator%",!0),p=i("String.prototype.slice"),c=n("%String%");t.exports=function(t,e){var r;return o?r=t.GetMethod(e,u):t.IsArray(e)?r=function(){var t=-1,e=this;return {next:function(){return {done:(t+=1)>=e.length,value:e[t]}}}}:a(e)&&(r=function(){var r=0;return {next:function(){var o=t.AdvanceStringIndex(c(e),r,!0),n=p(e,r,o);return r=o,{done:o>e.length,value:n}}}}),r};},3330:(t,e,r)=>{var o=r(8750)("%Object.getPrototypeOf%",!0),n=r(2574)();t.exports=o||(n?function(t){return t.__proto__}:null);},8426:(t,e,r)=>{var o=r(7152);t.exports=function(t){return ("number"==typeof t||"bigint"==typeof t)&&!o(t)&&t!==1/0&&t!==-1/0};},9283:t=>{t.exports=function(t,e){return !!e&&"object"==typeof e&&"[[Enumerable]]"in e&&"[[Configurable]]"in e&&(t.IsAccessorDescriptor(e)||t.IsDataDescriptor(e))};},8714:t=>{t.exports=function(t){return "number"==typeof t&&t>=55296&&t<=56319};},1271:(t,e,r)=>{var o=r(7492);t.exports=function(t){return o(t,"[[StartIndex]]")&&o(t,"[[EndIndex]]")&&t["[[StartIndex]]"]>=0&&t["[[EndIndex]]"]>=t["[[StartIndex]]"]&&String(parseInt(t["[[StartIndex]]"],10))===String(t["[[StartIndex]]"])&&String(parseInt(t["[[EndIndex]]"],10))===String(t["[[EndIndex]]"])};},7152:t=>{t.exports=Number.isNaN||function(t){return t!=t};},2410:t=>{t.exports=function(t){return null===t||"function"!=typeof t&&"object"!=typeof t};},5505:(t,e,r)=>{var o=r(8750),n=r(7492),i=o("%TypeError%");t.exports=function(t,e){if("Object"!==t.Type(e))return !1;var r={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};for(var o in e)if(n(e,o)&&!r[o])return !1;if(t.IsDataDescriptor(e)&&t.IsAccessorDescriptor(e))throw new i("Property Descriptors may not be both accessor and data descriptors");return !0};},5722:t=>{t.exports=function(t){return "number"==typeof t&&t>=56320&&t<=57343};},1554:(t,e,r)=>{var o=r(8750),n=o("%Math%"),i=o("%Number%");t.exports=i.MAX_SAFE_INTEGER||n.pow(2,53)-1;},8780:(t,e,r)=>{var o=r(8750)("%Object.setPrototypeOf%",!0),n=r(2574)();t.exports=o||(n?function(t,e){return t.__proto__=e,t}:null);}},i$1={};function a(t){var e=i$1[t];if(void 0!==e)return e.exports;var r=i$1[t]={exports:{}};return n[t](r,r.exports,a),r.exports}a.d=(t,e)=>{for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]});},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var u={};(()=>{var t=u;const e=a(4597),{ArrayIsArray:r,ArrayPrototypeJoin:o,Date:n,DatePrototypeGetDate:i,DatePrototypeGetHours:p,DatePrototypeGetMinutes:c,DatePrototypeGetMonth:l,DatePrototypeGetSeconds:f,Error:y,ObjectDefineProperty:s,ObjectKeys:b,ObjectPrototypeToString:g,ObjectSetPrototypeOf:h,StringPrototypePadStart:d}=a(3018),{validateString:m}=a(3823),{debuglog:v}=a(4338),{isDeepStrictEqual:S}=a(3966),{isBuffer:A}=a(3368).Buffer;function w(t){return "boolean"==typeof t}function P(t){return null===t}function j(t){return null==t}function O(t){return "number"==typeof t}function E(t){return "string"==typeof t}function x(t){return "symbol"==typeof t}function I(t){return void 0===t}function M(t){return null!==t&&"object"==typeof t}function R(t){return "[object Error]"===g(t)||t instanceof y}function T(t){return "function"==typeof t}function D(t){return null===t||"object"!=typeof t&&"function"!=typeof t}function _(t){return d(t.toString(),2,"0")}const N=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function C(...t){console.log("%s - %s",function(){const t=new n,e=o([_(p(t)),_(c(t)),_(f(t))],":");return `${i(t)} ${N[l(t)]} ${e}`}(),...t);}function F(t,e){if(null==t)throw new y("ERR_INVALID_ARG_TYPE, ctor:"+t);if(null==e)throw new y("ERR_INVALID_ARG_TYPE, superCtor:"+e);if(void 0===e.prototype)throw new y("ERR_INVALID_ARG_TYPE, superCtor.prototype:"+e.prototype);s(t,"super_",{__proto__:null,value:e,writable:!0,configurable:!0}),h(t.prototype,e.prototype);}function G(t,e){if(null===e||"object"!=typeof e)return t;const r=b(e);let o=r.length;for(;o--;)t[r[o]]=e[r[o]];return t}function U(t){return (new e.types).isRegExp(t)}function k(t){return (new e.types).isDate(t)}function W(){return new e.types}const V=new RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))","g");function B(t){return m(t,"str"),t.replace(V,"")}const{printf:L,getErrorString:$,callbackWrapper:H,promiseWrapper:q,TextDecoder:J,TextEncoder:Y}=e;t.ZP={_extend:G,callbackify:H,debug:v,debuglog:v,format:L,getSystemErrorName:$,inherits:F,isArray:r,isBoolean:w,isBuffer:A,isDeepStrictEqual:S,isNull:P,isNullOrUndefined:j,isNumber:O,isString:E,isSymbol:x,isUndefined:I,isRegExp:U,isObject:M,isDate:k,isError:R,isFunction:T,isPrimitive:D,log:C,promisify:q,stripVTControlCharacters:B,TextDecoder:J,TextEncoder:Y,types:W(),inspect:function(){}},t.uk=G,t.wI=H,t.fF=v,t.ZR=v,t.WU=L,t.sR=$,t.XW=F,t.kJ=r,t.jn=w,t.zH=A,t.QY=S,t.Ft=P,t.le=j,t.hj=O,t.HD=E,t.yk=x,t.o8=I,t.Kj=U,t.Kn=M,t.J_=k,t.VZ=R,t.mf=T,t.pt=D,t.cM=C,t.Fr=q,t.S9=B,t.kY=J,t.po=Y,t.V5=W(),t.XY=function(){};})();var b=u.ZP;

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$4 = Object.prototype.toString;
var funcType = '[object Function]';
var implementation$8 = function bind(that) {
  var target = this;
  if (typeof target !== 'function' || toStr$4.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice$1.call(arguments, 1);
  var bound;
  var binder = function binder() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice$1.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, args.concat(slice$1.call(arguments)));
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i);
  }
  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
  if (target.prototype) {
    var Empty = function Empty() {};
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};

var implementation$7 = implementation$8;
var functionBind = Function.prototype.bind || implementation$7;

var toStr$3 = Object.prototype.toString;
var isArguments = function isArguments(value) {
  var str = toStr$3.call(value);
  var isArgs = str === '[object Arguments]';
  if (!isArgs) {
    isArgs = str !== '[object Array]' && value !== null && _typeof(value) === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr$3.call(value.callee) === '[object Function]';
  }
  return isArgs;
};

var implementation$6;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation$6;
  hasRequiredImplementation = 1;
  var keysShim;
  if (!Object.keys) {
    // modified from https://github.com/es-shims/es5-shim
    var has = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var isArgs = isArguments; // eslint-disable-line global-require
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({
      toString: null
    }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    var hasAutomationEqualityBug = function () {
      /* global window */
      if (typeof window === 'undefined') {
        return false;
      }
      for (var k in window) {
        try {
          if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && _typeof(window[k]) === 'object') {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    }();
    var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
      /* global window */
      if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    keysShim = function keys(object) {
      var isObject = object !== null && _typeof(object) === 'object';
      var isFunction = toStr.call(object) === '[object Function]';
      var isArguments = isArgs(object);
      var isString = isObject && toStr.call(object) === '[object String]';
      var theKeys = [];
      if (!isObject && !isFunction && !isArguments) {
        throw new TypeError('Object.keys called on a non-object');
      }
      var skipProto = hasProtoEnumBug && isFunction;
      if (isString && object.length > 0 && !has.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }
      if (isArguments && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === 'prototype') && has.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }
      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
  }
  implementation$6 = keysShim;
  return implementation$6;
}

var slice = Array.prototype.slice;
var isArgs = isArguments;
var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) {
  return origKeys(o);
} : requireImplementation();
var originalKeys = Object.keys;
keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function () {
      // Safari 5.0 bug
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);
    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArgs(object)) {
          return originalKeys(slice.call(object));
        }
        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }
  return Object.keys || keysShim;
};
var objectKeys = keysShim;

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams$1 = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }
  if (_typeof(Symbol.iterator) === 'symbol') {
    return true;
  }
  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);
  if (typeof sym === 'string') {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  }

  // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }

  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$4 = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }
  if (typeof Symbol !== 'function') {
    return false;
  }
  if (_typeof(origSymbol('foo')) !== 'symbol') {
    return false;
  }
  if (_typeof(Symbol('bar')) !== 'symbol') {
    return false;
  }
  return hasSymbolSham();
};

var test = {
  foo: {}
};
var $Object = Object;
var hasProto$1 = function hasProto() {
  return {
    __proto__: test
  }.foo === test.foo && !({
    __proto__: null
  } instanceof $Object);
};

var bind$2 = functionBind;
var src = bind$2.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$6 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function getEvalledConstructor(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  } catch (e) {}
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, '');
  } catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function throwTypeError() {
  throw new $TypeError$6();
};
var ThrowTypeError = $gOPD ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$3 = hasSymbols$4();
var hasProto = hasProto$1();
var getProto$1 = Object.getPrototypeOf || (hasProto ? function (x) {
  return x.__proto__;
} // eslint-disable-line no-proto
: null);
var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);
var INTRINSICS = {
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols$3 && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  '%AsyncFromSyncIteratorPrototype%': undefined$1,
  '%AsyncFunction%': needsEval,
  '%AsyncGenerator%': needsEval,
  '%AsyncGeneratorFunction%': needsEval,
  '%AsyncIteratorPrototype%': needsEval,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
  '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
  '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': needsEval,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols$3 && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  '%JSON%': (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) === 'object' ? JSON : undefined$1,
  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$3 || !getProto$1 ? undefined$1 : getProto$1(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$3 || !getProto$1 ? undefined$1 : getProto$1(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols$3 && getProto$1 ? getProto$1(''[Symbol.iterator]()) : undefined$1,
  '%Symbol%': hasSymbols$3 ? Symbol : undefined$1,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError$6,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};
if (getProto$1) {
  try {
    null.error; // eslint-disable-line no-unused-expressions
  } catch (e) {
    // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
    var errorProto = getProto$1(getProto$1(e));
    INTRINSICS['%Error.prototype%'] = errorProto;
  }
}
var doEval = function doEval(name) {
  var value;
  if (name === '%AsyncFunction%') {
    value = getEvalledConstructor('async function () {}');
  } else if (name === '%GeneratorFunction%') {
    value = getEvalledConstructor('function* () {}');
  } else if (name === '%AsyncGeneratorFunction%') {
    value = getEvalledConstructor('async function* () {}');
  } else if (name === '%AsyncGenerator%') {
    var fn = doEval('%AsyncGeneratorFunction%');
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    var gen = doEval('%AsyncGenerator%');
    if (gen && getProto$1) {
      value = getProto$1(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype']
};
var bind$1 = functionBind;
var hasOwn = src;
var $concat = bind$1.call(Function.call, Array.prototype.concat);
var $spliceApply = bind$1.call(Function.apply, Array.prototype.splice);
var $replace = bind$1.call(Function.call, String.prototype.replace);
var $strSlice = bind$1.call(Function.call, String.prototype.slice);
var $exec = bind$1.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === '%' && last !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
  } else if (last === '%' && first !== '%') {
    throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
  }
  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError$6('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }
    return {
      alias: alias,
      name: intrinsicName,
      value: value
    };
  }
  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError$6('intrinsic name must be a non-empty string');
  }
  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError$6('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
      throw new $SyntaxError('property names with quotes must have matching quotes');
    }
    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += '.' + part;
    intrinsicRealName = '%' + intrinsicBaseName + '%';
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$6('base intrinsic for ' + name + ' exists, but the property is not available.');
        }
        return void undefined$1;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;

        // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.
        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};

var GetIntrinsic$c = getIntrinsic;
var $defineProperty = GetIntrinsic$c('%Object.defineProperty%', true);
var hasPropertyDescriptors$2 = function hasPropertyDescriptors() {
  if ($defineProperty) {
    try {
      $defineProperty({}, 'a', {
        value: 1
      });
      return true;
    } catch (e) {
      // IE 8 has a broken defineProperty
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors$2.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  // node v0.6 has a bug where array lengths can be Set but not Defined
  if (!hasPropertyDescriptors$2()) {
    return null;
  }
  try {
    return $defineProperty([], 'length', {
      value: 1
    }).length !== 1;
  } catch (e) {
    // In Firefox 4-22, defining length on an array throws an exception.
    return true;
  }
};
var hasPropertyDescriptors_1 = hasPropertyDescriptors$2;

var keys = objectKeys;
var hasSymbols$2 = typeof Symbol === 'function' && _typeof(Symbol('foo')) === 'symbol';
var toStr$2 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;
var isFunction = function isFunction(fn) {
  return typeof fn === 'function' && toStr$2.call(fn) === '[object Function]';
};
var hasPropertyDescriptors$1 = hasPropertyDescriptors_1();
var supportsDescriptors = origDefineProperty && hasPropertyDescriptors$1;
var defineProperty = function defineProperty(object, name, value, predicate) {
  if (name in object) {
    if (predicate === true) {
      if (object[name] === value) {
        return;
      }
    } else if (!isFunction(predicate) || !predicate()) {
      return;
    }
  }
  if (supportsDescriptors) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    });
  } else {
    object[name] = value; // eslint-disable-line no-param-reassign
  }
};

var defineProperties$1 = function defineProperties(object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys(map);
  if (hasSymbols$2) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
  }
};
defineProperties$1.supportsDescriptors = !!supportsDescriptors;
var defineProperties_1 = defineProperties$1;

var functionsHaveNames = function functionsHaveNames() {
  return typeof function f() {}.name === 'string';
};
var gOPD = Object.getOwnPropertyDescriptor;
if (gOPD) {
  try {
    gOPD([], 'length');
  } catch (e) {
    // IE 8 has a broken gOPD
    gOPD = null;
  }
}
functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
  if (!functionsHaveNames() || !gOPD) {
    return false;
  }
  var desc = gOPD(function () {}, 'name');
  return !!desc && !!desc.configurable;
};
var $bind = Function.prototype.bind;
functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
  return functionsHaveNames() && typeof $bind === 'function' && function f() {}.bind().name !== '';
};
var functionsHaveNames_1 = functionsHaveNames;

var callBind$1 = {exports: {}};

(function (module) {

  var bind = functionBind;
  var GetIntrinsic = getIntrinsic;
  var $apply = GetIntrinsic('%Function.prototype.apply%');
  var $call = GetIntrinsic('%Function.prototype.call%');
  var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);
  var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
  var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
  var $max = GetIntrinsic('%Math.max%');
  if ($defineProperty) {
    try {
      $defineProperty({}, 'a', {
        value: 1
      });
    } catch (e) {
      // IE 8 has a broken defineProperty
      $defineProperty = null;
    }
  }
  module.exports = function callBind(originalFunction) {
    var func = $reflectApply(bind, $call, arguments);
    if ($gOPD && $defineProperty) {
      var desc = $gOPD(func, 'length');
      if (desc.configurable) {
        // original length, plus the receiver, minus any additional arguments (after the receiver)
        $defineProperty(func, 'length', {
          value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
        });
      }
    }
    return func;
  };
  var applyBind = function applyBind() {
    return $reflectApply(bind, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module.exports, 'apply', {
      value: applyBind
    });
  } else {
    module.exports.apply = applyBind;
  }
})(callBind$1);
var callBindExports = callBind$1.exports;

var GetIntrinsic$b = getIntrinsic;
var callBind = callBindExports;
var $indexOf = callBind(GetIntrinsic$b('String.prototype.indexOf'));
var callBound$3 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$b(name, !!allowMissing);
  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};

var isLeadingSurrogate$1;
var hasRequiredIsLeadingSurrogate;
function requireIsLeadingSurrogate() {
  if (hasRequiredIsLeadingSurrogate) return isLeadingSurrogate$1;
  hasRequiredIsLeadingSurrogate = 1;
  isLeadingSurrogate$1 = function isLeadingSurrogate(charCode) {
    return typeof charCode === 'number' && charCode >= 0xD800 && charCode <= 0xDBFF;
  };
  return isLeadingSurrogate$1;
}

var isTrailingSurrogate$1;
var hasRequiredIsTrailingSurrogate;
function requireIsTrailingSurrogate() {
  if (hasRequiredIsTrailingSurrogate) return isTrailingSurrogate$1;
  hasRequiredIsTrailingSurrogate = 1;
  isTrailingSurrogate$1 = function isTrailingSurrogate(charCode) {
    return typeof charCode === 'number' && charCode >= 0xDC00 && charCode <= 0xDFFF;
  };
  return isTrailingSurrogate$1;
}

// https://262.ecma-international.org/5.1/#sec-8

var Type$9 = function Type(x) {
  if (x === null) {
    return 'Null';
  }
  if (typeof x === 'undefined') {
    return 'Undefined';
  }
  if (typeof x === 'function' || _typeof(x) === 'object') {
    return 'Object';
  }
  if (typeof x === 'number') {
    return 'Number';
  }
  if (typeof x === 'boolean') {
    return 'Boolean';
  }
  if (typeof x === 'string') {
    return 'String';
  }
};

var ES5Type = Type$9;

// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

var Type$8 = function Type(x) {
  if (_typeof(x) === 'symbol') {
    return 'Symbol';
  }
  if (typeof x === 'bigint') {
    return 'BigInt';
  }
  return ES5Type(x);
};

var UTF16SurrogatePairToCodePoint$1;
var hasRequiredUTF16SurrogatePairToCodePoint;
function requireUTF16SurrogatePairToCodePoint() {
  if (hasRequiredUTF16SurrogatePairToCodePoint) return UTF16SurrogatePairToCodePoint$1;
  hasRequiredUTF16SurrogatePairToCodePoint = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var $fromCharCode = GetIntrinsic('%String.fromCharCode%');
  var isLeadingSurrogate = requireIsLeadingSurrogate();
  var isTrailingSurrogate = requireIsTrailingSurrogate();

  // https://tc39.es/ecma262/2020/#sec-utf16decodesurrogatepair

  UTF16SurrogatePairToCodePoint$1 = function UTF16SurrogatePairToCodePoint(lead, trail) {
    if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
      throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
    }
    // var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    return $fromCharCode(lead) + $fromCharCode(trail);
  };
  return UTF16SurrogatePairToCodePoint$1;
}

var GetIntrinsic$a = getIntrinsic;
var $TypeError$5 = GetIntrinsic$a('%TypeError%');
var callBound$2 = callBound$3;
var isLeadingSurrogate = requireIsLeadingSurrogate();
var isTrailingSurrogate = requireIsTrailingSurrogate();
var Type$7 = Type$8;
var UTF16SurrogatePairToCodePoint = requireUTF16SurrogatePairToCodePoint();
var $charAt = callBound$2('String.prototype.charAt');
var $charCodeAt = callBound$2('String.prototype.charCodeAt');

// https://262.ecma-international.org/12.0/#sec-codepointat

var CodePointAt$1 = function CodePointAt(string, position) {
  if (Type$7(string) !== 'String') {
    throw new $TypeError$5('Assertion failed: `string` must be a String');
  }
  var size = string.length;
  if (position < 0 || position >= size) {
    throw new $TypeError$5('Assertion failed: `position` must be >= 0, and < the length of `string`');
  }
  var first = $charCodeAt(string, position);
  var cp = $charAt(string, position);
  var firstIsLeading = isLeadingSurrogate(first);
  var firstIsTrailing = isTrailingSurrogate(first);
  if (!firstIsLeading && !firstIsTrailing) {
    return {
      '[[CodePoint]]': cp,
      '[[CodeUnitCount]]': 1,
      '[[IsUnpairedSurrogate]]': false
    };
  }
  if (firstIsTrailing || position + 1 === size) {
    return {
      '[[CodePoint]]': cp,
      '[[CodeUnitCount]]': 1,
      '[[IsUnpairedSurrogate]]': true
    };
  }
  var second = $charCodeAt(string, position + 1);
  if (!isTrailingSurrogate(second)) {
    return {
      '[[CodePoint]]': cp,
      '[[CodeUnitCount]]': 1,
      '[[IsUnpairedSurrogate]]': true
    };
  }
  return {
    '[[CodePoint]]': UTF16SurrogatePairToCodePoint(first, second),
    '[[CodeUnitCount]]': 2,
    '[[IsUnpairedSurrogate]]': false
  };
};

var GetIntrinsic$9 = getIntrinsic;
var $abs = GetIntrinsic$9('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

var abs$1 = function abs(x) {
  return $abs(x);
};

var Type$6 = Type$8;

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/11.0/#eqn-floor

var floor$1 = function floor(x) {
  // return x - modulo(x, 1);
  if (Type$6(x) === 'BigInt') {
    return x;
  }
  return $floor(x);
};

var _isNaN = Number.isNaN || function isNaN(a) {
  return a !== a;
};

var $isNaN$1 = _isNaN;
var _isFinite = function _isFinite(x) {
  return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN$1(x) && x !== Infinity && x !== -Infinity;
};

var abs = abs$1;
var floor = floor$1;
var Type$5 = Type$8;
var $isNaN = _isNaN;
var $isFinite = _isFinite;

// https://tc39.es/ecma262/#sec-isintegralnumber

var IsIntegralNumber$1 = function IsIntegralNumber(argument) {
  if (Type$5(argument) !== 'Number' || $isNaN(argument) || !$isFinite(argument)) {
    return false;
  }
  var absValue = abs(argument);
  return floor(absValue) === absValue;
};

var GetIntrinsic$8 = getIntrinsic;
var $Math = GetIntrinsic$8('%Math%');
var $Number = GetIntrinsic$8('%Number%');
var maxSafeInteger = $Number.MAX_SAFE_INTEGER || $Math.pow(2, 53) - 1;

var GetIntrinsic$7 = getIntrinsic;
var CodePointAt = CodePointAt$1;
var IsIntegralNumber = IsIntegralNumber$1;
var Type$4 = Type$8;
var MAX_SAFE_INTEGER = maxSafeInteger;
var $TypeError$4 = GetIntrinsic$7('%TypeError%');

// https://262.ecma-international.org/12.0/#sec-advancestringindex

var AdvanceStringIndex$1 = function AdvanceStringIndex(S, index, unicode) {
  if (Type$4(S) !== 'String') {
    throw new $TypeError$4('Assertion failed: `S` must be a String');
  }
  if (!IsIntegralNumber(index) || index < 0 || index > MAX_SAFE_INTEGER) {
    throw new $TypeError$4('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
  }
  if (Type$4(unicode) !== 'Boolean') {
    throw new $TypeError$4('Assertion failed: `unicode` must be a Boolean');
  }
  if (!unicode) {
    return index + 1;
  }
  var length = S.length;
  if (index + 1 >= length) {
    return index + 1;
  }
  var cp = CodePointAt(S, index);
  return index + cp['[[CodeUnitCount]]'];
};

var IsPropertyKey$3;
var hasRequiredIsPropertyKey;
function requireIsPropertyKey() {
  if (hasRequiredIsPropertyKey) return IsPropertyKey$3;
  hasRequiredIsPropertyKey = 1;

  // https://262.ecma-international.org/6.0/#sec-ispropertykey

  IsPropertyKey$3 = function IsPropertyKey(argument) {
    return typeof argument === 'string' || _typeof(argument) === 'symbol';
  };
  return IsPropertyKey$3;
}

var gopd;
var hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var GetIntrinsic = getIntrinsic;
  var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
  if ($gOPD) {
    try {
      $gOPD([], 'length');
    } catch (e) {
      // IE 8 has a broken gOPD
      $gOPD = null;
    }
  }
  gopd = $gOPD;
  return gopd;
}

var isPropertyDescriptor;
var hasRequiredIsPropertyDescriptor;
function requireIsPropertyDescriptor() {
  if (hasRequiredIsPropertyDescriptor) return isPropertyDescriptor;
  hasRequiredIsPropertyDescriptor = 1;
  var GetIntrinsic = getIntrinsic;
  var has = src;
  var $TypeError = GetIntrinsic('%TypeError%');
  isPropertyDescriptor = function IsPropertyDescriptor(ES, Desc) {
    if (ES.Type(Desc) !== 'Object') {
      return false;
    }
    var allowed = {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Get]]': true,
      '[[Set]]': true,
      '[[Value]]': true,
      '[[Writable]]': true
    };
    for (var key in Desc) {
      // eslint-disable-line no-restricted-syntax
      if (has(Desc, key) && !allowed[key]) {
        return false;
      }
    }
    if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
    }
    return true;
  };
  return isPropertyDescriptor;
}

var isMatchRecord;
var hasRequiredIsMatchRecord;
function requireIsMatchRecord() {
  if (hasRequiredIsMatchRecord) return isMatchRecord;
  hasRequiredIsMatchRecord = 1;
  var has = src;

  // https://262.ecma-international.org/13.0/#sec-match-records

  isMatchRecord = function isMatchRecord(record) {
    return has(record, '[[StartIndex]]') && has(record, '[[EndIndex]]') && record['[[StartIndex]]'] >= 0 && record['[[EndIndex]]'] >= record['[[StartIndex]]'] && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]']) && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]']);
  };
  return isMatchRecord;
}

var assertRecord;
var hasRequiredAssertRecord;
function requireAssertRecord() {
  if (hasRequiredAssertRecord) return assertRecord;
  hasRequiredAssertRecord = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var $SyntaxError = GetIntrinsic('%SyntaxError%');
  var has = src;
  var isMatchRecord = requireIsMatchRecord();
  var predicates = {
    // https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
    'Property Descriptor': function isPropertyDescriptor(Desc) {
      var allowed = {
        '[[Configurable]]': true,
        '[[Enumerable]]': true,
        '[[Get]]': true,
        '[[Set]]': true,
        '[[Value]]': true,
        '[[Writable]]': true
      };
      if (!Desc) {
        return false;
      }
      for (var key in Desc) {
        // eslint-disable-line
        if (has(Desc, key) && !allowed[key]) {
          return false;
        }
      }
      var isData = has(Desc, '[[Value]]');
      var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
      if (isData && IsAccessor) {
        throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
      }
      return true;
    },
    // https://262.ecma-international.org/13.0/#sec-match-records
    'Match Record': isMatchRecord,
    'Iterator Record': function isIteratorRecord(value) {
      return has(value, '[[Iterator]]') && has(value, '[[NextMethod]]') && has(value, '[[Done]]');
    },
    'PromiseCapability Record': function isPromiseCapabilityRecord(value) {
      return !!value && has(value, '[[Resolve]]') && typeof value['[[Resolve]]'] === 'function' && has(value, '[[Reject]]') && typeof value['[[Reject]]'] === 'function' && has(value, '[[Promise]]') && value['[[Promise]]'] && typeof value['[[Promise]]'].then === 'function';
    },
    'AsyncGeneratorRequest Record': function isAsyncGeneratorRequestRecord(value) {
      return !!value && has(value, '[[Completion]]') // TODO: confirm is a completion record
      && has(value, '[[Capability]]') && predicates['PromiseCapability Record'](value['[[Capability]]']);
    }
  };
  assertRecord = function assertRecord(Type, recordType, argumentName, value) {
    var predicate = predicates[recordType];
    if (typeof predicate !== 'function') {
      throw new $SyntaxError('unknown record type: ' + recordType);
    }
    if (Type(value) !== 'Object' || !predicate(value)) {
      throw new $TypeError(argumentName + ' must be a ' + recordType);
    }
  };
  return assertRecord;
}

var IsAccessorDescriptor;
var hasRequiredIsAccessorDescriptor;
function requireIsAccessorDescriptor() {
  if (hasRequiredIsAccessorDescriptor) return IsAccessorDescriptor;
  hasRequiredIsAccessorDescriptor = 1;
  var has = src;
  var Type = Type$8;
  var assertRecord = requireAssertRecord();

  // https://262.ecma-international.org/5.1/#sec-8.10.1

  IsAccessorDescriptor = function IsAccessorDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }
    assertRecord(Type, 'Property Descriptor', 'Desc', Desc);
    if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
      return false;
    }
    return true;
  };
  return IsAccessorDescriptor;
}

var IsDataDescriptor$1;
var hasRequiredIsDataDescriptor;
function requireIsDataDescriptor() {
  if (hasRequiredIsDataDescriptor) return IsDataDescriptor$1;
  hasRequiredIsDataDescriptor = 1;
  var has = src;
  var Type = Type$8;
  var assertRecord = requireAssertRecord();

  // https://262.ecma-international.org/5.1/#sec-8.10.2

  IsDataDescriptor$1 = function IsDataDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }
    assertRecord(Type, 'Property Descriptor', 'Desc', Desc);
    if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
      return false;
    }
    return true;
  };
  return IsDataDescriptor$1;
}

var isPrimitive;
var hasRequiredIsPrimitive;
function requireIsPrimitive() {
  if (hasRequiredIsPrimitive) return isPrimitive;
  hasRequiredIsPrimitive = 1;
  isPrimitive = function isPrimitive(value) {
    return value === null || typeof value !== 'function' && _typeof(value) !== 'object';
  };
  return isPrimitive;
}

var IsExtensible;
var hasRequiredIsExtensible;
function requireIsExtensible() {
  if (hasRequiredIsExtensible) return IsExtensible;
  hasRequiredIsExtensible = 1;
  var GetIntrinsic = getIntrinsic;
  var $preventExtensions = GetIntrinsic('%Object.preventExtensions%', true);
  var $isExtensible = GetIntrinsic('%Object.isExtensible%', true);
  var isPrimitive = requireIsPrimitive();

  // https://262.ecma-international.org/6.0/#sec-isextensible-o

  IsExtensible = $preventExtensions ? function IsExtensible(obj) {
    return !isPrimitive(obj) && $isExtensible(obj);
  } : function IsExtensible(obj) {
    return !isPrimitive(obj);
  };
  return IsExtensible;
}

var ToBoolean;
var hasRequiredToBoolean;
function requireToBoolean() {
  if (hasRequiredToBoolean) return ToBoolean;
  hasRequiredToBoolean = 1;

  // http://262.ecma-international.org/5.1/#sec-9.2

  ToBoolean = function ToBoolean(value) {
    return !!value;
  };
  return ToBoolean;
}

var isCallable;
var hasRequiredIsCallable$1;
function requireIsCallable$1() {
  if (hasRequiredIsCallable$1) return isCallable;
  hasRequiredIsCallable$1 = 1;
  var fnToStr = Function.prototype.toString;
  var reflectApply = (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
    try {
      badArrayLike = Object.defineProperty({}, 'length', {
        get: function get() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      // eslint-disable-next-line no-throw-literal
      reflectApply(function () {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply = null;
      }
    }
  } else {
    reflectApply = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false; // not a function
    }
  };

  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr = Object.prototype.toString;
  var objectClass = '[object Object]';
  var fnClass = '[object Function]';
  var genClass = '[object GeneratorFunction]';
  var ddaClass = '[object HTMLAllCollection]'; // IE 11
  var ddaClass2 = '[object HTML document.all class]';
  var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
  var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

  var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object') {
    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        /* globals document: false */
        // in IE 6-8, typeof document.all is "object" and it's truthy
        if ((isIE68 || !value) && (typeof value === 'undefined' || _typeof(value) === 'object')) {
          try {
            var str = toStr.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 // opera 12.16
            || str === objectClass // IE 6-8
            ) && value('') == null; // eslint-disable-line eqeqeq
          } catch (e) {/**/}
        }
        return false;
      };
    }
  }
  isCallable = reflectApply ? function isCallable(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== 'function' && _typeof(value) !== 'object') {
      return false;
    }
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== 'function' && _typeof(value) !== 'object') {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
      return false;
    }
    return tryFunctionObject(value);
  };
  return isCallable;
}

var IsCallable$1;
var hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable) return IsCallable$1;
  hasRequiredIsCallable = 1;

  // http://262.ecma-international.org/5.1/#sec-9.11

  IsCallable$1 = requireIsCallable$1();
  return IsCallable$1;
}

var ToPropertyDescriptor;
var hasRequiredToPropertyDescriptor;
function requireToPropertyDescriptor() {
  if (hasRequiredToPropertyDescriptor) return ToPropertyDescriptor;
  hasRequiredToPropertyDescriptor = 1;
  var has = src;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var Type = Type$8;
  var ToBoolean = requireToBoolean();
  var IsCallable = requireIsCallable();

  // https://262.ecma-international.org/5.1/#sec-8.10.5

  ToPropertyDescriptor = function ToPropertyDescriptor(Obj) {
    if (Type(Obj) !== 'Object') {
      throw new $TypeError('ToPropertyDescriptor requires an object');
    }
    var desc = {};
    if (has(Obj, 'enumerable')) {
      desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
    }
    if (has(Obj, 'configurable')) {
      desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
    }
    if (has(Obj, 'value')) {
      desc['[[Value]]'] = Obj.value;
    }
    if (has(Obj, 'writable')) {
      desc['[[Writable]]'] = ToBoolean(Obj.writable);
    }
    if (has(Obj, 'get')) {
      var getter = Obj.get;
      if (typeof getter !== 'undefined' && !IsCallable(getter)) {
        throw new $TypeError('getter must be a function');
      }
      desc['[[Get]]'] = getter;
    }
    if (has(Obj, 'set')) {
      var setter = Obj.set;
      if (typeof setter !== 'undefined' && !IsCallable(setter)) {
        throw new $TypeError('setter must be a function');
      }
      desc['[[Set]]'] = setter;
    }
    if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
      throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
    }
    return desc;
  };
  return ToPropertyDescriptor;
}

var SameValue$1;
var hasRequiredSameValue;
function requireSameValue() {
  if (hasRequiredSameValue) return SameValue$1;
  hasRequiredSameValue = 1;
  var $isNaN = _isNaN;

  // http://262.ecma-international.org/5.1/#sec-9.12

  SameValue$1 = function SameValue(x, y) {
    if (x === y) {
      // 0 === -0, but they are not identical.
      if (x === 0) {
        return 1 / x === 1 / y;
      }
      return true;
    }
    return $isNaN(x) && $isNaN(y);
  };
  return SameValue$1;
}

var GetIntrinsic$6 = getIntrinsic;
var $Array = GetIntrinsic$6('%Array%');

// eslint-disable-next-line global-require
var toStr$1 = !$Array.isArray && callBound$3('Object.prototype.toString');
var IsArray$2 = $Array.isArray || function IsArray(argument) {
  return toStr$1(argument) === '[object Array]';
};

var DefineOwnProperty$1;
var hasRequiredDefineOwnProperty;
function requireDefineOwnProperty() {
  if (hasRequiredDefineOwnProperty) return DefineOwnProperty$1;
  hasRequiredDefineOwnProperty = 1;
  var hasPropertyDescriptors = hasPropertyDescriptors_1;
  var GetIntrinsic = getIntrinsic;
  var $defineProperty = hasPropertyDescriptors() && GetIntrinsic('%Object.defineProperty%', true);
  var hasArrayLengthDefineBug = hasPropertyDescriptors.hasArrayLengthDefineBug();

  // eslint-disable-next-line global-require
  var isArray = hasArrayLengthDefineBug && IsArray$2;
  var callBound = callBound$3;
  var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

  // eslint-disable-next-line max-params
  DefineOwnProperty$1 = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
    if (!$defineProperty) {
      if (!IsDataDescriptor(desc)) {
        // ES3 does not support getters/setters
        return false;
      }
      if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
        return false;
      }

      // fallback for ES3
      if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
        // a non-enumerable existing property
        return false;
      }

      // property does not exist at all, or exists but is enumerable
      var V = desc['[[Value]]'];
      // eslint-disable-next-line no-param-reassign
      O[P] = V; // will use [[Define]]
      return SameValue(O[P], V);
    }
    if (hasArrayLengthDefineBug && P === 'length' && '[[Value]]' in desc && isArray(O) && O.length !== desc['[[Value]]']) {
      // eslint-disable-next-line no-param-reassign
      O.length = desc['[[Value]]'];
      return O.length === desc['[[Value]]'];
    }
    $defineProperty(O, P, FromPropertyDescriptor(desc));
    return true;
  };
  return DefineOwnProperty$1;
}

var isFullyPopulatedPropertyDescriptor;
var hasRequiredIsFullyPopulatedPropertyDescriptor;
function requireIsFullyPopulatedPropertyDescriptor() {
  if (hasRequiredIsFullyPopulatedPropertyDescriptor) return isFullyPopulatedPropertyDescriptor;
  hasRequiredIsFullyPopulatedPropertyDescriptor = 1;
  isFullyPopulatedPropertyDescriptor = function isFullyPopulatedPropertyDescriptor(ES, Desc) {
    return !!Desc && _typeof(Desc) === 'object' && '[[Enumerable]]' in Desc && '[[Configurable]]' in Desc && (ES.IsAccessorDescriptor(Desc) || ES.IsDataDescriptor(Desc));
  };
  return isFullyPopulatedPropertyDescriptor;
}

var fromPropertyDescriptor;
var hasRequiredFromPropertyDescriptor$1;
function requireFromPropertyDescriptor$1() {
  if (hasRequiredFromPropertyDescriptor$1) return fromPropertyDescriptor;
  hasRequiredFromPropertyDescriptor$1 = 1;
  fromPropertyDescriptor = function fromPropertyDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return Desc;
    }
    var obj = {};
    if ('[[Value]]' in Desc) {
      obj.value = Desc['[[Value]]'];
    }
    if ('[[Writable]]' in Desc) {
      obj.writable = !!Desc['[[Writable]]'];
    }
    if ('[[Get]]' in Desc) {
      obj.get = Desc['[[Get]]'];
    }
    if ('[[Set]]' in Desc) {
      obj.set = Desc['[[Set]]'];
    }
    if ('[[Enumerable]]' in Desc) {
      obj.enumerable = !!Desc['[[Enumerable]]'];
    }
    if ('[[Configurable]]' in Desc) {
      obj.configurable = !!Desc['[[Configurable]]'];
    }
    return obj;
  };
  return fromPropertyDescriptor;
}

var FromPropertyDescriptor$1;
var hasRequiredFromPropertyDescriptor;
function requireFromPropertyDescriptor() {
  if (hasRequiredFromPropertyDescriptor) return FromPropertyDescriptor$1;
  hasRequiredFromPropertyDescriptor = 1;
  var assertRecord = requireAssertRecord();
  var fromPropertyDescriptor = requireFromPropertyDescriptor$1();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-frompropertydescriptor

  FromPropertyDescriptor$1 = function FromPropertyDescriptor(Desc) {
    if (typeof Desc !== 'undefined') {
      assertRecord(Type, 'Property Descriptor', 'Desc', Desc);
    }
    return fromPropertyDescriptor(Desc);
  };
  return FromPropertyDescriptor$1;
}

var IsGenericDescriptor;
var hasRequiredIsGenericDescriptor;
function requireIsGenericDescriptor() {
  if (hasRequiredIsGenericDescriptor) return IsGenericDescriptor;
  hasRequiredIsGenericDescriptor = 1;
  var assertRecord = requireAssertRecord();
  var IsAccessorDescriptor = requireIsAccessorDescriptor();
  var IsDataDescriptor = requireIsDataDescriptor();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-isgenericdescriptor

  IsGenericDescriptor = function IsGenericDescriptor(Desc) {
    if (typeof Desc === 'undefined') {
      return false;
    }
    assertRecord(Type, 'Property Descriptor', 'Desc', Desc);
    if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
      return true;
    }
    return false;
  };
  return IsGenericDescriptor;
}

var ValidateAndApplyPropertyDescriptor;
var hasRequiredValidateAndApplyPropertyDescriptor;
function requireValidateAndApplyPropertyDescriptor() {
  if (hasRequiredValidateAndApplyPropertyDescriptor) return ValidateAndApplyPropertyDescriptor;
  hasRequiredValidateAndApplyPropertyDescriptor = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var DefineOwnProperty = requireDefineOwnProperty();
  var isFullyPopulatedPropertyDescriptor = requireIsFullyPopulatedPropertyDescriptor();
  var isPropertyDescriptor = requireIsPropertyDescriptor();
  var FromPropertyDescriptor = requireFromPropertyDescriptor();
  var IsAccessorDescriptor = requireIsAccessorDescriptor();
  var IsDataDescriptor = requireIsDataDescriptor();
  var IsGenericDescriptor = requireIsGenericDescriptor();
  var IsPropertyKey = requireIsPropertyKey();
  var SameValue = requireSameValue();
  var Type = Type$8;

  // https://262.ecma-international.org/13.0/#sec-validateandapplypropertydescriptor

  // see https://github.com/tc39/ecma262/pull/2468 for ES2022 changes

  // eslint-disable-next-line max-lines-per-function, max-statements, max-params
  ValidateAndApplyPropertyDescriptor = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
    var oType = Type(O);
    if (oType !== 'Undefined' && oType !== 'Object') {
      throw new $TypeError('Assertion failed: O must be undefined or an Object');
    }
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }
    if (Type(extensible) !== 'Boolean') {
      throw new $TypeError('Assertion failed: extensible must be a Boolean');
    }
    if (!isPropertyDescriptor({
      Type: Type,
      IsDataDescriptor: IsDataDescriptor,
      IsAccessorDescriptor: IsAccessorDescriptor
    }, Desc)) {
      throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
    }
    if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
      Type: Type,
      IsDataDescriptor: IsDataDescriptor,
      IsAccessorDescriptor: IsAccessorDescriptor
    }, current)) {
      throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
    }
    if (Type(current) === 'Undefined') {
      // step 2
      if (!extensible) {
        return false; // step 2.a
      }

      if (oType === 'Undefined') {
        return true; // step 2.b
      }

      if (IsAccessorDescriptor(Desc)) {
        // step 2.c
        return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, Desc);
      }
      // step 2.d
      return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, {
        '[[Configurable]]': !!Desc['[[Configurable]]'],
        '[[Enumerable]]': !!Desc['[[Enumerable]]'],
        '[[Value]]': Desc['[[Value]]'],
        '[[Writable]]': !!Desc['[[Writable]]']
      });
    }

    // 3. Assert: current is a fully populated Property Descriptor.
    if (!isFullyPopulatedPropertyDescriptor({
      IsAccessorDescriptor: IsAccessorDescriptor,
      IsDataDescriptor: IsDataDescriptor
    }, current)) {
      throw new $TypeError('`current`, when present, must be a fully populated and valid Property Descriptor');
    }

    // 4. If every field in Desc is absent, return true.
    // this can't really match the assertion that it's a Property Descriptor in our JS implementation

    // 5. If current.[[Configurable]] is false, then
    if (!current['[[Configurable]]']) {
      if ('[[Configurable]]' in Desc && Desc['[[Configurable]]']) {
        // step 5.a
        return false;
      }
      if ('[[Enumerable]]' in Desc && !SameValue(Desc['[[Enumerable]]'], current['[[Enumerable]]'])) {
        // step 5.b
        return false;
      }
      if (!IsGenericDescriptor(Desc) && !SameValue(IsAccessorDescriptor(Desc), IsAccessorDescriptor(current))) {
        // step 5.c
        return false;
      }
      if (IsAccessorDescriptor(current)) {
        // step 5.d
        if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
          return false;
        }
        if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
          return false;
        }
      } else if (!current['[[Writable]]']) {
        // step 5.e
        if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
          return false;
        }
        if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
          return false;
        }
      }
    }

    // 6. If O is not undefined, then
    if (oType !== 'Undefined') {
      var configurable;
      var enumerable;
      if (IsDataDescriptor(current) && IsAccessorDescriptor(Desc)) {
        // step 6.a
        configurable = ('[[Configurable]]' in Desc ? Desc : current)['[[Configurable]]'];
        enumerable = ('[[Enumerable]]' in Desc ? Desc : current)['[[Enumerable]]'];
        // Replace the property named P of object O with an accessor property having [[Configurable]] and [[Enumerable]] attributes as described by current and each other attribute set to its default value.
        return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, {
          '[[Configurable]]': !!configurable,
          '[[Enumerable]]': !!enumerable,
          '[[Get]]': ('[[Get]]' in Desc ? Desc : current)['[[Get]]'],
          '[[Set]]': ('[[Set]]' in Desc ? Desc : current)['[[Set]]']
        });
      } else if (IsAccessorDescriptor(current) && IsDataDescriptor(Desc)) {
        configurable = ('[[Configurable]]' in Desc ? Desc : current)['[[Configurable]]'];
        enumerable = ('[[Enumerable]]' in Desc ? Desc : current)['[[Enumerable]]'];
        // i. Replace the property named P of object O with a data property having [[Configurable]] and [[Enumerable]] attributes as described by current and each other attribute set to its default value.
        return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, {
          '[[Configurable]]': !!configurable,
          '[[Enumerable]]': !!enumerable,
          '[[Value]]': ('[[Value]]' in Desc ? Desc : current)['[[Value]]'],
          '[[Writable]]': !!('[[Writable]]' in Desc ? Desc : current)['[[Writable]]']
        });
      }

      // For each field of Desc that is present, set the corresponding attribute of the property named P of object O to the value of the field.
      return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, Desc);
    }
    return true; // step 7
  };

  return ValidateAndApplyPropertyDescriptor;
}

var OrdinaryDefineOwnProperty;
var hasRequiredOrdinaryDefineOwnProperty;
function requireOrdinaryDefineOwnProperty() {
  if (hasRequiredOrdinaryDefineOwnProperty) return OrdinaryDefineOwnProperty;
  hasRequiredOrdinaryDefineOwnProperty = 1;
  var GetIntrinsic = getIntrinsic;
  var $gOPD = requireGopd();
  var $SyntaxError = GetIntrinsic('%SyntaxError%');
  var $TypeError = GetIntrinsic('%TypeError%');
  var isPropertyDescriptor = requireIsPropertyDescriptor();
  var IsAccessorDescriptor = requireIsAccessorDescriptor();
  var IsDataDescriptor = requireIsDataDescriptor();
  var IsExtensible = requireIsExtensible();
  var IsPropertyKey = requireIsPropertyKey();
  var ToPropertyDescriptor = requireToPropertyDescriptor();
  var SameValue = requireSameValue();
  var Type = Type$8;
  var ValidateAndApplyPropertyDescriptor = requireValidateAndApplyPropertyDescriptor();

  // https://262.ecma-international.org/6.0/#sec-ordinarydefineownproperty

  OrdinaryDefineOwnProperty = function OrdinaryDefineOwnProperty(O, P, Desc) {
    if (Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: O must be an Object');
    }
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }
    if (!isPropertyDescriptor({
      Type: Type,
      IsDataDescriptor: IsDataDescriptor,
      IsAccessorDescriptor: IsAccessorDescriptor
    }, Desc)) {
      throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
    }
    if (!$gOPD) {
      // ES3/IE 8 fallback
      if (IsAccessorDescriptor(Desc)) {
        throw new $SyntaxError('This environment does not support accessor property descriptors.');
      }
      var creatingNormalDataProperty = !(P in O) && Desc['[[Writable]]'] && Desc['[[Enumerable]]'] && Desc['[[Configurable]]'] && '[[Value]]' in Desc;
      var settingExistingDataProperty = P in O && (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]']) && (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]']) && (!('[[Writable]]' in Desc) || Desc['[[Writable]]']) && '[[Value]]' in Desc;
      if (creatingNormalDataProperty || settingExistingDataProperty) {
        O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
        return SameValue(O[P], Desc['[[Value]]']);
      }
      throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
    }
    var desc = $gOPD(O, P);
    var current = desc && ToPropertyDescriptor(desc);
    var extensible = IsExtensible(O);
    return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
  };
  return OrdinaryDefineOwnProperty;
}

var CreateDataProperty$1;
var hasRequiredCreateDataProperty;
function requireCreateDataProperty() {
  if (hasRequiredCreateDataProperty) return CreateDataProperty$1;
  hasRequiredCreateDataProperty = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var IsPropertyKey = requireIsPropertyKey();
  var OrdinaryDefineOwnProperty = requireOrdinaryDefineOwnProperty();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-createdataproperty

  CreateDataProperty$1 = function CreateDataProperty(O, P, V) {
    if (Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }
    var newDesc = {
      '[[Configurable]]': true,
      '[[Enumerable]]': true,
      '[[Value]]': V,
      '[[Writable]]': true
    };
    return OrdinaryDefineOwnProperty(O, P, newDesc);
  };
  return CreateDataProperty$1;
}

var GetIntrinsic$5 = getIntrinsic;
var $TypeError$3 = GetIntrinsic$5('%TypeError%');
var CreateDataProperty = requireCreateDataProperty();
var IsPropertyKey$2 = requireIsPropertyKey();
var Type$3 = Type$8;

// // https://262.ecma-international.org/6.0/#sec-createdatapropertyorthrow

var CreateDataPropertyOrThrow$1 = function CreateDataPropertyOrThrow(O, P, V) {
  if (Type$3(O) !== 'Object') {
    throw new $TypeError$3('Assertion failed: Type(O) is not Object');
  }
  if (!IsPropertyKey$2(P)) {
    throw new $TypeError$3('Assertion failed: IsPropertyKey(P) is not true');
  }
  var success = CreateDataProperty(O, P, V);
  if (!success) {
    throw new $TypeError$3('unable to create data property');
  }
  return success;
};

var GetIntrinsic$4 = getIntrinsic;
var $TypeError$2 = GetIntrinsic$4('%TypeError%');
var DefineOwnProperty = requireDefineOwnProperty();
var FromPropertyDescriptor = requireFromPropertyDescriptor();
var IsDataDescriptor = requireIsDataDescriptor();
var IsPropertyKey$1 = requireIsPropertyKey();
var SameValue = requireSameValue();
var Type$2 = Type$8;

// https://262.ecma-international.org/6.0/#sec-createmethodproperty

var CreateMethodProperty$1 = function CreateMethodProperty(O, P, V) {
  if (Type$2(O) !== 'Object') {
    throw new $TypeError$2('Assertion failed: Type(O) is not Object');
  }
  if (!IsPropertyKey$1(P)) {
    throw new $TypeError$2('Assertion failed: IsPropertyKey(P) is not true');
  }
  var newDesc = {
    '[[Configurable]]': true,
    '[[Enumerable]]': false,
    '[[Value]]': V,
    '[[Writable]]': true
  };
  return DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, newDesc);
};

var CheckObjectCoercible;
var hasRequiredCheckObjectCoercible;
function requireCheckObjectCoercible() {
  if (hasRequiredCheckObjectCoercible) return CheckObjectCoercible;
  hasRequiredCheckObjectCoercible = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');

  // http://262.ecma-international.org/5.1/#sec-9.10

  CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
    if (value == null) {
      throw new $TypeError(optMessage || 'Cannot call method on ' + value);
    }
    return value;
  };
  return CheckObjectCoercible;
}

var RequireObjectCoercible;
var hasRequiredRequireObjectCoercible;
function requireRequireObjectCoercible() {
  if (hasRequiredRequireObjectCoercible) return RequireObjectCoercible;
  hasRequiredRequireObjectCoercible = 1;
  RequireObjectCoercible = requireCheckObjectCoercible();
  return RequireObjectCoercible;
}

var ToObject;
var hasRequiredToObject;
function requireToObject() {
  if (hasRequiredToObject) return ToObject;
  hasRequiredToObject = 1;
  var GetIntrinsic = getIntrinsic;
  var $Object = GetIntrinsic('%Object%');
  var RequireObjectCoercible = requireRequireObjectCoercible();

  // https://262.ecma-international.org/6.0/#sec-toobject

  ToObject = function ToObject(value) {
    RequireObjectCoercible(value);
    return $Object(value);
  };
  return ToObject;
}

var GetV$1;
var hasRequiredGetV;
function requireGetV() {
  if (hasRequiredGetV) return GetV$1;
  hasRequiredGetV = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var IsPropertyKey = requireIsPropertyKey();
  var ToObject = requireToObject();

  // https://262.ecma-international.org/6.0/#sec-getv

  GetV$1 = function GetV(V, P) {
    // 7.3.2.1
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
    }

    // 7.3.2.2-3
    var O = ToObject(V);

    // 7.3.2.4
    return O[P];
  };
  return GetV$1;
}

var util_inspect;
var hasRequiredUtil_inspect;
function requireUtil_inspect() {
  if (hasRequiredUtil_inspect) return util_inspect;
  hasRequiredUtil_inspect = 1;
  util_inspect = b.inspect;
  return util_inspect;
}

var objectInspect;
var hasRequiredObjectInspect;
function requireObjectInspect() {
  if (hasRequiredObjectInspect) return objectInspect;
  hasRequiredObjectInspect = 1;
  var hasMap = typeof Map === 'function' && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === 'function' && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var $match = String.prototype.match;
  var $slice = String.prototype.slice;
  var $replace = String.prototype.replace;
  var $toUpperCase = String.prototype.toUpperCase;
  var $toLowerCase = String.prototype.toLowerCase;
  var $test = RegExp.prototype.test;
  var $concat = Array.prototype.concat;
  var $join = Array.prototype.join;
  var $arrSlice = Array.prototype.slice;
  var $floor = Math.floor;
  var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'symbol' ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === 'function' && _typeof(Symbol.iterator) === 'object';
  // ie, `has-tostringtag/shams
  var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (_typeof(Symbol.toStringTag) === hasShammedSymbols ? 'object' : 'symbol') ? Symbol.toStringTag : null;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype // eslint-disable-line no-proto
  ? function (O) {
    return O.__proto__; // eslint-disable-line no-proto
  } : null);
  function addNumericSeparator(num, str) {
    if (num === Infinity || num === -Infinity || num !== num || num && num > -1000 && num < 1000 || $test.call(/e/, str)) {
      return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
      var _int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
      if (_int !== num) {
        var intStr = String(_int);
        var dec = $slice.call(str, intStr.length + 1);
        return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
      }
    }
    return $replace.call(str, sepRegex, '$&_');
  }
  var utilInspect = requireUtil_inspect();
  var inspectCustom = utilInspect.custom;
  var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
  objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};
    if (has(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
      throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }
    if (has(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;
    if (typeof obj === 'undefined') {
      return 'undefined';
    }
    if (obj === null) {
      return 'null';
    }
    if (typeof obj === 'boolean') {
      return obj ? 'true' : 'false';
    }
    if (typeof obj === 'string') {
      return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
      if (obj === 0) {
        return Infinity / obj > 0 ? '0' : '-0';
      }
      var str = String(obj);
      return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
      var bigIntStr = String(obj) + 'n';
      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }
    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && _typeof(obj) === 'object') {
      return isArray(obj) ? '[Array]' : '[Object]';
    }
    var indent = getIndent(opts, depth);
    if (typeof seen === 'undefined') {
      seen = [];
    } else if (indexOf(seen, obj) >= 0) {
      return '[Circular]';
    }
    function inspect(value, from, noIndent) {
      if (from) {
        seen = $arrSlice.call(seen);
        seen.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has(opts, 'quoteStyle')) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen);
      }
      return inspect_(value, opts, depth + 1, seen);
    }
    if (typeof obj === 'function' && !isRegExp(obj)) {
      // in older engines, regexes are callable
      var name = nameOf(obj);
      var keys = arrObjKeys(obj, inspect);
      return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
      return _typeof(obj) === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
      var s = '<' + $toLowerCase.call(String(obj.nodeName));
      var attrs = obj.attributes || [];
      for (var i = 0; i < attrs.length; i++) {
        s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
      }
      s += '>';
      if (obj.childNodes && obj.childNodes.length) {
        s += '...';
      }
      s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
      return s;
    }
    if (isArray(obj)) {
      if (obj.length === 0) {
        return '[]';
      }
      var xs = arrObjKeys(obj, inspect);
      if (indent && !singleLineValues(xs)) {
        return '[' + indentedJoin(xs, indent) + ']';
      }
      return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect);
      if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
        return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
      }
      if (parts.length === 0) {
        return '[' + String(obj) + ']';
      }
      return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (_typeof(obj) === 'object' && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
        return utilInspect(obj, {
          depth: maxDepth - depth
        });
      } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
        return obj.inspect();
      }
    }
    if (isMap(obj)) {
      var mapParts = [];
      if (mapForEach) {
        mapForEach.call(obj, function (value, key) {
          mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
      }
      return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
      var setParts = [];
      if (setForEach) {
        setForEach.call(obj, function (value) {
          setParts.push(inspect(value, obj));
        });
      }
      return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
      return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
      return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
      return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
      return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
      return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
      var ys = arrObjKeys(obj, inspect);
      var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? '' : 'null prototype';
      var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
      var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
      var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
      if (ys.length === 0) {
        return tag + '{}';
      }
      if (indent) {
        return tag + '{' + indentedJoin(ys, indent) + '}';
      }
      return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
  };
  function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
  }
  function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
  }
  function isArray(obj) {
    return toStr(obj) === '[object Array]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isDate(obj) {
    return toStr(obj) === '[object Date]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isRegExp(obj) {
    return toStr(obj) === '[object RegExp]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isError(obj) {
    return toStr(obj) === '[object Error]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isString(obj) {
    return toStr(obj) === '[object String]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isNumber(obj) {
    return toStr(obj) === '[object Number]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }
  function isBoolean(obj) {
    return toStr(obj) === '[object Boolean]' && (!toStringTag || !(_typeof(obj) === 'object' && toStringTag in obj));
  }

  // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
  function isSymbol(obj) {
    if (hasShammedSymbols) {
      return obj && _typeof(obj) === 'object' && obj instanceof Symbol;
    }
    if (_typeof(obj) === 'symbol') {
      return true;
    }
    if (!obj || _typeof(obj) !== 'object' || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {}
    return false;
  }
  function isBigInt(obj) {
    if (!obj || _typeof(obj) !== 'object' || !bigIntValueOf) {
      return false;
    }
    try {
      bigIntValueOf.call(obj);
      return true;
    } catch (e) {}
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty || function (key) {
    return key in this;
  };
  function has(obj, key) {
    return hasOwn.call(obj, key);
  }
  function toStr(obj) {
    return objectToString.call(obj);
  }
  function nameOf(f) {
    if (f.name) {
      return f.name;
    }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) {
      return m[1];
    }
    return null;
  }
  function indexOf(xs, x) {
    if (xs.indexOf) {
      return xs.indexOf(x);
    }
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  }
  function isMap(x) {
    if (!mapSize || !x || _typeof(x) !== 'object') {
      return false;
    }
    try {
      mapSize.call(x);
      try {
        setSize.call(x);
      } catch (s) {
        return true;
      }
      return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
  }
  function isWeakMap(x) {
    if (!weakMapHas || !x || _typeof(x) !== 'object') {
      return false;
    }
    try {
      weakMapHas.call(x, weakMapHas);
      try {
        weakSetHas.call(x, weakSetHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
  }
  function isWeakRef(x) {
    if (!weakRefDeref || !x || _typeof(x) !== 'object') {
      return false;
    }
    try {
      weakRefDeref.call(x);
      return true;
    } catch (e) {}
    return false;
  }
  function isSet(x) {
    if (!setSize || !x || _typeof(x) !== 'object') {
      return false;
    }
    try {
      setSize.call(x);
      try {
        mapSize.call(x);
      } catch (m) {
        return true;
      }
      return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
  }
  function isWeakSet(x) {
    if (!weakSetHas || !x || _typeof(x) !== 'object') {
      return false;
    }
    try {
      weakSetHas.call(x, weakSetHas);
      try {
        weakMapHas.call(x, weakMapHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
  }
  function isElement(x) {
    if (!x || _typeof(x) !== 'object') {
      return false;
    }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
      return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
      return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
  }
  function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
      8: 'b',
      9: 't',
      10: 'n',
      12: 'f',
      13: 'r'
    }[n];
    if (x) {
      return '\\' + x;
    }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
  }
  function markBoxed(str) {
    return 'Object(' + str + ')';
  }
  function weakCollectionOf(type) {
    return type + ' { ? }';
  }
  function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
  }
  function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
      if (indexOf(xs[i], '\n') >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
      baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
      baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: $join.call(Array(depth + 1), baseIndent)
    };
  }
  function indentedJoin(xs, indent) {
    if (xs.length === 0) {
      return '';
    }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
  }
  function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
      xs.length = obj.length;
      for (var i = 0; i < obj.length; i++) {
        xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
      }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k = 0; k < syms.length; k++) {
        symMap['$' + syms[k]] = syms[k];
      }
    }
    for (var key in obj) {
      // eslint-disable-line no-restricted-syntax
      if (!has(obj, key)) {
        continue;
      } // eslint-disable-line no-restricted-syntax, no-continue
      if (isArr && String(Number(key)) === key && key < obj.length) {
        continue;
      } // eslint-disable-line no-restricted-syntax, no-continue
      if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
        // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
        continue; // eslint-disable-line no-restricted-syntax, no-continue
      } else if ($test.call(/[^\w$]/, key)) {
        xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
      } else {
        xs.push(key + ': ' + inspect(obj[key], obj));
      }
    }
    if (typeof gOPS === 'function') {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable.call(obj, syms[j])) {
          xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
        }
      }
    }
    return xs;
  }
  return objectInspect;
}

var GetIntrinsic$3 = getIntrinsic;
var $TypeError$1 = GetIntrinsic$3('%TypeError%');
var GetV = requireGetV();
var IsCallable = requireIsCallable();
var IsPropertyKey = requireIsPropertyKey();
var inspect = requireObjectInspect();

// https://262.ecma-international.org/6.0/#sec-getmethod

var GetMethod$1 = function GetMethod(O, P) {
  // 7.3.9.1
  if (!IsPropertyKey(P)) {
    throw new $TypeError$1('Assertion failed: IsPropertyKey(P) is not true');
  }

  // 7.3.9.2
  var func = GetV(O, P);

  // 7.3.9.4
  if (func == null) {
    return void 0;
  }

  // 7.3.9.5
  if (!IsCallable(func)) {
    throw new $TypeError$1(inspect(P) + ' is not a function: ' + inspect(func));
  }

  // 7.3.9.6
  return func;
};

// https://262.ecma-international.org/6.0/#sec-isarray
var IsArray$1 = IsArray$2;

var hasSymbols$1 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$1() && !!Symbol.toStringTag;
};

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
  try {
    strValue.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = shams();
var isString$1 = function isString(value) {
  if (typeof value === 'string') {
    return true;
  }
  if (_typeof(value) !== 'object') {
    return false;
  }
  return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};

var hasSymbols = hasSymbols$4();
var GetIntrinsic$2 = getIntrinsic;
var callBound$1 = callBound$3;
var isString = isString$1;
var $iterator = GetIntrinsic$2('%Symbol.iterator%', true);
var $stringSlice = callBound$1('String.prototype.slice');
var $String = GetIntrinsic$2('%String%');
var getIteratorMethod$1 = function getIteratorMethod(ES, iterable) {
  var usingIterator;
  if (hasSymbols) {
    usingIterator = ES.GetMethod(iterable, $iterator);
  } else if (ES.IsArray(iterable)) {
    usingIterator = function usingIterator() {
      var i = -1;
      var arr = this; // eslint-disable-line no-invalid-this
      return {
        next: function next() {
          i += 1;
          return {
            done: i >= arr.length,
            value: arr[i]
          };
        }
      };
    };
  } else if (isString(iterable)) {
    usingIterator = function usingIterator() {
      var i = 0;
      return {
        next: function next() {
          var nextIndex = ES.AdvanceStringIndex($String(iterable), i, true);
          var value = $stringSlice(iterable, i, nextIndex);
          i = nextIndex;
          return {
            done: nextIndex > iterable.length,
            value: value
          };
        }
      };
    };
  }
  return usingIterator;
};

var Call;
var hasRequiredCall;
function requireCall() {
  if (hasRequiredCall) return Call;
  hasRequiredCall = 1;
  var GetIntrinsic = getIntrinsic;
  var callBound = callBound$3;
  var $TypeError = GetIntrinsic('%TypeError%');
  var IsArray = IsArray$1;
  var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('Function.prototype.apply');

  // https://262.ecma-international.org/6.0/#sec-call

  Call = function Call(F, V) {
    var argumentsList = arguments.length > 2 ? arguments[2] : [];
    if (!IsArray(argumentsList)) {
      throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
    }
    return $apply(F, V, argumentsList);
  };
  return Call;
}

var GetIterator$1;
var hasRequiredGetIterator;
function requireGetIterator() {
  if (hasRequiredGetIterator) return GetIterator$1;
  hasRequiredGetIterator = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var $SyntaxError = GetIntrinsic('%SyntaxError%');
  var $asyncIterator = GetIntrinsic('%Symbol.asyncIterator%', true);
  var inspect = requireObjectInspect();
  var hasSymbols = hasSymbols$4();
  var getIteratorMethod = getIteratorMethod$1;
  var AdvanceStringIndex = AdvanceStringIndex$1;
  var Call = requireCall();
  var GetMethod = GetMethod$1;
  var IsArray = IsArray$1;
  var Type = Type$8;

  // https://262.ecma-international.org/11.0/#sec-getiterator

  GetIterator$1 = function GetIterator(obj, hint, method) {
    var actualHint = hint;
    if (arguments.length < 2) {
      actualHint = 'sync';
    }
    if (actualHint !== 'sync' && actualHint !== 'async') {
      throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
    }
    var actualMethod = method;
    if (arguments.length < 3) {
      if (actualHint === 'async') {
        if (hasSymbols && $asyncIterator) {
          actualMethod = GetMethod(obj, $asyncIterator);
        }
        if (actualMethod === undefined) {
          throw new $SyntaxError("async from sync iterators aren't currently supported");
        }
      } else {
        actualMethod = getIteratorMethod({
          AdvanceStringIndex: AdvanceStringIndex,
          GetMethod: GetMethod,
          IsArray: IsArray
        }, obj);
      }
    }
    var iterator = Call(actualMethod, obj);
    if (Type(iterator) !== 'Object') {
      throw new $TypeError('iterator must return an object');
    }
    return iterator;

    // TODO: This should return an IteratorRecord
    /*
    var nextMethod = GetV(iterator, 'next');
    return {
    	'[[Iterator]]': iterator,
    	'[[NextMethod]]': nextMethod,
    	'[[Done]]': false
    };
    */
  };

  return GetIterator$1;
}

var Get;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return Get;
  hasRequiredGet = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var inspect = requireObjectInspect();
  var IsPropertyKey = requireIsPropertyKey();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-get-o-p

  Get = function Get(O, P) {
    // 7.3.1.1
    if (Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(O) is not Object');
    }
    // 7.3.1.2
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
    }
    // 7.3.1.3
    return O[P];
  };
  return Get;
}

var IteratorComplete;
var hasRequiredIteratorComplete;
function requireIteratorComplete() {
  if (hasRequiredIteratorComplete) return IteratorComplete;
  hasRequiredIteratorComplete = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var Get = requireGet();
  var ToBoolean = requireToBoolean();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-iteratorcomplete

  IteratorComplete = function IteratorComplete(iterResult) {
    if (Type(iterResult) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
    }
    return ToBoolean(Get(iterResult, 'done'));
  };
  return IteratorComplete;
}

var Invoke;
var hasRequiredInvoke;
function requireInvoke() {
  if (hasRequiredInvoke) return Invoke;
  hasRequiredInvoke = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var Call = requireCall();
  var IsArray = IsArray$1;
  var GetV = requireGetV();
  var IsPropertyKey = requireIsPropertyKey();

  // https://262.ecma-international.org/6.0/#sec-invoke

  Invoke = function Invoke(O, P) {
    if (!IsPropertyKey(P)) {
      throw new $TypeError('Assertion failed: P must be a Property Key');
    }
    var argumentsList = arguments.length > 2 ? arguments[2] : [];
    if (!IsArray(argumentsList)) {
      throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
    }
    var func = GetV(O, P);
    return Call(func, O, argumentsList);
  };
  return Invoke;
}

var IteratorNext;
var hasRequiredIteratorNext;
function requireIteratorNext() {
  if (hasRequiredIteratorNext) return IteratorNext;
  hasRequiredIteratorNext = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var Invoke = requireInvoke();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-iteratornext

  IteratorNext = function IteratorNext(iterator, value) {
    var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
    if (Type(result) !== 'Object') {
      throw new $TypeError('iterator next must return an object');
    }
    return result;
  };
  return IteratorNext;
}

var IteratorStep$1;
var hasRequiredIteratorStep;
function requireIteratorStep() {
  if (hasRequiredIteratorStep) return IteratorStep$1;
  hasRequiredIteratorStep = 1;
  var IteratorComplete = requireIteratorComplete();
  var IteratorNext = requireIteratorNext();

  // https://262.ecma-international.org/6.0/#sec-iteratorstep

  IteratorStep$1 = function IteratorStep(iterator) {
    var result = IteratorNext(iterator);
    var done = IteratorComplete(result);
    return done === true ? false : result;
  };
  return IteratorStep$1;
}

var IteratorValue$1;
var hasRequiredIteratorValue;
function requireIteratorValue() {
  if (hasRequiredIteratorValue) return IteratorValue$1;
  hasRequiredIteratorValue = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var Get = requireGet();
  var Type = Type$8;

  // https://262.ecma-international.org/6.0/#sec-iteratorvalue

  IteratorValue$1 = function IteratorValue(iterResult) {
    if (Type(iterResult) !== 'Object') {
      throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
    }
    return Get(iterResult, 'value');
  };
  return IteratorValue$1;
}

var callBound = callBound$3;
var $arrayPush = callBound('Array.prototype.push');
var GetIterator = requireGetIterator();
var IteratorStep = requireIteratorStep();
var IteratorValue = requireIteratorValue();

// https://262.ecma-international.org/12.0/#sec-iterabletolist

var IterableToList$1 = function IterableToList(items) {
  var iterator;
  if (arguments.length > 1) {
    iterator = GetIterator(items, 'sync', arguments[1]);
  } else {
    iterator = GetIterator(items, 'sync');
  }
  var values = [];
  var next = true;
  while (next) {
    next = IteratorStep(iterator);
    if (next) {
      var nextValue = IteratorValue(next);
      $arrayPush(values, nextValue);
    }
  }
  return values;
};

var setProto;
var hasRequiredSetProto;
function requireSetProto() {
  if (hasRequiredSetProto) return setProto;
  hasRequiredSetProto = 1;
  var GetIntrinsic = getIntrinsic;
  var originalSetProto = GetIntrinsic('%Object.setPrototypeOf%', true);
  var hasProto = hasProto$1();
  setProto = originalSetProto || (hasProto ? function (O, proto) {
    O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
    return O;
  } : null);
  return setProto;
}

var getProto;
var hasRequiredGetProto;
function requireGetProto() {
  if (hasRequiredGetProto) return getProto;
  hasRequiredGetProto = 1;
  var GetIntrinsic = getIntrinsic;
  var originalGetProto = GetIntrinsic('%Object.getPrototypeOf%', true);
  var hasProto = hasProto$1();
  getProto = originalGetProto || (hasProto ? function (O) {
    return O.__proto__; // eslint-disable-line no-proto
  } : null);
  return getProto;
}

var OrdinaryGetPrototypeOf$1;
var hasRequiredOrdinaryGetPrototypeOf;
function requireOrdinaryGetPrototypeOf() {
  if (hasRequiredOrdinaryGetPrototypeOf) return OrdinaryGetPrototypeOf$1;
  hasRequiredOrdinaryGetPrototypeOf = 1;
  var GetIntrinsic = getIntrinsic;
  var $TypeError = GetIntrinsic('%TypeError%');
  var $getProto = requireGetProto();
  var Type = Type$8;

  // https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

  OrdinaryGetPrototypeOf$1 = function OrdinaryGetPrototypeOf(O) {
    if (Type(O) !== 'Object') {
      throw new $TypeError('Assertion failed: O must be an Object');
    }
    if (!$getProto) {
      throw new $TypeError('This environment does not support fetching prototypes.');
    }
    return $getProto(O);
  };
  return OrdinaryGetPrototypeOf$1;
}

var GetIntrinsic$1 = getIntrinsic;
var $TypeError = GetIntrinsic$1('%TypeError%');
var $setProto = requireSetProto();
var OrdinaryGetPrototypeOf = requireOrdinaryGetPrototypeOf();
var Type$1 = Type$8;

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

var OrdinarySetPrototypeOf$1 = function OrdinarySetPrototypeOf(O, V) {
  if (Type$1(V) !== 'Object' && Type$1(V) !== 'Null') {
    throw new $TypeError('Assertion failed: V must be Object or Null');
  }
  /*
  var extensible = IsExtensible(O);
  var current = OrdinaryGetPrototypeOf(O);
  if (SameValue(V, current)) {
  	return true;
  }
  if (!extensible) {
  	return false;
  }
  */
  try {
    $setProto(O, V);
  } catch (e) {
    return false;
  }
  return OrdinaryGetPrototypeOf(O) === V;
  /*
  var p = V;
  var done = false;
  while (!done) {
  	if (p === null) {
  		done = true;
  	} else if (SameValue(p, O)) {
  		return false;
  	} else {
  		if (wat) {
  			done = true;
  		} else {
  			p = p.[[Prototype]];
  		}
  	}
  }
  O.[[Prototype]] = V;
  return true;
  */
};

var AdvanceStringIndex = AdvanceStringIndex$1;
var CreateDataPropertyOrThrow = CreateDataPropertyOrThrow$1;
var CreateMethodProperty = CreateMethodProperty$1;
var GetMethod = GetMethod$1;
var IsArray = IsArray$1;
var IterableToList = IterableToList$1;
var OrdinarySetPrototypeOf = OrdinarySetPrototypeOf$1;
var Type = Type$8;
var GetIntrinsic = getIntrinsic;
var getIteratorMethod = getIteratorMethod$1;
var hasPropertyDescriptors = hasPropertyDescriptors_1();
var $Error = GetIntrinsic('%Error%');

// eslint-disable-next-line func-style
function AggregateError$2(errors, message) {
  var error = new $Error(message);
  OrdinarySetPrototypeOf(error, proto); // eslint-disable-line no-use-before-define
  delete error.constructor;
  var errorsList = IterableToList(errors, getIteratorMethod({
    AdvanceStringIndex: AdvanceStringIndex,
    GetMethod: GetMethod,
    IsArray: IsArray,
    Type: Type
  }, errors));
  CreateDataPropertyOrThrow(error, 'errors', errorsList);
  return error;
}
if (hasPropertyDescriptors) {
  Object.defineProperty(AggregateError$2, 'prototype', {
    writable: false
  });
}
var proto = AggregateError$2.prototype;
if (!CreateMethodProperty(proto, 'constructor', AggregateError$2) || !CreateMethodProperty(proto, 'message', '') || !CreateMethodProperty(proto, 'name', 'AggregateError')) {
  throw new $Error('unable to install AggregateError.prototype properties; please report this!');
}
OrdinarySetPrototypeOf(AggregateError$2.prototype, Error.prototype);
var implementation$5 = AggregateError$2;

var implementation$4 = implementation$5;
var polyfill$3 = function getPolyfill() {
  return typeof AggregateError === 'function' ? AggregateError : implementation$4;
};

var implementation$3 = commonjsGlobal;

var implementation$2 = implementation$3;
var polyfill$2 = function getPolyfill() {
  if (_typeof(commonjsGlobal) !== 'object' || !commonjsGlobal || commonjsGlobal.Math !== Math || commonjsGlobal.Array !== Array) {
    return implementation$2;
  }
  return commonjsGlobal;
};

var define$2 = defineProperties_1;
var getPolyfill$3 = polyfill$2;
var shim$3 = function shimGlobal() {
  var polyfill = getPolyfill$3();
  if (define$2.supportsDescriptors) {
    var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'globalThis');
    if (!descriptor || descriptor.configurable && (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill)) {
      // eslint-disable-line max-len
      Object.defineProperty(polyfill, 'globalThis', {
        configurable: true,
        enumerable: false,
        value: polyfill,
        writable: true
      });
    }
  } else if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) !== 'object' || globalThis !== polyfill) {
    polyfill.globalThis = polyfill;
  }
  return polyfill;
};

var defineProperties = defineProperties_1;
var implementation$1 = implementation$3;
var getPolyfill$2 = polyfill$2;
var shim$2 = shim$3;
var polyfill$1 = getPolyfill$2();
var getGlobal = function getGlobal() {
  return polyfill$1;
};
defineProperties(getGlobal, {
  getPolyfill: getPolyfill$2,
  implementation: implementation$1,
  shim: shim$2
});
var globalthis = getGlobal;

var define$1 = defineProperties_1;
var globalThis$1 = globalthis();
var getPolyfill$1 = polyfill$3;
var shim$1 = function shimAggregateError() {
  var polyfill = getPolyfill$1();
  define$1(globalThis$1, {
    AggregateError: polyfill
  }, {
    AggregateError: function testAggregateError() {
      return globalThis$1.AggregateError !== polyfill;
    }
  });
  return polyfill;
};

var bind = functionBind;
var define = defineProperties_1;
var functionsHaveConfigurableNames = functionsHaveNames_1.functionsHaveConfigurableNames();
var implementation = implementation$5;
var getPolyfill = polyfill$3;
var shim = shim$1;
var polyfill = getPolyfill();
var bound = bind.call(polyfill);
if (Object.defineProperty) {
  if (functionsHaveConfigurableNames) {
    Object.defineProperty(bound, 'name', {
      value: polyfill.name
    });
  }
  Object.defineProperty(bound, 'prototype', {
    value: polyfill.prototype
  });
}
define(bound, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
var esAggregateError = bound;

/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var AggregateError$1 = esAggregateError;
var AggregateError_1 = AggregateError$1;

/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var primordials = {
  uncurryThis: function () {
    var _Function$prototype = Function.prototype,
      bind = _Function$prototype.bind,
      call = _Function$prototype.call;
    return bind.bind(call);
  }(),
  JSONParse: function JSONParse(self) {
    return JSON.parse(self);
  },
  /**
   * Math start
   */
  MathAbs: function MathAbs(self) {
    return Math.abs(self);
  },
  //typeof Math.abs
  MathAcos: function MathAcos(self) {
    return Math.acos(self);
  },
  // typeof Math.acos
  MathAcosh: function MathAcosh(self) {
    return Math.acosh(self);
  },
  //typeof Math.acosh
  MathAsin: function MathAsin(self) {
    return Math.asin(self);
  },
  //typeof Math.asin
  MathAsinh: function MathAsinh(self) {
    return Math.asinh(self);
  },
  //typeof Math.asinh
  MathAtan: function MathAtan(self) {
    return Math.atan(self);
  },
  //typeof Math.atan
  MathAtanh: function MathAtanh(self) {
    return Math.atanh(self);
  },
  //typeof Math.atanh
  MathAtan2: function MathAtan2(self) {
    return Math.atan2(self);
  },
  //typeof Math.atan2
  MathCeil: function MathCeil(self) {
    return Math.ceil(self);
  },
  //typeof Math.ceil
  MathCbrt: function MathCbrt(self) {
    return Math.cbrt(self);
  },
  //typeof Math.cbrt
  MathExpm1: function MathExpm1(self) {
    return Math.expm1(self);
  },
  //typeof Math.expm1
  MathClz32: function MathClz32(self) {
    return Math.clz32(self);
  },
  //typeof Math.clz32
  MathCos: function MathCos(self) {
    return Math.cos(self);
  },
  //typeof Math.cos
  MathCosh: function MathCosh(self) {
    return Math.cosh(self);
  },
  //typeof Math.cosh
  MathExp: function MathExp(self) {
    return Math.exp(self);
  },
  //typeof Math.exp
  MathFround: function MathFround(self) {
    return Math.fround(self);
  },
  //typeof Math.fround
  MathHypot: function MathHypot(self) {
    return Math.hypot(self);
  },
  //typeof Math.hypot
  MathImul: function MathImul(self) {
    return Math.imul(self);
  },
  //typeof Math.imul
  MathLog: function MathLog(self) {
    return Math.log(self);
  },
  //typeof Math.log
  MathLog1p: function MathLog1p(self) {
    return Math.log(self);
  },
  //typeof Math.log1p
  MathLog2: function MathLog2(self) {
    return Math.log2(self);
  },
  //typeof Math.log2
  MathLog10: function MathLog10(self) {
    return Math.log10(self);
  },
  //typeof Math.log10
  MathMax: function MathMax() {
    return Math.max.apply(Math, arguments);
  },
  //typeof Math.max
  MathMaxApply: function MathMaxApply(self) {
    return Math.max.apply(null, self);
  },
  //StaticApply<typeof Math.max>
  MathMin: function MathMin(self) {
    return Math.min(self);
  },
  //typeof Math.min
  MathPow: function MathPow(self) {
    return Math.pow(self);
  },
  //typeof Math.pow
  MathRandom: function MathRandom() {
    return Math.random();
  },
  //typeof Math.random
  MathRound: function MathRound(self) {
    return Math.round(self);
  },
  //typeof Math.round
  MathSign: function MathSign(self) {
    return Math.sign(self);
  },
  //typeof Math.sign
  MathSin: function MathSin(self) {
    return Math.sin(self);
  },
  //typeof Math.sin
  MathSinh: function MathSinh(self) {
    return Math.sinh(self);
  },
  //typeof Math.sinh
  MathSqrt: function MathSqrt(self) {
    return Math.sqrt(self);
  },
  //typeof Math.sqrt
  MathTan: function MathTan(self) {
    return Math.tan(self);
  },
  //typeof Math.tan
  MathTanh: function MathTanh(self) {
    return Math.tanh(self);
  },
  //typeof Math.tanh
  MathTrunc: function MathTrunc(self) {
    return Math.trunc(self);
  },
  //typeof Math.trunc
  MathE: function MathE() {
    return Math.E;
  },
  //typeof Math.E
  MathLN10: function MathLN10() {
    return Math.LN10;
  },
  //typeof Math.LN10
  MathLN2: function MathLN2() {
    return Math.LN2;
  },
  //typeof Math.LN2
  MathLOG10E: function MathLOG10E() {
    return Math.LOG10E;
  },
  //typeof Math.LOG10E
  MathLOG2E: function MathLOG2E() {
    return Math.LOG2E;
  },
  //typeof Math.LOG2E
  MathPI: function MathPI() {
    return Math.PI;
  },
  //typeof Math.PI
  MathSQRT1_2: function MathSQRT1_2() {
    return Math.SQRT1_2;
  },
  //typeof Math.SQRT1_2
  MathSQRT2: function MathSQRT2() {
    return Math.SQRT2;
  },
  //typeof Math.SQRT2

  /**
   * Math end
   */

  /**
   * Reflect start
   */
  ReflectDefineProperty: Reflect.defineProperty,
  //typeof Reflect.defineProperty
  ReflectDeleteProperty: Reflect.deleteProperty,
  // typeof Reflect.deleteProperty
  ReflectApply: Reflect.apply,
  ReflectConstruct: Reflect.construct,
  // typeof Reflect.construct
  ReflectGet: Reflect.get,
  // typeof Reflect.get
  ReflectGetOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor,
  // typeof Reflect.getOwnPropertyDescriptor
  ReflectGetPrototypeOf: Reflect.getPrototypeOf,
  // typeof Reflect.getPrototypeOf
  ReflectHas: Reflect.has,
  // typeof Reflect.has
  ReflectIsExtensible: Reflect.isExtensible,
  // typeof Reflect.isExtensible
  ReflectOwnKeys: Reflect.ownKeys,
  // typeof Reflect.ownKeys
  ReflectPreventExtensions: Reflect.preventExtensions,
  // typeof Reflect.preventExtensions
  ReflectSet: Reflect.set,
  //typeof Reflect.set
  ReflectSetPrototypeOf: Reflect.setPrototypeOf,
  // typeof Reflect.setPrototypeOf
  /**
   * Reflect end
   */

  AggregateError: AggregateError_1,
  /**
   * Array start
   */
  ArrayFrom: function ArrayFrom(self, fn) {
    return Array.from(self, fn);
  },
  ArrayIsArray: function ArrayIsArray(self) {
    return Array.isArray(self);
  },
  ArrayPrototypeIncludes: function ArrayPrototypeIncludes(self, el) {
    return self.includes(el);
  },
  ArrayPrototypeFilter: function ArrayPrototypeFilter(self, fn) {
    return self.filter(fn);
  },
  ArrayPrototypeIndexOf: function ArrayPrototypeIndexOf(self, el) {
    return self.indexOf(el);
  },
  ArrayPrototypeJoin: function ArrayPrototypeJoin(self, sep) {
    return self.join(sep);
  },
  ArrayPrototypeMap: function ArrayPrototypeMap(self, fn) {
    return self.map(fn);
  },
  ArrayPrototypePop: function ArrayPrototypePop(self, el) {
    return self.pop(el);
  },
  ArrayPrototypePush: function ArrayPrototypePush(self, el) {
    return self.push(el);
  },
  ArrayPrototypeSlice: function ArrayPrototypeSlice(self, start, end) {
    return self.slice(start, end);
  },
  ArrayPrototypeSplice: function ArrayPrototypeSplice(self, start, end) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }
    return self.splice.apply(self, [start, end].concat(args));
  },
  ArrayPrototypeUnshift: function ArrayPrototypeUnshift(self, value) {
    return self.unshift(value);
  },
  /**
   * Array end
   */

  /**
   * Map start
   */

  MapPrototypeGet: Map.prototype.get,
  /**
   * Map end
   */
  /**
   * Error start
   */
  Error: Error,
  ErrorCaptureStackTrace: Error.captureStackTrace,
  ErrorPrototypeToString: Error.prototype.toString,
  RangeError: RangeError,
  /**
   * Error end
   */

  /**
   * JSON start
   */
  JSONStringify: JSON.stringify,
  /**
   * JSON end
   */
  FunctionPrototypeCall: function FunctionPrototypeCall(fn, thisArgs) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return fn.call.apply(fn, [thisArgs].concat(args));
  },
  FunctionPrototypeBind: function FunctionPrototypeBind(fn, thisArgs) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }
    return fn.bind.apply(fn, [thisArgs].concat(args));
  },
  FunctionPrototypeSymbolHasInstance: function FunctionPrototypeSymbolHasInstance(self, instance) {
    return Function.prototype[Symbol.hasInstance].call(self, instance);
  },
  MathFloor: Math.floor,
  Number: Number,
  NumberIsInteger: Number.isInteger,
  NumberIsNaN: Number.isNaN,
  NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
  NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
  NumberParseInt: Number.parseInt,
  NumberIsFinite: Number.isFinite,
  NumberPrototypeToString: function NumberPrototypeToString(value, radix) {
    return value.toString(radix);
  },
  /**
   * Object start
   */
  ObjectPrototypeHasOwnProperty: function ObjectPrototypeHasOwnProperty(self, name) {
    return Object.prototype.hasOwnProperty.call(self, name);
  },
  ObjectAssign: Object.assign,
  ObjectDefineProperties: function ObjectDefineProperties(self, props) {
    return Object.defineProperties(self, props);
  },
  ObjectDefineProperty: function ObjectDefineProperty(self, name, prop) {
    return Object.defineProperty(self, name, prop);
  },
  ObjectGetOwnPropertyDescriptor: function ObjectGetOwnPropertyDescriptor(self, name) {
    return Object.getOwnPropertyDescriptor(self, name);
  },
  ObjectKeys: function ObjectKeys(obj) {
    return Object.keys(obj);
  },
  ObjectCreate: function ObjectCreate(obj) {
    return Object.create(obj);
  },
  ObjectFreeze: function ObjectFreeze(obj) {
    return Object.freeze(obj);
  },
  ObjectEntries: function ObjectEntries(obj) {
    return Object.entries(obj);
  },
  ObjectSetPrototypeOf: function ObjectSetPrototypeOf(target, proto) {
    return Object.setPrototypeOf(target, proto);
  },
  ObjectPrototypeToString: function ObjectPrototypeToString(obj) {
    return obj.toString();
  },
  ObjectPrototypePropertyIsEnumerable: function ObjectPrototypePropertyIsEnumerable(self, val) {
    return self.propertyIsEnumerable(val);
  },
  ObjectIsExtensible: Object.isExtensible,
  /**
   * Object end
   */
  Promise: Promise,
  PromisePrototypeCatch: function PromisePrototypeCatch(self, fn) {
    return self["catch"](fn);
  },
  PromisePrototypeThen: function PromisePrototypeThen(self, thenFn, catchFn) {
    return self.then(thenFn, catchFn);
  },
  PromiseReject: function PromiseReject(err) {
    return Promise.reject(err);
  },
  RegExpPrototypeTest: function RegExpPrototypeTest(self, value) {
    return self.test(value);
  },
  SafeSet: Set,
  String: String,
  StringPrototypeSlice: function StringPrototypeSlice(self, start, end) {
    return self.slice(start, end);
  },
  StringPrototypeToLowerCase: function StringPrototypeToLowerCase(self) {
    return self.toLowerCase();
  },
  StringPrototypeToUpperCase: function StringPrototypeToUpperCase(self) {
    return self.toUpperCase();
  },
  StringPrototypeTrim: function StringPrototypeTrim(self) {
    return self.trim();
  },
  StringPrototypeCharCodeAt: function StringPrototypeCharCodeAt(value, index) {
    return value.charCodeAt(index);
  },
  StringPrototypeLastIndexOf: function StringPrototypeLastIndexOf(value, separator) {
    return value.lastIndexOf(separator);
  },
  StringPrototypeCharAt: function StringPrototypeCharAt(value, index) {
    return value.charAt(index);
  },
  StringPrototypeIndexOf: function StringPrototypeIndexOf(value, index) {
    return value.indexOf(index);
  },
  StringPrototypeStartsWith: function StringPrototypeStartsWith(value, index) {
    return value.startsWith(index);
  },
  StringPrototypeIncludes: function StringPrototypeIncludes(self, value, start) {
    return self.includes(value, start);
  },
  StringPrototypePadStart: function StringPrototypePadStart(self, targetLength, padString) {
    return self.padStart(targetLength, padString);
  },
  StringPrototypeReplace: function StringPrototypeReplace(self, searchValue, replaceValue) {
    return self.replace(searchValue, replaceValue);
  },
  DatePrototypeGetDate: function DatePrototypeGetDate(date) {
    return date.getDate();
  },
  DatePrototypeGetHours: function DatePrototypeGetHours(date) {
    return date.getHours();
  },
  DatePrototypeGetMinutes: function DatePrototypeGetMinutes(date) {
    return date.getMinutes();
  },
  DatePrototypeGetMonth: function DatePrototypeGetMonth(date) {
    return date.getMonth();
  },
  DatePrototypeGetSeconds: function DatePrototypeGetSeconds(date) {
    return date.getSeconds();
  },
  Symbol: Symbol,
  SymbolAsyncIterator: Symbol.asyncIterator,
  SymbolHasInstance: Symbol.hasInstance,
  SymbolIterator: Symbol.iterator,
  TypedArrayPrototypeSet: function TypedArrayPrototypeSet(self, buf, len) {
    return self.set(buf, len);
  },
  decodeURIComponent: decodeURIComponent,
  Uint8Array: Uint8Array,
  Int8Array: Int8Array,
  Array: Array,
  Date: Date
};

var Array$2 = primordials.Array,
  Int8Array$3 = primordials.Int8Array,
  NumberPrototypeToString = primordials.NumberPrototypeToString,
  StringPrototypeCharCodeAt$4 = primordials.StringPrototypeCharCodeAt,
  StringPrototypeSlice$3 = primordials.StringPrototypeSlice,
  StringPrototypeToUpperCase = primordials.StringPrototypeToUpperCase;

//const { ERR_INVALID_URI } = require('internal/errors').codes;

var hexTable$2 = new Array$2(256);
for (var i = 0; i < 256; ++i) hexTable$2[i] = "%" + StringPrototypeToUpperCase((i < 16 ? "0" : "") + NumberPrototypeToString(i, 16));
var isHexTable$1 = new Int8Array$3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 0 - 15
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 16 - 31
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 32 - 47
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
// 48 - 63
0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 64 - 79
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 80 - 95
0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 96 - 111
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 112 - 127
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// 128 ...
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // ... 256
]);

/**
 * @param {string} str
 * @param {Int8Array} noEscapeTable
 * @param {string[]} hexTable
 * @returns {string}
 */
function encodeStr$3(str, noEscapeTable, hexTable) {
  var len = str.length;
  if (len === 0) return "";
  var out = "";
  var lastPos = 0;
  var i = 0;
  outer: for (; i < len; i++) {
    var c = StringPrototypeCharCodeAt$4(str, i);

    // ASCII
    while (c < 0x80) {
      if (noEscapeTable[c] !== 1) {
        if (lastPos < i) out += StringPrototypeSlice$3(str, lastPos, i);
        lastPos = i + 1;
        out += hexTable[c];
      }
      if (++i === len) break outer;
      c = StringPrototypeCharCodeAt$4(str, i);
    }
    if (lastPos < i) out += StringPrototypeSlice$3(str, lastPos, i);

    // Multi-byte characters ...
    if (c < 0x800) {
      lastPos = i + 1;
      out += hexTable[0xc0 | c >> 6] + hexTable[0x80 | c & 0x3f];
      continue;
    }
    if (c < 0xd800 || c >= 0xe000) {
      lastPos = i + 1;
      out += hexTable[0xe0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
      continue;
    }
    // Surrogate pair
    ++i;

    // This branch should never happen because all URLSearchParams entries
    // should already be converted to USVString. But, included for
    // completion's sake anyway.
    if (i >= len)
      //throw new ERR_INVALID_URI();
      throw new Error("ERR_INVALID_URI");
    var c2 = StringPrototypeCharCodeAt$4(str, i) & 0x3ff;
    lastPos = i + 1;
    c = 0x10000 + ((c & 0x3ff) << 10 | c2);
    out += hexTable[0xf0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3f] + hexTable[0x80 | c >> 6 & 0x3f] + hexTable[0x80 | c & 0x3f];
  }
  if (lastPos === 0) return str;
  if (lastPos < len) return out + StringPrototypeSlice$3(str, lastPos);
  return out;
}
var querystring$2 = {
  encodeStr: encodeStr$3,
  hexTable: hexTable$2,
  isHexTable: isHexTable$1
};
f.Buffer;

var validator = {};

var nodeInternalPrefix = "__node_internal_";
var ObjectDefineProperty = primordials.ObjectDefineProperty,
  ArrayIsArray = primordials.ArrayIsArray,
  ArrayPrototypeIncludes = primordials.ArrayPrototypeIncludes,
  NumberIsNaN = primordials.NumberIsNaN;
var hideStackFrames = function hideStackFrames(fn) {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one
  var hidden = nodeInternalPrefix + fn.name;
  ObjectDefineProperty(fn, "name", {
    __proto__: null,
    value: hidden
  });
  return fn;
};
validator.validateString = hideStackFrames(function (value, name) {
  if (typeof value !== "string") {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});
validator.validateFunction = hideStackFrames(function (value, name) {
  if (typeof value !== "function") throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
});
validator.validateAbortSignal = hideStackFrames(function (signal, name) {
  if (signal !== undefined && (signal === null || _typeof(signal) !== "object" || !("aborted" in signal))) {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});
validator.validateObject = hideStackFrames(function (value, name, options) {
  var useDefaultOptions = options == null;
  var allowArray = useDefaultOptions ? false : options.allowArray;
  var allowFunction = useDefaultOptions ? false : options.allowFunction;
  var nullable = useDefaultOptions ? false : options.nullable;
  if (!nullable && value === null || !allowArray && ArrayIsArray(value) || _typeof(value) !== "object" && (!allowFunction || typeof value !== "function")) {
    throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  }
});
validator.validateNumber = function validateNumber(value, name) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var max = arguments.length > 3 ? arguments[3] : undefined;
  if (typeof value !== "number") throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
  if (min != null && value < min || max != null && value > max || (min != null || max != null) && NumberIsNaN(value)) {
    throw new Error("ERR_OUT_OF_RANGE, name:" + name + ", " + "".concat(min != null ? ">= ".concat(min) : "").concat(min != null && max != null ? " && " : "").concat(max != null ? "<= ".concat(max) : "") + value);
  }
};
validator.validateBoolean = function validateBoolean(value, name) {
  if (typeof value !== "boolean") throw new Error("ERR_INVALID_ARG_TYPE value:" + value + " name:" + name);
};
validator.validateArray = hideStackFrames(function (value, name) {
  var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!Array.isArray(value)) {
    throw new Error("Array:" + name);
  }
  if (value.length < minLength) {
    var reason = "must be longer than ".concat(minLength);
    throw new Error("ERR_INVALID_ARG_VALUE name:" + name + ",value:" + value + ",reason:" + reason);
  }
});
validator.validateUnion = function validateUnion(value, name, union) {
  if (!ArrayPrototypeIncludes(union, value)) {
    throw new Error("ERR_INVALID_ARG_TYPE, name:" + name + ",union:" + union + ",value:" + value);
  }
};

var constants$1 = {
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65 /* A */,
  CHAR_LOWERCASE_A: 97 /* a */,
  CHAR_UPPERCASE_Z: 90 /* Z */,
  CHAR_LOWERCASE_Z: 122 /* z */,
  CHAR_UPPERCASE_C: 67 /* C */,
  CHAR_LOWERCASE_B: 98 /* b */,
  CHAR_LOWERCASE_E: 101 /* e */,
  CHAR_LOWERCASE_N: 110 /* n */,

  // Non-alphabetic chars.
  CHAR_DOT: 46 /* . */,
  CHAR_FORWARD_SLASH: 47 /* / */,
  CHAR_BACKWARD_SLASH: 92 /* \ */,
  CHAR_VERTICAL_LINE: 124 /* | */,
  CHAR_COLON: 58 /* : */,
  CHAR_QUESTION_MARK: 63 /* ? */,
  CHAR_UNDERSCORE: 95 /* _ */,
  CHAR_LINE_FEED: 10 /* \n */,
  CHAR_CARRIAGE_RETURN: 13 /* \r */,
  CHAR_TAB: 9 /* \t */,
  CHAR_FORM_FEED: 12 /* \f */,
  CHAR_EXCLAMATION_MARK: 33 /* ! */,
  CHAR_HASH: 35 /* # */,
  CHAR_SPACE: 32 /*   */,
  CHAR_NO_BREAK_SPACE: 160 /* \u00A0 */,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279 /* \uFEFF */,
  CHAR_LEFT_SQUARE_BRACKET: 91,
  //* [ */
  CHAR_RIGHT_SQUARE_BRACKET: 93 /* ] */,
  CHAR_LEFT_ANGLE_BRACKET: 60 /* < */,
  CHAR_RIGHT_ANGLE_BRACKET: 62 /* > */,
  CHAR_LEFT_CURLY_BRACKET: 123 /* { */,
  CHAR_RIGHT_CURLY_BRACKET: 125 /* } */,
  CHAR_HYPHEN_MINUS: 45 /* - */,
  CHAR_PLUS: 43 /* + */,
  CHAR_DOUBLE_QUOTE: 34 /* " */,
  CHAR_SINGLE_QUOTE: 39 /* ' */,
  CHAR_PERCENT: 37 /* % */,
  CHAR_SEMICOLON: 59 /* ; */,
  CHAR_CIRCUMFLEX_ACCENT: 94 /* ^ */,
  CHAR_GRAVE_ACCENT: 96 /* ` */,
  CHAR_AT: 64 /* @ */,
  CHAR_AMPERSAND: 38 /* & */,
  CHAR_EQUAL: 61 /* = */,

  // Digits
  CHAR_0: 48 /* 0 */,
  CHAR_9: 57 /* 9 */,

  EOL: "\n"
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var constants = constants$1;
var StringPrototypeCharCodeAt$2 = primordials.StringPrototypeCharCodeAt,
  StringPrototypeSlice$1 = primordials.StringPrototypeSlice,
  StringPrototypeLastIndexOf = primordials.StringPrototypeLastIndexOf,
  FunctionPrototypeBind = primordials.FunctionPrototypeBind;
var validateString$1 = validator.validateString,
  validateObject$1 = validator.validateObject;
var sep = "/";
function isPathSeparator(code) {
  return code === constants.CHAR_FORWARD_SLASH;
}
function _format(sep, pathObject) {
  validateObject$1(pathObject, "pathObject");
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || "".concat(pathObject.name || "").concat(pathObject.ext || "");
  if (!dir) {
    return base;
  }
  return dir === pathObject.root ? "".concat(dir).concat(base) : "".concat(dir).concat(sep).concat(base);
}
function basename(path, ext) {
  if (ext !== undefined) validateString$1(ext, "ext");
  validateString$1(path, "path");
  var start = 0;
  var end = -1;
  var matchedSlash = true;
  if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
    if (ext === path) return "";
    var extIdx = ext.length - 1;
    var firstNonSlashEnd = -1;
    for (var i = path.length - 1; i >= start; --i) {
      var code = StringPrototypeCharCodeAt$2(path, i);
      if (isPathSeparator(code)) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          // We saw the first non-path separator, remember this index in case
          // we need it if the extension ends up not matching
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
        }
        if (extIdx >= 0) {
          // Try to match the explicit extension
          if (code === StringPrototypeCharCodeAt$2(ext, extIdx)) {
            if (--extIdx === -1) {
              // We matched the extension, so mark this as the end of our path
              // component
              end = i;
            }
          } else {
            // Extension does not match, so our result is the entire path
            // component
            extIdx = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
    return StringPrototypeSlice$1(path, start, end);
  }
  for (var _i = path.length - 1; _i >= start; --_i) {
    if (isPathSeparator(StringPrototypeCharCodeAt$2(path, _i))) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        start = _i + 1;
        break;
      }
    } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = _i + 1;
    }
  }
  if (end === -1) return "";
  return StringPrototypeSlice$1(path, start, end);
}
function dirname(path) {
  validateString$1(path, "path");
  var len = path.length;
  if (len === 0) return ".";
  var rootEnd = -1;
  var offset = 0;
  var code = StringPrototypeCharCodeAt$2(path, 0);
  if (len === 1) {
    // `path` contains just a path separator, exit early to avoid
    // unnecessary work or a dot.
    return isPathSeparator(code) ? path : ".";
  }

  // Try to match a root
  if (isPathSeparator(code)) {
    // Possible UNC root

    rootEnd = offset = 1;
    if (isPathSeparator(StringPrototypeCharCodeAt$2(path, 1))) {
      // Matched double path separator at beginning
      var j = 2;
      var last = j;
      // Match 1 or more non-path separators
      while (j < len && !isPathSeparator(StringPrototypeCharCodeAt$2(path, j))) {
        j++;
      }
      if (j < len && j !== last) {
        // Matched!
        last = j;
        // Match 1 or more path separators
        while (j < len && isPathSeparator(StringPrototypeCharCodeAt$2(path, j))) {
          j++;
        }
        if (j < len && j !== last) {
          // Matched!
          last = j;
          // Match 1 or more non-path separators
          while (j < len && !isPathSeparator(StringPrototypeCharCodeAt$2(path, j))) {
            j++;
          }
          if (j === len) {
            // We matched a UNC root only
            return path;
          }
          if (j !== last) {
            // We matched a UNC root with leftovers

            // Offset by 1 to include the separator after the UNC root to
            // treat it as a "normal root" on top of a (UNC) root
            rootEnd = offset = j + 1;
          }
        }
      }
    }
    // Possible device root
  }

  var end = -1;
  var matchedSlash = true;
  for (var i = len - 1; i >= offset; --i) {
    if (isPathSeparator(StringPrototypeCharCodeAt$2(path, i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    end = rootEnd;
  }
  return StringPrototypeSlice$1(path, 0, end);
}
function join() {
  if (arguments.length === 0) return ".";
  var joined;
  for (var i = 0; i < arguments.length; ++i) {
    var arg = i < 0 || arguments.length <= i ? undefined : arguments[i];
    validateString$1(arg, "path");
    if (arg.length > 0) {
      if (joined === undefined) joined = arg;else joined += "/".concat(arg);
    }
  }
  if (joined === undefined) return ".";
  return normalize(joined);
}
function normalize(path) {
  validateString$1(path, "path");
  if (path.length === 0) return ".";
  var isAbsolute = StringPrototypeCharCodeAt$2(path, 0) === constants.CHAR_FORWARD_SLASH;
  var trailingSeparator = StringPrototypeCharCodeAt$2(path, path.length - 1) === constants.CHAR_FORWARD_SLASH;

  // Normalize the path
  path = normalizeString(path, !isAbsolute, "/");
  if (path.length === 0) {
    if (isAbsolute) return "/";
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) path += "/";
  return isAbsolute ? "/".concat(path) : path;
}
function normalizeString(path, allowAboveRoot, separator) {
  var res = "";
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code = 0;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = StringPrototypeCharCodeAt$2(path, i);else if (isPathSeparator(code)) break;else code = constants.CHAR_FORWARD_SLASH;
    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || StringPrototypeCharCodeAt$2(res, res.length - 1) !== constants.CHAR_DOT || StringPrototypeCharCodeAt$2(res, res.length - 2) !== constants.CHAR_DOT) {
          if (res.length > 2) {
            var lastSlashIndex = StringPrototypeLastIndexOf(res, separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = StringPrototypeSlice$1(res, 0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - StringPrototypeLastIndexOf(res, separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "".concat(separator, "..") : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += "".concat(separator).concat(StringPrototypeSlice$1(path, lastSlash + 1, i));else res = StringPrototypeSlice$1(path, lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === constants.CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function resolve$1() {
  var resolvedPath = "";
  var resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var _path = i >= 0 ? i < 0 || arguments.length <= i ? undefined : arguments[i] : sep;
    validateString$1(_path, "path");

    // Skip empty entries
    if (_path.length === 0) {
      continue;
    }
    resolvedPath = "".concat(_path, "/").concat(resolvedPath);
    resolvedAbsolute = StringPrototypeCharCodeAt$2(_path, 0) === constants.CHAR_FORWARD_SLASH;
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/");
  if (resolvedAbsolute) {
    return "/".concat(resolvedPath);
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
}
function isAbsolute(path) {
  validateString$1(path, "path");
  return path.length > 0 && StringPrototypeCharCodeAt$2(path, 0) === constants.CHAR_FORWARD_SLASH;
}
function relative(from, to) {
  validateString$1(from, "from");
  validateString$1(to, "to");
  if (from === to) return "";

  // Trim leading forward slashes.
  from = resolve$1(from);
  to = resolve$1(to);
  if (from === to) return "";
  var fromStart = 1;
  var fromEnd = from.length;
  var fromLen = fromEnd - fromStart;
  var toStart = 1;
  var toLen = to.length - toStart;

  // Compare paths to find the longest common path from root
  var length = fromLen < toLen ? fromLen : toLen;
  var lastCommonSep = -1;
  var i = 0;
  for (; i < length; i++) {
    var fromCode = StringPrototypeCharCodeAt$2(from, fromStart + i);
    if (fromCode !== StringPrototypeCharCodeAt$2(to, toStart + i)) break;else if (fromCode === constants.CHAR_FORWARD_SLASH) lastCommonSep = i;
  }
  if (i === length) {
    if (toLen > length) {
      if (StringPrototypeCharCodeAt$2(to, toStart + i) === constants.CHAR_FORWARD_SLASH) {
        // We get here if `from` is the exact base path for `to`.
        // For example: from='/foo/bar'; to='/foo/bar/baz'
        return StringPrototypeSlice$1(to, toStart + i + 1);
      }
      if (i === 0) {
        // We get here if `from` is the root
        // For example: from='/'; to='/foo'
        return StringPrototypeSlice$1(to, toStart + i);
      }
    } else if (fromLen > length) {
      if (StringPrototypeCharCodeAt$2(from, fromStart + i) === constants.CHAR_FORWARD_SLASH) {
        // We get here if `to` is the exact base path for `from`.
        // For example: from='/foo/bar/baz'; to='/foo/bar'
        lastCommonSep = i;
      } else if (i === 0) {
        // We get here if `to` is the root.
        // For example: from='/foo/bar'; to='/'
        lastCommonSep = 0;
      }
    }
  }
  var out = "";
  // Generate the relative path based on the path difference between `to`
  // and `from`.
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || StringPrototypeCharCodeAt$2(from, i) === constants.CHAR_FORWARD_SLASH) {
      out += out.length === 0 ? ".." : "/..";
    }
  }

  // Lastly, append the rest of the destination (`to`) path that comes after
  // the common path parts.
  return "".concat(out).concat(StringPrototypeSlice$1(to, toStart + lastCommonSep));
}
function extname(path) {
  validateString$1(path, "path");
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    path.charcode;
    var code = StringPrototypeCharCodeAt$2(path, i);
    if (code === constants.CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === constants.CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 ||
  // We saw a non-dot character immediately before the dot
  preDotState === 0 ||
  // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return StringPrototypeSlice$1(path, startDot, end);
}
var format$1 = FunctionPrototypeBind(_format, null, "/");
function parse$1(path) {
  validateString$1(path, "path");
  var ret = {
    root: "",
    dir: "",
    base: "",
    ext: "",
    name: ""
  };
  if (path.length === 0) return ret;
  var isAbsolute = StringPrototypeCharCodeAt$2(path, 0) === constants.CHAR_FORWARD_SLASH;
  var start;
  if (isAbsolute) {
    ret.root = "/";
    start = 1;
  } else {
    start = 0;
  }
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  var i = path.length - 1;

  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;

  // Get non-dir info
  for (; i >= start; --i) {
    var code = StringPrototypeCharCodeAt$2(path, i);
    if (code === constants.CHAR_FORWARD_SLASH) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === constants.CHAR_DOT) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (end !== -1) {
    var _start = startPart === 0 && isAbsolute ? 1 : startPart;
    if (startDot === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      ret.base = ret.name = StringPrototypeSlice$1(path, _start, end);
    } else {
      ret.name = StringPrototypeSlice$1(path, _start, startDot);
      ret.base = StringPrototypeSlice$1(path, _start, end);
      ret.ext = StringPrototypeSlice$1(path, startDot, end);
    }
  }
  if (startPart > 0) ret.dir = StringPrototypeSlice$1(path, 0, startPart - 1);else if (isAbsolute) ret.dir = "/";
  return ret;
}
var path$1 = {
  basename: basename,
  dirname: dirname,
  extname: extname,
  format: format$1,
  parse: parse$1,
  sep: sep,
  join: join,
  resolve: resolve$1,
  isAbsolute: isAbsolute,
  relative: relative,
  normalize: normalize
};

var utf16 = {
  decode: function decode(input) {
    var output = [],
      i = 0,
      len = input.length,
      value,
      extra;
    while (i < len) {
      value = input.charCodeAt(i++);
      if ((value & 0xF800) === 0xD800) {
        extra = input.charCodeAt(i++);
        if ((value & 0xFC00) !== 0xD800 || (extra & 0xFC00) !== 0xDC00) {
          throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
        }
        value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
      }
      output.push(value);
    }
    return output;
  },
  encode: function encode(input) {
    var output = [],
      i = 0,
      len = input.length,
      value;
    while (i < len) {
      value = input[i++];
      if ((value & 0xF800) === 0xD800) {
        throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
      }
      if (value > 0xFFFF) {
        value -= 0x10000;
        output.push(String.fromCharCode(value >>> 10 & 0x3FF | 0xD800));
        value = 0xDC00 | value & 0x3FF;
      }
      output.push(String.fromCharCode(value));
    }
    return output.join("");
  }
};
var initial_n = 0x80;
var initial_bias = 72;
var delimiter = "-";
var base = 36;
var damp = 700;
var tmin = 1;
var tmax = 26;
var skew = 38;
var maxint = 0x7FFFFFFF;
function decode_digit(cp) {
  return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
}
function encode_digit(d, flag) {
  return d + 22 + Number(75 * Number(d < 26)) - (Number(flag != 0) << 5);
}
function adapt(delta, numpoints, firsttime) {
  var k;
  delta = firsttime ? Math.floor(delta / damp) : delta >> 1;
  delta += Math.floor(delta / numpoints);
  for (k = 0; delta > (base - tmin) * tmax >> 1; k += base) {
    delta = Math.floor(delta / (base - tmin));
  }
  return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
}
function encode_basic(bcp, flag) {
  bcp -= Number(bcp - 97 < 26) << 5;
  return bcp + ((!flag && Number(bcp - 65 < 26)) << 5);
}
function decode$1(input, preserveCase) {
  var output = [];
  var case_flags = [];
  var input_length = input.length;
  var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;
  n = initial_n;
  i = 0;
  bias = initial_bias;
  basic = input.lastIndexOf(delimiter);
  if (basic < 0) basic = 0;
  for (j = 0; j < basic; ++j) {
    if (preserveCase) case_flags[output.length] = input.charCodeAt(j) - 65 < 26;
    if (input.charCodeAt(j) >= 0x80) {
      throw new RangeError("Illegal input >= 0x80");
    }
    output.push(input.charCodeAt(j));
  }
  for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
    for (oldi = i, w = 1, k = base;; k += base) {
      if (ic >= input_length) {
        throw RangeError("punycode_bad_input(1)");
      }
      digit = decode_digit(input.charCodeAt(ic++));
      if (digit >= base) {
        throw RangeError("punycode_bad_input(2)");
      }
      if (digit > Math.floor((maxint - i) / w)) {
        throw RangeError("punycode_overflow(1)");
      }
      i += digit * w;
      t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
      if (digit < t) {
        break;
      }
      if (w > Math.floor(maxint / (base - t))) {
        throw RangeError("punycode_overflow(2)");
      }
      w *= base - t;
    }
    out = output.length + 1;
    bias = adapt(i - oldi, out, oldi === 0);
    if (Math.floor(i / out) > maxint - n) {
      throw RangeError("punycode_overflow(3)");
    }
    n += Math.floor(i / out);
    i %= out;
    if (preserveCase) {
      case_flags.splice(i, 0, input.charCodeAt(ic - 1) - 65 < 26);
    }
    output.splice(i, 0, n);
    i++;
  }
  if (preserveCase) {
    for (i = 0, len = output.length; i < len; i++) {
      if (case_flags[i]) {
        output[i] = String.fromCharCode(output[i]).toUpperCase().charCodeAt(0);
      }
    }
  }
  return utf16.encode(output);
}
function encode$1(input, preserveCase) {
  var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;
  if (preserveCase) {
    case_flags = utf16.decode(input);
  }
  input = utf16.decode(input.toLowerCase());
  var input_length = input.length; // Cache the length

  if (preserveCase) {
    for (j = 0; j < input_length; j++) {
      case_flags[j] = input[j] != case_flags[j];
    }
  }
  var output = [];
  n = initial_n;
  delta = 0;
  bias = initial_bias;
  for (j = 0; j < input_length; ++j) {
    if (input[j] < 0x80) {
      output.push(String.fromCharCode(case_flags ? encode_basic(input[j], case_flags[j]) : input[j]));
    }
  }
  h = b = output.length;
  if (b > 0) output.push(delimiter);
  while (h < input_length) {
    for (m = maxint, j = 0; j < input_length; ++j) {
      ijv = input[j];
      if (ijv >= n && ijv < m) m = ijv;
    }
    if (m - n > Math.floor((maxint - delta) / (h + 1))) {
      throw RangeError("punycode_overflow (1)");
    }
    delta += (m - n) * (h + 1);
    n = m;
    for (j = 0; j < input_length; ++j) {
      ijv = input[j];
      if (ijv < n) {
        if (++delta > maxint) return Error("punycode_overflow(2)");
      }
      if (ijv == n) {
        for (q = delta, k = base;; k += base) {
          t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
          if (q < t) break;
          output.push(String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)));
          q = Math.floor((q - t) / (base - t));
        }
        output.push(String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1 : 0)));
        bias = adapt(delta, h + 1, h == b);
        delta = 0;
        ++h;
      }
    }
    ++delta, ++n;
  }
  return output.join("");
}
var punycode = {
  decode: decode$1,
  encode: encode$1
};

var url_oh = require$$0$1;
var Number$1 = primordials.Number,
  StringPrototypeCharCodeAt$1 = primordials.StringPrototypeCharCodeAt,
  StringPrototypeIncludes = primordials.StringPrototypeIncludes,
  StringPrototypeReplace = primordials.StringPrototypeReplace,
  StringPrototypeSlice = primordials.StringPrototypeSlice,
  StringPrototypeStartsWith = primordials.StringPrototypeStartsWith,
  decodeURIComponent$2 = primordials.decodeURIComponent;
var validateObject = validator.validateObject;
var encodeStr$1 = querystring$2.encodeStr;
var CHAR_BACKWARD_SLASH$1 = constants$1.CHAR_BACKWARD_SLASH,
  CHAR_FORWARD_SLASH$1 = constants$1.CHAR_FORWARD_SLASH;
var path = path$1;
var URLSearchParams$1 = url_oh.URLSearchParams;
var encode = punycode.encode,
  decode = punycode.decode;
var kFormat = Symbol("format");
var URL$1 = /*#__PURE__*/function (_url_oh$URL) {
  _inherits(URL, _url_oh$URL);
  var _super = _createSuper(URL);
  function URL(input) {
    var _this;
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    _classCallCheck(this, URL);
    if (base == undefined || base == null) {
      _this = _super.call(this, input);
    } else {
      _this = _super.call(this, input, base);
    }
    return _possibleConstructorReturn(_this);
  }
  _createClass(URL, [{
    key: kFormat,
    value: function value(options) {
      if (options) validateObject(options, "options");
      options = _objectSpread2({
        fragment: true,
        unicode: false,
        search: true,
        auth: true
      }, options);

      // https://url.spec.whatwg.org/#url-serializing
      var ret = this.protocol;
      if (this.host !== null) {
        this.host = domainToASCII$1(decodeURI(this.host));
        ret += "//";
        var has_username = this.username !== "";
        var has_password = this.password !== "";
        if (options.auth && (has_username || has_password)) {
          if (has_username) ret += this.username;
          if (has_password) ret += ":".concat(this.password);
          ret += "@";
        }
        ret += options.unicode ? domainToUnicode$1(this.host) : this.host;
        if (this.port !== null && this.port.length > 0) ret += ":".concat(this.port);
      }
      ret += this.pathname;
      if (options.search && this.search !== null && this.search.length > 0) ret += "".concat(this.search);
      if (options.fragment && this.hash !== null && this.hash.length > 0) ret += "".concat(this.hash);
      return ret;
    }
  }], [{
    key: "createObjectURL",
    value: function createObjectURL(obj) {
      //待实现
    }
  }, {
    key: "revokeObjectURL",
    value: function revokeObjectURL(url) {
      //待实现
    }
  }]);
  return URL;
}(url_oh.URL);
function domainToASCII$1(domain) {
  if (typeof domain !== "string") {
    return "";
  }
  if (domain.startsWith("xn--") || domain.includes(":") || domain.includes("//")) {
    return "";
  }
  try {
    var domainArray = domain.split(".");
    var out = [];
    for (var i = 0; i < domainArray.length; ++i) {
      var s = domainArray[i];
      out.push(s.match(/[^A-Za-z0-9-]/) ? "xn--" + encode(s) : s);
    }
    return out.join(".");
  } catch (err) {
    return "";
  }
}
function domainToUnicode$1(domain) {
  try {
    var domainArray = domain.split(".");
    var out = [];
    for (var i = 0; i < domainArray.length; ++i) {
      var s = domainArray[i];
      out.push(s.match(/^xn--/) ? decode(s.slice(4)) : s);
    }
    return out.join(".");
  } catch (err) {
    return "";
  }
}

// Utility function that converts a URL object into an ordinary
// options object as expected by the http.request and https.request
// APIs.
function urlToHttpOptions$1(url) {
  var options = {
    protocol: url.protocol,
    hostname: typeof url.hostname === "string" && StringPrototypeStartsWith(url.hostname, "[") ? StringPrototypeSlice(url.hostname, 1, -1) : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: "".concat(url.pathname || "").concat(url.search || ""),
    href: url.href
  };
  if (url.port !== "") {
    options.port = Number$1(url.port);
  }
  if (url.username || url.password) {
    options.auth = "".concat(decodeURIComponent$2(url.username), ":").concat(decodeURIComponent$2(url.password));
  }
  return options;
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    throw new Error("");
  }
  var pathname = url.pathname;
  for (var n = 0; n < pathname.length; n++) {
    if (pathname[n] === "%") {
      var third = pathname.codePointAt(n + 2) | 0x20;
      if (pathname[n + 1] === "2" && third === 102) {
        throw new Error("must not include encoded / characters");
      }
    }
  }
  return decodeURIComponent$2(pathname);
}
function fileURLToPath$1(path) {
  if (typeof path === "string") path = new URL$1(path);else if (!isURLInstance(path)) throw new Error("ERR_INVALID_ARG_TYPE, path:" + path);
  if (path.protocol !== "file:") throw new Error("ERR_INVALID_URL_SCHEME, file");
  return getPathFromURLPosix(path);
}
var backslashRegEx = /\\/g;
var newlineRegEx = /\n/g;
var carriageReturnRegEx = /\r/g;
var tabRegEx = /\t/g;
var hashRegEx = /#/g;
function encodePathChars(filepath) {
  //    if (StringPrototypeIncludes(filepath, '%'))
  //    filepath = StringPrototypeReplace(filepath, percentRegEx, '%25');
  if (StringPrototypeIncludes(filepath, "#")) filepath = StringPrototypeReplace(filepath, hashRegEx, "%23");
  // In posix, backslash is a valid character in paths:
  if (StringPrototypeIncludes(filepath, "\\")) filepath = StringPrototypeReplace(filepath, backslashRegEx, "%5C");
  if (StringPrototypeIncludes(filepath, "\n")) filepath = StringPrototypeReplace(filepath, newlineRegEx, "%0A");
  if (StringPrototypeIncludes(filepath, "\r")) filepath = StringPrototypeReplace(filepath, carriageReturnRegEx, "%0D");
  if (StringPrototypeIncludes(filepath, "\t")) filepath = StringPrototypeReplace(filepath, tabRegEx, "%09");
  return filepath;
}
function pathToFileURL$1(filepath) {
  var outURL = new URL$1("file://");
  var resolved = path.resolve(filepath);
  var filePathLast = StringPrototypeCharCodeAt$1(filepath, filepath.length - 1);
  if ((filePathLast === CHAR_FORWARD_SLASH$1 || filePathLast === CHAR_BACKWARD_SLASH$1) && resolved[resolved.length - 1] !== path.sep) resolved += "/";
  outURL.pathname = encodePathChars(resolved);
  return outURL;
}
function isURLInstance(fileURLOrPath) {
  return fileURLOrPath != null && fileURLOrPath.href && fileURLOrPath.origin;
}
function toPathIfFileURL(fileURLOrPath) {
  if (!isURLInstance(fileURLOrPath)) return fileURLOrPath;
  return fileURLToPath$1(fileURLOrPath);
}
var url = {
  fileURLToPath: fileURLToPath$1,
  pathToFileURL: pathToFileURL$1,
  toPathIfFileURL: toPathIfFileURL,
  isURLInstance: isURLInstance,
  URL: URL$1,
  URLSearchParams: URLSearchParams$1,
  domainToASCII: domainToASCII$1,
  domainToUnicode: domainToUnicode$1,
  urlToHttpOptions: urlToHttpOptions$1,
  formatSymbol: kFormat,
  encodeStr: encodeStr$1
};
var URL = url.URL;
var URL_1 = URL;

function parse(uri) {
    const parsed = new URL_1(uri);
    const path = parsed.pathname + parsed.search;
    const parts = path.split('/');
    let group;
    let articleNumber;
    let messageId;
    if (parsed.protocol === 'nntp:' || parsed.protocol === 'nntps:') {
        group = parts[1];
        if (parts.length > 2) {
            articleNumber = parseInt(parts[2]);
        }
    }
    else if (parsed.protocol === 'news:' || parsed.protocol === 'snews:') {
        if (/\/.+@.+/.exec(path)) {
            messageId = path[1];
        }
        else {
            throw new Error('news and snews protocol support is only implemented to support messageIds');
        }
    }
    else {
        throw new Error('Unsupported protocol');
    }
    return {
        protocol: parsed.protocol,
        host: parsed.hostname,
        port: parsed.port ? parseInt(parsed.port) : 119,
        username: parsed.username || undefined,
        password: parsed.password || undefined,
        group,
        articleNumber,
        messageId
    };
}
/**
 * Given a URI string using nntp, nntps, news, or snews protocols, attempts
 * to list a group or fetch an article. Will attempt to use STARTTLS if
 * protocol is nntps or snews. Will attempt to authenticate with AUTHINFO USER
 * if an authority is provided.
 *
 * A server (host) must be specified in the URI; there is no default host.
 *
 * A news or snews URI requesting one or more newsgroups is not supported.
 *
 * @example
 * const article = await fetch('news://news.gmane.org/p0624081dc30b8699bf9b@%5B10.20.30.108%5D')
 */
async function fetch(uri) {
    const parsed = parse(uri);
    // Connect to host on port
    const client = new Client({
        host: parsed.host,
        port: parsed.port,
        tlsPort: false
    });
    await client.connect();
    // Optionally upgrade to TLS
    const capabilities = await client.capabilities();
    if (parsed.protocol === 'nntps:' || parsed.protocol === 'snews:') {
        if (!capabilities.capabilities.STARTTLS) {
            throw new Error(`Server does not support STARTTLS, yet requested protocol was ${parsed.protocol}`);
        }
        await client.startTls();
    }
    // Optionally authenticate
    if (parsed.username || parsed.password) {
        if (!parsed.username || !parsed.password) {
            throw new Error('Must specify both username and password');
        }
        if (parsed.protocol !== 'nntps:' && parsed.protocol !== 'snews:') {
            throw new Error('Authentication over TLS is strongly recommended, use snews or nntps');
        }
        if (!capabilities.capabilities.AUTHINFO) {
            throw new Error('Server does not support AUTHINFO, yet received username/password');
        }
        if (!capabilities.capabilities.AUTHINFO.includes('USER')) {
            throw new Error('Server support AUTHINFO, but not AUTHINTO USER, unable to authenticate');
        }
        const response = await client.authInfoUser(parsed.username);
        await response.authInfoPass(parsed.password);
    }
    // Fetch group or article
    let response;
    if (parsed.protocol === 'nntp:' || parsed.protocol === 'nntps:') {
        response = parsed.articleNumber
            ? await client.article(parsed.articleNumber)
            : await client.group(parsed.group);
    }
    else if (parsed.protocol === 'news:' || parsed.protocol === 'snews:') {
        response = await client.article(parsed.messageId);
    }
    // Close connection and return group or article
    await client.quit();
    return response;
}

export { CapabilityLabel$1 as CapabilityLabel, Command, addHandler, build, Client, fetch, parse$2 as parse };
export default Client;
