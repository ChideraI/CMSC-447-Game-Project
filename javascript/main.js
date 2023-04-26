import Phaser from 'phaser'
import GameScene from './game.js'
import LoginScene from './login.js'

const config = {
    type: Phaser.AUTO,
    width: 1690,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 200 }
        }
    },
    parent: "botany_bakery",
    dom: {
        createContainer: true
    },
    // scene: {
    //     preload: preload,
    //     create: create
    // }
    scene: [LoginScene, GameScene]
};
const game = new Phaser.Game(config)

// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 200 }
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create
//     }
// };

// var game = new Phaser.Game(config);
// var score = 0;
// var scoreText;
