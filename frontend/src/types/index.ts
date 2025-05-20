// User related types
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

// Expense related types
export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface ExpenseFormData {
  amount: number;
  category: string;
  date: string;
  description: string;
  user_id: string;
}

// Filter related types
export interface ExpenseFilters {
  date?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

// Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}