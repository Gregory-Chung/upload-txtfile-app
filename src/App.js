import React, { Component } from "react";
import "./App.css";

import FileUpload from "./components/FileUpload";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <FileUpload />
        </div>
      </div>
    );
  }
}

export default App;
