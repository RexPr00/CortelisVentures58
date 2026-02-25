const body=document.body;
const langWrap=document.querySelector('.lang-wrap');
const trigger=document.querySelector('.lang-trigger');
if(trigger){trigger.addEventListener('click',()=>{langWrap.classList.toggle('open');trigger.setAttribute('aria-expanded',langWrap.classList.contains('open'));});document.addEventListener('click',e=>{if(!langWrap.contains(e.target))langWrap.classList.remove('open');});}
const burger=document.querySelector('.burger');const drawer=document.querySelector('.mobile-drawer');const closeBtn=document.querySelector('.drawer-close');
let focusables=[];let idx=0;
function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');body.classList.add('no-scroll');focusables=[...drawer.querySelectorAll('a,button')];focusables[0]?.focus();}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');body.classList.remove('no-scroll');burger?.focus();}
burger?.addEventListener('click',openDrawer);closeBtn?.addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeModal();}if(drawer.classList.contains('open')&&e.key==='Tab'&&focusables.length){e.preventDefault();idx=(idx+(e.shiftKey?-1:1)+focusables.length)%focusables.length;focusables[idx].focus();}});
document.addEventListener('click',e=>{if(drawer.classList.contains('open')&&!drawer.contains(e.target)&&e.target!==burger)closeDrawer();});
const month=document.getElementById('months');const pill=document.querySelector('.month-pill');const seg=[...document.querySelectorAll('.segmented button')];
let amt=150000;
const locale=body.dataset.locale||'en-US';const currency=body.dataset.currency||'USD';
const fmt=n=>new Intl.NumberFormat(locale,{style:'currency',currency,maximumFractionDigits:0}).format(n);
seg.forEach(b=>{b.textContent=fmt(+b.dataset.amount);b.addEventListener('click',()=>{seg.forEach(x=>x.classList.remove('active'));b.classList.add('active');amt=+b.dataset.amount;updateCalc();});});
function updateCalc(){if(!month)return;const m=+month.value;pill.textContent=`${m} months`;const low=amt*Math.pow(1.08,m),base=amt*Math.pow(1.115,m),high=amt*Math.pow(1.15,m);document.querySelector('.low').textContent=fmt(Math.round(low));document.querySelector('.base').textContent=fmt(Math.round(base));document.querySelector('.high').textContent=fmt(Math.round(high));}
month?.addEventListener('input',updateCalc);updateCalc();
const faq=[...document.querySelectorAll('.faq-item')];faq.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)faq.forEach(other=>other!==item&&(other.open=false));}));
const modal=document.querySelector('.modal');const mOpen=document.querySelector('.privacy-link');const mClose=[...document.querySelectorAll('.modal-x,.close-modal')];
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.classList.add('no-scroll');modal.querySelector('.modal-x')?.focus();}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');body.classList.remove('no-scroll');}
mOpen?.addEventListener('click',openModal);mClose.forEach(b=>b.addEventListener('click',closeModal));modal?.addEventListener('click',e=>{if(e.target===modal)closeModal();});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.2});document.querySelectorAll('.review-card,.kpi-strip article,.timeline li').forEach(el=>{el.classList.add('reveal');io.observe(el)});
