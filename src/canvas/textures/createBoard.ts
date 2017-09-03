import * as Phaser from 'phaser-ce';

const boardSize = 600;

export default function createBoard(game: Phaser.Game): Phaser.RenderTexture {
  return new Phaser.Graphics(game, 0, 0)
    .lineStyle(1, 0xffffff)
    .drawRect(0, 0, boardSize, boardSize)
    .generateTexture();
}
