import { createDrawerNavigator } from "@react-navigation/drawer";
import { ReactElement } from "react";
import { About } from "../screens/About/About";
import { CharactersNavigator } from "./CharactersNavigator";
import { EpisodesNavigator } from "./EpisodesNavigator";
import { HomeNavigator } from "./HomeNavigator";
import { LocationsNavigator } from "./LocationsNavigator";

const Drawer = createDrawerNavigator();

export const Navigator = (): ReactElement => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeNav"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen component={HomeNavigator} name="HomeNav" />
      <Drawer.Screen component={CharactersNavigator} name="CharactersNav" />
      <Drawer.Screen component={LocationsNavigator} name="LocationsNav" />
      <Drawer.Screen component={EpisodesNavigator} name="EpisodesNav" />
      <Drawer.Screen component={About} name="About" />
    </Drawer.Navigator>
  );
};
