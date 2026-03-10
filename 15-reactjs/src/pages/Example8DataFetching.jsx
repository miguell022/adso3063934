
import { useState, useEffect } from 'react';
import BtnBack from '../components/BtnBack';

const styles = {
    overlay: {
        background: 'rgba(0, 0, 28, 0.5)',
        borderRadius: '1.2rem',
        boxShadow: '0 8px 24px rgba(34, 100, 34, 0.15)',
        padding: '2.5rem 1.5rem',
        marginTop: '2rem',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        background: '#e8f5e8',
        color: 'rgba(0,0,50,0.4)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(34, 100, 34, 0.15)',
        border: '4px solid #4caf50',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    list: {
        flex: '2',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        minWidth: '320px',
    },
    card: {
        background: '#fff',
        borderRadius: '0.7rem',
        boxShadow: '0 2px 8px rgba(34, 100, 34, 0.10)',
        padding: '1rem',
        cursor: 'pointer',
        textAlign: 'center',
        border: '2px solid #4caf50',
        transition: 'transform 0.2s',
        minWidth: '150px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        wordBreak: 'break-word',
    },
    selected: {
        border: '2px solid #143656',
        boxShadow: '0 0 12px #4caf50',
        transform: 'scale(1.05)',
    },
    details: {
        flex: '1',
        background: '#f0f8ff',
        borderRadius: '0.7rem',
        boxShadow: '0 2px 8px rgba(34, 100, 34, 0.10)',
        padding: '1.5rem',
        minWidth: '260px',
        maxWidth: '320px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
    },
    img: {
        width: '120px',
        marginBottom: '1rem',
    },
    paginator: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        margin: '1.5rem 0',
    },
    pageBtn: {
        background: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background 0.2s',
    },
    pageBtnActive: {
        background: 'rgba(0,0,50,0.4)',
    },
};

function Example8DataFetching() {
    const [pokemons, setPokemons] = useState([]);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const limit = 20;

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page-1)*limit}`)
            .then(res => res.json())
            .then(data => {
                setPokemons(data.results);
                setCount(data.count);
                setLoading(false);
            });
    }, [page]);

    function handleSelect(pokemon) {
        setSelected(pokemon.name);
        setDetails(null);
        fetch(pokemon.url)
            .then(res => res.json())
            .then(data => {
                setDetails({
                    name: data.name,
                    id: data.id,
                    img: data.sprites.other["official-artwork"].front_default,
                    types: data.types.map(t => t.type.name).join(', '),
                    weight: data.weight,
                    height: data.height,
                    abilities: data.abilities.map(a => a.ability.name).join(', '),
                });
            });
    }

    const totalPages = Math.ceil(count / limit);

    return (
        <div>
            <div style={styles.overlay}>
                <BtnBack />
                <h2 style={{textAlign:'center', color:'#fff'}}>Example 8: Data Fetching</h2>
                <p style={{textAlign:'center', color:'#fff'}}>Connect with external APIs to get real data. Pokédex paginada.</p>
                <div style={styles.container}>
                    <div style={styles.list}>
                        {loading ? <div>Cargando...</div> : pokemons.map((pokemon, idx) => {
                            // Extraer el número/id del Pokémon desde la URL
                            const match = pokemon.url.match(/\/pokemon\/(\d+)/);
                            const pokeId = match ? match[1] : (idx + 1 + (page-1)*limit);
                            return (
                                <div
                                    key={pokemon.name}
                                    style={selected === pokemon.name ? {...styles.card, ...styles.selected} : styles.card}
                                    onClick={() => handleSelect(pokemon)}
                                >
                                    <div style={{fontWeight:'bold'}}>#{pokeId} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={styles.details}>
                        {details ? (
                            <>
                                <img src={details.img} alt={details.name} style={styles.img} />
                                <h3>{details.name.charAt(0).toUpperCase() + details.name.slice(1)} (#{details.id})</h3>
                                <div><b>Type:</b> {details.types}</div>
                                <div><b>Weight:</b> {details.weight} kg</div>
                                <div><b>Height:</b> {details.height} cm</div>
                                <div><b>Abilities:</b> {details.abilities}</div>
                            </>
                        ) : (
                            <div>Selecciona un Pokémon para ver detalles.</div>
                        )}
                    </div>
                </div>
                <div style={styles.paginator}>
                    <button
                        style={styles.pageBtn}
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        disabled={page === 1}
                    >Anterior</button>
                    {(() => {
                        const btns = [];
                        // Mostrar siempre la primera página
                        if (page > 3) {
                            btns.push(
                                <button key={1} style={page === 1 ? {...styles.pageBtn, ...styles.pageBtnActive} : styles.pageBtn} onClick={() => setPage(1)}>1</button>
                            );
                            btns.push(<span key="start-ellipsis">...</span>);
                        }
                        // Páginas cercanas a la actual
                        for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
                            if (i === 1 || i === totalPages) continue; // Ya se muestran aparte
                            btns.push(
                                <button key={i} style={page === i ? {...styles.pageBtn, ...styles.pageBtnActive} : styles.pageBtn} onClick={() => setPage(i)}>{i}</button>
                            );
                        }
                        // Mostrar siempre la última página
                        if (page < totalPages - 2) {
                            btns.push(<span key="end-ellipsis">...</span>);
                            btns.push(
                                <button key={totalPages} style={page === totalPages ? {...styles.pageBtn, ...styles.pageBtnActive} : styles.pageBtn} onClick={() => setPage(totalPages)}>{totalPages}</button>
                            );
                        }
                        return btns;
                    })()}
                    <button
                        style={styles.pageBtn}
                        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                        disabled={page === totalPages}
                    >Siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default Example8DataFetching;