import Chip from './compoenents/Chip';
import createChipTexture from './textures/createChip';
import createKingChipTexture from './textures/createKingedChip';

type ChipColor = 'black' | 'white';

class FlyweightChipFactory {
  game: Phaser.Game;
  textureCache: { [CKey in ChipColor]?: Phaser.RenderTexture };
  kingedTextureCache: { [CKey in ChipColor]?: Phaser.RenderTexture };

  constructor(game: Phaser.Game) {
    this.game = game;
    this.textureCache = {};
    this.kingedTextureCache = {};
  }

  _createChip(chipColor: ChipColor, textureColor: number) {
    const texture =
      this.textureCache[chipColor] ||
      createChipTexture(this.game, textureColor);
    const kingedTexture =
      this.textureCache[chipColor] ||
      createKingChipTexture(this.game, textureColor);
    this.textureCache[chipColor] = texture;
    this.kingedTextureCache[chipColor] = kingedTexture;
    return new Chip({
      game: this.game,
      texture,
      kingedTexture,
      color: chipColor
    });
  }

  get(chipColor: ChipColor) {
    switch (chipColor) {
      case 'black': {
        return this._createChip(chipColor, 0x000000);
      }
      default: {
        return this._createChip(chipColor, 0xffffff);
      }
    }
  }
}

export default FlyweightChipFactory;
