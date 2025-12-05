import { 
    Microscope, 
    Stethoscope, 
    ScanLine, 
    Baby, 
    HeartPulse, 
    HardHat, 
    Activity, 
    FlaskConical, 
    UserPlus, 
    Users
  } from 'lucide-react';
  import { ContactInfo, Review, ServiceItem } from './types';
  
  export const CONTACT_INFO: ContactInfo = {
    phone: "(61) 3142-1812",
    address: "QS 107 conjunto 03 loja 03 - Samambaia, Brasília - DF, 72301-520",
    email: "contato@prontosam.com.br", 
    instagram: "https://instagram.com/clinicaprontosam",
    whatsapp: "https://wa.me/556131421812", 
  };
  
  export const BUSINESS_HOURS = [
    { day: "Segunda-feira", hours: "07:00 – 16:30" },
    { day: "Terça-feira", hours: "07:00 – 16:30" },
    { day: "Quarta-feira", hours: "07:00 – 16:30" },
    { day: "Quinta-feira", hours: "07:00 – 16:30" },
    { day: "Sexta-feira", hours: "07:00 – 16:30" },
    { day: "Sábado", hours: "07:00 – 12:00" },
    { day: "Domingo", hours: "Fechado" },
  ];
  
  export const SERVICES: ServiceItem[] = [
    {
      id: 'labs',
      title: 'Exames Laboratoriais',
      description: 'Hemogramas, colesterol, glicemia e check-ups completos com resultados rápidos e precisos.',
      icon: FlaskConical
    },
    {
      id: 'image',
      title: 'Exames de Imagem',
      description: 'Ultrassonografia de alta resolução e raio-x digital com laudos ágeis.',
      icon: ScanLine
    },
    {
      id: 'consult',
      title: 'Consultas Médicas',
      description: 'Clínico geral e especialistas focados em ouvir e resolver o seu problema.',
      icon: Stethoscope
    },
    {
      id: 'women',
      title: 'Saúde da Mulher',
      description: 'Cuidado integral com preventivos, pré-natal e acompanhamento ginecológico.',
      icon: UserPlus
    },
    {
      id: 'sst',
      title: 'Medicina do Trabalho',
      description: 'ASO, admissionais, demissionais e periódicos para sua empresa estar em dia.',
      icon: HardHat
    },
    {
      id: 'pediatrics',
      title: 'Pediatria',
      description: 'Atenção especializada para o desenvolvimento saudável dos pequenos.',
      icon: Baby
    },
    {
      id: 'geriatrics',
      title: 'Geriatria',
      description: 'Respeito e cuidado especializado para a melhor idade.',
      icon: Users
    },
    {
      id: 'tox',
      title: 'Exames Toxicológicos',
      description: 'Credenciado para renovação de CNH e concursos, com máxima agilidade.',
      icon: Microscope
    },
    {
      id: 'rapid',
      title: 'Testes Rápidos',
      description: 'Diagnósticos imediatos para diversas patologias com segurança.',
      icon: Activity
    },
    {
      id: 'human',
      title: 'Avaliações Médicas',
      description: 'Check-ups gerais detalhados para prevenção e manutenção da saúde.',
      icon: HeartPulse
    }
  ];
  
  export const REVIEWS: Review[] = [
    {
      id: 'new-1',
      text: "Gratidão pelo pronto atendimento, faço elogio ao funcionário Leonardo da unidade da Samambaia, fez seu trabalho com empatia, atenção e respeito. Fiquei muito satisfeita.",
      author: "Ane Catia",
      rating: 5
    },
    {
      id: '1',
      text: "Excelente para todos que buscam tratamento de saúde médico.",
      author: "Paciente Satisfeito",
      rating: 5
    },
    {
      id: '2',
      text: "Atendeu todas as minhas expectativas, muito boa clínica e barata.",
      author: "Maria Oliveira",
      rating: 4
    },
    {
      id: '4',
      text: "Atendimento humanizado e muito atencioso. Recomendo para exames de rotina.",
      author: "João Silva",
      rating: 5
    }
  ];