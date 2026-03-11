// Componente para editar una mascota existente.
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function EditPet() {
  // Obtiene el id de la mascota desde la URL
  const { id } = useParams();

  // Estado para guardar los datos de la mascota a editar
  const [pet, setPet] = useState({
    name: '',
    kind: '',
    weight: '',
    age: '',
    breed: '',
    location: '',
    description: ''
  });

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // useEffect: carga los datos actuales de la mascota al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación
    axios.get(`http://127.0.0.1:8000/api/pets/show/${id}`, { // Llama a la API para obtener los datos de la mascota
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
      .then(res => setPet(res.data.pet)) // Si la petición es exitosa, guarda los datos en el estado
      .catch((err) => {
        const apiMessage = err.response?.data?.message || 'No se pudo cargar la mascota';
        // Manejo de token inválido o alterado
        if (apiMessage === "Unauthenticated." || err.response?.status === 401) {
          localStorage.removeItem("token");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: apiMessage,
            confirmButtonColor: "#6c63ff"
          }).then(() => {
            window.location.href = "/login";
          });
          return;
        }
        Swal.fire('Error', apiMessage, 'error');
        navigate('/dashboard'); 
      });
  }, [id, navigate]);

  // handleChange: actualiza el estado pet cuando se modifica un input
  const handleChange = e => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  // handleSubmit: envía los datos editados a la API para actualizar la mascota
  const handleSubmit = async e => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación
    try {
      await axios.put(`http://127.0.0.1:8000/api/pets/edit/${id}`, pet, { // Envía los datos editados a la API
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      Swal.fire('Actualizado', 'La mascota fue actualizada', 'success'); 
      navigate('/dashboard');
    } catch (err) {
      const apiMessage = err.response?.data?.message || 'No se pudo actualizar';
      // Manejo de token inválido o alterado
      if (apiMessage === "Unauthenticated." || err.response?.status === 401) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: apiMessage,
          confirmButtonColor: "#6c63ff"
        }).then(() => {
          window.location.href = "/login";
        });
        return;
      }
      Swal.fire('Error', apiMessage, 'error'); 
    }
  };

  return (
    <div>
      <main id="edit">
        <header>
          <Link to="/dashboard" className="btnBack">
            <img src="/imgs/btn-back.png" alt="back" />
          </Link>
          <img src="../imgs/title-edit.png" alt="edit" />
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>
            Name
            <input type="text" name="name" value={pet.name} onChange={handleChange} />
          </label>
          <label htmlFor='kind'>
            Kind
            <input type="text" name="kind" value={pet.kind} onChange={handleChange} />
          </label>
          <label htmlFor='weight'>
            Weight
            <input type="number" name="weight" value={pet.weight} onChange={handleChange} />
          </label>
          <label htmlFor='age'>
            Age
            <input type="number" name="age" value={pet.age} onChange={handleChange} />
          </label>
          <label htmlFor='breed'>
            Breed
            <input type="text" name="breed" value={pet.breed} onChange={handleChange} />
          </label>
          <label htmlFor='location'>
            Location
            <input type="text" name="location" value={pet.location} onChange={handleChange} />
          </label>
          <label htmlFor='description'>
            Description
            <textarea name="description" value={pet.description} onChange={handleChange} placeholder="Nice dog so charming lovely"></textarea>
          </label>

          <div className="actions">
            <button type="submit">Edit</button>
            <Link to="/dashboard" className="btnCancel">Cancel</Link>
          </div>
        </form>

      </main>
    </div>
  );
}

export default EditPet;
