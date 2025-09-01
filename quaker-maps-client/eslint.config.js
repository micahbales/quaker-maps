import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        performance: 'readonly',
        
        // DOM types
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLFormElement: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        
        // Performance API
        PerformanceObserver: 'readonly',
        PerformanceNavigationTiming: 'readonly',
        
        // Service Worker
        ServiceWorkerRegistration: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,
      
      // TypeScript ESLint recommended rules
      ...typescript.configs.recommended.rules,
      
      // React 18 specific rules
      'react/react-in-jsx-scope': 'off', // Not needed with React 18 JSX transform
      'react/jsx-uses-react': 'off', // Not needed with React 18 JSX transform
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // React specific rules
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/display-name': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-deprecated': 'warn',
      'react/no-direct-mutation-state': 'error',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',
      
      // Import/Export rules
      'no-duplicate-imports': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Test files configuration
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/test-utils.tsx'],
    languageOptions: {
      globals: {
        // Jest/Vitest globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        
        // Additional test globals
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        performance: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      'build/',
      'node_modules/',
      'dist/',
      'public/',
      'coverage/',
      '*.config.js',
      'vite.config.ts',
      '.env*',
    ],
  },
];