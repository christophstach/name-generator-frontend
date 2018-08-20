import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeneratorSettingsInterface } from '../../../../shared/interfaces/generator-settings.interface';
import { Set } from '../../../state/actions/generator-settings.action';
import { Root } from '../../../state/reducers';

@Component({
  selector: 'app-generator-settings-dialog',
  templateUrl: './generator-settings-dialog.component.html',
  styleUrls: [ './generator-settings-dialog.component.scss' ]
})
export class GeneratorSettingsDialogComponent {
  settingsForm: FormGroup;
  generatorSettings: GeneratorSettingsInterface;

  private generatorSettingsSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  constructor(
    public readonly dialogRef: MatDialogRef<GeneratorSettingsDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store<Root>
  ) {
    this.createForm();

    this.generatorSettingsSubscription = this.store.pipe(
      select('generatorSettings')
    ).subscribe((generatorSettings: GeneratorSettingsInterface) => {
      this.generatorSettings = generatorSettings;
      this.settingsForm.setValue(generatorSettings);
    });
  }

  createForm() {
    this.settingsForm = this.fb.group({
      mode: [],
      separator: [],
      prefix: [],
      suffix: []
    });

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.valueChangesSubscription = this.settingsForm.valueChanges.subscribe((values: GeneratorSettingsInterface) => {
      if (values.mode === 'normal') {
        if (this.separator.enabled) {
          this.separator.disable();
        }
      } else {

        if (!this.separator.enabled) {
          this.separator.enable();
        }
      }
    });
  }

  get mode() {
    return this.settingsForm.get('mode');
  }

  get separator() {
    return this.settingsForm.get('separator');
  }

  onSaveClick(e: Event) {
    e.preventDefault();

    this.generatorSettingsSubscription.unsubscribe();
    this.valueChangesSubscription.unsubscribe();

    this.store.dispatch(new Set({
      separator: this.generatorSettings.separator,
      ...this.settingsForm.value
    }));
    this.dialogRef.close();
  }

  onCancelClick(e: Event) {
    e.preventDefault();

    this.generatorSettingsSubscription.unsubscribe();
    this.valueChangesSubscription.unsubscribe();

    this.dialogRef.close();
  }
}
