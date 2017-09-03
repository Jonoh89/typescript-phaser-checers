import * as Phaser from 'phaser-ce';

type Color = 'black' | 'white';
interface Options {
  game: Phaser.Game;
  texture: Phaser.RenderTexture;
  kingedTexture: Phaser.RenderTexture;
  color: Color;
}

class Chip extends Phaser.Sprite {
  _kinged: boolean;
  _selected: boolean;
  color: Color;

  constructor(options: Options) {
    super(options.game, 0, 0, options.texture);
    this._kinged = false;
    this._selected = false;
    this.anchor.setTo(0.5);
    this.color = options.color;
  }

  isPlayer() {
    return this.color === 'white';
  }

  isEnemy() {
    return this.color === 'black';
  }

  isKinged() {
    return this._kinged === true;
  }
}

export default Chip;
