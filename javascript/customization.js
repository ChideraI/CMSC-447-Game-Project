export default class Customization extends Phaser.Scene {


    constructor() {
        super("Customization");

    }
    
    preload ()
    {
        //scene background
        this.load.image('bg_customize', 'assets/customization_background.png');

        //character body 
        this.load.image('hat', 'assets/hat.png');
        this.load.image('skin', 'assets/skin.png');
        this.load.image('shirt', 'assets/shirt.png');
        this.load.image('pants', 'assets/pants.png');
        this.load.image('shoes', 'assets/shoes.png');

        //color blocks
        this.load.image('blue_color', 'assets/blue_color.png');
        this.load.image('dark_blue_color', 'assets/dark_blue_color.png');
        this.load.image('green_color', 'assets/green_color.png');
        this.load.image('orange_color', 'assets/orange_color.png');
        this.load.image('purple_color', 'assets/purple_color.png');
        this.load.image('pink_color', 'assets/pink_color.png');
        this.load.image('red_color', 'assets/red_color.png');
        this.load.image('yellow_color', 'assets/yellow_color.png');
        this.load.image('blue_green_color', 'assets/blue_green_color.png');

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
        
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bg_customize');
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
          //arrows = this.physics.add.staticGroup();
          //smalltiles = this.physics.add.staticGroup();
          //text = this.physics.add.staticGroup();
        
        //hat
        let hats = this.add.group();
        let hat1 = hats.create(this.cameras.main.width / 4, this.cameras.main.height/1.3, 'hat').setScale(0.7);
        
        //skin 
        let skins = this.add.group();
        let skin1 = skins.create(this.cameras.main.width / 4, this.cameras.main.height/1.3, 'skin').setScale(0.7);
    
        //shirt
        let shirts = this.add.group();
        let shirt1 = shirts.create(this.cameras.main.width / 4, this.cameras.main.height/1.3, 'shirt').setScale(0.7);

        //pants
        let pants_1 = this.add.group();
        let pants1 = pants_1.create(this.cameras.main.width /4, this.cameras.main.height/1.3, 'pants').setScale(0.7);
        
        //shoes 
        let shoe = this.add.group();
        let shoes1 = shoe.create(this.cameras.main.width / 4, this.cameras.main.height/1.3, 'shoes').setScale(0.7);
    

        //colors
        let blue = this.add.group();
        let blue1 = blue.create(this.cameras.main.width /1.5, this.cameras.main.height/3, 'blue_color').setScale(0.4);

        let blue_2 = this.add.group();
        let blue_dark = blue_2.create(this.cameras.main.width /1.5, this.cameras.main.height/2, 'dark_blue_color').setScale(0.4);

        let blue_3 = this.add.group();
        let blue_green = blue_3.create(this.cameras.main.width /0.5, this.cameras.main.height/2, 'blue_green_color').setScale(0.4);

        let green = this.add.group();
        let green_color1 = green.create(this.cameras.main.width /0.5, this.cameras.main.height/3, 'green_color').setScale(0.4);

        let orange_1 = this.add.group();
        let orange_color1 = orange1.create(this.cameras.main.width /1.5, this.cameras.main.height/3, 'orange_color').setScale(0.4);

        let purple1 = this.add.group();
        let purple_color1 = pruple.create(this.cameras.main.width /1.5, this.cameras.main.height/3, 'purple_color').setScale(0.4);
        
    
    }
}