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
        {es:"Ostras francesas", en:"French oysters", mkt:true, al:["moluscos"]},
        {es:"Quisquilla", en:"Quisquilla shrimp", mkt:true, al:["crustaceos"]},
        {es:"Gamba roja", en:"Red prawn", mkt:true, al:["crustaceos"]},
        {es:"Almejas", en:"Clams", mkt:true, al:["moluscos"]},
      ]},

    { col:1, t:{es:"Para compartir", en:"To share"},
      items:[
        {es:"Jamón ibérico 100% de cebo · Beher", en:"100% cebo-fed Iberian ham · Beher", price:"22", al:[]},
        {es:"Lomo ibérico 100% bellota · Joselito", en:"100% acorn-fed Iberian loin · Joselito", price:"13", al:[]},
        {es:"Tabla de quesos by Z", en:"Cheese board by Z", price:"17", desc:{es:"Selección de quesos con sus acompañamientos", en:"A selection of cheeses with garnishes"}, al:["lacteos"]},
        {es:"Parmigiano Reggiano 24 meses", en:"Parmigiano Reggiano · 24 months", price:"7,50", desc:{es:"Escamas italianas imprescindibles en carta", en:"Italian shavings, a menu essential"}, al:["lacteos"]},
        {es:"Marinera con atún rojo", en:"Marinera with bluefin tuna", price:"4", unit:{es:"ud", en:"each"}, desc:{es:"La que no puede faltar", en:"The one you can't miss"}, al:["gluten","huevos","pescado"]},
        {es:"Marinera con anchoa de Santoña", en:"Marinera with Santoña anchovy", price:"3", unit:{es:"ud", en:"each"}, al:["gluten","huevos","pescado"]},
        {es:"Hueva de mújol", en:"Cured grey-mullet roe", price:"10", al:["pescado"]},
        {es:"Calamar nacional a la andaluza", en:"Andalusian-style fried squid", price:"16", desc:{es:"Rebozado ligero y bien frito", en:"Lightly battered and crisp-fried"}, al:["moluscos","gluten"]},
        {es:"Calamar nacional a la plancha", en:"Grilled squid", price:"18", desc:{es:"Corte japonés (ikayaki), muy tierno", en:"Japanese cut (ikayaki), very tender"}, al:["moluscos"]},
        {es:"Pata de pulpo en base de puré trufado", en:"Octopus leg on truffled potato", price:"22", desc:{es:"Pulpo meloso sobre parmentier trufado", en:"Tender octopus on truffled potato"}, al:["moluscos","lacteos"]},
        {es:"Croqueta de jamón", en:"Ham croquette", price:"2,50", unit:{es:"ud", en:"each"}, desc:{es:"Cremosa, con trocitos de jamón de verdad", en:"Creamy, with real bits of ham"}, al:["gluten","lacteos","huevos"]},
        {es:"Croqueta de rabo de toro", en:"Oxtail croquette", price:"3,50", unit:{es:"ud", en:"each"}, desc:{es:"Guiso meloso de rabo, crujiente por fuera", en:"Slow-cooked oxtail, crisp outside"}, al:["gluten","lacteos","huevos"]},
        {es:"Zamburiña a la plancha", en:"Grilled queen scallop", price:"3", unit:{es:"ud", en:"each"}, desc:{es:"A la plancha, en su jugo", en:"Griddled, in its own juices"}, al:["moluscos"]},
        {es:"Steak tartar", en:"Steak tartare", price:"22", desc:{es:"De solomillo de ternera, cortado a cuchillo", en:"Beef tenderloin, hand-cut"}, al:["huevos","frutossecos","mostaza"]},
        {es:"Tartar de atún rojo · Fuentes", en:"Bluefin tuna tartare · Fuentes", price:"26", desc:{es:"Ricardo Fuentes, mejor y mayor productor de atún rojo del mundo", en:"Ricardo Fuentes, the world's finest and largest bluefin tuna producer"}, al:["pescado","huevos","moluscos"]},
        {es:"Sashimi de atún rojo (akami + toro)", en:"Bluefin tuna sashimi (akami + toro)", price:"20", desc:{es:"Dos cortes del atún: magro y ventresca", en:"Two cuts of tuna: lean and belly"}, al:["pescado","gluten"]},
        {es:"Carpaccio de salmón", en:"Salmon carpaccio", price:"19", al:["pescado"]},
        {es:"Brioche de pato", en:"Duck brioche", price:"7,50", desc:{es:"Brioche tierno con pato confitado desmigado y un toque dulce", en:"Soft brioche with shredded duck confit and a sweet touch"}, al:["gluten","lacteos","huevos"]},
        {es:"Flor de alcachofa con escalopa de foie", en:"Artichoke heart with foie escalope", price:"7", desc:{es:"Alcachofa confitada con escalopa de foie, uno de los favoritos de la casa", en:"Confit artichoke with foie escalope, a house favourite"}, al:["gluten","sulfitos"]},
      ]},

    { col:2, t:{es:"Ensaladas", en:"Salads"},
      items:[
        {es:"Tomate partido con bonito graso", en:"Tomato with fatty bonito", price:"16", desc:{es:"Tomate de temporada y ventresca de bonito", en:"Seasonal tomato and bonito belly"}, al:["pescado"]},
        {es:"Capricho del mar", en:"Capricho del mar", price:"18", desc:{es:"Nuestra ensalada de la casa, con sabores del mar", en:"Our house salad with flavours of the sea"}, al:["gluten","huevos","lacteos"]},
        {es:"Salmón del trópico", en:"Tropical salmon", price:"15", desc:{es:"Con mango y vinagreta casera de maracuyá", en:"With mango and homemade passion-fruit vinaigrette"}, al:["pescado"]},
      ]},

    { col:2, t:{es:"Carnes", en:"Meats"},
      items:[
        {es:"Solomillo de ternera", en:"Beef tenderloin", price:"25", desc:{es:"Tierno y jugoso, el que nunca defrauda", en:"Tender and juicy, never disappoints"}, al:[]},
        {es:"Solomillo de ternera con escalopa de foie gras", en:"Beef tenderloin with foie gras escalope", price:"28", desc:{es:"Coronado con foie a la plancha", en:"Topped with griddled foie gras"}, al:["sulfitos"]},
        {es:"Presa ibérica 100% · Beher", en:"100% Iberian presa · Beher", price:"21", desc:{es:"Jugosa y veteada", en:"Juicy and beautifully marbled"}, al:[]},
        {es:"Entrecot de ternera", en:"Beef entrecôte", price:"23", desc:{es:"Lomo bajo de frisona, bien sabroso", en:"Friesian sirloin, full of flavour"}, al:[]},
        {es:"Chuleta de vaca vieja · 500 g · maduración +30 días", en:"Aged beef chop · 500 g · 30+ days", price:"34", desc:{es:"Maduración +30 días, intensa, para los más carnívoros", en:"30+ days aged, intense, for true meat lovers"}, al:[]},
      ]},

    { col:2, t:{es:"Pescados", en:"Fish"},
      note:{es:"La oferta de pescado puede variar cada día", en:"The fish selection may vary daily"},
      items:[
        {es:"Lubina", en:"Sea bass", mkt:true, al:["pescado"]},
        {es:"Gallineta", en:"Scorpionfish", mkt:true, al:["pescado"]},
        {es:"Rodaballo", en:"Turbot", mkt:true, al:["pescado"]},
        {es:"Gallo Pedro", en:"John Dory", mkt:true, al:["pescado"]},
      ]},

    { col:2, t:{es:"Los postres", en:"Desserts"},
      items:[
        {es:"Tarta de queso caprichosa", en:"‘Caprichosa’ cheesecake", price:"6,50", desc:{es:"Horneada, nuestra versión más intensa del queso", en:"Baked, our most intense cheesecake"}, al:["lacteos","huevos"]},
        {es:"Tarta del trisabuelo", en:"Great-grandfather’s cake", price:"6", desc:{es:"Con tres chocolates y café arábico de verdad", en:"Three chocolates and real Arabica coffee"}, al:["gluten","lacteos"]},
        {es:"Tarta de zanahoria", en:"Carrot cake", price:"6", desc:{es:"Esponjosa, con frosting suave", en:"Fluffy, with a smooth frosting"}, al:["gluten","huevos","lacteos"]},
        {es:"Crema del chef", en:"Chef’s cream", price:"6", desc:{es:"Postre de cuchara, el secreto del chef y el más aplaudido", en:"The chef's secret spoon dessert, the most applauded"}, al:["lacteos","huevos"]},
        {es:"Coulant", en:"Chocolate coulant", price:"6,50", desc:{es:"De chocolate, fundente · 25 min de espera", en:"Molten chocolate · 25 min wait"}, al:["gluten","huevos","lacteos","soja"]},
      ]},
  ],

  vinos: [
    { col:1, t:{es:"Blancos", en:"White"},
      items:[
        {es:"Alceño Blanco", en:"Alceño Blanco", img:"assets/vinos/alceno-blanco.png", desc:{es:"Sauvignon Blanc · Jumilla", en:"Sauvignon Blanc · Jumilla"}, price:"13", copa:"3,50"},
        {es:"Cyatho", en:"Cyatho", img:"assets/vinos/cyatho.png", desc:{es:"Verdejo · Rueda", en:"Verdejo · Rueda"}, price:"16"},
        {es:"José Pariente", en:"José Pariente", img:"assets/vinos/jose-pariente.png", desc:{es:"Verdejo · Rueda", en:"Verdejo · Rueda"}, price:"19"},
        {es:"Vida Salvaje", en:"Vida Salvaje", img:"assets/vinos/vida-salvaje.png", desc:{es:"Macabeo · Bullas", en:"Macabeo · Bullas"}, price:"20"},
        {es:"Flor Malvés", en:"Flor Malvés", img:"assets/vinos/flor-malves.png", desc:{es:"Malvasía · Alicante", en:"Malvasía · Alicante"}, price:"18"},
        {es:"Montenovo", en:"Montenovo", img:"assets/vinos/montenovo.png", desc:{es:"Godello · Valdeorras", en:"Godello · Valdeorras"}, price:"22"},
        {es:"O Luar do Sil Sobre Lías", en:"O Luar do Sil Sobre Lías", img:"assets/vinos/oluar.png", desc:{es:"Godello sobre lías · Valdeorras", en:"Godello on lees · Valdeorras"}, price:"31"},
        {es:"Terras Gauda", en:"Terras Gauda", img:"assets/vinos/terras-gauda.png", desc:{es:"Albariño · Caíño · Loureiro · Rías Baixas", en:"Albariño · Caíño · Loureiro · Rías Baixas"}, price:"24"},
        {es:"Mar de Frades Albariño", en:"Mar de Frades Albariño", img:"assets/vinos/marfrades-albarino.png", desc:{es:"Albariño · Rías Baixas", en:"Albariño · Rías Baixas"}, price:"28"},
        {es:"Mar de Frades Godello", en:"Mar de Frades Godello", img:"assets/vinos/marfrades-godello.png", desc:{es:"Godello · Rías Baixas", en:"Godello · Rías Baixas"}, price:"27"},
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
        {es:"Juan Gil", en:"Juan Gil", img:"assets/vinos/juan-gil.png", desc:{es:"Monastrell · Crianza · Jumilla", en:"Monastrell · Crianza · Jumilla"}, price:"23"},
        {es:"Traslascuestas", en:"Traslascuestas", img:"assets/vinos/traslascuestas.png", desc:{es:"Tempranillo · Roble · Ribera del Duero", en:"Tempranillo · Roble · Ribera del Duero"}, price:"17", copa:"5"},
        {es:"Muga", en:"Muga", img:"assets/vinos/muga.png", desc:{es:"Tempranillo · Crianza · Rioja", en:"Tempranillo · Crianza · Rioja"}, price:"28"},
        {es:"Bosque de Matasnos", en:"Bosque de Matasnos", img:"assets/vinos/bosque-matasnos.png", desc:{es:"Tempranillo · Ribera del Duero", en:"Tempranillo · Ribera del Duero"}, price:"38"},
        {es:"Pago de Carraovejas", en:"Pago de Carraovejas", img:"assets/vinos/pago-carraovejas.png", desc:{es:"Tempranillo · Cabernet Sauvignon · Merlot · Ribera del Duero", en:"Tempranillo · Cabernet Sauvignon · Merlot · Ribera del Duero"}, price:"60"},
        {es:"Valbuena nº 5 · 2018", en:"Valbuena nº 5 · 2018", img:"assets/vinos/valbuena.png", desc:{es:"Tempranillo · Reserva · Ribera del Duero", en:"Tempranillo · Reserva · Ribera del Duero"}, price:"210"},
      ]},

    { col:2, t:{es:"Espumosos", en:"Sparkling"},
      items:[
        {es:"Celler Kripta Franc", en:"Celler Kripta Franc", img:"assets/vinos/celler-kripta.png", desc:{es:"Macabeo · Xarel·lo · Parellada · Brut Reserva · Cava", en:"Macabeo · Xarel·lo · Parellada · Brut Reserva · Cava"}, price:"24"},
        {es:"Juvé & Camps Milesimé", en:"Juvé & Camps Milesimé", img:"assets/vinos/juve-camps.png", desc:{es:"Chardonnay · Brut · Corpinnat", en:"Chardonnay · Brut · Corpinnat"}, price:"39"},
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

/* Los 14 alérgenos (Reglamento UE 1169/2011): nombre ES/EN + icono SVG (blanco sobre círculo) */
const ALLERGENS = {
  gluten:{es:"Gluten",en:"Gluten",svg:'<path d="M12 21V8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 9.4C10.6 8.8 9.5 7.5 9.2 6c1.5.3 2.7 1.4 3.3 2.8M12 9.4c1.4-.6 2.5-1.9 2.8-3.4-1.5.3-2.7 1.4-3.3 2.8M12 13.6c-1.4-.6-2.5-1.9-2.8-3.4 1.5.3 2.7 1.4 3.3 2.8M12 13.6c1.4-.6 2.5-1.9 2.8-3.4-1.5.3-2.7 1.4-3.3 2.8M12 6c-1.4-.6-2.5-1.9-2.8-3.4 1.5.3 2.7 1.4 3.3 2.8M12 6c1.4-.6 2.5-1.9 2.8-3.4-1.5.3-2.7 1.4-3.3 2.8" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>'},
  crustaceos:{es:"Crustáceos",en:"Crustaceans",svg:'<path d="M16.5 6c-4.7 0-8 3.6-8 8.2 0 1.8 1.3 3.3 3 3.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16.5 6c1.6 0 2.6 1.4 2 3l-.6 1.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11.5 17.5c1.5.6 3 .2 4-1" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M9.2 12.3l-2.7-1.1M9.1 14.2l-2.9.3M10.1 10.6l-2-1.9" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'},
  huevos:{es:"Huevos",en:"Eggs",svg:'<path d="M12 3.2c-3.1 0-5.6 4-5.6 7.9a5.6 5.6 0 0 0 11.2 0c0-3.9-2.5-7.9-5.6-7.9z" fill="none" stroke="currentColor" stroke-width="1.5"/>'},
  pescado:{es:"Pescado",en:"Fish",svg:'<path d="M13.5 12c0 2.6-2.6 4.6-5.6 4.6S2.3 14.6 2.3 12 4.9 7.4 7.9 7.4 13.5 9.4 13.5 12z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M13.2 12l7.5-3.6v7.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6" cy="10.8" r="1" fill="currentColor"/>'},
  cacahuetes:{es:"Cacahuetes",en:"Peanuts",svg:'<path d="M12 3c-2.2 0-3.6 1.7-3.6 3.6 0 1.4.7 2.2.7 3.4S8.4 13 8.4 14.4C8.4 16.3 9.8 18 12 18s3.6-1.7 3.6-3.6c0-1.4-.7-2.2-.7-3.4s.7-2 .7-3.4C15.6 4.7 14.2 3 12 3z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 10.5h6" fill="none" stroke="currentColor" stroke-width="1.1"/>'},
  soja:{es:"Soja",en:"Soy",svg:'<path d="M12 21v-9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 14c3 0 5-2 5-5-3 0-5 2-5 5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'},
  lacteos:{es:"Lácteos",en:"Milk",svg:'<path d="M8.2 21V9.2l3.8-3 3.8 3V21z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.2 9.2h7.6M9.6 13.5h4.8v3.2H9.6z" fill="none" stroke="currentColor" stroke-width="1.3"/>'},
  frutossecos:{es:"Frutos secos",en:"Tree nuts",svg:'<path d="M6.5 9.5h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7.5 9.5c0 4 2 9.5 4.5 9.5s4.5-5.5 4.5-9.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 9.5c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 5V3.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>'},
  apio:{es:"Apio",en:"Celery",svg:'<path d="M9 21c-.5-4-.5-8 0-12M12 21c0-5 0-10 0-14M15 21c.5-4 .5-8 0-12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M9 9.5c-1-1-1.5-2.6-1.2-4.2M15 9.5c1-1 1.5-2.6 1.2-4.2M13.6 4c-1 .8-1.6 2-1.6 3.4M10.4 4c1 .8 1.6 2 1.6 3.4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>'},
  mostaza:{es:"Mostaza",en:"Mustard",svg:'<path d="M10.5 3h3v2.2l1.2 1.8c.2.3.3.7.3 1.1V19a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V8.1c0-.4.1-.8.3-1.1l1.2-1.8V3z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9.5 12h5" fill="none" stroke="currentColor" stroke-width="1.2"/>'},
  sesamo:{es:"Sésamo",en:"Sesame",svg:'<g fill="currentColor"><ellipse cx="9" cy="9.5" rx="1.5" ry="2.5" transform="rotate(-28 9 9.5)"/><ellipse cx="15" cy="10.5" rx="1.5" ry="2.5" transform="rotate(22 15 10.5)"/><ellipse cx="11.5" cy="15" rx="1.5" ry="2.5" transform="rotate(-8 11.5 15)"/></g>'},
  sulfitos:{es:"Sulfitos",en:"Sulphites",svg:'<path d="M8 3.5h8c-.2 4-2 6.5-4 6.5S8.2 7.5 8 3.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v8M8.5 20.5h7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'},
  altramuces:{es:"Altramuces",en:"Lupin",svg:'<g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="9" cy="9" r="2.4"/><circle cx="15" cy="11" r="2.4"/><circle cx="11" cy="15.5" r="2.4"/></g>'},
  moluscos:{es:"Moluscos",en:"Molluscs",svg:'<path d="M12 20.5c-4.8 0-8-3.8-8-8.6 0-1 .9-1.6 1.8-1l6.2 4 6.2-4c.9-.6 1.8 0 1.8 1 0 4.8-3.2 8.6-8 8.6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 20.5v-6M8.5 19l.8-5M15.5 19l-.8-5" fill="none" stroke="currentColor" stroke-width="1.2"/>'},
};
const ALLERGEN_ORDER = ["gluten","crustaceos","huevos","pescado","cacahuetes","soja","lacteos","frutossecos","apio","mostaza","sesamo","sulfitos","altramuces","moluscos"];
function alIcon(k, lang){
  const a = ALLERGENS[k]; if(!a) return "";
  return `<span class="al-ic" title="${a[lang]}" aria-label="${a[lang]}"><svg viewBox="0 0 24 24" aria-hidden="true">${a.svg}</svg></span>`;
}

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
    "al.title":"Alérgenos",
    "al.note":"Información sobre alérgenos · Reglamento (UE) 1169/2011. Nuestros platos se elaboran en una cocina donde se manipulan todos los alérgenos, por lo que pueden contener trazas. Si tiene alguna alergia o intolerancia, informe a nuestro personal antes de pedir.",
    "social.title":"Síguenos en redes sociales",
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
    "res.groups":"Para grupos de más de 8 personas, escríbenos por WhatsApp y te confirmamos la disponibilidad.",
    "res.wabtn":"Reservar por WhatsApp",
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
    "al.title":"Allergens",
    "al.note":"Allergen information · Regulation (EU) 1169/2011. Our dishes are prepared in a kitchen that handles all allergens, so traces may be present. If you have any allergy or intolerance, please inform our staff before ordering.",
    "social.title":"Follow us on social media",
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
    "res.groups":"For groups of more than 8, message us on WhatsApp and we’ll confirm availability.",
    "res.wabtn":"Book via WhatsApp",
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
  const al = (item.al && item.al.length)
    ? `<div class="al-row">${item.al.map(k=>alIcon(k,lang)).join("")}</div>` : "";
  return `<div class="dish${item.img ? ' has-thumb' : ''}">
      ${thumb}
      <div class="dish-main">
        <div class="dish-name">${item[lang]}</div>${desc}${al}
      </div>
      ${priceCell(item, lang)}
    </div>`;
}

function renderAllergenLegend(lang){
  const leg = document.getElementById("al-legend");
  if(leg){
    leg.innerHTML = ALLERGEN_ORDER.map(k=>
      `<span class="lg">${alIcon(k,lang)}${ALLERGENS[k][lang]}</span>`).join("");
  }
  const note = document.getElementById("al-note");
  if(note) note.textContent = I18N[lang]["al.note"];
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
  if(document.getElementById("carta-grid")){ renderMenu("carta", lang); renderAllergenLegend(lang); }
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
