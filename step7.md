[README TOP](./README.md)

# Step7 : Code formatter

Instruction for setup code formatter and linter after step6.

## 1. Add Prettier

```sh
pnpm add -D prettier
```

## 2. Create a coding file

```sh
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

## 3. Edit .prettierrc

Before

```json
(Empty)
```

After

```json
{
  "semi": false,
  "singleQuote": true
}
```

## 4. Format the code

```sh
pnpm exec prettier . --write
```

## 5. Add ESLint

```sh
pnpm create @eslint/config@latest
```

Create an ESLint config file interactive by answering prompts.

```
What do you want to lint?
(*) JavaScript

How would you like to use ESLint?
> To check syntax and find problems

What type of modules does your project use?
> JavaScript modules (import/export)

Which framework does your project use?
> Vue.js

Dows your project use TypeScript? >> Yes

Where does your code run?
(*) Browser

Which languege do you want your configuration file be written in?
> TypeScript

Would you like to install them now? >> Yes

Which package manager do you want to use?
> pnpm
```

And format the eslint.config.mts file.

```sh
pnpm exec prettier eslint.config.mts --write
```

## 6. Edit file

### eslint.config.mts

Before

```ts
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
])
```

After

```ts
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    // Add rules to prefer arrow functions.
    rules: {
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    // Add an ignore entry to the vue/multi-word-component-names rule.
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'],
        },
      ],
    },
  },
])
```

## 7. Run the linter

If there are no errors, the code is safe.

```sh
pnpm eslint .
```
