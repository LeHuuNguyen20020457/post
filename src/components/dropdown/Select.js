import React from 'react';
import clsx from 'clsx';
import { useDropdown } from './dropdown-context';

const Select = ({ placeholder = '', className = '' }) => {
    const styleDiv = clsx(
        `flex items-center justify-between py-4 px-5 bg-white border border-grayf1 rounded-lg cursor-pointer text-sm text-[#B2B3BD] ${className}`,
    );
    const { toggle, show } = useDropdown();
    return (
        <div className={styleDiv} onClick={toggle}>
            <span>{placeholder}</span>
            <span>
                {show ? <i class="fa-solid fa-angle-down h-6 w-6"></i> : <i class="fa-solid fa-chevron-up h-6 w-6"></i>}
            </span>
        </div>
    );
};

export default Select;
