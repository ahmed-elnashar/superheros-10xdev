import { ThemeProvider } from '@mui/material/styles'
import { useAppSelector } from './store'
import { lightTheme, darkTheme } from './styles/theme'
import MainLayout from './layouts/MainLayout'
import './App.css'
import HomePage from "./pages/HomePage.tsx";

function App() {
    const { theme } = useAppSelector((state) => state.ui)

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <MainLayout>
                <HomePage />
            </MainLayout>
        </ThemeProvider>
    )
}

export default App
