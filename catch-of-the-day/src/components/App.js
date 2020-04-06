import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  // First we create an empty state
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    // We set the localStorage with the order we add from the store. We save it as a JSON string to ensure we don't get "[Object object]"
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // Close binding to stop from memory leaks
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. create shallow copy of the state to avoid mutations
    const fishes = { ...this.state.fishes };
    // 2. Update the shallow copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set state with updated values
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    //1. Take copy of current state
    const fishes = { ...this.state.fishes };

    //2. update copy
    fishes[key] = updatedFish;

    //3. update state
    this.setState({ fishes: fishes });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null;

    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  AddToOrder = (key) => {
    const order = { ...this.state.order };
    // if (key in order) {
    //   order[key] = order[key] + 1;
    // } else {
    //   order[key] = 1;
    // }
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  DeleteFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood" />
          <ul className="fishes">
            {/* Object.keys allows us to get an array of the fishes so that we can
            map over it as we cant map over Object (which the state is) */}
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                AddToOrder={this.AddToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          DeleteFromOrder={this.DeleteFromOrder}
        />
        {/* We pass down the methods downstream as `props` */}
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
