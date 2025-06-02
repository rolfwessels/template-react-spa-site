import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterDetail from './CharacterDetail'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { graphqlApi } from '../graphql/api'
import '@testing-library/jest-dom'

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    { id: '1', name: 'Pilot', episode: 'S01E01' },
    { id: '2', name: 'Lawnmower Dog', episode: 'S01E02' },
  ],
}

const mockNavigate = vi.fn()

// Mock the GraphQL API
vi.mock('../graphql/api', () => ({
  graphqlApi: {
    getCharacterDetail: vi.fn().mockResolvedValue({
      character: mockCharacter,
    }),
  },
}))

// Mock router hooks
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' })
  }
})

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
      <RouterProvider router={router} />
    )

    // Wait for the character data to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Male')).toBeInTheDocument()
    expect(screen.getByText('Earth')).toBeInTheDocument()
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText('S01E01')).toBeInTheDocument()
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument()
    expect(screen.getByText('S01E02')).toBeInTheDocument()
    // Check status dot color by class
    expect(document.querySelector('.bg-green-500')).toBeInTheDocument()
    // Back button
    const backButton = screen.getByRole('button', { name: /back to list/i })
    expect(backButton).toBeInTheDocument()
    backButton.click()
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
  })
}) 