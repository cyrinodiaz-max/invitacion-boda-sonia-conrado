import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { weddingContent } from "../lib/content";

const initialState = {
  titular: "",
  asiste: "Sí",
  tieneAcompanantes: "No",
  cantidadAcompanantes: 0,
  cantidadMenores: 0,
  acompanante1: "",
  acompanante2: "",
  acompanante3: "",
  telefono: "",
  mensaje: "",
};

export default function RSVPSection() {
  const [form, setForm] = useState(initialState);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const companionCount = useMemo(
    () => Number(form.cantidadAcompanantes || 0),
    [form.cantidadAcompanantes]
  );

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let result = null;
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { message: text };
      }

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "No se pudo enviar la confirmación."
        );
      }

      setSuccess(true);
      setForm(initialState);
    } catch (error) {
      console.error("Error RSVP:", error);
      alert(error.message || "No se pudo enviar la confirmación.");
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

          {!success && (
            <p className="mx-auto mt-4 max-w-3xl text-white/75">
              {weddingContent.rsvp.description}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="mx-auto mt-10 max-w-xl rounded-3xl border border-gold/25 bg-[#10254b]/80 p-8 text-center"
            >
              <CheckCircle2 className="mx-auto text-gold" size={54} />

              <p className="mt-4 font-display text-3xl text-goldSoft">
                {weddingContent.rsvp.successMessage}
              </p>

              <button
                type="button"
                className="secondary-button mt-6"
                onClick={() => setSuccess(false)}
              >
                Registrar otra respuesta
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="mx-auto mt-10 max-w-3xl space-y-4"
            >
              <input
                value={form.titular}
                onChange={(e) => setField("titular", e.target.value)}
                placeholder="Nombre del titular"
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={form.asiste}
                  onChange={(e) => setField("asiste", e.target.value)}
                >
                  <option value="Sí">Sí asistiré</option>
                  <option value="No">No podré asistir</option>
                </select>

                <input
                  value={form.telefono}
                  onChange={(e) => setField("telefono", e.target.value)}
                  placeholder="Teléfono"
                />
              </div>

              {form.asiste === "Sí" && (
                <>
                  <select
                    value={form.tieneAcompanantes}
                    onChange={(e) =>
                      setField("tieneAcompanantes", e.target.value)
                    }
                  >
                    <option value="No">No tendré acompañantes</option>
                    <option value="Sí">Sí tendré acompañantes</option>
                  </select>

                  {form.tieneAcompanantes === "Sí" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <select
                          value={form.cantidadAcompanantes}
                          onChange={(e) =>
                            setField("cantidadAcompanantes", e.target.value)
                          }
                        >
                          <option value={0}>Cantidad de acompañantes</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>

                        <select
                          value={form.cantidadMenores}
                          onChange={(e) =>
                            setField("cantidadMenores", e.target.value)
                          }
                        >
                          <option value={0}>Cantidad de menores</option>
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>

                      {Array.from({ length: companionCount }).map((_, index) => {
                        const key = `acompanante${index + 1}`;

                        return (
                          <input
                            key={key}
                            value={form[key]}
                            onChange={(e) => setField(key, e.target.value)}
                            placeholder={`Acompañante ${index + 1} — nombre y apellido`}
                          />
                        );
                      })}
                    </>
                  )}
                </>
              )}

              <textarea
                rows="4"
                value={form.mensaje}
                onChange={(e) => setField("mensaje", e.target.value)}
                placeholder="Mensaje para los novios"
              />

              <button
                type="submit"
                disabled={sending}
                className="gold-button w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar confirmación"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
