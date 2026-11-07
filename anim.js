(()=>{
const D=document,R=D.documentElement,$=(s,r=D)=>[...r.querySelectorAll(s)],
red=matchMedia('(prefers-reduced-motion:reduce)').matches,
fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const sp=D.createElement('div');sp.className='sp';D.body.prepend(sp);
const whenReady=cb=>{if(!R.classList.contains('loading'))return cb();
new MutationObserver((m,o)=>{if(!R.classList.contains('loading')){o.disconnect();cb()}}).observe(R,{attributes:true})};
const tl=$('.tl')[0],pars=$('.pgbg img,.shows-bg img');let tick=0;
const upd=()=>{tick=0;const h=D.documentElement.scrollHeight-innerHeight;
sp.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
if(!red)pars.forEach(i=>{const r=i.parentElement.getBoundingClientRect();i.style.transform='translate3d(0,'+((r.top+r.height/2-innerHeight/2)*-.12)+'px,0) scale(1.2)'});
if(tl){const r=tl.getBoundingClientRect();tl.style.setProperty('--prog',Math.max(0,Math.min(1,(innerHeight*.65-r.top)/r.height)))}};
addEventListener('scroll',()=>{if(!tick){tick=1;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
if(red)return;
R.classList.add('js-anim');
$('h1').forEach(h=>{if(h.children.length)return;const t=h.textContent.trim();h.setAttribute('aria-label',t);
h.innerHTML=t.split(/\s+/).map((w,i)=>'<span class="w" aria-hidden="true"><span style="--i:'+i+'">'+w.replace(/&/g,'&amp;')+'</span></span>').join(' ');
whenReady(()=>requestAnimationFrame(()=>h.classList.add('vis')))});
const els=$('main .lead,.form,.help,form label,.send,.grp h2,#shows h2,#stage h2,.show,.bento img,.p,.yrh,.bars').filter(e=>!e.closest('.hero'));
const idx=new Map();
els.forEach(e=>{e.classList.add(e.matches('.bars')?'rb':'rv');const p=e.parentElement,n=idx.get(p)||0;idx.set(p,n+1);e.style.setProperty('--d',(n%6)*.08+'s')});
const count=t=>{const y=+t.dataset.y,s=y-14,t0=performance.now(),f=n=>{const k=Math.min(1,(n-t0)/1200);t.textContent=Math.round(s+(y-s)*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;io.unobserve(t);
t.classList.add('vis');if(t.dataset.y)count(t);setTimeout(()=>t.classList.remove('rv','rb','vis'),2400)}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(e=>io.observe(e));
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io2.unobserve(e.target);
e.target.classList.add('vis');setTimeout(()=>e.target.classList.add('done'),1500)}),{threshold:.25,rootMargin:'0px 0px -8% 0px'});
$('.ev').forEach(e=>io2.observe(e));
if(fine){const g=D.createElement('div');g.className='glow';D.body.append(g);
let gx=innerWidth/2,gy=innerHeight/2,tx=gx,ty=gy;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
(function l(){gx+=(tx-gx)*.1;gy+=(ty-gy)*.1;g.style.transform='translate3d('+gx+'px,'+gy+'px,0)';requestAnimationFrame(l)})();
$('.shot,.bento img,.p .pic,.ev .card').forEach(el=>{el.classList.add('tilt');
el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
el.style.transform='perspective(900px) rotateY('+x*9+'deg) rotateX('+-y*9+'deg) scale(1.02)'});
el.addEventListener('pointerleave',()=>el.style.transform='')})}
})();
