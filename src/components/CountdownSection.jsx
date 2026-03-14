import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from "react";

function getTimeLeft(targetDate) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export default function CountdownSection({ target }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const items = useMemo(
    () => [
      { label: "Días", value: timeLeft.days },
      { label: "Horas", value: timeLeft.hours },
      { label: "Minutos", value: timeLeft.minutes },
      { label: "Segundos", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <motion.section
      className="section-shell section-spacing"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="card-frame section-card text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-goldSoft/85">
          Save the Date
        </p>

        <h2 className="mt-3 text-4xl text-gold sm:text-5xl">
          Cuenta Regresiva
        </h2>

        <p className="mt-2 text-sm text-white/75 sm:text-base">
          20 de junio del 2026 - 17:00 hs
        </p>

        <div className="countdown-grid">
          {items.map((item) => (
            <div
              key={item.label}
              className="card-frame countdown-card text-center"
            >
              <div className="text-5xl font-semibold leading-none text-gold sm:text-6xl">
                {item.value}
              </div>

              <div className="mt-3 text-xs uppercase tracking-[0.35em] text-white/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
