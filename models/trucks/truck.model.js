import Model from '/models/model.js';

class Truck extends Model
{
    constructor(length, width, arrival, type, range, hallId)
    {
        super();
        if(this.constructor == Truck)
        {
            throw new Error("Abstract class!");
        }
        this.length = length;
        this.width = width;
        this.arrival = arrival;
        this.type = type;
        this.range = range;
        this.truckColumns = [];
        for(let i = 0; i < length; ++i)
        {
            this.truckColumns[i] = [];
            for(let j = 0; j < width; j++)
            {
                this.truckColumns[i][j] = undefined
            }
        }
        this.hallId = hallId;
    }

    drive(weather)
    {
        throw new Error("Abstract class!");
    }
}

export default Truck;
