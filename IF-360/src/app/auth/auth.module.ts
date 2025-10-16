import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    provideHttpClient(withFetch())
  ]
})
export class AuthModule { }
