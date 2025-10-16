import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [NavbarComponent,HeroComponent,FeaturesComponent,FooterComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

}
