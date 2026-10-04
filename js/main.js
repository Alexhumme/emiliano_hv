
// Carrusel de logos de empresas
const empresas=[["Comfaguajira","CF","#c77f2e"],["SENA","SN","#6f4e37"],["Tuscany Drilling","TD","#8a5a3b"],["Petroworks","PW","#b26a2e"]];
const cinta=document.getElementById('cinta');
const lista=empresas.concat(empresas).map(e=>`<div class="logo-empresa"><span class="mono" style="background:${e[2]}">${e[1]}</span>${e[0]}</div>`).join('');
cinta.innerHTML=lista+lista;

// Texto que se escribe
const frases=["Docente y Pedagogo","Especialista en Estrategia Gerencial","Life Coach","Tallerista de Equipos Empresariales"];
let i=0,j=0,borrando=false;const el=document.getElementById('typed');
function teclear(){const f=frases[i];el.textContent=f.substring(0,j);
if(!borrando&&j<f.length){j++;setTimeout(teclear,80)}
else if(borrando&&j>0){j--;setTimeout(teclear,40)}
else if(!borrando){borrando=true;setTimeout(teclear,1800)}
else{borrando=false;i=(i+1)%frases.length;setTimeout(teclear,400)}}
teclear();

// Revelar al hacer scroll
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.revelar').forEach(el2=>obs.observe(el2));

// Contadores 0 -> valor
const obs2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animar(e.target);obs2.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('.numero').forEach(n=>obs2.observe(n));
function animar(n){const meta=+n.dataset.meta;let v=0;const p=setInterval(()=>{v+=meta/60;if(v>=meta){v=meta;clearInterval(p)}n.textContent=Math.floor(v)},30)}

// Barras de habilidades
const obs3=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%';obs3.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('.relleno').forEach(r=>obs3.observe(r));

// Carrusel de testimonios
const citas=[["El profesor Emiliano activa el potencial profesional de su público; su liderazgo y proactividad inspiran a dar lo mejor.","Participante de taller empresarial"],["Su modelo dinámico y participativo convierte la formación en una experiencia que perdura.","Estudiante de formación técnica"],["Integra el ser, el saber y el hacer en cada sesión; un verdadero transformador de equipos.","Coordinador académico"]];
let k=0;setInterval(()=>{k=(k+1)%citas.length;const c=document.getElementById('cita');c.style.opacity=0;setTimeout(()=>{c.textContent='"'+citas[k][0]+'"';document.getElementById('autor').textContent='— '+citas[k][1];c.style.opacity=1},500)},5000);

// Parallax
window.addEventListener('scroll',()=>{
  // fondo del hero
  const hero=document.getElementById('hero');
  const hr=hero.getBoundingClientRect();
  hero.style.backgroundPosition=`right ${-hr.top*0.25}px, right center`;
  document.querySelectorAll('[data-px]').forEach(elm=>{
    const r=elm.getBoundingClientRect();
    const off=(r.top+r.height/2-innerHeight/2)*parseFloat(elm.dataset.px);
    elm.style.transform=`translateY(${off}px)`;
  });
},{passive:true});

// Indicador de sección activa en el navbar
const enlaces=document.querySelectorAll('nav ul a');
const logoNav=document.getElementById('logoNav');
const headerEl=document.querySelector('header');
const obs4=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const esHero=e.target.id==='hero';
    enlaces.forEach(a=>a.classList.toggle('activo',!esHero&&a.getAttribute('href')==='#'+e.target.id));
    logoNav.classList.toggle('activo',esHero);
    headerEl.classList.toggle('con-fondo',!esHero);
  }
}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('section[id]').forEach(s=>obs4.observe(s));

// Barrido de resaltados
const obs5=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('activo-barrido');obs5.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('.hl-barrido').forEach(h=>obs5.observe(h));
