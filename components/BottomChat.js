import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../constants';
import {useSelector} from 'react-redux';

const BottomChat = props => {
  const {
    marginBottom,
    onPress1,
    onPress2,
    onPressChatInput,
    inputMessage,
    onPressSend,
  } = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [stateInput, setStateInput] = useState('');

  const THEME = useSelector(state => state.theme.color);

  useEffect(() => {
    setStateInput(inputMessage);
  }, [inputMessage]);
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
            tintColor: colors[THEME].infoColor,
          }}
        />
      </TouchableOpacity>

      <TextInput
        style={{
          flex: 1,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: colors[THEME].borderTextInput,
          paddingHorizontal: 20,
          backgroundColor: colors[THEME].backgroundInput,
          fontSize: 16,
          fontWeight: '400',
          marginBottom: 9,
          marginTop: 9,
        }}
        placeholder="Nhập tin nhắn..."
        placeholderTextColor={colors[THEME].textInput}
        onChangeText={onPressChatInput}
        value={inputMessage}
      />
      {inputMessage == '' ? (
        <TouchableOpacity onPress={onPress2}>
          <Image
            source={images.heart}
            style={{
              height: screenHeight * 0.038,
              width: screenHeight * 0.038,
              marginHorizontal: 15,
              tintColor: colors[THEME].infoColor,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressSend}>
          <Image
            source={images.send}
            style={{
              height: screenHeight * 0.038,
              width: screenHeight * 0.038,
              marginHorizontal: 15,
              tintColor: colors[THEME].infoColor,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BottomChat;

const styles = StyleSheet.create({});
