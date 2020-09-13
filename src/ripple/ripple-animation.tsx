import React, { useEffect } from 'react'
import { Animated, StyleSheet, Easing } from 'react-native'
import { RIPPLE_RADIUS } from './ripple-helpers'
import { RippleAnimationProps } from './types'

const RippleAnimation = ({
  progress,
  rippleDuration,
  rippleStyle,
  removeRipple,
}: RippleAnimationProps) => {
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    }).start(() => removeRipple())
  }, [])

  return <Animated.View style={[styles.ripple, rippleStyle]} />
}

const styles = StyleSheet.create({
  ripple: {
    width: RIPPLE_RADIUS * 2,
    height: RIPPLE_RADIUS * 2,
    borderRadius: RIPPLE_RADIUS,
    overflow: 'hidden',
    position: 'absolute',
  },
})

export default RippleAnimation
