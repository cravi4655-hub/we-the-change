'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface ProgramItem {
  id: string;
  title: string;
  summary: string;
  icon: ReactNode;
  gradient: 'coral' | 'teal';
  learnMoreLink?: string;
}

interface ProgramsProps {
  items: ProgramItem[];
  className?: string;
}

function ProgramCard({ item, index }: { item: ProgramItem; index: number }) {
  const gradientClasses = {
    coral: 'from-coral/20 to-coral/5',
    teal: 'from-teal/20 to-teal/5'
  };

  const iconBgClasses = {
    coral: 'bg-coral/10 text-coral',
    teal: 'bg-teal/10 text-teal'
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="group relative bg-bg-alt rounded-2xl p-8 border border-muted/10 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[item.gradient]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl ${iconBgClasses[item.gradient]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-8 h-8">
            {item.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary/90 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-muted leading-relaxed mb-6 group-hover:text-muted/80 transition-colors duration-300">
          {item.summary}
        </p>

        {/* Learn More Button */}
        {item.learnMoreLink && (
          <Link
            to={item.learnMoreLink!}
            className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors duration-300 group-hover:translate-x-1 transform transition-transform duration-300"
          >
            Learn More
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transform transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {/* Hover Shadow */}
      <div className="absolute inset-0 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
    </motion.div>
  );
}

export default function Programs({ items, className = "" }: ProgramsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Our Programs
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Comprehensive initiatives designed to create lasting change through education, 
            awareness, and community empowerment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map((item, index) => (
            <ProgramCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
