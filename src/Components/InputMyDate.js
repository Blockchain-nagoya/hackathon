import React, { Component } from "react";

class InputMyData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLable: '', inputData: ''
    }
    this.inputLable = this.inputLable.bind(this);
    this.inputData = this.inputData.bind(this);
  }

  inputLable = e => {
    this.setState({inputLable: e.target.value});
  }
  inputData = e => {
    this.setState({inputData: e.target.value});
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}
export default InputMyData;