import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font'; 

const { width } = Dimensions.get('window'); 

const Welcome2 = () => {
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('../../assets/fonts/MagnoliaScript.otf'), 
  });

  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
        <View style={styles.canvas}>
          <Text style={styles.firstText}>
            Вы будете получать карточки с вопросами, которые помогут вам задуматься, изучить эмоции и укрепить отношения.
          </Text>
        </View>
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
    // fontWeight: 'regular',
    // fontSize: 28,
    textAlign: 'center',
    fontFamily: 'MagnoliaScript',
    maxWidth: '95%',
    flexShrink: 1,
    paddingHorizontal: 10,
    marginTop: 68, 
  },
});

export default Welcome2;
