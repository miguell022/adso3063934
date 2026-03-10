// Componente para mostrar los detalles de una mascota.
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ShowPet() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/pets/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
      .then(res => setPet(res.data.pet))
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la mascota', 'error');
        navigate('/dashboard');
      });
  }, [id, navigate]);

  if (!pet) return <div>Cargando...</div>;

  return (
    <main id="showPet">
      <header>
        <button className="btnBack" onClick={() => navigate('/dashboard')}>
          <img src="/imgs/btn-back.png" alt="back" />
        </button>
        <img src="/imgs/title-show.png" alt="show" />
      </header>
      <section id='show'>
        <div className="data" style={{ marginTop: '60px', marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={pet.image === 'no-image.png' ? '/imgs/no-image.png' : `/imgs/${pet.image}`}
            className="pet-img"
            alt={pet.name} />

          <div className="info-row"><span>Name:</span> <span>{pet.name}</span></div>
          <hr />
          <div className="info-row"><span>Kind:</span> <span>{pet.kind}</span></div>
          <hr />
          <div className="info-row"><span>Age:</span> <span>{pet.age}</span></div>
          <hr />
          <div className="info-row"><span>Weight:</span> <span>{pet.weight}</span></div>
          <hr />
          <div className="info-row"><span>Breed:</span> <span>{pet.breed}</span></div>
          <hr />
          <div className="info-row"><span>Location:</span> <span>{pet.location}</span></div>
          <hr />
          <h3 className="desc-title">Description:</h3>
          <p className="description">{pet.description}</p>
        </div>
      </section>
    </main>
  );
}

export default ShowPet;
