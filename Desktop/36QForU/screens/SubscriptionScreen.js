import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const SubscriptionScreen = () => {
  return (
    <LinearGradient
      colors={["#A0C4FF", "#DDBBF6", "#FFAFCC"]} // Gradient for the outer container
      style={styles.container}
    >
      <LinearGradient
        colors={['#80C091', '#762E64', '#02220A']} // Gradient for the card
        style={styles.card}
      >
        <Text style={styles.title}>ПОЛУЧИТЬ ПОЛНЫЙ ДОСТУП</Text>
        <Text style={styles.price}>2,99 $/месяц</Text>
        <Text style={styles.description}>
        Откройте полный доступ к оставшимся 30 вопросам и получите персонализированные рекомендации!
        </Text>
        <View style={styles.bulletContainer}>
          {/* First item with checkmark */}
          <View style={styles.item}>
            <MaterialIcons name="check-circle" size={18} color="#000000" style={styles.icon} />
            <Text style={styles.text}>Доступ к остальным 30 вопросам</Text>
          </View>

          {/* First item with checkmark */}
          <View style={styles.item}>
            <MaterialIcons name="check-circle" size={18} color="#000000" style={styles.icon} />
            <Text style={styles.text}>Индивидуальный анализ данных</Text>
          </View>

          {/* Second item with checkmark */}
          <View style={styles.item}>
            <MaterialIcons name="check-circle" size={18} color="#000000" style={styles.icon} />
            <Text style={styles.text}>Персонализированные рекомендации</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Получить Plus</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Восстановить покупку</Text>
          <Text style={styles.footerText}>Политика конфидециальности</Text>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'left',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'left',
  },
  price: {
    fontSize: 28, // Increased from 20 to 28 for larger text
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    marginBottom: 20,
  },
  bulletContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 10,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#28A745',
    borderRadius: 25,
    paddingVertical: 7,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline', // Underline the text
    marginBottom: 5, // Add spacing between the two lines
  },
});

export default SubscriptionScreen;