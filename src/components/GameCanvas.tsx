import * as React from 'react';
import Game from '../canvas/Game';

class GameCanvas extends React.Component {
  c: HTMLDivElement | null;

  componentDidMount() {
    if (this.c) {
      const game = new Game(this.c);
      game.state.start('Checkers');
    } else {
      throw new Error('No element available');
    }
  }

  render() {
    return <div className="gameCanvas" ref={c => (this.c = c)} />;
  }
}

export default GameCanvas;
