import Model from '/models/model.js';

class Weather extends Model
{
    constructor()
    {
        super();
        this.raining = false;
        this.snowing = false;
        this.temp = 0;
        
    }

    fromJson(json)
    {
        this.temp = json.main.temp;
        if(json.snow) {
            this.snowing = true;
        }
        if(json.rain) {
            this.raining = true;
        }
    }
}

export default Weather;
