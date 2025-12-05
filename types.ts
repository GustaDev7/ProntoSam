import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  rating: number; // 1 to 5
}

export interface NavItem {
  label: string;
  href: string; // ID for anchor scrolling or path
}

export interface ContactInfo {
  phone: string;
  address: string;
  email: string;
  instagram: string;
  whatsapp: string;
}