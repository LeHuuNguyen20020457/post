import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import { IconEyeOpen } from "../icon";


const InputStyles = styled.div`
    position: relative;
    width: 100%;
    input{
        width: 100%;
        padding: ${props => props.hasIcon ? "20px 60px 20px 20px" : "20px"};;
        background-color: ${props => props.theme.grayLight};
        border-radius: 8px;
        font-weight: 500;
        border: 1px solid transparent;
        transition: all 0.2s linear;
    }

    input:focus{
        background-color: white;
        border-color: ${props => props.theme.primary};
    }

    input::-webkit-input-placeholder { /* Edge */
        color: #848788;
    }

    input:-ms-input-placeholder { /* Internet Explorer */
        color: #848788;
    }

    input::placeholder {
        color: #848788;
    }
    .input-icon{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
`


const Input = ({
    name = "",
    children,
    hasIcon = false,
    control,
    ...props
}) => {
    const {field} = useController({name, control, defaultValue:""});
    
    return (
        <InputStyles hasIcon={children ? true : false}>
            <input id={name} {...field} {...props}></input>
            {children}
        </InputStyles>
    )
}

export default Input
