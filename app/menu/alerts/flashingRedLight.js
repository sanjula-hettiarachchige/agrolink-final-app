import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

const FlashingRedLight = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View
      style={{
        width: 20,
        height:20,
        backgroundColor: 'red',
        opacity,
        borderRadius:100
      }}
    />
  );
};

export default FlashingRedLight;