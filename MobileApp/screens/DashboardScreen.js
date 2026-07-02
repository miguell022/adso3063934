import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import {
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
} from "phosphor-react-native";
import API_URL from "../config";
import { useAuth } from "../context/AuthContext";
import { gameImages, characterImages } from "../assets/gta/gameImages";

const backgroundImage = require("../assets/gta/FondoGeneral.png");

export default function DashboardScreen({ navigation }) {
  const { token } = useAuth();

  const [games, setGames] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  useEffect(() => {
    fetchGames();
    fetchCharacters();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URL}/gta-games`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setGames(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los juegos.");
    } finally {
      setLoadingGames(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}/characters`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCharacters(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los personajes.");
    } finally {
      setLoadingCharacters(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── JUEGOS DESTACADOS ── */}
        <Text style={styles.sectionTitle}>Juegos destacados</Text>

        {loadingGames ? (
          <ActivityIndicator color="#ffd02f" style={styles.loader} />
        ) : (
          <FlatList
            data={games.slice(0, 5)}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gamesStrip}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.gameCard}>
                {item.image && gameImages[item.image] ? (
                  <Image
                    source={gameImages[item.image]}
                    style={styles.gameCardImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.gameCardPlaceholder}>
                    <Text style={styles.gameCardPlaceholderText}>{item.title}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>Ver todo</Text>
              </TouchableOpacity>
            }
          />
        )}

        {/* ── PROTAGONISTAS ICÓNICOS ── */}
        <Text style={[styles.sectionTitle, styles.sectionTitleCharacters]}>
          Protagonistas icónicos
        </Text>

        {loadingCharacters ? (
          <ActivityIndicator color="#ff167d" style={styles.loader} />
        ) : (
          <View style={styles.characterList}>
            {characters.slice(0, 4).map((character) => (
              <TouchableOpacity key={String(character.id)} style={styles.characterItem}>
                {character.image && characterImages[character.image] ? (
                  <Image
                    source={characterImages[character.image]}
                    style={styles.characterImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.characterImagePlaceholder}>
                    <Users size={32} color="#aaa" />
                  </View>
                )}
                <View style={styles.characterInfo}>
                  <Text style={styles.characterName}>{character.name}</Text>
                  <Text style={styles.characterDescription} numberOfLines={2}>
                    {character.description}
                  </Text>
                  <Text style={styles.characterMeta}>{character.gta_game}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* ── NAVEGACIÓN INFERIOR ── */}
      <View style={styles.nav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <SquaresFour size={26} color="#ffd02f" weight="fill" />
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

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 56,
    paddingBottom: 90,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontFamily: "Pricedown",
    fontSize: 28,
    color: "#ffd02f",
    marginBottom: 14,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  sectionTitleCharacters: {
    color: "#ff167d",
    marginTop: 24,
  },

  loader: {
    marginVertical: 24,
  },

  gamesStrip: {
    gap: 12,
    paddingBottom: 4,
  },

  gameCard: {
    width: 140,
    height: 180,
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffffff",
  },

  gameCardImage: {
    width: "100%",
    height: "100%",
  },

  gameCardPlaceholder: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },

  gameCardPlaceholderText: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 16,
    textAlign: "center",
  },

  viewAllButton: {
    width: 100,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,208,47,0.1)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffd02f",
  },

  viewAllText: {
    color: "#ffd02f",
    fontFamily: "PostNoBills",
    fontSize: 16,
  },

  characterList: {
    gap: 12,
  },

  characterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#ff167d",
  },

  characterImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#222",
  },

  characterImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },

  characterInfo: {
    flex: 1,
  },

  characterName: {
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 16,
    marginBottom: 2,
  },

  characterDescription: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
  },

  characterMeta: {
    color: "#ff167d",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "PostNoBills",
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