/*
  Derived from https://github.com/n4kz/react-native-material-ripple
  Original by: Copyright 2017 Alexander Nazarov
*/
import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Animated,
  Easing,
  I18nManager,
  ViewProps,
  StyleSheet,
  GestureResponderEvent,
  LayoutChangeEvent,
  Falsy,
} from 'react-native'

export type RippleType = {
  id: number
  progress: Animated.Value
  locationX: number
  locationY: number
  R: number
}

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
  onRippleAnimation?: (...args: any[]) => any
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

const RADIUS = 10

const Ripple = ({
  children,
  rippleColor = 'rgb(0, 0, 0)',
  rippleOpacity = 0.3,
  rippleDuration = 400,
  rippleReset = 10,
  rippleSize = 0,
  rippleContainerBorderRadius = 0,
  rippleCentered,
  disableRippleFade,
  disableRippleOnPressIn,
  rippleOnPress,
  rippleOnPressOut,
  onPressIn,
  onPress,
  onMove,
  onPressOut,
  onLayout,
  containerRef,
  onRippleAnimation = (animation, callback) => animation.start(callback),
  ...props
}: RippleProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [rippleCount, setRippleCount] = useState(1)
  const rippleRef = useRef([] as RippleType[])

  useEffect(() => {
    if (rippleRef.current.length > rippleReset) {
      rippleRef.current = []
      setRippleCount(0)
    }
  })

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })

    if (onLayout) {
      onLayout(event)
    }
  }

  const handlePressIn = (event: GestureResponderEvent) => {
    if (onPressIn && !disableRippleOnPressIn) {
      requestAnimationFrame(() => onPressIn(event))
    } else if (onPressIn) {
      onPressIn(event)
    }

    if (!disableRippleOnPressIn) startRipple(event)
  }

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress && rippleOnPress) {
      requestAnimationFrame(() => onPress(event))
    } else if (onPress) {
      onPress(event)
    }

    if (rippleOnPress) startRipple(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    if (onPressOut && rippleOnPressOut) {
      requestAnimationFrame(() => onPressOut(event))
    } else if (onPressOut) {
      onPressOut(event)
    }

    if (rippleOnPressOut) startRipple(event)
  }

  const onAnimationEnd = () => {
    if (rippleRef.current.length) {
      rippleRef.current = rippleRef.current.slice(1)
    }
  }

  const startRipple = (event: GestureResponderEvent) => {
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

    const ripple = {
      id: rippleCount,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    } as RippleType

    const animation = Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    })

    onRippleAnimation(animation, onAnimationEnd)

    setRippleCount(rippleCount + 1)
    rippleRef.current = rippleRef.current.concat(ripple)
  }

  const renderRipple = ({
    id,
    progress,
    locationX,
    locationY,
    R,
  }: RippleType) => {
    const rippleStyle = {
      top: locationY - RADIUS,
      [I18nManager.isRTL ? 'right' : 'left']: locationX - RADIUS,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / RADIUS, R / RADIUS],
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

    return <Animated.View key={id} style={[styles.ripple, rippleStyle]} />
  }

  return (
    <Animated.View
      ref={containerRef}
      pointerEvents="box-only"
      onStartShouldSetResponder={() => true}
      onResponderGrant={handlePressIn}
      onResponderStart={handlePress}
      onResponderMove={onMove}
      onResponderRelease={handlePressOut}
      onLayout={handleLayout}
      onResponderTerminationRequest={() => false}
      {...props}>
      {children}
      <View
        style={[
          styles.container,
          { borderRadius: rippleContainerBorderRadius },
        ]}>
        {rippleRef.current.map(renderRipple)}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  ripple: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    overflow: 'hidden',
    position: 'absolute',
  },
})

export default Ripple
