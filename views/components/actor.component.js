import View from '/views/view.js';
import { SIMULATION_PLAY, SIMULATION_PAUSE, SIMULATION_GET_STATE } from '/actions.js';

class ActorComponent extends View
{
    constructor(parent, routeController)
    {
        super(parent);
        if(this.constructor === ActorComponent)
        {
            throw new Error('Abstract class!');
        }
        this.routeController = routeController;
    }

    onSimulationState(callback)
    {
        this.bind(document,
                  'simulationstate',
                  (event) =>
                  {
                      callback(event)
                  }
                 );
    }

    get paused()
    {
        return this.routeController.dispatch(SIMULATION_GET_STATE);
    }

    play()
    {
        this.routeController.dispatch(SIMULATION_PLAY);
    }

    pause()
    {
        this.routeController.dispatch(SIMULATION_PAUSE);
    }
}

export default ActorComponent;
