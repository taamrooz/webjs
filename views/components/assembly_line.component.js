import ActorComponent from '/views/components/actor.component.js';
import Element from '/views/components/element.js';
import { SHAPE_CREATE_SHAPE, HALL_GET_TRUCK_AT_INDEX } from '/actions.js';
import ShapeComponent from '/views/components/shape.component.js';

class AssemblyLineComponent extends ActorComponent
{
    constructor(parent, routeController, index)
    {
        super(parent, routeController);
        this.truck = null;
        this.interval = null;
        this.assemblyIndex = index;
    }

    onUnbindAll()
    {
        clearInterval(this.interval);
    }

    render()
    {
        const div = new Element(this.parent, 'div','', {'class': 'assembly-line'});
        const truck = this.routeController.dispatch(HALL_GET_TRUCK_AT_INDEX, { index: this.assemblyIndex });
        div.render();
        if(truck)
        {
            this.truck = truck;
            this.interval = setInterval(() => {
                if(this.paused) {
                    return;
                }
                const shape = this.routeController.dispatch(SHAPE_CREATE_SHAPE, {width: this.truck.width, length: this.truck.length});
                const shapeComp = new ShapeComponent(div.element, shape, this.routeController);
                shapeComp.render();
            }, 3000);
        }
        
	    this.bind(document, 'shapeplaced', (event) => {
            if(event.detail.fromTray)
            {
                return;
            }
            const oldShape = document.getElementById(event.detail.id);
            oldShape.parentElement.remove();
            event.stopImmediatePropagation();
        });


        if(this.paused)
        {
            div.addClass('paused');
        } else
        {
            div.addClass('playing');
        }

        this.onSimulationState((event) => {
            if(event.detail.state)
            {
                div.addClass('paused');
                div.removeClass('playing');
            } else
            {
                div.addClass('playing');
                div.removeClass('paused');
            }
        });
    }
}

export default AssemblyLineComponent;
