import { useState, useEffect } from 'react'

export default function ProgressBar({
  progressMs,
  durationMs,
  paused = false,
  onComplete = () => {},
}) {
  const [progress, setProgress] = useState(progressMs)

  useEffect(() => {
    let interval = setInterval(() => {
      if (paused) {
        return clearInterval(interval)
      }
      if (progress < durationMs) {
        setProgress(p => p + 1000)
      } else {
        onComplete()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [paused, durationMs])

  return (
    <div className="shadow w-full bg-gray-400 rounded-xl">
      <div
        className="bg-white p-0.5 rounded-xl"
        style={{
          width: `${Math.round((progress / durationMs) * 100)}%`,
        }}
      ></div>
    </div>
  )
}
