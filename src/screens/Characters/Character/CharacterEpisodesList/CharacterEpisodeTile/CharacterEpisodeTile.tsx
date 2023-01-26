import { Flex, Pressable, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  episode: string;
  name: string;
  onPress: () => void;
};

export const CharacterEpisodeTile = ({
  name,
  episode,
  onPress,
}: Props): ReactElement => {
  return (
    <Flex direction="row">
      <Text color="coolGray.700" fontSize="lg" fontWeight="semibold" w="20">
        {episode}
      </Text>
      <Pressable onPress={onPress}>
        <Text color="primary.500" flex={1} fontSize="lg">
          {name}
        </Text>
      </Pressable>
    </Flex>
  );
};
