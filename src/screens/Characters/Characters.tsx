import { Box, Center, Heading, Image } from "native-base";
import React, { ReactElement } from "react";

export const Characters = (): ReactElement => {
  return (
    <Box backgroundColor="light.50" borderRadius="lg" flex={1} m="2">
      <Center>
        <Heading color="coolGray.700" marginBottom={2}>
          CHARACTERS
        </Heading>
        <Image
          alt="characters"
          borderColor="primary.500"
          borderRadius={100}
          borderWidth={1}
          size="xl"
          source={require("../../assets/characters.jpeg")}
        />
      </Center>
    </Box>
  );
};
