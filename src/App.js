import React, { Component } from "react";
import QuestionsSet from './components/questionsSet/questionsSet'
import {QUESTIONS} from "./questions";

class App extends Component {
  state = {
  };


  render() {
    return (
      <div className="main__wrap">
        <main className="container">
            <QuestionsSet />
        </main>
      </div>
    );
  }
}

export default App;
