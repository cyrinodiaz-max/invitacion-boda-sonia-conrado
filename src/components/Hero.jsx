import { motion } from 'framer-motion'
import { weddingContent } from '../lib/content'

export default function Hero() {
  return (
    <section className="section-shell text-center relative hero-soft-spacing">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="card-frame relative overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-16"
      >
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative z-[1]">
          <p className="tracking-[0.35em] text-goldSoft/80 uppercase">
            {weddingContent.hero.label}
          </p>

          <h2 className="mt-5 font-script text-6xl text-gold hero-title-elevated sm:text-8xl">
            {weddingContent.hero.names}
          </h2>

          <div className="hero-divider" aria-hidden="true" />

          <p className="mx-auto mt-6 max-w-3xl font-body text-[1.5rem] leading-relaxed text-ink/90 sm:text-[1.9rem]">
            {weddingContent.hero.message}
          </p>

          <p className="mt-8 inline-block rounded-full border border-gold/30 px-5 py-2 font-body text-[1.35rem] leading-relaxed text-goldSoft/95 sm:text-[1.6rem]">
            {weddingContent.hero.dateLabel}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
