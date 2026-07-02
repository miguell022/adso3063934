import { useEffect, useState, useCallback } from "react";
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
  TextInput,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import {
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
  MagnifyingGlass,
  FunnelSimple,
  X,
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

const CHIPS = [
  { label: "Todos",    value: "all" },
  { label: "Era 2D",   value: "Era 2D" },
  { label: "Era 3D",   value: "Era 3D" },
  { label: "Era HD",   value: "Era HD" },
  { label: "Moderna",  value: "Era Moderna" },
];

export default function GamesScreen({ navigation }) {
  const { token } = useAuth();
  const [games, setGames] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  useFocusEffect(
    useCallback(() => {
      fetchGames();
    }, [])
  );

  const fetchGames = async () => {
    try {
      const response = await fetch(`${API_URL}/gta-games`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setGames(data);
      setFiltered(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los juegos.");
    } finally {
      setLoading(false);
    }
  };

  // Filtra por búsqueda y chip activo
  const applyFilters = (text, chip) => {
    let result = games;

    if (chip !== "all") {
      result = result.filter((g) => g.console_generation === chip);
    }

    result = result.filter((g) => {
  const title = g.title.toLowerCase();
  const search = text.toLowerCase().trim();
  
  // Busca coincidencia exacta de palabra o inicio del título
  return title === search || 
         title.startsWith(search + " ") ||
         title.includes(" " + search);
    });

    setFiltered(result);
  };

  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, activeChip);
  };

  const handleChip = (chip) => {
    setActiveChip(chip);
    applyFilters(search, chip);
  };

  const handleClearFilters = () => {
    setSearch("");
    setActiveChip("all");
    setFiltered(games);
    setFiltersVisible(false);
  };

  if (!fontsLoaded) return null;

  const getColor = (generationName) =>
    GENERATION_COLORS[generationName] || DEFAULT_COLOR;

  const renderGame = ({ item }) => {
    const color = getColor(item.console_generation);

    return (
      <TouchableOpacity
        style={[styles.card, { borderColor: color }]}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("GameDetail", { game: item })}
        >
        {item.image && gameImages[item.image] ? (
          <Image
            source={gameImages[item.image]}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cardImagePlaceholder, { backgroundColor: color + "22" }]}>
            <GameController size={36} color={color} />
          </View>
        )}

        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, { color }]}>{item.title}</Text>
          <Text style={styles.cardYear}>{item.release_year}</Text>
          <Text style={styles.cardCity} numberOfLines={1}>{item.main_city}</Text>
          <Text style={styles.cardProtagonist} numberOfLines={1}>{item.protagonist}</Text>
          <View style={[styles.cardBadge, { backgroundColor: color + "33", borderColor: color }]}>
            <Text style={[styles.cardBadgeText, { color }]}>{item.console_generation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Juegos</Text>
      </View>

      {/* Buscador */}
      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <MagnifyingGlass size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
            placeholder="Busca un juego..."
            placeholderTextColor="#777"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <X size={18} color="#777" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFiltersVisible(true)}
        >
          <FunnelSimple size={22} color="#ffd02f" />
        </TouchableOpacity>
      </View>

      {/* Chips */}
      <View style={styles.chipsRow}>
        {CHIPS.map((chip) => (
          <TouchableOpacity
            key={chip.value}
            style={[
              styles.chip,
              activeChip === chip.value && styles.chipActive,
              activeChip === chip.value && {
                borderColor: GENERATION_COLORS[chip.value] || "#ffd02f",
                backgroundColor: (GENERATION_COLORS[chip.value] || "#ffd02f") + "22",
              },
            ]}
            onPress={() => handleChip(chip.value)}
          >
            <Text
              style={[
                styles.chipText,
                activeChip === chip.value && {
                  color: GENERATION_COLORS[chip.value] || "#ffd02f",
                },
              ]}
            >
              {chip.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator color="#ffd02f" size="large" style={styles.loader} />
      ) : filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron juegos.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderGame}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal filtros */}
      <Modal
        visible={filtersVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFiltersVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFiltersVisible(false)}
        >
          <View style={styles.filterCard}>
            <Text style={styles.filterTitle}>Filtros</Text>

            <Text style={styles.filterLabel}>Por generación:</Text>
            {CHIPS.map((chip) => (
              <TouchableOpacity
                key={chip.value}
                style={[
                  styles.filterOption,
                  activeChip === chip.value && styles.filterOptionActive,
                ]}
                onPress={() => {
                  handleChip(chip.value);
                  setFiltersVisible(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  activeChip === chip.value && {
                    color: GENERATION_COLORS[chip.value] || "#ffd02f",
                  },
                ]}>
                  {chip.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
              <Text style={styles.clearButtonText}>Limpiar filtros</Text>
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
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  title: {
    fontFamily: "Pricedown",
    fontSize: 34,
    color: "#ffd02f",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: "#333",
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontFamily: "PostNoBills",
  },

  filterButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,208,47,0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffd02f",
  },

  chipsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexWrap: "wrap",
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  chipActive: {
    borderWidth: 1,
  },

  chipText: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 13,
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
    marginBottom: 6,
  },

  cardBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },

  cardBadgeText: {
    fontSize: 11,
    fontFamily: "PostNoBills",
  },

  // Modal filtros
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  filterCard: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },

  filterTitle: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 22,
    marginBottom: 16,
    textAlign: "center",
  },

  filterLabel: {
    color: "#aaa",
    fontFamily: "PostNoBills",
    fontSize: 13,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },

  filterOptionActive: {
    borderBottomColor: "#333",
  },

  filterOptionText: {
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 15,
  },

  clearButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },

  clearButtonText: {
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