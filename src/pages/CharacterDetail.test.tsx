import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CharacterDetail from './CharacterDetail'
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import '@testing-library/jest-dom'

// Mock the GraphQL API
vi.mock('../graphql/api', () => ({
  graphqlApi: {
    getCharacterDetail: vi.fn().mockResolvedValue({
      character: {
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
      },
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
      <RouterProvider router={router} />
    )

    // Wait for the character data to load
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    })

    // Check status using the Badge component
    const statusBadge = screen.getByRole('status')
    expect(statusBadge).toHaveTextContent('Alive')
    expect(statusBadge).toHaveAttribute('data-accent-color', 'green')
    
    expect(screen.getByText('HUMAN')).toBeInTheDocument()
    expect(screen.getByText('Gender: Male')).toBeInTheDocument()
    expect(screen.getByText('Origin: Earth')).toBeInTheDocument()
    expect(screen.getByText('Location: Earth')).toBeInTheDocument()
    expect(screen.getByText('Pilot')).toBeInTheDocument()
    expect(screen.getByText('S01E01')).toBeInTheDocument()
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument()
    expect(screen.getByText('S01E02')).toBeInTheDocument()
    
    // Back button
    const backButton = screen.getByRole('button', { name: /back to character list/i })
    expect(backButton).toBeInTheDocument()
    backButton.click()
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
  })
}) 