import React from 'react';
import { Container } from 'react-bootstrap';
import Provider from './provider';

const Layout = (props) => {
    return (
        <Container>
                {props.children}
        </Container>
    );
};

export default Layout;
