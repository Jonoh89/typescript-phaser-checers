import * as Phaser from 'phaser-ce';
import Chip from './Chip';

type Color = 'black' | 'white';
interface Options {
  game: Phaser.Game;
  x: number;
  y: number;
  color: Color;
  texture?: Phaser.RenderTexture;
  highlightTexture: Phaser.RenderTexture;
}

class Square extends Phaser.Sprite {
  isHighlighted: boolean;
  _color: Color;
  _selected: boolean;
  _chip: Chip | undefined;
  _highlightSprite: Phaser.Sprite;

  constructor(options: Options) {
    super(options.game, options.x, options.y, options.texture);
    if (options.color === 'black') {
      this.inputEnabled = true;
    }
    this._color = options.color;
    this._selected = false;
    this.isHighlighted = true;
    this._highlightSprite = new Phaser.Sprite(
      options.game,
      0,
      0,
      options.highlightTexture
    );
  }

  get color() {
    return this._color;
  }

  highlight() {
    this.isHighlighted = true;
    this.addChild(this._highlightSprite);
  }

  removeHighlight() {
    this.isHighlighted = false;
    this.removeChild(this._highlightSprite);
  }

  addChip(chip: Chip) {
    this._chip = chip;
    this._chip.position.setTo(this.width / 2);
    this.addChild(this._chip);
  }

  removeChip() {
    if (this._chip) {
      this.removeChild(this._chip);
      this._chip = undefined;
    }
  }

  hasPlayerChip() {
    return this._chip && this._chip.isPlayer();
  }

  hasKingedPlayerChip() {
    return this._chip && this._chip.isPlayer() && this._chip.isKinged();
  }

  hasEnemenyChip() {
    return this._chip && this._chip.isEnemy();
  }

  hasEnemenyKing() {
    return this._chip && this._chip.isEnemy() && this._chip.isKinged();
  }

  isEmpty() {
    return !this._chip;
  }
}

export default Square;
