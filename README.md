# Reservations List
This project provides a user interface for viewing, filtering, sorting, and searching reservations. Built with React, Redux, and MUI Joy, the Reservation List component offers a clean and functional UI for managing reservations.


## Getting Started
To get the project up and running, follow these steps:

```bash

# Install dependencies
npm install

# Run the application
npm start

#If you encounter a problem with npm start
npx json-server --watch mockData.json --port 3002
#then
npm run dev

Understanding Requirements
The user should be able to:
  View a list of reservations.
  Filter reservations by status, date, shift, and area.
  Sort reservations by guest name and guest number.
  Search for reservations by the customer's first and last name.

Setting Up the Project:
  Project Structure: Created folders for components, slices, and types.
  Dependencies: Installed necessary dependencies, including:
  @mui/joy for UI components.
  @reduxjs/toolkit for state management.

State Management Setup:
  API Slice: Created a reservationApi slice using createApi from @reduxjs/toolkit/query/react to fetch reservation data from the backend.
  UI State Management: Developed a reservationsSlice to manage filters and sorting states within the Redux store.

Reservation List Component:
  Component Creation: Developed ReservationList.tsx to display reservation data.
  Filtering: Incorporated filters for status, date, shift, and area using a custom FilterSelect component.
  Sorting: Added sorting options for guest name and quantity.
  Search: Implemented search functionality to filter reservations by the customer's first and last name.
  UI Components: Used MUI components like Box, Typography, Grid, and Input to build the layout.
  Loading & Error Handling: Added loading and error states to manage API call results.

Filtering and Sorting Logic:
  Filtering: Designed logic to filter reservations based on selected criteria (status, date, shift, area).
  Sorting: Implemented sorting based on the selected option (name, quantity, or "all").

Styling and UI Consistency:
  Styling: Used MUI's sx prop and CSS classes for consistent styling across the component.
  Responsive Design: Ensured that the UI is responsive and easy to navigate by organizing filters, search input, and sorting options effectively.

Testing and Validation:
  Functionality Testing: Verified that filtering, sorting, and search functionalities work as expected.
  Edge Cases: Tested the component with various edge cases (e.g., no filters applied, no search results).
  Error Handling: Ensured the component gracefully handles loading and error states.

Assumptions and Decisions:
  Date Format Handling: Assumed businessDate format is always dd.mm.yyyy based on provided examples. Converted it to yyyy-mm-dd for date comparisons.
  Sort Option 'All': Assumed that the "all" sort option resets sorting to the natural order (no specific sorting applied).
  UI Design: Assumed the design should be minimal and functional, prioritizing ease of use and clarity. Chose MUI's Joy UI for consistent, modern UI components.
  Filter Persistence: Assumed that filters do not need to persist across sessions or components (no local storage or URL query parameters).
  Empty States: Assumed that if no reservations match the filters, the component renders an empty state without additional messaging.
  Backend API Assumptions: Assumed the backend API returns reservations in the expected format with all necessary fields. Used http://localhost:3002/ as the base URL, assuming this points to a locally running server.
  Error Handling: Assumed error messages should be simple and user-friendly without detailed reporting.
  Responsiveness: Ensured the component is responsive, assuming users may access the reservation list on various devices.# Reservations-Task
