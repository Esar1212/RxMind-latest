import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const isSmallPhone = width < 360;
export const isPhone = width >= 360 && width < 768;
export const isTablet = width >= 768;

/* clamp helper */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
