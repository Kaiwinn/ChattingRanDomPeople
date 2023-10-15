import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Autolink from 'react-native-autolink';

const Message = props => {
  const {item, onPressDetail, activeColor} = props;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <View>
      {item.isSelected && (
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 13,
            marginVertical: 3,
          }}>
          14:25
        </Text>
      )}

      <TouchableWithoutFeedback onPress={onPressDetail}>
        <View
          style={{
            backgroundColor: activeColor.backgroundMessage,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 11,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: item.isSender == true ? 'flex-start' : 'flex-end',
            marginStart: item.isSender == true ? 10 : 0,
            marginEnd: item.isSender == true ? 0 : 5,
            marginTop: 5,
            maxWidth: screenWidth * 0.7,
          }}>
          <Autolink
            selectable={true}
            style={{
              fontSize: 15,
              color: activeColor.textMessage,
            }}
            text={item.message}
          />
        </View>
      </TouchableWithoutFeedback>
      {item.isSelected && (
        <Text
          style={{
            fontSize: 13,
            marginHorizontal: 11,
            marginVertical: 3,
            alignSelf: item.isSender == true ? 'flex-start' : 'flex-end',
          }}>
          <Text style={{fontWeight: '500'}}>Đã xem</Text> 14:55
        </Text>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
