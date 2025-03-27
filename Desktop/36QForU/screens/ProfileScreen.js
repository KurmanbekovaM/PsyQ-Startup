import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window'); // Get screen height for slide animation

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  // State for toggle switches
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  // Handlers for toggle switches
  const toggleSound = () => setIsSoundEnabled((prev) => !prev);
  const toggleVibration = () => setIsVibrationEnabled((prev) => !prev);

  // Animation for slide-up menu
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen at the bottom (300 is the height of the menu)

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: isNotificationMenuOpen ? 300 : 0, // Slide up (0) or down (300)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Handler for logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Пользователь не авторизован</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Перейти к входу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#A0C4FF', '#DDBBF6', '#FFAFCC']} // Same gradient as SubscriptionScreen
      style={styles.container}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: user.photoURL || 'https://via.placeholder.com/100',
          }} // Use user's photo if available
          style={styles.profilePicture}
        />
        <Text style={styles.userName}>{user.displayName || 'Пользователь'}</Text>
        <Text style={styles.userId}>id: {user.uid.slice(0, 8)}</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.optionsContainer}>
        {/* Edit Profile */}
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Редактирование профиля</Text>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        {/* Notifications (triggers slide-up menu) */}
        <TouchableOpacity style={styles.optionRow} onPress={toggleNotificationMenu}>
          <Text style={styles.optionText}>УВЕДОМЛЕНИЯ</Text>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        {/* Select Language */}
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Выбрать языка</Text>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        {/* About Us */}
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>О нас</Text>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
          <Text style={styles.optionText}>Выйти</Text>
          <MaterialIcons name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Slide-Up Notifications Menu */}
      <Animated.View
        style={[styles.notificationMenu, { transform: [{ translateY: slideAnim }] }]}
      >
        <LinearGradient
          colors={['#D9CFFF', '#F9D7E5']}
          style={styles.notificationMenuContent}
        >
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Доступ уведомлений</Text>
            <Switch
              onValueChange={toggleSound}
              value={isSoundEnabled}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isSoundEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Вибрация</Text>
            <Switch
              onValueChange={toggleVibration}
              value={isVibrationEnabled}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={isVibrationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </LinearGradient>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  userId: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  notificationMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200, // Height of the bottom sheet
    backgroundColor: 'transparent',
  },
  notificationMenuContent: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
});