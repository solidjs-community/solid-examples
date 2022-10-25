# Solid Contacts

A contacts management sample app designed to showcase SSR and progressive enhancement patterns in `SolidStart`.

https://user-images.githubusercontent.com/33222314/196914078-59156052-077d-40eb-9081-4a6619f0265c.mp4

Built by [Paul Roque](https://github.com/pauloevpr).

## Features

SolidStart features in display:

- File-based routing
- Cookie-based authentication using `solid-start/session`
- Top-level authorization using middlewares
- RPC-like API endpoints using `$server` functions
- Isomorphic data fetching using `routeData`
- Page layouts using Nested Routes
- Simplified client-side data caching and invalidation
- Data mutation using `createRouteAction` 
- Search/filtering using standard forms and `useSearchParams`
- Delete multiple items in a list using form inputs and `createRouteAction`
- FLIP animations using custom directives

App features:

- Mobile and Desktop support
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

> The app was designed with Progressive Enhancement in mind. All functionalities work even when JavaScript is not available.

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


