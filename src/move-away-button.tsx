import React from 'react'
import {
  View,
  StyleProp,
  ViewStyle,
  ViewProps,
  GestureResponderEvent,
  Falsy,
} from 'react-native'
import Ripple, { RippleEffectProps } from './ripple'
import useMeasurement from './hooks/useMeasurement'

export type MoveAwayButtonProps = {
  children: React.ReactNode
  pressed: boolean | undefined
  setPressed: (pressed: boolean) => void
  onPressIn?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  onMove?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  onPressOut?: (e?: GestureResponderEvent) => void | Promise<void> | Falsy
  style?: StyleProp<ViewStyle>
  pressedStyle?: StyleProp<ViewStyle>
  disableRipple?: boolean
  rippleColor?: string
  rippleOpacity?: number
  rippleContainerBorderRadius?: number
  longPressTimeout?: number
  moveCancelBuffer?: number
  RippleProps?: RippleEffectProps
} & ViewProps

const MoveAwayButton = ({
  children,
  onPressIn,
  onMove,
  onPressOut,
  pressed,
  setPressed,
  style,
  pressedStyle,
  disableRipple,
  rippleColor,
  rippleOpacity = 0.3,
  rippleContainerBorderRadius,
  longPressTimeout,
  moveCancelBuffer: buffer = 10,
  RippleProps,
  ...ViewProps
}: MoveAwayButtonProps) => {
  const { dimensions, setRef } = useMeasurement(buffer)

  const handlePressIn = (e: GestureResponderEvent) => {
    if (pressed && onPressIn) {
      onPressIn(e)
    }
    setPressed(true)
  }

  const handleRelease = (e: GestureResponderEvent) => {
    if (pressed && onPressOut) {
      onPressOut(e)
    }
  }

  const handleMove = (e: GestureResponderEvent) => {
    if (!pressed) {
      return
    }

    if (onMove) {
      onMove(e)
    }

    const { pageX, pageY } = e.nativeEvent
    const { minX, maxX, minY, maxY } = dimensions

    if (pageX < minX || pageX > maxX || pageY < minY || pageY > maxY) {
      setPressed(false)
    }
  }

  return (
    <>
      {disableRipple ? (
        <View
          ref={setRef}
          style={[style, pressed && pressedStyle]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handlePressIn}
          onResponderMove={handleMove}
          onResponderRelease={handleRelease}
          onResponderTerminationRequest={() => false}
          {...ViewProps}>
          {children}
        </View>
      ) : (
        <Ripple
          containerRef={setRef}
          rippleColor={rippleColor}
          rippleOpacity={rippleOpacity}
          rippleContainerBorderRadius={rippleContainerBorderRadius}
          style={[style, pressed && pressedStyle]}
          onPressIn={handlePressIn}
          onMove={handleMove}
          onPressOut={handleRelease}
          {...ViewProps}
          {...RippleProps}>
          {children}
        </Ripple>
      )}
    </>
  )
}

export default MoveAwayButton
