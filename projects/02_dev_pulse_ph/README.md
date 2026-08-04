Project name : DevPulse - Internal Tech Issue and Feature Tracker.(A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.)

## Live URL - > 
dev-pulse-api-mauve.vercel.app


# Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization (Maintainer & Contributor)
- Create Issues
- Get All Issues
- Get Single Issue
- Update Issues
- Delete Issues (Maintainer only)
- PostgreSQL Database
- Modular Architecture
- Global Error Handling
- Standardized API Response
- Environment Variable Configuration

# Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcryptjs
- pg
- dotenv
- cors


# API Endpoints
## Authentication

- POST -> /api/auth/signup -> Register User 
- POST -> /api/auth/login -> Login User

## Issues

- POST -> /api/issues -> Create Issue
- GET -> /api/issues -> Get All Issues
- GET -> /api/issues/:id -> Get Single Issue
- PATCH -> /api/issues/:id -> Update Issue
- DELETE -> /api/issues/:id -> Delete Issue


# Database Schema

## users

Column      Type 

- id          SERIAL PRIMARY KEY 
- name        TEXT 
- email       TEXT UNIQUE 
- password    TEXT 
- role        TEXT 
- created_at  TIMESTAMP 
- 


## issues

Column          Type 

- id              SERIAL PRIMARY KEY 
- title           TEXT 
- description     TEXT 
- type            TEXT
- status          TEXT 
- reporter_id     INTEGER ( users.id) 
- created_at      TIMESTAMP 
- updated_at      TIMESTAMP 
