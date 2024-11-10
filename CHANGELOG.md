# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add search functionality to allow users to filter restaurants by name, address or description

## [1.10.4] - 2024-09-28

### Fixed

- Add timezones to restaurant created / updated at timestamps so they are parsed to correct date

## [1.10.3] - 2024-09-14

### Fixed

- Fix bug where "No results found" is briefly displayed when switching to list view

## [1.10.2] - 2024-09-12

### Added

- Display message when no results matching set filters are found

### Updated

- Highlight restaurant status if restaurant is closed

### Removed

- Restaurant status if restaurant is still operational

## [1.10.1] - 2024-07-07

### Updated

- Set minimum zoom level on map

## [1.10.0] - 2024-03-11

### Added

- Display restaurant status in UI (either Operational, Temporarily Closed, Permanently Closed)
- Add ability to filter restaurants by status

### Updated

- Add more padding around items in list view

## [1.9.1] - 2024-03-03

### Added

- Add Google Maps links to restaurants

## [1.9.0] - 2024-02-07

### Added

- Display clusters when there are multiple markers in close proximity to each other

## [1.8.3] - 2024-01-31

### Updated

- Expand sidebar so that map / list view buttons are on same row
- Use different colours to differentiate between selected view
- Add button to show or hide individual filter groups

## [1.8.2] - 2024-01-25

### Updated

- Update meta description for page

## [1.8.1] - 2024-01-25

### Added

- Add changelog

### Fixed

- Fix issue where map cannot be viewed on small screens

## [1.8.0] - 2024-01-23

### Added

- Add ability to filter restaurants by whether they take bookings or not (accepts walk-ins, accepts bookings, bookings required)
- Add favicon

### Updated

- Use single-column layout on /about
- Collapse map screen to single layout on smaller screens (less than 640px wide)

## [1.7.0] - 2024-01-21

### Added

- Ability to filter restaurants by available dining options (breakfast, brunch, lunch, dinner, dessert)

## [1.6.0] - 2024-01-18

### Added

- Add ability to filter restaurants by whether they're visited or unvisited
- Add option to toggle filter list

## [1.5.0] - 2024-01-16

### Added

- Add ability to filter restaurants by service options (dine-in, takeaway, delivery, outdoor seating)

## [1.4.0] - 2024-01-13

### Added

- Add ability to sort results in list view by name, date added or date updated

## [1.3.0] - 2024-01-13

### Added

- Display result count to sidebar
- Add /about page

## [1.2.0] - 2024-01-10

### Added

- Add list view for search results

## [1.1.1] - 2024-01-09

### Updated

- Minor styling adjustments

## [1.1.0] - 2024-01-09

### Added

- Add last updated timestamp to restaurants

## [1.0.0] - 2024-01-07

First public release

### Added

- Map view to display restaurant locations
- Markers for each restaurant location display restaurant name, address, description, dietary options and associated websites
- Ability to filter restaurants by dietary options (vegetarian, vegan, gluten-free, dairy-free, halal)
