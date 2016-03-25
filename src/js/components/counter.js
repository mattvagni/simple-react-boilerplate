import React from "react";

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickCount: props.startingNumber
        }
    }

    onClick() {
        this.setState({clickCount: this.state.clickCount + 1});
    }

    render() {

        const number = this.state.clickCount;

        return (
            <div className="counter">
                <div className="counter-number">{number}</div>
                <button className="counter-button" onClick={this.onClick.bind(this)}>+1</button>
            </div>
        );
    }

}

export default Counter;
