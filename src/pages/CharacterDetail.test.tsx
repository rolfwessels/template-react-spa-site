import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterDetail from './CharacterDetail'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { MockedProvider } from '@apollo/client/testing/react'
import { CharacterDetailDocument, CharacterInfoFragment, EpisodeInfoFragment } from '../graphql/generated/Characters.generated'
import '@testing-library/jest-dom'

// Mock episodes using fragment types
const mockPilotEpisode: EpisodeInfoFragment & { __typename: 'Episode' } = {
  __typename: 'Episode',
  id: '1',
  name: 'Pilot',
  episode: 'S01E01',
}

const mockLawnmowerEpisode: EpisodeInfoFragment & { __typename: 'Episode' } = {
  __typename: 'Episode',
  id: '2',
  name: 'Lawnmower Dog',
  episode: 'S01E02',
}

// Mock character using fragment types
const mockRickCharacter: CharacterInfoFragment & { 
  __typename: 'Character',
  origin: { __typename: 'Location', name: string | null } | null,
  location: { __typename: 'Location', name: string | null } | null 
} = {
  __typename: 'Character',
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { 
    __typename: 'Location',
    name: 'Earth' 
  },
  location: { 
    __typename: 'Location',
    name: 'Earth' 
  },
  episode: [mockPilotEpisode, mockLawnmowerEpisode],
}

const mockCharacterDetailData = {
  character: mockRickCharacter,
}

const mocks = [
  {
    request: {
      query: CharacterDetailDocument,
      variables: { id: '1' },
    },
    result: { data: mockCharacterDetailData },
  },
]

// Mock router hooks
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' })
  }
})

const mockNavigate = vi.fn()

describe('CharacterDetail', () => {
  it('renders character details and episodes', async () => {
    const rootRoute = createRootRoute({
      component: () => <CharacterDetail />,
    })

    const characterRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/character/$id',
      component: CharacterDetail,
    })

    const routeTree = rootRoute.addChildren([characterRoute])

    const router = createRouter({ 
      routeTree,
      defaultPreload: false,
      defaultPreloadStaleTime: 0,
    })

    // Set the initial route with the character ID
    router.navigate({ to: '/character/1' })

    render(
      <MockedProvider mocks={mocks}>
        <RouterProvider router={router} />
      </MockedProvider>
    )

    // Wait for the character data to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    // Check status using the Badge component
    const statusBadge = screen.getByRole('status')
    expect(statusBadge).toHaveTextContent('Alive')
    expect(statusBadge).toHaveAttribute('data-accent-color', 'green')
    
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
    
    // Check that both Origin and Location show Earth
    const earthElements = screen.getAllByText('Earth')
    expect(earthElements).toHaveLength(2)
    expect(screen.getByText('S01E01: Pilot')).toBeInTheDocument()
    expect(screen.getByText('S01E02: Lawnmower Dog')).toBeInTheDocument()
    
    // Back button
    const backButton = screen.getByRole('button', { name: /back to character list/i })
    expect(backButton).toBeInTheDocument()
    backButton.click()
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
  })
}) 