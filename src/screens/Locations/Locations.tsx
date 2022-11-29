import { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native"

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

const styles = StyleSheet.create({});
