import { ReactElement } from "react";
import { Text, View } from "react-native";

type Props = {
  data?: string;
};

export const Episodes = ({ data }: Props): ReactElement => {
  return (
    <View>
      <Text>Episodes</Text>
      <View>{data}</View>
    </View>
  );
};
