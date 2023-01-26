import { Pressable, Text } from "native-base";
import { ReactElement } from "react";

type Props = {
  name: string;
  onPress: () => void;
};

export const LocationTile = ({ name, onPress }: Props): ReactElement => {
  return (
    <Pressable
      backgroundColor="primary.500"
      borderColor="primary.700"
      borderRadius="4"
      borderWidth="2"
      mx="auto"
      my="2"
      onPress={onPress}
      p="3"
      shadow="6"
      w="100%"
    >
      <Text color="white" fontSize="lg" fontWeight="bold" m="auto">
        {name}
      </Text>
    </Pressable>
  );
};
