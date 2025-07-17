import { createTheme } from '@mui/material/styles'

// Option 1: Modern Blue/Purple
export const modernBlueTheme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#3B82F6', // Blue-500
                light: '#60A5FA', // Blue-400
                dark: '#1E40AF', // Blue-800
            },
            secondary: {
                main: '#8B5CF6', // Violet-500
                light: '#A78BFA', // Violet-400
                dark: '#5B21B6', // Violet-800
            },
            background: {
                default: '#F8FAFC', // Slate-50
                paper: '#FFFFFF',
            },
            text: {
                primary: '#0F172A', // Slate-900
                secondary: '#475569', // Slate-600
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#60A5FA', // Blue-400
                light: '#93C5FD', // Blue-300
                dark: '#3B82F6', // Blue-500
            },
            secondary: {
                main: '#A78BFA', // Violet-400
                light: '#C4B5FD', // Violet-300
                dark: '#8B5CF6', // Violet-500
            },
            background: {
                default: '#0F172A', // Slate-900
                paper: '#1E293B', // Slate-800
            },
            text: {
                primary: '#F8FAFC', // Slate-50
                secondary: '#CBD5E1', // Slate-300
            },
        },
    }),
}

// Option 2: Emerald/Teal
export const emeraldTheme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#10B981', // Emerald-500
                light: '#34D399', // Emerald-400
                dark: '#047857', // Emerald-700
            },
            secondary: {
                main: '#14B8A6', // Teal-500
                light: '#2DD4BF', // Teal-400
                dark: '#0F766E', // Teal-700
            },
            background: {
                default: '#F0FDF4', // Green-50
                paper: '#FFFFFF',
            },
            text: {
                primary: '#064E3B', // Emerald-900
                secondary: '#065F46', // Emerald-800
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#34D399', // Emerald-400
                light: '#6EE7B7', // Emerald-300
                dark: '#10B981', // Emerald-500
            },
            secondary: {
                main: '#2DD4BF', // Teal-400
                light: '#5EEAD4', // Teal-300
                dark: '#14B8A6', // Teal-500
            },
            background: {
                default: '#022C22', // Emerald-950
                paper: '#064E3B', // Emerald-900
            },
            text: {
                primary: '#D1FAE5', // Emerald-100
                secondary: '#A7F3D0', // Emerald-200
            },
        },
    }),
}

// Option 3: Orange/Pink
export const sunsetTheme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#F97316', // Orange-500
                light: '#FB923C', // Orange-400
                dark: '#C2410C', // Orange-700
            },
            secondary: {
                main: '#EC4899', // Pink-500
                light: '#F472B6', // Pink-400
                dark: '#BE185D', // Pink-700
            },
            background: {
                default: '#FFF7ED', // Orange-50
                paper: '#FFFFFF',
            },
            text: {
                primary: '#9A3412', // Orange-800
                secondary: '#C2410C', // Orange-700
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#FB923C', // Orange-400
                light: '#FDBA74', // Orange-300
                dark: '#F97316', // Orange-500
            },
            secondary: {
                main: '#F472B6', // Pink-400
                light: '#F9A8D4', // Pink-300
                dark: '#EC4899', // Pink-500
            },
            background: {
                default: '#431407', // Orange-950
                paper: '#7C2D12', // Orange-800
            },
            text: {
                primary: '#FED7AA', // Orange-200
                secondary: '#FDBA74', // Orange-300
            },
        },
    }),
}

// Option 4: Indigo/Cyan
export const techTheme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#6366F1', // Indigo-500
                light: '#818CF8', // Indigo-400
                dark: '#3730A3', // Indigo-700
            },
            secondary: {
                main: '#06B6D4', // Cyan-500
                light: '#22D3EE', // Cyan-400
                dark: '#0E7490', // Cyan-700
            },
            background: {
                default: '#F1F5F9', // Slate-100
                paper: '#FFFFFF',
            },
            text: {
                primary: '#1E293B', // Slate-800
                secondary: '#475569', // Slate-600
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#818CF8', // Indigo-400
                light: '#A5B4FC', // Indigo-300
                dark: '#6366F1', // Indigo-500
            },
            secondary: {
                main: '#22D3EE', // Cyan-400
                light: '#67E8F9', // Cyan-300
                dark: '#06B6D4', // Cyan-500
            },
            background: {
                default: '#020617', // Slate-950
                paper: '#0F172A', // Slate-900
            },
            text: {
                primary: '#F1F5F9', // Slate-100
                secondary: '#CBD5E1', // Slate-300
            },
        },
    }),
}

// Option 5: Rose/Amber
export const warmTheme = {
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#F43F5E', // Rose-500
                light: '#FB7185', // Rose-400
                dark: '#BE123C', // Rose-700
            },
            secondary: {
                main: '#F59E0B', // Amber-500
                light: '#FBBF24', // Amber-400
                dark: '#D97706', // Amber-600
            },
            background: {
                default: '#FFF1F2', // Rose-50
                paper: '#FFFFFF',
            },
            text: {
                primary: '#881337', // Rose-900
                secondary: '#9F1239', // Rose-800
            },
        },
    }),
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#FB7185', // Rose-400
                light: '#FDA4AF', // Rose-300
                dark: '#F43F5E', // Rose-500
            },
            secondary: {
                main: '#FBBF24', // Amber-400
                light: '#FCD34D', // Amber-300
                dark: '#F59E0B', // Amber-500
            },
            background: {
                default: '#4C0519', // Rose-950
                paper: '#881337', // Rose-900
            },
            text: {
                primary: '#FFE4E6', // Rose-100
                secondary: '#FECDD3', // Rose-200
            },
        },
    }),
}

// Default export - you can change this to any theme you prefer
export const lightTheme = emeraldTheme.light
export const darkTheme = emeraldTheme.dark

// Export all themes for easy switching
export const themes = {
    modernBlue: modernBlueTheme,
    emerald: emeraldTheme,
    sunset: sunsetTheme,
    tech: techTheme,
    warm: warmTheme,
}
