import { Flex, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  episode: string;
  name: string;
};

export const CharacterEpisodeTile = ({
  name,
  episode,
}: Props): ReactElement => {
  return (
    <Flex direction="row">
      <Text color="coolGray.700" fontSize="lg" fontWeight="semibold" w="20">
        {episode}
      </Text>
      <Text color="primary.500" flex={1} fontSize="lg">
        {name}
      </Text>
    </Flex>
  );
};
