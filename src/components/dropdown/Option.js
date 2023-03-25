import React from 'react';
import { useDropdown } from './dropdown-context';
import clsx from 'clsx';

const Option = (props) => {
    const styeDivOptions = clsx(
        'py-4 px-5 cursor-pointer flex items-center justify-between hover:text-primary transition-all text-sm',
    );
    const { onClick } = props;
    const { setShow } = useDropdown();
    const handleClick = () => {
        onClick && onClick();
        setShow(false);
    };
    return (
        <div className={styeDivOptions} onClick={handleClick}>
            {props.children}
        </div>
    );
};

export default Option;
