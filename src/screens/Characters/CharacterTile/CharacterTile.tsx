import { Flex, Image, Pressable, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  name: string;
  onPress: () => void;
  url: string;
};

export const CharacterTile = ({ name, url, onPress }: Props): ReactElement => {
  return (
    <Pressable
      borderColor="primary.500"
      borderRadius="4"
      borderWidth="2"
      mx="auto"
      my="2"
      onPress={onPress}
      p="3"
      w="100%"
    >
      <Flex
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        paddingX="4"
      >
        <Image
          alt={name}
          borderRadius="50%"
          size="sm"
          source={{
            uri: url,
          }}
        />
        <Text fontSize="lg" fontWeight="semibold" isTruncated maxW="48">
          {name}
        </Text>
      </Flex>
    </Pressable>
  );
};
