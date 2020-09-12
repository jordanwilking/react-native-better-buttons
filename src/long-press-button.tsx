import React from 'react'
import {
  StyleProp,
  ViewStyle,
  ViewProps,
  GestureResponderEvent,
  Falsy,
} from 'react-native'
import useLongPress from './hooks/useLongPress'
import MoveAwayButton from './move-away-button'
import { RippleEffectProps } from './ripple'

export type LongPressButtonProps = {
  children: React.ReactNode
  onPressIn?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  onMove?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  onPressOut?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  style?: StyleProp<ViewStyle>
  pressedStyle?: StyleProp<ViewStyle>
  disableRipple?: boolean | Falsy
  rippleColor?: string
  rippleOpacity?: number
  rippleContainerBorderRadius?: number
  longPressTimeout?: number
  moveCancelBuffer?: number
  RippleProps?: RippleEffectProps
} & ViewProps

const LongPressButton = ({
  children,
  onPressIn,
  onMove,
  onPressOut,
  style,
  pressedStyle,
  disableRipple,
  rippleColor,
  rippleOpacity = 0.3,
  rippleContainerBorderRadius,
  longPressTimeout,
  moveCancelBuffer = 10,
  RippleProps,
  ...ViewProps
}: LongPressButtonProps) => {
  const { pressed, setPressed } = useLongPress(longPressTimeout)

  return (
    <MoveAwayButton
      pressed={pressed}
      setPressed={setPressed}
      onPressIn={onPressIn}
      onMove={onMove}
      onPressOut={onPressOut}
      style={style}
      pressedStyle={pressedStyle}
      disableRipple={disableRipple}
      rippleColor={rippleColor}
      rippleOpacity={rippleOpacity}
      rippleContainerBorderRadius={rippleContainerBorderRadius}
      moveCancelBuffer={moveCancelBuffer}
      {...ViewProps}
      {...RippleProps}>
      {children}
    </MoveAwayButton>
  )
}

export default LongPressButton
