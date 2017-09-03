import * as Phaser from 'phaser-ce';

const squareSize = 75;

export default function createHighlightSquare(
  game: Phaser.Game
): Phaser.RenderTexture {
  return new Phaser.Graphics(game, 0, 0)
    .beginFill(0xffe700, 0.6)
    .drawRect(0, 0, squareSize, squareSize)
    .endFill()
    .generateTexture();
}
