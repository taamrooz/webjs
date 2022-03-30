import ObserveController from '/controllers/observe.controller.js';
import Hall from '/models/hall.model.js';
import { HALL_GET_HALLS, HALL_GET_HALL, HALL_GET_CURRENT_HALL,
         HALL_GET_TRUCK_AT_INDEX,
         HALL_CREATE, HALL_ADD_ASSEMBLY_LINE,
         HALL_REMOVE_ASSEMBLY_LINE, HALL_ADD_TRUCK,
         HALL_UPDATE_TRUCK, HALL_REMOVE_TRUCK } from '/actions.js';
import TruckFactory from '/models/trucks/truck.factory.js';
import AssemblyLine from '/models/assemblyline.model.js';

class HallController extends ObserveController
{
    constructor(hallNames = [])
    {
        super();
        this.halls = [];
        hallNames.forEach((name) => {
            this.halls.push(new Hall(name));
        });
        this.currentHall = null;
        this.register(HALL_GET_HALLS, () => this.getHalls());
        this.register(HALL_GET_HALL, (data) => this.getHall(data));
        this.register(HALL_GET_CURRENT_HALL, () => this.getCurrentHall());
        this.register(HALL_GET_TRUCK_AT_INDEX, (data) => this.getTruckAtIndex(data));
        this.register(HALL_CREATE, (data) => this.createHall(data));
        this.register(HALL_ADD_ASSEMBLY_LINE, (data) => this.addAssemblyLine(data));
        this.register(HALL_REMOVE_ASSEMBLY_LINE, (data) => this.removeAssemblyLine(data));
        this.register(HALL_ADD_TRUCK, (data) => this.addTruck(data));
        this.register(HALL_UPDATE_TRUCK, (data) => this.updateTruck(data));
        this.register(HALL_REMOVE_TRUCK, (data) => this.removeTruck(data));
    }

    getHalls()
    {
        return this.halls;
    }

    getHall(data)
    {
        const { id } = data;
        const hall = this.halls.find(hall => hall.id === id);
        this.currentHall = hall;
        return hall;
    }

    getCurrentHall()
    {
        return this.currentHall;
    }

    getTruckAtIndex(data)
    {
        const { index } = data;
        if(index < this.currentHall.trucks.length)
        {
            return this.currentHall.trucks[index];
        }
        return undefined;
    }

    createHall(name)
    {
        this.halls.push(new Hall(name));
        return this.halls;
    }

    addAssemblyLine(data)
    {
        const { id } = data;
        const hall = this.halls.find(hall => hall.id === id);
        hall.assemblyLines.push(new AssemblyLine());
        return hall.assemblyLines.length - 1;
    }

    removeAssemblyLine(id)
    {
        const hall = this.halls.find(hall => hall.id === id)
        hall.assemblyLines.pop();
        return hall;
    }

    addTruck(data)
    {
        const {id, length, width, arrival, type, range} = data;
        const hall = this.halls.find(hall => hall.id === id)
        const truck = TruckFactory.createTruck(length, width, arrival, type, range, id);
        hall.trucks.push(truck);
        return hall;
    }

    updateTruck(data)
    {
        const {id, truckId, truckColumns} = data;
        const hall = this.halls.find(hall => hall.id === id);
        const truck = hall.trucks.find(truck => truck.id === truckId);
        Object.assign(truck, { truckColumns});
    }

    removeTruck(id)
    {
        this.halls.find(hall => hall.id === id).trucks.pop(truck);
        return hall;
    }
}

export default HallController;
