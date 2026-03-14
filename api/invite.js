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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { sheets, spreadsheetId } = await getSheetsClient();
    const id = normalize(req.query?.id);

    if (!id) {
      return res.status(400).json({
        error: "Falta el parámetro id",
      });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Invitados!A:G",
    });

    const rows = response.data.values || [];

    if (rows.length < 2) {
      return res.status(404).json({
        error: "No hay invitados cargados",
      });
    }

    // Saltamos encabezados
    const dataRows = rows.slice(1);

    const foundIndex = dataRows.findIndex((row) => normalize(row[0]) === id);

    if (foundIndex === -1) {
      return res.status(404).json({
        error: "Invitación no encontrada",
      });
    }

    const row = dataRows[foundIndex];

    const invite = {
      id: normalize(row[0]),
      titular: normalize(row[1]),
      telefono: normalize(row[2]),
      acompanantes: [
        normalize(row[3]),
        normalize(row[4]),
        normalize(row[5]),
      ].filter(Boolean),
      estado: normalize(row[6]) || "pendiente",
    };

    return res.status(200).json({
      success: true,
      invite,
    });
  } catch (error) {
    console.error("ERROR INVITE:", error);

    return res.status(500).json({
      error: "No se pudo obtener la invitación.",
      details: error.message,
    });
  }
}
