import { google } from "googleapis";

let cachedSheets = null;
let cachedSpreadsheetId = null;

async function getSheetsClient() {
  if (cachedSheets && cachedSpreadsheetId) {
    return { sheets: cachedSheets, spreadsheetId: cachedSpreadsheetId };
  }

  const GSHEET_ID = process.env.GSHEET_ID;
  const GOOGLE_SERVICE_ACCOUNT_BASE64 =
    process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

  if (!GSHEET_ID) {
    throw new Error("Falta GSHEET_ID");
  }

  if (!GOOGLE_SERVICE_ACCOUNT_BASE64) {
    throw new Error("Falta GOOGLE_SERVICE_ACCOUNT_BASE64");
  }

  const serviceAccountJson = Buffer.from(
    GOOGLE_SERVICE_ACCOUNT_BASE64,
    "base64"
  ).toString("utf8");

  const credentials = JSON.parse(serviceAccountJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  cachedSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  cachedSpreadsheetId = GSHEET_ID;

  return { sheets: cachedSheets, spreadsheetId: cachedSpreadsheetId };
}

function normalize(value) {
  return String(value || "").trim();
}

function isYes(value) {
  return normalize(value).toLowerCase() === "sí" || normalize(value).toLowerCase() === "si";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { sheets, spreadsheetId } = await getSheetsClient();
    const data = req.body || {};

    const id = normalize(data.id);

    if (!id) {
      return res.status(400).json({
        error: "Falta el id de la invitación",
      });
    }

    // 1. Buscar al invitado en la hoja Invitados
    const inviteResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Invitados!A:G",
    });

    const rows = inviteResponse.data.values || [];

    if (rows.length < 2) {
      return res.status(404).json({
        error: "No hay invitados cargados",
      });
    }

    const dataRows = rows.slice(1);
    const foundIndex = dataRows.findIndex((row) => normalize(row[0]) === id);

    if (foundIndex === -1) {
      return res.status(404).json({
        error: "Invitación no encontrada",
      });
    }

    const rowNumber = foundIndex + 2; // +1 por encabezados y +1 por índice base 1
    const inviteRow = dataRows[foundIndex];

    const titular = normalize(inviteRow[1]);
    const acompanante1 = normalize(inviteRow[3]);
    const acompanante2 = normalize(inviteRow[4]);
    const acompanante3 = normalize(inviteRow[5]);
    const estadoActual = normalize(inviteRow[6]).toLowerCase();

    if (estadoActual === "respondido") {
      return res.status(409).json({
        error: "Esta invitación ya fue respondida.",
      });
    }

    // 2. Leer respuestas del frontend
    const titularAsiste = normalize(data.titular_asiste);
    const acomp1Asiste = normalize(data.acomp1_asiste);
    const acomp2Asiste = normalize(data.acomp2_asiste);
    const acomp3Asiste = normalize(data.acomp3_asiste);
    const mensaje = normalize(data.mensaje);

    const totalAsistentes =
      (isYes(titularAsiste) ? 1 : 0) +
      (acompanante1 && isYes(acomp1Asiste) ? 1 : 0) +
      (acompanante2 && isYes(acomp2Asiste) ? 1 : 0) +
      (acompanante3 && isYes(acomp3Asiste) ? 1 : 0);

    // 3. Guardar respuesta en la hoja Respuestas
    const responseRow = [
      new Date().toISOString(), // fecha
      id,
      titular,
      titularAsiste,
      acompanante1,
      acomp1Asiste,
      acompanante2,
      acomp2Asiste,
      acompanante3,
      acomp3Asiste,
      mensaje,
      totalAsistentes,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Respuestas!A:L",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [responseRow],
      },
    });

    // 4. Marcar en Invitados como respondido
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Invitados!G${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [["respondido"]],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Respuesta registrada correctamente",
      totalAsistentes,
    });
  } catch (error) {
    console.error("ERROR RESPOND:", error);

    return res.status(500).json({
      error: "No se pudo registrar la respuesta.",
      details: error.message,
    });
  }
}
