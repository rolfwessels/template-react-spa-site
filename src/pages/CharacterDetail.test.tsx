// @vitest-environment jsdom
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, it, beforeEach, expect } from 'vitest';

import CharacterDetail from './CharacterDetail';

describe('CharacterDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders character details on successful fetch', async () => {
    const mockCharacter = {
      id: '1',
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth (C-137)' },
      location: { name: 'Citadel of Ricks' },
      image: 'https://example.com/rick.png',
      episode: [
        { id: '1', name: 'Pilot', episode: 'S01E01' },
        { id: '2', name: 'Lawnmower Dog', episode: 'S01E02' },
      ],
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: { character: mockCharacter } }),
    }));

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Loading state
    expect(screen.getByText(/Loading.../i)).toBeDefined();

    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Rick Sanchez/i })).toBeDefined();
    });

    // Check basic character info
    // Labels and values
    expect(screen.getByText('Species:')).toBeDefined();
    expect(screen.getByText('Human')).toBeDefined();
    expect(screen.getByText('Gender:')).toBeDefined();
    expect(screen.getByText('Male')).toBeDefined();
    expect(screen.getByText('Origin:')).toBeDefined();
    expect(screen.getByText('Earth (C-137)')).toBeDefined();
    expect(screen.getByText('Location:')).toBeDefined();
    expect(screen.getByText('Citadel of Ricks')).toBeDefined();

    // Check episodes
    expect(screen.getByText('Pilot')).toBeDefined();
    expect(screen.getByText('S01E01')).toBeDefined();
    expect(screen.getByText('Lawnmower Dog')).toBeDefined();
    expect(screen.getByText('S01E02')).toBeDefined();
  });

  it('renders error message on fetch error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ errors: [{ message: 'Something went wrong' }] }),
    }));

    render(
      <MemoryRouter initialEntries={['/character/2']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeDefined();
    });
  });

  it('renders no episodes message when character has no episodes', async () => {
    const mockCharacter = {
      id: '3',
      name: 'Test Character',
      status: 'unknown',
      species: 'Alien',
      gender: 'Genderless',
      origin: { name: 'Unknown' },
      location: { name: 'Nowhere' },
      image: 'https://example.com/alien.png',
      episode: [],
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: { character: mockCharacter } }),
    }));

    render(
      <MemoryRouter initialEntries={['/character/3']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No episodes available.')).toBeDefined();
    });
  });
});