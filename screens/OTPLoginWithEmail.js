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

const OTPLoginWithEmail = props => {
  const {email} = props.route.params;
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: '#fc8093',
      }}>
      <View
        style={{
          height: screenHeight * 0.079,
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
              height: screenHeight * 0.03,
              width: screenHeight * 0.03,
              marginHorizontal: 15,
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 25,
          height: screenHeight * 0.2,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={images.verify}
          style={{
            height: 100,
            width: 100,
          }}
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 19,
          fontWeight: 'bold',
          color: '#ffffff',
        }}>
        Enter the Verification Code
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 14,
          fontWeight: '400',
          color: '#f2f2f2',
          textAlign: 'center',
          width: screenWidth * 0.7,
        }}>
        Mã xác thực đã được gửi đến email: {email}
      </Text>
      <View
        style={{
          marginTop: 25,
          height: screenHeight * 0.18,
          width: screenWidth - 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
        <TextInput
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ffc4cd',
            backgroundColor: '#fff',
            fontSize: 16,
            fontWeight: '400',
            height: screenHeight * 0.07,
            width: screenHeight * 0.07,
            textAlign: 'center',
          }}
          placeholderTextColor={'#111'}
          keyboardType="numeric"
        />
      </View>
      <Text
        style={{
          color: '#fff',
          alignSelf: 'center',
          fontSize: 14,
        }}>
        Bạn chưa nhận được mã
      </Text>
      <Text
        style={{
          textDecorationLine: 'underline',
          color: '#9bebff',
          alignSelf: 'center',
          fontSize: 14,
        }}>
        Gửi lại
      </Text>
    </View>
  );
};

export default OTPLoginWithEmail;

const styles = StyleSheet.create({});
