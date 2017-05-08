import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    private moviesUrl = 'api/movies';

    constructor(private http: Http) { }

    getMovies(): Observable<IMovie[]> {
        return this.http.get(this.moviesUrl)
            .map((res: Response) => <IMovie[]> res.json().data)
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMovie(id: number): Observable<IMovie> {
        if (id === 0) {
            return Observable.of(this.initializeMovie());
        };
        const url = `${this.moviesUrl}/${id}`;
        return this.http.get(url)
            .map((res: Response) => {
                let body = res.json();
                return <IMovie[]> body.data || {};
            })
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private initializeMovie(): IMovie {
        // Return an initialized object
        return {
            id: 0,
            approvalRating: null,
            description: '',
            director: '',
            imageurl: '',
            mpaa: '',
            price: null,
            releaseDate: '',
            starRating: null,
            title: ''
        };
    }
}
