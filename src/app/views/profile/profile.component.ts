import { Component, OnInit } from '@angular/core';
import { Reporters } from 'src/app/interface/userinterface';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  reporter:Reporters = {}
  constructor(private reporterService:UserService) { }
  getProfile(){
    this.reporterService.profile().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.reporter = res
      },
      error:(httpError:any)=>{
        console.log(httpError)
      }
    })
  }

  ngOnInit(): void {
    this.getProfile()
  }
}
