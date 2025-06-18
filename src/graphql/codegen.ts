import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://rickandmortyapi.com/graphql': {
      headers: {
        Accept: 'application/json',
      },
    },
  },
  config: {
    addUnderscoreToArgsType: true,
    dedupeFragments: true,
    skipTypename: true,
    avoidOptionals: {
      field: true,
      inputValue: false,
      object: false,
      defaultValue: false,
    },
    maybeValue: 'T | null',
    namingConvention: {
      typeNames: 'pascal-case#pascalCase',
      enumValues: 'upper-case#upperCase',
    },
  },
  generates: {
    './src/graphql/interfaces/api.interface.ts': {
      plugins: ['typescript'],
    },
    './src/graphql/generated': {
      documents: './**/*.graphql',
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './../interfaces/api.interface.ts',
        extension: '.generated.ts',
        folder: '../generated',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        namingConvention: {
          typeNames: 'pascal-case#pascalCase',
          transformUnderscore: true,
        },
        documentVariableSuffix: 'Document',
        maybeValue: 'T | null',
      },
    },
  },
}

export default config 