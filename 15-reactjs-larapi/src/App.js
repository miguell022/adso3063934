// Configura las rutas principales usando react-router-dom.
// Cada ruta carga un componente de página (Login, Dashboard, etc).

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import ShowPet from './components/ShowPet';
import EditPet from './components/EditPet';

function App() {
  return (
    // Define el sistema de rutas de la aplicación
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddPet />} />
        <Route path="/show/:id" element={<ShowPet />} />
        <Route path="/edit/:id" element={<EditPet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
