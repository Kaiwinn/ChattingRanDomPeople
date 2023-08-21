import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../constants';

const ChatRandom = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
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
              height: screenHeight * 0.045,
              width: screenHeight * 0.045,
              marginHorizontal: 15,
              tintColor: '#2479c9',
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
      <View
        style={{
          height: screenHeight * 0.086,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={images.upload}
          style={{
            height: screenHeight * 0.038,
            width: screenHeight * 0.038,
            marginHorizontal: 15,
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
          }}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#727272"
        />
        <Image
          source={images.heart}
          style={{
            height: screenHeight * 0.038,
            width: screenHeight * 0.038,
            marginHorizontal: 15,
          }}
        />
      </View>
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
