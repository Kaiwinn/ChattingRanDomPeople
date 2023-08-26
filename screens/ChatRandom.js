import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {images} from '../constants';
import AnimatedHeart from '../components/animated/AnimatedHeart';
import SplashScreen from 'react-native-splash-screen';

function getUniqueID() {
  return Math.floor(Math.random() * Date.now()).toString();
}

const ChatRandom = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [hearts, setHearts] = useState([]);

  const handleCompleteAnimation = useCallback(id => {
    setHearts(oldHearts => {
      return oldHearts.filter(heart => heart.id !== id);
    });
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#f2f2f2',
      }}>
      <View
        style={{
          height: screenHeight * 0.086,
          backgroundColor: '#f2f2f2',
          shadowColor: '#7c7c7c',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1,
          elevation: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigate('Setting')}>
          <Image
            source={images.talk}
            style={{
              height: screenHeight * 0.05,
              width: screenHeight * 0.05,
              marginHorizontal: 15,
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#0c0c0c',
            marginStart: 5,
            flex: 1,
          }}>
          Chat với người lạ
        </Text>
        <TouchableOpacity onPress={() => navigate('Information')}>
          <Image
            source={images.information}
            style={{
              height: screenHeight * 0.04,
              width: screenHeight * 0.04,
              marginHorizontal: 15,
              marginVertical: 5,
              tintColor: '#a00070',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: screenHeight * 0.828,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginStart: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#282828',
            }}>
            Hello
          </Text>
        </View>
        <Text
          style={{
            marginVertical: 5,
            marginStart: 10,
            fontSize: 13,
            color: '#727272',
          }}>
          Tap 2 lần để {'<3'}
        </Text>
      </View>
      {hearts.map(item => (
        <AnimatedHeart
          key={item.id}
          onCompleteAnimation={handleCompleteAnimation}
          id={item.id}
          delay={item.delay}
          size={item.size}
        />
      ))}
      <View
        style={{
          height: screenHeight * 0.086,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={images.upload}
          style={{
            height: screenHeight * 0.033,
            width: screenHeight * 0.033,
            marginHorizontal: 15,
            tintColor: '#600545',
          }}
        />
        <TextInput
          style={{
            flex: 1,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            backgroundColor: '#f2f2f2',
            fontSize: 16,
            fontWeight: '400',
            marginBottom: 3,
            marginTop: 3,
          }}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#727272"
        />
        <TouchableOpacity
          onPress={() => {
            const numHeartsToAdd = 18; // Số lượng trái tim bạn muốn thêm
            const newHearts = Array.from({length: numHeartsToAdd}, () => ({
              id: getUniqueID(),
              delay: Math.random() * 3100, // Độ trễ ngẫu nhiên từ 0ms đến 2000ms
              size: (Math.floor(Math.random() * 10) + 1) * 2,
            }));
            setHearts([...hearts, ...newHearts]);
          }}>
          <Image
            source={images.heart}
            style={{
              height: screenHeight * 0.038,
              width: screenHeight * 0.038,
              marginHorizontal: 15,
              tintColor: '#ff00b2',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
