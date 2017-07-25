import React from "react";

import styles from "./App.css";

import Stateful from "./stateful";
import Stateless from "./stateless";

const App = () => (
    <div className={styles.app}>
        <Stateful />
        <Stateless />
    </div>
);

export default App;