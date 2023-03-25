import React from 'react';
import clsx from 'clsx';

const IconEyeClose = ({ className = '', onClick = () => {} }) => {
    const classIconEyeClose = clsx('fa-regular', 'fa-eye-slash', className);
    return (
        <div onClick={onClick}>
            <i className={classIconEyeClose}></i>
        </div>
    );
};

export default IconEyeClose;
