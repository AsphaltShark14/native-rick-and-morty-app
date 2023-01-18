import { Flex, Pressable, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  episode: string;
  name: string;
  onPress: () => void;
};

export const EpisodeTile = ({
  onPress,
  episode,
  name,
}: Props): ReactElement => {
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
      <Flex direction="row">
        <Text color="coolGray.700" fontSize="lg" fontWeight="semibold" w="20">
          {episode}
        </Text>
        <Text color="primary.500" flex={1} fontSize="lg">
          {name}
        </Text>
      </Flex>
    </Pressable>
  );
};
