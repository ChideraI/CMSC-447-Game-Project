export default class betweenLevel extends Phaser.Scene {


    constructor() {
        super("betweenLevel");
    }    

    preload ()
    {
        this.load.image('background', './main_screen.png');
        this.load.image('button1', 'assets/kisspng-button-glass-clip-art-botwtoon-5b0b1141547751.187244581527451969346.png');
    }   
    
    
    create ()
    {
        const myThis = this;

        if(this.game.config.level == 0 && this.game.config.ccustomer == 1){
            let welcome = this.add.text(550, 75, 'Tutorial level complete!', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
            let welcome2 = this.add.text(400, 150, 'Click the main menu button to return to the main menu.', {fontSize: '24px', fill: '#000', fontFamily:'cursive' });
            let welcome3 = this.add.text(300, 200, 'Or click the \'Next Level\' button to go to the next level.', {fontSize: '24px', fill: '#000', fontFamily:'cursive'  });
        }
        
        this.cameras.main.setBackgroundColor(0xAAFFAA);

        if(this.game.config.level == 0){
            this.add.text(500, 500, 'Tutorial Level Final Score: $'+this.game.config.tscore, {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
        }else{
            this.add.text(500, 400, 'Level '+this.game.config.level+' Final Score: $'+this.game.config.tscore, {fontSize: '32px', fill: '#000', fontFamily:'cursive'  });
        }
        //BACKGROUND BUTTON
        const loginButtonBg2 = this.add.image(1425,820, 'button1').setScale(0.25).setInteractive({
             useHandCursor: true
        });
        loginButtonBg2.on('pointerup', () => {
            this.game.config.level += 1;
            this.game.config.ccustomer = 1;
            this.game.config.cscore = 0;
            this.game.config.tscore = 0;
            myThis.scene.start('Game');
        });

        //Make plant button
        if(this.game.config.level != 3){
            const nextButton = this.add.text(this.cameras.main.width / 2 + 500, 800, 'Next Level', {fontSize: '32px', fill: '#000', fontFamily:'cursive'  });
            nextButton.setInteractive({
                useHandCursor: true
           });
            nextButton.on('pointerup', () => {
                this.game.config.level += 1;
                this.game.config.ccustomer = 1;
                this.game.config.cscore = 0;
                this.game.config.tscore = 0;
                myThis.scene.start('Game');
            });
        }else{
            this.add.text(500, 300, 'Level 3 complete. Thanks for playing!', {fontSize: '32px', fill: '#000', fontFamily:'cursive'  });
            this.add.text(450, 500, 'Click the \'Main Menu\' button to return to the Main Menu.', {fontSize: '32px', fill: '#000', fontFamily:'cursive'  });
        }
        //BACKGROUND BUTTON
        const loginButtonBg1 = this.add.image(125, 70, 'button1').setScale(0.25).setInteractive({
             useHandCursor: true
        });
        loginButtonBg1.on('pointerup', () => {  myThis.scene.start('Login') });
        //text
        const loginButton = this.add.text(50, 50, 'Main Menu', {fontSize: '32px', fill: '#000', fontFamily:'cursive'});
        loginButton.setInteractive({
            useHandCursor: true
       });
        loginButton.on('pointerup', () => {  myThis.scene.start('Login') });
    }
}