/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  require("./src/mocks/axiosMock");
}

AppRegistry.registerComponent(appName, () => App);
