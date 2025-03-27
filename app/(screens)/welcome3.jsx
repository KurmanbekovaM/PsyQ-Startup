import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'; // Импортируем useFonts
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const Welcome3 = () => {
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('../../assets/fonts/MagnoliaScript.otf'), // Путь относительно текущего файла
  });
  
  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>;
  }
  return (
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
            <View style={styles.canvas}>
              <Text style={styles.firstText}>Глубокие вопросы помогают наладить доверие, развить эмпатию и понять себя лучше.</Text>
              <Text style={styles.secondText}>Исследования показывают, что искренние разговоры сближают</Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
      );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  canvas: {
    width: '80%', 
    height: '63%', 
    backgroundColor: '#F1F0F5', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    borderRadius: 20, 
    padding: 10,
    marginTop: 95, 
  },
  
  firstText: {
    color: '#082042',
    fontSize: width * 0.06, 
    textAlign: 'center',
    fontFamily: 'MagnoliaScript',
    maxWidth: '95%',
    marginTop: height * 0.075, 
    
  },
  
  secondText: {
    color: '#082042',
    fontSize: width * 0.06, 
    textAlign: 'center',
    fontFamily: 'MagnoliaScript',
    maxWidth: '95%', 
    marginTop: height * 0.02,
  },
});

export default Welcome3;
