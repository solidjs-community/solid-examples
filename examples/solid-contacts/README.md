# Solid Contacts

A contact management app built with SolidStart to showcase SSR and progressive enhancement. Built by [Paul Roque](https://github.com/pauloevpr).

## Features

SolidStart features:

- File-based routing
- Cookie-based authentication using `solid-start/session`
- Top-level authorization using middlewares
- RPC-like API endpoints using `$server` functions
- Isomorphic data fetching using `routeData`
- Page layouts using Nested Routes
- Client-side data caching with invalidation
- Data mutation using `createRouteAction` 
- Search/filtering using standard forms and `useSearchParams`
- Delete multiple items in a list using form inputs and `createRouteAction`
- FLIP animations using custom directives

App features:

- Sign In (without password)
- View contacts grouped and ordered alphabetically
- View details for individual contacts 
- Search contacts by name
- Favorite contact
- Add contact
- Delete contact
- Delete multiple contacts
- Start email from contact details
- Start phone call from contact details
- Smooth page transitions
- Dark mode

## Tools

- `prettier` for code formatting
- `Tailwind CSS` for styling
- `typescript` for type check

> The app was designed with Progressive Enhancement in mind. All features are available even when JavaScript is not available.

## Run in Development mode

```
npm run dev
```

## Build for production

```
npm run build
```
## Run production build locally
```
npm run start
```


