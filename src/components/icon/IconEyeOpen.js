import React from 'react';
import { clsx } from 'clsx';

const IconEyeOpen = ({ className = '', onClick = () => {} }) => {
    const classClsx = clsx('fa-regular', 'fa-eye', className);
    return <i className={classClsx} onClick={onClick}></i>;
};

export default IconEyeOpen;
