# 2. Use a relational database

Date: 2022-02-26

## Status

Accepted

## Context

This project is a web application where users can share their bread creations, as well as view and comment on other users' creations.

We need some way of persisting details about our users, their posts and their ratings. It is also likely that we may need to retrieve data that is related to other data, such as a user's past posts or all reviews for a given post.

## Decision

We will record our application's data in a relational database.

This project will use [MySQL](https://www.mysql.com/) for no particular reason other than the fact that it happened to be the only database engine that I had installed on my machine when I started this project.

## Consequences

- We will need to define a schema for our data.
- We will need to provide a mechanism to reproduce the database schema from scratch in the event that this project is worked on or deployed to another machine.
