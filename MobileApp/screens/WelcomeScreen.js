import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { CurrencyCircleDollar, Star } from "phosphor-react-native";

// Imagen de fondo de la pantalla Welcome.
const backgroundImage = require("../assets/gta/FondoWelcome.png");

// Juegos que se muestran en el carrusel.
const games = [
  {
    title: "GTA San Andreas",
    image: require("../assets/gta/gtaSanAndreas.jpg"),
  },
  {
    title: "GTA Vice City",
    image: require("../assets/gta/GTAViceCity.webp"),
  },
  {
    title: "GTA IV",
    image: require("../assets/gta/GTA_IV_portada.webp"),
  },
  {
    title: "GTA V",
    image: require("../assets/gta/GTA_V.webp"),
  },
  {
    title: "GTA VI",
    image: require("../assets/gta/GTA_VI_portada.webp"),
  },
];

export default function WelcomeScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const currentGame = games[currentIndex];

  const nextGame = () => {
    setCurrentIndex((currentIndex + 1) % games.length);
  };

  const prevGame = () => {
    setCurrentIndex((currentIndex - 1 + games.length) % games.length);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.carousel}>
          <TouchableOpacity style={styles.arrowButton} onPress={prevGame}>
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>

          <Image
            source={currentGame.image}
            style={styles.gameImage}
            resizeMode="cover"
          />

          <TouchableOpacity style={styles.arrowButton} onPress={nextGame}>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.gameTitle}>{currentGame.title}</Text>

        <View style={styles.dots}>
          {games.map((game, index) => (
            <View
              key={game.title}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            Bienvenido a GTA Generations, una aplicacion disenada para explorar
            la evolucion de la saga Grand Theft Auto a traves de las distintas
            generaciones de consolas. Descubre como cada era transformo el mundo
            abierto, los personajes y la experiencia de juego que marco a
            millones de jugadores.
          </Text>
        </View>
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

  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 82,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  carousel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 50,
  },

  gameImage: {
    width: 220,
    height: 260,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#111",
  },

  gameTitle: {
    marginTop: 10,
    color: "#fff",
    fontSize: 30,
    fontFamily: "Pricedown",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },

  dots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    marginBottom: 14,
  },

  dot: {
    width: 13,
    height: 13,
    borderRadius: 999,
    backgroundColor: "#ddd",
  },

  activeDot: {
    backgroundColor: "#ffd02f",
  },

  descriptionBox: {
    width: "82%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(70, 70, 70, 0.78)",
  },

  description: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "PostNoBills",
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

  actionText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "PostNoBills",
  },
});





