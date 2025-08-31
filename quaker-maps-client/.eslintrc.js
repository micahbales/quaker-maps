module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
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
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
  ignorePatterns: [
    'build/',
    'node_modules/',
    '*.js', // Ignore JS files in root (like this config file)
  ],
};