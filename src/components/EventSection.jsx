import { motion } from 'framer-motion'

export default function EventSection({ icon: Icon, event }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="card-frame p-7 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-white/5 text-gold">
        <Icon size={26} />
      </div>
      <h3 className="mt-5 font-display text-4xl tracking-[0.04em] text-goldSoft">{event.title}</h3>
      <p className="mt-5 font-display text-2xl tracking-[0.03em]">{event.venue}</p>
      <p className="mt-2 text-white/70">{event.date}</p>
      <p className="text-white/70">{event.time}</p>
      <a className="gold-button mt-6" href={event.mapUrl} target="_blank" rel="noreferrer">
        Ver ubicación
      </a>
    </motion.article>
  )
}
