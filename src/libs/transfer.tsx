import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
import { hideLoading, showLoading } from '../components/LoadingScreen';
import { useFromAccounts, useTransfer } from '../services/useHooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Transfer'>;

type FormData = {
  fromAccount: string;
  recipient: string;
  amount: string;
  note?: string;
};

export default function TransferScreen({ navigation }: Props) {
  const [balance, setBalance] = useState<number>(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
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

  const transferMutation = useTransfer({
    onMutate() {
      showLoading();
    },
    onSuccess(res) {
      console.log('Transaction:', res.data);
      Alert.alert('Success', 'Transfer completed!');
      navigation.goBack();
    },
    onError(err) {
      Alert.alert('Failed', err.response?.data?.message || err.message);
    },
    onSettled() {
      hideLoading();
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form Data', data);

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
              transferMutation.mutate(data);
            },
          },
        ],
      );
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message || 'Cannot proceed');
    }
  };

  const getBalance = (accountNo: string) => {
    setBalance(
      formattedFromAccountList.find(item => item.accountNo === accountNo)
        ?.balance ?? 0,
    );
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
            <Text style={styles.sectionTitle}>Transfer Details</Text>
            <View style={styles.divider} />

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
                    onChange={item => {
                      onChange(item.accountNo);
                      getBalance(item.accountNo);
                    }}
                    valueField={'accountNo'}
                    value={value}
                    placeholder="Select"
                  />
                )}
              />
              {errors.fromAccount && (
                <Text style={styles.error}>{errors.fromAccount.message}</Text>
              )}
            </View>
            {watch('fromAccount') && (
              <View style={styles.accountInfoBox}>
                <Text style={styles.accountInfo}>
                  Balance: RM{balance.toFixed(2)}
                </Text>
                <Text style={styles.accountInfo}>
                  Available: RM{balance.toFixed(2)}
                </Text>
              </View>
            )}

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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  accountInfoBox: {
    backgroundColor: '#F6F8FA',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  accountInfo: {
    color: '#333',
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
