import React, {useEffect} from 'react'
import {Alert, Box, CircularProgress, Container, Divider, Pagination, Typography,} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../store'
import {fetchHeroes, fetchPublishers, setCurrentPage, toggleFavorite,} from '../store/slices/superHeroSlice'
import SuperheroCard from '../components/SuperheroCard'
import HeroFilters from '../components/HeroFilters'
import {superheroService} from '../services/superhero.service'

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {
        filteredHeroes,
        favoriteIds,
        loading,
        error,
        pagination,
    } = useAppSelector((state) => state.superhero)

    useEffect(() => {
        dispatch(fetchHeroes())
        dispatch(fetchPublishers())
    }, [dispatch])

    const handleToggleFavorite = (heroId: number) => {
        dispatch(toggleFavorite(heroId))
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page))
    }

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <CircularProgress size={60}/>
                </Box>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Alert severity="error" sx={{mt: 2}}>
                    {error}
                </Alert>
            </Container>
        )
    }

    // Get paginated heroes
    const paginatedData = superheroService.getPaginatedHeroes(
        filteredHeroes,
        pagination.currentPage,
        pagination.pageSize
    )

    return (
        <Container maxWidth="lg">
            <Box sx={{py: 2}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Superheroes Database
                </Typography>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Discover and explore your favorite superheroes
                </Typography>

                <HeroFilters/>

                <Divider sx={{my: 2}}/>

                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Showing {paginatedData.heroes.length} of {paginatedData.totalHeroes} heroes
                </Typography>

                {paginatedData.heroes.length === 0 ? (
                    <Alert severity="info" sx={{mt: 2}}>
                        No heroes found. Try adjusting your filters.
                    </Alert>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                    lg: 'repeat(4, 1fr)',
                                },
                                gap: 3,
                                mt: 1
                            }}
                        >
                            {paginatedData.heroes.map((hero) => (
                                <SuperheroCard
                                    key={hero.id}
                                    hero={hero}
                                    isFavorite={favoriteIds.includes(hero.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </Box>

                        {paginatedData.totalPages > 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 4
                                }}
                            >
                                <Pagination
                                    count={paginatedData.totalPages}
                                    page={pagination.currentPage}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    )
}

export default HomePage
