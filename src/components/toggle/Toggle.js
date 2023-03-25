import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Toggle = ({ on, onClick = () => {}, ...rest }) => {
    const styleDiv = clsx(
        `inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
            on ? 'bg-green-500' : 'bg-gray-300'
        }`,
    );
    const styleSpan = clsx(
        `transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ${on ? 'translate-x-[28px]' : ''}`,
    );

    return (
        <label>
            <input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} onClick={onClick} />
            <div className={styleDiv} {...rest}>
                <span className={styleSpan}></span>
            </div>
        </label>
    );
};

Toggle.propTypes = {
    on: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Toggle;
