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
  TreeStructure,
} from "phosphor-react-native";

import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

export default function NewGenerationScreen({ navigation }) {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [consoles, setConsoles] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleSave = async () => {
    if (!name.trim() || !years.trim() || !consoles.trim()) {
      Alert.alert("Faltan datos", "Debes completar todos los campos.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/console-generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          years: years.trim(),
          main_consoles: consoles.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "No se pudo crear la generación.");
        return;
      }

      Alert.alert("Generación creada", `"${name}" fue agregada exitosamente.`, [
        { text: "OK", onPress: () => navigation.navigate("Generations") },
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
        onPress={() => navigation.navigate("Generations")}
      >
        <ArrowCircleLeft size={38} color="#ffd02f" weight="bold" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <TreeStructure size={80} color="#ffd02f" weight="regular" />
        </View>

        <Text style={styles.title}>Nueva generación</Text>

        <View style={styles.formBox}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej: Era 2D"
            placeholderTextColor="#555"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Años:</Text>
          <TextInput
            style={styles.input}
            value={years}
            onChangeText={setYears}
            placeholder="Ej: 1997-2001"
            placeholderTextColor="#555"
          />

          <Text style={styles.label}>Consolas principales:</Text>
          <TextInput
            style={styles.input}
            value={consoles}
            onChangeText={setConsoles}
            placeholder="Ej: PlayStation, PC"
            placeholderTextColor="#555"
          />

          <View style={styles.formActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.navigate("Generations")}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, isLoading && styles.disabledButton]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Text>
            </TouchableOpacity>
          </View>
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

  iconContainer: {
    marginBottom: 16,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 30,
    color: "#ffd02f",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
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

  input: {
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#222",
    marginBottom: 8,
  },

  formActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  cancelButtonText: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 16,
  },

  saveButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffd02f",
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