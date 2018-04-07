import 'phaser';

// import BootScene from './BootScene';

import GameState from './GameState';

let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1024,
    height: 576,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ GameState ]
};

let game = new Phaser.Game(config);

export default game;
