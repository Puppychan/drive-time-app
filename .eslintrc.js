module.exports = {
  extends: [
    'universe',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['react', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to ESLint
    }
  },
  /* for lint-staged */
  globals: {
    __dirname: true
  }
}
