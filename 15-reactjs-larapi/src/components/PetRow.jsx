// PetRow.jsx
// Componente reutilizable para mostrar una mascota en la lista.
import React from 'react';

function PetRow({ pet }) {
  return (
    <div>
      {/* Aquí muestra los datos de la mascota */}
      <span>{pet.name}</span>
    </div>
  );
}

export default PetRow;
