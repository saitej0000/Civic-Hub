
import React from 'react';
import { 
  ShieldAlert, 
  Bus, 
  Trash2, 
  Zap, 
  Droplets, 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  MapPin, 
  Briefcase,
  CreditCard,
  FileText,
  Heart,
  Car,
  Lightbulb,
  Book,
  ShieldCheck,
  Wheat,
  Scale,
  CloudSun,
  Laptop,
  Users,
  Camera,
  History,
  LifeBuoy
} from 'lucide-react';
import { Department, EmergencyAlert, Complaint, UserRole, JobPosting, GovPortal } from './types';

export const DEPARTMENTS_METADATA = [
  { id: Department.WASTE, icon: <Trash2 className="w-5 h-5" />, color: 'bg-green-100 text-green-700' },
  { id: Department.TRANSPORT, icon: <Bus className="w-5 h-5" />, color: 'bg-blue-100 text-blue-700' },
  { id: Department.ELECTRICITY, icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-700' },
  { id: Department.WATER, icon: <Droplets className="w-5 h-5" />, color: 'bg-cyan-100 text-cyan-700' },
  { id: Department.MUNICIPAL, icon: <Building2 className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700' },
  { id: Department.HEALTH, icon: <Stethoscope className="w-5 h-5" />, color: 'bg-red-100 text-red-700' },
];

export const GOV_PORTALS: GovPortal[] = [
  // --- MOST POPULAR / CRITICAL ---
  { id: 'meeseva', name: 'MeeSeva Portal', category: 'General', description: 'Universal gateway for all Telangana citizen services and certificate applications.', icon: 'ShieldCheck', url: 'https://ts.meeseva.telangana.gov.in', isPopular: true },
  { id: 'tsbpass', name: 'TS-bPASS', category: 'Municipal', description: 'Single window system for building permissions and layout approvals.', icon: 'Building2', url: 'https://tgbpass.telangana.gov.in', isPopular: true },
  { id: 'dharani', name: 'Dharani Portal (CCLA)', category: 'Revenue', description: 'Integrated Land Records Management System for Telangana.', icon: 'FileText', url: 'https://ccla.telangana.gov.in', isPopular: true },
  { id: 'police-1', name: 'Hyderabad Police', category: 'Emergency', description: 'Official portal for citizen safety, FIR status, and police services in Hyderabad.', icon: 'ShieldCheck', url: 'https://hyderabadpolice.gov.in', isPopular: true },
  { id: 'ghmc-1', name: 'GHMC Portal', category: 'Municipal', description: 'Greater Hyderabad Municipal Corporation - Civic works and local governance.', icon: 'Building2', url: 'https://www.ghmc.gov.in', isPopular: true },
  
  // --- TRANSPORT ---
  { id: 'vahan-rc', name: 'Vehicle Services (RC)', category: 'Transport', description: 'Vehicle registration, tax payment, and mobile number updates via Vahan.', icon: 'Car', url: 'https://vahan.parivahan.gov.in/mobileupdate/vahan/ui/statevalidation/editMobileNumber.xhtml', isPopular: true },
  { id: 'sarathi-dl', name: 'Driving License Hub', category: 'Transport', description: 'Official driving license services and renewals via Sarathi.', icon: 'Car', url: 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do', isPopular: true },
  { id: 'ts-transport', name: 'Transport Department', category: 'Transport', description: 'Telangana State Transport Department official website.', icon: 'Bus', url: 'https://transport.telangana.gov.in' },
  
  // --- HEALTH ---
  { id: 'aarogyasri', name: 'Rajiv Aarogyasri', category: 'Health', description: 'Community Health Insurance Scheme for the poor.', icon: 'Heart', url: 'https://rajivaarogyasri.telangana.gov.in', isPopular: true },
  { id: 'ehs', name: 'Employees Health Scheme', category: 'Health', description: 'Health services for government employees and pensioners.', icon: 'Stethoscope', url: 'https://ehf.telangana.gov.in' },
  { id: 'chfw', name: 'Health & Family Welfare', category: 'Health', description: 'Official portal for Commissioner of Health and Family Welfare.', icon: 'Heart', url: 'https://chfw.telangana.gov.in/home.do' },

  // --- WELFARE & PENSIONS ---
  { id: 'aasara', name: 'Aasara Pensions', category: 'Welfare', description: 'Social security pension scheme for the vulnerable sections.', icon: 'Users', url: 'https://www.aasara.telangana.gov.in', isPopular: true },
  { id: 'epass', name: 'ePass Scholarships', category: 'Welfare', description: 'Scholarship portal for students from BC, SC, ST, and Minority communities.', icon: 'GraduationCap', url: 'https://telanganaepass.cgg.gov.in', isPopular: true },
  { id: 'bc-welfare', name: 'BC Welfare (OBMMS)', category: 'Welfare', description: 'Backward Classes Welfare - Online Beneficiary Management System.', icon: 'Users', url: 'https://tgobmms.cgg.gov.in' },
  { id: 'wdcw', name: 'Women & Child Welfare', category: 'Welfare', description: 'Department of Women Development and Child Welfare.', icon: 'Heart', url: 'https://wdcw.tg.nic.in' },

  // --- AGRICULTURE ---
  { id: 'agri-dept', name: 'Agriculture Dept', category: 'Agriculture', description: 'Official portal of the Telangana Agriculture Department.', icon: 'Wheat', url: 'https://agri.telangana.gov.in', isPopular: true },
  { id: 'agri-olms', name: 'Agri Licence (OLMS)', category: 'Agriculture', description: 'Online Licence Management System for Agriculture.', icon: 'FileText', url: 'https://agriolms.telangana.gov.in/Default.aspx' },
  { id: 'rythu-bandhu', name: 'Rythu Bandhu (Agri)', category: 'Agriculture', description: 'Investment support scheme for farmers.', icon: 'Wheat', url: 'https://agri.telangana.gov.in' },

  // --- EDUCATION ---
  { id: 'tgbie', name: 'Board of Intermediate', category: 'Education', description: 'Telangana State Board of Intermediate Education.', icon: 'Book', url: 'https://tgbie.cgg.gov.in' },
  { id: 'schooledu', name: 'School Education', category: 'Education', description: 'Department of School Education Telangana.', icon: 'GraduationCap', url: 'https://schooledu.telangana.gov.in' },
  { id: 'task', name: 'TASK', category: 'Education', description: 'Telangana Academy for Skill and Knowledge.', icon: 'Laptop', url: 'https://task.telangana.gov.in/' },
  { id: 'softnet', name: 'T-SAT SoFTNET', category: 'Education', description: 'Satellite-based education and training.', icon: 'Zap', url: 'https://softnet.telangana.gov.in' },

  // --- FINANCE & TAX ---
  { id: 'tgct', name: 'Commercial Taxes', category: 'Finance', description: 'Department of Commercial Taxes, Telangana.', icon: 'CreditCard', url: 'https://www.tgct.gov.in/tgportal' },
  { id: 'treasury', name: 'Treasury & Accounts', category: 'Finance', description: 'Directorate of Treasuries and Accounts.', icon: 'CreditCard', url: 'https://treasury.telangana.gov.in' },
  { id: 'finance-dept', name: 'Finance Department', category: 'Finance', description: 'Official Finance Department portal.', icon: 'CreditCard', url: 'https://finance.telangana.gov.in' },

  // --- UTILITIES ---
  { id: 'mission-bhagiratha', name: 'Mission Bhagiratha', category: 'Utilities', description: 'Safe drinking water project for every household.', icon: 'Droplets', url: 'https://missionbhagiratha.telangana.gov.in' },
  { id: 'tggenco', name: 'TSGENCO', category: 'Utilities', description: 'Telangana State Power Generation Corporation Limited.', icon: 'Zap', url: 'https://www.tggenco.co.in' },
  { id: 'tgredco', name: 'Renewable Energy', category: 'Utilities', description: 'Telangana New & Renewable Energy Development Corp.', icon: 'Lightbulb', url: 'https://tgredco.telangana.gov.in' },

  // --- TECH & INNOVATION ---
  { id: 'thub', name: 'T-Hub', category: 'Technology', description: 'World\'s largest innovation campus based in Hyderabad.', icon: 'Laptop', url: 'https://t-hub.co' },
  { id: 'tworks', name: 'T-Works', category: 'Technology', description: 'India\'s largest prototyping center.', icon: 'Zap', url: 'https://tworks.tworks.in' },
  { id: 'wehub', name: 'WE HUB', category: 'Technology', description: 'Incubator for women entrepreneurs.', icon: 'Users', url: 'https://wehub.telangana.gov.in' },
  { id: 'tfiber', name: 'T-Fiber', category: 'Technology', description: 'Connecting every household with high-speed fiber internet.', icon: 'Zap', url: 'https://tfiber.telangana.gov.in' },

  // --- GOVERNANCE & OTHERS ---
  { id: 'cm-office', name: 'CM Office', category: 'Governance', description: 'Official portal of the Chief Minister of Telangana.', icon: 'Building2', url: 'https://cm.telangana.gov.in' },
  { id: 'ceotelangana', name: 'CEO Telangana', category: 'Governance', description: 'Chief Electoral Officer - Voter registration and elections.', icon: 'FileText', url: 'https://ceotelangana.nic.in' },
  { id: 'tourism', name: 'Telangana Tourism', category: 'Culture', description: 'Explore the heritage and tourism of Telangana.', icon: 'Camera', url: 'https://tourism.telangana.gov.in/' },
  { id: 'factcheck', name: 'FactCheck TS', category: 'Governance', description: 'Fighting misinformation and fake news.', icon: 'ShieldCheck', url: 'https://factcheck.telangana.gov.in' },
];

export const MOCK_ALERTS: EmergencyAlert[] = [
  {
    id: '1',
    type: 'WEATHER',
    severity: 'WARNING',
    message: 'Heavy rainfall expected in Hyderabad city over the next 4 hours.',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'TRAFFIC',
    severity: 'INFO',
    message: 'Tank Bund road maintenance. Expect slow-moving traffic until 9 PM.',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-1',
    userId: 'user-1',
    category: Department.WASTE,
    title: 'Garbage accumulation in Jubilee Hills',
    description: 'Community bins are overflowing for the last 48 hours.',
    location: { lat: 17.4326, lng: 78.4071, address: 'Road No. 36, Jubilee Hills' },
    status: 'PENDING',
    createdAt: new Date().toISOString()
  },
  {
    id: 'comp-2',
    userId: 'user-1',
    category: Department.ELECTRICITY,
    title: 'Frequent Power Cuts in Gachibowli',
    description: 'Unscheduled power outages happening every evening.',
    location: { lat: 17.4401, lng: 78.3489, address: 'DLF Cyber City Road' },
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Assistant Engineer (Civil)',
    department: Department.MUNICIPAL,
    description: 'Looking for licensed civil engineers for urban infrastructure development projects.',
    postedAt: new Date().toISOString(),
    deadline: '2025-06-15'
  }
];
