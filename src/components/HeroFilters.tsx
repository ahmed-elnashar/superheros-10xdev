import React from 'react'
import {Box, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography,} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../store'
import {fetchFilteredHeroes, setFilters} from '../store/slices/superHeroSlice'
import type {SortKey, SortOrder} from '../services/superhero.service'

const HeroFilters: React.FC = () => {
    const dispatch = useAppDispatch()
    const {filters, publishers} = useAppSelector((state) => state.superhero)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value
        const newFilters = {...filters, search}
        dispatch(setFilters(newFilters))
        dispatch(fetchFilteredHeroes(newFilters))
    }

    const handlePublisherChange = (publisher: string) => {
        const newFilters = {...filters, publisher: publisher || undefined}
        dispatch(setFilters(newFilters))
        dispatch(fetchFilteredHeroes(newFilters))
    }

    const handleSortChange = (sortBy: SortKey, sortOrder: SortOrder) => {
        const newFilters = {...filters, sortBy, sortOrder}
        dispatch(setFilters(newFilters))
        dispatch(fetchFilteredHeroes(newFilters))
    }

    const handleClearPublisher = () => {
        handlePublisherChange('')
    }

    const sortOptions = [
        {value: 'name', label: 'Name'},
        {value: 'intelligence', label: 'Intelligence'},
        {value: 'strength', label: 'Strength'},
        {value: 'speed', label: 'Speed'},
        {value: 'durability', label: 'Durability'},
        {value: 'power', label: 'Power'},
        {value: 'combat', label: 'Combat'},
    ]

    return (
        <Box sx={{mb: 3}}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>

            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="Search heroes..."
                    value={filters.search || ''}
                    onChange={handleSearchChange}
                    placeholder="Search by name or full name"
                />

                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <FormControl sx={{minWidth: 200}}>
                        <InputLabel>Publisher</InputLabel>
                        <Select
                            value={filters.publisher || ''}
                            label="Publisher"
                            onChange={(e) => handlePublisherChange(e.target.value)}
                        >
                            <MenuItem value="">All Publishers</MenuItem>
                            {publishers.map((publisher) => (
                                <MenuItem key={publisher} value={publisher}>
                                    {publisher}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{minWidth: 150}}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={filters.sortBy || 'name'}
                            label="Sort By"
                            onChange={(e) => handleSortChange(e.target.value as SortKey, filters.sortOrder || 'asc')}
                        >
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{minWidth: 120}}>
                        <InputLabel>Order</InputLabel>
                        <Select
                            value={filters.sortOrder || 'asc'}
                            label="Order"
                            onChange={(e) => handleSortChange(filters.sortBy || 'name', e.target.value as SortOrder)}
                        >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {/* Active filters */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {filters.publisher && (
                        <Chip
                            label={`Publisher: ${filters.publisher}`}
                            onDelete={handleClearPublisher}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {filters.search && (
                        <Chip
                            label={`Search: ${filters.search}`}
                            onDelete={() => handleSearchChange({target: {value: ''}} as any)}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}

export default HeroFilters
