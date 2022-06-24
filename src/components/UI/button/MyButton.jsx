import React from 'react';
import s from './MyButton.module.css';

export const MyButton = ({children, ...props}) => {
    return (
        <button className={s.button}{...props}>
            {children}
        </button>
    );
};
