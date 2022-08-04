import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  invalidEmail:boolean = false
  invalidAge:boolean = false
  invalidPassword:boolean = false
  invalidPhonenumber:boolean = false
  msgAge:string = ''
  msgPassword:string = ''
  msgPhonenumber:string = ''
  constructor(private authService:AuthService,private router:Router) { }
  
  signUp(credentials:any){
    this.authService.signUp(credentials).subscribe({
      next:(res:any)=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        this.router.navigateByUrl('profile')
      },
      error:(httpError:any)=>{
        console.log(httpError)
       if(httpError.error.code){
         this.invalidEmail = true
       }
       else if(httpError.error.errors.age)
       {
         this.invalidAge = true
         this.msgAge = httpError.error.errors.age.message
       }
       else if(httpError.error.errors.password)
       {
         this.invalidPassword = true
         this.msgPassword = httpError.error.errors.password.message
       }
       else if (httpError.error.errors.phonenumber){
        this.invalidPhonenumber = true
        this.msgPhonenumber = httpError.error.errors.phonenumber.message
       }


       
      }
    })
  }
  changeEmail(){
    this.invalidEmail = false
  }
  changeAge(){
    this.invalidAge = false
  }
  changePassword(){
    this.invalidPassword = false
  }
  changePhonenumber(){
    this.invalidPhonenumber = false
  }
  ngOnInit(): void {
  }

}

