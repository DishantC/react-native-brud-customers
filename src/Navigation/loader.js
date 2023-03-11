import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Color} from '../utils';
import DeviceInfo from 'react-native-device-info';

export function Loader({isLoding = false, backButton, backOnPress}) {
  if (!isLoding) return null;

  return (
    <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.3)'}]}>
      {backButton ? (
        <View style={styles.header1}>
          <TouchableOpacity
            
            onPress={backOnPress}>
            <Image
              source={require('../assets/backGo.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
      ) :  <View >
      </View>}
      <ActivityIndicator color={'#0000FF'} size="large" />
      <View >
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header1: {
    width: '90%',
    flexDirection: 'row',
    alignItems:"flex-end",
    height: Platform.OS=='ios'?'10.5%':'8.5%',

  },
  back: {
    width: 14,
    height: 20,
    resizeMode: 'contain',
  },
});
