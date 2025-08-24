// Stars + reveal + menu toggle
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d', { alpha: false });
let w, h, stars;

function resize(){
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  const count = Math.min(200, Math.floor((w*h)/9000));
  stars = Array.from({length: count}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    z: Math.random()*0.8 + 0.2,
    r: Math.random()*1.8 + .2
  }));
}
resize();
addEventListener('resize', resize);

function draw(){
  const g = ctx.createLinearGradient(0,0,0,h);
  g.addColorStop(0, '#050b18');
  g.addColorStop(1, '#0a1430');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);
  for(const s of stars){
    ctx.globalAlpha = 0.6 + 0.4*Math.random();
    ctx.fillStyle = '#cfe3ff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r*s.z, 0, Math.PI*2);
    ctx.fill();
    s.x += 0.05 * s.z;
    if(s.x > w+5) s.x = -5;
  }
  requestAnimationFrame(draw);
}
draw();

const observer = new IntersectionObserver((entries)=>{
  for(const e of entries){
    if(e.isIntersecting){ e.target.classList.add('show'); observer.unobserve(e.target);}
  }
},{threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const menuBtn = document.getElementById('menu');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click', ()=> nav.classList.remove('open')));
