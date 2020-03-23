import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

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
          <ul className="fishes">
            {/* Object.keys allows us to get an array of the fishes so that we can
            map over it as we cant map over Object (which the state is) */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} details={this.state.fishes[key]} />
            ))}
          </ul>
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
