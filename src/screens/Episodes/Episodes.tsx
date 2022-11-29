import { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native"

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

const styles = StyleSheet.create({});
