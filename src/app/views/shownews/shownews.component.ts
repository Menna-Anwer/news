import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interface/newsinterfac';
import { NewsService } from 'src/app/providers/services/news.service';


@Component({
  selector: 'app-shownews',
  templateUrl: './shownews.component.html',
  styleUrls: ['./shownews.component.css']
})
export class ShownewsComponent implements OnInit {

  news:News[] = []
  constructor(private newsService:NewsService) { }

  getnews(){
    this.newsService.shownews().subscribe({
      next:(res:any)=>{
        this.news=res
      },
      error:(httpError:any)=>{
        console.log(httpError)
      }
    })
  }
  deletnews(id:any,i:number){
    this.newsService.delete(id).subscribe({
      next:()=>{
        this.news.splice(i,1)
      }
    })
  }

  ngOnInit(): void {
    this.getnews()
  }

}
