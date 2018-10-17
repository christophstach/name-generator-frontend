export const GeneratorSettingsResolver = {
  getOwnGeneratorSettings(obj, args, context, info) {
    return {
      id: 123,
      uid: 234,
      mode: 'SEPARATOR',
      separator: '-',
      prefix: '',
      suffix: ''
    };
  }
};
