import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from 'expo-font';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

const StartScreen = () => {
  const [fontsLoaded] = useFonts({
    'MagnoliaScript': require('@/assets/fonts/MagnoliaScript.otf'),
  });
  const router = useRouter();

  if (!fontsLoaded) {
    return null;
  }

  const goBack = () => {
    router.back(); // Возвращаемся на предыдущий экран (главный)
  };

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
              imageStyle={styles.cardImage}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.cardContainer, styles.cardOffset1]}>
            <ImageBackground
              source={require('@/assets/images/cloud1.png')}
              style={styles.card}
              imageStyle={styles.cardImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardContainer}>
            <ImageBackground
              source={require('@/assets/images/cloud1.png')}
              style={styles.card}
              imageStyle={styles.cardImage}
              resizeMode="cover"
            >
              <Text style={styles.cardText}>
                Какой сфере жизни я уделяю сейчас особенное внимание?
              </Text>
              <Text style={styles.cardNumber}>1</Text>
            </ImageBackground>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: '/letsgo', params: { index: 0, answers: JSON.stringify([]) } })}
        >
          <LinearGradient colors={['#A6C1F6', '#C67DD5']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Начать</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#878383',
  },
  cardOffset1: { top: hp('-1%'), left: wp('2%'), elevation: 4, shadowOpacity: 0.2 },
  cardOffset2: { top: hp('-2%'), left: wp('4%'), elevation: 3, shadowOpacity: 0.1 },
  card: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: wp('5%') },
  cardImage: { borderRadius: wp('10%') },
  cardText: { fontSize: wp('8%'), color: '#36454F', textAlign: 'center', lineHeight: wp('9%'), fontFamily: 'MagnoliaScript' },
  cardNumber: { position: 'absolute', bottom: hp('3%'), right: wp('5%'), fontSize: wp('5%'), color: '#787777' },
  button: { position: 'absolute', bottom: hp('8%'), width: wp('60%'), height: hp('7%'), borderRadius: wp('10%') },
  buttonGradient: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: wp('10%') },
  buttonText: { fontSize: wp('5%'), color: '#FBFFFF', fontWeight: 'bold' },
});

export default StartScreen;