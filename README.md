# surrealdb-oauth2

This template should help get you started developing with Vue 3 in Vite.

`.env`
```env
VITE_SURREALDB=""

# Google
VITE_CLIENTID=""
VITE_SECRET=""

VITE_REDIRECTURI=""

# Microsoft 
VITE_MSAUD=""
VITE_MSID=""

# Discord 
VITE_DSURL=""
VITE_DSID=""
VITE_DSSECRET=""

# GitHub 
VITE_GHID=""
VITE_GHSECRET=""
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
