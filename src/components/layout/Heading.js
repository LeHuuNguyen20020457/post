import React from 'react';
import styled from 'styled-components';
const HeadingStyles = styled.h2`
    font-size: 28px;
    position: relative;
    margin-bottom: 30px;
    font-weight: 600;
`;
const Heading = ({ className = '', children }) => {
    return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
