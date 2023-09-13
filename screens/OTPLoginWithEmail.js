import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {images} from '../constants';

import axios from 'axios';

const OTPLoginWithEmail = props => {
  const {email} = props.route.params;
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const sendOTP = async (otp, email) => {
    console.log('Hàm senOTP');
    try {
      console.log('OTP:', otp);
      console.log('Email:', email);
      const response = await axios.post(
        'https://test.vnchat.me/v2/auth/check-otp',
        {
          otp: otp,
          email: email,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const handleOTPChange = async (index, text) => {
    if (/^\d+$/.test(text) && text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;

      if (text.length === 0) {
        // Nếu ô hiện tại rỗng
        if (index > 0) {
          inputRefs[index - 1].current.clear(); // Xóa giá trị ô trước đó
          inputRefs[index - 1].current.focus(); // Chuyển đến ô trước đó
        }
      } else if (index < inputRefs.length - 1) {
        // Di chuyển tới ô kế tiếp khi người dùng nhập một số
        inputRefs[index + 1].current.focus();
      }

      setOtp(newOtp);

      const isAllFilled = newOtp.every(code => code.length === 1);

      if (isAllFilled) {
        try {
          const response = await sendOTP(newOtp.join(''), email);
          console.log('OTP sent successfully:', response);

          // Xử lý kết quả từ API ở đây, ví dụ chuyển đến màn hình tiếp theo
        } catch (error) {
          // Xử lý lỗi nếu gửi OTP không thành công
          console.error('Error sending OTP:', error);
        }
      }
    }
  };

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
        {otp.map((code, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
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
            keyboardType="numeric"
            maxLength={1}
            defaultValue={code}
            onChangeText={text => handleOTPChange(index, text)}
            onFocus={() => {
              if (index === 0 && code.length === 0) {
                inputRefs[index].current.clear();
              }
            }}
            onBlur={() => {
              if (code.length === 0) {
                inputRefs[index].current.clear();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && index > 0) {
                console.log('Backspace pressed');
                // Nếu người dùng bấm nút xóa (backspace) khi ô rỗng và không phải là ô đầu tiên
                inputRefs[index - 1].current.focus(); // Di chuyển đến ô trước đó
              }
            }}
          />
        ))}
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
