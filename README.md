# User Dashboard

A modern Next.js application for managing users and their data, featuring detailed views, sorting, searching, and persistent filtering.

## Prerequisites

- Node.js 18.0 or later
- npm (Node Package Manager)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Install Dependencies

First, navigate to the project directory and install the necessary packages:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and ensure it contains the API URL:

```env
API_URL=https://jsonplaceholder.typicode.com
```

### 3. Run the Development Server

Start the development server on [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

The app will automatically reload if you change any of the source files.

## Running Tests

The project includes both component unit tests and end-to-end (E2E) tests.

### Component and Unit Testing

To run the unit tests using Jest:

```bash
npm run test
```

For development, you can run tests in watch mode:

```bash
npm run test:watch
```

### End-to-End (E2E) Testing

End-to-end tests are handled by Playwright. These tests verify the complete user flow from the list view to the detail view.

**Note:** The development server must be running on port 3000 before executing E2E tests.

```bash
# In one terminal
npm run dev

# In another terminal
npm run test:e2e
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **State Management:** React Query (TanStack Query)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Testing:** Playwright & Jest
