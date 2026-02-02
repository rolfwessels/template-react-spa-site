import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Theme } from '@radix-ui/themes'
import CharacterCard from './CharacterCard'
import { CharacterBasicFragment } from '../graphql/generated/Characters.generated'


// Mock TanStack Router
const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

// Mock character data using fragment types
const mockRick: CharacterBasicFragment & { __typename: 'Character' } = {
  __typename: 'Character',
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
}

const mockDeadCharacter: CharacterBasicFragment & { __typename: 'Character' } = {
  __typename: 'Character',
  id: '2',
  name: 'Dead Character',
  status: 'Dead',
  species: 'Alien',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
}

const mockCharacterWithoutImage: CharacterBasicFragment & { __typename: 'Character' } = {
  __typename: 'Character',
  id: '3',
  name: 'No Image Character',
  status: 'Unknown',
  species: 'Robot',
  image: null,
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <Theme>
      {component}
    </Theme>
  )
}

describe('CharacterCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders character information correctly', () => {
    renderWithTheme(<CharacterCard character={mockRick} />)
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    
    // Check that avatar container exists (Radix Avatar doesn't always render as img)
    const avatarContainer = document.querySelector('.rt-AvatarRoot')
    expect(avatarContainer).toBeInTheDocument()
  })

  it('renders status dot with correct status', () => {
    renderWithTheme(<CharacterCard character={mockRick} />)
    
    // Status dot should have the alive status (green)
    const statusElements = screen.getAllByText('Alive')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('renders dead character with correct status', () => {
    renderWithTheme(<CharacterCard character={mockDeadCharacter} />)
    
    expect(screen.getByText('Dead Character')).toBeInTheDocument()
    expect(screen.getByText('Alien')).toBeInTheDocument()
    
    // Status should show as dead
    const statusElements = screen.getAllByText('Dead')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('handles avatar fallback when image is null', () => {
    renderWithTheme(<CharacterCard character={mockCharacterWithoutImage} />)
    
    expect(screen.getByText('No Image Character')).toBeInTheDocument()
    expect(screen.getByText('Robot')).toBeInTheDocument()
    
    // Check that avatar root exists (fallback should be rendered inside it)
    const avatarRoot = document.querySelector('.rt-AvatarRoot')
    expect(avatarRoot).toBeInTheDocument()
  })

  it('navigates to character detail when clicked', () => {
    renderWithTheme(<CharacterCard character={mockRick} />)
    
    // Find the card by its clickable container (the Card component)
    const cardElement = document.querySelector('.rt-Card')
    expect(cardElement).toBeInTheDocument()
    
    if (cardElement) {
      fireEvent.click(cardElement)
      expect(mockNavigate).toHaveBeenCalledWith({ to: '/character/1' })
    }
  })

  it('handles unknown status correctly', () => {
    renderWithTheme(<CharacterCard character={mockCharacterWithoutImage} />)
    
    expect(screen.getByText('No Image Character')).toBeInTheDocument()
    
    // Status should show as unknown
    const statusElements = screen.getAllByText('Unknown')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('renders with correct accessibility attributes', () => {
    renderWithTheme(<CharacterCard character={mockRick} />)
    
    // Card should have cursor pointer style and character-card class for hover effects
    const cardElement = document.querySelector('.rt-Card')
    expect(cardElement).toBeInTheDocument()
    expect(cardElement).toHaveClass('character-card')
    expect(cardElement).toHaveStyle({ cursor: 'pointer' })
  })

  it('applies hover effects correctly', () => {
    renderWithTheme(<CharacterCard character={mockRick} />)
    
    // Card should have character-card class which applies hover effects via CSS
    const cardElement = document.querySelector('.character-card')
    expect(cardElement).toBeInTheDocument()
    expect(cardElement).toHaveClass('character-card')
  })

  it('handles edge cases with empty/null values', () => {
    const edgeCaseCharacter: CharacterBasicFragment & { __typename: 'Character' } = {
      __typename: 'Character',
      id: '4',
      name: null,
      status: null,
      species: null,
      image: null,
    }
    
    renderWithTheme(<CharacterCard character={edgeCaseCharacter} />)
    
    // Should handle null values gracefully without crashing
    // Avatar fallback should handle null name
    expect(screen.queryByText('null')).not.toBeInTheDocument()
  })
}) 