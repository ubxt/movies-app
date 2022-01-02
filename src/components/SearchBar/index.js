import React, { Component } from 'react';
import propTypes from 'prop-types';
//Image
import searcIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.styles';

class SearchBar extends Component {

    state = {
        value: ''
    };
    timeout = null;

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
            }, 500);
        }
    }

    render() {
        const { value } = this.state;
        return (
            <Wrapper>
                <Content>
                    <img src={searcIcon} alt='search-icon' />
                    <input type="text"
                        placeholder='Search Movie'
                        onChange={e => this.setState({ value: e.currentTarget.value })}
                        value={value}
                    />
                </Content>
            </Wrapper>
        )
    }
}

SearchBar.propTypes = {
    setSearchTerm: propTypes.func
}

export default SearchBar;