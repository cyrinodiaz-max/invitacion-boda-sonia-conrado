import { motion } from "framer-motion";

export default function EventSection({ icon: Icon, event }) {
  return (
    <motion.article
      className="card-frame event-card text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-[#102546]/75 text-gold shadow-md">
        <Icon size={24} strokeWidth={1.8} />
      </div>

      <h3 className="text-3xl text-gold sm:text-4xl">
        {event.title}
      </h3>

      <p className="mt-4 text-2xl text-white/95">
        {event.place}
      </p>

      {event.address && (
        <p className="mt-3 text-base leading-relaxed text-white/70">
          {event.address}
        </p>
      )}

      <div className="mt-5 space-y-1 text-lg text-white/80">
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>

      {event.mapUrl && (
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="gold-button mt-8"
        >
          Ver ubicación
        </a>
      )}
    </motion.article>
  );
}
