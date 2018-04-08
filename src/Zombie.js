class Zombie
{
    constructor (gender)
    {
        this._alias = 'zombie-' + gender;
    }

    get alias ()
    {
        return this._alias;
    }

    get spriteSheet ()
    {
        return this._spriteSheet;
    }

    get spriteData ()
    {
        return this._spriteData;
    }

    getAttackFrames (frameId = -1)
    {
        let baseName = 'attack_';
        let suffix = '.png';
        let frames = [];
        for (let i = 1; i <= 8; i++)
        {
            let frameNumber = i < 10 ? '0' + i : i;
            let frameName = baseName + frameNumber + suffix;
            frames.push({
                key: this._alias,
                frame: frameName
            });
        }
        if (frameId === -1) return frames;
        else return frames[frameId].frame;
    }

    getDeadFrames (frameId = -1)
    {
        let baseName = 'dead_';
        let suffix = '.png';
        let frames = [];
        for (let i = 1; i <= 12; i++)
        {
            let frameNumber = i < 10 ? '0' + i : i;
            let frameName = baseName + frameNumber + suffix;
            frames.push({
                key: this._alias,
                frame: frameName
            });
        }
        if (frameId === -1) return frames;
        else return frames[frameId].frame;
    }

    getIdleFrames (frameId = -1)
    {
        let baseName = 'idle_';
        let suffix = '.png';
        let frames = [];
        for (let i = 1; i <= 15; i++)
        {
            let frameNumber = i < 10 ? '0' + i : i;
            let frameName = baseName + frameNumber + suffix;
            frames.push({
                key: this._alias,
                frame: frameName
            });
        }
        if (frameId === -1) return frames;
        else return frames[frameId].frame;
    }

    getWalkFrames (frameId = -1)
    {
        let baseName = 'walk_';
        let suffix = '.png';
        let frames = [];
        for (let i = 1; i <= 10; i++)
        {
            let frameNumber = i < 10 ? '0' + i : i;
            let frameName = baseName + frameNumber + suffix;
            frames.push({
                key: this._alias,
                frame: frameName
            });
        }
        if (frameId === -1) return frames;
        else return frames[frameId].frame;
    }
}

export default Zombie;
