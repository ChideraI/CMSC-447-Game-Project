import Phaser from 'phaser'
import GameScene from './game.js'
import LoginScene from './login.js'
import TutorialScene from './tutorial.js';
import Level1Scene from './level1.js';
import Level2Scene from './level2.js';
import Level3Scene from './level3.js';
import MenuScene from './menu.js';

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
    scene: [LoginScene, MenuScene, GameScene, TutorialScene, Level1Scene, Level2Scene, Level3Scene],

    level: 0,
    cpot : "", 
    csoil : "", 
    cseed : "", 
    cwater : 0,
    cfertlizer : 0
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
