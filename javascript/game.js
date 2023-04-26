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
    
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('pot', 'assets/pot.png');
    this.load.image('sunflower', 'assets/sunflower.png');
    this.load.image('water', 'assets/water.png');
    this.load.image('fertilizer', 'assets/fertilizer.png');
    this.load.image('soil', 'assets/soil.png');
    this.load.image('seeds', 'assets/seeds.png');
    this.load.image('recipes', 'assets/recipe_book.png');
    this.load.image('open_book', 'assets/open_book.png');
    this.load.image('x', 'assets/x.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
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

    //First, put up log in/new account screen
    
    this.cameras.main.setBackgroundColor(0xAAFFAA);
    //this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky').setScale(2);
    //this.add.image(400, 300, 'star');
    let sunf = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 65, 'sunflower');
    sunf.visible = false;

    /*var particles = this.add.particles('star');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'bomb');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);*/


    //Soil
    let soils = this.add.group();
    let soilText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Soil', { fontSize: '32px', fill: '#000' });

    let soil1 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 100, 'soil').setScale(0.2).setInteractive();
    let soil2 = soils.create(this.cameras.main.width / 6, this.cameras.main.height / 6 + 200, 'soil').setTint(0xAAAAAA).setScale(0.2).setInteractive();

    this.input.setDraggable(soil1);
    this.input.setDraggable(soil2);


    //Seeds
    let seeds = this.add.group();
    let seedText = this.add.text(this.cameras.main.width / 6 - 50, this.cameras.main.height / 2, 'Seeds', { fontSize: '32px', fill: '#000' });
    //First player object
    let seed1 = seeds.create(this.cameras.main.width / 6, this.cameras.main.height / 2 + 100, 'seeds').setTint(0xFF0000).setScale(0.2).setInteractive();
    this.input.setDraggable(seed1);
    //player.setBounce(0.2);
    //player.setCollideWorldBounds(true);
    //Second player object
    let seed2 = seeds.create(this.cameras.main.width / 6, this.cameras.main.height / 2 + 200, 'seeds').setTint(0x00FF00).setScale(0.2).setInteractive();
    this.input.setDraggable(seed2);
    //player2.setBounce(0.2);
    //player2.setCollideWorldBounds(true);

    //Pots
    let pots = this.add.group();
    let potText = this.add.text(this.cameras.main.width / 2 - 50, 3*this.cameras.main.height / 4, 'Pots', { fontSize: '32px', fill: '#000' });
    //Pot 1
    let pot1 = pots.create(this.cameras.main.width / 2 - 150, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setInteractive();
    this.input.setDraggable(pot1);
    //Pot 2
    let pot2 = pots.create(this.cameras.main.width / 2 + 150, 3*this.cameras.main.height / 4 + 100, 'pot').setScale(0.5).setTint(0x555555).setInteractive();
    this.input.setDraggable(pot2);

    //Water droplets
    let waters = this.add.group();
    let waterText = this.add.text(5*this.cameras.main.width / 6 - 50, this.cameras.main.height / 6, 'Water', { fontSize: '32px', fill: '#000' });
    //Drop 1
    let drop1 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 100, 'water').setScale(0.1).setInteractive();
    this.input.setDraggable(drop1);
    //Drop 2
    let drop2 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 150, 'water').setScale(0.1).setInteractive();
    this.input.setDraggable(drop2);
    //Drop 3
    let drop3 = waters.create(5*this.cameras.main.width / 6, this.cameras.main.height / 6 + 200, 'water').setScale(0.1).setInteractive();
    this.input.setDraggable(drop3);

    //Fertilizer
    let ferts = this.add.group();
    let fertText = this.add.text(5*this.cameras.main.width / 6 - 100, this.cameras.main.height / 2, 'Fertilizer', { fontSize: '32px', fill: '#000' });
    //Fertilizer 1
    let fert1 = ferts.create(5*this.cameras.main.width / 6, this.cameras.main.height / 2 + 100, 'fertilizer').setScale(0.2).setInteractive();
    this.input.setDraggable(fert1);
    //Fertilizer 2
    let fert2 = ferts.create(5*this.cameras.main.width / 6, this.cameras.main.height / 2 + 200, 'fertilizer').setScale(0.2).setInteractive();
    this.input.setDraggable(fert2);
    //Fertilizer 3
    let fert3 = ferts.create(5*this.cameras.main.width / 6, this.cameras.main.height / 2 + 300, 'fertilizer').setScale(0.2).setInteractive();
    this.input.setDraggable(fert3);

    //this.physics.add.collider(stars, platforms);

    //this.phyics.add.overlap(player, star, collectStar, null, this);

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
    let close_button = this.add.image(this.cameras.main.width - 350, 100, 'x').setScale(0.25).setInteractive();

    //First recipe variables
    let r1soil = this.add.image(this.cameras.main.width / 4 - 25, this.cameras.main.height / 6 , 'soil').setScale(0.15);
    let r1seed = this.add.image(this.cameras.main.width / 3, this.cameras.main.height / 6, 'seeds').setTint(0xFF0000).setScale(0.15);
    let r1plant = this.add.image(this.cameras.main.width / 2 - 100, this.cameras.main.height / 6, 'sunflower').setScale(0.25);
    let r1text = this.add.text(this.cameras.main.width / 4 + 50, this.cameras.main.height / 6 - 25, '+     =', { fontSize: '48px', fill: '#000' });

    //Hide book variables initially
    recipes.visible = false;
    close_button.visible = false;
    r1soil.visible = false;
    r1seed.visible = false;
    r1plant.visible = false;
    r1text.visible = false;

    //Show book variables once clicked
    book.on('pointerdown', function(pointer){
        recipes.visible = true;
        close_button.visible = true;
        r1soil.visible = true;
        r1seed.visible = true;
        r1plant.visible = true;
        r1text.visible = true;
        recipe_counter += 1;
    });

    //Hide book again after close button is clicked
    close_button.on('pointerdown', function(pointer){
        recipes.visible = false;
        close_button.visible = false;
        r1soil.visible = false;
        r1seed.visible = false;
        r1plant.visible = false;
        r1text.visible = false;
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

            //Line below is work in progress
            //soils.getChildren().forEach(function(){this.children.visible = false;}, this);
    // });
//NOTE: dragend only fires on drop outside of drop target. Do the function on "drop" event.
    // this.input.on('dragend', function (pointer, gameObject) {
        //gameObject.clearTint();
        if(pots.contains(gameObject)){
           cur_pot = gameObject;
        }

        else if(soils.contains(gameObject)){
            cur_soil = gameObject;
        }

        else if(seeds.contains(gameObject)){
            cur_seed = gameObject;
        }

        else if(waters.contains(gameObject)){
            water_count += 1;
            gameObject.visible = false;  
        }
        else if (ferts.contains(gameObject)){
            fert_count += 1;
            gameObject.visible = false;
        }

        if(cur_soil == soil1 && cur_seed == seed1){
            seed1.visible = false;
            soil1.visible = false;
            cur_plant = sunf;
            cur_plant.visible = true;
            cur_plant.setTint(0x888888);
            cur_plant.setScale(0.5);
        }
        //Update score on screen
        scoreText.setText('Score: ' + score);
        if(water_count == 1){
            cur_plant.setTint(0xAAFFAA);
        }
        else if(water_count == 2){
            cur_plant.setTint(0xFFAAAA);
        }
        else if(water_count == 3){
            cur_plant.setTint(0xFFFFFF);
        }

        if(fert_count == 1){
            cur_plant.setScale(0.67);
            cur_plant.y -= 35;
        }
        else if(fert_count == 2){
            cur_plant.setScale(0.82);
            cur_plant.y -= 35;
        }
        else if(fert_count == 3){
            cur_plant.setScale(1);
            cur_plant.y -= 45;
        }
    });
}
}