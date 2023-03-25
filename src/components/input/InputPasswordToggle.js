import React, { Fragment, useRef } from 'react';
import { IconEyeClose, IconEyeOpen } from '../icon';
import Input from './Input';

const InputPasswordToggle = ({ control }) => {
    const [togglePassword, setTogglePassword] = React.useState(false);
    const EyetogglePassword = useRef('');
    togglePassword ? (EyetogglePassword.current = IconEyeOpen) : (EyetogglePassword.current = IconEyeClose);
    if (!control) return null;
    return (
        <Fragment>
            <Input
                type={togglePassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                control={control}
                autoComplete="off"
            >
                <EyetogglePassword.current
                    className="input-icon"
                    onClick={() => {
                        setTogglePassword(!togglePassword);
                    }}
                ></EyetogglePassword.current>
            </Input>
        </Fragment>
    );
};

export default InputPasswordToggle;
