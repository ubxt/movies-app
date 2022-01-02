import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
//Image
import searcIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = ({ setSearchTerm }) => {

    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        return () => clearTimeout();
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img src={searcIcon} alt='search-icon' />
                <input type="text"
                    placeholder='Search Movie'
                    onChange={e => setState(e.currentTarget.value)}
                    value={state}
                />
            </Content>
        </Wrapper>
    )
}

SearchBar.propTypes = {
    setSearchTerm: propTypes.func
}

export default SearchBar;