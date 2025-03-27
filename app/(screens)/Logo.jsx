import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LogoScreen = () => (
  <View style={styles.appContainer}>
    <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.gradientContainer}>
      <Text style={styles.text}>App</Text>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: 'blue',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LogoScreen;
