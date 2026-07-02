import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import {
  SquaresFour,
  TreeStructure,
  UserCircle,
  GameController,
  Users,
  UserSquare,
  EnvelopeSimple,
  LockKey,
  SignOut,
  CaretRight,
} from "phosphor-react-native";
import { useAuth } from "../../context/AuthContext";

const backgroundImage = require("../../assets/gta/FondoGeneral.png");

export default function ProfileScreen({ navigation }) {
  const { user, email, logout } = useAuth(); // ✅ email del contexto
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [fontsLoaded] = useFonts({
    Pricedown: require("../../assets/fonts/Pricedown Bl.otf"),
    PostNoBills: require("../../assets/fonts/postnobillscolombo-extrabold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            await logout(navigation);
            setIsLoggingOut(false);
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ opacity: 0.55 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <View style={styles.hero}>
        <UserCircle size={90} color="#ffd02f" weight="regular" />
        <Text style={styles.heroName}>{user || "Usuario"}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Información de la cuenta</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <UserSquare size={22} color="#ffd02f" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Usuario</Text>
            <Text style={styles.infoValue}>{user || "—"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <EnvelopeSimple size={22} color="#ffd02f" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{email || "—"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.linkRowText}>Editar perfil</Text>
          <CaretRight size={18} color="#ffd02f" />
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Acciones</Text>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <View style={styles.infoIcon}>
            <LockKey size={22} color="#ffd02f" />
          </View>
          <Text style={styles.actionRowText}>Cambiar contraseña</Text>
          <CaretRight size={18} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionRow, styles.logoutRow]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <View style={styles.infoIcon}>
            <SignOut size={22} color="#ff4444" />
          </View>
          <Text style={styles.logoutText}>
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
          </Text>
        </TouchableOpacity>
      </View>

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

        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <UserCircle size={26} color="#ffd02f" weight="fill" />
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

  hero: {
    alignItems: "center",
    paddingVertical: 20,
  },

  heroName: {
    marginTop: 8,
    fontFamily: "PostNoBills",
    fontSize: 22,
    color: "#fff",
  },

  panel: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.62)",
    borderWidth: 1,
    borderColor: "rgba(255,208,47,0.25)",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  panelTitle: {
    fontFamily: "Pricedown",
    fontSize: 18,
    color: "#ffd02f",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,208,47,0.2)",
    paddingBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,208,47,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  infoLabel: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: "PostNoBills",
  },

  infoValue: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "PostNoBills",
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  linkRowText: {
    color: "#ffd02f",
    fontFamily: "Pricedown",
    fontSize: 18,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },

  actionRowText: {
    flex: 1,
    color: "#fff",
    fontFamily: "PostNoBills",
    fontSize: 15,
  },

  logoutRow: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  logoutText: {
    color: "#ff4444",
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