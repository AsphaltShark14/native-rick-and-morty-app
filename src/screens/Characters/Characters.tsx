import { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native"

type Props = {
  data?: string;
};

export const Characters = ({ data }: Props): ReactElement => {
  return (
    <View>
      <Text>Characters</Text>
      <View>{data}</View>
    </View>
  );
};

const styles = StyleSheet.create({});
