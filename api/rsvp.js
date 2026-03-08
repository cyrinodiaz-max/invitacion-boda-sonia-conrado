import { readRows, writeRows } from './_storage.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const body = req.body || {}
  if (!body.titular || !body.asiste) {
    return res.status(422).json({ error: 'Faltan campos obligatorios' })
  }

  const rows = readRows()
  const softDuplicate = rows.find((row) => row.Titular === body.titular && row.Telefono === body.telefono)
  if (softDuplicate) {
    return res.status(409).json({ error: 'Ya existe una confirmación similar' })
  }

  const companionCount = body.asiste === 'Sí' && body.tieneAcompanantes === 'Sí' ? Number(body.cantidadAcompanantes || 0) : 0
  const row = {
    FechaRegistro: new Date().toISOString(),
    Titular: body.titular,
    Asiste: body.asiste,
    TieneAcompanantes: body.tieneAcompanantes || 'No',
    CantidadAcompanantes: companionCount,
    CantidadMenores: Number(body.cantidadMenores || 0),
    Acompanante1: body.acompanante1 || '',
    Acompanante2: body.acompanante2 || '',
    Acompanante3: body.acompanante3 || '',
    Telefono: body.telefono || '',
    Mensaje: body.mensaje || '',
    TotalAsistentes: body.asiste === 'Sí' ? 1 + companionCount : 0
  }

  rows.push(row)
  writeRows(rows)
  return res.status(201).json({ status: 'ok', row })
}
