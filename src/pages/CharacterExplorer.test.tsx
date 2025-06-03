import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import CharacterExplorer from './CharacterExplorer'
import { CharactersDocument } from '../graphql/generated/Characters.generated'

const mockCharacters = {
  characters: {
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null
    },
    results: [
      {
        id: '1',
        name: 'Rick Sanchez',
        image: 'rick.jpg',
        status: 'Alive',
        species: 'Human'
      },
      {
        id: '2',
        name: 'Morty Smith',
        image: 'morty.jpg',
        status: 'Alive',
        species: 'Human'
      }
    ]
  }
}

const mocks = [
  {
    request: {
      query: CharactersDocument,
      variables: { page: 1, name: undefined }
    },
    result: {
      data: mockCharacters
    }
  },
  {
    request: {
      query: CharactersDocument,
      variables: { page: 1, name: 'Rick' }
    },
    result: {
      data: {
        characters: {
          info: {
            count: 1,
            pages: 1,
            next: null,
            prev: null
          },
          results: [mockCharacters.characters.results[0]]
        }
      }
    }
  }
]

describe('CharacterExplorer', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterExplorer />
      </MockedProvider>
    )
    
    expect(screen.getByText('Loading characters...')).toBeInTheDocument()
  })

  it('renders characters after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterExplorer />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.getByText('Morty Smith')).toBeInTheDocument()
    })
  })

  it('handles search functionality', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterExplorer />
      </MockedProvider>
    )

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    // Type in search
    const searchInput = screen.getByPlaceholderText('Search characters...')
    fireEvent.change(searchInput, { target: { value: 'Rick' } })

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
    })
  })

  it('handles error state', async () => {
    const errorMock = {
      request: {
        query: CharactersDocument,
        variables: { page: 1, name: undefined }
      },
      error: new Error('An error occurred')
    }

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharacterExplorer />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Error loading characters. Please try again later.')).toBeInTheDocument()
    })
  })

  it('handles empty search results', async () => {
    const emptyMock = {
      request: {
        query: CharactersDocument,
        variables: { page: 1, name: 'NonExistentCharacter' }
      },
      result: {
        data: {
          characters: {
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null
            },
            results: []
          }
        }
      }
    }

    render(
      <MockedProvider mocks={[emptyMock]} addTypename={false}>
        <CharacterExplorer />
      </MockedProvider>
    )

    const searchInput = screen.getByPlaceholderText('Search characters...')
    fireEvent.change(searchInput, { target: { value: 'NonExistentCharacter' } })

    await waitFor(() => {
      expect(screen.getByText('No characters found matching your search.')).toBeInTheDocument()
    })
  })
}) 