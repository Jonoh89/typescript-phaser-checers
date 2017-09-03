import * as Phaser from 'phaser-ce';
import CheckersStage from './stage/Checkers';

class Game extends Phaser.Game {
  constructor(canvas: HTMLElement) {
    super(640, 640, Phaser.AUTO, canvas);
    this.state.add('Checkers', CheckersStage, false);
  }

  boot() {
    super.boot();
    this.stage.setBackgroundColor('#57463d');
  }
}

export default Game;
