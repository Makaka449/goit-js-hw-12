import{a as h,S as g,i as a}from"./assets/vendor-f736e62a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function m(o,r){const s="43280076-efaf032a147c4a401dc5ab87e",n="https://pixabay.com/api/";return(await h.get(n,{params:{key:s,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const y=new g(".gallery a",{nav:!0,captions:!0,captionsData:"alt",captionDelay:150}),p=document.querySelector(".search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),d=document.querySelector(".load-btn");let i="",u;p.addEventListener("submit",b);d.addEventListener("click",L);async function b(o){if(o.preventDefault(),u=1,c.innerHTML="",i=p.elements.searchWord.value.trim(),d.style.display="block",i===""){a.error({message:"Please enter a search keyword"});return}l.style.display="block";try{const r=await m(i,u),s=renderMarcup(r);r.hits.length===0?(a.warning({message:"No images found for your search query"}),d.style.display="none"):(c.insertAdjacentHTML("beforeend",s),y.refresh())}catch(r){console.error("Error:",r),a.error({message:"An error occurred while fetching images"})}finally{l.style.display="none"}p.reset()}async function L(){u+=1,l.style.display="block";try{const o=await m(i,u),r=renderMarcup(o);c.insertAdjacentHTML("beforeend",r),y.refresh();const s=c.getBoundingClientRect().height;window.scrollBy({top:2*s,behavior:"smooth"}),o.hits.length<=14&&(d.style.display="none",a.info({message:"End of the list"}),y.refresh())}catch(o){console.error("Error:",o)}finally{l.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
