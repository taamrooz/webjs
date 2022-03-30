import View from '/views/view.js';
import Element from '/views/components/element.js';
import { HALL_GET_HALL, HALL_ADD_ASSEMBLY_LINE, SHAPE_CREATE_RANDOM_SHAPE } from '/actions.js';
import AssemblyLineComponent from '/views/components/assembly_line.component.js';
import TruckComponent from '/views/components/truck.component.js';
import SimulationComponent from '/views/components/simulation.component.js';
import ShapeComponent from '/views/components/shape.component.js';

class HallPage extends View
{
    constructor(parent, routeController)
    {
        super(parent);
        this.routeController = routeController;
        const hall = routeController.dispatch(HALL_GET_HALL, { id: this.routeController.param });
        if(!hall)
        {
            this.routeController.to('not_found');
        }
        this.hall = hall;
    }

    render()
    {
        if(this.hall === undefined)
        {
            return;
        }
        const div = new Element(this.routeController.root, 'div');
        const simulation = new SimulationComponent(div.element, this.routeController);
        const h1 = new Element(div.element, 'h1', 'Hall');

        div.render();
        simulation.render();
        h1.render();

        const shape = this.routeController.dispatch(SHAPE_CREATE_RANDOM_SHAPE);
        const shapeComp = new ShapeComponent(div.element, shape, this.routeController);
        shapeComp.render(true);
        this.bind(document, 'shapeplaced', (event) => {
            if(!event.detail.fromTray)
            {
                return;
            }
            const shape = this.routeController.dispatch(SHAPE_CREATE_RANDOM_SHAPE);
            const newShapeComp = new ShapeComponent(div.element, shape, this.routeController);
            newShapeComp.render(true);
            const oldElement = document.getElementById(event.detail.id);
            div.element.replaceChild(newShapeComp.element, oldElement.parentElement);
        });


        const hall = new Element(div.element, 'div', '', { 'class': 'hall' });
        hall.render();
        const assemblyHall = new Element(hall.element, 'div', '', { 'class': 'assembly-hall'});
        assemblyHall.render();

        const add_assembly = new Element(assemblyHall.element, 'button', 'Add assembly line');
        add_assembly.render();
        add_assembly.onEvent('click', () => {
            const index = this.routeController.dispatch(HALL_ADD_ASSEMBLY_LINE, {id: this.hall.id});
            const newAssembly = new AssemblyLineComponent(assemblyHall.element, this.routeController, index);
            newAssembly.render();
        });

        this.hall.assemblyLines.forEach((assemblyLine, index) => {
            const assemblyComp = new AssemblyLineComponent(assemblyHall.element, this.routeController, index);
            assemblyComp.render();
        });

        const truckHall = new Element(hall.element, 'div', '', { 'class': 'truck-hall'});
        truckHall.render();

        const add_truck = new Element(truckHall.element, 'a', 'Add truck', { 'href': '#add_truck'});
        add_truck.render();

        this.hall.trucks.forEach((truck) => {
            const truckComp = new TruckComponent(truckHall.element, truck, this.routeController);
            truckComp.render();
        });
    }
}

export default HallPage;
