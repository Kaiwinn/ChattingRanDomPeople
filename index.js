/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Stack from './navigation/Stack';

AppRegistry.registerComponent(appName, () => Stack);
