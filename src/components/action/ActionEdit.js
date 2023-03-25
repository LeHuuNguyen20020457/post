import React from 'react';
import Action from './Action';

const ActionEdit = ({ onClick = () => {} }) => {
    return <Action className="fa-regular fa-pen-to-square" onClick={onClick}></Action>;
};

export default ActionEdit;
