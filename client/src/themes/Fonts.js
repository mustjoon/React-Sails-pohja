// @flow

import Metrics from './Metrics';

const em = value => Metrics.unit * value;

const family = {
  system: 'System',
  encodeSansLight: 'EncodeSans-Light',
  encodeSansMedium: 'EncodeSans-Medium',
  encodeSansRegular: 'EncodeSans-Regular',
  encodeSansBold: 'EncodeSans-Bold',
};

const size = {
  h1: em(1.375), // 22
  h2: em(1.250), // 20
  h3: em(1.125), // 18
  h4: em(1), // 16
  h5: em(0.875), // 14
  h6: em(0.875), // 14
  input: em(0.875), // 14
  regular: em(0.875), // 14
  small: em(0.625), // 10
  tiny: em(0.5) // 8
};

const style = {
  h1: {
    fontFamily: family.system,
    fontSize: size.h1
  },
  h2: {
    fontFamily: family.system,
    fontSize: size.h2
  },
  h3: {
    fontFamily: family.system,
    fontSize: size.h3
  },
  h4: {
    fontFamily: family.system,
    fontSize: size.h4
  },
  h5: {
    fontFamily: family.system,
    fontSize: size.h5
  },
  h6: {
    fontFamily: family.system,
    fontSize: size.h6
  },
  normal: {
    fontFamily: family.system,
    fontSize: size.regular
  },
  medium: {
    fontFamily: family.system,
    fontSize: size.regular
  },
  small: {
    fontFamily: family.system,
    fontSize: size.small
  },
  tiny: {
    fontFamily: family.system,
    fontSize: size.tiny
  }
};

export default {
  em,
  family,
  size,
  style
};
