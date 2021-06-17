import { useState, useEffect } from 'react'

export default function ProgressBar({
  progressMs,
  durationMs,
  onComplete = () => {},
}) {
  const [progress, setProgress] = useState(progressMs)
  useEffect(() => {
    let interval = setInterval(() => {
      if (progress < durationMs) {
        setProgress(progress + 1000)
      } else {
        onComplete()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  })
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