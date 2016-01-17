import React from "react";

class Greeting extends React.Component {

    constructor() {
        super();
        this.state = {
            clickCount: 1
        }
    }

    onClick() {
        this.setState({clickCount: this.state.clickCount + 1});
    }

    render() {

        const number = this.state.clickCount;

        return (
            <div className="greeting" onClick={this.onClick.bind(this)}>
                Hello {this.props.name} {number}!
            </div>
        );
    }

}

export default Greeting;
