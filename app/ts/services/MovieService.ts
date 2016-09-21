/**
 * Created by Iulia Mustea on 9/21/2016.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import any = jasmine.any;


@Injectable()
export class MovieService {
    private movieUrl = 'http://www.omdbapi.com/';
    constructor(private http: Http) {
    }

    getMovie(movieName: string): Promise<any> {
        const searchParams = new URLSearchParams();
        searchParams.append('s', movieName);

        return this.http.get(this.movieUrl, {
            search: searchParams
        })
            .toPromise()
            .then(response => {
                const searchResults:Array<any> = response.json().Search;
                return searchResults.map((item) => `Movie with the requested title made in ${item.Year} with the poster ${item.Poster}`)
                    .join('\n');
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
    }
}

export var movieServiceInjectables: Array<any> = [
    MovieService
];
