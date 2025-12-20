// List taken from api/db/migrations/11_add_restaurant_status.up.sql
// We could retrieve this from the backend but these values are not expected
// to change often so it's hard-coded here for convenience
export const restaurantStatuses = [
  "Operational",
  "Temporarily closed",
  "Permanently closed",
];
