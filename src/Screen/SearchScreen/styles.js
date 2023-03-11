import React from 'react';
import {StyleSheet} from 'react-native';
import {PX} from '../pixel';
const styles = StyleSheet.create({
  main2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header1: {
    width: '90%',
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    height: '12%',
  },
  back: {
    width: PX(12.34),
    height: PX(21),
    resizeMode: 'contain',
  },
});
export default styles;
