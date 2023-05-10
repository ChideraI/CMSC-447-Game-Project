export default class Tutorial extends Phaser.Scene{

    constructor() {
        super("Tutorial");
    }
    
    preload ()
    {
        this.load.image('background', './main_screen.png');
        this.load.image('pot', 'assets/pot.png');
        this.load.image('stem', 'assets/flower_stem.png');
        this.load.image('sunflower', 'assets/sunflower.png');
        this.load.image('rose', 'assets/rose.png');
        this.load.image('water', 'assets/water.png');
        this.load.image('fertilizer', 'assets/fertilizer.png');
        this.load.image('soil', 'assets/soil.png');
        this.load.image('seeds', 'assets/seeds.png');
        this.load.image('recipes', 'assets/recipe_book.png');
        this.load.image('open_book', 'assets/open_book.png');
        this.load.image('x', 'assets/x.png');
    }
    
    create ()
    {
        let logged_in = false;
        let water_count = 0;
        let fert_count = 0;
        let recipe_counter = 0;
        let cur_pot;
        let cur_soil;
        let cur_seed;
        let cur_plant;
        let cur_base;

        let pot;
        let soil;
        let seed;

        //First, put up log in/new account screen
        const myThis = this;

        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        let scaleX = (this.cameras.main.width / image.width);
        let scaleY = (this.cameras.main.height / image.height);
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        const loginButton = this.add.text(50, 50, 'Main Menu', {fontSize: '32px', fill: '#000' });
        loginButton.setInteractive();
        loginButton.on('pointerup', () => {  myThis.scene.start('Login') });
    
        //this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky').setScale(2);
        //this.add.image(400, 300, 'star');
        let stem = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'stem');
        stem.visible = false;

        let sunf = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'sunflower');
        sunf.visible = false;

        let rose = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'rose');
        rose.visible = false;
    
    
        //Soil
        let soils = this.add.group();
        let soilText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Soil', { fontSize: '32px', fill: '#000' });

        let soil1 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 100, 'soil').setScale(0.2).setInteractive();
        let soil2 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 200, 'soil').setTint(0xFFF000).setScale(0.2).setInteractive();

        this.input.setDraggable(soil1);
        this.input.setDraggable(soil2);
    
        //Seeds
        let seeds = this.add.group();
        let seedText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 2, 'Seeds', { fontSize: '32px', fill: '#000' });
        let seed1 = seeds.create(this.cameras.main.width / 6, this.cameras.main.height / 2 + 100, 'seeds').setScale(0.2).setInteractive();
        this.input.setDraggable(seed1);
    
        //Pots
        let pots = this.add.group();
        let potText = this.add.text(this.cameras.main.width / 2 - 50, 3*this.cameras.main.height / 4 - 25, 'Pots', { fontSize: '32px', fill: '#000' });
        //Pot 1
        let pot1 = pots.create(this.cameras.main.width / 2 - 75, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setInteractive();
        this.input.setDraggable(pot1);
        
        //Pot 2
        let pot2 = pots.create(this.cameras.main.width / 2 + 75, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0x555555).setInteractive();
        this.input.setDraggable(pot2);
    
        //Water droplets
        let waters = this.add.group();
        let waterText = this.add.text(5*this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Water', { fontSize: '32px', fill: '#000' });
        //Drop 1
        let drop1 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 75, 'water').setScale(0.1).setInteractive();
        this.input.setDraggable(drop1);
        //Drop 2
        let drop2 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 150, 'water').setScale(0.1).setInteractive();
        this.input.setDraggable(drop2);

    
        //Fertilizer
        let ferts = this.add.group();
        let fertText = this.add.text(5*this.cameras.main.width / 6 - 100, this.cameras.main.height / 2, 'Fertilizer', { fontSize: '32px', fill: '#000' });
        //Fertilizer 1
        let fert1 = ferts.create(5*this.cameras.main.width / 6, this.cameras.main.height / 2 + 100, 'fertilizer').setScale(0.2).setInteractive();
        this.input.setDraggable(fert1);
    
        //  A drop zone
        let zone = this.add.zone(this.cameras.main.width / 2, this.cameras.main.height / 2, 300, 300).setRectangleDropZone(300, 300);
    
        //  Just a visual display of the drop zone
        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        //Recipe Book open and close
        let book = this.add.image(this.cameras.main.width - 100, 75, 'recipes').setScale(0.35).setInteractive();
        let recipes = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'open_book').setScale(0.7);
        let close_button = this.add.image(1350, 80, 'x').setScale(0.2).setInteractive();

        //Sunflower recipe variables
        let r1soil = this.add.image(400, 100, 'soil').setScale(0.15);
        let r1seed = this.add.image(575, 100, 'seeds').setScale(0.15);
        let r1base = this.add.image(725, 100, 'stem').setScale(0.5);
        let r1plant = this.add.image(725, 100, 'sunflower').setScale(0.5);
        let r1text = this.add.text(475, 75, '+     =', { fontSize: '48px', fill: '#000' });
        r1soil.visible = false;
        r1seed.visible = false;
        r1base.visible = false;
        r1plant.visible = false;
        r1text.visible = false;

        //Rose recipe variables
        let r2soil = this.add.image(400, 225, 'soil').setTint(0xFFF000).setScale(0.15);
        let r2seed = this.add.image(575, 225, 'seeds').setScale(0.15);
        let r2base = this.add.image(725, 225, 'stem').setScale(0.5);
        let r2plant = this.add.image(725, 225, 'rose').setScale(0.5);
        let r2text = this.add.text(475, 200, '+     =', { fontSize: '48px', fill: '#000' });
        r2soil.visible = false;
        r2seed.visible = false;
        r2base.visible = false;
        r2plant.visible = false;
        r2text.visible = false;

        //Hide book variables initially
        recipes.visible = false;
        close_button.visible = false;

        let tutorial1 = this.add.text(500, 75, 'Welcome to the plant making screen!', {fontSize: '32px', fill: '#000' });
        let tutorial2 = this.add.text(400, 150, 'First, select the pot the customer wanted from the options below and drag it to the oven.', {fontSize: '24px', fill: '#000' });
        let tutorial3 = this.add.text(450, 75, 'Great! Remember what plant the customer ordered? It was a rose!', {fontSize: '28px', fill: '#000' });
        let tutorial4 = this.add.text(500, 150, 'Click on the recipe book to see how to make a rose.', {fontSize: '28px', fill: '#000' });
        let tutorial5 = this.add.text(550, 300, 'Welcome to the receipe book!', {fontSize: '28px', fill: '#000' });
        let tutorial6 = this.add.text(400, 400, 'Here you can see what soil and seed combinations make each plant.', {fontSize: '24px', fill: '#000' });
        let tutorial7 = this.add.text(300, 500, 'But be careful! A small amount of your tips will be taken off each time you open it.', {fontSize: '24px', fill: '#000' });
        let tutorial8 = this.add.text(400, 75, 'Great! Now we know what soil and seeds we need.', {fontSize: '28px', fill: '#000' });
        let tutorial9 = this.add.text(500, 150, 'First, drag the necessary soil to the pot.', {fontSize: '24px', fill: '#000' });
        let tutorial10 = this.add.text(400, 75, 'Good job! Now drag the seeds to the pot to make the plant.', {fontSize: '28px', fill: '#000' });
        let tutorial11 = this.add.text(550, 75, 'Look, a rose!', {fontSize: '28px', fill: '#000' });
        let tutorial12 = this.add.text(400, 150, 'Next, we need to add some color.', {fontSize: '28px', fill: '#000' });
        let tutorial13 = this.add.text(400, 225, 'Add one drop of water and see what color the rose becomes.', {fontSize: '24px', fill: '#000' });
        let tutorial14 = this.add.text(550, 75, 'Perfect! Looks like the color we needed.', {fontSize: '28px', fill: '#000' });
        let tutorial15 = this.add.text(400, 150, 'Adding more water changes the color of the plants.', {fontSize: '24px', fill: '#000' });
        let tutorial16 = this.add.text(400, 225, 'Now add the fertilzier.', {fontSize: '24px', fill: '#000' });
        let tutorial17 = this.add.text(550, 75, 'Looks great!', {fontSize: '28px', fill: '#000' });
        let tutorial18 = this.add.text(400, 150, 'Adding more fertilizer increases the size of the plants.', {fontSize: '24px', fill: '#000' });
        let tutorial19 = this.add.text(400, 225, 'Our plant is ready to go! Click the \'Make Plant\' button to give it to the customer.', {fontSize: '24px', fill: '#000' });
        
        if(this.game.config.ccustomer == 1){
            tutorial1.visible = true;
            tutorial2.visible = true;
        }else{
            tutorial1.visible = false;
            tutorial2.visible = false;
        }
        tutorial3.visible = false;
        tutorial4.visible = false;
        tutorial5.visible = false;
        tutorial6.visible = false;
        tutorial7.visible = false;
        tutorial8.visible = false;
        tutorial9.visible = false;
        tutorial10.visible = false;
        tutorial11.visible = false;
        tutorial12.visible = false;
        tutorial13.visible = false;
        tutorial14.visible = false;
        tutorial15.visible = false;
        tutorial16.visible = false;
        tutorial17.visible = false;
        tutorial18.visible = false;
        tutorial19.visible = false;
    
        //Show book variables once clicked
        book.on('pointerdown', function(pointer){
            recipes.visible = true;
            close_button.visible = true;
            r1soil.visible = true;
            r1seed.visible = true;
            r1base.visible = true;
            r1plant.visible = true;
            r1text.visible = true;

            r2soil.visible = true;
            r2seed.visible = true;
            r2base.visible = true;
            r2plant.visible = true;
            r2text.visible = true;

            tutorial1.visible = false;
            tutorial2.visible = false;
            tutorial3.visible = false;
            tutorial4.visible = false;
            tutorial5.visible = true;
            tutorial6.visible = true;
            tutorial7.visible = true;

            recipe_counter += 1;
        });

        //Hide book again after close button is clicked
        close_button.on('pointerdown', function(pointer){
            recipes.visible = false;
            close_button.visible = false;

            r1soil.visible = false;
            r1seed.visible = false;
            r1base.visible = false;
            r1plant.visible = false;
            r1text.visible = false;

            r2soil.visible = false;
            r2seed.visible = false;
            r2base.visible = false;
            r2plant.visible = false;
            r2text.visible = false;

            tutorial5.visible = false;
            tutorial6.visible = false;
            tutorial7.visible = false;
            tutorial8.visible = true;
            tutorial9.visible = true;
        });
    
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
            //gameObject.disableBody(true, true);
            if(pots.contains(gameObject)){
                gameObject.y = dropZone.y + 100;
                pot1.disableInteractive();
                pot2.disableInteractive();
            }
    
            else if(soils.contains(gameObject)){
                gameObject.y = dropZone.y + 25;
                soil1.disableInteractive();
                soil2.disableInteractive();
            }

            else if (seeds.contains(gameObject)){
                seed1.disableInteractive();
            }
    
            if(pots.contains(gameObject)){
                cur_pot = gameObject;
                if(cur_pot == pot1){
                    pot = 1;
                }else{
                    pot = 2;
                }
                tutorial1.visible = false;
                tutorial2.visible = false;
                tutorial3.visible = true;
                tutorial4.visible = true;
            }else if(soils.contains(gameObject)){
                cur_soil = gameObject;
                tutorial8.visible = false;
                tutorial9.visible = false;
                tutorial10.visible = true;
            }else if(seeds.contains(gameObject)){
                cur_seed = gameObject;
                tutorial10.visible = false;
                tutorial11.visible = true;
                tutorial12.visible = true;
                tutorial13.visible = true;
            }else if(waters.contains(gameObject)){
                water_count += 1;
                gameObject.visible = false;
                tutorial11.visible = false;
                tutorial12.visible = false;
                tutorial13.visible = false;
                tutorial14.visible = true;
                tutorial15.visible = true;
                tutorial16.visible = true;
            }else if (ferts.contains(gameObject)){
                fert_count += 1;
                gameObject.visible = false;
                tutorial14.visible = false;
                tutorial15.visible = false;
                tutorial16.visible = false;
                tutorial17.visible = true;
                tutorial18.visible = true;
                tutorial19.visible = true;
            }
    
            //Flowers
            if(cur_soil == soil1 && cur_seed == seed1){
                seed1.visible = false;
                soil1.visible = false;
                cur_base = stem;
                cur_plant = sunf;
                cur_base.visible = true;
                cur_plant.visible = true;
                soil = 1;
                seed = 1;
            }else if(cur_soil == soil2 && cur_seed == seed1){
                seed1.visible = false;
                soil2.visible = false;
                cur_base = stem;
                cur_plant = rose;
                cur_base.visible = true;
                cur_plant.visible = true;
                soil = 2;
                seed = 1;
            }             

            if(water_count == 1 && waters.contains(gameObject)){
                cur_base.setTint(0x003300);
                cur_plant.setTint(0xFF0000);
            }
            else if(water_count == 2 && waters.contains(gameObject)){
                cur_base.setTint(0x009900);
                cur_plant.setTint(0xFF00FF);
            }
    
            if(fert_count == 1 && ferts.contains(gameObject)){
                cur_base.setScale(1.25);
                cur_plant.setScale(1.25);
                cur_plant.y -= 30;
                cur_base.y -= 30;
            }
        });

        const submitButton = this.add.text(this.cameras.main.width / 2 + 500, 800, 'Make Plant', {fontSize: '32px', fill: '#000' });
        submitButton.setInteractive();
        submitButton.on('pointerup', () => {
            if(pot == this.game.config.cpot){
                this.game.config.cscore += 0.5;
            }
            if(soil == this.game.config.csoil){
                this.game.config.cscore += 1;
            }
            if(seed == this.game.config.cseed){
                this.game.config.cscore += 1;
            }
            if(water_count == this.game.config.cwater){
                this.game.config.cscore += 0.5;
            }
            if(fert_count == this.game.config.cfertilizer){
                this.game.config.cscore += 0.5;
            }
            this.game.config.cscore -= 0.1 * recipe_counter;

            if(this.game.config.cscore < 0){
                this.game.config.cscore = 0;
            }

            myThis.scene.start('Score');
        });
    }
}