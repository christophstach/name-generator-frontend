import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { apolloReducer, CacheState, } from 'apollo-angular-cache-ngrx';
import { environment } from '../../../../environments/environment';
import { GeneratorSettingsInterface } from '../../../shared/interfaces/generator-settings.interface';
import { generatorSettingsReducer } from './generator-settings.reducer';

export interface Root {
  apollo: CacheState;
  generatorSettings: GeneratorSettingsInterface;
}

export const reducers: ActionReducerMap<Root> = {
  apollo: apolloReducer,
  generatorSettings: generatorSettingsReducer
};


export const metaReducers: MetaReducer<Root>[] = !environment.production ? [] : [];
