/* =========================================================
   Capricho del Mar by Z — lógica de la web
   - Datos de carta y vinos bilingües (única fuente de la verdad)
   - Cambio de idioma ES / EN
   - Navegación (scroll, menú móvil, header al hacer scroll)
   ========================================================= */

/* ----------------------------------------------------------
   1) DATOS DE LA CARTA  (edita aquí para cambiar platos/precios)
   price : número o texto que se mostrará con €
   copa  : precio por copa (solo vinos)
   mkt   : true  -> muestra "S/M" (según mercado / del día)
   desc  : descripción corta opcional {es, en}
---------------------------------------------------------- */
const MENU = {
  carta: [
    { col:1, t:{es:"Para empezar", en:"To start"},
      note:{es:"Marisco fresco según mercado", en:"Fresh shellfish at market price"},
      items:[
        {es:"Ostras", en:"Oysters", mkt:true},
        {es:"Quisquilla", en:"Quisquilla shrimp", mkt:true},
        {es:"Gamba roja", en:"Red prawn", mkt:true},
        {es:"Almejas", en:"Clams", mkt:true},
      ]},

    { col:1, t:{es:"Para compartir", en:"To share"},
      items:[
        {es:"Jamón ibérico 100% de cebo", en:"100% Iberian cebo-fed ham", price:"22"},
        {es:"Lomo ibérico 100% bellota · Joselito", en:"100% acorn-fed Iberian loin · Joselito", price:"13"},
        {es:"Tabla de quesos by Z", en:"Cheese board by Z", price:"17"},
        {es:"Parmigiano Reggiano 24 meses", en:"Parmigiano Reggiano · 24 months", price:"7,50"},
        {es:"Marinera con atún rojo", en:"Marinera with bluefin tuna", price:"4", unit:{es:"ud", en:"each"}},
        {es:"Marinera con anchoa de Santoña", en:"Marinera with Santoña anchovy", price:"3", unit:{es:"ud", en:"each"}},
        {es:"Hueva de mújol", en:"Cured grey-mullet roe", price:"10"},
        {es:"Calamar nacional a la andaluza", en:"Andalusian-style fried squid", price:"16"},
        {es:"Calamar nacional a la plancha", en:"Grilled squid", price:"18"},
        {es:"Pata de pulpo en base de puré trufado", en:"Octopus leg on truffled potato", price:"22"},
        {es:"Croqueta de jamón", en:"Ham croquette", price:"2,50", unit:{es:"ud", en:"each"}},
        {es:"Croqueta de rabo de toro", en:"Oxtail croquette", price:"3,50", unit:{es:"ud", en:"each"}},
        {es:"Zamburiña a la plancha", en:"Grilled queen scallop", price:"3", unit:{es:"ud", en:"each"}},
        {es:"Steak tartar", en:"Steak tartare", price:"22"},
        {es:"Tartar de atún rojo · Fuentes", en:"Bluefin tuna tartare · Fuentes", price:"26"},
        {es:"Sashimi de atún rojo (akami + toro)", en:"Bluefin tuna sashimi (akami + toro)", price:"20"},
        {es:"Carpaccio de salmón", en:"Salmon carpaccio", price:"19"},
        {es:"Brioche de pato", en:"Duck brioche", price:"7,50"},
        {es:"Flor de alcachofa con escalopa de foie", en:"Artichoke heart with foie escalope", price:"7"},
      ]},

    { col:2, t:{es:"Ensaladas", en:"Salads"},
      items:[
        {es:"Tomate partido con bonito graso", en:"Tomato with fatty bonito", price:"16"},
        {es:"Capricho del mar", en:"Capricho del mar", price:"18"},
        {es:"Salmón del trópico", en:"Tropical salmon", price:"15"},
      ]},

    { col:2, t:{es:"Carnes", en:"Meats"},
      items:[
        {es:"Solomillo de ternera", en:"Beef tenderloin", price:"25"},
        {es:"Solomillo de ternera con escalopa de foie gras", en:"Beef tenderloin with foie gras escalope", price:"28"},
        {es:"Presa ibérica 100%", en:"100% Iberian presa", price:"21"},
        {es:"Entrecot de ternera", en:"Beef entrecôte", price:"23"},
        {es:"Chuleta de vaca vieja · 500 g · maduración +30 días", en:"Aged beef chop · 500 g · 30+ days", price:"34"},
      ]},

    { col:2, t:{es:"Pescados", en:"Fish"},
      note:{es:"La oferta de pescado puede variar cada día", en:"The fish selection may vary daily"},
      items:[
        {es:"Lubina", en:"Sea bass", mkt:true},
        {es:"Gallineta", en:"Scorpionfish", mkt:true},
        {es:"Rodaballo", en:"Turbot", mkt:true},
        {es:"Gallo Pedro", en:"John Dory", mkt:true},
      ]},

    { col:2, t:{es:"Los postres", en:"Desserts"},
      items:[
        {es:"Tarta de queso caprichosa", en:"‘Caprichosa’ cheesecake", price:"6,50"},
        {es:"Tarta del trisabuelo", en:"Great-grandfather’s cake", price:"6"},
        {es:"Tarta de zanahoria", en:"Carrot cake", price:"6"},
        {es:"Crema del chef", en:"Chef’s cream", price:"6,50"},
        {es:"Coulant", en:"Chocolate coulant", price:"6,50", desc:{es:"25 minutos de elaboración", en:"25 min preparation"}},
      ]},
  ],

  vinos: [
    { col:1, t:{es:"Blancos", en:"White"},
      items:[
        {es:"Alceño Blanco", en:"Alceño Blanco", img:"assets/vinos/alceno-blanco.png", desc:{es:"Sauvignon Blanc · Jumilla", en:"Sauvignon Blanc · Jumilla"}, price:"13", copa:"3,50"},
        {es:"Cyatho", en:"Cyatho", img:"assets/vinos/cyatho.png", desc:{es:"Verdejo · Rueda", en:"Verdejo · Rueda"}, price:"16"},
        {es:"Vida Salvaje", en:"Vida Salvaje", img:"assets/vinos/vida-salvaje.png", desc:{es:"Macabeo · Bullas", en:"Macabeo · Bullas"}, price:"20"},
        {es:"Flor Malvés", en:"Flor Malvés", img:"assets/vinos/flor-malves.png", desc:{es:"Malvasía · Alicante", en:"Malvasía · Alicante"}, price:"18"},
        {es:"Montenovo", en:"Montenovo", img:"assets/vinos/montenovo.png", desc:{es:"Godello · Valdeorras", en:"Godello · Valdeorras"}, price:"22"},
        {es:"Terras Gauda", en:"Terras Gauda", img:"assets/vinos/terras-gauda.png", desc:{es:"Albariño · Caíño · Loureiro · Rías Baixas", en:"Albariño · Caíño · Loureiro · Rías Baixas"}, price:"22"},
        {es:"Mar de Frades Albariño", en:"Mar de Frades Albariño", img:"assets/vinos/marfrades-albarino.png", desc:{es:"Albariño · Rías Baixas", en:"Albariño · Rías Baixas"}, price:"24"},
        {es:"Mar de Frades Godello", en:"Mar de Frades Godello", img:"assets/vinos/marfrades-godello.png", desc:{es:"Godello · Rías Baixas", en:"Godello · Rías Baixas"}, price:"28"},
        {es:"Terras Gauda Etiqueta Negra", en:"Terras Gauda Etiqueta Negra", img:"assets/vinos/terras-gauda-negra.png", desc:{es:"Albariño · Caíño Blanco · Loureiro · Rías Baixas · fermentado en barrica", en:"Albariño · Caíño Blanco · Loureiro · Rías Baixas · barrel-fermented"}, price:"44"},
      ]},

    { col:1, t:{es:"Rosados", en:"Rosé"},
      items:[
        {es:"Alceño Rosado", en:"Alceño Rosado", img:"assets/vinos/alceno-rosado.png", desc:{es:"Monastrell · Syrah · Jumilla", en:"Monastrell · Syrah · Jumilla"}, price:"13", copa:"3,50"},
        {es:"Ostatu", en:"Ostatu", img:"assets/vinos/ostatu.png", desc:{es:"Tempranillo · Garnacha · Rioja", en:"Tempranillo · Garnacha · Rioja"}, price:"16", copa:"5"},
      ]},

    { col:2, t:{es:"Tintos", en:"Red"},
      items:[
        {es:"Alceño Tinto", en:"Alceño Tinto", img:"assets/vinos/alceno-tinto.png", desc:{es:"Monastrell · Jumilla", en:"Monastrell · Jumilla"}, price:"13", copa:"3,50"},
        {es:"Delit", en:"Delit", img:"assets/vinos/delit.png", desc:{es:"Monastrell · Alicante", en:"Monastrell · Alicante"}, price:"27"},
        {es:"Pierola", en:"Pierola", img:"assets/vinos/pierola.png", desc:{es:"Tempranillo · Crianza · Rioja", en:"Tempranillo · Crianza · Rioja"}, price:"20", copa:"4,50"},
        {es:"Juan Gil", en:"Juan Gil", img:"assets/vinos/juan-gil.png", desc:{es:"Monastrell · Crianza · Jumilla", en:"Monastrell · Crianza · Jumilla"}, price:"22"},
        {es:"Traslascuestas", en:"Traslascuestas", img:"assets/vinos/traslascuestas.png", desc:{es:"Tempranillo · Roble · Ribera del Duero", en:"Tempranillo · Roble · Ribera del Duero"}, price:"17", copa:"5"},
        {es:"Muga", en:"Muga", img:"assets/vinos/muga.png", desc:{es:"Tempranillo · Crianza · Rioja", en:"Tempranillo · Crianza · Rioja"}, price:"28"},
        {es:"Bosque de Matasnos", en:"Bosque de Matasnos", img:"assets/vinos/bosque-matasnos.png", desc:{es:"Tempranillo · Ribera del Duero", en:"Tempranillo · Ribera del Duero"}, price:"38"},
        {es:"Pago de Carraovejas", en:"Pago de Carraovejas", img:"assets/vinos/pago-carraovejas.png", desc:{es:"Tempranillo · Cabernet Sauvignon · Merlot · Ribera del Duero", en:"Tempranillo · Cabernet Sauvignon · Merlot · Ribera del Duero"}, price:"60"},
        {es:"Valbuena nº 5 · 2018", en:"Valbuena nº 5 · 2018", img:"assets/vinos/valbuena.png", desc:{es:"Tempranillo · Reserva · Ribera del Duero", en:"Tempranillo · Reserva · Ribera del Duero"}, price:"210"},
      ]},

    { col:2, t:{es:"Espumosos", en:"Sparkling"},
      items:[
        {es:"Celler Kripta Franc", en:"Celler Kripta Franc", img:"assets/vinos/celler-kripta.png", desc:{es:"Macabeo · Xarel·lo · Parellada · Brut Reserva · Cava", en:"Macabeo · Xarel·lo · Parellada · Brut Reserva · Cava"}, price:"24"},
        {es:"Recaredo Terrers", en:"Recaredo Terrers", img:"assets/vinos/recaredo.png", desc:{es:"Xarel·lo · Macabeo · Parellada · Brut Nature · Corpinnat", en:"Xarel·lo · Macabeo · Parellada · Brut Nature · Corpinnat"}, price:"42"},
        {es:"Bollinger Special Cuvée", en:"Bollinger Special Cuvée", img:"assets/vinos/bollinger.png", desc:{es:"Pinot Noir · Chardonnay · Meunier · Champagne", en:"Pinot Noir · Chardonnay · Meunier · Champagne"}, price:"85"},
      ]},
  ],
};

/* ----------------------------------------------------------
   1b) GALERÍA  (automática)
   Sube tus fotos a la carpeta assets/ con estos nombres:
     galeria-1.jpg, galeria-2.jpg, galeria-3.jpg ...
   Aparecen solas en orden. Acepta jpg, jpeg, png o webp.
   Si no hay ninguna, se muestran marcos "Próximamente".
---------------------------------------------------------- */
const GALLERY_MAX = 12;  // intenta cargar hasta galeria-12

/* ----------------------------------------------------------
   2) TEXTOS DE INTERFAZ  (i18n)
---------------------------------------------------------- */
const I18N = {
  es:{
    "nav.inicio":"Inicio", "nav.carta":"Carta", "nav.vinos":"Vinos", "nav.galeria":"Galería", "nav.contacto":"Contacto",
    "nav.reservar":"Reservar",
    "hero.tag":"Cocina de mar y vino blanco en el Puerto de Mazarrón",
    "hero.meta1":"Marisco fresco", "hero.meta2":"Atún rojo · Fuentes", "hero.meta3":"Bodega de autor",
    "hero.scroll":"Descubre la carta",
    "carta.eyebrow":"Nuestra cocina", "carta.title1":"La", "carta.title2":"carta",
    "carta.sub":"Producto fresco, mar de Mazarrón y un toque caprichoso.",
    "carta.pan":"Pan y servicio · 2 €",
    "carta.legend":"S/M · Según mercado o del día",
    "carta.credits":"Trabajamos con Joselito, Beher, Ricardo Fuentes, Parmigiano Reggiano y Rougié, entre otros.",
    "vinos.eyebrow":"Nuestra bodega", "vinos.title1":"Los", "vinos.title2":"vinos",
    "vinos.sub":"Blancos atlánticos para el marisco, tintos con alma y burbujas para celebrar.",
    "vinos.copa":"copa",
    "gallery.eyebrow":"El ambiente", "gallery.title1":"Nuestra", "gallery.title2":"casa",
    "gallery.sub":"Un rincón marinero en el Puerto de Mazarrón.",
    "gallery.soon":"Próximamente",
    "reserve.eyebrow":"Tu mesa te espera", "reserve.title":"Reserva tu mesa",
    "reserve.sub":"Asegura tu sitio en sala o terraza. Reserva online en menos de un minuto.",
    "reserve.btn":"Reservar ahora",
    "contact.eyebrow":"Dónde estamos", "contact.title1":"Ven a", "contact.title2":"vernos",
    "contact.sub":"En pleno Puerto de Mazarrón, a un paso del mar.",
    "contact.addr":"Dirección", "contact.addr.sub":"Puerto de Mazarrón, Murcia",
    "contact.phone":"Teléfono", "contact.phone.sub":"Reservas y consultas",
    "contact.hours":"Horario", "contact.hours.val":"Martes a domingo", "contact.hours.sub":"12:00–16:00 · 20:00–23:30 · Horario de verano",
    "contact.maproute":"Cómo llegar",
    "footer.tag":"Cocina de mar · Puerto de Mazarrón",
    "footer.phone":"Cancelaciones y consultas",
    "res.back":"Volver", "res.title":"Reserva tu mesa",
    "res.sub":"Elige día, hora y comensales. Recibirás tu confirmación al instante.",
    "res.widgetbar":"Reserva online",
    "res.ctatext":"Reserva en menos de un minuto. Pulsa el botón y elige día, hora y comensales.",
    "res.ctabtn":"Reservar ahora",
    "res.help":"¿Prefieres llamar? Escríbenos o telefonéa al restaurante y te ayudamos encantados.",
    "res.fallback":"¿No se carga? Abrir reservas en una pestaña nueva",
  },
  en:{
    "nav.inicio":"Home", "nav.carta":"Menu", "nav.vinos":"Wines", "nav.galeria":"Gallery", "nav.contacto":"Contact",
    "nav.reservar":"Book",
    "hero.tag":"Seafood kitchen and white wine in Puerto de Mazarrón",
    "hero.meta1":"Fresh shellfish", "hero.meta2":"Bluefin tuna · Fuentes", "hero.meta3":"Signature wine list",
    "hero.scroll":"See the menu",
    "carta.eyebrow":"Our kitchen", "carta.title1":"The", "carta.title2":"menu",
    "carta.sub":"Fresh produce, the Mazarrón sea and a caprichoso touch.",
    "carta.pan":"Bread & cover · €2",
    "carta.legend":"S/M · Market or daily price",
    "carta.credits":"We work with Joselito, Beher, Ricardo Fuentes, Parmigiano Reggiano and Rougié, among others.",
    "vinos.eyebrow":"Our cellar", "vinos.title1":"The", "vinos.title2":"wines",
    "vinos.sub":"Atlantic whites for the shellfish, soulful reds and bubbles to celebrate.",
    "vinos.copa":"glass",
    "gallery.eyebrow":"The atmosphere", "gallery.title1":"Our", "gallery.title2":"place",
    "gallery.sub":"A seaside corner in Puerto de Mazarrón.",
    "gallery.soon":"Coming soon",
    "reserve.eyebrow":"Your table awaits", "reserve.title":"Book your table",
    "reserve.sub":"Secure your spot indoors or on the terrace. Book online in under a minute.",
    "reserve.btn":"Book now",
    "contact.eyebrow":"Find us", "contact.title1":"Come", "contact.title2":"see us",
    "contact.sub":"In the heart of Puerto de Mazarrón, steps from the sea.",
    "contact.addr":"Address", "contact.addr.sub":"Puerto de Mazarrón, Murcia",
    "contact.phone":"Phone", "contact.phone.sub":"Bookings & enquiries",
    "contact.hours":"Hours", "contact.hours.val":"Tuesday to Sunday", "contact.hours.sub":"12:00–16:00 · 20:00–23:30 · Summer hours",
    "contact.maproute":"Get directions",
    "footer.tag":"Seafood kitchen · Puerto de Mazarrón",
    "footer.phone":"Cancellations & enquiries",
    "res.back":"Back", "res.title":"Book your table",
    "res.sub":"Pick a date, time and party size. You’ll get instant confirmation.",
    "res.widgetbar":"Online booking",
    "res.ctatext":"Book in under a minute. Tap the button and choose date, time and party size.",
    "res.ctabtn":"Book now",
    "res.help":"Prefer to call? Message or phone the restaurant and we’ll be glad to help.",
    "res.fallback":"Not loading? Open booking in a new tab",
  }
};

/* ----------------------------------------------------------
   3) RENDER DE LA CARTA Y LOS VINOS
---------------------------------------------------------- */
function priceCell(item, lang){
  if(item.mkt){
    return `<div class="dish-price"><span class="sm">S/M</span></div>`;
  }
  let html = `<div class="dish-price">${item.price}&nbsp;€`;
  if(item.unit){ html += ` <span class="sm" style="text-transform:none;letter-spacing:.05em">/ ${item.unit[lang]}</span>`; }
  if(item.copa){ html += `<span class="copa">${item.copa}&nbsp;€ · ${I18N[lang]["vinos.copa"]}</span>`; }
  return html + `</div>`;
}

function dishHTML(item, lang){
  const desc = item.desc ? `<div class="dish-desc">${item.desc[lang]}</div>` : "";
  const thumb = item.img ? `<img class="wine-thumb" src="${item.img}" alt="" loading="lazy">` : "";
  return `<div class="dish${item.img ? ' has-thumb' : ''}">
      ${thumb}
      <div class="dish-main">
        <div class="dish-name">${item[lang]}</div>${desc}
      </div>
      ${priceCell(item, lang)}
    </div>`;
}

function blockHTML(block, lang){
  const note = block.note ? `<div class="menu-block-note">${block.note[lang]}</div>` : "";
  return `<div class="menu-block">
      <div class="menu-block-title"><span class="mt">${block.t[lang]}</span><span class="ml"></span></div>
      ${note}
      ${block.items.map(i=>dishHTML(i,lang)).join("")}
    </div>`;
}

function renderMenu(which, lang){
  const data = MENU[which];
  const col1 = data.filter(b=>b.col===1).map(b=>blockHTML(b,lang)).join("");
  const col2 = data.filter(b=>b.col===2).map(b=>blockHTML(b,lang)).join("");
  const target = document.getElementById(which==="carta" ? "carta-grid" : "vinos-grid");
  if(target){
    target.innerHTML = `<div class="menu-col">${col1}</div><div class="menu-col">${col2}</div>`;
  }
}

function renderGallery(lang){
  const grid = document.getElementById("galeria-grid");
  if(!grid) return;
  const wave = `<svg viewBox="0 0 64 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6 q8 -8 16 0 q8 8 16 0 q8 -8 16 0 q8 8 12 0"/></svg>`;
  const soon = I18N[lang]["gallery.soon"];
  const exts = ["jpg","jpeg","png","webp","JPG","PNG"];

  // 1) Marcos "Próximamente" de inmediato (la sección nunca se ve vacía)
  grid.innerHTML = Array.from({length:6}).map(()=>
    `<div class="gallery-item is-empty"><div class="ph">${wave}<span>${soon}</span></div></div>`
  ).join("");

  // 2) Intentar cargar las fotos reales; si aparece alguna, sustituyen a los marcos
  let switched = false;
  for(let i=1;i<=GALLERY_MAX;i++){
    (function(idx){
      const probe = new Image();
      let e = 0;
      probe.onload = ()=>{
        if(!switched){ grid.innerHTML = ""; switched = true; }   // limpia marcos al llegar la 1ª foto
        const fig = document.createElement("figure");
        fig.className = "gallery-item";
        fig.dataset.idx = idx;
        const im = document.createElement("img");
        im.src = probe.src; im.alt = "Capricho del Mar by Z"; im.loading = "lazy";
        fig.appendChild(im);
        const after = [...grid.children].find(c=> +c.dataset.idx > idx);  // mantener el orden 1,2,3…
        grid.insertBefore(fig, after || null);
      };
      probe.onerror = ()=>{ e++; if(e < exts.length) probe.src = `assets/galeria-${idx}.${exts[e]}`; };
      probe.src = `assets/galeria-${idx}.${exts[0]}`;
    })(i);
  }
}

/* ----------------------------------------------------------
   4) APLICAR IDIOMA
---------------------------------------------------------- */
function applyLang(lang){
  document.documentElement.lang = lang;
  // textos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
  });
  // menús (solo si existen en la página)
  if(document.getElementById("carta-grid")) renderMenu("carta", lang);
  if(document.getElementById("vinos-grid"))  renderMenu("vinos", lang);
  if(document.getElementById("galeria-grid")) renderGallery(lang);
  // botones de idioma
  document.querySelectorAll(".lang-switch button").forEach(b=>{
    b.classList.toggle("on", b.dataset.lang===lang);
  });
  // widget de reservas (página reservas.html)
  const frame = document.getElementById("revo-frame");
  if(frame && frame.dataset.base){
    frame.src = frame.dataset.base + "&lang=" + lang;
  }
  const opener = document.getElementById("revo-open");
  if(opener && opener.dataset.base){
    opener.href = opener.dataset.base + "&lang=" + lang;
  }
  try{ localStorage.setItem("cdm-lang", lang); }catch(e){}
}

function getInitialLang(){
  try{
    const saved = localStorage.getItem("cdm-lang");
    if(saved) return saved;
  }catch(e){}
  return (navigator.language||"es").toLowerCase().startsWith("en") ? "en" : "es";
}

/* ----------------------------------------------------------
   5) NAVEGACIÓN  (header scroll, menú móvil, enlace activo)
---------------------------------------------------------- */
function initNav(){
  const header = document.querySelector(".site-header");
  if(header){
    const onScroll = ()=> header.classList.toggle("scrolled", window.scrollY>40);
    onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  }
  // menú móvil
  const toggle = document.querySelector(".nav-toggle");
  const scrim = document.querySelector(".nav-scrim");
  const closeNav = ()=> document.body.classList.remove("nav-open");
  if(toggle) toggle.addEventListener("click", ()=> document.body.classList.toggle("nav-open"));
  if(scrim) scrim.addEventListener("click", closeNav);
  document.querySelectorAll(".nav-links a").forEach(a=> a.addEventListener("click", closeNav));

  // enlace activo según sección visible
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if(links.length && "IntersectionObserver" in window){
    const map = {};
    links.forEach(a=>{ const id=a.getAttribute("href").slice(1); const s=document.getElementById(id); if(s) map[id]=a; });
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          links.forEach(l=>l.classList.remove("active"));
          if(map[e.target.id]) map[e.target.id].classList.add("active");
        }
      });
    }, {rootMargin:"-45% 0px -50% 0px"});
    Object.values(map).forEach(a=>{ const s=document.getElementById(a.getAttribute("href").slice(1)); if(s) obs.observe(s); });
  }
}

/* Botón de reservas: ventana centrada en escritorio, pestaña en móvil */
function initReservaButton(){
  const a = document.getElementById("revo-open");
  if(!a) return;
  a.addEventListener("click", (e)=>{
    if(window.innerWidth >= 820){
      e.preventDefault();
      const w = 460, h = Math.min(820, window.innerHeight - 40);
      const left = Math.max(0, (window.screen.width  - w) / 2);
      const top  = Math.max(0, (window.screen.height - h) / 2);
      window.open(a.href, "CaprichoReservas",
        `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`);
    }
  });
}

/* ----------------------------------------------------------
   6) ARRANQUE
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".lang-switch button").forEach(b=>{
    b.addEventListener("click", ()=> applyLang(b.dataset.lang));
  });
  initNav();
  initReservaButton();
  applyLang(getInitialLang());
});
