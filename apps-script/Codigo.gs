/**
 * Capricho del Mar by Z — Recepción de candidaturas "Trabaja con nosotros"
 * ------------------------------------------------------------------------
 * Qué hace cada vez que alguien envía el formulario de la web:
 *   1. Guarda el CV en una carpeta de tu Google Drive.
 *   2. Apunta una fila en la hoja de cálculo (registro de candidaturas).
 *   3. Te manda un email con los datos y el CV adjunto.
 *
 * Todo con la cuenta de Google del restaurante. Coste: 0 €.
 *
 * ANTES DE PUBLICAR: rellena los tres valores de CONFIG.
 */

const CONFIG = {
  // Email (o emails, separados por coma) que reciben las candidaturas
  DESTINATARIOS: 'CAMBIA_ESTO@ejemplo.com',

  // Nombre de la carpeta de Drive donde se guardan los CV.
  // Se crea sola la primera vez, no hace falta que la crees tú.
  CARPETA_DRIVE: 'CV - Capricho del Mar by Z',

  // Nombre de la pestaña de la hoja donde se apuntan las candidaturas.
  HOJA: 'Candidaturas'
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB


function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'sin-datos' });
    }

    const d = JSON.parse(e.postData.contents);

    // --- Validación mínima en servidor ---
    const nombre = limpia(d.nombre);
    const email  = limpia(d.email);
    const tel    = limpia(d.telefono);
    if (!nombre || !email || !tel || !d.cvBase64) {
      return json({ ok: false, error: 'campos-incompletos' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'email-invalido' });
    }

    // --- Reconstruir el archivo ---
    const bytes = Utilities.base64Decode(d.cvBase64);
    if (bytes.length > MAX_BYTES) {
      return json({ ok: false, error: 'archivo-demasiado-grande' });
    }

    const ext = String(d.cvNombre || '').split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'].indexOf(ext) === -1) {
      return json({ ok: false, error: 'formato-no-valido' });
    }

    const sello  = Utilities.formatDate(new Date(), 'Europe/Madrid', 'yyyy-MM-dd');
    const limpio = nombre.replace(/[^\w\sÀ-ÿ-]/g, '').trim().replace(/\s+/g, '_');
    const blob   = Utilities.newBlob(bytes, d.cvTipo || 'application/octet-stream',
                                     sello + '_' + limpio + '.' + ext);

    // --- 1. Guardar en Drive ---
    const carpeta = carpetaDestino(CONFIG.CARPETA_DRIVE);
    const archivo = carpeta.createFile(blob);

    // --- 2. Apuntar en la hoja ---
    const hoja = hojaDestino(CONFIG.HOJA);
    hoja.appendRow([
      new Date(),
      nombre,
      email,
      tel,
      limpia(d.puesto),
      limpia(d.disponibilidad),
      limpia(d.inicio),
      limpia(d.mensaje),
      archivo.getUrl(),
      d.idioma === 'en' ? 'EN' : 'ES'
    ]);

    // --- 3. Avisarte por email ---
    const cuerpo =
      'Nueva candidatura desde la web\n' +
      '--------------------------------------------\n' +
      'Nombre:          ' + nombre + '\n' +
      'Email:           ' + email + '\n' +
      'Teléfono:        ' + tel + '\n' +
      'Puesto:          ' + (limpia(d.puesto) || '—') + '\n' +
      'Disponibilidad:  ' + (limpia(d.disponibilidad) || '—') + '\n' +
      'Puede empezar:   ' + (limpia(d.inicio) || '—') + '\n' +
      'Idioma web:      ' + (d.idioma === 'en' ? 'Inglés' : 'Español') + '\n\n' +
      'Experiencia:\n' + (limpia(d.mensaje) || '(no ha escrito nada)') + '\n\n' +
      '--------------------------------------------\n' +
      'CV adjunto en este correo y guardado en Drive:\n' + archivo.getUrl() + '\n';

    MailApp.sendEmail({
      to: CONFIG.DESTINATARIOS,
      replyTo: email,                       // así respondes al candidato directamente
      subject: 'Candidatura web · ' + (limpia(d.puesto) || 'Sin puesto') + ' · ' + nombre,
      body: cuerpo,
      attachments: [archivo.getBlob()]
    });

    return json({ ok: true });

  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}


/** Permite abrir la URL en el navegador para comprobar que está publicada. */
function doGet() {
  return json({ ok: true, servicio: 'Capricho del Mar by Z — candidaturas' });
}


/* ---------- utilidades ---------- */

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function limpia(v) {
  return String(v == null ? '' : v).trim().slice(0, 4000);
}

function carpetaDestino(nombre) {
  const it = DriveApp.getFoldersByName(nombre);
  return it.hasNext() ? it.next() : DriveApp.createFolder(nombre);
}

function hojaDestino(nombre) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(nombre);
  if (!hoja) {
    hoja = libro.insertSheet(nombre);
    hoja.appendRow(['Fecha', 'Nombre', 'Email', 'Teléfono', 'Puesto',
                    'Disponibilidad', 'Puede empezar', 'Experiencia',
                    'CV (Drive)', 'Idioma']);
    hoja.getRange('A1:J1').setFontWeight('bold');
    hoja.setFrozenRows(1);
  }
  return hoja;
}


/**
 * OPCIONAL — Borrado automático de candidaturas antiguas (RGPD).
 * Ejecuta esta función a mano, o programa un activador mensual, para eliminar
 * los CV con más de 12 meses. Cambia MESES si quieres otro plazo.
 */
function limpiarCandidaturasAntiguas() {
  const MESES = 12;
  const corte = new Date();
  corte.setMonth(corte.getMonth() - MESES);

  const hoja = hojaDestino(CONFIG.HOJA);
  const filas = hoja.getDataRange().getValues();

  for (let i = filas.length - 1; i >= 1; i--) {
    const fecha = filas[i][0];
    if (fecha instanceof Date && fecha < corte) {
      const url = String(filas[i][8] || '');
      const id  = url.match(/[-\w]{25,}/);
      if (id) {
        try { DriveApp.getFileById(id[0]).setTrashed(true); } catch (err) {}
      }
      hoja.deleteRow(i + 1);
    }
  }
}
