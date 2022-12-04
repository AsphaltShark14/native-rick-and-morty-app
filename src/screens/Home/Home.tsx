import { Box, Center, Flex, Image, ScrollView } from "native-base";
import { ReactElement } from "react";
import { MenuTile } from "./MenuTile/MenuTile";

type Props = {
  data?: string;
};

export const Home = ({ data }: Props): ReactElement => {
  return (
    <Box backgroundColor="light.50" borderRadius="lg" m="2">
      <ScrollView>
        <Center marginX={4} marginY={4}>
          <Image
            alt="title"
            size="lg"
            source={require("./resources/title.png")}
            width="full"
          />
        </Center>
        <Flex>
          <MenuTile
            source={require("./resources/characters.jpeg")}
            title="characters"
          />
          <MenuTile
            source={require("./resources/locations.jpeg")}
            title="locations"
          />
          <MenuTile
            source={require("./resources/episodes.jpeg")}
            title="episodes"
          />
        </Flex>
        <Box />
      </ScrollView>
    </Box>
  );
};

// const styles = StyleSheet.create({});
