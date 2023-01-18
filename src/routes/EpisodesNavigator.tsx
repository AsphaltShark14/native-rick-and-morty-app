import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Episode } from "../screens/Episodes/Episode/Episode";
import { Episodes } from "../screens/Episodes/Episodes";

export type EpisodeStackParams = {
  Episode: {
    id: number;
  };
  Episodes: undefined;
};

const Stack = createNativeStackNavigator<EpisodeStackParams>();

export const EpisodesNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Episodes} name="Episodes" />
      <Stack.Screen component={Episode} name="Episode" />
    </Stack.Navigator>
  );
};
