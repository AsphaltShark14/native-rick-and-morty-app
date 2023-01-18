import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ReactElement } from "react";
import { Character } from "../screens/Characters/Character/Character";
import { Characters } from "../screens/Characters/Characters";

export type CharacterStackParams = {
  Character: {
    id: number;
  };
  Characters: undefined;
};

const Stack = createNativeStackNavigator<CharacterStackParams>();

export const CharactersNavigator = (): ReactElement => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Characters} name="Characters" />
      <Stack.Screen component={Character} name="Character" />
    </Stack.Navigator>
  );
};
