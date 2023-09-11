## TODO

- Provide route info to all top-level components
- Remove DefaultApplicationScreen, all top-level components
  use DefaultLayout directly
- Query params are made available to components in a type-safe manner

## Notes
- White it would be nice to have all panels follow the convention of `?panel=somePanelName`,
  that's actually a challenge. e.g. milestone panel, where we need to capture the milestone ID in the URL.