import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://rickandmortyapi.com/graphql',
  }),
  cache: new InMemoryCache(),
}) 