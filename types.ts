
export enum UserRole {
  CITIZEN = 'CITIZEN',
  DEPT_ADMIN = 'DEPT_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum Department {
  WASTE = 'Waste Management',
  TRANSPORT = 'Transport',
  ELECTRICITY = 'Electricity',
  WATER = 'Water Supply',
  MUNICIPAL = 'Municipal Affairs',
  HEALTH = 'Public Health',
  FINANCE = 'Revenue & Finance',
  EDUCATION = 'Education & Skills'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: Department;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
}

export interface GovPortal {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  url: string;
  isPopular?: boolean;
}

export interface Complaint {
  id: string;
  userId: string;
  category: Department;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  photoUrl?: string;
  createdAt: string;
  resolutionNotes?: string;
}

export interface EmergencyAlert {
  id: string;
  type: 'WEATHER' | 'TRAFFIC' | 'HEALTH' | 'DISASTER';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  timestamp: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: Department;
  description: string;
  postedAt: string;
  deadline: string;
}

export interface CityService {
  id: string;
  name: string;
  type: 'RESTAURANT' | 'ATM' | 'PETROL' | 'EV_CHARGER' | 'HOSPITAL' | 'SCHOOL' | 'TOURISM' | 'PHARMACY' | 'PARK';
  lat: number;
  lng: number;
  rating: number;
  address?: string;
}

export interface GroundingLink {
  uri: string;
  title: string;
}

export interface AIResponse {
  text: string;
  links: GroundingLink[];
}
