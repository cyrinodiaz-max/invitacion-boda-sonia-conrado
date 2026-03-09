import { google } from "googleapis";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {

    const data = req.body;

    const auth = new google.auth.JWT(
      process.env.GSHEET_CLIENT_EMAIL,
      null,
      process.env.GSHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({
      version: "v4",
      auth
    });

    const row = [
      new Date().toISOString(),
      data.titular,
      data.asiste,
      data.tieneAcompanantes,
      data.cantidadAcompanantes,
      data.cantidadMenores,
      data.acompanante1,
      data.acompanante2,
      data.acompanante3,
      data.telefono,
      data.mensaje
    ];

    await sheets.spreadsheets.values.append({

      spreadsheetId: process.env.GSHEET_ID,

      range: "A1",

      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [row]
      }

    });

    return res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "No se pudo enviar la confirmación."
    });

  }

}