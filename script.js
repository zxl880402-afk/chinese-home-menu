const menuItems = [
  {name:'西红柿烧茄子', category:'dish', image:'assets/dishes/tomato-eggplant.jpg'},
  {name:'青椒香干炒肉丝', category:'dish', image:'assets/dishes/pepper-tofu-pork.jpg'},
  {name:'杏鲍菇炒鸡蛋', category:'dish', image:'assets/dishes/king-oyster-egg.jpg'},
  {name:'土豆烧鸡块', category:'dish', image:'assets/dishes/potato-chicken.jpg'},
  {name:'芹菜炒腐竹', category:'dish', image:'assets/dishes/celery-yuba.jpg'},
  {name:'烤羊排', category:'dish', image:'assets/dishes/roast-lamb.jpg'},
  {name:'青椒土豆丝', category:'dish', image:'assets/dishes/pepper-potato.jpg'},
  {name:'蔬菜泡面', category:'staple', image:'assets/dishes/vegetable-noodles.jpg'},
  {name:'蛋炒饭', category:'staple', image:'assets/dishes/egg-fried-rice.jpg'},
  {name:'家常水饺', category:'staple', image:'assets/dishes/dumplings.jpg'},
  {name:'鸡蛋手抓饼', category:'staple', image:'assets/dishes/egg-pancake.jpg'}
];

let activeCategory='all';
let visible=[...menuItems];
let index=0;

const photo=document.getElementById('dishPhoto');
const nameEl=document.getElementById('dishName');
const progress=document.getElementById('progress');
const strip=document.getElementById('thumbnailStrip');
const viewer=document.querySelector('.viewer');

function filtered(){return activeCategory==='all' ? [...menuItems] : menuItems.filter(x=>x.category===activeCategory)}
function renderThumbs(){
  strip.innerHTML='';
  visible.forEach((item,i)=>{
    const b=document.createElement('button');
    b.className='thumb'+(i===index?' active':'');
    b.innerHTML=`<img src="${item.image}" alt=""><strong>${item.name}</strong><small>${i+1}/${visible.length}</small>`;
    b.addEventListener('click',()=>{index=i;render(true)});
    strip.appendChild(b);
  });
  strip.children[index]?.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
}
function render(animate=false){
  const item=visible[index];
  if(animate) photo.classList.add('swap');
  setTimeout(()=>{
    photo.src=item.image; photo.alt=item.name; nameEl.textContent=item.name;
    progress.textContent=`${index+1} / ${visible.length}`;
    photo.classList.remove('swap'); renderThumbs();
  },animate?110:0);
}
function next(step=1){index=(index+step+visible.length)%visible.length;render(true)}
document.getElementById('prevBtn').addEventListener('click',()=>next(-1));
document.getElementById('nextBtn').addEventListener('click',()=>next(1));

document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active'); activeCategory=tab.dataset.category; visible=filtered(); index=0; render(true);
}));

let startX=0,startY=0;
viewer.addEventListener('touchstart',e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY},{passive:true});
viewer.addEventListener('touchend',e=>{const t=e.changedTouches[0];const dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.15) next(dx<0?1:-1)},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next(1);if(e.key==='ArrowLeft')next(-1)});

render();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
