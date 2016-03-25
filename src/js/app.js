import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/counter";

ReactDOM.render(
    <Counter startingNumber={Math.round(Math.random() * 10)}/>,
    document.querySelector('.app')
);
