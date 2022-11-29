import { NavigationContainer } from "@react-navigation/native";
import React, { ReactElement } from "react";
import "react-native-gesture-handler";
import { Navigator } from "./src/routes/Navigator";

const App = (): ReactElement => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
