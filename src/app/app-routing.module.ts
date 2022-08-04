import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewsComponent } from './views/addnews/addnews.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ShownewsComponent } from './views/shownews/shownews.component';
import { SignupComponent } from './views/signup/signup.component';
import { UpdateComponent } from './views/update/update.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'profile',component:ProfileComponent},
  {path:'addnews',component:AddnewsComponent},
  {path:'shownews',component:ShownewsComponent},
  {path:'update/:id',component:UpdateComponent}
  
]
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
