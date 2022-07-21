import { useEffect, useState } from 'react';
import './App.scss';
import GaugeOne from './components/GaugeOne';
import GaugeTwo from './components/GaugeTwo';

function getPointerDeg(min, max, val) {
    const maxMin = max - min;
    const value = val - min;
    const deg = (180 * value) / maxMin - 90;

    return deg;
}

function App() {
    const URL = 'https://widgister.herokuapp.com/challenge/frontend';

    const [value, setValue] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(URL)
            .then((res) => {
                if (res.ok) return res.json();

                throw new Error('Something went wrong!');
            })
            .then((data) => {
                const newValue = {
                    format: data.format,
                    max: data.max,
                    min: data.min,
                    unit: data.unit,
                    symbol: undefined,
                    value: data.value,
                };

                if (data.unit === 'USD') {
                    newValue.symbol = '$';
                } else if (data.unit === 'GBP') {
                    newValue.symbol = '£';
                } else if (data.unit === 'EUR') {
                    newValue.symbol = '€';
                } else if (!data.unit) {
                    newValue.symbol = '£';
                } else {
                    newValue.symbol = data.unit;
                }

                setValue(newValue);
            })
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return (
            <div className='error-message'>
                <p style={{ color: '#ec373c' }}>Something went wrong!</p>
                <button onClick={() => window.location.reload()}>
                    Try again
                </button>
            </div>
        );
    }

    if (value?.value < value?.min || value?.value > value?.max)
        return (
            <div className='error-message'>
                <p>Ups! Value is not between min & max!</p>
                <button onClick={() => window.location.reload()}>
                    Try again
                </button>
            </div>
        );

    if (!value && !error)
        return (
            <div className='error-message'>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontWeight: 'semibold',
                        lineHeight: '80vh',
                    }}
                >
                    Loading...
                </p>
            </div>
        );

    return (
        <div className='App'>
            <GaugeOne
                min={value.min}
                max={value.max}
                value={value.value}
                symbol={value.symbol}
                getPointerDeg={getPointerDeg}
            />
            <GaugeTwo
                min={value.min}
                max={value.max}
                value={value.value}
                symbol={value.symbol}
                getPointerDeg={getPointerDeg}
            />
        </div>
    );
}

export default App;
