import { BootGameScene } from './scenes/BootGameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { FinalLevel } from './scenes/FinalLevel.js';
import { Congratulation } from "./scenes/Congratulation.js"
//basic idea on this file is from Ernos video https://www.youtube.com/watch?v=O6zoZAq86io

let game
let gameOptions = {
    centipedeGravity: 0,
    centipedeSpeed: 200
}

window.onload = function() {
    let config = {
        type: Phaser.AUTO,
        backgroundColor: "#008800",
        scene: [BootGameScene, PlayGameScene, FinalLevel, GameOverScene, Congratulation],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1000,
            height: 1000,
        }, 
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                y: 0
                }
            }
        },
}

game = new Phaser.Game(config)

window.focus();
}

class PlayGameScene extends Phaser.Scene {
    
    constructor(){
            super("PlayGameScene");
            this.score = 0;
        }

    preload() {
            this.load.image("brick", './assets/brick.png');
            this.load.image("pinecone", './assets/realpinecone.png');
            this.load.image("vacuum", './assets/Vacuum.png');
            this.load.image("speedpotion", './assets/speedPotion.png');
            this.load.spritesheet("centipede", './assets/centipedetwo.png',
            {frameWidth: 100, frameHeight: 100});
            
            }
    create() {
            //BRICK-CODES
            this.brickGroup = this.physics.add.group({
                immovable: true,
                allowGravity: false
            })
        //setting the right starting properties for walls
        let x = 500;
        let y = 5;
        let a = 500;
        let b = 5;
            for(let side = 0; side < 4; side++){
                if(side <= 1){
                    let brick = this.brickGroup.create(x,y,"brick")
                        brick.displayWidth = 1000; 
                        brick.displayHeight = 20;
                        brick.body.setSize(brick.displayWidth, brick.displayHeight);
                        y = 1000;    
                }else{
                    console.log("hello")
                    let brick = this.brickGroup.create(b,a,"brick")
                    brick.displayWidth = 20; 
                    brick.displayHeight = 1000;
                    brick.body.setSize(brick.displayWidth, brick.displayHeight);
                    b = 995;
                }
            }
         
            for(let i = 0; i < 26; i++){
                let brick = this.brickGroup.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height)
                    , "brick")
                    
                if(i < 13){
                        brick.displayWidth = 200; 
                        brick.displayHeight = 25;
                    
                }else{
                    brick.displayWidth = 25; 
                    brick.displayHeight = 200;
    
                }
            }
            
    
            //CENTIPEDE-CODES
            this.centipede = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "centipede");
            this.centipede.body.setSize(50, 10, true);

            this.physics.add.collider(this.centipede, this.brickGroup);
            
            this.cursors = this.input.keyboard.createCursorKeys();



              //speedpotion-codes
              this.potionGroup = this.physics.add.group({});
              this.physics.add.overlap(this.centipede, this.potionGroup, this.collectPotion, null, this);
              this.add.image(30,100, "speedpotion").setScale(0.20,0.20);
              this.SpeedText = this.add.text(60, 100, "200", {fontSize: "30px", fill: "#ffffff"}, {fontFamily: "comic-sans"} )
              
              for(let i = 0; i < 3; i++){
                  let potion = this.potionGroup.create(Phaser.Math.Between(0, game.config.height), Phaser.Math.Between(0, game.config.height), "speedpotion");
                  potion.displayWidth = 50;
                  potion.displayHeight = 50;
                  potion.body.setSize(50,50);
              }
           
    
            //PINECONE-CODES
            this.pineconeGroup = this.physics.add.group({});
            this.physics.add.collider(this.pineconeGroup, this.brickGroup);
            this.physics.add.overlap(this.centipede, this.pineconeGroup, this.collectCone, null, this);
            this.add.image(30,30, "pinecone").setScale(0.20,0.20);
            this.scoreText = this.add.text(50, 20, "0", {fontSize: "30px", fill: "#ffffff"}, {fontFamily: "comic-sans"} )
            
            for(let i = 0; i < 10; i++){
                let pinecone = this.pineconeGroup.create(Phaser.Math.Between(0, game.config.height), Phaser.Math.Between(0, game.config.height), "pinecone");
                pinecone.displayWidth = 20;
                pinecone.displayHeight = 20;
                pinecone.body.setSize(50,50);
            }
    
            //VACUUM-CODES
            this.vacuumGroup = this.physics.add.group({
                immovable: false,
                allowGravity: true,
                vacuumSpeed: 150
            })
                    for(let i = 0; i < 10; i++){
                        this.createRandomVacuum();
                        }
                    this.physics.add.overlap(this.centipede, this.vacuumGroup, this.restartGame, null, this);
                   
        }
    
        collectCone(centipede, start) {
            start.disableBody(true, true);
            this.score = this.score + 1;
            this.scoreText.setText(this.score);
            }

            collectPotion(centipede, start) {
                start.disableBody(true, true);
                gameOptions.centipedeSpeed = 400;
                this.SpeedText.setText("400!!")
                this.time.delayedCall(5000, () => {
                this.SpeedText.setText("200")
                gameOptions.centipedeSpeed = 200;
                });
            }

        restartGame(centipede, start) {
            this.score = 0;
            this.scene.start("GameOverScene");
        }

        nextLevel() {
            this.score = 0;
            this.scene.start("FinalLevel");
        }

            //VACUUM
        createRandomVacuum() {
            const direction = Phaser.Math.Between(0, 3); 
            const vacuum = this.vacuumGroup.create(Phaser.Math.Between(100, game.config.width), Phaser.Math.Between(100, game.config.height), 'vacuum');
            vacuum.displayWidth = 75;
            vacuum.displayHeight = 75;
            vacuum.body.setSize(80,100);
            this.physics.add.collider(this.vacuumGroup, this.brickGroup);
            
            switch (direction) {
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

            if(this.score > 1){
                this.cameras.main.setBackgroundColor('#006600');
                
            }
            if(this.score > 2){
                this.cameras.main.setBackgroundColor('#004400');
                
            }
            if(this.score > 3){
                this.cameras.main.setBackgroundColor('#002200');
                this.nextLevel();
            }
               
                this.vacuumGroup.children.iterate((vacuum) => {
                const direction = Phaser.Math.Between(0, 100); 
                switch (direction) {
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
            
            if(this.cursors.left.isDown){
                this.centipede.body.velocity.x =  -gameOptions.centipedeSpeed;
                this.centipede.angle = -180;
                this.centipede.body.angle = -Phaser.Math.pi;
            }
            else if(this.cursors.right.isDown){
                this.centipede.body.velocity.x =  gameOptions.centipedeSpeed;
                this.centipede.angle = 0;
                this.centipede.body.angle = 0;
            }
            else if(this.cursors.up.isDown){
                this.centipede.body.velocity.y =  -gameOptions.centipedeSpeed;
                this.centipede.angle = -90;
                this.centipede.body.angle = -Phaser.Math.pi;
            }
            else if(this.cursors.down.isDown){
                this.centipede.body.velocity.y =  gameOptions.centipedeSpeed;
                this.centipede.angle = 90;
                this.centipede.body.angle = Phaser.Math.pi/2;
            }
            else{
                this.centipede.body.velocity.x = 0;
                this.centipede.body.velocity.y =  0;
            }
        }

    }

