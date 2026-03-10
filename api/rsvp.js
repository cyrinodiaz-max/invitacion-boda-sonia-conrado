import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const GSHEET_ID = process.env.GSHEET_ID;
    const GSHEET_CLIENT_EMAIL = process.env.GSHEET_CLIENT_EMAIL;
    const GSHEET_PRIVATE_KEY = process.env.GSHEET_PRIVATE_KEY;

    if (!GSHEET_ID) throw new Error("Falta GSHEET_ID");
    if (!GSHEET_CLIENT_EMAIL) throw new Error("Falta GSHEET_CLIENT_EMAIL");
    if (!GSHEET_PRIVATE_KEY) throw new Error("Falta GSHEET_PRIVATE_KEY");

    const data = req.body;

    const auth = new google.auth.JWT({
      email: GSHEET_CLIENT_EMAIL,
      key: GSHEET_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });

    const totalAsistentes =
      data.asiste === "Sí" ? 1 + Number(data.cantidadAcompanantes || 0) : 0;

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