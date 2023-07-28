class BootGameScene extends Phaser.Scene {
    constructor(){
        super("BootGameScene");
    }
    create() {
        this.cameras.main.setBackgroundColor("#000000");
        this.add.text(50, 50, "Loading game...");
        this.time.delayedCall(3000, ()=>{
            this.scene.start("PlayGameScene");
        });
    }
}

//# sourceMappingURL=index.4c38a410.js.map
