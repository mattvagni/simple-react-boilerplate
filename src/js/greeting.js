import React from "react";

class Greeting extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="greeting">
                Hello, {this.props.name}!
            </div>
        );
    }

}

export {
    Greeting
}
