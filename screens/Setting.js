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

const Setting = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [options, setOptions] = useState([
    {
      id: 1,
      name: 'Cá nhân',
    },
    {
      id: 2,
      name: 'Giao diện',
    },
    {
      id: 3,
      name: 'Confession',
    },
    {
      id: 4,
      name: 'Trợ giúp',
    },
    {
      id: 5,
      name: 'Thông tin',
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
          Cài đặt
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#ff26ab',
            fontWeight: '400',
            paddingHorizontal: 15,
          }}>
          Đăng xuất
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: screenHeight * 0.3,
            alignItems: 'center',
          }}>
          <Image
            source={images.chat}
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 120,
              width: 120,
              tintColor: '#23ffec',
            }}
          />
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: '#0f0f0f',
            }}>
            Nguyễn Đức Chiến
          </Text>
        </View>
        <View
          style={{
            height: screenHeight * 0.58,
          }}>
          {options.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  height: screenHeight * 0.08,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    item.id == 1
                      ? images.individual
                      : item.id == 2
                      ? images.moon
                      : item.id == 3
                      ? images.mail
                      : item.id == 4
                      ? images.help
                      : item.id == 5
                      ? images.info
                      : images.default
                  }
                  style={{
                    height: screenHeight * 0.04,
                    width: screenHeight * 0.04,
                    marginHorizontal: 15,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    color: '#2b2b2b',
                    fontSize: 16,
                    fontWeight: '400',
                  }}>
                  {item.name}
                </Text>
                <Image
                  source={images.right}
                  style={{
                    height: screenHeight * 0.03,
                    width: screenHeight * 0.03,
                    marginHorizontal: 10,
                    tintColor: '#a5a5a5',
                  }}
                />
              </View>
              <View
                style={{
                  marginStart: screenHeight * 0.05 + 30,
                  height: 0.5,
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 0.5,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 0.5,
                  elevation: 0.5,
                }}></View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
