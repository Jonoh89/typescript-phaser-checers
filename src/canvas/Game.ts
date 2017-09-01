import * as Phaser from 'phaser-ce';

class Game {
    game: Phaser.Game;

    constructor(canvas: HTMLElement) {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, canvas, { create: this.create });
    }

    create() {
        const text = 'Hello World!';
        const style = { font: '65px Arial', fill: '#ff0000', align: 'center' };
        this.game.add.text(0, 0, text, style);
    }

}

export default Game;
