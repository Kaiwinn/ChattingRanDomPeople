import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Login,
  ChatRandom,
  Setting,
  Information,
  OTPLoginWithEmail,
} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../redux/store';

const Stack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="ChatRandom"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ChatRandom" component={ChatRandom} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen
            name="OTPLoginWithEmail"
            component={OTPLoginWithEmail}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Stack;

const styles = StyleSheet.create({});
