import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit'
import type {FilterOptions, Superhero} from '../../services/superhero.service.ts'
import {superheroService} from '../../services/superhero.service.ts'
import {favoritesService} from '../../services/favorites.service.ts'

export interface SuperheroState {
    heroes: Superhero[]
    filteredHeroes: Superhero[]
    favoriteHeroes: Superhero[]
    favoriteIds: number[]
    publishers: string[]
    loading: boolean
    error: string | null
    filters: FilterOptions
    pagination: {
        currentPage: number
        pageSize: number
        totalPages: number
        totalHeroes: number
    }
}

const initialState: SuperheroState = {
    heroes: [],
    filteredHeroes: [],
    favoriteHeroes: [],
    favoriteIds: favoritesService.getFavorites(),
    publishers: [],
    loading: false,
    error: null,
    filters: {
        sortBy: 'name',
        sortOrder: 'asc',
        showFavoritesOnly: false
    },
    pagination: {
        currentPage: 1,
        pageSize: 20,
        totalPages: 0,
        totalHeroes: 0
    }
}

// Async thunks
export const fetchHeroes = createAsyncThunk(
    'superhero/fetchHeroes',
    async () => {
        const heroes = await superheroService.getAllHeroes()
        return heroes
    }
)

export const fetchPublishers = createAsyncThunk(
    'superhero/fetchPublishers',
    async () => {
        const publishers = await superheroService.getPublishers()
        return publishers
    }
)

export const fetchFilteredHeroes = createAsyncThunk(
    'superhero/fetchFilteredHeroes',
    async (_, {getState}) => {
        const state = getState() as { superhero: SuperheroState }
        const {filters, favoriteIds} = state.superhero
        const heroes = await superheroService.getFilteredHeroes(filters, favoriteIds)
        return heroes
    }
)

export const fetchFavoriteHeroes = createAsyncThunk(
    'superhero/fetchFavoriteHeroes',
    async () => {
        const favoriteIds = favoritesService.getFavorites()
        const favoriteHeroes = await Promise.all(
            favoriteIds.map(id => superheroService.getHeroById(id))
        )
        return {favoriteHeroes, favoriteIds}
    }
)

const superheroSlice = createSlice({
    name: 'superhero',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterOptions>) => {
            state.filters = {...state.filters, ...action.payload}
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pagination.pageSize = action.payload
            state.pagination.currentPage = 1 // Reset to first page
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const heroId = action.payload
            const isFavorite = favoritesService.toggleFavorite(heroId)

            if (isFavorite) {
                state.favoriteIds.push(heroId)
            } else {
                state.favoriteIds = state.favoriteIds.filter(id => id !== heroId)
            }
        },
        toggleFavoritesFilter: (state) => {
            state.filters.showFavoritesOnly = !state.filters.showFavoritesOnly
            state.pagination.currentPage = 1 // Reset to first page
        },
        clearFilters: (state) => {
            state.filters = {
                sortBy: 'name',
                sortOrder: 'asc',
                showFavoritesOnly: false
            }
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch heroes
            .addCase(fetchHeroes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.loading = false
                state.heroes = action.payload
                state.filteredHeroes = action.payload
                state.pagination.totalHeroes = action.payload.length
                state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.pageSize)
            })
            .addCase(fetchHeroes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch heroes'
            })

            // Fetch publishers
            .addCase(fetchPublishers.fulfilled, (state, action) => {
                state.publishers = action.payload
            })

            // Fetch filtered heroes
            .addCase(fetchFilteredHeroes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilteredHeroes.fulfilled, (state, action) => {
                state.loading = false
                state.filteredHeroes = action.payload
                state.pagination.totalHeroes = action.payload.length
                state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.pageSize)
                state.pagination.currentPage = 1 // Reset to first page
            })
            .addCase(fetchFilteredHeroes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch filtered heroes'
            })

            // Fetch favorite heroes
            .addCase(fetchFavoriteHeroes.fulfilled, (state, action) => {
                state.favoriteHeroes = action.payload.favoriteHeroes
                state.favoriteIds = action.payload.favoriteIds
            })
    }
})

export const {
    setFilters,
    setCurrentPage,
    setPageSize,
    toggleFavorite,
    toggleFavoritesFilter,
    clearFilters,
    clearError
} = superheroSlice.actions

export default superheroSlice.reducer
