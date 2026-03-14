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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    const data = req.body || {};

    const asiste = data.asiste || "";
    const cantidadAcompanantes = Number(data.cantidadAcompanantes || 0);
    const cantidadMenores = Number(data.cantidadMenores || 0);

    const totalAsistentes =
      asiste === "Sí" ? 1 + cantidadAcompanantes : 0;

    const row = [
      new Date().toISOString(),
      data.titular || "",
      asiste,
      data.tieneAcompanantes || "",
      cantidadAcompanantes,
      cantidadMenores,
      data.acompanante1 || "",
      data.acompanante2 || "",
      data.acompanante3 || "",
      data.telefono || "",
      data.mensaje || "",
      totalAsistentes,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "B:M",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Confirmación enviada correctamente",
    });
  } catch (error) {
    console.error("ERROR RSVP:", error);

    return res.status(500).json({
      error: "No se pudo enviar la confirmación.",
      details: error.message,
    });
  }
}
