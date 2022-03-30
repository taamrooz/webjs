import Model from '/models/model.js';

class Hall extends Model
{
    constructor(name = '')
    {
        super();
        this.trucks = [];
        this.assemblyLines = [];
        this.name = name;
    }
}

export default Hall;
