module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'jest.config.js',
    'next.config.js',
    'next-i18next.config.js',
    'metro.config.js',
    '.eslintrc.cjs',
    'babel.config.js',
    'node_modules/',
    '**/svgr.js',
    'dist/',
    'out/',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"],
          ["@/components", "./src/ui/components"]
        ],
        "extensions": [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    },
  },
  plugins: ['react', 'prettier', 'simple-import-sort', '@stylistic/js', "simple-import-sort"],
  rules: {
    "import/no-unresolved": "off",
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@stylistic/js/quotes': ['error', "single"],
    '@stylistic/js/jsx-quotes': ['error', "prefer-double"],
    '@stylistic/js/quote-props': ['error', "as-needed"],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-shadow': 'off',
    'no-undef': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'error',
    'no-return-await': 'error',
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: true,
      },
    ],
    'react/no-unescaped-entities': ['off'],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector:
          'MemberExpression[object.type=MemberExpression][object.object.name=window][object.property.name=location][property.name=origin]',
        message:
          'The behavior of `window.location.origin` is browser dependent, use `getOrigin` for consistency.',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Usage of relative parent imports is not allowed.',
          },
        ],
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'window',
        property: 'origin',
        message:
          "'window.origin' is browser dependent, use `getOrigin` for consistency",
      },
    ],
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useAnimatedStyle|useDerivedValue|useAnimatedProps)',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            jsxSingleQuote: false,
            trailingComma: 'all',
            arrowParens: 'always',
            bracketSameLine: false,
            bracketSpacing: true,
            endOfLine: 'auto',
            printWidth: 80,
            quoteProps: 'as-needed',
            requirePragma: false,
            semi: true,
            tabWidth: 2,
            useTabs: false,
          },
        ],
      },
    },
  ],
};
