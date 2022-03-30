import View from '/views/view.js';
import { WEATHER_GET_CITY, WEATHER_SET_CITY, WEATHER_GET_WEATHER } from '/actions.js';
import Element from '/views/components/element.js';

class WeatherPage extends View
{
    constructor(parentElement, routeController)
    {
        super(parentElement);
        this.routeController = routeController;
        this.city = this.routeController.dispatch(WEATHER_GET_CITY);
    }

    getWeather()
    {
        return this.routeController.dispatch(WEATHER_GET_WEATHER);
    }

    render()
    {
        const div = new Element(this.routeController.root, 'div');
        const h1 = new Element(div.element, 'h1', 'Weather');
        const input = new Element(div.element, 'input', '', {'type': 'text', 'value': this.city});
        const label = new Element(div.element, 'label', 'City', { 'for': input.element.id });
        const weather = new Element(div.element, 'p');
        const button = new Element(div.element, 'button', 'Get weather!');
        button.onEvent('click', () => {
            this.getWeather();
        });
        input.onEvent('change', (event) => {
            this.city = event.target.value;
            this.routeController.dispatch(WEATHER_SET_CITY, {city: this.city});
        });
        this.bind(document, 'weatherchanged',  (data) => {
            weather.render(JSON.stringify(data.detail.weather));
        });
        
        div.render();
        h1.render();
        label.render();
        input.render();
        weather.render();
        button.render();
    }
}

export default WeatherPage;
