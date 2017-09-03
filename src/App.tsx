import * as React from 'react';
import GameCanvas from './components/GameCanvas';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GameCanvas />
      </div>
    );
  }
}

export default App;
