import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getSuggestions } from './api/stockService.js';

import { Navbar, Container, FormControl, Button, Form, Dropdown } from 'react-bootstrap';
import { IoMdSearch } from "react-icons/io";

const Nav = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

    const handleSelect = (symbol) => {
        setSearchValue(symbol);
        setShowSuggestions(false);
        navigate(`/${symbol}`)
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (value !== '') {
            getSuggestions(value).then(resp => {
                if (resp.quotes) setSuggestions(resp.quotes.filter(q => q.isYahooFinance && q.typeDisp === 'Equity'));
            })
        }
        setSearchValue(value);
        setShowSuggestions(value !== '')
    };

    console.log(selectedSuggestion)

    const handleKeyDown = e => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestion((prevIndex) => Math.max(prevIndex - 1, -1));
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestion((prevIndex) => prevIndex + 1 === suggestions.length ? 0 : prevIndex + 1);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestion !== -1) handleSelect(suggestions[selectedSuggestion].symbol)
            else handleSelect(searchValue);
            setSelectedSuggestion(-1)
          }
    }

    return (
        <Navbar className='mt-1 mb-1' >
            <Container>
                <h1
                    className='heading-7-weight-5 text-white'
                    onClick={() => navigate('/')}
                    style={{cursor: 'pointer'}}
                >Stock Screener</h1>
                <Form className="d-flex position-relative">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        value={searchValue}
                        id='searchEntry'
                        aria-label="Search"
                        onChange={handleChange}
                        autoComplete='off'
                        onKeyDown={handleKeyDown}
                    />
                    <Button variant="light" style={{borderRadius: '50%', marginLeft: '5px'}} onClick={() => navigate(`/${searchValue}`)} >
                        <IoMdSearch />
                    </Button>
                    {showSuggestions && suggestions.length > 0 && (
                        <Dropdown.Menu style={{background: 'rgba(8, 0, 91, 1)'}} show>
                            {suggestions.map((item, index) => (
                                <Dropdown.Item key={index} className={selectedSuggestion === index ? 'search-dropdown-selected' : 'search-dropdown'} onClick={() => handleSelect(item.symbol)}>{item.symbol}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    )}
                </Form>
            </Container>
        </Navbar>
    );
}

export default Nav;
