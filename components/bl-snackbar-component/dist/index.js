!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var c=t();for(var a in c)("object"==typeof exports?exports:e)[a]=c[a]}}(self,(()=>(()=>{"use strict";var e={d:(t,c)=>{for(var a in c)e.o(c,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:c[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>s});const c=self.React,a=({className:e,onFunction:t,content:c})=>React.createElement("button",{className:e,onClick:t},c),n=()=>React.createElement("svg",{width:"22px",height:"22px",viewBox:"6 6 24 24",version:"1.1",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",className:"icon"},React.createElement("path",{class:"clr-i-outline clr-i-outline-path-1",d:"M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"}),React.createElement("path",{class:"clr-i-outline clr-i-outline-path-2",d:"M18,20.07a1.3,1.3,0,0,1-1.3-1.3v-6a1.3,1.3,0,1,1,2.6,0v6A1.3,1.3,0,0,1,18,20.07Z"}),React.createElement("circle",{class:"clr-i-outline clr-i-outline-path-3",cx:"17.95",cy:"23.02",r:"1.5"})),r=()=>React.createElement("svg",{className:"icon",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 330 330",xmlSpace:"preserve"},React.createElement("g",null,React.createElement("path",{d:"M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300 c-74.44,0-135-60.561-135-135S90.56,30,165,30s135,60.561,135,135S239.439,300,165,300z"}),React.createElement("path",{d:"M226.872,106.664l-84.854,84.853l-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-0.001 c-5.858,5.858-5.858,15.355,0,21.213l49.496,49.498c2.813,2.813,6.628,4.394,10.606,4.394c0.001,0,0,0,0.001,0 c3.978,0,7.793-1.581,10.606-4.393l95.461-95.459c5.858-5.858,5.858-15.355,0-21.213 C242.227,100.807,232.73,100.806,226.872,106.664z"}))),l=()=>React.createElement("svg",{className:"icon",viewBox:"2 2 20 20",xmlns:"http://www.w3.org/2000/svg"},React.createElement("path",{d:"M11.001 10h2v5h-2zM11 16h2v2h-2z"}),React.createElement("path",{d:"M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"})),o=()=>React.createElement("svg",{version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 330 330",xmlSpace:"preserve",className:"icon"},React.createElement("g",null,React.createElement("path",{d:"M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992 C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008 s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z"}),React.createElement("path",{d:"M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983 C180,136.725,173.284,130.008,165,130.008z"}),React.createElement("path",{d:"M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61 c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61 C172.81,71.61,168.95,70.011,165,70.011z"})));function s({component:e,eventHandlers:t}){const[s,i]=(0,c.useState)(!1),[m,u]=(0,c.useState)("snackbar"),[p,w]=(0,c.useState)(),{snackContent:h,autoHide:d,horizontalPosition:f,verticalPosition:v,type:x,showClose:E,showAction:R,actionContent:g}=e,{onClose:C,onAction:b}=t;(0,c.useEffect)((()=>{e.show&&(i(!0),e.show=!1)}),[e.show]),(0,c.useEffect)((()=>{u(s?e=>`${e} snackbar__show`:e=>e.replace("snackbar__show",""))}),[s]),(0,c.useEffect)((()=>{u((e=>e+(e=>{switch(e.toLowerCase().trim()){case"left":return" left";case"center":return" centerX";default:return" right"}})(f)+(e=>{switch(e.toLowerCase().trim()){case"bottom":return" bottom";case"center":return" centerY";default:return" top"}})(v))),x&&u((e=>`${e} ${x.toLowerCase()}`)),w(((e="")=>{switch(e.toLowerCase().trim()){case"error":return React.createElement(n,null);case"success":return React.createElement(r,null);case"warning":return React.createElement(l,null);case"info":return React.createElement(o,null);default:return}})(x))}),[]),(0,c.useEffect)((()=>{d>0&&s&&setTimeout((()=>{i(!1)}),d)}),[s]);const y=(0,c.useCallback)((()=>{i(!1),C&&C()}),[C]);return React.createElement("div",{className:m},React.createElement("div",{className:"text"},p,h),React.createElement("div",null,R&&React.createElement(a,{className:"action",onFunction:b,content:g}),E&&React.createElement(a,{className:"close",onFunction:y,content:"X"})))}return t})()));