import { useState, useEffect, useRef } from 'react'

const useLongPress = (
  timeout?: number,
  initialPressed?: boolean,
  initialLongPressed?: boolean,
) => {
  const [pressed, setPressed] = useState(initialPressed)
  const [longPressed, setLongPressed] = useState(initialLongPressed)
  const timerIdRef = useRef(undefined as NodeJS.Timeout | undefined)

  useEffect(() => {
    if (pressed) {
      timerIdRef.current = setTimeout(() => {
        setPressed(false)
        setLongPressed(true)
      }, timeout || 800)
    }
    return () => {
      if (timerIdRef.current !== undefined) {
        clearTimeout(timerIdRef.current)
      }
    }
  }, [pressed])

  return { pressed, setPressed, longPressed, setLongPressed }
}

export default useLongPress
