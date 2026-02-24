import BtnBack from "../components/BtnBack";
// Import CardPokemon "../components/CardPokemon";

function Example3Props() {

    //Data
    const pokemons = [
        {id: 1, name: 'Lugia', type: 'Psychic/Flying', power:'Hidrobomb', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png"},
        {id: 2, name: 'Garchomp', type: 'Dragon/Ground', power:'Earthquake', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png"},
        {id: 3, name: 'Gyarados', type: 'Water/Flying', power:'Hyper Beam', legendary: false, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png"},
        {id: 4, name: 'Mewtwo', type: 'Psychic', power:'Psystrike', legendary: true, img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"},
    ]
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>
        </div>
    )
}

export default Example3Props;