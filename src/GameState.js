import Zombie from './Zombie';

class GameState extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'BootScene'});
        this.zombie = new Zombie();
    }

    get config ()
    {
        return {
            width: 1024,
            height: 576,
            centerX: 1024 / 2,
            centerY: 576 / 2,
            player: {
                scale: 0.7,
                bounce: 0.2,
                frameRate: 12,
                velocityX: 180,
                velocityY: 360
            }
        };
    }

    preload ()
    {
        this.load.image('imgState1', 'assets/images/state_1.jpg');
        this.load.image('ground', 'assets/images/ground.jpg');
        this.load.atlas(this.zombie.alias, this.zombie.spriteSheet, this.zombie.spriteData);
    }

    create ()
    {
        this.initController();
        this.initState();
        this.initPlayer();
        this.initCollider();
    }

    update ()
    {
        this.updatePlayer();
    }

    initController ()
    {
        this.controller = this.input.keyboard.createCursorKeys();
    }

    initState ()
    {
        this.add.image(this.config.centerX, this.config.centerY, 'imgState1');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.config.centerX, this.config.height, 'ground').setScale(1.5).refreshBody();
    }

    initPlayer ()
    {
        let frameRate = this.config.player.frameRate;

        this.player = this.physics.add.sprite(this.config.centerX, this.config.centerY * 1.4, this.zombie.alias, this.zombie.getIdleFrames(0));
        this.player.setScale(this.config.player.scale);
        this.player.setBounce(this.config.player.bounce);

        this.anims.create({ key: 'attack', frames: this.zombie.getAttackFrames(), frameRate, repeat: true });
        this.anims.create({ key: 'dead', frames: this.zombie.getDeadFrames(), frameRate, repeat: false });
        this.anims.create({ key: 'idle', frames: this.zombie.getIdleFrames(), frameRate, repeat: true });
        this.anims.create({ key: 'walk', frames: this.zombie.getWalkFrames(), frameRate, repeat: true });
    }

    initCollider ()
    {
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
    }

    updatePlayer ()
    {
        this.player.setVelocityX(0);
        if (this.controller.right.isDown)
        {
            this.player.flipX = false;
            this.player.setVelocityX(this.config.player.velocityX);
            this.player.anims.play('walk', true);
        }
        else if (this.controller.left.isDown)
        {
            this.player.flipX = true;
            this.player.setVelocityX(-this.config.player.velocityX);
            this.player.anims.play('walk', true);
        }
        else
        {
            this.player.anims.play('idle', true);
        }

        if (this.controller.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-this.config.player.velocityY);
        }
    }
}

export default GameState;
