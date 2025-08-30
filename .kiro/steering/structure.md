# Project Structure

## Root Level
- `quaker-maps-client/` - React frontend application
- `firebase/` - Firebase Functions backend
- `README.md` - Project documentation and setup guide
- `LICENSE.md` - +CAL license terms

## Frontend Structure (`quaker-maps-client/`)

### Source Organization
```
src/
├── components/           # Reusable UI components
│   ├── MainMap/         # Primary map component
│   ├── MapMarker/       # Individual map markers
│   ├── MeetingView/     # Meeting detail pages
│   ├── NavBar/          # Top navigation
│   ├── NavMenu/         # Side navigation menu
│   └── UpdateMeetings/  # Meeting update forms
├── api/                 # API integration layer
├── images/              # Static image assets
├── static_pages/        # Static content pages (FAQ, Contact, etc.)
├── utils/               # Utility functions
├── App.tsx              # Main application component
├── types.ts             # TypeScript type definitions
└── theme.ts             # Material-UI theme configuration
```

### Component Conventions
- Each component has its own folder with the component file
- Complex components include `components/` subfolder for child components
- API calls are organized in `api/` subfolders within component directories
- Utility functions are in `utils/` subfolders when component-specific

## Backend Structure (`firebase/functions/`)

```
src/
├── controllers/         # Route handlers
│   ├── email.ts        # Email functionality
│   └── meetings.ts     # Meeting data endpoints
├── utils/              # Shared utilities
└── index.ts            # Express app and route definitions
```

## Naming Conventions
- Components use PascalCase (e.g., `MainMap.tsx`)
- Files and folders use snake_case or kebab-case
- TypeScript interfaces are PascalCase
- Component props interfaces follow `ComponentNameProps` pattern

## State Management
- App-level state managed in `App.tsx` using React hooks
- Session storage used for caching meeting data
- No external state management library (Redux, etc.)

## Routing
- Client-side routing with React Router
- Route definitions centralized in `App.tsx`
- Meeting detail pages use slug-based URLs (`/meeting/:slug`)