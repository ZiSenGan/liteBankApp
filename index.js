/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setupAxiosMock } from './src/mocks/axiosMock';
// import { server } from "./src/mocks/server";
// import "whatwg-fetch";

// if (__DEV__) {
//   server.listen();
// }

if (__DEV__) {
  setupAxiosMock();
}

AppRegistry.registerComponent(appName, () => App);
