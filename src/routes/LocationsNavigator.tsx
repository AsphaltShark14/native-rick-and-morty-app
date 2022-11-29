import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Locations } from "../screens/Locations/Locations";

const Stack = createNativeStackNavigator();

export const LocationsNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Locations} name="LocationsScreen" />
      {/* <Stack.Screen component={Location} name="Location" /> */}
    </Stack.Navigator>
  );
};
