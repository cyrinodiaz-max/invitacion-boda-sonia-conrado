import { useEffect, useState } from 'react'

const getTimeLeft = (target) => {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
}

export const useCountdown = (target) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(target))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
