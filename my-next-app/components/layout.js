import React from 'react';
import { Container } from 'react-bootstrap';
import Provider from './provider';
//import styles from '@/styles/Home.module.css';
//import SideBar from './sideBar';

const Layout = (props) => {

    return (
        <div>
            <Container>
                <Provider>
                    {props.children}
                </Provider>
            </Container>
        </div>
    );
};

export default Layout;