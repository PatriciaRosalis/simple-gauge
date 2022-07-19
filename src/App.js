import { useEffect, useRef, useState } from 'react';
import './App.scss';

function App() {
    const URL = 'https://widgister.herokuapp.com/challenge/frontend';
    const pointerRef = useRef(null);
    const pathRef = useRef(null);

    const [value, setValue] = useState({});
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
                } else {
                    newValue.symbol = data.unit;
                }
                setValue(newValue);

                const pointer = pointerRef.current;
                pointer.className = 'pointer move';

                const path = pathRef.current;
                path.setAttribute('class', 'svg-round animate-svg');
            })
            .catch((err) => setError(err));
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>Something went wrong! Try again.</p>;
    }

    return (
        <div className='App'>
            <div className='gauge'>
                <div className='ticks'>
                    <span>
                        {value.symbol}
                        {value.min}
                    </span>
                    <span>
                        {value.symbol}
                        {value.value}
                    </span>
                    <span>
                        {value.symbol}
                        {value.max}
                    </span>
                </div>

                <div className='pointer' ref={pointerRef}></div>

                <svg
                    width='450'
                    height='350'
                    viewBox='0 0 450 390'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <defs>
                        <linearGradient id='gradient'>
                            <stop offset='5%' stopColor='#0FD354' />
                            <stop offset='98%' stopColor='#16113A' />
                        </linearGradient>
                    </defs>
                    <path
                        d='M 40,350 C 45,10 450,10 450,350'
                        stroke='black'
                        strokeWidth='15'
                        className='svg-round'
                        ref={pathRef}
                    />
                </svg>
            </div>
        </div>
    );
}

export default App;
