# 4. Build frontend in Next.js

Date: 2023-05-29

## Status

Accepted

## Context

This project has an API which can display information about places and users. We need a frontend to display this data.

At the time of writing [React.js' documentation for starting a new project](https://react.dev/learn/start-a-new-react-project) recommends using a React-powered framework rather than using React on its own.

This project is also intended to be a [breakable toy](https://www.oreilly.com/library/view/apprenticeship-patterns/9780596806842/ch05.html#breakable_toys) where I can experiment with other technologies or practices.

## Decision

The frontend for this project will be built using [Next.js](https://nextjs.org/).

## Consequences

- The frontend will have support for server-side rendering and code splitting. These two features will improve performance and reduce the amount of processing required by the client.
