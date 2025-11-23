# Livestock Management & Simulation System

A modern web application for managing farms, slaughterhouses, and simulating livestock transportation routes with interactive 3D mapping visualization.

## Features

- **Farm Management**: Add, edit, and track livestock farms with detailed information
- **Slaughterhouse Management**: Manage slaughterhouse facilities and their capacities
- **Interactive Map**: Visualize farms and slaughterhouses using Mapbox GL with 3D models
- **Route Simulation**: Simulate transportation routes and logistics between farms and slaughterhouses
- **Day-by-Day Simulation**: Track simulation progress across multiple days with real-time updates
- **Data Import**: Import farm and slaughterhouse data from CSV files
- **Responsive UI**: Built with Chakra UI for a modern, accessible interface

## Tech Stack

- **Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **UI Library**: Chakra UI 2.10
- **Mapping**: Mapbox GL 3.16
- **3D Graphics**: Three.js 0.181
- **Routing**: React Router DOM 7.9
- **Charts**: Recharts 3.4
- **Styling**: Emotion (CSS-in-JS)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Mapbox API token (for map functionality)
- Backend API running on `http://127.0.0.1:8000` (for simulation features)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hack-eps-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed for Mapbox token)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (compiles TypeScript and bundles)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Project Structure

```
src/
├── components/       # Reusable UI components (cards, tables, modals, etc.)
├── pages/           # Page components for routing
├── services/        # API service layer (farm, slaughterhouse, simulation)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (map helpers, route drawing, etc.)
├── contexts/        # React context providers (MapContext)
└── assets/          # Static assets
```

## Key Pages

- `/` - Home page with application overview
- `/map` - Interactive map view of farms and slaughterhouses
- `/farms` - Farm management interface
- `/slaughterhouses` - Slaughterhouse management interface
- `/start-simulation` - Configure and start simulation
- `/simulation` - View simulation results and analytics
- `/simulation-map` - Visualize simulation routes on map

## API Integration

The application connects to a backend API at `http://127.0.0.1:8000/api/` with the following endpoints:

- **Farms**: `/farms` (GET, POST, PUT, DELETE)
- **Slaughterhouses**: `/slaughterhouses` (GET, POST, PUT, DELETE)
- **Simulation**: `/simulation/get-routes`, `/simulation/simulate/{day}`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## License

This project was created for HackEPS.
