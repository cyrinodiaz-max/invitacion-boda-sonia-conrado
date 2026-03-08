import fs from 'fs'
import path from 'path'
import * as XLSX from 'xlsx'

export const FILE_NAME = 'lista_invitados_boda_sonia_conrado.xlsx'
export const COLUMNS = [
  'FechaRegistro',
  'Titular',
  'Asiste',
  'TieneAcompanantes',
  'CantidadAcompanantes',
  'CantidadMenores',
  'Acompanante1',
  'Acompanante2',
  'Acompanante3',
  'Telefono',
  'Mensaje',
  'TotalAsistentes'
]

const dataDir = path.join(process.cwd(), 'data')
const filePath = path.join(dataDir, FILE_NAME)

const autosize = (worksheet, data) => {
  const widths = COLUMNS.map((col) => ({ wch: Math.max(col.length + 2, 16) }))
  data.forEach((row) => {
    COLUMNS.forEach((col, index) => {
      widths[index].wch = Math.max(widths[index].wch, String(row[col] ?? '').length + 2)
    })
  })
  worksheet['!cols'] = widths
}

export const readRows = () => {
  if (!fs.existsSync(filePath)) return []
  const workbook = XLSX.readFile(filePath)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  return XLSX.utils.sheet_to_json(sheet)
}

export const writeRows = (rows) => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: COLUMNS })
  autosize(worksheet, rows)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Invitados')
  XLSX.writeFile(workbook, filePath)
}

export const getFilePath = () => filePath
