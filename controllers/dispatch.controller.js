class DispatchController
{
    constructor()
    {
        this.controllers = [];        
    }

    registerController(controller)
    {
        this.controllers.push(controller);
    }

    dispatch(dispatchName, dispatchData)
    {
        const length = this.controllers.length;
        for(let i = 0; i < length; ++i)
        {
            const data = this.controllers[i].observe(dispatchName, dispatchData);
            if(data === null)
            {
                continue;
            }
            return data;
        }
        throw new Error(`Unmatched event: ${dispatchName}`);
    }
}

export default DispatchController;
