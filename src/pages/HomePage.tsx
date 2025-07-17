import React from 'react'
import { Box, Typography, Card, CardContent, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store'
import { setLoading } from '../store/slices/uiSlice'

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.ui)

    const handleLoadingToggle = () => {
        dispatch(setLoading(!loading))
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Home Page
            </Typography>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Redux Example
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Current loading state: {loading ? 'Loading...' : 'Not loading'}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleLoadingToggle}
                        sx={{ mt: 2 }}
                    >
                        Toggle Loading State
                    </Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default HomePage
