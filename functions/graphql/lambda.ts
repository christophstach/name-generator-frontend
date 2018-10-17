import { importSchema } from 'graphql-import';
import { GraphQLServerLambda } from 'graphql-yoga';
import { GeneratorSettingsResolver } from './resolvers/generator-settings.resolver';

const typeDefs = importSchema(`
enum GeneratorSettingsMode {
  NORMAL,
  SEPARATOR
}

type GeneratorSettings {
  id: ID!
  uid: String!
  mode: GeneratorSettingsMode!
  separator: String
  prefix: String
  suffix: String
}

type Query {
  getOwnGeneratorSettings: GeneratorSettings
}

type Mutation {
  saveOwnGeneratorSettings(
    mode: GeneratorSettingsMode!
    separator: String
    prefix: String
    suffix: String
  ): GeneratorSettings
}
`);

const resolvers = {
  Query: {
    getOwnGeneratorSettings: GeneratorSettingsResolver.getOwnGeneratorSettings
  }
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
  options: {
    endpoint: 'graphql'
  }
});


export const { graphqlHandler, playgroundHandler } = lambda;
