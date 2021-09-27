import React from "react";
import Appbar from './Appbar'
import Appbody from './Appbody'
import "./App.css"

const App = () => {
  return (
    <div className="w3-container">
      <Appbar />
      <Appbody />
    </div>
  );
}

export default App;
