import axios from 'axios'

const BASE_URL = 'https://akabab.github.io/superhero-api/api'

export interface PowerStats {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
}

export interface Appearance {
    gender: string
    race: string
    height: string[]
    weight: string[]
    eyeColor: string
    hairColor: string
}

export interface Biography {
    fullName: string
    alterEgos: string
    aliases: string[]
    placeOfBirth: string
    firstAppearance: string
    publisher: string
    alignment: string
}

export interface Work {
    occupation: string
    base: string
}

export interface Connections {
    groupAffiliation: string
    relatives: string
}

export interface Images {
    xs: string
    sm: string
    md: string
    lg: string
}

export interface Superhero {
    id: number
    name: string
    slug: string
    powerstats: PowerStats
    appearance: Appearance
    biography: Biography
    work: Work
    connections: Connections
    images: Images
}

export type SortKey = keyof PowerStats | 'name'
export type SortOrder = 'asc' | 'desc'

export interface FilterOptions {
    publisher?: string
    sortBy?: SortKey
    sortOrder?: SortOrder
    search?: string
    showFavoritesOnly?: boolean
}

class SuperheroService {
    private heroesCache: Superhero[] | null = null
    private publishersCache: string[] | null = null

    async getAllHeroes(): Promise<Superhero[]> {
        if (this.heroesCache) {
            return this.heroesCache
        }

        try {
            const response = await axios.get<Superhero[]>(`${BASE_URL}/all.json`)
            this.heroesCache = response.data
            return response.data
        } catch (error) {
            console.error('Error fetching heroes:', error)
            throw new Error('Failed to fetch heroes')
        }
    }

    async getHeroById(id: number): Promise<Superhero> {
        try {
            const response = await axios.get<Superhero>(`${BASE_URL}/id/${id}.json`)
            return response.data
        } catch (error) {
            console.error(`Error fetching hero with id ${id}:`, error)
            throw new Error(`Failed to fetch hero with id ${id}`)
        }
    }

    async getPublishers(): Promise<string[]> {
        if (this.publishersCache) {
            return this.publishersCache
        }

        try {
            const heroes = await this.getAllHeroes()
            const publishers = [...new Set(heroes.map(hero => hero.biography.publisher))]
                .filter(publisher => publisher && publisher !== '-')
                .sort()

            this.publishersCache = publishers
            return publishers
        } catch (error) {
            console.error('Error fetching publishers:', error)
            throw new Error('Failed to fetch publishers')
        }
    }

    async getFilteredHeroes(options: FilterOptions = {}, favoriteIds: number[] = []): Promise<Superhero[]> {
        try {
            let heroes = await this.getAllHeroes()

            // Filter by favorites only
            if (options.showFavoritesOnly) {
                heroes = heroes.filter(hero => favoriteIds.includes(hero.id))
            }

            // Filter by publisher
            if (options.publisher) {
                heroes = heroes.filter(hero =>
                    hero.biography.publisher === options.publisher
                )
            }

            // Filter by search term
            if (options.search) {
                const searchTerm = options.search.toLowerCase()
                heroes = heroes.filter(hero =>
                    hero.name.toLowerCase().includes(searchTerm) ||
                    hero.biography.fullName.toLowerCase().includes(searchTerm)
                )
            }

            // Sort heroes
            if (options.sortBy) {
                heroes = this.sortHeroes(heroes, options.sortBy, options.sortOrder || 'desc')
            }

            return heroes
        } catch (error) {
            console.error('Error filtering heroes:', error)
            throw new Error('Failed to filter heroes')
        }
    }

    private sortHeroes(heroes: Superhero[], sortKey: SortKey, sortOrder: SortOrder): Superhero[] {
        return [...heroes].sort((a, b) => {
            let aValue: number | string
            let bValue: number | string

            if (sortKey === 'name') {
                aValue = a.name.toLowerCase()
                bValue = b.name.toLowerCase()
            } else {
                aValue = a.powerstats[sortKey] || 0
                bValue = b.powerstats[sortKey] || 0
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })
    }

    // Pagination helper
    getPaginatedHeroes(heroes: Superhero[], page: number, pageSize: number): {
        heroes: Superhero[]
        totalPages: number
        currentPage: number
        totalHeroes: number
    } {
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedHeroes = heroes.slice(startIndex, endIndex)

        return {
            heroes: paginatedHeroes,
            totalPages: Math.ceil(heroes.length / pageSize),
            currentPage: page,
            totalHeroes: heroes.length
        }
    }

    // Clear cache (useful for testing or manual refresh)
    clearCache(): void {
        this.heroesCache = null
        this.publishersCache = null
    }
}

export const superheroService = new SuperheroService()
