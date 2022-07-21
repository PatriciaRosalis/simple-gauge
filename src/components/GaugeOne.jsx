import React, { useEffect, useRef } from 'react';

export default function GaugeOne({ min, max, value, symbol, getPointerDeg }) {
    const pointerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const pointer = pointerRef.current;
        const path = pathRef.current;
        path.setAttribute('class', 'svg-round animate-svg');

        pointer.style.transform = `rotate(${getPointerDeg(
            min,
            max,
            value
        )}deg)`;
    }, [getPointerDeg, max, min, value]);

    return (
        <div className='gauge-one'>
            <div className='ticks'>
                <span id='min'>
                    {symbol}
                    {min}
                </span>

                <span id='middle'>
                    {symbol}
                    {/*
							min value because we don't start at 0.
						 */}
                    {min + (max - min) * 0.5}
                </span>
                <span id='max'>
                    {symbol}
                    {max}
                </span>
            </div>

            <div className='pointer' ref={pointerRef}>
                <span id='value'>
                    {symbol}
                    {value}
                </span>
            </div>

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
                    strokeWidth='40'
                    className='svg-round'
                    ref={pathRef}
                />
            </svg>
        </div>
    );
}
