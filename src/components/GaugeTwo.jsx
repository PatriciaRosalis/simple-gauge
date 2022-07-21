import React, { useEffect, useRef } from 'react';

export default function GaugeTwo({ min, max, value, symbol, getPointerDeg }) {
    const niddleRef = useRef(null);

    useEffect(() => {
        const pointer = niddleRef.current;
        pointer.style.transform = `rotate(${getPointerDeg(
            min,
            max,
            value
        )}deg)`;
    });

    return (
        <div className='gauge-two'>
            <div className='box'>
                <div>
                    <span className='points' id='min'>
                        {symbol}
                        {min}
                    </span>

                    <span className='points' id='middle'>
                        {symbol}
                        {/*
							min value because we don't start at 0.
						 */}
                        {min + (max - min) * 0.5}
                    </span>
                    <span className='points' id='max'>
                        {symbol}
                        {max}
                    </span>
                </div>
                <div className='needle' ref={niddleRef}>
                    <span className='points' id='value'>
                        {symbol}
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}
