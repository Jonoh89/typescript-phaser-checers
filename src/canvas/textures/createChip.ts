import * as Phaser from 'phaser-ce';

export default function createChip(
  game: Phaser.Game,
  color: number
): Phaser.RenderTexture {
  return new Phaser.Graphics(game, 0, 0)
    .beginFill(color)
    .drawCircle(0, 0, 60)
    .endFill()
    .generateTexture();
}
