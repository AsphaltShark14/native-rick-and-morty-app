import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Characters } from "../screens/Characters/Characters";
import { Episodes } from "../screens/Episodes/Episodes";
import { Home } from "../screens/Home/Home";
import { Locations } from "../screens/Locations/Locations";

const Stack = createNativeStackNavigator();

export const HomeNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Characters} name="Characters" />
      <Stack.Screen component={Locations} name="Locations" />
      <Stack.Screen component={Episodes} name="Episodes" />
    </Stack.Navigator>
  );
};
