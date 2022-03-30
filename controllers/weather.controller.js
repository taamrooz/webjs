import ObserveController from '/controllers/observe.controller.js';
import { WEATHER_SET_CITY, WEATHER_GET_WEATHER, WEATHER_GET_CITY, WEATHER_GET_LOCAL_WEATHER } from '/actions.js';
import { WEATHER_API_URL, WEATHER_API_KEY } from '/config.js';
import Weather from '/models/weather.model.js';

class WeatherController extends ObserveController
{
    constructor()
    {
        super('weatherchanged');
        this.weather = new Weather();
        this.city = 'Eindhoven';
        this.register(WEATHER_GET_CITY, () => this.getCity());
        this.register(WEATHER_SET_CITY, (data) => this.setCity(data));
        this.register(WEATHER_GET_WEATHER, () => this.getWeather());
        this.register(WEATHER_GET_LOCAL_WEATHER, () => this.getLocalWeather());
    }

    getCity()
    {
        return this.city;
    }

    setCity(data)
    {
        this.city = data.city;
    }

    getLocalWeather()
    {
        return this.weather;
    }

    getWeather()
    {
        let self = this;
        fetch(WEATHER_API_URL + self.city + `&appid=${WEATHER_API_KEY}&units=metric`)
            .then(res => {
                if(!res.ok)
                {
                    self.dispatch({weather: 'City not found or api error'});
                }
                return res.json()
            }).then(json => {
                self.setWeather(json);
            }).catch(err => {
                self.dispatch({weather: 'Could not resolve the request!'});
            });
    }

    setWeather(json)
    {
        this.weather.fromJson(json);
        this.dispatch({weather: 'Updated the weather!' });
    }
}

export default WeatherController;
