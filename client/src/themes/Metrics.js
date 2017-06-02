// @flow

import { Dimensions, Platform } from 'react-native';

const viewport = Dimensions.get('window');
const width = viewport.width;
const height = viewport.height;
const baseUnit = 16;

// Calculating ratio from iPhone breakpoints
const ratioX = width < 375 ? (width <= 320 ? 0.75 : 0.875) : 1;
const ratioY = height < 568 ? (height <= 480 ? 0.75 : 0.875) : 1;

let fontRatio = 1;

if(width < 375) {
  fontRatio = 0.875;
  if(width < 568) {
    fontRatio = 0.75;
  }
}

export default {
  viewport,
  baseUnit,
  ratioX,
  ratioY,
  topMenuHeight:  viewport.height * 0.05,
  unit: baseUnit / fontRatio,
  px: 1/viewport.scale,
  marginHorizontal: 10,
  marginVertical: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  basePadding: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1/viewport.scale,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300,
  },
};
