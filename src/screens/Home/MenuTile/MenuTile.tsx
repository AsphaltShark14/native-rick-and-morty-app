import { Center, Heading, Image, Pressable } from "native-base";
import { ReactElement } from "react";
import { ImageSourcePropType } from "react-native";

type Props = {
  onPress: () => void;
  source: ImageSourcePropType;
  title: string;
};

export const MenuTile = ({ onPress, source, title }: Props): ReactElement => {
  return (
    <Pressable
      _pressed={{
        borderColor: "primary.700",
      }}
      borderColor="primary.500"
      borderRadius={4}
      borderWidth={2}
      m={2}
      onPress={onPress}
      p={3}
      shadow={3}
      width={350}
    >
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
