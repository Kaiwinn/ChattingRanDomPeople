import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const OptionChatRP = props => {
  const {onPressVisibility, onPressNickName} = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        position: 'absolute',
        bottom: 0,
        top: 0,
        flexDirection: 'row',
      }}>
      <TouchableWithoutFeedback onPress={onPressVisibility}>
        <View
          style={{
            flex: 1,
          }}></View>
      </TouchableWithoutFeedback>

      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          marginTop: screenHeight * 0.086,
          width: screenWidth * 0.46,
          backgroundColor: '#fffcfe',
          alignSelf: 'flex-end',
          marginEnd: 15,
        }}>
        <Text
          style={{
            height: screenHeight * 0.049,
            textAlignVertical: 'center',
            fontSize: 16,
            fontWeight: '400',
            paddingHorizontal: 10,
            color: '#282828',
            marginVertical: 3,
          }}>
          Hình nền
        </Text>
        <TouchableOpacity onPress={onPressNickName}>
          <Text
            style={{
              height: screenHeight * 0.049,
              textAlignVertical: 'center',
              fontSize: 16,
              fontWeight: '400',
              paddingHorizontal: 10,
              color: '#282828',
              marginVertical: 3,
            }}>
            Biệt danh
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            height: screenHeight * 0.049,
            textAlignVertical: 'center',
            fontSize: 16,
            fontWeight: '400',
            paddingHorizontal: 10,
            color: '#282828',
            marginVertical: 3,
          }}>
          Xóa cuộc trò chuyện
        </Text>
        <Text
          style={{
            height: screenHeight * 0.049,
            textAlignVertical: 'center',
            paddingHorizontal: 10,
            fontSize: 16,
            fontWeight: '400',
            color: '#282828',
            marginVertical: 3,
          }}>
          Báo cáo vi phạm
        </Text>
      </View>
    </View>
  );
};

export default OptionChatRP;

const styles = StyleSheet.create({});
