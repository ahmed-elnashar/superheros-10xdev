import React from 'react'
import {AppBar, Box, CssBaseline, IconButton, Toolbar, Typography,} from '@mui/material'
import {Brightness4, Brightness7,} from '@mui/icons-material'
import {useAppDispatch, useAppSelector} from '../store'
import {setTheme} from '../store/slices/uiSlice'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const {theme: currentTheme} = useAppSelector((state) => state.ui)

    const handleThemeToggle = () => {
        dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        🦸 Superhero Database
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleThemeToggle}
                        aria-label="toggle theme"
                    >
                        {currentTheme === 'light' ? <Brightness4/> : <Brightness7/>}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                }}
            >
                <Toolbar/>
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout
