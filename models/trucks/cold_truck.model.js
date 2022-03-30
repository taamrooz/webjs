import Truck from '/models/trucks/truck.model.js';

class ColdTruck extends Truck
{
    constructor(length, width, arrival, type, range, hallId)
    {
        super(length, width, arrival, type, range, hallId);
    }

    drive(weather)
    {
        return weather.temp <= 35;
    }
}

export default ColdTruck;
