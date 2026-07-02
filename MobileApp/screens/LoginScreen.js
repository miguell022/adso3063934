import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useFonts } from "expo-font";
import {
  ArrowCircleLeft,
  CurrencyCircleDollar,
  Eye,
  EyeSlash,
  GameController,
  LockKey,
  Star,
  User,
} from "phosphor-react-native";
import API_URL from "../config";
import { useAuth } from "../context/AuthContext";

const backgroundImage = require("../assets/gta/FondoWelcome.png");
const rockstarLogo = require("../assets/gta/RockstarLogo.png");


export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Pricedown: require("../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
  if (!user.trim() || !password.trim()) {
    Alert.alert("Faltan datos", "Debes ingresar usuario y contraseña.");
    return;
  }
  try {
    setIsLoading(true);
    await login(user.trim(), password);
    navigation.navigate("Dashboard");
  } catch (error) {
    Alert.alert("Error al ingresar", error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <ArrowCircleLeft size={38} color="#ffd02f" weight="bold" />
        </TouchableOpacity>

        <View style={styles.logoFrame}>
          <Image source={rockstarLogo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.formBox}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Player Access</Text>
            <GameController size={25} color="#ffd02f" weight="bold" />
          </View>

          <Text style={styles.label}>User:</Text>
          <View style={styles.inputGroup}>
            <User size={23} color="#7a7a7a" />
            <TextInput
              style={styles.input}
              value={user}
              onChangeText={setUser}
              placeholder="Ingresa tu usuario"
              placeholderTextColor="#777"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password:</Text>
          <View style={styles.inputGroup}>
            <LockKey size={22} color="#7a7a7a" />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresa tu contrasena"
              placeholderTextColor="#777"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSlash size={22} color="#777" />
              ) : (
                <Eye size={22} color="#777" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <CurrencyCircleDollar size={25} weight="fill" color="#ffd02f" />
            <Text style={styles.loginButtonText}>
              {isLoading ? "Ingresando..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.activeActionButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <CurrencyCircleDollar size={26} weight="fill" color="#ffd02f" />
          <Text style={styles.actionText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Star size={26} weight="fill" color="#ffd02f" />
          <Text style={styles.actionText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  backgroundImage: {
    opacity: 0.58,
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    paddingTop: 58,
    paddingBottom: 90,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },

  backButton: {
    position: "absolute",
    top: 44,
    left: 24,
    zIndex: 3,
  },

  logoFrame: {
    width: 126,
    height: 126,
    marginTop: 76,
    marginBottom: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    shadowColor: "#ffd02f",
    shadowOpacity: 0.55,
    shadowRadius: 18,
  },

  logo: {
    width: 106,
    height: 106,
  },

  formBox: {
    width: "82%",
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 208, 47, 0.55)",
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.62)",
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ffd02f",
    paddingBottom: 8,
  },

  formTitle: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 22,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  label: {
    marginBottom: 6,
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 16,
    textTransform: "uppercase",
  },

  inputGroup: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#222",
    fontSize: 16,
  },

  loginButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#008cff",
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },

  disabledButton: {
    opacity: 0.5,
  },

  loginButtonText: {
    color: "#008cff",
    fontFamily: "PostNoBills",
    fontSize: 23,
  },

  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    height: 72,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(85, 85, 85, 0.95)",
    borderRightWidth: 1,
    borderRightColor: "#222",
  },

  activeActionButton: {
    backgroundColor: "rgba(28, 28, 28, 0.96)",
  },

  actionText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "PostNoBills",
  },
});