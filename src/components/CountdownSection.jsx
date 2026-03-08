import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'

export default function CountdownSection({ target }) {
  const time = useCountdown(target)
  const items = [
    ['Días', time.days],
    ['Horas', time.hours],
    ['Minutos', time.minutes],
    ['Segundos', time.seconds]
  ]

  return (
    <section className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="card-frame px-6 py-10"
      >
        <div className="text-center">
          <p className="font-display text-3xl tracking-[0.06em] text-goldSoft sm:text-4xl">Save the Date</p>
          <p className="mt-2 text-white/70">Cuenta regresiva hasta el 20 de junio del 2026 — 17:00 hs</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-gold/20 bg-[#0f2244]/70 p-5 text-center">
              <div className="font-display text-5xl tracking-[0.06em] text-gold sm:text-6xl">{String(value).padStart(2, '0')}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.25em] text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
