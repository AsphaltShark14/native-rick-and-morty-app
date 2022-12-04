import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React, { ReactElement } from "react";
import "react-native-gesture-handler";
import { Navigator } from "./src/routes/Navigator";

const App = (): ReactElement => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
