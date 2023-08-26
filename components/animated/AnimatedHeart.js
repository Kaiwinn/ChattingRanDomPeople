import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {images} from '../../constants';

const getRandomSignedNum = () => (Math.random() < 0.5 ? -1 : 1);

const getRandomRotateOutput = () => {
  return [getRandomSignedNum() < 0 ? '-60deg' : '60deg', '0deg'];
};

const getRandomXOutput = () => {
  return getRandomSignedNum() < 0
    ? -Math.random() * screenHeight * 0.7
    : Math.random();
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const AnimatedHeart = props => {
  const {id, onCompleteAnimation, delay, size} = props;

  const animatedValueY = useRef(new Animated.Value(0)).current;

  const randomXOutput = useRef(getRandomXOutput()).current;
  const randomRotateOutput = useRef(getRandomRotateOutput()).current;

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      Animated.timing(animatedValueY, {
        toValue: -screenHeight,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => onCompleteAnimation(id));
    }, delay);

    return () => clearTimeout(animationTimeout);
  }, [animatedValueY, onCompleteAnimation, id, delay]);

  return (
    <Animated.Image
      source={images.heart}
      style={[
        {
          height: screenHeight * 0.05 + size,
          width: screenHeight * 0.05 + size,
          position: 'absolute',
          right: 10,
          bottom: -41,
          tintColor: '#ff00b2',
        },
        {
          transform: [
            {
              translateY: animatedValueY.interpolate({
                inputRange: [-screenHeight, 0],
                outputRange: [-screenHeight, 0],
              }),
            },
            {
              translateX: animatedValueY.interpolate({
                inputRange: [-screenHeight, 0],
                outputRange: [randomXOutput, 0],
              }),
            },
            {
              rotate: animatedValueY.interpolate({
                inputRange: [-screenHeight, 0],
                outputRange: randomRotateOutput,
              }),
            },
            {
              scale: animatedValueY.interpolate({
                inputRange: [-50, 0],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: animatedValueY.interpolate({
            inputRange: [-screenHeight * 0.9, 0],
            outputRange: [0, 1],
          }),
        },
      ]}></Animated.Image>
  );
};

export default AnimatedHeart;

const styles = StyleSheet.create({});
