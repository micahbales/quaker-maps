# Technology Stack

## Frontend
- **React 16.9** with TypeScript
- **Material-UI 4.4** for UI components and theming
- **Google Maps React** for interactive mapping
- **React Router** for client-side routing
- **Styled Components** for additional styling
- **Lodash** for utility functions

## Backend
- **Firebase Functions** with Express.js
- **Node.js 8** runtime
- **SendGrid** for email functionality
- **Axios** for HTTP requests

## Build System
- **Create React App** with TypeScript template
- **TSLint** for code linting
- **Surge.sh** for deployment

## Common Commands

### Client Development
```bash
cd quaker-maps-client
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
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
- Node 12+ and TypeScript 3+ required for development