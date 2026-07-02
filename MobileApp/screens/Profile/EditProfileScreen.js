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
  UserCircle,
  User,
  EnvelopeSimple,
} from "phosphor-react-native";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../config";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

export default function EditProfileScreen({ navigation }) {
  const { user, email, token, setUser, setEmail } = useAuth();
  const [username, setUsername] = useState(user || "");
  const [emailInput, setEmailInput] = useState(email || "");
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert("Faltan datos", "El nombre de usuario es obligatorio.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username.trim(),
          email: emailInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "No se pudo actualizar el perfil.");
        return;
      }

      // ✅ Actualizamos el contexto y AsyncStorage
      setUser(username.trim());
      setEmail(emailInput.trim());
      await AsyncStorage.setItem("user", username.trim());
      await AsyncStorage.setItem("email", emailInput.trim());

      Alert.alert("Perfil actualizado", "Tus datos fueron guardados.", [
        { text: "OK", onPress: () => navigation.navigate("Profile") },
      ]);
    } catch (error) {
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <ArrowCircleLeft size={38} color="#ffd02f" weight="bold" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Editar perfil</Text>

        <View style={styles.avatarContainer}>
          <UserCircle size={100} color="#ffd02f" weight="regular" />
        </View>

        <View style={styles.formBox}>
          <Text style={styles.label}>Nombre de usuario:</Text>
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
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder="Ingresa tu email"
              placeholderTextColor="#777"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },

  backButton: {
    position: "absolute",
    top: 44,
    left: 24,
    zIndex: 3,
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 30,
    color: "#ffd02f",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 20,
  },

  avatarContainer: {
    marginBottom: 24,
  },

  formBox: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255,208,47,0.55)",
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.62)",
  },

  label: {
    marginTop: 8,
    marginBottom: 6,
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 15,
    textTransform: "uppercase",
  },

  inputGroup: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#222",
    fontSize: 15,
  },

  saveButton: {
    alignSelf: "center",
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "#ffd02f",
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.72)",
  },

  disabledButton: {
    opacity: 0.5,
  },

  saveButtonText: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 22,
  },
});