import React from 'react'
import {Box, Button, Card, CardContent, CardMedia, Chip, LinearProgress, Stack, Typography,} from '@mui/material'
import {Favorite, FavoriteBorder} from '@mui/icons-material'

interface PowerStats {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
}

interface SuperheroCardProps {
    id: string
    name: string
    image: string
    publisher: string
    powerStats: PowerStats
    isFavorite?: boolean
    onToggleFavorite: (id: string) => void
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({
                                                         id,
                                                         name,
                                                         image,
                                                         publisher,
                                                         powerStats,
                                                         isFavorite = false,
                                                         onToggleFavorite,
                                                     }) => {
    const getPublisherColor = (pub: string) => {
        switch (pub.toLowerCase()) {
            case 'dc comics':
            case 'dc':
                return 'primary'
            case 'marvel comics':
            case 'marvel':
                return 'error'
            default:
                return 'default'
        }
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
                maxWidth: 345,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                }
            }}
        >
            <CardMedia
                component="img"
                height="240"
                image={image}
                alt={name}
                sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.100'
                }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder-hero.jpg' // Fallback image
                }}
            />

            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                <Box sx={{mb: 2}}>
                    <Typography variant="h6" component="h2" noWrap>
                        {name}
                    </Typography>
                    <Chip
                        label={publisher}
                        color={getPublisherColor(publisher)}
                        size="small"
                        sx={{mt: 1}}
                    />
                </Box>

                <Box sx={{mb: 2, flexGrow: 1}}>
                    <Typography variant="subtitle2" gutterBottom>
                        Power Stats
                    </Typography>
                    <Stack spacing={1}>
                        {Object.entries(powerStats).map(([stat, value]) => (
                            <Box key={stat}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 0.5}}>
                                    <Typography variant="body2" color="text.secondary">
                                        {formatStatName(stat)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={value}
                                    color={getStatColor(value)}
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
}

export default SuperheroCard
