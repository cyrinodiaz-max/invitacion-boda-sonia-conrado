import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { weddingContent } from './lib/content'
import IntroOverlay from './components/IntroOverlay'
import Hero from './components/Hero'
import CountdownSection from './components/CountdownSection'
import EventSection from './components/EventSection'
import DressCodeSection from './components/DressCodeSection'
import RSVPSection from './components/RSVPSection'
import Footer from './components/Footer'
import { Church, GlassWater } from 'lucide-react'

export default function App() {
  const [opened, setOpened] = useState(false)

  return (
    <div className="min-h-screen bg-stars text-ink">
      <AnimatePresence>
        {!opened && <IntroOverlay onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 0.9, 0.15, 1] }}
        className="relative"
      >
        <Hero />
        <CountdownSection target={weddingContent.countdown.target} />
        <section className="section-shell grid gap-6 lg:grid-cols-2">
          <EventSection icon={Church} event={weddingContent.events.ceremony} />
          <EventSection icon={GlassWater} event={weddingContent.events.reception} />
        </section>
        <DressCodeSection />
        <RSVPSection />
        <Footer />
      </motion.main>
    </div>
  )
}
