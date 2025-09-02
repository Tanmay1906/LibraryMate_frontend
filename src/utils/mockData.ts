/**
 * Mock data for development and testing purposes
 * This will be replaced with actual API calls in production
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  subscriptionPlan: 'monthly' | 'quarterly' | 'yearly';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  joinDate: string;
  dueDate: string;
  libraryId: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverUrl: string;
  isWishlisted: boolean;
  isCompleted: boolean;
  readingProgress: number;
  fileUrl: string;
}

export interface Library {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  totalStudents: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  plan: string;
  method: 'credit_card' | 'bank_transfer' | 'cash';
}

/**
 * Mock students data
 */
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@email.com',
    phone: '+1234567890',
    registrationNumber: 'REG-2024-001',
    subscriptionPlan: 'monthly',
    paymentStatus: 'paid',
    joinDate: '2024-01-15',
    dueDate: '2024-02-15',
    libraryId: 'lib-001'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@email.com',
    phone: '+1234567891',
    registrationNumber: 'REG-2024-002',
    subscriptionPlan: 'quarterly',
    paymentStatus: 'pending',
    joinDate: '2024-01-20',
    dueDate: '2024-04-20',
    libraryId: 'lib-001'
  },
  {
    id: '3',
    name: 'Carol Brown',
    email: 'carol@email.com',
    phone: '+1234567892',
    registrationNumber: 'REG-2024-003',
    subscriptionPlan: 'yearly',
    paymentStatus: 'paid',
    joinDate: '2024-01-10',
    dueDate: '2025-01-10',
    libraryId: 'lib-001'
  }
];

/**
 * Mock books data
 */
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    description: 'A classic American novel set in the Jazz Age.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    isWishlisted: false,
    isCompleted: true,
    readingProgress: 100,
    fileUrl: '/books/great-gatsby.pdf'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Classic Literature',
    description: 'A novel about racial injustice and childhood innocence.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    isWishlisted: true,
    isCompleted: false,
    readingProgress: 45,
    fileUrl: '/books/mockingbird.pdf'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian Fiction',
    description: 'A dystopian social science fiction novel.',
    coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300',
    isWishlisted: false,
    isCompleted: false,
    readingProgress: 0,
    fileUrl: '/books/1984.pdf'
  }
];

/**
 * Mock library data
 */
export const mockLibrary: Library = {
  id: 'lib-001',
  name: 'Central City Library',
  description: 'A modern library serving the community with extensive digital and physical resources.',
  address: '123 Main Street, Central City, CC 12345',
  phone: '+1-555-LIBRARY',
  email: 'info@centralcitylibrary.com',
  totalStudents: 150,
  activeSubscriptions: 135,
  monthlyRevenue: 12500
};

/**
 * Mock payment history data
 */
export const mockPaymentHistory: PaymentRecord[] = [
  {
    id: '1',
    amount: 29.99,
    date: '2024-01-15',
    status: 'completed',
    plan: 'Monthly Subscription',
    method: 'credit_card'
  },
  {
    id: '2',
    amount: 29.99,
    date: '2023-12-15',
    status: 'completed',
    plan: 'Monthly Subscription',
    method: 'credit_card'
  },
  {
    id: '3',
    amount: 29.99,
    date: '2023-11-15',
    status: 'completed',
    plan: 'Monthly Subscription',
    method: 'bank_transfer'
  }
];

/**
 * Subscription plans configuration
 */
export const subscriptionPlans = {
  monthly: { price: 29.99, duration: '1 month', features: ['Access to all books', 'Mobile app', 'Email support'] },
  quarterly: { price: 79.99, duration: '3 months', features: ['Access to all books', 'Mobile app', 'Priority support', '10% discount'] },
  yearly: { price: 299.99, duration: '1 year', features: ['Access to all books', 'Mobile app', 'Priority support', '20% discount', 'Offline reading'] }
};