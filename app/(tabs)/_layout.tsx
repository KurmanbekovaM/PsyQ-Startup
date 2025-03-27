import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native"; // Добавляем View и TouchableOpacity

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Скрываем заголовок экранов
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("index")}
            style={styles.tabItem}
          >
            <Ionicons
              name="home-outline"
              size={30}
              color={state.index === 0 ? "#7A5AC9" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("progress")}
            style={styles.tabItem}
          >
            <Ionicons
              name="bar-chart-outline"
              size={30}
              color={state.index === 1 ? "#7A5AC9" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("profile")}
            style={styles.tabItem}
          >
            <Ionicons
              name="person-outline"
              size={30}
              color={state.index === 2 ? "#7A5AC9" : "gray"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("more")}
            style={styles.tabItem}
          >
            <Ionicons
              name="sparkles-outline"
              size={30}
              color={state.index === 3 ? "#7A5AC9" : "gray"}
            />
          </TouchableOpacity>
        </View>
      )}
    >
      <Tabs.Screen name="index" options={{ title: "Главная" }} />
      <Tabs.Screen name="progress" options={{ title: "Прогресс" }} />
      <Tabs.Screen name="profile" options={{ title: "Профиль" }} />
      <Tabs.Screen name="more" options={{ title: "Еще" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

