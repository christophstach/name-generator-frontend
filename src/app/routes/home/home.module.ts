import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CatNamesComponent } from './components/cat-names/cat-names.component';
import { DogNamesComponent } from './components/dog-names/dog-names.component';
import { DragonNamesComponent } from './components/dragon-names/dragon-names.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SillyIdsComponent } from './components/silly-ids/silly-ids.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    LandingPageComponent,
    SillyIdsComponent,
    DragonNamesComponent,
    DogNamesComponent,
    CatNamesComponent
  ]
})
export class HomeModule {
}
