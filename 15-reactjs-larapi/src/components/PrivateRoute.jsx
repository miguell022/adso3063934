import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); //Obtiene el token de autenticación
    const navigate = useNavigate(); //Hook para navegar entre rutas

    // useEffect se ejecuta cuando cambia el token o la función navigate
    useEffect(() => {
        // Si no hay token (usuario no autenticado)
        if (!token) { 
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unauthenticated.",
                confirmButtonColor: "#6c63ff"
            }).then(() => {
                navigate("/login", { replace: true }); // Cuando el usuario cierra la alerta, redirige al login
            });
        }
    }, [token, navigate]);

    // Si no hay token, no renderiza nada (espera la alerta y redirección)
    if (!token) return null;

    // Si hay token, muestra el contenido protegido
    return children;
};

export default PrivateRoute;