import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

    private ABSOLUTEPATH = 'https://api.themoviedb.org/3/';
    private APIKEY = '6059e4f095cca1ce0633fc4d34252d32';

    constructor(
        private http: Http
    ) {}

    result(res: any) {
        const response = res.json();
        if (response.result == 'ERROR') {
            throw Observable.throw(response);
        } else {
            return res.json();
        }
    }

    // DETALHES DO FILME
    getDetail(id: number): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'movie/'+ id + '?api_key=' + this.APIKEY + '&language=pt-BR';
        return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
    }

    // VIDEO DO FILME
    getVideo(id: number): Observable<any> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'movie/'+ id + '/videos?api_key=' + this.APIKEY + '&language=pt-BR';
        return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
    }

    // LISTAGEM DE FILMES
    searchList(query: string): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'search/movie?api_key=' + this.APIKEY + '&query=' + query + '&page=1&language=pt-BR&include_adult=false';
        return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
    }

    // LISTAGEM DE GÊNEROS
    genderList(): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'genre/movie/list?api_key=' + this.APIKEY + '&language=pt-BR';
        return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
    }
}