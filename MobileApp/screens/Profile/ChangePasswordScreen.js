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
  LockKey,
  Eye,
  EyeSlash,
  Fingerprint,
} from "phosphor-react-native";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

export default function ChangePasswordScreen({ navigation }) {
  const { token } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleChangePassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Faltan datos", "Debes completar ambos campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Contraseñas distintas", "Las contraseñas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Contraseña muy corta", "Debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "No se pudo actualizar la contraseña.");
        return;
      }

      Alert.alert("Contraseña actualizada", "Tu contraseña fue cambiada exitosamente.", [
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
        <Text style={styles.title}>Cambiar contraseña</Text>

        {/* Ícono */}
        <View style={styles.iconContainer}>
          <Fingerprint size={90} color="#ffd02f" weight="regular" />
        </View>

        {/* Formulario */}
        <View style={styles.formBox}>
          <Text style={styles.label}>Nueva contraseña:</Text>
          <View style={styles.inputGroup}>
            <LockKey size={21} color="#7a7a7a" />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nueva contraseña"
              placeholderTextColor="#777"
              secureTextEntry={!showNew}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              {showNew ? (
                <EyeSlash size={21} color="#777" />
              ) : (
                <Eye size={21} color="#777" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar contraseña:</Text>
          <View style={styles.inputGroup}>
            <LockKey size={21} color="#7a7a7a" />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#777"
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeSlash size={21} color="#777" />
              ) : (
                <Eye size={21} color="#777" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? "Actualizando..." : "Actualizar contraseña"}
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
    fontSize: 28,
    color: "#ffd02f",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginBottom: 20,
    textAlign: "center",
  },

  iconContainer: {
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