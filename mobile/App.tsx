import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { AuthPage } from "./modules/features/auth/auth";
import { HomePage } from "./modules/features/home/home";
import { ProfilePage } from "./modules/features/profile/profile";
import { TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { primaryColor } from "./modules/core/constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <Icon name="plus" size={30} color="#fff" />
  </TouchableOpacity>
);

const TabNavigator = () => (
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
      component={() => <View />} // Empty component for custom button
      options={{
        tabBarButton: () => (
          <CustomButton
            onPress={() => Alert.alert("Alert", "You clicked the + button!")}
          />
        ),
      }}
    />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

// Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthPage}
          options={{
            headerTitle: "Auth",
            headerStyle: {
              backgroundColor: "purple",
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
