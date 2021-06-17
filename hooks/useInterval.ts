import { useEffect, useRef } from 'react'

// doesn't this mean that if we change the callback
// and not the delay then we get the same interval
// now calling a different function? I guess that doesn't matter
// except who knows what the interval is actually at, although that doesn
// matter because the same way 0 isn't def 0

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  // this is needed because the ref woulnd't normally change
  // when the prop changes or rerenders
  // need to see more about why not useCallback anywhere
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
