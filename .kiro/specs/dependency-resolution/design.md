# Modern Tech Stack Migration Design Document

## Overview

This design document outlines the technical approach for migrating the Quaker Maps application from Create React App (react-scripts) to Vite and upgrading to the latest versions of React, TypeScript, and other core dependencies. The primary goal is to establish a modern, performant development environment while eliminating peer dependency conflicts.

The approach involves replacing react-scripts with Vite, upgrading to React 19.x and TypeScript 5.x, modernizing the testing setup with Vitest, and updating all dependencies to their latest stable versions while maintaining application functionality.

## Architecture

### Migration Strategy Overview

The migration follows a **modern-first approach** to establish a cutting-edge development environment:

1. **Build System Migration**: Replace react-scripts with Vite for faster builds and modern tooling
2. **Dependency Modernization**: Upgrade to latest stable versions of core dependencies
3. **Testing Modernization**: Migrate from Jest to Vitest for better Vite integration
4. **Styling Modernization**: Remove deprecated @mui/styles and use modern styling approaches

### Target Technology Stack

**Core Framework:**
- React: 18.3.1 (latest stable 18.x)
- TypeScript: 5.9.2 (latest stable)
- Vite: 7.1.3 (latest stable)

**UI Library:**
- @mui/material: 7.3.1 (latest stable)
- @mui/icons-material: 7.3.1 (latest stable)
- Remove @mui/styles (deprecated)

**Development Tools:**
- ESLint: 9.34.0 (latest stable)
- @typescript-eslint/eslint-plugin: 8.41.0 (latest stable)
- Prettier: Latest stable
- Vitest: Latest stable for testing

### Migration Benefits

**Performance Improvements:**
- Faster development server startup (Vite vs react-scripts)
- Faster hot module replacement
- Optimized production builds
- Better tree-shaking and code splitting

**Developer Experience:**
- Latest TypeScript features and performance
- Modern ESLint rules and better error reporting
- Better IDE integration and IntelliSense
- Faster test execution with Vitest

## Components and Interfaces

### Vite Configuration Architecture

Vite will replace react-scripts with a modern, flexible build system:

**Vite Configuration Features:**
- TypeScript 5.x support out of the box
- React 19.x support with automatic JSX transform
- ESLint integration with latest plugins
- Hot Module Replacement (HMR) for all file types
- Optimized production builds with Rollup

**Configuration Structure:**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
```

### Modern ESLint Configuration

With Vite, we can use the latest ESLint ecosystem without react-scripts constraints:

**Target ESLint Stack:**
```
eslint@9.34.0 (latest stable)
@typescript-eslint/eslint-plugin@8.41.0 (latest stable)
@typescript-eslint/parser@8.41.0 (latest stable)
eslint-plugin-react@7.x (latest stable)
eslint-plugin-react-hooks@4.x (latest stable)
```

**Modern ESLint Configuration:**
- Flat config format (ESLint 9.x)
- TypeScript 5.x support
- React 19.x support
- Better performance and error reporting
- Integration with Vite development server

### Modern MUI and Styling Architecture

Upgrade to latest MUI with modern styling approaches:

**Target MUI Stack:**
```
@mui/material: ^7.3.1 (latest stable)
@mui/icons-material: ^7.3.1 (latest stable)
@mui/system: ^7.3.1 (for styling utilities)
@emotion/react: ^11.x (peer dependency)
@emotion/styled: ^11.x (peer dependency)
```

**Styling Migration Strategy:**
1. **Remove @mui/styles**: Deprecated package, not compatible with React 19
2. **Migrate to @mui/system**: Use sx prop and styled() from @mui/system
3. **Use emotion directly**: For complex styling needs
4. **Leverage MUI v7 features**: Latest components and performance improvements

**Migration Path:**
- Replace makeStyles() with styled() or sx prop
- Update theme usage to MUI v7 API
- Ensure React 19 compatibility

### Modern Testing Architecture with Vitest

Migrate from Jest to Vitest for better Vite integration and performance:

**Target Testing Stack:**
```
vitest: latest stable (Vite-native test runner)
@testing-library/react: latest (React 19 compatible)
@testing-library/jest-dom: latest (DOM testing utilities)
@testing-library/user-event: latest (user interaction testing)
jsdom: latest (DOM environment for Vitest)
```

**Vitest Benefits:**
- Native Vite integration (no configuration needed)
- Faster test execution
- Better TypeScript support
- Hot Module Replacement for tests
- Compatible with Jest API (minimal migration needed)

**Migration Considerations:**
- Update test configuration from Jest to Vitest
- Ensure all existing tests continue to work
- Leverage Vitest-specific features for better performance

## Data Models

### Target Dependency Matrix

Modern dependency versions for the upgraded stack:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@mui/material": "^7.3.1",
    "@mui/icons-material": "^7.3.1",
    "@mui/system": "^7.3.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "google-map-react": "^2.1.10",
    "lodash": "^4.17.21",
    "react-ga4": "^2.1.0",
    "react-router-dom": "^6.15.0",
    "styled-components": "^5.3.11"
  },
  "devDependencies": {
    "typescript": "^5.9.2",
    "vite": "^7.1.3",
    "@vitejs/plugin-react": "^4.x",
    "vitest": "^2.x",
    "eslint": "^9.34.0",
    "@typescript-eslint/eslint-plugin": "^8.41.0",
    "@typescript-eslint/parser": "^8.41.0",
    "prettier": "^3.6.2"
  }
}
```

### Migration Impact Assessment

**High Value Changes:**
- React 18 → 19: Latest features and performance improvements
- TypeScript 4.9 → 5.9: Modern language features and better performance
- react-scripts → Vite: Significantly faster development and builds
- Jest → Vitest: Better test performance and Vite integration

**Medium Risk Changes:**
- @mui/styles removal: Requires component styling migration
- ESLint 8 → 9: New flat config format
- Testing setup migration: Jest to Vitest configuration changes

**Validation Required:**
- All TypeScript compilation with new features
- React 19 component compatibility
- MUI v7 styling migration
- Vitest test execution
- Vite build and development server

## Error Handling

### Migration Error Prevention

1. **Incremental Updates**: Update packages in small groups to isolate issues
2. **Version Pinning**: Use exact versions initially to prevent unexpected updates
3. **Rollback Strategy**: Maintain package-lock.json backup for quick reversion
4. **Validation Gates**: Run tests and builds after each update group

### Compatibility Validation

**TypeScript Compatibility:**
```bash
# Validate TypeScript compilation
npm run type-check

# Check for TypeScript errors
npx tsc --noEmit --skipLibCheck
```

**ESLint Compatibility:**
```bash
# Validate ESLint configuration
npm run lint

# Check for configuration errors
npx eslint --print-config src/App.tsx
```

**Runtime Compatibility:**
```bash
# Validate application starts
npm start

# Validate build process
npm run build

# Validate tests run
npm test --watchAll=false
```

### Fallback Procedures

If compatibility issues arise:

1. **Immediate Rollback**: Restore previous package.json and package-lock.json
2. **Alternative Versions**: Try different compatible version combinations
3. **Configuration Adjustments**: Modify ESLint or TypeScript configs if needed
4. **Code Updates**: Make minimal code changes to support new versions

## Testing Strategy

### Automated Validation

1. **Dependency Installation Test**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   # Should complete without --legacy-peer-deps
   ```

2. **Compilation Test**:
   ```bash
   npm run type-check
   npm run build
   ```

3. **Linting Test**:
   ```bash
   npm run lint
   ```

4. **Unit Test Execution**:
   ```bash
   npm test --watchAll=false
   ```

### Manual Validation Checklist

**Development Environment:**
- [ ] `npm start` launches without warnings
- [ ] Hot reload functions correctly
- [ ] TypeScript errors display properly in IDE
- [ ] ESLint errors display properly in IDE

**Application Functionality:**
- [ ] Map renders and displays meetings
- [ ] Meeting search and filtering works
- [ ] Navigation between pages functions
- [ ] Meeting detail pages load correctly
- [ ] Update meeting form submits successfully

**Build and Deploy:**
- [ ] `npm run build` completes successfully
- [ ] Built application functions correctly
- [ ] Deployment scripts work as expected

### Performance Validation

Ensure dependency updates don't negatively impact performance:
- Bundle size comparison (before/after)
- Initial load time measurement
- Development server startup time
- Build time comparison

## Implementation Phases

### Phase 1: Preparation and Environment Setup
1. Create backup of current package.json and package-lock.json
2. Document current dependency versions and functionality
3. Run baseline tests to establish current functionality
4. Clear node_modules and package-lock.json for clean migration

### Phase 2: Vite Migration and Build System Setup
1. Remove react-scripts dependency
2. Install Vite and @vitejs/plugin-react
3. Create vite.config.ts configuration file
4. Update npm scripts to use Vite commands
5. Migrate public/index.html to Vite format

### Phase 3: Core Dependency Upgrades
1. Upgrade React to 19.1.1 and React DOM
2. Upgrade TypeScript to 5.9.2
3. Update @types packages for React 19 compatibility
4. Test basic compilation and development server

### Phase 4: Modern ESLint Configuration
1. Upgrade ESLint to 9.34.0
2. Upgrade @typescript-eslint packages to 8.41.0
3. Migrate to ESLint flat config format
4. Update ESLint configuration for React 19 and TypeScript 5.9

### Phase 5: MUI and Styling Modernization
1. Ensure @mui/material and @mui/icons-material are at 7.3.1
2. Remove @mui/styles dependency
3. Migrate existing @mui/styles usage to @mui/system or emotion
4. Test UI component rendering and theming

### Phase 6: Testing Migration to Vitest
1. Install Vitest and related testing dependencies
2. Update test configuration from Jest to Vitest
3. Migrate test scripts and setup files
4. Ensure all existing tests pass with Vitest

### Phase 7: Comprehensive Validation and Optimization
1. Run full test suite with Vitest
2. Test application functionality manually
3. Validate Vite build and development processes
4. Performance testing and optimization
5. Update documentation and deployment scripts

## Risk Mitigation

### Version Compatibility Risks

**TypeScript Downgrade Risk:**
- Risk: Loss of TypeScript 5.x features
- Mitigation: Audit code for TypeScript 5.x specific features before downgrade
- Fallback: Upgrade react-scripts if TypeScript 5.x features are essential

**MUI Downgrade Risk:**
- Risk: Loss of MUI v7 features or API changes
- Mitigation: Review MUI v7 → v5 migration guide for breaking changes
- Fallback: Selective component updates to maintain v7 compatibility

**ESLint Plugin Risk:**
- Risk: Loss of newer linting rules or features
- Mitigation: Review ESLint rule changes between versions
- Fallback: Custom ESLint configuration to maintain desired rules

### Development Workflow Risks

**Build System Changes:**
- Risk: Development or build processes break
- Mitigation: Test all npm scripts after each phase
- Fallback: Maintain working package.json backup

**IDE Integration:**
- Risk: TypeScript or ESLint IDE integration breaks
- Mitigation: Test IDE functionality after updates
- Fallback: IDE-specific configuration adjustments

### Deployment Risks

**Production Build Changes:**
- Risk: Production build output changes unexpectedly
- Mitigation: Compare build outputs before and after
- Fallback: Deploy to staging environment first

**Runtime Compatibility:**
- Risk: Application behavior changes in production
- Mitigation: Comprehensive testing in production-like environment
- Fallback: Blue-green deployment strategy for quick rollback