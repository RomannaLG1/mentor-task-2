import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state= {
    query: ''
  }
  handleSubmit = (evt) => {
evt.preventDefault();
this.props.onSubmit(this.state.query)
this.setState({query: ''})
  }
  handleInput = (evt) => {
    this.setState({query: evt.currentTarget.value})
  }

  render() {
    return <SearchFormStyled onSubmit={this.handleSubmit}>
    <FormBtn type="submit">
      <FiSearch size="16px" />
    </FormBtn>
    <InputSearch
      placeholder="What do you want to write?"
      name="search"
      value={this.state.query}
      onChange={this.handleInput}
      required
      autoFocus
    />
  </SearchFormStyled>;
  }
}
