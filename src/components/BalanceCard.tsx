import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Account } from '../mocks/types';

interface Props {
  account: Account;
}

export default function BalanceCard({ account }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{account.name}</Text>
      <Text style={styles.label}>Available Balance</Text>
      <Text style={styles.balance}>RM {account.balance.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#1B72FF',
    borderRadius: 12,
  },
  title: { color: '#fff', fontSize: 16, marginBottom: 8 },
  label: { color: '#fff', opacity: 0.8 },
  balance: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
});
