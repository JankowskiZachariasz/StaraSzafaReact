import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../graphics/logo.svg";
import search from "../../graphics/search.svg";
import dots from "../../graphics/dots.svg";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        phrase:"",
    };
    this.handlePhraseUpdate = this.handlePhraseUpdate.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  handlePhraseUpdate(event) {
    this.setState({ phrase: event.target.value });
  }

  handlesubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      
      <div className="col-12">
          <SearchForm
          submit={this.handlesubmit} 
          value={this.state.phrase} 
          change={this.handlePhraseUpdate}
          ></SearchForm>
      </div>
    );
  }
}

function SearchForm({submit, value, change}) {
  return (
    <form onSubmit={submit}>
      <div className="input-group">
      <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">

    <img
      src={search}
      className="mojaszafa"
      alt="logo"
      height="23"
    />
    </span>
  </div>
        <input
        
          id="search"
          type="text"
          name="search"
          className="form-control"
          value={value}
          onChange={change}
        />
      </div>
    </form>
  );
}


export default SearchBar;
