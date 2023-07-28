export class Congratulation extends Phaser.Scene {
    constructor(){
        super("Congratulation");
    }
    create(){
        let x,y,z = 0;
        this.cameras.main.setBackgroundColor('#111111');
            let text = this.add.text(500, 300, '!YOU WON THE EVIL VACUUMS!', {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: `rgb(${x}, ${y}, ${z})`
        }).setOrigin(0.5);

        function changeTextColor() {
            x = Phaser.Math.Between(0, 255);
            y = Phaser.Math.Between(0, 255);
            z = Phaser.Math.Between(0, 255);
            text.setColor(`rgb(${x}, ${y}, ${z})`);
            this.time.delayedCall(300, changeTextColor, [], this);
        }
        changeTextColor.call(this);
}
}
