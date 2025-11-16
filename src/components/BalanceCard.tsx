import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Saving Account</Text>
      <Text style={styles.label}>Available Balance</Text>
      <Text style={styles.balance}>RM {balance.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#1B72FF",
    borderRadius: 12,
  },
  title: { color: "#fff", fontSize: 16, marginBottom: 8 },
  label: { color: "#fff", opacity: 0.8 },
  balance: { color: "#fff", fontSize: 32, fontWeight: "bold", marginTop: 10 },
});
