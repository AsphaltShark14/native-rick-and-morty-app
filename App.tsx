import { StatusBar } from "expo-status-bar";
import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
