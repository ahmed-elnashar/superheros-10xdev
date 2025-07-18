# 🦸 Superhero Database

A modern React TypeScript application for exploring and managing your favorite superheroes. Built with Material-UI and
Redux Toolkit, this app provides a comprehensive interface to browse, filter, and save your favorite heroes from the
Superhero API.

## 🌐 Live Demo

Check out the live application: **[https://superheros-10xdev.vercel.app/](https://superheros-10xdev.vercel.app/)**

## 🚀 Features

- **Browse Heroes**: Explore hundreds of superheroes with detailed information
- **Advanced Filtering**: Filter by publisher, search by name, and sort by various stats
- **Favorites System**: Save your favorite heroes with persistent localStorage
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Power Statistics**: Visual representation of hero stats with progress bars
- **Pagination**: Easy navigation through large datasets
- **Real-time Search**: Instant search results as you type

## 🛠️ Technologies Used

- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety
- **Material-UI 7.2.0** - Component library
- **Redux Toolkit 2.8.2** - State management
- **React Router 7.7.0** - Navigation
- **Axios 1.10.0** - HTTP client
- **Vite 7.0.4** - Build tool
- **ESLint 9.30.1** - Code linting
- **Prettier 3.6.2** - Code formatting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: v23.6.0 or higher
- **npm**: v10.9.2 or higher

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:ahmed-elnashar/superheros-10xdev.git
   cd superheros-10xdev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests with Vitest

## 🏗️ Project Structure

```
   src/
    ├── components/          # Reusable UI components
    │   ├── SuperheroCard.tsx
    │   └── HeroFilters.tsx
    ├── layouts/            # Layout components
    │   └── MainLayout.tsx
    ├── pages/              # Page components
    │   └── HomePage.tsx
    ├── services/           # API and business logic
    │   ├── superhero.service.ts
    │   └── favorites.service.ts
    ├── store/              # Redux store configuration
    │   ├── index.ts
    │   └── slices/
    │       ├── uiSlice.ts
    │       └── superHeroSlice.ts
    ├── styles/             # Theme and styling
    │   └── theme.ts
    ├── App.tsx
    └── main.tsx
```

## 🎨 Features Overview

### Hero Cards

- High-quality hero images
- Publisher badges with color coding
- Power statistics visualization
- Favorite toggle functionality

### Filtering System

- **Search**: Find heroes by name or full name
- **Publisher Filter**: Filter by DC Comics, Marvel, Dark Horse, etc.
- **Sorting**: Sort by name or any power stat (intelligence, strength, etc.)
- **Favorites Toggle**: Switch between all heroes and favorites only
- **Active Filters**: Visual chips showing current filters

### Favorites Management

- Click heart icon to add/remove favorites
- Persistent storage using localStorage
- Favorites counter in filter toggle
- Quick access to favorites-only view

### Responsive Design

- Mobile-first approach
- Adaptive grid layout
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🌐 API

This project uses the [Superhero API](https://akabab.github.io/superhero-api/) which provides:

- 731+ superheroes
- Detailed character information
- High-quality images
- Power statistics
- Biography data

## 🙏 Acknowledgments

- [Superhero API](https://akabab.github.io/superhero-api/) for providing the hero data
- [Material-UI](https://mui.com/) for the excellent component library
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management

---

Built with ❤️ using React and TypeScript
