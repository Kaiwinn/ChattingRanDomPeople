import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../constants';

const Information = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [options, setOptions] = useState([
    {
      id: 1,
      name: 'Giới tính',
      value: 'Nam',
    },
    {
      id: 2,
      name: 'Hiện đang là',
      value: 'Người đi làm',
    },
    {
      id: 3,
      name: 'Quen bạn được',
      value: '0 ngày',
    },
    {
      id: 4,
      name: 'Số tin bạn gửi',
      value: '0',
    },
  ]);

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
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Image
            source={images.back}
            style={{
              height: screenHeight * 0.033,
              width: screenHeight * 0.033,
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
          Thông tin
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 10,
        }}>
        {options.map((item, index) => (
          <View
            key={index}
            style={{
              borderBottomWidth: 0.2, // Độ dày của viền dưới
              borderBottomColor: '#b7b7b7',
              marginTop: 8,
              marginBottom: 8,
              height: screenHeight * 0.068,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                marginHorizontal: 16,
                color: '#2b2b2b',
                fontSize: 15,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                marginHorizontal: 16,
                color: '#2b2b2b',
                fontSize: 15,
              }}>
              {item.value}
            </Text>
          </View>
        ))}

        <View
          style={{
            marginTop: 5,
            height: screenHeight * 0.068,
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginHorizontal: 15,
            marginTop: 8,
            marginBottom: 8,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: screenHeight * 0.06,
              paddingHorizontal: 5,
              borderWidth: 1, // Độ dày của viền dưới
              borderColor: '#961696',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                marginHorizontal: 17,
                color: '#961696',
                fontSize: 15,
                fontWeight: '400',
              }}>
              Báo Xấu
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <View
            style={{
              height: screenHeight * 0.06,
              paddingHorizontal: 5,
              borderWidth: 1, // Độ dày của viền dưới
              borderColor: '#961696',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginHorizontal: 15,
            }}>
            <Text
              style={{
                marginHorizontal: 17,
                color: '#961696',
                fontSize: 15,
                fontWeight: '400',
              }}>
              Chặn
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({});
