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
        //hat colors
        let hat_color = this.add.group();
        let blue1 = hat_color.create(800, 250, 'blue_color').setScale(0.4).setInteractive();
        this.input.setDraggable(blue1);

        let orange_color1 = hat_color.create(980, 250, 'orange_color').setScale(0.4).setInteractive();
        this.input.setDraggable(orange_color1);

        //shirt colors 
        let shirt_color = this.add.group();
        let blue_green = shirt_color.create(800, 500, 'blue_green_color').setScale(0.4).setInteractive();
        this.input.setDraggable(blue_green);

    
        let green_color = shirt_color.create (980, 500, 'green_color').setScale(0.4).setInteractive();
        this.input.setDraggable(green_color);

        //Pants colors
        let pants_color = this.add.group();
        let purple_color1 = pants_color.create(800,750, 'purple_color').setScale(0.4).setInteractive();
        this.input.setDraggable(purple_color1);

        let blue_dark = pants_color.create(980, 750, 'dark_blue_color').setScale(0.4).setInteractive();
        this.input.setDraggable(blue_dark);

        //text
        let label1 = this.add.text(550, 25, 'Welcome to the character customization screen!', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
        let label2 = this.add.text(350, 75, 'Select a color from each section and drag it to the middle of the the blank character.', {fontSize: '24px', fill: '#000', fontFamily:'cursive' });
        let label3 = this.add.text(800, 350, 'Shirt color', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
        let label4 = this.add.text(800, 125, 'Hat color', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });
        let label5 = this.add.text(800, 600, 'Pants color', {fontSize: '32px', fill: '#000', fontFamily:'cursive' });

        //drag and drop

        //zone
        //  A drop zone
        let zone = this.add.zone(this.cameras.main.width / 4, this.cameras.main.height / 1.3, 250, 800).setRectangleDropZone(300, 500);
        
        this.input.on('dragstart', function (pointer, gameObject) {/*gameObject.setTint(0xEEEEEE);*/});
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    
        //When dropping object into zone, move object
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            gameObject.visible = false;

            if(hat_color.contains(gameObject)){
                if (gameObject == blue1){
                    hat1.setTint(0x3466e8);
                }
                else if (gameObject == orange_color1){
                    hat1.setTint(0xf07822);
                }
            }
            if(shirt_color.contains(gameObject)){
                if (gameObject == blue_green){
                    shirt1.setTint(0x01bda5);
                }
                else if (gameObject == green_color){
                    shirt1.setTint(0x97aa00);
                }
            }
            if(pants_color.contains(gameObject)){
                if (gameObject == blue_dark){
                    pants1.setTint(0x1063b1);
                }
                else if (gameObject == purple_color1){
                    pants1.setTint(0x7b277c);
                }
            }
        });
    
    }
}