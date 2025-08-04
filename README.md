# Cocktail App

Application for displaying cocktails using The Cocktail DB API.

## Technologies

- **Vue 3** - progressive JavaScript framework
- **TypeScript** - typed JavaScript
- **Vite** - fast build tool
- **Vue Router** - routing for SPA
- **Pinia** - state manager
- **SCSS** - CSS preprocessor
- **ESLint + Prettier** - code quality tools

## Functionality

- ✅ Display cocktails by categories (Margarita, Mojito, A1, Kir)
- ✅ State manager for data caching
- ✅ Loading error handling
- ✅ Lazy loading images
- ✅ Responsive layout (360px - 1024px)
- ✅ Active navigation
- ✅ 404 page for non-existent routes
- ✅ Redirect from "/" to first cocktail

## Installation and Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check code
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── CocktailCard.vue
│   └── CocktailNavigation.vue
├── services/           # API services
│   └── cocktailApi.ts
├── stores/            # Pinia stores
│   └── cocktail.ts
├── types/             # TypeScript types
│   └── cocktail.ts
├── views/             # Application pages
│   ├── CocktailView.vue
│   └── NotFoundView.vue
├── router/            # Routing configuration
│   └── index.ts
└── App.vue           # Main component
```

## API

The application uses [The Cocktail DB API](https://www.thecocktaildb.com/api.php) to fetch cocktail data.

### Endpoints:
- `GET https://www.thecocktaildb.com/api/json/v1/1/search.php?s=<cocktail_code>`

### Available cocktail codes:
- `margarita`
- `mojito`
- `a1`
- `kir`

## Implementation Features

### State Manager
- Using Pinia for state management
- Data caching to prevent duplicate requests
- Separate states for loading and errors

### Routing
- Dynamic routes for each cocktail
- Route parameter validation
- Redirect from root path to first cocktail
- 404 error handling

### Responsiveness
- Maximum width: 1024px
- Minimum width: 360px
- Responsive grid for cocktail cards
- Mobile navigation

### Performance
- Lazy loading images
- API request caching
- Optimized component loading

## Deployment

The application is ready for deployment on any static hosting:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## License

MIT
