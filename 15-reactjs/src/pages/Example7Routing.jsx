import { Routes, Route, Link, useLocation } from 'react-router-dom';
import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";


const pokemons = [
    { id: 1, name: 'Lugia', type: 'psychic/flying', power: 'Hidrobomb', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png" },
    { id: 2, name: 'Garchomp', type: 'dragon/ground', power: 'Earthquake', legendary: false, pseudoLegendario: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png" },
    { id: 4, name: 'Gyarados', type: 'water/flying', power: 'Hyper Beam', legendary: false, shiny: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/130.png" },
    { id: 3, name: 'Lucario', type: 'fighting/steel', power: 'Aura Sphere', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png" },
    { id: 5, name: "Pikachu", type: "electric", power: "Impactrueno", descripcion: "Almacena electricidad en sus mejillas.", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },

]

const styles = {
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

}

function GeneralInfo() {
    return (
        <div style={{ padding: "1rem", background: "radial-gradient(circle, rgb(54, 54, 54) 0%, rgb(0, 0, 0) 100%)", borderRadius: "10px" }}>
            <h2>General Info</h2>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>Welcome to the Pokémon world! Here you can explore a variety of Pokémon, each with unique abilities and characteristics. Whether you're a seasoned trainer or just starting your journey, there's always something new to discover. Click on the links above to see the Pokémon list or get details about Pikachu!</p>
        </div>
    )
}

function PokemonList() {
    return (
        <div>
            <h2>Pokemon List</h2>
            <div style={styles.cards}>
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            img={pokemon.img}
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            descripcion={pokemon.descripcion}
                            legendary={pokemon.legendary}
                            pseudoLegendario={pokemon.pseudoLegendario}
                            shiny={pokemon.shiny}
                        />
                    ))
                }
            </div>
        </div>
    )
}

function PokemonDetails() {
    return (
        <div>
            <h2>Pokemon Details</h2>
            <div>
                <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>{pokemons[4].name}</h3>
                <p style={{ textAlign: "center", marginBottom: "1rem" }}>{pokemons[4].descripcion}</p>
            </div>
            <div style={styles.cards}>
                <CardPokemon
                    img={pokemons[4].img}
                    name={pokemons[4].name}
                    type={pokemons[4].type}
                    power={pokemons[4].power}
                />
            </div>
        </div>
    )
}

function InternalNavigation() {
    return (
        <nav style={{ justifyContent: "center", display: "flex", margin: "1rem 0" }}>
            <Link to="/example7" style={{ marginRight: "15px", textDecoration: "none", color: "white", border: "1px solid white", padding: "0.5rem 1rem", borderRadius: "5px", background: "radial-gradient(circle, rgb(54, 54, 54) 0%, rgb(0, 0, 0) 100%)" }}>Home</Link>
            <Link to="/example7/list" style={{ marginRight: "15px", textDecoration: "none", color: "white", border: "1px solid white", padding: "0.5rem 1rem", borderRadius: "5px", background: "radial-gradient(circle, rgb(54, 54, 54) 0%, rgb(0, 0, 0) 100%)", }}>Pokemon List</Link>
            <Link to="/example7/details" style={{ marginRight: "15px", textDecoration: "none", color: "white", border: "1px solid white", padding: "0.5rem 1rem", borderRadius: "5px", background: "radial-gradient(circle, rgb(54, 54, 54) 0%, rgb(0, 0, 0) 100%)", }}>⚡ Pikachu</Link>

        </nav>
    )
}

function Example7Routing() {
    const location = useLocation();
    return (
        <div className="container">
            <BtnBack />

            <h2>Example 7: Routing</h2>
            <p>Navigation between diferent 'pages' without reloading the browser</p>
            <InternalNavigation />

                {/* Absolute Paths */}
                <Routes>
                    <Route path='/' element={<GeneralInfo />} />
                    <Route path='/list' element={<PokemonList />} />
                    <Route path='/details' element={<PokemonDetails />} />
                </Routes>
        </div>
    )
}

export default Example7Routing;