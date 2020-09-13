/*
  Derived from https://github.com/n4kz/react-native-material-ripple
  Original by: Copyright 2017 Alexander Nazarov
*/
import React, { useState, useEffect } from 'react'
import {
  View,
  Animated,
  StyleSheet,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native'
import RippleAnimation from './ripple-animation'
import { createRipple } from './ripple-helpers'
import { RippleProps, RippleType } from './types'

const Ripple = ({
  children,
  rippleColor = 'rgb(0, 0, 0)',
  rippleOpacity = 0.3,
  rippleDuration = 400,
  rippleReset = 10,
  rippleSize = 0,
  rippleContainerBorderRadius: borderRadius = 0,
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
  ...props
}: RippleProps) => {
  const [ripples, setRipples] = useState<RippleType[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ripples.length > rippleReset) {
      setRipples([])
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

    if (!disableRippleOnPressIn) addRipple(event)
  }

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress && rippleOnPress) {
      requestAnimationFrame(() => onPress(event))
    } else if (onPress) {
      onPress(event)
    }

    if (rippleOnPress) addRipple(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    if (onPressOut && rippleOnPressOut) {
      requestAnimationFrame(() => onPressOut(event))
    } else if (onPressOut) {
      onPressOut(event)
    }

    if (rippleOnPressOut) addRipple(event)
  }

  const removeRipple = () => {
    setRipples((oldRipples) => oldRipples.slice(1))
  }

  const addRipple = (event: GestureResponderEvent) => {
    const ripple = createRipple({
      event,
      dimensions,
      rippleSize,
      rippleCentered,
      rippleColor,
      rippleOpacity,
      disableRippleFade,
    })

    setRipples((oldRipples) => oldRipples.concat(ripple))
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
      <View style={[styles.container, { borderRadius }]}>
        {ripples.map((ripple, index) => {
          return (
            <RippleAnimation
              key={index}
              progress={ripple.progress}
              rippleDuration={rippleDuration}
              rippleStyle={ripple.style}
              removeRipple={removeRipple}
            />
          )
        })}
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
})

export default Ripple
