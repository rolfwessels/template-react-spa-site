import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('Dashboard', () => {
    
  it('renders stats cards', () => {
    render(<Dashboard />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('Active Projects')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('$12,3451')).toBeInTheDocument()
  })

  it('opens and closes the dialog', () => {
    render(<Dashboard />)
    const openBtn = screen.getByText('Open Dialog')
    fireEvent.click(openBtn)
    expect(screen.getByText('Example Dialog')).toBeInTheDocument()
    const closeBtn = screen.getByText('Close')
    fireEvent.click(closeBtn)
    expect(screen.queryByText('Example Dialog')).not.toBeInTheDocument()
  })
}) 