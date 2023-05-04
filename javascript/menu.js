export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu')
    }
    preload() {

        //this.load.html("login_form", "login.html");

    }
    create() {
        const myThis = this;
        this.cameras.main.setBackgroundColor(0xAAFFAA);

        const tutorialButton = this.add.text(100, 100, 'Tutorial', {fontSize: '32px', fill: '#000' });
        tutorialButton.setInteractive();
        tutorialButton.on('pointerup', () => {
            this.game.config.level = 0;
            myThis.scene.start('Game');
        });

        const level1Button = this.add.text(100, 300, 'Level 1', {fontSize: '32px', fill: '#000' });
        level1Button.setInteractive();
        level1Button.on('pointerup', () => {
            this.game.config.level = 1;
            myThis.scene.start('Game');
        });

        const level2Button = this.add.text(100, 500, 'Level 2', {fontSize: '32px', fill: '#000' });
        level2Button.setInteractive();
        level2Button.on('pointerup', () => {
            this.game.config.level = 0;
            myThis.scene.start('Game');
        });

        const level3Button = this.add.text(100, 700, 'Level 3', {fontSize: '32px', fill: '#000' });
        level3Button.setInteractive();
        level3Button.on('pointerup', () => {
            this.game.config.level = 1;
            myThis.scene.start('Game');
        });
    }

}