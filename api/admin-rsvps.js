import { readRows } from './_storage.js'

export default async function handler(req, res) {
  return res.status(200).json({ records: readRows() })
}
