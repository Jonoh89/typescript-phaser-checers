import * as Phaser from 'phaser-ce';

export default function createKingedChip(
  game: Phaser.Game,
  color: number
): Phaser.RenderTexture {
  return new Phaser.Graphics(game, 0, 0)
    .beginFill(color)
    .drawCircle(0, 0, 60)
    .endFill()
    .lineStyle(1, 0xffffff)
    .beginFill(0xffc200)
    .moveTo(30, 10)
    .lineTo(35, 20)
    .lineTo(45, 20)
    .lineTo(40, 25)
    .lineTo(20, 50)
    .lineTo(10, 30)
    .lineTo(30, 10)
    .generateTexture();
}
