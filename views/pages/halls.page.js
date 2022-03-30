import View from '/views/view.js';
import Element from '/views/components/element.js';
import { HALL_GET_HALLS } from '/actions.js';

class HallsPage extends View
{
    constructor(parent, routeController)
    {
        super(parent);
        this.routeController = routeController;
        this.halls = routeController.dispatch(HALL_GET_HALLS);
    }

    render()
    {
        let div = new Element(this.routeController.root, 'div');
        let h1 = new Element(div.element, 'h1', 'Halls');
        div.render();
        h1.render();
        this.halls.forEach(hall => {
            const hallDiv = new Element(div.element, 'div', '', { class: 'clickable' });
            const p = new Element(hallDiv.element, 'p', hall.name);
            hallDiv.onEvent('click', () => this.routeController.to(`hall/${hall.id}`));
            hallDiv.render();
            p.render();
        });
    }
}

export default HallsPage;
