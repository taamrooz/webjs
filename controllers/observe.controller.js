class ObserveController
{
    constructor(dispatchName = '')
    {
        if(this.constructor == ObserveController)
        {
            throw new Error("Abstract class");
        }
        this.dispatchName = dispatchName;
        this.observables = [];
    }

    register(eventName, callback)
    {
        this.observables.push({event: eventName, callback: callback});
    }

    dispatch(dispatchData)
    {
        const dispatchEvent = new CustomEvent(this.dispatchName, { detail: dispatchData });
        document.dispatchEvent(dispatchEvent);
    }

    observe(eventName, data)
    {
        const self = this;
        const length = this.observables.length;
        for(let i = 0; i < length; ++i)
        {
            if(this.observables[i].event === eventName)
            {
                return self.observables[i].callback(data);
            }
        }
        return null;
    }
}

export default ObserveController;
