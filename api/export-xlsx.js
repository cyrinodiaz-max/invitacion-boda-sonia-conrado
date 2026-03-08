import fs from 'fs'
import { getFilePath } from './_storage.js'

export default async function handler(req, res) {
  const filePath = getFilePath()
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Todavía no existe el archivo de invitados.')
  }
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', 'attachment; filename="lista_invitados_boda_sonia_conrado.xlsx"')
  fs.createReadStream(filePath).pipe(res)
}
