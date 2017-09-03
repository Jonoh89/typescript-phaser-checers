import * as Phaser from 'phaser-ce';
import FlyweightChipFactory from '../FlyweightChipFactory';
import createBoardTexture from '../textures/createBoard';
import createWhiteSquare from '../textures/createWhiteSquare';
import createHighlightSquare from '../textures/createHighlightSquare';
import createTransparentSquare from '../textures/createTransparentSquare';
import Square from './Square';
// import * as gsap from 'gsap';

// const TimelineLite = gsap.TimelineLite;

interface Options {
  game: Phaser.Game;
}

type Grid = Array<Array<Square>>;

const gridSize = 8;
const isEven = (n: number) => n % 2 === 0;
const shouldAddWhiteSquare = (x: number, y: number) =>
  (isEven(x) && isEven(y)) || (!isEven(x) && !isEven(y));
const shouldAddBlackChip = (x: number, y: number) =>
  y < gridSize / 2 - 1 && !shouldAddWhiteSquare(x, y);
const shouldAddWhiteChip = (x: number, y: number) =>
  y > gridSize / 2 && !shouldAddWhiteSquare(x, y);

class Board extends Phaser.Sprite {
  _grid: Grid;
  _flyweightChipFactory: FlyweightChipFactory;
  _selectedPoint: { x: number; y: number };

  constructor({ game }: Options) {
    const boardTexture = createBoardTexture(game);
    super(
      game,
      (game.width - boardTexture.width) / 2,
      (game.height - boardTexture.height) / 2,
      boardTexture
    );
    this._grid = [];
    this._flyweightChipFactory = new FlyweightChipFactory(game);
    this._createGrid();
    this._setupChips();
  }

  _createGrid() {
    const game = this.game;
    const whiteSquareTexture = createWhiteSquare(game);
    const transparentSquareTexture = createTransparentSquare(game);
    const highlightSquareTexture = createHighlightSquare(game);
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        let square: Square;
        if (shouldAddWhiteSquare(x, y)) {
          square = new Square({
            game,
            x: whiteSquareTexture.width * x,
            y: whiteSquareTexture.height * y,
            color: 'white',
            texture: whiteSquareTexture,
            highlightTexture: highlightSquareTexture
          });
        } else {
          square = new Square({
            game,
            x: whiteSquareTexture.width * x,
            y: whiteSquareTexture.height * y,
            color: 'black',
            texture: transparentSquareTexture,
            highlightTexture: highlightSquareTexture
          });
        }
        square.events.onInputDown.add(() => this._onSquareSelect(x, y));
        this.addChild(square);
        this._grid[x] = this._grid[x] || [];
        this._grid[x][y] = square;
      }
    }
  }

  _setupChips() {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        let chip;
        if (shouldAddBlackChip(x, y)) {
          chip = this._flyweightChipFactory.get('black');
        }
        if (shouldAddWhiteChip(x, y)) {
          chip = this._flyweightChipFactory.get('white');
        }
        if (chip) {
          const square = this._grid[x][y];
          square.addChip(chip);
        }
      }
    }
  }

  _onSquareSelect(x: number, y: number) {
    const square = this._grid[x][y];
    if (square.hasPlayerChip()) {
      this._selectedPoint = { x, y };
      square.highlight();
      this._showOptions(x, y);
    }
  }

  _showOptions(x: number, y: number) {
    if (this._grid[x + 1] && this._grid[x + 1][y - 1]) {
      // move up and right
      const square = this._grid[x + 1][y - 1];
      if (square.isEmpty()) {
        square.highlight();
      }
    }
  }
}

export default Board;
