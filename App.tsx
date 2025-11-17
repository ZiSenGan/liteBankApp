import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/libs/login';
import { RootStackParamList } from './src/types';
import { Loading } from './src/components/LoadingScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';

const Stack = createStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

const HomeScreen = React.lazy(() => import('./src/libs/home'));
const TransferScreen = React.lazy(() => import('./src/libs/transfer'));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Suspense fallback={<Loading />}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Transfer"
              component={TransferScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Suspense>
        <Loading />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
