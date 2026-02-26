import './LoadingDots.css';

function LoadingDots() {
    const dotStyle = {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        margin: '0 3px',
        background: 'white',
        borderRadius: '50%',
        animation: 'bounce 1.4s infinite ease-in-out both',
    };

    return (
        <>
            <span style={dotStyle} className="dot1"></span>
            <span style={dotStyle} className="dot2"></span>
            <span style={dotStyle}></span>
        </>
    );
}

export default LoadingDots;
