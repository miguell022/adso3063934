// Componente para agregar una nueva mascota.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddPet() {
  // Estado para guardar los datos del formulario de la nueva mascota
  const [form, setForm] = useState({
    name: '',
    image: 'no-image.png',
    kind: '',
    weight: '',
    age: '',
    breed: '',
    location: '',
    description: ''
  });

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // handleChange: actualiza el estado form cuando se modifica un input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleSubmit: envía los datos del formulario a la API para registrar la mascota
  const handleSubmit = async e => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pets/store', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      const successMessage = response.data?.message || 'La mascota fue registrada correctamente';
      Swal.fire({
        icon: 'success',
        title: 'Mascota agregada',
        text: successMessage
      });

      navigate('/dashboard');
    } catch (err) {
      const apiMessage = err.response?.data?.message || 'No se pudo agregar la mascota';
      // Detecta si el error es de autenticación (token inválido o alterado)
      if (apiMessage === "Unauthenticated." || err.response?.status === 401) {
        localStorage.removeItem("token"); // Elimina el token
        Swal.fire({
          icon: "error",
          title: "Error",
          text: apiMessage,
          confirmButtonColor: "#6c63ff"
        }).then(() => {
          window.location.href = "/login"; // Redirige al login
        });
        return;
      }
      // Otros errores
      Swal.fire({
        icon: "error",
        title: "Error",
        text: apiMessage
      });
    }
  };

  return (
    <main id="add">
      <header>
        <Link to="/dashboard" className="btnBack">
          <img src="imgs/btn-back.png" alt="back" />
        </Link>
        <img src="imgs/title-add.png" alt="add" />
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Kind
          <input name="kind" value={form.kind} onChange={handleChange} required />
        </label>
        <label>
          Weight
          <input type="number" name="weight" value={form.weight} onChange={handleChange} required />
        </label>
        <label>
          Age
          <input name="age" value={form.age} onChange={handleChange} required />
        </label>
        <label>
          Breed
          <input name="breed" value={form.breed} onChange={handleChange} required />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <div className="actions">
          <button type="submit">Add</button>
          <Link to="/dashboard" className="btnCancel">Cancel</Link>
        </div>
      </form>
    </main>
  );
}

export default AddPet;
