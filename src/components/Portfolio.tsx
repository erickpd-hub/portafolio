import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ProjectModal from "./ProjectModal";

import ahorraYaPortada from "../assets/imgs/AhorraYa/portada.png";
import ahorraYa1 from "../assets/imgs/AhorraYa/1.PNG";
import ahorraYa2 from "../assets/imgs/AhorraYa/2.PNG";
import ahorraYa3 from "../assets/imgs/AhorraYa/3.PNG";
import ahorraYa4 from "../assets/imgs/AhorraYa/4.PNG";

import audePortada from "../assets/imgs/Aude/portada.png";
import aude1 from "../assets/imgs/Aude/1.PNG";
import aude2 from "../assets/imgs/Aude/2.PNG";
import aude3 from "../assets/imgs/Aude/3.PNG";
import aude4 from "../assets/imgs/Aude/4.PNG";

import shopflowPortada from "../assets/imgs/ShopFlow/portada.png";
import shopflow1 from "../assets/imgs/ShopFlow/1.PNG";
import shopflow2 from "../assets/imgs/ShopFlow/2.PNG";
import shopflow3 from "../assets/imgs/ShopFlow/3.PNG";
import shopflow4 from "../assets/imgs/ShopFlow/4.PNG";

import sonxPortada from "../assets/imgs/Sonx/portada.png";
import sonx1 from "../assets/imgs/Sonx/1.PNG";
import sonx2 from "../assets/imgs/Sonx/2.PNG";
import sonx3 from "../assets/imgs/Sonx/3.PNG";
import sonx4 from "../assets/imgs/Sonx/4.PNG";

const projects = [
  { 
    id: 1, 
    title: "TASKLY", 
    category: "REACT + FIREBASE", 
    size: "2x2", 
    img: ahorraYaPortada,
    color: "#00df9a",
    screenshots: [ahorraYa1, ahorraYa2, ahorraYa3, ahorraYa4],
    description: "Una plataforma inteligente de gestión financiera personal que ayuda a los usuarios a optimizar sus ahorros y controlar sus gastos en tiempo real.",
    designType: "Modern / Clean",
    techStack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    architecture: "Serverless / NoSQL",
    githubUrl: "https://github.com",
    liveUrl: "https://taskly-jet-eta.vercel.app/"
  },
  { 
    id: 2, 
    title: "ECOM", 
    category: "E-COMMERCE / STREETWEAR", 
    size: "1x2", 
    img: audePortada,
    color: "#ffffff",
    screenshots: [aude1, aude2, aude3, aude4],
    description: "Tienda online de alta gama para una marca de streetwear de lujo. Enfoque en una experiencia de usuario premium y estética minimalista oscura.",
    designType: "Dark Luxury / Minimalist",
    techStack: ["Vite", "React", "Tailwind CSS", "Framer Motion"],
    architecture: "SPA / Headless CMS",
    githubUrl: "https://github.com",
    liveUrl: "https://ecom-seven-ebon.vercel.app/"
  },
  { 
    id: 3, 
    title: "SHOPFLOW", 
    category: "FULLSTACK / NEXT.JS", 
    size: "1x1", 
    img: shopflowPortada,
    color: "#3b82f6",
    screenshots: [shopflow1, shopflow2, shopflow3, shopflow4],
    description: "Software para crear tiendas online autogestionado, diseñado para facilitar el comercio digital a emprendedores.",
    designType: "Professional / Utility",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    architecture: "Fullstack / Server Components",
    githubUrl: "https://github.com",
    liveUrl: "https://shop-flow-x16i.vercel.app/"
  },
  { 
    id: 4, 
    title: "SONX", 
    category: "AUDIO ENGINE / UI", 
    size: "1x1", 
    img: sonxPortada,
    color: "#8b5cf6",
    screenshots: [sonx1, sonx2, sonx3, sonx4],
    description: "Red social de música con reproductor integrado y gestión de playlists, enfocada en la comunidad y el descubrimiento de nuevos artistas.",
    designType: "Futuristic / Brutalist",
    techStack: ["Web Audio API", "React", "Three.js", "Canvas"],
    architecture: "Client-Side Processing",
    githubUrl: "https://github.com",
    liveUrl: "https://sonx.vercel.app/"
  }
];


export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      id="work" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="px-6 py-24 border-t border-black"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <h2 className="text-5xl md:text-6xl font-light font-serif uppercase tracking-tighter">{t('portfolio.title')}</h2>
        <span className="text-[10px] font-light tracking-widest-xl uppercase opacity-50">{t('portfolio.subtitle')}</span>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-[70vh] border-l border-t border-black w-full overflow-hidden">
        {projects.slice(0, 4).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openProject(project)}
            className="relative flex-1 md:hover:flex-[3] transition-all duration-500 ease-in-out border-r border-b border-black overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[300px] md:min-h-0"
          >
            <div className="relative z-10 p-6 md:p-8">
              <span className="text-[10px] font-light tracking-widest-xl uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-light font-serif mt-2 text-white transition-colors duration-300 uppercase tracking-tighter">
                {project.title}
              </h3>
            </div>
            
            <div className="absolute inset-0 z-0">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover filter contrast-125 opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Filter Overlays */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            <div className="relative z-10 self-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-xs font-light underline text-white uppercase tracking-widest">
                {t('portfolio.view')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.section>
  );
}

