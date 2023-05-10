export default class Customization extends Phaser.Scene {


    constructor() {
        super("Customization");

    }
    
    preload ()
    {
        //scene background
        this.load.image('background', './customization_background.png');

        //character body 
        this.load.image('hat', 'assets/hat.png');
        this.load.image('skin', 'assets/skin.png');
        this.load.image('shirt', 'assets/shirt.png');
        this.load.image('pants', 'assets/pants.png');
        this.load.image('shoes', 'assets/shoes.png');

        //tiles
        this.load.image('tile', 'assets/tile.png');
        this.load.image('smalltile', 'assets/tilesmall.png');

        this.load.image('button1', 'assets/kisspng-button-glass-clip-art-botwtoon-5b0b1141547751.187244581527451969346.png'); 
    }   
    
    
    create ()
    {
        let hat;
        let skin;
        let shirt;
        let pants;
        let shoes;

        //First, put up log in/new account screen
        const myThis = this;
        
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        // const loginButton = this.add.text(400, 400, 'Welcome to Customization page! to go back to Login, click here!', {fontSize: '32px', fill: '#000' });
        // loginButton.setInteractive();
        // loginButton.on('pointerup', () => {  myThis.scene.start('Login') });

        //BACKGROUND BUTTON
        const loginButtonBg1 = this.add.image(125, 70, 'button1').setScale(0.25).setInteractive({
            useHandCursor: true
        });
        loginButtonBg1.on('pointerup', () => {  myThis.scene.start('Login') });

        //text
        const loginButton = this.add.text(50, 50, 'Main Menu', {fontSize: '32px', fill: '#000', fontFamily:'cursive'  });
        loginButton.setInteractive({
            useHandCursor: true
        });
        loginButton.on('pointerup', () => {  myThis.scene.start('Login') });

        //for the save button youll want this
        const loginButtonBg2 = this.add.image(1425,820, 'button1').setScale(0.25).setInteractive({
            useHandCursor: true
        });
        loginButtonBg2.on('pointerup', () => {});
        const submitButton = this.add.text(this.cameras.main.width / 2 + 500, 800, 'Save', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
        submitButton.setInteractive({
            useHandCursor: true
        });
        submitButton.on('pointerup', () => {

            //code goes here
        }); 




          //tiles for the color drag and drop 
          arrows = this.physics.add.staticGroup();
          smalltiles = this.physics.add.staticGroup();
          text = this.physics.add.staticGroup();
        
        //hat
        let hat1 = hat.create(this.cameras.main.width / 800, this.cameras.main.height / 6 + 100, 'hat').setScale(0.2).setInteractive();
    }
}