# 5. Statically generate map screen

Date: 2024-01-06

## Status

Accepted

## Context

Since the [last ADR](./0004-build-frontend-in-nextjs.md) was written this project has been repurposed to display details about restaurants in Melbourne. This is done by having a Next.js frontend query a Go backend for restaurants.

I would like to host this site somewhere to share it with other people. I would also prefer to use a static hosting option as those are typically cheaper and require less operational overhead.

I could achieve this by using a JSON file in place of a backend (like what I've done for [my Pixel Art Gallery](https://github.com/PakkuDon/pixel-art-gallery)). But I would prefer to retain the Go backend so that I can have more experience working with that ecosystem.

## Decision

The map screen will be statically exported and hosted on a static site hosting service (eg: Github Pages).

~~Route handlers will be used to fetch data from the backend so that this data is exported during the build process.~~ Edit: Next.js retains the response payload from any requests sent by server components across pages so route handlers are not required.

## Consequences

- The frontend will be read-only. Any create, update or delete operations will need to be made either through SQL queries or through a separate, not-yet-existent interface
- Filtering and pagination according to user input will need to be performed within the Next.js frontend as the backend will not be hosted.
- The backend server will need to be running to update the data available to the frontend in the static export.
