import { SafeAreaView, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';  // Для переходов
import Logo from './Logo';  // Импортируем компонент логотипа
import Slider from './slider'; // Путь к слайдеру
const Layout = () => {
  const [showWelcomeScreens, setShowWelcomeScreens] = useState(false);

  // Таймер для перехода на экран слайдов через 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreens(true);  // Показываем слайды после 5 секунд
      router.replace('/slider');  // Переход на экран слайдов
    }, 5000);

    return () => clearTimeout(timer);  // Очистка таймера при размонтировании компонента
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!showWelcomeScreens ? (
        <Logo />
      ) : null}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

