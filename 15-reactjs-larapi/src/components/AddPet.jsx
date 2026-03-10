// Componente para agregar una nueva mascota.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddPet() {
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
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/pets/store', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'Mascota agregada',
        text: 'La mascota fue registrada correctamente'
      });
      navigate('/dashboard');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'No se pudo agregar la mascota'
      });
    }
  };

  return (
    <main id="add">
      <header>
        <a href="javascript:;" class="btnBack">
          <img src="imgs/btn-back.png" alt="back" />
        </a>
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
          <a href="#" className="btnCancel">Cancel</a>
        </div>
      </form>
    </main>
  );
}

export default AddPet;
