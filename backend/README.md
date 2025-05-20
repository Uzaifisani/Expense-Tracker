# Expense Tracker Web Application

## Project Overview
The Expense Tracker is a full-featured web application built with Spring Boot that allows users to securely manage their personal expenses. It supports user authentication, expense CRUD operations, and advanced filtering by date and category. The backend is designed with RESTful principles and uses JWT for stateless authentication.

## Features
- User registration and login with JWT authentication
- Secure password storage (BCrypt)
- Add, update, delete, and view expenses
- Filter expenses by date, date range, and category
- Multi-user support (each user sees only their own expenses)
- MySQL database integration
- Global error handling

## Tech Stack
- **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)
- **Build Tool:** Maven

## Getting Started

### Prerequisites
- Java 17 or later
- Maven
- MySQL

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ExpenseTracker
   ```
2. **Configure the database:**
   - Update `src/main/resources/application.yml` with your MySQL credentials and database settings.
3. **Build and run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```
4. **The API will be available at:**
   - `http://localhost:8080/api/`

## API Endpoints

### Authentication

#### Register a New User
- **POST** `/api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Response:** JWT token, username, email

#### Login
- **POST** `/api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:** JWT token, username, email

---

### Expense Management (All require `Authorization: Bearer <token>` header)

#### Create a New Expense
- **POST** `/api/expenses`
- **Request Body:**
  ```json
  {
    "amount": 25.50,
    "category": "Food",
    "date": "2024-03-20",
    "description": "Lunch at restaurant"
  }
  ```
- **Response:** Created expense object

#### Get All Expenses
- **GET** `/api/expenses`
- **Response:** List of expenses

#### Update an Expense
- **PUT** `/api/expenses/{id}`
- **Request Body:**
  ```json
  {
    "amount": 30.00,
    "category": "Food",
    "date": "2024-03-20",
    "description": "Updated lunch at restaurant"
  }
  ```
- **Response:** Updated expense object

#### Delete an Expense
- **DELETE** `/api/expenses/{id}`
- **Response:** 200 OK

#### Get Expenses by Date Range
- **GET** `/api/expenses/byDateBetween?startDate=2024-03-20&endDate=2024-03-21`
- **Response:** List of expenses

#### Get Expenses by Date
- **GET** `/api/expenses/byDate?date=2024-03-20`
- **Response:** List of expenses

#### Get Expenses by Category and Date Range
- **GET** `/api/expenses/byCategoryAndDateRange?Category=Travel&startdate=2024-03-20&endDate=2024-03-21`
- **Response:** List of expenses

#### Get Expenses by Category
- **GET** `/api/expenses/byCategory?Category=Food&date=2024-03-20`
- **Response:** List of expenses

---

## Error Handling
- 400 Bad Request: Validation errors
- 401 Unauthorized: Invalid credentials or missing/invalid token
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server errors
---
 Developed By
**UZAIF RAFIQUE ISANI**