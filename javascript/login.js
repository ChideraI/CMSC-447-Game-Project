export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('Login')
    }
    preload() {

       this.load.html("login_form", "login.html");
        this.load.image('background', './main_screen.png');

    }
    create() {
        const myThis = this;

        //Reset global variables when user returns to main menu
        this.game.config.ccustomer = 1;
        this.game.config.cpot = 0;
        this.game.config.csoil = 0;
        this.game.config.cseed = 0;
        this.game.config.cwater = 0;
        this.game.config.cfertlizer = 0;
        this.game.config.r_count = 0;
        this.game.config.cscore = 0;
        this.game.config.tscore = 0;


        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
        // this.add.image(400, 300, 'background');

        this.cameras.main.setBackgroundColor(0xAAFFAA);

        this.nameInput = this.add.dom(840, 460).createFromCache("login_form");
        this.nameInput.visible = false;
            //login
        const loginButton = this.add.text(400, 350, 'Login', {fontSize: '32px', fill: '#000' });
        loginButton.setInteractive({
            useHandCursor: true
        });
        loginButton.on('pointerup', () => {  
            showLogin();
           
            //myThis.scene.start('Game');
         });
            //play game
        const playButton = this.add.text(400, 500, 'Just Play', {fontSize: '32px', fill: '#000' });
        playButton.setInteractive({
            useHandCursor: true
        });
        playButton.on('pointerup', () => {  
            this.game.config.level = 0;
            myThis.scene.start('Game'); 
        });
            //go to customization
        const custimizationButton = this.add.text(400, 650, 'Customization', {fontSize: '32px', fill: '#000' });
        custimizationButton.setInteractive({
            useHandCursor: true
        });
        custimizationButton.on('pointerup', () => {  myThis.scene.start('Customization') });
            //go to tutorial
        const tutorialButton = this.add.text(400, 800, 'Tutorial', {fontSize: '32px', fill: '#000' });
        tutorialButton.setInteractive({
            useHandCursor: true
        });
        tutorialButton.on('pointerup', () => {  
            this.game.config.level = 0;
            myThis.scene.start('Game');
        });
            //go to level 1
        const level1Button = this.add.text(1000, 400, 'Play Level 1', {fontSize: '32px', fill: '#000' });
        level1Button.setInteractive({
            useHandCursor: true
        });
        level1Button.on('pointerup', () => {  
            this.game.config.level = 1;
            myThis.scene.start('Game');
        });
            //go to level 2
        const level2Button = this.add.text(1000, 550, 'Play Level 2', {fontSize: '32px', fill: '#000' });
        level2Button.setInteractive({
            useHandCursor: true
        });
        level2Button.on('pointerup', () => { 
            this.game.config.level = 2;
            myThis.scene.start('Game');
        });
            //go to level 3
        const level3Button = this.add.text(1000, 700, 'Play Level 3', {fontSize: '32px', fill: '#000' });
        level3Button.setInteractive({
            useHandCursor: true
        });
        level3Button.on('pointerup', () => {  
            this.game.config.level = 3;
            myThis.scene.start('Game');
        });     
    
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        const loginBackground = this.add.rectangle(850, 550,900, 500, 0xffff00, 80);
        loginBackground.visible = false;
        const loginCancelButton = this.add.text(600, 700, "Cancel", {fontSize: '32px', fill: '#000'});
        loginCancelButton.setInteractive({
            useHandCursor: true
        });
        loginCancelButton.on('pointerup', () => {
            showHomePage();
        })
        const loginSubmitButton = this.add.text(800, 700, "Submit", {fontSize: '32px', fill: '#000'});
        loginSubmitButton.setInteractive({
            useHandCursor: true
        });
        loginSubmitButton.on('pointerup', () => {
            showHomePage();
        })
        loginSubmitButton.visible = false;
        loginCancelButton.visible = false;
        this.returnKey.on("down", event => {
            let username = this.nameInput.getChildByName("username_field");
            let password = this.nameInput.getChildByName("password_field");
            console.log("Username: " + username + "  password: " + password);
            if(username.value != "") {
                this.message.setText("Hello, " + username.value + "  " + password.value);
                username.value = "";
            }
        });

        function showLogin() {
            playButton.visible = false;
            custimizationButton.visible = false;
            level1Button.visible = false;
            level2Button.visible = false;
            level3Button.visible = false;
            tutorialButton.visible = false;
            betweenLevel.visible = false;
            loginBackground.visible = true;
            loginSubmitButton.visible = true;
            loginCancelButton.visible = true;
            myThis.nameInput.visible = true;
        }

        function showHomePage() {
            playButton.visible = true;
            custimizationButton.visible = true;
            level1Button.visible = true;
            level2Button.visible = true;
            level3Button.visible = true;
            tutorialButton.visible = true;
            betweenLevel.visible = true;
            loginBackground.visible = false;
            loginCancelButton.visible = false;
            loginSubmitButton.visible = false;
            myThis.nameInput.visible = false;

        }

        // this.add.text(20, 20, "loading123...")

        // setTimeout(() => {
        //     this.scene.start('Game')
        // }, 2000)

        //OLD??
            // const loginButton = this.dom.getChildByName("login_button");
        // const loginButton = document.getElementsByName("login_button");
        
        // console.log(loginButton);
        // // const logbutt = this.dom.getChildByName("login_button");
        // loginButton.button.on("click", event =>{
        //     console.log("got login");
        // })
        //loginButton.addEventListener('click', function(){console.log("login")});
        //loginButton.addEventListener("click", function(){console.log("login")});

        // this.message = this.add.text(640, 250, "Hello, --", {
        //     color: "#FFFFFF",
        //     fontSize: 60,
        //     fontStyle: "bold"
        // }).setOrigin(0.5);
    }

    

}