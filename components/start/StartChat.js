import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const StartChat = props => {
  const {onPressStart} = props;
  const THEME = useSelector(state => state.theme.color);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        height: screenHeight * 0.2,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginTop: 25,
          alignSelf: 'center',
          fontSize: 16,
          fontWeight: '400',
          color: colors[THEME].textColorTitle,
          marginStart: 5,
          opacity: 0.6,
        }}>
        Hãy bắt đầu một cuộc trò chuyện mới
      </Text>
      <TouchableOpacity onPress={onPressStart}>
        <View
          style={{
            height: screenHeight * 0.06,
            width: screenWidth * 0.4,
            backgroundColor: '#cd3cea',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              color: '#f4f4f4',
              fontWeight: '500',
            }}>
            Bắt đầu chat
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StartChat;

const styles = StyleSheet.create({});
