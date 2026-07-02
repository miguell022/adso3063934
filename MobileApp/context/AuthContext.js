import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null); // ✅ nuevo
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");
        const savedEmail = await AsyncStorage.getItem("email"); // ✅ nuevo
        if (savedToken) {
          setToken(savedToken);
          setUser(savedUser);
          setEmail(savedEmail); // ✅ nuevo
        }
      } catch (error) {
        console.log("Error cargando sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Usuario o contraseña incorrectos.");

    // ✅ Guardamos el token primero
    await AsyncStorage.setItem("token", data.token);
    setToken(data.token);

    // ✅ Luego traemos el perfil completo
    const profileRes = await fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    const profile = await profileRes.json();

    await AsyncStorage.setItem("user", profile.username);
    await AsyncStorage.setItem("email", profile.email || "");
    setUser(profile.username);
    setEmail(profile.email || "");
};

  const logout = async (navigation) => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Error en logout:", error);
    } finally {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("email"); // ✅ nuevo
      setToken(null);
      setUser(null);
      setEmail(null); // ✅ nuevo
      navigation.navigate("Welcome");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, email, setUser, setEmail, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}