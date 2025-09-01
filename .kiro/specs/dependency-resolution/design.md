# Dependency Resolution Design Document

## Overview

This design document outlines the technical approach for resolving peer dependency conflicts in the Quaker Maps application. The primary goal is to eliminate the need for the `--legacy-peer-deps` flag by systematically identifying and resolving version conflicts between dependencies.

The approach involves analyzing the current dependency tree, identifying specific version conflicts, and updating packages to compatible versions while maintaining application functionality and development workflow integrity.

## Architecture

### Dependency Conflict Analysis

Based on the npm install output, the main conflicts are:

1. **TypeScript Version Conflict**: 
   - Current: TypeScript ^5.2.2
   - Required by react-scripts@5.0.1: TypeScript ^3.2.1 || ^4
   - Resolution: Downgrade TypeScript to 4.x or upgrade react-scripts

2. **ESLint Plugin Conflicts**:
   - @typescript-eslint/eslint-plugin@6.7.2 conflicts with eslint-plugin-jest requirements
   - eslint-plugin-jest expects @typescript-eslint/eslint-plugin ^4.0.0 || ^5.0.0
   - Resolution: Align ESLint plugin versions

3. **MUI Package Version Misalignment**:
   - @mui/material@7.3.1 and @mui/icons-material@7.3.1 vs @mui/styles@6.5.0
   - Resolution: Align all MUI packages to compatible versions

### Resolution Strategy

The resolution will follow a **compatibility-first approach**:

1. **Identify Version Constraints**: Map all peer dependency requirements
2. **Find Compatible Versions**: Determine version ranges that satisfy all constraints
3. **Prioritize Stability**: Choose stable, well-tested versions over bleeding edge
4. **Validate Functionality**: Ensure updates don't break existing features

## Components and Interfaces

### React Scripts Compatibility Matrix

React Scripts 5.0.1 has specific peer dependency requirements:
- TypeScript: ^3.2.1 || ^4
- React: ^18.0.0
- ESLint: ^8.0.0

**Resolution Options:**
1. **Option A**: Downgrade TypeScript to 4.9.5 (latest 4.x)
2. **Option B**: Upgrade react-scripts to 5.0.1+ that supports TypeScript 5.x
3. **Option C**: Use Create React App 5.0.1 with TypeScript 4.x

**Recommended**: Option A - Downgrade TypeScript to 4.9.5 for maximum compatibility.

### ESLint Configuration Alignment

Current ESLint ecosystem conflicts:
```
@typescript-eslint/eslint-plugin@6.7.2 (current)
eslint-plugin-jest@25.7.0 (from react-scripts)
  └── requires @typescript-eslint/eslint-plugin ^4.0.0 || ^5.0.0
```

**Resolution Strategy:**
- Downgrade @typescript-eslint/eslint-plugin to 5.62.0 (latest 5.x)
- Downgrade @typescript-eslint/parser to match
- Ensure ESLint rules remain compatible

### MUI Package Version Harmonization

Current MUI package versions:
```
@mui/material: ^7.3.1
@mui/icons-material: ^7.3.1  
@mui/styles: ^6.5.0
```

**Issue**: @mui/styles is deprecated and not compatible with MUI v7.

**Resolution Strategy:**
1. **Option A**: Downgrade all MUI packages to v5.x (stable, well-supported)
2. **Option B**: Remove @mui/styles and migrate to @mui/system or styled components
3. **Option C**: Keep MUI v7 and replace @mui/styles usage

**Recommended**: Option A - Downgrade to MUI v5.14.x for stability and compatibility.

### Testing Library Compatibility

Current testing library versions appear compatible with React 18:
```
@testing-library/react: ^16.3.0
@testing-library/jest-dom: ^6.8.0
@testing-library/user-event: ^14.6.1
```

These should remain compatible with the proposed changes.

## Data Models

### Dependency Version Matrix

Target compatible versions:
```json
{
  "dependencies": {
    "@mui/material": "^5.14.20",
    "@mui/icons-material": "^5.14.19",
    "@mui/styles": "^5.14.20"
  },
  "devDependencies": {
    "typescript": "^4.9.5",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    "@typescript-eslint/parser": "^5.62.0"
  }
}
```

### Migration Impact Assessment

**Low Risk Changes:**
- TypeScript 5.x → 4.9.5: Minimal breaking changes for existing code
- ESLint plugins downgrade: Configuration remains compatible
- MUI v7 → v5: API is largely compatible

**Medium Risk Changes:**
- @mui/styles removal: May require component styling updates

**Validation Required:**
- All TypeScript compilation
- ESLint rule functionality
- MUI component rendering
- Test execution

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

### Phase 1: Preparation and Backup
1. Create backup of current package.json and package-lock.json
2. Document current dependency versions
3. Run baseline tests to establish current functionality
4. Clear node_modules and package-lock.json for clean slate

### Phase 2: TypeScript and ESLint Resolution
1. Downgrade TypeScript to 4.9.5
2. Downgrade @typescript-eslint packages to 5.62.0
3. Test compilation and linting
4. Resolve any TypeScript or ESLint configuration issues

### Phase 3: MUI Package Alignment
1. Downgrade @mui/material and @mui/icons-material to 5.14.x
2. Update @mui/styles to compatible 5.14.x version
3. Test UI component rendering
4. Fix any MUI API compatibility issues

### Phase 4: Clean Installation Validation
1. Remove node_modules and package-lock.json
2. Run `npm install` without --legacy-peer-deps flag
3. Verify no peer dependency warnings
4. Test all development commands

### Phase 5: Comprehensive Testing
1. Run full test suite
2. Test application functionality manually
3. Validate build and deployment processes
4. Performance regression testing

### Phase 6: Documentation and Cleanup
1. Update README.md with new dependency information
2. Remove --legacy-peer-deps references from documentation
3. Update CI/CD scripts if necessary
4. Document any breaking changes or migration notes

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