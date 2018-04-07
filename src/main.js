import 'phaser';
import BootScene from './BootScene';

let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 1024,
    height: 576,
    scaleMode: 0, // Phaser.ScaleManager.EXACT_FIT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ BootScene ]
};

let game = new Phaser.Game(config);

export default game;
