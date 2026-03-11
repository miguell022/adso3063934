// Permite al usuario autenticarse y guarda el token en localStorage.
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    //Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //maneja el envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('token', res.data.token);
            Swal.fire({
                icon: 'success',
                title: 'Login exitoso',
                text: res.data.message || '¡Bienvenido!'
            });
            navigate('/dashboard');
        } catch (err) {
            // Si la API responde con un mensaje, úsalo
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message
                });
            } else {
                setError('Error de conexión');
            }
        }
    };

    return (
        // Estructura del formulario de login
        <main id="login">
            <header>
                <img src="/imgs/title-login.png" alt="Login" />
            </header>
            <form id="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">
                    @Email
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button className="btnLogin" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                        <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
                    </svg>
                    Login
                </button>

            </form>
        </main>
    );

}

export default Login;
