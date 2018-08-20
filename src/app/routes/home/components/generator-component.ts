import { MatSnackBar } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { GeneratorOptionsInterface } from '../../../shared/interfaces/generator-options.interface';
import { GeneratorServiceInterface } from '../../../shared/interfaces/generator-service.interface';
import { StringHelperService } from '../../../shared/services/string-helper.service';

export abstract class GeneratorComponent {
  name = 'Click or tap to generate random name';
  options: GeneratorOptionsInterface = {
    mode: 'separated',
    separator: '-'
  };

  protected constructor(
    protected readonly generatorService: GeneratorServiceInterface,
    protected readonly stringHelperService: StringHelperService,
    protected readonly clipboardService: ClipboardService,
    protected readonly snackBarService: MatSnackBar
  ) {
  }

  protected generate() {
    this.name = this.generatorService.random();
    this.name = this.options.prefix ? this.options.prefix + this.name : this.name;
    this.name = this.options.suffix ? this.name + this.options.suffix : this.name;

    switch (this.options.mode) {
      case 'separated':
        this.name = this.stringHelperService.removeSpecialChars(this.name);
        this.name = this.stringHelperService.removeDiacritics(this.name);
        this.name = this.name.toLowerCase().split(' ').join(this.options.separator);
        break;
    }

    this.clipboardService.copyFromContent(this.name);
    this.snackBarService.open(`${this.name} was copied to clipboard`, null, { duration: 2500 });
  }

}
