import BtnBack from "../components/BtnBack";

// Component Charmander
function Charmander() {
    return (
        <div style={{border: '4px solid orange', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>🔥Charmander</h2>
            <p>Type: Fire</p>
            <p>Ability: Blaze</p>
        </div>
    );
}

// Component Bulbasaur
function Bulbasaur() {
    return (
        <div style={{border: '4px solid green', padding: '1.4rem', borderRadius: '0.3rem', background: '#e6ffe6', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>🌱Bulbasaur</h2>
            <p>Type: Grass/Poison</p>
            <p>Ability: Overgrow</p>
        </div>
    );
}

// Component Squirtle
function Squirtle() {
    return (
        <div style={{border: '4px solid blue', padding: '1.4rem', borderRadius: '0.3rem', background: '#e6f0ff', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>💧Squirtle</h2>
            <p>Type: Water</p>
            <p>Ability: Torrent</p>
        </div>
    );
}

// Component Mewtwo
function Mewtwo() {
    return (
        <div style={{border: '4px solid purple', padding: '1.4rem', borderRadius: '0.3rem', background: '#f3e6ff', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" alt="Mewtwo" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>🧬Mewtwo</h2>
            <p>Type: Psychic</p>
            <p>Ability: Pressure</p>
        </div>
    );
}

// Component Articuno
function Articuno() {
    return (
        <div style={{border: '4px solid #00bfff', padding: '1.4rem', borderRadius: '0.3rem', background: '#e6faff', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png" alt="Articuno" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>❄️Articuno</h2>
            <p>Type: Ice/Flying</p>
            <p>Ability: Pressure</p>
        </div>
    );
}

// Component Zapdos
function Zapdos() {
    return (
        <div style={{border: '4px solid gold', padding: '1.4rem', borderRadius: '0.3rem', background: '#fffbe6', width: '360px', textAlign: 'center'}}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png" alt="Zapdos" style={{width: '120px', marginBottom: '1rem'}} />
            <h2>⚡Zapdos</h2>
            <p>Type: Electric/Flying</p>
            <p>Ability: Pressure</p>
        </div>
    );
}



function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create independent, reusable pieces of UI called components.</p>
            <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Charmander />
                <Bulbasaur />
                <Squirtle />
                <Mewtwo />
                <Articuno />
                <Zapdos />
            </div>
        </div>
    );
}

export default Example1Components;