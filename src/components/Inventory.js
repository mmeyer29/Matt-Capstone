import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Add a New Race</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Available Races</button>
      </div>
    )
  }
}

export default Inventory;
