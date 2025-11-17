import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';
import { verifyBiometric } from '../services/biometricAuth';
import { Dropdown } from 'react-native-element-dropdown';
import api from '../services/axios';
import { hideLoading, showLoading } from '../components/LoadingScreen';
import { useFromAccounts } from '../services/useHooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Transfer'>;

type FormData = {
  fromAccount: string;
  recipient: string;
  amount: string;
  note?: string;
};

export default function TransferScreen({ navigation }: Props) {
  const balance = 1000; // example balance

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fromAccount: '',
      recipient: '',
      amount: '',
      note: '',
    },
  });

  const { data: fromAccountList, isLoading, isFetching } = useFromAccounts();

  useEffect(() => {
    if (isLoading || isFetching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, isFetching]);

  const onSubmit = async (data: FormData) => {
    const amt = parseFloat(data.amount);

    if (amt > balance) {
      Alert.alert('Error', 'Insufficient balance.');
      return;
    }

    try {
      // Step 1: Biometric authentication
      const isVerified = await verifyBiometric();

      // Step 2: Confirm transfer
      Alert.alert(
        'Confirm Transfer',
        `Send $${amt.toFixed(2)} to ${data.recipient}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: async () => {
              console.log('Biometric verification: ', isVerified);

              showLoading();
              try {
                const res = await api.post('/transfer', data);
                Alert.alert('Success', res.data.message);
                console.log('Transaction:', res.data.transaction);
              } catch (err: any) {
                Alert.alert(
                  'Failed',
                  err.response?.data?.message || err.message,
                );
              } finally {
                hideLoading();
              }

              Alert.alert('Success', 'Transfer completed!');
              navigation.goBack();
            },
          },
        ],
      );
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message || 'Cannot proceed');
    }
  };

  const formattedFromAccountList = (fromAccountList ?? []).map(item => ({
    ...item,
    labelCombined: `${item.name} - ${item.balance}`,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            {/* Account Balance */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>From Account:</Text>
              <Controller
                control={control}
                name="fromAccount"
                rules={{ required: '* From Account is required' }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.input}
                    data={formattedFromAccountList}
                    labelField={'labelCombined'}
                    onChange={onChange}
                    valueField={'value'}
                    value={value}
                    placeholder="Select"
                  />
                )}
              />
              {errors.fromAccount && (
                <Text style={styles.error}>{errors.fromAccount.message}</Text>
              )}
            </View>

            {/* Recipient */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recipient:</Text>
              <Controller
                control={control}
                name="recipient"
                rules={{ required: '* Recipient is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter recipient"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.recipient && (
                <Text style={styles.error}>{errors.recipient.message}</Text>
              )}
            </View>

            {/* Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount:</Text>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: '* Amount is required',
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Enter a valid number',
                  },
                  validate: value =>
                    parseFloat(value) > 0 || 'Amount must be greater than 0',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.amount && (
                <Text style={styles.error}>{errors.amount.message}</Text>
              )}
            </View>

            {/* Note */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Note (optional):</Text>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter note"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Send Money</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  balanceContainer: {
    backgroundColor: '#0F52BA',
    padding: 20,
    borderRadius: 10,
  },
  balanceLabel: { color: '#fff', fontSize: 16 },
  balanceValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  inputGroup: {
    // marginBottom: 15
  },
  label: { marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  error: { color: 'red', marginTop: 4 },
  button: {
    backgroundColor: '#0F52BA',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
