// Configura las rutas principales usando react-router-dom.
// Cada ruta carga un componente de página (Login, Dashboard, etc).

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import ShowPet from './components/ShowPet';
import EditPet from './components/EditPet';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    // Define el sistema de rutas de la aplicación
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Protege la ruta dashboard con PrivateRoute */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Protege las rutas de mascotas también si lo deseas */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddPet />
            </PrivateRoute>
          }
        />
        <Route
          path="/show/:id"
          element={
            <PrivateRoute>
              <ShowPet />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPet />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
