import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CharactersDocument, CharactersQuery, CharactersQueryVariables } from './generated/Characters.generated'
import { CharacterDetailDocument, CharacterDetailQuery, CharacterDetailQueryVariables } from './generated/CharacterDetail.generated'

class GraphQLApi {
  private client: ApolloClient<any>

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://rickandmortyapi.com/graphql',
      cache: new InMemoryCache(),
    })
  }

  async getCharacters(page: number = 1): Promise<CharactersQuery> {
    const { data } = await this.client.query<CharactersQuery, CharactersQueryVariables>({
      query: CharactersDocument,
      variables: { page },
    })
    return data
  }

  async getCharacterDetail(id: string): Promise<CharacterDetailQuery> {
    const { data } = await this.client.query<CharacterDetailQuery, CharacterDetailQueryVariables>({
      query: CharacterDetailDocument,
      variables: { id },
    })
    return data
  }
}

// Export a singleton instance
export const graphqlApi = new GraphQLApi() 