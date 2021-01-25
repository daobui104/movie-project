import React, { Component } from "react";
import FilmRow from "./FilmRow";

class FilmListing extends Component {
  state = {
    filt: "all"
  };

  handleFilterClick = (filter) => {
    //console.log(`Setting filter to ${filter}`);
    this.setState({
      filt: filter
    });
  };

  render() {
    const displayFilms = this.props.films.map((film) => {
      return (
        <FilmRow
          film={film}
          key={film.id}
          handleDetailsClick={() => this.props.handleDetailsClick(film)}
        />
      );
    });

    return (
      <div className="film-list">
        <h2>
          <center>NOW PLAYING</center>
        </h2>
        <div>
          <div className="film-list-filte">
            <center>
              <span className="section-count">{this.props.films.length}</span>
            </center>
          </div>
        </div>
        {displayFilms}
      </div>
    );
  }
}

export default FilmListing;
