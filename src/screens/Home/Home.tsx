import { ReactElement } from "react";
import { Text, View } from "react-native";
import { global } from "../../styles/global";

type Props = {
  data?: string;
};

export const Home = ({ data }: Props): ReactElement => {
  return (
    <View style={global.container}>
      <Text>Home component</Text>
      <View>{data}</View>
    </View>
  );
};

// const styles = StyleSheet.create({});
