import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    //Data
    const pokemons = [
        { id: 1, name: 'Arceus', type: 'normal/flying', power: 'Psystrike', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png" },
        { id: 2, name: 'Mewtwo', type: 'psychic', power: 'Psystrike', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
        { id: 3, name: 'Pikachu', type: 'electric', power: 'Thunderbolt', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
        { id: 4, name: 'Vaporeon', type: 'water', power: 'Hyper Beam', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png" },
        { id: 5, name: 'Dragonite', type: 'dragon/flying', power: 'Dragon Claw', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png" },
        { id: 6, name: 'Groudon', type: 'ground', power: 'Earthquake', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png" },
        { id: 7, name: 'Rayquaza', type: 'fire/flying', power: 'Dragon Ascent', legendary: true, shiny: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/384.png" },
        { id: 8, name: 'Gengar', type: 'ghost/poison', power: 'Shadow Ball', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" },
    ]

    // styles
    const styles = {
        cards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>
            <div style={styles.cards}>
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                        img={pokemon.img}
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            legendary={pokemon.legendary}
                            shiny={pokemon.shiny}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Example3Props;