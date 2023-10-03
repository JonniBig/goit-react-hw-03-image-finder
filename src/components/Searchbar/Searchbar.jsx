import React, { Component } from 'react';
import CSS from './Searchbar.module.scss';
export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={CSS.Searchbar}>
        <form className={CSS.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={CSS.SearchFormButton}>
            <span className={CSS.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={CSS.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
