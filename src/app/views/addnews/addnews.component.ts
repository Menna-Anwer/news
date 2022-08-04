import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/providers/services/news.service';


@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  
  constructor(private fb:FormBuilder,private newsService:NewsService,private router:Router) { }

  newsForm = this.fb.group({
    title:['',Validators.required],
    description:['',Validators.required],
  })

  addnews(news:any){
    this.newsService.addnews(news).subscribe({
      next:()=>{
        this.router.navigateByUrl('shownews')
      }
    })
  }

  get myValues(){
    return this.newsForm.controls
  }

  ngOnInit(): void {
  }

}
