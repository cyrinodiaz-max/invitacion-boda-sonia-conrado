import { motion } from 'framer-motion'
import { weddingContent } from '../lib/content'

export default function DressCodeSection() {
  return (
    <section className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="card-frame p-8 text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-goldSoft/70">{weddingContent.dressCode.title}</p>
        <h3 className="mt-4 font-display text-5xl tracking-[0.06em] text-gold">{weddingContent.dressCode.value}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">{weddingContent.dressCode.description}</p>
      </motion.div>
    </section>
  )
}
