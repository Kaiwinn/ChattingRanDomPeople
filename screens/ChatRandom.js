import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  View,
  Modal,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../constants';
import AnimatedHeart from '../components/animated/AnimatedHeart';
import SplashScreen from 'react-native-splash-screen';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Header from '../components/Header';
import BottomChat from '../components/BottomChat';
import Image1 from '../components/file_image/Image1';
import Message from '../components/message/Message';
import OptionChatRP from './optionChatReport/OptionChatRP';
import EditName from './nickName/EditName';
import ModelStranger from './nickName/ModelStranger';
import StartChat from '../components/start/StartChat';

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

  const testSocket = () => {
    console.log('test socket');
  };

  useEffect(() => {
    SplashScreen.hide();

    testSocket();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const keyboardHeight = event.endCoordinates.height;

        setKeyboardHeight(keyboardHeight);
        setShowKeyboard(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowKeyboard(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [messenger, setMessenger] = useState([
    {
      timestamp: 0,
      message: 'Hello',
      isSender: true,
      isImage: false,
      isSelected: false,
    },
    {
      timestamp: 1,
      message: 'Liên hệ qua số đt 1234567890 hoặc vào https://www.kai.com',
      isSender: true,
      isImage: false,
      isSelected: false,
    },
    {
      timestamp: 2,
      message: 'Tôi đã gửi tin nhắn này cho bạn, mong bạn phản hồi',
      isSender: false,
      isImage: false,
      isSelected: false,
    },
  ]);
  let activeColor = colors['light'];

  const [visibilityRP, setVisibilityRP] = useState(false);

  const [visibilityNickname, setVisibilityNickname] = useState(false);

  const [modalNickname, setModalNickname] = useState(false);

  const [startChat, setStartChat] = useState(true);

  const [showUploadImg, setShowUploadImg] = useState(false);

  async function hasAndroidPermission() {
    const getPermission = async permission => {
      return (
        (await PermissionsAndroid.check(permission)) ||
        (await PermissionsAndroid.request(permission)) ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    };

    if (Platform.Version >= 33) {
      const imagePermission = await getPermission(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      const videoPermission = await getPermission(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      );
      return imagePermission && videoPermission;
    } else {
      return await getPermission(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  }

  async function getPhotos() {
    try {
      const result = await CameraRoll.getPhotos({
        first: 30, // Lấy 30 ảnh đầu tiên
        assetType: 'Photos',
      });
      const photosArray = result.edges || [];
      setPhotos(photosArray);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }

  _handleButtonPress = async () => {
    const hasPermission = await hasAndroidPermission();
    if (hasPermission) {
      await getPhotos();
    }
  };

  const [photos, setPhotos] = useState([]);

  const renderPhoto = ({item}) => (
    <View
      style={{
        margin: 1,
        flex: 1 / 3, // Chia mỗi phần thành 1/3 để hiển thị 3 cột
      }}>
      <Image
        style={{width: '100%', aspectRatio: 1}}
        // Thiết lập chiều rộng là 100% và tỷ lệ khung hình 1:1
        source={{
          uri: item.node.image.uri,
        }}
      />
    </View>
  );

  return (
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        backgroundColor: activeColor.background,
      }}>
      <Header
        color={activeColor}
        onPressRP={() => {
          setVisibilityRP(!visibilityRP);
        }}
      />

      <View
        style={{
          height:
            showKeyboard == true
              ? screenHeight * 0.83 - keyboardHeight
              : showUploadImg == true &&
                startChat == false &&
                showKeyboard == false
              ? screenHeight * 0.83 -
                screenHeight * 0.114 -
                screenHeight * 0.235
              : startChat == false
              ? screenHeight * 0.83
              : screenHeight * 0.83 - screenHeight * 0.114,
          justifyContent: 'flex-end',
          marginBottom: screenHeight * 0.002,
        }}>
        {messenger.map((item, index) => (
          <Message
            key={item.timestamp}
            item={item}
            onPressDetail={() => {
              let updatedMessenger = messenger.map(message => {
                return {
                  ...message,
                  isSelected:
                    item.timestamp == message.timestamp
                      ? !message.isSelected
                      : false,
                };
              });
              setMessenger(updatedMessenger);
            }}
            activeColor={activeColor}
          />
        ))}

        <Image1 />
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

      {startChat == true ? (
        <StartChat
          activeColor={activeColor}
          onPressStart={() => {
            setStartChat(false);
          }}
        />
      ) : (
        <BottomChat
          marginBottom={showKeyboard == true ? keyboardHeight : 0}
          onPress1={() => {
            _handleButtonPress();
            setShowUploadImg(!showUploadImg);
            showKeyboard == true ? Keyboard.dismiss() : null;
          }}
          activeColor={activeColor}
          onPress2={() => {
            const numHeartsToAdd = 18; // Số lượng trái tim bạn muốn thêm
            const newHearts = Array.from({length: numHeartsToAdd}, () => ({
              id: getUniqueID(),
              delay: Math.random() * 3100, // Độ trễ ngẫu nhiên từ 0ms đến 2000ms
              size: (Math.floor(Math.random() * 10) + 1) * 2,
            }));
            setHearts([...hearts, ...newHearts]);
          }}
        />
      )}

      {visibilityNickname == true ? (
        <EditName
          activeColor={activeColor}
          onPressStranger={() => {
            setModalNickname(true);
          }}
          onPressYou={() => {
            setModalNickname(true);
          }}
          onPressBack={() => {
            setVisibilityNickname(false);
          }}
        />
      ) : (
        <View></View>
      )}

      <Modal transparent visible={modalNickname}>
        <ModelStranger
          activeColor={activeColor}
          onPressClose={() => {
            setModalNickname(false);
          }}
        />
      </Modal>
      {visibilityRP == true ? (
        <OptionChatRP
          onPressVisibility={() => {
            setVisibilityRP(false);
          }}
          onPressNickName={() => {
            setVisibilityRP(false);
            setVisibilityNickname(true);
          }}
        />
      ) : (
        <View></View>
      )}

      <View
        style={{
          height: screenHeight * 0.37,
          width: screenWidth,
        }}>
        <FlatList
          data={photos}
          keyExtractor={item => item.node.image.uri}
          renderItem={renderPhoto}
          numColumns={3} // Số cột
        />
      </View>
    </View>
  );
};

export default ChatRandom;

const styles = StyleSheet.create({});
