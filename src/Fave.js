import React, { Component } from "react";

class Fave extends Component {
  constructor(props) {
    super();
    this.state = {
      //isFave: false
    };
  }

  handleClick = (e) => {
    e.stopPropagation();
    //console.log("Handling Fave click!");
    // Add this line. You'll call the function passed through props.
    this.props.onFaveToggle(this.props.film);
    // Delete the `setState` line. You no longer track state here.
    // this.setState({isFave: !this.state.isFave});
  };

  render() {
    //console.log("handling Fave click", this.props.isFave);
    const isFave = this.props.isFave ? "remove_from_queue" : "add_to_queue";
    return (
      <div className={`film-row-fave ${isFave}`} onClick={this.handleClick}>
        <p className="material-icons">{isFave}</p>
      </div>
    );
  }
}

export default Fave;
