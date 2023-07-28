export class GameOverScene extends Phaser.Scene {
    constructor(){
        super("GameOverScene");
    }
    create(){
        let x,y,z = 0;
        this.cameras.main.setBackgroundColor('#000000');
            let text = this.add.text(500, 300, '!GAMEOVER!', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: `rgb(${x}, ${y}, ${z})`
        }).setOrigin(0.5);

        this.add.text(450,330, "Restarting...")
        function changeTextColor() {
            x = Phaser.Math.Between(0, 255);
            y = Phaser.Math.Between(0, 255);
            z = Phaser.Math.Between(0, 255);
            text.setColor(`rgb(${x}, ${y}, ${z})`);
            this.time.delayedCall(500, changeTextColor, [], this);
        }
        changeTextColor.call(this);
        this.time.delayedCall(5000, () => {
            this.scene.start('PlayGameScene');
        });
}
}
