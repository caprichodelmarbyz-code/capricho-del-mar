# Trabaja con nosotros — puesta en marcha

El formulario ya está en la web, pero **todavía no envía nada**. Faltan 10 minutos
de configuración en Google. Es gratis y no hace falta contratar nada.

Cómo funciona: la web manda los datos y el CV a un script de Google que guarda el
archivo en tu Drive, apunta una fila en una hoja de cálculo y te reenvía todo por
email con el CV adjunto.

---

## Paso 1 · Crear la hoja de cálculo

1. Entra en <https://sheets.google.com> con la cuenta de Google del restaurante
   (importante: la que quieras que sea la dueña de los CV).
2. Hoja de cálculo nueva en blanco.
3. Ponle de nombre, por ejemplo, **Candidaturas — Capricho del Mar**.

## Paso 2 · Pegar el script

1. En esa misma hoja: menú **Extensiones → Apps Script**.
2. Borra todo lo que haya en el editor.
3. Abre el archivo `apps-script/Codigo.gs` de este ZIP, copia **todo** su contenido
   y pégalo.
4. Arriba del todo, en el bloque `CONFIG`, cambia:

   ```js
   DESTINATARIOS: 'CAMBIA_ESTO@ejemplo.com',
   ```

   por tu email. Si quieres que le llegue también a Ismael, sepáralos por comas:

   ```js
   DESTINATARIOS: 'tu@correo.com, ismael@caprichodelmarbyz.com',
   ```

5. Guarda (icono del disquete o `Ctrl+S`).

> **Ojo:** el script tiene que crearse desde dentro de la hoja (Extensiones → Apps
> Script), no como proyecto suelto. Si no, no encuentra la hoja donde escribir.

## Paso 3 · Publicarlo

1. Botón azul **Implementar → Nueva implementación**.
2. En el engranaje ⚙ de la izquierda elige **Aplicación web**.
3. Rellena:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier usuario** ← esto es lo importante
4. **Implementar**. Te pedirá permisos: acepta. Aparecerá un aviso de "Google no ha
   verificado esta aplicación" → **Configuración avanzada → Ir a (nombre del
   proyecto)** → **Permitir**. Es normal, es tu propio script.
5. Copia la **URL de la aplicación web**. Termina en `/exec`.

## Paso 4 · Pegar la URL en la web

Abre `assets/app.js`, busca esta línea (está casi al final):

```js
const EMPLEO_ENDPOINT = "PEGA_AQUI_LA_URL_DE_APPS_SCRIPT";
```

y sustituye el texto por tu URL:

```js
const EMPLEO_ENDPOINT = "https://script.google.com/macros/s/AKfy...../exec";
```

Sube el ZIP a GitHub y listo. Haz una prueba enviándote una candidatura falsa.

---

## Comprobaciones rápidas si algo falla

| Síntoma | Causa casi segura |
|---|---|
| "No hemos podido enviar tu candidatura" | La URL no está pegada, o está mal copiada (tiene que acabar en `/exec`) |
| Llega el email pero sin CV | El archivo pesaba más de 5 MB |
| No llega nada y la hoja está vacía | En el paso 3 no pusiste "Cualquier usuario" |
| Funcionaba y ha dejado de hacerlo | Si editas el script, hay que hacer **Implementar → Gestionar implementaciones → editar ✏ → Versión: Nueva versión**. Si no, sigue publicada la versión vieja |

Para ver errores: en el editor de Apps Script, menú **Ejecuciones** (icono de reloj).

---

## Límites reales (todos gratis)

- **100 emails al día** con una cuenta de Gmail normal. Para candidaturas de un
  restaurante te sobra de largo.
- **CV de hasta 5 MB.** Un CV en PDF pesa entre 100 KB y 1 MB, así que va sobrado.
  El límite está puesto a propósito: por encima, Apps Script empieza a fallar.
- **15 GB** de Drive compartidos con Gmail y Fotos.

---

## Protección de datos (RGPD)

Recoger CV es tratar datos personales, así que conviene tener esto en cuenta:

- El formulario ya incluye la **casilla de consentimiento obligatoria**. Sin marcarla
  no se puede enviar.
- Los CV quedan en una carpeta de tu Drive llamada *CV - Capricho del Mar by Z*.
  **No la compartas con enlace público.**
- No deberías guardar candidaturas indefinidamente. El script incluye una función
  `limpiarCandidaturasAntiguas()` que borra las de más de 12 meses (hoja y archivo
  de Drive). Puedes ejecutarla a mano de vez en cuando o programarla:
  en Apps Script → **Activadores** (icono del reloj despertador) → *Añadir activador*
  → función `limpiarCandidaturasAntiguas`, origen *Basado en tiempo*, *Mensual*.
- Si algún día montas una página de política de privacidad, enlázala en el texto de
  la casilla.

Esto cubre lo básico y razonable. Si el restaurante ya tiene asesoría para
protección de datos, comprueba con ellos el texto del consentimiento.
