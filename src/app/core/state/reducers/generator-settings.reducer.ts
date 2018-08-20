import { GeneratorSettingsInterface } from '../../../shared/interfaces/generator-settings.interface';
import { GeneratorSettingsUnion, GenratorSettingsActionTypes } from '../actions/generator-settings.action';

const initialState: GeneratorSettingsInterface = {
  mode: 'separated',
  prefix: '',
  suffix: '',
  separator: '-'
};

export function generatorSettingsReducer(state: GeneratorSettingsInterface = initialState, action: GeneratorSettingsUnion) {
  switch (action.type) {
    case GenratorSettingsActionTypes.SET:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;

  }
}
