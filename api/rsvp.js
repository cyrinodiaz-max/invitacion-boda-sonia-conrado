import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const GSHEET_ID = process.env.GSHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_BASE64 =
      process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

    if (!GSHEET_ID) throw new Error("Falta GSHEET_ID");
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

    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const data = req.body;

    const totalAsistentes =
      data.asiste === "Sí"
        ? 1 + Number(data.cantidadAcompanantes || 0)
        : 0;

    const row = [
      new Date().toISOString(),
      data.titular || "",
      data.asiste || "",
      data.tieneAcompanantes || "",
      Number(data.cantidadAcompanantes || 0),
      Number(data.cantidadMenores || 0),
      data.acompanante1 || "",
      data.acompanante2 || "",
      data.acompanante3 || "",
      data.telefono || "",
      data.mensaje || "",
      totalAsistentes,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: GSHEET_ID,
      range: "A:L",
      valueInputOption: "USER_ENTERED",
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