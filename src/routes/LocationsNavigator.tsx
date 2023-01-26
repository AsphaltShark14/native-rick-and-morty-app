import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Location } from "../screens/Locations/Location/Location";
import { Locations } from "../screens/Locations/Locations";

type LocationStackParams = {
  Location: {
    id: number;
  };
  Locations: undefined;
};

const Stack = createNativeStackNavigator<LocationStackParams>();

export const LocationsNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Locations} name="Locations" />
      <Stack.Screen component={Location} name="Location" />
    </Stack.Navigator>
  );
};
