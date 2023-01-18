import { Flex, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  data: Episodes;
};

export const EpisodesList = ({ name, info }: Props): ReactElement => {
  return (
    <Flex flexDirection="row" justify="space-between" m="auto" w="72">
      <Text color="primary.500" fontSize="lg">
        {name}
      </Text>
      <Text color="coolGray.700" fontSize="lg" fontWeight="semibold">
        {info}
      </Text>
    </Flex>
  );
};
