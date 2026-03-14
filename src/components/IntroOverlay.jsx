import { motion } from 'framer-motion'
import { weddingContent } from '../lib/content'

export default function IntroOverlay({ onOpen }) {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stars px-6"
    >
      <div className="card-frame w-full max-w-2xl p-8 text-center sm:p-12">
        <p className="mx-auto max-w-xl font-body text-[1.35rem] leading-relaxed text-goldSoft/95 sm:text-[1.6rem]">
          {weddingContent.intro.eyebrow}
        </p>
        <h1 className="mt-6 font-script text-6xl text-gold sm:text-8xl">
          {weddingContent.intro.names}
        </h1>
        <button
          type="button"
          className="gold-button mt-10"
          onClick={onOpen}
        >
          {weddingContent.intro.cta}
        </button>
      </div>
    </motion.section>
  )
}
