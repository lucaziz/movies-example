import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GlobalGenre } from '../../shared/GlobalGenre';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public queryList = new Subject<any>();
  public queryListString: string;
  public moviesList: any[];
  public isReady: boolean;
  public loading: boolean;
  public currentPage: number = 1;

  constructor(
    private dataService: DataService,
    private genreList: GlobalGenre
  ) {
    this.queryList
      .pipe(debounceTime(500))
      .subscribe((query: string) => {
          if(query.length >= 3) {
            this.searchMoviesList(query);
          }
          if(query.length <= 0) {
            this.moviesList = [];
          }
      });
  }

  ngOnInit() {
    this.isReady = false;
  }
  

  searchMoviesList(query: string) {
    this.loading = true;
    this.dataService.searchList(query)
    .subscribe((res: any) => {
      this.moviesList = res.results;
      res.results.forEach((movie, indexMovie) => {
        if (movie.genre_ids.length > 0) {
          movie.genre_ids.forEach((genre, indexGenre) => {
            this.moviesList[indexMovie].genre_ids[indexGenre] = this.genreList.generos['genres'].filter(res => res.id === genre)[0]['name'];
          });
        }
      });
      this.loading = false;
    },
    erro => {
      console.warn(erro);
      this.loading = false;
    });
  }
}
