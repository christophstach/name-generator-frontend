import { apolloReducer, CacheState, } from 'apollo-angular-cache-ngrx';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

export interface Root {
  apollo: CacheState;
}

export const reducers: ActionReducerMap<Root> = {
  apollo: apolloReducer
};


export const metaReducers: MetaReducer<Root>[] = !environment.production ? [] : [];
