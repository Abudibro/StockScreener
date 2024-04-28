import React from 'react';
import { Navbar, Container, FormControl, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    return (
        <Navbar className='mt-1 mb-1' >
            <Container>
                <Navbar.Brand className='heading-8-weight-4 text-white' onClick={() => navigate('/')}>Wheel Strategy Stock Finder</Navbar.Brand>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        style={{
                            marginRight: '7px',
                            background: 'transparent',
                            color: 'white'
                        }}
                        aria-label="Search"
                    />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Container>
        </Navbar>
    );
}

export default Nav;