import { motion } from 'framer-motion'
import { weddingContent } from '../lib/content'

export default function Footer() {
  return (
    <motion.footer
      className="section-shell pt-0 pb-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="card-frame px-6 py-10 text-center sm:px-10 sm:py-12">
        <p className="mx-auto mb-6 max-w-2xl text-sm italic leading-relaxed text-white/70 sm:text-base">
          “Así que ya no son dos, sino una sola carne; por tanto lo que Dios unió no lo separe el hombre.”
          <br />
          <span className="mt-2 inline-block text-goldSoft">Mateo 19:6</span>
        </p>

        <h4 className="font-script text-5xl text-gold sm:text-6xl">
          {weddingContent.footer.names}
        </h4>

        <p className="mt-3 font-display text-2xl tracking-[0.03em] text-goldSoft">
          {weddingContent.footer.date}
        </p>

        <p className="mt-5 text-white/75">
          Contacto para consultas: {weddingContent.footer.phone}
        </p>

        <p className="mt-3 text-white/60">
          {weddingContent.footer.message}
        </p>
      </div>
    </motion.footer>
  )
}
