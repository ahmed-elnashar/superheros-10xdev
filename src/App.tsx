import { ThemeProvider } from '@mui/material/styles'
import { useAppSelector } from './store'
import { lightTheme, darkTheme } from './styles/theme'
import MainLayout from './layouts/MainLayout'
import './App.css'

function App() {
    const { theme } = useAppSelector((state) => state.ui)

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <MainLayout>
                <div>
                    <h1>Welcome to your React Template!</h1>
                    <p>This template includes:</p>
                    <ul>
                        <li>✅ Redux Toolkit for state management</li>
                        <li>✅ Material-UI for components</li>
                        <li>✅ Responsive sidebar layout</li>
                        <li>✅ Dark/Light theme toggle</li>
                        <li>✅ TypeScript support</li>
                    </ul>
                </div>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App
