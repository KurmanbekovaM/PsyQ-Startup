import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Answer } from './types';

const { height, width } = Dimensions.get('window');

type Params = {
  index?: string;
  answers?: string;
};

const LetsGoScreen = () => {
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('@/assets/fonts/MagnoliaScript.otf'),
  });
  const router = useRouter();
  const params = useLocalSearchParams<Params>();

  const questions = [
    "Какой момент в жизни я считаю своим самым большим достижением?",
    "Что меня больше всего вдохновляет в людях вокруг меня?",
    // "Какую привычку я хотел бы развить в этом году?",
    // "Какой урок из прошлого я не хочу забывать?",
    // "Что приносит мне больше всего радости в повседневной жизни?",
    // "Какую мечту я откладывал слишком долго?",
    // "Какой навык я хочу освоить в ближайшее время?",
    // "Что я ценю больше всего в дружбе?",
    // "Какой фильм или книга оказали на меня сильное влияние?",
    // "Как я справляюсь с трудностями, когда они возникают?",
    // "Какую цель я хочу достичь в следующие пять лет?",
    // "Что для меня значит 'успех' в жизни?",
    // "Какой совет я бы дал своему младшему 'я'?",
    // "Что я люблю делать, когда никто не смотрит?",
    // "Какой человек в моей жизни оказал на меня наибольшее влияние?",
    // "Какую традицию я хотел бы создать для себя или своей семьи?",
    // "Что я делаю, чтобы заботиться о своём здоровье?",
    // "Какой момент из детства я вспоминаю с улыбкой?",
    // "Что я хотел бы изменить в своём окружении?",
    // "Какую роль играет творчество в моей жизни?",
    // "Как я обычно отдыхаю после сложного дня?",
    // "Что я считаю своим самым большим страхом?",
    // "Какую страну или место я мечтаю посетить?",
    // "Как я определяю, что человек мне близок?",
    // "Какую ошибку я совершил, но чему-то научился благодаря ей?",
    // "Что я делаю, чтобы чувствовать себя увереннее?",
    // "Какой подарок я получил, который запомнился мне больше всего?",
    // "Как я вижу своё идеальное утро?",
    // "Что меня мотивирует вставать по утрам?",
    // "Какую часть своей жизни я хотел бы пережить заново?",
    // "Что я считаю своим самым ценным качеством?",
    // "Как я помогаю другим, когда они нуждаются в поддержке?",
    // "Какую песню я могу слушать бесконечно?",
    // "Что я хотел бы оставить после себя в этом мире?",
    // "Какой комплимент я получаю чаще всего?",
    // "Что делает меня по-настоящему счастливым?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const saveProgress = async (index: number, answersArray: Answer[]) => {
    try {
      await AsyncStorage.setItem('currentQuestionIndex', index.toString());
      await AsyncStorage.setItem('answers', JSON.stringify(answersArray));
      console.log('Прогресс сохранён:', { index, answersArray });
    } catch (e) {
      console.log('Ошибка сохранения прогресса:', e);
    }
  };

  const loadProgress = async () => {
    try {
      const savedIndex = await AsyncStorage.getItem('currentQuestionIndex');
      const savedAnswers = await AsyncStorage.getItem('answers');

      const newIndex = savedIndex ? parseInt(savedIndex, 10) : (params.index ? parseInt(params.index, 10) : 0);
      const newAnswers = savedAnswers ? JSON.parse(savedAnswers) : (params.answers ? JSON.parse(params.answers) : []);

      setCurrentQuestionIndex(newIndex);
      setAnswers(newAnswers);
      console.log('Прогресс загружен:', { newIndex, newAnswers });
    } catch (e) {
      console.log('Ошибка загрузки прогресса:', e);
      setCurrentQuestionIndex(params.index ? parseInt(params.index, 10) : 0);
      setAnswers(params.answers ? JSON.parse(params.answers) : []);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const newIndex = params.index ? parseInt(params.index, 10) : currentQuestionIndex;
    let newAnswers: Answer[] = answers;
    try {
      newAnswers = params.answers ? JSON.parse(params.answers) : answers;
    } catch (e) {
      console.log('Ошибка парсинга answers в useEffect:', e);
    }

    if (newIndex !== currentQuestionIndex || JSON.stringify(newAnswers) !== JSON.stringify(answers)) {
      console.log('Обновление состояния:', { newIndex, newAnswers });
      setCurrentQuestionIndex(newIndex);
      setAnswers(newAnswers);
      saveProgress(newIndex, newAnswers);
    }
  }, [params.index, params.answers, isLoaded]);

  console.log('LetsGoScreen открыт с индексом:', currentQuestionIndex);
  console.log('Текущие ответы:', answers);

  const goBack = () => {
    router.back();
  };

  const goToAnswerScreen = () => {
    console.log('Переход на AnswerScreen с вопросом:', questions[currentQuestionIndex]);
    router.push({
      pathname: '/AnswerScreen',
      params: {
        question: questions[currentQuestionIndex],
        index: currentQuestionIndex.toString(),
        answers: JSON.stringify(answers),
      },
    });
  };

  if (!fontsLoaded || !isLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack}>
            <Entypo name="chevron-left" size={wp('8%')} color="#FBFFFF" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>36 вопросов</Text>
        </View>
        <View style={styles.Line} />
        <View style={styles.cardStack}>
          <View style={[styles.cardContainer, styles.cardOffset2]}>
            <ImageBackground
              source={require('@/assets/images/cloud1.png')}
              style={styles.card}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.cardContainer, styles.cardOffset1]}>
            <ImageBackground
              source={require('@/assets/images/cloud1.png')}
              style={styles.card}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardContainer}>
            <ImageBackground
              source={require('@/assets/images/cloud1.png')}
              style={styles.card}
              resizeMode="cover"
            >
              <Text style={styles.cardText}>{questions[currentQuestionIndex]}</Text>
              <Text style={styles.cardNumber}>{currentQuestionIndex + 1}</Text>
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={goToAnswerScreen}>
          <LinearGradient colors={['#A6C1F6', '#C67DD5']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Записать ответ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: hp('2%') },
  headerContainer: { flexDirection: 'row', alignItems: 'center', position: 'absolute', top: hp('5%'), left: wp('5%') },
  icon: { marginRight: wp('2%') },
  headerText: { fontSize: wp('6%'), color: '#FBFFFF', lineHeight: wp('8%') },
  Line: { height: 1.5, width: '100%', backgroundColor: '#FBFFFF', position: 'absolute', top: hp('10%') },
  cardStack: { position: 'absolute', top: hp('15%'), width: wp('75%'), height: hp('55%') },
  cardContainer: {
    marginTop: hp('1.5%'),
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: wp('14%'),
    elevation: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#878383',
  },
  cardOffset1: { 
    top: hp('-1%'), 
    left: wp('2%'), 
    elevation: 4, 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  cardOffset2: { 
    top: hp('-2%'), 
    left: wp('4%'), 
    elevation: 3, 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  card: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp('5%') },
  cardText: { fontSize: wp('8%'), color: '#36454F', textAlign: 'center', lineHeight: wp('9%'), fontFamily: 'MagnoliaScript' },
  cardNumber: { position: 'absolute', bottom: hp('3%'), right: wp('5%'), fontSize: wp('5%'), color: '#787777' },
  button: { position: 'absolute', bottom: hp('8%'), width: wp('60%'), height: hp('7%'), borderRadius: wp('10%') },
  buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: wp('10%') },
  buttonText: { fontSize: wp('5%'), color: '#FBFFFF', fontWeight: 'bold' },
});

export default LetsGoScreen;