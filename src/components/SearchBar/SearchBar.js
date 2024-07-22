import React, {Component, useState} from 'react';
import {Redirect} from 'react-router-dom';
import './SearchBar.css';
import {FaSearch} from 'react-icons/fa';


class SearchBar extends Component {
    state = {
        term: null,
        submit: null,
    }

    onInputChange = (event) => {
        this.setState({term: event.target.value});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.setState({submit: true});
    };

    render() {

        if (this.state.submit) {
            this.setState({submit: null});
            return <Redirect to={`/search/${this.state.term}`}/>
        }

        return (
            <form className='barbox' onSubmit={this.onFormSubmit}>
                <div className="search-icon">
                    <FaSearch/>
                </div>
                <input
                    className='input_bar'
                    type='text'
                    value={this.state.term}
                    onChange={this.onInputChange}
                    placeholder='Search for users, company & pages'
                />
            </form>
        );
    }
}

export default SearchBar;