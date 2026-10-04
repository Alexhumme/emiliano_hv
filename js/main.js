
// Carrusel de logos de empresas
const empresas = [
  ["Comfaguajira", "CF", "#c77f2e", "assets/logos_empresas/comfaguajira.webp"],
  ["SENA", "SN", "#6f4e37", "assets/logos_empresas/sena.png"],
  ["Tuscany Drilling", "TD", "#8a5a3b", "assets/logos_empresas/tuscany.png"],
  ["Petroworks", "PW", "#b26a2e", "assets/logos_empresas/petroworks.png"]
];
const cinta = document.getElementById('cinta');
const lista = empresas.concat(empresas).map(
  e => `<div class="logo-empresa">
        <img src="${e[3]}"></img>
      </div>`).join('');
cinta.innerHTML = lista + lista;

// Texto que se escribe
const frases = ["Docente y Pedagogo", "Especialista en Estrategia Gerencial", "Life Coach", "Tallerista de Equipos Empresariales"];
let i = 0, j = 0, borrando = false; const el = document.getElementById('typed');
function teclear() {
  const f = frases[i]; el.textContent = f.substring(0, j);
  if (!borrando && j < f.length) { j++; setTimeout(teclear, 80) }
  else if (borrando && j > 0) { j--; setTimeout(teclear, 40) }
  else if (!borrando) { borrando = true; setTimeout(teclear, 1800) }
  else { borrando = false; i = (i + 1) % frases.length; setTimeout(teclear, 400) }
}
teclear();

// Revelar al hacer scroll
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: .15 });
document.querySelectorAll('.revelar').forEach(el2 => obs.observe(el2));

// Contadores 0 -> valor
const obs2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { animar(e.target); obs2.unobserve(e.target) } }), { threshold: .5 });
document.querySelectorAll('.numero').forEach(n => obs2.observe(n));
function animar(n) { const meta = +n.dataset.meta; let v = 0; const p = setInterval(() => { v += meta / 60; if (v >= meta) { v = meta; clearInterval(p) } n.textContent = Math.floor(v) }, 30) }

// Barras de habilidades
const obs3 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + '%'; obs3.unobserve(e.target) } }), { threshold: .5 });
document.querySelectorAll('.relleno').forEach(r => obs3.observe(r));

// Carrusel de testimonios
const citas = [
  [
    `Trabajé con Emiliano en Petroworks entre 2021 y 2022. Ambos éramos administradores de campo en
    operaciones de perforación para operadoras del sector de hidrocarburos. En un entorno tan exigente
    como el de un taladro, donde muchas decisiones no dan espera, Emiliano siempre mostro muy buen
    criterio para tomarlas.

    También es una persona muy pedagógica y estructurada. Explica los procesos con claridad y organiza
    el trabajo de manera que todos sepan qué hacer, algo que en campo marca la diferencia. Pero lo que
    más valoro de él es su calidad humana. Es un compañero que está pendiente de los demás y que sabe
    escuchar.

    Además de un gran compañero de trabajo, de esa experiencia me quedó un gran amigo. Lo
    recomiendo sin dudarlo como un profesional confiable, riguroso y con buen juicio.`,
    
    "Johana Bernal Tabares - Especialista en negocios y finanzas internacionales"
  ],
  [
    `He tenido la oportunidad de trabajar con Emiliano en la Tecnoacademia Itinerante Guajira del SENA
    destacando su liderazgo, compromiso y capacidad para trabajar en equipo. Es un profesional
    responsable, proactivo y con gran disposición para aportar al logro de los objetivos institucionales.`,
    
    "Adalberto López Gómez - Facilitador de Robotica y Energias Alternativas"
  ]
];
let k = 0;
document.getElementById('cita').textContent = '"' + citas[0][0] + '"';
document.getElementById('autor').textContent = '— ' + citas[0][1];
document.getElementById('sigTestimonio').addEventListener('click', () => { k = (k + 1) % citas.length; const c = document.getElementById('cita'); c.style.opacity = 0; setTimeout(() => { c.textContent = '"' + citas[k][0] + '"'; document.getElementById('autor').textContent = '— ' + citas[k][1]; c.style.opacity = 1 }, 500) });

// Parallax
window.addEventListener('scroll', () => {
  // fondo del hero
  const hero = document.getElementById('hero');
  const hr = hero.getBoundingClientRect();
  hero.style.backgroundPosition = `right ${-hr.top * 0.25}px, right center`;
  document.querySelectorAll('[data-px]').forEach(elm => {
    const r = elm.getBoundingClientRect();
    const off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(elm.dataset.px);
    elm.style.transform = `translateY(${off}px)`;
  });
}, { passive: true });

// Indicador de sección activa en el navbar
const enlaces = document.querySelectorAll('nav ul a');
const logoNav = document.getElementById('logoNav');
const headerEl = document.querySelector('header');
const obs4 = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    const esHero = e.target.id === 'hero';
    enlaces.forEach(a => a.classList.toggle('activo', !esHero && a.getAttribute('href') === '#' + e.target.id));
    logoNav.classList.toggle('activo', esHero);
    headerEl.classList.toggle('con-fondo', !esHero);
  }
}), { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => obs4.observe(s));

// Barrido de resaltados
const obs5 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('activo-barrido'); obs5.unobserve(e.target) } }), { threshold: .5 });
document.querySelectorAll('.hl-barrido').forEach(h => obs5.observe(h));
