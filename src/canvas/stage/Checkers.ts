import * as Phaser from 'phaser-ce';

import Board from '../compoenents/Board';

interface Options {
  black?: boolean;
}

class Checkers extends Phaser.State {
  _playersColor: 'black' | 'white';
  _turn: 'player' | 'computer';
  _board: Board;

  init(options: Options = {}) {
    this._playersColor = options.black ? 'black' : 'white';
    this._turn = 'player';
  }

  create() {
    this._board = new Board({ game: this.game });
    this.stage.addChild(this._board);
  }
}

export default Checkers;
