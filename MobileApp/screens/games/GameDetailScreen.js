import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import {
  ArrowCircleLeft,
  DotsThreeVertical,
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
  PencilSimple,
  Trash,
  Calendar,
  MapPin,
  Person,
  MonitorPlay,
  Buildings,
  Tag,
} from "phosphor-react-native";
import { gameImages } from "../../assets/gta/gameImages";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

const GENERATION_COLORS = {
  "Era 2D":      "#9b59b6",
  "Era 3D":      "#f39c12",
  "Era HD":      "#008cff",
  "Era Moderna": "#ff167d",
};

const DEFAULT_COLOR = "#ffd02f";

export default function GameDetailScreen({ navigation, route }) {
  const { token } = useAuth();
  const { game } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const color = GENERATION_COLORS[game.console_generation] || DEFAULT_COLOR;

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleDelete = () => {
    setMenuVisible(false);
    Alert.alert(
      "Eliminar juego",
      `¿Estás seguro que quieres eliminar "${game.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/gta-games/${game.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await response.json();
              if (!response.ok) throw new Error(data.error);
              Alert.alert("Eliminado", `"${game.title}" fue eliminado.`, [
                { text: "OK", onPress: () => navigation.navigate("Games") },
              ]);
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el juego.");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setMenuVisible(false);
    navigation.navigate("EditGame", { game });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Games")}>
          <ArrowCircleLeft size={38} color={color} weight="bold" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <DotsThreeVertical size={30} color={color} weight="bold" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen */}
        {game.image && gameImages[game.image] ? (
          <Image
            source={gameImages[game.image]}
            style={styles.cover}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.coverPlaceholder, { backgroundColor: color + "22", borderColor: color }]}>
            <GameController size={64} color={color} />
          </View>
        )}

        {/* Título y badge */}
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color }]}>{game.title}</Text>
          <View style={[styles.badge, { backgroundColor: color + "33", borderColor: color }]}>
            <Text style={[styles.badgeText, { color }]}>{game.console_generation}</Text>
          </View>
        </View>

        {/* Descripción */}
        {game.description ? (
          <View style={[styles.descriptionBox, { borderColor: color + "55" }]}>
            <Text style={[styles.descriptionTitle, { color }]}>Descripción</Text>
            <Text style={styles.descriptionText}>{game.description}</Text>
          </View>
        ) : null}

        {/* Datos del juego */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Calendar size={18} color={color} />
            <Text style={styles.infoLabel}>Año de lanzamiento</Text>
            <Text style={styles.infoValue}>{game.release_year}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={18} color={color} />
            <Text style={styles.infoLabel}>Ciudad principal</Text>
            <Text style={styles.infoValue}>{game.main_city}</Text>
          </View>

          <View style={styles.infoRow}>
            <Person size={18} color={color} />
            <Text style={styles.infoLabel}>Protagonista</Text>
            <Text style={styles.infoValue}>{game.protagonist}</Text>
          </View>

          {game.genre ? (
            <View style={styles.infoRow}>
              <Tag size={18} color={color} />
              <Text style={styles.infoLabel}>Género</Text>
              <Text style={styles.infoValue}>{game.genre}</Text>
            </View>
          ) : null}

          {game.developer ? (
            <View style={styles.infoRow}>
              <Buildings size={18} color={color} />
              <Text style={styles.infoLabel}>Desarrollador</Text>
              <Text style={styles.infoValue}>{game.developer}</Text>
            </View>
          ) : null}

          {game.platforms ? (
            <View style={[styles.infoRow, styles.lastInfoRow]}>
              <MonitorPlay size={18} color={color} />
              <Text style={styles.infoLabel}>Plataformas</Text>
              <Text style={[styles.infoValue, styles.infoValueWrap]}>{game.platforms}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Modal menú */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuCard}>
            <Text style={[styles.menuTitle, { color }]}>{game.title}</Text>

            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <PencilSimple size={20} color="#fff" />
              <Text style={styles.menuItemText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, styles.menuItemDanger]} onPress={handleDelete}>
              <Trash size={20} color="#ff4444" />
              <Text style={styles.menuItemDangerText}>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuCancel} onPress={() => setMenuVisible(false)}>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Generations")}
        >
          <TreeStructure size={26} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <UserCircle size={26} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <GameController size={26} color="#ffd02f" weight="fill" />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
  },

  cover: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },

  coverPlaceholder: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 10,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 28,
    flex: 1,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },

  badgeText: {
    fontFamily: "PostNoBills",
    fontSize: 12,
  },

  descriptionBox: {
    backgroundColor: "rgba(0,0,0,0.62)",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
  },

  descriptionTitle: {
    fontFamily: "Pricedown",
    fontSize: 18,
    marginBottom: 8,
  },

  descriptionText: {
    color: "#ccc",
    fontFamily: "PostNoBills",
    fontSize: 14,
    lineHeight: 22,
  },

  infoBox: {
    backgroundColor: "rgba(0,0,0,0.62)",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  lastInfoRow: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    flex: 1,
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 14,
  },

  infoValue: {
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 14,
  },

  infoValueWrap: {
    flex: 1,
    textAlign: "right",
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