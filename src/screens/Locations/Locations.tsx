import { ReactElement } from "react";
import { Text, View } from "react-native";

type Props = {
  data?: string;
};

export const Locations = ({ data }: Props): ReactElement => {
  return (
    <View>
      <Text>Locations</Text>
      <View>{data}</View>
    </View>
  );
};
