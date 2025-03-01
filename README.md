# Food Logger

A comprehensive food logging application that helps you track your nutrition and dietary habits.

## Features

- Track food entries with detailed nutritional information
- Search for foods using the USDA FoodData Central API
- View nutrition summaries and macro distributions
- Filter entries by date range
- Responsive design for desktop and mobile

## Technologies Used

### Frontend
- React
- TypeScript
- CSS with custom variables for theming

### Backend
- Node.js
- Express
- SQLite with better-sqlite3
- TypeScript

## Deployment

The frontend of this application is deployed on GitHub Pages: [https://YOUR_GITHUB_USERNAME.github.io/food-logger](https://YOUR_GITHUB_USERNAME.github.io/food-logger)

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/YOUR_GITHUB_USERNAME/food-logger.git
   cd food-logger
   ```

2. Install dependencies for both backend and frontend:
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Create a `.env` file in the client directory with your USDA API key:
   ```
   REACT_APP_USDA_API_KEY=your_api_key_here
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development servers:
   ```
   npm run dev
   ```

## Deploying to GitHub Pages

1. Update the `homepage` field in `client/package.json` with your GitHub username
2. Run the deploy script:
   ```
   cd client
   npm run deploy
   ```

## Backend Deployment

The backend needs to be deployed separately to a service like Heroku, Render, or Railway. After deploying the backend, update the `REACT_APP_API_URL` in `client/.env.production` with your backend URL.

## License

MIT

## Acknowledgements

- [USDA FoodData Central](https://fdc.nal.usda.gov/) for nutrition data
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3) 