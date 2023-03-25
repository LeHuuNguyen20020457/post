import React from 'react';
import { useDropdown } from './dropdown-context';
import clsx from 'clsx';
const List = ({ children }) => {
    const styleShowDropdown = clsx('absolute top-full left-0 w-full bg-white shadow-sm');
    const { show } = useDropdown();
    return <>{show && <div className={styleShowDropdown}>{children}</div>}</>;
};

export default List;
