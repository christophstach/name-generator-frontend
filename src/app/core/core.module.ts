import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { StateModule } from './state/state.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    StateModule,
    ClipboardModule
  ],
  declarations: [],
  exports: [ LayoutModule ]
})
export class CoreModule {
}
