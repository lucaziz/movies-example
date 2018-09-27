import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public param: any;
  public loading: boolean;
  public movie: any;
  public embededVideo: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (this.route.snapshot.params['id']) {
      this.loading = true;
      this.dataService.getDetail(this.route.snapshot.params['id'])
      .subscribe((res: any) => {
        this.movie = res;
        if(res.runtime) {
          this.movie.runtime = this.duration(res.runtime);
        }
        if (res.video) {
          this.dataService.getVideo(this.route.snapshot.params['id'])
          .subscribe((video: any) => {
            this.embededVideo = video.results.key;
          });

        }
        const spokenLanguage = res.spoken_languages.filter(language => language['iso_639_1'] == res.original_language);
        this.movie.original_language = (spokenLanguage.length ? spokenLanguage[0]['name'] : 'Indefinido');
        this.loading = false;
      },
      erro => {
        console.warn(erro);
        this.loading = false;
      });
    }

  }

  duration(time: number) {
    let minutes = time % 60;
    let hours = (time-minutes)/60;
    return hours + 'h ' + minutes + 'min';
  }
    
}
