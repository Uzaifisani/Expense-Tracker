# Expense Tracker

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chakra UI for the component library
- Spring Boot for the backend framework
- React for the frontend framework 