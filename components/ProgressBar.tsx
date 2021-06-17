import { useState } from 'react'
import useInterval from '../hooks/useInterval'

export default function ProgressBar({
  progressMs,
  durationMs,
  paused = false,
  onComplete = () => {},
}) {
  const [progress, setProgress] = useState<number>(progressMs)

  useInterval(
    () => {
      if (progress < durationMs) {
        setProgress(p => p + 1000)
      } else {
        onComplete()
      }
    },
    paused ? null : 1000,
  )

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
