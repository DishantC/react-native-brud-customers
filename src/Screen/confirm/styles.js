import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  header1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: PX(70),
    backgroundColor: '#fff',
    // paddingLeft: '5%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
    resizeMode: 'contain',
  },
});
export default styles;
