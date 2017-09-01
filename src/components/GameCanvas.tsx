import * as React from 'react';
import Game from '../canvas/Game';

class GameCanvas extends React.Component {
    c: HTMLDivElement | null;

    componentDidMount() {
        if (this.c) {
            new Game(this.c);
        } else {
            throw new Error('No element available');
        }
    }

    render() {
        return (
            <div ref={(c => this.c = c)} />
        );
    }

}

export default GameCanvas;
