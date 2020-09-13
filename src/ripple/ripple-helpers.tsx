import { I18nManager, Animated } from 'react-native'
import { RippleType, CreateRippleProps, CreateRippleStyleProps } from './types'

export const RIPPLE_RADIUS = 10

export const createRipple = ({
  event,
  dimensions,
  rippleSize,
  rippleColor,
  rippleOpacity,
  rippleCentered,
  disableRippleFade,
}: CreateRippleProps) => {
  const w2 = 0.5 * dimensions.width
  const h2 = 0.5 * dimensions.height

  const { locationX, locationY } = rippleCentered
    ? { locationX: w2, locationY: h2 }
    : event.nativeEvent

  const offsetX = Math.abs(w2 - locationX)
  const offsetY = Math.abs(h2 - locationY)

  const R =
    rippleSize > 0
      ? 0.5 * rippleSize
      : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2))

  const progress = new Animated.Value(0)

  const style = createRippleStyle({
    locationX,
    locationY,
    progress,
    R,
    rippleColor,
    rippleOpacity,
    disableRippleFade,
  })

  return {
    progress,
    locationX,
    locationY,
    R,
    style,
  } as RippleType
}

export const createRippleStyle = ({
  locationX,
  locationY,
  progress,
  R,
  rippleColor,
  rippleOpacity,
  disableRippleFade,
}: CreateRippleStyleProps) => {
  return {
    top: locationY - RIPPLE_RADIUS,
    [I18nManager.isRTL ? 'right' : 'left']: locationX - RIPPLE_RADIUS,
    backgroundColor: rippleColor,

    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / RIPPLE_RADIUS, R / RIPPLE_RADIUS],
        }),
      },
    ],

    opacity: disableRippleFade
      ? rippleOpacity
      : progress.interpolate({
          inputRange: [0, 1],
          outputRange: [rippleOpacity, 0],
        }),
  }
}
