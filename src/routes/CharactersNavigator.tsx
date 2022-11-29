import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Characters } from "../screens/Characters/Characters";

const Stack = createNativeStackNavigator();

export const CharactersNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Characters} name="CharactersScreen" />
      {/* <Stack.Screen component={Character} name="Character" /> */}
    </Stack.Navigator>
  );
};
