import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import {
  ArrowCircleLeft,
  CurrencyCircleDollar,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  IdentificationCard,
  LockKey,
  Star,
  User,
  UserCircle,
} from "phosphor-react-native";
import API_URL from "../config";

const backgroundImage = require("../assets/gta/FondoWelcome.png");

export default function RegisterScreen({ navigation }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Faltan datos", "El usuario y la contrasena son obligatorios.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Faltan datos", "El email es obligatorio.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Contrasenas distintas", "La confirmacion no coincide con la contrasena.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
          email: email.trim(),
          birth_date: day && month && year ? `${year}-${month}-${day}` : null,
          image: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("No se pudo registrar", data.error || "Intentalo nuevamente.");
        return;
      }

      Alert.alert("Registro exitoso", data.message || "Usuario registrado.", [
        {
          text: "Ir a Login",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error de conexion",
        "No se pudo conectar con el backend. Revisa que el servidor este encendido y que el celular este en la misma red Wi-Fi."
      );
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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <UserCircle size={104} color="#ffd02f" weight="regular" />

          <View style={styles.formBox}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Create Player</Text>
              <IdentificationCard size={24} color="#ffd02f" weight="bold" />
            </View>

            <View style={styles.dateRow}>
              <View style={styles.dateInputGroup}>
                <TextInput
                  style={styles.dateInput}
                  value={day}
                  onChangeText={setDay}
                  placeholder="Day"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>

              <View style={styles.dateInputGroup}>
                <TextInput
                  style={styles.dateInput}
                  value={month}
                  onChangeText={setMonth}
                  placeholder="Month"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>

              <View style={styles.dateInputGroup}>
                <TextInput
                  style={styles.dateInput}
                  value={year}
                  onChangeText={setYear}
                  placeholder="Year"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>

            <Text style={styles.label}>Username:</Text>
            <View style={styles.inputGroup}>
              <User size={21} color="#7a7a7a" />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Ingresa tu usuario"
                placeholderTextColor="#777"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Email:</Text>
            <View style={styles.inputGroup}>
              <EnvelopeSimple size={21} color="#7a7a7a" />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Ingresa tu email"
                placeholderTextColor="#777"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>Password:</Text>
            <View style={styles.inputGroup}>
              <LockKey size={21} color="#7a7a7a" />
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
                  <EyeSlash size={21} color="#777" />
                ) : (
                  <Eye size={21} color="#777" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password:</Text>
            <View style={styles.inputGroup}>
              <LockKey size={21} color="#7a7a7a" />
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirma tu contrasena"
                placeholderTextColor="#777"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeSlash size={21} color="#777" />
                ) : (
                  <Eye size={21} color="#777" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.disabledButton]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Star size={25} weight="fill" color="#ffd02f" />
              <Text style={styles.registerButtonText}>
                {isLoading ? "Registrando..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Login")}
        >
          <CurrencyCircleDollar size={26} weight="fill" color="#ffd02f" />
          <Text style={styles.actionText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.activeActionButton]}
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
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },

  backButton: {
    position: "absolute",
    top: 44,
    left: 24,
    zIndex: 3,
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 82,
    paddingBottom: 92,
    paddingHorizontal: 24,
  },

  formBox: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
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

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },

  dateInputGroup: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#66108f",
  },

  dateInput: {
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase",
    paddingVertical: 0,
  },

  label: {
    marginTop: 8,
    marginBottom: 5,
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 15,
    textTransform: "uppercase",
  },

  inputGroup: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#222",
    fontSize: 14,
    paddingVertical: 0,
  },

  registerButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#ff167d",
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },

  disabledButton: {
    opacity: 0.5,
  },

  registerButtonText: {
    color: "#ff167d",
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