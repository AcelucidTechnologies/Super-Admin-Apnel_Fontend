import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../_modules/shared.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ContentComponent } from './content/content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    ContentComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
