import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Character } from "../screens/Characters/Character/Character";
import { Characters } from "../screens/Characters/Characters";
import { Episode } from "../screens/Episodes/Episode/Episode";
import { Episodes } from "../screens/Episodes/Episodes";
import { Home } from "../screens/Home/Home";
import { Location } from "../screens/Locations/Location/Location";
import { Locations } from "../screens/Locations/Locations";

export type RootStackParams = {
  Character: {
    id: number;
  };
  Characters: undefined;
  Episode: {
    id: number;
  };
  Episodes: undefined;
  Home: undefined;
  Location: {
    id: number;
  };
  Locations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const HomeNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Characters} name="Characters" />
      <Stack.Screen component={Character} name="Character" />
      <Stack.Screen component={Locations} name="Locations" />
      <Stack.Screen component={Location} name="Location" />
      <Stack.Screen component={Episodes} name="Episodes" />
      <Stack.Screen component={Episode} name="Episode" />
    </Stack.Navigator>
  );
};
