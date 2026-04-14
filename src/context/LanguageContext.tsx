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
    'experience.role1.title': 'SHOPIFY FULLSTACK / UI DESIGNER',
    'experience.role1.company': 'FORIT CONSULTING',
    'experience.role1.date': 'JAN-2025 - FEB-2026',
    'experience.role1.desc': 'E-commerce specialist focused on creating and optimizing high-performance stores. Frontend Dev: Custom theme creation from scratch using Liquid, JS, and CSS. API Management: Integration of Shopify Admin/Storefront APIs and third-party services (ERP/CRM). Optimization: Performance improvements (Core Web Vitals) and User Experience (UX). Configuration: Advanced App and Checkout customization. Stack: Liquid, Shopify CLI, JavaScript, GraphQL, and Git.',
    'experience.role2.title': 'WEB DEVELOPER JR, FULLSTACK',
    'experience.role2.company': 'ARM SOLUCIONES',
    'experience.role2.date': 'SEP-2023 - JAN-2025',
    'experience.role2.desc': 'Supporting the software team in codebase maintenance through clean code writing, bug fixing, unit testing, and technical meetings. Additionally, performance metric analysis and project optimization using Google Analytics.',
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
    'experience.role1.title': 'SHOPIFY FULLSTACK / UI DESIGNER',
    'experience.role1.company': 'FORIT CONSULTING',
    'experience.role1.date': 'ENE-2025 - FEB-2026',
    'experience.role1.desc': 'Especialista en la creación y optimización de tiendas e-commerce de alto rendimiento. Desarrollo Frontend: Creación de temas personalizados desde cero usando Liquid, JS y CSS. Gestión de APIs: Integración de Shopify Admin/Storefront APIs y servicios de terceros (ERP/CRM). Optimización: Mejora de velocidad de carga (Core Web Vitals) y experiencia de usuario (UX). Configuración: Instalación y personalización avanzada de Apps y Checkout. Stack: Liquid, Shopify CLI, JavaScript, GraphQL y Git.',
    'experience.role2.title': 'WEB DEVELOPER JR, FULLSTACK',
    'experience.role2.company': 'ARM SOLUCIONES',
    'experience.role2.date': 'SEP-2023 - ENE-2025',
    'experience.role2.desc': 'Apoyo al equipo de software en el mantenimiento de la base de código mediante la escritura de código limpio, resolución de errores (bugs), ejecución de pruebas unitarias y participación en reuniones técnicas. Adicionalmente, análisis de métricas de rendimiento y optimización de proyectos utilizando Google Analytics.',
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
