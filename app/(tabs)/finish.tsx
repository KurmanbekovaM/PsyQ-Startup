import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FinishScreen = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Поздравляю🎉 Вы прошли игру!</Text>
        <Text style={styles.message}>Пройдено 36/36 вопросов!</Text>
        <Text style={styles.message}>"Каждый шаг на пути к себе — это победа."</Text>
        <TouchableOpacity style={styles.button} onPress={goToHome}>
          <LinearGradient colors={['#A6C1F6','#9FA4F1', '#C67DD5']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Закрыть</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('10%'),
    color: '#36454F',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  message: {
    fontSize: wp('6%'),
    color: '#36454F',
    textAlign: 'center',
    marginBottom: hp('5%'),
  },
  button: {
    width: wp('60%'),
    height: hp('7%'),
    borderRadius: wp('10%'),
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('10%'),
  },
  buttonText: {
    fontSize: wp('5%'),
    color: '#FBFFFF',
    fontWeight: 'bold',
  },
});

export default FinishScreen;