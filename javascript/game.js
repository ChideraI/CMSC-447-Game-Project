export default class GameScene extends Phaser.Scene {


    //var game = new Phaser.Game(config);
    constructor() {
        super("Game");
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
        this.load.image('tulip', 'assets/tulip.png');
        this.load.image('cactus', 'assets/cactus.png');
        this.load.image('cactus_flower', 'assets/cactus_flower.png');
        this.load.image('succulent1', 'assets/cactus_stem.png');
        this.load.image('succulent2', 'assets/succulent.png');
        this.load.image('carrot', 'assets/carrot.png');
        this.load.image('carrot_leaves', 'assets/carrot_leaves.png');
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

        let tulip = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'tulip');
        tulip.visible = false;

        //Add 3 cacti
        let cactus = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'cactus');
        cactus.visible = false;

        let cactus_flower = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'cactus_flower');
        cactus_flower.visible = false;

        let succulent1 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'succulent1');
        succulent1.visible = false;

        let succulent2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'succulent2');
        succulent2.visible = false;

        //Add 3 fruits/vegetables: carrot, tomato, lettuce??
        let carrot = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'carrot');
        carrot.visible = false;

        let carrot_leaves = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'carrot_leaves');
        carrot_leaves.visible = false;

        //Add 3 herbs: basil, rosemary, uhhhhhhh
    
    
        //Soil
        let soils = this.add.group();
        let soilText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Soil', { fontSize: '32px', fill: '#000' });

        let soil1 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 100, 'soil').setScale(0.2).setInteractive();
        let soil2 = soils.create(this.cameras.main.width / 6 - 100, this.cameras.main.height / 6 + 200, 'soil').setTint(0xFFF000).setScale(0.2).setInteractive();
        let soil3 = soils.create(this.cameras.main.width / 6 + 100, this.cameras.main.height / 6 + 200, 'soil').setTint(0x000FFF).setScale(0.2).setInteractive();

        this.input.setDraggable(soil1);
        this.input.setDraggable(soil2);
        this.input.setDraggable(soil3);
    
        //Seeds
        let seeds = this.add.group();
        let seedText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 2, 'Seeds', { fontSize: '32px', fill: '#000' });
        let seed1 = seeds.create(this.cameras.main.width / 6 - 75, this.cameras.main.height / 2 + 100, 'seeds').setScale(0.2).setInteractive();
        this.input.setDraggable(seed1);
        let seed2 = seeds.create(this.cameras.main.width / 6 - 75, this.cameras.main.height / 2 + 200, 'seeds').setTint(0x00FF00).setScale(0.2).setInteractive();
        this.input.setDraggable(seed2);
        let seed3 = seeds.create(this.cameras.main.width / 6 + 75, this.cameras.main.height / 2 + 100, 'seeds').setTint(0x0000FF).setScale(0.2).setInteractive();
        this.input.setDraggable(seed3);
        let seed4 = seeds.create(this.cameras.main.width / 6 + 75, this.cameras.main.height / 2 + 200, 'seeds').setTint(0xFF0000).setScale(0.2).setInteractive();
        this.input.setDraggable(seed4);
    
        //Pots
        let pots = this.add.group();
        let potText = this.add.text(this.cameras.main.width / 2 - 50, 3*this.cameras.main.height / 4 - 25, 'Pots', { fontSize: '32px', fill: '#000' });
        //Pot 1
        let pot1 = pots.create(this.cameras.main.width / 2 - 300, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setInteractive();
        this.input.setDraggable(pot1);
        //Pot 2
        let pot2 = pots.create(this.cameras.main.width / 2 - 150, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0x555555).setInteractive();
        this.input.setDraggable(pot2);
        //Pot 3
        let pot3 = pots.create(this.cameras.main.width / 2, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0x00FFF0).setInteractive();
        this.input.setDraggable(pot3);
        //Pot 4
        let pot4 = pots.create(this.cameras.main.width / 2 + 150, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0xAA11FF).setInteractive();
        this.input.setDraggable(pot4);
        //Pot 5
        let pot5 = pots.create(this.cameras.main.width / 2 + 300, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0x11111).setInteractive();
        this.input.setDraggable(pot5);
    
        //Water droplets
        let waters = this.add.group();
        let waterText = this.add.text(5*this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Water', { fontSize: '32px', fill: '#000' });
        //Drop 1
        let drop1 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 75, 'water').setScale(0.1).setInteractive();
        this.input.setDraggable(drop1);
        //Drop 2
        let drop2 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 150, 'water').setScale(0.1).setInteractive();
        this.input.setDraggable(drop2);
        //Drop 3
        let drop3 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 225, 'water').setScale(0.1).setInteractive();
        this.input.setDraggable(drop3);
    
        //Fertilizer
        let ferts = this.add.group();
        let fertText = this.add.text(5*this.cameras.main.width / 6 - 100, this.cameras.main.height / 2, 'Fertilizer', { fontSize: '32px', fill: '#000' });
        //Fertilizer 1
        let fert1 = ferts.create(5*this.cameras.main.width / 6, this.cameras.main.height / 2 + 100, 'fertilizer').setScale(0.2).setInteractive();
        this.input.setDraggable(fert1);
        //Fertilizer 2
        let fert2 = ferts.create(5*this.cameras.main.width / 6 - 100, this.cameras.main.height / 2 + 225, 'fertilizer').setScale(0.2).setInteractive();
        this.input.setDraggable(fert2);
        //Fertilizer 3
        let fert3 = ferts.create(5*this.cameras.main.width / 6 + 100, this.cameras.main.height / 2 + 225, 'fertilizer').setScale(0.2).setInteractive();
        this.input.setDraggable(fert3);
    
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

        //Tulip recipe variables
        let r3soil = this.add.image(400, 350, 'soil').setTint(0x000FFF).setScale(0.15);
        let r3seed = this.add.image(575, 350, 'seeds').setScale(0.15);
        let r3base = this.add.image(725, 350, 'stem').setScale(0.5);
        let r3plant = this.add.image(725, 350, 'tulip').setScale(0.5);
        let r3text = this.add.text(475, 325, '+     =', { fontSize: '48px', fill: '#000' });
        r3soil.visible = false;
        r3seed.visible = false;
        r3base.visible = false;
        r3plant.visible = false;
        r3text.visible = false;

        //Cactus Flower recipe variables
        let r4soil = this.add.image(400, 475, 'soil').setScale(0.15);
        let r4seed = this.add.image(575, 475, 'seeds').setTint(0x00FF00).setScale(0.15);
        let r4base = this.add.image(725, 475, 'cactus').setScale(0.5);
        let r4plant = this.add.image(725, 475, 'cactus_flower').setScale(0.5);
        let r4text = this.add.text(475, 450, '+     =', { fontSize: '48px', fill: '#000' });
        r4soil.visible = false;
        r4seed.visible = false;
        r4base.visible = false;
        r4plant.visible = false;
        r4text.visible = false;

        //Succulent #1 recipe variables
        let r5soil = this.add.image(400, 600, 'soil').setTint(0xFFF000).setScale(0.15);
        let r5seed = this.add.image(575, 600, 'seeds').setTint(0x00FF00).setScale(0.15);
        let r5base = this.add.image(725, 600, 'succulent1').setScale(0.5);
        let r5plant = this.add.image(725, 600, 'succulent1').setScale(0.5);
        let r5text = this.add.text(475, 575, '+     =', { fontSize: '48px', fill: '#000' });
        r5soil.visible = false;
        r5seed.visible = false;
        r5base.visible = false;
        r5plant.visible = false;
        r5text.visible = false;

        //Succulent #2 recipe variables
        let r6soil = this.add.image(400, 725, 'soil').setTint(0x000FFF).setScale(0.15);
        let r6seed = this.add.image(575, 725, 'seeds').setTint(0x00FF00).setScale(0.15);
        let r6base = this.add.image(725, 725, 'succulent2').setScale(0.5);
        let r6plant = this.add.image(725, 725, 'succulent2').setScale(0.5);
        let r6text = this.add.text(475, 700, '+     =', { fontSize: '48px', fill: '#000' });
        r6soil.visible = false;
        r6seed.visible = false;
        r6base.visible = false;
        r6plant.visible = false;
        r6text.visible = false;

        //Carrot recipe variables
        let r7soil = this.add.image(950, 100, 'soil').setScale(0.15);
        let r7seed = this.add.image(1125, 100, 'seeds').setTint(0x0000FF).setScale(0.15);
        let r7base = this.add.image(1275, 100, 'carrot_leaves').setScale(0.5);
        let r7plant = this.add.image(1275, 100, 'carrot').setScale(0.5);
        let r7text = this.add.text(1025, 75, '+     =', { fontSize: '48px', fill: '#000' });
        r7soil.visible = false;
        r7seed.visible = false;
        r7base.visible = false;
        r7plant.visible = false;
        r7text.visible = false;

        //Rose recipe variables
        let r8soil = this.add.image(950, 225, 'soil').setTint(0xFFF000).setScale(0.15);
        let r8seed = this.add.image(1125, 225, 'seeds').setTint(0x0000FF).setScale(0.15);
        let r8base = this.add.image(1275, 225, 'stem').setScale(0.5);
        let r8plant = this.add.image(1275, 225, 'rose').setScale(0.5);
        let r8text = this.add.text(1025, 200, '+     =', { fontSize: '48px', fill: '#000' });
        r8soil.visible = false;
        r8seed.visible = false;
        r8base.visible = false;
        r8plant.visible = false;
        r8text.visible = false;

        //Tulip recipe variables
        let r9soil = this.add.image(950, 350, 'soil').setTint(0x000FFF).setScale(0.15);
        let r9seed = this.add.image(1125, 350, 'seeds').setTint(0x0000FF).setScale(0.15);
        let r9base = this.add.image(1275, 350, 'stem').setScale(0.5);
        let r9plant = this.add.image(1275, 350, 'tulip').setScale(0.5);
        let r9text = this.add.text(1025, 325, '+     =', { fontSize: '48px', fill: '#000' });
        r9soil.visible = false;
        r9seed.visible = false;
        r9base.visible = false;
        r9plant.visible = false;
        r9text.visible = false;

        //Cactus #1 recipe variables
        let r10soil = this.add.image(950, 475, 'soil').setScale(0.15);
        let r10seed = this.add.image(1125, 475, 'seeds').setTint(0xFF0000).setScale(0.15);
        let r10base = this.add.image(1275, 475, 'stem').setScale(0.5);
        let r10plant = this.add.image(1275, 475, 'sunflower').setScale(0.5);
        let r10text = this.add.text(1025, 450, '+     =', { fontSize: '48px', fill: '#000' });
        r10soil.visible = false;
        r10seed.visible = false;
        r10base.visible = false;
        r10plant.visible = false;
        r10text.visible = false;

        //Cactus #2 recipe variables
        let r11soil = this.add.image(950, 600, 'soil').setTint(0xFFF000).setScale(0.15);
        let r11seed = this.add.image(1125, 600, 'seeds').setTint(0xFF0000).setScale(0.15);
        let r11base = this.add.image(1275, 600, 'stem').setScale(0.5);
        let r11plant = this.add.image(1275, 600, 'rose').setScale(0.5);
        let r11text = this.add.text(1025, 575, '+     =', { fontSize: '48px', fill: '#000' });
        r11soil.visible = false;
        r11seed.visible = false;
        r11base.visible = false;
        r11plant.visible = false;
        r11text.visible = false;

        //Cactus #3 recipe variables
        let r12soil = this.add.image(950, 725, 'soil').setTint(0x000FFF).setScale(0.15);
        let r12seed = this.add.image(1125, 725, 'seeds').setTint(0xFF0000).setScale(0.15);
        let r12base = this.add.image(1275, 725, 'stem').setScale(0.5);
        let r12plant = this.add.image(1275, 725, 'tulip').setScale(0.5);
        let r12text = this.add.text(10255, 700, '+     =', { fontSize: '48px', fill: '#000' });
        r12soil.visible = false;
        r12seed.visible = false;
        r12base.visible = false;
        r12plant.visible = false;
        r12text.visible = false;

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

            r3soil.visible = true;
            r3seed.visible = true;
            r3base.visible = true;
            r3plant.visible = true;
            r3text.visible = true;

            r4soil.visible = true;
            r4seed.visible = true;
            r4base.visible = true;
            r4plant.visible = true;
            r4text.visible = true;

            r5soil.visible = true;
            r5seed.visible = true;
            r5base.visible = true;
            r5plant.visible = true;
            r5text.visible = true;

            r6soil.visible = true;
            r6seed.visible = true;
            r6base.visible = true;
            r6plant.visible = true;
            r6text.visible = true;

            r7soil.visible = true;
            r7seed.visible = true;
            r7base.visible = true;
            r7plant.visible = true;
            r7text.visible = true;

            r8soil.visible = true;
            r8seed.visible = true;
            r8base.visible = true;
            r8plant.visible = true;
            r8text.visible = true;

            r9soil.visible = true;
            r9seed.visible = true;
            r9base.visible = true;
            r9plant.visible = true;
            r9text.visible = true;

            r10soil.visible = true;
            r10seed.visible = true;
            r10base.visible = true;
            r10plant.visible = true;
            r10text.visible = true;

            r11soil.visible = true;
            r11seed.visible = true;
            r11base.visible = true;
            r11plant.visible = true;
            r11text.visible = true;

            r12soil.visible = true;
            r12seed.visible = true;
            r12base.visible = true;
            r12plant.visible = true;
            r12text.visible = true;

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

            r3soil.visible = false;
            r3seed.visible = false;
            r3base.visible = false;
            r3plant.visible = false;
            r3text.visible = false;

            r4soil.visible = false;
            r4seed.visible = false;
            r4base.visible = false;
            r4plant.visible = false;
            r4text.visible = false;

            r5soil.visible = false;
            r5seed.visible = false;
            r5base.visible = false;
            r5plant.visible = false;
            r5text.visible = false;

            r6soil.visible = false;
            r6seed.visible = false;
            r6base.visible = false;
            r6plant.visible = false;
            r6text.visible = false;

            r7soil.visible = false;
            r7seed.visible = false;
            r7base.visible = false;
            r7plant.visible = false;
            r7text.visible = false;

            r8soil.visible = false;
            r8seed.visible = false;
            r8base.visible = false;
            r8plant.visible = false;
            r8text.visible = false;

            r9soil.visible = false;
            r9seed.visible = false;
            r9base.visible = false;
            r9plant.visible = false;
            r9text.visible = false;

            r10soil.visible = false;
            r10seed.visible = false;
            r10base.visible = false;
            r10plant.visible = false;
            r10text.visible = false;

            r11soil.visible = false;
            r11seed.visible = false;
            r11base.visible = false;
            r11plant.visible = false;
            r11text.visible = false;

            r12soil.visible = false;
            r12seed.visible = false;
            r12base.visible = false;
            r12plant.visible = false;
            r12text.visible = false;
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
            }else if(cur_soil == soil3 && cur_seed == seed1){
                seed1.visible = false;
                soil3.visible = false;
                cur_base = stem;
                cur_plant = tulip;
                cur_base.visible = true;
                cur_plant.visible = true;
            }
            
            //Cacti/succulents
            else if(cur_soil == soil1 && cur_seed == seed2){
                seed2.visible = false;
                soil1.visible = false;
                cur_base = cactus;
                cur_plant = cactus_flower;
                cur_base.visible = true;
                cur_plant.visible = true;
            }else if(cur_soil == soil2 && cur_seed == seed2){
                seed2.visible = false;
                soil2.visible = false;
                cur_base = succulent1;
                cur_plant = succulent1;
                cur_base.visible = true;
                cur_plant.visible = true;
            }else if(cur_soil == soil3 && cur_seed == seed2){
                seed2.visible = false;
                soil3.visible = false;
                cur_base = succulent2;
                cur_plant = succulent2;
                cur_base.visible = true;
                cur_plant.visible = true;
            }

            //Vegetables
            else if(cur_soil == soil1 && cur_seed == seed3){
                seed3.visible = false;
                soil1.visible = false;
                cur_base = carrot_leaves;
                cur_plant = carrot;
                cur_base.visible = true;
                cur_plant.visible = true;
            }else if(cur_soil == soil2 && cur_seed == seed3){
                seed3.visible = false;
                soil2.visible = false;
                cur_base = succulent1;
                cur_plant = succulent1;
                cur_base.visible = true;
                cur_plant.visible = true;
            }else if(cur_soil == soil3 && cur_seed == seed3){
                seed3.visible = false;
                soil3.visible = false;
                cur_base = succulent2;
                cur_plant = succulent2;
                cur_base.visible = true;
                cur_plant.visible = true;
            }

            //Update score on screen
            scoreText.setText('Score: ' + score);

            if(water_count == 1 && waters.contains(gameObject)){
                cur_plant.setTint(0xFF0000);
            }
            else if(water_count == 2 && waters.contains(gameObject)){
                cur_plant.setTint(0xFFFF00);
            }
            else if(water_count == 3 && waters.contains(gameObject)){
                cur_plant.setTint(0x0000FF);
            }
    
            if(fert_count == 1 && ferts.contains(gameObject)){
                cur_base.setScale(1.25);
                cur_plant.setScale(1.25);
                cur_plant.y -= 30;
                cur_base.y -= 30;
            }else if(fert_count == 2 && ferts.contains(gameObject)){
                cur_base.setScale(1.5);
                cur_plant.setScale(1.5);
                cur_plant.y -= 20;
                cur_base.y -= 20;
            }else if(fert_count == 3 && ferts.contains(gameObject)){
                cur_base.setScale(2);
                cur_plant.setScale(2);
                cur_plant.y -= 50;
                cur_base.y -= 50;
            }
        });
    }
    }