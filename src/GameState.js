import Zombie from './Zombie';

class GameState extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'GameState'});
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
        this.load.image('stone1', 'assets/images/stone_1.png');
        this.load.image('stone2', 'assets/images/stone_2.png');
        this.load.audio('kfc', [ 'assets/sounds/BNK48-KFC-8Bit.mp3' ]);
        this.load.atlas('zombie-girl', 'assets/images/zombie-girl.png', 'assets/data/zombie-girl.json');
        this.load.atlas('zombie-boy', 'assets/images/zombie-boy.png', 'assets/data/zombie-boy.json');
    }

    create (data)
    {
        this.zombie = new Zombie(data.gender);
        console.log(this.zombie);
        this.initState();
        this.initPlayer();
        this.initStone();
        this.initController();
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
        this.score = 0;
        this.gameOver = false;
        this.soundFX = this.sound.add('kfc', {loop: true});
        this.soundFX.rate = 1.15;
        this.soundFX.volume -= 0.8;
        this.soundFX.play();

        this.add.image(this.config.centerX, this.config.centerY, 'imgState1');
        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.config.centerX, this.config.height, 'ground').setScale(1.5).refreshBody();
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
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

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);
    }

    initStone ()
    {
        this.stones = this.physics.add.group();
        let randomX = Phaser.Math.Between(10, this.config.width - 10);
        let stoneType = randomX % 2 ? 'stone1' : 'stone2';
        let stone = this.stones.create(randomX, 32, stoneType);
        stone.setScale(0.5);
        let velocity = Phaser.Math.Between(10, 200);
        stone.setVelocity(0, velocity);
        this.physics.add.collider(this.stones, this.ground, this.stonesHitGround, null, this);
        this.physics.add.overlap(this.player, this.stones, this.playerHitStones, null, this);
    }

    updatePlayer ()
    {
        if (this.gameOver)
        {
            this.restart = this.add.text(this.config.centerX - 250, this.config.centerY - 200, 'Press space to play again', { fontSize: '32px', fill: '#fff' });
            if (this.controller.space.isDown)
            {
                this.scene.stop('GameState');
                this.scene.start('BootScene');
            }
            return;
        }
        this.player.setVelocityX(0);
        this.children.bringToTop(this.player);
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

    stonesHitGround (stone, ground)
    {
        if (this.gameOver) return;
        let duration = Phaser.Math.Between(80, 640);
        this.tweens.add({
            targets: stone,
            alpha: { value: 0, duration, ease: 'expo' }
        });

        this.stones.children.iterate(function (child)
        {
            if (child.alpha <= 0.8)
            {
                this.stones.remove(child);
                child.destroy();
                this.score++;
                this.scoreText.setText('Score: ' + this.score);
            }
        }, this);

        if (this.stones.children.size <= 0)
        {
            let stoneNum = Math.min(5, Math.ceil(this.score / 10));
            for (let i = 1; i <= stoneNum; i++)
            {
                this.initStone();
            }
        }
    }

    playerHitStones (player, stone)
    {
        if (this.gameOver) return;
        let xDiff = Math.abs(player.x - stone.x);
        let yDiff = player.y - stone.y;
        if (yDiff > 80 && xDiff < 80)
        {
            this.player.setVelocityX(0);
            player.anims.play('dead');
            this.gameOver = true;
            this.soundFX.stop();
        }
    }
}

export default GameState;
