import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./components/App";

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("app")
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    console.log("hot enable");
    module.hot.accept("./components/App", () => { 
        console.log("rerender App");
        render(App); 
    });
}