import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Events() {
    const [chosenPokemon, setChosenPokemon] = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange] = useState(0);

    // Event click
    const handleChoise = (name, event) => {
        setChosenPokemon(name);
    };
    // Event Hover
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name);
    };

    // Event MouseLeAVE
    const handleMouseLeave = () => {
        setHoveredPokemon(null);
    };

    // Event Input
    const handleInputChange = (event) => {
        setInputRange(event.target.value);
    };

    const eventContainer = {
        flex: 1,
        marginTop: "1.4rem",
        minWidth: "250px",
    };

    const titleH3 = {
        borderBottom: "2px dotted",
        marginBottom: "1rem",
        paddingBottom: "0.4rem",
    };

    const btnsClick = {
        display: "flex",
        gap: "10px",
        marginTop: "8px",
        justifyContent: "center",
    };

    const hoverStyle = {
        border: 'none',
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1.2rem",
        background: '#72c7ee',
        color: '#14367a',
        padding: '0.6rem',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const titulo = {

    };

    const buttonStyle = {
        color: "#fff",
        backgroundColor: "#007bff",
        padding: "0.75rem 1.5rem",
        fontSize: "1.25rem",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        margin: "0.5rem",
    };

    const rangeStyle = {
        width: "100%",
        maxWidth: "600px",
        margin: "1rem auto",
    }

    const rangeContainerStyle = {
        padding: "2rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "15px",
        marginTop: "1.5rem",
    }

    return (
        <div
            className="container"
            style={{
                textAlign: "center",
                padding: "2rem",
                background: "#3333338e",
                borderRadius: "10px",
            }}
        >
            <style>
                {`
                    .pokeball-range {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 100%;
                        height: 12px;
                        border-radius: 10px;
                        outline: none;
                        border: 2px solid #333;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    }

                    .pokeball-range::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 45px;
                        height: 45px;
                        background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png');
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 50%;
                        cursor: pointer;
                        border: none;
                        filter: drop-shadow(0 4px 15px rgba(0,0,0,0.5));
                        transition: transform 0.2s ease, filter 0.2s ease;
                        image-rendering: pixelated;
                        image-rendering: -moz-crisp-edges;
                        image-rendering: crisp-edges;
                    }

                    .pokeball-range::-webkit-slider-thumb:hover {
                        transform: scale(1.2) rotate(15deg);
                        filter: drop-shadow(0 6px 20px rgba(255,0,0,0.6)) brightness(1.1);
                    }

                    .pokeball-range::-webkit-slider-thumb:active {
                        transform: scale(1.1) rotate(-15deg);
                        filter: drop-shadow(0 2px 10px rgba(255,0,0,0.8)) brightness(1.2);
                    }

                    .pokeball-range::-moz-range-thumb {
                        width: 45px;
                        height: 45px;
                        background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png');
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        border-radius: 50%;
                        cursor: pointer;
                        border: none;
                        filter: drop-shadow(0 4px 15px rgba(0,0,0,0.5));
                        transition: transform 0.2s ease, filter 0.2s ease;
                        image-rendering: pixelated;
                        image-rendering: -moz-crisp-edges;
                        image-rendering: crisp-edges;
                    }

                    .pokeball-range::-moz-range-thumb:hover {
                        transform: scale(1.2) rotate(15deg);
                        filter: drop-shadow(0 6px 20px rgba(255,0,0,0.6)) brightness(1.1);
                    }

                    .pokeball-range::-moz-range-thumb:active {
                        transform: scale(1.1) rotate(-15deg);
                        filter: drop-shadow(0 2px 10px rgba(255,0,0,0.8)) brightness(1.2);
                    }

                    .pokeball-range::-webkit-slider-runnable-track {
                        height: 12px;
                        border-radius: 10px;
                    }

                    .pokeball-range::-moz-range-track {
                        height: 12px;
                        border-radius: 10px;
                    }

                    .input-value-display {
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: #00bfff;
                        margin-top: 1rem;
                        text-shadow: 0 0 10px rgba(0,191,255,0.5);
                    }
                `}
            </style>
            
            <BtnBack />
            <h2 className="titulo">Example 5: event Handling</h2>
            <p style={titulo}>
                Respond to user interactions (click, hover, input, submit)
            </p>

            <div style={eventContainer}>
                <h3>Click Event</h3>
                <button
                    onClick={(e) => handleChoise("Bullbasaur", e)}
                    style={buttonStyle}
                >
                    🌱Bullbasaur
                </button>
                <button
                    onClick={(e) => handleChoise("Charmander", e)}
                    style={buttonStyle}
                >
                    🔥Charmander
                </button>
                <button
                    onClick={(e) => handleChoise("Squirtle", e)}
                    style={buttonStyle}
                >
                    💧Squirtle
                </button>
                {chosenPokemon ? (
                    <div>You chose {chosenPokemon}!</div>
                ) : (
                    <div>Please choose your starter Pokémon.</div>
                )}
                {/* MouseEnter */}
                <div style={eventContainer}>
                    <h3 style={titleH3}>MouseEnter/MouseLeave Event:</h3>
                    <div style={btnsClick}>
                        <button
                            onMouseEnter={(e) => handleMouseEnter("Zapdos")}
                            onMouseLeave={handleMouseLeave}
                            style={hoverStyle}
                        >
                            hover here!
                            <img style={{ zoom: 0.8 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png" alt="" />
                        </button>
                        <button
                            onMouseEnter={(e) => handleMouseEnter("Mew")}
                            onMouseLeave={handleMouseLeave}
                            style={hoverStyle}
                        >
                            hover here too!
                            <img style={{ zoom: 0.8 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png" alt="" />
                        </button>
                    </div>
                    {hoveredPokemon && (
                        <div>You are viewing: {hoveredPokemon}!</div>
                    )}

                    {/* Input Event */}
                    <div style={rangeContainerStyle}>
                        <h3 style={titleH3}>Input Event:</h3>
                        <p style={{color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem'}}>
                            Desliza la Pokébola para ver el valor
                        </p>
                        <input 
                            className="pokeball-range"
                            style={{
                                ...rangeStyle,
                                background: `linear-gradient(90deg, #ff0000 0%, #cc0000 ${inputRange}%, #ffffff ${inputRange}%, #f0f0f0 100%)`
                            }}
                            onInput={handleInputChange}
                            type="range"
                            value={inputRange}
                            min="0"
                            max="100"
                            step="2"
                        />
                        {inputRange > 0 && (
                            <div className="input-value-display">
                                ⚡ Power Level: {inputRange}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Example5Events;