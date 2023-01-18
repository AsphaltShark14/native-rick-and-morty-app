import { ReactElement } from "react";
import { Text, View } from "react-native";

type Props = {
  data?: string;
};

export const About = ({ data }: Props): ReactElement => {
  return (
    <View>
      <Text>About</Text>
      <View>{data}</View>
    </View>
  );
};
