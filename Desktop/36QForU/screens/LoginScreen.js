import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { getAuth, signInWithCredential, GoogleAuthProvider, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_w45OqNQcec1T0cRDgjT2Zl3Gj2hqABY",
    authDomain: "exp22-babf4.firebaseapp.com",
    projectId: "exp22-babf4",
    storageBucket: "exp22-babf4.firebasestorage.app",
    messagingSenderId: "99159745895",
    appId: "1:99159745895:web:07d29527001eef88d9fbc2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

WebBrowser.maybeCompleteAuthSession();

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

export default function LoginScreen({ navigation }) {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  };

  // Используем useProxy: true для корректного redirectUri
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  console.log('Redirect URI:', redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '99159745895-qt689atanq4np19jc116pt0jrjde4pr8.apps.googleusercontent.com',
      scopes: ['openid', 'email', 'profile'],
      redirectUri: redirectUri,
      responseType: 'code',
    },
    discovery
  );

  // Обработчик изменения состояния приложения
  const appStateListener = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      WebBrowser.maybeCompleteAuthSession();
    }
  };

  // Обработка ответа от авторизации
  React.useEffect(() => {
    if (response) {
      console.log('Auth response:', response);
      setIsLoading(false);

      if (response.type === 'success') {
        const { code } = response.params;
        console.log('Authorization Code:', code);

        if (!code) {
          console.error('Authorization Code is missing in response');
          return;
        }

        // Обменяем code на id_token
        AuthSession.exchangeCodeAsync(
          {
            clientId: '434162670967-n192o94efeqvk1u9ao5tmmqsavuo8stk.apps.googleusercontent.com',
            clientSecret: 'YOUR_CLIENT_SECRET_HERE', // Добавьте ваш clientSecret
            code: code,
            redirectUri: redirectUri,
            extraParams: {
              code_verifier: request?.codeVerifier, // Для PKCE
            },
          },
          discovery
        )
          .then((tokenResponse) => {
            console.log('Token Response:', tokenResponse);
            const { id_token } = tokenResponse;

            if (!id_token) {
              console.error('ID Token is missing in token response');
              return;
            }

            console.log('ID Token:', id_token);

            try {
              const credential = GoogleAuthProvider.credential(id_token);
              console.log('Credential created:', credential);

              signInWithCredential(auth, credential)
                .then((result) => {
                  console.log('Sign-in successful:', result);
                  setUser(result.user);
                  navigation.navigate('Main');
                })
                .catch((error) => {
                  console.error('Sign-in error:', error);
                  throw error;
                });
            } catch (error) {
              console.error('Error creating credential:', error);
              throw error;
            }
          })
          .catch((error) => {
            console.error('Error exchanging code for token:', error);
          });
      } else if (response.type === 'error') {
        console.error('Auth error:', response.error);
      } else if (response.type === 'dismiss') {
        console.log('User dismissed the auth session');
      }
    }
  }, [response, navigation]);

  // Очистка ресурсов при размонтировании компонента
  React.useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', appStateListener);

    return () => {
      appStateSubscription.remove();
      WebBrowser.dismissBrowser();
    };
  }, []);

  const handleLogin = async () => {
    if (isLoading) {
      console.log('Auth session is already in progress');
      return;
    }

    if (!request) {
      console.log('Auth request is not ready yet');
      return;
    }

    try {
      setIsLoading(true);
      await promptAsync({ useProxy: true });
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <ErrorBoundary>
      <LinearGradient
        colors={['#A1C4FD', '#C2E0FA', '#F5E3F7']}
        style={styles.container}
      >
        {user ? (
          <View style={styles.loggedInContainer}>
            <Text style={styles.welcomeText}>Привет, {user.displayName}!</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Выйти</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loggedOutContainer}>
            <Text style={styles.joinText}>Join us to store your progress.</Text>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleLogin}
              disabled={isLoading || !request}
            >
              <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>
                {isLoading ? 'Logging in...' : 'Continue with Google'}
              </Text>
            </TouchableOpacity>
            {isLoading && <Text style={styles.loadingText}>Please wait...</Text>}
          </View>
        )}
      </LinearGradient>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedOutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }),
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }),
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
});