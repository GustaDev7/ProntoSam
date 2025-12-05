import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group h-full flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-secondary mb-3">{service.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
      <div className="w-8 h-1 bg-accent rounded-full group-hover:w-16 transition-all duration-300"></div>
    </div>
  );
};