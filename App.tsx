import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/libs/home';
import Login from './src/libs/login';
import TransferScreen from './src/libs/transfer';
import { RootStackParamList } from './src/types';
import { Loading } from './src/components/LoadingScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Transfer" component={TransferScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

      <Loading />
    </NavigationContainer>
  );
}
