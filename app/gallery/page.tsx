'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import DonateButton from '../components/DonateButton';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "/next.svg",
      alt: "Menstrual Health Workshop in Delhi",
      category: "Workshops",
      location: "Delhi",
      description: "Interactive workshop on menstrual health and hygiene management"
    },
    {
      id: 2,
      src: "/vercel.svg",
      alt: "Community Training in Mumbai",
      category: "Training",
      location: "Mumbai",
      description: "Train The Trainer program for community educators"
    },
    {
      id: 3,
      src: "/globe.svg",
      alt: "Field Visit to Rural Rajasthan",
      category: "Field Work",
      location: "Rajasthan",
      description: "Distributing menstrual hygiene kits in rural communities"
    },
    {
      id: 4,
      src: "/file.svg",
      alt: "Awareness Session in Assam",
      category: "Awareness",
      location: "Assam",
      description: "Breaking taboos through open conversations about menstruation"
    },
    {
      id: 5,
      src: "/window.svg",
      alt: "Youth Leadership Program",
      category: "Youth",
      location: "Mumbai",
      description: "Empowering young leaders to become menstrual health advocates"
    },
    {
      id: 6,
      src: "/next.svg",
      alt: "International Workshop in Kenya",
      category: "International",
      location: "Kenya",
      description: "Expanding our impact to communities in East Africa"
    },
    {
      id: 7,
      src: "/vercel.svg",
      alt: "Environmental Awareness Campaign",
      category: "Environment",
      location: "Delhi",
      description: "Promoting sustainable menstrual waste management"
    },
    {
      id: 8,
      src: "/globe.svg",
      alt: "Community Outreach in West Bengal",
      category: "Outreach",
      location: "West Bengal",
      description: "Reaching marginalized communities with essential health education"
    },
    {
      id: 9,
      src: "/file.svg",
      alt: "Product Distribution in Jharkhand",
      category: "Distribution",
      location: "Jharkhand",
      description: "Making menstrual hygiene products accessible to all"
    }
  ];

  const categories = ["All", "Workshops", "Training", "Field Work", "Awareness", "Youth", "International", "Environment", "Outreach", "Distribution"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-coral/5 to-teal/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Gallery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Moments from our fieldwork, workshops, and community events across India and Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            layout
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200 group-hover:shadow-xl transition-shadow">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium">{image.category}</div>
                      <div className="text-xs">{image.location}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {filteredImages[selectedImage].category}
                </span>
                <span className="text-gray-600">📍 {filteredImages[selectedImage].location}</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                {filteredImages[selectedImage].alt}
              </h3>
              <p className="text-gray-700">
                {filteredImages[selectedImage].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in creating more moments of change and empowerment across communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors">
                Share Your Story
              </button>
              <DonateButton amount={1000} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


