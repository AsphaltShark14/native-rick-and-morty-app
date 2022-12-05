import { AntDesign } from "@expo/vector-icons";
import { Box, Flex, Icon, Link, Text } from "native-base";
import { ReactElement } from "react";

export const Footer = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      borderColor="lime.400"
      borderRadius={4}
      borderWidth={2}
      flexDirection="row"
      justifyContent="space-between"
      p={2}
    >
      <Box>
        <Text color="coolGray.700">Made by asphaltshark</Text>
        <Link
          _text={{ color: "coolGray.700" }}
          href="https://rickandmortyapi.com/"
        >
          Created with Rick & Morty API
        </Link>
      </Box>
      <Link href="https://github.com/AsphaltShark14">
        <Icon as={AntDesign} name="github" size={8} />
      </Link>
    </Flex>
  );
};
