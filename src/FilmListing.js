import React, { Component } from "react";
import FilmRow from "./FilmRow";
import ReactPaginate from "react-paginate";
import TMDB from "./TMDB";

class FilmListing extends Component {
  constructor(props) {
    super();
    this.state = {
      offset: 0
    };
  }

  handlePageClick = (e) => {
    console.log("pageClick offset: " + this.state.offset);
    this.setState({
      offset: e.selected * TMDB.per_page
    });
    this.props.handlePageClickFilmPage();
  };

  componentDidMount() {
    console.log("inside didmount");
    this.props.history.listen((location, action) => {
      this.setState({
        offset: 0
      });
    });
    console.log("didmount offset: " + this.state.offset);
  }

  render() {
    const filmSlice = this.props.films.slice(
      this.state.offset,
      this.state.offset + TMDB.per_page
    );

    const displayFilms = filmSlice.map((film) => {
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
          <center>
            {this.props.headerText} ({this.props.films.length})
          </center>
        </h2>
        {displayFilms}
        <div>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default FilmListing;
