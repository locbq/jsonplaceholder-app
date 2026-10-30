# JSONPlaceholder browser

A React application for browsing users, posts, comments, albums, photos and todos from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Development

Use Node.js 22.12+ or 24+ (as required by Vite) and run:

```sh
npm ci
npm start
```

Vite prints the local development URL. The development server and deployment host must serve `index.html` for client-side routes; `public/_redirects` provides this fallback on Netlify.

## Verification and production

- `npm test` runs the Vitest suite once; `npm run test:watch` runs it in watch mode.
- `npm run coverage` generates a coverage report.
- `npm run build` type-checks the app and writes the production bundle to `dist/`.
- `npm run preview` serves the production bundle locally.
