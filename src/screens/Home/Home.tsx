import { useDimensions } from "@/hooks/useDimensions";
import { RootStackParams } from "@/routes/HomeNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Center, Flex, Heading, Image, Text } from "native-base";
import { ReactElement } from "react";
import Carousel from "react-native-reanimated-carousel";
import { Footer } from "./Footer/Footer";
import { MenuTile } from "./MenuTile/MenuTile";

type Props = NativeStackScreenProps<RootStackParams, "Home">;

export const Home = ({ navigation }: Props): ReactElement => {
  const { windowWidth } = useDimensions();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigation = (route: any) => {
    navigation.navigate(route);
  };

  const handleIcon = (screen: string) => {
    switch (screen) {
      case "Characters":
        return require("../../assets/characters.jpeg");
      case "Locations":
        return require("../../assets/locations.jpeg");
      case "Episodes":
        return require("../../assets/episodes.jpeg");
    }
  };

  const screens = ["Characters", "Locations", "Episodes"];

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
        <Carousel
          autoPlay
          data={screens}
          height={windowWidth / 2}
          loop
          renderItem={({ item }) => (
            <MenuTile
              onPress={() => handleNavigation(item)}
              source={handleIcon(item)}
              title={item}
            />
          )}
          scrollAnimationDuration={1000}
          width={windowWidth}
        />
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
