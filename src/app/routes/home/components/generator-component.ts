import { MatSnackBar } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Root } from '../../../core/state/reducers';
import { GeneratorServiceInterface } from '../../../shared/interfaces/generator-service.interface';
import { GeneratorSettingsInterface } from '../../../shared/interfaces/generator-settings.interface';
import { StringHelperService } from '../../../shared/services/string-helper.service';

export abstract class GeneratorComponent {
  name = 'Click or tap to generate random name';
  settings: GeneratorSettingsInterface;

  protected constructor(
    protected readonly generatorService: GeneratorServiceInterface,
    protected readonly stringHelperService: StringHelperService,
    protected readonly snackBarService: MatSnackBar,
    protected readonly store: Store<Root>
  ) {
    this.store.pipe(
      select('generatorSettings')
    ).subscribe((generatorSettings: GeneratorSettingsInterface) => {
      this.settings = generatorSettings;
    });
  }

  protected generate() {
    this.name = this.generatorService.random();
    this.name = this.settings.prefix ? this.settings.prefix + this.name : this.name;
    this.name = this.settings.suffix ? this.name + this.settings.suffix : this.name;

    switch (this.settings.mode) {
      case 'separated':
        this.name = this.stringHelperService.removeSpecialChars(this.name);
        this.name = this.stringHelperService.removeDiacritics(this.name);
        this.name = this.name.toLowerCase().split(' ').join(this.settings.separator);
        break;
    }

    // this.clipboardService.copyFromContent(this.name);
    this.snackBarService.open(`${this.name} was copied to clipboard`, null, { duration: 2500 });
  }

}
