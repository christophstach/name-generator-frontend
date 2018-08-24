import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { StateModule } from './state/state.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    StateModule
  ],
  declarations: [],
  exports: [ LayoutModule ]
})
export class CoreModule {
}
