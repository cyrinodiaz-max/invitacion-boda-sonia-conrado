import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { weddingContent } from "../lib/content";

export default function RSVPSection({
  inviteData,
  inviteLoading,
  inviteError,
}) {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const [titularAsiste, setTitularAsiste] = useState("Sí");
  const [acomp1Asiste, setAcomp1Asiste] = useState("Sí");
  const [acomp2Asiste, setAcomp2Asiste] = useState("Sí");
  const [acomp3Asiste, setAcomp3Asiste] = useState("Sí");
  const [acomp4Asiste, setAcomp4Asiste] = useState("Sí");
  const [acomp5Asiste, setAcomp5Asiste] = useState("Sí");
  const [mensaje, setMensaje] = useState("");

  const acompanantes = useMemo(() => {
    return inviteData?.acompanantes || [];
  }, [inviteData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (sending || !inviteData) return;

    setSending(true);

    try {
      const payload = {
        id: inviteData.id,
        titular_asiste: titularAsiste,
        acomp1_asiste: acompanantes[0] ? acomp1Asiste : "",
        acomp2_asiste: acompanantes[1] ? acomp2Asiste : "",
        acomp3_asiste: acompanantes[2] ? acomp3Asiste : "",
        acomp4_asiste: acompanantes[3] ? acomp4Asiste : "",
        acomp5_asiste: acompanantes[4] ? acomp5Asiste : "",
        mensaje,
      };

      const response = await fetch("/api/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No se pudo registrar la respuesta.");
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error RSVP personalizado:", error);
      alert(error.message || "No se pudo registrar la respuesta.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.section
      className="section-shell pb-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="card-frame p-6 sm:p-8">
        <div className="text-center">
          <h3 className="font-display text-4xl tracking-[0.05em] text-goldSoft sm:text-5xl">
            {weddingContent.rsvp.title}
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-white/75">
            {weddingContent.rsvp.description}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {inviteLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-10 max-w-2xl text-center text-white/75"
            >
              Cargando invitación...
            </motion.div>
          ) : inviteError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-10 max-w-2xl rounded-3xl border border-red-400/30 bg-red-950/30 p-6 text-center text-red-200"
            >
              {inviteError}
            </motion.div>
          ) : inviteData?.estado?.toLowerCase() === "respondido" ? (
            <motion.div
              key="already-answered"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-10 max-w-xl rounded-3xl border border-gold/25 bg-[#10254b]/80 p-8 text-center"
            >
              <CheckCircle2 className="mx-auto text-gold" size={54} />
              <p className="mt-4 font-display text-3xl text-goldSoft">
                Esta respuesta ya fue registrada correctamente.
              </p>
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-10 max-w-xl rounded-3xl border border-gold/25 bg-[#10254b]/80 p-8 text-center"
            >
              <CheckCircle2 className="mx-auto text-gold" size={54} />
              <p className="mt-4 font-display text-3xl text-goldSoft">
                {weddingContent.rsvp.successMessage}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="mx-auto mt-10 max-w-3xl space-y-5"
            >
              <div className="card-frame p-5 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-goldSoft/75">
                  Titular
                </p>
                <p className="mt-2 text-2xl text-white/95">
                  {inviteData?.titular}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-white/75">
                  Confirmación del titular
                </label>
                <select
                  value={titularAsiste}
                  onChange={(e) => setTitularAsiste(e.target.value)}
                >
                  <option value="Sí">Sí asistiré</option>
                  <option value="No">No podré asistir</option>
                </select>
              </div>

              {titularAsiste === "Sí" && acompanantes.length > 0 && (
                <div className="space-y-4">
                  <div className="card-frame p-5 text-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-goldSoft/75">
                      Acompañantes asignados
                    </p>
                  </div>

                  {acompanantes[0] && (
                    <div className="space-y-2">
                      <label className="block text-sm text-white/75">
                        {acompanantes[0]}
                      </label>
                      <select
                        value={acomp1Asiste}
                        onChange={(e) => setAcomp1Asiste(e.target.value)}
                      >
                        <option value="Sí">Sí asistirá</option>
                        <option value="No">No asistirá</option>
                      </select>
                    </div>
                  )}

                  {acompanantes[1] && (
                    <div className="space-y-2">
                      <label className="block text-sm text-white/75">
                        {acompanantes[1]}
                      </label>
                      <select
                        value={acomp2Asiste}
                        onChange={(e) => setAcomp2Asiste(e.target.value)}
                      >
                        <option value="Sí">Sí asistirá</option>
                        <option value="No">No asistirá</option>
                      </select>
                    </div>
                  )}

                  {acompanantes[2] && (
                    <div className="space-y-2">
                      <label className="block text-sm text-white/75">
                        {acompanantes[2]}
                      </label>
                      <select
                        value={acomp3Asiste}
                        onChange={(e) => setAcomp3Asiste(e.target.value)}
                      >
                        <option value="Sí">Sí asistirá</option>
                        <option value="No">No asistirá</option>
                      </select>
                    </div>
                  )}

                  {acompanantes[3] && (
                    <div className="space-y-2">
                      <label className="block text-sm text-white/75">
                        {acompanantes[3]}
                      </label>
                      <select
                        value={acomp4Asiste}
                        onChange={(e) => setAcomp4Asiste(e.target.value)}
                      >
                        <option value="Sí">Sí asistirá</option>
                        <option value="No">No asistirá</option>
                      </select>
                    </div>
                  )}

                  {acompanantes[4] && (
                    <div className="space-y-2">
                      <label className="block text-sm text-white/75">
                        {acompanantes[4]}
                      </label>
                      <select
                        value={acomp5Asiste}
                        onChange={(e) => setAcomp5Asiste(e.target.value)}
                      >
                        <option value="Sí">Sí asistirá</option>
                        <option value="No">No asistirá</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <textarea
                rows="4"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Mensaje para los novios"
              />

              <button
                type="submit"
                disabled={sending}
                className="gold-button w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Confirmando asistencia..." : "Enviar confirmación"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
