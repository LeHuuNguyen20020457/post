import React from 'react';
import Action from './Action';

const ActionView = ({ onClick = () => {} }) => {
    return <Action className="fa-regular fa-eye" onClick={onClick}></Action>;
};

export default ActionView;
