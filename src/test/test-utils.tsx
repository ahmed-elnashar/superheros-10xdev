import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../store/slices/uiSlice'
import { lightTheme } from '../styles/theme'

import type { ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react'
import type { RootState } from '../store'

const createTestStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: {
            ui: uiReducer,
        },
        preloadedState,
    })
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: Partial<RootState>
}

export const renderWithProviders = (
    ui: ReactElement,
    options: CustomRenderOptions = {}
) => {
    const { preloadedState, ...renderOptions } = options
    const store = createTestStore(preloadedState)

    const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
        return (
            <Provider store={store}>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }

    return render(ui, { wrapper: AllTheProviders, ...renderOptions })
}

// Re-export everything from testing-library
export { screen, fireEvent, waitFor }
