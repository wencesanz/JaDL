/* vendor/react-18.3.1.production.min.js */
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){'use strict';(function(c,x){"object"===typeof exports&&"undefined"!==typeof module?x(exports):"function"===typeof define&&define.amd?define(["exports"],x):(c=c||self,x(c.React={}))})(this,function(c){function x(a){if(null===a||"object"!==typeof a)return null;a=V&&a[V]||a["@@iterator"];return"function"===typeof a?a:null}function w(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Y(){}function K(a,b,e){this.props=a;this.context=b;this.refs=W;this.updater=e||X}function Z(a,b,
e){var m,d={},c=null,h=null;if(null!=b)for(m in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(c=""+b.key),b)aa.call(b,m)&&!ba.hasOwnProperty(m)&&(d[m]=b[m]);var l=arguments.length-2;if(1===l)d.children=e;else if(1<l){for(var f=Array(l),k=0;k<l;k++)f[k]=arguments[k+2];d.children=f}if(a&&a.defaultProps)for(m in l=a.defaultProps,l)void 0===d[m]&&(d[m]=l[m]);return{$$typeof:y,type:a,key:c,ref:h,props:d,_owner:L.current}}function oa(a,b){return{$$typeof:y,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===y}function pa(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?pa(""+a.key):b.toString(36)}function B(a,b,e,m,d){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;var h=!1;if(null===a)h=!0;else switch(c){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case y:case qa:h=!0}}if(h)return h=a,d=d(h),a=""===m?"."+
N(h,0):m,ca(d)?(e="",null!=a&&(e=a.replace(da,"$&/")+"/"),B(d,b,e,"",function(a){return a})):null!=d&&(M(d)&&(d=oa(d,e+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(da,"$&/")+"/")+a)),b.push(d)),1;h=0;m=""===m?".":m+":";if(ca(a))for(var l=0;l<a.length;l++){c=a[l];var f=m+N(c,l);h+=B(c,b,e,f,d)}else if(f=x(a),"function"===typeof f)for(a=f.call(a),l=0;!(c=a.next()).done;)c=c.value,f=m+N(c,l++),h+=B(c,b,e,f,d);else if("object"===c)throw b=String(a),Error("Objects are not valid as a React child (found: "+
("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function C(a,b,e){if(null==a)return a;var c=[],d=0;B(a,c,"","",function(a){return b.call(e,a,d++)});return c}function ra(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=
0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}function O(a,b){var e=a.length;a.push(b);a:for(;0<e;){var c=e-1>>>1,d=a[c];if(0<D(d,b))a[c]=b,a[e]=d,e=c;else break a}}function p(a){return 0===a.length?null:a[0]}function E(a){if(0===a.length)return null;var b=a[0],e=a.pop();if(e!==b){a[0]=e;a:for(var c=0,d=a.length,k=d>>>1;c<k;){var h=2*(c+1)-1,l=a[h],f=h+1,g=a[f];if(0>D(l,e))f<d&&0>D(g,l)?(a[c]=g,a[f]=e,c=f):(a[c]=l,a[h]=e,c=h);else if(f<d&&0>D(g,e))a[c]=g,a[f]=e,c=f;else break a}}return b}
function D(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}function P(a){for(var b=p(r);null!==b;){if(null===b.callback)E(r);else if(b.startTime<=a)E(r),b.sortIndex=b.expirationTime,O(q,b);else break;b=p(r)}}function Q(a){z=!1;P(a);if(!u)if(null!==p(q))u=!0,R(S);else{var b=p(r);null!==b&&T(Q,b.startTime-a)}}function S(a,b){u=!1;z&&(z=!1,ea(A),A=-1);F=!0;var c=k;try{P(b);for(n=p(q);null!==n&&(!(n.expirationTime>b)||a&&!fa());){var m=n.callback;if("function"===typeof m){n.callback=null;
k=n.priorityLevel;var d=m(n.expirationTime<=b);b=v();"function"===typeof d?n.callback=d:n===p(q)&&E(q);P(b)}else E(q);n=p(q)}if(null!==n)var g=!0;else{var h=p(r);null!==h&&T(Q,h.startTime-b);g=!1}return g}finally{n=null,k=c,F=!1}}function fa(){return v()-ha<ia?!1:!0}function R(a){G=a;H||(H=!0,I())}function T(a,b){A=ja(function(){a(v())},b)}function ka(a){throw Error("act(...) is not supported in production builds of React.");}var y=Symbol.for("react.element"),qa=Symbol.for("react.portal"),sa=Symbol.for("react.fragment"),
ta=Symbol.for("react.strict_mode"),ua=Symbol.for("react.profiler"),va=Symbol.for("react.provider"),wa=Symbol.for("react.context"),xa=Symbol.for("react.forward_ref"),ya=Symbol.for("react.suspense"),za=Symbol.for("react.memo"),Aa=Symbol.for("react.lazy"),V=Symbol.iterator,X={isMounted:function(a){return!1},enqueueForceUpdate:function(a,b,c){},enqueueReplaceState:function(a,b,c,m){},enqueueSetState:function(a,b,c,m){}},la=Object.assign,W={};w.prototype.isReactComponent={};w.prototype.setState=function(a,
b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};w.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};Y.prototype=w.prototype;var t=K.prototype=new Y;t.constructor=K;la(t,w.prototype);t.isPureReactComponent=!0;var ca=Array.isArray,aa=Object.prototype.hasOwnProperty,L={current:null},
ba={key:!0,ref:!0,__self:!0,__source:!0},da=/\/+/g,g={current:null},J={transition:null};if("object"===typeof performance&&"function"===typeof performance.now){var Ba=performance;var v=function(){return Ba.now()}}else{var ma=Date,Ca=ma.now();v=function(){return ma.now()-Ca}}var q=[],r=[],Da=1,n=null,k=3,F=!1,u=!1,z=!1,ja="function"===typeof setTimeout?setTimeout:null,ea="function"===typeof clearTimeout?clearTimeout:null,na="undefined"!==typeof setImmediate?setImmediate:null;"undefined"!==typeof navigator&&
void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var H=!1,G=null,A=-1,ia=5,ha=-1,U=function(){if(null!==G){var a=v();ha=a;var b=!0;try{b=G(!0,a)}finally{b?I():(H=!1,G=null)}}else H=!1};if("function"===typeof na)var I=function(){na(U)};else if("undefined"!==typeof MessageChannel){t=new MessageChannel;var Ea=t.port2;t.port1.onmessage=U;I=function(){Ea.postMessage(null)}}else I=function(){ja(U,0)};t={ReactCurrentDispatcher:g,
ReactCurrentOwner:L,ReactCurrentBatchConfig:J,Scheduler:{__proto__:null,unstable_ImmediatePriority:1,unstable_UserBlockingPriority:2,unstable_NormalPriority:3,unstable_IdlePriority:5,unstable_LowPriority:4,unstable_runWithPriority:function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=k;k=a;try{return b()}finally{k=c}},unstable_next:function(a){switch(k){case 1:case 2:case 3:var b=3;break;default:b=k}var c=k;k=b;try{return a()}finally{k=c}},unstable_scheduleCallback:function(a,
b,c){var e=v();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?e+c:e):c=e;switch(a){case 1:var d=-1;break;case 2:d=250;break;case 5:d=1073741823;break;case 4:d=1E4;break;default:d=5E3}d=c+d;a={id:Da++,callback:b,priorityLevel:a,startTime:c,expirationTime:d,sortIndex:-1};c>e?(a.sortIndex=c,O(r,a),null===p(q)&&a===p(r)&&(z?(ea(A),A=-1):z=!0,T(Q,c-e))):(a.sortIndex=d,O(q,a),u||F||(u=!0,R(S)));return a},unstable_cancelCallback:function(a){a.callback=null},unstable_wrapCallback:function(a){var b=
k;return function(){var c=k;k=b;try{return a.apply(this,arguments)}finally{k=c}}},unstable_getCurrentPriorityLevel:function(){return k},unstable_shouldYield:fa,unstable_requestPaint:function(){},unstable_continueExecution:function(){u||F||(u=!0,R(S))},unstable_pauseExecution:function(){},unstable_getFirstCallbackNode:function(){return p(q)},get unstable_now(){return v},unstable_forceFrameRate:function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):
ia=0<a?Math.floor(1E3/a):5},unstable_Profiling:null}};c.Children={map:C,forEach:function(a,b,c){C(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;C(a,function(){b++});return b},toArray:function(a){return C(a,function(a){return a})||[]},only:function(a){if(!M(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};c.Component=w;c.Fragment=sa;c.Profiler=ua;c.PureComponent=K;c.StrictMode=ta;c.Suspense=ya;c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=
t;c.act=ka;c.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var e=la({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=L.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(f in b)aa.call(b,f)&&!ba.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==l?l[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){l=
Array(f);for(var g=0;g<f;g++)l[g]=arguments[g+2];e.children=l}return{$$typeof:y,type:a.type,key:d,ref:k,props:e,_owner:h}};c.createContext=function(a){a={$$typeof:wa,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:va,_context:a};return a.Consumer=a};c.createElement=Z;c.createFactory=function(a){var b=Z.bind(null,a);b.type=a;return b};c.createRef=function(){return{current:null}};c.forwardRef=function(a){return{$$typeof:xa,
render:a}};c.isValidElement=M;c.lazy=function(a){return{$$typeof:Aa,_payload:{_status:-1,_result:a},_init:ra}};c.memo=function(a,b){return{$$typeof:za,type:a,compare:void 0===b?null:b}};c.startTransition=function(a,b){b=J.transition;J.transition={};try{a()}finally{J.transition=b}};c.unstable_act=ka;c.useCallback=function(a,b){return g.current.useCallback(a,b)};c.useContext=function(a){return g.current.useContext(a)};c.useDebugValue=function(a,b){};c.useDeferredValue=function(a){return g.current.useDeferredValue(a)};
c.useEffect=function(a,b){return g.current.useEffect(a,b)};c.useId=function(){return g.current.useId()};c.useImperativeHandle=function(a,b,c){return g.current.useImperativeHandle(a,b,c)};c.useInsertionEffect=function(a,b){return g.current.useInsertionEffect(a,b)};c.useLayoutEffect=function(a,b){return g.current.useLayoutEffect(a,b)};c.useMemo=function(a,b){return g.current.useMemo(a,b)};c.useReducer=function(a,b,c){return g.current.useReducer(a,b,c)};c.useRef=function(a){return g.current.useRef(a)};
c.useState=function(a){return g.current.useState(a)};c.useSyncExternalStore=function(a,b,c){return g.current.useSyncExternalStore(a,b,c)};c.useTransition=function(){return g.current.useTransition()};c.version="18.3.1"});
})();
;
/* vendor/react-dom-18.3.1.production.min.js */
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(){/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
'use strict';(function(Q,zb){"object"===typeof exports&&"undefined"!==typeof module?zb(exports,require("react")):"function"===typeof define&&define.amd?define(["exports","react"],zb):(Q=Q||self,zb(Q.ReactDOM={},Q.React))})(this,function(Q,zb){function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
function mb(a,b){Ab(a,b);Ab(a+"Capture",b)}function Ab(a,b){$b[a]=b;for(a=0;a<b.length;a++)cg.add(b[a])}function bj(a){if(Zd.call(dg,a))return!0;if(Zd.call(eg,a))return!1;if(cj.test(a))return dg[a]=!0;eg[a]=!0;return!1}function dj(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function ej(a,b,c,d){if(null===
b||"undefined"===typeof b||dj(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function Y(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}function $d(a,b,c,d){var e=R.hasOwnProperty(b)?R[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==
b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])ej(b,c,e,d)&&(c=null),d||null===e?bj(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}function ac(a){if(null===a||"object"!==typeof a)return null;a=fg&&a[fg]||a["@@iterator"];return"function"===typeof a?a:null}function bc(a,b,
c){if(void 0===ae)try{throw Error();}catch(d){ae=(b=d.stack.trim().match(/\n( *(at )?)/))&&b[1]||""}return"\n"+ae+a}function be(a,b){if(!a||ce)return"";ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(n){var d=n}Reflect.construct(a,[],b)}else{try{b.call()}catch(n){d=n}a.call(b.prototype)}else{try{throw Error();
}catch(n){d=n}a()}}catch(n){if(n&&d&&"string"===typeof n.stack){for(var e=n.stack.split("\n"),f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{ce=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?bc(a):
""}function fj(a){switch(a.tag){case 5:return bc(a.type);case 16:return bc("Lazy");case 13:return bc("Suspense");case 19:return bc("SuspenseList");case 0:case 2:case 15:return a=be(a.type,!1),a;case 11:return a=be(a.type.render,!1),a;case 1:return a=be(a.type,!0),a;default:return""}}function de(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Bb:return"Fragment";case Cb:return"Portal";case ee:return"Profiler";case fe:return"StrictMode";
case ge:return"Suspense";case he:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case gg:return(a.displayName||"Context")+".Consumer";case hg:return(a._context.displayName||"Context")+".Provider";case ie:var b=a.render;a=a.displayName;a||(a=b.displayName||b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case je:return b=a.displayName||null,null!==b?b:de(a.type)||"Memo";case Ta:b=a._payload;a=a._init;try{return de(a(b))}catch(c){}}return null}function gj(a){var b=a.type;
switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return de(b);case 8:return b===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";
case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Ua(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}function ig(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===
b)}function hj(a){var b=ig(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Pc(a){a._valueTracker||(a._valueTracker=hj(a))}function jg(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=ig(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Qc(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ke(a,b){var c=b.checked;return E({},b,{defaultChecked:void 0,defaultValue:void 0,
value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function kg(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ua(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function lg(a,b){b=b.checked;null!=b&&$d(a,"checked",b,!1)}function le(a,b){lg(a,b);var c=Ua(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?me(a,b.type,c):b.hasOwnProperty("defaultValue")&&me(a,b.type,Ua(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}function mg(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;
c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}function me(a,b,c){if("number"!==b||Qc(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Db(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=
!0)}else{c=""+Ua(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}function ne(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(m(91));return E({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ng(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(m(92));if(cc(c)){if(1<c.length)throw Error(m(93));
c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Ua(c)}}function og(a,b){var c=Ua(b.value),d=Ua(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function pg(a,b){b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function qg(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function oe(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?qg(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}function rg(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||dc.hasOwnProperty(a)&&dc[a]?(""+b).trim():b+"px"}function sg(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rg(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}function pe(a,b){if(b){if(ij[a]&&
(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(m(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(m(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(m(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(m(62));}}function qe(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;
default:return!0}}function re(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function tg(a){if(a=ec(a)){if("function"!==typeof se)throw Error(m(280));var b=a.stateNode;b&&(b=Rc(b),se(a.stateNode,a.type,b))}}function ug(a){Eb?Fb?Fb.push(a):Fb=[a]:Eb=a}function vg(){if(Eb){var a=Eb,b=Fb;Fb=Eb=null;tg(a);if(b)for(a=0;a<b.length;a++)tg(b[a])}}function wg(a,b,c){if(te)return a(b,c);te=!0;try{return xg(a,b,c)}finally{if(te=
!1,null!==Eb||null!==Fb)yg(),vg()}}function fc(a,b){var c=a.stateNode;if(null===c)return null;var d=Rc(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;
if(c&&"function"!==typeof c)throw Error(m(231,b,typeof c));return c}function jj(a,b,c,d,e,f,g,h,k){gc=!1;Sc=null;kj.apply(lj,arguments)}function mj(a,b,c,d,e,f,g,h,k){jj.apply(this,arguments);if(gc){if(gc){var n=Sc;gc=!1;Sc=null}else throw Error(m(198));Tc||(Tc=!0,ue=n)}}function nb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function zg(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,
null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Ag(a){if(nb(a)!==a)throw Error(m(188));}function nj(a){var b=a.alternate;if(!b){b=nb(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Ag(e),a;if(f===d)return Ag(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;
else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Bg(a){a=nj(a);return null!==a?Cg(a):null}function Cg(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Cg(a);if(null!==b)return b;a=a.sibling}return null}
function oj(a,b){if(Ca&&"function"===typeof Ca.onCommitFiberRoot)try{Ca.onCommitFiberRoot(Uc,a,void 0,128===(a.current.flags&128))}catch(c){}}function pj(a){a>>>=0;return 0===a?32:31-(qj(a)/rj|0)|0}function hc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&
4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return a}}function Vc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=hc(h):(f&=g,0!==f&&(d=hc(f)))}else g=c&~e,0!==g?d=hc(g):0!==f&&(d=hc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&
(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-ta(b),e=1<<c,d|=a[c],b&=~e;return d}function sj(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;
case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tj(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-ta(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=sj(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function ve(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dg(){var a=Wc;Wc<<=1;0===(Wc&4194240)&&(Wc=64);return a}function we(a){for(var b=[],c=0;31>c;c++)b.push(a);
return b}function ic(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-ta(b);a[b]=c}function uj(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-ta(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}function xe(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-ta(c),e=1<<d;e&b|a[d]&
b&&(a[d]|=b);c&=~e}}function Eg(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}function Fg(a,b){switch(a){case "focusin":case "focusout":Va=null;break;case "dragenter":case "dragleave":Wa=null;break;case "mouseover":case "mouseout":Xa=null;break;case "pointerover":case "pointerout":jc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":kc.delete(b.pointerId)}}function lc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,
nativeEvent:f,targetContainers:[e]},null!==b&&(b=ec(b),null!==b&&Gg(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}function vj(a,b,c,d,e){switch(b){case "focusin":return Va=lc(Va,a,b,c,d,e),!0;case "dragenter":return Wa=lc(Wa,a,b,c,d,e),!0;case "mouseover":return Xa=lc(Xa,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;jc.set(f,lc(jc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,kc.set(f,lc(kc.get(f)||null,a,b,
c,d,e)),!0}return!1}function Hg(a){var b=ob(a.target);if(null!==b){var c=nb(b);if(null!==c)if(b=c.tag,13===b){if(b=zg(c),null!==b){a.blockedOn=b;wj(a.priority,function(){xj(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=ye(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;
var d=new c.constructor(c.type,c);ze=d;c.target.dispatchEvent(d);ze=null}else return b=ec(c),null!==b&&Gg(b),a.blockedOn=c,!1;b.shift()}return!0}function Ig(a,b,c){Xc(a)&&c.delete(b)}function yj(){Ae=!1;null!==Va&&Xc(Va)&&(Va=null);null!==Wa&&Xc(Wa)&&(Wa=null);null!==Xa&&Xc(Xa)&&(Xa=null);jc.forEach(Ig);kc.forEach(Ig)}function mc(a,b){a.blockedOn===b&&(a.blockedOn=null,Ae||(Ae=!0,Jg(Kg,yj)))}function nc(a){if(0<Yc.length){mc(Yc[0],a);for(var b=1;b<Yc.length;b++){var c=Yc[b];c.blockedOn===a&&(c.blockedOn=
null)}}null!==Va&&mc(Va,a);null!==Wa&&mc(Wa,a);null!==Xa&&mc(Xa,a);b=function(b){return mc(b,a)};jc.forEach(b);kc.forEach(b);for(b=0;b<Ya.length;b++)c=Ya[b],c.blockedOn===a&&(c.blockedOn=null);for(;0<Ya.length&&(b=Ya[0],null===b.blockedOn);)Hg(b),null===b.blockedOn&&Ya.shift()}function zj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=1,Be(a,b,c,d)}finally{z=e,Gb.transition=f}}function Aj(a,b,c,d){var e=z,f=Gb.transition;Gb.transition=null;try{z=4,Be(a,b,c,d)}finally{z=e,Gb.transition=
f}}function Be(a,b,c,d){if(Zc){var e=ye(a,b,c,d);if(null===e)Ce(a,b,d,$c,c),Fg(a,d);else if(vj(e,a,b,c,d))d.stopPropagation();else if(Fg(a,d),b&4&&-1<Bj.indexOf(a)){for(;null!==e;){var f=ec(e);null!==f&&Cj(f);f=ye(a,b,c,d);null===f&&Ce(a,b,d,$c,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else Ce(a,b,d,null,c)}}function ye(a,b,c,d){$c=null;a=re(d);a=ob(a);if(null!==a)if(b=nb(a),null===b)a=null;else if(c=b.tag,13===c){a=zg(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===
b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);$c=a;return null}function Lg(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;
case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;case "message":switch(Dj()){case De:return 1;case Mg:return 4;case ad:case Ej:return 16;case Ng:return 536870912;default:return 16}default:return 16}}function Og(){if(bd)return bd;
var a,b=Ee,c=b.length,d,e="value"in Za?Za.value:Za.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return bd=e.slice(a,1<d?1-d:void 0)}function cd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function dd(){return!0}function Pg(){return!1}function ka(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;
for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?dd:Pg;this.isPropagationStopped=Pg;return this}E(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=dd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():
"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=dd)},persist:function(){},isPersistent:dd});return b}function Fj(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Gj[a])?!!b[a]:!1}function Fe(a){return Fj}function Qg(a,b){switch(a){case "keyup":return-1!==Hj.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function Rg(a){a=a.detail;return"object"===typeof a&&
"data"in a?a.data:null}function Ij(a,b){switch(a){case "compositionend":return Rg(b);case "keypress":if(32!==b.which)return null;Sg=!0;return Tg;case "textInput":return a=b.data,a===Tg&&Sg?null:a;default:return null}}function Jj(a,b){if(Hb)return"compositionend"===a||!Ge&&Qg(a,b)?(a=Og(),bd=Ee=Za=null,Hb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;
case "compositionend":return Ug&&"ko"!==b.locale?null:b.data;default:return null}}function Vg(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Kj[a.type]:"textarea"===b?!0:!1}function Lj(a){if(!Ia)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Wg(a,b,c,d){ug(d);b=ed(b,"onChange");0<b.length&&(c=new He("onChange","change",null,c,d),a.push({event:c,listeners:b}))}function Mj(a){Xg(a,
0)}function fd(a){var b=Ib(a);if(jg(b))return a}function Nj(a,b){if("change"===a)return b}function Yg(){oc&&(oc.detachEvent("onpropertychange",Zg),pc=oc=null)}function Zg(a){if("value"===a.propertyName&&fd(pc)){var b=[];Wg(b,pc,a,re(a));wg(Mj,b)}}function Oj(a,b,c){"focusin"===a?(Yg(),oc=b,pc=c,oc.attachEvent("onpropertychange",Zg)):"focusout"===a&&Yg()}function Pj(a,b){if("selectionchange"===a||"keyup"===a||"keydown"===a)return fd(pc)}function Qj(a,b){if("click"===a)return fd(b)}function Rj(a,b){if("input"===
a||"change"===a)return fd(b)}function Sj(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}function qc(a,b){if(ua(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!Zd.call(b,e)||!ua(a[e],b[e]))return!1}return!0}function $g(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function ah(a,b){var c=$g(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;
if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=$g(c)}}function bh(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?bh(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function ch(){for(var a=window,b=Qc();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;
b=Qc(a.document)}return b}function Ie(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}function Tj(a){var b=ch(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&bh(c.ownerDocument.documentElement,c)){if(null!==d&&Ie(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);
else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=ah(c,f);var g=ah(c,d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),
a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}function dh(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Je||null==Jb||Jb!==Qc(d)||(d=Jb,"selectionStart"in d&&Ie(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d=
{anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),rc&&qc(rc,d)||(rc=d,d=ed(Ke,"onSelect"),0<d.length&&(b=new He("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Jb)))}function gd(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}function hd(a){if(Le[a])return Le[a];if(!Kb[a])return a;var b=Kb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in eh)return Le[a]=b[c];return a}function $a(a,
b){fh.set(a,b);mb(b,[a])}function gh(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;mj(d,b,void 0,a);a.currentTarget=null}function Xg(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;gh(e,h,n);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;n=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;
gh(e,h,n);f=k}}}if(Tc)throw a=ue,Tc=!1,ue=null,a;}function B(a,b){var c=b[Me];void 0===c&&(c=b[Me]=new Set);var d=a+"__bubble";c.has(d)||(hh(b,a,2,!1),c.add(d))}function Ne(a,b,c){var d=0;b&&(d|=4);hh(c,a,d,b)}function sc(a){if(!a[id]){a[id]=!0;cg.forEach(function(b){"selectionchange"!==b&&(Uj.has(b)||Ne(b,!1,a),Ne(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[id]||(b[id]=!0,Ne("selectionchange",!1,b))}}function hh(a,b,c,d,e){switch(Lg(b)){case 1:e=zj;break;case 4:e=Aj;break;default:e=
Be}c=e.bind(null,b,c,a);e=void 0;!Oe||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}function Ce(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;
if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=ob(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}wg(function(){var d=f,e=re(c),g=[];a:{var h=fh.get(a);if(void 0!==h){var k=He,m=a;switch(a){case "keypress":if(0===cd(c))break a;case "keydown":case "keyup":k=Vj;break;case "focusin":m="focus";k=Pe;break;case "focusout":m="blur";k=Pe;break;case "beforeblur":case "afterblur":k=Pe;break;
case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=ih;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=Wj;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Xj;break;case jh:case kh:case lh:k=Yj;break;case mh:k=Zj;break;case "scroll":k=ak;break;case "wheel":k=bk;break;case "copy":case "cut":case "paste":k=
ck;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=nh}var l=0!==(b&4),p=!l&&"scroll"===a,w=l?null!==h?h+"Capture":null:h;l=[];for(var A=d,t;null!==A;){t=A;var M=t.stateNode;5===t.tag&&null!==M&&(t=M,null!==w&&(M=fc(A,w),null!=M&&l.push(tc(A,M,t))));if(p)break;A=A.return}0<l.length&&(h=new k(h,m,null,c,e),g.push({event:h,listeners:l}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===
a;k="mouseout"===a||"pointerout"===a;if(h&&c!==ze&&(m=c.relatedTarget||c.fromElement)&&(ob(m)||m[Ja]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(m=c.relatedTarget||c.toElement,k=d,m=m?ob(m):null,null!==m&&(p=nb(m),m!==p||5!==m.tag&&6!==m.tag))m=null}else k=null,m=d;if(k!==m){l=ih;M="onMouseLeave";w="onMouseEnter";A="mouse";if("pointerout"===a||"pointerover"===a)l=nh,M="onPointerLeave",w="onPointerEnter",A="pointer";p=null==k?h:Ib(k);t=null==
m?h:Ib(m);h=new l(M,A+"leave",k,c,e);h.target=p;h.relatedTarget=t;M=null;ob(e)===d&&(l=new l(w,A+"enter",m,c,e),l.target=t,l.relatedTarget=p,M=l);p=M;if(k&&m)b:{l=k;w=m;A=0;for(t=l;t;t=Lb(t))A++;t=0;for(M=w;M;M=Lb(M))t++;for(;0<A-t;)l=Lb(l),A--;for(;0<t-A;)w=Lb(w),t--;for(;A--;){if(l===w||null!==w&&l===w.alternate)break b;l=Lb(l);w=Lb(w)}l=null}else l=null;null!==k&&oh(g,h,k,l,!1);null!==m&&null!==p&&oh(g,p,m,l,!0)}}}a:{h=d?Ib(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===
k&&"file"===h.type)var ma=Nj;else if(Vg(h))if(ph)ma=Rj;else{ma=Pj;var va=Oj}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(ma=Qj);if(ma&&(ma=ma(a,d))){Wg(g,ma,c,e);break a}va&&va(a,h,d);"focusout"===a&&(va=h._wrapperState)&&va.controlled&&"number"===h.type&&me(h,"number",h.value)}va=d?Ib(d):window;switch(a){case "focusin":if(Vg(va)||"true"===va.contentEditable)Jb=va,Ke=d,rc=null;break;case "focusout":rc=Ke=Jb=null;break;case "mousedown":Je=!0;break;case "contextmenu":case "mouseup":case "dragend":Je=
!1;dh(g,c,e);break;case "selectionchange":if(dk)break;case "keydown":case "keyup":dh(g,c,e)}var ab;if(Ge)b:{switch(a){case "compositionstart":var da="onCompositionStart";break b;case "compositionend":da="onCompositionEnd";break b;case "compositionupdate":da="onCompositionUpdate";break b}da=void 0}else Hb?Qg(a,c)&&(da="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(da="onCompositionStart");da&&(Ug&&"ko"!==c.locale&&(Hb||"onCompositionStart"!==da?"onCompositionEnd"===da&&Hb&&(ab=Og()):(Za=e,Ee=
"value"in Za?Za.value:Za.textContent,Hb=!0)),va=ed(d,da),0<va.length&&(da=new qh(da,a,null,c,e),g.push({event:da,listeners:va}),ab?da.data=ab:(ab=Rg(c),null!==ab&&(da.data=ab))));if(ab=ek?Ij(a,c):Jj(a,c))d=ed(d,"onBeforeInput"),0<d.length&&(e=new fk("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=ab)}Xg(g,b)})}function tc(a,b,c){return{instance:a,listener:b,currentTarget:c}}function ed(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==
f&&(e=f,f=fc(a,c),null!=f&&d.unshift(tc(a,f,e)),f=fc(a,b),null!=f&&d.push(tc(a,f,e)));a=a.return}return d}function Lb(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}function oh(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,n=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==n&&(h=n,e?(k=fc(c,f),null!=k&&g.unshift(tc(c,k,h))):e||(k=fc(c,f),null!=k&&g.push(tc(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function rh(a){return("string"===
typeof a?a:""+a).replace(gk,"\n").replace(hk,"")}function jd(a,b,c,d){b=rh(b);if(rh(a)!==b&&c)throw Error(m(425));}function kd(){}function Qe(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}function ik(a){setTimeout(function(){throw a;})}function Re(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=
e.data,"/$"===c){if(0===d){a.removeChild(e);nc(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);nc(b)}function Ka(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}function sh(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}function ob(a){var b=a[Da];
if(b)return b;for(var c=a.parentNode;c;){if(b=c[Ja]||c[Da]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sh(a);null!==a;){if(c=a[Da])return c;a=sh(a)}return b}a=c;c=a.parentNode}return null}function ec(a){a=a[Da]||a[Ja];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function Ib(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(m(33));}function Rc(a){return a[uc]||null}function bb(a){return{current:a}}function v(a,b){0>Mb||(a.current=Se[Mb],Se[Mb]=null,Mb--)}
function y(a,b,c){Mb++;Se[Mb]=a.current;a.current=b}function Nb(a,b){var c=a.type.contextTypes;if(!c)return cb;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function ea(a){a=a.childContextTypes;return null!==a&&void 0!==a}function th(a,b,c){if(J.current!==cb)throw Error(m(168));
y(J,b);y(S,c)}function uh(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,gj(a)||"Unknown",e));return E({},c,d)}function ld(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||cb;pb=J.current;y(J,a);y(S,S.current);return!0}function vh(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=uh(a,b,pb),d.__reactInternalMemoizedMergedChildContext=a,v(S),v(J),y(J,a)):v(S);
y(S,c)}function wh(a){null===La?La=[a]:La.push(a)}function jk(a){md=!0;wh(a)}function db(){if(!Te&&null!==La){Te=!0;var a=0,b=z;try{var c=La;for(z=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}La=null;md=!1}catch(e){throw null!==La&&(La=La.slice(a+1)),xh(De,db),e;}finally{z=b,Te=!1}}return null}function qb(a,b){Ob[Pb++]=nd;Ob[Pb++]=od;od=a;nd=b}function yh(a,b,c){na[oa++]=Ma;na[oa++]=Na;na[oa++]=rb;rb=a;var d=Ma;a=Na;var e=32-ta(d)-1;d&=~(1<<e);c+=1;var f=32-ta(b)+e;if(30<f){var g=e-e%5;
f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Ma=1<<32-ta(b)+e|c<<e|d;Na=f+a}else Ma=1<<f|c<<e|d,Na=a}function Ue(a){null!==a.return&&(qb(a,1),yh(a,1,0))}function Ve(a){for(;a===od;)od=Ob[--Pb],Ob[Pb]=null,nd=Ob[--Pb],Ob[Pb]=null;for(;a===rb;)rb=na[--oa],na[oa]=null,Na=na[--oa],na[oa]=null,Ma=na[--oa],na[oa]=null}function zh(a,b){var c=pa(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}function Ah(a,b){switch(a.tag){case 5:var c=
a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,la=a,fa=Ka(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,la=a,fa=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==rb?{id:Ma,overflow:Na}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=pa(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,la=a,fa=null,!0):!1;default:return!1}}function We(a){return 0!==
(a.mode&1)&&0===(a.flags&128)}function Xe(a){if(D){var b=fa;if(b){var c=b;if(!Ah(a,b)){if(We(a))throw Error(m(418));b=Ka(c.nextSibling);var d=la;b&&Ah(a,b)?zh(d,c):(a.flags=a.flags&-4097|2,D=!1,la=a)}}else{if(We(a))throw Error(m(418));a.flags=a.flags&-4097|2;D=!1;la=a}}}function Bh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;la=a}function pd(a){if(a!==la)return!1;if(!D)return Bh(a),D=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Qe(a.type,
a.memoizedProps));if(b&&(b=fa)){if(We(a)){for(a=fa;a;)a=Ka(a.nextSibling);throw Error(m(418));}for(;b;)zh(a,b),b=Ka(b.nextSibling)}Bh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){fa=Ka(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}fa=null}}else fa=la?Ka(a.stateNode.nextSibling):null;return!0}function Qb(){fa=la=null;D=!1}function Ye(a){null===
wa?wa=[a]:wa.push(a)}function vc(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}function qd(a,b){a=
Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ch(a){var b=a._init;return b(a._payload)}function Dh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=eb(a,b);a.index=
0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ze(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===Bb)return l(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ta&&
Ch(f)===b.type))return d=e(b,c.props),d.ref=vc(a,b,c),d.return=a,d;d=rd(c.type,c.key,c.props,null,a.mode,d);d.ref=vc(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=$e(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function l(a,b,c,d,f){if(null===b||7!==b.tag)return b=sb(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function u(a,b,c){if("string"===
typeof b&&""!==b||"number"===typeof b)return b=Ze(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sd:return c=rd(b.type,b.key,b.props,null,a.mode,c),c.ref=vc(a,null,b),c.return=a,c;case Cb:return b=$e(b,a.mode,c),b.return=a,b;case Ta:var d=b._init;return u(a,d(b._payload),c)}if(cc(b)||ac(b))return b=sb(b,a.mode,c,null),b.return=a,b;qd(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==
e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sd:return c.key===e?k(a,b,c,d):null;case Cb:return c.key===e?n(a,b,c,d):null;case Ta:return e=c._init,r(a,b,e(c._payload),d)}if(cc(c)||ac(c))return null!==e?null:l(a,b,c,d,null);qd(a,c)}return null}function p(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sd:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,
e);case Cb:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e);case Ta:var f=d._init;return p(a,b,c,f(d._payload),e)}if(cc(d)||ac(d))return a=a.get(c)||null,l(b,a,d,e,null);qd(b,d)}return null}function x(e,g,h,k){for(var n=null,m=null,l=g,t=g=0,q=null;null!==l&&t<h.length;t++){l.index>t?(q=l,l=null):q=l.sibling;var A=r(e,l,h[t],k);if(null===A){null===l&&(l=q);break}a&&l&&null===A.alternate&&b(e,l);g=f(A,g,t);null===m?n=A:m.sibling=A;m=A;l=q}if(t===h.length)return c(e,l),D&&qb(e,t),n;if(null===l){for(;t<
h.length;t++)l=u(e,h[t],k),null!==l&&(g=f(l,g,t),null===m?n=l:m.sibling=l,m=l);D&&qb(e,t);return n}for(l=d(e,l);t<h.length;t++)q=p(l,e,t,h[t],k),null!==q&&(a&&null!==q.alternate&&l.delete(null===q.key?t:q.key),g=f(q,g,t),null===m?n=q:m.sibling=q,m=q);a&&l.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function I(e,g,h,k){var n=ac(h);if("function"!==typeof n)throw Error(m(150));h=n.call(h);if(null==h)throw Error(m(151));for(var l=n=null,q=g,t=g=0,A=null,w=h.next();null!==q&&!w.done;t++,w=
h.next()){q.index>t?(A=q,q=null):A=q.sibling;var x=r(e,q,w.value,k);if(null===x){null===q&&(q=A);break}a&&q&&null===x.alternate&&b(e,q);g=f(x,g,t);null===l?n=x:l.sibling=x;l=x;q=A}if(w.done)return c(e,q),D&&qb(e,t),n;if(null===q){for(;!w.done;t++,w=h.next())w=u(e,w.value,k),null!==w&&(g=f(w,g,t),null===l?n=w:l.sibling=w,l=w);D&&qb(e,t);return n}for(q=d(e,q);!w.done;t++,w=h.next())w=p(q,e,t,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?t:w.key),g=f(w,g,t),null===l?n=w:l.sibling=
w,l=w);a&&q.forEach(function(a){return b(e,a)});D&&qb(e,t);return n}function v(a,d,f,h){"object"===typeof f&&null!==f&&f.type===Bb&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case sd:a:{for(var k=f.key,n=d;null!==n;){if(n.key===k){k=f.type;if(k===Bb){if(7===n.tag){c(a,n.sibling);d=e(n,f.props.children);d.return=a;a=d;break a}}else if(n.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ta&&Ch(k)===n.type){c(a,n.sibling);d=e(n,f.props);d.ref=vc(a,
n,f);d.return=a;a=d;break a}c(a,n);break}else b(a,n);n=n.sibling}f.type===Bb?(d=sb(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=rd(f.type,f.key,f.props,null,a.mode,h),h.ref=vc(a,d,f),h.return=a,a=h)}return g(a);case Cb:a:{for(n=f.key;null!==d;){if(d.key===n)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=$e(f,a.mode,h);d.return=a;
a=d}return g(a);case Ta:return n=f._init,v(a,d,n(f._payload),h)}if(cc(f))return x(a,d,f,h);if(ac(f))return I(a,d,f,h);qd(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ze(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return v}function af(){bf=Rb=td=null}function cf(a,b){b=ud.current;v(ud);a._currentValue=b}function df(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=
b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Sb(a,b){td=a;bf=Rb=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ha=!0),a.firstContext=null)}function qa(a){var b=a._currentValue;if(bf!==a)if(a={context:a,memoizedValue:b,next:null},null===Rb){if(null===td)throw Error(m(308));Rb=a;td.dependencies={lanes:0,firstContext:a}}else Rb=Rb.next=a;return b}function ef(a){null===tb?tb=[a]:tb.push(a)}function Eh(a,b,c,d){var e=b.interleaved;
null===e?(c.next=c,ef(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Oa(a,d)}function Oa(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}function ff(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue=
{baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Pa(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function fb(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(p&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return kk(a,c)}e=d.interleaved;null===e?(b.next=b,ef(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Oa(a,c)}function vd(a,b,c){b=
b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function Gh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,
shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=b;c.lastBaseUpdate=b}function wd(a,b,c,d){var e=a.updateQueue;gb=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,n=k.next;k.next=null;null===g?f=n:g.next=n;g=k;var l=a.alternate;null!==l&&(l=l.updateQueue,h=l.lastBaseUpdate,h!==g&&(null===h?l.firstBaseUpdate=n:h.next=n,l.lastBaseUpdate=k))}if(null!==f){var m=e.baseState;g=0;l=
n=k=null;h=f;do{var r=h.lane,p=h.eventTime;if((d&r)===r){null!==l&&(l=l.next={eventTime:p,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});a:{var x=a,v=h;r=b;p=c;switch(v.tag){case 1:x=v.payload;if("function"===typeof x){m=x.call(p,m,r);break a}m=x;break a;case 3:x.flags=x.flags&-65537|128;case 0:x=v.payload;r="function"===typeof x?x.call(p,m,r):x;if(null===r||void 0===r)break a;m=E({},m,r);break a;case 2:gb=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=
[h]:r.push(h))}else p={eventTime:p,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===l?(n=l=p,k=m):l=l.next=p,g|=r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===l&&(k=m);e.baseState=k;e.firstBaseUpdate=n;e.lastBaseUpdate=l;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);ra|=g;a.lanes=g;a.memoizedState=m}}function Hh(a,
b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}function ub(a){if(a===wc)throw Error(m(174));return a}function gf(a,b){y(xc,b);y(yc,a);y(Ea,wc);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:oe(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=oe(b,a)}v(Ea);y(Ea,b)}function Tb(a){v(Ea);v(yc);v(xc)}function Ih(a){ub(xc.current);
var b=ub(Ea.current);var c=oe(b,a.type);b!==c&&(y(yc,a),y(Ea,c))}function hf(a){yc.current===a&&(v(Ea),v(yc))}function xd(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=
b.return;b=b.sibling}return null}function jf(){for(var a=0;a<kf.length;a++)kf[a]._workInProgressVersionPrimary=null;kf.length=0}function V(){throw Error(m(321));}function lf(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!ua(a[c],b[c]))return!1;return!0}function mf(a,b,c,d,e,f){vb=f;C=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;yd.current=null===a||null===a.memoizedState?lk:mk;a=c(d,e);if(zc){f=0;do{zc=!1;Ac=0;if(25<=f)throw Error(m(301));f+=1;N=K=null;b.updateQueue=null;
yd.current=nk;a=c(d,e)}while(zc)}yd.current=zd;b=null!==K&&null!==K.next;vb=0;N=K=C=null;Ad=!1;if(b)throw Error(m(300));return a}function nf(){var a=0!==Ac;Ac=0;return a}function Fa(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===N?C.memoizedState=N=a:N=N.next=a;return N}function sa(){if(null===K){var a=C.alternate;a=null!==a?a.memoizedState:null}else a=K.next;var b=null===N?C.memoizedState:N.next;if(null!==b)N=b,K=a;else{if(null===a)throw Error(m(310));K=a;
a={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null};null===N?C.memoizedState=N=a:N=N.next=a}return N}function Bc(a,b){return"function"===typeof b?b(a):b}function of(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=K,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,n=f;do{var l=n.lane;if((vb&
l)===l)null!==k&&(k=k.next={lane:0,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null}),d=n.hasEagerState?n.eagerState:a(d,n.action);else{var u={lane:l,action:n.action,hasEagerState:n.hasEagerState,eagerState:n.eagerState,next:null};null===k?(h=k=u,g=d):k=k.next=u;C.lanes|=l;ra|=l}n=n.next}while(null!==n&&n!==f);null===k?g=d:k.next=h;ua(d,b.memoizedState)||(ha=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=
e.lane,C.lanes|=f,ra|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}function pf(a,b,c){b=sa();c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);ua(f,b.memoizedState)||(ha=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Jh(a,b,c){}function Kh(a,b,c){c=C;var d=sa(),
e=b(),f=!ua(d.memoizedState,e);f&&(d.memoizedState=e,ha=!0);d=d.queue;qf(Lh.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==N&&N.memoizedState.tag&1){c.flags|=2048;Cc(9,Mh.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(vb&30)||Nh(c,b,e)}return e}function Nh(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}function Mh(a,b,c,d){b.value=c;b.getSnapshot=
d;Oh(b)&&Ph(a)}function Lh(a,b,c){return c(function(){Oh(b)&&Ph(a)})}function Oh(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!ua(a,c)}catch(d){return!0}}function Ph(a){var b=Oa(a,1);null!==b&&xa(b,a,1,-1)}function Qh(a){var b=Fa();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:a};b.queue=a;a=a.dispatch=ok.bind(null,C,a);return[b.memoizedState,a]}function Cc(a,b,c,d){a={tag:a,create:b,
destroy:c,deps:d,next:null};b=C.updateQueue;null===b?(b={lastEffect:null,stores:null},C.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Rh(a){return sa().memoizedState}function Bd(a,b,c,d){var e=Fa();C.flags|=a;e.memoizedState=Cc(1|b,c,void 0,void 0===d?null:d)}function Cd(a,b,c,d){var e=sa();d=void 0===d?null:d;var f=void 0;if(null!==K){var g=K.memoizedState;f=g.destroy;if(null!==d&&lf(d,g.deps)){e.memoizedState=
Cc(b,c,f,d);return}}C.flags|=a;e.memoizedState=Cc(1|b,c,f,d)}function Sh(a,b){return Bd(8390656,8,a,b)}function qf(a,b){return Cd(2048,8,a,b)}function Th(a,b){return Cd(4,2,a,b)}function Uh(a,b){return Cd(4,4,a,b)}function Vh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function Wh(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Cd(4,4,Vh.bind(null,b,a),c)}function rf(a,b){}function Xh(a,b){var c=
sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function Yh(a,b){var c=sa();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&lf(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Zh(a,b,c){if(0===(vb&21))return a.baseState&&(a.baseState=!1,ha=!0),a.memoizedState=c;ua(c,b)||(c=Dg(),C.lanes|=c,ra|=c,a.baseState=!0);return b}function pk(a,b,c){c=z;z=0!==c&&4>c?c:4;a(!0);var d=sf.transition;sf.transition=
{};try{a(!1),b()}finally{z=c,sf.transition=d}}function $h(){return sa().memoizedState}function qk(a,b,c){var d=hb(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,c);else if(c=Eh(a,b,c,d),null!==c){var e=Z();xa(c,a,d,e);ci(c,b,d)}}function ok(a,b,c){var d=hb(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(ai(a))bi(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,
h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(ua(h,g)){var k=b.interleaved;null===k?(e.next=e,ef(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(n){}finally{}c=Eh(a,b,e,d);null!==c&&(e=Z(),xa(c,a,d,e),ci(c,b,d))}}function ai(a){var b=a.alternate;return a===C||null!==b&&b===C}function bi(a,b){zc=Ad=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function ci(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;xe(a,c)}}function ya(a,b){if(a&&
a.defaultProps){b=E({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function tf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:E({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}function di(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}function ei(a,b,c){var d=!1,e=cb;var f=b.contextType;"object"===typeof f&&
null!==f?f=qa(f):(e=ea(b)?pb:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Nb(a,e):cb);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Dd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}function fi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&
b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Dd.enqueueReplaceState(b,b.state,null)}function uf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};ff(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=qa(f):(f=ea(b)?pb:J.current,e.context=Nb(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(tf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==
typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Dd.enqueueReplaceState(e,e.state,null),wd(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ub(a,b){try{var c="",d=b;do c+=fj(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+
"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function vf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function wf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}function gi(a,b,c){c=Pa(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Ed||(Ed=!0,xf=d);wf(a,b)};return c}function hi(a,b,c){c=Pa(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};
c.callback=function(){wf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){wf(a,b);"function"!==typeof d&&(null===ib?ib=new Set([this]):ib.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}function ii(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new rk;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=sk.bind(null,a,b,c),b.then(a,a))}function ji(a){do{var b;
if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}function ki(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Pa(-1,1),b.tag=2,fb(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function aa(a,b,c,d){b.child=null===a?li(b,null,c,d):Vb(b,a.child,c,d)}function mi(a,b,c,d,e){c=c.render;var f=b.ref;Sb(b,e);d=mf(a,b,c,d,f,
e);c=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&c&&Ue(b);b.flags|=1;aa(a,b,d,e);return b.child}function ni(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!yf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,oi(a,b,f,d,e);a=rd(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:qc;if(c(g,d)&&a.ref===
b.ref)return Qa(a,b,e)}b.flags|=1;a=eb(f,d);a.ref=b.ref;a.return=b;return b.child=a}function oi(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(qc(f,d)&&a.ref===b.ref)if(ha=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(ha=!0);else return b.lanes=a.lanes,Qa(a,b,e)}return zf(a,b,c,d,e)}function pi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},y(Ga,ba),ba|=c;
else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,y(Ga,ba),ba|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;y(Ga,ba);ba|=d}else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,y(Ga,ba),ba|=d;aa(a,b,e,c);return b.child}function qi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function zf(a,
b,c,d,e){var f=ea(c)?pb:J.current;f=Nb(b,f);Sb(b,e);c=mf(a,b,c,d,f,e);d=nf();if(null!==a&&!ha)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Qa(a,b,e);D&&d&&Ue(b);b.flags|=1;aa(a,b,c,e);return b.child}function ri(a,b,c,d,e){if(ea(c)){var f=!0;ld(b)}else f=!1;Sb(b,e);if(null===b.stateNode)Fd(a,b),ei(b,c,d),uf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,n=c.contextType;"object"===typeof n&&null!==n?n=qa(n):(n=ea(c)?pb:J.current,n=Nb(b,
n));var l=c.getDerivedStateFromProps,m="function"===typeof l||"function"===typeof g.getSnapshotBeforeUpdate;m||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==n)&&fi(b,g,d,n);gb=!1;var r=b.memoizedState;g.state=r;wd(b,d,g,e);k=b.memoizedState;h!==d||r!==k||S.current||gb?("function"===typeof l&&(tf(b,c,l,d),k=b.memoizedState),(h=gb||di(b,c,h,d,r,k,n))?(m||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||
("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=n,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Fh(a,b);h=b.memoizedProps;n=b.type===b.elementType?h:ya(b.type,h);g.props=
n;m=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=qa(k):(k=ea(c)?pb:J.current,k=Nb(b,k));var p=c.getDerivedStateFromProps;(l="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==m||r!==k)&&fi(b,g,d,k);gb=!1;r=b.memoizedState;g.state=r;wd(b,d,g,e);var x=b.memoizedState;h!==m||r!==x||S.current||gb?("function"===typeof p&&(tf(b,c,p,d),x=b.memoizedState),
(n=gb||di(b,c,n,d,r,x,k)||!1)?(l||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=
4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=n):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return Af(a,b,c,d,f,e)}function Af(a,b,c,d,e,f){qi(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&vh(b,c,!1),
Qa(a,b,f);d=b.stateNode;tk.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Vb(b,a.child,null,f),b.child=Vb(b,null,h,f)):aa(a,b,h,f);b.memoizedState=d.state;e&&vh(b,c,!0);return b.child}function si(a){var b=a.stateNode;b.pendingContext?th(a,b.pendingContext,b.pendingContext!==b.context):b.context&&th(a,b.context,!1);gf(a,b.containerInfo)}function ti(a,b,c,d,e){Qb();Ye(e);b.flags|=256;aa(a,b,c,d);return b.child}function Bf(a){return{baseLanes:a,
cachePool:null,transitions:null}}function ui(a,b,c){var d=b.pendingProps,e=F.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(F,e&1);if(null===a){Xe(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==
f?(f.childLanes=0,f.pendingProps=g):f=Gd(g,d,0,null),a=sb(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=Bf(c),b.memoizedState=Cf,a):Df(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return uk(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=eb(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=eb(h,f):(f=
sb(f,g,c,null),f.flags|=2);f.return=b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?Bf(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=Cf;return d}f=a.child;a=f.sibling;d=eb(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function Df(a,b,c){b=Gd({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function Hd(a,b,c,d){null!==d&&Ye(d);Vb(b,a.child,null,c);a=Df(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}function uk(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=vf(Error(m(422))),Hd(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=Gd({mode:"visible",children:d.children},e,0,null);f=sb(f,e,g,null);f.flags|=2;d.return=
b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Vb(b,a.child,null,g);b.child.memoizedState=Bf(g);b.memoizedState=Cf;return f}if(0===(b.mode&1))return Hd(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;if(d)var h=d.dgst;d=h;f=Error(m(419));d=vf(f,d,void 0);return Hd(a,b,g,d)}h=0!==(g&a.childLanes);if(ha||h){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=
32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Oa(a,e),xa(d,a,e,-1))}Ef();d=vf(Error(m(421)));return Hd(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vk.bind(null,a),e._reactRetry=b,null;a=f.treeContext;fa=Ka(e.nextSibling);la=b;D=!0;wa=null;null!==a&&(na[oa++]=Ma,na[oa++]=Na,na[oa++]=rb,Ma=a.id,Na=a.overflow,rb=b);b=Df(b,d.children);b.flags|=4096;return b}function vi(a,b,c){a.lanes|=b;var d=a.alternate;
null!==d&&(d.lanes|=b);df(a.return,b,c)}function Ff(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}function wi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;aa(a,b,d.children,c);d=F.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&
vi(a,c,b);else if(19===a.tag)vi(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}y(F,d);if(0===(b.mode&1))b.memoizedState=null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===xd(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ff(b,!1,e,c,f);break;case "backwards":c=
null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===xd(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ff(b,!0,c,null,f);break;case "together":Ff(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}function Fd(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Qa(a,b,c){null!==a&&(b.dependencies=a.dependencies);ra|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==
b.child){a=b.child;c=eb(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=eb(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}function wk(a,b,c){switch(b.tag){case 3:si(b);Qb();break;case 5:Ih(b);break;case 1:ea(b.type)&&ld(b);break;case 4:gf(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;y(ud,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(F,F.current&
1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return ui(a,b,c);y(F,F.current&1);a=Qa(a,b,c);return null!==a?a.sibling:null}y(F,F.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return wi(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(F,F.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,pi(a,b,c)}return Qa(a,b,c)}function Dc(a,b){if(!D)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==
b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}function W(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,
d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}function xk(a,b,c){var d=b.pendingProps;Ve(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(b),null;case 1:return ea(b.type)&&(v(S),v(J)),W(b),null;case 3:d=b.stateNode;Tb();v(S);v(J);jf();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)pd(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&
256)||(b.flags|=1024,null!==wa&&(Gf(wa),wa=null));xi(a,b);W(b);return null;case 5:hf(b);var e=ub(xc.current);c=b.type;if(null!==a&&null!=b.stateNode)yk(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));W(b);return null}a=ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Da]=b;d[uc]=f;a=0!==(b.mode&1);switch(c){case "dialog":B("cancel",d);B("close",d);break;case "iframe":case "object":case "embed":B("load",d);break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],d);break;case "source":B("error",d);break;case "img":case "image":case "link":B("error",d);B("load",d);break;case "details":B("toggle",d);break;case "input":kg(d,f);B("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};B("invalid",d);break;case "textarea":ng(d,f),B("invalid",d)}pe(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&
jd(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&jd(d.textContent,h,a),e=["children",""+h]):$b.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&B("scroll",d)}switch(c){case "input":Pc(d);mg(d,f,!0);break;case "textarea":Pc(d);pg(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=kd)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===
a&&(a=qg(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Da]=b;a[uc]=d;zk(a,b,!1,!1);b.stateNode=a;a:{g=qe(c,d);switch(c){case "dialog":B("cancel",a);B("close",a);e=d;break;case "iframe":case "object":case "embed":B("load",a);e=d;break;
case "video":case "audio":for(e=0;e<Ec.length;e++)B(Ec[e],a);e=d;break;case "source":B("error",a);e=d;break;case "img":case "image":case "link":B("error",a);B("load",a);e=d;break;case "details":B("toggle",a);e=d;break;case "input":kg(a,d);e=ke(a,d);B("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=E({},d,{value:void 0});B("invalid",a);break;case "textarea":ng(a,d);e=ne(a,d);B("invalid",a);break;default:e=d}pe(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=
h[f];"style"===f?sg(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&yi(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&Fc(a,k):"number"===typeof k&&Fc(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&($b.hasOwnProperty(f)?null!=k&&"onScroll"===f&&B("scroll",a):null!=k&&$d(a,f,k,g))}switch(c){case "input":Pc(a);mg(a,d,!1);break;case "textarea":Pc(a);pg(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Ua(d.value));
break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?Db(a,!!d.multiple,f,!1):null!=d.defaultValue&&Db(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=kd)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}W(b);return null;case 6:if(a&&null!=b.stateNode)Ak(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===
b.stateNode)throw Error(m(166));c=ub(xc.current);ub(Ea.current);if(pd(b)){d=b.stateNode;c=b.memoizedProps;d[Da]=b;if(f=d.nodeValue!==c)if(a=la,null!==a)switch(a.tag){case 3:jd(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&jd(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Da]=b,b.stateNode=d}W(b);return null;case 13:v(F);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(D&&
null!==fa&&0!==(b.mode&1)&&0===(b.flags&128)){for(f=fa;f;)f=Ka(f.nextSibling);Qb();b.flags|=98560;f=!1}else if(f=pd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!f)throw Error(m(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(m(317));f[Da]=b}else Qb(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;W(b);f=!1}else null!==wa&&(Gf(wa),wa=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&
d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(F.current&1)?0===L&&(L=3):Ef()));null!==b.updateQueue&&(b.flags|=4);W(b);return null;case 4:return Tb(),xi(a,b),null===a&&sc(b.stateNode.containerInfo),W(b),null;case 10:return cf(b.type._context),W(b),null;case 17:return ea(b.type)&&(v(S),v(J)),W(b),null;case 19:v(F);f=b.memoizedState;if(null===f)return W(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dc(f,!1);else{if(0!==L||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=
xd(a);if(null!==g){b.flags|=128;Dc(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,
f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;y(F,F.current&1|2);return b.child}a=a.sibling}null!==f.tail&&P()>Hf&&(b.flags|=128,d=!0,Dc(f,!1),b.lanes=4194304)}else{if(!d)if(a=xd(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dc(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!D)return W(b),null}else 2*P()-f.renderingStartTime>Hf&&1073741824!==c&&(b.flags|=
128,d=!0,Dc(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=b,f.tail=b.sibling,f.renderingStartTime=P(),b.sibling=null,c=F.current,y(F,d?c&1|2:c&1),b;W(b);return null;case 22:case 23:return ba=Ga.current,v(Ga),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(ba&1073741824)&&(W(b),b.subtreeFlags&6&&(b.flags|=8192)):W(b),null;case 24:return null;
case 25:return null}throw Error(m(156,b.tag));}function Bk(a,b,c){Ve(b);switch(b.tag){case 1:return ea(b.type)&&(v(S),v(J)),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Tb(),v(S),v(J),jf(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return hf(b),null;case 13:v(F);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Qb()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return v(F),null;case 4:return Tb(),
null;case 10:return cf(b.type._context),null;case 22:case 23:return ba=Ga.current,v(Ga),null;case 24:return null;default:return null}}function Wb(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){G(a,b,d)}else c.current=null}function If(a,b,c){try{c()}catch(d){G(a,b,d)}}function Ck(a,b){Jf=Zc;a=ch();if(Ie(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();
if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(M){c=null;break a}var g=0,h=-1,k=-1,n=0,q=0,u=a,r=null;b:for(;;){for(var p;;){u!==c||0!==e&&3!==u.nodeType||(h=g+e);u!==f||0!==d&&3!==u.nodeType||(k=g+d);3===u.nodeType&&(g+=u.nodeValue.length);if(null===(p=u.firstChild))break;r=u;u=p}for(;;){if(u===a)break b;r===c&&++n===e&&(h=g);r===f&&++q===d&&(k=g);if(null!==(p=u.nextSibling))break;u=r;r=u.parentNode}u=p}c=-1===h||-1===k?null:
{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Kf={focusedElem:a,selectionRange:c};Zc=!1;for(l=b;null!==l;)if(b=l,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,l=a;else for(;null!==l;){b=l;try{var x=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;case 1:if(null!==x){var v=x.memoizedProps,z=x.memoizedState,w=b.stateNode,A=w.getSnapshotBeforeUpdate(b.elementType===b.type?v:ya(b.type,v),z);w.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var t=
b.stateNode.containerInfo;1===t.nodeType?t.textContent="":9===t.nodeType&&t.documentElement&&t.removeChild(t.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(m(163));}}catch(M){G(b,b.return,M)}a=b.sibling;if(null!==a){a.return=b.return;l=a;break}l=b.return}x=zi;zi=!1;return x}function Gc(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&If(b,c,f)}e=e.next}while(e!==d)}}
function Id(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Lf(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Ai(a){var b=a.alternate;null!==b&&(a.alternate=null,Ai(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Da],delete b[uc],delete b[Me],delete b[Dk],
delete b[Ek]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Bi(a){return 5===a.tag||3===a.tag||4===a.tag}function Ci(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Bi(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&
2))return a.stateNode}}function Mf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=kd));else if(4!==d&&(a=a.child,null!==a))for(Mf(a,b,c),a=a.sibling;null!==a;)Mf(a,b,c),a=a.sibling}function Nf(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);
else if(4!==d&&(a=a.child,null!==a))for(Nf(a,b,c),a=a.sibling;null!==a;)Nf(a,b,c),a=a.sibling}function jb(a,b,c){for(c=c.child;null!==c;)Di(a,b,c),c=c.sibling}function Di(a,b,c){if(Ca&&"function"===typeof Ca.onCommitFiberUnmount)try{Ca.onCommitFiberUnmount(Uc,c)}catch(h){}switch(c.tag){case 5:X||Wb(c,b);case 6:var d=T,e=za;T=null;jb(a,b,c);T=d;za=e;null!==T&&(za?(a=T,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):T.removeChild(c.stateNode));break;case 18:null!==T&&(za?
(a=T,c=c.stateNode,8===a.nodeType?Re(a.parentNode,c):1===a.nodeType&&Re(a,c),nc(a)):Re(T,c.stateNode));break;case 4:d=T;e=za;T=c.stateNode.containerInfo;za=!0;jb(a,b,c);T=d;za=e;break;case 0:case 11:case 14:case 15:if(!X&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?If(c,b,g):0!==(f&4)&&If(c,b,g));e=e.next}while(e!==d)}jb(a,b,c);break;case 1:if(!X&&(Wb(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=
c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){G(c,b,h)}jb(a,b,c);break;case 21:jb(a,b,c);break;case 22:c.mode&1?(X=(d=X)||null!==c.memoizedState,jb(a,b,c),X=d):jb(a,b,c);break;default:jb(a,b,c)}}function Ei(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Fk);b.forEach(function(b){var d=Gk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}function Aa(a,b,c){c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=
c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:T=h.stateNode;za=!1;break a;case 3:T=h.stateNode.containerInfo;za=!0;break a;case 4:T=h.stateNode.containerInfo;za=!0;break a}h=h.return}if(null===T)throw Error(m(160));Di(f,g,e);T=null;za=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(n){G(e,b,n)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)Fi(b,a),b=b.sibling}function Fi(a,b,c){var d=a.alternate;c=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:Aa(b,a);
Ha(a);if(c&4){try{Gc(3,a,a.return),Id(3,a)}catch(I){G(a,a.return,I)}try{Gc(5,a,a.return)}catch(I){G(a,a.return,I)}}break;case 1:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);break;case 5:Aa(b,a);Ha(a);c&512&&null!==d&&Wb(d,d.return);if(a.flags&32){var e=a.stateNode;try{Fc(e,"")}catch(I){G(a,a.return,I)}}if(c&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==d?d.memoizedProps:f,h=a.type,k=a.updateQueue;a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&lg(e,f);
qe(h,g);var n=qe(h,f);for(g=0;g<k.length;g+=2){var q=k[g],u=k[g+1];"style"===q?sg(e,u):"dangerouslySetInnerHTML"===q?yi(e,u):"children"===q?Fc(e,u):$d(e,q,u,n)}switch(h){case "input":le(e,f);break;case "textarea":og(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var p=f.value;null!=p?Db(e,!!f.multiple,p,!1):r!==!!f.multiple&&(null!=f.defaultValue?Db(e,!!f.multiple,f.defaultValue,!0):Db(e,!!f.multiple,f.multiple?[]:"",!1))}e[uc]=f}catch(I){G(a,a.return,
I)}}break;case 6:Aa(b,a);Ha(a);if(c&4){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(I){G(a,a.return,I)}}break;case 3:Aa(b,a);Ha(a);if(c&4&&null!==d&&d.memoizedState.isDehydrated)try{nc(b.containerInfo)}catch(I){G(a,a.return,I)}break;case 4:Aa(b,a);Ha(a);break;case 13:Aa(b,a);Ha(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(Of=P()));c&4&&Ei(a);break;case 22:q=
null!==d&&null!==d.memoizedState;a.mode&1?(X=(n=X)||q,Aa(b,a),X=n):Aa(b,a);Ha(a);if(c&8192){n=null!==a.memoizedState;if((a.stateNode.isHidden=n)&&!q&&0!==(a.mode&1))for(l=a,q=a.child;null!==q;){for(u=l=q;null!==l;){r=l;p=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Gc(4,r,r.return);break;case 1:Wb(r,r.return);var x=r.stateNode;if("function"===typeof x.componentWillUnmount){c=r;b=r.return;try{d=c,x.props=d.memoizedProps,x.state=d.memoizedState,x.componentWillUnmount()}catch(I){G(c,b,I)}}break;
case 5:Wb(r,r.return);break;case 22:if(null!==r.memoizedState){Gi(u);continue}}null!==p?(p.return=r,l=p):Gi(u)}q=q.sibling}a:for(q=null,u=a;;){if(5===u.tag){if(null===q){q=u;try{e=u.stateNode,n?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=u.stateNode,k=u.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=rg("display",g))}catch(I){G(a,a.return,I)}}}else if(6===u.tag){if(null===q)try{u.stateNode.nodeValue=
n?"":u.memoizedProps}catch(I){G(a,a.return,I)}}else if((22!==u.tag&&23!==u.tag||null===u.memoizedState||u===a)&&null!==u.child){u.child.return=u;u=u.child;continue}if(u===a)break a;for(;null===u.sibling;){if(null===u.return||u.return===a)break a;q===u&&(q=null);u=u.return}q===u&&(q=null);u.sibling.return=u.return;u=u.sibling}}break;case 19:Aa(b,a);Ha(a);c&4&&Ei(a);break;case 21:break;default:Aa(b,a),Ha(a)}}function Ha(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Bi(c)){var d=c;
break a}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(Fc(e,""),d.flags&=-33);var f=Ci(a);Nf(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Ci(a);Mf(a,h,g);break;default:throw Error(m(161));}}catch(k){G(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function Hk(a,b,c){l=a;Hi(a,b,c)}function Hi(a,b,c){for(var d=0!==(a.mode&1);null!==l;){var e=l,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jd;if(!g){var h=e.alternate,k=null!==h&&null!==
h.memoizedState||X;h=Jd;var n=X;Jd=g;if((X=k)&&!n)for(l=e;null!==l;)g=l,k=g.child,22===g.tag&&null!==g.memoizedState?Ii(e):null!==k?(k.return=g,l=k):Ii(e);for(;null!==f;)l=f,Hi(f,b,c),f=f.sibling;l=e;Jd=h;X=n}Ji(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,l=f):Ji(a,b,c)}}function Ji(a,b,c){for(;null!==l;){b=l;if(0!==(b.flags&8772)){c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:X||Id(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!X)if(null===c)d.componentDidMount();
else{var e=b.elementType===b.type?c.memoizedProps:ya(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&Hh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=b.child.stateNode;break;case 1:c=b.child.stateNode}Hh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&
c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var n=b.alternate;if(null!==n){var q=n.memoizedState;if(null!==q){var p=q.dehydrated;null!==p&&nc(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}X||b.flags&512&&Lf(b)}catch(r){G(b,b.return,r)}}if(b===a){l=null;break}c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Gi(a){for(;null!==l;){var b=l;if(b===
a){l=null;break}var c=b.sibling;if(null!==c){c.return=b.return;l=c;break}l=b.return}}function Ii(a){for(;null!==l;){var b=l;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Id(4,b)}catch(k){G(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){G(b,e,k)}}var f=b.return;try{Lf(b)}catch(k){G(b,f,k)}break;case 5:var g=b.return;try{Lf(b)}catch(k){G(b,g,k)}}}catch(k){G(b,b.return,k)}if(b===a){l=null;break}var h=b.sibling;
if(null!==h){h.return=b.return;l=h;break}l=b.return}}function Hc(){Hf=P()+500}function Z(){return 0!==(p&6)?P():-1!==Kd?Kd:Kd=P()}function hb(a){if(0===(a.mode&1))return 1;if(0!==(p&2)&&0!==U)return U&-U;if(null!==Ik.transition)return 0===Ld&&(Ld=Dg()),Ld;a=z;if(0!==a)return a;a=window.event;a=void 0===a?16:Lg(a.type);return a}function xa(a,b,c,d){if(50<Ic)throw Ic=0,Pf=null,Error(m(185));ic(a,c,d);if(0===(p&2)||a!==O)a===O&&(0===(p&2)&&(Md|=c),4===L&&kb(a,U)),ia(a,d),1===c&&0===p&&0===(b.mode&1)&&
(Hc(),md&&db())}function ia(a,b){var c=a.callbackNode;tj(a,b);var d=Vc(a,a===O?U:0);if(0===d)null!==c&&Ki(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Ki(c);if(1===b)0===a.tag?jk(Li.bind(null,a)):wh(Li.bind(null,a)),Jk(function(){0===(p&6)&&db()}),c=null;else{switch(Eg(d)){case 1:c=De;break;case 4:c=Mg;break;case 16:c=ad;break;case 536870912:c=Ng;break;default:c=ad}c=Mi(c,Ni.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}function Ni(a,b){Kd=-1;
Ld=0;if(0!==(p&6))throw Error(m(327));var c=a.callbackNode;if(Xb()&&a.callbackNode!==c)return null;var d=Vc(a,a===O?U:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Nd(a,d);else{b=d;var e=p;p|=2;var f=Oi();if(O!==a||U!==b)Ra=null,Hc(),wb(a,b);do try{Kk();break}catch(h){Pi(a,h)}while(1);af();Od.current=f;p=e;null!==H?b=0:(O=null,U=0,b=L)}if(0!==b){2===b&&(e=ve(a),0!==e&&(d=e,b=Qf(a,e)));if(1===b)throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;if(6===b)kb(a,d);else{e=a.current.alternate;
if(0===(d&30)&&!Lk(e)&&(b=Nd(a,d),2===b&&(f=ve(a),0!==f&&(d=f,b=Qf(a,f))),1===b))throw c=Jc,wb(a,0),kb(a,d),ia(a,P()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:xb(a,ja,Ra);break;case 3:kb(a,d);if((d&130023424)===d&&(b=Of+500-P(),10<b)){if(0!==Vc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){Z();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),b);break}xb(a,ja,Ra);break;case 4:kb(a,d);if((d&4194240)===d)break;b=a.eventTimes;
for(e=-1;0<d;){var g=31-ta(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=P()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*Mk(d/1960))-d;if(10<d){a.timeoutHandle=Rf(xb.bind(null,a,ja,Ra),d);break}xb(a,ja,Ra);break;case 5:xb(a,ja,Ra);break;default:throw Error(m(329));}}}ia(a,P());return a.callbackNode===c?Ni.bind(null,a):null}function Qf(a,b){var c=Kc;a.current.memoizedState.isDehydrated&&(wb(a,b).flags|=256);a=Nd(a,b);2!==a&&(b=ja,ja=c,null!==b&&Gf(b));return a}function Gf(a){null===
ja?ja=a:ja.push.apply(ja,a)}function Lk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!ua(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}function kb(a,b){b&=~Sf;b&=~Md;a.suspendedLanes|=b;a.pingedLanes&=
~b;for(a=a.expirationTimes;0<b;){var c=31-ta(b),d=1<<c;a[c]=-1;b&=~d}}function Li(a){if(0!==(p&6))throw Error(m(327));Xb();var b=Vc(a,0);if(0===(b&1))return ia(a,P()),null;var c=Nd(a,b);if(0!==a.tag&&2===c){var d=ve(a);0!==d&&(b=d,c=Qf(a,d))}if(1===c)throw c=Jc,wb(a,0),kb(a,b),ia(a,P()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;xb(a,ja,Ra);ia(a,P());return null}function Tf(a,b){var c=p;p|=1;try{return a(b)}finally{p=c,0===p&&(Hc(),md&&db())}}function yb(a){null!==
lb&&0===lb.tag&&0===(p&6)&&Xb();var b=p;p|=1;var c=ca.transition,d=z;try{if(ca.transition=null,z=1,a)return a()}finally{z=d,ca.transition=c,p=b,0===(p&6)&&db()}}function wb(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Nk(c));if(null!==H)for(c=H.return;null!==c;){var d=c;Ve(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&(v(S),v(J));break;case 3:Tb();v(S);v(J);jf();break;case 5:hf(d);break;case 4:Tb();break;case 13:v(F);break;
case 19:v(F);break;case 10:cf(d.type._context);break;case 22:case 23:ba=Ga.current,v(Ga)}c=c.return}O=a;H=a=eb(a.current,null);U=ba=b;L=0;Jc=null;Sf=Md=ra=0;ja=Kc=null;if(null!==tb){for(b=0;b<tb.length;b++)if(c=tb[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}tb=null}return a}function Pi(a,b){do{var c=H;try{af();yd.current=zd;if(Ad){for(var d=C.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ad=
!1}vb=0;N=K=C=null;zc=!1;Ac=0;Uf.current=null;if(null===c||null===c.return){L=1;Jc=b;H=null;break}a:{var f=a,g=c.return,h=c,k=b;b=U;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var n=k,l=h,p=l.tag;if(0===(l.mode&1)&&(0===p||11===p||15===p)){var r=l.alternate;r?(l.updateQueue=r.updateQueue,l.memoizedState=r.memoizedState,l.lanes=r.lanes):(l.updateQueue=null,l.memoizedState=null)}var v=ji(g);if(null!==v){v.flags&=-257;ki(v,g,h,f,b);v.mode&1&&ii(f,n,b);b=v;k=n;var x=b.updateQueue;
if(null===x){var z=new Set;z.add(k);b.updateQueue=z}else x.add(k);break a}else{if(0===(b&1)){ii(f,n,b);Ef();break a}k=Error(m(426))}}else if(D&&h.mode&1){var y=ji(g);if(null!==y){0===(y.flags&65536)&&(y.flags|=256);ki(y,g,h,f,b);Ye(Ub(k,h));break a}}f=k=Ub(k,h);4!==L&&(L=2);null===Kc?Kc=[f]:Kc.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;b&=-b;f.lanes|=b;var w=gi(f,k,b);Gh(f,w);break a;case 1:h=k;var A=f.type,t=f.stateNode;if(0===(f.flags&128)&&("function"===typeof A.getDerivedStateFromError||
null!==t&&"function"===typeof t.componentDidCatch&&(null===ib||!ib.has(t)))){f.flags|=65536;b&=-b;f.lanes|=b;var B=hi(f,h,b);Gh(f,B);break a}}f=f.return}while(null!==f)}Qi(c)}catch(ma){b=ma;H===c&&null!==c&&(H=c=c.return);continue}break}while(1)}function Oi(){var a=Od.current;Od.current=zd;return null===a?zd:a}function Ef(){if(0===L||3===L||2===L)L=4;null===O||0===(ra&268435455)&&0===(Md&268435455)||kb(O,U)}function Nd(a,b){var c=p;p|=2;var d=Oi();if(O!==a||U!==b)Ra=null,wb(a,b);do try{Ok();break}catch(e){Pi(a,
e)}while(1);af();p=c;Od.current=d;if(null!==H)throw Error(m(261));O=null;U=0;return L}function Ok(){for(;null!==H;)Ri(H)}function Kk(){for(;null!==H&&!Pk();)Ri(H)}function Ri(a){var b=Qk(a.alternate,a,ba);a.memoizedProps=a.pendingProps;null===b?Qi(a):H=b;Uf.current=null}function Qi(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=xk(c,b,ba),null!==c){H=c;return}}else{c=Bk(c,b);if(null!==c){c.flags&=32767;H=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;
else{L=6;H=null;return}}b=b.sibling;if(null!==b){H=b;return}H=b=a}while(null!==b);0===L&&(L=5)}function xb(a,b,c){var d=z,e=ca.transition;try{ca.transition=null,z=1,Rk(a,b,c,d)}finally{ca.transition=e,z=d}return null}function Rk(a,b,c,d){do Xb();while(null!==lb);if(0!==(p&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;
uj(a,f);a===O&&(H=O=null,U=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Pd||(Pd=!0,Mi(ad,function(){Xb();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ca.transition;ca.transition=null;var g=z;z=1;var h=p;p|=4;Uf.current=null;Ck(a,c);Fi(c,a);Tj(Kf);Zc=!!Jf;Kf=Jf=null;a.current=c;Hk(c,a,e);Sk();p=h;z=g;ca.transition=f}else a.current=c;Pd&&(Pd=!1,lb=a,Qd=e);f=a.pendingLanes;0===f&&(ib=null);oj(c.stateNode,d);ia(a,P());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=
b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Ed)throw Ed=!1,a=xf,xf=null,a;0!==(Qd&1)&&0!==a.tag&&Xb();f=a.pendingLanes;0!==(f&1)?a===Pf?Ic++:(Ic=0,Pf=a):Ic=0;db();return null}function Xb(){if(null!==lb){var a=Eg(Qd),b=ca.transition,c=z;try{ca.transition=null;z=16>a?16:a;if(null===lb)var d=!1;else{a=lb;lb=null;Qd=0;if(0!==(p&6))throw Error(m(331));var e=p;p|=4;for(l=a.current;null!==l;){var f=l,g=f.child;if(0!==(l.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var n=
h[k];for(l=n;null!==l;){var q=l;switch(q.tag){case 0:case 11:case 15:Gc(8,q,f)}var u=q.child;if(null!==u)u.return=q,l=u;else for(;null!==l;){q=l;var r=q.sibling,v=q.return;Ai(q);if(q===n){l=null;break}if(null!==r){r.return=v;l=r;break}l=v}}}var x=f.alternate;if(null!==x){var y=x.child;if(null!==y){x.child=null;do{var C=y.sibling;y.sibling=null;y=C}while(null!==y)}}l=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,l=g;else b:for(;null!==l;){f=l;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Gc(9,
f,f.return)}var w=f.sibling;if(null!==w){w.return=f.return;l=w;break b}l=f.return}}var A=a.current;for(l=A;null!==l;){g=l;var t=g.child;if(0!==(g.subtreeFlags&2064)&&null!==t)t.return=g,l=t;else b:for(g=A;null!==l;){h=l;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Id(9,h)}}catch(ma){G(h,h.return,ma)}if(h===g){l=null;break b}var B=h.sibling;if(null!==B){B.return=h.return;l=B;break b}l=h.return}}p=e;db();if(Ca&&"function"===typeof Ca.onPostCommitFiberRoot)try{Ca.onPostCommitFiberRoot(Uc,
a)}catch(ma){}d=!0}return d}finally{z=c,ca.transition=b}}return!1}function Si(a,b,c){b=Ub(c,b);b=gi(a,b,1);a=fb(a,b,1);b=Z();null!==a&&(ic(a,1,b),ia(a,b))}function G(a,b,c){if(3===a.tag)Si(a,a,c);else for(;null!==b;){if(3===b.tag){Si(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===ib||!ib.has(d))){a=Ub(c,a);a=hi(b,a,1);b=fb(b,a,1);a=Z();null!==b&&(ic(b,1,a),ia(b,a));break}}b=b.return}}function sk(a,
b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Z();a.pingedLanes|=a.suspendedLanes&c;O===a&&(U&c)===c&&(4===L||3===L&&(U&130023424)===U&&500>P()-Of?wb(a,0):Sf|=c);ia(a,b)}function Ti(a,b){0===b&&(0===(a.mode&1)?b=1:(b=Rd,Rd<<=1,0===(Rd&130023424)&&(Rd=4194304)));var c=Z();a=Oa(a,b);null!==a&&(ic(a,b,c),ia(a,c))}function vk(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Ti(a,c)}function Gk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);
break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);Ti(a,c)}function Mi(a,b){return xh(a,b)}function Tk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function yf(a){a=
a.prototype;return!(!a||!a.isReactComponent)}function Uk(a){if("function"===typeof a)return yf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ie)return 11;if(a===je)return 14}return 2}function eb(a,b){var c=a.alternate;null===c?(c=pa(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=
a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}function rd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)yf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Bb:return sb(c.children,e,f,b);case fe:g=8;e|=8;break;case ee:return a=pa(12,c,b,e|2),a.elementType=ee,a.lanes=f,a;case ge:return a=
pa(13,c,b,e),a.elementType=ge,a.lanes=f,a;case he:return a=pa(19,c,b,e),a.elementType=he,a.lanes=f,a;case Ui:return Gd(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case hg:g=10;break a;case gg:g=9;break a;case ie:g=11;break a;case je:g=14;break a;case Ta:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=pa(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function sb(a,b,c,d){a=pa(7,a,d,b);a.lanes=c;return a}function Gd(a,b,c,d){a=pa(22,a,d,b);a.elementType=
Ui;a.lanes=c;a.stateNode={isHidden:!1};return a}function Ze(a,b,c){a=pa(6,a,null,b);a.lanes=c;return a}function $e(a,b,c){b=pa(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function Vk(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=
0;this.eventTimes=we(0);this.expirationTimes=we(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=we(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=null}function Vf(a,b,c,d,e,f,g,h,k,l){a=new Vk(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=pa(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,
pendingSuspenseBoundaries:null};ff(f);return a}function Wk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Cb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}function Vi(a){if(!a)return cb;a=a._reactInternals;a:{if(nb(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(ea(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));
}if(1===a.tag){var c=a.type;if(ea(c))return uh(a,c,b)}return b}function Wi(a,b,c,d,e,f,g,h,k,l){a=Vf(c,d,!0,a,e,f,g,h,k);a.context=Vi(null);c=a.current;d=Z();e=hb(c);f=Pa(d,e);f.callback=void 0!==b&&null!==b?b:null;fb(c,f,e);a.current.lanes=e;ic(a,e,d);ia(a,d);return a}function Sd(a,b,c,d){var e=b.current,f=Z(),g=hb(e);c=Vi(c);null===b.context?b.context=c:b.pendingContext=c;b=Pa(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=fb(e,b,g);null!==a&&(xa(a,e,g,f),vd(a,e,g));return g}
function Td(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Xi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function Wf(a,b){Xi(a,b);(a=a.alternate)&&Xi(a,b)}function Xk(a){a=Bg(a);return null===a?null:a.stateNode}function Yk(a){return null}function Xf(a){this._internalRoot=a}function Ud(a){this._internalRoot=a}function Yf(a){return!(!a||1!==a.nodeType&&9!==
a.nodeType&&11!==a.nodeType)}function Vd(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function Yi(){}function Zk(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=Td(g);f.call(a)}}var g=Wi(b,d,a,0,null,!1,!1,"",Yi);a._reactRootContainer=g;a[Ja]=g.current;sc(8===a.nodeType?a.parentNode:a);yb();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=Td(k);
h.call(a)}}var k=Vf(a,0,!1,null,null,!1,!1,"",Yi);a._reactRootContainer=k;a[Ja]=k.current;sc(8===a.nodeType?a.parentNode:a);yb(function(){Sd(b,k,c,d)});return k}function Wd(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=Td(g);h.call(a)}}Sd(b,g,a,e)}else g=Zk(c,b,a,e,d);return Td(g)}var cg=new Set,$b={},Ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Zd=Object.prototype.hasOwnProperty,
cj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,eg={},dg={},R={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){R[a]=
new Y(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];R[b]=new Y(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){R[a]=new Y(a,2,!1,a.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){R[a]=new Y(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){R[a]=
new Y(a,3,!1,a.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(a){R[a]=new Y(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){R[a]=new Y(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){R[a]=new Y(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){R[a]=new Y(a,5,!1,a.toLowerCase(),null,!1,!1)});var Zf=/[\-:]([a-z])/g,$f=function(a){return a[1].toUpperCase()};"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=
a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Zf,$f);R[b]=new Y(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!1,!1)});R.xlinkHref=new Y("xlinkHref",
1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){R[a]=new Y(a,1,!1,a.toLowerCase(),null,!0,!0)});var Sa=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sd=Symbol.for("react.element"),Cb=Symbol.for("react.portal"),Bb=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),ee=Symbol.for("react.profiler"),hg=Symbol.for("react.provider"),gg=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),ge=Symbol.for("react.suspense"),
he=Symbol.for("react.suspense_list"),je=Symbol.for("react.memo"),Ta=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ui=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var fg=Symbol.iterator,E=Object.assign,ae,ce=!1,cc=Array.isArray,Xd,yi=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,
c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{Xd=Xd||document.createElement("div");Xd.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Xd.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}}),Fc=function(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b},dc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,
borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,
strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$k=["Webkit","ms","Moz","O"];Object.keys(dc).forEach(function(a){$k.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);dc[b]=dc[a]})});var ij=E({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}),ze=null,se=null,Eb=null,Fb=null,xg=function(a,b){return a(b)},yg=function(){},te=!1,Oe=!1;if(Ia)try{var Lc={};Object.defineProperty(Lc,
"passive",{get:function(){Oe=!0}});window.addEventListener("test",Lc,Lc);window.removeEventListener("test",Lc,Lc)}catch(a){Oe=!1}var kj=function(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(q){this.onError(q)}},gc=!1,Sc=null,Tc=!1,ue=null,lj={onError:function(a){gc=!0;Sc=a}},Ba=zb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Scheduler,Jg=Ba.unstable_scheduleCallback,Kg=Ba.unstable_NormalPriority,xh=Jg,Ki=Ba.unstable_cancelCallback,Pk=Ba.unstable_shouldYield,
Sk=Ba.unstable_requestPaint,P=Ba.unstable_now,Dj=Ba.unstable_getCurrentPriorityLevel,De=Ba.unstable_ImmediatePriority,Mg=Ba.unstable_UserBlockingPriority,ad=Kg,Ej=Ba.unstable_LowPriority,Ng=Ba.unstable_IdlePriority,Uc=null,Ca=null,ta=Math.clz32?Math.clz32:pj,qj=Math.log,rj=Math.LN2,Wc=64,Rd=4194304,z=0,Ae=!1,Yc=[],Va=null,Wa=null,Xa=null,jc=new Map,kc=new Map,Ya=[],Bj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" "),
Gb=Sa.ReactCurrentBatchConfig,Zc=!0,$c=null,Za=null,Ee=null,bd=null,Yb={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},He=ka(Yb),Mc=E({},Yb,{view:0,detail:0}),ak=ka(Mc),ag,bg,Nc,Yd=E({},Mc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fe,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:
a.relatedTarget},movementX:function(a){if("movementX"in a)return a.movementX;a!==Nc&&(Nc&&"mousemove"===a.type?(ag=a.screenX-Nc.screenX,bg=a.screenY-Nc.screenY):bg=ag=0,Nc=a);return ag},movementY:function(a){return"movementY"in a?a.movementY:bg}}),ih=ka(Yd),al=E({},Yd,{dataTransfer:0}),Wj=ka(al),bl=E({},Mc,{relatedTarget:0}),Pe=ka(bl),cl=E({},Yb,{animationName:0,elapsedTime:0,pseudoElement:0}),Yj=ka(cl),dl=E({},Yb,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),
ck=ka(dl),el=E({},Yb,{data:0}),qh=ka(el),fk=qh,fl={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gl={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",
112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Gj={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"},hl=E({},Mc,{key:function(a){if(a.key){var b=fl[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=cd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?gl[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,
metaKey:0,repeat:0,locale:0,getModifierState:Fe,charCode:function(a){return"keypress"===a.type?cd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===a.type?cd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Vj=ka(hl),il=E({},Yd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nh=ka(il),jl=E({},Mc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,
ctrlKey:0,shiftKey:0,getModifierState:Fe}),Xj=ka(jl),kl=E({},Yb,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zj=ka(kl),ll=E({},Yd,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),bk=ka(ll),Hj=[9,13,27,32],Ge=Ia&&"CompositionEvent"in window,Oc=null;Ia&&"documentMode"in document&&(Oc=document.documentMode);var ek=Ia&&"TextEvent"in
window&&!Oc,Ug=Ia&&(!Ge||Oc&&8<Oc&&11>=Oc),Tg=String.fromCharCode(32),Sg=!1,Hb=!1,Kj={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0},oc=null,pc=null,ph=!1;Ia&&(ph=Lj("input")&&(!document.documentMode||9<document.documentMode));var ua="function"===typeof Object.is?Object.is:Sj,dk=Ia&&"documentMode"in document&&11>=document.documentMode,Jb=null,Ke=null,rc=null,Je=!1,Kb={animationend:gd("Animation","AnimationEnd"),
animationiteration:gd("Animation","AnimationIteration"),animationstart:gd("Animation","AnimationStart"),transitionend:gd("Transition","TransitionEnd")},Le={},eh={};Ia&&(eh=document.createElement("div").style,"AnimationEvent"in window||(delete Kb.animationend.animation,delete Kb.animationiteration.animation,delete Kb.animationstart.animation),"TransitionEvent"in window||delete Kb.transitionend.transition);var jh=hd("animationend"),kh=hd("animationiteration"),lh=hd("animationstart"),mh=hd("transitionend"),
fh=new Map,Zi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
(function(){for(var a=0;a<Zi.length;a++){var b=Zi[a],c=b.toLowerCase();b=b[0].toUpperCase()+b.slice(1);$a(c,"on"+b)}$a(jh,"onAnimationEnd");$a(kh,"onAnimationIteration");$a(lh,"onAnimationStart");$a("dblclick","onDoubleClick");$a("focusin","onFocus");$a("focusout","onBlur");$a(mh,"onTransitionEnd")})();Ab("onMouseEnter",["mouseout","mouseover"]);Ab("onMouseLeave",["mouseout","mouseover"]);Ab("onPointerEnter",["pointerout","pointerover"]);Ab("onPointerLeave",["pointerout","pointerover"]);mb("onChange",
"change click focusin focusout input keydown keyup selectionchange".split(" "));mb("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mb("onBeforeInput",["compositionend","keypress","textInput","paste"]);mb("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mb("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Uj=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ec)),id="_reactListening"+Math.random().toString(36).slice(2),gk=/\r\n?/g,hk=/\u0000|\uFFFD/g,Jf=null,Kf=null,Rf="function"===typeof setTimeout?setTimeout:void 0,Nk="function"===typeof clearTimeout?
clearTimeout:void 0,$i="function"===typeof Promise?Promise:void 0,Jk="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof $i?function(a){return $i.resolve(null).then(a).catch(ik)}:Rf,Zb=Math.random().toString(36).slice(2),Da="__reactFiber$"+Zb,uc="__reactProps$"+Zb,Ja="__reactContainer$"+Zb,Me="__reactEvents$"+Zb,Dk="__reactListeners$"+Zb,Ek="__reactHandles$"+Zb,Se=[],Mb=-1,cb={},J=bb(cb),S=bb(!1),pb=cb,La=null,md=!1,Te=!1,Ob=[],Pb=0,od=null,nd=0,na=[],oa=0,rb=null,Ma=1,Na="",la=
null,fa=null,D=!1,wa=null,Ik=Sa.ReactCurrentBatchConfig,Vb=Dh(!0),li=Dh(!1),ud=bb(null),td=null,Rb=null,bf=null,tb=null,kk=Oa,gb=!1,wc={},Ea=bb(wc),yc=bb(wc),xc=bb(wc),F=bb(0),kf=[],yd=Sa.ReactCurrentDispatcher,sf=Sa.ReactCurrentBatchConfig,vb=0,C=null,K=null,N=null,Ad=!1,zc=!1,Ac=0,ml=0,zd={readContext:qa,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useInsertionEffect:V,useLayoutEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,
useMutableSource:V,useSyncExternalStore:V,useId:V,unstable_isNewReconciler:!1},lk={readContext:qa,useCallback:function(a,b){Fa().memoizedState=[a,void 0===b?null:b];return a},useContext:qa,useEffect:Sh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Bd(4194308,4,Vh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Bd(4194308,4,a,b)},useInsertionEffect:function(a,b){return Bd(4,2,a,b)},useMemo:function(a,b){var c=Fa();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Fa();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=qk.bind(null,C,a);return[d.memoizedState,a]},useRef:function(a){var b=Fa();a={current:a};return b.memoizedState=a},useState:Qh,useDebugValue:rf,useDeferredValue:function(a){return Fa().memoizedState=a},useTransition:function(){var a=Qh(!1),b=a[0];a=pk.bind(null,a[1]);Fa().memoizedState=
a;return[b,a]},useMutableSource:function(a,b,c){},useSyncExternalStore:function(a,b,c){var d=C,e=Fa();if(D){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(vb&30)||Nh(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;Sh(Lh.bind(null,d,f,a),[a]);d.flags|=2048;Cc(9,Mh.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Fa(),b=O.identifierPrefix;if(D){var c=Na;var d=Ma;c=(d&~(1<<32-ta(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Ac++;0<c&&
(b+="H"+c.toString(32));b+=":"}else c=ml++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},mk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:of,useRef:Rh,useState:function(a){return of(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return Zh(b,K.memoizedState,a)},useTransition:function(){var a=of(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,
useSyncExternalStore:Kh,useId:$h,unstable_isNewReconciler:!1},nk={readContext:qa,useCallback:Xh,useContext:qa,useEffect:qf,useImperativeHandle:Wh,useInsertionEffect:Th,useLayoutEffect:Uh,useMemo:Yh,useReducer:pf,useRef:Rh,useState:function(a){return pf(Bc)},useDebugValue:rf,useDeferredValue:function(a){var b=sa();return null===K?b.memoizedState=a:Zh(b,K.memoizedState,a)},useTransition:function(){var a=pf(Bc)[0],b=sa().memoizedState;return[a,b]},useMutableSource:Jh,useSyncExternalStore:Kh,useId:$h,
unstable_isNewReconciler:!1},Dd={isMounted:function(a){return(a=a._reactInternals)?nb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Z(),e=hb(a),f=Pa(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=fb(a,f,e);null!==b&&(xa(b,a,e,d),vd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;
var c=Z(),d=hb(a),e=Pa(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=fb(a,e,d);null!==b&&(xa(b,a,d,c),vd(b,a,d))}},rk="function"===typeof WeakMap?WeakMap:Map,tk=Sa.ReactCurrentOwner,ha=!1,Cf={dehydrated:null,treeContext:null,retryLane:0};var zk=function(a,b,c,d){for(c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=
c.return;c=c.sibling}};var xi=function(a,b){};var yk=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){a=b.stateNode;ub(Ea.current);e=null;switch(c){case "input":f=ke(a,f);d=ke(a,d);e=[];break;case "select":f=E({},f,{value:void 0});d=E({},d,{value:void 0});e=[];break;case "textarea":f=ne(a,f);d=ne(a,d);e=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(a.onclick=kd)}pe(c,d);var g;c=null;for(l in f)if(!d.hasOwnProperty(l)&&f.hasOwnProperty(l)&&null!=f[l])if("style"===
l){var h=f[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&($b.hasOwnProperty(l)?e||(e=[]):(e=e||[]).push(l,null));for(l in d){var k=d[l];h=null!=f?f[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(e||(e=[]),e.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(e=e||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(e=e||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&($b.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&B("scroll",a),e||h===k||(e=[])):(e=e||[]).push(l,k))}c&&(e=e||[]).push("style",c);var l=e;if(b.updateQueue=l)b.flags|=4}};var Ak=function(a,
b,c,d){c!==d&&(b.flags|=4)};var Jd=!1,X=!1,Fk="function"===typeof WeakSet?WeakSet:Set,l=null,zi=!1,T=null,za=!1,Mk=Math.ceil,Od=Sa.ReactCurrentDispatcher,Uf=Sa.ReactCurrentOwner,ca=Sa.ReactCurrentBatchConfig,p=0,O=null,H=null,U=0,ba=0,Ga=bb(0),L=0,Jc=null,ra=0,Md=0,Sf=0,Kc=null,ja=null,Of=0,Hf=Infinity,Ra=null,Ed=!1,xf=null,ib=null,Pd=!1,lb=null,Qd=0,Ic=0,Pf=null,Kd=-1,Ld=0;var Qk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||S.current)ha=!0;else{if(0===(a.lanes&c)&&0===(b.flags&
128))return ha=!1,wk(a,b,c);ha=0!==(a.flags&131072)?!0:!1}else ha=!1,D&&0!==(b.flags&1048576)&&yh(b,nd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;Fd(a,b);a=b.pendingProps;var e=Nb(b,J.current);Sb(b,c);e=mf(null,b,d,a,e,c);var f=nf();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,ea(d)?(f=!0,ld(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ff(b),e.updater=Dd,b.stateNode=
e,e._reactInternals=b,uf(b,d,a,c),b=Af(null,b,d,!0,f,c)):(b.tag=0,D&&f&&Ue(b),aa(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{Fd(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Uk(d);a=ya(d,a);switch(e){case 0:b=zf(null,b,d,a,c);break a;case 1:b=ri(null,b,d,a,c);break a;case 11:b=mi(null,b,d,a,c);break a;case 14:b=ni(null,b,d,ya(d.type,a),c);break a}throw Error(m(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),zf(a,b,d,e,c);
case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),ri(a,b,d,e,c);case 3:a:{si(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Fh(a,b);wd(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Ub(Error(m(423)),b);b=ti(a,b,d,c,e);break a}else if(d!==e){e=
Ub(Error(m(424)),b);b=ti(a,b,d,c,e);break a}else for(fa=Ka(b.stateNode.containerInfo.firstChild),la=b,D=!0,wa=null,c=li(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Qb();if(d===e){b=Qa(a,b,c);break a}aa(a,b,d,c)}b=b.child}return b;case 5:return Ih(b),null===a&&Xe(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Qe(d,e)?g=null:null!==f&&Qe(d,f)&&(b.flags|=32),qi(a,b),aa(a,b,g,c),b.child;case 6:return null===a&&Xe(b),null;case 13:return ui(a,b,c);case 4:return gf(b,
b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Vb(b,null,d,c):aa(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),mi(a,b,d,e,c);case 7:return aa(a,b,b.pendingProps,c),b.child;case 8:return aa(a,b,b.pendingProps.children,c),b.child;case 12:return aa(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;y(ud,d._currentValue);d._currentValue=g;if(null!==f)if(ua(f.value,g)){if(f.children===
e.children&&!S.current){b=Qa(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Pa(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var p=l.pending;null===p?k.next=k:(k.next=p.next,p.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);df(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===
f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);df(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}aa(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Sb(b,c),e=qa(e),d=d(e),b.flags|=1,aa(a,b,d,c),b.child;case 14:return d=b.type,e=ya(d,b.pendingProps),e=ya(d.type,e),ni(a,b,d,e,c);case 15:return oi(a,
b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ya(d,e),Fd(a,b),b.tag=1,ea(d)?(a=!0,ld(b)):a=!1,Sb(b,c),ei(b,d,e),uf(b,d,e,c),Af(null,b,d,!0,a,c);case 19:return wi(a,b,c);case 22:return pi(a,b,c)}throw Error(m(156,b.tag));};var pa=function(a,b,c,d){return new Tk(a,b,c,d)},aj="function"===typeof reportError?reportError:function(a){console.error(a)};Ud.prototype.render=Xf.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(m(409));
Sd(a,b,null,null)};Ud.prototype.unmount=Xf.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;yb(function(){Sd(null,a,null,null)});b[Ja]=null}};Ud.prototype.unstable_scheduleHydration=function(a){if(a){var b=nl();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Ya.length&&0!==b&&b<Ya[c].priority;c++);Ya.splice(c,0,a);0===c&&Hg(a)}};var Cj=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=
hc(b.pendingLanes);0!==c&&(xe(b,c|1),ia(b,P()),0===(p&6)&&(Hc(),db()))}break;case 13:yb(function(){var b=Oa(a,1);if(null!==b){var c=Z();xa(b,a,1,c)}}),Wf(a,1)}};var Gg=function(a){if(13===a.tag){var b=Oa(a,134217728);if(null!==b){var c=Z();xa(b,a,134217728,c)}Wf(a,134217728)}};var xj=function(a){if(13===a.tag){var b=hb(a),c=Oa(a,b);if(null!==c){var d=Z();xa(c,a,b,d)}Wf(a,b)}};var nl=function(){return z};var wj=function(a,b){var c=z;try{return z=a,b()}finally{z=c}};se=function(a,b,c){switch(b){case "input":le(a,
c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Rc(d);if(!e)throw Error(m(90));jg(d);le(d,e)}}}break;case "textarea":og(a,c);break;case "select":b=c.value,null!=b&&Db(a,!!c.multiple,b,!1)}};(function(a,b,c){xg=a;yg=c})(Tf,function(a,b,c,d,e){var f=z,g=ca.transition;try{return ca.transition=null,z=1,a(b,c,d,e)}finally{z=f,ca.transition=
g,0===p&&Hc()}},yb);var ol={usingClientEntryPoint:!1,Events:[ec,Ib,Rc,ug,vg,Tf]};(function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sa.ReactCurrentDispatcher,findHostInstanceByFiber:Xk,
findFiberByHostInstance:a.findFiberByHostInstance||Yk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Uc=b.inject(a),Ca=b}catch(c){}a=b.checkDCE?!0:!1}}return a})({findFiberByHostInstance:ob,bundleType:0,version:"18.3.1-next-f1338f8080-20240426",
rendererPackageName:"react-dom"});Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ol;Q.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!Yf(b))throw Error(m(200));return Wk(a,b,null,c)};Q.createRoot=function(a,b){if(!Yf(a))throw Error(m(299));var c=!1,d="",e=aj;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=Vf(a,1,!1,null,null,
c,!1,d,e);a[Ja]=b.current;sc(8===a.nodeType?a.parentNode:a);return new Xf(b)};Q.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Bg(b);a=null===a?null:a.stateNode;return a};Q.flushSync=function(a){return yb(a)};Q.hydrate=function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!0,c)};Q.hydrateRoot=function(a,b,c){if(!Yf(a))throw Error(m(405));
var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=aj;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=Wi(b,null,a,1,null!=c?c:null,e,!1,f,g);a[Ja]=b.current;sc(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,e);return new Ud(b)};Q.render=
function(a,b,c){if(!Vd(b))throw Error(m(200));return Wd(null,a,b,!1,c)};Q.unmountComponentAtNode=function(a){if(!Vd(a))throw Error(m(40));return a._reactRootContainer?(yb(function(){Wd(null,null,a,!1,function(){a._reactRootContainer=null;a[Ja]=null})}),!0):!1};Q.unstable_batchedUpdates=Tf;Q.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!Vd(c))throw Error(m(200));if(null==a||void 0===a._reactInternals)throw Error(m(38));return Wd(a,b,c,!1,d)};Q.version="18.3.1-next-f1338f8080-20240426"});
})();
;
/* data.js */
// Directory content model — driven by the CSV.
// Loads studios.json at runtime; exposes SITE globally.
window.SITE = {
  title: "Just a Design List",
  strap: "A curated directory of design studios and independent designers.",
  curator: "Edited by Wences — Madrid",
  since: "Begun 2023",
  updated: "",
  statement:
    "A working index of studios and independent designers whose practice the editor finds worth returning to. Entries are collected slowly, without ranking, and each is kept short on purpose — a pointer, not a review. Navigate by discipline, geography, or simply read it as a list.",
  note:
    "The index is not exhaustive and makes no attempt to be. It favours small and medium studios, independent practices, and designers who publish their own work clearly on the open web.",
  categoriesOrder: [
    "Branding",
    "Graphic Design",
    "Interactive",
    "Packaging",
    "Typography",
    "Motion Graphics",
    "Illustration",
    "Advertising",
    "Industrial Design",
  ],
  categoryBlurbs: {
    "Branding": "Identity systems, marks, and brand architecture.",
    "Graphic Design": "Print, editorial, and graphic practices in the broadest sense.",
    "Interactive": "Digital product, art direction for the web, motion-led sites.",
    "Packaging": "Form, label, and the object that leaves the shelf.",
    "Typography": "Type design, custom lettering, and the specimen as a medium.",
    "Motion Graphics": "Title sequences, loops, and design that moves.",
    "Illustration": "Drawing as a discipline, alone or alongside design.",
    "Advertising": "Campaigns and the applied arts of persuasion.",
    "Industrial Design": "Objects, furniture, and the three-dimensional edge of the field.",
  },
  contact: {
    email: "wencesanz@gmail.com",
    instagram: "@justadesignlist",
    rss: "/feed.xml",
  },
  colophon: [
    "© 2026. Updated regularly with new studios and reader suggestions.",
    "Made with love for design by Wences Sanz-Alonso, from Madrid.",
  ],
};

// Async loader so studios.json isn't inlined (it's ~100KB).
// Index of own website screenshots (written by the monthly capture task).
const JADL_SHOTS_READY = fetch("/shots.json", { cache: "no-cache" })
  .then((r) => (r.ok ? r.json() : null))
  .then((j) => {
    if (j && j.ref && Array.isArray(j.slugs)) {
      const has = {};
      j.slugs.forEach((x) => { has[x] = 1; });
      window.JADL_SHOTS = { ref: j.ref, has };
    }
  })
  .catch(() => {});
window.SITE_READY = Promise.all([fetch("studios.json").then((r) => r.json()), JADL_SHOTS_READY])
  .then(([studios]) => {
    window.SITE.studios = studios;

    // derive aggregates
    const byCat = {};
    const byCountry = {};
    const byCity = {};
    const byType = {};
    const byRegion = {};
    studios.forEach((s) => {
      // Region from the colour code (social.js); empty for studios with no country.
      s.region = window.jadlRegion && String(s.country || "").trim() ? window.jadlRegion(s.country).name : "";
      if (s.region) byRegion[s.region] = (byRegion[s.region] || 0) + 1;
      s.category.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCat[c] = (byCat[c] || 0) + 1));
      s.country.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCountry[c] = (byCountry[c] || 0) + 1));
      s.city.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCity[c] = (byCity[c] || 0) + 1));
      const t = (s.type || "").trim();
      if (t) byType[t] = (byType[t] || 0) + 1;
    });
    window.SITE.byCat = byCat;
    window.SITE.byCountry = byCountry;
    window.SITE.byCity = byCity;
    window.SITE.byType = byType;
    window.SITE.byRegion = byRegion;
    window.SITE.totals = {
      studios: studios.length,
      categories: Object.keys(byCat).length,
      countries: Object.keys(byCountry).length,
      cities: Object.keys(byCity).length,
    };

    // featured: 6 hand-picked anchor studios + 6 random rotating, total 12 for home grid
    const pick = (name) => studios.find((s) => s.name === name);
    const anchors = [
      pick("Ludovic Balland"),
      pick("Akatre"),
      pick("Eric Hu studio"),
      pick("Another Collective"),
      pick("Fix Studio"),
      pick("Post-Spectacular Office"),
    ].filter(Boolean);

    // pick 6 random studios that (a) have a URL and (b) aren't already anchors
    const anchorNames = new Set(anchors.map((s) => s.name));
    const pool = studios.filter((s) => s.url && !anchorNames.has(s.name));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const randoms = shuffled.slice(0, 6);

    // Interleave anchors + randoms so the grid has variety and the hero tile rotates
    const featured = [];
    for (let i = 0; i < 6; i++) {
      featured.push(anchors[i]);
      featured.push(randoms[i]);
    }
    window.SITE.featured = featured.filter(Boolean);

    // recent: last 20 by edited date.
    // edited may come either as ISO string (from Notion's last_edited_time)
    // or as a Spanish-formatted date (legacy export). Try ISO first, fall
    // back to the Spanish parser.
    const monthMap = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11 };
    function parseEd(s) {
      if (!s || typeof s !== "string") return 0;
      const trim = s.trim();
      if (!trim || trim === "undefined" || trim === "null") return 0;
      // ISO 8601: starts with YYYY-MM-DD
      if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(trim)) {
        const iso = Date.parse(trim);
        if (!isNaN(iso)) return iso;
      }
      // Spanish: "16 de abril de 2025 15:03"
      const m = trim.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/i);
      if (m) {
        const month = monthMap[m[2].toLowerCase()];
        if (month !== undefined) {
          return new Date(+m[3], month, +m[1], +(m[4]||0), +(m[5]||0)).getTime();
        }
      }
      // Last-ditch: try Date.parse anyway
      const last = Date.parse(trim);
      return isNaN(last) ? 0 : last;
    }
    window.SITE.recent = [...studios]
      .sort((a, b) => {
        const diff = parseEd(b.created || b.edited) - parseEd(a.created || a.edited);
        if (diff !== 0) return diff;
        return (a.name || "").localeCompare(b.name || "");
      })
      .slice(0, 20);

    // Category color palette — intentionally monochrome.
    // All disciplines resolve to the same neutral ink colour so the system reads
    // as one index rather than a rainbow of tags.
    const _monoLight = new Proxy({}, { get: () => "var(--ink)" });
    const _monoDark  = new Proxy({}, { get: () => "var(--ink)" });
    window.SITE.catColors = _monoLight;
    window.SITE.catColorsDark = _monoDark;
    // Dark-mode companions (lighter, more saturated for legibility on dark)
    window.SITE.catColorsDark = _monoDark;

    return window.SITE;
  });
;
/* scroll_fx.js */
/* Scroll-velocity distortion for the studios list.
 *
 * Inspired by velocity-reactive lists (e.g. tomoyaokada.com): while the page
 * scrolls, the list rows lean (skewY) and stretch (scaleY) in proportion to
 * scroll velocity, then settle back to rest. Deliberately SUBTLE.
 *
 * Implementation notes:
 *  - Pure rAF loop reading window.scrollY — does NOT hijack native scrolling,
 *    so the scrollbar, keyboard, anchors and accessibility stay intact.
 *  - Transform is applied per-row via CSS vars set on the .st-list container.
 *  - At rest, the `sfx-active` class is removed so NO transform is present.
 *    This matters: a transformed ancestor turns `position:fixed` children into
 *    absolutely-positioned ones, which would misplace the row hover-preview.
 *    Clearing the transform at rest keeps the preview correct.
 *  - Honors prefers-reduced-motion and the `data-listfx="off"` tweak.
 */
(function () {
  var root = document.documentElement;
  var reduceMQ = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  // --- subtle intensity ---
  var MAX_SKEW = 1.6;    // degrees of lean at full velocity
  var MAX_SCALE = 0.055; // extra vertical stretch at full velocity
  var NORM = 55;         // px/frame that maps to "full" intensity
  var SMOOTH_VEL = 0.18; // velocity smoothing
  var EASE = 0.22;       // how fast applied transform chases the target

  var lastY = window.scrollY || window.pageYOffset || 0;
  var vel = 0;
  var curSkew = 0;
  var curScale = 0;
  var lastList = null;

  function enabled() {
    if (reduceMQ.matches) return false;
    return root.getAttribute("data-listfx") !== "off";
  }

  function clearList(list) {
    if (!list) return;
    list.classList.remove("sfx-active");
    list.style.removeProperty("--sfx-skew");
    list.style.removeProperty("--sfx-scale");
  }

  function frame() {
    var y = window.scrollY || window.pageYOffset || 0;
    var dv = y - lastY;
    lastY = y;
    vel += (dv - vel) * SMOOTH_VEL;

    var list = enabled() ? document.querySelector(".st-list") : null;

    // List gone (other view / grid mode / disabled) — make sure it's reset.
    if (!list) {
      if (lastList) { clearList(lastList); lastList = null; }
      curSkew = 0; curScale = 0;
      requestAnimationFrame(frame);
      return;
    }
    if (list !== lastList) { clearList(lastList); lastList = list; }

    var v = vel / NORM;
    if (v > 1) v = 1; else if (v < -1) v = -1;

    var targetSkew = -v * MAX_SKEW;                 // lean against the motion
    var targetScale = Math.min(Math.abs(v), 1) * MAX_SCALE;

    curSkew += (targetSkew - curSkew) * EASE;
    curScale += (targetScale - curScale) * EASE;

    if (Math.abs(curSkew) < 0.03 && curScale < 0.0025) {
      clearList(list); // truly at rest → drop the transform entirely
    } else {
      list.style.setProperty("--sfx-skew", curSkew.toFixed(3) + "deg");
      list.style.setProperty("--sfx-scale", (1 + curScale).toFixed(4));
      list.classList.add("sfx-active");
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
;
/* social.js */
// Social bits: the region colour code shared with the "From the list" posts on
// Instagram and X, the announcement bar and the "Follow the list" band.
// A studio's region comes from the first country in its "country" field.
(function () {
  var REGIONS = [
    { id: "iberia", name: "Iberia", color: "#F95721", countries: ["Spain", "Portugal"] },
    { id: "uk", name: "UK & Ireland", color: "#4D7CFE", countries: ["England", "Scotland", "Wales", "Northern Ireland", "Ireland"] },
    { id: "na", name: "North America", color: "#FFC21A", countries: ["USA", "Canada"] },
    { id: "nordics", name: "Nordics", color: "#2EC4B6", countries: ["Sweden", "Denmark", "Norway", "Finland", "Iceland"] },
    { id: "oceania", name: "Oceania", color: "#7ED957", countries: ["Australia", "New Zealand"] },
    { id: "europe", name: "Rest of Europe", color: "#B79CFF", countries: ["Germany", "France", "The Netherlands", "Switzerland", "Italy", "Austria", "Belgium", "Greece", "Poland", "Czech Republic", "Romania", "Ukraine", "Hungary", "Croatia", "Slovenia", "Estonia", "Lithuania", "Latvia", "Slovakia", "Malta", "North Macedonia", "Luxembourg", "Bulgaria", "Serbia"] },
    { id: "world", name: "Rest of the world", color: "#FF8FC7", countries: [] }
  ];
  // Studios with no fixed base (no country) get a neutral colour.
  var NOMAD = { id: "nomad", name: "Worldwide", color: "#BDBDB7", countries: [] };
  function regionOf(country) {
    var c = String(country || "").split(",")[0].trim().toLowerCase();
    if (!c) return NOMAD;
    for (var i = 0; i < REGIONS.length - 1; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return REGIONS[REGIONS.length - 1];
  }
  // Exact match only (used for country filter chips, where "All" gets no dot).
  function regionOfCountry(country) {
    var c = String(country || "").trim().toLowerCase();
    for (var i = 0; i < REGIONS.length; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return null;
  }

  // Real links for studio rows: crawlable, open in a new tab with Cmd/Ctrl-click,
  // reachable by keyboard; a plain click keeps the in-app navigation.
  window.jadlStudioLink = function (studio, onGo) {
    var slug = window.studioSlug ? window.studioSlug(studio) : "";
    return {
      href: slug ? "/studio/" + slug : undefined,
      onClick: function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        onGo();
      }
    };
  };
  // In-app navigation to any path (used by links rendered outside the views).
  window.jadlNavigate = function (path) {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };
  function slug(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  window.jadlRegionHref = function (name) { return "/region/" + slug(name); };
  window.JADL_REGIONS = REGIONS;
  window.jadlRegion = regionOf;
  window.jadlRegionOfCountry = regionOfCountry;
  // Small colour square shown before a studio name in lists.
  window.RegionDot = function (props) {
    var r = props.exact ? regionOfCountry(props.country) : regionOf(props.country);
    if (!r) return null;
    return React.createElement("span", {
      className: "rg-dot",
      style: { background: r.color },
      title: r.name,
      "aria-hidden": "true"
    });
  };
  // Labelled chip used on the studio page.
  window.RegionChip = function (props) {
    var r = regionOf(props.country);
    if (r.id === "nomad") {
      return React.createElement("span", { className: "rg-chip", style: { background: r.color } }, React.createElement("i", null), r.name);
    }
    var href = "/region/" + slug(r.name);
    return React.createElement("a", {
      className: "rg-chip",
      href: href,
      style: { background: r.color },
      title: "More studios in " + r.name,
      onClick: function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        window.jadlNavigate(href);
      }
    }, React.createElement("i", null), r.name);
  };
  var IG = "https://www.instagram.com/justadesignlist/";
  var X = "https://x.com/justadesignlist";
  var h = function () { return React.createElement.apply(React, arguments); };
  // Thin bar above the top navigation.
  window.AnnounceBar = function () {
    return h("aside", { "aria-label": "Announcement" }, h("a", { className: "ann", href: IG, target: "_blank", rel: "noopener" },
      h("b", null, "New"),
      h("span", null, "From the list, every week on Instagram and X"),
      h("u", null, "@justadesignlist \u2192")));
  };
  // Three tiles on the index page, after "Today's discovery".
  window.FollowBand = function () {
    return h("section", { className: "wrap follow-wrap" },
      h("div", { className: "follow-band" },
        h("div", { className: "fb-a" },
          h("div", { className: "fb-lbl" }, "Instagram \u00b7 X"),
          h("h3", { "aria-level": 2 }, "Follow the list. ", h("span", null, "New studios and designers every week."))),
        h("div", { className: "fb-b" },
          h("div", { className: "fb-lbl" }, "Colour code"),
          h("ul", { className: "fb-leg" }, REGIONS.map(function (r) {
            return h("li", { key: r.id }, h("i", { style: { background: r.color } }), r.name);
          }))),
        h("div", { className: "fb-c" },
          h("div", { className: "fb-lbl" }, "@justadesignlist"),
          h("div", null,
            h("a", { href: IG, target: "_blank", rel: "noopener" }, "Instagram", h("span", null, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E"))),
            h("a", { href: X, target: "_blank", rel: "noopener" }, "X", h("span", null, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E")))))));
  };
  // ---- Studio page: related groups (same city, same region, same discipline) ----
  var REGION_FROM = { "UK & Ireland": "the UK & Ireland", "Nordics": "the Nordic countries", "Rest of Europe": "elsewhere in Europe", "Rest of the world": "elsewhere in the world" };
  function hashStr(str) { var x = 2166136261; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function firstOf(v) { return String(v || "").split(",")[0].trim(); }
  function listOf(v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
  // Stable per-page shuffle, so each studio shows different neighbours.
  function pick(seed, arr, n) {
    return arr.map(function (x) { return [hashStr(seed + "|" + x.name), x]; })
      .sort(function (a, b) { return a[0] - b[0]; }).slice(0, n).map(function (p) { return p[1]; });
  }
  window.jadlRelatedGroups = function (s, all, n) {
    n = n || 6;
    var used = {}; used[s.name] = 1;
    var groups = [];
    var take = function (pool) { return pool.filter(function (x) { return !used[x.name]; }); };
    var mark = function (items) { items.forEach(function (x) { used[x.name] = 1; }); return items; };
    var city = firstOf(s.city);
    if (city) {
      var inCity = all.filter(function (x) { return listOf(x.city).indexOf(city) >= 0; });
      var items = mark(pick(s.name, take(inCity), n));
      if (items.length) groups.push({ key: "city", title: "More from " + city, items: items,
        more: { href: "/city/" + slug(city), label: "All " + inCity.length + " in " + city, kind: "city", value: city } });
    }
    if (s.region) {
      var inRegion = all.filter(function (x) { return x.region === s.region; });
      var ritems = mark(pick(s.name, take(inRegion), n));
      if (ritems.length) groups.push({ key: "region", title: "More from " + (REGION_FROM[s.region] || s.region), items: ritems,
        more: { href: "/region/" + slug(s.region), label: "All " + inRegion.length + " in " + s.region, kind: "region", value: s.region } });
    }
    var cat = firstOf(s.category);
    if (cat) {
      var inCat = all.filter(function (x) { return listOf(x.category).indexOf(cat) >= 0; });
      var citems = mark(pick(s.name, take(inCat), n));
      if (citems.length) groups.push({ key: "cat", title: "Neighbours in " + cat, items: citems,
        more: { href: "/discipline/" + slug(cat), label: "All " + inCat.length + " in " + cat, kind: "discipline", value: cat } });
    }
    return groups;
  };
  // Colour behind the studio name when there is no screenshot.
  window.jadlRegionColor = function (country) { return regionOf(country).color; };
  // ---- Website screenshots ----
  // Own captures (monthly GitHub Action, stored on the "shots" branch and
  // served by jsDelivr at a fixed commit) come first; mshots is the fallback.
  window.jadlShot = function (s, w, h) {
    if (!s || !s.url) return null;
    var m = window.JADL_SHOTS;
    var slug = window.studioSlug ? window.studioSlug(s) : "";
    if (m && m.ref && slug && m.has && m.has[slug]) return "https://cdn.jsdelivr.net/gh/wencesanz/JaDL@" + m.ref + "/s/" + slug + ".webp";
    return "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(s.url) + "?w=" + (w || 800) + "&h=" + (h || 600);
  };
  window.jadlMshot = function (s, w, h) {
    return s && s.url ? "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(s.url) + "?w=" + (w || 800) + "&h=" + (h || 600) : null;
  };
  // Thin "opens elsewhere" arrow. The ↗ character turns into a blue emoji on
  // iPhone, so links use this drawn version instead.
  window.jadlArrowNE = function () {
    return React.createElement("svg", { className: "arr-ne", viewBox: "0 0 12 12", width: "0.72em", height: "0.72em", "aria-hidden": "true", focusable: "false" },
      React.createElement("path", { d: "M3 9 9 3M4.2 3H9v4.8", fill: "none", stroke: "currentColor", strokeWidth: 1.15, strokeLinecap: "square" }));
  };
  // ---- Places: pair each city with its own country ----
  // Notion keeps cities and countries as two separate lists, so a studio in
  // Copenhagen and Tokyo reads "Copenhagen, Tokyo, Denmark, Japan". Cities are
  // matched to countries using the studios that have a single country.
  function placeLists(v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
  function buildCityIndex(all) {
    var votes = {};
    (all || []).forEach(function (s) {
      var k = placeLists(s.country);
      if (k.length !== 1) return;
      placeLists(s.city).forEach(function (c) {
        var key = c.toLowerCase();
        votes[key] = votes[key] || {};
        votes[key][k[0]] = (votes[key][k[0]] || 0) + 1;
      });
    });
    var out = {};
    Object.keys(votes).forEach(function (c) {
      var best = null, n = 0;
      Object.keys(votes[c]).forEach(function (k) { if (votes[c][k] > n) { n = votes[c][k]; best = k; } });
      out[c] = best;
    });
    return out;
  }
  // [{ country, cities: [] }] in the order the studio lists them.
  // Cities that appear in no single-country studio yet.
  var PLACE_HINTS = { fremantle: "Australia", tijuana: "Mexico", queenstown: "New Zealand" };
  function placeGroups(s, index) {
    var C = placeLists(s.city), K = placeLists(s.country);
    var groups = K.map(function (k) { return { country: k, cities: [] }; });
    var find = function (k) { for (var i = 0; i < groups.length; i++) if (groups[i].country.toLowerCase() === String(k).toLowerCase()) return groups[i]; return null; };
    // First pass: cities we can place for sure; second pass: the rest.
    var known = C.map(function (c, i) {
      if (K.length <= 1) return groups[0] || null;
      var hint = PLACE_HINTS[c.toLowerCase()] || index[c.toLowerCase()];
      return find(c) || (hint ? find(hint) : null) || (C.length === K.length ? groups[i] : null);
    });
    var prev = null;
    C.forEach(function (c, i) {
      var g = known[i];
      if (!g) {
        // A country that has no city yet, in the order listed; otherwise the
        // country of the city before it (cities are usually grouped).
        var free = groups.filter(function (x) { return !x.cities.length && known.indexOf(x) < 0; })[0];
        g = free || prev || groups[0] || null;
      }
      if (!g) { g = { country: "", cities: [] }; groups.push(g); }
      if (g.country.toLowerCase() !== c.toLowerCase()) g.cities.push(c);
      prev = g;
    });
    var used = groups.filter(function (g) { return g.cities.length; });
    // Countries with no city of their own still count, after the others.
    return used.concat(groups.filter(function (g) { return !g.cities.length && g.country; }));
  }
  function formatPlace(s, index, mode) {
    var g = placeGroups(s, index);
    if (!g.length) return "";
    var one = function (x) { return x.cities.concat(x.country ? [x.country] : []).join(", "); };
    if (mode === "primary") {
      var f = g[0];
      return [f.cities[0], f.country].filter(Boolean).join(", ");
    }
    if (mode === "short") {
      var first = g[0], extra = g.slice(1).reduce(function (n, x) { return n + Math.max(1, x.cities.length); }, 0) + Math.max(0, first.cities.length - 1);
      return [first.cities[0], first.country].filter(Boolean).join(", ") + (extra ? " +" + extra : "");
    }
    return g.map(one).join(" · ");
  }
  var placeIndex = null, placeIndexFor = null;
  // mode: "full" (default) · "short" (first place +N) · "primary" (first place only)
  window.jadlPlace = function (s, mode) {
    if (!s) return "";
    var all = (window.SITE && window.SITE.studios) || [];
    if (placeIndexFor !== all) { placeIndex = buildCityIndex(all); placeIndexFor = all; }
    return formatPlace(s, placeIndex, mode || "full");
  };
})();
;
/* community.js */
/* Just a Design List — community features (plain JS, no build step).
   - JadlDupHint: warns on /submit when a studio is already in the list
   - SharedListView / ShareListButton: share "My List" as a link
   - NewsletterNote: small Substack block for the footer */
(function () {
  "use strict";
  var h = function () { return React.createElement.apply(React, arguments); };
  var NEWSLETTER = "https://substack.com/@stereochromo";
  window.JADL_NEWSLETTER = NEWSLETTER;

  function slugify(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function host(u) {
    return String(u || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
  }
  function studios() { return (window.SITE && window.SITE.studios) || []; }
  function linkProps(s, go) {
    return window.jadlStudioLink ? window.jadlStudioLink(s, function () { go("studio", { name: s.name }); })
      : { onClick: function () { go("studio", { name: s.name }); } };
  }
  function Row(props) {
    var s = props.s;
    return h("a", Object.assign({ className: "studio-row" + (props.extra ? " " + props.extra : "") }, linkProps(s, props.go)),
      props.date ? h("div", { className: "d" }, props.date) : null,
      h("div", { className: "t" }, window.RegionDot ? h(window.RegionDot, { country: s.country }) : null, s.name),
      h("div", { className: "c" }, (window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", "))),
      h("div", { className: "k" }, s.category),
      props.date ? null : h("div", { className: "u" }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")),
      h("div", { className: "arr" }, "→"));
  }

  // ------------------------------------------------------- submit: dup hint
  function findDupes(name, url) {
    var n = slugify(name), u = host(url), out = [];
    if (n.length < 2 && !u) return out;
    studios().forEach(function (s) {
      var sn = slugify(s.name), su = host(s.url);
      var exact = (n && sn === n) || (u && su && su === u);
      var core = function (x) { return x.replace(/^(the|studio|estudio|atelier|bureau)-/, ""); };
      var cn = core(n), cs = core(sn);
      var near = !exact && cn.length >= 4 && cs.length >= 4 && (cs.indexOf(cn) === 0 || cn.indexOf(cs) === 0);
      if (exact || near) out.push({ s: s, exact: exact });
    });
    out.sort(function (a, b) { return (b.exact ? 1 : 0) - (a.exact ? 1 : 0); });
    return out.slice(0, 4);
  }
  window.JadlDupHint = function (props) {
    var list = findDupes(props.name, props.url);
    if (!list.length) return null;
    var exact = list.some(function (x) { return x.exact; });
    return h("div", { className: "dup-hint" + (exact ? " is-exact" : ""), role: "status" },
      h("span", { className: "dup-lbl" }, exact ? "Already in the list:" : "Similar names in the list:"),
      list.map(function (x, i) {
        var slug = window.studioSlug ? window.studioSlug(x.s) : slugify(x.s.name);
        return h(React.Fragment, { key: x.s.name },
          i ? ", " : " ",
          h("a", { href: "/studio/" + slug, target: "_blank", rel: "noopener" }, x.s.name),
          x.s.city ? h("span", { className: "dup-city" }, " (" + String(x.s.city).split(",")[0].trim() + ")") : null);
      }),
      exact ? h("span", { className: "dup-note" }, " If something there is wrong or outdated, say so in the notes below.") : null);
  };

  // ---------------------------------------------------- My List: share link
  window.jadlListShareUrl = function (slugs) {
    return location.origin + "/list?s=" + slugs.map(encodeURIComponent).join(",");
  };
  window.ShareListButton = function (props) {
    var st = React.useState(false), copied = st[0], setCopied = st[1];
    var slugs = props.slugs || [];
    if (!slugs.length) return null;
    var url = window.jadlListShareUrl(slugs);
    var share = function () {
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        navigator.share({ title: "My list · Just a Design List", url: url }).catch(function () {});
        return;
      }
      var done = function () { setCopied(true); setTimeout(function () { setCopied(false); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link", url); });
      else window.prompt("Copy this link", url);
    };
    return h("div", { className: "list-share" },
      h("button", { type: "button", className: "back-btn", onClick: share },
        h("span", { className: "arr" }, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E")), h("span", null, copied ? "Link copied" : "Share this list")),
      h("span", { className: "list-share-note" }, "Anyone with the link sees these " + slugs.length + " " + (slugs.length === 1 ? "studio" : "studios") + "."));
  };
  window.SharedListView = function (props) {
    var go = props.go;
    var all = studios();
    var bySlug = new Map();
    var keyOf = function (s) { return window.studioSlug ? window.studioSlug(s) : slugify(s.name); };
    all.forEach(function (s) { bySlug.set(keyOf(s), s); });
    var slugs = String(props.shared || "").split(",").map(function (x) { return decodeURIComponent(x).trim(); }).filter(Boolean);
    var rows = slugs.map(function (sl) { return bySlug.get(sl); }).filter(Boolean);
    var store = window.useSaved ? window.useSaved() : null;
    var missing = store ? rows.filter(function (s) { return !store.has(keyOf(s)); }) : [];
    var saveAll = function () {
      missing.slice().reverse().forEach(function (s) { store.toggle(keyOf(s), s.name); });
    };
    return h("div", { className: "view wrap" },
      h("div", { className: "pd-head" },
        h("div", null,
          h(window.Eyebrow, null, h("span", null, "Shared with you")),
          h("h2", { role: "heading", "aria-level": 1, style: { marginTop: 14 } }, "A list of " + rows.length + " " + (rows.length === 1 ? "studio" : "studios"))),
        h("dl", { className: "meta" },
          h("dt", null, "Studios"), h("dd", null, rows.length),
          h("dt", null, "Your list"), h("dd", null, h("a", { href: "/list", onClick: function (e) { e.preventDefault(); go("list"); } }, "Open My List →")))),
      store && rows.length ? h("div", { className: "list-share" },
        h("button", { type: "button", className: "back-btn", disabled: !missing.length, onClick: saveAll },
          h("span", { className: "arr" }, missing.length ? "+" : "✓"),
          h("span", null, missing.length ? (missing.length === rows.length ? "Save all to My List" : "Save the " + missing.length + " you don’t have") : "All saved in My List"))) : null,
      rows.length ? h("div", { className: "st-list", style: { marginTop: 8 } }, rows.map(function (s) {
        return h(Row, { key: s.name, s: s, go: go });
      })) : h("p", { className: "shared-empty" }, "This link has no studios that are still in the list."));
  };

  // ------------------------------------------------------------ newsletter
  window.NewsletterNote = function () {
    return h("div", { className: "nl-note" },
      h("span", null, "There\u2019s also a newsletter, on Substack."),
      h("a", { href: NEWSLETTER, target: "_blank", rel: "noopener" }, "Read and subscribe", h("span", { className: "arr" }, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E"))));
  };

  // ------------------------------------------------------------- keyboard
  // Some clickable rows and tags are plain elements. Make them reachable with
  // Tab and usable with Enter / Space, without touching each view.
  var KBD = ".country-row, .cat-long-row, .sd-tag, .pick-card, .mylist-row, a:not([href])";
  function tagKbd(root) {
    (root.querySelectorAll ? root.querySelectorAll(KBD) : []).forEach(function (el) {
      if ((el.tagName === "A" && el.hasAttribute("href")) || el.tagName === "BUTTON" || el.hasAttribute("tabindex")) return;
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "link");
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = e.target;
    if (!el || !el.matches || !el.matches(KBD) || el.tagName === "BUTTON") return;
    e.preventDefault();
    el.click();
  });
  var start = function () {
    tagKbd(document);
    new MutationObserver(function () { tagKbd(document); }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);

  // ------------------------------------------------------------ quick search
  // "/" (or the magnifier in the top bar) opens a search box from any page.
  var qsOpen = null;
  function foldText(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function searchStudios(q) {
    var words = foldText(q).split(/[\s,]+/).filter(Boolean);
    if (!words.length) return [];
    var out = [];
    studios().forEach(function (s) {
      var name = foldText(s.name);
      var hay = foldText([s.name, s.city, s.country, s.category, window.jadlRegion ? window.jadlRegion(s.country).name : ""].join(" "));
      if (!words.every(function (w) { return hay.indexOf(w) >= 0; })) return;
      var joined = words.join(" ");
      var score = name === joined ? 0 : name.indexOf(joined) === 0 ? 1 : name.indexOf(joined) >= 0 ? 2 : words.every(function (w) { return name.indexOf(w) >= 0; }) ? 3 : 4;
      out.push([score, s]);
    });
    out.sort(function (a, b) { return a[0] - b[0] || a[1].name.localeCompare(b[1].name); });
    return out.map(function (x) { return x[1]; });
  }
  function QuickSearch() {
    var st = React.useState(false), open = st[0], setOpen = st[1];
    var qs = React.useState(""), q = qs[0], setQ = qs[1];
    var as = React.useState(0), active = as[0], setActive = as[1];
    var input = React.useRef(null), back = React.useRef(null);
    qsOpen = function () { back.current = document.activeElement; setOpen(true); };
    React.useEffect(function () {
      if (!open) return;
      var t = setTimeout(function () { if (input.current) input.current.focus(); }, 10);
      document.documentElement.classList.add("qs-lock");
      return function () { clearTimeout(t); document.documentElement.classList.remove("qs-lock"); };
    }, [open]);
    var results = React.useMemo(function () { return searchStudios(q); }, [q]);
    var shown = results.slice(0, 8);
    React.useEffect(function () { setActive(0); }, [q]);
    if (!open) return null;
    var close = function () { setOpen(false); setQ(""); if (back.current && back.current.focus) back.current.focus(); };
    var goStudio = function (s) { close(); window.jadlNavigate("/studio/" + (window.studioSlug ? window.studioSlug(s) : slugify(s.name))); };
    var goAll = function () {
      try {
        var k = "tsi:studios-state", prev = JSON.parse(localStorage.getItem(k) || "{}") || {};
        localStorage.setItem(k, JSON.stringify(Object.assign(prev, { q: q, cat: "All", country: "All", city: "All", type: "All" })));
      } catch (e) {}
      close();
      // Already on the list: reload it so it picks up the new query.
      if (location.pathname === "/studios") location.assign("/studios");
      else window.jadlNavigate("/studios");
    };
    var onKey = function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(function (i) { return Math.min(i + 1, shown.length - 1); }); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(function (i) { return Math.max(i - 1, 0); }); }
      else if (e.key === "Enter") { e.preventDefault(); if (shown[active]) goStudio(shown[active]); else if (q.trim()) goAll(); }
    };
    var place = function (s) { return window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", "); };
    return h("div", { className: "qs-backdrop", onMouseDown: function (e) { if (e.target === e.currentTarget) close(); } },
      h("div", { className: "qs-panel", role: "dialog", "aria-modal": "true", "aria-label": "Search the list", onKeyDown: onKey },
        h("div", { className: "qs-field" },
          h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, h("circle", { cx: 7, cy: 7, r: 5.2, fill: "none", stroke: "currentColor", strokeWidth: 1.3 }), h("path", { d: "M11 11l3.5 3.5", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" })),
          h("input", { ref: input, value: q, onChange: function (e) { setQ(e.target.value); }, placeholder: "Search studios, cities, disciplines…", "aria-label": "Search", role: "combobox", "aria-expanded": shown.length > 0, "aria-controls": "qs-list", "aria-activedescendant": shown[active] ? "qs-opt-" + active : undefined, autoComplete: "off", spellCheck: false }),
          h("button", { type: "button", className: "qs-esc", onClick: close, "aria-label": "Close search" }, "Esc")),
        q.trim() ? h("ul", { className: "qs-list", id: "qs-list", role: "listbox" },
          shown.map(function (s, i) {
            return h("li", { key: s.name, id: "qs-opt-" + i, role: "option", "aria-selected": i === active, className: i === active ? "is-active" : "", onMouseEnter: function () { setActive(i); }, onClick: function () { goStudio(s); } },
              h("span", { className: "qs-name" }, window.RegionDot ? h(window.RegionDot, { country: s.country }) : null, s.name),
              h("span", { className: "qs-place" }, place(s)));
          }),
          shown.length === 0 ? h("li", { className: "qs-empty" }, "Nothing matches that.") : null) : h("p", { className: "qs-hint" }, "Type a name, a city, a country or a discipline. Press / anywhere to search."),
        q.trim() && results.length > shown.length ? h("button", { type: "button", className: "qs-all", onClick: goAll }, "See all " + results.length + " results", h("span", null, " →")) : null));
  }
  window.jadlOpenSearch = function () { if (qsOpen) qsOpen(); };
  window.JadlSearchButton = function () {
    return h("button", { type: "button", className: "search-toggle", onClick: window.jadlOpenSearch, "aria-label": "Search (press /)", title: "Search (/)" },
      h("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": "true" }, h("circle", { cx: 7, cy: 7, r: 5.2, fill: "none", stroke: "currentColor", strokeWidth: 1.4 }), h("path", { d: "M11 11l3.5 3.5", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" })));
  };
  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
    e.preventDefault();
    window.jadlOpenSearch();
  });
  var mountQs = function () {
    var el = document.createElement("div");
    el.id = "qs-root";
    document.body.appendChild(el);
    ReactDOM.createRoot(el).render(h(QuickSearch));
  };
  if (document.body) mountQs(); else document.addEventListener("DOMContentLoaded", mountQs);
})();
;
/* dist/chrome.js */
(function(){
"use strict";
const {
  useState,
  useEffect
} = React;
function Eyebrow({
  num,
  children
}) {
  return React.createElement("div", {
    className: "eyebrow"
  }, children);
}
function Clock() {
  const [now, setNow] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
    return () => clearInterval(t);
  }, []);
  const fmt = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid"
  });
  return React.createElement("div", {
    className: "clock"
  }, React.createElement("span", {
    className: "dot"
  }), " Madrid · ", fmt, " CET");
}
function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("tsi_theme") === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("tsi_theme", dark ? "dark" : "light");
    } catch {
    }
  }, [dark]);
  return React.createElement("button", {
    className: "theme-toggle",
    onClick: () => setDark((v) => !v),
    "aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
    title: dark ? "Switch to light" : "Switch to dark"
  }, React.createElement("svg", {
    className: "sun",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
  })), React.createElement("svg", {
    className: "moon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
  })));
}
function TopBar({
  view,
  go
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saved = window.useSaved ? window.useSaved() : null;
  const savedCount = saved ? saved.count() : 0;
  const items = [["index", "Index"], ["studios", "Studios"], ["geography", "Geography"], ["categories", "Categories"], ["submit", "Submit"], ["about", "Colophon"], ["list", "My List"]];
  useEffect(() => {
    setMenuOpen(false);
  }, [view]);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const goAndClose = (k) => {
    setMenuOpen(false);
    go(k);
  };
  return React.createElement("header", {
    className: `topbar ${menuOpen ? "is-open" : ""}`
  }, React.createElement("div", {
    className: "mark"
  }, React.createElement("a", {
    href: "/",
    "aria-label": "Just a Design List, home",
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      go("index");
    },
    style: {
      cursor: "pointer",
      color: "inherit"
    },
    className: "mark-wordmark"
  }, React.createElement("svg", {
    viewBox: "0 0 9962.0 852.0",
    className: "mark-logo-full",
    "aria-label": "Just a Design List",
    role: "img"
  }, React.createElement("g", { style: { fill: "currentColor" } }, React.createElement("g", { transform: "translate(40,800) scale(1,-1)" }, React.createElement("path", { transform: "translate(0,0)", d: "M154 266C154 222.6666717529297 145.1666717529297 193.1666717529297 127.5 177.5C109.83332824707031 161.8333282470703 80.33332824707031 154.0 39.0 154.0H15.0V0.0H191.0C223.0 0.0 250.8333282470703 3.1666717529296875 274.5 9.5C298.1666717529297 15.833328247070312 318.0 26.166671752929688 334.0 40.5C350.0 54.83332824707031 361.8333282470703 74.0 369.5 98.0C377.1666717529297 122.0 381.0 152.0 381.0 188.0V750.0H154.0Z" }), React.createElement("path", { transform: "translate(421,0)", d: "M322 -12H440C530 -12 597.5 10.333328247070312 642.5 55.0C687.5 99.66667175292969 710.0 164.6666717529297 710.0 250.0V750.0H498.0V282.0C498.0 263.3333282470703 496.0 245.8333282470703 492.0 229.5C488.0 213.1666717529297 481.5 199.0 472.5 187.0C463.5 175.0 451.5 165.5 436.5 158.5C421.5 151.5 403.0 148.0 381.0 148.0C359.0 148.0 340.5 151.5 325.5 158.5C310.5 165.5 298.5 175.0 289.5 187.0C280.5 199.0 274.1666717529297 213.1666717529297 270.5 229.5C266.8333282470703 245.8333282470703 265.0 263.3333282470703 265.0 282.0V750.0H37.0V250.0C37.0 164.6666717529297 60.16667175292969 99.66667175292969 106.5 55.0C152.8333282470703 10.333328247070312 224.6666717529297 -12.0 322.0 -12.0Z" }), React.createElement("path", { transform: "translate(1168,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(1871,0)", d: "M18 750V588H206V0H434V588H622V750Z" }), React.createElement("path", { transform: "translate(2670,0)", d: "M223 750 -1 0H190L227 131H481L518 0H750L531 750ZM271 287 354 581 437 287Z" }), React.createElement("path", { transform: "translate(3578,0)", d: "M43 750V0H408C458 0 503.5 6.5 544.5 19.5C585.5 32.5 620.5 52.66667175292969 649.5 80.0C678.5 107.33332824707031 700.8333282470703 142.5 716.5 185.5C732.1666717529297 228.5 740.0 280.0 740.0 340.0V413.0C740.0 475.0 732.0 527.3333282470703 716.0 570.0C700.0 612.6666717529297 677.3333282470703 647.3333282470703 648.0 674.0C618.6666717529297 700.6666717529297 583.6666717529297 720.0 543.0 732.0C502.3333282470703 744.0 457.3333282470703 750.0 408.0 750.0ZM270.0 612.0H331.0C359.0 612.0 384.1666717529297 608.1666717529297 406.5 600.5C428.8333282470703 592.8333282470703 447.5 580.0 462.5 562.0C477.5 544.0 489.0 519.8333282470703 497.0 489.5C505.0 459.1666717529297 509.0 421.6666717529297 509.0 377.0C509.0 331.6666717529297 505.0 293.6666717529297 497.0 263.0C489.0 232.3333282470703 477.5 207.6666717529297 462.5 189.0C447.5 170.3333282470703 429.0 157.1666717529297 407.0 149.5C385.0 141.8333282470703 359.6666717529297 138.0 331.0 138.0H270.0Z" }), React.createElement("path", { transform: "translate(4344,0)", d: "M43 750V0H573V160H264V299H553V457H264V592H563V750Z" }), React.createElement("path", { transform: "translate(4940,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(5643,0)", d: "M43 750V0H270V750Z" }), React.createElement("path", { transform: "translate(5955,0)", d: "M737 405H392V267H513C513 247.6666717529297 510.8333282470703 229.6666717529297 506.5 213.0C502.1666717529297 196.3333282470703 495.1666717529297 181.6666717529297 485.5 169.0C475.8333282470703 156.3333282470703 463.5 146.3333282470703 448.5 139.0C433.5 131.6666717529297 415.6666717529297 128.0 395.0 128.0C345.6666717529297 128.0 310.6666717529297 148.1666717529297 290.0 188.5C269.3333282470703 228.8333282470703 259.0 290.6666717529297 259.0 374.0C259.0 418.0 261.3333282470703 455.6666717529297 266.0 487.0C270.6666717529297 518.3333282470703 278.3333282470703 543.8333282470703 289.0 563.5C299.6666717529297 583.1666717529297 313.3333282470703 597.6666717529297 330.0 607.0C346.6666717529297 616.3333282470703 366.6666717529297 621.0 390.0 621.0C412.0 621.0 430.5 617.1666717529297 445.5 609.5C460.5 601.8333282470703 472.3333282470703 592.0 481.0 580.0C489.6666717529297 568.0 495.8333282470703 554.6666717529297 499.5 540.0C503.1666717529297 525.3333282470703 505.0 511.0 505.0 497.0H733.0V521.0C733.0 563.6666717529297 726.8333282470703 600.1666717529297 714.5 630.5C702.1666717529297 660.8333282470703 684.3333282470703 685.5 661.0 704.5C637.6666717529297 723.5 608.8333282470703 737.3333282470703 574.5 746.0C540.1666717529297 754.6666717529297 501.0 759.0 457.0 759.0H317.0C271.6666717529297 759.0 231.1666717529297 752.5 195.5 739.5C159.8333282470703 726.5 129.5 706.1666717529297 104.5 678.5C79.5 650.8333282470703 60.33332824707031 615.6666717529297 47.0 573.0C33.66667175292969 530.3333282470703 27.0 479.3333282470703 27.0 420.0V332.0C27.0 210.6666717529297 51.5 123.0 100.5 69.0C149.5 15.0 220.6666717529297 -12.0 314.0 -12.0H334.0C382.0 -12.0 420.8333282470703 -2.8333282470703125 450.5 15.5C480.1666717529297 33.83332824707031 503.3333282470703 57.33332824707031 520.0 86.0V0.0H737.0Z" }), React.createElement("path", { transform: "translate(6726,0)", d: "M549 750V339L354 750H43V0H250V504L507 0H745V750Z" }), React.createElement("path", { transform: "translate(7673,0)", d: "M43 750V0H536V161H264V750Z" }), React.createElement("path", { transform: "translate(8227,0)", d: "M43 750V0H270V750Z" }), React.createElement("path", { transform: "translate(8539,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(9242,0)", d: "M18 750V588H206V0H434V588H622V750Z" })))), React.createElement("svg", {
    viewBox: "0 0 6404.0 1780.0",
    className: "mark-logo-compact",
    "aria-label": "Just a Design List",
    role: "img"
  }, React.createElement("g", { style: { fill: "currentColor" } }, React.createElement("g", { transform: "translate(50.0,810.0) scale(1,-1)" }, React.createElement("path", { transform: "translate(0.0,0)", d: "M154 266C154 222.6666717529297 145.1666717529297 193.1666717529297 127.5 177.5C109.83332824707031 161.8333282470703 80.33332824707031 154.0 39.0 154.0H15.0V0.0H191.0C223.0 0.0 250.8333282470703 3.1666717529296875 274.5 9.5C298.1666717529297 15.833328247070312 318.0 26.166671752929688 334.0 40.5C350.0 54.83332824707031 361.8333282470703 74.0 369.5 98.0C377.1666717529297 122.0 381.0 152.0 381.0 188.0V750.0H154.0Z" }), React.createElement("path", { transform: "translate(421.0,0)", d: "M322 -12H440C530 -12 597.5 10.333328247070312 642.5 55.0C687.5 99.66667175292969 710.0 164.6666717529297 710.0 250.0V750.0H498.0V282.0C498.0 263.3333282470703 496.0 245.8333282470703 492.0 229.5C488.0 213.1666717529297 481.5 199.0 472.5 187.0C463.5 175.0 451.5 165.5 436.5 158.5C421.5 151.5 403.0 148.0 381.0 148.0C359.0 148.0 340.5 151.5 325.5 158.5C310.5 165.5 298.5 175.0 289.5 187.0C280.5 199.0 274.1666717529297 213.1666717529297 270.5 229.5C266.8333282470703 245.8333282470703 265.0 263.3333282470703 265.0 282.0V750.0H37.0V250.0C37.0 164.6666717529297 60.16667175292969 99.66667175292969 106.5 55.0C152.8333282470703 10.333328247070312 224.6666717529297 -12.0 322.0 -12.0Z" }), React.createElement("path", { transform: "translate(1168.0,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(1871.0,0)", d: "M18 750V588H206V0H434V588H622V750Z" }), React.createElement("path", { transform: "translate(2670.0,0)", d: "M223 750 -1 0H190L227 131H481L518 0H750L531 750ZM271 287 354 581 437 287Z" })), React.createElement("g", { transform: "translate(50.0,1730.0) scale(1,-1)" }, React.createElement("path", { transform: "translate(0.0,0)", d: "M43 750V0H408C458 0 503.5 6.5 544.5 19.5C585.5 32.5 620.5 52.66667175292969 649.5 80.0C678.5 107.33332824707031 700.8333282470703 142.5 716.5 185.5C732.1666717529297 228.5 740.0 280.0 740.0 340.0V413.0C740.0 475.0 732.0 527.3333282470703 716.0 570.0C700.0 612.6666717529297 677.3333282470703 647.3333282470703 648.0 674.0C618.6666717529297 700.6666717529297 583.6666717529297 720.0 543.0 732.0C502.3333282470703 744.0 457.3333282470703 750.0 408.0 750.0ZM270.0 612.0H331.0C359.0 612.0 384.1666717529297 608.1666717529297 406.5 600.5C428.8333282470703 592.8333282470703 447.5 580.0 462.5 562.0C477.5 544.0 489.0 519.8333282470703 497.0 489.5C505.0 459.1666717529297 509.0 421.6666717529297 509.0 377.0C509.0 331.6666717529297 505.0 293.6666717529297 497.0 263.0C489.0 232.3333282470703 477.5 207.6666717529297 462.5 189.0C447.5 170.3333282470703 429.0 157.1666717529297 407.0 149.5C385.0 141.8333282470703 359.6666717529297 138.0 331.0 138.0H270.0Z" }), React.createElement("path", { transform: "translate(766.0,0)", d: "M43 750V0H573V160H264V299H553V457H264V592H563V750Z" }), React.createElement("path", { transform: "translate(1362.0,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(2065.0,0)", d: "M43 750V0H270V750Z" }), React.createElement("path", { transform: "translate(2377.0,0)", d: "M737 405H392V267H513C513 247.6666717529297 510.8333282470703 229.6666717529297 506.5 213.0C502.1666717529297 196.3333282470703 495.1666717529297 181.6666717529297 485.5 169.0C475.8333282470703 156.3333282470703 463.5 146.3333282470703 448.5 139.0C433.5 131.6666717529297 415.6666717529297 128.0 395.0 128.0C345.6666717529297 128.0 310.6666717529297 148.1666717529297 290.0 188.5C269.3333282470703 228.8333282470703 259.0 290.6666717529297 259.0 374.0C259.0 418.0 261.3333282470703 455.6666717529297 266.0 487.0C270.6666717529297 518.3333282470703 278.3333282470703 543.8333282470703 289.0 563.5C299.6666717529297 583.1666717529297 313.3333282470703 597.6666717529297 330.0 607.0C346.6666717529297 616.3333282470703 366.6666717529297 621.0 390.0 621.0C412.0 621.0 430.5 617.1666717529297 445.5 609.5C460.5 601.8333282470703 472.3333282470703 592.0 481.0 580.0C489.6666717529297 568.0 495.8333282470703 554.6666717529297 499.5 540.0C503.1666717529297 525.3333282470703 505.0 511.0 505.0 497.0H733.0V521.0C733.0 563.6666717529297 726.8333282470703 600.1666717529297 714.5 630.5C702.1666717529297 660.8333282470703 684.3333282470703 685.5 661.0 704.5C637.6666717529297 723.5 608.8333282470703 737.3333282470703 574.5 746.0C540.1666717529297 754.6666717529297 501.0 759.0 457.0 759.0H317.0C271.6666717529297 759.0 231.1666717529297 752.5 195.5 739.5C159.8333282470703 726.5 129.5 706.1666717529297 104.5 678.5C79.5 650.8333282470703 60.33332824707031 615.6666717529297 47.0 573.0C33.66667175292969 530.3333282470703 27.0 479.3333282470703 27.0 420.0V332.0C27.0 210.6666717529297 51.5 123.0 100.5 69.0C149.5 15.0 220.6666717529297 -12.0 314.0 -12.0H334.0C382.0 -12.0 420.8333282470703 -2.8333282470703125 450.5 15.5C480.1666717529297 33.83332824707031 503.3333282470703 57.33332824707031 520.0 86.0V0.0H737.0Z" }), React.createElement("path", { transform: "translate(3148.0,0)", d: "M549 750V339L354 750H43V0H250V504L507 0H745V750Z" }), React.createElement("path", { transform: "translate(4095.0,0)", d: "M43 750V0H536V161H264V750Z" }), React.createElement("path", { transform: "translate(4649.0,0)", d: "M43 750V0H270V750Z" }), React.createElement("path", { transform: "translate(4961.0,0)", d: "M419 760H271C229.6666717529297 760 193.6666717529297 755 163.0 745C132.3333282470703 735 107.0 721 87.0 703C67.0 685 52.0 663.3333282470703 42.0 638.0C32.0 612.6666717529297 27.0 584.6666717529297 27.0 554.0V530.0C27.0 503.3333282470703 29.666671752929688 478.3333282470703 35.0 455.0C40.33332824707031 431.6666717529297 50.5 410.1666717529297 65.5 390.5C80.5 370.8333282470703 101.33332824707031 353.1666717529297 128.0 337.5C154.6666717529297 321.8333282470703 189.3333282470703 308.6666717529297 232.0 298.0L373.0 263.0C402.3333282470703 255.6666717529297 422.5 246.0 433.5 234.0C444.5 222.0 450.0 206.0 450.0 186.0C450.0 164.6666717529297 442.6666717529297 147.3333282470703 428.0 134.0C413.3333282470703 120.66667175292969 391.0 114.0 361.0 114.0C338.3333282470703 114.0 319.6666717529297 117.33332824707031 305.0 124.0C290.3333282470703 130.6666717529297 278.8333282470703 139.3333282470703 270.5 150.0C262.1666717529297 160.6666717529297 256.3333282470703 172.8333282470703 253.0 186.5C249.6666717529297 200.1666717529297 248.0 214.0 248.0 228.0V234.0H14.0V211.0C14.0 177.6666717529297 18.166671752929688 147.3333282470703 26.5 120.0C34.83332824707031 92.66667175292969 49.5 69.33332824707031 70.5 50.0C91.5 30.666671752929688 119.5 15.666671752929688 154.5 5.0C189.5 -5.6666717529296875 234.0 -11.0 288.0 -11.0H437.0C480.3333282470703 -11.0 517.5 -5.5 548.5 5.5C579.5 16.5 605.0 31.5 625.0 50.5C645.0 69.5 659.6666717529297 92.0 669.0 118.0C678.3333282470703 144.0 683.0 171.6666717529297 683.0 201.0V228.0C683.0 255.3333282470703 680.5 280.6666717529297 675.5 304.0C670.5 327.3333282470703 660.5 348.6666717529297 645.5 368.0C630.5 387.3333282470703 609.1666717529297 404.5 581.5 419.5C553.8333282470703 434.5 517.3333282470703 447.6666717529297 472.0 459.0L331.0 494.0C307.6666717529297 499.3333282470703 289.5 507.6666717529297 276.5 519.0C263.5 530.3333282470703 257.0 546.0 257.0 566.0C257.0 588.0 264.1666717529297 605.3333282470703 278.5 618.0C292.8333282470703 630.6666717529297 314.0 637.0 342.0 637.0C376.0 637.0 400.3333282470703 627.3333282470703 415.0 608.0C429.6666717529297 588.6666717529297 437.0 563.3333282470703 437.0 532.0V526.0H663.0V565.0C663.0 593.0 659.1666717529297 618.8333282470703 651.5 642.5C643.8333282470703 666.1666717529297 630.6666717529297 686.6666717529297 612.0 704.0C593.3333282470703 721.3333282470703 568.3333282470703 735.0 537.0 745.0C505.6666717529297 755.0 466.3333282470703 760.0 419.0 760.0Z" }), React.createElement("path", { transform: "translate(5664.0,0)", d: "M18 750V588H206V0H434V588H622V750Z" }))))), React.createElement("small", null)), React.createElement("nav", {
    className: "nav",
    "aria-label": "Primary"
  }, items.map(([k, label]) => React.createElement("button", {
    key: k,
    onClick: () => go(k),
    "aria-current": view === k ? "page" : void 0
  }, label, k === "list" && savedCount > 0 ? React.createElement("sup", {
    className: "nav-count"
  }, savedCount) : null))), React.createElement("div", {
    className: "topbar-right"
  }, window.JadlSearchButton ? React.createElement(window.JadlSearchButton, null) : null, React.createElement(ThemeToggle, null), React.createElement("button", {
    className: "menu-toggle",
    onClick: () => setMenuOpen((v) => !v),
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    "aria-expanded": menuOpen
  }, React.createElement("span", {
    className: "menu-icon",
    "data-open": menuOpen
  }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)))), React.createElement("nav", {
    className: `mobile-nav ${menuOpen ? "is-open" : ""}`,
    "aria-label": "Mobile"
  }, items.map(([k, label]) => React.createElement("button", {
    key: k,
    onClick: () => goAndClose(k),
    "aria-current": view === k ? "page" : void 0,
    className: view === k ? "is-current" : ""
  }, label, k === "list" && savedCount > 0 ? React.createElement("sup", {
    className: "nav-count"
  }, savedCount) : null))));
}
function CuratorMark() {
  return React.createElement("span", {
    className: "curator-mark",
    "aria-hidden": "true"
  });
}
function Footer({
  go
}) {
  const d = window.SITE;
  const totals = d.totals || {};
  return React.createElement("footer", {
    className: "foot wrap"
  }, React.createElement("div", {
    className: "foot-grid"
  }, React.createElement("h3", {
    "aria-level": 2,
    style: {
      lineHeight: 1.1
    }
  }, "A slow index of", React.createElement("br", null), "design practices, worth returning to."), React.createElement("div", {
    className: "addr"
  }, React.createElement("div", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Holdings"), React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, totals.studios, " studios & designers", React.createElement("br", null), totals.countries, " countries, ", totals.cities, " cities", React.createElement("br", null), React.createElement("span", {
    style: {
      color: "var(--mute)"
    }
  }, d.updated))), React.createElement("div", {
    className: "links"
  }, React.createElement("div", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Elsewhere"), React.createElement("a", {
    onClick: () => go("submit"),
    style: {
      cursor: "pointer"
    }
  }, React.createElement("span", null, "Submit a studio or designer"), React.createElement("span", {
    className: "arr"
  }, "→")), React.createElement("a", {
    href: "https://x.com/justadesignlist",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "X"), React.createElement("span", {
    className: "arr"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")), React.createElement("a", {
    href: "https://www.instagram.com/justadesignlist/",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "Instagram"), React.createElement("span", {
    className: "arr"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")), React.createElement("a", {
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "LinkedIn"), React.createElement("span", {
    className: "arr"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")), React.createElement("a", {
    href: "/feed.xml",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "RSS feed"), React.createElement("span", {
    className: "arr"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎"))), React.createElement("div", {
    className: "sponsor"
  }, React.createElement("span", null, "Just a Design List is an independent side project. Interested in sponsoring it?"), React.createElement("a", {
    href: "mailto:wencesanz@gmail.com?subject=SPONSOR"
  }, "Get in touch", React.createElement("span", {
    className: "arr"
  }, "→"))), window.NewsletterNote ? React.createElement(window.NewsletterNote, null) : null, React.createElement("div", {
    className: "colophon"
  }, d.colophon.map((l, i) => /Wences/.test(l) ? React.createElement("a", {
    key: i,
    className: "curator",
    href: "https://wenceslaosanz.rocks/",
    target: "_blank",
    rel: "noopener",
    title: "Wences Sanz-Alonso"
  }, React.createElement(CuratorMark, null), React.createElement("span", null, l)) : React.createElement("span", {
    key: i
  }, l)), React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, React.createElement("button", {
    onClick: () => window.scrollTo({
      top: 0,
      behavior: "smooth"
    }),
    style: {
      color: "var(--mute)",
      fontFamily: "var(--mono)",
      fontSize: 11
    }
  }, "↑ Back to top")))));
}
Object.assign(window, {
  Eyebrow,
  TopBar,
  Footer,
  Clock
});
})();
;
/* dist/index_view.js */
(function(){
"use strict";
const {
  useState: useIdxState,
  useMemo: useIdxMemo,
  useEffect: useIdxEffect,
  useRef: useIdxRef
} = React;
function formatEdited(s) {
  if (!s) return "";
  const iso = Date.parse(s);
  if (!isNaN(iso)) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  return s.replace(/\s+\d{1,2}:\d{2}$/, "");
}
function IndexView({
  go
}) {
  const d = window.SITE;
  const top5Countries = useIdxMemo(() => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).slice(0, 5), []);
  const top5Cats = useIdxMemo(() => d.categoriesOrder.filter((c) => d.byCat?.[c]).slice(0, 6).map((c) => [c, d.byCat[c]]), []);
  return React.createElement("div", {
    className: "view"
  }, React.createElement("section", {
    className: "masthead wrap masthead--tight"
  }, React.createElement("h1", {
    style: {
      marginTop: 20
    }
  }, "Studios and independent designers,", React.createElement("br", null), "collected ", React.createElement("em", null, "without ranking"), "."), React.createElement("p", {
    className: "sub"
  }, d.statement, " ", React.createElement("a", {
    className: "link",
    onClick: () => go("studios")
  }, "Read the full list"), ", or enter through", " ", React.createElement("a", {
    className: "link",
    onClick: () => go("categories")
  }, "discipline"), " or", " ", React.createElement("a", {
    className: "link",
    onClick: () => go("geography")
  }, "geography"), "."), window.RandomInline ? React.createElement(window.RandomInline, {
    go
  }) : null), window.TodaysPick ? React.createElement(window.TodaysPick, {
    go
  }) : null, window.FollowBand ? React.createElement(window.FollowBand, null) : null, window.RecentlyViewed ? React.createElement(window.RecentlyViewed, {
    go
  }) : null, React.createElement("div", {
    className: "hair wrap",
    style: {
      marginTop: 24
    }
  }), React.createElement("section", {
    className: "wrap"
  }, React.createElement("div", {
    className: "stats-strip"
  }, React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.studios), React.createElement("span", {
    className: "k"
  }, "Studios & designers")), React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.countries), React.createElement("span", {
    className: "k"
  }, "Countries")), React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.cities), React.createElement("span", {
    className: "k"
  }, "Cities")))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80,
      paddingBottom: 80
    }
  }, React.createElement("div", {
    className: "home-note"
  }, React.createElement(Eyebrow, {
    num: "§02"
  }, "Note"), React.createElement("div", {
    className: "home-note-body"
  }, d.note))), React.createElement("div", {
    className: "hair wrap"
  }), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 64
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§03"
  }, "By Discipline"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Enter through a category")), React.createElement("button", {
    onClick: () => go("categories"),
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--mute)"
    }
  }, "All categories  →")), React.createElement("div", {
    className: "cat-grid"
  }, top5Cats.map(([c, n]) => {
    const col = (document.documentElement.getAttribute("data-theme") === "dark" ? d.catColorsDark?.[c] : d.catColors?.[c]) || "var(--ink)";
    return React.createElement("button", {
      key: c,
      className: "cat-tile",
      style: {
        "--cat-color": col
      },
      onClick: () => go("studios", {
        filter: {
          cat: c
        }
      })
    }, React.createElement("div", {
      className: "cnt"
    }, n), React.createElement("div", {
      className: "nm"
    }, c), React.createElement("div", {
      className: "bl"
    }, d.categoryBlurbs[c]), React.createElement("div", {
      className: "arr"
    }, "→"));
  }))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§04"
  }, "Recent Additions"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Twenty most recent entries"))), React.createElement("div", {
    className: "recent-list"
  }, (d.recent || []).map((p) => React.createElement(RecentRow, {
    key: p.name,
    p,
    go
  })))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§05"
  }, "By Geography"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Five most represented countries")), React.createElement("button", {
    onClick: () => go("geography"),
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--mute)"
    }
  }, "All geography  →")), React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, top5Countries.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row",
    onClick: () => go("studios", {
      filter: {
        country: c
      }
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, c), React.createElement("div", {
    className: "bar"
  }, React.createElement("div", {
    className: "fill",
    style: {
      width: `${n / top5Countries[0][1] * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studios"), React.createElement("div", {
    className: "arr"
  }, "→"))))));
}
function RecentRow({
  p,
  go
}) {
  const [hover, setHover] = useIdxState(false);
  const boxRef = useIdxRef(null);
  const target = useIdxRef({
    x: 0,
    y: 0
  });
  const cur = useIdxRef({
    x: 0,
    y: 0
  });
  const raf = useIdxRef(0);
  const primed = useIdxRef(false);
  const shot = window.jadlShot ? window.jadlShot(p, 520, 400) : p.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=520&h=400` : null;
  useIdxEffect(() => {
    if (!hover) {
      primed.current = false;
      cancelAnimationFrame(raf.current);
      return;
    }
    const tick = () => {
      const el = boxRef.current;
      if (el) {
        if (!primed.current) {
          cur.current = {
            ...target.current
          };
          primed.current = true;
        }
        cur.current.x += (target.current.x - cur.current.x) * 0.16;
        cur.current.y += (target.current.y - cur.current.y) * 0.16;
        el.style.transform = `translate(${cur.current.x + 24}px, ${cur.current.y - 140}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [hover]);
  return React.createElement("a", {
    className: "recent-row",
    ...window.jadlStudioLink ? window.jadlStudioLink(p, () => go("studio", { name: p.name })) : { onClick: () => go("studio", { name: p.name }) },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseMove: (e) => {
      target.current = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, React.createElement("div", {
    className: "d"
  }, formatEdited(p.created || p.edited)), React.createElement("div", {
    className: "t"
  }, p.name), React.createElement("div", {
    className: "c"
  }, window.jadlPlace ? window.jadlPlace(p, "short") : [p.city, p.country].filter(Boolean).join(", ")), React.createElement("div", {
    className: "k"
  }, (p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), hover && shot && React.createElement("div", {
    ref: boxRef,
    className: "row-preview-follow"
  }, React.createElement("div", {
    className: "row-preview"
  }, React.createElement("img", {
    src: shot,
    alt: "",
    onError: (e) => {
      e.currentTarget.style.display = "none";
    }
  }))));
}
function EditorialGrid({
  studios,
  go
}) {
  const d = window.SITE;
  const pool = useIdxMemo(() => {
    const all = (d.studios || []).filter((s) => s && s.url);
    return all.length ? all : studios || [];
  }, []);
  const pickTwelve = React.useCallback(() => {
    const a = pool.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 12);
  }, [pool]);
  const [tiles] = useIdxState(() => pickTwelve());
  if (!tiles.length) return null;
  return React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 24,
      paddingBottom: 48
    }
  }, React.createElement("div", {
    className: "eg-head"
  }, React.createElement(Eyebrow, {
    num: "§01"
  }, "Editor's Selection"), React.createElement("div", {
    className: "eg-head-meta"
  }, "Twelve studios, chosen this month")), React.createElement("div", {
    className: "eg-grid"
  }, tiles.map((s, i) => React.createElement(EditorialTile, {
    key: s.name + "@" + i,
    s,
    size: i % 12 + 1,
    index: i,
    onOpen: () => go("studio", {
      name: s.name
    })
  }))));
}
function EditorialTile({
  s,
  size,
  index,
  onOpen
}) {
  const [loaded, setLoaded] = useIdxState(false);
  const [failed, setFailed] = useIdxState(false);
  const ref = useIdxRef(null);
  const [inView, setInView] = useIdxState(false);
  useIdxEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, {
      rootMargin: "200px"
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  const shotW = size <= 2 ? 1200 : 700;
  const shotH = size <= 2 ? 900 : 540;
  const shot = s.url && inView ? window.jadlShot ? window.jadlShot(s, shotW, shotH) : `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=${shotW}&h=${shotH}` : null;
  const firstCat = (s.category || "").split(",")[0].trim();
  const col = window.SITE.catColors?.[firstCat] || "#D8CFBD";
  return React.createElement("div", {
    ref,
    className: `eg-tile eg-tile--size${size}`,
    onClick: onOpen,
    style: {
      "--tile-col": col
    }
  }, React.createElement("div", {
    className: "eg-frame"
  }, shot && !failed && React.createElement("img", {
    src: shot,
    alt: `${s.name} — ${host}`,
    loading: "lazy",
    onLoad: (e) => {
      if (e.target.naturalWidth > 100) setLoaded(true);
      else setFailed(true);
    },
    onError: () => setFailed(true),
    className: "eg-img",
    style: {
      opacity: loaded ? 1 : 0
    }
  }), !loaded && React.createElement("div", {
    className: "eg-placeholder"
  }, React.createElement("span", {
    className: "eg-ph-name"
  }, s.name))), React.createElement("div", {
    className: "eg-meta"
  }, React.createElement("div", {
    className: "eg-name"
  }, s.name), React.createElement("div", {
    className: "eg-loc"
  }, window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", ")), React.createElement("div", {
    className: "eg-host"
  }, host, " ", window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")));
}
Object.assign(window, {
  IndexView
});
})();
;
/* dist/studios_view.js */
(function(){
"use strict";
const {
  useState: useSt,
  useMemo: useMm,
  useEffect: useEf
} = React;
const STUDIOS_STATE_KEY = "tsi:studios-state";
function readStudiosState() {
  try {
    return JSON.parse(localStorage.getItem(STUDIOS_STATE_KEY) || "{}") || {};
  } catch {
    return {};
  }
}
function writeStudiosState(patch) {
  try {
    const cur = readStudiosState();
    localStorage.setItem(STUDIOS_STATE_KEY, JSON.stringify({
      ...cur,
      ...patch
    }));
  } catch {
  }
}
function StudiosView({
  go,
  initialFilter
}) {
  const d = window.SITE;
  const all = d.studios || [];
  const saved = useMm(() => readStudiosState(), []);
  const hasInitial = !!initialFilter && (initialFilter.cat || initialFilter.country || initialFilter.city || initialFilter.type);
  const [q, setQ] = useSt(hasInitial ? "" : saved.q || "");
  const [cat, setCat] = useSt(initialFilter?.cat || (hasInitial ? "All" : saved.cat || "All"));
  const [country, setCountry] = useSt(initialFilter?.country || (hasInitial ? "All" : saved.country || "All"));
  const [city, setCity] = useSt(initialFilter?.city || (hasInitial ? "All" : saved.city || "All"));
  const [type, setType] = useSt(initialFilter?.type || (hasInitial ? "All" : saved.type || "All"));
  const [sort, setSort] = useSt(saved.sort || "name");
  const [mode, setMode] = useSt(saved.mode || "list");
  useEf(() => {
    if (!initialFilter) return;
    const {
      cat: nCat,
      country: nCountry,
      city: nCity,
      type: nType
    } = initialFilter;
    if (!nCat && !nCountry && !nCity && !nType) return;
    setCat(nCat || "All");
    setCountry(nCountry || "All");
    setCity(nCity || "All");
    setType(nType || "All");
    setQ("");
  }, [initialFilter?.cat, initialFilter?.country, initialFilter?.city, initialFilter?.type]);
  useEf(() => {
    writeStudiosState({
      q,
      cat,
      country,
      city,
      type,
      sort,
      mode
    });
  }, [q, cat, country, city, type, sort, mode]);
  const allCats = ["All", ...d.categoriesOrder.filter((c) => d.byCat?.[c])];
  const allCountries = useMm(() => ["All", ...Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).map(([c]) => c)], []);
  const typeOrder = ["Studio", "Freelance", "Ambiguous"];
  const allTypes = useMm(() => {
    const present = Object.keys(d.byType || {});
    if (!present.length) return null;
    const ordered = [...typeOrder.filter((t) => present.includes(t)), ...present.filter((t) => !typeOrder.includes(t))];
    return ["All", ...ordered];
  }, [d.byType]);
  const filtered = useMm(() => {
    let rs = all;
    if (cat !== "All") rs = rs.filter((s) => s.category.split(",").map((x) => x.trim()).includes(cat));
    if (country !== "All") rs = rs.filter((s) => s.country.split(",").map((x) => x.trim()).includes(country));
    if (city !== "All") rs = rs.filter((s) => (s.city || "").split(",").map((x) => x.trim()).includes(city));
    if (type !== "All") rs = rs.filter((s) => (s.type || "").trim() === type);
    if (q.trim()) {
      const fold = (t) => String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const words = fold(q).split(/[\s,]+/).filter(Boolean);
      rs = rs.filter((s) => {
        const hay = fold([s.name, s.city, s.country, s.category, s.type, window.jadlRegion ? window.jadlRegion(s.country).name : ""].join(" "));
        return words.every((w) => hay.includes(w));
      });
    }
    const coll = new Intl.Collator("en", {
      sensitivity: "base"
    });
    rs = [...rs].sort((a, b) => coll.compare(a[sort] || "", b[sort] || ""));
    return rs;
  }, [all, cat, country, city, type, q, sort]);
  const grouped = useMm(() => {
    if (sort !== "name") return null;
    const out = {};
    filtered.forEach((s) => {
      const L = (s.name[0] || "#").toUpperCase();
      const K = /[A-Z]/.test(L) ? L : "#";
      (out[K] = out[K] || []).push(s);
    });
    return out;
  }, [filtered, sort]);
  const STEP = 120;
  const [limit, setLimit] = useSt(STEP);
  useEf(() => {
    setLimit(STEP);
  }, [filtered]);
  const more = React.useRef(null);
  useEf(() => {
    const el = more.current;
    if (!el || limit >= filtered.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) setLimit((n) => n + STEP * 2);
    }, { rootMargin: "1200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [limit, filtered.length, mode]);
  const limitedGroups = useMm(() => {
    if (!grouped) return null;
    let left = limit;
    const out = [];
    for (const L of Object.keys(grouped).sort()) {
      if (left <= 0) break;
      out.push([L, grouped[L].slice(0, left)]);
      left -= grouped[L].length;
    }
    return out;
  }, [grouped, limit]);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§S"
  }, "The List"), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, filtered.length === all.length ? "All" : filtered.length, " studios", cat !== "All" ? React.createElement(React.Fragment, null, " in ", React.createElement("em", null, cat)) : null, city !== "All" ? React.createElement(React.Fragment, null, ", based in ", React.createElement("em", null, city), " ", React.createElement("button", {
    onClick: () => setCity("All"),
    className: "clear-filter",
    "aria-label": "Clear city filter",
    title: "Clear city filter"
  }, "×")) : country !== "All" ? React.createElement(React.Fragment, null, ", from ", React.createElement("em", null, country)) : null, ".")), React.createElement("div", {
    style: {
      display: "grid",
      gap: 16,
      justifyItems: "end"
    }
  }, React.createElement("div", {
    className: "searchbar"
  }, React.createElement("span", {
    className: "lbl"
  }, "Search"), React.createElement("input", {
    value: q,
    onChange: (e) => setQ(e.target.value),
    placeholder: "name, city, discipline…"
  }), q && React.createElement("button", {
    onClick: () => setQ(""),
    className: "clr"
  }, "×")), React.createElement("div", {
    className: "work-toggles"
  }, React.createElement("span", {
    className: "lbl"
  }, "Sort"), React.createElement("div", {
    className: "seg"
  }, [["name", "A–Z"], ["city", "City"], ["country", "Country"]].map(([k, lbl]) => React.createElement("button", {
    key: k,
    "data-on": sort === k,
    onClick: () => setSort(k)
  }, lbl))), React.createElement("span", {
    className: "lbl",
    style: {
      marginLeft: 10
    }
  }, "View"), React.createElement("div", {
    className: "seg"
  }, ["list", "grid"].map((m) => React.createElement("button", {
    key: m,
    "data-on": mode === m,
    onClick: () => setMode(m)
  }, m)))))), React.createElement("div", {
    className: "filter-row"
  }, React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Discipline"), React.createElement("div", {
    className: "chips"
  }, allCats.map((c) => React.createElement("button", {
    key: c,
    "data-on": cat === c,
    onClick: () => setCat(c)
  }, c, c !== "All" && d.byCat?.[c] ? React.createElement("span", {
    className: "num"
  }, " ", d.byCat[c]) : null)))), React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Country"), React.createElement("div", {
    className: "chips scroll"
  }, allCountries.slice(0, 16).map((c) => React.createElement("button", {
    key: c,
    "data-on": country === c,
    onClick: () => setCountry(c)
  }, window.RegionDot && c !== "All" ? React.createElement(window.RegionDot, { country: c, exact: true }) : null, c, c !== "All" && d.byCountry?.[c] ? React.createElement("span", {
    className: "num"
  }, " ", d.byCountry[c]) : null)), allCountries.length > 16 && React.createElement("select", {
    className: "more-select",
    "aria-label": "More countries",
    value: allCountries.slice(16).includes(country) ? country : "",
    onChange: (e) => e.target.value && setCountry(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "More…"), allCountries.slice(16).map((c) => React.createElement("option", {
    key: c,
    value: c
  }, c, " (", d.byCountry[c], ")"))))), allTypes && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Type"), React.createElement("div", {
    className: "chips"
  }, allTypes.map((t) => React.createElement("button", {
    key: t,
    "data-on": type === t,
    onClick: () => setType(t)
  }, t, t !== "All" && d.byType?.[t] ? React.createElement("span", {
    className: "num"
  }, " ", d.byType[t]) : null))))), mode === "list" && sort === "name" && grouped && React.createElement(AlphabetIndex, {
    grouped,
    onBeforeJump: () => setLimit(filtered.length)
  }), mode === "list" ? React.createElement("div", {
    className: "st-list"
  }, sort === "name" && grouped ? limitedGroups.map(([L, rows]) => React.createElement("div", {
    key: L,
    id: `grp-${L}`,
    className: "st-group"
  }, React.createElement("div", {
    className: "st-letter"
  }, L), React.createElement("div", null, rows.map((s, i) => React.createElement(StudioRow, {
    key: s.name + i,
    s,
    go
  }))))) : filtered.slice(0, limit).map((s, i) => React.createElement(StudioRow, {
    key: s.name + i,
    s,
    go
  })), limit < filtered.length && React.createElement("div", {
    ref: more,
    className: "st-more",
    "aria-hidden": "true"
  }), filtered.length === 0 && React.createElement("div", {
    style: {
      padding: "80px 0",
      textAlign: "center",
      color: "var(--mute)",
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Nothing matches that filter.")) : React.createElement("div", {
    className: "work-grid",
    style: {
      paddingTop: 24
    }
  }, filtered.slice(0, 48).map((s) => {
    const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
    const shot = window.jadlShot ? window.jadlShot(s, 800, 560) : s.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=800&h=560` : null;
    return React.createElement("a", {
      className: "card",
      key: s.name,
      ...window.jadlStudioLink ? window.jadlStudioLink(s, () => go("studio", { name: s.name })) : { onClick: () => go("studio", { name: s.name }) },
      style: {
        cursor: "pointer"
      }
    }, React.createElement("div", {
      className: "frame",
      style: {
        "--col": col,
        position: "relative",
        overflow: "hidden"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.05) 0 1px, transparent 1px 14px)"
      }
    }), shot && React.createElement("img", {
      src: shot,
      alt: "",
      loading: "lazy",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      },
      onError: (e) => {
        e.currentTarget.style.display = "none";
      }
    }), React.createElement("div", {
      className: "ix",
      style: {
        position: "relative",
        zIndex: 2
      }
    }, s.city || "—"), React.createElement("div", {
      className: "yr",
      style: {
        position: "relative",
        zIndex: 2
      }
    }, s.country), React.createElement("div", {
      className: "ttl",
      style: {
        position: "absolute",
        left: 12,
        bottom: 12,
        zIndex: 3,
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(15,15,14,.32)",
        color: "#fff",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        fontFamily: "var(--sans)",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        lineHeight: 1.2,
        maxWidth: "calc(100% - 24px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, s.name)), React.createElement("div", {
      className: "meta"
    }, React.createElement("span", null, s.category.split(",")[0]), React.createElement("span", null, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 24))));
  }), filtered.length > 48 && React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      padding: "32px 0",
      textAlign: "center",
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--mute)",
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Showing 48 of ", filtered.length, " · switch to list view to see all")));
}
function StudioRow({
  s,
  go
}) {
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const [hover, setHover] = useSt(false);
  const boxRef = React.useRef(null);
  const target = React.useRef({
    x: 0,
    y: 0
  });
  const cur = React.useRef({
    x: 0,
    y: 0
  });
  const raf = React.useRef(0);
  const primed = React.useRef(false);
  const shot = window.jadlShot ? window.jadlShot(s, 520, 400) : s.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=520&h=400` : null;
  useEf(() => {
    if (!hover) {
      primed.current = false;
      cancelAnimationFrame(raf.current);
      return;
    }
    const tick = () => {
      const el = boxRef.current;
      if (el) {
        if (!primed.current) {
          cur.current = {
            ...target.current
          };
          primed.current = true;
        }
        cur.current.x += (target.current.x - cur.current.x) * 0.16;
        cur.current.y += (target.current.y - cur.current.y) * 0.16;
        el.style.transform = `translate(${cur.current.x + 24}px, ${cur.current.y - 140}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [hover]);
  return React.createElement("a", {
    className: "studio-row",
    ...window.jadlStudioLink ? window.jadlStudioLink(s, () => go("studio", { name: s.name })) : { onClick: () => go("studio", { name: s.name }) },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseMove: (e) => {
      target.current = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, React.createElement("div", {
    className: "t"
  }, window.RegionDot ? React.createElement(window.RegionDot, { country: s.country }) : null, s.name, s.type && s.type !== "Studio" && React.createElement("span", {
    className: `type-tag type-tag--${s.type.toLowerCase()}`
  }, s.type)), React.createElement("div", {
    className: "c"
  }, window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", ")), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, host), React.createElement("div", {
    className: "arr"
  }, "→"), hover && shot && React.createElement("div", {
    ref: boxRef,
    className: "row-preview-follow"
  }, React.createElement("div", {
    className: "row-preview"
  }, React.createElement("img", {
    src: shot,
    alt: "",
    onError: (e) => {
      e.currentTarget.style.display = "none";
    }
  }))));
}
Object.assign(window, {
  StudiosView
});
function AlphabetIndex({
  grouped,
  onBeforeJump
}) {
  const present = new Set(Object.keys(grouped));
  const letters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  const jump = (L, retry) => {
    let el = document.getElementById(`grp-${L}`);
    if (!el && onBeforeJump && !retry) {
      onBeforeJump();
      requestAnimationFrame(() => requestAnimationFrame(() => jump(L, true)));
      return;
    }
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  };
  return React.createElement("nav", {
    className: "az-index",
    "aria-label": "Jump to letter"
  }, letters.map((L) => React.createElement("button", {
    key: L,
    className: "az-letter",
    "data-empty": !present.has(L),
    disabled: !present.has(L),
    onClick: () => jump(L),
    "aria-label": `Jump to ${L}`
  }, L)));
}
})();
;
/* dist/other_views.js */
(function(){
"use strict";
const {
  useMemo: useGeoMm,
  useState: useGeoSt
} = React;
function GeographyView({
  go
}) {
  const d = window.SITE;
  const countries = useGeoMm(() => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]), []);
  const cities = useGeoMm(() => Object.entries(d.byCity || {}).sort((a, b) => b[1] - a[1]).slice(0, 30), []);
  const max = countries[0]?.[1] || 1;
  const [tab, setTab] = useGeoSt("countries");
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§G"
  }, "Geography"), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, "Studios across ", React.createElement("em", null, d.totals?.countries), " countries", React.createElement("br", null), "and ", React.createElement("em", null, d.totals?.cities), " cities."), React.createElement("p", {
    style: {
      color: "var(--ink-2)",
      maxWidth: "52ch",
      marginTop: 18
    }
  }, "A picture of the field, weighted by this editor's reading. Europe and North America are over-represented, which is a fact, not an argument.")), React.createElement("div", {
    style: {
      alignSelf: "end"
    }
  }, React.createElement("div", {
    className: "work-toggles"
  }, React.createElement("span", {
    className: "lbl"
  }, "View"), React.createElement("div", {
    className: "seg"
  }, [["countries", "Countries"], ["cities", "Cities"]].map(([k, l]) => React.createElement("button", {
    key: k,
    "data-on": tab === k,
    onClick: () => setTab(k)
  }, l)))))), window.WorldChoropleth ? React.createElement(window.WorldChoropleth, {
    go
  }) : null, tab === "countries" ? React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, countries.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: "country",
      value: c
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, c), React.createElement("div", {
    className: "bar"
  }, React.createElement("div", {
    className: "fill",
    style: {
      width: `${n / max * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studio", n === 1 ? "" : "s"), React.createElement("div", {
    className: "arr"
  }, "→")))) : React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, cities.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: "city",
      value: c
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, c), React.createElement("div", {
    className: "bar"
  }, React.createElement("div", {
    className: "fill",
    style: {
      width: `${n / cities[0][1] * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studio", n === 1 ? "" : "s"), React.createElement("div", {
    className: "arr"
  }, "→"))), React.createElement("div", {
    style: {
      padding: "24px 0",
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase"
    }
  }, "Top 30 shown · ", d.totals?.cities, " cities in total")));
}
function CategoriesView({
  go
}) {
  const d = window.SITE;
  const cats = d.categoriesOrder.filter((c) => d.byCat?.[c]);
  const max = Math.max(...cats.map((c) => d.byCat[c]));
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "§C"
  }, "Categories"), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, "Nine ", React.createElement("em", null, "disciplines"), ",", React.createElement("br", null), "loosely defined."), React.createElement("p", {
    style: {
      color: "var(--ink-2)",
      maxWidth: "52ch",
      marginTop: 18
    }
  }, "Most studios belong to more than one category; the counts below overlap on purpose. Click any discipline to enter the list filtered."))), React.createElement("div", {
    className: "cat-long"
  }, cats.map((c, i) => {
    const col = d.catColors?.[c] || "#D8CFBD";
    const colDark = d.catColorsDark?.[c] || col;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textCol = isDark ? colDark : col;
    const exemplars = (d.studios || []).filter((s) => s.category.split(",").map((x) => x.trim()).includes(c)).slice(0, 4);
    return React.createElement("div", {
      key: c,
      className: "cat-long-row",
      style: {
        "--cat-color": textCol
      },
      onClick: () => go("collection", {
        kind: "discipline",
        value: c
      })
    }, React.createElement("div", {
      className: "nm"
    }, c), React.createElement("div", {
      className: "bl"
    }, d.categoryBlurbs[c]), React.createElement("div", {
      className: "ex"
    }, exemplars.map((s) => s.name).join(" · ")), React.createElement("div", {
      className: "bar"
    }, React.createElement("div", {
      className: "fill",
      style: {
        width: `${d.byCat[c] / max * 100}%`,
        background: textCol
      }
    })), React.createElement("div", {
      className: "ct"
    }, d.byCat[c]), React.createElement("div", {
      className: "arr"
    }, "→"));
  })));
}
function AboutView() {
  const d = window.SITE;
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "about-head"
  }, React.createElement(Eyebrow, {
    num: "§B"
  }, "Colophon"), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, "A reading list, kept", React.createElement("br", null), React.createElement("em", null, "as a website"), ".")), React.createElement("div", {
    className: "about-grid"
  }, React.createElement("aside", {
    className: "about-side"
  }, React.createElement("dl", null, React.createElement("dt", null, "Editor"), React.createElement("dd", null, "Wenceslao Sanz", React.createElement("br", null), "Madrid"), React.createElement("dt", null, "Begun"), React.createElement("dd", null, "2023"), React.createElement("dt", null, "Holdings"), React.createElement("dd", null, d.totals?.studios, " entries"), React.createElement("dt", null, "Submissions"), React.createElement("dd", null, "Open, slow"), React.createElement("dt", null, "Rights"), React.createElement("dd", null, "Public reading")), React.createElement("div", {
    style: {
      paddingTop: 18,
      borderTop: "1px solid var(--rule-soft)",
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase"
    }
  }, "Method"), React.createElement("div", {
    style: {
      display: "grid",
      gap: 6,
      fontSize: 13,
      color: "var(--ink-2)"
    }
  }, React.createElement("span", null, "Every entry is personally curated."), React.createElement("span", null, "No ranking, no rating."), React.createElement("span", null, "Links checked quarterly."), React.createElement("span", null, "Removed entries leave no trace."))), React.createElement("div", {
    className: "about-body"
  }, React.createElement("p", null, "Just a Design List is a personal reading list that grew too long to keep privately. It began in 2023 as a list of bookmarks, and is now a small, slow public archive — a place to point at studios whose work rewards close attention, without the obligation of a review."), React.createElement("p", null, React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "Every entry on this index is selected personally by me."), " Nothing here is submitted automatically, scraped, or paid for. Each studio has been added because its work, at some point, made me stop and look closely."), React.createElement("p", null, "The index is not exhaustive and does not try to be. It favours small and medium studios, independent practices, and designers who publish their work clearly on the open web. Large network agencies and consultancies are generally absent; this is not an oversight."), React.createElement("p", null, "Each entry is intentionally minimal: a name, a city, a country, a discipline or two, a link. No hero image, no blurb, no star rating. The reader is trusted to click through."), React.createElement("p", null, "If you think a studio or designer is missing, ", React.createElement("a", {
    className: "link",
    href: `mailto:${d.contact.email}`
  }, "write"), ". Submissions are read in the order they arrive; a yes takes a month, a no takes silence."), React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 32,
      borderTop: "1px solid var(--rule-soft)"
    }
  }, React.createElement(Eyebrow, null, "About the editor"), React.createElement("p", {
    style: {
      marginTop: 16
    }
  }, "This index is edited and maintained by ", React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "Wenceslao Sanz"), ", a designer based in Madrid. The project began as a private list of bookmarks and grew into the public archive you are reading now."), React.createElement("p", null, "More of his work and writing lives at ", React.createElement("a", {
    className: "link",
    href: "https://www.wenceslaosanz.rocks",
    target: "_blank",
    rel: "noopener"
  }, "wenceslaosanz.rocks"), ". For professional matters, reach out on ", React.createElement("a", {
    className: "link",
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn"), "."), React.createElement("div", {
    style: {
      marginTop: 24,
      display: "grid",
      gap: 10,
      maxWidth: 420
    }
  }, React.createElement("a", {
    className: "editor-link",
    href: "https://www.wenceslaosanz.rocks",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", {
    className: "k"
  }, "Portfolio"), React.createElement("span", {
    className: "v"
  }, "wenceslaosanz.rocks"), React.createElement("span", {
    className: "a"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")), React.createElement("a", {
    className: "editor-link",
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", {
    className: "k"
  }, "LinkedIn"), React.createElement("span", {
    className: "v"
  }, "in/wenceslaosanz"), React.createElement("span", {
    className: "a"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")), React.createElement("a", {
    className: "editor-link",
    href: `mailto:${d.contact.email}`
  }, React.createElement("span", {
    className: "k"
  }, "Email"), React.createElement("span", {
    className: "v"
  }, d.contact.email), React.createElement("span", {
    className: "a"
  }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")))))), React.createElement("div", {
    style: {
      marginTop: 120,
      paddingTop: 48,
      borderTop: "1px solid var(--rule)"
    }
  }, React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: 32
    }
  }, React.createElement("div", {
    style: {
      gridColumn: "1 / span 3"
    }
  }, React.createElement(Eyebrow, {
    num: "§B.01"
  }, "Write")), React.createElement("div", {
    style: {
      gridColumn: "4 / span 9",
      fontFamily: "var(--serif)",
      fontSize: "clamp(30px, 4vw, 54px)",
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
      maxWidth: "26ch"
    }
  }, "To propose a studio, correct an error, or simply say hello — ", React.createElement("a", {
    className: "link",
    href: `mailto:${d.contact.email}`
  }, d.contact.email), "."))));
}
function NotFoundView({
  go
}) {
  const d = window.SITE || {};
  const n = (d.studios || []).length;
  const regions = window.JADL_REGIONS || [];
  const nav = (e, path) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    window.jadlNavigate ? window.jadlNavigate(path) : window.location.href = path;
  };
  const random = () => {
    const s = window.pickRandomStudio && window.pickRandomStudio(null);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("div", {
    className: "view wrap nf"
  }, React.createElement("div", {
    className: "about-head"
  }, React.createElement(Eyebrow, {
    num: "404"
  }, "Not found"), React.createElement("h1", {
    className: "nf-title"
  }, "Not on", React.createElement("br", null), React.createElement("em", null, "the list"), "."), React.createElement("p", {
    className: "nf-lead"
  }, "This page doesn’t exist, or the studio it belonged to has left the index. The other ", n || "", " entries are still here.")), React.createElement("div", {
    className: "nf-actions"
  }, React.createElement("button", {
    type: "button",
    className: "nf-btn nf-btn--primary",
    onClick: () => window.jadlOpenSearch && window.jadlOpenSearch()
  }, "Search the list", React.createElement("kbd", {
    className: "random-kbd",
    "aria-hidden": "true"
  }, "/")), React.createElement("a", {
    className: "nf-btn",
    href: "/studios",
    onClick: (e) => nav(e, "/studios")
  }, "All studios, A–Z"), React.createElement("button", {
    type: "button",
    className: "nf-btn",
    onClick: random
  }, "A random studio", React.createElement("kbd", {
    className: "random-kbd",
    "aria-hidden": "true"
  }, "R"))), regions.length ? React.createElement("nav", {
    className: "nf-regions",
    "aria-label": "Regions"
  }, React.createElement("div", {
    className: "nf-regions-label"
  }, "Or enter by region"), React.createElement("ul", null, regions.map((r) => React.createElement("li", {
    key: r.id
  }, React.createElement("a", {
    href: window.jadlRegionHref(r.name),
    onClick: (e) => nav(e, window.jadlRegionHref(r.name))
  }, React.createElement("i", {
    style: {
      background: r.color
    },
    "aria-hidden": "true"
  }), r.name))))) : null);
}
Object.assign(window, {
  NotFoundView,
  GeographyView,
  CategoriesView,
  AboutView
});
})();
;
/* dist/geo_map.js */
(function(){
"use strict";
const { useEffect: useMapEffect, useRef: useMapRef, useState: useMapState } = React;
const NAME_TO_ISO = {
  "USA": "us",
  "Spain": "es",
  "UK": "gb",
  "England": "gb",
  "Germany": "de",
  "Australia": "au",
  "France": "fr",
  "The Netherlands": "nl",
  "Switzerland": "ch",
  "Sweden": "se",
  "Canada": "ca",
  "Denmark": "dk",
  "Norway": "no",
  "Austria": "at",
  "Italy": "it",
  "Portugal": "pt",
  "China": "cn",
  "Belgium": "be",
  "Mexico": "mx",
  "Finland": "fi",
  "Scotland": "gb",
  "South Korea": "kr",
  "Greece": "gr",
  "Japan": "jp",
  "Brazil": "br",
  "Argentina": "ar",
  "New Zealand": "nz",
  "Poland": "pl",
  "Romania": "ro",
  "Czech Republic": "cz",
  "Ireland": "ie",
  "Hungary": "hu",
  "Turkey": "tr",
  "Uruguay": "uy",
  "Serbia": "rs",
  "Singapore": "sg",
  "Ukraine": "ua",
  "Chile": "cl",
  "Iceland": "is",
  "Russia": "ru",
  "Vietnam": "vn",
  "Tasmania": "au",
  "Estonia": "ee",
  "Wales": "gb",
  "United Arab Emirates": "ae",
  "Guatemala": "gt",
  "Kenya": "ke",
  "Kazakhstan": "kz",
  "Lithuania": "lt",
  "Israel": "il",
  "Latvia": "lv",
  "Slovakia": "sk",
  "Colombia": "co",
  "Northern Ireland": "gb",
  "North Macedonia": "mk"
};
function bucketPct(n) {
  if (n >= 100) return 100;
  if (n >= 40) return 86;
  if (n >= 15) return 72;
  if (n >= 5) return 58;
  if (n >= 1) return 44;
  return 0;
}
const LEGEND = [
  ["1–4", 44],
  ["5–14", 58],
  ["15–39", 72],
  ["40–99", 86],
  ["100+", 100]
];
function fillFor(pct, color) {
  if (!pct) return "var(--rule-soft)";
  return `color-mix(in srgb, ${color || "var(--ink)"} ${pct}%, var(--paper))`;
}
const regionFor = (name) => window.jadlRegion ? window.jadlRegion(name) : { id: "all", name: "", color: "var(--ink)" };
function WorldChoropleth({ go }) {
  const d = window.SITE;
  const holder = useMapRef(null);
  const wrapRef = useMapRef(null);
  const [tip, setTip] = useMapState(null);
  const [focus, setFocus] = useMapState(null);
  const paint = useMapRef([]);
  useMapEffect(() => {
    const byIso = {};
    const primaryName = {};
    Object.entries(d.byCountry || {}).forEach(([name, n]) => {
      const iso = NAME_TO_ISO[name];
      if (!iso) return;
      byIso[iso] = (byIso[iso] || 0) + n;
      if (!primaryName[iso] || n > (d.byCountry[primaryName[iso]] || 0)) {
        primaryName[iso] = name;
      }
    });
    let cancelled = false;
    fetch("world-map.min.svg?v=44").then((r) => r.text()).then((txt) => {
      if (cancelled || !holder.current) return;
      holder.current.innerHTML = txt;
      const svg = holder.current.querySelector("svg");
      if (!svg) return;
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.style.width = "100%";
      svg.style.height = "auto";
      svg.style.display = "block";
      const nodes = svg.querySelectorAll("path[id], g[id]");
      nodes.forEach((node) => {
        const iso = node.id;
        const n = byIso[iso] || 0;
        const pct = bucketPct(n);
        const region = n > 0 ? regionFor(primaryName[iso]) : null;
        const fill = fillFor(pct, region && region.color);
        const targets = node.tagName.toLowerCase() === "g" ? node.querySelectorAll("path") : [node];
        targets.forEach((p) => {
          p.style.fill = fill;
          p.style.stroke = "var(--paper)";
          p.style.strokeWidth = "0.4";
          p.style.transition = "fill .15s ease, opacity .2s ease";
          p.style.vectorEffect = "non-scaling-stroke";
        });
        if (n > 0) paint.current.push({ targets, region: region.id });
        if (n > 0) {
          node.style.cursor = "pointer";
          const name = primaryName[iso];
          const enter = () => {
            targets.forEach((p) => {
              p.style.fill = "var(--ink)";
            });
          };
          const leave = () => {
            targets.forEach((p) => {
              p.style.fill = fill;
            });
            setTip(null);
          };
          const move = (e) => {
            const rect = wrapRef.current.getBoundingClientRect();
            setTip({ iso, name, n, x: e.clientX - rect.left, y: e.clientY - rect.top });
          };
          const click = () => go("studios", { filter: { country: name } });
          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          node.addEventListener("mousemove", move);
          node.addEventListener("click", click);
        }
      });
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useMapEffect(() => {
    paint.current.forEach(({ targets, region }) => {
      targets.forEach((p) => {
        p.style.opacity = !focus || focus === region ? "1" : "0.12";
      });
    });
  }, [focus]);
  const regions = window.JADL_REGIONS || [];
  return /* @__PURE__ */ React.createElement("div", { className: "geo-map-block" }, /* @__PURE__ */ React.createElement("div", { className: "geo-map", ref: wrapRef }, /* @__PURE__ */ React.createElement("div", { className: "geo-map-svg", ref: holder }), tip && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "geo-tip",
      style: {
        left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth || 0) - 160),
        top: Math.max(tip.y - 14, 0)
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "geo-tip-name" }, tip.name),
    /* @__PURE__ */ React.createElement("span", { className: "geo-tip-n" }, tip.n, " studio", tip.n === 1 ? "" : "s")
  )), regions.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "geo-regions" }, /* @__PURE__ */ React.createElement("span", { className: "geo-legend-lbl" }, "Region"), /* @__PURE__ */ React.createElement("div", { className: "chips geo-region-chips" }, /* @__PURE__ */ React.createElement("button", { type: "button", "data-on": !focus, onClick: () => setFocus(null) }, "All"), regions.map((r) => /* @__PURE__ */ React.createElement("button", { type: "button", key: r.id, "data-on": focus === r.id, onClick: () => setFocus(focus === r.id ? null : r.id) }, /* @__PURE__ */ React.createElement("span", { className: "rg-dot", style: { background: r.color } }), r.name))), focus && (() => {
    const r = regions.find((x) => x.id === focus);
    if (!r || !window.jadlRegionHref) return null;
    const href = window.jadlRegionHref(r.name);
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        className: "geo-region-go",
        href,
        onClick: (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          window.jadlNavigate(href);
        }
      },
      "See every studio in ",
      r.name,
      " →"
    );
  })()), /* @__PURE__ */ React.createElement("div", { className: "geo-legend" }, /* @__PURE__ */ React.createElement("span", { className: "geo-legend-lbl" }, "Studios per country"), /* @__PURE__ */ React.createElement("div", { className: "geo-legend-scale" }, LEGEND.map(([label, pct]) => /* @__PURE__ */ React.createElement("div", { className: "geo-legend-step", key: label }, /* @__PURE__ */ React.createElement("span", { className: "sw", style: { background: fillFor(pct, "var(--ink)") } }), /* @__PURE__ */ React.createElement("span", { className: "lb" }, label)))), /* @__PURE__ */ React.createElement("span", { className: "geo-legend-credit" }, "Map: Al MacDonald · Fritz Lekschas, CC BY-SA 3.0")));
}
Object.assign(window, { WorldChoropleth });
})();
;
/* dist/project_view.js */
(function(){
"use strict";
const {
  useMemo: usePdMm,
  useState: usePdState,
  useEffect: usePdEffect
} = React;
const h = React.createElement;
const ES_MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11
};
function formatIndexed(raw) {
  if (!raw) return "—";
  let d = null;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const t = new Date(raw);
    if (!isNaN(t.getTime())) d = t;
  }
  if (!d) {
    const m = raw.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
    if (m) {
      const month = ES_MONTHS[m[2].toLowerCase()];
      if (month !== void 0) d = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
    }
  }
  if (!d) return raw;
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    }).format(d);
  } catch {
    return d.toDateString();
  }
}
const SD_STYLE_ID = "sd-detail-styles";
const SD_CSS = "/* Studio detail — new text + image layout.\n   Injected by this file on purpose: it must not depend on styles.css being\n   patched, nor on the stylesheet cache being fresh. Uses existing tokens\n   (--rule, --mute, --ink, --serif, --mono), so light/dark still apply. */\n.pd-head--stack {\n  display: block !important;\n  grid-template-columns: none !important;\n  padding: clamp(48px, 7vw, 110px) 0 36px;\n  border-bottom: 1px solid var(--rule);\n  text-align: left !important;\n}\n.pd-head--stack h2 {\n  margin: 18px 0 0 !important;\n  max-width: 18ch;\n  text-align: left !important;\n}\n.pd-meta-line {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px 28px;\n  margin-top: 30px;\n  font-family: var(--mono);\n  font-size: 12px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-spread {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);\n  gap: 48px;\n  padding-top: 48px;\n  align-items: start;\n}\n.sd-figure-col, .sd-col { min-width: 0; }\n.sd-figure-link { display: block; min-width: 0; }\n.sd-figure {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  border: 1px solid var(--rule);\n  background: var(--col, #D8CFBD);\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sd-figure .pd-hero-img {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  object-fit: cover;\n  object-position: top center;\n  display: block;\n  transition: opacity .45s ease;\n}\n.sd-figure-fallback {\n  position: relative;\n  z-index: 2;\n  padding: 0 40px;\n  text-align: center;\n  font-family: var(--serif);\n  font-style: italic;\n  font-size: clamp(36px, 6vw, 80px);\n  line-height: 1;\n  color: var(--ink);\n  opacity: .25;\n}\n.sd-figure-link:hover .sd-figure { border-color: var(--ink); }\n.sd-cap {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  margin-top: 12px;\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-nav { display: flex; flex-direction: column; }\n.sd-nav--end { margin-top: 40px; border-bottom: 1px solid var(--rule); }\n.sd-note--first { margin-top: 0; }\n.sd-nav-row {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: baseline;\n  gap: 16px;\n  padding: 13px 0;\n  border-top: 1px solid var(--rule);\n  cursor: pointer;\n}\n.sd-nav-row .t { font-family: var(--serif); font-size: 22px; letter-spacing: -.01em; }\n.sd-nav-row .k {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--mute);\n  white-space: nowrap;\n}\n.sd-nav-row:hover .t { color: var(--accent); }\n.sd-note {\n  margin: 26px 0 0;\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--ink-2, var(--mute));\n  text-wrap: pretty;\n}\n.sd-links { display: grid; margin-top: 32px; border-top: 1px solid var(--rule); }\n.sd-links a {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 12px;\n  padding: 13px 0;\n  border-bottom: 1px solid var(--rule);\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--ink);\n  text-decoration: none;\n}\n.sd-links a:hover { color: var(--accent); }\n.sd-col .save-block { margin-top: 24px; }\n.sd-lbl {\n  margin-top: 36px;\n  padding-top: 20px;\n  border-top: 1px solid var(--rule);\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }\n.sd-tag {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--ink);\n  border: 1px solid var(--rule);\n  border-radius: 999px;\n  padding: 6px 12px;\n  cursor: pointer;\n  transition: border-color .15s ease, color .15s ease;\n}\n.sd-tag:hover { border-color: var(--ink); color: var(--accent); }\n@media (max-width: 860px) {\n  .sd-spread { grid-template-columns: 1fr; gap: 32px; }\n  .sd-cap { flex-direction: column; gap: 6px; }\n}";
function ensureSdStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SD_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = SD_STYLE_ID;
  el.textContent = SD_CSS;
  document.head.appendChild(el);
}
ensureSdStyles();
function StudioHero({ s, col }) {
  const [loaded, setLoaded] = usePdState(false);
  const [srcIdx, setSrcIdx] = usePdState(0);
  const own = s.url && window.jadlShot ? window.jadlShot(s, 1600, 1200) : null;
  const sources = s.url ? [own && own.indexOf("mshots") < 0 ? own : null, `/api/ogimage?url=${encodeURIComponent(s.url)}`, `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1200`].filter(Boolean) : [];
  usePdEffect(() => {
    setLoaded(false);
    setSrcIdx(0);
  }, [s.url]);
  const shot = sources[srcIdx] || null;
  const exhausted = srcIdx >= sources.length;
  const advance = () => setSrcIdx((i) => i + 1);
  const rcol = window.jadlRegionColor ? window.jadlRegionColor(s.country) : col;
  return h("div", {
    className: "sd-figure" + (exhausted ? " is-empty" : ""),
    style: {
      "--col": rcol,
      position: "relative",
      width: "100%",
      aspectRatio: "4 / 3",
      overflow: "hidden"
    }
  }, shot && !exhausted && h("img", {
    key: shot,
    src: shot,
    alt: `${s.name} — website preview`,
    onLoad: (e) => {
      const iw = e.target.naturalWidth, ih = e.target.naturalHeight;
      if (iw > 100 && !(iw === 400 && ih === 300)) setLoaded(true);
      else advance();
    },
    onError: advance,
    className: "pd-hero-img",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      objectFit: "cover",
      objectPosition: "top center",
      display: "block",
      opacity: loaded ? 1 : 0,
      transition: "opacity .45s ease"
    }
  }), !loaded && h("div", {
    className: "sd-figure-fallback",
    style: { position: "relative", zIndex: 2 }
  }, s.name));
}
const CORRECTION_ENDPOINT = "https://formspree.io/f/xzdylwvg";
const EDITOR_EMAIL_CORR = "hola@justadesignlist.com";
function CorrectionBlock({ s }) {
  const [open, setOpen] = usePdState(false);
  const [note, setNote] = usePdState("");
  const [email, setEmail] = usePdState("");
  const [sending, setSending] = usePdState(false);
  const [sent, setSent] = usePdState(false);
  const [err, setErr] = usePdState(null);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  async function handleSubmit(e) {
    e.preventDefault();
    if (!note.trim() || sending) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(CORRECTION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Correction — ${s.name}`,
          studio: s.name,
          page: pageUrl,
          note,
          email
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err2) {
      console.error("correction submit failed", err2);
      setErr(err2.message);
    } finally {
      setSending(false);
    }
  }
  if (sent) {
    return h(
      "div",
      { className: "correction-block" },
      h("p", { className: "correction-note" }, "Thanks — noted. It'll be checked.")
    );
  }
  return h("div", { className: "correction-block" }, !open ? h("button", {
    className: "correction-toggle",
    onClick: () => setOpen(true)
  }, h("span", null, "Spot something wrong? Suggest a correction")) : h("form", {
    className: "correction-form",
    onSubmit: handleSubmit
  }, h("textarea", {
    required: true,
    value: note,
    onChange: (e) => setNote(e.target.value),
    placeholder: "What's outdated or wrong? (e.g. broken link, wrong city, new category)"
  }), h("input", {
    type: "email",
    value: email,
    onChange: (e) => setEmail(e.target.value),
    placeholder: "Your email (optional, in case of questions)"
  }), h("button", {
    type: "submit",
    className: "correction-submit",
    disabled: sending
  }, sending ? "Sending…" : "Send"), err && h("p", {
    className: "correction-note",
    style: { color: "var(--accent-text, var(--accent))" }
  }, `Couldn't send (${err}). `, h("a", {
    className: "link",
    href: `mailto:${EDITOR_EMAIL_CORR}?subject=${encodeURIComponent("Correction — " + s.name)}&body=${encodeURIComponent(note + (email ? "\n\nFrom: " + email : "") + "\n\nPage: " + pageUrl)}`
  }, "send by email instead"))));
}
function StudioDetail({ name, go }) {
  const d = window.SITE;
  const all = d.studios || [];
  const idx = all.findIndex((x) => x.name === name);
  const s = all[idx];
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const related = usePdMm(() => {
    if (!s) return [];
    if (window.jadlRelatedGroups) return window.jadlRelatedGroups(s, all, 6);
    const firstCat = s.category.split(",")[0].trim();
    const items = all.filter((x) => x.name !== s.name && x.category.includes(firstCat)).slice(0, 6);
    return items.length ? [{ key: "cat", title: "Neighbours in " + firstCat, items }] : [];
  }, [s]);
  if (!s) {
    return h("div", {
      className: "view wrap",
      style: { paddingTop: 120 }
    }, h("p", {
      style: { fontFamily: "var(--serif)", fontSize: 32 }
    }, "Entry not found."), h("button", {
      onClick: () => go("studios"),
      className: "link",
      style: { fontFamily: "var(--mono)", fontSize: 12 }
    }, "← Back to the list"));
  }
  const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const igHandle = (s.ig || "").split("/").filter(Boolean).pop();
  const cats = s.category.split(",").map((c) => c.trim()).filter(Boolean);
  const place = window.jadlPlace ? window.jadlPlace(s, "full") : [s.city, s.country].filter(Boolean).join(", ");
  usePdEffect(() => {
    ensureSdStyles();
    if (window.recordVisit) window.recordVisit(s.name);
  }, [s.name]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${s.name} — ${cats[0] || "design"}${s.city ? `, ${s.city}` : ""} · via Just a Design List`;
  const [copied, setCopied] = usePdState(false);
  const [igOpen, setIgOpen] = usePdState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const i = document.createElement("input");
      i.value = shareUrl;
      document.body.appendChild(i);
      i.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
      }
      document.body.removeChild(i);
    }
  };
  const shareBlock = h("div", { className: "share-block" }, h("div", {
    className: "share-lbl"
  }, "Share"), h("div", { className: "share-row" }, h("a", {
    className: "share-btn",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on X / Twitter",
    title: "Share on X / Twitter"
  }, h("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor",
    "aria-hidden": "true"
  }, h("path", {
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  })), h("span", null, "X")), h("a", {
    className: "share-btn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on LinkedIn",
    title: "Share on LinkedIn"
  }, h("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor",
    "aria-hidden": "true"
  }, h("path", {
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
  })), h("span", null, "LinkedIn")), h("a", {
    className: "share-btn",
    href: `mailto:?subject=${encodeURIComponent(s.name + " — Just a Design List")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
    "aria-label": "Share by email",
    title: "Share by email"
  }, h("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    "aria-hidden": "true"
  }, h("rect", { x: "3", y: "5", width: "18", height: "14", rx: "1" }), h("path", {
    d: "M3 7l9 6 9-6"
  })), h("span", null, "Email")), h("button", {
    className: "share-btn",
    onClick: () => setIgOpen(true),
    "aria-label": "Share to Instagram",
    title: "Share to Instagram"
  }, h("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    "aria-hidden": "true"
  }, h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), h("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), h("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  })), h("span", null, "Instagram")), h("button", {
    className: "share-btn",
    onClick: copyLink,
    "aria-label": "Copy link",
    title: "Copy link"
  }, h("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, h("path", {
    d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"
  }), h("path", {
    d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"
  })), h("span", null, copied ? "Copied" : "Copy link"))));
  return h(
    "div",
    { className: "view wrap" },
    h(
      "div",
      {
        className: "pd-topbar"
      },
      h("button", {
        onClick: () => go("studios"),
        className: "back-btn",
        "aria-label": "Back to the list"
      }, h("span", { className: "arr" }, "←"), h("span", null, "The List")),
      window.RandomButton ? h(window.RandomButton, { go, currentName: s.name }) : null
    ),
    h(
      "div",
      { className: "pd-head pd-head--stack" },
      h(Eyebrow, null, h("span", { className: "num" }, `№ ${String(idx + 1).padStart(3, "0")} of ${all.length}`)),
      h("h2", { role: "heading", "aria-level": 1 }, s.name),
      h(
        "div",
        { className: "pd-meta-line" },
        window.RegionChip ? h(window.RegionChip, { country: s.country }) : null,
        place && h("span", null, place),
        h("span", null, "Indexed ", formatIndexed(s.created || s.edited)),
        cats.length > 0 && h("span", null, cats.join(" · "))
      )
    ),
    h(
      "div",
      { className: "sd-spread" },
      h(
        "div",
        { className: "sd-figure-col", style: { minWidth: 0 } },
        s.url ? h("a", {
          href: s.url,
          target: "_blank",
          rel: "noopener",
          className: "sd-figure-link",
          style: { display: "block", minWidth: 0 }
        }, h(StudioHero, { s, col })) : h(StudioHero, { s, col }),
        h(
          "div",
          { className: "sd-cap" },
          h("span", null, host ? `${host}, homepage` : "Studio site preview"),
          s.url && h("a", {
            className: "link",
            href: s.url,
            target: "_blank",
            rel: "noopener"
          }, "Visit the site ", window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")
        )
      ),
      h(
        "div",
        { className: "sd-col" },
        h("p", { className: "sd-note sd-note--first" }, "The entry is intentionally brief. The index is a pointer, not a review — visit the studio's own site to see the work in its preferred frame. What we note here is only what is needed to find the practice again: where it is, what it does, and where to look."),
        h(
          "div",
          { className: "sd-links" },
          s.url && h("a", {
            href: s.url,
            target: "_blank",
            rel: "noopener"
          }, h("span", {
            style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
          }, host), h("span", { style: { color: "var(--mute)" } }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎")),
          s.ig && h("a", {
            href: s.ig,
            target: "_blank",
            rel: "noopener"
          }, h("span", {
            style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
          }, "@", igHandle), h("span", { style: { color: "var(--mute)" } }, window.jadlArrowNE ? window.jadlArrowNE() : "↗︎"))
        ),
        window.SaveButton ? h(
          "div",
          { className: "save-block" },
          h(window.SaveButton, { studio: s })
        ) : null,
        shareBlock,
        h(CorrectionBlock, { s }),
        h("div", { className: "sd-lbl" }, "Filed under"),
        h(
          "div",
          { className: "sd-tags" },
          cats.map((t) => h("span", {
            key: t,
            className: "sd-tag",
            onClick: () => go("collection", { kind: "discipline", value: t })
          }, t, d.byCat && d.byCat[t] ? ` · ${d.byCat[t]}` : "")),
          s.country && h(
            "span",
            {
              key: "country",
              className: "sd-tag",
              onClick: () => go("collection", { kind: "country", value: s.country.split(",")[0].trim() })
            },
            s.country.split(",")[0].trim(),
            d.byCountry && d.byCountry[s.country.split(",")[0].trim()] ? ` · ${d.byCountry[s.country.split(",")[0].trim()]}` : ""
          )
        ),
        h(
          "nav",
          { className: "sd-nav sd-nav--end", "aria-label": "Previous and next studio" },
          h("a", {
            className: "sd-nav-row",
            ...window.jadlStudioLink ? window.jadlStudioLink(prev, () => go("studio", { name: prev.name })) : { onClick: () => go("studio", { name: prev.name }) }
          }, h("span", { className: "t" }, prev.name), h("span", { className: "k" }, "← Previous")),
          h("a", {
            className: "sd-nav-row",
            ...window.jadlStudioLink ? window.jadlStudioLink(next, () => go("studio", { name: next.name })) : { onClick: () => go("studio", { name: next.name }) }
          }, h("span", { className: "t" }, next.name), h("span", { className: "k" }, "Next →"))
        )
      )
    ),
    related.length > 0 && h("div", {
      className: "sd-related",
      style: { paddingTop: 64, marginTop: 64, borderTop: "1px solid var(--rule)" }
    }, related.map((g, gi) => h(
      "section",
      { key: g.key, className: "sd-rel-group", style: gi ? { marginTop: 56 } : null },
      h(Eyebrow, null, g.title),
      h("div", {
        className: "st-list",
        style: { marginTop: 24 }
      }, g.items.map((r) => h("a", {
        key: r.name,
        className: "studio-row",
        ...window.jadlStudioLink ? window.jadlStudioLink(r, () => go("studio", { name: r.name })) : { onClick: () => go("studio", { name: r.name }) }
      }, h("div", { className: "t" }, window.RegionDot ? h(window.RegionDot, { country: r.country }) : null, r.name), h("div", {
        className: "c"
      }, window.jadlPlace ? window.jadlPlace(r, "short") : [r.city, r.country].filter(Boolean).join(", ")), h("div", {
        className: "k"
      }, r.category), h("div", {
        className: "u"
      }, (r.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), h("div", {
        className: "arr"
      }, "→")))),
      g.more ? h("a", {
        className: "sd-rel-more",
        href: g.more.href,
        onClick: (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
          e.preventDefault();
          go("collection", { kind: g.more.kind, value: g.more.value });
        }
      }, g.more.label, " →") : null
    ))),
    igOpen && window.IGShareModal ? h(window.IGShareModal, {
      s,
      col,
      idx,
      total: all.length,
      onClose: () => setIgOpen(false)
    }) : null,
    window.RecentlyViewedInline ? h(window.RecentlyViewedInline, {
      go,
      excludeName: s.name
    }) : null
  );
}
Object.assign(window, { StudioDetail });
})();
;
/* dist/ig_share.js */
(function(){
"use strict";
const {
  useState: useIgState,
  useEffect: useIgEffect,
  useRef: useIgRef
} = React;
function loadImageCORS(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function pickIgPaperInk() {
  const cs = getComputedStyle(document.documentElement);
  const paper = (cs.getPropertyValue("--paper") || "#FBFBFA").trim() || "#FBFBFA";
  const ink = (cs.getPropertyValue("--ink") || "#0F0F0E").trim() || "#0F0F0E";
  const mute = (cs.getPropertyValue("--mute") || "#8A8A85").trim() || "#8A8A85";
  const rule = (cs.getPropertyValue("--rule") || "#D6D6D2").trim() || "#D6D6D2";
  return {
    paper,
    ink,
    mute,
    rule
  };
}
async function buildStudioImage(s, col, idx, total) {
  const W = 1080, H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const {
    paper,
    ink,
    mute,
    rule
  } = pickIgPaperInk();
  try {
    await Promise.all([document.fonts.load("600 120px Aileron"), document.fonts.load("400 30px Aileron"), document.fonts.load('500 22px "Paper Mono"')]).then(() => document.fonts.ready);
  } catch {
  }
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);
  const heroH = 760;
  ctx.fillStyle = col || "#D8CFBD";
  ctx.fillRect(0, 0, W, heroH);
  let drewShot = false;
  if (s.url) {
    const shotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1000`;
    try {
      const img = await loadImageCORS(shotUrl);
      if (img.naturalWidth > 100) {
        const sa = img.naturalWidth / img.naturalHeight;
        const da = W / heroH;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
        if (sa > da) {
          sw = sh * da;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = sw / da;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, heroH);
        drewShot = true;
      }
    } catch (e) {
    }
  }
  if (!drewShot) {
    ctx.save();
    ctx.fillStyle = "rgba(15,15,14,0.22)";
    let nameSize2 = 120;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${nameSize2}px Aileron, "Helvetica Neue", Arial, sans-serif`;
    while (ctx.measureText(s.name).width > W - 120 && nameSize2 > 56) {
      nameSize2 -= 6;
      ctx.font = `600 ${nameSize2}px Aileron, "Helvetica Neue", Arial, sans-serif`;
    }
    ctx.fillText(s.name, W / 2, heroH / 2);
    ctx.restore();
  }
  ctx.fillStyle = rule;
  ctx.fillRect(0, heroH, W, 1);
  const pad = 72;
  let y = heroH + 60;
  ctx.fillStyle = mute;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = `500 22px "Paper Mono", ui-monospace, monospace`;
  const eyebrow = `№ ${String(idx + 1).padStart(3, "0")} OF ${total}    ·    ${s.category.split(",")[0].trim().toUpperCase()}`;
  ctx.fillText(eyebrow, pad, y);
  y += 56;
  ctx.fillStyle = ink;
  let nameSize = 132;
  ctx.font = `600 ${nameSize}px Aileron, "Helvetica Neue", Arial, sans-serif`;
  while (ctx.measureText(s.name).width > W - pad * 2 && nameSize > 56) {
    nameSize -= 4;
    ctx.font = `600 ${nameSize}px Aileron, "Helvetica Neue", Arial, sans-serif`;
  }
  ctx.textBaseline = "alphabetic";
  ctx.fillText(s.name, pad, y + nameSize * 0.85);
  y += nameSize * 0.95 + 24;
  ctx.fillStyle = ink;
  ctx.font = `400 30px Aileron, "Helvetica Neue", Arial, sans-serif`;
  ctx.textBaseline = "top";
  const loc = window.jadlPlace ? window.jadlPlace(s, "primary") : [s.city, s.country].filter(Boolean).join(", ");
  if (loc) ctx.fillText(loc, pad, y);
  const footerY = H - pad - 14;
  ctx.fillStyle = rule;
  ctx.fillRect(pad, footerY - 36, W - pad * 2, 1);
  ctx.fillStyle = ink;
  ctx.font = `500 20px "Paper Mono", ui-monospace, monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("JUST A DESIGN LIST", pad, footerY);
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (host) {
    ctx.fillStyle = mute;
    ctx.textAlign = "right";
    ctx.fillText(host.toUpperCase(), W - pad, footerY);
  }
  return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
}
function IGShareModal({
  s,
  col,
  idx,
  total,
  onClose
}) {
  const [blob, setBlob] = useIgState(null);
  const [url, setUrl] = useIgState(null);
  const [err, setErr] = useIgState(false);
  const [shared, setShared] = useIgState("");
  useIgEffect(() => {
    let cancelled = false;
    let createdUrl = null;
    (async () => {
      try {
        const b = await buildStudioImage(s, col, idx, total);
        if (cancelled || !b) {
          if (!b) setErr(true);
          return;
        }
        createdUrl = URL.createObjectURL(b);
        setBlob(b);
        setUrl(createdUrl);
      } catch (e) {
        if (!cancelled) setErr(true);
      }
    })();
    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [s.name]);
  useIgEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const filename = `${(s.name || "studio").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-jadl.png`;
  const download = () => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setShared("Saved");
    setTimeout(() => setShared(""), 1800);
  };
  const shareNative = async () => {
    if (!blob) return;
    const file = new File([blob], filename, {
      type: "image/png"
    });
    try {
      if (navigator.canShare && navigator.canShare({
        files: [file]
      })) {
        await navigator.share({
          files: [file],
          title: s.name,
          text: `${s.name} — via Just a Design List`
        });
        setShared("Shared");
        setTimeout(() => setShared(""), 1800);
        return;
      }
    } catch (e) {
      return;
    }
    download();
  };
  const canShareFiles = typeof navigator !== "undefined" && typeof navigator.canShare === "function" && (() => {
    try {
      return navigator.canShare({
        files: [new File([new Blob()], "x.png", {
          type: "image/png"
        })]
      });
    } catch {
      return false;
    }
  })();
  return React.createElement("div", {
    className: "ig-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Share to Instagram",
    onClick: onClose
  }, React.createElement("div", {
    className: "ig-modal-inner",
    onClick: (e) => e.stopPropagation()
  }, React.createElement("button", {
    className: "ig-close",
    onClick: onClose,
    "aria-label": "Close"
  }, "×"), React.createElement("div", {
    className: "ig-modal-head"
  }, React.createElement("div", {
    className: "ig-eyebrow"
  }, "Share · Instagram"), React.createElement("h3", null, s.name), React.createElement("p", {
    className: "ig-help"
  }, "A 1080 × 1350 card, ready for an Instagram post or Story.")), React.createElement("div", {
    className: "ig-preview-wrap"
  }, !url && !err && React.createElement("div", {
    className: "ig-loading"
  }, "Composing image…"), err && React.createElement("div", {
    className: "ig-loading"
  }, "Couldn't load the studio screenshot. Try again, or use one of the other share options."), url && React.createElement("img", {
    src: url,
    alt: "Studio share preview",
    className: "ig-preview"
  })), React.createElement("div", {
    className: "ig-actions"
  }, canShareFiles && React.createElement("button", {
    className: "share-btn ig-primary",
    onClick: shareNative,
    disabled: !blob
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    "aria-hidden": "true"
  }, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  })), React.createElement("span", null, "Share to Instagram")), React.createElement("button", {
    className: "share-btn",
    onClick: download,
    disabled: !blob
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M12 4v12"
  }), React.createElement("path", {
    d: "M7 11l5 5 5-5"
  }), React.createElement("path", {
    d: "M5 20h14"
  })), React.createElement("span", null, shared || "Download image"))), !canShareFiles && React.createElement("p", {
    className: "ig-help-foot"
  }, "Instagram doesn't accept direct web uploads. Save the image and post it from the Instagram app on your phone.")));
}
Object.assign(window, {
  IGShareModal,
  buildStudioImage
});
})();
;
/* dist/submit_view.js */
(function(){
"use strict";
const { useState: useSubSt } = React;
function SubmitView() {
  const [form, setForm] = useSubSt({
    name: "",
    url: "",
    ig: "",
    categories: [],
    otherCategory: "",
    city: "",
    country: "",
    founded: "",
    size: "",
    description: "",
    submitterName: "",
    submitterEmail: "",
    relation: "own",
    notes: ""
  });
  const [sent, setSent] = useSubSt(false);
  const [sending, setSending] = useSubSt(false);
  const [failedMailto, setFailedMailto] = useSubSt(null);
  const [hp, setHp] = useSubSt("");
  const [catError, setCatError] = useSubSt(false);
  const [errMsg, setErrMsg] = useSubSt(null);
  const EDITOR_EMAIL = "wencesanz@gmail.com";
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdylwvg";
  const d = window.SITE;
  const cats = (d.categoriesOrder || []).filter((c) => d.byCat?.[c]);
  function upd(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function resolvedCats() {
    const cats2 = [...form.categories];
    if (cats2.includes("__other") && form.otherCategory) {
      cats2.splice(cats2.indexOf("__other"), 1, form.otherCategory);
    } else if (cats2.includes("__other")) {
      cats2.splice(cats2.indexOf("__other"), 1);
    }
    return cats2.join(", ");
  }
  function relationLabel() {
    return form.relation === "own" ? "It's my studio or my own work" : form.relation === "work" ? "I work there" : "Just a fan / reader";
  }
  function buildMailto() {
    const lines = [
      `Studio name: ${form.name}`,
      `Website: ${form.url}`,
      `Instagram: ${form.ig || "—"}`,
      `Disciplines: ${resolvedCats() || "—"}`,
      `City: ${form.city || "—"}`,
      `Country: ${form.country || "—"}`,
      `Founded: ${form.founded || "—"}`,
      `Team size: ${form.size || "—"}`,
      ``,
      `Description:`,
      `${form.description || "—"}`,
      ``,
      `— About the submitter —`,
      `Name: ${form.submitterName || "—"}`,
      `Email: ${form.submitterEmail || "—"}`,
      `Relation: ${relationLabel()}`,
      ``,
      `Notes to editor:`,
      `${form.notes || "—"}`
    ];
    const subject = `Studio submission — ${form.name || "(untitled)"}`;
    return `mailto:${EDITOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    if (form.categories.filter((c) => c !== "__other" || form.otherCategory).length === 0) {
      setCatError(true);
      return;
    }
    setCatError(false);
    setSending(true);
    setFailedMailto(null);
    setErrMsg(null);
    if (hp) {
      setSending(false);
      setSent(true);
      return;
    }
    const payload = {
      _subject: `Studio submission — ${form.name || "(untitled)"}`,
      _replyto: form.submitterEmail,
      "Studio name": form.name,
      "Website": form.url,
      "Instagram": form.ig || "—",
      "Disciplines": resolvedCats() || "—",
      "City": form.city || "—",
      "Country": form.country || "—",
      "Founded": form.founded || "—",
      "Team size": form.size || "—",
      "Description": form.description || "—",
      "Submitted by": form.submitterName || "—",
      "Email": form.submitterEmail || "—",
      "Relation": relationLabel(),
      "Notes to editor": form.notes || "—"
    };
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.errors && data.errors.map((x) => x.message).join(", ") || `Request failed (${res.status})`);
      }
      setSent(true);
    } catch (err) {
      console.error("submit failed", err);
      setErrMsg(err.message);
      setFailedMailto(buildMailto());
    } finally {
      setSending(false);
    }
  }
  if (sent) {
    return React.createElement("div", { className: "view wrap" }, React.createElement("section", { className: "masthead masthead--tight" }, React.createElement(Eyebrow, null, React.createElement("span", null, "Submit")), React.createElement("h1", { style: { marginTop: 20 } }, "Received. Thank you."), React.createElement("p", { className: "sub", style: { maxWidth: "60ch" } }, "Your submission is in the editor's queue. Every entry is read by hand — expect no acknowledgement email, but do expect the studio to be researched. If I have questions I'll write to the address you left."), React.createElement("p", { className: "sub", style: { marginTop: 24 } }, React.createElement("a", { className: "link", onClick: () => setSent(false) }, "← Submit another"))));
  }
  return React.createElement("div", { className: "view wrap" }, React.createElement("section", { className: "masthead masthead--tight" }, React.createElement(Eyebrow, null, React.createElement("span", null, "Submit")), React.createElement("h1", { style: { marginTop: 20 } }, "Suggest a ", React.createElement("em", null, "studio"), " or ", React.createElement("em", null, "designer"), "."), React.createElement("p", { className: "sub", style: { maxWidth: "62ch" } }, "Just a Design List (JaDL) is a hand-edited list. Entries are read, researched and added when they fit. If you run a studio or work independently, know someone worth including, or spotted a mistake, fill this in.")), React.createElement("form", { className: "submit-form", onSubmit: handleSubmit }, React.createElement("fieldset", null, React.createElement("legend", null, "Studio"), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-name" }, "Studio or designer name ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-name", required: true, value: form.name, onChange: (e) => upd("name", e.target.value), placeholder: "e.g. Atelier Dyakova" }), window.JadlDupHint ? React.createElement(window.JadlDupHint, { name: form.name, url: form.url }) : null), React.createElement("div", { className: "two" }, React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-url" }, "Website ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-url", required: true, type: "url", value: form.url, onChange: (e) => upd("url", e.target.value), placeholder: "https://…" })), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-ig" }, "Instagram"), React.createElement("input", { id: "sf-ig", type: "url", value: form.ig, onChange: (e) => upd("ig", e.target.value), placeholder: "https://instagram.com/handle" }))), React.createElement("div", { className: "fld" }, React.createElement("label", null, "Disciplines ", React.createElement("span", { className: "req" }, "*"), " ", React.createElement("span", { style: { color: "var(--mute)", fontWeight: 400 } }, "— select one or more")), React.createElement("div", { className: "chip-grid" }, cats.map((c) => {
    const on = form.categories.includes(c);
    return React.createElement("label", { key: c, className: `chip-check ${on ? "on" : ""}` }, React.createElement(
      "input",
      {
        type: "checkbox",
        checked: on,
        onChange: (e) => {
          setForm((f) => ({
            ...f,
            categories: e.target.checked ? [...f.categories, c] : f.categories.filter((x) => x !== c)
          }));
        }
      }
    ), React.createElement("span", null, c));
  }), React.createElement("label", { className: `chip-check ${form.categories.includes("__other") ? "on" : ""}` }, React.createElement(
    "input",
    {
      type: "checkbox",
      checked: form.categories.includes("__other"),
      onChange: (e) => {
        setForm((f) => ({
          ...f,
          categories: e.target.checked ? [...f.categories, "__other"] : f.categories.filter((x) => x !== "__other")
        }));
      }
    }
  ), React.createElement("span", null, "Other…"))), catError && React.createElement("p", { className: "fld-err" }, "Select at least one discipline.")), form.categories.includes("__other") && React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-otherCategory" }, "Other discipline"), React.createElement("input", { id: "sf-otherCategory", value: form.otherCategory, onChange: (e) => upd("otherCategory", e.target.value), placeholder: "Name the discipline" })), React.createElement("div", { className: "two" }, React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-city" }, "City ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-city", required: true, value: form.city, onChange: (e) => upd("city", e.target.value), placeholder: "e.g. Madrid" })), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-country" }, "Country ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-country", required: true, value: form.country, onChange: (e) => upd("country", e.target.value), placeholder: "e.g. Spain" }))), React.createElement("div", { className: "two" }, React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-founded" }, "Founded (year)"), React.createElement("input", { id: "sf-founded", value: form.founded, onChange: (e) => upd("founded", e.target.value), placeholder: "e.g. 2019" })), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-size" }, "Team size"), React.createElement("input", { id: "sf-size", value: form.size, onChange: (e) => upd("size", e.target.value), placeholder: "e.g. 4" }))), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-description" }, "Short description"), React.createElement("textarea", { id: "sf-description", rows: 4, value: form.description, onChange: (e) => upd("description", e.target.value), placeholder: "One or two sentences — what they do, why it's worth including." }))), React.createElement("fieldset", null, React.createElement("legend", null, "About you"), React.createElement("div", { className: "two" }, React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-submitterName" }, "Your name ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-submitterName", required: true, value: form.submitterName, onChange: (e) => upd("submitterName", e.target.value) })), React.createElement("div", { className: "fld" }, React.createElement("label", { htmlFor: "sf-submitterEmail" }, "Your email ", React.createElement("span", { className: "req" }, "*")), React.createElement("input", { id: "sf-submitterEmail", required: true, type: "email", value: form.submitterEmail, onChange: (e) => upd("submitterEmail", e.target.value), placeholder: "you@domain.com" }))), React.createElement("div", { className: "fld" }, React.createElement("label", null, "Your relation to it"), React.createElement("div", { className: "radio-row" }, [
    ["own", "It's my studio or my own work"],
    ["work", "I work there"],
    ["fan", "Just a fan / reader"]
  ].map(([v, lbl]) => React.createElement("label", { key: v, className: "radio" }, React.createElement("input", { type: "radio", name: "relation", value: v, checked: form.relation === v, onChange: (e) => upd("relation", e.target.value) }), React.createElement("span", null, lbl))))), React.createElement("div", { className: "fld" }, React.createElement("label", null, "Notes to editor (optional)"), React.createElement("textarea", { rows: 3, value: form.notes, onChange: (e) => upd("notes", e.target.value), placeholder: "Anything else — links to specific work, press, reasons to include…" }))), React.createElement("div", { style: { position: "absolute", left: "-9999px", top: "auto" }, "aria-hidden": "true" }, React.createElement("label", null, "Leave this field empty"), React.createElement("input", { tabIndex: -1, autoComplete: "off", value: hp, onChange: (e) => setHp(e.target.value) })), React.createElement("div", { className: "submit-row" }, React.createElement("button", { type: "submit", className: "submit-btn", disabled: sending }, sending ? "Sending…" : "Send submission", " ", React.createElement("span", { className: "arr" }, "→")), failedMailto && React.createElement("p", { style: { color: "var(--accent-text, var(--accent))", fontSize: 13, marginTop: 12, maxWidth: "62ch" } }, errMsg ? `Couldn't send automatically (${errMsg}).` : "Something went wrong sending this automatically.", " ", React.createElement("a", { className: "link", href: failedMailto }, "Send it by email instead"), " — the message is already written for you."), React.createElement("p", { style: { color: "var(--mute)", fontSize: 13, marginTop: 12, maxWidth: "62ch" } }, "Submissions go straight to the editor's queue. Prefer email? Write to", " ", React.createElement("a", { className: "link", href: `mailto:${EDITOR_EMAIL}` }, EDITOR_EMAIL), "."))));
}
Object.assign(window, { SubmitView });
})();
;
/* dist/tweaks.js */
(function(){
"use strict";
const {
  useState: useTwState,
  useEffect: useTwEffect
} = React;
const TWEAK_DEFAULTS = {
  "palette": "mono",
  "density": "default",
  "accent": "on",
  "type": "sans",
  "motion": "on"
};
function Tweaks() {
  const [open, setOpen] = useTwState(false);
  const [vals, setVals] = useTwState(TWEAK_DEFAULTS);
  useTwEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "__activate_edit_mode") setOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setOpen(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({
      type: "__edit_mode_available"
    }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);
  useTwEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", vals.palette || "mono");
    if (vals.density === "default" || !vals.density) root.removeAttribute("data-density");
    else root.setAttribute("data-density", vals.density);
    if (vals.accent === "off") root.setAttribute("data-accent", "off");
    else root.removeAttribute("data-accent");
    if (vals.motion === "off") root.setAttribute("data-listfx", "off");
    else root.removeAttribute("data-listfx");
    root.setAttribute("data-type", vals.type || "sans");
  }, [vals]);
  function set(k, v) {
    const next = {
      ...vals,
      [k]: v
    };
    setVals(next);
    window.parent.postMessage({
      type: "__edit_mode_set_keys",
      edits: {
        [k]: v
      }
    }, "*");
  }
  if (!open) return null;
  const seg = (k, options) => React.createElement("div", {
    className: "seg"
  }, options.map((o) => React.createElement("button", {
    key: o,
    "data-on": vals[k] === o,
    onClick: () => set(k, o)
  }, o)));
  return React.createElement("div", {
    className: "tweaks"
  }, React.createElement("button", {
    className: "close",
    onClick: () => setOpen(false)
  }, "×"), React.createElement("h5", null, "Tweaks"), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Palette"), seg("palette", ["mono", "paper", "cool"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Type"), seg("type", ["sans", "serif"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Density"), seg("density", ["compact", "default", "roomy"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Accent"), seg("accent", ["on", "off"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "List motion"), seg("motion", ["on", "off"])));
}
Object.assign(window, {
  Tweaks
});
})();
;
/* dist/favorites.js */
(function(){
"use strict";
const {
  useState: useSavedState,
  useEffect: useSavedEffect
} = React;
const SAVED_KEY = "tsi_saved";
const SavedStore = (() => {
  const listeners = /* @__PURE__ */ new Set();
  let items = load();
  function load() {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : parsed && parsed.items;
      return Array.isArray(arr) ? arr.filter((x) => x && x.slug).map((x) => ({
        slug: x.slug,
        name: x.name || "",
        at: x.at || 0
      })) : [];
    } catch (e) {
      return [];
    }
  }
  function persist() {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify({
        v: 1,
        items
      }));
    } catch (e) {
    }
  }
  function emit() {
    listeners.forEach((fn) => {
      try {
        fn(items);
      } catch (e) {
      }
    });
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === SAVED_KEY) {
        items = load();
        emit();
      }
    });
  }
  return {
    get() {
      return items.slice();
    },
    has(slug) {
      return items.some((x) => x.slug === slug);
    },
    count() {
      return items.length;
    },
    toggle(slug, name) {
      if (!slug) return;
      if (this.has(slug)) items = items.filter((x) => x.slug !== slug);
      else items = [{
        slug,
        name: name || "",
        at: Date.now()
      }, ...items];
      persist();
      emit();
    },
    remove(slug) {
      items = items.filter((x) => x.slug !== slug);
      persist();
      emit();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
})();
function useSaved() {
  const [, force] = useSavedState(0);
  useSavedEffect(() => SavedStore.subscribe(() => force((n) => n + 1)), []);
  return SavedStore;
}
function savedSlugify(s) {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function SaveButton({
  studio
}) {
  const store = useSaved();
  if (!studio) return null;
  const slug = window.studioSlug ? window.studioSlug(studio) : savedSlugify(studio.name);
  const saved = store.has(slug);
  return React.createElement("button", {
    className: `save-btn ${saved ? "is-saved" : ""}`,
    onClick: () => store.toggle(slug, studio.name),
    "aria-pressed": saved,
    title: saved ? "Remove from My List" : "Save to My List"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: saved ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
  })), React.createElement("span", null, saved ? "Saved" : "Save"));
}
function MyListView({
  go,
  shared
}) {
  if (shared && window.SharedListView) return React.createElement(window.SharedListView, { go, shared });
  return React.createElement(MyListOwn, { go });
}
function MyListOwn({
  go
}) {
  const store = useSaved();
  const all = window.SITE && window.SITE.studios || [];
  const bySlug = React.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    all.forEach((s) => m.set(window.studioSlug ? window.studioSlug(s) : savedSlugify(s.name), s));
    return m;
  }, [all]);
  const rows = store.get().map((it) => ({
    it,
    s: bySlug.get(it.slug)
  })).filter((r) => r.s);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, "Saved")), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, "My List")), React.createElement("dl", {
    className: "meta"
  }, React.createElement("dt", null, "Saved"), React.createElement("dd", null, rows.length, " ", rows.length === 1 ? "studio" : "studios"), React.createElement("dt", null, "Storage"), React.createElement("dd", null, "This browser only"))), rows.length === 0 ? React.createElement("div", {
    className: "mylist-empty"
  }, React.createElement("p", {
    className: "lead"
  }, "Nothing saved yet."), React.createElement("p", {
    className: "sub"
  }, "Open any studio and tap ", React.createElement("em", null, "Save"), " to keep it here. Your list lives in this browser — no account needed."), React.createElement("button", {
    onClick: () => go("studios"),
    className: "back-btn",
    style: {
      marginTop: 8
    }
  }, React.createElement("span", {
    className: "arr"
  }, "→"), React.createElement("span", null, "Browse the studios"))) : React.createElement(React.Fragment, null, window.ShareListButton ? React.createElement(window.ShareListButton, { slugs: rows.map((r) => r.it.slug) }) : null, React.createElement("div", {
    className: "st-list",
    style: {
      marginTop: 8
    }
  }, rows.map(({
    it,
    s
  }) => React.createElement("div", {
    key: it.slug,
    className: "studio-row mylist-row",
    onClick: () => go("studio", {
      name: s.name
    })
  }, React.createElement("div", {
    className: "t"
  }, window.RegionDot ? React.createElement(window.RegionDot, { country: s.country }) : null, s.name), React.createElement("div", {
    className: "c"
  }, window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", ")), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), React.createElement("button", {
    className: "mylist-remove",
    onClick: (e) => {
      e.stopPropagation();
      store.remove(it.slug);
    },
    "aria-label": `Remove ${s.name} from My List`,
    title: "Remove"
  }, "×"))))));
}
Object.assign(window, {
  SavedStore,
  useSaved,
  SaveButton,
  MyListView
});
})();
;
/* dist/random.js */
(function(){
"use strict";
let lastRandomName = null;
function pickRandomStudio(excludeName) {
  const all = window.SITE && window.SITE.studios || [];
  if (!all.length) return null;
  let pool = all.filter((s) => s.name !== excludeName && s.name !== lastRandomName);
  if (!pool.length) pool = all.filter((s) => s.name !== excludeName);
  if (!pool.length) pool = all;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  lastRandomName = pick.name;
  return pick;
}
function RandomKbd() {
  return React.createElement("kbd", {
    className: "random-kbd",
    "aria-hidden": "true"
  }, "R");
}
function RandomCTA({
  go
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    const s = pickRandomStudio(null);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("section", {
    className: "wrap"
  }, React.createElement("div", {
    className: "random-cta"
  }, React.createElement("div", {
    className: "random-cta-copy"
  }, React.createElement("div", {
    className: "random-cta-lead"
  }, "Not sure where to start?"), React.createElement("div", {
    className: "random-cta-sub"
  }, "Let the index choose for you.")), React.createElement("button", {
    className: "random-cta-btn",
    onClick: open,
    onMouseEnter: () => setSpin(true),
    onAnimationEnd: () => setSpin(false)
  }, React.createElement("span", null, "Open a random studio"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    "aria-hidden": "true"
  }, "⤳"), React.createElement(RandomKbd, null))));
}
function RandomButton({
  go,
  currentName
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    setSpin(true);
    const s = pickRandomStudio(currentName);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("button", {
    className: "random-btn",
    onClick: open,
    title: "Jump to a random studio (press R)"
  }, React.createElement("span", null, "Random"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    onAnimationEnd: () => setSpin(false),
    "aria-hidden": "true"
  }, "⤳"), React.createElement(RandomKbd, null));
}
Object.assign(window, {
  pickRandomStudio,
  RandomCTA,
  RandomButton,
  RandomInline
});
function RandomInline({
  go
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    setSpin(true);
    const s = pickRandomStudio(null);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("button", {
    className: "random-inline",
    onClick: open
  }, React.createElement("span", null, "Open a random studio"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    onAnimationEnd: () => setSpin(false),
    "aria-hidden": "true"
  }, "⤳"), React.createElement(RandomKbd, null));
}
})();
;
/* dist/todays_pick.js */
(function(){
"use strict";
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function pickStudioForDate(studios, date) {
  const list = studios || [];
  const N = list.length;
  if (N === 0) return null;
  if (N === 1) return list[0];
  const d = date || /* @__PURE__ */ new Date();
  const dayNumber = Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 864e5);
  const cycle = Math.floor(dayNumber / N);
  const pos = (dayNumber % N + N) % N;
  const order = Array.from({
    length: N
  }, (_, i) => i);
  const rand = mulberry32(cycle + 1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return list[order[pos]];
}
function TodaysPick({
  go
}) {
  const studios = window.SITE && window.SITE.studios || [];
  const pick = React.useMemo(() => pickStudioForDate(studios, /* @__PURE__ */ new Date()), [studios.length]);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  if (!pick) return null;
  const loc = window.jadlPlace ? window.jadlPlace(pick, "full") : [pick.city, pick.country].filter(Boolean).join(", ");
  const host = (pick.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  const shot = window.jadlShot ? window.jadlShot(pick, 520, 400) : pick.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pick.url)}?w=520&h=400` : null;
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const open = () => go("studio", {
    name: pick.name
  });
  return React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 28
    }
  }, React.createElement("div", {
    className: "pick-card",
    onClick: open,
    role: "link",
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === "Enter") open();
    }
  }, React.createElement("div", {
    className: "pick-body"
  }, React.createElement("div", {
    className: "pick-eyebrow"
  }, React.createElement("span", {
    className: "pick-dot",
    "aria-hidden": "true"
  }), "Today’s Discovery", React.createElement("span", {
    className: "pick-date"
  }, today)), React.createElement("div", {
    className: "pick-name"
  }, pick.name), loc && React.createElement("div", {
    className: "pick-loc"
  }, loc), React.createElement("div", {
    className: "pick-cta"
  }, React.createElement("span", {
    className: "arr"
  }, "→"), " View studio")), shot && !failed && React.createElement("div", {
    className: "pick-thumb"
  }, React.createElement("img", {
    src: shot,
    alt: "",
    loading: "lazy",
    onLoad: (e) => {
      if (e.target.naturalWidth > 100) setLoaded(true);
      else setFailed(true);
    },
    onError: () => setFailed(true),
    style: {
      opacity: loaded ? 1 : 0
    }
  }), host && React.createElement("span", {
    className: "pick-host"
  }, host, " ", window.jadlArrowNE ? window.jadlArrowNE() : "↗︎"))));
}
Object.assign(window, {
  pickStudioForDate,
  TodaysPick
});
})();
;
/* dist/recently_viewed.js */
(function(){
"use strict";
const RV_KEY = "jadl:recentlyViewed";
const RV_MAX = 10;
const RV_EVENT = "jadl:rv-change";
function readRV() {
  try {
    const raw = localStorage.getItem(RV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function recordVisit(name) {
  if (!name) return;
  try {
    const cur = readRV();
    if (cur[0] === name) return;
    const next = [name, ...cur.filter((n) => n !== name)].slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(RV_EVENT));
  } catch {
  }
}
function useRecentlyViewed(excludeName) {
  const [names, setNames] = React.useState(readRV);
  React.useEffect(() => {
    const sync = () => setNames(readRV());
    window.addEventListener(RV_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(RV_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return React.useMemo(() => {
    const all = window.SITE && window.SITE.studios || [];
    const byName = new Map(all.map((s) => [s.name, s]));
    return names.filter((n) => n !== excludeName && byName.has(n)).map((n) => byName.get(n));
  }, [names, excludeName]);
}
function RVChips({
  items,
  go,
  limit
}) {
  return React.createElement("div", {
    className: "rv-list"
  }, items.slice(0, limit).map((s) => React.createElement("button", {
    key: s.name,
    className: "rv-chip",
    onClick: () => go("studio", {
      name: s.name
    })
  }, React.createElement("span", {
    className: "rv-name"
  }, s.name), (s.city || s.country) && React.createElement("span", {
    className: "rv-loc"
  }, window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", ")))));
}
function RecentlyViewed({
  go
}) {
  const items = useRecentlyViewed();
  if (items.length === 0) return null;
  return React.createElement("section", {
    className: "wrap rv-section"
  }, React.createElement("div", {
    className: "rv-head"
  }, React.createElement("span", {
    className: "rv-eyebrow"
  }, "Recently viewed")), React.createElement(RVChips, {
    items,
    go,
    limit: 6
  }));
}
function RecentlyViewedInline({
  go,
  excludeName
}) {
  const items = useRecentlyViewed(excludeName);
  if (items.length === 0) return null;
  return React.createElement("div", {
    className: "rv-inline"
  }, React.createElement("span", {
    className: "rv-eyebrow"
  }, "Recently viewed"), React.createElement(RVChips, {
    items,
    go,
    limit: 5
  }));
}
Object.assign(window, {
  recordVisit,
  useRecentlyViewed,
  RecentlyViewed,
  RecentlyViewedInline
});
})();
;
/* dist/collections.js */
(function(){
"use strict";
const {
  useMemo: useCollMm,
  useState: useCollSt
} = React;
function collSlugify(s) {
  return String(s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const COLLECTION_KINDS = {
  discipline: {
    singular: "discipline",
    plural: "disciplines",
    field: "category",
    index: "byCat",
    label: "Discipline",
    labelPlural: "Disciplines"
  },
  country: {
    singular: "country",
    plural: "countries",
    field: "country",
    index: "byCountry",
    label: "Country",
    labelPlural: "Countries"
  },
  city: {
    singular: "city",
    plural: "cities",
    field: "city",
    index: "byCity",
    label: "City",
    labelPlural: "Cities"
  },
  region: {
    singular: "region",
    plural: "regions",
    field: "region",
    index: "byRegion",
    label: "Region",
    labelPlural: "Regions"
  }
};
const REGION_PLACE = { "UK & Ireland": "the UK & Ireland", "Nordics": "the Nordic countries", "Rest of Europe": "the rest of Europe", "Rest of the world": "the rest of the world" };
function collValues(kind) {
  const d = window.SITE || {};
  const idx = d[COLLECTION_KINDS[kind].index] || {};
  return Object.keys(idx);
}
const _slugMaps = {};
function collSlugToValue(kind, slug) {
  const values = collValues(kind);
  if (!_slugMaps[kind] || !_slugMaps[kind].__n) {
    if (values.length) {
      const m = {
        __n: values.length
      };
      for (const v of values) m[collSlugify(v)] = v;
      _slugMaps[kind] = m;
    }
  }
  return _slugMaps[kind] && _slugMaps[kind][slug] || null;
}
function collStudiosFor(kind, value) {
  const field = COLLECTION_KINDS[kind].field;
  const all = window.SITE && window.SITE.studios || [];
  return all.filter((s) => String(s[field] || "").split(",").map((x) => x.trim()).includes(value));
}
function collCopy(kind, value, n) {
  const plural = n === 1 ? "studio" : "studios";
  if (kind === "discipline") {
    const low = value.toLowerCase();
    return {
      h1: value,
      title: `${value} design studios · Just a Design List`,
      desc: `${n} independent ${plural} and designers working in ${low}, collected in the Just a Design List index. Browse by country and city.`
    };
  }
  if (kind === "region") {
    const place = REGION_PLACE[value] || value;
    return {
      h1: value,
      title: `Design studios in ${place} · Just a Design List`,
      desc: `${n} independent design ${plural} and designers based in ${place}, from the Just a Design List index. Browse by country, city and discipline.`
    };
  }
  if (kind === "country") {
    return {
      h1: value,
      title: `Design studios in ${value} · Just a Design List`,
      desc: `${n} independent design ${plural} and practices based in ${value}. A curated index — browse by city and discipline.`
    };
  }
  return {
    h1: value,
    title: `Design studios in ${value} · Just a Design List`,
    desc: `${n} independent design ${plural} based in ${value}, from the Just a Design List index. Browse by discipline.`
  };
}
function CollChips({
  items,
  onPick
}) {
  if (!items.length) return null;
  return React.createElement("div", {
    className: "chips",
    style: {
      marginTop: 12
    }
  }, items.map(([label, n, go]) => React.createElement("button", {
    key: label,
    onClick: go
  }, label, n != null ? React.createElement("span", {
    className: "num"
  }, " ", n) : null)));
}
function CollStudioList({
  studios,
  go
}) {
  const [limit, setLimit] = useCollSt(60);
  const shown = studios.slice(0, limit);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "st-list",
    style: {
      marginTop: 24
    }
  }, shown.map((s) => React.createElement("a", {
    key: s.name,
    className: "studio-row",
    ...window.jadlStudioLink ? window.jadlStudioLink(s, () => go("studio", { name: s.name })) : { onClick: () => go("studio", { name: s.name }) }
  }, React.createElement("div", {
    className: "t"
  }, window.RegionDot ? React.createElement(window.RegionDot, { country: s.country }) : null, s.name), React.createElement("div", {
    className: "c"
  }, window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", ")), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), React.createElement("div", {
    className: "arr"
  }, "→")))), studios.length > limit && React.createElement("button", {
    onClick: () => setLimit((n) => n + 120),
    className: "link",
    style: {
      marginTop: 28,
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--accent-text, var(--accent))"
    }
  }, "Show more — ", studios.length - limit, " remaining"));
}
function CollectionView({
  kind,
  value,
  go
}) {
  const d = window.SITE || {};
  const cfg = COLLECTION_KINDS[kind];
  const studios = useCollMm(() => collStudiosFor(kind, value).sort((a, b) => (a.name || "").localeCompare(b.name || "")), [kind, value]);
  const facets = useCollMm(() => {
    const disc = {}, countries = {}, cities = {};
    for (const s of studios) {
      s.category.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => disc[c] = (disc[c] || 0) + 1);
      s.country.split(",").map((x) => x.trim()).filter(Boolean).slice(0, kind === "region" ? 1 : 99).forEach((c) => countries[c] = (countries[c] || 0) + 1);
      s.city.split(",").map((x) => x.trim()).filter(Boolean).slice(0, kind === "region" ? 1 : 99).forEach((c) => cities[c] = (cities[c] || 0) + 1);
    }
    const rank = (obj, exclude) => Object.entries(obj).filter(([k]) => k !== exclude).sort((a, b) => b[1] - a[1]);
    return {
      disc: rank(disc, kind === "discipline" ? value : null),
      countries: rank(countries, kind === "country" ? value : null),
      cities: rank(cities, kind === "city" ? value : null)
    };
  }, [studios, kind, value]);
  if (!value) {
    return React.createElement("div", {
      className: "view wrap",
      style: {
        paddingTop: 120
      }
    }, React.createElement("p", {
      style: {
        fontFamily: "var(--serif)",
        fontSize: 32
      }
    }, "Collection not found."), React.createElement("button", {
      onClick: () => go("index"),
      className: "link",
      style: {
        fontFamily: "var(--mono)",
        fontSize: 12
      }
    }, "← Back to the index"));
  }
  const copy = collCopy(kind, value, studios.length);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-topbar"
  }, React.createElement("button", {
    onClick: () => go("collectionHub", {
      kind: cfg.plural
    }),
    className: "back-btn",
    "aria-label": `All ${cfg.labelPlural}`
  }, React.createElement("span", {
    className: "arr"
  }, "←"), React.createElement("span", null, "All ", cfg.labelPlural.toLowerCase()))), React.createElement("div", {
    className: "pd-head",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, cfg.label)), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, copy.h1), React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 640,
      color: "var(--ink-2)",
      fontFamily: "var(--serif)",
      fontSize: 20,
      lineHeight: 1.5
    }
  }, studios.length, " design ", studios.length === 1 ? "studio" : "studios", kind === "city" || kind === "country" || kind === "region" ? " based here" : " in the index", "."))), React.createElement("div", {
    className: "coll-facets"
  }, kind !== "discipline" && facets.disc.length > 0 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By discipline"), React.createElement(CollChips, {
    items: facets.disc.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "discipline",
      value: c
    })])
  })), kind !== "country" && facets.countries.length > 1 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By country"), React.createElement(CollChips, {
    items: facets.countries.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "country",
      value: c
    })])
  })), kind !== "city" && facets.cities.length > 1 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By city"), React.createElement(CollChips, {
    items: facets.cities.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "city",
      value: c
    })])
  }))), React.createElement("div", {
    style: {
      paddingTop: 40
    }
  }, React.createElement(Eyebrow, null, React.createElement("span", null, "The studios")), React.createElement(CollStudioList, {
    studios,
    go
  })));
}
function CollectionHubView({
  kind,
  go
}) {
  const singular = Object.keys(COLLECTION_KINDS).find((k) => COLLECTION_KINDS[k].plural === kind) || "discipline";
  const cfg = COLLECTION_KINDS[singular];
  const d = window.SITE || {};
  const rows = useCollMm(() => {
    const idx = d[cfg.index] || {};
    return Object.entries(idx).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [kind]);
  const max = rows[0]?.[1] || 1;
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, "Browse")), React.createElement("h2", {
    role: "heading",
    "aria-level": 1,
    style: {
      marginTop: 14
    }
  }, cfg.labelPlural), React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 640,
      color: "var(--ink-2)",
      fontFamily: "var(--serif)",
      fontSize: 20,
      lineHeight: 1.5
    }
  }, rows.length, " ", cfg.labelPlural.toLowerCase(), " represented across the index. Pick one to see its studios."))), React.createElement("div", {
    className: "coll-hub",
    style: {
      borderTop: "1px solid var(--rule)",
      marginTop: 32
    }
  }, rows.map(([value, n], i) => React.createElement("div", {
    key: value,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: singular,
      value
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, value), React.createElement("div", {
    className: "bar"
  }, React.createElement("span", {
    className: "fill",
    style: {
      width: `${Math.max(6, n / max * 100)}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " ", n === 1 ? "studio" : "studios"), React.createElement("div", {
    className: "arr"
  }, "→")))));
}
Object.assign(window, {
  COLLECTION_KINDS,
  collSlugify,
  collSlugToValue,
  collStudiosFor,
  collCopy,
  CollectionView,
  CollectionHubView
});
})();
;
/* dist/app.js */
(function(){
"use strict";
const {
  useState,
  useEffect
} = React;
function slugify(s) {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function studioSlug(s, list) {
  const base = slugify(s && s.name);
  const same = (list || []).filter((x) => x && x.name && slugify(x.name) === base);
  if (same.length < 2) return base;
  same.sort((a, b) => String(a.created || "").localeCompare(String(b.created || "")) || String(a.name).localeCompare(String(b.name)));
  if (same[0].name === s.name) return base;
  const city = slugify(String(s.city || "").split(",")[0]);
  return base + "-" + (city || String(same.findIndex((x) => x.name === s.name) + 1));
}
function findStudioBySlug(slug) {
  const st = window.SITE && window.SITE.studios || [];
  return st.find((s) => studioSlug(s, st) === slug);
}
window.studioSlug = (s) => studioSlug(s, window.SITE && window.SITE.studios || []);
const SITE_BASE = "https://justadesignlist.com";
const DESC_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function studioDesc(s, loc, all) {
  const list = (v) => String(v || "").split(",").map((t) => t.trim()).filter(Boolean);
  const cats = list(s.category).map((c) => c.toLowerCase()).slice(0, 3);
  const what = cats.length ? (cats.length > 1 ? cats.slice(0, -1).join(", ") + " and " + cats[cats.length - 1] : cats[0]) + " practice" : "design practice";
  const city = list(s.city)[0], country = list(s.country)[0];
  const n = (field, v) => all.filter((x) => x && list(x[field]).includes(v)).length;
  let where = "";
  const nc = city ? n("city", city) : 0;
  const nk = country ? n("country", country) : 0;
  if (nc > 1) where = ` One of ${nc} studios from ${city} on Just a Design List`;
  else if (nk > 1) where = ` ${city ? `The only studio from ${city}` : "One"}${city ? ", one of" : " of"} ${nk} from ${country} on Just a Design List`;
  else where = " On Just a Design List";
  const d = s.created ? new Date(s.created) : null;
  const added = d && !isNaN(d) ? `, added in ${DESC_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : "";
  return `${s.name}: ${what}${loc ? " based in " + loc : ""}.${where}${added}.`;
}
function routeToPath(r) {
  if (!r) return "/";
  switch (r.view) {
    case "studio": {
      const st = window.SITE && window.SITE.studios || [];
      const s = st.find((x) => x.name === r.name);
      return `/studio/${s ? studioSlug(s, st) : slugify(r.name || "")}`;
    }
    case "collection": {
      const cfg = (window.COLLECTION_KINDS || {})[r.kind];
      return cfg ? `/${cfg.singular}/${slugify(r.value || "")}` : "/";
    }
    case "collectionHub":
      return `/${r.kind}`;
    case "studios": {
      const f = r.filter || {};
      const qs = new URLSearchParams();
      if (f.cat) qs.set("cat", f.cat);
      if (f.country) qs.set("country", f.country);
      if (f.city) qs.set("city", f.city);
      const q = qs.toString();
      return q ? `/studios?${q}` : "/studios";
    }
    case "geography":
      return "/geography";
    case "categories":
      return "/categories";
    case "list":
      return r.shared ? `/list?s=${r.shared}` : "/list";
    case "submit":
      return "/submit";
    case "about":
      return "/about";
    case "notfound":
      return r.path || "/";
    case "index":
    default:
      return "/";
  }
}
function pathToRoute(pathname, search) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg || seg === "index.html") return {
    view: "index"
  };
  if (seg === "studio" && parts[1]) {
    const s = findStudioBySlug(parts[1]);
    return s ? {
      view: "studio",
      name: s.name
    } : {
      view: "notfound",
      path: pathname
    };
  }
  if (["discipline", "country", "city", "region"].includes(seg) && parts[1]) {
    const value = window.collSlugToValue ? window.collSlugToValue(seg, parts[1]) : null;
    return value ? {
      view: "collection",
      kind: seg,
      value
    } : {
      view: "notfound",
      path: pathname
    };
  }
  if (["disciplines", "countries", "cities", "regions"].includes(seg)) {
    return {
      view: "collectionHub",
      kind: seg
    };
  }
  if (seg === "studios") {
    const qs = new URLSearchParams(search || "");
    const filter = {};
    if (qs.get("cat")) filter.cat = qs.get("cat");
    if (qs.get("country")) filter.country = qs.get("country");
    if (qs.get("city")) filter.city = qs.get("city");
    return {
      view: "studios",
      filter: Object.keys(filter).length ? filter : void 0
    };
  }
  if (seg === "list") {
    const shared = new URLSearchParams(search || "").get("s");
    return shared ? { view: "list", shared } : { view: "list" };
  }
  if (["geography", "categories", "submit", "about", "index"].includes(seg)) {
    return {
      view: seg
    };
  }
  return {
    view: "notfound",
    path: pathname
  };
}
function legacyHashToPath() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (!h) return null;
  const [path, queryStr] = h.split("?");
  const parts = path.split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg) return "/";
  if (seg === "studio" && parts[1]) return `/studio/${parts[1]}`;
  if (["discipline", "country", "city", "region"].includes(seg) && parts[1]) return `/${seg}/${parts[1]}`;
  if (["disciplines", "countries", "cities", "regions"].includes(seg)) return `/${seg}`;
  if (seg === "studios") return queryStr ? `/studios?${queryStr}` : "/studios";
  if (["geography", "categories", "submit", "about", "list"].includes(seg)) return `/${seg}`;
  return "/";
}
function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
function setRobots(content) {
  let el = document.head.querySelector('meta[name="robots"]');
  if (content == null) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setJsonLd(nodes) {
  let el = document.getElementById("route-jsonld");
  if (!nodes || !nodes.length) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "route-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
function breadcrumbLd(pairs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pairs.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item
    }))
  };
}
function collectionLd(name, description, url, studios) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Just a Design List",
      url: SITE_BASE + "/"
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: studios.length,
      itemListElement: studios.slice(0, 100).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_BASE}/studio/${studioSlug(s, studios)}`,
        name: s.name
      }))
    }
  };
}
function studioLd(s, url, desc) {
  const sameAs = [];
  if (s.url) sameAs.push(s.url);
  if (s.ig) {
    const handle = String(s.ig).replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
    if (handle) sameAs.push(`https://www.instagram.com/${handle}/`);
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.name,
    url,
    description: desc
  };
  if (sameAs.length) data.sameAs = sameAs;
  if (s.city || s.country) {
    data.address = {
      "@type": "PostalAddress",
      ...s.city ? { addressLocality: s.city } : {},
      ...s.country ? { addressCountry: s.country } : {}
    };
  }
  return data;
}
function websiteLd(desc) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Just a Design List",
    url: SITE_BASE + "/",
    description: desc
  };
}
function setMeta(route) {
  const d = window.SITE || {};
  let title = "Just a Design List — A curated directory of design practices";
  let desc = "A slow, curated index of design studios and independent designers.";
  if (d.totals && d.totals.studios) desc += ` ${d.totals.studios} entries across ${d.totals.countries} countries.`;
  let image = null;
  let robots = null;
  let jsonld = [];
  const url = SITE_BASE + routeToPath(route);
  if (route.view === "studio") {
    const s = (d.studios || []).find((x) => x.name === route.name);
    if (s) {
      const cat = (s.category || "").split(",")[0].trim();
      const loc = window.jadlPlace ? window.jadlPlace(s, "full") : [s.city, s.country].filter(Boolean).join(", ");
      const loc1 = window.jadlPlace ? window.jadlPlace(s, "primary") : loc;
      title = `${s.name} — ${cat}${loc1 ? ", " + loc1 : ""} · Just a Design List`;
      desc = studioDesc(s, loc1, d.studios || []);
      image = `${SITE_BASE}/api/og?name=${encodeURIComponent(s.name)}&meta=${encodeURIComponent([cat, loc1].filter(Boolean).join(" · ") || "A curated directory of design practices")}&v=2`;
      jsonld = [studioLd(s, url, desc), breadcrumbLd([["Home", SITE_BASE + "/"], ...s.country ? [[s.country.split(",")[0].trim(), SITE_BASE + "/country/" + (window.collSlugify ? window.collSlugify(s.country.split(",")[0].trim()) : "")]] : [["Studios", SITE_BASE + "/studios"]], [s.name, url]])];
    }
  } else if (route.view === "index") {
    jsonld = [websiteLd(desc)];
  } else if (route.view === "studios") {
    const f = route.filter || {};
    if (f.cat) {
      title = `${f.cat} — design studios · Just a Design List`;
      desc = `Design studios and independent practices working in ${f.cat.toLowerCase()}.`;
    } else if (f.country) {
      title = `Design studios in ${f.country} · Just a Design List`;
      desc = `Independent design practices based in ${f.country}.`;
    } else if (f.city) {
      title = `Design studios in ${f.city} · Just a Design List`;
      desc = `Independent design practices based in ${f.city}.`;
    } else {
      title = "All studios · Just a Design List";
      desc = "Browse the full index of design studios and independent designers.";
    }
  } else if (route.view === "geography") {
    title = "Geography · Just a Design List";
    desc = "A world map and country index of where design studios are based.";
  } else if (route.view === "categories") {
    title = "Categories · Just a Design List";
    desc = "Browse design studios and practices by discipline.";
  } else if (route.view === "about") {
    title = "Colophon · Just a Design List";
    desc = "About Just a Design List — a hand-edited index of design practices.";
  } else if (route.view === "submit") {
    title = "Submit a studio or designer · Just a Design List";
    desc = "Suggest a design studio or independent designer for the index.";
  } else if (route.view === "list") {
    title = route.shared ? "A shared list · Just a Design List" : "My List · Just a Design List";
    desc = route.shared ? "A list of design studios shared from Just a Design List." : "Studios you've saved on this browser.";
    if (route.shared) robots = "noindex, follow";
  } else if (route.view === "notfound") {
    title = "Not found · Just a Design List";
    desc = "This page is not on the list.";
    robots = "noindex, follow";
  } else if (route.view === "collectionHub") {
    const cfg = Object.values(window.COLLECTION_KINDS || {}).find((c) => c.plural === route.kind);
    const lp = cfg ? cfg.labelPlural : "Collections";
    title = `Design studios by ${cfg ? cfg.singular : "collection"} · Just a Design List`;
    desc = `Browse the index of design studios by ${cfg ? cfg.singular : "collection"}. Every ${cfg ? cfg.singular : "collection"} represented across the directory.`;
    jsonld = [breadcrumbLd([["Home", SITE_BASE + "/"], [lp, url]])];
  } else if (route.view === "collection") {
    const studios = window.collStudiosFor ? window.collStudiosFor(route.kind, route.value) : [];
    const c = window.collCopy ? window.collCopy(route.kind, route.value, studios.length) : {
      title,
      desc
    };
    title = c.title;
    desc = c.desc;
    if (studios.length < 2) robots = "noindex, follow";
    image = `${SITE_BASE}/api/og?kind=${route.kind}&value=${encodeURIComponent(route.value || "")}&v=1`;
    const cfg = (window.COLLECTION_KINDS || {})[route.kind] || {};
    jsonld = [collectionLd(title, desc, url, studios), breadcrumbLd([["Home", SITE_BASE + "/"], [cfg.labelPlural || "Collections", SITE_BASE + "/" + (cfg.plural || "")], [route.value, url]])];
  }
  document.title = title;
  setRobots(robots);
  setJsonLd(jsonld);
  upsertMeta("name", "description", desc);
  upsertLink("canonical", url);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", desc);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:type", route.view === "studio" ? "article" : "website");
  upsertMeta("property", "og:site_name", "Just a Design List");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", desc);
  upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
  if (image) {
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:image", image);
  }
}
function App() {
  const [ready, setReady] = useState(!!window.SITE?.studios);
  const [route, setRoute] = useState(() => {
    const legacy = legacyHashToPath();
    if (legacy) {
      const [lp, lq] = legacy.split("?");
      window.history.replaceState(null, "", legacy);
      return pathToRoute(lp, lq || "");
    }
    return pathToRoute(window.location.pathname, window.location.search);
  });
  useEffect(() => {
    if (ready) return;
    const p = window.SITE_READY || fetch("studios.json").then((r) => r.json()).then((st) => {
      window.SITE.studios = st;
      return window.SITE;
    });
    Promise.resolve(p).then(() => {
      setRoute(pathToRoute(window.location.pathname, window.location.search));
      setReady(true);
    }).catch((err) => {
      console.error("load failed", err);
      setReady(true);
    });
  }, [ready]);
  useEffect(() => {
    if (!ready) return;
    const desired = routeToPath(route);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.replaceState(null, "", desired);
    }
    setMeta(route);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [ready, route.view, route.name, route.kind, route.value, route.filter?.cat, route.filter?.country, route.filter?.city, route.shared]);
  useEffect(() => {
    const onPop = () => setRoute(pathToRoute(window.location.pathname, window.location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  function go(view, extra = {}) {
    const next = {
      view,
      ...extra
    };
    const desired = routeToPath(next);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.pushState(null, "", desired);
    }
    setRoute(next);
  }
  useEffect(() => {
    if (!ready) return;
    function onKeyDown(e) {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "r" && e.key !== "R") return;
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || e.target && e.target.isContentEditable) return;
      if (!window.pickRandomStudio) return;
      const currentName = route.view === "studio" ? route.name : null;
      const s = window.pickRandomStudio(currentName);
      if (s) go("studio", {
        name: s.name
      });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ready, route.view, route.name]);
  if (!ready) {
    return React.createElement("div", {
      className: "boot"
    }, React.createElement("div", {
      className: "boot-inner"
    }, React.createElement("div", {
      style: {
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--mute)",
        letterSpacing: ".06em",
        textTransform: "uppercase"
      }
    }, "Loading the index…"), React.createElement("div", {
      style: {
        fontFamily: "var(--serif)",
        fontSize: 40,
        marginTop: 12
      }
    }, React.createElement("em", null, "Just a Design List"))));
  }
  let body;
  switch (route.view) {
    case "studios":
      body = React.createElement(StudiosView, {
        go,
        initialFilter: route.filter
      });
      break;
    case "geography":
      body = React.createElement(GeographyView, {
        go
      });
      break;
    case "categories":
      body = React.createElement(CategoriesView, {
        go
      });
      break;
    case "submit":
      body = React.createElement(SubmitView, null);
      break;
    case "about":
      body = React.createElement(AboutView, {
        go
      });
      break;
    case "list":
      body = React.createElement(MyListView, {
        go,
        shared: route.shared
      });
      break;
    case "studio":
      body = React.createElement(StudioDetail, {
        name: route.name,
        go
      });
      break;
    case "collection":
      body = React.createElement(CollectionView, {
        kind: route.kind,
        value: route.value,
        go
      });
      break;
    case "notfound":
      body = React.createElement(NotFoundView, {
        go
      });
      break;
    case "collectionHub":
      body = React.createElement(CollectionHubView, {
        kind: route.kind,
        go
      });
      break;
    default:
      body = React.createElement(IndexView, {
        go
      });
  }
  return React.createElement("div", {
    className: "page",
    "data-screen-label": route.view
  }, window.AnnounceBar ? React.createElement(window.AnnounceBar, null) : null, React.createElement(TopBar, {
    view: route.view,
    go
  }), React.createElement("main", null, body), React.createElement(Footer, {
    go
  }), React.createElement(Tweaks, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
;
