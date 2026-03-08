import { weddingContent } from '../lib/content'

export default function Footer() {
  return (
    <footer className="section-shell pt-0 pb-12">
      <div className="card-frame px-6 py-10 text-center">
        <h4 className="font-script text-5xl text-gold">{weddingContent.footer.names}</h4>
        <p className="mt-2 font-display text-2xl tracking-[0.03em] text-goldSoft">{weddingContent.footer.date}</p>
        <p className="mt-5 text-white/75">Contacto para consultas: {weddingContent.footer.phone}</p>
        <p className="mt-3 text-white/60">{weddingContent.footer.message}</p>
      </div>
    </footer>
  )
}
