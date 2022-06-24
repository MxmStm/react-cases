import React from 'react';
import {useState} from "react";

export const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>INC</button>
            <button onClick={decrement}>DEC</button>
        </div>
    );
};
