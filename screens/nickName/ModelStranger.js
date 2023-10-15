import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

const ModelStranger = props => {
  const {onPressClose, activeColor} = props;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 1, 1,0.5)',
      }}>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View
          style={{
            flex: 1,
            width: screenWidth,
          }}></View>
      </TouchableWithoutFeedback>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableWithoutFeedback onPress={onPressClose}>
          <View
            style={{
              height: screenHeight * 0.28,
              width: screenWidth * 0.05,
            }}></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            height: screenHeight * 0.28,
            width: screenWidth * 0.9,
            borderRadius: 10,
            backgroundColor: '#efefef',
          }}>
          <Text
            style={{
              fontSize: 17,
              color: '#111',
              fontWeight: 'bold',
              marginVertical: 15,
              marginHorizontal: 20,
            }}>
            Chỉnh sửa biệt danh
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#565656',
              fontWeight: '400',
              marginBottom: 5,
              marginHorizontal: 20,
            }}>
            Người lạ sẽ chỉ thấy biệt dạnh này trong đoạn chat
          </Text>

          <TextInput
            style={{
              fontSize: 16,
              fontWeight: '400',
              marginHorizontal: 20,
            }}
            placeholder="Người lạ"
            placeholderTextColor={activeColor.textInput}
          />
          <View
            style={{
              marginHorizontal: 20,
              height: 2,
              width: screenWidth * 0.9 - 40,
              backgroundColor: activeColor.textInput,
              opacity: 0.5,
            }}></View>
          <View
            style={{
              flex: 1,

              marginHorizontal: 11,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onPressClose}>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                Hủy
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
              }}></View>
            <Text
              style={{
                marginHorizontal: 10,
                fontWeight: '700',
                fontSize: 15,
                marginBottom: 10,
              }}>
              Đặt
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onPressClose}>
          <View
            style={{
              height: screenHeight * 0.28,
              width: screenWidth * 0.05,
            }}></View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View
          style={{
            flex: 1,
            width: screenWidth,
          }}></View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ModelStranger;

const styles = StyleSheet.create({});
