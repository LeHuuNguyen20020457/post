import React from 'react';
import { useController } from 'react-hook-form';

const Checkbox = ({ checked, children, control, name, ...rest }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });
    return (
        <label>
            <input checked={checked} type="checkbox" className="hidden-input" {...field} {...rest} />
            <div className="flex items-center gap-x-3 font-medium cursor-pointer">
                <div
                    className={`w-7 h-7 rounded flex items-center justify-center ${
                        checked ? 'bg-green-400 text-white' : 'bg-gray-200 text-transparent'
                    }`}
                >
                    <i class="fa-regular fa-square-check h-6 w-6"></i>
                </div>
                <span>{children}</span>
            </div>
        </label>
    );
};

export default Checkbox;
