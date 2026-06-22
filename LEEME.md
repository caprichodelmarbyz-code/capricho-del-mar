# Capricho del Mar by Z — Web

Web estática (HTML + CSS + JS, sin build) lista para subir **gratis a Vercel**.
Bilingüe ES/EN con un solo botón, carta + vinos, reservas con widget de Revoflow y contacto con mapa.

## Estructura
```
capricho-web/
├── index.html        Página principal (inicio · carta · vinos · contacto)
├── reservas.html     Página de reservas con el widget de Revoflow
└── assets/
    ├── styles.css    Todos los estilos (colores de marca aquí arriba)
    ├── app.js        Carta, vinos e idiomas — ÚNICA fuente de la verdad
    └── logo.svg      Logo provisional (reemplázalo por el real)
```

## Subir a Vercel (lo más fácil para esta web estática)
1. **Descomprime** `capricho-web.zip` → te queda la carpeta `capricho-web`.
2. En la pantalla de nuevo proyecto de Vercel, ignora el cuadro grande de arriba ("Ask v0…").
   Justo debajo verás la línea **"…or choose a file or a folder"** → pulsa **folder**
   (o arrastra la carpeta `capricho-web` a la página).
3. Vercel detecta que es una web estática y la publica. En segundos tendrás una URL
   tipo `capricho-del-mar.vercel.app`.
> Alternativa: subir la carpeta a un repo de GitHub y conectarlo (cada push actualiza la web).

## Estructura
```
capricho-web/
├── index.html        Inicio · carta · vinos · contacto
├── reservas.html     Reservas con widget de Revoflow
└── assets/
    ├── styles.css    Estilos (colores de marca arriba del todo)
    ├── app.js        Carta, vinos e idiomas — ÚNICA fuente de la verdad
    ├── logo-light.png  Logo claro (para fondos azules)
    ├── logo-color.png  Logo a color (para fondos claros)
    └── favicon.png
```

## Cómo editar
- **Platos y precios:** `assets/app.js`, objeto `MENU`. `mkt:true`→"S/M"; `copa:"3,50"`→precio por copa.
- **Galería:** `assets/app.js`, array `GALLERY`. Sube las fotos a `assets/galeria/` y añade líneas como
  `{ src:"assets/galeria/sala.jpg", alt:{es:"Nuestra sala", en:"Our dining room"} }`.
  Mientras esté vacío, se muestran marcos "Próximamente".
- **Textos** (botones, títulos): objeto `I18N` en el mismo archivo.
- **Colores:** `assets/styles.css`, bloque `:root` (azul #053068, coral #FD6503).
- **Horario / teléfono:** en `index.html` (Contacto y pie).
- **Widget de reservas:** en `reservas.html`, atributo `data-base` del iframe (y del enlace de respaldo). Si cambias el token en Revoflow, actualízalo en esos dos sitios.

## Hecho
- Logo real + colores exactos (#053068 / #FD6503).
- Carta y vinos actualizados a las últimas versiones (PDF de junio).
- Galería lista (a la espera de fotos).
- Teléfono 613 18 60 34 (pequeño, en el pie).
- Widget de reservas con ruta /index + botón de respaldo.

## Pendiente
- Activar el widget en Revoflow / token válido para que cargue embebido (ver chat).
- Subir fotos a la galería.
- Cuando tengas la URL final, regenero los QR de las cartas digitales.
