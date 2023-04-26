class Tutorial extends Phaser.Scene{

    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'star');

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

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        //First player object
        player = this.physics.add.sprite(100, 450, 'dude').setInteractive();

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.input.setDraggable(player);

        //Second player object
        player2 = this.physics.add.sprite(200, 450, 'dude').setInteractive();

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        this.input.setDraggable(player2);

        //this.physics.add.collider(stars, platforms);

        //this.phyics.add.overlap(player, star, collectStar, null, this);

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //  A drop zone
        var zone = this.add.zone(500, 300, 300, 300).setRectangleDropZone(300, 300);

        //  Just a visual display of the drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

        this.input.on('dragstart', function (pointer, gameObject) {gameObject.setTint(0xEEEEEE);});

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        //When dropping object into zone, make object disappear and update score
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
            if(gameObject == player){
                score += 10;
            }
            scoreText.setText('Score: ' + score);
            gameObject.disableBody(true, true);
        });

        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.clearTint();
        });
    }
}