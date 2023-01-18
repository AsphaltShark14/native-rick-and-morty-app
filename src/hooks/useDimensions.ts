import { Dimensions } from "react-native";

export const useDimensions = (): {
  windowHeight: number;
  windowWidth: number;
} => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return { windowHeight, windowWidth };
};
