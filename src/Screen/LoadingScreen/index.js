import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.navigate("TabStack");
    } else {
      navigation.navigate("Login");
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#ff0550" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default LoadingScreen;
