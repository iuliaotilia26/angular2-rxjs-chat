/**
 * Created by Iulia Mustea on 9/19/2016.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';


@Injectable()
export class WeatherService {
    private weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/city';
// ?id=524901&APPID=07b30b32fe8fe1381e7964b31eebb68f
    constructor(private http: Http) {
    }

    getWeather(cityName: string): Promise<any> {
        const searchParams = new URLSearchParams();
        searchParams.append('q', cityName);
        searchParams.append('APPID', '07b30b32fe8fe1381e7964b31eebb68f');

        return this.http.get(this.weatherUrl, {
            search: searchParams
        })
            .toPromise()
            .then(response => {
                return JSON.stringify(response.json());
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}

export var weatherServiceInjectables: Array<any> = [
    WeatherService
];
