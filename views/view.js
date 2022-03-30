class View
{
    constructor(parent)
    {
        if(this.constructor === View)
        {
            throw new Error('Abstract class!');
        }
        this.parent = parent;
        this.element = null;
        this.generateId();
        this.listeners = [];
        this.bind(document, 'unbind', () => this.unbindAll(true));
    }

    createElementFromHtml(html)
    {
        let temp = document.createElement('template');
        html = html.trim();
        temp.innerHTML = html;
        return temp.content.firstChild;
    }

    bind(element, event, callback)
    {
        element.addEventListener(event, callback);
        this.listeners.push({element, event, callback});
    }

    unbind(element, event)
    {
        const listener = this.listeners.find((listener) => {
            return listener.element === element && event === event;
        });
        listener.element.removeEventListener(event, listener.callback);
    }

    onUnbindAll()
    {
    }

    unbindAll(skipEvent = false)
    {
        this.onUnbindAll();
        if(!skipEvent)
        {
            const unbindEvent = new CustomEvent('unbind');
            document.dispatchEvent(unbindEvent);
        }
        this.listeners.forEach((listener) => {
            listener.element.removeEventListener(listener.event, listener.callback);
        });
    }

    setAttribute(attribute, value)
    {
        this.element.setAttribute(attribute, value);
    }

    removeAttribute(attribute)
    {
        this.element.removeAttribute(attribute);
    }

    setClass(newClass = '')
    {
        this.element.setAttribute('class', newClass);
    }

    addClass(newClass)
    {
        this.element.classList.add(newClass);
    }

    hasClass(classToCheck)
    {
        return this.element.classList.contains(classToCheck);
    }

    removeClass(classToRemove = undefined)
    {
        if(classToRemove !== undefined)
        {
            this.element.classList.remove(classToRemove);
        }
    }

    generateId()
    {
        this.id = crypto.randomUUID();
    }

    render()
    {
        throw new Error('Abstract class!');
    }

    removeFromDOM()
    {
        this.unbindAll(true);
        this.parent.removeChild(this.element);
    }

    updateDOM(html = null)
    {
        if(html)
        {
            this.element = this.createElementFromHtml(html);
        }
        let oldElement = document.getElementById(this.id);
        if(oldElement)
        {
            this.unbindAll(true);
            oldElement.replaceWith(this.element);
        } else {
            this.parent.appendChild(this.element);
        }
    }
}

export default View;
