
; /* Start:"a:4:{s:4:"full";s:73:"/bitrix/components/arturgolubev/search.title/script.min.js?17442686666313";s:6:"source";s:54:"/bitrix/components/arturgolubev/search.title/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function JCTitleSearch(t){var e=this;this.arParams={AJAX_PAGE:t.AJAX_PAGE,CONTAINER_ID:t.CONTAINER_ID,INPUT_ID:t.INPUT_ID,MIN_QUERY_LEN:parseInt(t.MIN_QUERY_LEN)};if(t.WAIT_IMAGE)this.arParams.WAIT_IMAGE=t.WAIT_IMAGE;if(t.MIN_QUERY_LEN<=0)t.MIN_QUERY_LEN=1;this.cache=[];this.cache_key=null;this.startText="";this.running=false;this.currentRow=-1;this.RESULT=null;this.CONTAINER=null;this.INPUT=null;this.WAIT=null;this.ShowResult=function(t){if(BX.type.isString(t)){e.RESULT.innerHTML=t}e.RESULT.style.display=e.RESULT.innerHTML!==""?"block":"none";var s=e.adjustResultNode();var i;var n;var r=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(r){n=BX.findChild(r,{tag:"th"},true)}if(n){var l=BX.pos(r);l.width=l.right-l.left;var a=BX.pos(n);a.width=a.right-a.left;n.style.width=a.width+"px";e.RESULT.style.width=s.width+a.width+"px";e.RESULT.style.left=s.left-a.width-1+"px";if(l.width-a.width>s.width)e.RESULT.style.width=s.width+a.width-1+"px";l=BX.pos(r);i=BX.pos(e.RESULT);if(i.right>l.right){e.RESULT.style.width=l.right-l.left+"px"}}var o;if(r)o=BX.findChild(e.RESULT,{class:"title-search-fader"},true);if(o&&n){i=BX.pos(e.RESULT);o.style.left=i.right-i.left-18+"px";o.style.width=18+"px";o.style.top=0+"px";o.style.height=i.bottom-i.top+"px";o.style.display="block"}};this.onKeyPress=function(t){var s=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(!s)return false;var i;var n=s.rows.length;switch(t){case 27:e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll();return true;case 40:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var r=-1;for(i=0;i<n;i++){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(r==-1)r=i;if(e.currentRow<i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i==n&&e.currentRow!=i)e.currentRow=r;s.rows[e.currentRow].className="title-search-selected";return true;case 38:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var l=-1;for(i=n-1;i>=0;i--){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(l==-1)l=i;if(e.currentRow>i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i<0&&e.currentRow!=i)e.currentRow=l;s.rows[e.currentRow].className="title-search-selected";return true;case 13:if(e.RESULT.style.display=="block"){for(i=0;i<n;i++){if(e.currentRow==i){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){var a=BX.findChild(s.rows[i],{tag:"a"},true);if(a){window.location=a.href;return true}}}}}return false}return false};this.onTimeout=function(){e.onChange(function(){setTimeout(e.onTimeout,500)})};this.onChange=function(t){if(e.running)return;e.running=true;if(e.INPUT.value!=e.oldValue&&e.INPUT.value!=e.startText){e.oldValue=e.INPUT.value;if(e.INPUT.value.length>=e.arParams.MIN_QUERY_LEN){e.cache_key=e.arParams.INPUT_ID+"|"+e.INPUT.value;if(e.cache[e.cache_key]==null){if(e.WAIT){var s=BX.pos(e.INPUT);var i=s.bottom-s.top-2;e.WAIT.style.top=s.top+1+"px";e.WAIT.style.height=i+"px";e.WAIT.style.width=i+"px";e.WAIT.style.left=s.right-i+2+"px";e.WAIT.style.display="block"}BX.ajax.post(e.arParams.AJAX_PAGE,{ajax_call:"y",INPUT_ID:e.arParams.INPUT_ID,q:e.INPUT.value,l:e.arParams.MIN_QUERY_LEN},function(s){e.cache[e.cache_key]=s;e.ShowResult(s);e.currentRow=-1;e.EnableMouseEvents();if(e.WAIT)e.WAIT.style.display="none";if(!!t)t();e.running=false});return}else{e.ShowResult(e.cache[e.cache_key]);e.currentRow=-1;e.EnableMouseEvents()}}else{e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll()}}if(!!t)t();e.running=false};this.onScroll=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.UnSelectAll=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)t.rows[i].className=""}};this.EnableMouseEvents=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)if(!BX.findChild(t.rows[i],{class:"title-search-separator"},true)){t.rows[i].id="row_"+i;t.rows[i].onmouseover=function(t){if(e.currentRow!=this.id.substr(4)){e.UnSelectAll();this.className="title-search-selected";e.currentRow=this.id.substr(4)}};t.rows[i].onmouseout=function(t){this.className="";e.currentRow=-1}}}};this.onFocusLost=function(t){setTimeout(function(){e.RESULT.style.display="none"},250)};this.onFocusGain=function(){if(e.RESULT.innerHTML.length)e.ShowResult()};this.onKeyDown=function(t){if(!t)t=window.event;if(e.RESULT.style.display=="block"){if(e.onKeyPress(t.keyCode))return BX.PreventDefault(t)}};this.adjustResultNode=function(){if(!(BX.type.isElementNode(e.RESULT)&&BX.type.isElementNode(e.CONTAINER))){return{top:0,right:0,bottom:0,left:0,width:0,height:0}}var t=BX.pos(e.CONTAINER);e.RESULT.style.position="absolute";e.RESULT.style.top=t.bottom+2+"px";e.RESULT.style.left=t.left+"px";e.RESULT.style.width=t.width+"px";return t};this._onContainerLayoutChange=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.Init=function(){this.CONTAINER=document.getElementById(this.arParams.CONTAINER_ID);BX.addCustomEvent(this.CONTAINER,"OnNodeLayoutChange",this._onContainerLayoutChange);this.RESULT=document.body.appendChild(document.createElement("DIV"));this.RESULT.className="title-search-result";this.INPUT=document.getElementById(this.arParams.INPUT_ID);this.startText=this.oldValue=this.INPUT.value;BX.bind(this.INPUT,"focus",function(){e.onFocusGain()});BX.bind(this.INPUT,"blur",function(){e.onFocusLost()});this.INPUT.onkeydown=this.onKeyDown;if(this.arParams.WAIT_IMAGE){this.WAIT=document.body.appendChild(document.createElement("DIV"));this.WAIT.style.backgroundImage="url('"+this.arParams.WAIT_IMAGE+"')";if(!BX.browser.IsIE())this.WAIT.style.backgroundRepeat="none";this.WAIT.style.display="none";this.WAIT.style.position="absolute";this.WAIT.style.zIndex="1100"}BX.bind(this.INPUT,"bxchange",function(){e.onChange()});var t=BX.findParent(this.CONTAINER,BX.is_fixed);if(BX.type.isElementNode(t)){BX.bind(window,"scroll",BX.throttle(this.onScroll,100,this))}};BX.ready(function(){e.Init(t)})}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:87:"/local/templates/psk2024/components/bitrix/news.list/chose-city/script.js?1721897333824";s:6:"source";s:73:"/local/templates/psk2024/components/bitrix/news.list/chose-city/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// $('#city-box a').each(function(){
// 	if($(this).attr('href') != '#')
// 		$(this).attr('href', $(this).attr('href') + '?ref=local');
// });
$(document).ready(function(){
$('.select-geo').on('change', function () {
	// $(this).closest(".select_wrapper").addClass('changed').attr("data-value", $(this).val());
	var url = new URL(window.location.href);
	url.searchParams.set('select-city','y');
	/* alert($(this).val()); */
	if ($(this).val()!='moscow') {
		var newUrl = $(this).val();
		$('#link-extra-info input').val($(this).val());
	}
	else{
		var newUrl = url.protocol + '//psk.expert' + url.pathname + url.search;
		$('#link-extra-info input').val(0);
	}
	//the href in the link becomes the action of the form
	$('#link-extra-info').attr('action', newUrl);

	//submit the form
	$('#link-extra-info').submit();

});
})
/* End */
;
; /* Start:"a:4:{s:4:"full";s:63:"/local/templates/psk2024/js/libs/swiper.min.js?1687254891143661";s:6:"source";s:46:"/local/templates/psk2024/js/libs/swiper.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * Swiper 8.4.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 30, 2023
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}class n extends Array{constructor(e){"number"==typeof e?super(e):(super(...e||[]),function(e){const t=e.__proto__;Object.defineProperty(e,"__proto__",{get:()=>t,set(e){t.__proto__=e}})}(this))}}function l(e){void 0===e&&(e=[]);const t=[];return e.forEach((e=>{Array.isArray(e)?t.push(...l(e)):t.push(e)})),t}function o(e,t){return Array.prototype.filter.call(e,t)}function d(e,t){const s=r(),i=a();let l=[];if(!t&&e instanceof n)return e;if(!e)return new n(l);if("string"==typeof e){const s=e.trim();if(s.indexOf("<")>=0&&s.indexOf(">")>=0){let e="div";0===s.indexOf("<li")&&(e="ul"),0===s.indexOf("<tr")&&(e="tbody"),0!==s.indexOf("<td")&&0!==s.indexOf("<th")||(e="tr"),0===s.indexOf("<tbody")&&(e="table"),0===s.indexOf("<option")&&(e="select");const t=i.createElement(e);t.innerHTML=s;for(let e=0;e<t.childNodes.length;e+=1)l.push(t.childNodes[e])}else l=function(e,t){if("string"!=typeof e)return[e];const s=[],a=t.querySelectorAll(e);for(let e=0;e<a.length;e+=1)s.push(a[e]);return s}(e.trim(),t||i)}else if(e.nodeType||e===s||e===i)l.push(e);else if(Array.isArray(e)){if(e instanceof n)return e;l=e}return new n(function(e){const t=[];for(let s=0;s<e.length;s+=1)-1===t.indexOf(e[s])&&t.push(e[s]);return t}(l))}d.fn=n.prototype;const c={addClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.add(...a)})),this},removeClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.remove(...a)})),this},hasClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));return o(this,(e=>a.filter((t=>e.classList.contains(t))).length>0)).length>0},toggleClass:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];const a=l(t.map((e=>e.split(" "))));this.forEach((e=>{a.forEach((t=>{e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let s=0;s<this.length;s+=1)if(2===arguments.length)this[s].setAttribute(e,t);else for(const t in e)this[s][t]=e[t],this[s].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!=typeof e?`${e}ms`:e;return this},on:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;function l(e){const t=e.target;if(!t)return;const s=e.target.dom7EventData||[];if(s.indexOf(e)<0&&s.unshift(e),d(t).is(i))r.apply(t,s);else{const e=d(t).parents();for(let t=0;t<e.length;t+=1)d(e[t]).is(i)&&r.apply(e[t],s)}}function o(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),r.apply(this,t)}"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const c=a.split(" ");let p;for(let e=0;e<this.length;e+=1){const t=this[e];if(i)for(p=0;p<c.length;p+=1){const e=c[p];t.dom7LiveListeners||(t.dom7LiveListeners={}),t.dom7LiveListeners[e]||(t.dom7LiveListeners[e]=[]),t.dom7LiveListeners[e].push({listener:r,proxyListener:l}),t.addEventListener(e,l,n)}else for(p=0;p<c.length;p+=1){const e=c[p];t.dom7Listeners||(t.dom7Listeners={}),t.dom7Listeners[e]||(t.dom7Listeners[e]=[]),t.dom7Listeners[e].push({listener:r,proxyListener:o}),t.addEventListener(e,o,n)}}return this},off:function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];let[a,i,r,n]=t;"function"==typeof t[1]&&([a,r,n]=t,i=void 0),n||(n=!1);const l=a.split(" ");for(let e=0;e<l.length;e+=1){const t=l[e];for(let e=0;e<this.length;e+=1){const s=this[e];let a;if(!i&&s.dom7Listeners?a=s.dom7Listeners[t]:i&&s.dom7LiveListeners&&(a=s.dom7LiveListeners[t]),a&&a.length)for(let e=a.length-1;e>=0;e-=1){const i=a[e];r&&i.listener===r||r&&i.listener&&i.listener.dom7proxy&&i.listener.dom7proxy===r?(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1)):r||(s.removeEventListener(t,i.proxyListener,n),a.splice(e,1))}}}return this},trigger:function(){const e=r();for(var t=arguments.length,s=new Array(t),a=0;a<t;a++)s[a]=arguments[a];const i=s[0].split(" "),n=s[1];for(let t=0;t<i.length;t+=1){const a=i[t];for(let t=0;t<this.length;t+=1){const i=this[t];if(e.CustomEvent){const t=new e.CustomEvent(a,{detail:n,bubbles:!0,cancelable:!0});i.dom7EventData=s.filter(((e,t)=>t>0)),i.dispatchEvent(t),i.dom7EventData=[],delete i.dom7EventData}}}return this},transitionEnd:function(e){const t=this;return e&&t.on("transitionend",(function s(a){a.target===this&&(e.call(this,a),t.off("transitionend",s))})),this},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){const e=r();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){const e=r(),t=a(),s=this[0],i=s.getBoundingClientRect(),n=t.body,l=s.clientTop||n.clientTop||0,o=s.clientLeft||n.clientLeft||0,d=s===e?e.scrollY:s.scrollTop,c=s===e?e.scrollX:s.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}return null},css:function(e,t){const s=r();let a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a+=1)for(const t in e)this[a].style[t]=e[t];return this}if(this[0])return s.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a+=1)this[a].style[e]=t;return this}return this},each:function(e){return e?(this.forEach(((t,s)=>{e.apply(t,[t,s])})),this):this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:null;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=r(),s=a(),i=this[0];let l,o;if(!i||void 0===e)return!1;if("string"==typeof e){if(i.matches)return i.matches(e);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(e);if(i.msMatchesSelector)return i.msMatchesSelector(e);for(l=d(e),o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}if(e===s)return i===s;if(e===t)return i===t;if(e.nodeType||e instanceof n){for(l=e.nodeType?[e]:e,o=0;o<l.length;o+=1)if(l[o]===i)return!0;return!1}return!1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;const t=this.length;if(e>t-1)return d([]);if(e<0){const s=t+e;return d(s<0?[]:[this[s]])}return d([this[e]])},append:function(){let e;const t=a();for(let s=0;s<arguments.length;s+=1){e=s<0||arguments.length<=s?void 0:arguments[s];for(let s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e;a.firstChild;)this[s].appendChild(a.firstChild)}else if(e instanceof n)for(let t=0;t<e.length;t+=1)this[s].appendChild(e[t]);else this[s].appendChild(e)}return this},prepend:function(e){const t=a();let s,i;for(s=0;s<this.length;s+=1)if("string"==typeof e){const a=t.createElement("div");for(a.innerHTML=e,i=a.childNodes.length-1;i>=0;i-=1)this[s].insertBefore(a.childNodes[i],this[s].childNodes[0])}else if(e instanceof n)for(i=0;i<e.length;i+=1)this[s].insertBefore(e[i],this[s].childNodes[0]);else this[s].insertBefore(e,this[s].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&d(this[0].nextElementSibling).is(e)?d([this[0].nextElementSibling]):d([]):this[0].nextElementSibling?d([this[0].nextElementSibling]):d([]):d([])},nextAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.nextElementSibling;){const a=s.nextElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&d(t.previousElementSibling).is(e)?d([t.previousElementSibling]):d([]):t.previousElementSibling?d([t.previousElementSibling]):d([])}return d([])},prevAll:function(e){const t=[];let s=this[0];if(!s)return d([]);for(;s.previousElementSibling;){const a=s.previousElementSibling;e?d(a).is(e)&&t.push(a):t.push(a),s=a}return d(t)},parent:function(e){const t=[];for(let s=0;s<this.length;s+=1)null!==this[s].parentNode&&(e?d(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode));return d(t)},parents:function(e){const t=[];for(let s=0;s<this.length;s+=1){let a=this[s].parentNode;for(;a;)e?d(a).is(e)&&t.push(a):t.push(a),a=a.parentNode}return d(t)},closest:function(e){let t=this;return void 0===e?d([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].querySelectorAll(e);for(let e=0;e<a.length;e+=1)t.push(a[e])}return d(t)},children:function(e){const t=[];for(let s=0;s<this.length;s+=1){const a=this[s].children;for(let s=0;s<a.length;s+=1)e&&!d(a[s]).is(e)||t.push(a[s])}return d(t)},filter:function(e){return d(o(this,e))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};function p(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function u(){return Date.now()}function h(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function m(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function f(e){return"undefined"!=typeof window&&void 0!==window.HTMLElement?e instanceof HTMLElement:e&&(1===e.nodeType||11===e.nodeType)}function g(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let s=1;s<arguments.length;s+=1){const a=s<0||arguments.length<=s?void 0:arguments[s];if(null!=a&&!f(a)){const s=Object.keys(Object(a)).filter((e=>t.indexOf(e)<0));for(let t=0,i=s.length;t<i;t+=1){const i=s[t],r=Object.getOwnPropertyDescriptor(a,i);void 0!==r&&r.enumerable&&(m(e[i])&&m(a[i])?a[i].__swiper__?e[i]=a[i]:g(e[i],a[i]):!m(e[i])&&m(a[i])?(e[i]={},a[i].__swiper__?e[i]=a[i]:g(e[i],a[i])):e[i]=a[i])}}}return e}function v(e,t,s){e.style.setProperty(t,s)}function w(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}let b,x,y;function E(){return b||(b=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),passiveListener:function(){let t=!1;try{const s=Object.defineProperty({},"passive",{get(){t=!0}});e.addEventListener("testPassiveListener",null,s)}catch(e){}return t}(),gestures:"ongesturestart"in e}}()),b}function C(e){return void 0===e&&(e={}),x||(x=function(e){let{userAgent:t}=void 0===e?{}:e;const s=E(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),h=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),m="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!m&&(l.os="android",l.android=!0),(p||h||u)&&(l.os="ios",l.ios=!0),l}(e)),x}function T(){return y||(y=function(){const e=r();return{isSafari:function(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),y}Object.keys(c).forEach((e=>{Object.defineProperty(d.fn,e,{value:c[e],writable:!0})}));var $={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};var S={updateSize:function(){const e=this;let t,s;const a=e.$el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a[0].clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a[0].clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(a.css("padding-left")||0,10)-parseInt(a.css("padding-right")||0,10),s=s-parseInt(a.css("padding-top")||0,10)-parseInt(a.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{$wrapperEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&a.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,c=i.children(`.${e.params.slideClass}`),p=o?e.virtual.slides.length:c.length;let u=[];const h=[],m=[];let f=a.slidesOffsetBefore;"function"==typeof f&&(f=a.slidesOffsetBefore.call(e));let g=a.slidesOffsetAfter;"function"==typeof g&&(g=a.slidesOffsetAfter.call(e));const w=e.snapGrid.length,b=e.slidesGrid.length;let x=a.spaceBetween,y=-f,E=0,C=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0&&(x=parseFloat(x.replace("%",""))/100*r),e.virtualSize=-x,n?c.css({marginLeft:"",marginBottom:"",marginTop:""}):c.css({marginRight:"",marginBottom:"",marginTop:""}),a.centeredSlides&&a.cssMode&&(v(e.wrapperEl,"--swiper-centered-offset-before",""),v(e.wrapperEl,"--swiper-centered-offset-after",""));const T=a.grid&&a.grid.rows>1&&e.grid;let $;T&&e.grid.initSlides(p);const S="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<p;i+=1){$=0;const n=c.eq(i);if(T&&e.grid.updateSlide(i,n,p,t),"none"!==n.css("display")){if("auto"===a.slidesPerView){S&&(c[i].style[t("width")]="");const r=getComputedStyle(n[0]),l=n[0].style.transform,o=n[0].style.webkitTransform;if(l&&(n[0].style.transform="none"),o&&(n[0].style.webkitTransform="none"),a.roundLengths)$=e.isHorizontal()?n.outerWidth(!0):n.outerHeight(!0);else{const e=s(r,"width"),t=s(r,"padding-left"),a=s(r,"padding-right"),i=s(r,"margin-left"),l=s(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)$=e+i+l;else{const{clientWidth:s,offsetWidth:r}=n[0];$=e+t+a+i+l+(r-s)}}l&&(n[0].style.transform=l),o&&(n[0].style.webkitTransform=o),a.roundLengths&&($=Math.floor($))}else $=(r-(a.slidesPerView-1)*x)/a.slidesPerView,a.roundLengths&&($=Math.floor($)),c[i]&&(c[i].style[t("width")]=`${$}px`);c[i]&&(c[i].swiperSlideSize=$),m.push($),a.centeredSlides?(y=y+$/2+E/2+x,0===E&&0!==i&&(y=y-r/2-x),0===i&&(y=y-r/2-x),Math.abs(y)<.001&&(y=0),a.roundLengths&&(y=Math.floor(y)),C%a.slidesPerGroup==0&&u.push(y),h.push(y)):(a.roundLengths&&(y=Math.floor(y)),(C-Math.min(e.params.slidesPerGroupSkip,C))%e.params.slidesPerGroup==0&&u.push(y),h.push(y),y=y+$+x),e.virtualSize+=$+x,E=$,C+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+g,n&&l&&("slide"===a.effect||"coverflow"===a.effect)&&i.css({width:`${e.virtualSize+a.spaceBetween}px`}),a.setWrapperSize&&i.css({[t("width")]:`${e.virtualSize+a.spaceBetween}px`}),T&&e.grid.updateWrapperSize($,u,t),!a.centeredSlides){const t=[];for(let s=0;s<u.length;s+=1){let i=u[s];a.roundLengths&&(i=Math.floor(i)),u[s]<=e.virtualSize-r&&t.push(i)}u=t,Math.floor(e.virtualSize-r)-Math.floor(u[u.length-1])>1&&u.push(e.virtualSize-r)}if(0===u.length&&(u=[0]),0!==a.spaceBetween){const s=e.isHorizontal()&&n?"marginLeft":t("marginRight");c.filter(((e,t)=>!a.cssMode||t!==c.length-1)).css({[s]:`${x}px`})}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween;const t=e-r;u=u.map((e=>e<0?-f:e>t?t+g:e))}if(a.centerInsufficientSlides){let e=0;if(m.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween,e<r){const t=(r-e)/2;u.forEach(((e,s)=>{u[s]=e-t})),h.forEach(((e,s)=>{h[s]=e+t}))}}if(Object.assign(e,{slides:c,snapGrid:u,slidesGrid:h,slidesSizesGrid:m}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){v(e.wrapperEl,"--swiper-centered-offset-before",-u[0]+"px"),v(e.wrapperEl,"--swiper-centered-offset-after",e.size/2-m[m.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(p!==d&&e.emit("slidesLengthChange"),u.length!==w&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==b&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset(),!(o||a.cssMode||"slide"!==a.effect&&"fade"!==a.effect)){const t=`${a.containerModifierClass}backface-hidden`,s=e.$el.hasClass(t);p<=a.maxBackfaceHiddenSlides?s||e.$el.addClass(t):s&&e.$el.removeClass(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"),10)===e))[0]:t.slides.eq(e)[0];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||d([])).each((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&t.$wrapperEl.css("height",`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides;for(let s=0;s<t.length;s+=1)t[s].swiperSlideOffset=e.isHorizontal()?t[s].offsetLeft:t[s].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.removeClass(s.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let e=0;e<a.length;e+=1){const l=a[e];let o=l.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(o-=a[0].swiperSlideOffset);const d=(n+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),c=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),p=-(n-o),u=p+t.slidesSizesGrid[e];(p>=0&&p<t.size-1||u>1&&u<=t.size||p<=0&&u>=t.size)&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e),a.eq(e).addClass(s.slideVisibleClass)),l.progress=i?-d:d,l.originalProgress=i?-c:c}t.visibleSlides=d(t.visibleSlides)},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n}=t;const l=r,o=n;0===a?(i=0,r=!0,n=!0):(i=(e-t.minTranslate())/a,r=i<=0,n=i>=1),Object.assign(t,{progress:i,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!l&&t.emit("reachBeginning toEdge"),n&&!o&&t.emit("reachEnd toEdge"),(l&&!r||o&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,$wrapperEl:a,activeIndex:i,realIndex:r}=e,n=e.virtual&&s.virtual.enabled;let l;t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),l=n?e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`):t.eq(i),l.addClass(s.slideActiveClass),s.loop&&(l.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));let o=l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);s.loop&&0===o.length&&(o=t.eq(0),o.addClass(s.slideNextClass));let d=l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);s.loop&&0===d.length&&(d=t.eq(-1),d.addClass(s.slidePrevClass)),s.loop&&(o.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),d.hasClass(s.slideDuplicateClass)?a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass):a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{slidesGrid:a,snapGrid:i,params:r,activeIndex:n,realIndex:l,snapIndex:o}=t;let d,c=e;if(void 0===c){for(let e=0;e<a.length;e+=1)void 0!==a[e+1]?s>=a[e]&&s<a[e+1]-(a[e+1]-a[e])/2?c=e:s>=a[e]&&s<a[e+1]&&(c=e+1):s>=a[e]&&(c=e);r.normalizeSlideIndex&&(c<0||void 0===c)&&(c=0)}if(i.indexOf(s)>=0)d=i.indexOf(s);else{const e=Math.min(r.slidesPerGroupSkip,c);d=e+Math.floor((c-e)/r.slidesPerGroup)}if(d>=i.length&&(d=i.length-1),c===n)return void(d!==o&&(t.snapIndex=d,t.emit("snapIndexChange")));const p=parseInt(t.slides.eq(c).attr("data-swiper-slide-index")||c,10);Object.assign(t,{snapIndex:d,realIndex:p,previousIndex:n,activeIndex:c}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),l!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,s=t.params,a=d(e).closest(`.${s.slideClass}`)[0];let i,r=!1;if(a)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===a){r=!0,i=e;break}if(!a||!r)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=a,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(d(a).attr("data-swiper-slide-index"),10):t.clickedIndex=i,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}};var M={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,$wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=h(i[0],e);return s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,$wrapperEl:r,wrapperEl:n,progress:l}=s;let o,d=0,c=0;s.isHorizontal()?d=a?-e:e:c=e,i.roundLengths&&(d=Math.floor(d),c=Math.floor(c)),i.cssMode?n[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-d:-c:i.virtualTranslate||r.transform(`translate3d(${d}px, ${c}px, 0px)`),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?d:c;const p=s.maxTranslate()-s.minTranslate();o=0===p?0:(e-s.minTranslate())/p,o!==l&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.$wrapperEl[0].addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onTranslateToWrapperTransitionEnd))),!0}};function P(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var k={slideTo:function(e,t,s,a,i){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"number"!=typeof e&&"string"!=typeof e)throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if("string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:m}=r;if(r.animating&&l.preventInteractionOnTransition||!m&&!a&&!i)return!1;const f=Math.min(r.params.slidesPerGroupSkip,n);let g=f+Math.floor((n-f)/r.params.slidesPerGroup);g>=o.length&&(g=o.length-1);const v=-o[g];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*v),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&v<r.translate&&v<r.minTranslate())return!1;if(!r.allowSlidePrev&&v>r.translate&&v>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(n!==(c||0)&&s&&r.emit("beforeSlideChangeStart"),r.updateProgress(v),b=n>p?"next":n<p?"prev":"reset",u&&-v===r.translate||!u&&v===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(v),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?v:-v;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._swiperImmediateVirtual=!1}))}else{if(!r.support.smoothScroll)return w({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(v),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const i=this;let r=e;return i.params.loop&&(r+=i.loopedSlides),i.slideTo(r,t,s,a)},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{animating:i,enabled:r,params:n}=a;if(!r)return a;let l=n.slidesPerGroup;"auto"===n.slidesPerView&&1===n.slidesPerGroup&&n.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<n.slidesPerGroupSkip?1:l;if(n.loop){if(i&&n.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}return n.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,animating:r,snapGrid:n,slidesGrid:l,rtlTranslate:o,enabled:d}=a;if(!d)return a;if(i.loop){if(r&&i.loopPreventsSlide)return!1;a.loopFix(),a._clientLeft=a.$wrapperEl[0].clientLeft}function c(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const p=c(o?a.translate:-a.translate),u=n.map((e=>c(e)));let h=n[u.indexOf(p)-1];if(void 0===h&&i.cssMode){let e;n.forEach(((t,s)=>{p>=t&&(e=s)})),void 0!==e&&(h=n[e>0?e-1:e])}let m=0;if(void 0!==h&&(m=l.indexOf(h),m<0&&(m=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(m=m-a.slidesPerViewDynamic("previous",!0)+1,m=Math.max(m,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return a.slideTo(m,e,t,s)},slideReset:function(e,t,s){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,$wrapperEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;if(t.loop){if(e.animating)return;i=parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),p((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var z={loopCreate:function(){const e=this,t=a(),{params:s,$wrapperEl:i}=e,r=i.children().length>0?d(i.children()[0].parentNode):i;r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();let n=r.children(`.${s.slideClass}`);if(s.loopFillGroupWithBlank){const e=s.slidesPerGroup-n.length%s.slidesPerGroup;if(e!==s.slidesPerGroup){for(let a=0;a<e;a+=1){const e=d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);r.append(e)}n=r.children(`.${s.slideClass}`)}}"auto"!==s.slidesPerView||s.loopedSlides||(s.loopedSlides=n.length),e.loopedSlides=Math.ceil(parseFloat(s.loopedSlides||s.slidesPerView,10)),e.loopedSlides+=s.loopAdditionalSlides,e.loopedSlides>n.length&&e.params.loopedSlidesLimit&&(e.loopedSlides=n.length);const l=[],o=[];n.each(((e,t)=>{d(e).attr("data-swiper-slide-index",t)}));for(let t=0;t<e.loopedSlides;t+=1){const e=t-Math.floor(t/n.length)*n.length;o.push(n.eq(e)[0]),l.unshift(n.eq(n.length-e-1)[0])}for(let e=0;e<o.length;e+=1)r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));for(let e=l.length-1;e>=0;e-=1)r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))},loopFix:function(){const e=this;e.emit("beforeLoopFix");const{activeIndex:t,slides:s,loopedSlides:a,allowSlidePrev:i,allowSlideNext:r,snapGrid:n,rtlTranslate:l}=e;let o;e.allowSlidePrev=!0,e.allowSlideNext=!0;const d=-n[t]-e.getTranslate();if(t<a){o=s.length-3*a+t,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}else if(t>=s.length-a){o=-s.length+t+a,o+=a;e.slideTo(o,0,!1,!0)&&0!==d&&e.setTranslate((l?-e.translate:e.translate)-d)}e.allowSlidePrev=i,e.allowSlideNext=r,e.emit("loopFix")},loopDestroy:function(){const{$wrapperEl:e,params:t,slides:s}=this;e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),s.removeAttr("data-swiper-slide-index")}};function L(e){const t=this,s=a(),i=r(),n=t.touchEventsData,{params:l,touches:o,enabled:c}=t;if(!c)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let p=e;p.originalEvent&&(p=p.originalEvent);let h=d(p.target);if("wrapper"===l.touchEventsTarget&&!h.closest(t.wrapperEl).length)return;if(n.isTouchEvent="touchstart"===p.type,!n.isTouchEvent&&"which"in p&&3===p.which)return;if(!n.isTouchEvent&&"button"in p&&p.button>0)return;if(n.isTouched&&n.isMoved)return;const m=!!l.noSwipingClass&&""!==l.noSwipingClass,f=e.composedPath?e.composedPath():e.path;m&&p.target&&p.target.shadowRoot&&f&&(h=d(f[0]));const g=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,v=!(!p.target||!p.target.shadowRoot);if(l.noSwiping&&(v?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(g,h[0]):h.closest(g)[0]))return void(t.allowClick=!0);if(l.swipeHandler&&!h.closest(l.swipeHandler)[0])return;o.currentX="touchstart"===p.type?p.targetTouches[0].pageX:p.pageX,o.currentY="touchstart"===p.type?p.targetTouches[0].pageY:p.pageY;const w=o.currentX,b=o.currentY,x=l.edgeSwipeDetection||l.iOSEdgeSwipeDetection,y=l.edgeSwipeThreshold||l.iOSEdgeSwipeThreshold;if(x&&(w<=y||w>=i.innerWidth-y)){if("prevent"!==x)return;e.preventDefault()}if(Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=w,o.startY=b,n.touchStartTime=u(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1),"touchstart"!==p.type){let e=!0;h.is(n.focusableElements)&&(e=!1,"SELECT"===h[0].nodeName&&(n.isTouched=!1)),s.activeElement&&d(s.activeElement).is(n.focusableElements)&&s.activeElement!==h[0]&&s.activeElement.blur();const a=e&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!a||h[0].isContentEditable||p.preventDefault()}t.params.freeMode&&t.params.freeMode.enabled&&t.freeMode&&t.animating&&!l.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",p)}function O(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:o}=s;if(!o)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",c));if(i.isTouchEvent&&"touchmove"!==c.type)return;const p="touchmove"===c.type&&c.targetTouches&&(c.targetTouches[0]||c.changedTouches[0]),h="touchmove"===c.type?p.pageX:c.pageX,m="touchmove"===c.type?p.pageY:c.pageY;if(c.preventedByNestedSwiper)return n.startX=h,void(n.startY=m);if(!s.allowTouchMove)return d(c.target).is(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:h,startY:m,currentX:h,currentY:m}),i.touchStartTime=u()));if(i.isTouchEvent&&r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(h<n.startX&&s.translate<=s.maxTranslate()||h>n.startX&&s.translate>=s.minTranslate())return;if(i.isTouchEvent&&t.activeElement&&c.target===t.activeElement&&d(c.target).is(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;n.currentX=h,n.currentY=m;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",c),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&c.cancelable&&c.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&c.stopPropagation(),i.isMoved||(r.loop&&!r.cssMode&&s.loopFix(),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating&&s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",c)),s.emit("sliderMove",c),i.isMoved=!0;let v=s.isHorizontal()?f:g;n.diff=v,v*=r.touchRatio,l&&(v=-v),s.swipeDirection=v>0?"prev":"next",i.currentTranslate=v+i.startTranslate;let w=!0,b=r.resistanceRatio;if(r.touchReleaseOnEdges&&(b=0),v>0&&i.currentTranslate>s.minTranslate()?(w=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**b)):v<0&&i.currentTranslate<s.maxTranslate()&&(w=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**b)),w&&(c.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),s.params.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function I(e){const t=this,s=t.touchEventsData,{params:a,touches:i,rtlTranslate:r,slidesGrid:n,enabled:l}=t;if(!l)return;let o=e;if(o.originalEvent&&(o=o.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",o),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&a.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);a.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const d=u(),c=d-s.touchStartTime;if(t.allowClick){const e=o.path||o.composedPath&&o.composedPath();t.updateClickedSlide(e&&e[0]||o.target),t.emit("tap click",o),c<300&&d-s.lastClickTime<300&&t.emit("doubleTap doubleClick",o)}if(s.lastClickTime=u(),p((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===i.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=a.followFinger?r?t.translate:-t.translate:-s.currentTranslate,a.cssMode)return;if(t.params.freeMode&&a.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let m=0,f=t.slidesSizesGrid[0];for(let e=0;e<n.length;e+=e<a.slidesPerGroupSkip?1:a.slidesPerGroup){const t=e<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;void 0!==n[e+t]?h>=n[e]&&h<n[e+t]&&(m=e,f=n[e+t]-n[e]):h>=n[e]&&(m=e,f=n[n.length-1]-n[n.length-2])}let g=null,v=null;a.rewind&&(t.isBeginning?v=t.params.virtual&&t.params.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(g=0));const w=(h-n[m])/f,b=m<a.slidesPerGroupSkip-1?1:a.slidesPerGroup;if(c>a.longSwipesMs){if(!a.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(w>=a.longSwipesRatio?t.slideTo(a.rewind&&t.isEnd?g:m+b):t.slideTo(m)),"prev"===t.swipeDirection&&(w>1-a.longSwipesRatio?t.slideTo(m+b):null!==v&&w<0&&Math.abs(w)>a.longSwipesRatio?t.slideTo(v):t.slideTo(m))}else{if(!a.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(o.target===t.navigation.nextEl||o.target===t.navigation.prevEl)?o.target===t.navigation.nextEl?t.slideTo(m+b):t.slideTo(m):("next"===t.swipeDirection&&t.slideTo(null!==g?g:m+b),"prev"===t.swipeDirection&&t.slideTo(null!==v?v:m))}}function A(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),("auto"===t.slidesPerView||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function D(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function G(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let N=!1;function B(){}const H=(e,t)=>{const s=a(),{params:i,touchEvents:r,el:n,wrapperEl:l,device:o,support:d}=e,c=!!i.nested,p="on"===t?"addEventListener":"removeEventListener",u=t;if(d.touch){const t=!("touchstart"!==r.start||!d.passiveListener||!i.passiveListeners)&&{passive:!0,capture:!1};n[p](r.start,e.onTouchStart,t),n[p](r.move,e.onTouchMove,d.passiveListener?{passive:!1,capture:c}:c),n[p](r.end,e.onTouchEnd,t),r.cancel&&n[p](r.cancel,e.onTouchEnd,t)}else n[p](r.start,e.onTouchStart,!1),s[p](r.move,e.onTouchMove,c),s[p](r.end,e.onTouchEnd,!1);(i.preventClicks||i.preventClicksPropagation)&&n[p]("click",e.onClick,!0),i.cssMode&&l[p]("scroll",e.onScroll),i.updateOnWindowResize?e[u](o.ios||o.android?"resize orientationchange observerUpdate":"resize observerUpdate",A,!0):e[u]("observerUpdate",A,!0)};var X={attachEvents:function(){const e=this,t=a(),{params:s,support:i}=e;e.onTouchStart=L.bind(e),e.onTouchMove=O.bind(e),e.onTouchEnd=I.bind(e),s.cssMode&&(e.onScroll=G.bind(e)),e.onClick=D.bind(e),i.touch&&!N&&(t.addEventListener("touchstart",B),N=!0),H(e,"on")},detachEvents:function(){H(this,"off")}};const Y=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var R={addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,$el:i,device:r,support:n}=e,l=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"pointer-events":!n.touch},{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...l),i.addClass([...t].join(" ")),e.emitContainerClasses()},removeClasses:function(){const{$el:e,classNames:t}=this;e.removeClass(t.join(" ")),this.emitContainerClasses()}};var W={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopedSlidesLimit:!0,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function q(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in i?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),g(t,s)):g(t,s)):g(t,s)}}const j={eventsEmitter:$,update:S,translate:M,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||s.$wrapperEl.transition(e),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),P({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),P({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:k,loop:z,grabCursor:{setGrabCursor:function(e){const t=this;if(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;s.style.cursor="move",s.style.cursor=e?"grabbing":"grab"},unsetGrabCursor:function(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="")}},events:X,breakpoints:{setBreakpoint:function(){const e=this,{activeIndex:t,initialized:s,loopedSlides:a=0,params:i,$el:r}=e,n=i.breakpoints;if(!n||n&&0===Object.keys(n).length)return;const l=e.getBreakpoint(n,e.params.breakpointsBase,e.el);if(!l||e.currentBreakpoint===l)return;const o=(l in n?n[l]:void 0)||e.originalParams,d=Y(e,i),c=Y(e,o),p=i.enabled;d&&!c?(r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!d&&c&&(r.addClass(`${i.containerModifierClass}grid`),(o.grid.fill&&"column"===o.grid.fill||!o.grid.fill&&"column"===i.grid.fill)&&r.addClass(`${i.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{const s=i[t]&&i[t].enabled,a=o[t]&&o[t].enabled;s&&!a&&e[t].disable(),!s&&a&&e[t].enable()}));const u=o.direction&&o.direction!==i.direction,h=i.loop&&(o.slidesPerView!==i.slidesPerView||u);u&&s&&e.changeDirection(),g(e.params,o);const m=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!m?e.disable():!p&&m&&e.enable(),e.currentBreakpoint=l,e.emit("_beforeBreakpoint",o),h&&s&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-a+e.loopedSlides,0,!1)),e.emit("breakpoint",o)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:R,images:{loadImage:function(e,t,s,a,i,n){const l=r();let o;function c(){n&&n()}d(e).parent("picture")[0]||e.complete&&i?c():t?(o=new l.Image,o.onload=c,o.onerror=c,a&&(o.sizes=a),s&&(o.srcset=s),t&&(o.src=t)):c()},preloadImages:function(){const e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(let s=0;s<e.imagesToLoad.length;s+=1){const a=e.imagesToLoad[s];e.loadImage(a,a.currentSrc||a.getAttribute("src"),a.srcset||a.getAttribute("srcset"),a.sizes||a.getAttribute("sizes"),!0,t)}}}},_={};class V{constructor(){let e,t;for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];if(1===a.length&&a[0].constructor&&"Object"===Object.prototype.toString.call(a[0]).slice(8,-1)?t=a[0]:[e,t]=a,t||(t={}),t=g({},t),e&&!t.el&&(t.el=e),t.el&&d(t.el).length>1){const e=[];return d(t.el).each((s=>{const a=g({},t,{el:s});e.push(new V(a))})),e}const r=this;r.__swiper__=!0,r.support=E(),r.device=C({userAgent:t.userAgent}),r.browser=T(),r.eventsListeners={},r.eventsAnyListeners=[],r.modules=[...r.__modules__],t.modules&&Array.isArray(t.modules)&&r.modules.push(...t.modules);const n={};r.modules.forEach((e=>{e({swiper:r,extendParams:q(t,n),on:r.on.bind(r),once:r.once.bind(r),off:r.off.bind(r),emit:r.emit.bind(r)})}));const l=g({},W,n);return r.params=g({},l,_,t),r.originalParams=g({},r.params),r.passedParams=g({},t),r.params&&r.params.on&&Object.keys(r.params.on).forEach((e=>{r.on(e,r.params.on[e])})),r.params&&r.params.onAny&&r.onAny(r.params.onAny),r.$=d,Object.assign(r,{enabled:r.params.enabled,el:e,classNames:[],slides:d(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===r.params.direction,isVertical:()=>"vertical"===r.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:r.params.allowSlideNext,allowSlidePrev:r.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],t=["pointerdown","pointermove","pointerup"];return r.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},r.touchEventsDesktop={start:t[0],move:t[1],end:t[2]},r.support.touch||!r.params.simulateTouch?r.touchEventsTouch:r.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:r.params.focusableElements,lastClickTime:u(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:r.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),r.emit("_swiper"),r.params.init&&r.init(),r}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.each((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=a[l].swiperSlideSize;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;s.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(a(),e.params.autoHeight&&e.updateAutoHeight()):(i=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),i||a()),s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.each((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.$el.addClass(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.$el.removeClass(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;const s=d(e||t.params.el);if(!(e=s[0]))return!1;e.swiper=t;const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let r=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=d(e.shadowRoot.querySelector(i()));return t.children=e=>s.children(e),t}return s.children?s.children(i()):d(s).children(i())})();if(0===r.length&&t.params.createElements){const e=a().createElement("div");r=d(e),e.className=t.params.wrapperClass,s.append(e),s.children(`.${t.params.slideClass}`).each((e=>{r.append(e)}))}return Object.assign(t,{$el:s,el:e,$wrapperEl:r,wrapperEl:r[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===s.css("direction")),wrongRTL:"-webkit-box"===r.css("display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,$el:i,$wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttr("style"),r.removeAttr("style"),n&&n.length&&n.removeClass([a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.$el[0].swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){g(_,e)}static get extendedDefaults(){return _}static get defaults(){return W}static installModule(e){V.prototype.__modules__||(V.prototype.__modules__=[]);const t=V.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>V.installModule(e))),V):(V.installModule(e),V)}}function F(e,t,s,i){const r=a();return e.params.createElements&&Object.keys(i).forEach((a=>{if(!s[a]&&!0===s.auto){let n=e.$el.children(`.${i[a]}`)[0];n||(n=r.createElement("div"),n.className=i[a],e.$el.append(n)),s[a]=n,t[a]=n}})),s}function U(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function K(e){const t=this,{$wrapperEl:s,params:a}=t;if(a.loop&&t.loopDestroy(),"object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.append(e[t]);else s.append(e);a.loop&&t.loopCreate(),a.observer||t.update()}function Z(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;s.loop&&t.loopDestroy();let r=i+1;if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&a.prepend(e[t]);r=i+e.length}else a.prepend(e);s.loop&&t.loopCreate(),s.observer||t.update(),t.slideTo(r,0,!1)}function Q(e,t){const s=this,{$wrapperEl:a,params:i,activeIndex:r}=s;let n=r;i.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.slides=a.children(`.${i.slideClass}`));const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides.eq(t);e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&a.append(t[e]);o=n>e?n+t.length:n}else a.append(t);for(let e=0;e<d.length;e+=1)a.append(d[e]);i.loop&&s.loopCreate(),i.observer||s.update(),i.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function J(e){const t=this,{params:s,$wrapperEl:a,activeIndex:i}=t;let r=i;s.loop&&(r-=t.loopedSlides,t.loopDestroy(),t.slides=a.children(`.${s.slideClass}`));let n,l=r;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)n=e[s],t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1);l=Math.max(l,0)}else n=e,t.slides[n]&&t.slides.eq(n).remove(),n<l&&(l-=1),l=Math.max(l,0);s.loop&&t.loopCreate(),s.observer||t.update(),s.loop?t.slideTo(l+t.loopedSlides,0,!1):t.slideTo(l,0,!1)}function ee(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function te(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.each((e=>{s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}function se(e,t){return e.transformEl?t.find(e.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):t}function ae(e){let{swiper:t,duration:s,transformEl:a,allSlides:i}=e;const{slides:r,activeIndex:n,$wrapperEl:l}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a?r.find(a):r:a?r.eq(n).find(a):r.eq(n),e.transitionEnd((()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=["webkitTransitionEnd","transitionend"];for(let t=0;t<e.length;t+=1)l.trigger(e[t])}))}}function ie(e,t,s){const a="swiper-slide-shadow"+(s?`-${s}`:""),i=e.transformEl?t.find(e.transformEl):t;let r=i.children(`.${a}`);return r.length||(r=d(`<div class="swiper-slide-shadow${s?`-${s}`:""}"></div>`),i.append(r)),r}Object.keys(j).forEach((e=>{Object.keys(j[e]).forEach((t=>{V.prototype[t]=j[e][t]}))})),V.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,t){void 0===t&&(t={});const s=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(1===e.length)return void i("observerUpdate",e[0]);const t=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(t):l.setTimeout(t,0)}));s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),n.push(s)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=t.$el.parents();for(let t=0;t<e.length;t+=1)o(e[t])}o(t.$el[0],{childList:t.params.observeSlideChildren}),o(t.$wrapperEl[0],{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const re=[function(e){let t,{swiper:s,extendParams:a,on:i,emit:r}=e;function n(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];const i=a.renderSlide?d(a.renderSlide.call(s,e,t)):d(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);return i.attr("data-swiper-slide-index")||i.attr("data-swiper-slide-index",t),a.cache&&(s.virtual.cache[t]=i),i}function l(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i}=s.params,{addSlidesBefore:l,addSlidesAfter:o}=s.params.virtual,{from:d,to:c,slides:p,slidesGrid:u,offset:h}=s.virtual;s.params.cssMode||s.updateActiveIndex();const m=s.activeIndex||0;let f,g,v;f=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(g=Math.floor(t/2)+a+o,v=Math.floor(t/2)+a+l):(g=t+(a-1)+o,v=a+l);const w=Math.max((m||0)-v,0),b=Math.min((m||0)+g,p.length-1),x=(s.slidesGrid[w]||0)-(s.slidesGrid[0]||0);function y(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),s.lazy&&s.params.lazy.enabled&&s.lazy.load(),r("virtualUpdate")}if(Object.assign(s.virtual,{from:w,to:b,offset:x,slidesGrid:s.slidesGrid}),d===w&&c===b&&!e)return s.slidesGrid!==u&&x!==h&&s.slides.css(f,`${x}px`),s.updateProgress(),void r("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:x,from:w,to:b,slides:function(){const e=[];for(let t=w;t<=b;t+=1)e.push(p[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?y():r("virtualUpdate"));const E=[],C=[];if(e)s.$wrapperEl.find(`.${s.params.slideClass}`).remove();else for(let e=d;e<=c;e+=1)(e<w||e>b)&&s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();for(let t=0;t<p.length;t+=1)t>=w&&t<=b&&(void 0===c||e?C.push(t):(t>c&&C.push(t),t<d&&E.push(t)));C.forEach((e=>{s.$wrapperEl.append(n(p[e],e))})),E.sort(((e,t)=>t-e)).forEach((e=>{s.$wrapperEl.prepend(n(p[e],e))})),s.$wrapperEl.children(".swiper-slide").css(f,`${x}px`),y()}a({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}}),s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]},i("beforeInit",(()=>{s.params.virtual.enabled&&(s.virtual.slides=s.params.virtual.slides,s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,s.params.initialSlide||l())})),i("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{l()}),100)):l())})),i("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&v(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);l(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.attr("data-swiper-slide-index");r&&a.attr("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}l(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.virtual.slides.splice(e[a],1),s.params.virtual.cache&&delete s.virtual.cache[e[a]],e[a]<t&&(t-=1),t=Math.max(t,0);else s.virtual.slides.splice(e,1),s.params.virtual.cache&&delete s.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);l(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),l(!0),s.slideTo(0,0)},update:l})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function c(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,h=38===i,m=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&m||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&h||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||h||m)){let e=!1;if(t.$el.parents(`.${t.params.slideClass}`).length>0&&0===t.$el.parents(`.${t.params.slideActiveClass}`).length)return;const a=t.$el,i=a[0].clientWidth,r=a[0].clientHeight,n=o.innerWidth,l=o.innerHeight,d=t.$el.offset();s&&(d.left-=t.$el[0].scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||h||m)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||m)&&t.slideNext(),(d||h)&&t.slidePrev()),n("keyPress",i)}}function p(){t.keyboard.enabled||(d(l).on("keydown",c),t.keyboard.enabled=!0)}function u(){t.keyboard.enabled&&(d(l).off("keydown",c),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&p()})),i("destroy",(()=>{t.keyboard.enabled&&u()})),Object.assign(t.keyboard,{enable:p,disable:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();let l;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}}),t.mousewheel={enabled:!1};let o,c=u();const h=[];function m(){t.enabled&&(t.mouseEntered=!0)}function f(){t.enabled&&(t.mouseEntered=!1)}function g(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&u()-c<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&u()-c<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),c=(new n.Date).getTime(),!1)))}function v(e){let s=e,a=!0;if(!t.enabled)return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let n=t.$el;if("container"!==t.params.mousewheel.eventsTarget&&(n=d(t.params.mousewheel.eventsTarget)),!t.mouseEntered&&!n[0].contains(s.target)&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let c=0;const m=t.rtlTranslate?-1:1,f=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(f.pixelX)>Math.abs(f.pixelY)))return!0;c=-f.pixelX*m}else{if(!(Math.abs(f.pixelY)>Math.abs(f.pixelX)))return!0;c=-f.pixelY}else c=Math.abs(f.pixelX)>Math.abs(f.pixelY)?-f.pixelX*m:-f.pixelY;if(0===c)return!0;r.invert&&(c=-c);let v=t.getTranslate()+c*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:u(),delta:Math.abs(c),direction:Math.sign(c)},a=o&&e.time<o.time+500&&e.delta<=o.delta&&e.direction===o.direction;if(!a){o=void 0,t.params.loop&&t.loopFix();let n=t.getTranslate()+c*r.sensitivity;const d=t.isBeginning,u=t.isEnd;if(n>=t.minTranslate()&&(n=t.minTranslate()),n<=t.maxTranslate()&&(n=t.maxTranslate()),t.setTransition(0),t.setTranslate(n),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!d&&t.isBeginning||!u&&t.isEnd)&&t.updateSlidesClasses(),t.params.freeMode.sticky){clearTimeout(l),l=void 0,h.length>=15&&h.shift();const s=h.length?h[h.length-1]:void 0,a=h[0];if(h.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))h.splice(0);else if(h.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=c>0?.8:.2;o=e,h.splice(0),l=p((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}l||(l=p((()=>{o=e,h.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),n===t.minTranslate()||n===t.maxTranslate())return!0}}else{const s={time:u(),delta:Math.abs(c),direction:Math.sign(c),raw:e};h.length>=2&&h.shift();const a=h.length?h[h.length-1]:void 0;if(h.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&g(s):g(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function w(e){let s=t.$el;"container"!==t.params.mousewheel.eventsTarget&&(s=d(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",f),s[e]("wheel",v)}function b(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",v),!0):!t.mousewheel.enabled&&(w("on"),t.mousewheel.enabled=!0,!0)}function x(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,v),!0):!!t.mousewheel.enabled&&(w("off"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&x(),t.params.mousewheel.enabled&&b()})),a("destroy",(()=>{t.params.cssMode&&b(),t.mousewheel.enabled&&x()})),Object.assign(t.mousewheel,{enable:b,disable:x})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;function r(e){let s;return e&&(s=d(e),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.$el.find(e).length&&(s=t.$el.find(e))),s}function n(e,s){const a=t.params.navigation;e&&e.length>0&&(e[s?"addClass":"removeClass"](a.disabledClass),e[0]&&"BUTTON"===e[0].tagName&&(e[0].disabled=s),t.params.watchOverflow&&t.enabled&&e[t.isLocked?"addClass":"removeClass"](a.lockClass))}function l(){if(t.params.loop)return;const{$nextEl:e,$prevEl:s}=t.navigation;n(s,t.isBeginning&&!t.params.rewind),n(e,t.isEnd&&!t.params.rewind)}function o(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function c(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function p(){const e=t.params.navigation;if(t.params.navigation=F(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;const s=r(e.nextEl),a=r(e.prevEl);s&&s.length>0&&s.on("click",c),a&&a.length>0&&a.on("click",o),Object.assign(t.navigation,{$nextEl:s,nextEl:s&&s[0],$prevEl:a,prevEl:a&&a[0]}),t.enabled||(s&&s.addClass(e.lockClass),a&&a.addClass(e.lockClass))}function u(){const{$nextEl:e,$prevEl:s}=t.navigation;e&&e.length&&(e.off("click",c),e.removeClass(t.params.navigation.disabledClass)),s&&s.length&&(s.off("click",o),s.removeClass(t.params.navigation.disabledClass))}s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},a("init",(()=>{!1===t.params.navigation.enabled?h():(p(),l())})),a("toEdge fromEdge lock unlock",(()=>{l()})),a("destroy",(()=>{u()})),a("enable disable",(()=>{const{$nextEl:e,$prevEl:s}=t.navigation;e&&e[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass),s&&s[t.enabled?"removeClass":"addClass"](t.params.navigation.lockClass)})),a("click",((e,s)=>{const{$nextEl:a,$prevEl:r}=t.navigation,n=s.target;if(t.params.navigation.hideOnClick&&!d(n).is(r)&&!d(n).is(a)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===n||t.pagination.el.contains(n)))return;let e;a?e=a.hasClass(t.params.navigation.hiddenClass):r&&(e=r.hasClass(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),a&&a.toggleClass(t.params.navigation.hiddenClass),r&&r.toggleClass(t.params.navigation.hiddenClass)}}));const h=()=>{t.$el.addClass(t.params.navigation.navigationDisabledClass),u()};Object.assign(t.navigation,{enable:()=>{t.$el.removeClass(t.params.navigation.navigationDisabledClass),p(),l()},disable:h,update:l,init:p,destroy:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,$el:null,bullets:[]};let l=0;function o(){return!t.params.pagination.el||!t.pagination.el||!t.pagination.$el||0===t.pagination.$el.length}function c(e,s){const{bulletActiveClass:a}=t.params.pagination;e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)}function p(){const e=t.rtl,s=t.params.pagination;if(o())return;const a=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,r=t.pagination.$el;let p;const u=t.params.loop?Math.ceil((a-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(p=Math.ceil((t.activeIndex-t.loopedSlides)/t.params.slidesPerGroup),p>a-1-2*t.loopedSlides&&(p-=a-2*t.loopedSlides),p>u-1&&(p-=u),p<0&&"bullets"!==t.params.paginationType&&(p=u+p)):p=void 0!==t.snapIndex?t.snapIndex:t.activeIndex||0,"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const a=t.pagination.bullets;let i,o,u;if(s.dynamicBullets&&(n=a.eq(0)[t.isHorizontal()?"outerWidth":"outerHeight"](!0),r.css(t.isHorizontal()?"width":"height",n*(s.dynamicMainBullets+4)+"px"),s.dynamicMainBullets>1&&void 0!==t.previousIndex&&(l+=p-(t.previousIndex-t.loopedSlides||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),i=Math.max(p-l,0),o=i+(Math.min(a.length,s.dynamicMainBullets)-1),u=(o+i)/2),a.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`)).join(" ")),r.length>1)a.each((e=>{const t=d(e),a=t.index();a===p&&t.addClass(s.bulletActiveClass),s.dynamicBullets&&(a>=i&&a<=o&&t.addClass(`${s.bulletActiveClass}-main`),a===i&&c(t,"prev"),a===o&&c(t,"next"))}));else{const e=a.eq(p),r=e.index();if(e.addClass(s.bulletActiveClass),s.dynamicBullets){const e=a.eq(i),n=a.eq(o);for(let e=i;e<=o;e+=1)a.eq(e).addClass(`${s.bulletActiveClass}-main`);if(t.params.loop)if(r>=a.length){for(let e=s.dynamicMainBullets;e>=0;e-=1)a.eq(a.length-e).addClass(`${s.bulletActiveClass}-main`);a.eq(a.length-s.dynamicMainBullets-1).addClass(`${s.bulletActiveClass}-prev`)}else c(e,"prev"),c(n,"next");else c(e,"prev"),c(n,"next")}}if(s.dynamicBullets){const i=Math.min(a.length,s.dynamicMainBullets+4),r=(n*i-n)/2-u*n,l=e?"right":"left";a.css(t.isHorizontal()?l:"top",`${r}px`)}}if("fraction"===s.type&&(r.find(U(s.currentClass)).text(s.formatFractionCurrent(p+1)),r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),"progressbar"===s.type){let e;e=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const a=(p+1)/u;let i=1,n=1;"horizontal"===e?i=a:n=a,r.find(U(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`).transition(t.params.speed)}"custom"===s.type&&s.renderCustom?(r.html(s.renderCustom(t,p+1,u)),i("paginationRender",r[0])):i("paginationUpdate",r[0]),t.params.watchOverflow&&t.enabled&&r[t.isLocked?"addClass":"removeClass"](s.lockClass)}function u(){const e=t.params.pagination;if(o())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,a=t.pagination.$el;let r="";if("bullets"===e.type){let i=t.params.loop?Math.ceil((s-2*t.loopedSlides)/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&!t.params.loop&&i>s&&(i=s);for(let s=0;s<i;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;a.html(r),t.pagination.bullets=a.find(U(e.bulletClass))}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,a.html(r)),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`,a.html(r)),"custom"!==e.type&&i("paginationRender",t.pagination.$el[0])}function h(){t.params.pagination=F(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s=d(e.el);0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&s.length>1&&(s=t.$el.find(e.el),s.length>1&&(s=s.filter((e=>d(e).parents(".swiper")[0]===t.el)))),"bullets"===e.type&&e.clickable&&s.addClass(e.clickableClass),s.addClass(e.modifierClass+e.type),s.addClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.addClass(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.addClass(e.progressbarOppositeClass),e.clickable&&s.on("click",U(e.bulletClass),(function(e){e.preventDefault();let s=d(this).index()*t.params.slidesPerGroup;t.params.loop&&(s+=t.loopedSlides),t.slideTo(s)})),Object.assign(t.pagination,{$el:s,el:s[0]}),t.enabled||s.addClass(e.lockClass))}function m(){const e=t.params.pagination;if(o())return;const s=t.pagination.$el;s.removeClass(e.hiddenClass),s.removeClass(e.modifierClass+e.type),s.removeClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.pagination.bullets&&t.pagination.bullets.removeClass&&t.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&s.off("click",U(e.bulletClass))}a("init",(()=>{!1===t.params.pagination.enabled?f():(h(),u(),p())})),a("activeIndexChange",(()=>{(t.params.loop||void 0===t.snapIndex)&&p()})),a("snapIndexChange",(()=>{t.params.loop||p()})),a("slidesLengthChange",(()=>{t.params.loop&&(u(),p())})),a("snapGridLengthChange",(()=>{t.params.loop||(u(),p())})),a("destroy",(()=>{m()})),a("enable disable",(()=>{const{$el:e}=t.pagination;e&&e[t.enabled?"removeClass":"addClass"](t.params.pagination.lockClass)})),a("lock unlock",(()=>{p()})),a("click",((e,s)=>{const a=s.target,{$el:r}=t.pagination;if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!d(a).hasClass(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r.hasClass(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.toggleClass(t.params.pagination.hiddenClass)}}));const f=()=>{t.$el.addClass(t.params.pagination.paginationDisabledClass),t.pagination.$el&&t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass),m()};Object.assign(t.pagination,{enable:()=>{t.$el.removeClass(t.params.pagination.paginationDisabledClass),t.pagination.$el&&t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass),h(),u(),p()},disable:f,render:u,update:p,init:h,destroy:m})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const n=a();let l,o,c,u,h=!1,m=null,f=null;function g(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s,progress:a}=t,{$dragEl:i,$el:r}=e,n=t.params.scrollbar;let l=o,d=(c-o)*a;s?(d=-d,d>0?(l=o-d,d=0):-d+o>c&&(l=c+d)):d<0?(l=o+d,d=0):d+o>c&&(l=c-d),t.isHorizontal()?(i.transform(`translate3d(${d}px, 0, 0)`),i[0].style.width=`${l}px`):(i.transform(`translate3d(0px, ${d}px, 0)`),i[0].style.height=`${l}px`),n.hide&&(clearTimeout(m),r[0].style.opacity=1,m=setTimeout((()=>{r[0].style.opacity=0,r.transition(400)}),1e3))}function v(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{$dragEl:s,$el:a}=e;s[0].style.width="",s[0].style.height="",c=t.isHorizontal()?a[0].offsetWidth:a[0].offsetHeight,u=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),o="auto"===t.params.scrollbar.dragSize?c*u:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s[0].style.width=`${o}px`:s[0].style.height=`${o}px`,a[0].style.display=u>=1?"none":"",t.params.scrollbar.hide&&(a[0].style.opacity=0),t.params.watchOverflow&&t.enabled&&e.$el[t.isLocked?"addClass":"removeClass"](t.params.scrollbar.lockClass)}function w(e){return t.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY}function b(e){const{scrollbar:s,rtlTranslate:a}=t,{$el:i}=s;let r;r=(w(e)-i.offset()[t.isHorizontal()?"left":"top"]-(null!==l?l:o/2))/(c-o),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function x(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n,$dragEl:o}=a;h=!0,l=e.target===o[0]||e.target===o?w(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.transition(100),o.transition(100),b(e),clearTimeout(f),n.transition(0),s.hide&&n.css("opacity",1),t.params.cssMode&&t.$wrapperEl.css("scroll-snap-type","none"),r("scrollbarDragStart",e)}function y(e){const{scrollbar:s,$wrapperEl:a}=t,{$el:i,$dragEl:n}=s;h&&(e.preventDefault?e.preventDefault():e.returnValue=!1,b(e),a.transition(0),i.transition(0),n.transition(0),r("scrollbarDragMove",e))}function E(e){const s=t.params.scrollbar,{scrollbar:a,$wrapperEl:i}=t,{$el:n}=a;h&&(h=!1,t.params.cssMode&&(t.$wrapperEl.css("scroll-snap-type",""),i.transition("")),s.hide&&(clearTimeout(f),f=p((()=>{n.css("opacity",0),n.transition(400)}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function C(e){const{scrollbar:s,touchEventsTouch:a,touchEventsDesktop:i,params:r,support:l}=t,o=s.$el;if(!o)return;const d=o[0],c=!(!l.passiveListener||!r.passiveListeners)&&{passive:!1,capture:!1},p=!(!l.passiveListener||!r.passiveListeners)&&{passive:!0,capture:!1};if(!d)return;const u="on"===e?"addEventListener":"removeEventListener";l.touch?(d[u](a.start,x,c),d[u](a.move,y,c),d[u](a.end,E,p)):(d[u](i.start,x,c),n[u](i.move,y,c),n[u](i.end,E,p))}function T(){const{scrollbar:e,$el:s}=t;t.params.scrollbar=F(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i=d(a.el);t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.find(a.el).length&&(i=s.find(a.el)),i.addClass(t.isHorizontal()?a.horizontalClass:a.verticalClass);let r=i.find(`.${t.params.scrollbar.dragClass}`);0===r.length&&(r=d(`<div class="${t.params.scrollbar.dragClass}"></div>`),i.append(r)),Object.assign(e,{$el:i,el:i[0],$dragEl:r,dragEl:r[0]}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&C("on"),i&&i[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)}function $(){const e=t.params.scrollbar,s=t.scrollbar.$el;s&&s.removeClass(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.params.scrollbar.el&&t.scrollbar.el&&C("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null,$el:null,$dragEl:null},i("init",(()=>{!1===t.params.scrollbar.enabled?S():(T(),v(),g())})),i("update resize observerUpdate lock unlock",(()=>{v()})),i("setTranslate",(()=>{g()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&t.scrollbar.$dragEl.transition(e)}(s)})),i("enable disable",(()=>{const{$el:e}=t.scrollbar;e&&e[t.enabled?"removeClass":"addClass"](t.params.scrollbar.lockClass)})),i("destroy",(()=>{$()}));const S=()=>{t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.$el&&t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),$()};Object.assign(t.scrollbar,{enable:()=>{t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.$el&&t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),T(),v(),g()},disable:S,updateSize:v,setTranslate:g,init:T,destroy:$})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i=(e,s)=>{const{rtl:a}=t,i=d(e),r=a?-1:1,n=i.attr("data-swiper-parallax")||"0";let l=i.attr("data-swiper-parallax-x"),o=i.attr("data-swiper-parallax-y");const c=i.attr("data-swiper-parallax-scale"),p=i.attr("data-swiper-parallax-opacity");if(l||o?(l=l||"0",o=o||"0"):t.isHorizontal()?(l=n,o="0"):(o=n,l="0"),l=l.indexOf("%")>=0?parseInt(l,10)*s*r+"%":l*s*r+"px",o=o.indexOf("%")>=0?parseInt(o,10)*s+"%":o*s+"px",null!=p){const e=p-(p-1)*(1-Math.abs(s));i[0].style.opacity=e}if(null==c)i.transform(`translate3d(${l}, ${o}, 0px)`);else{const e=c-(c-1)*(1-Math.abs(s));i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)}},r=()=>{const{$el:e,slides:s,progress:a,snapGrid:r}=t;e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,a)})),s.each(((e,s)=>{let n=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(n+=Math.ceil(s/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{i(e,n)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&r()})),a("setTranslate",(()=>{t.params.parallax.enabled&&r()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{$el:s}=t;s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t=>{const s=d(t);let a=parseInt(s.attr("data-swiper-parallax-duration"),10)||e;0===e&&(a=0),s.transition(a)}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,o,c,p=1,u=!1;const m={$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},f={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},g={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let v=1;function w(e){if(e.targetTouches.length<2)return 1;const t=e.targetTouches[0].pageX,s=e.targetTouches[0].pageY,a=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY;return Math.sqrt((a-t)**2+(i-s)**2)}function b(e){const s=t.support,a=t.params.zoom;if(o=!1,c=!1,!s.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;o=!0,m.scaleStart=w(e)}m.$slideEl&&m.$slideEl.length||(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`),0===m.$slideEl.length&&(m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`),m.maxRatio=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,0!==m.$imageWrapEl.length)?(m.$imageEl&&m.$imageEl.transition(0),u=!0):m.$imageEl=void 0}function x(e){const s=t.support,a=t.params.zoom,i=t.zoom;if(!s.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;c=!0,m.scaleMove=w(e)}m.$imageEl&&0!==m.$imageEl.length?(s.gestures?i.scale=e.scale*p:i.scale=m.scaleMove/m.scaleStart*p,i.scale>m.maxRatio&&(i.scale=m.maxRatio-1+(i.scale-m.maxRatio+1)**.5),i.scale<a.minRatio&&(i.scale=a.minRatio+1-(a.minRatio-i.scale+1)**.5),m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)):"gesturechange"===e.type&&b(e)}function y(e){const s=t.device,a=t.support,i=t.params.zoom,r=t.zoom;if(!a.gestures){if(!o||!c)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!s.android)return;o=!1,c=!1}m.$imageEl&&0!==m.$imageEl.length&&(r.scale=Math.max(Math.min(r.scale,m.maxRatio),i.minRatio),m.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),p=r.scale,u=!1,1===r.scale&&(m.$slideEl=void 0))}function E(e){const s=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(t.allowClick=!1,!f.isTouched||!m.$slideEl)return;f.isMoved||(f.width=m.$imageEl[0].offsetWidth,f.height=m.$imageEl[0].offsetHeight,f.startX=h(m.$imageWrapEl[0],"x")||0,f.startY=h(m.$imageWrapEl[0],"y")||0,m.slideWidth=m.$slideEl[0].offsetWidth,m.slideHeight=m.$slideEl[0].offsetHeight,m.$imageWrapEl.transition(0));const a=f.width*s.scale,i=f.height*s.scale;if(!(a<m.slideWidth&&i<m.slideHeight)){if(f.minX=Math.min(m.slideWidth/2-a/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-i/2,0),f.maxY=-f.minY,f.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!f.isMoved&&!u){if(t.isHorizontal()&&(Math.floor(f.minX)===Math.floor(f.startX)&&f.touchesCurrent.x<f.touchesStart.x||Math.floor(f.maxX)===Math.floor(f.startX)&&f.touchesCurrent.x>f.touchesStart.x))return void(f.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(f.minY)===Math.floor(f.startY)&&f.touchesCurrent.y<f.touchesStart.y||Math.floor(f.maxY)===Math.floor(f.startY)&&f.touchesCurrent.y>f.touchesStart.y))return void(f.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),f.isMoved=!0,f.currentX=f.touchesCurrent.x-f.touchesStart.x+f.startX,f.currentY=f.touchesCurrent.y-f.touchesStart.y+f.startY,f.currentX<f.minX&&(f.currentX=f.minX+1-(f.minX-f.currentX+1)**.8),f.currentX>f.maxX&&(f.currentX=f.maxX-1+(f.currentX-f.maxX+1)**.8),f.currentY<f.minY&&(f.currentY=f.minY+1-(f.minY-f.currentY+1)**.8),f.currentY>f.maxY&&(f.currentY=f.maxY-1+(f.currentY-f.maxY+1)**.8),g.prevPositionX||(g.prevPositionX=f.touchesCurrent.x),g.prevPositionY||(g.prevPositionY=f.touchesCurrent.y),g.prevTime||(g.prevTime=Date.now()),g.x=(f.touchesCurrent.x-g.prevPositionX)/(Date.now()-g.prevTime)/2,g.y=(f.touchesCurrent.y-g.prevPositionY)/(Date.now()-g.prevTime)/2,Math.abs(f.touchesCurrent.x-g.prevPositionX)<2&&(g.x=0),Math.abs(f.touchesCurrent.y-g.prevPositionY)<2&&(g.y=0),g.prevPositionX=f.touchesCurrent.x,g.prevPositionY=f.touchesCurrent.y,g.prevTime=Date.now(),m.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}}function C(){const e=t.zoom;m.$slideEl&&t.previousIndex!==t.activeIndex&&(m.$imageEl&&m.$imageEl.transform("translate3d(0,0,0) scale(1)"),m.$imageWrapEl&&m.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,p=1,m.$slideEl=void 0,m.$imageEl=void 0,m.$imageWrapEl=void 0)}function T(e){const s=t.zoom,a=t.params.zoom;if(m.$slideEl||(e&&e.target&&(m.$slideEl=d(e.target).closest(`.${t.params.slideClass}`)),m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex)),m.$imageEl=m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${a.containerClass}`)),!m.$imageEl||0===m.$imageEl.length||!m.$imageWrapEl||0===m.$imageWrapEl.length)return;let i,r,l,o,c,u,h,g,v,w,b,x,y,E,C,T,$,S;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.$slideEl.addClass(`${a.zoomedSlideClass}`),void 0===f.touchesStart.x&&e?(i="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,r="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(i=f.touchesStart.x,r=f.touchesStart.y),s.scale=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,p=m.$imageWrapEl.attr("data-swiper-zoom")||a.maxRatio,e?($=m.$slideEl[0].offsetWidth,S=m.$slideEl[0].offsetHeight,l=m.$slideEl.offset().left+n.scrollX,o=m.$slideEl.offset().top+n.scrollY,c=l+$/2-i,u=o+S/2-r,v=m.$imageEl[0].offsetWidth,w=m.$imageEl[0].offsetHeight,b=v*s.scale,x=w*s.scale,y=Math.min($/2-b/2,0),E=Math.min(S/2-x/2,0),C=-y,T=-E,h=c*s.scale,g=u*s.scale,h<y&&(h=y),h>C&&(h=C),g<E&&(g=E),g>T&&(g=T)):(h=0,g=0),m.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`),m.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)}function $(){const e=t.zoom,s=t.params.zoom;m.$slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.$slideEl=t.$wrapperEl.children(`.${t.params.slideActiveClass}`):m.$slideEl=t.slides.eq(t.activeIndex),m.$imageEl=m.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),m.$imageWrapEl=m.$imageEl.parent(`.${s.containerClass}`)),m.$imageEl&&0!==m.$imageEl.length&&m.$imageWrapEl&&0!==m.$imageWrapEl.length&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,p=1,m.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),m.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),m.$slideEl.removeClass(`${s.zoomedSlideClass}`),m.$slideEl=void 0)}function S(e){const s=t.zoom;s.scale&&1!==s.scale?$():T(e)}function M(){const e=t.support;return{passiveListener:!("touchstart"!==t.touchEvents.start||!e.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1},activeListenerWithCapture:!e.passiveListener||{passive:!1,capture:!0}}}function P(){return`.${t.params.slideClass}`}function k(e){const{passiveListener:s}=M(),a=P();t.$wrapperEl[e]("gesturestart",a,b,s),t.$wrapperEl[e]("gesturechange",a,x,s),t.$wrapperEl[e]("gestureend",a,y,s)}function z(){l||(l=!0,k("on"))}function L(){l&&(l=!1,k("off"))}function O(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const s=t.support,{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.on(t.touchEvents.start,z,a),t.$wrapperEl.on(t.touchEvents.end,L,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.on(t.touchEvents.start,r,b,a),t.$wrapperEl.on(t.touchEvents.move,r,x,i),t.$wrapperEl.on(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.on(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.on(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}function I(){const e=t.zoom;if(!e.enabled)return;const s=t.support;e.enabled=!1;const{passiveListener:a,activeListenerWithCapture:i}=M(),r=P();s.gestures?(t.$wrapperEl.off(t.touchEvents.start,z,a),t.$wrapperEl.off(t.touchEvents.end,L,a)):"touchstart"===t.touchEvents.start&&(t.$wrapperEl.off(t.touchEvents.start,r,b,a),t.$wrapperEl.off(t.touchEvents.move,r,x,i),t.$wrapperEl.off(t.touchEvents.end,r,y,a),t.touchEvents.cancel&&t.$wrapperEl.off(t.touchEvents.cancel,r,y,a)),t.$wrapperEl.off(t.touchEvents.move,`.${t.params.zoom.containerClass}`,E,i)}Object.defineProperty(t.zoom,"scale",{get:()=>v,set(e){if(v!==e){const t=m.$imageEl?m.$imageEl[0]:void 0,s=m.$slideEl?m.$slideEl[0]:void 0;i("zoomChange",e,t,s)}v=e}}),a("init",(()=>{t.params.zoom.enabled&&O()})),a("destroy",(()=>{I()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;m.$imageEl&&0!==m.$imageEl.length&&(f.isTouched||(s.android&&e.cancelable&&e.preventDefault(),f.isTouched=!0,f.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,f.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.$imageEl||0===m.$imageEl.length)return;if(!f.isTouched||!f.isMoved)return f.isTouched=!1,void(f.isMoved=!1);f.isTouched=!1,f.isMoved=!1;let s=300,a=300;const i=g.x*s,r=f.currentX+i,n=g.y*a,l=f.currentY+n;0!==g.x&&(s=Math.abs((r-f.currentX)/g.x)),0!==g.y&&(a=Math.abs((l-f.currentY)/g.y));const o=Math.max(s,a);f.currentX=r,f.currentY=l;const d=f.width*e.scale,c=f.height*e.scale;f.minX=Math.min(m.slideWidth/2-d/2,0),f.maxX=-f.minX,f.minY=Math.min(m.slideHeight/2-c/2,0),f.maxY=-f.minY,f.currentX=Math.max(Math.min(f.currentX,f.maxX),f.minX),f.currentY=Math.max(Math.min(f.currentY,f.maxY),f.minY),m.$imageWrapEl.transition(o).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&S(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&C()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&C()})),Object.assign(t.zoom,{enable:O,disable:I,in:T,out:$,toggle:S})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;s({lazy:{checkInView:!1,enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,scrollingElement:"",elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}}),t.lazy={};let n=!1,l=!1;function o(e,s){void 0===s&&(s=!0);const a=t.params.lazy;if(void 0===e)return;if(0===t.slides.length)return;const r=t.virtual&&t.params.virtual.enabled?t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`):t.slides.eq(e),n=r.find(`.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`);!r.hasClass(a.elementClass)||r.hasClass(a.loadedClass)||r.hasClass(a.loadingClass)||n.push(r[0]),0!==n.length&&n.each((e=>{const n=d(e);n.addClass(a.loadingClass);const l=n.attr("data-background"),c=n.attr("data-src"),p=n.attr("data-srcset"),u=n.attr("data-sizes"),h=n.parent("picture");t.loadImage(n[0],c||l,p,u,!1,(()=>{if(null!=t&&t&&(!t||t.params)&&!t.destroyed){if(l?(n.css("background-image",`url("${l}")`),n.removeAttr("data-background")):(p&&(n.attr("srcset",p),n.removeAttr("data-srcset")),u&&(n.attr("sizes",u),n.removeAttr("data-sizes")),h.length&&h.children("source").each((e=>{const t=d(e);t.attr("data-srcset")&&(t.attr("srcset",t.attr("data-srcset")),t.removeAttr("data-srcset"))})),c&&(n.attr("src",c),n.removeAttr("data-src"))),n.addClass(a.loadedClass).removeClass(a.loadingClass),r.find(`.${a.preloaderClass}`).remove(),t.params.loop&&s){const e=r.attr("data-swiper-slide-index");if(r.hasClass(t.params.slideDuplicateClass)){o(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(),!1)}else{o(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(),!1)}}i("lazyImageReady",r[0],n[0]),t.params.autoHeight&&t.updateAutoHeight()}})),i("lazyImageLoad",r[0],n[0])}))}function c(){const{$wrapperEl:e,params:s,slides:a,activeIndex:i}=t,r=t.virtual&&s.virtual.enabled,n=s.lazy;let c=s.slidesPerView;function p(t){if(r){if(e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length)return!0}else if(a[t])return!0;return!1}function u(e){return r?d(e).attr("data-swiper-slide-index"):d(e).index()}if("auto"===c&&(c=0),l||(l=!0),t.params.watchSlidesProgress)e.children(`.${s.slideVisibleClass}`).each((e=>{o(r?d(e).attr("data-swiper-slide-index"):d(e).index())}));else if(c>1)for(let e=i;e<i+c;e+=1)p(e)&&o(e);else o(i);if(n.loadPrevNext)if(c>1||n.loadPrevNextAmount&&n.loadPrevNextAmount>1){const e=n.loadPrevNextAmount,t=Math.ceil(c),s=Math.min(i+t+Math.max(e,t),a.length),r=Math.max(i-Math.max(t,e),0);for(let e=i+t;e<s;e+=1)p(e)&&o(e);for(let e=r;e<i;e+=1)p(e)&&o(e)}else{const t=e.children(`.${s.slideNextClass}`);t.length>0&&o(u(t));const a=e.children(`.${s.slidePrevClass}`);a.length>0&&o(u(a))}}function p(){const e=r();if(!t||t.destroyed)return;const s=t.params.lazy.scrollingElement?d(t.params.lazy.scrollingElement):d(e),a=s[0]===e,i=a?e.innerWidth:s[0].offsetWidth,l=a?e.innerHeight:s[0].offsetHeight,o=t.$el.offset(),{rtlTranslate:u}=t;let h=!1;u&&(o.left-=t.$el[0].scrollLeft);const m=[[o.left,o.top],[o.left+t.width,o.top],[o.left,o.top+t.height],[o.left+t.width,o.top+t.height]];for(let e=0;e<m.length;e+=1){const t=m[e];if(t[0]>=0&&t[0]<=i&&t[1]>=0&&t[1]<=l){if(0===t[0]&&0===t[1])continue;h=!0}}const f=!("touchstart"!==t.touchEvents.start||!t.support.passiveListener||!t.params.passiveListeners)&&{passive:!0,capture:!1};h?(c(),s.off("scroll",p,f)):n||(n=!0,s.on("scroll",p,f))}a("beforeInit",(()=>{t.params.lazy.enabled&&t.params.preloadImages&&(t.params.preloadImages=!1)})),a("init",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("scroll",(()=>{t.params.freeMode&&t.params.freeMode.enabled&&!t.params.freeMode.sticky&&c()})),a("scrollbarDragMove resize _freeModeNoMomentumRelease",(()=>{t.params.lazy.enabled&&(t.params.lazy.checkInView?p():c())})),a("transitionStart",(()=>{t.params.lazy.enabled&&(t.params.lazy.loadOnTransitionStart||!t.params.lazy.loadOnTransitionStart&&!l)&&(t.params.lazy.checkInView?p():c())})),a("transitionEnd",(()=>{t.params.lazy.enabled&&!t.params.lazy.loadOnTransitionStart&&(t.params.lazy.checkInView?p():c())})),a("slideChange",(()=>{const{lazy:e,cssMode:s,watchSlidesProgress:a,touchReleaseOnEdges:i,resistanceRatio:r}=t.params;e.enabled&&(s||a&&(i||0===r))&&c()})),a("destroy",(()=>{t.$el&&t.$el.find(`.${t.params.lazy.loadingClass}`).removeClass(t.params.lazy.loadingClass)})),Object.assign(t.lazy,{load:c,loadInSlide:o})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline||(t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid))}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function n(s){s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&p((()=>{s.updateAutoHeight()})),s.$wrapperEl.transitionEnd((()=>{i&&(s.params.loop&&"slide"===t.params.controller.by&&s.loopFix(),s.transitionEnd())})))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null}}),t.a11y={clicked:!1};let i=null;function r(e){const t=i;0!==t.length&&(t.html(""),t.html(e))}function n(e){e.attr("tabIndex","0")}function l(e){e.attr("tabIndex","-1")}function o(e,t){e.attr("role",t)}function c(e,t){e.attr("aria-roledescription",t)}function p(e,t){e.attr("aria-label",t)}function u(e){e.attr("aria-disabled",!0)}function h(e){e.attr("aria-disabled",!1)}function m(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=d(e.target);t.navigation&&t.navigation.$nextEl&&a.is(t.navigation.$nextEl)&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.$prevEl&&a.is(t.navigation.$prevEl)&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.is(U(t.params.pagination.bulletClass))&&a[0].click()}function f(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function g(){return f()&&t.params.pagination.clickable}const v=(e,t,s)=>{n(e),"BUTTON"!==e[0].tagName&&(o(e,"button"),e.on("keydown",m)),p(e,s),function(e,t){e.attr("aria-controls",t)}(e,t)},w=()=>{t.a11y.clicked=!0},b=()=>{requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.destroyed||(t.a11y.clicked=!1)}))}))},x=e=>{if(t.a11y.clicked)return;const s=e.target.closest(`.${t.params.slideClass}`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,t.slideTo(t.slides.indexOf(s),0))},y=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&c(d(t.slides),e.itemRoleDescriptionMessage),e.slideRole&&o(d(t.slides),e.slideRole);const s=t.params.loop?t.slides.filter((e=>!e.classList.contains(t.params.slideDuplicateClass))).length:t.slides.length;e.slideLabelMessage&&t.slides.each(((a,i)=>{const r=d(a),n=t.params.loop?parseInt(r.attr("data-swiper-slide-index"),10):i;p(r,e.slideLabelMessage.replace(/\{\{index\}\}/,n+1).replace(/\{\{slidesLength\}\}/,s))}))},E=()=>{const e=t.params.a11y;t.$el.append(i);const s=t.$el;e.containerRoleDescriptionMessage&&c(s,e.containerRoleDescriptionMessage),e.containerMessage&&p(s,e.containerMessage);const a=t.$wrapperEl,r=e.id||a.attr("id")||`swiper-wrapper-${n=16,void 0===n&&(n=16),"x".repeat(n).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var n;const l=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var o;let d,u;o=r,a.attr("id",o),function(e,t){e.attr("aria-live",t)}(a,l),y(),t.navigation&&t.navigation.$nextEl&&(d=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(u=t.navigation.$prevEl),d&&d.length&&v(d,r,e.nextSlideMessage),u&&u.length&&v(u,r,e.prevSlideMessage),g()&&t.pagination.$el.on("keydown",U(t.params.pagination.bulletClass),m),t.$el.on("focus",x,!0),t.$el.on("pointerdown",w,!0),t.$el.on("pointerup",b,!0)};a("beforeInit",(()=>{i=d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)})),a("afterInit",(()=>{t.params.a11y.enabled&&E()})),a("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&y()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{$nextEl:e,$prevEl:s}=t.navigation;s&&s.length>0&&(t.isBeginning?(u(s),l(s)):(h(s),n(s))),e&&e.length>0&&(t.isEnd?(u(e),l(e)):(h(e),n(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;f()&&t.pagination.bullets.each((s=>{const a=d(s);t.params.pagination.clickable&&(n(a),t.params.pagination.renderBullet||(o(a,"button"),p(a,e.paginationBulletMessage.replace(/\{\{index\}\}/,a.index()+1)))),a.is(`.${t.params.pagination.bulletActiveClass}`)?a.attr("aria-current","true"):a.removeAttr("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){let e,s;i&&i.length>0&&i.remove(),t.navigation&&t.navigation.$nextEl&&(e=t.navigation.$nextEl),t.navigation&&t.navigation.$prevEl&&(s=t.navigation.$prevEl),e&&e.off("keydown",m),s&&s.off("keydown",m),g()&&t.pagination.$el.off("keydown",U(t.params.pagination.bulletClass),m),t.$el.off("focus",x,!0),t.$el.off("pointerdown",w,!0),t.$el.off("pointerup",b,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides.eq(s);let d=l(o.attr("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e}/${d}`}else n.pathname.includes(e)||(d=`${e}/${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides.eq(i);if(l(r.attr("data-history"))===s&&!r.hasClass(t.params.slideDuplicateClass)){const s=r.index();t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),(n.key||n.value)&&(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p))}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),c=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}});const p=()=>{i("hashChange");const e=o.location.hash.replace("#","");if(e!==t.slides.eq(t.activeIndex).attr("data-hash")){const s=t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();if(void 0===s)return;t.slideTo(s)}},u=()=>{if(l&&t.params.hashNavigation.enabled)if(t.params.hashNavigation.replaceState&&c.history&&c.history.replaceState)c.history.replaceState(null,null,`#${t.slides.eq(t.activeIndex).attr("data-hash")}`||""),i("hashSet");else{const e=t.slides.eq(t.activeIndex),s=e.attr("data-hash")||e.attr("data-history");o.location.hash=s||"",i("hashSet")}};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0;for(let a=0,i=t.slides.length;a<i;a+=1){const i=t.slides.eq(a);if((i.attr("data-hash")||i.attr("data-history"))===e&&!i.hasClass(t.params.slideDuplicateClass)){const e=i.index();t.slideTo(e,s,t.params.runCallbacksOnInit,!0)}}}t.params.hashNavigation.watchState&&d(c).on("hashchange",p)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d(c).off("hashchange",p)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&u()})),n("slideChange",(()=>{l&&t.params.cssMode&&u()}))},function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;function l(){if(!s.size)return s.autoplay.running=!1,void(s.autoplay.paused=!1);const e=s.slides.eq(s.activeIndex);let a=s.params.autoplay.delay;e.attr("data-swiper-autoplay")&&(a=e.attr("data-swiper-autoplay")||s.params.autoplay.delay),clearTimeout(t),t=p((()=>{let e;s.params.autoplay.reverseDirection?s.params.loop?(s.loopFix(),e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.isBeginning?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(s.slides.length-1,s.params.speed,!0,!0),n("autoplay")):(e=s.slidePrev(s.params.speed,!0,!0),n("autoplay")):s.params.loop?(s.loopFix(),e=s.slideNext(s.params.speed,!0,!0),n("autoplay")):s.isEnd?s.params.autoplay.stopOnLastSlide?d():(e=s.slideTo(0,s.params.speed,!0,!0),n("autoplay")):(e=s.slideNext(s.params.speed,!0,!0),n("autoplay")),(s.params.cssMode&&s.autoplay.running||!1===e)&&l()}),a)}function o(){return void 0===t&&(!s.autoplay.running&&(s.autoplay.running=!0,n("autoplayStart"),l(),!0))}function d(){return!!s.autoplay.running&&(void 0!==t&&(t&&(clearTimeout(t),t=void 0),s.autoplay.running=!1,n("autoplayStop"),!0))}function c(e){s.autoplay.running&&(s.autoplay.paused||(t&&clearTimeout(t),s.autoplay.paused=!0,0!==e&&s.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].addEventListener(e,h)})):(s.autoplay.paused=!1,l())))}function u(){const e=a();"hidden"===e.visibilityState&&s.autoplay.running&&c(),"visible"===e.visibilityState&&s.autoplay.paused&&(l(),s.autoplay.paused=!1)}function h(e){s&&!s.destroyed&&s.$wrapperEl&&e.target===s.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)})),s.autoplay.paused=!1,s.autoplay.running?l():d())}function m(){s.params.autoplay.disableOnInteraction?d():(n("autoplayPause"),c()),["transitionend","webkitTransitionEnd"].forEach((e=>{s.$wrapperEl[0].removeEventListener(e,h)}))}function f(){s.params.autoplay.disableOnInteraction||(s.autoplay.paused=!1,n("autoplayResume"),l())}s.autoplay={running:!1,paused:!1},i({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}}),r("init",(()=>{if(s.params.autoplay.enabled){o();a().addEventListener("visibilitychange",u),s.params.autoplay.pauseOnMouseEnter&&(s.$el.on("mouseenter",m),s.$el.on("mouseleave",f))}})),r("beforeTransitionStart",((e,t,a)=>{s.autoplay.running&&(a||!s.params.autoplay.disableOnInteraction?s.autoplay.pause(t):d())})),r("sliderFirstMove",(()=>{s.autoplay.running&&(s.params.autoplay.disableOnInteraction?d():c())})),r("touchEnd",(()=>{s.params.cssMode&&s.autoplay.paused&&!s.params.autoplay.disableOnInteraction&&l()})),r("destroy",(()=>{s.$el.off("mouseenter",m),s.$el.off("mouseleave",f),s.autoplay.running&&d();a().removeEventListener("visibilitychange",u)})),Object.assign(s.autoplay,{pause:c,run:l,start:o,stop:d})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let i=!1,r=!1;function n(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&d(a).hasClass(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;if(i=e.params.loop?parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"),10):s,t.params.loop){let e=t.activeIndex;t.slides.eq(e).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,e=t.activeIndex);const s=t.slides.eq(e).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),a=t.slides.eq(e).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();i=void 0===s?a:void 0===a?s:a-e<e-s?a:s}t.slideTo(i)}function l(){const{thumbs:e}=t.params;if(i)return!1;i=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1});else if(m(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),r=!0}return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",n),!0}function o(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.removeClass(r),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(r);else for(let e=0;e<i;e+=1)s.slides.eq(t.realIndex+e).addClass(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){let i,r,o=s.activeIndex;if(s.params.loop){s.slides.eq(o).hasClass(s.params.slideDuplicateClass)&&(s.loopFix(),s._clientLeft=s.$wrapperEl[0].clientLeft,o=s.activeIndex);const e=s.slides.eq(o).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),a=s.slides.eq(o).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();i=void 0===e?a:void 0===a?e:a-o==o-e?s.params.slidesPerGroup>1?a:o:a-o<o-e?a:e,r=t.activeIndex>t.previousIndex?"next":"prev"}else i=t.realIndex,r=i>t.previousIndex?"next":"prev";l&&(i+="next"===r?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(i)<0&&(s.params.centeredSlides?i=i>o?i-Math.floor(a/2)+1:i+Math.floor(a/2)-1:i>o&&s.params.slidesPerGroup,s.slideTo(i,e?0:void 0))}}t.thumbs={swiper:null},a("beforeInit",(()=>{const{thumbs:e}=t.params;e&&e.swiper&&(l(),o(!0))})),a("slideChange update resize observerUpdate",(()=>{o()})),a("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),a("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&r&&e.destroy()})),Object.assign(t.thumbs,{init:l,update:o})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:u()})},onTouchEnd:function(e){let{currentPos:s}=e;const{params:r,$wrapperEl:n,rtlTranslate:l,snapGrid:o,touchEventsData:d}=t,c=u()-d.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<o.length?t.slideTo(o.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(d.velocities.length>1){const e=d.velocities.pop(),s=d.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||u()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,d.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let c=t.translate+s;l&&(c=-c);let p,h=!1;const m=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(c<t.maxTranslate())r.freeMode.momentumBounce?(c+t.maxTranslate()<-m&&(c=t.maxTranslate()-m),p=t.maxTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(c>t.minTranslate())r.freeMode.momentumBounce?(c-t.minTranslate()>m&&(c=t.minTranslate()+m),p=t.minTranslate(),h=!0,d.allowMomentumBounce=!0):c=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<o.length;t+=1)if(o[t]>-c){e=t;break}c=Math.abs(o[e]-c)<Math.abs(o[e-1]-c)||"next"===t.swipeDirection?o[e]:o[e-1],c=-c}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=l?Math.abs((-c-t.translate)/t.velocity):Math.abs((c-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((l?-c:c)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&h?(t.updateProgress(p),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&d.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(p),n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(c),t.setTransition(e),t.setTranslate(c),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,n.transitionEnd((()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(c),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||c>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,{swiper:i,extendParams:r}=e;r({grid:{rows:1,fill:"column"}}),i.grid={initSlides:e=>{const{slidesPerView:r}=i.params,{rows:n,fill:l}=i.params.grid;s=t/n,a=Math.floor(e/n),t=Math.floor(e/n)===e/n?e:Math.ceil(e/n)*n,"auto"!==r&&"row"===l&&(t=Math.max(t,r*n))},updateSlide:(e,r,n,l)=>{const{slidesPerGroup:o,spaceBetween:d}=i.params,{rows:c,fill:p}=i.params.grid;let u,h,m;if("row"===p&&o>1){const s=Math.floor(e/(o*c)),a=e-c*o*s,i=0===s?o:Math.min(Math.ceil((n-s*c*o)/c),o);m=Math.floor(a/i),h=a-m*i+s*o,u=h+m*t/c,r.css({"-webkit-order":u,order:u})}else"column"===p?(h=Math.floor(e/c),m=e-h*c,(h>a||h===a&&m===c-1)&&(m+=1,m>=c&&(m=0,h+=1))):(m=Math.floor(e/s),h=e-m*s);r.css(l("margin-top"),0!==m?d&&`${d}px`:"")},updateWrapperSize:(e,s,a)=>{const{spaceBetween:r,centeredSlides:n,roundLengths:l}=i.params,{rows:o}=i.params.grid;if(i.virtualSize=(e+r)*t,i.virtualSize=Math.ceil(i.virtualSize/o)-r,i.$wrapperEl.css({[a("width")]:`${i.virtualSize+r}px`}),n){s.splice(0,s.length);const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];l&&(a=Math.floor(a)),s[t]<i.virtualSize+s[0]&&e.push(a)}s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:K.bind(t),prependSlide:Z.bind(t),addSlide:Q.bind(t),removeSlide:J.bind(t),removeAllSlides:ee.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1,transformEl:null}}),te({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t,s=t.params.fadeEffect;for(let a=0;a<e.length;a+=1){const e=t.slides.eq(a);let i=-e[0].swiperSlideOffset;t.params.virtualTranslate||(i-=t.translate);let r=0;t.isHorizontal()||(r=i,i=0);const n=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e[0].progress),0):1+Math.min(Math.max(e[0].progress,-1),0);se(s,e).css({opacity:n}).transform(`translate3d(${i}px, ${r}px, 0px)`)}},setTransition:e=>{const{transformEl:s}=t.params.fadeEffect;(s?t.slides.find(s):t.slides).transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),i=s?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom");0===a.length&&(a=d(`<div class="swiper-slide-shadow-${s?"left":"top"}"></div>`),e.append(a)),0===i.length&&(i=d(`<div class="swiper-slide-shadow-${s?"right":"bottom"}"></div>`),e.append(i)),a.length&&(a[0].style.opacity=Math.max(-t,0)),i.length&&(i[0].style.opacity=Math.max(t,0))};te({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{$el:e,$wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:c}=t,p=t.params.cubeEffect,u=t.isHorizontal(),h=t.virtual&&t.params.virtual.enabled;let m,f=0;p.shadow&&(u?(m=s.find(".swiper-cube-shadow"),0===m.length&&(m=d('<div class="swiper-cube-shadow"></div>'),s.append(m)),m.css({height:`${r}px`})):(m=e.find(".swiper-cube-shadow"),0===m.length&&(m=d('<div class="swiper-cube-shadow"></div>'),e.append(m))));for(let e=0;e<a.length;e+=1){const t=a.eq(e);let s=e;h&&(s=parseInt(t.attr("data-swiper-slide-index"),10));let r=90*s,n=Math.floor(r/360);l&&(r=-r,n=Math.floor(-r/360));const d=Math.max(Math.min(t[0].progress,1),-1);let c=0,m=0,g=0;s%4==0?(c=4*-n*o,g=0):(s-1)%4==0?(c=0,g=4*-n*o):(s-2)%4==0?(c=o+4*n*o,g=o):(s-3)%4==0&&(c=-o,g=3*o+4*o*n),l&&(c=-c),u||(m=c,c=0);const v=`rotateX(${u?0:-r}deg) rotateY(${u?r:0}deg) translate3d(${c}px, ${m}px, ${g}px)`;d<=1&&d>-1&&(f=90*s+90*d,l&&(f=90*-s-90*d)),t.transform(v),p.slideShadows&&i(t,d,u)}if(s.css({"-webkit-transform-origin":`50% 50% -${o/2}px`,"transform-origin":`50% 50% -${o/2}px`}),p.shadow)if(u)m.transform(`translate3d(0px, ${r/2+p.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`);else{const e=Math.abs(f)-90*Math.floor(Math.abs(f)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=p.shadowScale,a=p.shadowScale/t,i=p.shadowOffset;m.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-90deg)`)}const g=c.isSafari||c.isWebView?-o/2:0;s.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:f}deg) rotateY(${t.isHorizontal()?-f:0}deg)`),s[0].style.setProperty("--swiper-cube-translate-z",`${g}px`)},setTransition:e=>{const{$el:s,slides:a}=t;a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.cubeEffect.shadow&&!t.isHorizontal()&&s.find(".swiper-cube-shadow").transition(e)},recreateShadows:()=>{const e=t.isHorizontal();t.slides.each((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(d(t),s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0,transformEl:null}});const i=(e,s,a)=>{let i=t.isHorizontal()?e.find(".swiper-slide-shadow-left"):e.find(".swiper-slide-shadow-top"),r=t.isHorizontal()?e.find(".swiper-slide-shadow-right"):e.find(".swiper-slide-shadow-bottom");0===i.length&&(i=ie(a,e,t.isHorizontal()?"left":"top")),0===r.length&&(r=ie(a,e,t.isHorizontal()?"right":"bottom")),i.length&&(i[0].style.opacity=Math.max(-s,0)),r.length&&(r[0].style.opacity=Math.max(s,0))};te({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let r=0;r<e.length;r+=1){const n=e.eq(r);let l=n[0].progress;t.params.flipEffect.limitRotation&&(l=Math.max(Math.min(n[0].progress,1),-1));const o=n[0].swiperSlideOffset;let d=-180*l,c=0,p=t.params.cssMode?-o-t.translate:-o,u=0;t.isHorizontal()?s&&(d=-d):(u=p,p=0,c=-d,d=0),n[0].style.zIndex=-Math.abs(Math.round(l))+e.length,a.slideShadows&&i(n,l,a);const h=`translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;se(a,n).transform(h)}},setTransition:e=>{const{transformEl:s}=t.params.flipEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),ae({swiper:t,duration:e,transformEl:s})},recreateShadows:()=>{const e=t.params.flipEffect;t.slides.each((s=>{const a=d(s);let r=a[0].progress;t.params.flipEffect.limitRotation&&(r=Math.max(Math.min(s.progress,1),-1)),i(a,r,e)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0,transformEl:null}}),te({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a.eq(e),s=i[e],l=(o-t[0].swiperSlideOffset-s/2)/s,p="function"==typeof r.modifier?r.modifier(l):l*r.modifier;let u=n?d*p:0,h=n?0:d*p,m=-c*Math.abs(p),f=r.stretch;"string"==typeof f&&-1!==f.indexOf("%")&&(f=parseFloat(r.stretch)/100*s);let g=n?0:f*p,v=n?f*p:0,w=1-(1-r.scale)*Math.abs(p);Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(h)<.001&&(h=0),Math.abs(w)<.001&&(w=0);const b=`translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;if(se(r,t).transform(b),t[0].style.zIndex=1-Math.abs(Math.round(p)),r.slideShadows){let e=n?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),s=n?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===e.length&&(e=ie(r,t,n?"left":"top")),0===s.length&&(s=ie(r,t,n?"right":"bottom")),e.length&&(e[0].style.opacity=p>0?p:0),s.length&&(s[0].style.opacity=-p>0?-p:0)}}},setTransition:e=>{const{transformEl:s}=t.params.coverflowEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{transformEl:null,limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;te({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,$wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.transform(`translateX(calc(50% - ${e}px))`)}for(let s=0;s<e.length;s+=1){const a=e.eq(s),o=a[0].progress,d=Math.min(Math.max(a[0].progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a[0].originalProgress,-r.limitProgress),r.limitProgress));const p=a[0].swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],h=[0,0,0];let m=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,m=!0):d>0&&(f=r.prev,m=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),h.forEach(((e,t)=>{h[t]=f.rotate[t]*Math.abs(d*n)})),a[0].style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,x=`translate3d(${g}) ${v} ${w}`;if(m&&f.shadow||!m){let e=a.children(".swiper-slide-shadow");if(0===e.length&&f.shadow&&(e=ie(r,a)),e.length){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e[0].style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const y=se(r,a);y.transform(x).css({opacity:b}),f.origin&&y.css("transform-origin",f.origin)}},setTransition:e=>{const{transformEl:s}=t.params.creativeEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,transformEl:null,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),te({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s}=t,a=t.params.cardsEffect,{startTranslate:i,isTouched:r}=t.touchEventsData,n=t.translate;for(let l=0;l<e.length;l+=1){const o=e.eq(l),d=o[0].progress,c=Math.min(Math.max(d,-4),4);let p=o[0].swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(p-=e[0].swiperSlideOffset);let u=t.params.cssMode?-p-t.translate:-p,h=0;const m=-100*Math.abs(c);let f=1,g=-a.perSlideRotate*c,v=a.perSlideOffset-.75*Math.abs(c);const w=t.virtual&&t.params.virtual.enabled?t.virtual.from+l:l,b=(w===s||w===s-1)&&c>0&&c<1&&(r||t.params.cssMode)&&n<i,x=(w===s||w===s+1)&&c<0&&c>-1&&(r||t.params.cssMode)&&n>i;if(b||x){const e=(1-Math.abs((Math.abs(c)-.5)/.5))**.5;g+=-28*c*e,f+=-.5*e,v+=96*e,h=-25*e*Math.abs(c)+"%"}if(u=c<0?`calc(${u}px + (${v*Math.abs(c)}%))`:c>0?`calc(${u}px + (-${v*Math.abs(c)}%))`:`${u}px`,!t.isHorizontal()){const e=h;h=u,u=e}const y=c<0?""+(1+(1-f)*c):""+(1-(1-f)*c),E=`\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${a.rotate?g:0}deg)\n        scale(${y})\n      `;if(a.slideShadows){let e=o.find(".swiper-slide-shadow");0===e.length&&(e=ie(a,o)),e.length&&(e[0].style.opacity=Math.min(Math.max((Math.abs(c)-.5)/.5,0),1))}o[0].style.zIndex=-Math.abs(Math.round(d))+e.length;se(a,o).transform(E)}},setTransition:e=>{const{transformEl:s}=t.params.cardsEffect;(s?t.slides.find(s):t.slides).transition(e).find(".swiper-slide-shadow").transition(e),ae({swiper:t,duration:e,transformEl:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return V.use(re),V}));

/* End */
;
; /* Start:"a:4:{s:4:"full";s:74:"/local/templates/psk2024/js/libs/jquery.suggestions.min.js?172404917958245";s:6:"source";s:58:"/local/templates/psk2024/js/libs/jquery.suggestions.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):t(e.jQuery)}(this,function(e){"use strict";function t(e,t){return function(n,i){var s,o=[];return t(i)&&(s=k.splitTokens(k.split(n,e)),y.each(i,function(t,i){var r=t.value;if(k.stringEncloses(n,r))return!1;var a=k.splitTokens(k.split(r,e));0===y.minus(s,a).length&&o.push(i)})),1===o.length?o[0]:-1}}function n(e,t){var n=e.data&&e.data[t];return n&&new RegExp("^"+k.escapeRegExChars(n)+"(["+w+"]|$)","i").test(e.value)}function i(e,t){var n=/<strong>/;return n.test(t)&&!n.test(e)?t:e}function s(e,t,n,s,o){var r=this;return i(r.highlightMatches(e,n,s,o),r.highlightMatches(t,n,s,o))}function o(e){this.urlSuffix=e.toLowerCase(),this.noSuggestionsHint="����������� ��������",this.matchers=[F.matchByNormalizedQuery(),F.matchByWords()]}function r(t,n){var i=this;i.element=t,i.el=e(t),i.suggestions=[],i.badQueries=[],i.selectedIndex=-1,i.currentValue=i.element.value,i.intervalId=0,i.cachedResponse={},i.enrichmentCache={},i.currentRequest=null,i.inputPhase=e.Deferred(),i.fetchPhase=e.Deferred(),i.enrichPhase=e.Deferred(),i.onChangeTimeout=null,i.triggering={},i.$wrapper=null,i.options=e.extend({},V,n),i.classes=x,i.disabled=!1,i.selection=null,i.$viewport=e(window),i.$body=e(document.body),i.type=null,i.status={},i.setupElement(),i.initializer=e.Deferred(),i.el.is(":visible")?i.initializer.resolve():i.deferInitialization(),i.initializer.done(e.proxy(i.initialize,i))}function a(){L.each(G,function(e){e.abort()}),G={}}function u(){X=null,V.geoLocation=Y}function l(t){return e.map(t,function(e){var t=L.escapeHtml(e.text);return t&&e.matched&&(t="<strong>"+t+"</strong>"),t}).join("")}function c(t,n){var i=t.split(", ");return 1===i.length?t:e.map(i,function(e){return'<span class="'+n+'">'+e+"</span>"}).join(", ")}function d(t,n){var i=!1;return e.each(t,function(e,t){if(i=t.value==n.value&&t!=n)return!1}),i}function f(e,t){var n=t.selection,i=n&&n.data&&t.bounds;return i&&y.each(t.bounds.all,function(t,s){return i=n.data[t]===e.data[t]}),i}function p(e){var t=e.replace(/^(\d{2})(\d*?)(0+)$/g,"$1$2"),n=t.length,i=-1;return n<=2?i=2:n>2&&n<=5?i=5:n>5&&n<=8?i=8:n>8&&n<=11?i=11:n>11&&n<=15?i=15:n>15&&(i=19),k.padEnd(t,i,"0")}function g(e){this.plan=e.status.plan;var t=e.getContainer();this.element=de.selectByClass(x.promo,t)}function h(){new g(this).show()}e=e&&e.hasOwnProperty("default")?e.default:e;var m={isArray:function(e){return Array.isArray(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isEmptyObject:function(e){return 0===Object.keys(e).length&&e.constructor===Object},isPlainObject:function(e){return void 0!==e&&"object"==typeof e&&null!==e&&!e.nodeType&&e!==e.window&&!(e.constructor&&!Object.prototype.hasOwnProperty.call(e.constructor.prototype,"isPrototypeOf"))}},y={compact:function(e){return e.filter(function(e){return!!e})},each:function(e,t){if(Array.isArray(e))return void e.some(function(e,n){return!1===t(e,n)});Object.keys(e).some(function(n){var i=e[n];return!1===t(i,n)})},intersect:function(e,t){var n=[];return Array.isArray(e)&&Array.isArray(t)?e.filter(function(e){return-1!==t.indexOf(e)}):n},minus:function(e,t){return t&&0!==t.length?e.filter(function(e){return-1===t.indexOf(e)}):e},makeArray:function(e){return m.isArray(e)?Array.prototype.slice.call(e):[e]},minusWithPartialMatching:function(e,t){return t&&0!==t.length?e.filter(function(e){return!t.some(function(t){return 0===t.indexOf(e)})}):e},slice:function(e,t){return Array.prototype.slice.call(e,t)}},_={delay:function(e,t){return setTimeout(e,t||0)}},v={areSame:function e(t,n){var i=!0;return typeof t==typeof n&&("object"==typeof t&&null!=t&&null!=n?(y.each(t,function(t,s){return i=e(t,n[s])}),i):t===n)},assign:function(e,t){if("function"==typeof Object.assign)return Object.assign.apply(null,arguments);if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),i=1;i<arguments.length;i++){var s=arguments[i];if(null!=s)for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(n[o]=s[o])}return n},clone:function(e){return JSON.parse(JSON.stringify(e))},compact:function(e){var t=v.clone(e);return y.each(t,function(e,n){null!==e&&void 0!==e&&""!==e||delete t[n]}),t},fieldsAreNotEmpty:function(e,t){if(!m.isPlainObject(e))return!1;var n=!0;return y.each(t,function(t,i){return n=!!e[t]}),n},getDeepValue:function e(t,n){var i=n.split("."),s=i.shift();return t&&(i.length?e(t[s],i.join(".")):t[s])},indexObjectsById:function(e,t,n){var i={};return y.each(e,function(e,s){var o=e[t],r={};n&&(r[n]=s),i[o]=v.assign(r,e)}),i}},b={ENTER:13,ESC:27,TAB:9,SPACE:32,UP:38,DOWN:40},x={hint:"suggestions-hint",mobile:"suggestions-mobile",nowrap:"suggestions-nowrap",promo:"suggestions-promo",selected:"suggestions-selected",suggestion:"suggestions-suggestion",subtext:"suggestions-subtext",subtext_inline:"suggestions-subtext suggestions-subtext_inline",subtext_delimiter:"suggestions-subtext-delimiter",subtext_label:"suggestions-subtext suggestions-subtext_label",removeConstraint:"suggestions-remove",value:"suggestions-value"},S=".suggestions",w="\\s\"'~\\*\\.,:\\|\\[\\]\\(\\)\\{\\}<>�",C=new RegExp("["+w+"]+","g"),E=new RegExp("[\\-\\+\\\\\\?!@#$%^&]+","g"),k={escapeHtml:function(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"};return e&&y.each(t,function(t,n){e=e.replace(new RegExp(n,"g"),t)}),e},escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},formatToken:function(e){return e&&e.toLowerCase().replace(/[��]/g,"�")},getWordExtractorRegExp:function(){return new RegExp("([^"+w+"]*)(["+w+"]*)","g")},normalize:function(e,t){return k.split(e,t).join(" ")},padEnd:function(e,t,n){return String.prototype.padEnd?e.padEnd(t,n):(t>>=0,n=String(void 0!==n?n:" "),e.length>t?String(e):(t-=e.length,t>n.length&&(n+=n.repeat(t/n.length)),String(e)+n.slice(0,t)))},split:function(e,t){var n=e.toLowerCase().replace("�","�").replace(/(\d+)([�-�]{2,})/g,"$1 $2").replace(/([�-�]+)(\d+)/g,"$1 $2"),i=y.compact(n.split(C));if(!i.length)return[];var s=i.pop(),o=y.minus(i,t);return o.push(s),o},splitTokens:function(e){var t=[];return y.each(e,function(e,n){var i=e.split(E);t=t.concat(y.compact(i))}),t},stringEncloses:function(e,t){return e.length>t.length&&-1!==e.toLowerCase().indexOf(t.toLowerCase())},tokenize:function(e,t){var n=y.compact(k.formatToken(e).split(C)),i=y.minus(n,t),s=y.minus(n,i);return n=k.withSubTokens(i.concat(s))},withSubTokens:function(e){var t=[];return y.each(e,function(e,n){var i=e.split(E);t.push(e),i.length>1&&(t=t.concat(y.compact(i)))}),t}},B={Deferred:function(){return e.Deferred()},ajax:function(t){return e.ajax(t)},extend:function(){return e.extend.apply(null,arguments)},isJqObject:function(t){return t instanceof e},param:function(t){return e.param(t)},proxy:function(t,n){return e.proxy(t,n)},select:function(t){return e(t)},supportsCors:function(){return e.support.cors}},T={getDefaultType:function(){return B.supportsCors()?"POST":"GET"},getDefaultContentType:function(){return B.supportsCors()?"application/json":"application/x-www-form-urlencoded"},fixURLProtocol:function(e){return B.supportsCors()?e:e.replace(/^https?:/,location.protocol)},addUrlParams:function(e,t){return e+(/\?/.test(e)?"&":"?")+B.param(t)},serialize:function(e){return B.supportsCors()?JSON.stringify(e,function(e,t){return null===t?void 0:t}):(e=v.compact(e),B.param(e,!0))}},j=function(){var e=0;return function(t){return(t||"")+ ++e}}(),L={escapeRegExChars:k.escapeRegExChars,escapeHtml:k.escapeHtml,formatToken:k.formatToken,normalize:k.normalize,reWordExtractor:k.getWordExtractorRegExp,stringEncloses:k.stringEncloses,addUrlParams:T.addUrlParams,getDefaultContentType:T.getDefaultContentType,getDefaultType:T.getDefaultType,fixURLProtocol:T.fixURLProtocol,serialize:T.serialize,arrayMinus:y.minus,arrayMinusWithPartialMatching:y.minusWithPartialMatching,arraysIntersection:y.intersect,compact:y.compact,each:y.each,makeArray:y.makeArray,slice:y.slice,delay:_.delay,areSame:v.areSame,compactObject:v.compact,getDeepValue:v.getDeepValue,fieldsNotEmpty:v.fieldsAreNotEmpty,indexBy:v.indexObjectsById,isArray:m.isArray,isEmptyObject:m.isEmptyObject,isFunction:m.isFunction,isPlainObject:m.isPlainObject,uniqueId:j},V={$helpers:null,autoSelectFirst:!1,containerClass:"suggestions-suggestions",count:5,deferRequestBy:100,enrichmentEnabled:!0,formatResult:null,formatSelected:null,headers:null,hint:"�������� ������� ��� ���������� ����",initializeInterval:100,language:null,minChars:1,mobileWidth:600,noCache:!1,noSuggestionsHint:null,onInvalidateSelection:null,onSearchComplete:e.noop,onSearchError:e.noop,onSearchStart:e.noop,onSelect:null,onSelectNothing:null,onSuggestionsFetch:null,paramName:"query",params:{},preventBadQueries:!1,requestMode:"suggest",scrollOnFocus:!1,serviceUrl:"https://suggestions.dadata.ru/suggestions/api/4_1/rs",tabDisabled:!1,timeout:3e3,triggerSelectOnBlur:!0,triggerSelectOnEnter:!0,triggerSelectOnSpace:!1,type:null,url:null},O=function(e){return function(t){if(0===t.length)return!1;if(1===t.length)return!0;var n=e(t[0].value);return 0===t.filter(function(t){return 0!==e(t.value).indexOf(n)}).length}}(function(e){return e}),F={matchByNormalizedQuery:function(e){return function(t,n){var i=k.normalize(t,e),s=[];return y.each(n,function(n,o){var r=n.value.toLowerCase();return!k.stringEncloses(t,r)&&(!(r.indexOf(i)>0)&&void(i===k.normalize(r,e)&&s.push(o)))}),1===s.length?s[0]:-1}},matchByWords:function(e){return t(e,O)},matchByWordsAddress:function(e){return t(e,O)},matchByFields:function(e){return function(t,n){var i=k.splitTokens(k.split(t)),s=[];return 1===n.length&&(e&&y.each(e,function(e,t){var i=v.getDeepValue(n[0],t),o=i&&k.splitTokens(k.split(i,e));o&&o.length&&(s=s.concat(o))}),0===y.minusWithPartialMatching(i,s).length)?0:-1}}},P=["��","����","���","����","�/�","���","����������","�����","�����","���","�-�","�����","�����","���","��","�������","�����","�����","�","�������","���","�","����","���","���","��","�/�_�����","�/�_������","�/�_��","�/�_�����","�/�_����","�/�_���","�/�_��","�������","��������","��","�����","������","����","�","�������","�����","��","��-�","��","������","����","������","����","��","����","�����","���","�","������","���������","���","����","�/�","���","��","���","�����","������","��","�","�/�","�/�","�/��","����","���","���","�������","��","��-��","�����","������","����������","�������","��-��","������","��������","������","�������","��������","������","�������","�������","�-�","���","������","��","����","�","�/�","�/��","�/�","�/�","�/�","���","�����","��","���","�����","��","��-��","���","���","�����","���","�","��","��-�","�/�","�����","�","�","�������","��������","�������","�������-������������","�����","�������","������������","������","�������","��������","�������","������","�����","����������","��������","����������","����������","�������","��������","���������","��������","�������","���������","�������","��������","�������","�����","����������","����","���������","�������","����������","�������","�������","��������","����������","�����","�����","����","�������","�����","�����"],D=[{id:"kladr_id",fields:["kladr_id"],forBounds:!1,forLocations:!0},{id:"postal_code",fields:["postal_code"],forBounds:!1,forLocations:!0},{id:"country_iso_code",fields:["country_iso_code"],forBounds:!1,forLocations:!0},{id:"country",fields:["country"],forBounds:!0,forLocations:!0,kladrFormat:{digits:0,zeros:13},fiasType:"country_iso_code"},{id:"region_iso_code",fields:["region_iso_code"],forBounds:!1,forLocations:!0},{id:"region_fias_id",fields:["region_fias_id"],forBounds:!1,forLocations:!0},{id:"region_type_full",fields:["region_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:2,zeros:11},fiasType:"region_fias_id"},{id:"region",fields:["region","region_type","region_type_full","region_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:2,zeros:11},fiasType:"region_fias_id"},{id:"area_fias_id",fields:["area_fias_id"],forBounds:!1,forLocations:!0},{id:"area_type_full",fields:["area_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:5,zeros:8},fiasType:"area_fias_id"},{id:"area",fields:["area","area_type","area_type_full","area_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:5,zeros:8},fiasType:"area_fias_id"},{id:"city_fias_id",fields:["city_fias_id"],forBounds:!1,forLocations:!0},{id:"city_type_full",fields:["city_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:8,zeros:5},fiasType:"city_fias_id"},{id:"city",fields:["city","city_type","city_type_full","city_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:8,zeros:5},fiasType:"city_fias_id"},{id:"city_district_fias_id",fields:["city_district_fias_id"],forBounds:!1,forLocations:!0},{id:"city_district_type_full",fields:["city_district_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"city_district_fias_id"},{id:"city_district",fields:["city_district","city_district_type","city_district_type_full","city_district_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"city_district_fias_id"},{id:"settlement_fias_id",fields:["settlement_fias_id"],forBounds:!1,forLocations:!0},{id:"settlement_type_full",fields:["settlement_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"settlement_fias_id"},{id:"settlement",fields:["settlement","settlement_type","settlement_type_full","settlement_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"settlement_fias_id"},{id:"street_fias_id",fields:["street_fias_id"],forBounds:!1,forLocations:!0},{id:"street_type_full",fields:["street_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"street_fias_id"},{id:"street",fields:["street","street_type","street_type_full","street_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"street_fias_id"},{id:"house",fields:["house","house_type","house_type_full","block","block_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:19},fiasType:"house_fias_id"},{id:"flat",fields:["flat","flat_type","flat_type_full"],forBounds:!0,forLocations:!1,kladrFormat:{digits:19},fiasType:"flat_fias_id"}],z={urlSuffix:"address",noSuggestionsHint:"����������� �����",matchers:[F.matchByNormalizedQuery(P),F.matchByWordsAddress(P)],dataComponents:D,dataComponentsById:v.indexObjectsById(D,"id","index"),unformattableTokens:P,enrichmentEnabled:!0,enrichmentMethod:"suggest",enrichmentParams:{count:1,locations:null,locations_boost:null,from_bound:null,to_bound:null},getEnrichmentQuery:function(e){return e.unrestricted_value},geoEnabled:!0,isDataComplete:function(e){var t=[this.bounds.to||"flat"],n=e.data;return!m.isPlainObject(n)||v.fieldsAreNotEmpty(n,t)},composeValue:function(e,t){var n=e.country,i=e.region_with_type||y.compact([e.region,e.region_type]).join(" ")||e.region_type_full,s=e.area_with_type||y.compact([e.area_type,e.area]).join(" ")||e.area_type_full,o=e.city_with_type||y.compact([e.city_type,e.city]).join(" ")||e.city_type_full,r=e.settlement_with_type||y.compact([e.settlement_type,e.settlement]).join(" ")||e.settlement_type_full,a=e.city_district_with_type||y.compact([e.city_district_type,e.city_district]).join(" ")||e.city_district_type_full,u=e.street_with_type||y.compact([e.street_type,e.street]).join(" ")||e.street_type_full,l=y.compact([e.house_type,e.house,e.block_type,e.block]).join(" "),c=y.compact([e.flat_type,e.flat]).join(" "),d=e.postal_box&&"�/� "+e.postal_box;return i===o&&(i=""),t&&t.saveCityDistrict||(t&&t.excludeCityDistrict?a="":a&&!e.city_district_fias_id&&(a="")),y.compact([n,i,s,o,a,r,u,l,c,d]).join(", ")},formatResult:function(){var e=[],t=!1;return D.forEach(function(n){t&&e.push(n.id),"city_district"===n.id&&(t=!0)}),function(t,n,i,s){var o,r,a,u=this,l=i.data&&i.data.city_district_with_type,c=s&&s.unformattableTokens,d=i.data&&i.data.history_values;return d&&d.length>0&&(o=k.tokenize(n,c),r=this.type.findUnusedTokens(o,t),(a=this.type.getFormattedHistoryValues(r,d))&&(t+=a)),t=u.highlightMatches(t,n,i,s),t=u.wrapFormattedValue(t,i),l&&(!u.bounds.own.length||u.bounds.own.indexOf("street")>=0)&&!m.isEmptyObject(u.copyDataComponents(i.data,e))&&(t+='<div class="'+u.classes.subtext+'">'+u.highlightMatches(l,n,i)+"</div>"),t}}(),findUnusedTokens:function(e,t){return e.filter(function(e){return-1===t.indexOf(e)})},getFormattedHistoryValues:function(e,t){var n=[],i="";return t.forEach(function(t){y.each(e,function(e){if(t.toLowerCase().indexOf(e)>=0)return n.push(t),!1})}),n.length>0&&(i=" (����. "+n.join(", ")+")"),i},getSuggestionValue:function(e,t){var n=null;return t.hasSameValues?n=e.options.restrict_value?this.getValueWithinConstraints(e,t.suggestion):e.bounds.own.length?this.getValueWithinBounds(e,t.suggestion):t.suggestion.unrestricted_value:t.hasBeenEnriched&&e.options.restrict_value&&(n=this.getValueWithinConstraints(e,t.suggestion,{excludeCityDistrict:!0})),n},getValueWithinConstraints:function(e,t,n){return this.composeValue(e.getUnrestrictedData(t.data),n)},getValueWithinBounds:function(e,t,n){var i=e.copyDataComponents(t.data,e.bounds.own.concat(["city_district_fias_id"]));return this.composeValue(i,n)}},I=[{id:"kladr_id",fields:["kladr_id"],forBounds:!1,forLocations:!0},{id:"region_fias_id",fields:["region_fias_id"],forBounds:!1,forLocations:!0},{id:"region_type_full",fields:["region_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:2,zeros:11},fiasType:"region_fias_id"},{id:"region",fields:["region","region_type","region_type_full","region_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:2,zeros:11},fiasType:"region_fias_id"},{id:"area_fias_id",fields:["area_fias_id"],forBounds:!1,forLocations:!0},{id:"area_type_full",fields:["area_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:5,zeros:8},fiasType:"area_fias_id"},{id:"area",fields:["area","area_type","area_type_full","area_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:5,zeros:8},fiasType:"area_fias_id"},{id:"city_fias_id",fields:["city_fias_id"],forBounds:!1,forLocations:!0},{id:"city_type_full",fields:["city_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:8,zeros:5},fiasType:"city_fias_id"},{id:"city",fields:["city","city_type","city_type_full","city_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:8,zeros:5},fiasType:"city_fias_id"},{id:"city_district_fias_id",fields:["city_district_fias_id"],forBounds:!1,forLocations:!0},{id:"city_district_type_full",fields:["city_district_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"city_district_fias_id"},{id:"city_district",fields:["city_district","city_district_type","city_district_type_full","city_district_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"city_district_fias_id"},{id:"settlement_fias_id",fields:["settlement_fias_id"],forBounds:!1,forLocations:!0},{id:"settlement_type_full",fields:["settlement_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"settlement_fias_id"},{id:"settlement",fields:["settlement","settlement_type","settlement_type_full","settlement_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:11,zeros:2},fiasType:"settlement_fias_id"},{id:"planning_structure_fias_id",fields:["planning_structure_fias_id"],forBounds:!1,forLocations:!0},{id:"planning_structure_type_full",fields:["planning_structure_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"planning_structure_fias_id"},{id:"planning_structure",fields:["planning_structure","planning_structure_type","planning_structure_type_full","planning_structure_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"planning_structure_fias_id"},{id:"street_fias_id",fields:["street_fias_id"],forBounds:!1,forLocations:!0},{id:"street_type_full",fields:["street_type_full"],forBounds:!1,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"street_fias_id"},{id:"street",fields:["street","street_type","street_type_full","street_with_type"],forBounds:!0,forLocations:!0,kladrFormat:{digits:15,zeros:2},fiasType:"street_fias_id"},{id:"house",fields:["house","house_type","block","building_type","building"],forBounds:!0,forLocations:!1,kladrFormat:{digits:19}}],R={urlSuffix:"fias",noSuggestionsHint:"����������� �����",matchers:[F.matchByNormalizedQuery(P),F.matchByWordsAddress(P)],dataComponents:I,dataComponentsById:v.indexObjectsById(I,"id","index"),unformattableTokens:P,isDataComplete:function(e){var t=[this.bounds.to||"house"],n=e.data;return!m.isPlainObject(n)||v.fieldsAreNotEmpty(n,t)},composeValue:function(e,t){var n=e.country,i=e.region_with_type||y.compact([e.region,e.region_type]).join(" ")||e.region_type_full,s=e.area_with_type||y.compact([e.area_type,e.area]).join(" ")||e.area_type_full,o=e.city_with_type||y.compact([e.city_type,e.city]).join(" ")||e.city_type_full,r=e.settlement_with_type||y.compact([e.settlement_type,e.settlement]).join(" ")||e.settlement_type_full,a=e.city_district_with_type||y.compact([e.city_district_type,e.city_district]).join(" ")||e.city_district_type_full,u=e.planning_structure_with_type||y.compact([e.planning_structure_type,e.planning_structure]).join(" ")||e.planning_structure_type_full,l=e.street_with_type||y.compact([e.street_type,e.street]).join(" ")||e.street_type_full,c=y.compact([e.house_type,e.house,e.block_type,e.block]).join(" "),d=y.compact([e.flat_type,e.flat]).join(" "),f=e.postal_box&&"�/� "+e.postal_box;return i===o&&(i=""),t&&t.saveCityDistrict||(t&&t.excludeCityDistrict?a="":a&&!e.city_district_fias_id&&(a="")),y.compact([n,i,s,o,a,r,u,l,c,d,f]).join(", ")},formatResult:function(){return function(e,t,n,i){var s=this;return e=s.highlightMatches(e,t,n,i),e=s.wrapFormattedValue(e,n)}}(),getSuggestionValue:z.getSuggestionValue,getValueWithinConstraints:z.getValueWithinConstraints,getValueWithinBounds:z.getValueWithinBounds},q={urlSuffix:"fio",noSuggestionsHint:!1,matchers:[F.matchByNormalizedQuery(),F.matchByWords()],fieldNames:{surname:"�������",name:"���",patronymic:"��������"},isDataComplete:function(e){var t,i=this,s=i.options.params,o=e.data;return m.isFunction(s)&&(s=s.call(i.element,e.value)),s&&s.parts?t=s.parts.map(function(e){return e.toLowerCase()}):(t=["surname","name"],n(e,"surname")&&t.push("patronymic")),v.fieldsAreNotEmpty(o,t)},composeValue:function(e){return y.compact([e.surname,e.name,e.patronymic]).join(" ")}},A={LEGAL:[2,2,5,1],INDIVIDUAL:[2,2,6,2]},$={urlSuffix:"party",noSuggestionsHint:"����������� �����������",matchers:[F.matchByFields({value:null,"data.address.value":P,"data.inn":null,"data.ogrn":null})],dataComponents:D,enrichmentEnabled:!0,enrichmentMethod:"findById",enrichmentParams:{count:1,locations_boost:null},getEnrichmentQuery:function(e){return e.data.hid},geoEnabled:!0,formatResult:function(e,t,n,o){var r=this,a=r.type.formatResultInn.call(r,n,t),u=r.highlightMatches(v.getDeepValue(n.data,"ogrn"),t,n),l=i(a,u),c=r.highlightMatches(v.getDeepValue(n.data,"management.name"),t,n),d=v.getDeepValue(n.data,"address.value")||"";return r.isMobile&&((o||(o={})).maxLength=50),e=s.call(r,e,v.getDeepValue(n.data,"name.latin"),t,n,o),e=r.wrapFormattedValue(e,n),d&&(d=d.replace(/^(\d{6}|������),\s+/i,""),d=r.isMobile?d.replace(new RegExp("^([^"+w+"]+["+w+"]+[^"+w+"]+).*"),"$1"):r.highlightMatches(d,t,n,{unformattableTokens:P})),(l||d||c)&&(e+='<div class="'+r.classes.subtext+'"><span class="'+r.classes.subtext_inline+'">'+(l||"")+"</span>"+(i(d,c)||"")+"</div>"),e},formatResultInn:function(e,t){var n,i,s=this,o=e.data&&e.data.inn,r=A[e.data&&e.data.type],a=/\d/;if(o)return i=s.highlightMatches(o,t,e),r&&(i=i.split(""),n=r.map(function(e){for(var t,n="";e&&(t=i.shift());)n+=t,a.test(t)&&e--;return n}),i=n.join('<span class="'+s.classes.subtext_delimiter+'"></span>')+i.join("")),i}},N={urlSuffix:"email",noSuggestionsHint:!1,matchers:[F.matchByNormalizedQuery()],isQueryRequestable:function(e){return this.options.suggest_local||e.indexOf("@")>=0}},M={urlSuffix:"bank",noSuggestionsHint:"����������� ����",matchers:[F.matchByFields({value:null,"data.bic":null,"data.swift":null})],dataComponents:D,enrichmentEnabled:!0,enrichmentMethod:"findById",enrichmentParams:{count:1},getEnrichmentQuery:function(e){return e.data.bic},geoEnabled:!0,formatResult:function(e,t,n,i){var s=this,o=s.highlightMatches(v.getDeepValue(n.data,"bic"),t,n),r=v.getDeepValue(n.data,"address.value")||"";return e=s.highlightMatches(e,t,n,i),e=s.wrapFormattedValue(e,n),r&&(r=r.replace(/^\d{6}( ������)?, /i,""),r=s.isMobile?r.replace(new RegExp("^([^"+w+"]+["+w+"]+[^"+w+"]+).*"),"$1"):s.highlightMatches(r,t,n,{unformattableTokens:P})),(o||r)&&(e+='<div class="'+s.classes.subtext+'"><span class="'+s.classes.subtext_inline+'">'+o+"</span>"+r+"</div>"),e},formatSelected:function(e){return v.getDeepValue(e,"data.name.payment")||null}},W={NAME:q,ADDRESS:z,FIAS:R,PARTY:$,EMAIL:N,BANK:M};W.get=function(e){return W.hasOwnProperty(e)?W[e]:new o(e)},B.extend(V,{suggest_local:!0});var U={chains:{},on:function(e,t){return this.get(e).push(t),this},get:function(e){var t=this.chains;return t[e]||(t[e]=[])}},H={suggest:{defaultParams:{type:L.getDefaultType(),dataType:"json",contentType:L.getDefaultContentType()},addTypeInUrl:!0},"iplocate/address":{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!1},status:{defaultParams:{type:"GET",dataType:"json"},addTypeInUrl:!0},findById:{defaultParams:{type:L.getDefaultType(),dataType:"json",contentType:L.getDefaultContentType()},addTypeInUrl:!0}},Q={suggest:{method:"suggest",userSelect:!0,updateValue:!0,enrichmentEnabled:!0},findById:{method:"findById",userSelect:!1,updateValue:!1,enrichmentEnabled:!1}};r.prototype={initialize:function(){var e=this;e.uniqueId=L.uniqueId("i"),e.createWrapper(),e.notify("initialize"),e.bindWindowEvents(),e.setOptions(),e.inferIsMobile(),e.notify("ready")},deferInitialization:function(){var e,t=this,n="mouseover focus keydown",i=function(){t.initializer.resolve(),t.enable()};t.initializer.always(function(){t.el.off(n,i),clearInterval(e)}),t.disabled=!0,t.el.on(n,i),e=setInterval(function(){t.el.is(":visible")&&i()},t.options.initializeInterval)},isInitialized:function(){return"resolved"===this.initializer.state()},dispose:function(){var e=this;e.initializer.reject(),e.notify("dispose"),e.el.removeData("suggestions").removeClass("suggestions-input"),e.unbindWindowEvents(),e.removeWrapper(),e.el.trigger("suggestions-dispose")},notify:function(t){var n=this,i=L.slice(arguments,1);return e.map(U.get(t),function(e){return e.apply(n,i)})},createWrapper:function(){var t=this;t.$wrapper=e('<div class="suggestions-wrapper"/>'),t.el.after(t.$wrapper),t.$wrapper.on("mousedown"+S,e.proxy(t.onMousedown,t))},removeWrapper:function(){var t=this;t.$wrapper&&t.$wrapper.remove(),e(t.options.$helpers).off(S)},onMousedown:function(t){var n=this;t.preventDefault(),n.cancelBlur=!0,L.delay(function(){delete n.cancelBlur}),0==e(t.target).closest(".ui-menu-item").length&&L.delay(function(){e(document).one("mousedown",function(t){var i=n.el.add(n.$wrapper).add(n.options.$helpers);n.options.floating&&(i=i.add(n.$container)),i=i.filter(function(){return this===t.target||e.contains(this,t.target)}),i.length||n.hide()})})},bindWindowEvents:function(){var t=e.proxy(this.inferIsMobile,this);this.$viewport.on("resize"+S+this.uniqueId,t)},unbindWindowEvents:function(){this.$viewport.off("resize"+S+this.uniqueId)},scrollToTop:function(){var t=this,n=t.options.scrollOnFocus;!0===n&&(n=t.el),n instanceof e&&n.length>0&&e("body,html").animate({scrollTop:n.offset().top},"fast")},setOptions:function(t){var n=this;e.extend(n.options,t),n.type=W.get(n.options.type),e.each({requestMode:Q},function(t,i){if(n[t]=i[n.options[t]],!n[t])throw n.disable(),"`"+t+"` option is incorrect! Must be one of: "+e.map(i,function(e,t){return'"'+t+'"'}).join(", ")}),e(n.options.$helpers).off(S).on("mousedown"+S,e.proxy(n.onMousedown,n)),n.isInitialized()&&n.notify("setOptions")},inferIsMobile:function(){this.isMobile=this.$viewport.width()<=this.options.mobileWidth},clearCache:function(){this.cachedResponse={},this.enrichmentCache={},this.badQueries=[]},clear:function(){var e=this,t=e.selection;e.isInitialized()&&(e.clearCache(),e.currentValue="",e.selection=null,e.hide(),e.suggestions=[],e.el.val(""),e.el.trigger("suggestions-clear"),e.notify("clear"),e.trigger("InvalidateSelection",t))},disable:function(){var e=this;e.disabled=!0,e.abortRequest(),e.visible&&e.hide()},enable:function(){this.disabled=!1},isUnavailable:function(){return this.disabled},update:function(){var e=this,t=e.el.val();e.isInitialized()&&(e.currentValue=t,e.isQueryRequestable(t)?e.updateSuggestions(t):e.hide())},setSuggestion:function(t){var n,i,s=this;e.isPlainObject(t)&&e.isPlainObject(t.data)&&(t=e.extend(!0,{},t),s.isUnavailable()&&s.initializer&&"pending"===s.initializer.state()&&(s.initializer.resolve(),s.enable()),s.bounds.own.length&&(s.checkValueBounds(t),n=s.copyDataComponents(t.data,s.bounds.all),t.data.kladr_id&&(n.kladr_id=s.getBoundedKladrId(t.data.kladr_id,s.bounds.all)),t.data=n),s.selection=t,s.suggestions=[t],i=s.getSuggestionValue(t)||"",s.currentValue=i,s.el.val(i),s.abortRequest(),s.el.trigger("suggestions-set"))},fixData:function(){var t=this,n=t.extendedCurrentValue(),i=t.el.val(),s=e.Deferred();s.done(function(e){t.selectSuggestion(e,0,i,{hasBeenEnriched:!0}),t.el.trigger("suggestions-fixdata",e)}).fail(function(){t.selection=null,t.el.trigger("suggestions-fixdata")}),t.isQueryRequestable(n)?(t.currentValue=n,t.getSuggestions(n,{count:1,from_bound:null,to_bound:null}).done(function(e){var t=e[0];t?s.resolve(t):s.reject()}).fail(function(){s.reject()})):s.reject()},extendedCurrentValue:function(){var t=this,n=t.getParentInstance(),i=n&&n.extendedCurrentValue(),s=e.trim(t.el.val());return L.compact([i,s]).join(" ")},getAjaxParams:function(t,n){var i=this,s=e.trim(i.options.token),o=e.trim(i.options.partner),a=i.options.serviceUrl,u=i.options.url,l=H[t],c=e.extend({timeout:i.options.timeout},l.defaultParams),d={};return u?a=u:(/\/$/.test(a)||(a+="/"),a+=t,l.addTypeInUrl&&(a+="/"+i.type.urlSuffix)),a=L.fixURLProtocol(a),e.support.cors?(s&&(d.Authorization="Token "+s),o&&(d["X-Partner"]=o),d["X-Version"]=r.version,c.headers||(c.headers={}),c.xhrFields||(c.xhrFields={}),e.extend(c.headers,i.options.headers,d),c.xhrFields.withCredentials=!1):(s&&(d.token=s),o&&(d.partner=o),d.version=r.version,a=L.addUrlParams(a,d)),c.url=a,e.extend(c,n)},isQueryRequestable:function(e){var t,n=this;return t=e.length>=n.options.minChars,t&&n.type.isQueryRequestable&&(t=n.type.isQueryRequestable.call(n,e)),t},constructRequestParams:function(t,n){var i=this,s=i.options,o=e.isFunction(s.params)?s.params.call(i.element,t):e.extend({},s.params);return i.type.constructRequestParams&&e.extend(o,i.type.constructRequestParams.call(i)),e.each(i.notify("requestParams"),function(t,n){e.extend(o,n)}),o[s.paramName]=t,e.isNumeric(s.count)&&s.count>0&&(o.count=s.count),s.language&&(o.language=s.language),e.extend(o,n)},updateSuggestions:function(e){var t=this;t.fetchPhase=t.getSuggestions(e).done(function(n){t.assignSuggestions(n,e)})},getSuggestions:function(t,n,i){var s,o=this,r=o.options,a=i&&i.noCallbacks,u=i&&i.useEnrichmentCache,l=i&&i.method||o.requestMode.method,c=o.constructRequestParams(t,n),d=e.param(c||{}),f=e.Deferred();return s=o.cachedResponse[d],s&&e.isArray(s.suggestions)?f.resolve(s.suggestions):o.isBadQuery(t)?f.reject():a||!1!==r.onSearchStart.call(o.element,c)?o.doGetSuggestions(c,l).done(function(e){o.processResponse(e)&&t==o.currentValue?(r.noCache||(u?o.enrichmentCache[t]=e.suggestions[0]:(o.enrichResponse(e,t),o.cachedResponse[d]=e,r.preventBadQueries&&0===e.suggestions.length&&o.badQueries.push(t))),f.resolve(e.suggestions)):f.reject(),
a||r.onSearchComplete.call(o.element,t,e.suggestions)}).fail(function(e,n,i){f.reject(),a||"abort"===n||r.onSearchError.call(o.element,t,e,n,i)}):f.reject(),f},doGetSuggestions:function(t,n){var i=this,s=e.ajax(i.getAjaxParams(n,{data:L.serialize(t)}));return i.abortRequest(),i.currentRequest=s,i.notify("request"),s.always(function(){i.currentRequest=null,i.notify("request")}),s},isBadQuery:function(t){if(!this.options.preventBadQueries)return!1;var n=!1;return e.each(this.badQueries,function(e,i){return!(n=0===t.indexOf(i))}),n},abortRequest:function(){var e=this;e.currentRequest&&e.currentRequest.abort()},processResponse:function(t){var n,i=this;return!(!t||!e.isArray(t.suggestions))&&(i.verifySuggestionsFormat(t.suggestions),i.setUnrestrictedValues(t.suggestions),e.isFunction(i.options.onSuggestionsFetch)&&(n=i.options.onSuggestionsFetch.call(i.element,t.suggestions),e.isArray(n)&&(t.suggestions=n)),!0)},verifySuggestionsFormat:function(t){"string"==typeof t[0]&&e.each(t,function(e,n){t[e]={value:n,data:null}})},getSuggestionValue:function(t,n){var i,s=this,o=s.options.formatSelected||s.type.formatSelected,r=n&&n.hasSameValues,a=n&&n.hasBeenEnriched,u=null;return e.isFunction(o)&&(i=o.call(s,t)),"string"!=typeof i&&(i=t.value,s.type.getSuggestionValue&&null!==(u=s.type.getSuggestionValue(s,{suggestion:t,hasSameValues:r,hasBeenEnriched:a}))&&(i=u)),i},hasSameValues:function(t){var n=!1;return e.each(this.suggestions,function(e,i){if(i.value===t.value&&i!==t)return n=!0,!1}),n},assignSuggestions:function(e,t){var n=this;n.suggestions=e,n.notify("assignSuggestions",t)},shouldRestrictValues:function(){var e=this;return e.options.restrict_value&&e.constraints&&1==Object.keys(e.constraints).length},setUnrestrictedValues:function(t){var n=this,i=n.shouldRestrictValues(),s=n.getFirstConstraintLabel();e.each(t,function(e,t){t.unrestricted_value||(t.unrestricted_value=i?s+", "+t.value:t.value)})},areSuggestionsSame:function(e,t){return e&&t&&e.value===t.value&&L.areSame(e.data,t.data)},getNoSuggestionsHint:function(){var e=this;return!1!==e.options.noSuggestionsHint&&(e.options.noSuggestionsHint||e.type.noSuggestionsHint)}};var K={setupElement:function(){this.el.attr("autocomplete","new-password").attr("autocorrect","off").attr("autocapitalize","off").attr("spellcheck","false").addClass("suggestions-input").css("box-sizing","border-box")},bindElementEvents:function(){var t=this;t.el.on("keydown"+S,e.proxy(t.onElementKeyDown,t)),t.el.on(["keyup"+S,"cut"+S,"paste"+S,"input"+S].join(" "),e.proxy(t.onElementKeyUp,t)),t.el.on("blur"+S,e.proxy(t.onElementBlur,t)),t.el.on("focus"+S,e.proxy(t.onElementFocus,t))},unbindElementEvents:function(){this.el.off(S)},onElementBlur:function(){var e=this;if(e.cancelBlur)return void(e.cancelBlur=!1);e.options.triggerSelectOnBlur?e.isUnavailable()||e.selectCurrentValue({noSpace:!0}).always(function(){e.hide()}):e.hide(),e.fetchPhase.abort&&e.fetchPhase.abort()},onElementFocus:function(){var t=this;t.cancelFocus||L.delay(e.proxy(t.completeOnFocus,t)),t.cancelFocus=!1},onElementKeyDown:function(e){var t=this;if(!t.isUnavailable())if(t.visible){switch(e.which){case b.ESC:t.el.val(t.currentValue),t.hide(),t.abortRequest();break;case b.TAB:if(!1===t.options.tabDisabled)return;break;case b.ENTER:t.options.triggerSelectOnEnter&&t.selectCurrentValue();break;case b.SPACE:return void(t.options.triggerSelectOnSpace&&t.isCursorAtEnd()&&(e.preventDefault(),t.selectCurrentValue({continueSelecting:!0,dontEnrich:!0}).fail(function(){t.currentValue+=" ",t.el.val(t.currentValue),t.proceedChangedValue()})));case b.UP:t.moveUp();break;case b.DOWN:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}else switch(e.which){case b.DOWN:t.suggest();break;case b.ENTER:t.options.triggerSelectOnEnter&&t.triggerOnSelectNothing()}},onElementKeyUp:function(e){var t=this;if(!t.isUnavailable()){switch(e.which){case b.UP:case b.DOWN:case b.ENTER:return}clearTimeout(t.onChangeTimeout),t.inputPhase.reject(),t.currentValue!==t.el.val()&&t.proceedChangedValue()}},proceedChangedValue:function(){var t=this;t.abortRequest(),t.inputPhase=e.Deferred().done(e.proxy(t.onValueChange,t)),t.options.deferRequestBy>0?t.onChangeTimeout=L.delay(function(){t.inputPhase.resolve()},t.options.deferRequestBy):t.inputPhase.resolve()},onValueChange:function(){var e,t=this;t.selection&&(e=t.selection,t.selection=null,t.trigger("InvalidateSelection",e)),t.selectedIndex=-1,t.update(),t.notify("valueChange")},completeOnFocus:function(){var e=this;e.isUnavailable()||e.isElementFocused()&&(e.update(),e.isMobile&&(e.setCursorAtEnd(),e.scrollToTop()))},isElementFocused:function(){return document.activeElement===this.element},isElementDisabled:function(){return Boolean(this.element.getAttribute("disabled")||this.element.getAttribute("readonly"))},isCursorAtEnd:function(){var e,t,n=this,i=n.el.val().length;try{if("number"==typeof(e=n.element.selectionStart))return e===i}catch(e){}return!document.selection||(t=document.selection.createRange(),t.moveStart("character",-i),i===t.text.length)},setCursorAtEnd:function(){var e=this.element;try{e.selectionEnd=e.selectionStart=e.value.length,e.scrollLeft=e.scrollWidth}catch(t){e.value=e.value}}};e.extend(r.prototype,K),U.on("initialize",K.bindElementEvents).on("dispose",K.unbindElementEvents);var G={};a();var J={checkStatus:function(){function e(e){L.isFunction(t.options.onSearchError)&&t.options.onSearchError.call(t.element,null,s,"error",e)}var t=this,n=t.options.token&&t.options.token.trim()||"",i=t.options.type+n,s=G[i];s||(s=G[i]=B.ajax(t.getAjaxParams("status"))),s.done(function(n,i,s){if(n.search){var o=s.getResponseHeader("X-Plan");n.plan=o,B.extend(t.status,n)}else e("Service Unavailable")}).fail(function(){e(s.statusText)})}};r.resetTokens=a,B.extend(r.prototype,J),U.on("setOptions",J.checkStatus);var X,Y=!0,Z={checkLocation:function(){var t=this,n=t.options.geoLocation;t.type.geoEnabled&&n&&(t.geoLocation=e.Deferred(),e.isPlainObject(n)||e.isArray(n)?t.geoLocation.resolve(n):(X||(X=e.ajax(t.getAjaxParams("iplocate/address"))),X.done(function(e){var n=e&&e.location&&e.location.data;n&&n.kladr_id?t.geoLocation.resolve({kladr_id:n.kladr_id}):t.geoLocation.reject()}).fail(function(){t.geoLocation.reject()})))},getGeoLocation:function(){return this.geoLocation},constructParams:function(){var t=this,n={};return t.geoLocation&&e.isFunction(t.geoLocation.promise)&&"resolved"==t.geoLocation.state()&&t.geoLocation.done(function(t){n.locations_boost=e.makeArray(t)}),n}};"GET"!=L.getDefaultType()&&(e.extend(V,{geoLocation:Y}),e.extend(r,{resetLocation:u}),e.extend(r.prototype,{getGeoLocation:Z.getGeoLocation}),U.on("setOptions",Z.checkLocation).on("requestParams",Z.constructParams));var ee={enrichSuggestion:function(t,n){var i=this,s=e.Deferred();if(!i.options.enrichmentEnabled||!i.type.enrichmentEnabled||!i.requestMode.enrichmentEnabled||n&&n.dontEnrich)return s.resolve(t);if(t.data&&null!=t.data.qc)return s.resolve(t);i.disableDropdown();var o=i.type.getEnrichmentQuery(t),r=i.type.enrichmentParams,a={noCallbacks:!0,useEnrichmentCache:!0,method:i.type.enrichmentMethod};return i.currentValue=o,i.enrichPhase=i.getSuggestions(o,r,a).always(function(){i.enableDropdown()}).done(function(e){var n=e&&e[0];s.resolve(n||t,!!n)}).fail(function(){s.resolve(t)}),s},enrichResponse:function(t,n){var i=this,s=i.enrichmentCache[n];s&&e.each(t.suggestions,function(e,i){if(i.value===n)return t.suggestions[e]=s,!1})}};e.extend(r.prototype,ee);var te={width:"auto",floating:!1},ne={createContainer:function(){var t=this,n="."+t.classes.suggestion,i=t.options,s=e("<div/>").addClass(i.containerClass).css({display:"none"});t.$container=s,s.on("click"+S,n,e.proxy(t.onSuggestionClick,t))},showContainer:function(){this.$container.appendTo(this.options.floating?this.$body:this.$wrapper)},getContainer:function(){return this.$container.get(0)},removeContainer:function(){var e=this;e.options.floating&&e.$container.remove()},setContainerOptions:function(){var t=this;t.$container.off("mousedown.suggestions"),t.options.floating&&t.$container.on("mousedown.suggestions",e.proxy(t.onMousedown,t))},onSuggestionClick:function(t){var n,i=this,s=e(t.target);if(!i.dropdownDisabled){for(i.cancelFocus=!0,i.el.focus();s.length&&!(n=s.attr("data-index"));)s=s.closest("."+i.classes.suggestion);n&&!isNaN(n)&&i.select(+n)}},getSuggestionsItems:function(){return this.$container.children("."+this.classes.suggestion)},toggleDropdownEnabling:function(e){this.dropdownDisabled=!e,this.$container.attr("disabled",!e)},disableDropdown:function(){this.toggleDropdownEnabling(!1)},enableDropdown:function(){this.toggleDropdownEnabling(!0)},hasSuggestionsToChoose:function(){var t=this;return t.suggestions.length>1||1===t.suggestions.length&&(!t.selection||e.trim(t.suggestions[0].value)!==e.trim(t.selection.value))},suggest:function(){var t=this,n=t.options,i=[];if(t.requestMode.userSelect){if(t.hasSuggestionsToChoose())n.hint&&t.suggestions.length&&i.push('<div class="'+t.classes.hint+'">'+n.hint+"</div>"),t.selectedIndex=-1,t.suggestions.forEach(function(e,n){e==t.selection&&(t.selectedIndex=n),t.buildSuggestionHtml(e,n,i)});else{if(t.suggestions.length)return void t.hide();var s=t.getNoSuggestionsHint();if(!s)return void t.hide();i.push('<div class="'+t.classes.hint+'">'+s+"</div>")}i.push('<div class="'+x.promo+'"></div>'),i.push("</div>"),t.$container.html(i.join("")),n.autoSelectFirst&&-1===t.selectedIndex&&(t.selectedIndex=0),-1!==t.selectedIndex&&t.getSuggestionsItems().eq(t.selectedIndex).addClass(t.classes.selected),e.isFunction(n.beforeRender)&&n.beforeRender.call(t.element,t.$container),t.$container.show(),t.visible=!0}},buildSuggestionHtml:function(e,t,n){n.push('<div class="'+this.classes.suggestion+'" data-index="'+t+'">');var i=this.options.formatResult||this.type.formatResult||this.formatResult;n.push(i.call(this,e.value,this.currentValue,e,{unformattableTokens:this.type.unformattableTokens}));var s=this.makeSuggestionLabel(this.suggestions,e);s&&n.push('<span class="'+this.classes.subtext_label+'">'+L.escapeHtml(s)+"</span>"),n.push("</div>")},wrapFormattedValue:function(e,t){var n=this,i=L.getDeepValue(t.data,"state.status");return'<span class="'+n.classes.value+'"'+(i?' data-suggestion-status="'+i+'"':"")+">"+e+"</span>"},formatResult:function(e,t,n,i){var s=this;return e=s.highlightMatches(e,t,n,i),s.wrapFormattedValue(e,n)},highlightMatches:function(t,n,i,s){var o,r,a,u,d,f,p,g=this,h=[],m=s&&s.unformattableTokens,y=s&&s.maxLength,_=L.reWordExtractor();if(!t)return"";for(o=k.tokenize(n,m),r=e.map(o,function(e){return new RegExp("^((.*)([\\-\\+\\\\\\?!@#$%^&]+))?("+L.escapeRegExChars(e)+")([^\\-\\+\\\\\\?!@#$%^&]*[\\-\\+\\\\\\?!@#$%^&]*)","i")});(a=_.exec(t))&&a[0];)u=a[1],h.push({text:u,hasUpperCase:u.toLowerCase()!==u,formatted:L.formatToken(u),matchable:!0}),a[2]&&h.push({text:a[2]});for(d=0;d<h.length;d++)f=h[d],!f.matchable||f.matched||-1!==e.inArray(f.formatted,m)&&!f.hasUpperCase||e.each(r,function(e,t){var n,i=t.exec(f.formatted),s=d+1;if(i)return i={before:i[1]||"",beforeText:i[2]||"",beforeDelimiter:i[3]||"",text:i[4]||"",after:i[5]||""},i.before&&(h.splice(d,0,{text:f.text.substr(0,i.beforeText.length),formatted:i.beforeText,matchable:!0},{text:i.beforeDelimiter}),s+=2,n=i.before.length,f.text=f.text.substr(n),f.formatted=f.formatted.substr(n),d--),n=i.text.length+i.after.length,f.formatted.length>n&&(h.splice(s,0,{text:f.text.substr(n),formatted:f.formatted.substr(n),matchable:!0}),f.text=f.text.substr(0,n),f.formatted=f.formatted.substr(0,n)),i.after&&(n=i.text.length,h.splice(s,0,{text:f.text.substr(n),formatted:f.formatted.substr(n)}),f.text=f.text.substr(0,n),f.formatted=f.formatted.substr(0,n)),f.matched=!0,!1});if(y){for(d=0;d<h.length&&y>=0;d++)f=h[d],(y-=f.text.length)<0&&(f.text=f.text.substr(0,f.text.length+y)+"...");h.length=d}return p=l(h),c(p,g.classes.nowrap)},makeSuggestionLabel:function(t,n){var i,s,o=this,r=o.type.fieldNames,a={},u=L.reWordExtractor(),l=[];if(r&&d(t,n)&&n.data&&(e.each(r,function(e){var t=n.data[e];t&&(a[e]=L.formatToken(t))}),!e.isEmptyObject(a))){for(;(i=u.exec(L.formatToken(n.value)))&&(s=i[1]);)e.each(a,function(e,t){if(t==s)return l.push(r[e]),delete a[e],!1});if(l.length)return l.join(", ")}},hide:function(){var e=this;e.visible=!1,e.selectedIndex=-1,e.$container.hide().empty()},activate:function(e){var t,n,i=this,s=i.classes.selected;return!i.dropdownDisabled&&(n=i.getSuggestionsItems(),n.removeClass(s),i.selectedIndex=e,-1!==i.selectedIndex&&n.length>i.selectedIndex)?(t=n.eq(i.selectedIndex),t.addClass(s),t):null},deactivate:function(e){var t=this;t.dropdownDisabled||(t.selectedIndex=-1,t.getSuggestionsItems().removeClass(t.classes.selected),e&&t.el.val(t.currentValue))},moveUp:function(){var e=this;if(!e.dropdownDisabled)return-1===e.selectedIndex?void(e.suggestions.length&&e.adjustScroll(e.suggestions.length-1)):0===e.selectedIndex?void e.deactivate(!0):void e.adjustScroll(e.selectedIndex-1)},moveDown:function(){var e=this;if(!e.dropdownDisabled)return e.selectedIndex===e.suggestions.length-1?void e.deactivate(!0):void e.adjustScroll(e.selectedIndex+1)},adjustScroll:function(e){var t,n,i,s=this,o=s.activate(e),r=s.$container.scrollTop();o&&o.length&&(t=o.position().top,t<0?s.$container.scrollTop(r+t):(n=t+o.outerHeight(),i=s.$container.innerHeight(),n>i&&s.$container.scrollTop(r-i+n)),s.el.val(s.suggestions[e].value))}};e.extend(V,te),e.extend(r.prototype,ne),U.on("initialize",ne.createContainer).on("dispose",ne.removeContainer).on("setOptions",ne.setContainerOptions).on("ready",ne.showContainer).on("assignSuggestions",ne.suggest);var ie={constraints:null,restrict_value:!1},se=["country_iso_code","region_iso_code","region_fias_id","area_fias_id","city_fias_id","city_district_fias_id","settlement_fias_id","planning_structure_fias_id","street_fias_id"],oe=function(e,t){var n,i,s=this,o={};s.instance=t,s.fields={},s.specificity=-1,m.isPlainObject(e)&&t.type.dataComponents&&y.each(t.type.dataComponents,function(t,n){var i=t.id;t.forLocations&&e[i]&&(s.fields[i]=e[i],s.specificity=n)}),n=Object.keys(s.fields),i=y.intersect(n,se),i.length?(y.each(i,function(e,t){o[e]=s.fields[e]}),s.fields=o,s.specificity=s.getFiasSpecificity(i)):s.fields.kladr_id&&(s.fields={kladr_id:s.fields.kladr_id},s.significantKladr=p(s.fields.kladr_id),s.specificity=s.getKladrSpecificity(s.significantKladr))};B.extend(oe.prototype,{getLabel:function(){return this.instance.type.composeValue(this.fields,{saveCityDistrict:!0})},getFields:function(){return this.fields},isValid:function(){return!m.isEmptyObject(this.fields)},getKladrSpecificity:function(e){var t=-1,n=e.length;return y.each(this.instance.type.dataComponents,function(e,i){e.kladrFormat&&n===e.kladrFormat.digits&&(t=i)}),t},getFiasSpecificity:function(e){var t=-1;return y.each(this.instance.type.dataComponents,function(n,i){n.fiasType&&e.indexOf(n.fiasType)>-1&&t<i&&(t=i)}),t},containsData:function(e){var t=!0;return this.fields.kladr_id?!!e.kladr_id&&0===e.kladr_id.indexOf(this.significantKladr):(y.each(this.fields,function(n,i){return t=!!e[i]&&e[i].toLowerCase()===n.toLowerCase()}),t)}}),r.ConstraintLocation=oe;var re=function(e,t){this.id=j("c"),this.deletable=!!e.deletable,this.instance=t;var n=y.makeArray(e&&(e.locations||e.restrictions));this.locations=n.map(function(e){return new oe(e,t)}),this.locations=this.locations.filter(function(e){return e.isValid()}),this.label=e.label,null==this.label&&t.type.composeValue&&(this.label=this.locations.map(function(e){return e.getLabel()}).join(", "))};B.extend(re.prototype,{isValid:function(){return this.locations.length>0},getFields:function(){return this.locations.map(function(e){return e.getFields()})}});var ae={createConstraints:function(){this.constraints={}},setupConstraints:function(){var e,t=this,n=t.options.constraints;if(!n)return void t.unbindFromParent();B.isJqObject(n)||"string"==typeof n||"number"==typeof n.nodeType?(e=B.select(n),e.is(t.constraints)||(t.unbindFromParent(),e.is(t.el)||(t.constraints=e,t.bindToParent()))):(y.each(t.constraints,function(e,n){t.removeConstraint(n)}),y.each(y.makeArray(n),function(e,n){t.addConstraint(e)}))},filteredLocation:function(e){var t=[],n={};if(y.each(this.type.dataComponents,function(){this.forLocations&&t.push(this.id)}),m.isPlainObject(e)&&y.each(e,function(e,i){e&&t.indexOf(i)>=0&&(n[i]=e)}),!m.isEmptyObject(n))return n.kladr_id?{kladr_id:n.kladr_id}:n},addConstraint:function(e){var t=this;e=new re(e,t),e.isValid()&&(t.constraints[e.id]=e)},removeConstraint:function(e){delete this.constraints[e]},constructConstraintsParams:function(){for(var e,t,n=this,i=[],s=n.constraints,o={};B.isJqObject(s)&&(e=s.suggestions())&&!(t=v.getDeepValue(e,"selection.data"));)s=e.constraints;return B.isJqObject(s)?(t=new oe(t,e).getFields())&&(n.bounds.own.indexOf("city")>-1&&delete t.city_fias_id,o.locations=[t],o.restrict_value=!0):s&&(y.each(s,function(e,t){i=i.concat(e.getFields())}),i.length&&(o.locations=i,o.restrict_value=n.options.restrict_value)),o},getFirstConstraintLabel:function(){var e=this,t=m.isPlainObject(e.constraints)&&Object.keys(e.constraints)[0];return t?e.constraints[t].label:""},bindToParent:function(){var e=this;e.constraints.on(["suggestions-select."+e.uniqueId,"suggestions-invalidateselection."+e.uniqueId,"suggestions-clear."+e.uniqueId].join(" "),B.proxy(e.onParentSelectionChanged,e)).on("suggestions-dispose."+e.uniqueId,B.proxy(e.onParentDispose,e))},unbindFromParent:function(){var e=this,t=e.constraints;B.isJqObject(t)&&t.off("."+e.uniqueId)},onParentSelectionChanged:function(e,t,n){("suggestions-select"!==e.type||n)&&this.clear()},onParentDispose:function(e){this.unbindFromParent()},getParentInstance:function(){return B.isJqObject(this.constraints)&&this.constraints.suggestions()},shareWithParent:function(e){var t=this.getParentInstance();t&&t.type===this.type&&!f(e,t)&&(t.shareWithParent(e),t.setSuggestion(e))},getUnrestrictedData:function(e){var t=this,n=[],i={},s=-1;return y.each(t.constraints,function(t,n){y.each(t.locations,function(t,n){t.containsData(e)&&t.specificity>s&&(s=t.specificity)})}),s>=0?(e.region_kladr_id&&e.region_kladr_id===e.city_kladr_id&&n.push.apply(n,t.type.dataComponentsById.city.fields),y.each(t.type.dataComponents.slice(0,s+1),function(e,t){n.push.apply(n,e.fields)}),y.each(e,function(e,t){-1===n.indexOf(t)&&(i[t]=e)})):i=e,i}};B.extend(V,ie),B.extend(r.prototype,ae),"GET"!=T.getDefaultType()&&U.on("initialize",ae.createConstraints).on("setOptions",ae.setupConstraints).on("requestParams",ae.constructConstraintsParams).on("dispose",ae.unbindFromParent);var ue={proceedQuery:function(e){var t=this;e.length>=t.options.minChars?t.updateSuggestions(e):t.hide()},selectCurrentValue:function(e){var t=this,n=B.Deferred();return t.inputPhase.resolve(),t.fetchPhase.done(function(){var i;t.selection&&!t.visible?n.reject():(i=t.findSuggestionIndex(),t.select(i,e),-1===i?n.reject():n.resolve(i))}).fail(function(){n.reject()}),n},selectFoundSuggestion:function(){var e=this;e.requestMode.userSelect||e.select(0)},findSuggestionIndex:function(){var e,t=this,n=t.selectedIndex;return-1===n&&(e=t.el.val().trim())&&t.type.matchers.some(function(i){return-1!==(n=i(e,t.suggestions))}),n},select:function(e,t){var n,i=this,s=i.suggestions[e],o=t&&t.continueSelecting,r=i.currentValue;if(!i.triggering.Select){if(!s)return o||i.selection||i.triggerOnSelectNothing(),void i.onSelectComplete(o);n=i.hasSameValues(s),i.enrichSuggestion(s,t).done(function(s,o){var a=B.extend({hasBeenEnriched:o,hasSameValues:n},t);i.selectSuggestion(s,e,r,a)})}},selectSuggestion:function(e,t,n,i){var s=this,o=i.continueSelecting,r=!s.type.isDataComplete||s.type.isDataComplete.call(s,e),a=s.selection;s.triggering.Select||(s.type.alwaysContinueSelecting&&(o=!0),r&&(o=!1),i.hasBeenEnriched&&s.suggestions[t]&&(s.suggestions[t].data=e.data),s.requestMode.updateValue&&(s.checkValueBounds(e),s.currentValue=s.getSuggestionValue(e,i),!s.currentValue||i.noSpace||r||(s.currentValue+=" "),s.el.val(s.currentValue)),s.currentValue?(s.selection=e,s.areSuggestionsSame(e,a)||s.trigger("Select",e,s.currentValue!=n),s.requestMode.userSelect&&s.onSelectComplete(o)):(s.selection=null,s.triggerOnSelectNothing()),s.shareWithParent(e))},onSelectComplete:function(e){var t=this;e?(t.selectedIndex=-1,t.updateSuggestions(t.currentValue)):t.hide()},triggerOnSelectNothing:function(){var e=this;e.triggering.SelectNothing||e.trigger("SelectNothing",e.currentValue)},trigger:function(e){var t=this,n=L.slice(arguments,1),i=t.options["on"+e];t.triggering[e]=!0,L.isFunction(i)&&i.apply(t.element,n),t.el.trigger.call(t.el,"suggestions-"+e.toLowerCase(),n),t.triggering[e]=!1}};B.extend(r.prototype,ue),U.on("assignSuggestions",ue.selectFoundSuggestion);var le={bounds:null},ce={setupBounds:function(){this.bounds={from:null,to:null}},setBoundsOptions:function(){var t,n=this,i=[],s=e.trim(n.options.bounds).split("-"),o=s[0],r=s[s.length-1],a=[],u=[];n.type.dataComponents&&e.each(n.type.dataComponents,function(){this.forBounds&&i.push(this.id)}),-1===i.indexOf(o)&&(o=null),-1===i.indexOf(r)&&(r=null),(o||r)&&(t=!o,e.each(i,function(e,n){if(n==o&&(t=!0),u.push(n),t&&a.push(n),n==r)return!1})),n.bounds.from=o,n.bounds.to=r,n.bounds.all=u,n.bounds.own=a},constructBoundsParams:function(){var e=this,t={};return e.bounds.from&&(t.from_bound={value:e.bounds.from}),e.bounds.to&&(t.to_bound={value:e.bounds.to}),t},checkValueBounds:function(e){var t,n=this;if(n.bounds.own.length&&n.type.composeValue){var i=n.bounds.own.slice(0);1===i.length&&"city_district"===i[0]&&i.push("city_district_fias_id"),t=n.copyDataComponents(e.data,i),e.value=n.type.composeValue(t)}},copyDataComponents:function(t,n){var i={},s=this.type.dataComponentsById;return s&&e.each(n,function(n,o){e.each(s[o].fields,function(e,n){null!=t[n]&&(i[n]=t[n])})}),i},getBoundedKladrId:function(t,n){var i,s=n[n.length-1];return e.each(this.type.dataComponents,function(e,t){if(t.id===s)return i=t.kladrFormat,!1}),t.substr(0,i.digits)+new Array((i.zeros||0)+1).join("0")}};e.extend(V,le),e.extend(r.prototype,ce),U.on("initialize",ce.setupBounds).on("setOptions",ce.setBoundsOptions).on("requestParams",ce.constructBoundsParams);var de={selectByClass:function(e,t){var n="."+e;return t?t.querySelector(n):document.querySelector(n)},addClass:function(e,t){var n=e.className.split(" ");-1===n.indexOf(t)&&n.push(t),e.className=n.join(" ")},setStyle:function(e,t,n){e.style[t]=n},listenTo:function(e,t,n,i){e.addEventListener(t,i,!1),n&&(eventsByNamespace[n]||(eventsByNamespace[n]=[]),eventsByNamespace[n].push({eventName:t,element:e,callback:i}))},stopListeningNamespace:function(e){var t=eventsByNamespace[e];t&&t.forEach(function(e){e.element.removeEventListener(e.eventName,e.callback,!1)})}};g.prototype.show=function(){"FREE"===this.plan&&this.element&&(this.setStyles(),this.setHtml())},g.prototype.setStyles=function(){this.element.style.display="block"},g.prototype.setHtml=function(){this.element.innerHTML='<a target="_blank" tabindex="-1" href="https://dadata.ru/suggestions/?utm_source=dadata&utm_medium=module&utm_campaign=suggestions-jquery"><svg version="1.1" viewBox="0 0 128 38" xmlns="http://www.w3.org/2000/svg"><path d="m128 19v16.077c0 1.614-1.302 2.923-2.909 2.923h-122.18c-1.607 0-2.909-1.309-2.909-2.923v-32.154c-0-1.614 1.302-2.923 2.909-2.923h122.18c1.607 0 2.909 1.309 2.909 2.923z" fill="#ef4741"/><path d="m59.52 7.912h-8.902v22.098h9.92c3.724 0 9.872-0.341 9.872-6.703v-8.682c-0.01-6.372-7.166-6.713-10.89-6.713zm5.595 14.81c0 3.186-2.308 3.508-4.936 3.508h-4.276v-14.538h3.287c2.628 0 5.954 0.322 5.954 3.508zm-46.545-14.81h-8.834v22.098h9.871c3.724 0 9.872-0.341 9.872-6.703v-8.682c0-6.372-7.137-6.713-10.88-6.713zm5.595 14.81c0 3.186-2.308 3.508-4.936 3.508h-4.247v-14.538h3.258c2.628 0 5.954 0.322 5.954 3.508zm71.757-13.953h-4.945v16.301c-0.018 0.785 0.113 1.565 0.388 2.3 0.203 0.569 0.535 1.082 0.97 1.5 0.446 0.385 0.962 0.677 1.522 0.858 0.58 0.205 1.182 0.343 1.794 0.409 0.575 0.052 1.248 0.081 2.017 0.088 0.917-1e-3 1.834-0.057 2.744-0.166v-2.796h-1.765c-0.393 0.055-0.795 0.032-1.18-0.071-0.385-0.102-0.745-0.28-1.06-0.524-0.413-0.691-0.59-1.498-0.504-2.299v-8.068h4.509v-3.06h-4.509zm20.364 5.535c-1.176-0.741-3.278-1.108-6.303-1.101h-5.741v0.243l0.708 2.826h5.033c0.837-0.051 1.672 0.117 2.424 0.487 0.259 0.248 0.458 0.553 0.579 0.891 0.121 0.339 0.162 0.701 0.119 1.058v1.12h-5.527c-1.939 0-3.271 0.38-3.995 1.14-0.725 0.76-1.099 2.127-1.125 4.102 0 2.154 0.359 3.06 1.086 3.742 0.728 0.682 2.134 1.188 4.344 1.188h6.847c1.706 0 3.345-0.808 3.345-2.747v-8.584c0-2.176-0.589-3.635-1.765-4.375zm-3.19 12.959h-3.249c-0.735 0.081-1.478-0.036-2.152-0.342-0.285-0.227-0.427-0.876-0.427-1.948s0.136-1.741 0.407-2.007c0.625-0.331 1.336-0.46 2.037-0.371h3.384zm-26.667-12.959c-1.176-0.741-3.277-1.108-6.303-1.101h-5.741v0.243l0.708 2.826h5.033c0.836-0.051 1.672 0.117 2.424 0.487 0.259 0.248 0.457 0.553 0.578 0.891 0.121 0.339 0.162 0.701 0.12 1.058v1.12h-5.556c-1.939 0-3.271 0.38-3.995 1.14s-1.086 2.127-1.086 4.102c0 2.154 0.359 3.06 1.086 3.742s2.133 1.188 4.344 1.188h6.846c1.717 0 3.346-0.808 3.346-2.747v-8.584c-7e-3 -2.176-0.595-3.635-1.765-4.375zm-3.181 12.959h-3.248c-0.735 0.081-1.478-0.037-2.153-0.342-0.284-0.227-0.426-0.876-0.426-1.948s0.135-1.741 0.407-2.007c0.624-0.331 1.336-0.46 2.036-0.371h3.384zm-37.74-12.959c-1.176-0.741-3.278-1.108-6.303-1.101h-5.712v0.243l0.708 2.826h5.033c0.837-0.051 1.672 0.117 2.424 0.487 0.259 0.248 0.457 0.553 0.578 0.891 0.121 0.339 0.162 0.701 0.12 1.058v1.12h-5.556c-1.939 0-3.271 0.38-3.995 1.14s-1.099 2.127-1.125 4.102c0 2.154 0.359 3.06 1.086 3.742s2.133 1.188 4.344 1.188h6.846c1.717 0 3.346-0.808 3.346-2.747v-8.584c0-2.176-0.589-3.635-1.765-4.375zm-3.181 12.959h-3.219c-0.735 0.081-1.478-0.037-2.153-0.342-0.284-0.227-0.427-0.876-0.427-1.948s0.136-1.741 0.408-2.007c0.624-0.331 1.336-0.46 2.036-0.371h3.384z" fill="#fff"/></svg></a>'},U.on("assignSuggestions",h),r.defaultOptions=V,r.version="21.12.0",e.Suggestions=r,e.fn.suggestions=function(t,n){return 0===arguments.length?this.first().data("suggestions"):this.each(function(){var i=e(this),s=i.data("suggestions");"string"==typeof t?s&&"function"==typeof s[t]&&s[t](n):(s&&s.dispose&&s.dispose(),s=new r(this,t),i.data("suggestions",s))})}});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:65:"/local/templates/psk2024/js/libs/tippy.umd.min.js?168725489144127";s:6:"source";s:49:"/local/templates/psk2024/js/libs/tippy.umd.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * @popperjs/core v2.11.7 - MIT License
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function x(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:x(b(e))}function w(e,n){var r;void 0===n&&(n=[]);var o=x(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(w(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e){return e.split("-")[0]}function N(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function I(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _(e,r,o){return r===H?I(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):I(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function F(e,t,o,s){var f="clippingParents"===t?function(e){var t=w(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&N(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=_(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),_(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,x=Y("number"!=typeof b?b:G(b,k)),w=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?w:m],E=F(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=I(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+x.top,bottom:B.bottom-E.bottom+x.bottom,left:E.left-B.left+x.left,right:B.right-E.right+x.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?w(e):e.contextElement?w(e.contextElement):[],popper:w(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,x="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=x.x,b=x.y;var w=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:s(n*o)/o||0,y:s(r*o)/o||0}}({x:y,y:b},t(r)):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=w?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=w?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:C(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=C(v),g=f||(y===v||!h?[fe(v)]:function(e){if(C(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(C(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=C(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;x[S]>w[S]&&(q=fe(q));var N=fe(q),I=[];if(i&&I.push(V[H]<=0),s&&I.push(V[q]<=0,V[N]<=0),I.every((function(e){return e}))){E=B,j=!1;break}O.set(B,I)}if(j)for(var _=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},F=h?3:1;F>0;F--){if("break"===_(F))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),x=C(t.placement),w=U(t.placement),O=!w,j=z(x),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,N="y"===j?D:P,I="y"===j?A:L,_="y"===j?"height":"width",F=k[j],X=F+b[N],Y=F-b[I],G=m?-H[_]/2:0,K=w===W?B[_]:H[_],Q=w===W?-H[_]:-B[_],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[N],ne=ee[I],re=de(0,B[_],$[_]),oe=O?B[_]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[_]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=F+ie-fe,pe=de(m?a(X,F+oe-fe-se):X,F,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-F}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(x),xe=null!=(ue=null==S?void 0:S[M])?ue:0,we=be?ye:me-B[ve]-H[ve]-xe+R.altAxis,Oe=be?me+B[ve]+H[ve]-xe-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(we,me,Oe):de(m?we:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,x=p[l],w=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(x,O,w),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&N(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),xe=[ee,te,oe,ie,ae,le,he,me,ge],we=Z({defaultModifiers:xe});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=we,e.createPopperLite=be,e.defaultModifiers=xe,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));

/* TIPPY */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@popperjs/core")):"function"==typeof define&&define.amd?define(["@popperjs/core"],t):(e=e||self).tippy=t(e.Popper)}(this,(function(e){"use strict";var t={passive:!0,capture:!0},n=function(){return document.body};function r(e,t,n){if(Array.isArray(e)){var r=e[t];return null==r?Array.isArray(n)?n[t]:n:r}return e}function o(e,t){var n={}.toString.call(e);return 0===n.indexOf("[object")&&n.indexOf(t+"]")>-1}function i(e,t){return"function"==typeof e?e.apply(void 0,t):e}function a(e,t){return 0===t?e:function(r){clearTimeout(n),n=setTimeout((function(){e(r)}),t)};var n}function s(e,t){var n=Object.assign({},e);return t.forEach((function(e){delete n[e]})),n}function u(e){return[].concat(e)}function c(e,t){-1===e.indexOf(t)&&e.push(t)}function p(e){return e.split("-")[0]}function f(e){return[].slice.call(e)}function l(e){return Object.keys(e).reduce((function(t,n){return void 0!==e[n]&&(t[n]=e[n]),t}),{})}function d(){return document.createElement("div")}function v(e){return["Element","Fragment"].some((function(t){return o(e,t)}))}function m(e){return o(e,"MouseEvent")}function g(e){return!(!e||!e._tippy||e._tippy.reference!==e)}function h(e){return v(e)?[e]:function(e){return o(e,"NodeList")}(e)?f(e):Array.isArray(e)?e:f(document.querySelectorAll(e))}function b(e,t){e.forEach((function(e){e&&(e.style.transitionDuration=t+"ms")}))}function y(e,t){e.forEach((function(e){e&&e.setAttribute("data-state",t)}))}function w(e){var t,n=u(e)[0];return null!=n&&null!=(t=n.ownerDocument)&&t.body?n.ownerDocument:document}function E(e,t,n){var r=t+"EventListener";["transitionend","webkitTransitionEnd"].forEach((function(t){e[r](t,n)}))}function O(e,t){for(var n=t;n;){var r;if(e.contains(n))return!0;n=null==n.getRootNode||null==(r=n.getRootNode())?void 0:r.host}return!1}var x={isTouch:!1},C=0;function T(){x.isTouch||(x.isTouch=!0,window.performance&&document.addEventListener("mousemove",A))}function A(){var e=performance.now();e-C<20&&(x.isTouch=!1,document.removeEventListener("mousemove",A)),C=e}function L(){var e=document.activeElement;if(g(e)){var t=e._tippy;e.blur&&!t.state.isVisible&&e.blur()}}var D=!!("undefined"!=typeof window&&"undefined"!=typeof document)&&!!window.msCrypto,R=Object.assign({appendTo:n,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},{animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},{allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999}),k=Object.keys(R);function P(e){var t=(e.plugins||[]).reduce((function(t,n){var r,o=n.name,i=n.defaultValue;o&&(t[o]=void 0!==e[o]?e[o]:null!=(r=R[o])?r:i);return t}),{});return Object.assign({},e,t)}function j(e,t){var n=Object.assign({},t,{content:i(t.content,[e])},t.ignoreAttributes?{}:function(e,t){return(t?Object.keys(P(Object.assign({},R,{plugins:t}))):k).reduce((function(t,n){var r=(e.getAttribute("data-tippy-"+n)||"").trim();if(!r)return t;if("content"===n)t[n]=r;else try{t[n]=JSON.parse(r)}catch(e){t[n]=r}return t}),{})}(e,t.plugins));return n.aria=Object.assign({},R.aria,n.aria),n.aria={expanded:"auto"===n.aria.expanded?t.interactive:n.aria.expanded,content:"auto"===n.aria.content?t.interactive?null:"describedby":n.aria.content},n}function M(e,t){e.innerHTML=t}function V(e){var t=d();return!0===e?t.className="tippy-arrow":(t.className="tippy-svg-arrow",v(e)?t.appendChild(e):M(t,e)),t}function I(e,t){v(t.content)?(M(e,""),e.appendChild(t.content)):"function"!=typeof t.content&&(t.allowHTML?M(e,t.content):e.textContent=t.content)}function S(e){var t=e.firstElementChild,n=f(t.children);return{box:t,content:n.find((function(e){return e.classList.contains("tippy-content")})),arrow:n.find((function(e){return e.classList.contains("tippy-arrow")||e.classList.contains("tippy-svg-arrow")})),backdrop:n.find((function(e){return e.classList.contains("tippy-backdrop")}))}}function N(e){var t=d(),n=d();n.className="tippy-box",n.setAttribute("data-state","hidden"),n.setAttribute("tabindex","-1");var r=d();function o(n,r){var o=S(t),i=o.box,a=o.content,s=o.arrow;r.theme?i.setAttribute("data-theme",r.theme):i.removeAttribute("data-theme"),"string"==typeof r.animation?i.setAttribute("data-animation",r.animation):i.removeAttribute("data-animation"),r.inertia?i.setAttribute("data-inertia",""):i.removeAttribute("data-inertia"),i.style.maxWidth="number"==typeof r.maxWidth?r.maxWidth+"px":r.maxWidth,r.role?i.setAttribute("role",r.role):i.removeAttribute("role"),n.content===r.content&&n.allowHTML===r.allowHTML||I(a,e.props),r.arrow?s?n.arrow!==r.arrow&&(i.removeChild(s),i.appendChild(V(r.arrow))):i.appendChild(V(r.arrow)):s&&i.removeChild(s)}return r.className="tippy-content",r.setAttribute("data-state","hidden"),I(r,e.props),t.appendChild(n),n.appendChild(r),o(e.props,e.props),{popper:t,onUpdate:o}}N.$$tippy=!0;var B=1,H=[],U=[];function _(o,s){var v,g,h,C,T,A,L,k,M=j(o,Object.assign({},R,P(l(s)))),V=!1,I=!1,N=!1,_=!1,F=[],W=a(we,M.interactiveDebounce),X=B++,Y=(k=M.plugins).filter((function(e,t){return k.indexOf(e)===t})),$={id:X,reference:o,popper:d(),popperInstance:null,props:M,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},plugins:Y,clearDelayTimeouts:function(){clearTimeout(v),clearTimeout(g),cancelAnimationFrame(h)},setProps:function(e){if($.state.isDestroyed)return;ae("onBeforeUpdate",[$,e]),be();var t=$.props,n=j(o,Object.assign({},t,l(e),{ignoreAttributes:!0}));$.props=n,he(),t.interactiveDebounce!==n.interactiveDebounce&&(ce(),W=a(we,n.interactiveDebounce));t.triggerTarget&&!n.triggerTarget?u(t.triggerTarget).forEach((function(e){e.removeAttribute("aria-expanded")})):n.triggerTarget&&o.removeAttribute("aria-expanded");ue(),ie(),J&&J(t,n);$.popperInstance&&(Ce(),Ae().forEach((function(e){requestAnimationFrame(e._tippy.popperInstance.forceUpdate)})));ae("onAfterUpdate",[$,e])},setContent:function(e){$.setProps({content:e})},show:function(){var e=$.state.isVisible,t=$.state.isDestroyed,o=!$.state.isEnabled,a=x.isTouch&&!$.props.touch,s=r($.props.duration,0,R.duration);if(e||t||o||a)return;if(te().hasAttribute("disabled"))return;if(ae("onShow",[$],!1),!1===$.props.onShow($))return;$.state.isVisible=!0,ee()&&(z.style.visibility="visible");ie(),de(),$.state.isMounted||(z.style.transition="none");if(ee()){var u=re(),p=u.box,f=u.content;b([p,f],0)}A=function(){var e;if($.state.isVisible&&!_){if(_=!0,z.offsetHeight,z.style.transition=$.props.moveTransition,ee()&&$.props.animation){var t=re(),n=t.box,r=t.content;b([n,r],s),y([n,r],"visible")}se(),ue(),c(U,$),null==(e=$.popperInstance)||e.forceUpdate(),ae("onMount",[$]),$.props.animation&&ee()&&function(e,t){me(e,t)}(s,(function(){$.state.isShown=!0,ae("onShown",[$])}))}},function(){var e,t=$.props.appendTo,r=te();e=$.props.interactive&&t===n||"parent"===t?r.parentNode:i(t,[r]);e.contains(z)||e.appendChild(z);$.state.isMounted=!0,Ce()}()},hide:function(){var e=!$.state.isVisible,t=$.state.isDestroyed,n=!$.state.isEnabled,o=r($.props.duration,1,R.duration);if(e||t||n)return;if(ae("onHide",[$],!1),!1===$.props.onHide($))return;$.state.isVisible=!1,$.state.isShown=!1,_=!1,V=!1,ee()&&(z.style.visibility="hidden");if(ce(),ve(),ie(!0),ee()){var i=re(),a=i.box,s=i.content;$.props.animation&&(b([a,s],o),y([a,s],"hidden"))}se(),ue(),$.props.animation?ee()&&function(e,t){me(e,(function(){!$.state.isVisible&&z.parentNode&&z.parentNode.contains(z)&&t()}))}(o,$.unmount):$.unmount()},hideWithInteractivity:function(e){ne().addEventListener("mousemove",W),c(H,W),W(e)},enable:function(){$.state.isEnabled=!0},disable:function(){$.hide(),$.state.isEnabled=!1},unmount:function(){$.state.isVisible&&$.hide();if(!$.state.isMounted)return;Te(),Ae().forEach((function(e){e._tippy.unmount()})),z.parentNode&&z.parentNode.removeChild(z);U=U.filter((function(e){return e!==$})),$.state.isMounted=!1,ae("onHidden",[$])},destroy:function(){if($.state.isDestroyed)return;$.clearDelayTimeouts(),$.unmount(),be(),delete o._tippy,$.state.isDestroyed=!0,ae("onDestroy",[$])}};if(!M.render)return $;var q=M.render($),z=q.popper,J=q.onUpdate;z.setAttribute("data-tippy-root",""),z.id="tippy-"+$.id,$.popper=z,o._tippy=$,z._tippy=$;var G=Y.map((function(e){return e.fn($)})),K=o.hasAttribute("aria-expanded");return he(),ue(),ie(),ae("onCreate",[$]),M.showOnCreate&&Le(),z.addEventListener("mouseenter",(function(){$.props.interactive&&$.state.isVisible&&$.clearDelayTimeouts()})),z.addEventListener("mouseleave",(function(){$.props.interactive&&$.props.trigger.indexOf("mouseenter")>=0&&ne().addEventListener("mousemove",W)})),$;function Q(){var e=$.props.touch;return Array.isArray(e)?e:[e,0]}function Z(){return"hold"===Q()[0]}function ee(){var e;return!(null==(e=$.props.render)||!e.$$tippy)}function te(){return L||o}function ne(){var e=te().parentNode;return e?w(e):document}function re(){return S(z)}function oe(e){return $.state.isMounted&&!$.state.isVisible||x.isTouch||C&&"focus"===C.type?0:r($.props.delay,e?0:1,R.delay)}function ie(e){void 0===e&&(e=!1),z.style.pointerEvents=$.props.interactive&&!e?"":"none",z.style.zIndex=""+$.props.zIndex}function ae(e,t,n){var r;(void 0===n&&(n=!0),G.forEach((function(n){n[e]&&n[e].apply(n,t)})),n)&&(r=$.props)[e].apply(r,t)}function se(){var e=$.props.aria;if(e.content){var t="aria-"+e.content,n=z.id;u($.props.triggerTarget||o).forEach((function(e){var r=e.getAttribute(t);if($.state.isVisible)e.setAttribute(t,r?r+" "+n:n);else{var o=r&&r.replace(n,"").trim();o?e.setAttribute(t,o):e.removeAttribute(t)}}))}}function ue(){!K&&$.props.aria.expanded&&u($.props.triggerTarget||o).forEach((function(e){$.props.interactive?e.setAttribute("aria-expanded",$.state.isVisible&&e===te()?"true":"false"):e.removeAttribute("aria-expanded")}))}function ce(){ne().removeEventListener("mousemove",W),H=H.filter((function(e){return e!==W}))}function pe(e){if(!x.isTouch||!N&&"mousedown"!==e.type){var t=e.composedPath&&e.composedPath()[0]||e.target;if(!$.props.interactive||!O(z,t)){if(u($.props.triggerTarget||o).some((function(e){return O(e,t)}))){if(x.isTouch)return;if($.state.isVisible&&$.props.trigger.indexOf("click")>=0)return}else ae("onClickOutside",[$,e]);!0===$.props.hideOnClick&&($.clearDelayTimeouts(),$.hide(),I=!0,setTimeout((function(){I=!1})),$.state.isMounted||ve())}}}function fe(){N=!0}function le(){N=!1}function de(){var e=ne();e.addEventListener("mousedown",pe,!0),e.addEventListener("touchend",pe,t),e.addEventListener("touchstart",le,t),e.addEventListener("touchmove",fe,t)}function ve(){var e=ne();e.removeEventListener("mousedown",pe,!0),e.removeEventListener("touchend",pe,t),e.removeEventListener("touchstart",le,t),e.removeEventListener("touchmove",fe,t)}function me(e,t){var n=re().box;function r(e){e.target===n&&(E(n,"remove",r),t())}if(0===e)return t();E(n,"remove",T),E(n,"add",r),T=r}function ge(e,t,n){void 0===n&&(n=!1),u($.props.triggerTarget||o).forEach((function(r){r.addEventListener(e,t,n),F.push({node:r,eventType:e,handler:t,options:n})}))}function he(){var e;Z()&&(ge("touchstart",ye,{passive:!0}),ge("touchend",Ee,{passive:!0})),(e=$.props.trigger,e.split(/\s+/).filter(Boolean)).forEach((function(e){if("manual"!==e)switch(ge(e,ye),e){case"mouseenter":ge("mouseleave",Ee);break;case"focus":ge(D?"focusout":"blur",Oe);break;case"focusin":ge("focusout",Oe)}}))}function be(){F.forEach((function(e){var t=e.node,n=e.eventType,r=e.handler,o=e.options;t.removeEventListener(n,r,o)})),F=[]}function ye(e){var t,n=!1;if($.state.isEnabled&&!xe(e)&&!I){var r="focus"===(null==(t=C)?void 0:t.type);C=e,L=e.currentTarget,ue(),!$.state.isVisible&&m(e)&&H.forEach((function(t){return t(e)})),"click"===e.type&&($.props.trigger.indexOf("mouseenter")<0||V)&&!1!==$.props.hideOnClick&&$.state.isVisible?n=!0:Le(e),"click"===e.type&&(V=!n),n&&!r&&De(e)}}function we(e){var t=e.target,n=te().contains(t)||z.contains(t);"mousemove"===e.type&&n||function(e,t){var n=t.clientX,r=t.clientY;return e.every((function(e){var t=e.popperRect,o=e.popperState,i=e.props.interactiveBorder,a=p(o.placement),s=o.modifiersData.offset;if(!s)return!0;var u="bottom"===a?s.top.y:0,c="top"===a?s.bottom.y:0,f="right"===a?s.left.x:0,l="left"===a?s.right.x:0,d=t.top-r+u>i,v=r-t.bottom-c>i,m=t.left-n+f>i,g=n-t.right-l>i;return d||v||m||g}))}(Ae().concat(z).map((function(e){var t,n=null==(t=e._tippy.popperInstance)?void 0:t.state;return n?{popperRect:e.getBoundingClientRect(),popperState:n,props:M}:null})).filter(Boolean),e)&&(ce(),De(e))}function Ee(e){xe(e)||$.props.trigger.indexOf("click")>=0&&V||($.props.interactive?$.hideWithInteractivity(e):De(e))}function Oe(e){$.props.trigger.indexOf("focusin")<0&&e.target!==te()||$.props.interactive&&e.relatedTarget&&z.contains(e.relatedTarget)||De(e)}function xe(e){return!!x.isTouch&&Z()!==e.type.indexOf("touch")>=0}function Ce(){Te();var t=$.props,n=t.popperOptions,r=t.placement,i=t.offset,a=t.getReferenceClientRect,s=t.moveTransition,u=ee()?S(z).arrow:null,c=a?{getBoundingClientRect:a,contextElement:a.contextElement||te()}:o,p=[{name:"offset",options:{offset:i}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!s}},{name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(e){var t=e.state;if(ee()){var n=re().box;["placement","reference-hidden","escaped"].forEach((function(e){"placement"===e?n.setAttribute("data-placement",t.placement):t.attributes.popper["data-popper-"+e]?n.setAttribute("data-"+e,""):n.removeAttribute("data-"+e)})),t.attributes.popper={}}}}];ee()&&u&&p.push({name:"arrow",options:{element:u,padding:3}}),p.push.apply(p,(null==n?void 0:n.modifiers)||[]),$.popperInstance=e.createPopper(c,z,Object.assign({},n,{placement:r,onFirstUpdate:A,modifiers:p}))}function Te(){$.popperInstance&&($.popperInstance.destroy(),$.popperInstance=null)}function Ae(){return f(z.querySelectorAll("[data-tippy-root]"))}function Le(e){$.clearDelayTimeouts(),e&&ae("onTrigger",[$,e]),de();var t=oe(!0),n=Q(),r=n[0],o=n[1];x.isTouch&&"hold"===r&&o&&(t=o),t?v=setTimeout((function(){$.show()}),t):$.show()}function De(e){if($.clearDelayTimeouts(),ae("onUntrigger",[$,e]),$.state.isVisible){if(!($.props.trigger.indexOf("mouseenter")>=0&&$.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(e.type)>=0&&V)){var t=oe(!1);t?g=setTimeout((function(){$.state.isVisible&&$.hide()}),t):h=requestAnimationFrame((function(){$.hide()}))}}else ve()}}function F(e,n){void 0===n&&(n={});var r=R.plugins.concat(n.plugins||[]);document.addEventListener("touchstart",T,t),window.addEventListener("blur",L);var o=Object.assign({},n,{plugins:r}),i=h(e).reduce((function(e,t){var n=t&&_(t,o);return n&&e.push(n),e}),[]);return v(e)?i[0]:i}F.defaultProps=R,F.setDefaultProps=function(e){Object.keys(e).forEach((function(t){R[t]=e[t]}))},F.currentInput=x;var W=Object.assign({},e.applyStyles,{effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow)}}),X={mouseover:"mouseenter",focusin:"focus",click:"click"};var Y={name:"animateFill",defaultValue:!1,fn:function(e){var t;if(null==(t=e.props.render)||!t.$$tippy)return{};var n=S(e.popper),r=n.box,o=n.content,i=e.props.animateFill?function(){var e=d();return e.className="tippy-backdrop",y([e],"hidden"),e}():null;return{onCreate:function(){i&&(r.insertBefore(i,r.firstElementChild),r.setAttribute("data-animatefill",""),r.style.overflow="hidden",e.setProps({arrow:!1,animation:"shift-away"}))},onMount:function(){if(i){var e=r.style.transitionDuration,t=Number(e.replace("ms",""));o.style.transitionDelay=Math.round(t/10)+"ms",i.style.transitionDuration=e,y([i],"visible")}},onShow:function(){i&&(i.style.transitionDuration="0ms")},onHide:function(){i&&y([i],"hidden")}}}};var $={clientX:0,clientY:0},q=[];function z(e){var t=e.clientX,n=e.clientY;$={clientX:t,clientY:n}}var J={name:"followCursor",defaultValue:!1,fn:function(e){var t=e.reference,n=w(e.props.triggerTarget||t),r=!1,o=!1,i=!0,a=e.props;function s(){return"initial"===e.props.followCursor&&e.state.isVisible}function u(){n.addEventListener("mousemove",f)}function c(){n.removeEventListener("mousemove",f)}function p(){r=!0,e.setProps({getReferenceClientRect:null}),r=!1}function f(n){var r=!n.target||t.contains(n.target),o=e.props.followCursor,i=n.clientX,a=n.clientY,s=t.getBoundingClientRect(),u=i-s.left,c=a-s.top;!r&&e.props.interactive||e.setProps({getReferenceClientRect:function(){var e=t.getBoundingClientRect(),n=i,r=a;"initial"===o&&(n=e.left+u,r=e.top+c);var s="horizontal"===o?e.top:r,p="vertical"===o?e.right:n,f="horizontal"===o?e.bottom:r,l="vertical"===o?e.left:n;return{width:p-l,height:f-s,top:s,right:p,bottom:f,left:l}}})}function l(){e.props.followCursor&&(q.push({instance:e,doc:n}),function(e){e.addEventListener("mousemove",z)}(n))}function d(){0===(q=q.filter((function(t){return t.instance!==e}))).filter((function(e){return e.doc===n})).length&&function(e){e.removeEventListener("mousemove",z)}(n)}return{onCreate:l,onDestroy:d,onBeforeUpdate:function(){a=e.props},onAfterUpdate:function(t,n){var i=n.followCursor;r||void 0!==i&&a.followCursor!==i&&(d(),i?(l(),!e.state.isMounted||o||s()||u()):(c(),p()))},onMount:function(){e.props.followCursor&&!o&&(i&&(f($),i=!1),s()||u())},onTrigger:function(e,t){m(t)&&($={clientX:t.clientX,clientY:t.clientY}),o="focus"===t.type},onHidden:function(){e.props.followCursor&&(p(),c(),i=!0)}}}};var G={name:"inlinePositioning",defaultValue:!1,fn:function(e){var t,n=e.reference;var r=-1,o=!1,i=[],a={name:"tippyInlinePositioning",enabled:!0,phase:"afterWrite",fn:function(o){var a=o.state;e.props.inlinePositioning&&(-1!==i.indexOf(a.placement)&&(i=[]),t!==a.placement&&-1===i.indexOf(a.placement)&&(i.push(a.placement),e.setProps({getReferenceClientRect:function(){return function(e){return function(e,t,n,r){if(n.length<2||null===e)return t;if(2===n.length&&r>=0&&n[0].left>n[1].right)return n[r]||t;switch(e){case"top":case"bottom":var o=n[0],i=n[n.length-1],a="top"===e,s=o.top,u=i.bottom,c=a?o.left:i.left,p=a?o.right:i.right;return{top:s,bottom:u,left:c,right:p,width:p-c,height:u-s};case"left":case"right":var f=Math.min.apply(Math,n.map((function(e){return e.left}))),l=Math.max.apply(Math,n.map((function(e){return e.right}))),d=n.filter((function(t){return"left"===e?t.left===f:t.right===l})),v=d[0].top,m=d[d.length-1].bottom;return{top:v,bottom:m,left:f,right:l,width:l-f,height:m-v};default:return t}}(p(e),n.getBoundingClientRect(),f(n.getClientRects()),r)}(a.placement)}})),t=a.placement)}};function s(){var t;o||(t=function(e,t){var n;return{popperOptions:Object.assign({},e.popperOptions,{modifiers:[].concat(((null==(n=e.popperOptions)?void 0:n.modifiers)||[]).filter((function(e){return e.name!==t.name})),[t])})}}(e.props,a),o=!0,e.setProps(t),o=!1)}return{onCreate:s,onAfterUpdate:s,onTrigger:function(t,n){if(m(n)){var o=f(e.reference.getClientRects()),i=o.find((function(e){return e.left-2<=n.clientX&&e.right+2>=n.clientX&&e.top-2<=n.clientY&&e.bottom+2>=n.clientY})),a=o.indexOf(i);r=a>-1?a:r}},onHidden:function(){r=-1}}}};var K={name:"sticky",defaultValue:!1,fn:function(e){var t=e.reference,n=e.popper;function r(t){return!0===e.props.sticky||e.props.sticky===t}var o=null,i=null;function a(){var s=r("reference")?(e.popperInstance?e.popperInstance.state.elements.reference:t).getBoundingClientRect():null,u=r("popper")?n.getBoundingClientRect():null;(s&&Q(o,s)||u&&Q(i,u))&&e.popperInstance&&e.popperInstance.update(),o=s,i=u,e.state.isMounted&&requestAnimationFrame(a)}return{onMount:function(){e.props.sticky&&a()}}}};function Q(e,t){return!e||!t||(e.top!==t.top||e.right!==t.right||e.bottom!==t.bottom||e.left!==t.left)}return F.setDefaultProps({plugins:[Y,J,G,K],render:N}),F.createSingleton=function(e,t){var n;void 0===t&&(t={});var r,o=e,i=[],a=[],c=t.overrides,p=[],f=!1;function l(){a=o.map((function(e){return u(e.props.triggerTarget||e.reference)})).reduce((function(e,t){return e.concat(t)}),[])}function v(){i=o.map((function(e){return e.reference}))}function m(e){o.forEach((function(t){e?t.enable():t.disable()}))}function g(e){return o.map((function(t){var n=t.setProps;return t.setProps=function(o){n(o),t.reference===r&&e.setProps(o)},function(){t.setProps=n}}))}function h(e,t){var n=a.indexOf(t);if(t!==r){r=t;var s=(c||[]).concat("content").reduce((function(e,t){return e[t]=o[n].props[t],e}),{});e.setProps(Object.assign({},s,{getReferenceClientRect:"function"==typeof s.getReferenceClientRect?s.getReferenceClientRect:function(){var e;return null==(e=i[n])?void 0:e.getBoundingClientRect()}}))}}m(!1),v(),l();var b={fn:function(){return{onDestroy:function(){m(!0)},onHidden:function(){r=null},onClickOutside:function(e){e.props.showOnCreate&&!f&&(f=!0,r=null)},onShow:function(e){e.props.showOnCreate&&!f&&(f=!0,h(e,i[0]))},onTrigger:function(e,t){h(e,t.currentTarget)}}}},y=F(d(),Object.assign({},s(t,["overrides"]),{plugins:[b].concat(t.plugins||[]),triggerTarget:a,popperOptions:Object.assign({},t.popperOptions,{modifiers:[].concat((null==(n=t.popperOptions)?void 0:n.modifiers)||[],[W])})})),w=y.show;y.show=function(e){if(w(),!r&&null==e)return h(y,i[0]);if(!r||null!=e){if("number"==typeof e)return i[e]&&h(y,i[e]);if(o.indexOf(e)>=0){var t=e.reference;return h(y,t)}return i.indexOf(e)>=0?h(y,e):void 0}},y.showNext=function(){var e=i[0];if(!r)return y.show(0);var t=i.indexOf(r);y.show(i[t+1]||e)},y.showPrevious=function(){var e=i[i.length-1];if(!r)return y.show(e);var t=i.indexOf(r),n=i[t-1]||e;y.show(n)};var E=y.setProps;return y.setProps=function(e){c=e.overrides||c,E(e)},y.setInstances=function(e){m(!0),p.forEach((function(e){return e()})),o=e,m(!1),v(),l(),p=g(y),y.setProps({triggerTarget:a})},p=g(y),y},F.delegate=function(e,n){var r=[],o=[],i=!1,a=n.target,c=s(n,["target"]),p=Object.assign({},c,{trigger:"manual",touch:!1}),f=Object.assign({touch:R.touch},c,{showOnCreate:!0}),l=F(e,p);function d(e){if(e.target&&!i){var t=e.target.closest(a);if(t){var r=t.getAttribute("data-tippy-trigger")||n.trigger||R.trigger;if(!t._tippy&&!("touchstart"===e.type&&"boolean"==typeof f.touch||"touchstart"!==e.type&&r.indexOf(X[e.type])<0)){var s=F(t,f);s&&(o=o.concat(s))}}}}function v(e,t,n,o){void 0===o&&(o=!1),e.addEventListener(t,n,o),r.push({node:e,eventType:t,handler:n,options:o})}return u(l).forEach((function(e){var n=e.destroy,a=e.enable,s=e.disable;e.destroy=function(e){void 0===e&&(e=!0),e&&o.forEach((function(e){e.destroy()})),o=[],r.forEach((function(e){var t=e.node,n=e.eventType,r=e.handler,o=e.options;t.removeEventListener(n,r,o)})),r=[],n()},e.enable=function(){a(),o.forEach((function(e){return e.enable()})),i=!1},e.disable=function(){s(),o.forEach((function(e){return e.disable()})),i=!0},function(e){var n=e.reference;v(n,"touchstart",d,t),v(n,"mouseover",d),v(n,"focusin",d),v(n,"click",d)}(e)})),l},F.hideAll=function(e){var t=void 0===e?{}:e,n=t.exclude,r=t.duration;U.forEach((function(e){var t=!1;if(n&&(t=g(n)?e.reference===n:e.popper===n.popper),!t){var o=e.props.duration;e.setProps({duration:r}),e.hide(),e.state.isDestroyed||e.setProps({duration:o})}}))},F.roundArrow='<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',F}));
/* End */
;
; /* Start:"a:4:{s:4:"full";s:60:"/local/templates/psk2024/js/libs/clamp.min.js?16872548912494";s:6:"source";s:45:"/local/templates/psk2024/js/libs/clamp.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
(function(){window.$clamp=function(c,d){function s(a,b){n.getComputedStyle||(n.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;"float"==b&&(b="styleFloat");c.test(b)&&(b=b.replace(c,function(a,b,c){return c.toUpperCase()}));return a.currentStyle&&a.currentStyle[b]?a.currentStyle[b]:null};return this});return n.getComputedStyle(a,null).getPropertyValue(b)}function t(a){a=a||c.clientHeight;var b=u(c);return Math.max(Math.floor(a/b),0)}function x(a){return u(c)*
  a}function u(a){var b=s(a,"line-height");"normal"==b&&(b=1.2*parseInt(s(a,"font-size")));return parseInt(b)}function l(a){if(a.lastChild.children&&0<a.lastChild.children.length)return l(Array.prototype.slice.call(a.children).pop());if(a.lastChild&&a.lastChild.nodeValue&&""!=a.lastChild.nodeValue&&a.lastChild.nodeValue!=b.truncationChar)return a.lastChild;a.lastChild.parentNode.removeChild(a.lastChild);return l(c)}function p(a,d){if(d){var e=a.nodeValue.replace(b.truncationChar,"");f||(h=0<k.length?
  k.shift():"",f=e.split(h));1<f.length?(q=f.pop(),r(a,f.join(h))):f=null;m&&(a.nodeValue=a.nodeValue.replace(b.truncationChar,""),c.innerHTML=a.nodeValue+" "+m.innerHTML+b.truncationChar);if(f){if(c.clientHeight<=d)if(0<=k.length&&""!=h)r(a,f.join(h)+h+q),f=null;else return c.innerHTML}else""==h&&(r(a,""),a=l(c),k=b.splitOnChars.slice(0),h=k[0],q=f=null);if(b.animate)setTimeout(function(){p(a,d)},!0===b.animate?10:b.animate);else return p(a,d)}}function r(a,c){a.nodeValue=c+b.truncationChar}d=d||{};
  var n=window,b={clamp:d.clamp||2,useNativeClamp:"undefined"!=typeof d.useNativeClamp?d.useNativeClamp:!0,splitOnChars:d.splitOnChars||[".","-","\u2013","\u2014"," "],animate:d.animate||!1,truncationChar:d.truncationChar||"\u2026",truncationHTML:d.truncationHTML},e=c.style,y=c.innerHTML,z="undefined"!=typeof c.style.webkitLineClamp,g=b.clamp,v=g.indexOf&&(-1<g.indexOf("px")||-1<g.indexOf("em")),m;b.truncationHTML&&(m=document.createElement("span"),m.innerHTML=b.truncationHTML);var k=b.splitOnChars.slice(0),
  h=k[0],f,q;"auto"==g?g=t():v&&(g=t(parseInt(g)));var w;z&&b.useNativeClamp?(e.overflow="hidden",e.textOverflow="ellipsis",e.webkitBoxOrient="vertical",e.display="-webkit-box",e.webkitLineClamp=g,v&&(e.height=b.clamp+"px")):(e=x(g),e<=c.clientHeight&&(w=p(l(c),e)));return{original:y,clamped:w}}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:71:"/local/templates/psk2024/js/libs/jquery.fancybox.min.js?163486004968253";s:6:"source";s:55:"/local/templates/psk2024/js/libs/jquery.fancybox.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function i(t,e){var o,i,a,s=[],r=0;t&&t.isDefaultPrevented()||(t.preventDefault(),e=e||{},t&&t.data&&(e=h(t.data.options,e)),o=e.$target||n(t.currentTarget).trigger("blur"),(a=n.fancybox.getInstance())&&a.$trigger&&a.$trigger.is(o)||(e.selector?s=n(e.selector):(i=o.attr("data-fancybox")||"",i?(s=t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+i+'"]'):n('[data-fancybox="'+i+'"]')):s=[o]),r=n(s).index(o),r<0&&(r=0),a=n.fancybox.open(s,e,r),a.$trigger=o))}if(t.console=t.console||{info:function(t){}},n){if(n.fn.fancybox)return void console.info("fancyBox already initialized");var a={closeExisting:!1,loop:!1,gutter:50,keyboard:!0,preventCaptionOverlap:!0,arrows:!0,infobar:!0,smallBtn:"auto",toolbar:"auto",buttons:["zoom","slideShow","thumbs","close"],idleTime:3,protect:!1,modal:!1,image:{preload:!1},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},video:{tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',format:"",autoStart:!0},defaultType:"image",animationEffect:"zoom",animationDuration:366,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}</p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',smallBtn:'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'},parentEl:"body",hideScrollbar:!0,autoFocus:!0,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:3e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},wheel:"auto",onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{preventCaptionOverlap:!1,idleTime:!1,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schlie&szlig;en",NEXT:"Weiter",PREV:"Zur&uuml;ck",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Vergr&ouml;&szlig;ern"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},d=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),u=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),f=function(){var t,n=e.createElement("fakeelement"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(void 0!==n.style[t])return o[t];return"transitionend"}(),p=function(t){return t&&t.length&&t[0].offsetHeight},h=function(t,e){var o=n.extend(!0,{},t,e);return n.each(e,function(t,e){n.isArray(e)&&(o[t]=e)}),o},g=function(t){var o,i;return!(!t||t.ownerDocument!==e)&&(n(".fancybox-container").css("pointer-events","none"),o={x:t.getBoundingClientRect().left+t.offsetWidth/2,y:t.getBoundingClientRect().top+t.offsetHeight/2},i=e.elementFromPoint(o.x,o.y)===t,n(".fancybox-container").css("pointer-events",""),i)},b=function(t,e,o){var i=this;i.opts=h({index:o},n.fancybox.defaults),n.isPlainObject(e)&&(i.opts=h(i.opts,e)),n.fancybox.isMobile&&(i.opts=h(i.opts,i.opts.mobile)),i.id=i.opts.id||++c,i.currIndex=parseInt(i.opts.index,10)||0,i.prevIndex=null,i.prevPos=null,i.currPos=0,i.firstRun=!0,i.group=[],i.slides={},i.addContent(t),i.group.length&&i.init()};n.extend(b.prototype,{init:function(){var o,i,a=this,s=a.group[a.currIndex],r=s.opts;r.closeExisting&&n.fancybox.close(!0),n("body").addClass("fancybox-active"),!n.fancybox.getInstance()&&!1!==r.hideScrollbar&&!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:'+(t.innerWidth-e.documentElement.clientWidth)+"px;}</style>"),n("body").addClass("compensate-for-scrollbar")),i="",n.each(r.buttons,function(t,e){i+=r.btnTpl[e]||""}),o=n(a.translate(a,r.baseTpl.replace("{{buttons}}",i).replace("{{arrows}}",r.btnTpl.arrowLeft+r.btnTpl.arrowRight))).attr("id","fancybox-container-"+a.id).addClass(r.baseClass).data("FancyBox",a).appendTo(r.parentEl),a.$refs={container:o},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){a.$refs[t]=o.find(".fancybox-"+t)}),a.trigger("onInit"),a.activate(),a.jumpTo(a.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang]||t.opts.i18n.en;return e.replace(/\{\{(\w+)\}\}/g,function(t,e){return void 0===n[e]?t:n[e]})},addContent:function(t){var e,o=this,i=n.makeArray(t);n.each(i,function(t,e){var i,a,s,r,c,l={},d={};n.isPlainObject(e)?(l=e,d=e.opts||e):"object"===n.type(e)&&n(e).length?(i=n(e),d=i.data()||{},d=n.extend(!0,{},d,d.options),d.$orig=i,l.src=o.opts.src||d.src||i.attr("href"),l.type||l.src||(l.type="inline",l.src=e)):l={type:"html",src:e+""},l.opts=n.extend(!0,{},o.opts,d),n.isArray(d.buttons)&&(l.opts.buttons=d.buttons),n.fancybox.isMobile&&l.opts.mobile&&(l.opts=h(l.opts,l.opts.mobile)),a=l.type||l.opts.type,r=l.src||"",!a&&r&&((s=r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))?(a="video",l.opts.video.format||(l.opts.video.format="video/"+("ogv"===s[1]?"ogg":s[1]))):r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?a="image":r.match(/\.(pdf)((\?|#).*)?$/i)?(a="iframe",l=n.extend(!0,l,{contentType:"pdf",opts:{iframe:{preload:!1}}})):"#"===r.charAt(0)&&(a="inline")),a?l.type=a:o.trigger("objectNeedsType",l),l.contentType||(l.contentType=n.inArray(l.type,["html","inline","ajax"])>-1?"html":l.type),l.index=o.group.length,"auto"==l.opts.smallBtn&&(l.opts.smallBtn=n.inArray(l.type,["html","inline","ajax"])>-1),"auto"===l.opts.toolbar&&(l.opts.toolbar=!l.opts.smallBtn),l.$thumb=l.opts.$thumb||null,l.opts.$trigger&&l.index===o.opts.index&&(l.$thumb=l.opts.$trigger.find("img:first"),l.$thumb.length&&(l.opts.$orig=l.opts.$trigger)),l.$thumb&&l.$thumb.length||!l.opts.$orig||(l.$thumb=l.opts.$orig.find("img:first")),l.$thumb&&!l.$thumb.length&&(l.$thumb=null),l.thumb=l.opts.thumb||(l.$thumb?l.$thumb[0].src:null),"function"===n.type(l.opts.caption)&&(l.opts.caption=l.opts.caption.apply(e,[o,l])),"function"===n.type(o.opts.caption)&&(l.opts.caption=o.opts.caption.apply(e,[o,l])),l.opts.caption instanceof n||(l.opts.caption=void 0===l.opts.caption?"":l.opts.caption+""),"ajax"===l.type&&(c=r.split(/\s+/,2),c.length>1&&(l.src=c.shift(),l.opts.filter=c.shift())),l.opts.modal&&(l.opts=n.extend(!0,l.opts,{trapFocus:!0,infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),o.group.push(l)}),Object.keys(o.slides).length&&(o.updateControls(),(e=o.Thumbs)&&e.isActive&&(e.create(),e.focus()))},addEvents:function(){var e=this;e.removeEvents(),e.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),e.close(t)}).on("touchstart.fb-prev click.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),e.previous()}).on("touchstart.fb-next click.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),e.next()}).on("click.fb","[data-fancybox-zoom]",function(t){e[e.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?(e.requestId&&u(e.requestId),e.requestId=d(function(){e.update(t)})):(e.current&&"iframe"===e.current.type&&e.$refs.stage.hide(),setTimeout(function(){e.$refs.stage.show(),e.update(t)},n.fancybox.isMobile?600:250))}),r.on("keydown.fb",function(t){var o=n.fancybox?n.fancybox.getInstance():null,i=o.current,a=t.keyCode||t.which;if(9==a)return void(i.opts.trapFocus&&e.focus(t));if(!(!i.opts.keyboard||t.ctrlKey||t.altKey||t.shiftKey||n(t.target).is("input,textarea,video,audio,select")))return 8===a||27===a?(t.preventDefault(),void e.close(t)):37===a||38===a?(t.preventDefault(),void e.previous()):39===a||40===a?(t.preventDefault(),void e.next()):void e.trigger("afterKeydown",t,a)}),e.group[e.currIndex].opts.idleTime&&(e.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){e.idleSecondsCounter=0,e.isIdle&&e.showControls(),e.isIdle=!1}),e.idleInterval=t.setInterval(function(){++e.idleSecondsCounter>=e.group[e.currIndex].opts.idleTime&&!e.isDragging&&(e.isIdle=!0,e.idleSecondsCounter=0,e.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e){var o,i,a,s,r,c,l,d,u,f=this,h=f.group.length;if(!(f.isDragging||f.isClosing||f.isAnimating&&f.firstRun)){if(t=parseInt(t,10),!(a=f.current?f.current.opts.loop:f.opts.loop)&&(t<0||t>=h))return!1;if(o=f.firstRun=!Object.keys(f.slides).length,r=f.current,f.prevIndex=f.currIndex,f.prevPos=f.currPos,s=f.createSlide(t),h>1&&((a||s.index<h-1)&&f.createSlide(t+1),(a||s.index>0)&&f.createSlide(t-1)),f.current=s,f.currIndex=s.index,f.currPos=s.pos,f.trigger("beforeShow",o),f.updateControls(),s.forcedDuration=void 0,n.isNumeric(e)?s.forcedDuration=e:e=s.opts[o?"animationDuration":"transitionDuration"],e=parseInt(e,10),i=f.isMoved(s),s.$slide.addClass("fancybox-slide--current"),o)return s.opts.animationEffect&&e&&f.$refs.container.css("transition-duration",e+"ms"),f.$refs.container.addClass("fancybox-is-open").trigger("focus"),f.loadSlide(s),void f.preload("image");c=n.fancybox.getTranslate(r.$slide),l=n.fancybox.getTranslate(f.$refs.stage),n.each(f.slides,function(t,e){n.fancybox.stop(e.$slide,!0)}),r.pos!==s.pos&&(r.isComplete=!1),r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),i?(u=c.left-(r.pos*c.width+r.pos*r.opts.gutter),n.each(f.slides,function(t,o){o.$slide.removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")});var i=o.pos*c.width+o.pos*o.opts.gutter;n.fancybox.setTranslate(o.$slide,{top:0,left:i-l.left+u}),o.pos!==s.pos&&o.$slide.addClass("fancybox-slide--"+(o.pos>s.pos?"next":"previous")),p(o.$slide),n.fancybox.animate(o.$slide,{top:0,left:(o.pos-s.pos)*c.width+(o.pos-s.pos)*o.opts.gutter},e,function(){o.$slide.css({transform:"",opacity:""}).removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===f.currPos&&f.complete()})})):e&&s.opts.transitionEffect&&(d="fancybox-animated fancybox-fx-"+s.opts.transitionEffect,r.$slide.addClass("fancybox-slide--"+(r.pos>s.pos?"next":"previous")),n.fancybox.animate(r.$slide,d,e,function(){r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")},!1)),s.isLoaded?f.revealContent(s):f.loadSlide(s),f.preload("image")}},createSlide:function(t){var e,o,i=this;return o=t%i.group.length,o=o<0?i.group.length+o:o,!i.slides[t]&&i.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),i.slides[t]=n.extend(!0,{},i.group[o],{pos:t,$slide:e,isLoaded:!1}),i.updateSlide(i.slides[t])),i.slides[t]},scaleToActual:function(t,e,o){var i,a,s,r,c,l=this,d=l.current,u=d.$content,f=n.fancybox.getTranslate(d.$slide).width,p=n.fancybox.getTranslate(d.$slide).height,h=d.width,g=d.height;l.isAnimating||l.isMoved()||!u||"image"!=d.type||!d.isLoaded||d.hasError||(l.isAnimating=!0,n.fancybox.stop(u),t=void 0===t?.5*f:t,e=void 0===e?.5*p:e,i=n.fancybox.getTranslate(u),i.top-=n.fancybox.getTranslate(d.$slide).top,i.left-=n.fancybox.getTranslate(d.$slide).left,r=h/i.width,c=g/i.height,a=.5*f-.5*h,s=.5*p-.5*g,h>f&&(a=i.left*r-(t*r-t),a>0&&(a=0),a<f-h&&(a=f-h)),g>p&&(s=i.top*c-(e*c-e),s>0&&(s=0),s<p-g&&(s=p-g)),l.updateCursor(h,g),n.fancybox.animate(u,{top:s,left:a,scaleX:r,scaleY:c},o||366,function(){l.isAnimating=!1}),l.SlideShow&&l.SlideShow.isActive&&l.SlideShow.stop())},scaleToFit:function(t){var e,o=this,i=o.current,a=i.$content;o.isAnimating||o.isMoved()||!a||"image"!=i.type||!i.isLoaded||i.hasError||(o.isAnimating=!0,n.fancybox.stop(a),e=o.getFitPos(i),o.updateCursor(e.width,e.height),n.fancybox.animate(a,{top:e.top,left:e.left,scaleX:e.width/a.width(),scaleY:e.height/a.height()},t||366,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,o,i,a,s=this,r=t.$content,c=t.$slide,l=t.width||t.opts.width,d=t.height||t.opts.height,u={};return!!(t.isLoaded&&r&&r.length)&&(e=n.fancybox.getTranslate(s.$refs.stage).width,o=n.fancybox.getTranslate(s.$refs.stage).height,e-=parseFloat(c.css("paddingLeft"))+parseFloat(c.css("paddingRight"))+parseFloat(r.css("marginLeft"))+parseFloat(r.css("marginRight")),o-=parseFloat(c.css("paddingTop"))+parseFloat(c.css("paddingBottom"))+parseFloat(r.css("marginTop"))+parseFloat(r.css("marginBottom")),l&&d||(l=e,d=o),i=Math.min(1,e/l,o/d),l*=i,d*=i,l>e-.5&&(l=e),d>o-.5&&(d=o),"image"===t.type?(u.top=Math.floor(.5*(o-d))+parseFloat(c.css("paddingTop")),u.left=Math.floor(.5*(e-l))+parseFloat(c.css("paddingLeft"))):"video"===t.contentType&&(a=t.opts.width&&t.opts.height?l/d:t.opts.ratio||16/9,d>l/a?d=l/a:l>d*a&&(l=d*a)),u.width=l,u.height=d,u)},update:function(t){var e=this;n.each(e.slides,function(n,o){e.updateSlide(o,t)})},updateSlide:function(t,e){var o=this,i=t&&t.$content,a=t.width||t.opts.width,s=t.height||t.opts.height,r=t.$slide;o.adjustCaption(t),i&&(a||s||"video"===t.contentType)&&!t.hasError&&(n.fancybox.stop(i),n.fancybox.setTranslate(i,o.getFitPos(t)),t.pos===o.currPos&&(o.isAnimating=!1,o.updateCursor())),o.adjustLayout(t),r.length&&(r.trigger("refresh"),t.pos===o.currPos&&o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar",r.get(0).scrollHeight>r.get(0).clientHeight)),o.trigger("onUpdate",t,e)},centerSlide:function(t){var e=this,o=e.current,i=o.$slide;!e.isClosing&&o&&(i.siblings().css({transform:"",opacity:""}),i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),n.fancybox.animate(i,{top:0,left:0,opacity:1},void 0===t?0:t,function(){i.css({transform:"",opacity:""}),o.isComplete||e.complete()},!1))},isMoved:function(t){var e,o,i=t||this.current;return!!i&&(o=n.fancybox.getTranslate(this.$refs.stage),e=n.fancybox.getTranslate(i.$slide),!i.$slide.hasClass("fancybox-animated")&&(Math.abs(e.top-o.top)>.5||Math.abs(e.left-o.left)>.5))},updateCursor:function(t,e){var o,i,a=this,s=a.current,r=a.$refs.container;s&&!a.isClosing&&a.Guestures&&(r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),o=a.canPan(t,e),i=!!o||a.isZoomable(),r.toggleClass("fancybox-is-zoomable",i),n("[data-fancybox-zoom]").prop("disabled",!i),o?r.addClass("fancybox-can-pan"):i&&("zoom"===s.opts.clickContent||n.isFunction(s.opts.clickContent)&&"zoom"==s.opts.clickContent(s))?r.addClass("fancybox-can-zoomIn"):s.opts.touch&&(s.opts.touch.vertical||a.group.length>1)&&"video"!==s.contentType&&r.addClass("fancybox-can-swipe"))},isZoomable:function(){var t,e=this,n=e.current;if(n&&!e.isClosing&&"image"===n.type&&!n.hasError){if(!n.isLoaded)return!0;if((t=e.getFitPos(n))&&(n.width>t.width||n.height>t.height))return!0}return!1},isScaledDown:function(t,e){var o=this,i=!1,a=o.current,s=a.$content;return void 0!==t&&void 0!==e?i=t<a.width&&e<a.height:s&&(i=n.fancybox.getTranslate(s),i=i.width<a.width&&i.height<a.height),i},canPan:function(t,e){var o=this,i=o.current,a=null,s=!1;return"image"===i.type&&(i.isComplete||t&&e)&&!i.hasError&&(s=o.getFitPos(i),void 0!==t&&void 0!==e?a={width:t,height:e}:i.isComplete&&(a=n.fancybox.getTranslate(i.$content)),a&&s&&(s=Math.abs(a.width-s.width)>1.5||Math.abs(a.height-s.height)>1.5)),s},loadSlide:function(t){var e,o,i,a=this;if(!t.isLoading&&!t.isLoaded){if(t.isLoading=!0,!1===a.trigger("beforeLoad",t))return t.isLoading=!1,!1;switch(e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),e){case"image":a.setImage(t);break;case"iframe":a.setIframe(t);break;case"html":a.setContent(t,t.src||t.content);break;case"video":a.setContent(t,t.opts.video.tpl.replace(/\{\{src\}\}/gi,t.src).replace("{{format}}",t.opts.videoFormat||t.opts.video.format||"").replace("{{poster}}",t.thumb||""));break;case"inline":n(t.src).length?a.setContent(t,n(t.src)):a.setError(t);break;case"ajax":a.showLoading(t),i=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&a.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&a.setError(t)}})),o.one("onReset",function(){i.abort()});break;default:a.setError(t)}return!0}},setImage:function(t){var o,i=this;setTimeout(function(){var e=t.$image;i.isClosing||!t.isLoading||e&&e.length&&e[0].complete||t.hasError||i.showLoading(t)},50),i.checkSrcset(t),t.$content=n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")),!1!==t.opts.preload&&t.opts.width&&t.opts.height&&t.thumb&&(t.width=t.opts.width,t.height=t.opts.height,o=e.createElement("img"),o.onerror=function(){n(this).remove(),t.$ghost=null},o.onload=function(){i.afterLoad(t)},t.$ghost=n(o).addClass("fancybox-image").appendTo(t.$content).attr("src",t.thumb)),i.setBigImage(t)},checkSrcset:function(e){var n,o,i,a,s=e.opts.srcset||e.opts.image.srcset;if(s){i=t.devicePixelRatio||1,a=t.innerWidth*i,o=s.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);if(0===n)return e.url=t;o&&(e.value=o,e.postfix=t[t.length-1])}),e}),o.sort(function(t,e){return t.value-e.value});for(var r=0;r<o.length;r++){var c=o[r];if("w"===c.postfix&&c.value>=a||"x"===c.postfix&&c.value>=i){n=c;break}}!n&&o.length&&(n=o[o.length-1]),n&&(e.src=n.url,e.width&&e.height&&"w"==n.postfix&&(e.height=e.width/e.height*n.value,e.width=n.value),e.opts.srcset=s)}},setBigImage:function(t){var o=this,i=e.createElement("img"),a=n(i);t.$image=a.one("error",function(){o.setError(t)}).one("load",function(){var e;t.$ghost||(o.resolveImageSlideSize(t,this.naturalWidth,this.naturalHeight),o.afterLoad(t)),o.isClosing||(t.opts.srcset&&(e=t.opts.sizes,e&&"auto"!==e||(e=(t.width/t.height>1&&s.width()/s.height()>1?"100":Math.round(t.width/t.height*100))+"vw"),a.attr("sizes",e).attr("srcset",t.opts.srcset)),t.$ghost&&setTimeout(function(){t.$ghost&&!o.isClosing&&t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))),o.hideLoading(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(i.complete||"complete"==i.readyState)&&a.naturalWidth&&a.naturalHeight?a.trigger("load"):i.error&&a.trigger("error")},resolveImageSlideSize:function(t,e,n){var o=parseInt(t.opts.width,10),i=parseInt(t.opts.height,10);t.width=e,t.height=n,o>0&&(t.width=o,t.height=Math.floor(o*n/e)),i>0&&(t.width=Math.floor(i*e/n),t.height=i)},setIframe:function(t){var e,o=this,i=t.opts.iframe,a=t.$slide;t.$content=n('<div class="fancybox-content'+(i.preload?" fancybox-is-hidden":"")+'"></div>').css(i.css).appendTo(a),a.addClass("fancybox-slide--"+t.contentType),t.$iframe=e=n(i.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(i.attr).appendTo(t.$content),i.preload?(o.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),o.afterLoad(t)}),a.on("refresh.fb",function(){var n,o,s=t.$content,r=i.css.width,c=i.css.height;if(1===e[0].isReady){try{n=e.contents(),o=n.find("body")}catch(t){}o&&o.length&&o.children().length&&(a.css("overflow","visible"),s.css({width:"100%","max-width":"100%",height:"9999px"}),void 0===r&&(r=Math.ceil(Math.max(o[0].clientWidth,o.outerWidth(!0)))),s.css("width",r||"").css("max-width",""),void 0===c&&(c=Math.ceil(Math.max(o[0].clientHeight,o.outerHeight(!0)))),s.css("height",c||""),a.css("overflow","auto")),s.removeClass("fancybox-is-hidden")}})):o.afterLoad(t),e.attr("src",t.src),a.one("onReset",function(){try{n(this).find("iframe").hide().unbind().attr("src","//about:blank")}catch(t){}n(this).off("refresh.fb").empty(),t.isLoaded=!1,t.isRevealed=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$content&&n.fancybox.stop(t.$content),t.$slide.empty(),l(e)&&e.parent().length?((e.hasClass("fancybox-content")||e.parent().hasClass("fancybox-content"))&&e.parents(".fancybox-slide").trigger("onReset"),t.$placeholder=n("<div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents()),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){n(this).find("video,audio").trigger("pause"),t.$placeholder&&(t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1,t.isRevealed=!1)}),n(e).appendTo(t.$slide),n(e).is("video,audio")&&(n(e).addClass("fancybox-video"),n(e).wrap("<div></div>"),t.contentType="video",t.opts.width=t.opts.width||n(e).attr("width"),t.opts.height=t.opts.height||n(e).attr("height")),t.$content=t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(),t.$content.siblings().hide(),t.$content.length||(t.$content=t.$slide.wrapInner("<div></div>").children().first()),t.$content.addClass("fancybox-content"),t.$slide.addClass("fancybox-slide--"+t.contentType),o.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.trigger("onReset").removeClass("fancybox-slide--"+t.contentType).addClass("fancybox-slide--error"),t.contentType="html",this.setContent(t,this.translate(t,t.opts.errorTpl)),t.pos===this.currPos&&(this.isAnimating=!1)},showLoading:function(t){var e=this;(t=t||e.current)&&!t.$spinner&&(t.$spinner=n(e.translate(e,e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))},hideLoading:function(t){var e=this;(t=t||e.current)&&t.$spinner&&(t.$spinner.stop().remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),!t.opts.smallBtn||t.$smallBtn&&t.$smallBtn.length||(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content)),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.adjustCaption(t),e.adjustLayout(t),t.pos===e.currPos&&e.updateCursor(),e.revealContent(t))},adjustCaption:function(t){var e,n=this,o=t||n.current,i=o.opts.caption,a=o.opts.preventCaptionOverlap,s=n.$refs.caption,r=!1;s.toggleClass("fancybox-caption--separate",a),a&&i&&i.length&&(o.pos!==n.currPos?(e=s.clone().appendTo(s.parent()),e.children().eq(0).empty().html(i),r=e.outerHeight(!0),e.empty().remove()):n.$caption&&(r=n.$caption.outerHeight(!0)),o.$slide.css("padding-bottom",r||""))},adjustLayout:function(t){var e,n,o,i,a=this,s=t||a.current;s.isLoaded&&!0!==s.opts.disableLayoutFix&&(s.$content.css("margin-bottom",""),s.$content.outerHeight()>s.$slide.height()+.5&&(o=s.$slide[0].style["padding-bottom"],i=s.$slide.css("padding-bottom"),parseFloat(i)>0&&(e=s.$slide[0].scrollHeight,s.$slide.css("padding-bottom",0),Math.abs(e-s.$slide[0].scrollHeight)<1&&(n=i),s.$slide.css("padding-bottom",o))),s.$content.css("margin-bottom",n))},revealContent:function(t){var e,o,i,a,s=this,r=t.$slide,c=!1,l=!1,d=s.isMoved(t),u=t.isRevealed;return t.isRevealed=!0,e=t.opts[s.firstRun?"animationEffect":"transitionEffect"],i=t.opts[s.firstRun?"animationDuration":"transitionDuration"],i=parseInt(void 0===t.forcedDuration?i:t.forcedDuration,10),!d&&t.pos===s.currPos&&i||(e=!1),"zoom"===e&&(t.pos===s.currPos&&i&&"image"===t.type&&!t.hasError&&(l=s.getThumbPos(t))?c=s.getFitPos(t):e="fade"),"zoom"===e?(s.isAnimating=!0,c.scaleX=c.width/l.width,c.scaleY=c.height/l.height,a=t.opts.zoomOpacity,"auto"==a&&(a=Math.abs(t.width/t.height-l.width/l.height)>.1),a&&(l.opacity=.1,c.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),l),p(t.$content),void n.fancybox.animate(t.$content,c,i,function(){s.isAnimating=!1,s.complete()})):(s.updateSlide(t),e?(n.fancybox.stop(r),o="fancybox-slide--"+(t.pos>=s.prevPos?"next":"previous")+" fancybox-animated fancybox-fx-"+e,r.addClass(o).removeClass("fancybox-slide--current"),t.$content.removeClass("fancybox-is-hidden"),p(r),"image"!==t.type&&t.$content.hide().show(0),void n.fancybox.animate(r,"fancybox-slide--current",i,function(){r.removeClass(o).css({transform:"",opacity:""}),t.pos===s.currPos&&s.complete()},!0)):(t.$content.removeClass("fancybox-is-hidden"),u||!d||"image"!==t.type||t.hasError||t.$content.hide().fadeIn("fast"),void(t.pos===s.currPos&&s.complete())))},getThumbPos:function(t){var e,o,i,a,s,r=!1,c=t.$thumb;return!(!c||!g(c[0]))&&(e=n.fancybox.getTranslate(c),o=parseFloat(c.css("border-top-width")||0),i=parseFloat(c.css("border-right-width")||0),a=parseFloat(c.css("border-bottom-width")||0),s=parseFloat(c.css("border-left-width")||0),r={top:e.top+o,left:e.left+s,width:e.width-i-s,height:e.height-o-a,scaleX:1,scaleY:1},e.width>0&&e.height>0&&r)},complete:function(){var t,e=this,o=e.current,i={};!e.isMoved()&&o.isLoaded&&(o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),e.preload("inline"),p(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(e.slides,function(t,o){o.pos>=e.currPos-1&&o.pos<=e.currPos+1?i[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),e.slides=i),e.isAnimating=!1,e.updateCursor(),e.trigger("afterShow"),o.opts.video.autoStart&&o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended",function(){Document.exitFullscreen?Document.exitFullscreen():this.webkitExitFullscreen&&this.webkitExitFullscreen(),e.next()}),o.opts.autoFocus&&"html"===o.contentType&&(t=o.$content.find("input[autofocus]:enabled:visible:first"),t.length?t.trigger("focus"):e.focus(null,!0)),o.$slide.scrollTop(0).scrollLeft(0))},preload:function(t){var e,n,o=this;o.group.length<2||(n=o.slides[o.currPos+1],e=o.slides[o.currPos-1],e&&e.type===t&&o.loadSlide(e),n&&n.type===t&&o.loadSlide(n))},focus:function(t,o){var i,a,s=this,r=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","video","audio","[contenteditable]",'[tabindex]:not([tabindex^="-"])'].join(",");s.isClosing||(i=!t&&s.current&&s.current.isComplete?s.current.$slide.find("*:visible"+(o?":not(.fancybox-close-small)":"")):s.$refs.container.find("*:visible"),i=i.filter(r).filter(function(){return"hidden"!==n(this).css("visibility")&&!n(this).hasClass("disabled")}),i.length?(a=i.index(e.activeElement),t&&t.shiftKey?(a<0||0==a)&&(t.preventDefault(),i.eq(i.length-1).trigger("focus")):(a<0||a==i.length-1)&&(t&&t.preventDefault(),i.eq(0).trigger("focus"))):s.$refs.container.trigger("focus"))},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,i,a,s,r,c,l,u=this,f=u.current,h=function(){u.cleanUp(t)};return!u.isClosing&&(u.isClosing=!0,!1===u.trigger("beforeClose",t)?(u.isClosing=!1,d(function(){u.update()}),!1):(u.removeEvents(),a=f.$content,o=f.opts.animationEffect,i=n.isNumeric(e)?e:o?f.opts.animationDuration:0,f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),!0!==t?n.fancybox.stop(f.$slide):o=!1,f.$slide.siblings().trigger("onReset").remove(),i&&u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration",i+"ms"),u.hideLoading(f),u.hideControls(!0),u.updateCursor(),"zoom"!==o||a&&i&&"image"===f.type&&!u.isMoved()&&!f.hasError&&(l=u.getThumbPos(f))||(o="fade"),"zoom"===o?(n.fancybox.stop(a),s=n.fancybox.getTranslate(a),c={top:s.top,left:s.left,scaleX:s.width/l.width,scaleY:s.height/l.height,width:l.width,height:l.height},r=f.opts.zoomOpacity,
"auto"==r&&(r=Math.abs(f.width/f.height-l.width/l.height)>.1),r&&(l.opacity=0),n.fancybox.setTranslate(a,c),p(a),n.fancybox.animate(a,l,i,h),!0):(o&&i?n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),"fancybox-animated fancybox-fx-"+o,i,h):!0===t?setTimeout(h,i):h(),!0)))},cleanUp:function(e){var o,i,a,s=this,r=s.current.opts.$orig;s.current.$slide.trigger("onReset"),s.$refs.container.empty().remove(),s.trigger("afterClose",e),s.current.opts.backFocus&&(r&&r.length&&r.is(":visible")||(r=s.$trigger),r&&r.length&&(i=t.scrollX,a=t.scrollY,r.trigger("focus"),n("html, body").scrollTop(a).scrollLeft(i))),s.current=null,o=n.fancybox.getInstance(),o?o.activate():(n("body").removeClass("fancybox-active compensate-for-scrollbar"),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,i=Array.prototype.slice.call(arguments,1),a=this,s=e&&e.opts?e:a.current;if(s?i.unshift(s):s=a,i.unshift(a),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,i)),!1===o)return o;"afterClose"!==t&&a.$refs?a.$refs.container.trigger(t+".fb",i):r.trigger(t+".fb",i)},updateControls:function(){var t=this,o=t.current,i=o.index,a=t.$refs.container,s=t.$refs.caption,r=o.opts.caption;o.$slide.trigger("refresh"),r&&r.length?(t.$caption=s,s.children().eq(0).html(r)):t.$caption=null,t.hasHiddenControls||t.isIdle||t.showControls(),a.find("[data-fancybox-count]").html(t.group.length),a.find("[data-fancybox-index]").html(i+1),a.find("[data-fancybox-prev]").prop("disabled",!o.opts.loop&&i<=0),a.find("[data-fancybox-next]").prop("disabled",!o.opts.loop&&i>=t.group.length-1),"image"===o.type?a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href",o.opts.image.src||o.src).show():o.opts.toolbar&&a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),n(e.activeElement).is(":hidden,[disabled]")&&t.$refs.container.trigger("focus")},hideControls:function(t){var e=this,n=["infobar","toolbar","nav"];!t&&e.current.opts.preventCaptionOverlap||n.push("caption"),this.$refs.container.removeClass(n.map(function(t){return"fancybox-show-"+t}).join(" ")),this.hasHiddenControls=!0},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.hasHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-caption",!!t.$caption).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal)},toggleControls:function(){this.hasHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.5.7",defaults:a,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof b&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new b(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),!0===t&&this.close(t))},destroy:function(){this.close(!0),r.add("body").off("click.fb-start","**")},isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n)&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;return!(!t||!t.length)&&(e=t[0].getBoundingClientRect(),{top:e.top||0,left:e.left||0,width:e.width,height:e.height,opacity:parseFloat(t.css("opacity"))})},setTranslate:function(t,e){var n="",o={};if(t&&e)return void 0===e.left&&void 0===e.top||(n=(void 0===e.left?t.position().left:e.left)+"px, "+(void 0===e.top?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),void 0!==e.scaleX&&void 0!==e.scaleY?n+=" scale("+e.scaleX+", "+e.scaleY+")":void 0!==e.scaleX&&(n+=" scaleX("+e.scaleX+")"),n.length&&(o.transform=n),void 0!==e.opacity&&(o.opacity=e.opacity),void 0!==e.width&&(o.width=e.width),void 0!==e.height&&(o.height=e.height),t.css(o)},animate:function(t,e,o,i,a){var s,r=this;n.isFunction(o)&&(i=o,o=null),r.stop(t),s=r.getTranslate(t),t.on(f,function(c){(!c||!c.originalEvent||t.is(c.originalEvent.target)&&"z-index"!=c.originalEvent.propertyName)&&(r.stop(t),n.isNumeric(o)&&t.css("transition-duration",""),n.isPlainObject(e)?void 0!==e.scaleX&&void 0!==e.scaleY&&r.setTranslate(t,{top:e.top,left:e.left,width:s.width*e.scaleX,height:s.height*e.scaleY,scaleX:1,scaleY:1}):!0!==a&&t.removeClass(e),n.isFunction(i)&&i(c))}),n.isNumeric(o)&&t.css("transition-duration",o+"ms"),n.isPlainObject(e)?(void 0!==e.scaleX&&void 0!==e.scaleY&&(delete e.width,delete e.height,t.parent().hasClass("fancybox-slide--image")&&t.parent().addClass("fancybox-is-scaling")),n.fancybox.setTranslate(t,e)):t.addClass(e),t.data("timer",setTimeout(function(){t.trigger(f)},o+33))},stop:function(t,e){t&&t.length&&(clearTimeout(t.data("timer")),e&&t.trigger(f),t.off(f).css("transition-duration",""),t.parent().removeClass("fancybox-is-scaling"))}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},i):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},i),this},r.on("click.fb-start","[data-fancybox]",i),r.on("click.fb-start","[data-fancybox-trigger]",function(t){n('[data-fancybox="'+n(this).attr("data-fancybox-trigger")+'"]').eq(n(this).attr("data-fancybox-index")||0).trigger("click.fb-start",{$trigger:n(this)})}),function(){var t=null;r.on("mousedown mouseup focus blur",".fancybox-button",function(e){switch(e.type){case"mousedown":t=n(this);break;case"mouseup":t=null;break;case"focusin":n(".fancybox-button").removeClass("fancybox-focus"),n(this).is(t)||n(this).is("[disabled]")||n(this).addClass("fancybox-focus");break;case"focusout":n(".fancybox-button").removeClass("fancybox-focus")}})}()}}(window,document,jQuery),function(t){"use strict";var e={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"https://www.youtube-nocookie.com/embed/$4",thumb:"https://img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12]+"").replace(/\?/,"&")+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}},n=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e};t(document).on("objectNeedsType.fb",function(o,i,a){var s,r,c,l,d,u,f,p=a.src||"",h=!1;s=t.extend(!0,{},e,a.opts.media),t.each(s,function(e,o){if(c=p.match(o.matcher)){if(h=o.type,f=e,u={},o.paramPlace&&c[o.paramPlace]){d=c[o.paramPlace],"?"==d[0]&&(d=d.substring(1)),d=d.split("&");for(var i=0;i<d.length;++i){var s=d[i].split("=",2);2==s.length&&(u[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,a.opts[e],u),p="function"===t.type(o.url)?o.url.call(this,c,l,a):n(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,a):n(o.thumb,c),"youtube"===e?p=p.replace(/&t=((\d+)m)?(\d+)s/,function(t,e,n,o){return"&start="+((n?60*parseInt(n,10):0)+parseInt(o,10))}):"vimeo"===e&&(p=p.replace("&%23","#")),!1}}),h?(a.opts.thumb||a.opts.$thumb&&a.opts.$thumb.length||(a.opts.thumb=r),"iframe"===h&&(a.opts=t.extend(!0,a.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}})),t.extend(a,{type:h,src:p,origSrc:a.src,contentSource:f,contentType:"image"===h?"image":"gmap_place"==f||"gmap_search"==f?"map":"video"})):p&&(a.type=a.opts.defaultType)});var o={youtube:{src:"https://www.youtube.com/iframe_api",class:"YT",loading:!1,loaded:!1},vimeo:{src:"https://player.vimeo.com/api/player.js",class:"Vimeo",loading:!1,loaded:!1},load:function(t){var e,n=this;if(this[t].loaded)return void setTimeout(function(){n.done(t)});this[t].loading||(this[t].loading=!0,e=document.createElement("script"),e.type="text/javascript",e.src=this[t].src,"youtube"===t?window.onYouTubeIframeAPIReady=function(){n[t].loaded=!0,n.done(t)}:e.onload=function(){n[t].loaded=!0,n.done(t)},document.body.appendChild(e))},done:function(e){var n,o,i;"youtube"===e&&delete window.onYouTubeIframeAPIReady,(n=t.fancybox.getInstance())&&(o=n.current.$content.find("iframe"),"youtube"===e&&void 0!==YT&&YT?i=new YT.Player(o.attr("id"),{events:{onStateChange:function(t){0==t.data&&n.next()}}}):"vimeo"===e&&void 0!==Vimeo&&Vimeo&&(i=new Vimeo.Player(o),i.on("ended",function(){n.next()})))}};t(document).on({"afterShow.fb":function(t,e,n){e.group.length>1&&("youtube"===n.contentSource||"vimeo"===n.contentSource)&&o.load(n.contentSource)}})}(jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),a=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,i=o.length;e<i;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],i=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,a=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return i||a},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},d=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};d.prototype.destroy=function(){var t=this;t.$container.off(".fb.touch"),n(e).off(".fb.touch"),t.requestId&&(i(t.requestId),t.requestId=null),t.tapped&&(clearTimeout(t.tapped),t.tapped=null)},d.prototype.ontouchstart=function(o){var i=this,c=n(o.target),d=i.instance,u=d.current,f=u.$slide,p=u.$content,h="touchstart"==o.type;if(h&&i.$container.off("mousedown.fb.touch"),(!o.originalEvent||2!=o.originalEvent.button)&&f.length&&c.length&&!r(c)&&!r(c.parent())&&(c.is("img")||!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left))){if(!u||d.isAnimating||u.$slide.hasClass("fancybox-animated"))return o.stopPropagation(),void o.preventDefault();i.realPoints=i.startPoints=a(o),i.startPoints.length&&(u.touch&&o.stopPropagation(),i.startEvent=o,i.canTap=!0,i.$target=c,i.$content=p,i.opts=u.opts.touch,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.isScrolling=!1,i.canPan=d.canPan(),i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.canvasWidth=Math.round(f[0].clientWidth),i.canvasHeight=Math.round(f[0].clientHeight),i.contentLastPos=null,i.contentStartPos=n.fancybox.getTranslate(i.$content)||{top:0,left:0},i.sliderStartPos=n.fancybox.getTranslate(f),i.stagePos=n.fancybox.getTranslate(d.$refs.stage),i.sliderStartPos.top-=i.stagePos.top,i.sliderStartPos.left-=i.stagePos.left,i.contentStartPos.top-=i.stagePos.top,i.contentStartPos.left-=i.stagePos.left,n(e).off(".fb.touch").on(h?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(i,"ontouchend")).on(h?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(i,"ontouchmove")),n.fancybox.isMobile&&e.addEventListener("scroll",i.onscroll,!0),((i.opts||i.canPan)&&(c.is(i.$stage)||i.$stage.find(c).length)||(c.is(".fancybox-image")&&o.preventDefault(),n.fancybox.isMobile&&c.parents(".fancybox-caption").length))&&(i.isScrollable=l(c)||l(c.parent()),n.fancybox.isMobile&&i.isScrollable||o.preventDefault(),(1===i.startPoints.length||u.hasError)&&(i.canPan?(n.fancybox.stop(i.$content),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-is-grabbing")),2===i.startPoints.length&&"image"===u.type&&(u.isLoaded||u.$ghost)&&(i.canTap=!1,i.isSwiping=!1,i.isPanning=!1,i.isZooming=!0,n.fancybox.stop(i.$content),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-n(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-n(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=s(i.startPoints[0],i.startPoints[1]))))}},d.prototype.onscroll=function(t){var n=this;n.isScrolling=!0,e.removeEventListener("scroll",n.onscroll,!0)},d.prototype.ontouchmove=function(t){var e=this;return void 0!==t.originalEvent.buttons&&0===t.originalEvent.buttons?void e.ontouchend(t):e.isScrolling?void(e.canTap=!1):(e.newPoints=a(t),void((e.opts||e.canPan)&&e.newPoints.length&&e.newPoints.length&&(e.isSwiping&&!0===e.isSwiping||t.preventDefault(),e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0&&(e.isSwiping?e.onSwipe(t):e.isPanning?e.onPan():e.isZooming&&e.onZoom()))))},d.prototype.onSwipe=function(e){var a,s=this,r=s.instance,c=s.isSwiping,l=s.sliderStartPos.left||0;if(!0!==c)"x"==c&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?l+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?l-=Math.pow(-s.distanceX,.8):l+=s.distanceX),s.sliderLastPos={top:"x"==c?0:s.sliderStartPos.top+s.distanceY,left:l},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(n.each(s.instance.slides,function(t,e){var o=e.pos-s.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*e.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))});else if(Math.abs(s.distance)>10){if(s.canTap=!1,r.group.length<2&&s.opts.vertical?s.isSwiping="y":r.isDragging||!1===s.opts.vertical||"auto"===s.opts.vertical&&n(t).width()>800?s.isSwiping="x":(a=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=a>45&&a<135?"y":"x"),"y"===s.isSwiping&&n.fancybox.isMobile&&s.isScrollable)return void(s.isScrolling=!0);r.isDragging=s.isSwiping,s.startPoints=s.newPoints,n.each(r.slides,function(t,e){var o,i;n.fancybox.stop(e.$slide),o=n.fancybox.getTranslate(e.$slide),i=n.fancybox.getTranslate(r.$refs.stage),e.$slide.css({transform:"",opacity:"","transition-duration":""}).removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")}),e.pos===r.current.pos&&(s.sliderStartPos.top=o.top-i.top,s.sliderStartPos.left=o.left-i.left),n.fancybox.setTranslate(e.$slide,{top:o.top-i.top,left:o.left-i.left})}),r.SlideShow&&r.SlideShow.isActive&&r.SlideShow.stop()}},d.prototype.onPan=function(){var t=this;if(s(t.newPoints[0],t.realPoints[0])<(n.fancybox.isMobile?10:5))return void(t.startPoints=t.newPoints);t.canTap=!1,t.contentLastPos=t.limitMovement(),t.requestId&&i(t.requestId),t.requestId=o(function(){n.fancybox.setTranslate(t.$content,t.contentLastPos)})},d.prototype.limitMovement=function(){var t,e,n,o,i,a,s=this,r=s.canvasWidth,c=s.canvasHeight,l=s.distanceX,d=s.distanceY,u=s.contentStartPos,f=u.left,p=u.top,h=u.width,g=u.height;return i=h>r?f+l:f,a=p+d,t=Math.max(0,.5*r-.5*h),e=Math.max(0,.5*c-.5*g),n=Math.min(r-h,.5*r-.5*h),o=Math.min(c-g,.5*c-.5*g),l>0&&i>t&&(i=t-1+Math.pow(-t+f+l,.8)||0),l<0&&i<n&&(i=n+1-Math.pow(n-f-l,.8)||0),d>0&&a>e&&(a=e-1+Math.pow(-e+p+d,.8)||0),d<0&&a<o&&(a=o+1-Math.pow(o-p-d,.8)||0),{top:a,left:i}},d.prototype.limitPosition=function(t,e,n,o){var i=this,a=i.canvasWidth,s=i.canvasHeight;return n>a?(t=t>0?0:t,t=t<a-n?a-n:t):t=Math.max(0,a/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},d.prototype.onZoom=function(){var e=this,a=e.contentStartPos,r=a.width,c=a.height,l=a.left,d=a.top,u=s(e.newPoints[0],e.newPoints[1]),f=u/e.startDistanceBetweenFingers,p=Math.floor(r*f),h=Math.floor(c*f),g=(r-p)*e.percentageOfImageAtPinchPointX,b=(c-h)*e.percentageOfImageAtPinchPointY,m=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),v=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),y=m-e.centerPointStartX,x=v-e.centerPointStartY,w=l+(g+y),$=d+(b+x),S={top:$,left:w,scaleX:f,scaleY:f};e.canTap=!1,e.newWidth=p,e.newHeight=h,e.contentLastPos=S,e.requestId&&i(e.requestId),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},d.prototype.ontouchend=function(t){var o=this,s=o.isSwiping,r=o.isPanning,c=o.isZooming,l=o.isScrolling;if(o.endPoints=a(t),o.dMs=Math.max((new Date).getTime()-o.startTime,1),o.$container.removeClass("fancybox-is-grabbing"),n(e).off(".fb.touch"),e.removeEventListener("scroll",o.onscroll,!0),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.isScrolling=!1,o.instance.isDragging=!1,o.canTap)return o.onTap(t);o.speed=100,o.velocityX=o.distanceX/o.dMs*.5,o.velocityY=o.distanceY/o.dMs*.5,r?o.endPanning():c?o.endZooming():o.endSwiping(s,l)},d.prototype.endSwiping=function(t,e){var o=this,i=!1,a=o.instance.group.length,s=Math.abs(o.distanceX),r="x"==t&&a>1&&(o.dMs>130&&s>10||s>50);o.sliderLastPos=null,"y"==t&&!e&&Math.abs(o.distanceY)>50?(n.fancybox.animate(o.instance.current.$slide,{top:o.sliderStartPos.top+o.distanceY+150*o.velocityY,opacity:0},200),i=o.instance.close(!0,250)):r&&o.distanceX>0?i=o.instance.previous(300):r&&o.distanceX<0&&(i=o.instance.next(300)),!1!==i||"x"!=t&&"y"!=t||o.instance.centerSlide(200),o.$container.removeClass("fancybox-is-sliding")},d.prototype.endPanning=function(){var t,e,o,i=this;i.contentLastPos&&(!1===i.opts.momentum||i.dMs>350?(t=i.contentLastPos.left,e=i.contentLastPos.top):(t=i.contentLastPos.left+500*i.velocityX,e=i.contentLastPos.top+500*i.velocityY),o=i.limitPosition(t,e,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,n.fancybox.animate(i.$content,o,366))},d.prototype.endZooming=function(){var t,e,o,i,a=this,s=a.instance.current,r=a.newWidth,c=a.newHeight;a.contentLastPos&&(t=a.contentLastPos.left,e=a.contentLastPos.top,i={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(a.$content,i),r<a.canvasWidth&&c<a.canvasHeight?a.instance.scaleToFit(150):r>s.width||c>s.height?a.instance.scaleToActual(a.centerPointStartX,a.centerPointStartY,150):(o=a.limitPosition(t,e,r,c),n.fancybox.animate(a.$content,o,150)))},d.prototype.onTap=function(e){var o,i=this,s=n(e.target),r=i.instance,c=r.current,l=e&&a(e)||i.startPoints,d=l[0]?l[0].x-n(t).scrollLeft()-i.stagePos.left:0,u=l[0]?l[0].y-n(t).scrollTop()-i.stagePos.top:0,f=function(t){var o=c.opts[t];if(n.isFunction(o)&&(o=o.apply(r,[c,e])),o)switch(o){case"close":r.close(i.startEvent);break;case"toggleControls":r.toggleControls();break;case"next":r.next();break;case"nextOrClose":r.group.length>1?r.next():r.close(i.startEvent);break;case"zoom":"image"==c.type&&(c.isLoaded||c.$ghost)&&(r.canPan()?r.scaleToFit():r.isScaledDown()?r.scaleToActual(d,u):r.group.length<2&&r.close(i.startEvent))}};if((!e.originalEvent||2!=e.originalEvent.button)&&(s.is("img")||!(d>s[0].clientWidth+s.offset().left))){if(s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))o="Outside";else if(s.is(".fancybox-slide"))o="Slide";else{if(!r.current.$content||!r.current.$content.find(s).addBack().filter(s).length)return;o="Content"}if(i.tapped){if(clearTimeout(i.tapped),i.tapped=null,Math.abs(d-i.tapX)>50||Math.abs(u-i.tapY)>50)return this;f("dblclick"+o)}else i.tapX=d,i.tapY=u,c.opts["dblclick"+o]&&c.opts["dblclick"+o]!==c.opts["click"+o]?i.tapped=setTimeout(function(){i.tapped=null,r.isAnimating||f("click"+o)},500):f("click"+o);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new d(e))}).on("beforeClose.fb",function(t,e){e&&e.Guestures&&e.Guestures.destroy()})}(window,document,jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},slideShow:{autoStart:!1,speed:3e3,progress:!0}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this,n=t.instance,o=n.group[n.currIndex].opts.slideShow;t.$button=n.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),n.group.length<2||!o?t.$button.hide():o.progress&&(t.$progress=e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))},set:function(t){var n=this,o=n.instance,i=o.current;i&&(!0===t||i.opts.loop||o.currIndex<o.group.length-1)?n.isActive&&"video"!==i.contentType&&(n.$progress&&e.fancybox.animate(n.$progress.show(),{scaleX:1},i.opts.slideShow.speed),n.timer=setTimeout(function(){o.current.opts.loop||o.current.index!=o.group.length-1?o.next():o.jumpTo(0)},i.opts.slideShow.speed)):(n.stop(),o.idleSecondsCounter=0,o.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null,t.$progress&&t.$progress.removeAttr("style").hide()},start:function(){var t=this,e=t.instance.current;e&&(t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.isActive=!0,e.isComplete&&t.set(!0),t.instance.trigger("onSlideShowChange",!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1,t.instance.trigger("onSlideShowChange",!1),t.$progress&&t.$progress.removeAttr("style").hide()},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var i=e&&e.SlideShow;o?i&&n.opts.slideShow.autoStart&&i.start():i&&i.isActive&&i.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,i,a,s){var r=o&&o.SlideShow;!r||!i.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(a.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,jQuery),function(t,e){"use strict";var n=function(){for(var e=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n={},o=0;o<e.length;o++){var i=e[o];if(i&&i[1]in t){for(var a=0;a<i.length;a++)n[e[0][a]]=i[a];return n}}return!1}();if(n){var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.isAnimating=!1,n.update(!0,!0,0),n.isComplete||n.complete()),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t),n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter",!t).toggleClass("fancybox-button--fsexit",t))})}e(t).on({"onInit.fb":function(t,e){var i;if(!n)return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();e&&e.group[e.currIndex].opts.fullScreen?(i=e.$refs.container,i.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle()}),e.opts.fullScreen&&!0===e.opts.fullScreen.autoStart&&o.request(),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,i){e&&e.FullScreen&&70===i&&(o.preventDefault(),e.FullScreen.toggle())},"beforeClose.fb":function(t,e){e&&e.FullScreen&&e.$refs.container.hasClass("fancybox-is-fullscreen")&&o.exit()}})}(document,jQuery),function(t,e){"use strict";var n="fancybox-thumbs";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var o=function(t){this.init(t)};e.extend(o.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e=this,n=t.group,o=0;e.instance=t,e.opts=n[t.currIndex].opts.thumbs,t.Thumbs=e,e.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]");for(var i=0,a=n.length;i<a&&(n[i].thumb&&o++,!(o>1));i++);o>1&&e.opts?(e.$button.removeAttr("style").on("click",function(){e.toggle()}),e.isActive=!0):e.$button.hide()},create:function(){var t,o=this,i=o.instance,a=o.opts.parentEl,s=[];o.$grid||(o.$grid=e('<div class="'+n+" "+n+"-"+o.opts.axis+'"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)),o.$grid.on("click","a",function(){i.jumpTo(e(this).attr("data-index"))})),o.$list||(o.$list=e('<div class="'+n+'__list">').appendTo(o.$grid)),e.each(i.group,function(e,n){t=n.thumb,t||"image"!==n.type||(t=n.src),s.push('<a href="javascript:;" tabindex="0" data-index="'+e+'"'+(t&&t.length?' style="background-image:url('+t+')"':'class="fancybox-thumbs-missing"')+"></a>")}),o.$list[0].innerHTML=s.join(""),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"),10)+i.group.length*o.$list.children().eq(0).outerWidth(!0))},focus:function(t){var e,n,o=this,i=o.$list,a=o.$grid;o.instance.current&&(e=i.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+o.instance.current.index+'"]').addClass("fancybox-thumbs-active"),n=e.position(),"y"===o.opts.axis&&(n.top<0||n.top>i.height()-e.outerHeight())?i.stop().animate({scrollTop:i.scrollTop()+n.top},t):"x"===o.opts.axis&&(n.left<a.scrollLeft()||n.left>a.scrollLeft()+(a.width()-e.outerWidth()))&&i.parent().stop().animate({scrollLeft:n.left},t))},update:function(){var t=this;t.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),t.isVisible?(t.$grid||t.create(),t.instance.trigger("onThumbsShow"),t.focus(0)):t.$grid&&t.instance.trigger("onThumbsHide"),t.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var n;e&&!e.Thumbs&&(n=new o(e),n.isActive&&!0===n.opts.autoStart&&n.show())},"beforeShow.fb":function(t,e,n,o){var i=e&&e.Thumbs;i&&i.isVisible&&i.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,i){var a=e&&e.Thumbs;a&&a.isActive&&71===i&&(o.preventDefault(),a.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&!1!==n.opts.hideOnClose&&n.$grid.hide()}})}(document,jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},share:{url:function(t,e){return!t.currentHash&&"inline"!==e.type&&"html"!==e.type&&(e.origSrc||e.src)||window.location},
tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,i=e.fancybox.getInstance(),a=i.current||null;a&&("function"===e.type(a.opts.share.url)&&(t=a.opts.share.url.apply(a,[i,a])),o=a.opts.share.tpl.replace(/\{\{media\}\}/g,"image"===a.type?encodeURIComponent(a.src):"").replace(/\{\{url\}\}/g,encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,i.$caption?encodeURIComponent(i.$caption.text()):""),e.fancybox.open({src:i.translate(i,o),type:"html",opts:{touch:!1,animationEffect:!1,afterLoad:function(t,e){i.$refs.container.one("beforeClose.fb",function(){t.close(null,0)}),e.$content.find(".fancybox-share__button").click(function(){return window.open(this.href,"Share","width=550, height=450"),!1})},mobile:{autoFocus:!1}}}))})}(document,jQuery),function(t,e,n){"use strict";function o(){var e=t.location.hash.substr(1),n=e.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,i=n.join("-");return{hash:e,index:o<1?1:o,gallery:i}}function i(t){""!==t.gallery&&n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1).focus().trigger("click.fb-start")}function a(t){var e,n;return!!t&&(e=t.current?t.current.opts:t.opts,""!==(n=e.hash||(e.$orig?e.$orig.data("fancybox")||e.$orig.data("fancybox-trigger"):""))&&n)}n.escapeSelector||(n.escapeSelector=function(t){return(t+"").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t})}),n(function(){!1!==n.fancybox.defaults.hash&&(n(e).on({"onInit.fb":function(t,e){var n,i;!1!==e.group[e.currIndex].opts.hash&&(n=o(),(i=a(e))&&n.gallery&&i==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,i,s){var r;i&&!1!==i.opts.hash&&(r=a(o))&&(o.currentHash=r+(o.group.length>1?"-"+(i.index+1):""),t.location.hash!=="#"+o.currentHash&&(s&&!o.origHash&&(o.origHash=t.location.hash),o.hashTimer&&clearTimeout(o.hashTimer),o.hashTimer=setTimeout(function(){"replaceState"in t.history?(t.history[s?"pushState":"replaceState"]({},e.title,t.location.pathname+t.location.search+"#"+o.currentHash),s&&(o.hasCreatedHistory=!0)):t.location.hash=o.currentHash,o.hashTimer=null},300)))},"beforeClose.fb":function(n,o,i){i&&!1!==i.opts.hash&&(clearTimeout(o.hashTimer),o.currentHash&&o.hasCreatedHistory?t.history.back():o.currentHash&&("replaceState"in t.history?t.history.replaceState({},e.title,t.location.pathname+t.location.search+(o.origHash||"")):t.location.hash=o.origHash),o.currentHash=null)}}),n(t).on("hashchange.fb",function(){var t=o(),e=null;n.each(n(".fancybox-container").get().reverse(),function(t,o){var i=n(o).data("FancyBox");if(i&&i.currentHash)return e=i,!1}),e?e.currentHash===t.gallery+"-"+t.index||1===t.index&&e.currentHash==t.gallery||(e.currentHash=null,e.close()):""!==t.gallery&&i(t)}),setTimeout(function(){n.fancybox.getInstance()||i(o())},50))})}(window,document,jQuery),function(t,e){"use strict";var n=(new Date).getTime();e(t).on({"onInit.fb":function(t,e,o){e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(t){var o=e.current,i=(new Date).getTime();e.group.length<2||!1===o.opts.wheel||"auto"===o.opts.wheel&&"image"!==o.type||(t.preventDefault(),t.stopPropagation(),o.$slide.hasClass("fancybox-animated")||(t=t.originalEvent||t,i-n<250||(n=i,e[(-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)<0?"next":"previous"]())))})}})}(document,jQuery);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:68:"/local/templates/psk2024/js/jquery.maskedinput.min.js?14848398654805";s:6:"source";s:53:"/local/templates/psk2024/js/jquery.maskedinput.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.0
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(a.length<o.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a)},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});


    $(document).ready(function(){
	    $("#data").mask("99/99/9999");
	    $("#telefone").mask("(99) 9999-9999");
	    $("#cpf").mask("999.999.999-99");
	    $("#cep").mask("99999-999");

	    $('#celular').focusout(function(){
		    var phone, element;
		    element = $(this);
		    element.unmask();
		    phone = element.val().replace(/\D/g, '');
		    if(phone.length > 10) {
		        element.mask("(99) 99999-999?9");
		    } else {
		        element.mask("(99) 9999-9999?9");
		    }
		}).trigger('focusout');



	});



/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/local/templates/psk2024/js/custom.js?175224151661304";s:6:"source";s:37:"/local/templates/psk2024/js/custom.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var selectedItemsId = [];
top.$('.psk-header__map-btn').click(function(){
    top.$('.psk-header__map-view.geo-check').css('display','none');
});

top.$('#check-done').click(function(){
    top.$('.psk-header__map-view.geo-check').css('display','none');
    document.cookie = "BITRIX_SM_CITY_CHECK=Y; path=/; max-age=604800";
});
top.$('#check-select').click(function(){
    top.$('.psk-header__map-view.geo-check').css('display','none');
    top.$('.psk-header__map-btn').click();
});

// var set_prson_type = false;
// top.$('#payment_link').click(function(){
//     copyOrderPayLink()
// });
// function copyOrderPayLink() {
//     /* Get the text field */
//     var copyText = document.getElementById("payment_link");
//
//     /* Select the text field */
//     copyText.select();
//
//     /* Copy the text inside the text field */
//     document.execCommand("copy");
//
//     /* Alert the copied text */
//     alert("Ссылка: " + copyText.value + " скопирована в буфер оюмена");
// }
top.$(document).ready(function () {

    const input = document.querySelector('.header-search__input');
    const btn_close = document.querySelector('.header-search__clear');

    input.addEventListener('input', function() {
        const text = this.value;
        const font = window.getComputedStyle(this).getPropertyValue('font');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = font;
        const width = ctx.measureText(text).width + 45;
        btn_close.style.left = width + 'px';
       /*  console.log('Width of text:', width); */
    });

    top.$(".modal").fancybox({
        touch: false,
        // afterShow: function() {},
        buttons: ["close"],
        baseClass: "modal_frame",
        autoFocus: false,
        afterLoad: function afterLoad() {
            // if(top.$(this))
            // alert(top.$(this).attr('data-id'));
            // viewDetailProduct(id);
            if (top.$(top.$(this)[0].src).hasClass('scroll_block_inside')) {
                modalCartBlocksHeight(top.$(this)[0].src);
            }

            // if (top.$(this)[0].src.charAt(0) == '#') {
            //     top.$(top.$(this)[0].src).find('.slick-slider').slick('setPosition');
            // }
        }
    }); // let modalCartBlocks = top.$('.side_scroll_block');

    function modalCartBlocksHeight(id) {
        var th = top.$(id).find('.side_scroll_block'),
            prnt = th.closest('.side_modal'),
            hdr = prnt.find('.side_modal_heading').outerHeight(true),
            bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
            staticOffset = 60,
            neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
        th.css('height', neededHeight);
    }
    var currentTitle = '';
    top.$('a[href*="#logos"]').on('click', function(e) {
        // e.preventDefault();
        if(top.$(this).attr('data-title')){
            currentTitle = top.$(this).attr('data-title');
        }else {
            currentTitle = top.$(this).text() + ' ' + top.$(this).closest('.logos-item__btns').siblings('.logos-item__title').text();
        }
    }).fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
        beforeShow: function(instance, slide) {
            top.$('#logos .modal_title').text(currentTitle);
            top.$('#logos input[name="form_hidden_79"]').val(currentTitle);
        }
    });

    top.$('a[href*="#is_soon"]').on('click', function (e) {      
      if (top.$(this).attr('data-title')) {
        currentTitle = top.$(this).attr('data-title');
      } else {
        currentTitle = top.$(this).text() + ' ' + top.$(this).closest('.is_soon-item__btns').siblings('.is_soon-item__title').text();
      }
    }).fancybox({
      touch: false,
      buttons: ["close"],
      baseClass: "modal_frame",
      beforeShow: function (instance, slide) {
        top.$('#is_soon .modal_title').text(currentTitle);

      }
    });

    var currName = '';
    top.$('a[href*="#vakansii"]').on('click', function(e) {
        // e.preventDefault();

        if(top.$(this).attr('data-name')){
            currName = top.$(this).attr('data-name');
            currentTitle = "ДЛЯ ОТДЕЛА КАДРОВ!!! Интересует вакансия: " + top.$(this).attr('data-name');
        }
    }).fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
        beforeShow: function(instance, slide) {
            top.$('#vakansii .modal_title').text("Запрос в отдел кадров по вакансии " + currName);
            top.$('#vakansii input[name="form_hidden_79"]').val(currentTitle);
        }
    });

    top.$(".modal_close").click(function (event) {
        $.fancybox.close();
    });
    top.$('a[href*="#callback"]').fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
    });
    top.$('a[href*="#write_shief"]').fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
    });
    top.$('a[href*="#promo"]').fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
    });
    top.$('a[href*="#delivery"]').fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
    });
    top.$('a[href*="#strike"]').fancybox({
      touch: false,
      buttons: ["close"],
      baseClass: "modal_frame",
    });
    // top.$('a[href*="#b2b_video"]').fancybox({
    //     touch: false,
    //     buttons: ["close"],
    //     baseClass: "modal_frame",
    //     afterLoad: function afterLoad() {
    //         // if(top.$(this))
    //         top.$('.video_content').html('<video autoplay loop playsinline>\n' +
    //             '        <source src="/images/b2b.mp4" type="video/mp4" autoplay="true" ></source>\n' +
    //             '    </video>');
    //     },
    //     afterClose: function (instance, current) {
    //         top.$(this).html('');
    //     }
    // });
    top.$('body').on('blur', '.catalog-filters__price-input', function () {
        top.$('.psk-filter__button--apply').click();
    });
    top.$('body').on('click', 'div#promo .promoLink', function () {
        navigator.clipboard.writeText(top.$('div#promo .promoBody').text()).then(function() {
            alert('Скопировано '+top.$('div#promo .promoBody').text());
        }).catch(function(error) {
            console.error('Error:', error);
        });
    })
    top.$('body').on('click', '.catalog-body__sort .custom-select__option', function () {

        // top.$(this).closest(".select_wrapper").addClass('changed').attr("data-value", top.$(this).val());

        var url = new URL(window.location.href);
        url.searchParams.set('sort',top.$(this).attr('data-value'));
        var sort = top.$(this).attr('data-value');
        var pgn_url;
        //
        // window.location.href = url.href;
        /* console.log(url); */
        top.$('.pagination_list li a').each(function(ind,val){
           /*  console.log(top.$(this).attr('href')); */
            pgn_url = new URL(url.origin+top.$(this).attr('href'));
            pgn_url.searchParams.set('sort',sort);
            top.$(this).attr('href',pgn_url.href);
        })
        $.ajax({
            type: "POST",
            url: url.href,
            data: {'lazy': 'N'},
            success: function (msg) {

                // top.$('.catalog-inner').html(top.$(msg).find('.catalog-inner').html());
                // top.$('.catalog-body .accepted_filter_tags').html(top.$(msg).find('.accepted_filter_tags').html());
                top.$('.catalog-body .catalog-list').html(top.$(msg).find('.catalog-list').html());

                // TEXT CLAMP =====================================================================================
                const maxLengthTexts = document.querySelectorAll("[data-text-max-rows]");

                if (maxLengthTexts) {
                    textTruncate(maxLengthTexts);

                    function textTruncate(elements) {
                        elements.forEach((element) => {
                            const maxRows = Number(element.dataset.textMaxRows);
                            $clamp(element, { clamp: maxRows });
                        });
                    }
                }
                initProductImagesSlider();
                // initCustomSelect();
            }
        });

    });
    top.$('body').on('click','.tab_link', function () {
        top.$('.tab_link').removeClass('active');
        top.$('.tab_content').removeClass('active');
        top.$(this).addClass('active');
        top.$('#'+top.$(this).attr('data-tab')).addClass('active');
    });
    top.$('.links_side_trigger__js').on('click', function() {
        var th = top.$(this)
            , wrpr = th.closest('.mobile_toggle_links_wrapper')
            , trgt = wrpr.find('.mobile_toggle_links');
        th.toggleClass('opened');
        trgt.slideToggle(300);
    });

    $('body').on('click', '.favorite-clear .favorite-clear__btn', function(){
        
        $.ajax({
            url: '/local/ajax_query/clear_all_favorite.php',
            type: 'POST',
            success: function(res){
                 location.reload();
              
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + errorThrown);
            },

        })

     })     
     
    $(document).off('click').on('click', '.banner__floating-close', function () {
        $('.banner-container').hide();

        localStorage.setItem('bannerCloseTime', Date.now());
    });
});

$(document).ready(function () {
      
    let closeTime = localStorage.getItem('bannerCloseTime');
    if(!closeTime){
      let banner = document.querySelector('.banner-container');
      if(banner){
        banner.style.display = 'block';
      }
      
    }
    if(closeTime && ((Date.now() - closeTime) > 4*60*1000 )) {
        localStorage.removeItem('bannerCloseTime');
        document.querySelector('.banner-container').style.display = 'block';        
      
    }

    
})





// top.$(document).on('click', 'a[href*="#modal_preview"]', function (e) {
//     e.preventDefault();
//     top.$('#modal_preview .product_info_sides').html('');
//     top.$(this).fancybox();
// });

function add_to_cart2() {
    if(!(top.$('body').hasClass('yur') || top.$('body').hasClass('fiz'))) {
        top.$('body').on('click', '#modal_preview .main_btn_inner', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $.fancybox.open({
                src: '#ask_person',
                type: 'inline',
                closeClick: false,
                helpers: {
                    overlay: {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
                },
                opts: {
                    afterClose: function (instance, current) {
                        if(set_prson_type) {
                            add_to_cart();
                        }
                    }
                }
            })
        });
    }
    else add_to_cart();
}


function reloadScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.documentElement.appendChild(script);
}

jQuery(document).ready(function () {
    top.$('.select-geo').on('change', function () {
        // top.$(this).closest(".select_wrapper").addClass('changed').attr("data-value", top.$(this).val());
        var url = new URL(window.location.href);
        url.searchParams.set('select-city','y');
        /* alert(top.$(this).val()); */
        if (top.$(this).val()!='moscow') {
            var newUrl = top.$(this).val();
            top.$('#link-extra-info input').val(top.$(this).val());
        }
        else{
            var newUrl = url.protocol + '//psk.expert' + url.pathname + url.search;
            top.$('#link-extra-info input').val(0);
        }
        //the href in the link becomes the action of the form
        top.$('#link-extra-info').attr('action', newUrl);

        //submit the form
        top.$('#link-extra-info').submit();

    });

    top.$('body img.svg').toSVG({
        svgClass: " svg_converted",
        onComplete: function onComplete(data) {}
    });

    // top.$('#order_form_div input[name="person_type"]').on('click',function(){
    //
    //     let p_type = top.$(this).val();
    //     let person_type;
    //     if(p_type == '1')
    //         person_type='fiz';
    //     else person_type='yur';
    //     console.log(person_type);
    //     $.ajax({
    //         type: "POST",
    //         url: "/local/ajax_query/ask_person.php",
    //         data: {person_type: person_type},
    //         success: function (msg) {
    //             top.$('body').removeClass('fiz').removeClass('yur').addClass(person_type);
    //             set_prson_type = true;
    //             submitForm();
    //
    //         }
    //     });
    // })

    top.$( "#ask_person .submit_btn" ).on('click',function( event ){
        event.preventDefault();
        var person_type = top.$('#ask_person input:checked').val();
        top.$('body').addClass(person_type);
        $.ajax({
            type: "POST",
            url: "/local/ajax_query/ask_person.php",
            data: {person_type: person_type},
            success: function (msg) {
                top.$('body').removeClass('fiz').removeClass('yur').addClass(person_type);
                if(top.$('input.min-price').val()) {
                    if (person_type == 'fiz') {
                        top.$('input.min-price').attr('name', 'arrFilter_341_MIN').attr('id', 'arrFilter_341_MIN');
                        top.$('input.max-price').attr('name', 'arrFilter_341_MAX').attr('id', 'arrFilter_341_MAX');
                    }
                    if (person_type == 'yur') {
                        top.$('input.min-price').attr('name', 'arrFilter_340_MIN').attr('id', 'arrFilter_340_MIN');
                        top.$('input.max-price').attr('name', 'arrFilter_340_MAX').attr('id', 'arrFilter_340_MAX');
                    }
                    top.$('.psk-filter__item.price_range').find('.psk-filter__button--apply').click();

                }

                set_prson_type = true;
                $.fancybox.close();
                // BX.onCustomEvent('OnBasketChange');

                submitForm2();
            }
        });
    });

    /* Favorites */
    initFavorite();
    initProductBodyPrint();
   

    /*Compare*/
    top.$("body .product__compare-link").click(function () {
        let action = '';
        let product_id = top.$(this).attr('data-id');
        if (top.$(this).hasClass('_active')) {
            action = 'remove';
        } else {
            action = 'add';
        }
        $.ajax({
            type: "POST",
            url: "/ajax/compare.php",
            data: {product_id: product_id, action: action},
            success: function (msg) {

                var txt = +top.$('.psk-header__compare-count.compare_list_count div').text();

                // txt = Number(txt);
                if (msg == 'added') {
                    txt = txt + 1;
                    top.$('.header-controls__item__compare').removeClass('disable');
                    top.$('.product__compare-link[data-id="'+product_id+'"]').addClass('product__compare-link--active');
                    top.$('.psk-header__compare-count.compare_list_count div').text(txt);

                    // alert("Товар добавлен к сравнению");
                } else {
                    txt = txt - 1;
                    if(txt == 0) top.$('.header-controls__item__compare').addClass('disable');
                    top.$('.product__compare-link[data-id="'+product_id+'"]').removeClass('product__compare-link--active');
                    top.$('.psk-header__compare-count.compare_list_count div').text(txt);

                    // alert("Товар удален из сравнения");
                }

            }
        });

        return false;

    });

    /*  Выбрать цвет в детальной  */
    // top.$('.select-color').on('click', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     let id=top.$(this).attr('data-sku-id');
    //     top.$('.color_block_wrapper').removeClass('opened');
    //     top.$('.color_block_dropdown_trigger__js .color_block_triangles.active').removeClass('active');
    //     top.$('.color_block_dropdown_trigger__js .color_block_triangles[data-sku-id="' + id + '"]').addClass('active');
    //     top.$('.size_select.active').removeClass('active');
    //     top.$('.size_select[data-sku-id="' + id + '"]').addClass('active');
    //
    // });
    /* END Выбрать цвет в детальной  */


    top.$('.select-geo').on('change', function () {
        top.$(this).closest(".select_wrapper").addClass('changed').attr("data-value", top.$(this).val());
        var url = new URL(window.location.href);
        url.searchParams.set('select-city','y');
        // alert(top.$(this).val());
        if (top.$(this).val()!='moscow') {
            var newUrl = top.$(this).val();
            top.$('#link-extra-info input').val(top.$(this).val());
        }
        else{
            var newUrl = url.protocol + '//psk.expert' + url.pathname + url.search;
            top.$('#link-extra-info input').val(0);
        }
        //the href in the link becomes the action of the form
        top.$('#link-extra-info').attr('action', newUrl);

        //submit the form
        top.$('#link-extra-info').submit();

    });

    initChangedEvent();
   
    top.$('.card-content__section .card-sizes__select').on('change', function () {
        /* console.log('сработало'); */
        top.$('.card-price .opt').text(top.$(this).find(':selected').attr('data-price-opt') + ' ₽');
        top.$('.card-price .rozn').text(top.$(this).find(':selected').attr('data-price-rozn') + ' ₽');
        top.$(this).addClass('changed').attr("data-value", top.$(this).val());
    });

    top.$(".bmhouse-video-item").fancybox({
        touch: false,
        buttons: ["close"],
        baseClass: "modal_frame",
    });

    top.$('.has_child').on('mouseenter',function (e) {
        e.preventDefault();
        // e.stopPropagation();
        top.$('.has_child').removeClass('hover');
        top.$(this).addClass('hover');
    })
    top.$('.header_catalog_block').on('mouseenter',function (e) {
        e.preventDefault();
        // e.stopPropagation();
        top.$('.has_child').removeClass('hover');
    })
    // top.$(".tabs").on('click', '.tab_link', function (event) {
    //     event.stopPropagation();
    //     var th = top.$(this),
    //         parent = th.attr("data-parent"),
    //         activeTab = th.attr("data-tab");
    //
    //     if (!th.hasClass('active')) {
    //         th.closest(parent).find(".tabs_list .tab_link[data-parent='" + parent + "']").removeClass("active");
    //         th.closest(parent).find(".tabs_list .tab_link[data-tab='" + activeTab + "']").addClass("active");
    //
    //         if (activeTab == 'all') {
    //             th.closest(parent).find('.tab_content[data-parent="' + parent + '"]').fadeIn();
    //
    //             if (top.$('.tab_content[data-parent="' + parent + '"]').find(".slick-slider").length > 0) {
    //                 top.$('.tab_content[data-parent="' + parent + '"]').find(".slick-slider").slick("setPosition");
    //             }
    //         } else {
    //             th.closest(parent).find('.tab_content[data-parent="' + parent + '"]').hide();
    //             th.closest(parent).find("#" + activeTab).fadeIn();
    //
    //             if (top.$('.tab_content[data-parent="' + parent + '"]').find(".slick-slider").length > 0) {
    //                 top.$('.tab_content[data-parent="' + parent + '"]').find(".slick-slider").slick("setPosition");
    //             }
    //         }
    //     } else {// console.log("has")
    //     }
    // });
    if (top.$('.mas_blocks').length) {
        // masonry
        top.$('.mas_blocks').masonry({
            columnWidth: '.grid-sizer',
            itemSelector: '.gal_block'
        });
    }


    top.$('body').on('click', '[data-modal-id]', function () {
        Modal.open(top.$(this).attr('data-modal-id'))
    })

    top.$('body').on('click', '.modal__close', function () {
        Modal.close()
    })

    top.$('body').keyup(function (event) {
        // esc key
        if (event.which == 27 && Modal.isOpen) {
            Modal.close()
        }
    })

    let preventAction = true

    top.$('body').on('change', '#policy', function () {
        if (top.$(this).prop('checked')) {
            top.$('.policy_label').addClass('accept_policy')
            preventAction = false

            top.$('.modal__action input').unbind('click', preventClickFormButton)
            top.$('.policy_block + .modal__error-label + input').unbind('click', preventClickFormButton)
            top.$('.policy_block + .modal__error-label + .modal__action').unbind('click', preventClickFormButton)
        } else {
            top.$('.policy_label').removeClass('accept_policy')
            preventAction = true

            top.$('.modal__action input').on('click', preventClickFormButton)
            top.$('.policy_block + .form_button input').on('click', preventClickFormButton)
            top.$('.policy_block + .modal__error-label + .modal__action').on('click', preventClickFormButton)
        }
    })

    function preventClickFormButton (event) {
        if (preventAction) {
            event.preventDefault()
        }
    }

    
      if (!document.cookie.includes('popap_visit=1')) {
        $('#banner_popup').fadeIn();

        $('.close', '#banner_popup').on('click', function () {
          setCookiesAndClose();
        });
        $('.submit_btn', '#strike').on('click', function () {

          validateAndClose(event);
        });
      } else {
        $('.submit_btn', '#strike').on('click', function () {

          validateAndCloseForm(event);
        });
      }


      function validateAndClose(event) {
        const inputValue = $('input[name="form_text_112"]').val().trim();
        

        if (isValidPhone(inputValue) || isValidEmail(inputValue)) {
          setCookiesAndClose();
        } else {
          event.preventDefault();
          alert("Пожалуйста, введите корректный номер телефона или email.");

        }
      }

      function validateAndCloseForm(event) {
        const inputValue = $('input[name="form_text_112"]').val().trim();       

        if (isValidPhone(inputValue) || isValidEmail(inputValue)) {
          return true;
        } else {
          event.preventDefault();
          alert("Пожалуйста, введите корректный номер телефона или email.");
        }
      }


      function isValidPhone(value) {
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/; // Поддержка международных номеров
        return phoneRegex.test(value);
      }

      function isValidEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value); // Исправление: добавлен return с регулярным выражением
      }

      function setCookiesAndClose() {
        const date = new Date();
        date.setTime(date.getTime() + (5 * 60 * 1000)); // Время жизни cookies 5 минута
        document.cookie = 'popap_visit=1; expires=' + date.toUTCString() + '; path=/';
        $('#banner_popup').fadeOut();
      }
    
})



function initChangedEvent(){
    top.$('.select-sort').on('change', function () {
        top.$(this).closest(".select_wrapper").addClass('changed').attr("data-value", top.$(this).val());

        var url = new URL(window.location.href);
        url.searchParams.set('sort',top.$(this).val());

        window.location.href = url.href;

    });
}

top.$(document).on('mouseleave','.nav_list .has_child.hover .nav_list_dropdown', function(){
    top.$('.has_child').removeClass('hover');
});

top.$(window).on('load', function () {
    var observer = lozad('.lozad', {
        loaded: function loaded(el) {
            top.$(el).addClass('lozad_showed');
        }
    });
    observer.observe();
})

/* Избранное */

function initFavorite(){
    top.$('body .item_likes_image').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let favorID = top.$(this).attr('data-item');
        let favorCount = +top.$('#wishcount').text();
        let doAction = 'add';
        if(!top.$(this).hasClass('_active')) {
            doAction = 'add';
            top.$('.header-controls__item__wish').removeClass('disable');
            // top.$('#wishcount').text(favorCount + 1);
        }
        else {
            doAction = 'delete';
            if((favorCount-1) == 0) top.$('.header-controls__item__wish').addClass('disable');
            // top.$('#wishcount').html(favorCount-1);
        }
        addFavorite(favorID, doAction);
        top.$(this).toggleClass('filled');
    });
} 

function addFavorite(id, action) {
    var param = 'id=' + id + "&action=" + action;
    $.ajax({
        url: '/local/ajax_query/favorites.php', // URL отправки запроса
        type: "GET",
        dataType: "html",
        data: param,
        success: function (response) {
            var result = JSON.parse(response);
            let favorCount = +top.$('#wishcount').text();            
            if (result['action'] == 1) { // Если всё хорошо, то выполняем действия, которые показывают, что данные отправлены
                top.$('.item_likes_image[data-item="' + id + '"]').addClass('filled');
                top.$('.item_likes_count[data-item="' + id + '"]').text(result['cntLike']);
                top.$('#wishcount').text(favorCount + 1);
            }
            if (result['action'] == 2) {
                top.$('.item_likes_image[data-item="' + id + '"]').removeClass('filled');
                top.$('#wishcount').text(favorCount - 1);
                if(top.$('.catalog-list').hasClass('favorites')){
                   location.reload();
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + errorThrown);
        }
    });
}

/* window.addEventListener("load", function() {
    initFavorite();
}); */


/* Избранное */

/*изменить тип плательщика*/
function change_person_type() {

    $.fancybox.open({
        src: '#ask_person',
        type: 'inline',
        helpers: {
            overlay: {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
        },
        opts: {
            afterClose: function (instance, current) {
                if(set_prson_type && window.location.pathname=='/personal/cart/') {
                    top.$('[name="BasketRefresh"]').trigger('click');
                }
            }
        }
    })
}
/*END изменить тип плательщика*/


/*в корзину из списка*/
function add2basket(ID, article) {
// alert('1');
    if(!(top.$('body').hasClass('yur') || top.$('body').hasClass('fiz'))) {

        $.fancybox.open({
            src: '#ask_person',
            type: 'inline',
            closeClick: false,
            helpers   : {
                overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
            },
            opts: {
                afterClose: function (instance, current) {
                    if(set_prson_type) {

                        $.ajax({
                            type: "POST",
                            url: "/local/ajax_query/add2basket__ajax.php",
                            data: {
                                ID: ID,
                                QUANTITY: 1,
                                ARTICLE: article,
                            },
                            success: function (msg) {

                                // console.log(msg);

                                /* let cnt_basket = +top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(); */
                                /* console.log('должен класс удалиться'); */

                                updateBasketCount();
                                top.$('.header-controls__item.header-controls__item__cart').removeClass('disable');

                                /* top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(cnt_basket + 1); */
                                top.$('#cart_win').html(msg);
                                $.fancybox.open({
                                    src: '#cart_win',
                                    touch: false,
                                    buttons: ["close"],
                                    baseClass: "modal_frame",

                                });
                                var th = top.$('#cart_win').find('.side_scroll_block'),
                                    prnt = th.closest('.side_modal'),
                                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                                    staticOffset = 60,
                                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                                th.css('height', neededHeight);

                            },
                        });
                    }
                }
            }
        });
    }else{


        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basket__ajax.php",
            data: {
                ID: ID,
                QUANTITY: 1,
                ARTICLE: article,
            },
            success: function (msg) {

                // console.log(msg);
                /* let cnt_basket = +top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(); */
                /* console.log('должен класс удалиться'); */
                updateBasketCount();
                top.$('.header-controls__item.header-controls__item__cart').removeClass('disable');

                /* top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(cnt_basket + 1); */
                top.$('#cart_win').html(msg);
                $.fancybox.open({
                    src: '#cart_win',
                    touch: false,
                    buttons: ["close"],
                    baseClass: "modal_frame",

                });
                var th = top.$('#cart_win').find('.side_scroll_block'),
                    prnt = th.closest('.side_modal'),
                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                    staticOffset = 60,
                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                th.css('height', neededHeight);

            },
        });
    }


}
/*в корзину из списка*/

/* Получение количества товара в корзине */

function updateBasketCount() {
  $.ajax({
    url: "/local/ajax_query/get_basket_count__ajax.php",
    type: "GET",
    success: function (response) {
      const result = JSON.parse(response);
      top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(result.count);
    }
  });
}

/*в корзину из детальной товара*/
function add2basketOffer() {
    if(!(top.$('body').hasClass('yur') || top.$('body').hasClass('fiz'))) {
        // alert('77');
        $.fancybox.open({
            src: '#ask_person',
            type: 'inline',
            closeClick: false,
            helpers   : {
                overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
            },
            opts: {
                afterClose: function (instance, current) {
                    if(set_prson_type) {
                        var product = {};
                        var i = 0;
                        // top.$('.product__position').each(function (e,val) {
                        //     product[i]={id: top.$(this).children('.product__position-item--sizes').children('.product__position-sizes').attr('data-size-id'),
                        //         kol: top.$(this).find('.product__position-quantity-inner input').val()}
                        //     i++;
                        // })
                        if(top.$('.card-info .item__art').attr('data-id') !== undefined) {
                            if (top.$('.card-sizes .custom-select__option._active').attr('data-value')) {
                                product[i] = {
                                    id: top.$('.card-sizes .custom-select__option._active').attr('data-value'),
                                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                                }
                            } else {
                                let valueId = top.$('.card-sizes__select').attr('data-value');                               
                                if(valueId){
                                    product[i] = {
                                        id: top.$('.card-sizes__select').attr('data-value'),
                                        kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                                    }
                                }else{
                                    product[i] = {
                                        id: top.$('.cart-code .item__art').attr('data-id'),
                                        kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                                    }
                                }                               
                               
                            }
                            article = top.$('.card-info .item__art').text().replace(/\s+/g, '');
                        }
                        else{
                            if (top.$('.card-sizes .custom-select__option._active').attr('data-value')) {
                                product[i] = {
                                    id: top.$('.card-sizes .custom-select__option._active').attr('data-value'),
                                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                                }
                            } else {
                                product[i] = {
                                    id: top.$('.cart-code .item__art').attr('data-id'),
                                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                                }
                            }
                            article = top.$('.cart-code .item__art').text().replace(/\s+/g, '');
                        }

                        // top.$('.select_wrapper')


                       /*  console.log('Ниже продукт1');
                        console.log(product);
                        console.log(article); */
                        $.ajax({
                            type: "POST",
                            url: "/local/ajax_query/add2basketOffer__ajax.php",
                            data: {
                                OFFER: product,
                                ARTICLE: article,
                            },
                            success: function (msg) {

                                // console.log(msg);
                                let cnt_basket = +top.$('.header-controls__item__cart .header-controls__item-counter').text();

                                /* console.log('должен класс удалиться3'); */
                                top.$('.header-controls__item__cart').removeClass('disable');
                                top.$('.header-controls__item__cart .header-controls__item-counter').text(cnt_basket + 1);
                                top.$('#cart_win').html(msg);
                                $.fancybox.open({
                                    src: '#cart_win',
                                    touch: false,
                                    buttons: ["close"],
                                    baseClass: "modal_frame",

                                });
                                var th = top.$('#cart_win').find('.side_scroll_block'),
                                    prnt = th.closest('.side_modal'),
                                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                                    staticOffset = 60,
                                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                                th.css('height', neededHeight);
                                },
                        });
                    }
                }
            }
        });
    }else {
        var product = {}, article;
        var i = 0;
        // top.$('.product__position').each(function (e,val) {
        //     product[i]={id: top.$(this).children('.product__position-item--sizes').children('.product__position-sizes').attr('data-size-id'),
        //         kol: top.$(this).find('.product__position-quantity-inner input').val()}
        //     i++;
        // })
        if(top.$('.card-info .item__art').attr('data-id') !== undefined) {
            if (top.$('.card-sizes .custom-select__option._active').attr('data-value')) {
                product[i] = {
                    id: top.$('.card-sizes .custom-select__option._active').attr('data-value'),
                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                }
            } else {
                let valueId = top.$('.card-sizes__select').attr('data-value');                               
                if(valueId){
                    product[i] = {
                        id: top.$('.card-sizes__select').attr('data-value'),
                        kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                    }
                }else{
                    product[i] = {
                        id: top.$('.cart-code .item__art').attr('data-id'),
                        kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                    }
                }               
               
            }
            article = top.$('.card-info .item__art').text().replace(/\s+/g, '');
        }
        else{
            if (top.$('.card-sizes .custom-select__option._active').attr('data-value')) {
                product[i] = {
                    id: top.$('.card-sizes .custom-select__option._active').attr('data-value'),
                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                }
            } else {
                product[i] = {
                    id: top.$('.cart-code .item__art').attr('data-id'),
                    kol: top.$('.card-controls__counter input.quantity-counter__input').val()
                }
            }
            article = top.$('.cart-code .item__art').text().replace(/\s+/g, '');
        }


        // top.$('.select_wrapper')

        /* console.log('Ниже продукт');
        console.log(product);
        console.log(article); */

        // console.log(product);
        // console.log("Артикул: "+article);

        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basketOffer__ajax.php",
            data: {
                OFFER: product,
                ARTICLE: article,
            },
            success: function (msg) {

                // console.log(msg);
                let cnt_basket = +top.$('.header-controls__item__cart .header-controls__item-counter').text();
                /* console.log('должен класс удалиться4'); */
                top.$('.header-controls__item__cart').removeClass('disable');
                top.$('.header-controls__item__cart .header-controls__item-counter').text(cnt_basket + 1);
                top.$('#cart_win').html(msg);
                $.fancybox.open({
                    src: '#cart_win',
                    touch: false,
                    buttons: ["close"],
                    baseClass: "modal_frame",

                });
                var th = top.$('#cart_win').find('.side_scroll_block'),
                    prnt = th.closest('.side_modal'),
                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                    staticOffset = 60,
                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                th.css('height', neededHeight);
                },
        });
    }
}
/*в корзину из детальной товара*/

/*в корзину из модалки детальной товара (множественный выбор)*/
function add2basketOffer_modal() {
    if(!(top.$('body').hasClass('yur') || top.$('body').hasClass('fiz'))) {

        $.fancybox.open({
            src: '#ask_person',
            type: 'inline',
            closeClick: false,
            helpers   : {
                overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
            },
            opts: {
                afterClose: function (instance, current) {
                    if(set_prson_type) {
                        var product = {};
                        var i = 0;
                        top.$('.card-sidebar--sizes .card-sidebar__sizes-list .card-sidebar__size').each(function (e, val) {
                            if (top.$(this).find('.quantity-counter__input').val() > 0) {
                                product[i] = {
                                    id: top.$(this).attr('data-size'),
                                    kol: top.$(this).find('.quantity-counter__input').val()
                                }
                                i++;
                            }
                        })
                        top.$('.card-sidebar--sizes .quantity-counter__input').val(0);
                        $.fancybox.close();
                        article = top.$('.card-sidebar--sizes .card-sidebar__sizes-list').attr('data-article');
                        /* console.log(product); */
                        $.ajax({
                            type: "POST",
                            url: "/local/ajax_query/add2basketOffer__ajax.php",
                            data: {
                                OFFER: product,
                                ARTICLE: article,
                            },
                            success: function (msg) {


                                let cnt_basket = +top.$('.header-controls__item-btn.cart .header-controls__item-counter').text();

                                top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(cnt_basket + 1);
                                top.$('#cart_win').html(msg);
                                $.fancybox.open({
                                    src: '#cart_win',
                                    touch: false,
                                    buttons: ["close"],
                                    baseClass: "modal_frame",

                                });
                                var th = top.$('#cart_win').find('.side_scroll_block'),
                                    prnt = th.closest('.side_modal'),
                                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                                    staticOffset = 60,
                                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                                th.css('height', neededHeight);

                            },
                        });
                    }
                }
            }
        });
    }else {
        var product = {};
        var i = 0;
        top.$('.card-sidebar--sizes .card-sidebar__sizes-list .card-sidebar__size').each(function (e, val) {
            if (top.$(this).find('.quantity-counter__input').val() > 0) {
                product[i] = {
                    id: top.$(this).attr('data-size'),
                    kol: top.$(this).find('.quantity-counter__input').val()
                }
                i++;
            }
        })
        top.$('.card-sidebar--sizes .quantity-counter__input').val(0);
        $.fancybox.close();
        article = top.$('.card-sidebar--sizes .card-sidebar__sizes-list').attr('data-article');
       /*  console.log(product); */
        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basketOffer__ajax.php",
            data: {
                OFFER: product,
                ARTICLE: article,
            },
            success: function (msg) {


                let cnt_basket = +top.$('.header-controls__item-btn.cart .header-controls__item-counter').text();

                top.$('.header-controls__item-btn.cart .header-controls__item-counter').text(cnt_basket + 1);
                top.$('#cart_win').html(msg);
                $.fancybox.open({
                    src: '#cart_win',
                    touch: false,
                    buttons: ["close"],
                    baseClass: "modal_frame",

                });
                var th = top.$('#cart_win').find('.side_scroll_block'),
                    prnt = th.closest('.side_modal'),
                    hdr = prnt.find('.side_modal_heading').outerHeight(true),
                    bottomFrame = prnt.find('.side_modal_bottom_frame').outerHeight(true),
                    staticOffset = 60,
                    neededHeight = window.innerHeight - (hdr + bottomFrame + staticOffset);
                th.css('height', neededHeight);

            },
        });
    }
}
/*в корзину из модалки детальной товара (множественный выбор)*/



// обновление формы заказа
function submitForm () {

    $.ajax({
        type: "POST",
        url: "/local/ajax_query/change_basket_ajax.php",
        cache: false,
        data: {
            ACTION: 'cart_update'
        },
        success: function (msg) {

            location.reload();
        },
    });
}

/*в корзину из модалки корзины (множественный выбор)*/
function add2basketOffer_modal_cart() {

    if (top.$('#t_tab_multy').hasClass('active')) {
        var product = {};
        var i = 0;
        top.$('#t_tab_multy .added_item_lines .added_item_line').each(function (e, val) {
            if (top.$(this).find('.quantity_input').val() > 0) {
                product[i] = {
                    id: "a" + top.$(this).attr('data-offer'),
                    kol: top.$(this).find('.quantity_input').val()
                }
                i++;
            }
        })
        top.$('#t_tab_multy .quantity_input').val(0);
        $.fancybox.close();
        article = top.$('#t_tab_multy .choode_modal_heading .item__art').attr('data-article');
       /*  console.log(product); */
        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basketOffer__ajax.php",
            data: {
                OFFER: product,
                ARTICLE: article,
            },
            success: function (msg) {
             /*    console.log(msg); */
                submitForm();

            },
        });
    }
    if (top.$('#t_tab_single').hasClass('active')) {
        var sizes = top.$('.sizes_block.active .squere_check_input:checked').parent('.size-block').attr('data-id');
        var rosts = top.$('.sizes_block.active .squere_check_input:checked').parent('.rost-block').attr('data-id');
        var offer_id;
        var product = {};
        if (typeof sizes !== "undefined") {
            sizes = sizes.split(',');
        }else{
            sizes = false;
        }
        if(typeof rosts !== "undefined") {
            rosts = rosts.split(',');
        }else{
            rosts = false;
        }
        if(rosts === false) {offer_id = sizes[0];}
        else{
            $.each(sizes,function(index,value){
                $.each(rosts,function(index2,value2){
                    if(value === value2 && value != '') offer_id = value;
                })
            })
        }
        product[0] = {
            id: "a" + offer_id,
            kol: top.$('#t_tab_single .quantity_input').val()
        }
        article = top.$('#t_tab_single .choode_modal_heading .item__art').attr('data-article');
       /*  console.log(product);
        console.log(article); */
        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basketOffer__ajax.php",
            data: {
                OFFER: product,
                ARTICLE: article,
            },
            success: function (msg) {
                /* console.log(msg); */
                submitForm();

            },
        });
    }

}

function add2basketOffer_modal_cart_2024() {
    if (top.$('#t_tab_multy').hasClass('active')) {
        var product = {};
        var i = 0, article;
        top.$('#cart_multiple_sizes_choose .card-sidebar__sizes-list .card-sidebar__size').each(function (e, val) {
            if (top.$(this).find('.quantity-counter__input').val() > 0) {
                product[i] = {
                    id: "a" + top.$(this).attr('data-offer'),
                    kol: top.$(this).find('.quantity-counter__input').val()
                }
                i++;
            }
        })
        top.$('#cart_multiple_sizes_choose .quantity-counter__input').val(0);
        $.fancybox.close();
        article = top.$('#cart_multiple_sizes_choose .card-sidebar__code .item__art').attr('data-article');
        /* console.log(product); */
        $.ajax({
            type: "POST",
            url: "/local/ajax_query/add2basketOffer__ajax.php",
            data: {
                OFFER: product,
                ARTICLE: article,
            },
            success: function (msg) {
               /*  console.log(msg); */
                submitForm();

            },
        });
    }
        if (top.$('#t_tab_single').hasClass('active')) {
            var offer_id = top.$('#t_tab_single .selected_offer').attr('data-offer_id');
            var product = {};




            product[0] = {
                id: "a" + offer_id,
                kol: top.$('#t_tab_single .quantity-counter__input').val()
            }
            article = top.$('#t_tab_single .card-sidebar__code .item__art').attr('data-article');
           /*  console.log(product);
            console.log(article); */

            $.ajax({
                type: "POST",
                url: "/local/ajax_query/add2basketOffer__ajax.php",
                data: {
                    OFFER: product,
                    ARTICLE: article,
                },
                success: function (msg) {
                    console.log(msg);
                    submitForm();

                },
            });
        }
}

/*в корзину из модалки из корзины (множественный выбор)*/

/*удалить из быстрой (модальной) корзины*/
function delItemBasket(id){
    let cnt_basket = +top.$('.header_controll_list .header_controll_li.basket_li .controll_count').text();
    let kol = +top.$('div[data-cart-id="'+id+'"] .modal_cb__list li span').text();

        $.ajax({
        type: "POST",
        url: "/local/ajax_query/del_from_basket__ajax.php",
        data: {
            ID: id,
        },
        success: function (msg) {

            top.$('.header_controll_list .header_controll_li.basket_li .controll_count').text(cnt_basket-kol);
            top.$('div[data-cart-id="'+id+'"]').animate({opacity: '0'},600,'swing',function (){this.remove()});
            top.$('.side_modal__title').text('Корзина ('+(cnt_basket-kol)+')');

        },
    });
}
/*END удалить из быстрой (модальной) корзины*/

/*Получить цену корзины*/
function getCartPrice() {
    $.ajax({
        type: "POST",
        cache: false,
        url: "/local/ajax_query/getCartPrice.php",

        success: function (arPrice) {
            var price = JSON.parse(arPrice);
           /*  console.log(price); */

            top.$('.total-price .total-price__price .total').text(price.FULL_PRICE + '₽');
            top.$('.total-price .total-price__price .total-hidden').text(price.FULL_PRICE.replace(/\s+/g, '') + '₽');
            // top.$('.total-price .discount .discount__percent ins').text(price.DISCOUNT);
            top.$('.total-price .discount .discount__total').text('-' + price.PRICE_DISCOUNT + '₽');
            top.$('.total-price .cart-order__total .cart-order__total-price').text(price.PRICE + '₽').attr('data-price',price.PRICE);

            top.$('.total-price .cart-order__total .hidden_price').text(price.PRICE.replace(/\s+/g, ''));

        },
        })
}
/*END Получить цену корзины*/

function magnify(imgID, zoom) {

    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    /* Создать увеличительное стекло: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Вставить увеличительное стекло: */
    img.parentElement.insertBefore(glass, img);

    /* Установите свойства фона для стекла лупы: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    glass.addEventListener("click", function () {
        top.$(this).remove();
    });

    /* Выполните функцию, когда кто-то перемещает лупу по изображению: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /* а также для сенсорных экранов: */
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
        var pos, x, y;
        /* Предотвратите любые другие действия, которые могут возникнуть при перемещении по изображению */
        e.preventDefault();
        /* Получить позиции курсора x и y: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Не допускайте, чтобы лупа находилась вне изображения: */
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        /* Установите положение стекла лупы: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Покажите, что такое увеличительное стекло "смотреть": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Получить x и y позиции изображения: */
        a = img.getBoundingClientRect();
        /* Вычислите координаты курсора x и y относительно изображения: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}

//svg
(function ($) {
    $.fn.toSVG = function (options) {

        var params = $.extend({
            svgClass: "replaced-svg",
            onComplete: function onComplete() {}
        }, options);

        this.each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            if (!/\.(svg)$/i.test(imgURL)) {
                return;
            }

            $.get(imgURL, function (data) {
                var $svg = jQuery(data).find('svg');

                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }

                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + params.svgClass);
                }

                $svg = $svg.removeAttr('xmlns:a');

                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }

                $img.replaceWith($svg);
                typeof params.onComplete == "function" ? params.onComplete.call(this, $svg) : '';
            });
        });
    };
})(jQuery);

window.onload = function() {
    var container = document.querySelector('.catalog-filters__item-body._custom-scrollbar');
    if (container) {
        var activeElement = container.querySelector('.aside_link.active');
        if (activeElement) {
            container.scrollTop = activeElement.offsetTop;
        }
    }

    $('#share-link').on('click', function (e) {
      e.preventDefault();
      let copyLink = $(this).attr('href');
      copyLink = 'https://' + copyLink;
      writeLink(copyLink);
    })

    async function writeLink(text) {
      try {
        await navigator.clipboard.writeText(text);
        showMessage('Ссылка скопирована!')
      } catch (error) {
        console.error(error.message);
      }
    }

    function showMessage(message) {
      let messageElement = $('#share-message');
      messageElement.text(message);
      messageElement.show();
      setTimeout(function () {
        messageElement.hide();
      }, 3000)
    }
}

/* Иницилизация события клик на карточку product-body--print */

function initProductBodyPrint(){  
  $('.product-body--print').off('click').on('click', function () {
    
    if ($('.items_card--check').hasClass('active')) {      
      $('.items_card--check').removeClass('active');
    }
    if ($('#all_section').hasClass('active')) {
      $('#all_section').removeClass('active');
    }
    if (!$('#items_card').hasClass('active')) {
      $('#items_card').addClass('active');
    }
    if ($('#items_card_filtered').hasClass('active')) {
      $('#items_card_filtered').removeClass('active');
    }
    var itemId = $(this).data('id');
    if (!itemId) return;
    if ($(this).hasClass('selected')) {
      selectedItemsId = selectedItemsId.filter(id => id !== itemId);
      $(this).removeClass('selected');
    } else {
      selectedItemsId.push(itemId);
      $(this).addClass('selected');
    }
    if(selectedItemsId.length > 0){
      $('#save').show();
    }else{
      $('#save').hide();
      $('.items_card--check').addClass('active');
    }      
  });
  
}

/*Функция удаления класса active для кнопок с классом btn--mode */

function resetButtonsPrintCards(){
  $('.form-button .btn--mode').not($(this)).each(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      if ($(this).attr('id') === 'items_card') {
        $('.items_card--check').removeClass('active');
        if (selectedItemsId.length > 0) {
          $('.product-body--print.selected').each(function () {
            $(this).removeClass('selected');
          });
          selectedItemsId = [];
        }
      }
    }
  })
  $('#save').hide();
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:51:"/local/templates/psk2024/js/main.js?175076888779881";s:6:"source";s:35:"/local/templates/psk2024/js/main.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
"use strict";
// TOUCHSCREEN CHECK ==============================================================================
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};


//=================================================================================================

//WEBP checkbrowser ===============================================================================
function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
//=================================================================================================

// 100vh mobile fix ===============================================================================
window.addEventListener("resize", function () {
  oneVH_toPX();
});

function oneVH_toPX() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
oneVH_toPX();
//=================================================================================================

// POLYFILLS ======================================================================================
// scrollTo smooth
!(function () {
  "use strict";
  function o() {
    var o,
      t,
      e,
      c,
      n,
      l,
      f = window,
      p = document;
    function a(o, t) {
      (this.scrollLeft = o), (this.scrollTop = t);
    }
    function r(o) {
      if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
      if ("object" == typeof o && "smooth" === o.behavior) return !1;
      throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.");
    }
    function i(o, t) {
      return "Y" === t ? o.clientHeight + l < o.scrollHeight : "X" === t ? o.clientWidth + l < o.scrollWidth : void 0;
    }
    function s(o, t) {
      t = f.getComputedStyle(o, null)["overflow" + t];
      return "auto" === t || "scroll" === t;
    }
    function d(o) {
      var t = (n() - o.startTime) / e,
        l = (t = 1 < t ? 1 : t),
        t = 0.5 * (1 - Math.cos(Math.PI * l)),
        l = o.startX + (o.x - o.startX) * t,
        t = o.startY + (o.y - o.startY) * t;
      o.method.call(o.scrollable, l, t), (l === o.x && t === o.y) || f.requestAnimationFrame(d.bind(f, o));
    }
    function h(o, t, l) {
      var e,
        r,
        i,
        s = n(),
        o = o === p.body ? ((r = (e = f).scrollX || f.pageXOffset), (i = f.scrollY || f.pageYOffset), c.scroll) : ((r = (e = o).scrollLeft), (i = o.scrollTop), a);
      d({ scrollable: e, method: o, startTime: s, startX: r, startY: i, x: t, y: l });
    }
    ("scrollBehavior" in p.documentElement.style && !0 !== f.__forceSmoothScrollPolyfill__) ||
      ((t = f.HTMLElement || f.Element),
      (e = 468),
      (c = { scroll: f.scroll || f.scrollTo, scrollBy: f.scrollBy, elementScroll: t.prototype.scroll || a, scrollIntoView: t.prototype.scrollIntoView }),
      (n = f.performance && f.performance.now ? f.performance.now.bind(f.performance) : Date.now),
      (o = f.navigator.userAgent),
      (l = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o) ? 1 : 0),
      (f.scroll = f.scrollTo =
        function () {
          void 0 !== arguments[0] &&
            (!0 !== r(arguments[0])
              ? h.call(f, p.body, void 0 !== arguments[0].left ? ~~arguments[0].left : f.scrollX || f.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : f.scrollY || f.pageYOffset)
              : c.scroll.call(
                  f,
                  void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : f.scrollX || f.pageXOffset,
                  void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : f.scrollY || f.pageYOffset
                ));
        }),
      (f.scrollBy = function () {
        void 0 !== arguments[0] &&
          (r(arguments[0])
            ? c.scrollBy.call(
                f,
                void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0,
                void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
              )
            : h.call(f, p.body, ~~arguments[0].left + (f.scrollX || f.pageXOffset), ~~arguments[0].top + (f.scrollY || f.pageYOffset)));
      }),
      (t.prototype.scroll = t.prototype.scrollTo =
        function () {
          if (void 0 !== arguments[0])
            if (!0 !== r(arguments[0])) {
              var o = arguments[0].left,
                t = arguments[0].top;
              h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t);
            } else {
              if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
              c.elementScroll.call(
                this,
                void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft,
                void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop
              );
            }
        }),
      (t.prototype.scrollBy = function () {
        void 0 !== arguments[0] &&
          (!0 !== r(arguments[0])
            ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior })
            : c.elementScroll.call(
                this,
                void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
                void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
              ));
      }),
      (t.prototype.scrollIntoView = function () {
        var o, t, l;
        !0 !== r(arguments[0])
          ? ((t = (o = (function (o) {
              for (; o !== p.body && !1 === ((t = i((l = o), "Y") && s(l, "Y")), (l = i(l, "X") && s(l, "X")), t || l); ) o = o.parentNode || o.host;
              var t, l;
              return o;
            })(this)).getBoundingClientRect()),
            (l = this.getBoundingClientRect()),
            o !== p.body
              ? (h.call(this, o, o.scrollLeft + l.left - t.left, o.scrollTop + l.top - t.top),
                "fixed" !== f.getComputedStyle(o).position && f.scrollBy({ left: t.left, top: t.top, behavior: "smooth" }))
              : f.scrollBy({ left: l.left, top: l.top, behavior: "smooth" }))
          : c.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
      }));
  }
  "object" == typeof exports && "undefined" != typeof module ? (module.exports = { polyfill: o }) : o();
})();
//=================================================================================================

document.addEventListener("DOMContentLoaded", function () {
  if (isMobile.any()) {
    document.querySelector("body").classList.add("_touchscreen");
  } else {
    document.querySelector("body").classList.add("_desktop");
  }
  // CART PRODUCT CLICK LISTENER
  const cartProducts = document.querySelectorAll(".cart-product");

  if (cartProducts.length) {
    cartProducts.forEach((item) => {
      item.addEventListener("click", function (e) {
        const target = e.target;

        // CART PARAMS SLIDETOGGLE MOBILE
        if (target.closest(".cart-product__param-btn")) {
          const paramsBtn = target.closest(".cart-product__param-btn");
          const paramsParent = paramsBtn.closest(".cart-product__param");
          const paramItems = paramsParent.querySelector(".cart-product__param-items");

          e.preventDefault();
          paramsBtn.classList.toggle("_active");
          paramItems.classList.toggle("_active");
        }

        // CART PARAMS ON CHANGE
        if (target.closest(".check-input")) {
          const paramItem = target.closest(".check-input");
          const paramsParent = paramItem.closest(".cart-product__param");
          const paramsBtn = paramsParent.querySelector(".cart-product__param-btn");

          paramsBtn.textContent = paramItem.value;
        }
      });
    });
  }
  

  
  // MODAL MENU ===================================================================================
  const modalMenu = document.querySelector(".modal-menu");

  if (modalMenu) {
    const modalMenuInner = document.querySelector(".modal-menu__inner");
    const modalMenuOpenBtn = document.querySelector(".modal-menu__trigger");
    const modalMenuCloseBtn = modalMenu.querySelector(".modal-menu__close");
    const modalMenuBackBtn = modalMenu.querySelector(".modal-menu__back");
    const modalMenuLinks = modalMenu.querySelectorAll(".modal-menu__list > li > a");

    modalMenuLinks.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (item.closest("._has-child")) {
          e.preventDefault();
          removeActiveClassModalMenuLink();
          modalMenu.classList.add("_active-submenu");
          item.classList.add("_active");
          modalMenuBackBtn.classList.add("_active");
          modalMenuInner.scrollTo(0, 0);
        }
      });
    });

    modalMenuOpenBtn.addEventListener("click", () => {
      modalMenu.classList.add("_active");
      openOverlay();
    });

    modalMenuCloseBtn.addEventListener("click", () => {
      modalMenu.classList.remove("_active");
      modalMenu.classList.remove("_active-submenu");
      modalMenuBackBtn.classList.remove("_active");
      closeOverlay();
    });

    modalMenuBackBtn.addEventListener("click", () => {
      modalMenuBackBtn.classList.remove("_active");
      modalMenu.classList.remove("_active-submenu");
      modalMenuInner.scrollTo(0, 0);
    });

    function removeActiveClassModalMenuLink() {
      modalMenuLinks.forEach((el) => el.classList.remove("_active"));
    }
  }

  // SEARCH BAR ===================================================================================
  const headerSearch = document.querySelector(".header-search");

  if (headerSearch) {
    const headerSearchTrigger = document.querySelector(".header-search__trigger");

    headerSearchTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      headerSearchTrigger.classList.toggle("_active");
      headerSearch.classList.toggle("_active");

      if (headerSearchTrigger.classList.contains("_active")) {
        document.addEventListener("click", closeHeaderSearch);
      } else {
        document.removeEventListener("click", closeHeaderSearch);
      }
    });

    function closeHeaderSearch(e) {
      if (!e.target.closest(".header-search")) {
        headerSearch.classList.remove("_active");
        headerSearchTrigger.classList.remove("_active");
        document.removeEventListener("click", closeHeaderSearch);
      }
    }
  }

  // MAIN BANNER ==================================================================================
  const mainBannerSlider = document.querySelector(".main-banner__slider");

  if (mainBannerSlider) {
    const mainBannerSliderSwiper = new Swiper(mainBannerSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
      pagination: {
        el: ".main-banner__slider-pagination",
        clickable: true,
      },
    });
  }

  // ANNOUNCEMENTS SLIDER =========================================================================
  const announcementsSlider = document.querySelector(".announcements-slider");

  if (announcementsSlider) {
    let announcementsSliderSwiper;

    const announcementsSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1.00000001,
      spaceBetween: 15,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    };

    setAnnouncementsSliderStatus();
    window.addEventListener("resize", setAnnouncementsSliderStatus);

    function setAnnouncementsSliderStatus() {
      if (window.innerWidth < 768 && !announcementsSlider.classList.contains("swiper-initialized")) {
        announcementsSliderSwiper = new Swiper(announcementsSlider, announcementsSliderSettings);
      } else if (window.innerWidth >= 768 && announcementsSlider.classList.contains("swiper-initialized")) {
        announcementsSliderSwiper.destroy();
      }
    }
  }

  //PRODUCTS SLIDER ===============================================================================
  const productsSlider = document.querySelectorAll(".products-slider");

  if (productsSlider) {
    const productsSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      speed: 600,
      freeMode: false,
      rewind: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
      slideToClickedSlide: false,
      touchMoveStopPropagation: true,
      touchStartForcePreventDefault: true,
      breakpoints: {
        0: {
          slidesPerView: 1.0000001,
          spaceBetween: 15,
          initialSlide: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
          initialSlide: 0,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
          initialSlide: 0,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 20,
          initialSlide: 0,
        },
        1300: {
          slidesPerView: 5,
          spaceBetween: 20,
          initialSlide: 0,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 20,
          initialSlide: 0,
        },
      },
    };

    productsSlider.forEach((slider) => {
      const parent = slider.closest(".products-slider__wrapper");
      const prevBtn = parent.querySelector(".swiper-button-prev");
      const nextBtn = parent.querySelector(".swiper-button-next");
      const currentSliderSettings = {
        ...productsSliderSettings,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      };

      if (slider.classList.contains("products-slider--2rows")) {
        currentSliderSettings.grid = {
          rows: 2,
          fill: "row",
        };
      }

      if (slider.classList.contains("products-slider--big")) {
        currentSliderSettings.breakpoints = {
          0: {
            slidesPerView: 1.0000001,
            spaceBetween: 15,
            initialSlide: 1,
          },
          576: {
            slidesPerView: 1.3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 0,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 20,
            initialSlide: 0,
          },
        };
      }

      if (slider.classList.contains("products-slider--small")) {
        currentSliderSettings.breakpoints = {
          0: {
            slidesPerView: 1.0000001,
            spaceBetween: 15,
            initialSlide: 1,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 15,
            initialSlide: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
            initialSlide: 0,
          },
          1100: {
            slidesPerView: 2,
            spaceBetween: 20,
            initialSlide: 0,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 0,
          },
        };
      }

      new Swiper(slider, currentSliderSettings);
    });
  }

  // PRODUCT SLIDE IMAGES =========================================================================
  initProductImagesSlider();

  // SALE BANNERS SLIDER ==========================================================================
  const saleBannersSlider = document.querySelector(".sale-banners__slider");

  if (saleBannersSlider) {
    let saleBannersSliderSwiper;

    const saleBannersSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1.00000001,
      spaceBetween: 15,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    };

    setSaleBannersSliderStatus();
    window.addEventListener("resize", setSaleBannersSliderStatus);

    function setSaleBannersSliderStatus() {
      if (window.innerWidth < 768 && !saleBannersSlider.classList.contains("swiper-initialized")) {
        saleBannersSliderSwiper = new Swiper(saleBannersSlider, saleBannersSliderSettings);
      } else if (window.innerWidth >= 768 && saleBannersSlider.classList.contains("swiper-initialized")) {
        saleBannersSliderSwiper.destroy();
      }
    }
  }
  // 4sezon BANNERS SLIDER ==========================================================================
  const sezon4BannersSlider = document.querySelector(".sezon4-banners__slider");

  if (sezon4BannersSlider) {
    let sezon4BannersSliderSwiper;

    const sezon4BannersSliderSettings = {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1.00000001,
      spaceBetween: 15,
      speed: 600,
      freeMode: false,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
    };

    setSaleBannersSliderStatus();
    window.addEventListener("resize", setSaleBannersSliderStatus);

    function setSaleBannersSliderStatus() {
      if (window.innerWidth < 768 && !sezon4BannersSlider.classList.contains("swiper-initialized")) {
        sezon4BannersSliderSwiper = new Swiper(sezon4BannersSlider, sezon4BannersSliderSettings);
      } else if (window.innerWidth >= 768 && sezon4BannersSlider.classList.contains("swiper-initialized")) {
        sezon4BannersSliderSwiper.destroy();
      }
    }
  }

  // INTERACTIVE CATALOG SLIDERS ==================================================================
  const intercatNavigationSlider = document.querySelector(".intercat-navigation__slider");

  if (intercatNavigationSlider) {
    const intercatNavigationTitle = document.querySelector(".intercat-navigation__title");

    const intercatNavigationSliderSwiper = new Swiper(intercatNavigationSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: false,
      slideToClickedSlide: true,
      allowTouchMove: true,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 40,
        depth: 220,
        modifier: 1,
        slideShadows: false,
      },
      allowTouchMove: true,
      pagination: {
        el: ".intercat-navigation__slider-pagination",
        type: "bullets",
        clickable: true,
      },
      on: {
        slideChange: function () {
          const index_currentSlide = this.realIndex;
          const currentSlide = this.slides[index_currentSlide];
          intercatNavigationTitle.textContent = currentSlide.dataset.title;
        },
      },
      breakpoints: {
        0: {
          coverflowEffect: {
            stretch: 70,
          },
        },
        576: {
          coverflowEffect: {
            stretch: 110,
          },
        },
      },
    });

    const intercatBodySliderSwiper = new Swiper(".intercat-body__slider", {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      freeMode: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
    });

    intercatNavigationSliderSwiper.controller.control = intercatBodySliderSwiper;

    // INTERCAT IFRAME
    const intercatBodySlides = document.querySelectorAll(".intercat-body__slide");

    if (intercatBodySlides) {
      const intercatIframeWrapper = document.querySelector(".intercat-iframe__wrapper");
      const intercatIframeCloseBtn = intercatIframeWrapper.querySelector(".intercat-iframe__close");
      const intercatIframe = intercatIframeWrapper.querySelector(".intercat-iframe");

      intercatBodySlides.forEach((slide) => {
        slide.addEventListener("click", (e) => {
          e.preventDefault();
          const iframeSrc = slide.getAttribute("href");

          intercatIframe.setAttribute("src", iframeSrc);
          intercatIframeWrapper.classList.add("_active");
        });
      });

      intercatIframeCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        intercatIframe.setAttribute("src", "");
        intercatIframeWrapper.classList.remove("_active");
      });
    }
  }

  // REVIEWS SLIDER ===============================================================================
  const reviewsSlider = document.querySelector(".reviews-slider");

  if (reviewsSlider) {
    new Swiper(reviewsSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 40,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".reviews-slider__nav > .swiper-button-next",
        prevEl: ".reviews-slider__nav > .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1600: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }

  // MAIN-NEWS TABS ===============================================================================
  const mainNewsItems = document.querySelectorAll(".main-news__item");

  if (mainNewsItems) {
    mainNewsItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const target = e.target;

        if (window.innerWidth >= 768) {
          if (target.closest(".main-news__item-img") || target.closest(".main-news__item-text")) {
            e.preventDefault();
          }

          mainNewsItems.forEach((el) => {
            el.classList.remove("_active");
          });

          item.classList.add("_active");
        }
      });
    });
  }

  // CATALOG FILTERS RESET ========================================================================
  const catalogFiltersItemResetBtns = document.querySelectorAll(".catalog-filters__item-reset");

  if (catalogFiltersItemResetBtns) {
    catalogFiltersItemResetBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const parent = btn.closest(".catalog-filters__item");
        const inputs = parent.querySelectorAll(".catalog-filters__list input");

        if (inputs) {
          for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "radio") {
              inputs[0].click();
              break;
            }

            if (inputs[i].type === "checkbox") {
              inputs[i].checked = false;
            }
          }

          sendCatalogFiltersForm();
        }
      });
    });
  }

  // CATALOG SIDEBAR SUBMIT ========================================================================
  // const catalogFilters = document.querySelector('.catalog-filters');
  //
  // if(catalogFilters) {
  //   catalogFilters.addEventListener('click', (e) => {
  //     const target = e.target;
  //     if(target && target.closest('.tippy-btn')) {
  //       e.preventDefault();
  //       sendCatalogFiltersForm();
  //     }
  //   });
  // }
  //
  // const catalogSidebarCheckInputs = document.querySelectorAll(".catalog-filters .check-input:not(.check-input--color), .catalog-filters .radio-input:not(.radio-input--color)");
  // if(catalogSidebarCheckInputs) {
  //   tippy('.catalog-filters .check-label:not(.check-label--color), .catalog-filters .radio-label:not(.radio-label--color)', {
  //     touch: false,
  //     hideOnClick: false,
  //     placement: 'right',
  //     interactive: true,
  //     allowHTML: true,
  //     content: '<button class="tippy-btn" type="button">Применить</button>',
  //   });
  //
  //   catalogSidebarCheckInputs.forEach((item) => {
  //     item.addEventListener('click', function(e) {
  //       e.stopPropagation();
  //     });
  //   });
  // }

  // CATALOG SIDEBAR SEND FORM ====================================================================
  function sendCatalogFiltersForm() {
    const submitBtn = document.querySelector(".psk-filter__button--apply");

    if (submitBtn) {
      setTimeout(() => {
        submitBtn.click();
      }, 50);
    }
  }

  // CATALOG SIDEBAR FILTERS SHOWMORE ==============================================================
  const catalogFiltersList = document.querySelectorAll(".catalog-filters__list");
  const catalogFiltersShowmoreBtn = document.querySelectorAll(".catalog-filters__showmore-btn");

  if (catalogFiltersList && catalogFiltersShowmoreBtn) {
    catalogFiltersList.forEach((list) => {
      const items = list.querySelectorAll("li");

      if (list.classList.contains("catalog-filters__list--colors") && items.length > 15) {
        list.classList.add("_filters-showmore-init");
      } else if (items.length > 4) {
        list.classList.add("_filters-showmore-init");
      }
    });

    catalogFiltersShowmoreBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("_active");
        btn.previousElementSibling.classList.toggle("_active");

        if (btn.classList.contains("_active")) {
          btn.textContent = "Скрыть";
        } else {
          btn.textContent = "Показать все";
          btn.previousElementSibling.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // CATALOG BODY VIEW TOGGLE =====================================================================
  const catalogBodyViewBtns = document.querySelectorAll(".catalog-body__view-btn");

  if (catalogBodyViewBtns) {
    const catalogList = document.querySelector(".catalog-list");

    catalogBodyViewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.classList.contains("_active")) {
          const catalogView = btn.dataset.catalogView;
          catalogBodyViewBtns.forEach((item) => item.classList.remove("_active"));
          btn.classList.add("_active");

          if (catalogView === "big") {
            catalogList.classList.add("catalog-list--big");
          } else {
            catalogList.classList.remove("catalog-list--big");
          }
        }
      });
    });
  }

  // CATALOG SIDEBAR MOBILE ======================================================================== 
  
  initSidebarMobile();
  

  // VIDEO SLIDER ==================================================================================
  const videoSlider = document.querySelector(".video-section__slider");

  if (videoSlider) {
    new Swiper(videoSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      speed: 600,
      freeMode: false,
      rewind: true,
      allowTouchMove: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".video-section__slider-nav > .swiper-button-next",
        prevEl: ".video-section__slider-nav > .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }

  // CARD SIDEBAR SIZES =============================================================================
  const cardSizesSidebar = document.querySelector(".card-sidebar.card-sidebar--sizes");
  const cardSizesBtnOpen = document.querySelector(".new-card__sizes-btn");

  if (cardSizesSidebar && cardSizesBtnOpen) {
    const cardSizesBtnClose = cardSizesSidebar.querySelectorAll("[data-sidebar-close]");

    cardSizesBtnOpen.addEventListener("click", () => {
      cardSizesSidebar.classList.add("_active");
      openOverlay();
    });

    cardSizesBtnClose.forEach(function (btn) {
      btn.addEventListener("click", () => {
        cardSizesSidebar.classList.remove("_active");
        closeOverlay();
      });
    });
  }
  //=================================================================================================

  // TEXT CLAMP =====================================================================================
  const maxLengthTexts = document.querySelectorAll("[data-text-max-rows]");
    textTruncate(maxLengthTexts);
  // }

  // TOOLTIPS TIPPY =================================================================================
  initTippyElements();  
 // PRODUCT CONTROLLS BTNS ACTIVE CLASS TOGGLE

 initProductControlsBtns();
 initCardControlsBtns(); 

  // TABS ===========================================================================================
  const tabs = document.querySelectorAll("[data-tabs]");

  if (tabs) {
    tabs.forEach(function (currentTabs) {
      let currentTabsBtns;
      let currentTabsItems;

      if (currentTabs.hasAttribute("data-tabs-inner")) {
        currentTabsBtns = currentTabs.querySelectorAll("[data-tabs-btn]");
        currentTabsItems = currentTabs.querySelectorAll("[data-tabs-item]");
      } else {
        currentTabsBtns = currentTabs.querySelectorAll("[data-tabs-btn]:not([data-tabs-btn-inner])");
        currentTabsItems = currentTabs.querySelectorAll("[data-tabs-item]:not([data-tabs-item-inner])");
      }

      currentTabs.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("[data-tabs-btn]")) {
          currentTabsBtns.forEach(function (tabBtn, i) {
            if (target.closest("[data-tabs-btn]") == tabBtn) {
              hideTabs(currentTabsBtns, currentTabsItems);
              showTabs(currentTabsBtns, currentTabsItems, i);
              scrollToActiveTab(currentTabsBtns, currentTabsItems, i);
            }
          });
        }
      });

      hideTabs(currentTabsBtns, currentTabsItems);
      showTabs(currentTabsBtns, currentTabsItems);
    });

    function hideTabs(tabBtns, tabItems) {
      tabItems.forEach(function (item) {
        item.classList.remove("_active");
      });

      tabBtns.forEach(function (item) {
        item.classList.remove("_active");
      });
    }

    function showTabs(tabBtns, tabItems) {
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      tabItems[i].classList.add("_active");
      tabBtns[i].classList.add("_active");
    }

    function scrollToActiveTab(tabBtns, tabItems) {
      let i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      const tabPosition = tabItems[i].getBoundingClientRect().top - window.innerHeight + tabItems[i].clientHeight;

      if (tabBtns[i].hasAttribute("data-tabs-btn-goto") && tabPosition > 0) {
        const scrollCoordY = tabPosition + window.scrollY;
        window.scrollTo({
          top: scrollCoordY,
          behavior: "smooth",
        });
      }
    }
  }
  //=================================================================================================

  // STAR RATING ====================================================================================
  // const starRating = document.querySelectorAll(".star-rating");

  // if (starRating) {
  //   starRating.forEach(function (currentStarRating) {
  //     const currentValue = currentStarRating.dataset.ratingValue;
  //     const currentValuePercent = currentValue / 0.05;

  //     currentStarRating.querySelector(".star-rating__result").style.width = currentValuePercent + "%";
  //   });
  // }

  // SHOWMORE =======================================================================================
  const showMore = document.querySelectorAll("[data-showmore]");

  if (showMore) {
    showMore.forEach((item) => {
      let initialHeight = item.dataset.showmore;

      if (initialHeight === "auto") {
        item.style.height = "0px";

        if (item.parentElement.offsetHeight >= item.scrollHeight) {
          item.removeAttribute("style");
          return;
        }

        initialHeight = item.parentElement.offsetHeight;
      }

      if (item.scrollHeight <= initialHeight) {
        return;
      } else {
        item.classList.add("_showmore-init");
      }

      if (item.dataset.showmoreAdaptive) {
        const showmoreSettings = item.dataset.showmoreAdaptive.split(",");
        if (window.matchMedia(`(max-width: ${showmoreSettings[0].trim()}px)`).matches) {
          initialHeight = showmoreSettings[1].trim();
        }
      }

      item.style.height = initialHeight + "px";

      const showmoreBtn = document.createElement("button");
      showmoreBtn.setAttribute("type", "button");
      showmoreBtn.classList.add("showmore-btn");
      showmoreBtn.textContent = "Показать полностью";
      item.append(showmoreBtn);

      showmoreBtn.addEventListener("click", () => {
        item.classList.toggle("_visible");

        if (item.classList.contains("_visible")) {
          item.style.height = item.scrollHeight + "px";
          showmoreBtn.textContent = "Скрыть";
        } else {
          item.style.height = initialHeight + "px";
          showmoreBtn.textContent = "Показать полностью";
        }
      });
    });
  }

  // FOOTER SHOWMORE ================================================================================
  const footerCatalogMenuLists = document.querySelectorAll(".footer-catalog__menu-list");

  if (footerCatalogMenuLists) {
    footerCatalogMenuLists.forEach((list) => {
      const items = list.querySelectorAll("li");

      if (items.length > 17) {
        const showmoreBtn = list.parentElement.querySelector(".footer-catalog__menu-showmore");
        list.classList.add("_footer-showmore-init");

        if (showmoreBtn) {
          /* console.log(showmoreBtn); */

          showmoreBtn.addEventListener("click", () => {
            showmoreBtn.classList.toggle("_active");

            if (showmoreBtn.classList.contains("_active")) {
              list.classList.add("_fsi-active");
              showmoreBtn.textContent = "Скрыть категории";
            } else {
              list.classList.remove("_fsi-active");
              showmoreBtn.textContent = "Показать все категории";
            }
          });
        }
      }
    });
  }

  // ACCORDEON ======================================================================================
  const accordeonsArray = document.querySelectorAll("[data-accordeon]");

  if (accordeonsArray) {
    const accordeonsRegular = Array.from(accordeonsArray).filter(function (item, index, self) {
      return !item.dataset.accordeon.split(",")[0];
    });

    if (accordeonsRegular.length > 0) {
      initAccordeons(accordeonsRegular);
    }

    const accordeonsMedia = Array.from(accordeonsArray).filter(function (item, index, self) {
      return item.dataset.accordeon.split(",")[0];
    });

    if (accordeonsMedia.length > 0) {
      const breakpointsArray = [];

      accordeonsMedia.forEach(function (item) {
        const params = item.dataset.accordeon;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });

      let mediaQueries = breakpointsArray.map(function (item) {
        return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      mediaQueries.forEach(function (breakpoint) {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        const accordeonsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });

        matchMedia.addListener(function () {
          initAccordeons(accordeonsArray, matchMedia);
        });
        initAccordeons(accordeonsArray, matchMedia);
      });
    }

    function initAccordeons(accordeonsArray) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      accordeonsArray.forEach(function (accordeon) {
        accordeon = matchMedia ? accordeon.item : accordeon;

        if (matchMedia.matches || !matchMedia) {
          accordeon.classList.add("_init");
          initAccordeonsBody(accordeon);
          accordeon.addEventListener("click", setAccordeonAction);
        } else {
          accordeon.classList.remove("_init");
          initAccordeonsBody(accordeon, false);
          accordeon.removeEventListener("click", setAccordeonAction);
        }
      });
    }

    function initAccordeonsBody(accordeon) {
      let hideAccordeonBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const accordeonBtns = accordeon.querySelectorAll("[data-accordeon-btn]");

      if (accordeonBtns.length > 0) {
        accordeonBtns.forEach(function (accordeonBtn) {
          if (hideAccordeonBody) {
            accordeonBtn.removeAttribute("tabindex");
            if (!accordeonBtn.classList.contains("_active")) {
              accordeonBtn.nextElementSibling.hidden = true;
            }
          } else {
            accordeonBtn.setAttribute("tabindex", "-1");
            accordeonBtn.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setAccordeonAction(e) {
      const el = e.target;

      if (el && el.closest("[data-accordeon-btn]")) {
        const accordeonBtn = el.hasAttribute("data-accordeon-btn") ? el : el.closest("[data-accordeon-btn]");
        const accordeon = accordeonBtn.closest("[data-accordeon]");
        const oneItemActive = accordeon.hasAttribute("data-accordeon-one-active") ? true : false;

        if (!accordeon.querySelectorAll(".is-sliding").length) {
          if (oneItemActive && !accordeonBtn.classList.contains("_active")) {
            hideAccordeonContent(accordeon);
          }
          accordeonBtn.classList.toggle("_active");
          slideToggle(accordeonBtn.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    }

    function hideAccordeonContent(accordeon) {
      const accordeonActiveBtn = accordeon.querySelector("[data-accordeon-btn]._active");

      if (accordeonActiveBtn) {
        accordeonActiveBtn.classList.remove("_active");
        slideUp(accordeonActiveBtn.nextElementSibling, 500);
      }
    }
  }

  // SLIDE - down, up, toggle =======================================================================
  function slideUp(target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (!target.classList.contains("is-sliding")) {
      target.classList.add("is-sliding");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(function () {
        target.hidden = true;
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");

        target.classList.remove("is-sliding");
      }, duration);
    }
  }

  function slideDown(target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (!target.classList.contains("is-sliding")) {
      target.classList.add("is-sliding");

      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(function () {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");

        target.classList.remove("is-sliding");
      }, duration);
    }
  }

  function slideToggle(target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
    if (target.hidden) {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  }

  // CUSTOM SELECT ==================================================================================
  initCustomSelect();

  //=================================================================================================

  // QUANTITY COUNTER ==============================================================================
  function quantityCounter() {
    const quantityCounters = document.querySelectorAll(".quantity-counter:not(.no-count)");

    if (quantityCounters) {
      quantityCounters.forEach(function (quantityCounter) {
        const currentCounterInput = quantityCounter.querySelector(".quantity-counter__input");
        const currentMinusBtn = quantityCounter.querySelector(".quantity-counter__btn--minus");
        const currentPlusBtn = quantityCounter.querySelector(".quantity-counter__btn--plus");
        const currentClearBtn = quantityCounter.querySelector(".quantity-counter__btn--clear");

        currentPlusBtn.addEventListener("click", function () {
          if (currentCounterInput.value < 9999 && currentCounterInput.value >= 0) {
            this.classList.remove("_disabled");
            currentMinusBtn.classList.remove("_disabled");
            currentCounterInput.value = ++currentCounterInput.value;
            currentCounterInput.dispatchEvent(new Event("change"));
          } else {
            this.classList.add("_disabled");
          }
        });

        currentMinusBtn.addEventListener("click", function () {
          if (currentCounterInput.value > 0 && currentCounterInput.value <= 9999) {
            this.classList.remove("_disabled");
            currentPlusBtn.classList.remove("_disabled");
            currentCounterInput.value = --currentCounterInput.value;
            currentCounterInput.dispatchEvent(new Event("change"));
          } else {
            this.classList.add("_disabled");
          }
        });

        if (currentClearBtn) {
          currentClearBtn.addEventListener("click", function () {
            currentMinusBtn.classList.remove("_disabled");
            currentPlusBtn.classList.remove("_disabled");
            currentCounterInput.value = 0;
            currentCounterInput.dispatchEvent(new Event("change"));
          });
        }
      });
    }
  }
  quantityCounter();
  //=================================================================================================

  // FANCYBOX ======================================================================================
  $("[data-fancybox]").fancybox({
    backFocus: false,
  });

  // DYNAMIC ADAPTIVE ==============================================================================
  (function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll("[data-da]");
    let daElementsArray = [];
    let daMatchMedia = [];

    if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
        const daElement = daElements[index];
        const daMove = daElement.getAttribute("data-da");
        if (daMove != "") {
          const daArray = daMove.split(",");
          const daPlace = daArray[1] ? daArray[1].trim() : "last";
          const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
          const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
          const daDestination = document.querySelector("." + daArray[0].trim());
          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute("data-da-index", number);
            originalPositions[number] = {
              parent: daElement.parentNode,
              index: indexInParent(daElement),
            };

            daElementsArray[number] = {
              element: daElement,
              destination: document.querySelector("." + daArray[0].trim()),
              place: daPlace,
              breakpoint: daBreakpoint,
              type: daType,
            };
            number++;
          }
        }
      }
      dynamicAdaptSort(daElementsArray);

      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daBreakpoint = el.breakpoint;
        const daType = el.type;

        daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
        daMatchMedia[index].addListener(dynamicAdapt);
      }
    }

    function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daElement = el.element;
        const daDestination = el.destination;
        const daPlace = el.place;
        const daBreakpoint = el.breakpoint;
        const daClassname = "_dynamic_adapt_" + daBreakpoint;

        if (daMatchMedia[index].matches) {
          if (!daElement.classList.contains(daClassname)) {
            let actualIndex = indexOfElements(daDestination)[daPlace];
            if (daPlace === "first") {
              actualIndex = indexOfElements(daDestination)[0];
            } else if (daPlace === "last") {
              actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
            }
            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
            daElement.classList.add(daClassname);
          }
        } else {
          if (daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(daElement);
            daElement.classList.remove(daClassname);
          }
        }
      }
      customAdapt();
    }

    dynamicAdapt();

    function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute("data-da-index");
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace["parent"];
      const indexPlace = originalPlace["index"];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }

    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    }

    function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
        const childrenElement = children[i];
        if (back) {
          childrenArray.push(i);
        } else {
          if (childrenElement.getAttribute("data-da") == null) {
            childrenArray.push(i);
          }
        }
      }
      return childrenArray;
    }

    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) {
          return -1;
        } else {
          return 1;
        }
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    //Дополнительные сценарии адаптации
    function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  })();

  /***********************************************/
  const header = document.querySelector(".header");

  if (header) {
    let winScrolled = window.pageYOffset;

    if (winScrolled > 80) {
      header.classList.add("_scrolled");
    }

    window.addEventListener("scroll", function () {
      const curWinScrolled = window.pageYOffset;

      if (curWinScrolled - winScrolled >= 0 && curWinScrolled > 80) {
        header.classList.add("_scrolled");
      } else {
        header.classList.remove("_scrolled");
      }

      winScrolled = curWinScrolled;
    });
  }

  // GO TO ANCHOR ===================================================================================
  const gotoLinks = document.querySelectorAll("[data-goto]");

  if (gotoLinks.length > 0) {
    gotoLinks.forEach((gotoLink) => {
      gotoLink.addEventListener("click", onGoToLinkClick);
    });

    function onGoToLinkClick(e) {
      e.preventDefault();

      if (this.dataset.goto && document.querySelector(this.dataset.goto)) {
        const gotoBlock = document.querySelector(this.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".header").offsetHeight;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
      }
    }
  }

  // TABS SLIDER ====================================================================================
  const tabsSliders = document.querySelectorAll(".tabs-slider");

  if (tabsSliders) {
    tabsSliders.forEach((slider) => {
      initTabsSlider(slider);
    });
  }



  // LOGOS SLIDER ===================================================================================
  const logosSlider = document.querySelector(".logos-slider");

  if (logosSlider) {
    new Swiper(logosSlider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 8,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      loop: true,
      //rwind: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: true,
      maxBackfaceHiddenSlides: 20,
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        576: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1640: {
          slidesPerView: 8,
          spaceBetween: 10,
        },
      },
    });
  }

  // CARD SLIDER ====================================================================================
  const cardSliderMain = document.querySelector(".card-slider__main");
  const cardSliderThumbs = document.querySelector(".card-slider__thumbs");

  if (cardSliderMain && cardSliderThumbs) {
    const initialCardSlides = cardSliderMain.querySelectorAll(".card-slider__img");

    const cardSliderMainSwiper = new Swiper(cardSliderMain, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      preloadImages: true,
      initialSlide: 1,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      loop: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
    });

    const cardSliderThumbsSwiper = new Swiper(cardSliderThumbs, {
      slideToClickedSlide: true,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      initialSlide: 1,
      spaceBetween: 30,
      slidesPerView: 3,
      speed: 600,
      centeredSlides: true,
      freeMode: false,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    cardSliderThumbsSwiper.controller.control = cardSliderMainSwiper;
    cardSliderMainSwiper.controller.control = cardSliderThumbsSwiper;

    cardSliderMain.querySelectorAll(".card-slider__img").forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const slide = item.closest("[data-swiper-slide-index]");
        let slideIndex = index;

        if (slide) {
          slideIndex = Number(slide.dataset.swiperSlideIndex);
        }

        $.fancybox.open(
          initialCardSlides,
          {
            backFocus: false,
          },
          slideIndex
        );
      });
    });
  }

  // CARD CONTENT SLIDER ============================================================================
  const cardContentSliders = document.querySelectorAll(".card-content__slider");

  if (cardContentSliders) {
    cardContentSliders.forEach((slider) => {
      initCardContentSlider(slider);
    });
  }

  function initCardContentSlider(slider) {
    const wrapper = slider.closest(".card-content__slider-wrapper");
    const btnPrev = wrapper.querySelector(".swiper-button-prev");
    const btnNext = wrapper.querySelector(".swiper-button-next");

    new Swiper(slider, {
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      watchOverflow: true,
      lazy: false,
      preloadImages: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 10,
      speed: 600,
      freeMode: false,
      allowTouchMove: true,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
        },
        1200: {
          slidesPerView: 5,
        },
        1401: {
          slidesPerView: 4,
        },
      },
    });
  }

  // CARD SIDEBAR CHECKED PRODUCTS ==================================================================
  const cardSidebarSizeCounters = document.querySelectorAll(".card-sidebar__size .quantity-counter__input");
  const cardSidebarResultText = document.querySelector(".card-sidebar__result-text > span");

  if (cardSidebarSizeCounters.length) {
    cardSidebarSizeCounters.forEach(function (counter) {
      counter.addEventListener("change", setCheckedProductsQuantity);
    });

    function setCheckedProductsQuantity() {
      let quantity = 0;

      cardSidebarSizeCounters.forEach(function (counter) {
        if (counter.value > 0) {
          quantity += 1;
        }
      });

      cardSidebarResultText.textContent = quantity + " " + declOfNum(Number(quantity), ["предмет", "предмета", "предметов"]);
    }

    function declOfNum(number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    }
  }

  // FILTER =========================================================================================
  const filters = document.querySelectorAll("[data-filter]");

  if (filters) {
    filters.forEach(function (currentFilter) {
      const currentFilterBtns = currentFilter.querySelectorAll("[data-filter-btn]");
      const currentFilterItems = currentFilter.querySelectorAll("[data-filter-item]");

      currentFilter.addEventListener("click", function (e) {
        const target = e.target;

        if (target && target.closest("[data-filter-btn]:not(._active)")) {
          currentFilterBtns.forEach(function (currentBtn) {
            currentBtn.classList.remove("_active");

            if (target.closest("[data-filter-btn]") == currentBtn) {
              const dataFilter = currentBtn.dataset.filterBtn;
              currentBtn.classList.add("_active");
              filterItems(currentFilterItems, dataFilter);
            }
          });
        }
      });
    });

    function filterItems(items, filter) {
      items.forEach(function (item) {
        if (item.dataset.filterItem === filter) {
          item.classList.add("_active");
        } else {
          item.classList.remove("_active");
        }
      });
    }
  }

  // FORM FILE ======================================================================================
  const fileInputs = document.querySelectorAll(".form-input__file");

  if (fileInputs.length) {
    fileInputs.forEach(function (input) {
      input.addEventListener("change", function (e) {
        const fileNameElement = input.nextElementSibling;
        fileNameElement.textContent = input.files[0].name;
      });
    });
  }
  
  $(document).off('click').on('click', '.banner__floating-close', function () {
    $('.banner-container').hide();

    localStorage.setItem('bannerCloseTime', Date.now());
});
  
});

$(document).ready(function () {
      
  let closeTime = localStorage.getItem('bannerCloseTime');
  if(!closeTime){
    let banner = document.querySelector('.banner-container');
    if(banner){
      banner.style.display = 'block';
    }
    
  }
  if(closeTime && ((Date.now() - closeTime) > 4*60*1000 )) {
      localStorage.removeItem('bannerCloseTime');
      document.querySelector('.banner-container').style.display = 'block';        
    
  }

 
})


function initProductControlsBtns(){
  const productControlsBtns = document.querySelectorAll(".product-controls__btn");
  if (productControlsBtns) {
    productControlsBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.classList.toggle("_active");
      });
    });
  }
}

function initCardControlsBtns(){
  const cardControlsBtns = document.querySelectorAll(".card-controls__btn");
  if (cardControlsBtns) {
    cardControlsBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("_active");
      });
    });
  }
}

function textTruncate(elements) {
  if(elements.length) {
    elements.forEach((element) => {
      const maxRows = Number(element.dataset.textMaxRows);
      $clamp(element, {clamp: maxRows});
    });
  }
}

function initTippyElements(){
  const tippyElements = document.querySelectorAll("[data-tippy-content-default]");

  if (tippyElements) {
    tippyElements.forEach((element) => {
      tippy(element, {
        touch: false,
        hideOnClick: false,
        placement: "right",
        onTrigger(instance, event) {
          const trigger = event.target;
          toggleTippyContent(trigger);
          trigger.addEventListener("click", tippyTriggerListener);
        },
        onUntrigger(instance, event) {
          const trigger = event.target;
          trigger.removeEventListener("click", tippyTriggerListener);
        },
      });
    });
  }
}


function tippyTriggerListener(e) {
  const trigger = e.target.closest("[data-tippy-content-default]");

  if (trigger) {
    toggleTippyContent(trigger);
  }
}

function toggleTippyContent(trigger) {
  if (trigger.classList.contains("_active") && trigger.dataset.tippyContentActive) {
    trigger._tippy.setContent(trigger.dataset.tippyContentActive);
  } else if (trigger.dataset.tippyContentDefault) {
    trigger._tippy.setContent(trigger.dataset.tippyContentDefault);
  }
}

function initCustomSelect() {
  const customSelects = document.querySelectorAll("select[data-custom-select]:not(.on-selected)");

  if (customSelects && !isMobile.any()) {
   
    if ($(".custom-select").length > 0)
    {
      return;
    }
    
    createCustomSelect();

    $(".custom-select").on('click', function (e) {
      const target = e.target;     
      if (target && target.closest(".custom-select")) {
        const currentCustomSelect = target.closest(".custom-select");

        if (currentCustomSelect.classList.contains("_open")) {
          if (target.closest(".custom-select__option")) {
            const currentCustomOption = target.querySelector("span");
            const parent = currentCustomOption.closest(".custom-select__wrapper");
            const currentRealSelect = parent.querySelector("select");
            const currentCustomLabel = parent.querySelector(".custom-select__label");

            currentRealSelect.value = currentCustomOption.parentElement.dataset.value;
            currentRealSelect.dispatchEvent(new Event('change'));
            currentCustomLabel.innerHTML = currentCustomOption.innerHTML;

            parent.querySelectorAll(".custom-select__option").forEach((item) => {
              item.classList.remove("_active");
            });

            target.classList.add("_active");
          }

          currentCustomSelect.classList.remove("_open");
        } else {
          currentCustomSelect.classList.add("_open");
        }
      } else {
        const activeCustomSelect = document.querySelectorAll(".custom-select._open");

        if (activeCustomSelect.length) {
          for (let i = 0; i < activeCustomSelect.length; i++) {
            activeCustomSelect[i].classList.remove("_open");
          }
        }
      }
    });

    /* document.addEventListener("click", function (e) {
      const target = e.target;
      console.log(target);     

      if (target && target.closest(".custom-select")) {
        const currentCustomSelect = target.closest(".custom-select");

        if (currentCustomSelect.classList.contains("_open")) {
          if (target.closest(".custom-select__option")) {
            const currentCustomOption = target.querySelector("span");
            const parent = currentCustomOption.closest(".custom-select__wrapper");
            const currentRealSelect = parent.querySelector("select");
            const currentCustomLabel = parent.querySelector(".custom-select__label");

            currentRealSelect.value = currentCustomOption.parentElement.dataset.value;
            currentRealSelect.dispatchEvent(new Event('change'));
            currentCustomLabel.innerHTML = currentCustomOption.innerHTML;

            parent.querySelectorAll(".custom-select__option").forEach((item) => {
              item.classList.remove("_active");
            });

            target.classList.add("_active");
          }

          currentCustomSelect.classList.remove("_open");
        } else {
          currentCustomSelect.classList.add("_open");
        }
      } else {
        const activeCustomSelect = document.querySelectorAll(".custom-select._open");

        if (activeCustomSelect.length) {
          for (let i = 0; i < activeCustomSelect.length; i++) {
            activeCustomSelect[i].classList.remove("_open");
          }
        }
      }
    }); */
  }   

  function createCustomSelect() {
    for (var i = 0; i < customSelects.length; i++) {
      const currentSelect = customSelects[i];
      const selectedOption = currentSelect.querySelector("option[selected]");
      const selectOptions = currentSelect.querySelectorAll("option");
      const selectedOptionName = selectedOption.textContent;

      currentSelect.style.display = "none";
      currentSelect.classList.add("on-selected");

      const selectWrapper = document.createElement("div");
      selectWrapper.className = "custom-select__wrapper";
      currentSelect.after(selectWrapper);
      selectWrapper.appendChild(currentSelect);

      const customSelect = document.createElement("div");
      customSelect.className = "custom-select";
      customSelect.insertAdjacentHTML("afterbegin", '<span class="custom-select__label">' + selectedOptionName + "</span>");
      selectWrapper.appendChild(customSelect);

      const customSelectList = document.createElement("ul");
      customSelectList.className = "custom-select__list";
      customSelect.appendChild(customSelectList);

      for (let j = 0; j < selectOptions.length; j++) {
        const customSelectOption = document.createElement("li");
        const customSelectOptionName = selectOptions[j].textContent;

        customSelectOption.className = "custom-select__option";
        if (selectOptions[j].selected) {
          customSelectOption.classList.add("_active");
        }
        customSelectOption.insertAdjacentHTML("afterbegin", "<span>" + customSelectOptionName + "</span>");
        customSelectOption.dataset.value = selectOptions[j].value;
        customSelectList.appendChild(customSelectOption);
      }
    }
  }
}




// LAZYLOAD ========================================================================================
window.addEventListener("load", function () {
  if ("loading" in HTMLImageElement.prototype) {
    const lozadImgs = document.querySelectorAll(".lozad");
    if (lozadImgs) {
      lozadImgs.forEach((img) => img.classList.add("lozad_loaded"));
    }
  } else {
    const script = document.createElement("script");
    script.src = "js/libs/lozad.min.js";
    script.onload = initLozad;
    document.body.appendChild(script);
  }

  function initLozad() {
    /* console.log("Lozad - init"); */
    const observer = lozad(".lozad", {
      loaded: function (el) {
        el.classList.add("lozad_loaded");
      },
    });
    observer.observe();
  }
});

// INIT FUNCTIONS ===================================================================================
function initProductImagesSlider() {
  const products = document.querySelectorAll(".product");

  if (products) {
    products.forEach((product) => {
      const productImages = product.querySelectorAll(".product-img");

      if (productImages.length > 1 && !product.classList.contains("_images-slider-initialized")) {
        product.classList.add("_images-slider-initialized");

        createProductImagesSliderNavigation(product, productImages.length, ".product-img__bullets");
        createProductImagesSliderNavigation(product, productImages.length, ".product-img__controls");
        startProductImagesSliderNavigation(product, productImages);
      }
    });
  }

  function createProductImagesSliderNavigation(currentProduct, imagesQuantity, navParentSelector) {
    const navParent = currentProduct.querySelector(navParentSelector);

    for (let i = 0; i < imagesQuantity; i++) {
      const navItem = document.createElement("li");
      if (i === 0) {
        navItem.classList.add("_active");
      }
      navParent.append(navItem);
    }
  }

  function startProductImagesSliderNavigation(product, productImages) {
    const itemImgControls = product.querySelector(".product-img__controls");
    const itemImgBulletsItems = product.querySelectorAll(".product-img__bullets > li");

    itemImgControls.querySelectorAll("li").forEach((listItem, index) => {
      listItem.addEventListener("mouseenter", () => {
        toggleProductImagesSliderItemActiveClass(productImages, index);
        toggleProductImagesSliderItemActiveClass(itemImgBulletsItems, index);
      });
    });

    product.addEventListener("mouseleave", () => {
      toggleProductImagesSliderItemActiveClass(productImages, 0);
      toggleProductImagesSliderItemActiveClass(itemImgBulletsItems, 0);
    });
  }

  function toggleProductImagesSliderItemActiveClass(itemsArr) {
    let currentIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    itemsArr.forEach((item) => item.classList.remove("_active"));
    itemsArr[currentIndex].classList.add("_active");
  }
}

function initTabsSlider(slider) {
  new Swiper(slider, {
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    watchOverflow: true,
    lazy: false,
    preloadImages: true,
    initialSlide: 0,
    slidesPerView: "auto",
    spaceBetween: 0,
    speed: 600,
    freeMode: false,
    allowTouchMove: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: "auto",
      },
    },
    on: {
      init: function () {
        this.slides.forEach((item, index) => {
          if (item.classList.contains("_active")) {
            this.slideTo(index);
          }
        });
      },
    },
  });
}

function initSidebarMobile(){
  const catalogSidebar = document.querySelector(".catalog-sidebar");

  if (catalogSidebar) {
    const catalogFilterTrigger = document.querySelector(".catalog-filter__trigger");
    const catalogSidebarCloseBtn = catalogSidebar.querySelector(".catalog-sidebar__close");

    if (catalogFilterTrigger) { // добавил
      catalogFilterTrigger.addEventListener("click", () => {
        catalogSidebar.classList.add("_active");
        openOverlay();
      });
    }
    
    if (catalogSidebarCloseBtn) { // добавил
      catalogSidebarCloseBtn.addEventListener("click", () => {
        catalogSidebar.classList.remove("_active");
        closeOverlay();
      });
    }
  }
}

// OVERLAY ======================================================================================
const overlay = document.querySelector("#psk-overlay2");

if (overlay) {
  overlay.addEventListener("click", () => {
    const activeModals = document.querySelectorAll("[data-overlay]._active");
    console.log(activeModals);

    if (activeModals) {
      activeModals.forEach((item) => {
        item.classList.remove("_active");
        item.classList.remove("_active-submenu");
      });
      closeOverlay();
    }
  });
}

function openOverlay() {
  overlay.classList.add("_active");
  bodyLock(200);
}

function closeOverlay() {
  overlay.classList.remove("_active");
  bodyUnlock(200);
}

const card_sidebar__close = document.querySelector(".card-sidebar__close");

if (card_sidebar__close) {
  card_sidebar__close.addEventListener("click", () => {
    const activeModals = document.querySelectorAll("[data-overlay]._active");

    if (activeModals) {
      activeModals.forEach((item) => {
        item.classList.remove("_active");
        item.classList.remove("_active-submenu");
      });
      closeOverlay();
    }
  });
}


function initShowResult(){

  const show_result = document.querySelector(".catalog-filters__bottom--mobile");
  const catalog_button = document.querySelector(".catalog-filter__trigger");

  if(catalog_button){
    const catalog_button_style = window.getComputedStyle(catalog_button);
    if(catalog_button_style.display == "block"){
      if(show_result.style.display == "none"){
        show_result.style.display = 'block';
        show_result.focus();
      }
      /* show_result.focus(); */
    }
   
  }


  if(show_result){
    show_result.addEventListener("click", ()=>{
      const activeModals = document.querySelectorAll("[data-overlay]._active");

      if (activeModals) {
        activeModals.forEach((item) => {
          item.classList.remove("_active");
          item.classList.remove("_active-submenu");
        });
        closeOverlay();
      }
    })
  }

}



// BODY lock/unlock =============================================================================
const body = document.querySelector("body");
const paddingFix = document.querySelectorAll("[data-padding-fix]");
let bodyLockStatus = true;

function bodyLock() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  const paddingFixValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (paddingFix.length > 0) {
    for (let i = 0; i < paddingFix.length; i++) {
      paddingFix[i].style.paddingRight = paddingFixValue;
    }
  }

  body.style.paddingRight = paddingFixValue;
  body.classList.add("_locked");

  bodyLockStatus = false;
  setTimeout(function () {
    bodyLockStatus = true;
  }, delay);
}

function bodyUnlock() {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
  setTimeout(() => {
    if (paddingFix.length > 0) {
      for (let i = 0; i < paddingFix.length; i++) {
        paddingFix[i].style.paddingRight = "0px";
      }
    }

    body.style.paddingRight = "0px";
    body.classList.remove("_locked");
  }, delay);

  bodyLockStatus = false;
  setTimeout(function () {
    bodyLockStatus = true;
  }, delay);
}

$(document).ready(function() {
  // Обрабатываем клик на элемент с классом icon-play-video
  $('.icon-play-video a').off('click').on('click', function(e) {
      e.preventDefault(); // Предотвращаем переход по ссылке

      // Получаем ID элемента, на который ссылается href
      var link = $(this).attr('href');
      var videoObject = $(link);
      var videoLink = videoObject.attr('href');      

      // Плавный скролл к элементу с ID video_o-company
      $('html, body').animate({
          scrollTop: videoObject.offset().top
      }, 800, function() {
          // Проверяем, открыт ли Fancybox уже
          if (!$.fancybox.getInstance()) {
              // Открываем Fancybox только если он еще не открыт
              videoObject.trigger('click');
          }
      });
  });

  $('.icon-play-video_innovation a').off('click').on('click', function(e) {
    e.preventDefault(); // Предотвращаем переход по ссылке

    // Получаем ID элемента, на который ссылается href
    var link = $(this).attr('href');
    var videoObject = $(link);
    var videoLink = videoObject.attr('href');      

    // Плавный скролл к элементу с ID video_o-company
    $('html, body').animate({
        scrollTop: videoObject.offset().top
    }, 800, function() {
        // Проверяем, открыт ли Fancybox уже
        if (!$.fancybox.getInstance()) {
            // Открываем Fancybox только если он еще не открыт
            videoObject.trigger('click');
        }
    });
});

  // Обрабатываем событие открытия Fancybox по клику на оригинальный элемент с data-fancybox
  $('[data-fancybox]').fancybox({
      afterShow: function(instance, current) {
          // Находим видео внутри открытого Fancybox
          var video = current.$content.find('video')[0];
          if (video) {
              video.play(); // Автоматически запускаем видео
          }
      },
      afterClose: function(instance, current) {
          // Останавливаем видео при закрытии
          var video = current.$content.find('video')[0];
          if (video) {
              video.pause();
              video.currentTime = 0;
          }
      }
  });
});




 

/* End */
;; /* /bitrix/components/arturgolubev/search.title/script.min.js?17442686666313*/
; /* /local/templates/psk2024/components/bitrix/news.list/chose-city/script.js?1721897333824*/
; /* /local/templates/psk2024/js/libs/swiper.min.js?1687254891143661*/
; /* /local/templates/psk2024/js/libs/jquery.suggestions.min.js?172404917958245*/
; /* /local/templates/psk2024/js/libs/tippy.umd.min.js?168725489144127*/
; /* /local/templates/psk2024/js/libs/clamp.min.js?16872548912494*/
; /* /local/templates/psk2024/js/libs/jquery.fancybox.min.js?163486004968253*/
; /* /local/templates/psk2024/js/jquery.maskedinput.min.js?14848398654805*/
; /* /local/templates/psk2024/js/custom.js?175224151661304*/
; /* /local/templates/psk2024/js/main.js?175076888779881*/
