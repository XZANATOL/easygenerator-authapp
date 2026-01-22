# EasyGenerator Auth App

A full-stack authentication application with a NestJS backend and Next.js frontend, containerized with Docker.

## Project Structure

```
.
├── backend/          # NestJS backend application
├── frontend/         # Next.js frontend application
└── docker-compose.yml # Root Docker Compose file for orchestrating both services
```

## Accessibility

* [Frontend](https://eg-f.serv.xzant.dpdns.org/)
* [Backend](https://eg-b.serv.xzant.dpdns.org/)

## Docker Setup
s
This project uses Docker Compose to run both the backend and frontend applications together in a unified environment.

### Docker Compose Files

#### Root `docker-compose.yml`
The root-level `docker-compose.yml` file orchestrates both services:

- **Backend Service** (`easygenerator-auth-backend`)
  - Built from `./backend` directory
  - Uses environment variables from `./backend/.env`
  - Runs on the `easygenerator-network` Docker network

- **Frontend Service** (`easygenerator-auth-frontend`)
  - Built from `./frontend` directory
  - Configured with environment variables for NextAuth
  - Depends on the backend service (starts after backend)
  - Communicates with backend via `http://backend:3001` (internal Docker network)

#### Individual Service Compose Files

Each service also has its own `docker-compose.yml` file in its respective directory:
- `backend/docker-compose.yml` - For running the backend service independently
- `frontend/docker-compose.yml` - For running the frontend service independently