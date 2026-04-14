import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { X, Github, ExternalLink, ArrowLeft } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  img: string;
  color?: string;
  description?: string;
  designType?: string;
  techStack?: string[];
  architecture?: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedImage]);

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white overflow-y-auto pt-20 md:pt-32 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* Back Button */}
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-[10px] font-light tracking-widest-xl uppercase hover:line-through cursor-pointer mb-8 md:mb-12"
              >
                <ArrowLeft size={16} />
                {t('project.back')}
              </button>
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-[10px] font-light tracking-widest-xl uppercase opacity-50 mb-4 block">
                    {project.category}
                  </span>
                  <h2 className="text-4xl md:text-8xl font-light font-serif uppercase tracking-tighter mb-8 leading-none">
                    {project.title}
                  </h2>
                  <p className="text-lg md:text-xl font-light font-serif leading-relaxed mb-12 opacity-80">
                    {project.description || "A comprehensive digital solution focused on performance and user experience. Built with a focus on scalability and clean architecture."}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-light uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all"
                      >
                        <Github size={16} />
                        {t('project.github')}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border border-black text-xs font-light uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                      >
                        <ExternalLink size={16} />
                        {t('project.live')}
                      </a>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="aspect-square bg-neutral-100 overflow-hidden border border-black cursor-zoom-in"
                  onClick={() => setSelectedImage(project.img)}
                >
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover contrast-125 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 py-12 border-y border-black">
                <div>
                  <h4 className="text-[10px] font-light tracking-widest-xl uppercase opacity-50 mb-4">{t('project.design')}</h4>
                  <p className="text-lg font-light font-serif uppercase">{project.designType || "Minimalist / Swiss Style"}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-light tracking-widest-xl uppercase opacity-50 mb-4">{t('project.tech')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || ["React", "TypeScript", "Tailwind"]).map((tech) => (
                      <span key={tech} className="px-3 py-1 border border-black text-[10px] font-light uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-light tracking-widest-xl uppercase opacity-50 mb-4">{t('project.arch')}</h4>
                  <p className="text-lg font-light font-serif uppercase">{project.architecture || "Monolithic / Serverless"}</p>
                </div>
              </div>

              {/* Screenshots / Captures */}
              <div className="space-y-12">
                <h3 className="text-4xl font-light font-serif uppercase tracking-tighter">{t('portfolio.view')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(project.screenshots || [
                    `https://picsum.photos/seed/${project.id}-1/1200/800`,
                    `https://picsum.photos/seed/${project.id}-2/1200/800`,
                    `https://picsum.photos/seed/${project.id}-3/1200/800`,
                    `https://picsum.photos/seed/${project.id}-4/1200/800`,
                  ]).map((src, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="aspect-video bg-neutral-100 border border-black overflow-hidden cursor-zoom-in"
                      onClick={() => setSelectedImage(src)}
                    >
                      <img 
                        src={src} 
                        alt={`Screenshot ${idx + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-black text-white py-24 px-6 text-center">
              <h3 className="text-4xl md:text-6xl font-light font-serif uppercase tracking-tighter mb-12">
                {project.title}
              </h3>
              <button 
                onClick={onClose}
                className="px-12 py-6 border-2 border-white text-white font-light uppercase tracking-widest-xl hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                {t('project.back')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={40} />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={selectedImage}
              alt="Project detail"
              className="max-w-full max-h-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
