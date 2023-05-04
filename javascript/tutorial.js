export default class TutorialScene extends Phaser.Scene {


    //var game = new Phaser.Game(config);
    constructor() {
        super("Tutorial");
        // let logged_in = false;
        // let score = 0;
        // let scoreText;
        // let water_count = 0;
        // let fert_count = 0;
        // let recipe_counter = 0;
        // let cur_pot;
        // let cur_soil;
        // let cur_seed;
        // let cur_plant;
    }
    
    preload ()
    {
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
        let score = 0;
        let scoreText;
        let water_count = 0;
        let fert_count = 0;
        let recipe_counter = 0;
        let cur_pot;
        let cur_soil;
        let cur_seed;
        let cur_plant;
        let cur_base;
    
        //First, put up log in/new account screen
        
        this.cameras.main.setBackgroundColor(0xAAFFAA);
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
        let soil2 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 250, 'soil').setTint(0xFFF000).setScale(0.2).setInteractive();

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

    
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    
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
        });
    
        this.input.on('dragstart', function (pointer, gameObject) {/*gameObject.setTint(0xEEEEEE);*/});
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    
        //When dropping object into zone, move object and update score
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            //gameObject.disableBody(true, true);
            if(pots.contains(gameObject)){
                gameObject.y = dropZone.y + 100;
            }
    
            else if(soils.contains(gameObject)){
                gameObject.y = dropZone.y + 25;
            }
    
            else if(waters.contains(gameObject)){
                gameObject.y = dropZone.y - 100;
            }
    
            else if(ferts.contains(gameObject)){
                gameObject.y = dropZone.y - 50;
            }
    
         // });
    //NOTE: dragend only fires on drop outside of drop target. Do the function on "drop" event.
        // this.input.on('dragend', function (pointer, gameObject) {
            if(pots.contains(gameObject)){
                cur_pot = gameObject;
            }else if(soils.contains(gameObject)){
                cur_soil = gameObject;
            }else if(seeds.contains(gameObject)){
                cur_seed = gameObject;
            }else if(waters.contains(gameObject)){
                water_count += 1;
                gameObject.visible = false;  
            }else if (ferts.contains(gameObject)){
                fert_count += 1;
                gameObject.visible = false;
            }
    
            //Flowers
            if(cur_soil == soil1 && cur_seed == seed1){
                seed1.visible = false;
                soil1.visible = false;
                cur_base = stem;
                cur_plant = sunf;
                cur_base.visible = true;
                cur_plant.visible = true;
            }else if(cur_soil == soil2 && cur_seed == seed1){
                seed1.visible = false;
                soil2.visible = false;
                cur_base = stem;
                cur_plant = rose;
                cur_base.visible = true;
                cur_plant.visible = true;
            }             

            //Update score on screen
            scoreText.setText('Score: ' + score);

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
    }
    }