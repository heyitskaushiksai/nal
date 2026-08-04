# NAL

### Cloud-Native Productivity Tracking Platform

> A full-stack productivity tracking platform designed to help users organize activities, track focus sessions, and monitor daily productivity. Built with **React**, **FastAPI**, **SQLite**, **Docker**, and **AWS EC2**.

---

## Overview

NAL is a cloud-native productivity tracking application that enables users to create activities, record focus sessions, and monitor their daily productivity through a simple and intuitive interface.

The project was built to gain practical experience in modern software engineering and DevOps practices. It demonstrates the complete software development lifecycle—from frontend and backend development to containerization with Docker and deployment on AWS EC2.

---

## Features

- Create and manage daily activities
- Track focus sessions with a built-in timer
- Persistent data storage using SQLite
- RESTful API communication between frontend and backend
- Docker containerization
- Docker Compose orchestration
- Cloud deployment on AWS EC2
- Responsive React user interface

---

## Architecture

                User
                  │
                  ▼
        React Frontend (Vite)
                  │
          REST API (HTTP)
                  │
        FastAPI Backend
                  │
            SQLite Database
                  │
      Docker Containers
                  │
       Docker Compose
                  │
           AWS EC2 Instance


---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript

### Backend
- FastAPI
- Python

### Database
- SQLite

### DevOps & Cloud
- Docker
- Docker Compose
- AWS EC2
- Linux (Ubuntu)

### Version Control
- Git
- GitHub

---

## Project Structure

NAL
│
├── backend/
│   ├── api/
│   ├── database/
│   ├── models/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
├── README.md
└── .gitignore

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/heyitskaushiksai/nal.git
```

### Navigate into the project

```bash
cd nal
```

### Start the application

```bash
docker compose up --build
```

The application will be available at:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

---

## Deployment

NAL is deployed on an **AWS EC2 Ubuntu instance** using **Docker Compose**.

The deployment includes:

- Docker containerization
- Multi-container orchestration
- Linux server configuration
- Security Group configuration
- REST API communication
- CORS configuration
- GitHub-based deployment workflow

---

### Production Deployment

For production deployments, configure the frontend API endpoint to point to the deployed backend service (using environment variables or your production server address) before rebuilding the containers.

The current deployment is hosted on AWS EC2 using Docker Compose.

---

## Learning Objectives

This project was developed to gain practical experience with:

- Full-stack application development
- REST API design
- Database integration
- Docker containerization
- Cloud deployment
- Linux server administration
- Git & GitHub workflows
- DevOps fundamentals

---

## Roadmap

### Version 1

- Activity Management
- Focus Session Tracking
- SQLite Database
- Docker Support
- Docker Compose
- AWS EC2 Deployment

### Version 2

- GitHub Actions CI/CD
- PostgreSQL
- Nginx Reverse Proxy
- Environment Variables
- HTTPS
- Custom Domain

### Version 3

- User Authentication
- Analytics Dashboard
- Email Reports
- Notifications
- Mobile Companion App

---

## Contributing

Contributions, suggestions, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## Author

**Pillalamarri Sai Kaushik**

GitHub:
https://github.com/heyitskaushiksai

LinkedIn:
https://linkedin.com/in/sai-kaushik-849449393

---

## Support

If you found this project helpful, consider giving it a ⭐ on GitHub.