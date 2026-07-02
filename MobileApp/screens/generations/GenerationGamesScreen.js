import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import {
  ArrowCircleLeft,
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
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

export default function GenerationGamesScreen({ navigation, route }) {
  const { token } = useAuth();

  // Recibimos el id y nombre de la generación desde GenerationsScreen
  const { generationId, generationName } = route.params;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const color = GENERATION_COLORS[generationName] || DEFAULT_COLOR;

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  useEffect(() => {
  fetchGames();
}, [generationId]);

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `${API_URL}/console-generations/${generationId}/gta-games`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setGames(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los juegos.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  const renderGame = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { borderColor: color }]}
      activeOpacity={0.85}
    >
      {item.image && gameImages[item.image] ? (
  <Image source={gameImages[item.image]} style={styles.cardImage} resizeMode="cover" />
) : (
  <View style={[styles.cardImagePlaceholder, { backgroundColor: color + "22" }]}>
    <GameController size={36} color={color} />
  </View>
)}

      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color }]}>{item.title}</Text>
        <Text style={styles.cardYear}>{item.release_year}</Text>
        <Text style={styles.cardCity} numberOfLines={1}>
          {item.main_city}
        </Text>
        <Text style={styles.cardProtagonist} numberOfLines={1}>
          {item.protagonist}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      {/* Botón volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Generations")}
      >
        <ArrowCircleLeft size={38} color={color} weight="bold" />
      </TouchableOpacity>

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={[styles.title, { color }]}>{generationName}</Text>
        <Text style={styles.subtitle}>Juegos de esta generación</Text>
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator color={color} size="large" style={styles.loader} />
      ) : games.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay juegos en esta generación aún.</Text>
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderGame}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

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

  backButton: {
    position: "absolute",
    top: 44,
    left: 24,
    zIndex: 3,
  },

  header: {
    paddingTop: 96,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 34,
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
    textAlign: "center",
    paddingHorizontal: 32,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 90,
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

  cardImage: {
    width: 100,
    height: 110,
  },

  cardImagePlaceholder: {
    width: 100,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },

  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  cardTitle: {
    fontFamily: "Pricedown",
    fontSize: 20,
    marginBottom: 4,
  },

  cardYear: {
    color: "#ccc",
    fontFamily: "PostNoBills",
    fontSize: 13,
    marginBottom: 2,
  },

  cardCity: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 2,
  },

  cardProtagonist: {
    color: "#888",
    fontSize: 12,
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