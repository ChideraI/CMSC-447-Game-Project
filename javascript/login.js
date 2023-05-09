export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('Login')
    }
    preload() {

       this.load.html("login_form", "login.html");
        this.load.image('background', './main_screen.png');
        this.load.image('button1', 'assets/kisspng-button-glass-clip-art-botwtoon-5b0b1141547751.187244581527451969346.png');
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

        this.nameInput = this.add.dom(840, 530).createFromCache("login_form");  
        this.nameInput.visible = false;
         
        /////////////////////BUTTON BACKGROUNDS     
        //login
        const loginButtonBg1 = this.add.image(445, 365, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg1.on('pointerup', () => {
            showLogin();
        });

        //play
        const loginButtonBg2 = this.add.image(445, 500, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg2.on('pointerup', () => {  
            this.game.config.level = 1;
            myThis.scene.start('Game');
        });

        //customization
        const loginButtonBg3 = this.add.image(445, 650, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg3.on('pointerup', () => {  myThis.scene.start('Customization') });

        //tutorial
        const loginButtonBg4 = this.add.image(445, 800, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg4.on('pointerup', () => {  
            this.game.config.level = 0;
            myThis.scene.start('Game');
        });

        //level 1
        const loginButtonBg5 = this.add.image(1100, 400, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg5.on('pointerup', () => {  
            this.game.config.level = 1;
            myThis.scene.start('Game'); 
        });

        //level 2
        const loginButtonBg6 = this.add.image(1100, 550, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg6.on('pointerup', () => { 
            this.game.config.level = 2;
            myThis.scene.start('Game');
        });

        //level3
        const loginButtonBg7 = this.add.image(1100, 700, 'button1').setScale(0.30).setInteractive({
            useHandCursor: true
        });
        loginButtonBg7.on('pointerup', () => {  
            this.game.config.level = 3;
            myThis.scene.start('Game');
        });     

        /////////BUTTON STYLE
        const buttonStyle =  {fontSize: '32px', fontFamily:'cursive', fontWeight:'bolder'};
        
        
        /////////////////////////TEXT BUTTONS
              //LOGIN
         const loginButton = this.add.text(400, 350, 'Login', buttonStyle);
         loginButton.setInteractive({
            useHandCursor: true
        });
        loginButton.on('pointerup', () => {  
            showLogin();                          
         });

         
            //PLAY game
        const playButton = this.add.text(375, 485, 'Just Play', buttonStyle);
        playButton.setInteractive({
            useHandCursor: true
        });
        playButton.on('pointerup', () => {  
            this.game.config.level = 1;
            myThis.scene.start('Game'); 
        });
            //go to CUSTOMIZATION
        const custimizationButton = this.add.text(345, 630, 'Customization', buttonStyle);
        custimizationButton.setInteractive({
            useHandCursor: true
        });
        custimizationButton.on('pointerup', () => {  myThis.scene.start('Customization') });
            //go to TUTORIAL
        const tutorialButton = this.add.text(385, 780, 'Tutorial', buttonStyle);
        tutorialButton.setInteractive({
            useHandCursor: true
        });
        tutorialButton.on('pointerup', () => {  
            this.game.config.level = 0;
            myThis.scene.start('Game');
        });
            //go to LEVEL 1
        const level1Button = this.add.text(1017, 385, 'Play Level 1', buttonStyle);
        level1Button.setInteractive({
            useHandCursor: true
        });
        level1Button.on('pointerup', () => {  
            this.game.config.level = 1;
            myThis.scene.start('Game');
        });
            //go to LEVEL 2
        const level2Button = this.add.text(1017, 535, 'Play Level 2', buttonStyle);
        level2Button.setInteractive({
            useHandCursor: true
        });
        level2Button.on('pointerup', () => { 
            this.game.config.level = 2;
            myThis.scene.start('Game');
        });
            //go to LEVEL 3
        const level3Button = this.add.text(1017, 685, 'Play Level 3', buttonStyle);
        level3Button.setInteractive({
            useHandCursor: true
        });
        level3Button.on('pointerup', () => {  
            this.game.config.level = 3;
            myThis.scene.start('Game');
        });     
                              //LOGIN  POP UP INFO
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        const loginBackground = this.add.rectangle(850, 550,900, 500, 0xffff00, 80);
        loginBackground.visible = false;
        const loginCancelButton = this.add.text(500, 700, "Cancel", buttonStyle);
        loginCancelButton.setInteractive({
            useHandCursor: true
        });
        loginCancelButton.on('pointerup', () => {
            showHomePage();
        })
        const loginText = this.add.text(800, 375, 'Login', buttonStyle);
        const loginSubmitButton = this.add.text(700, 700, "Submit", buttonStyle);
        loginSubmitButton.setInteractive({
            useHandCursor: true
        });
        loginSubmitButton.on('pointerup', () => {
            let username = this.nameInput.getChildByName("username_field").value;
            let password = this.nameInput.getChildByName("password_field").value;
            console.log("LOGIN SUBMIT:  Username: " + username + "  password: " + password);
            // DANIEL, database code for LOGIN goes here (part 1 of 2 see below)
            showHomePage();
        })
        const createAccountButton = this.add.text(900, 700, "Create Account", buttonStyle);
        createAccountButton.setInteractive({
            useHandCursor: true
        });
        createAccountButton.on('pointerup', () => {
            let username = this.nameInput.getChildByName("username_field").value;
            let password = this.nameInput.getChildByName("password_field").value;
            console.log("CREATE USER:  Username: " + username + "  password: " + password);
            ///DANIEL, data base code for CREATE ACCOUNT goes here (part 2 of 2 see above)
            showHomePage();
        })
        loginSubmitButton.visible = false;
        loginCancelButton.visible = false;
        createAccountButton.visible = false;
        loginText.visible = false;

        // this.returnKey.on("down", event => {
        //     console.log(this.nameInput);
        //     console.log(this.nameInput.getChildByName("username_field"));
        //     let username = this.nameInput.getChildByName("username_field").value;
        //     let password = this.nameInput.getChildByName("password_field").value;
        //     console.log("Username: " + username + "  password: " + password);
        //     if(username.value != "") {
        //         //this.message.setText("Hello, " + username.value + "  " + password.value);
        //         console.log("Username: " + username + "  password: " + password);

        //         //username.value = "";

        //     }
        // });

        function showLogin() {
            loginButton.visible = false;
            playButton.visible = false;
            custimizationButton.visible = false;
            level1Button.visible = false;
            level2Button.visible = false;
            level3Button.visible = false;
            tutorialButton.visible = false;
            loginButtonBg1.visible = false;
            loginButtonBg2.visible = false;
            loginButtonBg3.visible = false;
            loginButtonBg4.visible = false;
            loginButtonBg5.visible = false;
            loginButtonBg6.visible = false;
            loginButtonBg6.visible = false;
            loginButtonBg7.visible = false;
            loginBackground.visible = true;
            loginSubmitButton.visible = true;
            loginCancelButton.visible = true;
            createAccountButton.visible = true;
            loginText.visible = true;
            myThis.nameInput.visible = true;
        }

        function showHomePage() {
            loginButton.visible = true;
            playButton.visible = true;
            custimizationButton.visible = true;
            level1Button.visible = true;
            level2Button.visible = true;
            level3Button.visible = true;
            tutorialButton.visible = true;         
            loginButtonBg1.visible = true;
            loginButtonBg2.visible = true;
            loginButtonBg3.visible = true;
            loginButtonBg4.visible = true;
            loginButtonBg5.visible = true;
            loginButtonBg6.visible = true;
            loginButtonBg6.visible = true;
            loginButtonBg7.visible = true;
            loginBackground.visible = false;
            loginCancelButton.visible = false;
            loginSubmitButton.visible = false;
            createAccountButton.visible = false;
            loginText.visible = false;
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