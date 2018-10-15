import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GeneratorSettingsDialogComponent } from './components/generator-settings-dialog/generator-settings-dialog.component';
import { NgMaterialLayoutComponent } from './components/ng-material-layout/ng-material-layout.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [NgMaterialLayoutComponent, GeneratorSettingsDialogComponent],
  exports: [NgMaterialLayoutComponent],
  entryComponents: [GeneratorSettingsDialogComponent]
})
export class LayoutModule {
}
