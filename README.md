## TODO

- ❌ Provide route info to all top-level components
  - How important is this really? React router doesn't appear to provide an OOTB way to
    do it, so I'm hesitant to keep investigating. Not convinced that it's really a problem
    for us to call `useLocation`/`useSearchParams`/etc. in the top-level components that need it.
- ✅ Remove DefaultApplicationScreen, all top-level components
  use DefaultLayout directly
- ❌ Find a nice API for constructing links that preserve query params

## Notes
- White it would be nice to have all panels follow the convention of `?panel=somePanelName`,
  that's actually a challenge. e.g. milestone panel, where we need to capture the milestone ID in the URL.