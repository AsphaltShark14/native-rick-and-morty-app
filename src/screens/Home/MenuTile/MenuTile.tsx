import { Center, Heading, Image, Pressable } from "native-base";
import { ReactElement } from "react";
import { ImageSourcePropType } from "react-native";
import { useDimensions } from "../../../hooks/useDimensions";

type Props = {
  onPress: () => void;
  source: ImageSourcePropType;
  title: string;
};

export const MenuTile = ({ onPress, source, title }: Props): ReactElement => {
  const { windowWidth } = useDimensions();
  return (
    <Pressable my={2} onPress={onPress} p={3} shadow={3} w={windowWidth}>
      <Center>
        <Heading color="coolGray.700" marginBottom={2}>
          {title.toUpperCase()}
        </Heading>
        <Image
          alt={title}
          borderColor="primary.500"
          borderRadius={100}
          borderWidth={1}
          size="xl"
          source={source}
        />
      </Center>
    </Pressable>
  );
};
