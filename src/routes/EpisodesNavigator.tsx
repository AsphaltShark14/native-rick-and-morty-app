import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Episodes } from "../screens/Episodes/Episodes";

const Stack = createNativeStackNavigator();

export const EpisodesNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Episodes} name="EpisodesScreen" />
      {/* <Stack.Screen component={Episode} name="Episode" /> */}
    </Stack.Navigator>
  );
};
