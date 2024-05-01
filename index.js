/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './Screens/WelcomeScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import ResetPassScreen from './Screens/ResetPassScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
AppRegistry.registerComponent(appName, () => App);
