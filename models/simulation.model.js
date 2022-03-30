import Model from '/models/model.js';

class Simulation extends Model
{
    constructor()
    {
        super();
        this.halls = [];
        this.paused = false;
    }
}

export default Simulation;
