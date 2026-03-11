// Componente para mostrar los detalles de una mascota.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ShowPet() {
  // Obtiene el id de la mascota desde la URL
  const { id } = useParams();

  // Estado para guardar los datos de la mascota
  const [pet, setPet] = useState({});

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // useEffect: carga los datos de la mascota al montar el componente o cuando cambia el id
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/api/pets/show/${id}`, { 
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


  return (
    <main id="showPet">
      <header>
        <Link to="/dashboard" className="btnBack">
          <img src="/imgs/btn-back.png" alt="back" />
        </Link>
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
