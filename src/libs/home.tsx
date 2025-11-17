import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItems";
import { account } from "../data/mockData";
import { RootStackParamList, Transaction } from "../types";
import { useTransactions } from "../services/useTransactions";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {

  const [items, setItems] = useState<Transaction[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, isLoading, isFetching } = useTransactions(page);

  useEffect(() => {
    if (!data) return;

    // Append new items
    setItems(prev => [...prev, ...data.data]);

    // Check if there are more pages
    const maxPage = Math.ceil(data.total / data.pageSize);
    if (page >= maxPage) setHasMore(false);
  }, [data]);

  const loadMore = () => {
    if (isFetching || !hasMore) return;
    setPage(prev => prev + 1);
  };

  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit",
          "Are you sure you want to exit the app?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true; // block default back action
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      // cleanup
      return () => subscription.remove();
    }, [])
  );

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.welcomeText}>Welcome, {account.name}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <BalanceCard balance={account.balance} />

      <TouchableOpacity
        style={styles.transferBtn}
        onPress={() => navigation.navigate("Transfer")}
      >
        <Text style={styles.transferText}>Transfer Money</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => <TransactionItem item={item} />}
            keyExtractor={(item, index) => index.toString()}

            onEndReached={loadMore}
            onEndReachedThreshold={0.5} 
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
          />

          {isFetching && <Text>Loading next page...</Text>}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 20
  },
  top: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "#4d4a4aff",
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transferBtn: {
    backgroundColor: "#0F52BA",
    padding: 15,
    borderRadius: 10,
  },
  transferText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
