## Resources
- [Sitemap](https://whimsical.com/align-sitemap-RdJFs15LQnxJZz3vptaA8n)

## TODO

These are items that we need to have solved/answered before we start refactoring Align to use `react-router`.

- ✅ Provide route info to all top-level components
  - see `withRoute` HOC
- ✅ Remove `DefaultApplicationScreen`, all top-level components
  use `DefaultLayout` directly
- ❌ Put together an easy-to-use interface for constructing links that preserve query params
  - The issue can be demonstrated by opening a panel, then clicking on a link in the nav bar. The link will
    not preserve the query parameters. I propose that we create a wrapper around `Link` that preserves the query
    by default. [This issue shows a potential solution](https://github.com/remix-run/react-router/issues/9541).
- ❌ Allow controlling dialogs via the URL (TODO: control via a URL hash, or query param?)
- ❌ Breadcrumb support
  - There's some work on this branch already, but it's not complete. See TODO in `breadcrumbs.ts` for more info.
  - Consider the Iris implementation of the breadcrumb component before continuing further (`SimpleBreadcrumbs` in this
    application is a stop-gap that is expected to be replaced with the Iris implementation).
- ❌ Support for "in-place-redirect" for URLs that we'll be renaming. For example, we'll be renaming the route
  `/plan/<ID>` to `/workspace/<ID>`
- ❌ Augment the `RouteDefinition` model (or via some new model), to allow a route to declare the query parameters
  that it supports.
- ❌ Allow "locking" navigation in certain conditions (e.g. when a dialog is open, or when a form is dirty)

## Notes
- Left-side navigation panel is *not* controlled via the URL, it's controlled via local storage
- All right-side panels and dialogs are controlled via the URL
  - For panels, the name of the query parameter is `panel`, and it may specify multiple panels
    by separating them with commas, e.g. `?panel=panel1,panel2,milestone|<someMilestoneId>,panel3`
- All dialogs are controlled via the URL, and the name of the query parameter is `dialog`. Only one dialog
  at a time is supported.
- `DefaultLayout` is used by all top-level "screen" components, and it's responsible for rendering
  the navigation panel, the main content, and any right-side panels and dialogs.
  - There is likely to be some duplication between the ways that various screens are laid out (e.g. multiple
    screens using the same navigation panel), in these cases we can add abstractions around `DefaultLayout`,
    but the intention is to treat the various pieces of the layout (nav bar content, breadcrumbs, etc.) as
    composable pieces that can be used in different ways.