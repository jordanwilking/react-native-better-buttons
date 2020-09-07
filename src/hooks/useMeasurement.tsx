import { useRef, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'

export type MeasurementProps = {
  buffer?: number
}

/* 
  Grabs the dimensions of the container
  - setRef goes on the component's ref property
  - onLayout goes on the component's onLayout property
  - dimensions are only available after the component renders (which calls its onLayout)
*/
const useMeasurement = ({ buffer = 0 }: MeasurementProps = { buffer: 0 }) => {
  const ref = useRef<View | null>(null)
  const [dimensions, setDimensions] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  })

  /* This goes on the view's ref property */
  const setRef = (view: View) => (ref.current = view)

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout
    if (ref.current && ref.current.measure) {
      ref.current.measure((_a, _b, _width, _height, px, py) => {
        setDimensions({
          minX: px - buffer,
          maxX: px + width + buffer,
          minY: py - buffer,
          maxY: py + height + buffer,
        })
      })
    }
  }

  return { dimensions, setRef, onLayout }
}

export default useMeasurement
