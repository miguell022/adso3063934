import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import {
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
  CaretCircleRight,
  DotsThreeVertical,
  PlusCircle,
  PencilSimple,
  Trash,
} from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

const GENERATION_COLORS = {
  "Era 2D":      { border: "#9b59b6" },
  "Era 3D":      { border: "#f39c12" },
  "Era HD":      { border: "#008cff" },
  "Era Moderna": { border: "#ff167d" },
};

const DEFAULT_COLOR = { border: "#ffd02f" };

export default function GenerationsScreen({ navigation }) {
  const { token } = useAuth();
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  useFocusEffect(
  useCallback(() => {
    fetchGenerations();
  }, [])
);

  const fetchGenerations = async () => {
    try {
      const response = await fetch(`${API_URL}/console-generations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setGenerations(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las generaciones.");
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (generation) => {
    setSelectedGeneration(generation);
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
    setSelectedGeneration(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    Alert.alert(
      "Eliminar generación",
      `¿Estás seguro que quieres eliminar "${selectedGeneration.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/console-generations/${selectedGeneration.id}`,
                {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const data = await response.json();
              if (!response.ok) throw new Error(data.error);
              setGenerations(generations.filter((g) => g.id !== selectedGeneration.id));
              Alert.alert("Eliminado", `"${selectedGeneration.name}" fue eliminada.`);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la generación.");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    handleMenuClose();
    navigation.navigate("EditGeneration", { generation: selectedGeneration });
  };

  if (!fontsLoaded) return null;

  const getColors = (name) => GENERATION_COLORS[name] || DEFAULT_COLOR;

  const renderGeneration = ({ item }) => {
    const colors = getColors(item.name);

    return (
      <View style={[styles.card, { borderColor: colors.border }]}>
        <View style={[styles.cardImagePlaceholder, { backgroundColor: colors.border + "22" }]}>
          <Text style={[styles.cardImagePlaceholderText, { color: colors.border }]}>
            {item.name}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={[styles.cardName, { color: colors.border }]}>{item.name}</Text>
          <Text style={styles.cardYears}>{item.years}</Text>
          <Text style={styles.cardConsoles} numberOfLines={1}>{item.main_consoles}</Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleMenuOpen(item)}
          >
            <DotsThreeVertical size={24} color={colors.border} weight="bold" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardAction}
            onPress={() => navigation.navigate("GenerationGames", {
              generationId: item.id,
              generationName: item.name,
            })}
          >
            <CaretCircleRight size={34} color={colors.border} weight="fill" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Generaciones</Text>
        <Text style={styles.subtitle}>Explora las eras de Grand Theft Auto</Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#ffd02f" size="large" style={styles.loader} />
      ) : generations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay generaciones cargadas aún.</Text>
        </View>
      ) : (
        <FlatList
          data={generations}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderGeneration}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botón agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NewGeneration")}
      >
        <PlusCircle size={52} color="#ffd02f" weight="fill" />
      </TouchableOpacity>

      {/* Modal menú opciones */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={handleMenuClose}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleMenuClose}
        >
          <View style={styles.menuCard}>
            <Text style={styles.menuTitle}>
              {selectedGeneration?.name}
            </Text>

            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <PencilSimple size={20} color="#fff" />
              <Text style={styles.menuItemText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, styles.menuItemDanger]} onPress={handleDelete}>
              <Trash size={20} color="#ff4444" />
              <Text style={styles.menuItemDangerText}>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuCancel} onPress={handleMenuClose}>
              <Text style={styles.menuCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Navegación inferior */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <SquaresFour size={26} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <TreeStructure size={26} color="#ffd02f" weight="fill" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <UserCircle size={26} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Games")}
        >
          <GameController size={26} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Characters")}
        >
          <Users size={26} color="#aaa" />
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

  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 34,
    color: "#ffd02f",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  subtitle: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 14,
    marginTop: 2,
  },

  loader: {
    marginTop: 60,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 16,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    overflow: "hidden",
  },

  cardImagePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },

  cardImagePlaceholderText: {
    fontFamily: "Pricedown",
    fontSize: 16,
    textAlign: "center",
  },

  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  cardName: {
    fontFamily: "Pricedown",
    fontSize: 22,
    marginBottom: 4,
  },

  cardYears: {
    color: "#ccc",
    fontFamily: "PostNoBills",
    fontSize: 13,
    marginBottom: 2,
  },

  cardConsoles: {
    color: "#888",
    fontSize: 12,
  },

  cardActions: {
    alignItems: "center",
    paddingRight: 8,
    gap: 8,
  },

  menuButton: {
    padding: 4,
  },

  cardAction: {
    padding: 4,
  },

  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  menuCard: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },

  menuTitle: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },

  menuItemText: {
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 16,
  },

  menuItemDanger: {
    borderBottomWidth: 0,
  },

  menuItemDangerText: {
    color: "#ff4444",
    fontFamily: "PostNoBills",
    fontSize: 16,
  },

  menuCancel: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },

  menuCancelText: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 15,
  },

  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: "row",
    backgroundColor: "rgba(20,20,20,0.97)",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: "#ffd02f",
  },
});