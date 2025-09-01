# Current Dependency Versions - Backup

This file documents the current dependency versions before the dependency resolution changes.

## Production Dependencies
- @emotion/react: ^11.14.0
- @emotion/styled: ^11.14.1
- @mui/icons-material: ^7.3.1
- @mui/material: ^7.3.1
- @mui/styles: ^6.5.0
- ajv: ^8.17.1
- google-map-react: ^2.1.10
- lodash: ^4.17.21
- react: ^18.2.0
- react-dom: ^18.2.0
- react-ga4: ^2.1.0
- react-router-dom: ^6.15.0
- react-scripts: ^5.0.1
- styled-components: ^5.3.11
- surge: ^0.24.6

## Development Dependencies
- @testing-library/dom: ^10.4.1
- @testing-library/jest-dom: ^6.8.0
- @testing-library/react: ^16.3.0
- @testing-library/user-event: ^14.6.1
- @types/google-map-react: ^2.1.10
- @types/jest: ^29.5.14
- @types/lodash: ^4.14.199
- @types/node: ^20.19.11
- @types/react: ^18.3.24
- @types/react-dom: ^18.3.7
- @types/styled-components: ^5.1.34
- @typescript-eslint/eslint-plugin: ^6.7.2
- @typescript-eslint/parser: ^6.7.2
- eslint: ^8.49.0
- eslint-plugin-react: ^7.33.2
- eslint-plugin-react-hooks: ^4.6.0
- prettier: ^3.6.2
- typescript: ^5.2.2

## Key Conflicts Identified
1. TypeScript ^5.2.2 conflicts with react-scripts@5.0.1 requirement (^3.2.1 || ^4)
2. @typescript-eslint/eslint-plugin@6.7.2 conflicts with eslint-plugin-jest requirements (^4.0.0 || ^5.0.0)
3. MUI packages version misalignment: @mui/material@7.3.1, @mui/icons-material@7.3.1 vs @mui/styles@6.5.0

## Backup Files Created
- package.json.backup
- package-lock.json.backup
- dependency-versions-backup.md (this file)

Date: $(date)