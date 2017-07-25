import React, { Component } from "react";

class Stateful extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "Hello" };
    }

    render() {
        return (
            <div>
                <label>{this.state.value} World</label>
                <input value={this.state.value} onChange={(event) => { this.setState({ value: event.target.value }); }} />
            </div>
        );
    }
}

export default Stateful;