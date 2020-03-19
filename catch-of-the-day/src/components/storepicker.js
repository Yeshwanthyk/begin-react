import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  // Instead we can use arroy functions, they will bind to the instance

  goToStore = event => {
    // Prevent form from resetting the page
    event.preventDefault();

    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Pick a store</h2>
        <input
          type="text"
          required
          ref={this.myInput}
          placeholder="Store Name"
          defaultValue={getFunName()}
        ></input>
        <button type="submit"> Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
