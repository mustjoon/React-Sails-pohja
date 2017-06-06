// @flow

import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

export default {
  screen: {
    container: {
      flex: 1
    },
  },
  typography: {
    heading: {
      ...Fonts.style.h1,
      textAlign: 'center'
    },
    title: {
      ...Fonts.style.h2
    },
    subtitle: {
      ...Fonts.style.h3
    },
    text: {
      ...Fonts.style.normal
    },
    caption: {
      ...Fonts.style.medium
    }
  },
  textField: {
   
  }
};
