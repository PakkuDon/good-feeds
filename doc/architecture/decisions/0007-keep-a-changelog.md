# 7. Keep a changelog

Date: 2024-01-25

## Status

Accepted

## Context

I would like to be able to describe what recent changes have been made without needing to trawl through git logs.

Some changes also cannot be tracked through git logs. For instance, a consequence of [ADR #6. Generalise restaurant options table](./0006-generalise-restaurant-options-table.md) is that new filter types or options are introduced as records to the `options` table rather than as a new table.

## Decision

This project will have a changelog to record changes to user-facing functionality. We will adopt the format described in [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

We will also adopt [Semantic Versioning](https://semver.org/spec/v2.0.0.html) to identify new releases.

## Consequences

- Users will be able to see changes made to this project without needing to browse through git
