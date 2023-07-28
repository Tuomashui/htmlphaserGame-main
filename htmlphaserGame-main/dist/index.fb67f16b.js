let game;
const gameOptions = {
    centipedeGravity: 1,
    centipedeSpeed: 300
};
window.onload = function() {
    let config = {
        type: Phaser.AUTO,
        backgroundColor: "#008800",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 1000
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                Gravity: {
                    y: 0
                }
            }
        },
        scene: PlayGame
    };
    game = new Phaser.Game(config);
    window.focus();
};
class PlayGame extends Phaser.Scene {
    preload() {
        this.load.image("brick.png", "./assets/brick.png");
        this.load.image("cone.png", "./assets/pinecone.png");
        this.load.spritesheet("/assets/centipede.jpg", "centipede", {
            frameWidth: 50,
            frameHeight: 50
        });
    }
    create() {
        this.wallGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        for(let i = 0; i < 20; i++)this.wallGroup.create(Phaser.Math.Between(0, game.config.height), "wall");
        this.centipede = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "centipede");
    }
}

//# sourceMappingURL=index.fb67f16b.js.map
