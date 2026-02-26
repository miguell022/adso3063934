import './CardPokemon.css';

function CardPokemon({ name, type, power, img, legendary = false, shiny = false }) {

    const typeColor = {
        'electric': '#f9ca24',
        'fire': '#eb4d4b',
        'water': '#22a6b3',
        'grass': '#6fda40',
        'dragon': '#fc6900',
        'ground': '#e1b12c',
        'psychic': '#f8a5c2',
        'flying': '#f6e58d',
        'normal': '#dff9fb',
        'ghost': '#7d5fff',
        'poison': '#6ab04c',
    }

    // Dividir el tipo si tiene múltiples tipos
    const types = type.split('/').map(t => t.toLowerCase().trim());
    
    // Crear estilo para el borde
    let cardStyle = {};
    if (types.length > 1) {
        const color1 = typeColor[types[0]] || '#ccc';
        const color2 = typeColor[types[1]] || '#ccc';
        cardStyle = {
            background: `linear-gradient(#1a1a2e, #1a1a2e) padding-box, linear-gradient(135deg, ${color1} 0%, ${color2} 100%) border-box`,
            border: '4px solid transparent'
        };
    } else {
        cardStyle = {
            borderColor: typeColor[types[0]] || '#ccc',
            borderWidth: '4px',
            borderStyle: 'solid'
        };
    }

    return (
        <div className='pokemon-card' style={cardStyle}>
            {img && <img src={img} alt={name} className='pokemon-image' />}
            <h3>{name}</h3>
            <p className='pokemon-type'>Type: {type}</p>
            <p className='pokemon-power'>Power: {power}</p>
            {legendary && <span className='legendary-badge'>⭐ Legendary ⭐</span>}
            {shiny && <span className='shiny-badge'>✨ Shiny ✨</span>}
        </div>
    )
}

export default CardPokemon;