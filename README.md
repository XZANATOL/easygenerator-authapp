# EasyGenerator Auth App

A full-stack authentication application with a NestJS backend and Next.js frontend, containerized with Docker.

## Project Structure

```
.
├── backend/          # NestJS backend application
├── frontend/         # Next.js frontend application
└── docker-compose.yml # Root Docker Compose file for orchestrating both services
```

## Docker Setup

This project uses Docker Compose to run both the backend and frontend applications together in a unified environment.

### Docker Compose Files

#### Root `docker-compose.yml`
The root-level `docker-compose.yml` file orchestrates both services:

- **Backend Service** (`easygenerator-auth-backend`)
  - Built from `./backend` directory
  - Exposed on port `3001`
  - Uses environment variables from `./backend/.env`
  - Runs on the `easygenerator-network` Docker network

- **Frontend Service** (`easygenerator-auth-frontend`)
  - Built from `./frontend` directory
  - Exposed on port `3000`
  - Configured with environment variables for NextAuth
  - Depends on the backend service (starts after backend)
  - Communicates with backend via `http://backend:3001` (internal Docker network)

#### Individual Service Compose Files

Each service also has its own `docker-compose.yml` file in its respective directory:
- `backend/docker-compose.yml` - For running the backend service independently
- `frontend/docker-compose.yml` - For running the frontend service independently

### Network Configuration

Both services are connected to a shared Docker network (`easygenerator-network`) which allows them to communicate with each other using service names as hostnames. The frontend can reach the backend at `http://backend:3001` within the Docker network.