import splash from '../splash.jpg'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();
    const handleClick = () => navigate('/get-started');

    return (
        <div
            className='d-flex flex-column flex-fill px-5 text-center'
            style={{
                background: `url(${splash}) no-repeat center`,
                backgroundSize: `cover`,
            }}
        >
            <div className="d-flex flex-column justify-content-center h-100">
                <div className="d-flex flex-row justify-content-center">
                    <h1
                        className="display-6 fw-light text-white p-3 mb-4"
                        style={{
                            backgroundColor: `rgba(0,0,0,0.10)`,
                            borderRadius: `12px`
                        }}
                    >Access new therapies, elevate medicine for all</h1>
                    
                </div>
                <button
                    className="shadow-lg fw-normal btn mx-auto mt-4 py-3 px-5"
                    style={{
                        fontSize: 'larger',
                        backgroundColor: '#99d3ff'
                    }}
                    onClick={handleClick}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}