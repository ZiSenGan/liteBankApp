import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RootStackParamList } from '../types';
import api from '../services/axios';
import { showLoading, hideLoading } from '../components/LoadingScreen';
import { useAuthStore } from '../store/useAuthStore';
import { LoginResponse } from '../mocks/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, setCustomerName } = useAuthStore();

  const onSubmit = async () => {
    showLoading();
    try {
      const res = await api.post('/login', {
        username,
        password,
      });

      const data: LoginResponse = res.data;

      setToken(data.token);
      setCustomerName(data.customerName);

      console.log('Login success:', res.data);
      navigation.navigate('Home');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      hideLoading();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS uses padding, Android adjusts height
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled" // allows tapping outside to dismiss keyboard
          >
            {/* Logo */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/react-logo.png')}
              />
            </View>

            {/* Input fields */}
            <View style={styles.form}>
              <View style={styles.labelInput}>
                <Text>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                />
              </View>

              <View style={styles.labelInput}>
                <Text>Password:</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                />
              </View>
            </View>
          </ScrollView>

          {/* Fixed bottom button */}
          <TouchableOpacity
            style={styles.button}
            onPress={onSubmit}
            disabled={password === '' && username === ''}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  labelInput: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F52BA',
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
