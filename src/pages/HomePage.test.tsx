import { describe, it, expect } from 'vitest'
import { renderWithProviders, screen } from '../test/test-utils.tsx'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
    it('renders home page with redux state', () => {
        renderWithProviders(<HomePage />)

        expect(screen.getByText('Home Page')).toBeInTheDocument()
        expect(screen.getByText('Redux Example')).toBeInTheDocument()
        expect(screen.getByText('Current loading state: Not loading')).toBeInTheDocument()
    })

    it('renders with custom initial state', () => {
        const initialState = {
            ui: {
                sidebarOpen: true,
                theme: 'dark' as const,
                loading: true,
            },
        }

        renderWithProviders(<HomePage />, { preloadedState: initialState })

        expect(screen.getByText('Current loading state: Loading...')).toBeInTheDocument()
    })
})
