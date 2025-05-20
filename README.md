# Expense Tracker Web Application

A full-stack web application for tracking personal expenses, built with React, TypeScript, and Spring Boot.

## Features

- 🔐 **User Authentication**
  - Secure login and registration
  - JWT-based authentication
  - Protected routes

- 💰 **Expense Management**
  - Add new expenses
  - Edit existing expenses
  - Delete expenses
  - View expense history

- 📊 **Dashboard**
  - Monthly expense summary
  - Category-wise breakdown
  - Recent expenses list
  - Visual expense analytics

- 🔍 **Advanced Filtering**
  - Filter by date
  - Filter by category
  - Filter by date range
  - Category-wise expense analysis

## Screenshots
- Register
  
![WhatsApp Image 2025-05-20 at 17 04 43_37c66a1f](https://github.com/user-attachments/assets/7d737949-d695-41db-b28a-b938d46fe86e)

- Login

![WhatsApp Image 2025-05-20 at 17 04 27_3be0ab55](https://github.com/user-attachments/assets/414f5746-d97d-485f-8e2b-f0687d6f37f4)

- Dashboard

![WhatsApp Image 2025-05-20 at 17 01 00_d4291329](https://github.com/user-attachments/assets/ea4684d3-f055-440b-8210-81263feed1f9)

- Expenses

![WhatsApp Image 2025-05-20 at 17 01 27_a56d2f3b](https://github.com/user-attachments/assets/573b389d-6c90-4d65-9a50-733f027b8c06)

- Expenses by Date Range

![WhatsApp Image 2025-05-20 at 17 02 30_09912046](https://github.com/user-attachments/assets/c8ee2150-51f2-4801-bc8b-4271af332090)

- Expenses By Category

![WhatsApp Image 2025-05-20 at 17 02 48_442d7d98](https://github.com/user-attachments/assets/898846f1-1df4-44c7-8793-6daa2ebb2768)

- Expenses By Category and Date Range

![WhatsApp Image 2025-05-20 at 17 03 37_b496a9a4](https://github.com/user-attachments/assets/ac727414-b64f-4690-bdff-2c55ef47bd65)

- Add New Expense

![WhatsApp Image 2025-05-20 at 17 03 53_5f1f8be5](https://github.com/user-attachments/assets/661ae4be-8022-40f7-a41a-b305819fe608)

- Edit Expense

![WhatsApp Image 2025-05-20 at 17 04 10_444968f2](https://github.com/user-attachments/assets/3fc21153-02f8-4426-9ca9-8dca999346cd)


## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for styling
- React Router for navigation
- Axios for API calls
- JWT for authentication

### Backend
- Spring Boot
- Spring Security
- JPA/Hibernate
- MySQL/PostgreSQL
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 17 or higher
- Maven
- MySQL/PostgreSQL

## Getting Started

### Backend Setup

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the backend directory
```bash
cd backend
```

3. Configure the database
   - Update `application.properties` with your database credentials
   - Create a database named `expense_tracker`

4. Build and run the Spring Boot application
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The frontend application will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/{id}` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Filtering
- `GET /api/expenses/byDate` - Get expenses by date
- `GET /api/expenses/byDateBetween` - Get expenses by date range
- `GET /api/expenses/byCategory` - Get expenses by category
- `GET /api/expenses/byCategoryAndDateRange` - Get expenses by category and date range

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── expenses/
│   │   ├── dashboard/
│   │   └── layout/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── types/
├── public/
└── package.json
```

## Acknowledgments

- Chakra UI for the component library
- Spring Boot for the backend framework
- React for the frontend framework 
## Error Handling
- 400 Bad Request: Validation errors
- 401 Unauthorized: Invalid credentials or missing/invalid token
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server errors
---
 Developed By
**UZAIF RAFIQUE ISANI**
