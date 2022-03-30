import Model from '/models/model.js';

class Shape extends Model
{
    constructor(type, width, height)
    {
        super();
        this.type = type;
        this.width = width;
        this.height = height;
    }
}

export default Shape;
