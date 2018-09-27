import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from "../services/data.service";

@Injectable() 
export class GlobalGenre {
    
    public generos: any;

    constructor(
        private http: Http,
        private dataService: DataService
    ) {
        this.dataService.genderList()
        .subscribe((res: any) => {
            this.generos = res;
        });
    }
}