import { useRef, useState, useEffect } from 'react'
import { View } from 'react-native'

/* 
  Grabs the dimensions of the container
  - setRef goes on the component's ref property
  - dimensions are only available after the component renders
*/
const useMeasurement = (buffer = 0) => {
  const ref = useRef<View | null>(null)
  const [dimensions, setDimensions] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  })

  /* This goes on the view's ref property */
  const setRef = (view: View) => (ref.current = view)

  useEffect(() => {
    if (ref.current && ref.current.measure) {
      ref.current.measure((_a, _b, width, height, px, py) => {
        setDimensions({
          minX: px - buffer,
          maxX: px + width + buffer,
          minY: py - buffer,
          maxY: py + height + buffer,
        })
      })
    }
  }, [ref.current])

  return { dimensions, setRef }
}

export default useMeasurement
