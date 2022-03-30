import Truck from '/models/trucks/truck.model.js';

class PalletTruck extends Truck
{
    constructor(length, width, arrival, type, range, hallId)
    {
        super(length, width, arrival, type, range, hallId);
    }

    drive(weather)
    {
        return true;
    }
}

export default PalletTruck;
