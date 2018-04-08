import Zombie from './Zombie';

class BootScene extends Phaser.Scene
{
    constructor ()
    {
        super(
            {key: 'BootScene'}
        );
    }

    get config ()
    {
        return {
            width: 1024,
            height: 576,
            centerX: 1024 / 2,
            centerY: 576 / 2
        };
    }

    preload ()
    {
        this.load.image('imgBootScene', 'assets/images/state_1.jpg');
        this.load.image('frame', 'assets/images/frame.png');
        this.load.atlas('zombie-girl', 'assets/images/zombie-girl.png', 'assets/data/zombie-girl.json');
        this.load.atlas('zombie-boy', 'assets/images/zombie-boy.png', 'assets/data/zombie-boy.json');
    }

    create ()
    {
        this.add.image(this.config.centerX, this.config.centerY, 'imgBootScene');
        this.controller = this.input.keyboard.createCursorKeys();
        this.startText = this.add.text(this.config.centerX - 205, this.config.centerY + 200, 'Press space to start !', { fontSize: '32px', fill: '#fff' });
        this.add.text(this.config.centerX - 220, this.config.centerY - 250, 'Use arrows key to choose zombie', { fontSize: '24px', fill: '#acc' });

        // Create frame
        this.frames = this.physics.add.staticGroup();
        this.frame1 = this.frames.create(350, 200, 'frame');
        this.frame1.setScale(0.7, 1);
        this.frame1.setTint(0xff1111);

        this.frame2 = this.frames.create(this.config.width - 350, 200, 'frame');
        this.frame2.setScale(0.7, 1);
        this.frame2.setTint(0xaaaaaa);

        // create zombie
        let zombieBoy = new Zombie('boy');
        let zombieGirl = new Zombie('girl');
        this.zombieBoy = this.add.sprite(355, 200, zombieBoy.alias, zombieBoy.getIdleFrames(0));
        this.zombieGirl = this.add.sprite(675, 200, zombieGirl.alias, zombieGirl.getIdleFrames(0));

        let frameRate = 12;
        this.anims.create({ key: 'zombie-boy-idle', frames: zombieBoy.getIdleFrames(), frameRate, repeat: true });
        this.anims.create({ key: 'zombie-girl-idle', frames: zombieGirl.getIdleFrames(), frameRate, repeat: true });

        this.zombieBoy.anims.play('zombie-boy-idle', true);

        // default zombie
        this.gender = 'boy';
    }

    update ()
    {
        let time = Math.round(this.time.now / 1000);
        if (time % 2 === 0)
        {
            this.startText.visible = !this.startText.visible;
        }

        if (this.controller.space.isDown)
        {
            this.scene.stop('BootScene');
            this.scene.start('GameState', { gender: this.gender });
        }

        if (this.controller.right.isDown)
        {
            this.frame1.setTint(0xaaaaaa);
            this.frame2.setTint(0xff1111);
            this.gender = 'girl';
        }
        else if (this.controller.left.isDown)
        {
            this.frame1.setTint(0xff1111);
            this.frame2.setTint(0xaaaaaa);
            this.gender = 'boy';
        }

        if (this.gender === 'boy')
        {
            this.zombieBoy.anims.play('zombie-boy-idle', true);
            this.zombieGirl.anims.stop();
        }
        else
        {
            this.zombieGirl.anims.play('zombie-girl-idle', true);
            this.zombieBoy.anims.stop();
        }
    }
}

export default BootScene;
