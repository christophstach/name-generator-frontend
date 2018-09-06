import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  declarations: [],
  exports: [LayoutModule]
})
export class CoreModule {
}
