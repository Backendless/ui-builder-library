!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var l=t();for(var a in l)("object"==typeof exports?exports:e)[a]=l[a]}}(self,(()=>(()=>{"use strict";var e={n:t=>{var l=t&&t.__esModule?()=>t.default:()=>t;return e.d(l,{a:l}),l},d:(t,l)=>{for(var a in l)e.o(l,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:l[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>n});const l=self.React;var a=e.n(l);const c=({completedSteps:e,currentStep:t,stepIndex:l,step:a,stepperClassName:c})=>{let i=c.titleIcon,s=c.titleText;return l===t&&(i+=" "+c.titleIconActive,s+=" "+c.titleTextActive),React.createElement("div",{className:c.stepTitle},e.includes(l)?React.createElement(React.Fragment,null,React.createElement("svg",{className:c.titleIcon+" "+c.titleIconActive,focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24","data-testid":"CheckCircleIcon"},React.createElement("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"})),React.createElement("span",{className:c.titleText+" "+c.titleTextActive},a)):React.createElement(React.Fragment,null,React.createElement("svg",{className:i,focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24"},React.createElement("circle",{cx:"12",cy:"12",r:"12"}),React.createElement("text",{className:c.titleIconText,x:"12",y:"12","text-anchor":"middle","dominant-baseline":"central"},l+1)),React.createElement("span",{className:s},a)))},i=({completedSteps:e,currentStep:t,stepIndex:l,step:a,stepperClassName:c})=>{let i=c.titleIcon,s=c.titleText;return l===t&&(i+=" "+c.titleIconActive,s+=" "+c.titleTextActive),React.createElement("div",{className:c.stepTitle},e.includes(l)?React.createElement(React.Fragment,null,React.createElement("svg",{className:c.titleIconComplete,focusable:"false","aria-hidden":"true",viewBox:"0 0 24 24","data-testid":"CheckIcon"},React.createElement("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})),React.createElement("span",{className:c.titleText+" "+c.titleTextActive},a)):React.createElement(React.Fragment,null,React.createElement("div",{className:"step-customized-title__icon-mark-container"},React.createElement("div",{className:i})),React.createElement("span",{className:s},a)))},s=({customized:e,completedSteps:t,currentStep:l,steps:a,stepIndex:s,step:n,stepperClassName:p})=>{let r=p.line;return t.includes(s)&&(r+=" "+p.lineActive),React.createElement("div",{className:p.item},e?React.createElement(i,{stepperClassName:p,completedSteps:t,currentStep:l,stepIndex:s,step:n}):React.createElement(c,{stepperClassName:p,completedSteps:t,currentStep:l,stepIndex:s,step:n}),s!==a.length-1&&React.createElement("span",{className:e?r:p.line}))};function n({component:e,eventHandlers:t}){const{stepList:c,display:i,stepperType:n}=e,[p,r]=(0,l.useState)(0),[o,m]=(0,l.useState)([]),d=(e=>{switch(e){case"root":return{stepper:"stepper",item:"stepper__item",stepTitle:"stepper__step-title step-title",line:"stepper__line",titleIcon:"step-title__icon",titleIconActive:"step-title__icon--active",titleIconText:"step-title__icon-text",titleText:"step-title__text",titleTextActive:"step-title__text--active"};case"alternativeLabel":return{stepper:"stepper-alternative-label",item:"stepper-alternative-label__item",stepTitle:"stepper-alternative-label__step-title step-alternative-label-title",line:"stepper-alternative-label__line",titleIcon:"step-title__icon",titleIconActive:"step-title__icon--active",titleIconText:"step-title__icon-text",titleText:"step-alternative-label-title__text",titleTextActive:"step-alternative-label-title__text--active"};case"customized":return{stepper:"stepper",item:"stepper-alternative-label__item",stepTitle:"stepper-alternative-label__step-title step-alternative-label-title",line:"stepper-customized__line",lineActive:"stepper-customized__line--active",titleIcon:"step-customized-title__icon",titleIconActive:"step-customized-title__icon--active",titleIconComplete:"step-customized-title__icon-complete",titleText:"step-alternative-label-title__text",titleTextActive:"step-alternative-label-title__text--active"}}})(n);console.log(n);const u=(0,l.useMemo)((()=>"string"==typeof c?c.split(","):c),[c]);return e.goNextStep=()=>{p!==u.length&&(r((e=>e+1)),m((e=>[...e,p])))},e.goPrevStep=()=>{0!==p&&(r((e=>e-1)),m((e=>e.filter((e=>e!==p-1)))))},e.resetStep=()=>{r(0),m([])},u&&i?a().createElement("div",{className:d.stepper},u.map(((e,t)=>a().createElement(s,{customized:"customized"===n,stepperClassName:d,completedSteps:o,currentStep:p,steps:u,stepIndex:t,step:e})))):null}return t})()));