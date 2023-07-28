class PlayGame extends Phaser.Scene {
    constructor(){
        super(PlayGame);
        this.score = 0;
    }
    preload() {
        this.load.image("brick", "./assets/brick.png");
        this.load.image("pinecone", "./assets/realpinecone.png");
        this.load.image("vacuum", "./assets/Vacuum.png");
        this.load.spritesheet("centipede", "./assets/centipedetwo.png", {
            frameWidth: 100,
            frameHeight: 100
        });
    }
    create() {
        //BRICK-CODES
        this.brickGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        //setting the right starting properties for walls
        let x = 500;
        let y = 5;
        let a = 500;
        let b = 5;
        for(let side = 0; side < 4; side++)if (side <= 1) {
            let brick = this.brickGroup.create(x, y, "brick");
            brick.displayWidth = 1000;
            brick.displayHeight = 20;
            brick.body.setSize(brick.displayWidth, brick.displayHeight);
            y = 990;
        } else {
            console.log("hello");
            let brick = this.brickGroup.create(b, a, "brick");
            brick.displayWidth = 20;
            brick.displayHeight = 1000;
            brick.body.setSize(brick.displayWidth, brick.displayHeight);
            b = 995;
        }
        for(let i = 0; i < 26; i++){
            let brick = this.brickGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), "brick");
            if (i < 13) {
                brick.displayWidth = 200;
                brick.displayHeight = 20;
                brick.body.setSize(brick.displayWidth, brick.displayHeight);
            } else {
                brick.displayWidth = 20;
                brick.displayHeight = 200;
                brick.body.setSize(brick.displayWidth, brick.displayHeight);
            }
        }
        //CENTIPEDE-CODES
        this.centipede = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "centipede");
        this.centipede.body.setSize(50, 5);
        this.physics.add.collider(this.centipede, this.brickGroup);
        this.cursors = this.input.keyboard.createCursorKeys();
        //PINECONE-CODES
        this.pineconeGroup = this.physics.add.group({});
        this.physics.add.collider(this.pineconeGroup, this.brickGroup);
        this.physics.add.overlap(this.centipede, this.pineconeGroup, this.collectCone, null, this);
        this.add.image(30, 30, "pinecone").setScale(0.20, 0.20);
        this.scoreText = this.add.text(50, 20, "0", {
            fontSize: "30px",
            fill: "#ffffff"
        }, {
            fontFamily: "comic-sans"
        });
        for(let i = 0; i < 10; i++){
            let pinecone = this.pineconeGroup.create(Phaser.Math.Between(0, game.config.height), Phaser.Math.Between(0, game.config.height), "pinecone");
            pinecone.displayWidth = 20;
            pinecone.displayHeight = 20;
            pinecone.body.setSize(50, 50);
        }
        //VACUUM-CODES
        this.vacuumGroup = this.physics.add.group({
            immovable: false,
            allowGravity: true,
            vacuumSpeed: 150
        });
        for(let i = 0; i < 10; i++)this.createRandomVacuum();
    }
    collectCone(centipede, start) {
        start.disableBody(true, true);
        this.score++;
        this.scoreText.setText("=" + this.score);
    }
    //VACUUM
    createRandomVacuum() {
        const direction = Phaser.Math.Between(0, 3);
        const vacuum = this.vacuumGroup.create(Phaser.Math.Between(100, game.config.width - 100), Phaser.Math.Between(100, game.config.height - 100), "vacuum");
        vacuum.displayWidth = 100;
        vacuum.displayHeight = 100;
        vacuum.body.setSize(105, 105);
        this.physics.add.collider(this.vacuumGroup, this.brickGroup);
        switch(direction){
            case 0:
                vacuum.setVelocity(0, -200);
                break;
            case 1:
                vacuum.setVelocity(0, 200);
                break;
            case 2:
                vacuum.setVelocity(-200, 0);
                break;
            case 3:
                vacuum.setVelocity(200, 0);
                break;
            default:
                break;
        }
        this.physics.add.collider(this.vacuumGroup, this.brickGroup);
    }
    update() {
        if (this.physics.add.collider(this.vacuumGroup, this.brickGroup, true)) this.vacuumGroup.children.iterate((vacuum)=>{
            const direction = Phaser.Math.Between(0, 1000);
            switch(direction){
                case 0:
                    vacuum.setVelocity(0, -100);
                    break;
                case 1:
                    vacuum.setVelocity(0, 100);
                    break;
                case 2:
                    vacuum.setVelocity(-100, 0);
                    break;
                case 3:
                    vacuum.setVelocity(100, 0);
                    break;
                default:
                    break;
            }
        });
        if (this.cursors.left.isDown) {
            this.centipede.body.velocity.x = -gameOptions.centipedeSpeed;
            this.centipede.angle = -180;
            this.centipede.body.angle = -Phaser.Math.pi;
        } else if (this.cursors.right.isDown) {
            this.centipede.body.velocity.x = gameOptions.centipedeSpeed;
            this.centipede.angle = 0;
            this.centipede.body.angle = 0;
        } else if (this.cursors.up.isDown) {
            this.centipede.body.velocity.y = -gameOptions.centipedeSpeed;
            this.centipede.angle = -90;
            this.centipede.body.angle = -Phaser.Math.pi;
        } else if (this.cursors.down.isDown) {
            this.centipede.body.velocity.y = gameOptions.centipedeSpeed;
            this.centipede.angle = 90;
            this.centipede.body.angle = Phaser.Math.pi / 2;
        } else {
            this.centipede.body.velocity.x = 0;
            this.centipede.body.velocity.y = 0;
        }
    }
}

//# sourceMappingURL=index.9d5eccb6.js.map
