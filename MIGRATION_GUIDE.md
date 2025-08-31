# React 18 Migration Guide

This document outlines the breaking changes and migration steps taken to upgrade Quaker Maps from React 16.9 to React 18.2.

## Overview

The upgrade involved coordinated updates to:
- React 16.9 → React 18.2
- Material-UI v4 → MUI v5
- React Router v5 → React Router v6
- TSLint → ESLint
- TypeScript 3.8 → TypeScript 5.2
- Create React App 2.1 → Create React App 5.0

## Breaking Changes

### 1. React Root API Migration

**Before (React 16.9):**
```typescript
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

**After (React 18.2):**
```typescript
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

### 2. Material-UI to MUI v5 Migration

**Package Changes:**
```bash
# Removed
@material-ui/core
@material-ui/icons

# Added
@mui/material
@mui/icons-material
@emotion/react
@emotion/styled
```

**Import Changes:**
```typescript
// Before
import { Button, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// After
import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
```

**Styling Migration:**
```typescript
// Before (makeStyles)
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

// After (styled components or sx prop)
import { styled } from '@mui/material/styles';
const StyledComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

// Or using sx prop
<Box sx={{ padding: 2 }}>Content</Box>
```

### 3. React Router v5 to v6 Migration

**Route Definition Changes:**
```typescript
// Before (v5)
import { Switch, Route } from 'react-router-dom';
<Switch>
  <Route exact path="/" component={MainMapView} />
  <Route path="/meeting/:slug" component={MeetingView} />
</Switch>

// After (v6)
import { Routes, Route } from 'react-router-dom';
<Routes>
  <Route path="/" element={<MainMapView />} />
  <Route path="/meeting/:slug" element={<MeetingView />} />
</Routes>
```

### 4. TSLint to ESLint Migration

**Configuration Changes:**
- Removed `tslint.json`
- Added ESLint configuration in `package.json`
- Updated scripts to use `eslint` instead of `tslint`

**New Scripts:**
```json
{
  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix"
}
```

### 5. TypeScript Updates

**Version:** 3.8 → 5.2
**Type Definition Updates:**
- `@types/react` updated to v18
- `@types/react-dom` updated to v18
- All other type definitions updated for compatibility

## New Features Available

### React 18 Automatic Batching
React 18 automatically batches multiple state updates for better performance:

```typescript
// These updates are automatically batched in React 18
setCount(c => c + 1);
setFlag(f => !f);
// Only one re-render occurs
```

### Concurrent Features (Future Ready)
The application is now ready to adopt React 18's concurrent features:
- `useTransition` for non-urgent updates
- `useDeferredValue` for deferring expensive calculations
- `Suspense` improvements

## Testing Updates

### Updated Dependencies
- `@testing-library/react` updated to v16
- `@testing-library/jest-dom` updated to v6
- Jest configuration updated for React 18 compatibility

### Test Utilities
Updated test utilities to work with new React 18 rendering:
```typescript
// Updated test-utils.tsx to handle React 18 rendering
// Fixed PerformanceObserver mocking for build compatibility
```

## Performance Improvements

### Bundle Size
- Bundle size maintained at ~175KB (gzipped)
- MUI v5 tree-shaking improvements
- React 18 optimizations

### Runtime Performance
- Automatic batching reduces re-renders
- Improved hydration performance
- Better memory usage patterns

## Compatibility Notes

### Backward Compatibility
- All existing functionality preserved
- Component APIs remain the same
- State management patterns unchanged
- Session storage integration unchanged

### External Dependencies
- Google Maps integration: ✅ Compatible
- Firebase Functions: ✅ Compatible
- Surge.sh deployment: ✅ Compatible
- Analytics (React GA4): ✅ Updated and compatible

## Known Issues and Warnings

### React Router Future Flags
The following warnings are expected and can be addressed in future updates:
```
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7
```

These are deprecation warnings for React Router v7 and don't affect current functionality.

### ESLint Warnings
Some ESLint warnings remain in the codebase:
- Console statements in utility files (intentional for debugging)
- `any` types in Google Maps integration (external library limitation)
- Missing dependencies in useEffect hooks (performance optimization)

## Migration Checklist

- [x] Update React and ReactDOM to 18.2
- [x] Migrate ReactDOM.render to createRoot API
- [x] Update Material-UI to MUI v5
- [x] Migrate makeStyles to styled components/sx prop
- [x] Update React Router to v6
- [x] Replace Switch with Routes, component with element
- [x] Replace TSLint with ESLint
- [x] Update TypeScript to 5.2
- [x] Update all type definitions
- [x] Update Create React App to 5.0
- [x] Update third-party dependencies
- [x] Fix test compatibility issues
- [x] Verify build process
- [x] Test all functionality
- [x] Update documentation

## Future Considerations

### React 18 Concurrent Features
Consider adopting these features in future updates:
- `useTransition` for search/filter operations
- `useDeferredValue` for map rendering optimizations
- Enhanced `Suspense` for data loading

### React Router v7 Preparation
- Add future flags to prepare for v7 migration
- Consider adopting new data loading patterns

### Performance Optimizations
- Implement React 18's `startTransition` for non-urgent updates
- Consider code splitting improvements
- Evaluate bundle optimization opportunities

## Support

For questions about this migration or issues encountered:
1. Check this migration guide first
2. Review the updated README.md
3. Check the comprehensive test suite for examples
4. Refer to official documentation for React 18, MUI v5, and React Router v6