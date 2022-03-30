import Truck from '/models/trucks/truck.model.js';

class FragileTruck extends Truck
{
    constructor(length, width, arrival, type, range, hallId)
    {
        super(length, width, arrival, type, range, hallId);
    }

    drive(weather)
    {
        return weather.raining === false && weather.snowing === false;
    }
}

export default FragileTruck;
