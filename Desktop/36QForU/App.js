import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For tab bar icons
import ProfileScreen from './screens/ProfileScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import LoginScreen from './screens/LoginScreen';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'red' }}>
            Something went wrong: {this.state.error?.message || 'Unknown error'}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 5,
            }}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Home, Profile, and Subscription screens
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Subscription') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff', // White color for active tab
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white for inactive tab
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
          borderTopWidth: 0, // Remove top border
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={ProfileScreen} // Replace with your actual Home screen if you have one
        options={{ headerShown: false, tabBarLabel: 'Главная' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false, tabBarLabel: 'Профиль' }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerShown: false, tabBarLabel: 'Подписка' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}