import View from '/views/view.js';
import Element from '/views/components/element.js';
import { HALL_ADD_TRUCK, HALL_GET_CURRENT_HALL } from '/actions.js';
import { TruckTypes } from '/models/trucks/truck_type.model.js';


class AddTruckPage extends View
{
    constructor(parent, routeController)
    {
        super(parent);
        this.routeController = routeController;
        this.length = null;
        this.width = null;
        this.arrival = null;
        this.type = null;
        this.range = null;
        this.minLength = 3;
        this.maxLength = 10;
        this.minWidth = 3;
        this.maxWidth = 5;

        this.minArrival = 1;
        this.maxArrival = 5;
        this.minRange = 1;
        this.maxRange = 500;
    }

    validateLengthAndWidth(length, width)
    {
        if(!Number.isInteger(length) || !Number.isInteger(width))
        {
            return false;
        }
        const intLength = parseInt(length);
        const intWidth = parseInt(width);
        if(intLength < this.minLength || intLength > this.maxLength)
        {
            return false;
        }
        if(intWidth < this.minWidth || intWidth > this.maxWidth)
        {
            return false;
        }
        return true;
    }

    validateArrivalAndRange(arrival, range)
    {
        if(!Number.isInteger(arrival) || !Number.isInteger(range))
        {
            return false;
        }
        const intArrival = parseInt(arrival);
        const intRange = parseInt(range);
        if(intArrival < this.minArrival || intArrival > this.maxArrival)
        {
            return false;
        }
        if(intRange < this.minRange || intRange > this.maxRange)
        {
            return false;
        }
        return true;
    }

    render()
    {
        const div = new Element(this.routeController.root, 'div', '', {'style': 'width: 100%;'});
        const h1 = new Element(div.element, 'h1', 'Add truck');
        div.render();
        h1.render();
        this.renderStep1(div);
        this.renderStep2(div);
        this.renderStep3(div);
    }

    renderStep1(div)
    {
        const formDiv = new Element(div.element, 'div', '', {'class': 'form-group'});
        const lengthInput = new Element(formDiv.element, 'input', '', {'type': 'number', 'id': 'length', 'autofocus': 'true'});
        const lengthText = new Element(formDiv.element, 'label', 'Length', {'for': 'length'});

        const widthInput = new Element(formDiv.element, 'input', '', {'type': 'number', 'id': 'width'});
        const widthText = new Element(formDiv.element, 'label', 'Width', {'for': 'width'});

        const errors = new Element(formDiv.element, 'p', 'Width or length does not meet requirements', { 'class': 'hidden error'});

        const nextButton = new Element(formDiv.element, 'button', 'Next');

        document.addEventListener(
            'step2', () =>
                {
                    formDiv.setClass('hidden');
                    lengthInput.setClass('hidden');
                    lengthText.setClass('hidden');
                    widthInput.setClass('hidden');
                    widthText.setClass('hidden');
                    nextButton.setClass('hidden');
                    errors.setClass('hidden');
                }
        );
        lengthInput.onEvent('change', (event) => {
            this.length = parseInt(event.target.value);
        });
        widthInput.onEvent('change', (event) => {
            this.width = parseInt(event.target.value);
        });
        nextButton.onEvent('click', () => {
            if(this.validateLengthAndWidth(this.length, this.width))
            {
                const step2Event = new CustomEvent('step2');
                document.dispatchEvent(step2Event);
            } else {
                errors.removeClass('hidden');
            }
        });
        
        formDiv.render();
        lengthText.render();
        lengthInput.render();

        widthText.render();
        widthInput.render();
        errors.render();
        nextButton.render();
    }

    renderStep2(div)
    {
        const formDiv = new Element(div.element, 'div', '', {'class': 'form-group hidden'});
        const arrivalInput = new Element(formDiv.element, 'input', '', {'type': 'number', 'id': 'arrival', 'class': 'hidden', 'autofocus': 'true'});
        const arrivalText = new Element(formDiv.element, 'label', 'Arrival', {'for': 'arrival', 'class': 'hidden'});

        const rangeInput = new Element(formDiv.element, 'input', '', {'type': 'number', 'id': 'range', 'class': 'hidden'});
        const rangeText = new Element(formDiv.element, 'label', 'Range', {'for': 'range', 'class': 'hidden'});

        const errors = new Element(formDiv.element, 'p', 'Range or arrival does not meet requirements', { 'class': 'hidden error'});

        const nextButton = new Element(formDiv.element, 'button', 'Next', {'class': 'hidden'});

        document.addEventListener(
            'step2', () =>
                {
                    formDiv.removeClass('hidden');
                    arrivalInput.removeClass('hidden');
                    arrivalText.removeClass('hidden');
                    rangeInput.removeClass('hidden');
                    rangeText.removeClass('hidden');
                    nextButton.removeClass('hidden');
                }
        );

        document.addEventListener(
            'step3', () =>
                {
                    formDiv.setClass('hidden');
                    arrivalInput.setClass('hidden');
                    arrivalText.setClass('hidden');
                    rangeInput.setClass('hidden');
                    rangeText.setClass('hidden');
                    nextButton.setClass('hidden');
                    errors.setClass('hidden');
                }
        );
        arrivalInput.onEvent('change', (event) => {
            this.arrival = parseInt(event.target.value);
        });
        rangeInput.onEvent('change', (event) => {
            this.range = parseInt(event.target.value);
        });
        nextButton.onEvent('click', () => {
            if(this.validateArrivalAndRange(this.arrival, this.range))
            {
                const step3Event = new CustomEvent('step3');
                document.dispatchEvent(step3Event);
            } else {
                errors.setClass('error');
            }
        });
        
        formDiv.render();
        arrivalText.render();
        arrivalInput.render();

        rangeText.render();
        rangeInput.render();
        errors.render();
        nextButton.render();
    }

    renderStep3(div)
    {
        const formDiv = new Element(div.element, 'div', '', {'class': 'form-group hidden'});

        formDiv.render();
        const select = new Element(formDiv.element, 'select', '', {'class': 'hidden'});
        select.render();
        for(const truckType in TruckTypes)
        {
            const option = new Element(select.element, 'option', truckType);
            option.render();
        }

        const nextButton = new Element(formDiv.element, 'button', 'Done', {'class': 'hidden'});
        nextButton.render();
        this.bind(document, 'step3',() =>
                  {
                      formDiv.removeClass('hidden');
                      select.removeClass('hidden');
                      nextButton.removeClass('hidden');
                  });
        
        nextButton.onEvent('click', () => {
            const hall = this.routeController.dispatch(HALL_GET_CURRENT_HALL);
            this.routeController.dispatch(
                HALL_ADD_TRUCK,
                {
                    id: hall.id,
                    length: this.length,
                    width: this.width,
                    arrival: this.arrival,
                    type: select.element.value,
                    range: this.range
                }
            );
            this.routeController.to(`hall/${hall.id}`);
        });
        

    }
}

export default AddTruckPage;
