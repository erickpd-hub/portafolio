import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.work': 'Projects',
    'nav.services': 'Skills',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.available': 'Available for hire / 2026',
    'hero.title': 'UX/UI Designer & Full-Stack Engineer. Crafting systems with React, Express, Supabase & FastAPI.',
    'hero.subtitle': 'Monterrey Nuevo León México',
    'hero.design': 'DESIGN',
    'hero.repeat': 'FULLSTACK',
    'portfolio.title': 'Project Archive',
    'portfolio.subtitle': 'Selected Works 2024—2026',
    'portfolio.view': 'VIEW CASE',
    'services.title': 'Skill Stack',
    'services.subtitle': 'Bridging the gap between aesthetic precision and technical performance.',
    'services.ux.title': 'UX/UI DESIGN',
    'services.ux.desc': 'User-centric interfaces, design systems, and high-fidelity prototyping using Figma and Adobe Suite.',
    'services.frontend.title': 'FRONTEND DEV',
    'services.frontend.desc': 'Building scalable, performant web applications with React, TypeScript, and Tailwind CSS.',
    'services.backend.title': 'BACKEND & CLOUD',
    'services.backend.desc': 'Robust APIs and database management using Express, FastAPI, and Supabase / PostgreSQL.',
    'contact.collaboration': 'Collaboration',
    'contact.title': "WANT TO BUILD SOMETHING? LET'S TALK.",
    'contact.availability': 'Availability',
    'contact.availability.desc': 'OPEN FOR FULL-TIME ROLES & FREELANCE PROJECTS',
    'contact.network': 'Network',
    'contact.resume': 'Resume',
    'contact.resume.desc': 'Download CV (PDF)',
    'contact.copyright': '© 2026 ALV — DESIGN & CODE',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message Sent Successfully',
    'contact.form.close': 'Close',
    'project.design': 'Design Type',
    'project.tech': 'Tech Stack',
    'project.arch': 'Architecture',
    'project.github': 'GitHub Repository',
    'project.live': 'Live Demo',
    'project.back': 'Back to Archive',
    'experience.title': 'Exp.',
    'experience.subtitle': 'Professional Journey',
    'experience.current': 'Current',
    'experience.role1.title': 'EXPERIENCIAS DIGITALES PRODUCT DESIGNER',
    'experience.role1.company': 'UDEM',
    'experience.role1.location': 'HYBRID',
    'experience.role1.date': 'SEP-2025 - JUN-2026',
    'experience.role1.desc': 'Product Design (End-to-End): Conceptualized and designed digital products from research to high-fidelity prototyping. UX Research & Strategy: Conducted usability testing, user flow maps, and wireframes to optimize user experience and interaction. UI & Design Systems: Created pixel-perfect interfaces and maintained the design system to ensure visual consistency and scalability. Collaboration: Worked alongside engineers and product managers to guarantee technical feasibility and design fidelity.',
    'experience.role2.title': 'FULL STACK DEVELOPER',
    'experience.role2.company': 'FORIT CONSULTING',
    'experience.role2.location': 'REMOTE',
    'experience.role2.date': 'FEB-2023 - AUG-2025',
    'experience.role2.desc': 'Frontend: Developed dynamic and modular user interfaces using React and Vue.js, optimizing performance and user experience. Backend: Designed and implemented scalable RESTful APIs and microservices with Express.js (Node.js) and Python. Database & DevOps: Managed databases (SQL/NoSQL) and implemented Docker containers to standardize and streamline deployments. Quality: Ensured software stability through unit testing, clean code practices, and code reviews.',
  },
  es: {
    'nav.work': 'Proyectos',
    'nav.services': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.available': 'Disponible para contratación / 2026',
    'hero.title': 'Diseñador UX/UI y Desarrollador Full-Stack. Creando sistemas con React, Express, Supabase y FastAPI.',
    'hero.subtitle': 'Monterrey Nuevo León México',
    'hero.design': 'DISEÑO',
    'hero.repeat': 'FULLSTACK',
    'portfolio.title': 'Archivo de Proyectos',
    'portfolio.subtitle': 'Trabajos Seleccionados 2024—2026',
    'portfolio.view': 'VER CASO',
    'services.title': 'Stack de Habilidades',
    'services.subtitle': 'Cerrando la brecha entre la precisión estética y el rendimiento técnico.',
    'services.ux.title': 'DISEÑO UX/UI',
    'services.ux.desc': 'Interfaces centradas en el usuario, sistemas de diseño y prototipado de alta fidelidad con Figma y Adobe Suite.',
    'services.frontend.title': 'DESARROLLO FRONTEND',
    'services.frontend.desc': 'Construcción de aplicaciones web escalables y eficientes con React, TypeScript y Tailwind CSS.',
    'services.backend.title': 'BACKEND Y NUBE',
    'services.backend.desc': 'APIs robustas y gestión de bases de datos con Express, FastAPI y Supabase / PostgreSQL.',
    'contact.collaboration': 'Colaboración',
    'contact.title': '¿QUIERES CONSTRUIR ALGO? HABLEMOS.',
    'contact.availability': 'Disponibilidad',
    'contact.availability.desc': 'ABIERTO A ROLES DE TIEMPO COMPLETO Y PROYECTOS FREELANCE',
    'contact.network': 'Redes',
    'contact.resume': 'Currículum',
    'contact.resume.desc': 'Descargar CV (PDF)',
    'contact.copyright': '© 2026 ALV — DISEÑO Y CÓDIGO',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo',
    'contact.form.message': 'Mensaje',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.success': 'Mensaje Enviado Correctamente',
    'contact.form.close': 'Cerrar',
    'project.design': 'Tipo de Diseño',
    'project.tech': 'Stack Tecnológico',
    'project.arch': 'Arquitectura',
    'project.github': 'Repositorio GitHub',
    'project.live': 'Demo en Vivo',
    'project.back': 'Volver al Archivo',
    'experience.title': 'Exp.',
    'experience.subtitle': 'Trayectoria Profesional',
    'experience.current': 'Actual',
    'experience.role1.title': 'EXPERIENCIAS DIGITALES PRODUCT DESIGNER',
    'experience.role1.company': 'UDEM',
    'experience.role1.location': 'HÍBRIDO',
    'experience.role1.date': 'SEP-2025 - JUN-2026',
    'experience.role1.desc': 'Diseño de Producto (End-to-End): Conceptualicé y diseñé productos digitales desde la investigación hasta el prototipado de alta fidelidad. UX Research y Estrategia: Realicé pruebas de usabilidad, mapas de flujo y wireframes para optimizar la experiencia e interacción del usuario. UI y Sistemas de Diseño: Creé interfaces atractivas (pixel-perfect) y mantuve el sistema de diseño para asegurar consistencia visual y escalabilidad. Colaboración: Trabajé junto a ingenieros y product managers para garantizar la viabilidad técnica y una implementación fiel al diseño.',
    'experience.role2.title': 'FULL STACK DEVELOPER',
    'experience.role2.company': 'FORIT CONSULTING',
    'experience.role2.location': 'REMOTO',
    'experience.role2.date': 'FEB-2023 - AGO-2025',
    'experience.role2.desc': 'Frontend: Desarrollé interfaces de usuario dinámicas y modulares utilizando React y Vue.js, optimizando el rendimiento y la experiencia de usuario. Backend: Diseñé e implementé APIs RESTful y microservicios escalables con Express.js (Node.js) y Python. Base de Datos y DevOps: Gestioné bases de datos (SQL/NoSQL) e implementé contenedores con Docker para estandarizar y agilizar los despliegues. Calidad: Garanticé la estabilidad del software mediante pruebas unitarias, código limpio y code reviews.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
