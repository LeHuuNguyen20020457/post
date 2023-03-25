import React from 'react';
import clsx from 'clsx';

const Action = ({ className = '', onClick = () => {} }) => {
    const spanClsx = clsx('flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer');
    const iClsx = clsx(`${className} w-5 h-5`);
    return (
        <span className={spanClsx} onClick={onClick}>
            <i className={iClsx}></i>
        </span>
    );
};
export default Action;
