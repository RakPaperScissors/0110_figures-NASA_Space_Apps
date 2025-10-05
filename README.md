# NASA Space Apps Challenge by 0110_figures

This repository holds everything about the NASA Space Apps Hackathon challenge.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/your-username/your-repo.git
cd 0110_figures-NASA_Space_Apps
```

#### 2. Install backend dependencies

```sh
cd backend
npm install
```

#### 3. Install frontend dependencies

```sh
cd ../frontend
npm install
```

### Environment Variables

- Copy `.env.example` to `.env` in both `backend/` and `frontend/` folders and fill in the required values.

### Running the Applications

#### Start the backend (NestJS)

```sh
cd backend
npm run start:dev
```

#### Start the frontend (React + Vite)

```sh
cd ../frontend
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:3000](http://localhost:3000) by default.