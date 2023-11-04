import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../../constants';

const EditName = props => {
  const {onPressStranger, onPressYou, onPressBack} = props;

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
      }}>
      <View
        style={{
          height: screenHeight * 0.083,
          backgroundColor: colors[THEME].background,
          shadowColor: colors[THEME].shadowColor,
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
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={images.back}
            style={{
              height: screenHeight * 0.029,
              width: screenHeight * 0.029,
              marginHorizontal: 10,
              marginVertical: 15,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: colors[THEME].textColorTitle,
            marginStart: 5,
          }}>
          Chỉnh sửa biệt danh
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          height: screenHeight * 0.129,
          width: screenWidth,
          backgroundColor: colors[THEME].background,
        }}>
        <TouchableOpacity
          onPress={onPressStranger}
          style={{
            flex: 1,
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 25,
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: colors[THEME].textColorTitle,
              }}>
              Đặt biệt danh
            </Text>

            <Text
              style={{
                fontSize: 13,
              }}>
              Người lạ
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPressYou}
          style={{
            flex: 1,
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 25,
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: colors[THEME].textColorTitle,
              }}>
              Đặt biệt danh
            </Text>
            <Text
              style={{
                fontSize: 13,
              }}>
              Bạn
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditName;

const styles = StyleSheet.create({});
