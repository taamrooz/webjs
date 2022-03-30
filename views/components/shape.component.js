import ActorComponent from '/views/components/actor.component.js';
import Element from '/views/components/element.js';
import Shape from '/models/shape.model.js';

class ShapeComponent extends ActorComponent
{
    constructor(parent, shape, routeController)
    {
        super(parent, routeController);
        this.shape = shape;
    }

    render(fromTray)
    {
        const ul = new Element(this.parent, 'ul', '', {'class': 'shape-container', 'draggable': true});
        this.element = ul.element;
        let self = this;
        if(!fromTray)
        {
            ul.addClass('shape-animation');
            ul.onEvent('animationend', () => {
                ul.removeFromDOM();
            });
            if(this.paused)
            {
                ul.addClass('paused');
            } else
            {
                ul.addClass('playing');
            }
        }
        ul.render();
        let coords = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        switch(this.shape.type)
        {
            case "STRAIGHT":
            {
                const t1 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t4 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m2 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b2 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                coords[0][0] = t1.element.id;
                coords[0][1] = t2.element.id;
                coords[0][2] = t3.element.id;
                coords[0][3] = t4.element.id;
                t1.render();
                t2.render();
                t3.render();
                t4.render();
                m1.render();
                m2.render();
                m3.render();
                m4.render();
                b1.render();
                b2.render();
                b3.render();
                b4.render();
            }
            break;
            case "SQUARE":
            {
                const t1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const t2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b2 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                coords[0][1] = t2.element.id;
                coords[0][2] = t3.element.id
                coords[1][1] = m2.element.id;
                coords[1][2] = m3.element.id;
                t1.render();
                t2.render();
                t3.render();
                t4.render();
                m1.render();
                m2.render();
                m3.render();
                m4.render();
                b1.render();
                b2.render();
                b3.render();
                b4.render();
            }
            break;
            case "TSYMBOL":
            {
                const t1 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b2 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                coords[0][0] = t1.element.id;
                coords[0][1] = t2.element.id;
                coords[0][2] = t3.element.id;
                coords[1][1] = m2.element.id;
                t1.render();
                t2.render();
                t3.render();
                t4.render();
                m1.render();
                m2.render();
                m3.render();
                m4.render();
                b1.render();
                b2.render();
                b3.render();
                b4.render();              
            }
            break;
            case "LSYMBOL":
            {
                const t1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const t2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const t4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const b3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const b4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                coords[0][1] = t2.element.id;
                coords[1][1] = m2.element.id;
                coords[2][1] = b2.element.id;
                coords[2][2] = b3.element.id;
                t1.render();
                t2.render();
                t3.render();
                t4.render();
                m1.render();
                m2.render();
                m3.render();
                m4.render();
                b1.render();
                b2.render();
                b3.render();
                b4.render();                
            }
            break;
            case "SKEW":
            {
                const t1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const t2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t3 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const t4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m1 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m2 = new Element(ul.element, 'li', '', {'class': `shape ${this.shape.type}`});
                const m3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const m4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b1 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b2 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b3 = new Element(ul.element, 'li', '', {'class': 'shape'});
                const b4 = new Element(ul.element, 'li', '', {'class': 'shape'});
                coords[0][1] = t2.element.id;
                coords[0][2] = t3.element.id;
                coords[1][0] = m1.element.id;
                coords[1][1] = m2.element.id;
                t1.render();
                t2.render();
                t3.render();
                t4.render();
                m1.render();
                m2.render();
                m3.render();
                m4.render();
                b1.render();
                b2.render();
                b3.render();
                b4.render();               
            }
            break;
        }

        ul.onEvent('dragstart', (event) => {
            const draggedElement = document.elementFromPoint(event.clientX, event.clientY);
            const draggedStyle = window.getComputedStyle(draggedElement);
            if(draggedStyle.visibility !== 'visible' || draggedElement.tagName !== 'LI')
            {
                event.preventDefault();
                return false;
            }
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', draggedElement.id);
            event.dataTransfer.setData('application/json', JSON.stringify({fromTray, coords}));
        });
        if(!fromTray)
        {
            this.onSimulationState((event) => {
                if(event.detail.state)
                {
                    ul.addClass('paused');
                    ul.removeClass('playing');
                } else
                {
                    ul.addClass('playing');
                    ul.removeClass('paused');
                }
            });
        }
    }
}

export default ShapeComponent;
