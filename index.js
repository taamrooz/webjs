import DispatchController from '/controllers/dispatch.controller.js';
import RouteController from '/controllers/route.controller.js';
import SimulationController from '/controllers/simulation.controller.js';
import WeatherController from '/controllers/weather.controller.js';
import HallController from '/controllers/hall.controller.js';
import ShapeController from '/controllers/shape.controller.js';

const dispatch = new DispatchController();

const hallController = new HallController(['Hall One', 'Hall Two']);
const hall = hallController.getHalls()[0];
hallController.addTruck({id: hall.id, length: 5, width: 5, arrival: 1, type: 'COLD', range: 5});
hallController.addTruck({id: hall.id, length: 3, width: 2, arrival: 5, type: 'COLD', range: 5});
hallController.addAssemblyLine({id: hall.id});
hallController.addAssemblyLine({id: hall.id});

const weatherController = new WeatherController();
//weatherController.getWeather();

dispatch.registerController(weatherController);
dispatch.registerController(new SimulationController());
dispatch.registerController(hallController);
dispatch.registerController(new ShapeController());

var router = new RouteController(dispatch, [
    { name: 'halls', location: 'halls.page.js', nav: true },
    { name: 'weather', location: 'weather.page.js', nav: true },
    { name: 'hall', location: 'hall.page.js', nav: false },
    { name: 'add_truck', location: 'add_truck.page.js', nav: false },
    { name: 'not_found', location: 'not_found.page.js', nav: false }
]);

router.drawNavigation();
