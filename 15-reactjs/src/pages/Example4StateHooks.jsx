
import { useState } from "react";
import CardPokemon from "../components/CardPokemon";
import BtnBack from "../components/BtnBack";
import '../components/Example4Animations.css';


const POKEMONS = [
    { id: 1, name: "Bulbasaur", type: "grass/poison", power: "Latigazo", descripcion: "Un Pokémon planta/veneno que tiene una semilla en su espalda desde que nace.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    { id: 2, name: "Ivysaur", type: "grass/poison", power: "Drenadoras", descripcion: "La semilla en su espalda crece y florece a medida que evoluciona.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" },
    { id: 3, name: "Venusaur", type: "grass/poison", power: "Rayo Solar", descripcion: "La flor de su espalda libera un aroma que calma a quienes lo rodean.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" },
    { id: 4, name: "Charmander", type: "fire", power: "Ascuas", descripcion: "Un Pokémon de tipo fuego; la llama de su cola indica su estado de salud.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
    { id: 5, name: "Charmeleon", type: "fire", power: "Garra Dragón", descripcion: "Su temperamento agresivo se refleja en la intensidad de la llama de su cola.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" },
    { id: 6, name: "Charizard", type: "fire/flying", power: "Lanzallamas", descripcion: "Escupe fuego tan caliente que puede derretir cualquier cosa.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
    { id: 7, name: "Squirtle", type: "water", power: "Pistola Agua", descripcion: "Un Pokémon tortuga de tipo agua que dispara agua por la boca.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    { id: 8, name: "Wartortle", type: "water", power: "Hidrochorro", descripcion: "Sus orejas y cola peludas lo ayudan a nadar rápidamente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png" },
    { id: 9, name: "Blastoise", type: "water", power: "Hidrocañón", descripcion: "Tiene cañones de agua en su caparazón que usa para atacar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png" },
    { id: 10, name: "Caterpie", type: "bug", power: "Disparo Demora", descripcion: "Un Pokémon oruga que libera un olor desagradable para defenderse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png" },
    { id: 11, name: "Metapod", type: "bug", power: "Fortaleza", descripcion: "Su cuerpo es duro como una armadura mientras se prepara para evolucionar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png" },
    { id: 12, name: "Butterfree", type: "bug/flying", power: "Danza Aleteo", descripcion: "Sus alas están cubiertas de polvos venenosos que dispersa al volar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png" },
    { id: 13, name: "Weedle", type: "bug/poison", power: "Picotazo Veneno", descripcion: "Un Pokémon gusano con un aguijón venenoso en la cabeza.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png" },
    { id: 14, name: "Kakuna", type: "bug/poison", power: "Endurecer", descripcion: "Permanece inmóvil mientras se endurece antes de evolucionar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png" },
    { id: 15, name: "Beedrill", type: "bug/poison", power: "Ataque Furia", descripcion: "Un Pokémon abeja con tres aguijones venenosos para atacar.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png" },
    { id: 16, name: "Pidgey", type: "normal/flying", power: "Ataque Arena", descripcion: "Un pájaro pequeño que utiliza ráfagas de arena para defenderse.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png" },
    { id: 17, name: "Pidgeotto", type: "normal/flying", power: "Tornado", descripcion: "Vuela a gran velocidad y protege su territorio ferozmente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png" },
    { id: 18, name: "Pidgeot", type: "normal/flying", power: "Vendaval", descripcion: "Puede volar a velocidades de hasta 200 km/h y tiene una vista aguda.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png" },
    { id: 19, name: "Rattata", type: "normal", power: "Ataque Rápido", descripcion: "Un roedor pequeño y veloz con dientes afilados que crecen constantemente.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png" },
    { id: 20, name: "Raticate", type: "normal", power: "Hipercolmillo", descripcion: "Sus grandes dientes pueden roer casi cualquier cosa.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png" },
];

function Example4StateHooks() {
    function getRandomPokemon() {
        const idx = Math.floor(Math.random() * POKEMONS.length);
        return POKEMONS[idx];
    }

    const [capturedList, setCapturedList] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);

    function handleCapture() {
        if (isCapturing) return;
        
        setIsCapturing(true);
        
        // Simular el proceso de captura con un delay de 2 segundos
        setTimeout(() => {
            const poke = getRandomPokemon();
            setCapturedList(prev => [...prev, poke]);
            setIsCapturing(false);
        }, 2000);
    }

    function handleReset() {
        setCapturedList([]);
    }

    const progressPercentage = (capturedList.length / POKEMONS.length) * 100;
    const isVictory = capturedList.length === POKEMONS.length;

    if (isVictory) {
        return (
            <div className="container">
                <BtnBack />
                <h2>🎉 ¡VICTORIA! 🎉</h2>
                <div className="victory-message">
                    ¡Felicitaciones! ¡Has capturado todos los {POKEMONS.length} Pokémon!
                </div>
                <div style={{textAlign: 'center'}}>
                    <button 
                        onClick={handleReset} 
                        className="reset-button"
                        style={{
                            padding: '20px 60px',
                            fontSize: '20px'
                        }}
                    >
                        🔄 Jugar de Nuevo
                    </button>
                </div>
                <h3 style={{marginTop: 24}}>Tu Pokédex Completo:</h3>
                <div className="cards-container">
                    {capturedList.map((poke, idx) => (
                        <CardPokemon
                            key={idx}
                            img={poke.img}
                            name={poke.name}
                            type={poke.type}
                            power={poke.power}
                            descripcion={poke.descripcion}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 4: State & Hooks</h2>
            <h3>(useState, useEffect)</h3>
            <p>Captura Pokémon aleatorios y observa cómo se actualiza el estado.</p>
            
            <div className="counter">
                📊 Pokémon capturados: {capturedList.length} / {POKEMONS.length}
            </div>

            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            
            <button 
                onClick={handleCapture} 
                className="capture-button"
                disabled={isCapturing}
            >
                {isCapturing ? '⏳ Capturando...' : '🎯 ¡Capturar Pokémon!'}
            </button>

            {capturedList.length > 0 && (
                <button 
                    onClick={handleReset} 
                    className="reset-button"
                >
                    🔄 Liberar Todos
                </button>
            )}
            
            {isCapturing && (
                <div className="capturing-message">
                    <div className="pokeball"></div>
                    <div>Capturando...</div>
                </div>
            )}
            
            <h3 style={{marginTop: 24}}>Pokémon capturados:</h3>
            {capturedList.length === 0 && <p>No has capturado ningún Pokémon aún.</p>}
            <div className="cards-container">
                {capturedList.map((poke, idx) => (
                    <div key={idx} className="pokemon-card-enter">
                        <CardPokemon
                            img={poke.img}
                            name={poke.name}
                            type={poke.type}
                            power={poke.power}
                            descripcion={poke.descripcion}
                            isLast={idx === capturedList.length - 1}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Example4StateHooks;