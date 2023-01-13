import { Flex, Image, Pressable, Text } from "native-base";
import { ReactElement } from "react";
import { StyleSheet } from "react-native";

type Props = {
  name: string;
  url: string;
};

export const CharacterTile = ({ name, url }: Props): ReactElement => {
  console.log({ name, url });
  return (
    <Pressable
      borderColor="primary.500"
      borderRadius="4"
      borderWidth="2"
      p="3"
      w="100%"
    >
      <Flex>
        <Image
          alt={name}
          size="xs"
          source={{
            uri: url,
          }}
        />
        <Text>{name}</Text>
      </Flex>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
