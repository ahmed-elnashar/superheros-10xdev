import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, UnknownAction } from '@reduxjs/toolkit'

interface UIState {
    sidebarOpen: boolean
    theme: 'light' | 'dark'
    loading: boolean
}

const initialState: UIState = {
    sidebarOpen: false,
    theme: 'light',
    loading: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
})

export const { toggleSidebar, setSidebarOpen, setTheme, setLoading } = uiSlice.actions

// Export the reducer with proper typing
export default uiSlice.reducer as (state: UIState | undefined, action: UnknownAction) => UIState
