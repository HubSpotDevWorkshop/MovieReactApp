import React, { Component } from "react";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
    this.state = {
      searchText: "",
      results: []
    };
  }

  onSearch() {
    fetch(
      `http://www.omdbapi.com/?apikey=aecbec56&s=${encodeURIComponent(
        this.state.searchText
      )}`
    )
      .then(response => response.json())
      .then(body => {
        const results = body.Search;
        // check body.Error? i.e. "Too many results"
        this.setState({ results });
      });
  }

  renderMovie(movie) {
    return (
      <div className="movie" key={movie.imdbID}>
        <img src={movie.Poster} />
        <h3>{movie.Title}</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="search">
          <input
            placeholder="Search movies..."
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
          />
          <button onClick={this.onSearch}>Search</button>
        </div>
        <div className="results">
          {this.state.results.map(this.renderMovie)}
        </div>
      </div>
    );
  }
}

export default SearchPage;
