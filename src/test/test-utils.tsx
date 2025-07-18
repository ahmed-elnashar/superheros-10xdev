import type {ReactElement} from 'react'
import React from 'react'
import type {RenderOptions} from '@testing-library/react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@mui/material/styles'
import {CssBaseline} from '@mui/material'
import {lightTheme} from '../styles/theme'

// Import the actual store
import {store} from '../store'

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>

export const renderWithProviders = (
    ui: ReactElement,
    options: CustomRenderOptions = {}
) => {
    const {...renderOptions} = options

    const AllTheProviders = ({children}: { children: React.ReactNode }) => {
        return (
            <Provider store={store}>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }

    return {store, ...render(ui, {wrapper: AllTheProviders, ...renderOptions})}
}

// Re-export everything from testing-library
export {screen, fireEvent, waitFor}
