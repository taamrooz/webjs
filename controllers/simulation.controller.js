import ObserveController from '/controllers/observe.controller.js';
import Simulation from '/models/simulation.model.js';
import { SIMULATION_PLAY, SIMULATION_PAUSE, SIMULATION_GET_STATE } from '/actions.js';

class SimulationController extends ObserveController
{
    constructor()
    {
        super('simulationstate');
        this.simulation = new Simulation();
        this.register(SIMULATION_PLAY, () => this.play());
        this.register(SIMULATION_PAUSE, () => this.pause());
        this.register(SIMULATION_GET_STATE, () => this.getState());
    }

    play()
    {
        this.simulation.paused = false;
        this.dispatch({state: this.simulation.paused });
    }

    pause()
    {
        this.simulation.paused = true;
        this.dispatch({state: this.simulation.paused });
    }

    getState()
    {
        return this.simulation.paused;
    }
}

export default SimulationController;
