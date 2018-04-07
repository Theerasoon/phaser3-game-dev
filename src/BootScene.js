class BootScene extends Phaser.Scene
{
    constructor ()
    {
        super(
            {key: 'BootScene'}
        );
        this._width = 1024;
        this._height = 576;
    }

    preload ()
    {
        this.load.image('imgBootScene', 'assets/images/state_1.jpg');
    }

    create ()
    {
        this.add.image(this._width / 2, this._height / 2, 'imgBootScene');
    }
}

export default BootScene;
