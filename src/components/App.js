import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base.js';

class App extends React.Component {

  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

componentWillUpdate(nextProps, nextState) {
  console.log('something changed');
  console.log({nextProps, nextState})
}

  addFish(fish) {
    // update state
    const fishes = {...this.state.fishes};
    //add in a new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
    //set state
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    //take a copy of our state
    const order = {...this.state.order};
    //update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update state
    this.setState({ order });

  }

  render() {
    return (
     <div className="catch-of-the-day">
       <div className="menu">
         <Header tagline="Take it to the Track!"/>
         <ul className="list-of-fishes">
           {Object
             .keys(this.state.fishes)
             .map(key => <Fish key={key} index={key}
               details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
           }
         </ul>
       </div>
       <Order fishes={this.state.fishes} order={this.state.order}/>
       <Inventory addFish={this.addFish}
          loadSamples={this.loadSamples} />
     </div>
    )
  }
}

export default App;
