import Phaser from 'phaser'
import GameScene from './game.js'
import LoginScene from './login.js'
import GameSceneL1 from './gamel1.js';
import GameSceneL2 from './gamel2.js';
import GameSceneL3 from './gamel3.js';
import Tutorial from './tutorial.js';
import Customization from './customization.js';

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
    
    scene: [LoginScene, GameScene, GameSceneL1, GameSceneL2, GameSceneL3, Tutorial, Customization],

    level: 0,
    ccustomer : 1,
    cpot : 0, 
    csoil : 0, 
    cseed : 0, 
    cwater : 0,
    cfertlizer : 0, 
    r_count : 0, 
    cscore : 0
};
const game = new Phaser.Game(config);
game.config.level = 0;
game.config.ccustomer = 1;
game.config.cpot = 0;
game.config.csoil = 0;
game.config.cseed = 0;
game.config.cwater = 0;
game.config.cfertlizer = 0;
game.config.r_count = 0;
game.config.cscore = 0;

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
