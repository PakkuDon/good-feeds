(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7716:function(e,t,n){Promise.resolve().then(n.bind(n,9285))},9234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let l=n(6927);n(6006);let r=l._(n(6403));function s(e){return{default:(null==e?void 0:e.default)||e}}function a(e,t){let n=r.default,l={loading:e=>{let{error:t,isLoading:n,pastDelay:l}=e;return null}};"function"==typeof e&&(l.loader=e),Object.assign(l,t);let a=l.loader,i=()=>null!=a?a().then(s):Promise.resolve(s(()=>null));return n({...l,loader:i})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2666:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{suspense:function(){return r},NoSSR:function(){return s}}),n(6927),n(6006);let l=n(8131);function r(){let e=Error(l.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=l.NEXT_DYNAMIC_NO_SSR_CODE,e}function s(e){let{children:t}=e;return t}},6403:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let l=n(6927),r=l._(n(6006)),s=n(2666),a=function(e){let t=Object.assign({loader:null,loading:null,ssr:!0},e);function n(e){let n=t.loading,l=r.default.createElement(n,{isLoading:!0,pastDelay:!0,error:null}),a=t.ssr?r.default.Fragment:s.NoSSR,i=t.lazy;return r.default.createElement(r.default.Suspense,{fallback:l},r.default.createElement(a,null,r.default.createElement(i,e)))}return t.lazy=r.default.lazy(t.loader),n.displayName="LoadableComponent",n}},9285:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var l=n(9268),r=n(6006),s=n(9234),a=n.n(s);let i=e=>{let{locations:t}=e,[n,s]=(0,r.useState)("name"),[a,i]=(0,r.useState)([]);return(0,r.useEffect)(()=>{let e=[...t];switch(n){case"id":e.sort((e,t)=>t.id-e.id);break;case"name":e.sort((e,t)=>e.name.toLowerCase().localeCompare(t.name.toLowerCase()));break;case"lastUpdated":e.sort((e,t)=>new Date(t.updatedAt).getTime()-new Date(e.updatedAt).getTime())}i(e)},[t,n]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"pb-4",children:[(0,l.jsx)("label",{htmlFor:"sortOrder",children:"Order results by: "}),(0,l.jsxs)("select",{id:"sortOrder",value:n,onChange:e=>s(e.target.value),className:"bg-gray-800",children:[(0,l.jsx)("option",{value:"name",children:"Name (A-Z)"}),(0,l.jsx)("option",{value:"id",children:"Date added"}),(0,l.jsx)("option",{value:"lastUpdated",children:"Last updated"})]})]}),a.map(e=>(0,l.jsxs)("div",{className:"pb-4 border-b-2",children:[(0,l.jsx)("strong",{children:e.name}),(0,l.jsxs)("div",{className:"text-xs text-gray-300",children:["Listing updated at ",new Date(e.updatedAt).toDateString()]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("b",{children:"Address:"})," ",e.address]}),(0,l.jsx)("p",{children:e.description}),(0,l.jsxs)("p",{children:[(0,l.jsx)("b",{children:"Dietary options:"})," ",e.dietaryOptions.join(", ")||"N/A"]}),(0,l.jsx)("ul",{className:"list-disc list-inside",children:e.links.map(t=>(0,l.jsx)("li",{children:(0,l.jsx)("a",{href:t.url,target:"_blank",className:"text-blue-300 hover:text-blue-500 focus:text-blue-500",children:t.label})},"".concat(e.id,"-").concat(t.label)))})]},"location-".concat(e.id)))]})},o=a()(()=>Promise.all([n.e(326),n.e(421)]).then(n.bind(n,6421)),{loadableGenerated:{webpack:()=>[6421]},loading:()=>(0,l.jsx)("p",{children:"loading..."}),ssr:!1});function d(e){let{restaurants:t,dietaryOptions:n}=e,[s,a]=(0,r.useState)([]),[d,u]=(0,r.useState)("map"),c=e=>{s.includes(e)?a([...s.filter(t=>t!==e)]):a([...s,e])},f=t.filter(e=>s.every(t=>e.dietaryOptions.includes(t)));return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("aside",{className:"main-sidebar px-4",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{className:"rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm",disabled:"map"===d,onClick:()=>u("map"),children:"Show Map"}),(0,l.jsx)("button",{className:"rounded bg-gray-800 hover:bg-gray-600 p-2 font-semibold text-sm",disabled:"list"===d,onClick:()=>u("list"),children:"Show List"})]}),(0,l.jsx)("div",{children:(0,l.jsxs)("span",{children:[f.length," ",1===f.length?"result":"results"]})}),(0,l.jsx)("h2",{className:"font-bold",children:"Filter options"}),(0,l.jsx)("ul",{children:n.map(e=>{let{label:t}=e;return(0,l.jsx)("div",{children:(0,l.jsxs)("label",{children:[(0,l.jsx)("input",{type:"checkbox",checked:s.includes(t),onChange:()=>c(t)})," ",t]})},"option-".concat(t))})})]}),(0,l.jsxs)("main",{className:"main-content",children:["map"===d&&(0,l.jsx)(o,{locations:f}),"list"===d&&(0,l.jsx)(i,{locations:f})]})]})}},3177:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=n(6006),r=Symbol.for("react.element"),s=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function d(e,t,n){var l,s={},d=null,u=null;for(l in void 0!==n&&(d=""+n),void 0!==t.key&&(d=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,l)&&!o.hasOwnProperty(l)&&(s[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===s[l]&&(s[l]=t[l]);return{$$typeof:r,type:e,key:d,ref:u,props:s,_owner:i.current}}t.Fragment=s,t.jsx=d,t.jsxs=d},9268:function(e,t,n){"use strict";e.exports=n(3177)}},function(e){e.O(0,[667,139,744],function(){return e(e.s=7716)}),_N_E=e.O()}]);