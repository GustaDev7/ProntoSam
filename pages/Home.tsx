import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { ServiceCard } from '../components/ServiceCard';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { SERVICES, REVIEWS, CONTACT_INFO } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { Review } from '../types';
import { 
  ChevronRight, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Phone,
  Map as MapIcon,
  CalendarCheck
} from 'lucide-react';

export const Home: React.FC = () => {
  // State for dynamic reviews
  const [activeReviews, setActiveReviews] = useState<Review[]>(REVIEWS);
  const [reviewSources, setReviewSources] = useState<{uri: string, title: string}[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      // FIX: Check if process is defined to avoid White Screen error in some environments
      if (typeof process === 'undefined' || !process.env.API_KEY) return;

      setIsLoadingReviews(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Busque no Google Maps as avaliações da "ProntoSam Clínica Médica e Exames em Samambaia DF".
          
          Eu preciso que você LISTE 4 avaliações REAIS que tenham nota 4 ou 5 estrelas.
          
          Retorne EXATAMENTE um array JSON puro (sem markdown \`\`\`json ... \`\`\`) com o seguinte formato para cada avaliação:
          [
            {
              "id": "string única",
              "author": "Nome do Autor",
              "text": "Texto da avaliação (resumido se for muito longo)",
              "rating": numero_da_nota
            }
          ]
          
          Se não encontrar avaliações suficientes, retorne um array vazio.`,
          config: {
            tools: [{ googleMaps: {} }],
          },
        });

        const text = response.text || '';
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonMatch = cleanText.match(/\[.*\]/s);
        
        if (jsonMatch) {
          const parsedReviews = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsedReviews) && parsedReviews.length > 0) {
            setActiveReviews(parsedReviews);
          }
        }

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = chunks
          .map((c: any) => {
            if (c.web) return { uri: c.web.uri, title: c.web.title };
            if (c.maps) return { uri: c.maps.uri, title: c.maps.title };
            return null;
          })
          .filter((s: any) => s !== null);
          
        setReviewSources(sources);

      } catch (error) {
        console.error("Erro ao buscar avaliações do Google:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 selection:bg-accent selection:text-white">
      <Navbar />
      <FloatingWhatsApp />
      
      {/* HERO SECTION - Increased top padding to accommodate double navbar */}
      <section className="relative min-h-[90vh] flex items-center pt-40 lg:pt-48 pb-20 overflow-hidden bg-white">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-50/50 clip-path-slant hidden lg:block"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-primary font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" />
                Referência em Saúde e Segurança
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-secondary leading-[1.1] tracking-tight">
                Saúde de qualidade <br/>
                <span className="text-primary relative">
                  perto de você
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Consultas, exames laboratoriais e de imagem com a agilidade que você precisa e o atendimento humanizado que você merece.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                   <Button size="lg" className="shadow-xl shadow-primary/20 w-full sm:w-auto text-lg px-8 py-4">
                     Agendar Consulta
                   </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:border-secondary hover:text-secondary w-full sm:w-auto text-lg px-8 py-4">
                    Conhecer Serviços
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 text-gray-500 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>Resultados Rápidos</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    <span>Atendimento Humanizado</span>
                 </div>
              </div>
            </div>
            
            {/* Hero Image Composition */}
            <div className="relative animate-fade-in-left hidden lg:block">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10">
                <div className="aspect-[4/5] bg-gray-200 relative">
                     <img 
                        src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Profissional de saúde sorrindo" 
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute top-12 -right-12 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow z-20 max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Star className="w-5 h-5 text-green-600 fill-current" />
                      </div>
                      <span className="font-bold text-gray-900 text-lg">3.8</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-tight">Média de satisfação dos nossos pacientes no Google.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Especialidades</h2>
                <h3 className="text-3xl lg:text-4xl font-heading font-bold text-secondary">Cuidado completo em um só lugar</h3>
            </div>
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                    Ver todos os exames <ChevronRight className="w-4 h-4" />
                </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" fullWidth className="gap-2">
                    Ver todos os exames <ChevronRight className="w-4 h-4" />
                </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA SECTION - NEW */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent blur-[120px] opacity-20"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
                Pronto para cuidar da sua saúde?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
                Agende sua consulta ou exame agora mesmo pelo WhatsApp. É rápido, fácil e sem burocracia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="white" className="w-full sm:w-auto text-primary font-bold shadow-xl">
                        <CalendarCheck className="w-5 h-5 mr-2" />
                        Agendar Agora
                    </Button>
                </a>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g,'')}`}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                        <Phone className="w-5 h-5 mr-2" />
                        Ligar para a Clínica
                    </Button>
                </a>
            </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=1000" 
                        alt="Recepção ProntoSam" 
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-accent max-w-xs hidden md:block">
                    <p className="font-heading font-bold text-secondary text-lg mb-1">QS 107 - Samambaia</p>
                    <p className="text-sm text-gray-500">Fácil acesso e estrutura completa para você.</p>
                </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-12">
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Sobre Nós</h2>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-6">
                Mais que uma clínica, <br/>um parceiro da sua saúde.
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                A <strong>ProntoSam</strong> nasceu com o propósito de transformar o acesso à saúde em Samambaia. Nossa história é marcada pelo compromisso com um atendimento ético, transparente e, acima de tudo, humano.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Entendemos que cada paciente é único. Por isso, investimos constantemente em tecnologia e na capacitação da nossa equipe para oferecer diagnósticos precisos e tratamentos eficazes.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-bold text-secondary text-xl mb-1">Tecnologia</h4>
                      <p className="text-sm text-gray-500">Equipamentos modernos e precisos.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-bold text-secondary text-xl mb-1">Equipe Qualificada</h4>
                      <p className="text-sm text-gray-500">Profissionais experientes.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-secondary mb-4">
              A voz de quem confia
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Veja o que nossos pacientes dizem sobre a experiência na ProntoSam. Transparência é nosso compromisso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeReviews.map((review, idx) => (
              <div key={review.id || idx} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                      <span className="font-bold text-sm text-secondary truncate max-w-[120px]">{review.author}</span>
                      <span className="text-xs text-gray-400">Paciente</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            {reviewSources.length > 0 && (
                <a 
                    href={reviewSources[0].uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
                >
                    <MapIcon className="w-4 h-4" />
                    Ver todas as avaliações no Google
                </a>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT / LOCATION SECTION (No Form) */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Localização</h2>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-secondary">Onde nos encontrar</h3>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-3">
                {/* Info Column */}
                <div className="p-10 lg:p-12 space-y-8 bg-secondary text-white flex flex-col justify-center relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h4 className="text-2xl font-heading font-bold mb-6">Canais de Atendimento</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 uppercase tracking-wide font-semibold mb-1">Endereço</p>
                                    <p className="text-white leading-snug">{CONTACT_INFO.address}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <Phone className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 uppercase tracking-wide font-semibold mb-1">Telefone</p>
                                    <p className="text-white text-lg">{CONTACT_INFO.phone}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-xl">
                                    <Clock className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 uppercase tracking-wide font-semibold mb-1">Horários</p>
                                    <p className="text-white text-sm">Seg a Sex: 07h - 16h30</p>
                                    <p className="text-white text-sm">Sábado: 07h - 12h</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Map Column */}
                <div className="lg:col-span-2 h-96 lg:h-auto min-h-[400px] relative bg-gray-200">
                     <iframe 
                        src="https://maps.google.com/maps?q=-15.8831554,-48.099552&z=16&output=embed"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                        title="Localização ProntoSam"
                    ></iframe>
                     <div className="absolute bottom-6 right-6">
                        <a 
                            href="https://www.google.com/maps/place/ProntoSam+Cl%C3%ADnica+M%C3%A9dica+e+Exames/@-15.8828815,-48.0994199,17z" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button variant="white" className="shadow-lg gap-2 text-secondary font-bold">
                                <MapPin className="w-4 h-4 text-red-500" />
                                Abrir no App
                            </Button>
                        </a>
                     </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};