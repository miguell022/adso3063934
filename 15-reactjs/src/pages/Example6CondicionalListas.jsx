import React, { useState } from "react";
import BtnBack from "../components/BtnBack";

// Lista inicial de pokémon que aparecen al cargar la página
const initialPokemons = [
	{ id: 1, name: "Bulbasaur", type: "Grass", level: 5, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
	{ id: 2, name: "Squirtle", type: "Water", level: 3, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
	{ id: 3, name: "Charmander", type: "Fire", level: 2, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
	{ id: 4, name: "Pikachu", type: "Electric", level: 5, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
];

// Tipos disponibles para el filtro del select
const tipos = ["All", "Normal", "Electric", "Flying", "Fire", "Water", "Grass", "Ground", "Poison", "Rock", "Ghost", "Fighting"];

// Pool de pokémon disponibles para agregar aleatoriamente
const pokemonPool = [
	// Normal
	{ name: "Pidgey", type: "Normal/Flying", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png" },
	{ name: "Rattata", type: "Normal", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png" },
	{ name: "Spearow", type: "Normal/Flying", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png" },
	{ name: "Meowth", type: "Normal", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png" },
	{ name: "Jigglypuff", type: "Normal", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png" },
	
	// Electric
	{ name: "Pikachu", type: "Electric", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
	{ name: "Magnemite", type: "Electric", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png" },
	{ name: "Voltorb", type: "Electric", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png" },
	
	// Fire
	{ name: "Vulpix", type: "Fire", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png" },
	{ name: "Growlithe", type: "Fire", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png" },
	{ name: "Charmander", type: "Fire", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
	{ name: "Ponyta", type: "Fire", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png" },
	
	// Water
	{ name: "Psyduck", type: "Water", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png" },
	{ name: "Squirtle", type: "Water", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
	{ name: "Poliwag", type: "Water", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png" },
	{ name: "Shellder", type: "Water", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png" },
	
	// Grass
	{ name: "Oddish", type: "Grass/Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png" },
	{ name: "Bellsprout", type: "Grass/Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png" },
	{ name: "Exeggcute", type: "Grass/Psychic", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png" },
	
	// Ground
	{ name: "Sandshrew", type: "Ground", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png" },
	{ name: "Dugtrio", type: "Ground", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png" },
	{ name: "Cubone", type: "Ground", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png" },
	
	// Rock
	{ name: "Geodude", type: "Rock/Ground", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" },
	{ name: "Onix", type: "Rock/Ground", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png" },
	
	// Flying
	{ name: "Farfetchd", type: "Normal/Flying", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png" },
	
	// Poison
	{ name: "Gastly", type: "Ghost/Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png" },
	{ name: "Grimer", type: "Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png" },
	{ name: "Ekans", type: "Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png" },
	
	// Ghost
	{ name: "Haunter", type: "Ghost/Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png" },
	{ name: "Gengar", type: "Ghost/Poison", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" },
    { name: "Misdreavus", type: "Ghost", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/200.png" },
	
	// Fighting
	{ name: "Machop", type: "Fighting", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png" },
	{ name: "Mankey", type: "Fighting", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png" },
];

 function Example6CondicionalListas() {
	
	// Estado que guarda la lista completa de pokémon
	const [pokemons, setPokemons] = useState(initialPokemons);
	
	// Estado que guarda el tipo seleccionado en el filtro
	const [tipoSeleccionado, setTipoSeleccionado] = useState("All");
	
	// Estado que controla si se muestran solo pokémon de nivel 4+
	const [showOnlyLevel4, setShowOnlyLevel4] = useState(false);

	
	// FUNCIONES MANEJADORAS (EVENT HANDLERS)

	
	// Maneja el cambio de tipo en el select
	const handleTipoChange = (e) => {
		setTipoSeleccionado(e.target.value);
	};

	// Maneja el cambio del checkbox de nivel 4+
	const handleCheckboxChange = (e) => {
		setShowOnlyLevel4(e.target.checked);
	};

	// Agrega un pokémon aleatorio del pool
	const handleAddRandom = () => {
		// Selecciona un pokémon aleatorio del pool
		const randomPokemon = pokemonPool[Math.floor(Math.random() * pokemonPool.length)];
		// Genera un nivel aleatorio entre 1 y 10
		const randomLevel = Math.floor(Math.random() * 10) + 1;
		// Agrega el nuevo pokémon a la lista con un ID único (timestamp)
		setPokemons([
			...pokemons,
			{ ...randomPokemon, id: Date.now(), level: randomLevel },
		]);
	};

	// Elimina un pokémon de la lista por su ID
	const handleRelease = (id) => {
		setPokemons(pokemons.filter(p => p.id !== id));
	};

	
	// Filtra los pokémon según los criterios seleccionados
	const pokemonsFiltrados = pokemons.filter((p) => {
		// Verifica si el pokémon cumple con el filtro de tipo
		const tipoOk = tipoSeleccionado === "All" || p.type.includes(tipoSeleccionado);
		// Verifica si el pokémon cumple con el filtro de nivel
		const nivelOk = !showOnlyLevel4 || p.level >= 4;
		// Solo devuelve el pokémon si cumple ambos criterios
		return tipoOk && nivelOk;
	});


	// Contenedor principal del componente
	const containerStyle = {
		textAlign: "center",
		padding: "2rem",
		background: "#3333338e",
		borderRadius: "10px",
	};

	// Limita el ancho del contenido
	const contentStyle = {
		maxWidth: "700px",
		margin: "auto",
	};

	// Caja de filtros (select y checkbox)
	const filterContainerStyle = {
		marginBottom: "1.5rem",
		padding: "1.5rem",
		background: "rgba(0,0,50,0.4)",
		borderRadius: "8px",
		border: "2px solid rgba(114, 199, 238, 0.3)",
	};

	// Título "Filters:"
	const filterTitleStyle = {
		textAlign: "left",
		marginBottom: "1rem",
		fontSize: "1.2rem",
		fontWeight: "bold",
		color: "#72c7ee",
	};

	// Fila que contiene select y checkbox
	const filterRowStyle = {
		display: "flex",
		gap: "1.5rem",
		flexWrap: "wrap",
		alignItems: "center",
		marginBottom: "1rem",
	};

	// Estilo del select de tipos
	const inputStyle = {
		padding: "0.6rem",
		borderRadius: "5px",
		border: "2px solid #72c7ee",
		background: "#1a1a2e",
		color: "#fff",
		fontSize: "1rem",
		cursor: "pointer",
	};

	// Contenedor del checkbox con su label
	const checkboxContainerStyle = {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		color: "#72c7ee",
	};

	// Botón de "Add random Pokémon"
	const addButtonStyle = {
		padding: "0.7rem 1.5rem",
		border: "none",
		borderRadius: "5px",
		background: "linear-gradient(135deg, #20e3b2, #29ffc6)",
		color: "#0a3d2e",
		fontWeight: "bold",
		cursor: "pointer",
		fontSize: "1rem",
		transition: "all 0.3s ease",
		boxShadow: "0 4px 15px rgba(32, 227, 178, 0.3)",
	};

	// Grid responsivo para las tarjetas de pokémon
	const pokemonGridStyle = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Se ajusta automáticamente
		gap: "1rem",
		margin: "1.5rem 0",
	};

	// Tarjeta individual de cada pokémon
	const pokemonCardStyle = {
		padding: "1.5rem",
		background: "rgba(200, 220, 255, 0.9)",
		borderRadius: "10px",
		textAlign: "center",
		color: "#1a1a2e",
		boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
		transition: "transform 0.3s ease",
	};

	// Estilo del nombre del pokémon
	const pokemonNameStyle = {
		fontSize: "1.3rem",
		fontWeight: "bold",
		marginBottom: "0.5rem",
		color: "#0a3d5e",
	};

	// Estilo de la información (level y type)
	const pokemonInfoStyle = {
		fontSize: "0.95rem",
		marginBottom: "0.3rem",
		color: "#2a4a6e",
	};

	// Botón "Release" para eliminar pokémon
	const releaseButtonStyle = {
		marginTop: "1rem",
		padding: "0.6rem",
		width: "100%",
		border: "none",
		borderRadius: "5px",
		background: "linear-gradient(135deg, #eb3349, #f45c43)",
		color: "#fff",
		fontWeight: "bold",
		cursor: "pointer",
		fontSize: "1rem",
		transition: "all 0.3s ease",
	};

	// Texto contador "Showing X of Y Pokémon"
	const countStyle = {
		fontSize: "1.1rem",
		color: "#72c7ee",
		marginBottom: "1rem",
		textAlign: "left",
	};

	// Mensaje cuando no hay pokémon que mostrar
	const emptyStateStyle = {
		padding: "3rem",
		color: "#888",
		fontStyle: "italic",
		textAlign: "center",
	};


	return (
		<div className="container" style={containerStyle}>
			{/* Botón para regresar */}
			<BtnBack />
			
			{/* Título y descripción del ejemplo */}
			<h2 className="titulo">Example 6: Conditional Rendering & Lists</h2>
			<p>Filter, map, and conditionally render lists of data</p>

			<div style={contentStyle}>
				
				{/* ========== SECCIÓN DE FILTROS ========== */}
				<div style={filterContainerStyle}>
					<div style={filterTitleStyle}>Filters:</div>
					
					<div style={filterRowStyle}>
						{/* Select para filtrar por tipo */}
						<select value={tipoSeleccionado} onChange={handleTipoChange} style={inputStyle}>
							{/* Mapea el array de tipos para crear las opciones */}
							{tipos.map((tipo) => (
								<option key={tipo} value={tipo}>{tipo}</option>
							))}
						</select>
						
						{/* Checkbox para filtrar por nivel 4+ */}
						<label style={checkboxContainerStyle}>
							<input
								type="checkbox"
								checked={showOnlyLevel4}
								onChange={handleCheckboxChange}
								style={{ cursor: "pointer", width: "18px", height: "18px" }}
							/>
							<span>Show only level 4+</span>
						</label>
					</div>

					{/* Botón para agregar pokémon aleatorio */}
					<button 
						onClick={handleAddRandom}
						style={addButtonStyle}
						// Efectos hover para el botón
						onMouseEnter={(e) => {
							e.target.style.transform = "translateY(-2px)";
							e.target.style.boxShadow = "0 6px 20px rgba(32, 227, 178, 0.5)";
						}}
						onMouseLeave={(e) => {
							e.target.style.transform = "translateY(0)";
							e.target.style.boxShadow = "0 4px 15px rgba(32, 227, 178, 0.3)";
						}}
					>
						+ Add random Pokémon
					</button>
				</div>

				{/* ========== CONTADOR ========== */}
				{/* Muestra cuántos pokémon se están mostrando del total */}
				<div style={countStyle}>
					Showing {pokemonsFiltrados.length} of {pokemons.length} Pokémon
				</div>

				{/* ========== GRID DE POKÉMON ========== */}
				{/* Renderizado condicional: si no hay pokémon filtrados, muestra mensaje */}
				{pokemonsFiltrados.length === 0 ? (
					<div style={emptyStateStyle}>No Pokémon match your filters.</div>
				) : (
					// Si hay pokémon, muestra el grid
					<div style={pokemonGridStyle}>
						{/* Mapea cada pokémon filtrado para crear una tarjeta */}
						{pokemonsFiltrados.map((p) => (
							<div key={p.id} style={pokemonCardStyle}>
								
								{/* Imagen del pokémon (si existe) */}
								{p.img && (
									<div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
										<img 
											src={p.img} 
											alt={p.name} 
											style={{ 
												width: '80px', 
												height: '80px', 
												imageRendering: 'pixelated' // Mantiene el estilo pixel art
											}}
										/>
									</div>
								)}
								
								{/* Información del pokémon */}
								<div style={pokemonNameStyle}>{p.name}</div>
								<div style={pokemonInfoStyle}>Level: {p.level}</div>
								<div style={pokemonInfoStyle}>Type: {p.type}</div>
								
								{/* Botón para eliminar/liberar el pokémon */}
								<button 
									onClick={() => handleRelease(p.id)}
									style={releaseButtonStyle}
									// Efectos hover para el botón
									onMouseEnter={(e) => {
										e.target.style.transform = "scale(1.03)";
										e.target.style.boxShadow = "0 4px 15px rgba(235, 51, 73, 0.5)";
									}}
									onMouseLeave={(e) => {
										e.target.style.transform = "scale(1)";
										e.target.style.boxShadow = "none";
									}}
								>
									Release
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

// Exporta el componente para poder usarlo en otros archivos
export default Example6CondicionalListas;