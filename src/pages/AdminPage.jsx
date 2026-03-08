import { useEffect, useMemo, useState } from 'react'
import { weddingContent } from '../lib/content'

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('admin')
  const [pass, setPass] = useState('admin123')
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('admin-auth') === 'ok')
  }, [])

  useEffect(() => {
    if (!loggedIn) return
    fetch('/api/admin-rsvps')
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setRecords(data.records || []))
      .catch(() => setRecords([]))
  }, [loggedIn])

  const filtered = useMemo(() => records.filter((row) => {
    const q = search.toLowerCase()
    return !q || String(row.Titular || '').toLowerCase().includes(q)
  }), [records, search])

  const handleLogin = (e) => {
    e.preventDefault()
    if (user === weddingContent.admin.username && pass === weddingContent.admin.password) {
      sessionStorage.setItem('admin-auth', 'ok')
      setLoggedIn(true)
      return
    }
    alert('Credenciales inválidas')
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-stars px-6 py-16 text-ink">
        <form onSubmit={handleLogin} className="card-frame mx-auto max-w-md space-y-4 p-8">
          <h1 className="font-display text-4xl text-goldSoft">Panel admin</h1>
          <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" />
          <button className="gold-button w-full">Ingresar</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stars px-4 py-10 text-ink sm:px-6">
      <div className="section-shell max-w-6xl px-0 py-0">
        <div className="card-frame overflow-hidden p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display text-4xl text-goldSoft">Confirmaciones</h1>
            <div className="flex gap-3">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por titular" className="max-w-xs" />
              <a className="gold-button" href="/api/export-xlsx">Exportar XLSX</a>
            </div>
          </div>
          <div className="mt-6 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-goldSoft">
                <tr>
                  {['Titular', 'Asiste', 'Cant. Acomp.', 'Menores', 'Acompañante1', 'Acompañante2', 'Acompañante3', 'Teléfono'].map((head) => (
                    <th key={head} className="border-b border-gold/15 px-3 py-3">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="px-3 py-3">{row.Titular}</td>
                    <td className="px-3 py-3">{row.Asiste}</td>
                    <td className="px-3 py-3">{row.CantidadAcompanantes}</td>
                    <td className="px-3 py-3">{row.CantidadMenores}</td>
                    <td className="px-3 py-3">{row.Acompanante1}</td>
                    <td className="px-3 py-3">{row.Acompanante2}</td>
                    <td className="px-3 py-3">{row.Acompanante3}</td>
                    <td className="px-3 py-3">{row.Telefono}</td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr><td className="px-3 py-6 text-white/60" colSpan="8">No hay registros todavía.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
