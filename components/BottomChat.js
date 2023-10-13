import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React from 'react';
import {images} from '../constants';

const BottomChat = props => {
  const {marginBottom, onPress1, activeColor, onPress2} = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        height: screenHeight * 0.086,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: marginBottom,
      }}>
      <TouchableOpacity onPress={onPress1}>
        <Image
          source={images.add_image}
          style={{
            height: screenHeight * 0.034,
            width: screenHeight * 0.034,
            marginHorizontal: 15,
            tintColor: activeColor.infoColor,
          }}
        />
      </TouchableOpacity>

      <TextInput
        style={{
          flex: 1,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: activeColor.borderTextInput,
          paddingHorizontal: 20,
          backgroundColor: activeColor.backgroundInput,
          fontSize: 16,
          fontWeight: '400',
          marginBottom: 9,
          marginTop: 9,
        }}
        placeholder="Nhập tin nhắn..."
        placeholderTextColor={activeColor.textInput}
      />
      <TouchableOpacity onPress={onPress2}>
        <Image
          source={images.heart}
          style={{
            height: screenHeight * 0.038,
            width: screenHeight * 0.038,
            marginHorizontal: 15,
            tintColor: activeColor.infoColor,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomChat;

const styles = StyleSheet.create({});
