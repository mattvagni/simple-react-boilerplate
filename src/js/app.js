import React from "react";
import ReactDOM from "react-dom";
import {Greeting} from "./components/greeting";

ReactDOM.render(
    <Greeting name="world"/>,
    document.querySelector('.app')
);
