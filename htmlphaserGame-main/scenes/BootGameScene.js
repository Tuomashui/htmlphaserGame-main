//I watched a youtubevideo how to make this kind of scene https://www.youtube.com/watch?v=gFXx7lgxK9A
export class BootGameScene extends Phaser.Scene {
    constructor(){
        super("BootGameScene");
    }
    create(){
        this.cameras.main.setBackgroundColor('#000000');
        this.add.text(50,50, "Loading game...");
        let text = this.add.text(500, 300, 'REACH 4 POINTS!!', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: `rgb(${0}, ${0}, ${200})`
        }).setOrigin(0.5);

        this.time.delayedCall(3000, () => {
            this.scene.start("PlayGameScene");
    });
}
}
