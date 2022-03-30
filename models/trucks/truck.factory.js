import { TruckTypes } from '/models/trucks/truck_type.model.js';
import ColdTruck from '/models/trucks/cold_truck.model.js';
import FragileTruck from '/models/trucks/fragile_truck.model.js';
import GeneralTruck from '/models/trucks/general_truck.model.js';
import PalletTruck from  '/models/trucks/pallet_truck.model.js';
import ExpressTruck from '/models/trucks/express_truck.model.js';

class TruckFactory
{
    static dictionary = [
        {
            name: TruckTypes.COLD.description,
            value: ColdTruck
        },
        {
            name: TruckTypes.FRAGILE.description,
            value: FragileTruck
        },
        {
            name: TruckTypes.GENERAL.description,
            value: GeneralTruck
        },
        {
            name: TruckTypes.PALLET.description,
            value: PalletTruck
        },
        {
            name: TruckTypes.EXPRESS.description,
            value: ExpressTruck
        }
    ];

    static createTruck(length, width, arrival, type, range, hallId)
    {
        const truck = this.dictionary.find((truck) => truck.name === type);
        if(!truck)
        {
            throw new Error('No truck found');
        }
        return new truck.value(length, width, arrival, type, range, hallId);
    }
}

export default TruckFactory;
