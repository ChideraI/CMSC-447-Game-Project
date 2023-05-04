export default class GameSceneL2 extends Phaser.Scene {


    constructor() {
        super("GameL2");

    }
    
    preload ()
    {
        this.load.image('background', './main_screen.png');
    }   
    
    
    create ()
    {
        const myThis = this;

        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        const loginButton = this.add.text(400, 400, 'Welcome to game 2 page! to go back to Login, click here!', {fontSize: '32px', fill: '#000' });
        loginButton.setInteractive();
        loginButton.on('pointerup', () => {  myThis.scene.start('Login') });
    }
}