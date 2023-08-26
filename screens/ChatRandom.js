import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {images} from '../constants';
import AnimatedHeart from '../components/animated/AnimatedHeart';
import SplashScreen from 'react-native-splash-screen';
import Autolink from 'react-native-autolink';

function getUniqueID() {
  return Math.floor(Math.random() * Date.now()).toString();
}

const ChatRandom = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [hearts, setHearts] = useState([]);

  const handleCompleteAnimation = useCallback(id => {
    setHearts(oldHearts => {
      return oldHearts.filter(heart => heart.id !== id);
    });
  }, []);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [showKeyboard, setShowKeyboard] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        // Chiều cao của bàn phím là event.endCoordinates.height
        const keyboardHeight = event.endCoordinates.height;
        console.log('Keyboard is shown with height:', keyboardHeight);

        setKeyboardHeight(keyboardHeight);
        setShowKeyboard(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
        console.log('Keyboard is hidden');
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [chooseLeave, setChooseLeave] = useState(false);

  const textWithPhoneAndLink =
    'Liên hệ qua số đt 1234567890 hoặc vào https://www.kai.com';

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
        <TouchableOpacity onPress={() => navigate('Setting')}>
          <Image
            source={images.talk}
            style={{
              height: screenHeight * 0.05,
              width: screenHeight * 0.05,
              marginHorizontal: 15,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#2d2d2d',
              marginStart: 5,
            }}>
            Chỉnh sửa biệt danh
          </Text>
          <Image
            source={images.edit}
            style={{
              height: 16,
              width: 16,
              marginHorizontal: 10,
            }}
          />
        </View>

        <TouchableOpacity onPress={() => navigate('Information')}>
          <Image
            source={images.information}
            style={{
              height: screenHeight * 0.04,
              width: screenHeight * 0.04,
              marginHorizontal: 15,
              marginVertical: 5,
              tintColor: '#a00070',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height:
            showKeyboard == true
              ? screenHeight * 0.828 - keyboardHeight
              : chooseLeave == true
              ? screenHeight * 0.828 - screenHeight * 0.038
              : screenHeight * 0.828,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginStart: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#282828',
            }}>
            Hello
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: 'flex-start',
            marginStart: 10,
            marginTop: 5,
          }}>
          <Autolink
            style={{
              fontSize: 15,
              color: '#282828',
            }}
            text={textWithPhoneAndLink}
          />
        </View>
        <Text
          style={{
            marginVertical: 5,
            marginStart: 10,
            fontSize: 13,
            color: '#727272',
          }}>
          Tap 2 lần để {'<3'}
        </Text>
      </View>
      {hearts.map(item => (
        <AnimatedHeart
          key={item.id}
          onCompleteAnimation={handleCompleteAnimation}
          id={item.id}
          delay={item.delay}
          size={item.size}
        />
      ))}

      <View
        style={{
          height: screenHeight * 0.086,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: showKeyboard == true ? keyboardHeight : 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            setChooseLeave(true);
          }}>
          <Image
            source={images.upload}
            style={{
              height: screenHeight * 0.033,
              width: screenHeight * 0.033,
              marginHorizontal: 15,
              tintColor: '#600545',
            }}
          />
        </TouchableOpacity>

        <Image
          source={images.add_image}
          style={{
            height: screenHeight * 0.034,
            width: screenHeight * 0.034,
            marginEnd: 15,
            tintColor: '#600545',
          }}
        />
        <TextInput
          style={{
            flex: 1,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            backgroundColor: '#f2f2f2',
            fontSize: 16,
            fontWeight: '400',
            marginBottom: 8,
            marginTop: 8,
          }}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#727272"
        />
        <TouchableOpacity
          onPress={() => {
            const numHeartsToAdd = 18; // Số lượng trái tim bạn muốn thêm
            const newHearts = Array.from({length: numHeartsToAdd}, () => ({
              id: getUniqueID(),
              delay: Math.random() * 3100, // Độ trễ ngẫu nhiên từ 0ms đến 2000ms
              size: (Math.floor(Math.random() * 10) + 1) * 2,
            }));
            setHearts([...hearts, ...newHearts]);
          }}>
          <Image
            source={images.heart}
            style={{
              height: screenHeight * 0.038,
              width: screenHeight * 0.038,
              marginHorizontal: 15,
              tintColor: '#ff00b2',
            }}
          />
        </TouchableOpacity>
        <Modal transparent visible={chooseLeave}>
          <TouchableWithoutFeedback
            onPress={() => {
              setChooseLeave(false);
            }}>
            <View
              style={{
                flex: 1,
              }}></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              height: screenHeight * 0.086 + screenHeight * 0.038,
              backgroundColor: '#ffffff',
            }}>
            <View
              style={{
                flex: 1,
                borderBottomWidth: 0.2, // Độ dày của viền dưới
                borderBottomColor: '#a8a8a8',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.exit}
                style={{
                  height: screenHeight * 0.03,
                  width: screenHeight * 0.03,
                  marginHorizontal: 15,
                }}
              />
              <Text>Thoát khỏi cuộc trò chuyện ẩn danh</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.bookmark}
                style={{
                  height: screenHeight * 0.03,
                  width: screenHeight * 0.03,
                  marginHorizontal: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#7a7a7a',
                }}>
                Thêm vào yêu thích
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
