import { Flex, Image, Pressable, Text } from "native-base";
import { ReactElement } from "react";
import { useDimensions } from "../../../../../hooks/useDimensions";

type Props = {
  image: string;
  name: string;
  onPress: () => void;
};

export const EpisodeCharactersTile = ({
  image,
  name,
  onPress,
}: Props): ReactElement => {
  const { windowWidth } = useDimensions();

  return (
    <Pressable onPress={onPress}>
      <Flex
        background="primary.500"
        borderRadius="lg"
        direction="column"
        h="48"
        mx="3"
        my="2"
        p="2"
        shadow="3"
        width={windowWidth / 2.5}
      >
        <Image
          alt={name}
          borderColor="white"
          borderRadius={100}
          borderWidth={1}
          m="auto"
          size="lg"
          source={{ uri: image }}
        />
        <Text color="white" fontSize="md" fontWeight="semibold" m="auto">
          {name}
        </Text>
      </Flex>
    </Pressable>
  );
};
