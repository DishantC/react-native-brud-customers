import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import store from './src/redux/store';
import {Provider as StateProvider} from 'react-redux';
import Navigation from './src/Navigation/Navigation'
const App = () => {
  return (
    <StateProvider store={store}>
      <Navigation />
  </StateProvider>

  )
}

export default App;

