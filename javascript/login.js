export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('Login')
    }
    preload() {

       // this.load.html("login_form", "login.html");
        this.load.image('background', './main_screen.png');

    }
    create() {
        const myThis = this;


        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)
        // this.add.image(400, 300, 'background');

        this.cameras.main.setBackgroundColor(0xAAFFAA);

        //this.nameInput = this.add.dom(640, 460).createFromCache("login_form");
            //login
        const loginButton = this.add.text(400, 400, 'Login', {fontSize: '32px', fill: '#000' });
        loginButton.setInteractive();
        loginButton.on('pointerup', () => {  myThis.scene.start('Game') });
            //play game
        const playButton = this.add.text(400, 550, 'Just Play', {fontSize: '32px', fill: '#000' });
        playButton.setInteractive();
        playButton.on('pointerup', () => {  myThis.scene.start('Game') });
            //go to customization
        const custimizationButton = this.add.text(400, 700, 'Customization', {fontSize: '32px', fill: '#000' });
        custimizationButton.setInteractive();
        custimizationButton.on('pointerup', () => {  myThis.scene.start('Customization') });
            //go to tutorial
        const tutorialButton = this.add.text(400, 800, 'Tutorial', {fontSize: '32px', fill: '#000' });
        tutorialButton.setInteractive();
        tutorialButton.on('pointerup', () => {  myThis.scene.start('Tutorial') });
            //go to level 1
        const level1Button = this.add.text(1000, 400, 'Play Level 1', {fontSize: '32px', fill: '#000' });
        level1Button.setInteractive();
        level1Button.on('pointerup', () => {  myThis.scene.start('GameL1') });
            //go to level 2
        const level2Button = this.add.text(1000, 550, 'Play Level 2', {fontSize: '32px', fill: '#000' });
        level2Button.setInteractive();
        level2Button.on('pointerup', () => {  myThis.scene.start('GameL2') });
            //go to level 3
        const level3Button = this.add.text(1000, 700, 'Play Level 3', {fontSize: '32px', fill: '#000' });
        level3Button.setInteractive();
        level3Button.on('pointerup', () => {  myThis.scene.start('GameL3') });

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
    
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


        // this.returnKey.on("down", event => {
        //     let username = this.nameInput.getChildByName("username_field");
        //     let password = this.nameInput.getChildByName("password_field");
        //     console.log("Username: " + username + "  password: " + password);
        //     if(username.value != "") {
        //         this.message.setText("Hello, " + username.value + "  " + password.value);
        //         username.value = "";
        //     }
        // });


        // this.add.text(20, 20, "loading123...")

        // setTimeout(() => {
        //     this.scene.start('Game')
        // }, 2000)
    }

}