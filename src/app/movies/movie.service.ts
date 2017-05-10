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
            .map((res: Response) => <IMovie[]>res.json().data)
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
                const body = res.json();
                return <IMovie>body.data || {};
            })
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteMovie(id: number): Observable<Response> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        const url = `${this.moviesUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteMovie: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveMovie(movie: IMovie): Observable<IMovie> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        if (movie.id === 0) {
            return this.createMovie(movie, options);
        }
        return this.updateMovie(movie, options);
    }

    private createMovie(movie: IMovie, options: RequestOptions): Observable<IMovie> {
        movie.id = undefined;
        return this.http.post(this.moviesUrl, movie, options)
            .map((res: Response) => <IMovie[]>res.json().data)
            .do(data => console.log('createMovie: ' + JSON.stringify(data)))
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

    private updateMovie(movie: IMovie, options: RequestOptions): Observable<IMovie> {
        const url = `${this.moviesUrl}/${movie.id}`;
        return this.http.put(url, movie, options)
            .map(() => movie)
            .do(data => console.log('updateMovie: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
}
