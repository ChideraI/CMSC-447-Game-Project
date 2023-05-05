export default class GameScene extends Phaser.Scene {


    //var game = new Phaser.Game(config);
    constructor() {
        super("Game");
        // let logged_in = false;
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
        this.load.image('carrot_leaves', 'assets/carrot_leaves.png');
        this.load.image('carrot', 'assets/carrot.png');
        this.load.image('tomato_stem', 'assets/tomato_stem.png');
        this.load.image('tomato', 'assets/tomato.png');
        this.load.image('pumpkin_leaves', 'assets/pumpkin_leaves.png');
        this.load.image('pumpkin', 'assets/pumpkin.png');
        this.load.image('bonsai_base', 'assets/bonsai_base.png');
        this.load.image('bonsai1', 'assets/bonsai1.png');
        this.load.image('bonsai2', 'assets/bonsai2.png');
        this.load.image('bonsai3', 'assets/bonsai3.png');
        this.load.image('water', 'assets/water.png');
        this.load.image('fertilizer', 'assets/fertilizer.png');
        this.load.image('soil', 'assets/soil.png');
        this.load.image('seeds', 'assets/seeds.png');
        this.load.image('recipes', 'assets/recipe_book.png');
        this.load.image('open_book', 'assets/open_book.png');
        this.load.image('x', 'assets/x.png');
        this.load.json('tutorial', 'data/tutorial.json');
        this.load.json('level1', 'data/level1.json');
        this.load.json('level2', 'data/level2.json');
        this.load.json('level3', 'data/level3.json');
    }
    
    create ()
    {
        const myThis = this;
        let logged_in = false;
        let water_count = 0;
        let fert_count = 0;
        let cur_pot;
        let cur_soil;
        let cur_seed;
        let cur_plant;
        let cur_base;
        let cur_data;
        let tutorial_data = this.cache.json.get('tutorial');
        let level1_data = this.cache.json.get('level1');
        let level2_data = this.cache.json.get('level2');
        let level3_data = this.cache.json.get('level3');
        let num_customers = 0;

        if(this.game.config.level == 0){
            cur_data = tutorial_data;
            num_customers = 3;
        }else if(this.game.config.level == 1){
            cur_data = level1_data;
            num_customers = 5;
        }else if(this.game.config.level == 2){
            cur_data = level2_data;
            num_customers = 10;
        }else{
            cur_data = level3_data;
            num_customers = 15;
        }

        if(this.game.config.ccustomer > num_customers){
            myThis.scene.start('Menu');
        }

        this.game.config.cpot = cur_data["Customer"+this.game.config.ccustomer]["pot"];
        this.game.config.csoil = cur_data["Customer"+this.game.config.ccustomer]["soil"];
        this.game.config.cseed = cur_data["Customer"+this.game.config.ccustomer]["seed"];
        this.game.config.cwater = cur_data["Customer"+this.game.config.ccustomer]["water"];
        this.game.config.cfertilizer = cur_data["Customer"+this.game.config.ccustomer]["fertilizer"];

        cur_pot = this.game.config.cpot;
        cur_soil = this.game.config.csoil;
        cur_seed = this.game.config.cseed;
        water_count = this.game.config.cwater;
        fert_count = this.game.config.cfertilizer;
    
        //First, put up log in/new account screen
        
        this.cameras.main.setBackgroundColor(0xAAFFAA);

        this.add.text(this.cameras.main.width / 2, 100, cur_pot, {fontSize: '32px', fill: '#000' });
        this.add.text(this.cameras.main.width / 2, 200, cur_soil, {fontSize: '32px', fill: '#000' });
        this.add.text(this.cameras.main.width / 2, 300, cur_seed, {fontSize: '32px', fill: '#000' });
        this.add.text(this.cameras.main.width / 2, 400, water_count, {fontSize: '32px', fill: '#000' });
        this.add.text(this.cameras.main.width / 2, 500, fert_count, {fontSize: '32px', fill: '#000' });

        //Make plant button
        const makeButton = this.add.text(this.cameras.main.width / 2, 800, 'Make Plant', {fontSize: '32px', fill: '#000' });
        makeButton.setInteractive();
        makeButton.on('pointerup', () => { 
            this.add.text(this.cameras.main.width / 2, 100, 'Pressed', {fontSize: '32px', fill: '#000' });
            if(this.game.config.level == 0){
                myThis.scene.start('Tutorial');
            }else if(this.game.config.level == 1){
                myThis.scene.start('GameL1');
            }else if(this.game.config.level == 2){
                myThis.scene.start('GameL2');
            }else{
                myThis.scene.start('GameL3');
            }
        });

        //Pots
        let pots = this.add.group();
        //Pot 1
        let pot1 = pots.create(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'pot').setScale(0.5).setInteractive();
        pot1.visible = false;
        //Pot 2
        let pot2 = pots.create(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'pot').setScale(0.5).setTint(0x555555).setInteractive();
        pot2.visible = false;
        //Pot 3
        let pot3 = pots.create(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'pot').setScale(0.5).setTint(0x00FFF0).setInteractive();
        pot3.visible = false;
        //Pot 4
        let pot4 = pots.create(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'pot').setScale(0.5).setTint(0xAA11FF).setInteractive();
        pot4.visible = false;
        //Pot 5
        let pot5 = pots.create(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'pot').setScale(0.5).setTint(0x11111).setInteractive();
        pot5.visible = false;
        
        //Flowers
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
        let carrot_leaves = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'carrot_leaves');
        carrot_leaves.visible = false;

        let carrot = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'carrot');
        carrot.visible = false;

        let tomato_stem = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'tomato_stem');
        tomato_stem.visible = false;

        let tomato = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'tomato');
        tomato.visible = false;

        let pumpkin_leaves = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'pumpkin_leaves');
        pumpkin_leaves.visible = false;

        let pumpkin = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'pumpkin');
        pumpkin.visible = false;

        //Add bonsai
        let bonsai_base = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'bonsai_base');
        bonsai_base.visible = false;

        let bonsai1 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'bonsai1');
        bonsai1.visible = false;

        let bonsai2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'bonsai2');
        bonsai1.visible = false;

        let bonsai3 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 40, 'bonsai3');
        bonsai1.visible = false;
    
        //Pot visibility
        if(cur_pot == 1){
            pot1.visible = true;
        }else if(cur_soil == 2){
            pot2.visible = true;
        }else if(cur_soil == 3){
            pot3.visible = true;
        }else if(cur_soil == 2){
            pot4.visible = true;
        }else{
            pot5.visible = true;
        }

        //Flowers
        if(cur_soil == 1 && cur_seed == 1){
            cur_base = stem;
            cur_plant = sunf;
        }else if(cur_soil == 2 && cur_seed == 1){
            cur_base = stem;
            cur_plant = rose;
        }else if(cur_soil == 3 && cur_seed == 1){
            cur_base = stem;
            cur_plant = tulip;
        }
            
        //Cacti/succulents
        else if(cur_soil == 1 && cur_seed == 2){
            cur_base = cactus;
            cur_plant = cactus_flower;
        }else if(cur_soil == 2 && cur_seed == 2){
            cur_base = succulent1;
            cur_plant = succulent1;
        }else if(cur_soil == 3 && cur_seed == 2){
            cur_base = succulent2;
            cur_plant = succulent2;
        }

        //Vegetables
        else if(cur_soil == 1 && cur_seed == 3){
            cur_base = carrot_leaves;
            cur_plant = carrot;
        }else if(cur_soil == 2 && cur_seed == 3){
            cur_base = tomato_stem;
            cur_plant = tomato;
        }else if(cur_soil == 3 && cur_seed == 3){
            cur_base = pumpkin_leaves;
            cur_plant = pumpkin;
        }

        //Bonsai
        else if(cur_soil == 1 && cur_seed == 4){
            cur_base = bonsai_base;
            cur_plant = bonsai1;
        }else if(cur_soil == 2 && cur_seed == 4){
            cur_base = bonsai_base;
            cur_plant = bonsai2;
        }else if(cur_soil == 3 && cur_seed == 4){
            cur_base = bonsai_base;
            cur_plant = bonsai3;
        }

        this.add.text(this.cameras.main.width / 2, 600, cur_base, {fontSize: '32px', fill: '#000' });
        this.add.text(this.cameras.main.width / 2, 700, cur_plant, {fontSize: '32px', fill: '#000' });

        cur_base.visible = true;
        cur_plant.visible = true;

        if(water_count == 1){
            cur_base.setTint(0x003300);
            if(cur_seed == 1){
                cur_plant.setTint(0xFF0000);
            }else if(cur_seed == 2){
                cur_plant.setTint(0xFF55BB);
            }else if(cur_seed == 3){
                cur_plant.setTint(0xFFFF00);
            }else{
                cur_plant.setTint(0x773300);
                cur_base.setTint(0x552211);
            }
        }
        else if(water_count == 2){
            cur_base.setTint(0x009900);
            if(cur_seed == 1){
                cur_plant.setTint(0xFF00FF);
            }else if(cur_seed == 2){
                cur_plant.setTint(0xFFAA00);
            }else if(cur_seed == 3){
                cur_plant.setTint(0xFFAA00);
            }else{
                cur_plant.setTint(0xAA8800);
                cur_base.setTint(0x774411);
            }
        }
        else if(water_count == 3){
            cur_base.setTint(0x00DD00);
            if(cur_seed == 1){
                cur_plant.setTint(0xFFFF00);
            }else if(cur_seed == 2){
                cur_plant.setTint(0xFFFF00);
            }else if(cur_seed == 3){
                cur_plant.setTint(0xFF0000);
            }else{
                cur_plant.setTint(0x00CC00);
                cur_base.setTint(0x885511);
            }
        }
    
        if(fert_count == 1){
            cur_base.setScale(1.25);
            cur_plant.setScale(1.25);
            cur_plant.y -= 30;
            cur_base.y -= 30;
        }else if(fert_count == 2){
            cur_base.setScale(1.5);
            cur_plant.setScale(1.5);
            cur_plant.y -= 20;
            cur_base.y -= 20;
        }else if(fert_count == 3){
            cur_base.setScale(2);
            cur_plant.setScale(2);
            cur_plant.y -= 50;
            cur_base.y -= 50;
        }

        if(this.game.config.cscore != 0){
            this.add.text(this.cameras.main.width / 2, 800, 'Score: $'+this.game.config.cscore, {fontSize: '32px', fill: '#000' });
            this.game.config.cscore = 0;
        }

        }
    }