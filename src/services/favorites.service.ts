const FAVORITES_KEY = 'superhero_favorites'

export class FavoritesService {
    getFavorites(): number[] {
        try {
            const favorites = localStorage.getItem(FAVORITES_KEY)
            return favorites ? JSON.parse(favorites) : []
        } catch (error) {
            console.error('Error getting favorites from localStorage:', error)
            return []
        }
    }

    addFavorite(heroId: number): void {
        try {
            const favorites = this.getFavorites()
            if (!favorites.includes(heroId)) {
                favorites.push(heroId)
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
            }
        } catch (error) {
            console.error('Error adding favorite to localStorage:', error)
        }
    }

    removeFavorite(heroId: number): void {
        try {
            const favorites = this.getFavorites()
            const updatedFavorites = favorites.filter(id => id !== heroId)
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
        } catch (error) {
            console.error('Error removing favorite from localStorage:', error)
        }
    }

    isFavorite(heroId: number): boolean {
        const favorites = this.getFavorites()
        return favorites.includes(heroId)
    }

    toggleFavorite(heroId: number): boolean {
        const isFav = this.isFavorite(heroId)
        if (isFav) {
            this.removeFavorite(heroId)
        } else {
            this.addFavorite(heroId)
        }
        return !isFav
    }

    clearFavorites(): void {
        try {
            localStorage.removeItem(FAVORITES_KEY)
        } catch (error) {
            console.error('Error clearing favorites from localStorage:', error)
        }
    }
}

export const favoritesService = new FavoritesService()
