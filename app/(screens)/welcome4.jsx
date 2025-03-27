import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Welcome4 = () => {
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('../../assets/fonts/MagnoliaScript.otf'),
  });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>;
  }

  const handlePress = () => {
    navigation.navigate('NextScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
        <View style={styles.canvas}>
          <Text style={styles.firstText}>Готовы сделать первый шаг? Первый вопрос уже ждет вас!</Text>
        </View>

        {/* Кнопка, расположенная снизу */}
        <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
          <LinearGradient 
            colors={['#A6C1F6', '#9FA4F1', '#C67DD5']} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Начать</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexShrink: 1,
    paddingHorizontal: 10,
    marginTop: 68,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 120, // Располагаем кнопку на 20px выше нижнего края экрана
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: height * 0.012, 
    paddingHorizontal: width * 0.1, 
    borderRadius: 25,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#FBFFFF',
    fontSize: width * 0.05,
    fontWeight: 'regular',
  },
});

export default Welcome4;
