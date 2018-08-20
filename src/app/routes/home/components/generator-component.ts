import { StringHelperService } from '../../../shared/services/string-helper.service';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar } from '@angular/material';
import { GeneratorServiceInterface } from '../../../shared/interfaces/generator-service.interface';
import { GeneratorOptionsInterface } from '../../../shared/interfaces/generator-options.interface';

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
    switch (this.options.mode) {
      case 'normal':
        this.name = this.generatorService.random();
        break;
      case 'separated':
        this.name = this.stringHelperService.removeDiacritics(
          this.stringHelperService.removeSpecialChars(
            this.generatorService.random()
          )
        ).toLowerCase().split(' ').join(this.options.separator);
        break;
    }

    this.clipboardService.copyFromContent(this.name);
    this.snackBarService.open(`${this.name} was copied to clipboard`, null, { duration: 2500 });
  }

}
