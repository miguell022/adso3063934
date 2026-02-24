import BtnBack from "../components/BtnBack";

function Example2JSX() {

    //JS Variables
    const pkName = 'Bulbasaur';
    const pkType = 'Grass/Poison';
    const pkLevel = 5;
    const pkAbility = ['Overgrow', 'Chlorophyll'];
    const pkImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

    //Style object
    const styles = {
            container: {
                background: '#e8f5e8',
                color: '#143656',
                padding: '2rem',
                marginTop: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 8px 24px rgba(34, 100, 34, 0.15)',
                border: '4px solid #4caf50', // Verde para tipo Grass
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
                transition: 'box-shadow 0.3s',
            },
        tittle: {
              color: '#143656',
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '0.5rem',
              wordBreak: 'break-word',
        },
        img: {
              display: 'flex',
              margin: '1rem auto',
              width: '180px',
              marginBottom: '1.5rem',
              maxWidth: '90vw',
        },
        ul: {
              paddingLeft: '1.5rem',
              fontSize: '1rem',
           },
           abilities: {
              color: '#234',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
        }
    }

    return(
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writing HTML-like code whitin JavaScript using curly braces {} for JS expresions</p>
            <div style={styles.container}>
                    <h3 style={styles.tittle}>{pkName} (Lv{pkLevel})</h3>
                    <img 
                        src={pkImg} 
                        alt={pkName} 
                        style={styles.img} />
                    <p>Type: <span style={{color: '#388e3c', fontWeight: 'bold'}}>Grass</span>/<span style={{color: '#8e388e', fontWeight: 'bold'}}>Poison</span></p>
                    <p>Uppercase: <span style={{fontWeight: 'bold'}}>{pkName.toUpperCase()}</span></p>
                    <p>Abilities:</p>
                    <ul style={styles.ul}>
                        <li style={{color: '#388e3c'}}>Overgrow</li>
                        <li style={{color: '#8e388e'}}>Chlorophyll</li>
                    </ul>
                    <p>Is it a starter? <span role="img" aria-label="check">✅</span> Yes</p>
            </div>
        </div>
    )
}

export default Example2JSX;