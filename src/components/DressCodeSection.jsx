import { motion } from "framer-motion";
import { weddingContent } from "../lib/content";

export default function DressCodeSection() {
  return (
    <motion.section
      className="section-shell"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="card-frame px-6 py-10 text-center sm:px-10 sm:py-12">

        <p className="text-xs uppercase tracking-[0.35em] text-goldSoft/85">
          Código de Vestimenta
        </p>

        <h3 className="mt-4 font-display text-4xl text-gold sm:text-5xl">
          Elegante
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-white/75 leading-relaxed">
          Agradecemos tu presencia y te invitamos a acompañarnos con una vestimenta acorde a esta ocasión tan especial.
        </p>

      </div>
    </motion.section>
  );
}
