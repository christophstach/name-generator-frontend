import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { SillyIdsComponent } from './components/silly-ids/silly-ids.component';
import { DragonNamesComponent } from './components/dragon-names/dragon-names.component';
import { DogNamesComponent } from './components/dog-names/dog-names.component';
import { CatNamesComponent } from './components/cat-names/cat-names.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [ LandingPageComponent, SillyIdsComponent, DragonNamesComponent, DogNamesComponent, CatNamesComponent ]
})
export class HomeModule {
}
