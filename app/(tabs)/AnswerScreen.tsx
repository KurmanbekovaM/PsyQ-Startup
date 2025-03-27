import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Answer } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';

type Params = {
  question?: string;
  index?: string;
  answers?: string;
};

const AnswerScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  
  const { question, index, answers: answersParam } = params;
  const [answer, setAnswer] = useState<string>('');

  console.log('AnswerScreen открыт с параметрами:', params);

  useEffect(() => {
    setAnswer('');
  }, [question]);

  const parsedIndex = index ? parseInt(index, 10) : 0;
  let parsedAnswers: Answer[] = [];
  try {
    parsedAnswers = answersParam ? JSON.parse(answersParam) : [];
  } catch (e) {
    console.log('Ошибка парсинга answers в AnswerScreen:', e);
  }

  const saveProgress = async (index: number, answersArray: Answer[]) => {
    try {
      await AsyncStorage.setItem('currentQuestionIndex', index.toString());
      await AsyncStorage.setItem('answers', JSON.stringify(answersArray));
      console.log('Прогресс сохранён:', { index, answersArray });
    } catch (e) {
      console.log('Ошибка сохранения прогресса:', e);
    }
  };

  const clearProgress = async () => {
    try {
      await AsyncStorage.removeItem('currentQuestionIndex');
      await AsyncStorage.removeItem('answers');
      console.log('Прогресс очищен');
    } catch (e) {
      console.log('Ошибка очистки прогресса:', e);
    }
  };

  const saveAnswer = () => {
    if (answer.trim()) {
      console.log(`Сохранение ответа для вопроса ${parsedIndex + 1}: ${answer}`);
      const newAnswers = [...parsedAnswers, { question: question || '', answer }];
      const nextIndex = parsedIndex + 1;

      if (nextIndex < 2) {
        const navigationParams = {
          index: nextIndex.toString(),
          answers: JSON.stringify(newAnswers),
        };
        console.log('Параметры для перехода:', navigationParams);
        saveProgress(nextIndex, newAnswers);
        setTimeout(() => {
          console.log('Выполняется переход на /letsgo с push');
          router.push({
            pathname: '/letsgo',
            params: navigationParams,
          });
        }, 100);
      } else {
        console.log('Все вопросы завершены! Ответы:', newAnswers);
        clearProgress();
        setTimeout(() => {
          console.log('Выполняется переход на /finish');
          router.push('/finish');
        }, 100);
      }
    } else {
      console.log('Ответ пустой, ничего не делаем');
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Entypo name="chevron-left" size={wp('8%')} color="#FBFFFF" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>36 вопросов</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.questionContainer}>
        <ImageBackground
          source={require('@/assets/images/cloud1.png')}
          style={styles.questionCard}
          resizeMode="cover"
        >
<Text style={styles.questionNumber}>
  {parsedIndex + 1} вопрос
</Text>
<Text style={styles.questionText}>{question}</Text>
        </ImageBackground>
      </View>
      <View style={styles.answerContainer}>
        <ImageBackground
          source={require('@/assets/images/cloud1.png')}
          style={styles.answerCard}
          resizeMode="cover"
        >
          <TextInput
            style={styles.textInput}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Введите ваш ответ"
            placeholderTextColor="#787777"
            multiline
          />
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveAnswer}>
        <LinearGradient colors={['#A6C1F6', '#C67DD5']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Далее</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('2%'),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: hp('5%'),
    left: wp('5 %'),
  },
  icon: {
    marginRight: wp('2%'),
  },
  headerText: {
    fontSize: wp('6%'),
    color: '#FBFFFF',
    lineHeight: wp('8%'),
  },
  line: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#FBFFFF',
    position: 'absolute',
    top: hp('10%'),
  },
  questionContainer: {
    position: 'absolute',
    top: hp('12%'),
    width: wp('80%'),
    height: hp('20%'),
  },
  questionCard: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignItems: 'flex-start', 
    padding: wp('5%'),
    borderRadius: wp('7%'),
    borderWidth: 2,
    borderColor: '#878383',
    elevation: 5,
    overflow: 'hidden',
  },
  questionText: {
    fontSize: wp('4.5%'),
    color: '#36454F',
    textAlign: 'center',
    lineHeight: wp('6%'),
  },
  questionNumber: {

    position: 'absolute',
    top: hp('0.5%'), 
    left: wp('32%'),
    fontSize: wp('3.5%'),
    color: '#36454f',
    fontWeight: 'regular',  
  },
  answerContainer: {
    position: 'absolute',
    top: hp('34%'),
    width: wp('80%'),
    height: hp('20%'),
  },
  answerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    borderRadius: wp('8%'),
    borderWidth: 2,
    borderColor: '#878383',
    elevation: 5,
    overflow: 'hidden',
  },
  textInput: {
    width: '100%',
    height: '100%',
    padding: wp('2%'),
    fontSize: wp('4.5%'),
    color: '#36454F',
    textAlignVertical: 'top',
    // outline: 'none', 
  },
  button: {
    position: 'absolute',
    bottom: hp('5%'),
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

export default AnswerScreen;