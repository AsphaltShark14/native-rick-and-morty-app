import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React, { ReactElement, useState } from "react";
import "react-native-gesture-handler";
import { Navigator } from "./src/routes/Navigator";
import { CharacterServiceProvider } from "./src/services/CharacterService";

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <QueryClientProvider client={client}>
          <CharacterServiceProvider>
            <Navigator />
          </CharacterServiceProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
