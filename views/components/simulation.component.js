import ActorComponent from '/views/components/actor.component.js';
import Element from '/views/components/element.js';
import { SIMULATION_PLAY, SIMULATION_PAUSE, SIMULATION_GET_STATE } from '/actions.js';

class SimulationComponent extends ActorComponent
{
    constructor(parent, routeController)
    {
        super(parent, routeController);
    }

    render()
    {
        const div = new Element(this.parent, 'div','', {'class': 'simulation'});
        const playButton = new Element(div.element, 'button', 'Play');
        const pauseButton = new Element(div.element, 'button', 'Pause');
        if(this.paused)
        {
            pauseButton.setAttribute('disabled', true);
        } else
        {
            playButton.setAttribute('disabled', true);
        }
        playButton.onEvent('click', (event) => {
            this.play();
        });
        pauseButton.onEvent('click', () => {
            this.pause();
        });
        div.render();
        playButton.render();
        pauseButton.render();
        
        this.onSimulationState((event) => {
            if(event.detail.state)
            {
                playButton.removeAttribute('disabled');
                pauseButton.setAttribute('disabled', true);
            } else
            {
                playButton.setAttribute('disabled', true);
                pauseButton.removeAttribute('disabled');
            }
        });
    }
}

export default SimulationComponent;
