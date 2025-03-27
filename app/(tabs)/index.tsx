import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
import { StatusBar, Platform } from 'react-native';
import { useRouter } from "expo-router"; 
import { TouchableOpacity } from "react-native"; 

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('Гость');
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('@/assets/fonts/MagnoliaScript.otf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setUserName('Гость');
    }, 2000);
  }, []);

  if (!fontsLoaded) {
    return <Text>Загрузка шрифта...</Text>;
  }

  const carouselItems = [
    { 
      title: 'Алия Шагиева', 
      description: 'Художница', 
      description1: 'Вопросы для честного разговора с собой! Обожаю такое! Мне нравится брать наугад, чтобы голова не выбирала то, на что по ее мнению есть готовый и легкий ответ. На один ответ даю себе время около суток, так ответ становится глубже.', 
      background: '#FFFFFF',
      image: require('@/assets/images/aliya.png')
    },
    { 
      title: 'Полина Казка', 
      description: 'Специалист по продажам', 
      description1: 'Привет, Диана, я начала использовать на своих консультациях- по одной карточке в конце встречи клиенты говорят вдохновляюще! Сама часто начинаю день с одной карточки и настрой совершенно другой.', 
      background: '#FFFFFF',
      image: require('@/assets/images/polina.png')
    },
    { 
      title: 'Сейил Калдыбаев', 
      description: 'Психолог ICL', 
      description1: 'Мне сразу понравились эти карточки для рефлексии и я решила перевести их на Кыргызский язык. Это супер инструмент для психологов, коучей и простых людей. Потому что эти вопросы приводят к более осознанной жизни. Я лично использую их в сессиях.', 
      background: '#FFFFFF',
      image: require('@/assets/images/seiil.png')
    }
  ];
  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { backgroundColor: item.background || '#fff' }]}>
      {/* Изображение слева */}
      <Image source={item.image} style={styles.carouselImage} />
  
      {/* Блок заголовка и подзаголовка */}
      <View style={styles.carouselTextWrapper}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselDescription}>{item.description}</Text>
      </View>
  
      {/* Description1 теперь ниже всей карточки */}
      <Text style={styles.carouselDescription1}>{item.description1}</Text>
    </View>
  );
  return (
<SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <LinearGradient
      colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']}
      style={styles.gradientContainer}
    >
          <View style={styles.container}>
            <Image
              source={require('@/assets/images/fon12.png')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <View style={styles.textWrapper}>
              <Text style={styles.overlayText}>Добро пожаловать, {userName}!</Text>
            </View>

                       {/*  Обернули "Для себя" в TouchableOpacity */}
                       <TouchableOpacity onPress={() => router.push("/forme")}>
              <View style={styles.canvasWrapper}>
                <ImageBackground
                  source={require("@/assets/images/background.png")}
                  style={styles.canvas}
                  imageStyle={styles.imageBackground}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.canvasTextWrapper}>
                      <Text style={styles.canvasText}>Для себя</Text>
                      <Entypo name="chevron-right" size={30} color="#FBFFFF" />
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            {/* Второй канвас */}
            <View style={styles.canvasWrapper}>
              <ImageBackground
                source={require('@/assets/images/forcom.png')}
                style={styles.canvas}
                imageStyle={styles.imageBackground}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <View style={styles.canvasTextWrapper}>
                    <Text style={styles.canvasText}>Для компании</Text>
                    <Entypo name="chevron-right" size={30} color="#FBFFFF" />
                  </View>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.separatorLine} />

            {/* Карусель */}
            <Carousel
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width * 0.90}
              loop={false}
            />
                      {/* Новый контейнер под каруселью */}
                      <View style={styles.newPremiumContainer}>
  <LinearGradient 
    colors={['#80C091', '#762E64', '#02220A']} 
    start={{ x: 0, y: 0 }}  
    end={{ x: 1, y: 1 }}    
    style={styles.newPremium}
  >
    <View style={styles.premiumContent}>
      <Icon name="crown" size={24} color="#000000" style={styles.icon} />
      <Text style={styles.newPremiumText}>
        Откройте все 30 вопросов и раскройте себя полностью!
      </Text>
    </View>
  </LinearGradient>
</View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  gradientContainer: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: height * 0.3,
  },
  canvasWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  canvas: {
    width: width * 0.9,
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 20,
  },
  textWrapper: {
    marginTop: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  overlayText: {
    color: '#FBFFFF',
    fontSize: width * 0.06,
    textAlign: 'center',
    fontFamily: 'MagnoliaScript',
    marginLeft: width * 0.05,
    maxWidth: '95%',
  },
  canvasTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    
  },
  canvasText: {
    color: '#FBFFFF',
    fontSize: width * 0.06,
    textAlign: 'left',
    flex: 1,
  },
  imageBackground: {
    borderRadius: 10,
  },
  separatorLine: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#FBFFFF',
    marginVertical: 25,
  },
//   carouselItem: {
//     borderRadius: 10,
//     width: width * 0.75,
//     height: 150,
//     justifyContent: 'center',
//     alignItems: 'center',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // вместо shadowColor, shadowOffset, shadowOpacity, shadowRadius  
//   },
//   carouselText: {
//     color: '#36454F',
//     fontSize: width * 0.04,
//     fontWeight: 'regular',
//   },
//   carouselImage: {
//     width: '100%',
//     height: 50,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   carouselDescription: {
//     color: '#36454F',
//     fontSize: width * 0.04,
//     textAlign: 'left',
    
//     marginTop: 5,
//   },
// });
  carouselItem: {
    flexDirection: 'row', // Фото слева, текст справа
    alignItems: 'center', 
    borderRadius: 10,
    width: width * 0.9,
    height: width * 0.5,  // Квадратная форма
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    flexWrap: 'wrap', // Позволяет Description1 быть ниже
    maxHeight: 200, // Делаем карточки одинаковыми
  },
  carouselImage: {
    width: 50, 
    height: 50,
    resizeMode: 'contain',
    borderRadius: 35, // Если фото круглое
    marginRight: 15,
  },
  carouselTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#36454F',
  },
  carouselDescription: {
    fontSize: width * 0.035,
    color: '#777',
    marginTop: 2,
  },
  carouselDescription1: {
    fontSize: width * 0.035,
    color: '#36454F',
    marginTop: 10,
    width: '100%', // Окучивает всю ширину контейнера
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  newPremiumContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  newPremium: {
    padding: 20,
    alignItems: 'center',
  },
  premiumContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    marginRight: 20, // Отступ между иконкой и текстом
  },
  newPremiumText: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'left',
  },
  
  
});

export default HomeScreen;
