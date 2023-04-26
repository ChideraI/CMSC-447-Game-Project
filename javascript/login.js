export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('Login')
    }
    preload() {

        this.load.html("login_form", "login.html");

    }
    create() {
        const myThis = this;
        this.cameras.main.setBackgroundColor(0xAAFFAA);

        this.nameInput = this.add.dom(640, 460).createFromCache("login_form");

        const loginButton = this.add.text(100, 100, 'Login', {fontSize: '32px', fill: '#000' });
        loginButton.setInteractive();
        loginButton.on('pointerup', () => {  myThis.scene.start('Game') });
        const playButton = this.add.text(100, 300, 'Just Play', {fontSize: '32px', fill: '#000' });
        playButton.setInteractive();
        playButton.on('pointerup', () => {  myThis.scene.start('Game') });
        // const loginButton = this.dom.getChildByName("login_button");
        // const loginButton = document.getElementsByName("login_button");
        
        // console.log(loginButton);
        // // const logbutt = this.dom.getChildByName("login_button");
        // loginButton.button.on("click", event =>{
        //     console.log("got login");
        // })
        //loginButton.addEventListener('click', function(){console.log("login")});
        //loginButton.addEventListener("click", function(){console.log("login")});

        this.message = this.add.text(640, 250, "Hello, --", {
            color: "#FFFFFF",
            fontSize: 60,
            fontStyle: "bold"
        }).setOrigin(0.5);
    
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
        this.returnKey.on("down", event => {
            let username = this.nameInput.getChildByName("username_field");
            let password = this.nameInput.getChildByName("password_field");
            console.log("Username: " + username + "  password: " + password);
            if(username.value != "") {
                this.message.setText("Hello, " + username.value + "  " + password.value);
                username.value = "";
            }
        });


        // this.add.text(20, 20, "loading123...")

        // setTimeout(() => {
        //     this.scene.start('Game')
        // }, 2000)
    }

}