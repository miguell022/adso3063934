import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider } from "./context/AuthContext";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import ChangePasswordScreen from "./screens/Profile/ChangePasswordScreen";
import GenerationsScreen from "./screens/generations/GenerationsScreen";
import GenerationGamesScreen from "./screens/generations/GenerationGamesScreen";
import NewGenerationScreen from "./screens/generations/NewGenerationScreen";
import EditGenerationScreen from "./screens/generations/EditGenerationScreen";
import GamesScreen from "./screens/games/GamesScreen";
import GameDetailScreen from "./screens/games/GameDetailScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // AuthProvider envuelve TODO para que cualquier pantalla pueda acceder al token y al usuario
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        >
          <Tab.Screen name="Welcome" component={WelcomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Register" component={RegisterScreen} />
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Generations" component={GenerationsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="EditProfile" component={EditProfileScreen} />
          <Tab.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Tab.Screen name="GenerationGames" component={GenerationGamesScreen} />
          <Tab.Screen name="NewGeneration" component={NewGenerationScreen} />
          <Tab.Screen name="EditGeneration" component={EditGenerationScreen} />
          <Tab.Screen name="Games" component={GamesScreen} />
          <Tab.Screen name="GameDetail" component={GameDetailScreen} />
          
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}