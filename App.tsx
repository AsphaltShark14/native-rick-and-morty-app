import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import React, { ReactElement, useState } from "react";
import "react-native-gesture-handler";
import { Navigator } from "./src/routes/Navigator";
import { CharacterServiceProvider } from "./src/services/CharacterService";
import { EpisodeServiceProvider } from "./src/services/EpisodeService";
import { LocationServiceProvider } from "./src/services/LocationService";

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <QueryClientProvider client={client}>
          <CharacterServiceProvider>
            <EpisodeServiceProvider>
              <LocationServiceProvider>
                <Navigator />
              </LocationServiceProvider>
            </EpisodeServiceProvider>
          </CharacterServiceProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
