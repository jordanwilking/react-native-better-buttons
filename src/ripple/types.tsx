import {
  Animated,
  GestureResponderEvent,
  Falsy,
  LayoutChangeEvent,
  View,
  ViewProps,
} from 'react-native'

export type RippleType = {
  id: number
  progress: Animated.Value
  locationX: number
  locationY: number
  R: number
  style: RippleStyle
}

export type Dimensions = {
  width: number
  height: number
}

/* Ripple.tsx types */
export type RippleEffectProps = {
  rippleColor?: string
  rippleOpacity?: number
  rippleDuration?: number
  rippleReset?: number
  rippleSize?: number
  rippleContainerBorderRadius?: number
  rippleCentered?: boolean
  disableRippleFade?: boolean
  disableRippleOnPressIn?: boolean
  rippleOnPress?: boolean
  rippleOnPressOut?: boolean
}

export type RippleProps = {
  children: React.ReactNode
  onPressIn?: (e: GestureResponderEvent) => void | Falsy
  onPress?: (e: GestureResponderEvent) => void | Falsy
  onMove?: (e: GestureResponderEvent) => void | Falsy
  onPressOut?: (e: GestureResponderEvent) => void | Falsy
  onLayout?: (e: LayoutChangeEvent) => void
  containerRef?: (view: View) => void
} & RippleEffectProps &
  Animated.AnimatedProps<ViewProps>

export type RippleStyle = {
  [x: string]:
    | string
    | number
    | Animated.AnimatedInterpolation
    | {
        scale: Animated.AnimatedInterpolation
      }[]
  top: number
  backgroundColor: string
  transform: {
    scale: Animated.AnimatedInterpolation
  }[]
  opacity: number | Animated.AnimatedInterpolation
}

/* Ripple animation types */
export type RippleAnimationProps = {
  id: number
  progress: Animated.Value
  rippleDuration: number
  rippleStyle: RippleStyle
  removeRipple: (id: number) => void
}

/* Helper types */
export type CreateRippleProps = {
  event: GestureResponderEvent
  dimensions: Dimensions
  rippleSize: number
  rippleCount: number
  rippleColor: string
  rippleOpacity: number
  rippleCentered?: boolean
  disableRippleFade?: boolean
}

export type CreateRippleStyleProps = {
  locationX: number
  locationY: number
  progress: Animated.Value
  R: number
  rippleOpacity: number
  rippleColor: string
  disableRippleFade?: boolean
}
