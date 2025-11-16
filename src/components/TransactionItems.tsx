import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../types";

interface Props {
  item: Transaction;
}

export default function TransactionItem({ item }: Props) {
  const isNegative = item.amount < 0;

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text style={[styles.amount, { color: isNegative ? "red" : "green" }]}>
        {isNegative ? "-" : "+"} RM {Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  title: { fontSize: 16, fontWeight: "500" },
  date: { color: "#888", fontSize: 12 },
  amount: { fontSize: 16, fontWeight: "600" },
});
