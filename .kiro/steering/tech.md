# Technology Stack

## Frontend
- **React 18.2** with TypeScript 5.2
- **MUI v5 (Material-UI)** for UI components and theming
- **Google Maps React 2.1** for interactive mapping
- **React Router v6** for client-side routing
- **Styled Components 5.3** for additional styling
- **Lodash 4.17** for utility functions
- **React GA4** for analytics

## Backend
- **Firebase Functions** with Express.js
- **Node.js 8** runtime (functions)
- **SendGrid** for email functionality
- **Axios** for HTTP requests

## Build System
- **Create React App 5.0** with TypeScript template
- **ESLint** for code linting (migrated from TSLint)
- **Prettier** for code formatting
- **Surge.sh** for deployment

## Common Commands

### Client Development
```bash
cd quaker-maps-client
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier
npm run deploy       # Deploy to production (www.quakermaps.com)
npm run deploy-dev   # Deploy to development (dev.quakermaps.com)
```

### Firebase Functions
```bash
cd firebase
firebase deploy      # Deploy functions
npm run build        # Compile TypeScript
npm run serve        # Serve functions locally
npm run shell        # Firebase functions shell
npm run logs         # View function logs
```

## Environment Setup
- Requires Google Maps API key in `.env` file
- Firebase configuration needed for backend functions
- Node 16+ (recommended: Node 18+) and TypeScript 5+ required for development
- React 18 with automatic batching and concurrent features support