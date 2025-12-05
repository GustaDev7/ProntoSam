import React from 'react';
import { Facebook, Instagram, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO, BUSINESS_HOURS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none">ProntoSam</span>
                <span className="text-xs uppercase tracking-wider text-gray-300">Clínica Médica</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Atendimento humanizado e de qualidade para toda a comunidade de Samambaia e região. 
              Sua saúde é nossa prioridade.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white hover:pl-1 transition-all">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white hover:pl-1 transition-all">Exames e Serviços</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white hover:pl-1 transition-all">Sobre Nós</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white hover:pl-1 transition-all">Agendar Consulta</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white hover:pl-1 transition-all">Depoimentos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-300 text-sm">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-300 text-sm">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-accent">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              {BUSINESS_HOURS.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm text-gray-300 pb-1">
                  <span>{item.day}</span>
                  <span className={item.hours === 'Fechado' ? 'text-red-300' : ''}>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ProntoSam Clínica Médica. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};