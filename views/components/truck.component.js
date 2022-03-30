import ActorComponent from '/views/components/actor.component.js';
import Element from '/views/components/element.js';
import { HALL_UPDATE_TRUCK, WEATHER_GET_LOCAL_WEATHER } from '/actions.js';

class TruckComponent extends ActorComponent
{
    constructor(parent, truck, routeController)
    {
        super(parent, routeController);
        this.truck = truck;
        this.truckColumns = [];
        this.iterationCount = 0;
    }

    findShape(shapeId, coords)
    {
        for(let i = 0; i < coords.length; ++i)
        {
            for(let j = 0; j < coords[i].length; ++j)
            {
                if(shapeId === coords[i][j])
                {
                    return [j, i];
                }
            }
        }
    }

    getShapeType(shapeElement)
    {
        const list = Object.values(shapeElement.classList);
        const type = list.find((l) => l !== 'shape');
        return type;
    }

    getTruckColumns()
    {
        return this.truckColumns.map((row) => {
            return row.map((col) => {
                const list = Object.values(col.element.classList);
                return list.find((l) => l !== 'truck-col' && l !== 'truck-shape');
            });
        });
    }

    clearTruckColumns()
    {
        const toClear = this.getTruckColumns();
        for(let i = 0; i < toClear.length; ++i)
        {
            for(let j = 0; j < toClear[i].length; ++j)
            {
                this.truckColumns[i][j].removeClass(toClear[i][j]);
                this.truckColumns[i][j].removeClass('truck-shape');
            }
        }
    }

    validateAndPlace(shapeElement, coords, x, y)
    {
        const [shapeX, shapeY] = this.findShape(shapeElement.id, coords);
        const shapeType = this.getShapeType(shapeElement);
        let columnsToCheck = [];
        for(let i = 0; i < coords.length; ++i)
        {
            for(let j = 0; j < coords[i].length; ++j)
            {
                if(coords[i][j] !== null)
                {
                    columnsToCheck.push([j, i]);
                }
            }
        }
        let correctColumns = [];
        for(let i = 0; i < columnsToCheck.length; ++i)
        {
            const [columnX, columnY] = columnsToCheck[i];
            const newX = x + columnX - shapeX;
            const newY = y + columnY - shapeY;
            if(newY < 0 || newY >= this.truckColumns.length)
            {
                return false;
            }
            if(newX < 0 || newX >= this.truckColumns[newY].length)
            {
                return false;
            }
            if(this.truckColumns[newY][newX].element.classList.contains('truck-shape'))
            {
                return false;
            }
            correctColumns.push([newX, newY]);
        }
        correctColumns.forEach((column) => {
            const [colX, colY] = column;
            this.truckColumns[colY][colX].element.classList.add('truck-shape', shapeType);
        });
        return true;
    }

    render()
    {
        const marginBottom = 5 - this.truck.width;
        const div = new Element(this.parent, 'div', '', { 'class': `truck margin-bottom-${marginBottom} animation-duration-${this.truck.arrival}` });
        const weather = this.routeController.dispatch(WEATHER_GET_LOCAL_WEATHER);
        if(this.truck.drive(weather))
        {
            div.addClass('truck-animation');
        }
        if(this.paused)
        {
            div.addClass('paused');
        } else
        {
            div.addClass('playing');
        }
        div.render();
        for(let i = 0; i < this.truck.width; ++i)
        {
            const truckRow = new Element(div.element, 'div', '', { 'class': 'truck-row' });
            truckRow.render();
            this.truckColumns[i] = [];
            for(let j = 0; j < this.truck.length; ++j)
            {
                const truckCol = new Element(truckRow.element, 'div', '', { 'class': 'truck-col'});
                if(this.truck.truckColumns[i][j])
                {
                    truckCol.addClass(this.truck.truckColumns[i][j]);
                }
                truckCol.onEvent('dragover', (ev) => {
                    ev.preventDefault();
                    ev.dataTransfer.dropEffect = 'move';
                });
                truckCol.onEvent('drop', (ev) => {
                    const shape = ev.dataTransfer.getData('text/plain');
                    const shapeEl = document.getElementById(shape);
                    if(!shape || !shapeEl) {
                        ev.preventDefault();
                        return false;
                    }
                    const {fromTray, coords} = JSON.parse(ev.dataTransfer.getData('application/json'));

                    if(!this.validateAndPlace(shapeEl, coords, j, i))
                    {
                        ev.preventDefault();
                        return false;
                    }
                    this.routeController.dispatch(
                        HALL_UPDATE_TRUCK,
                        {
                            id: this.truck.hallId,
                            truckId: this.truck.id,
                            truckColumns: this.getTruckColumns()
                        });
                    const shapePlaced = new CustomEvent('shapeplaced', { detail: {id: shape, fromTray}});
                    document.dispatchEvent(shapePlaced);
                });
                truckCol.render();
                this.truckColumns[i][j] = truckCol;
            }
        }
        div.onEvent('animationiteration', () => {
            this.iterationCount++;
            if(this.iterationCount % 2 !== 0)
            {
                this.clearTruckColumns();
            }
        });
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

export default TruckComponent;
