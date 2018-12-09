import React, { Component } from "react";

import {Row, Col} from 'react-materialize';

class UserTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'student'
    }
  }

  render(props) {
    return (
      <Row className="top center-align">
        <Col s={12}>
          <h2>Mypage</h2>
        </Col>
        <Col s={12}>
          <p>ADDRESS</p>
          <p>{this.props.address}</p>
        </Col>
        <Col s={12}>
          <p>{this.state.type}</p>
        </Col>
      </Row>
    );
  }
}
export default UserTop;