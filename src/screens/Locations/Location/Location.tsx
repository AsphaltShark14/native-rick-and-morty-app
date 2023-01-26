import { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native"

type Props = {
  data?: string;
};

export const Location = ({ data }: Props): ReactElement => {
  return (
    <View>
      <Text>Location</Text>
      <View>{data}</View>
    </View>
  );
};

const styles = StyleSheet.create({});
