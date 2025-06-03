import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { MockedProvider } from '@apollo/client/testing'
import CharacterExplorer from './CharacterExplorer'
import { CharactersDocument } from '../graphql/generated/Characters.generated'

const mockCharacters = {
  characters: {
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [
      {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      {
        id: '2',
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      },
    ],
  },
}

const mockSearchResults = {
  characters: {
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [
      {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    ],
  },
}

const mockEmptyResults = {
  characters: {
    info: {
      count: 0,
      pages: 1,
      next: null,
      prev: null,
    },
    results: [],
  },
}

const mocks = [
  {
    request: {
      query: CharactersDocument,
      variables: { page: 1 },
    },
    result: { data: mockCharacters },
  },
  {
    request: {
      query: CharactersDocument,
      variables: { page: 1, name: 'Rick' },
    },
    result: { data: mockSearchResults },
  },
  {
    request: {
      query: CharactersDocument,
      variables: { page: 1, name: 'NonExistent' },
    },
    result: { data: mockEmptyResults },
  },
]

describe('CharacterExplorer', () => {
  it('renders character list and handles search', async () => {
    const rootRoute = createRootRoute({
      component: () => <CharacterExplorer />,
    })

    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: CharacterExplorer,
    })

    const routeTree = rootRoute.addChildren([indexRoute])

    const router = createRouter({ 
      routeTree,
      defaultPreload: false,
      defaultPreloadStaleTime: 0,
    })

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>
    )

    // Wait for the character list to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    // Check if both characters are rendered
    expect(screen.getByText('Morty Smith')).toBeInTheDocument()

    // Test search functionality
    const searchInput = screen.getByRole('textbox', { name: /search characters/i })
    fireEvent.change(searchInput, { target: { value: 'Rick' } })

    // Wait for the filtered results
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument()
    })

    // Test pagination
    const prevButton = screen.getByRole('button', { name: /previous page/i })
    const nextButton = screen.getByRole('button', { name: /next page/i })
    expect(prevButton).toBeDisabled()
    expect(nextButton).toBeDisabled()
  })

  it('shows empty state when no characters match search', async () => {
    const rootRoute = createRootRoute({
      component: () => <CharacterExplorer />, 
    })
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: CharacterExplorer,
    })
    const routeTree = rootRoute.addChildren([indexRoute])
    const router = createRouter({ 
      routeTree,
      defaultPreload: false,
      defaultPreloadStaleTime: 0,
    })
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>
    )
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })
    // Search for a non-existent character
    const searchInput = screen.getByRole('textbox', { name: /search characters/i })
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } })
    // Wait for the empty state message
    await waitFor(() => {
      expect(screen.getByText('No characters found matching your search.')).toBeInTheDocument()
    })
  })
}) 