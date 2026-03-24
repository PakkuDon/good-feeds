# 8. Store guides in JSON file

Date: 2026-03-24

## Status

Accepted

## Context

In [ADR 2. Use a relational database](./0002-use-a-relational-database.md) I made a decision to use a database to store restaurant details and available options to filter by. Part of the reason behind this decision was that I wanted a full stack web application that I could use to practice Golang and SQL.

Since then I have moved to a team that focuses mostly on front end work. I am considering removing the API layer to simplify this project and reduce the maintenance overhead. Before committing to that move I would like to try using JSON files for a smaller subset of Good Feeds' data. I am also implementing a new "guide" feature which may be a candidate for this move.

## Decision
- Guide data will be stored as a JSON file in the front end codebase

## Consequences
- We will not need to update the API or database to support guides at this time
- Guide type data only needs to be defined in front end, rather than being duplicated at the API level
- Guide data will be stored in repository so other contributors can potentially update this file
- Created and updated timestamps for guides will need to be updated manually
