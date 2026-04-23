import { Platform } from "react-native";

export const fonts = {
  serif: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }),
};
