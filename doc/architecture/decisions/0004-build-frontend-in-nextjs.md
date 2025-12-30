# 4. Build frontend in Next.js

Date: 2023-05-29

## Status

Accepted

## Context

This project has an API which can display information about places and users. We need a frontend to display this data.

At the time of writing [React.js' documentation for starting a new project](https://react.dev/learn/start-a-new-react-project) recommends using a React-powered framework rather than using React on its own.

This project is also intended to be a [breakable toy](https://www.oreilly.com/library/view/apprenticeship-patterns/9780596806842/ch05.html#breakable_toys) where I can experiment with other technologies or practices.

**December 30 2025 update:** This project initially started off as an app where users could share and comment on pictures of bread. In [May 2023](https://github.com/PakkuDon/good-feeds/commit/6284f6b45796e536796ea2707b3af5fd90003a5d) this project was repurposed to be an app where users could search through restaurants that I've recommended. The context above has been left as is for posterity

## Decision

The frontend for this project will be built using [Next.js](https://nextjs.org/).

## Consequences

- The frontend will have support for server-side rendering and code splitting. These two features will improve performance and reduce the amount of processing required by the client.
