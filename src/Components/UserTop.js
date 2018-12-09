import React, { Component } from "react";

import {Tabs, Tab} from 'react-materialize';

class UserTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="top">
        <Tabs className='tab-demo z-depth-1'>
          <Tab title="Main" active>main</Tab>
          <Tab title="data">inputMyData</Tab>
        </Tabs>
      </div>
    );
  }
}
export default UserTop;