import { NgModule } from '@angular/core';
import { NgMaterialLayoutComponent } from './components/ng-material-layout/ng-material-layout.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ NgMaterialLayoutComponent ],
  exports: [ NgMaterialLayoutComponent ]
})
export class LayoutModule {
}
