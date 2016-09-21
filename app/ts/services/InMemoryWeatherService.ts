import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryWeatherService implements InMemoryDbService {
    createDb() {
        return {"coord":{"lon":24.95,"lat":60.18},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":286.74,"pressure":1020,"humidity":77,"temp_min":285.93,"temp_max":287.59},"wind":{"speed":3.21,"deg":355.502},"clouds":{"all":0},"dt":1474283283,"sys":{"type":3,"id":255369,"message":0.1716,"country":"FI","sunrise":1474257543,"sunset":1474302416},"id":654706,"name":"Kallio","cod":200};
    }
}