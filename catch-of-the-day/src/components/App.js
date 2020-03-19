import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
  // First we create an empty state
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    // 1. create shallow copy of the state to avoid mutations
    const fishes = { ...this.state.fishes };
    // 2. Update the shallow copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set state with updated values
    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood" />
        </div>
        <Order />
        {/* We pass down the methods downstream as `props` */}
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
