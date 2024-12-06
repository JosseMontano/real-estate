import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { AuthPage } from "./modules/features/auth/auth";
import { HomePage } from "./modules/features/home/home";
import { ProfilePage } from "./modules/features/profile/profile";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { primaryColor } from "./modules/core/constants/colors";
import { ModalConfig } from "./modules/shared/components/modalConfig";
import { useState } from "react";
import { Toaster } from "sonner-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <Icon name="plus" size={30} color="#fff" />
  </TouchableOpacity>
);

const TabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: primaryColor,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen
          name="Add"
          component={() => <View />}
          options={{
            tabBarButton: () => (
              <CustomButton
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
      <ModalConfig
        mainModalVisible={modalVisible}
        setMainModalVisible={setModalVisible}
      />
    </>
  );
};
export const queryClient = new QueryClient();
// Stack Navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={AuthPage}
              options={{
                headerTitle: "Auth",
                headerStyle: {
                  backgroundColor: primaryColor,
                },
                headerTintColor: "#fff",
              }}
            />
            {/* Tab Navigator as the main screen */}
            <Stack.Screen
              name="MainTabs"
              component={TabNavigator}
              options={{ headerShown: false }} // Hide header for the tab navigator
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toaster />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    position: "absolute",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#f8f8f8",
    elevation: 10,
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
});
