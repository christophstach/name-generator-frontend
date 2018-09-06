import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { StateModule } from './state/state.module';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    LayoutModule,
  ],
  declarations: [],
  exports: [LayoutModule]
})
export class CoreModule {
}
