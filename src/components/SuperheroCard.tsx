import React from 'react'
import {Box, Button, Card, CardContent, CardMedia, Chip, LinearProgress, Stack, Typography,} from '@mui/material'
import {Favorite, FavoriteBorder} from '@mui/icons-material'
import type {Superhero} from '../services/superhero.service.ts'

interface SuperheroCardProps {
    hero: Superhero
    isFavorite: boolean
    onToggleFavorite: (id: number) => void
}

const SuperheroCard: React.FC<SuperheroCardProps> = React.memo(({
                                                                    hero,
                                                                    isFavorite,
                                                                    onToggleFavorite,
                                                                }) => {
    const {id, name, images, biography, powerstats} = hero

    const getPublisherColor = (publisher: string) => {
        const pub = publisher.toLowerCase()
        if (pub.includes('dc')) return 'primary'
        if (pub.includes('marvel')) return 'error'
        if (pub.includes('dark horse')) return 'secondary'
        return 'default'
    }

    const getStatColor = (value: number) => {
        if (value >= 80) return 'success'
        if (value >= 60) return 'warning'
        if (value >= 40) return 'info'
        return 'error'
    }

    const formatStatName = (stat: string) => {
        return stat.charAt(0).toUpperCase() + stat.slice(1)
    }

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                }
            }}
        >
            <CardMedia
                component="img"
                height="240"
                image={images.md}
                alt={name}
                sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.100'
                }}
                loading="lazy"
            />

            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                <Box sx={{mb: 2}}>
                    <Typography variant="h6" component="h2" noWrap title={name}>
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap title={biography.fullName}>
                        {biography.fullName}
                    </Typography>
                    {biography.publisher && (
                        <Chip
                            label={biography.publisher}
                            color={getPublisherColor(biography.publisher)}
                            size="small"
                            sx={{mt: 1}}
                        />
                    )}
                </Box>

                <Box sx={{mb: 2, flexGrow: 1}}>
                    <Typography variant="subtitle2" gutterBottom>
                        Power Stats
                    </Typography>
                    <Stack spacing={1}>
                        {Object.entries(powerstats).map(([stat, value]) => (
                            <Box key={stat}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 0.5}}>
                                    <Typography variant="body2" color="text.secondary">
                                        {formatStatName(stat)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value || 0}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={value || 0}
                                    color={getStatColor(value || 0)}
                                    sx={{height: 6, borderRadius: 3}}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Button
                    variant={isFavorite ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    startIcon={isFavorite ? <Favorite/> : <FavoriteBorder/>}
                    onClick={() => onToggleFavorite(id)}
                    sx={{mt: 'auto'}}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </CardContent>
        </Card>
    )
})

SuperheroCard.displayName = 'SuperheroCard'

export default SuperheroCard
