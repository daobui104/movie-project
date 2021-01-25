import React, { Component } from "react";
import "./styles.css";

class ByYear extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    //console.log(this.props.films);
    return (
      <>
        <h1>By Year</h1>
        <p>
          {this.props.years.map((year) => {
            return " | " + year;
          })}
        </p>
      </>
    );
  }
}
export default ByYear;
