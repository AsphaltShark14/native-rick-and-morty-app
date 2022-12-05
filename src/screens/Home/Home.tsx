import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  ScrollView,
  Text,
} from "native-base";
import { ReactElement } from "react";
import { Footer } from "./Footer/Footer";
import { MenuTile } from "./MenuTile/MenuTile";

type RootStackParamList = {
  Characters: undefined;
  Episodes: undefined;
  Home: undefined;
  Locations: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation }: Props): ReactElement => {
  const handleCharacters = () => {
    navigation.navigate("Characters");
  };
  const handleLocations = () => {
    navigation.navigate("Locations");
  };
  const handleEpisodes = () => {
    navigation.navigate("Episodes");
  };

  return (
    <Box backgroundColor="light.50" borderRadius="lg" flex={1} m="2">
      <Center marginX={4} marginY={4}>
        <Image
          alt="title"
          size="lg"
          source={require("../../assets/title.png")}
          width="full"
        />
      </Center>
      <Flex>
        <ScrollView centerContent horizontal>
          <MenuTile
            onPress={handleCharacters}
            source={require("../../assets/characters.jpeg")}
            title="characters"
          />
          <MenuTile
            onPress={handleLocations}
            source={require("../../assets/locations.jpeg")}
            title="locations"
          />
          <MenuTile
            onPress={handleEpisodes}
            source={require("../../assets/episodes.jpeg")}
            title="episodes"
          />
        </ScrollView>
        <Box m={2}>
          <Heading color="coolGray.700" size="sm">
            Welcome to Rick and Morty App
          </Heading>
          <Text color="coolGray.700" mt={1}>
            You can browse through Characters, Locations and Episodes using
            swipe menu above this text!
          </Text>
          <Text color="coolGray.700" mt={1}>
            You can check detailed info about each Character and Location or
            Episode. Search field on category screens will let you find what you
            want. Apply some filters in case you want to be more specific while
            browsing.
          </Text>
        </Box>
      </Flex>
      <Flex flexGrow={1} />
      <Footer />
    </Box>
  );
};
