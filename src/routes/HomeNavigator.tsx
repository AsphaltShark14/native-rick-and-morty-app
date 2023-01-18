import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Character } from "../screens/Characters/Character/Character";
import { Characters } from "../screens/Characters/Characters";
import { Home } from "../screens/Home/Home";
import { EpisodesNavigator } from "./EpisodesNavigator";
import { LocationsNavigator } from "./LocationsNavigator";

export type RootStackParams = {
  Character: {
    id: number;
  };
  Characters: undefined;
  Episodes: undefined;
  Home: undefined;
  Locations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const HomeNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Characters} name="Characters" />
      <Stack.Screen component={Character} name="Character" />
      <Stack.Screen component={LocationsNavigator} name="Locations" />
      <Stack.Screen component={EpisodesNavigator} name="Episodes" />
    </Stack.Navigator>
  );
};
