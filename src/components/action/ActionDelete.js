import React from 'react';
import Action from './Action';

const ActionDelete = ({ onClick = () => {} }) => {
    return <Action className="fa-regular fa-trash-can" onClick={onClick}></Action>;
};

export default ActionDelete;
