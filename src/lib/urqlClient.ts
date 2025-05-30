import { createClient, cacheExchange, fetchExchange } from 'urql'

export const urqlClient = createClient({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
}); 