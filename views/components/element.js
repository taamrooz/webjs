import View from '/views/view.js';

class Element extends View
{
    constructor(parent, tag, content = '', attributes = {})
    {
        super(parent);
        this.element = document.createElement(tag);
        this.element.id = this.id;
        for (const attribute in attributes)
        {
            this.element.setAttribute(attribute, attributes[attribute]);
        }
        this.element.innerHTML = content;
    }

    onEvent(event, callback)
    {
        this.bind(this.element, event, callback);
    }

    render(content = '', attributes)
    {
        if(content)
        {
            this.element.innerHTML = content;
        }
        if(attributes)
        {
            for (const attribute in attributes)
            {
                this.element.setAttribute(attribute, attributes[attribute]);
            }
        }
        this.updateDOM();
    }
}

export default Element;
