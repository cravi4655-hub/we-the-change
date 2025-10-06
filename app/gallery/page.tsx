'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import DonateButton from '../components/DonateButton';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "/images/image1.jpg",
      alt: "Menstrual Health Workshop in Delhi",
      category: "Workshops",
      location: "Delhi",
      description: "Interactive workshop on menstrual health and hygiene management"
    },
    {
      id: 2,
      src: "/images/image2.jpg",
      alt: "Community Training in Mumbai",
      category: "Training",
      location: "Mumbai",
      description: "Train The Trainer program for community educators"
    },
    {
      id: 3,
      src: "/images/image3.jpg",
      alt: "Field Visit to Rural Rajasthan",
      category: "Field Work",
      location: "Rajasthan",
      description: "Distributing menstrual hygiene kits in rural communities"
    },
    {
      id: 4,
      src: "/images/image4.jpg",
      alt: "Awareness Session in Assam",
      category: "Awareness",
      location: "Assam",
      description: "Breaking taboos through open conversations about menstruation"
    },
    {
      id: 5,
      src: "/images/image5.jpg",
      alt: "Youth Leadership Program",
      category: "Youth",
      location: "Mumbai",
      description: "Empowering young leaders to become menstrual health advocates"
    },
    {
      id: 6,
      src: "/images/image6.jpg",
      alt: "International Workshop in Kenya",
      category: "International",
      location: "Kenya",
      description: "Expanding our impact to communities in East Africa"
    },
    {
      id: 7,
      src: "/images/image7.jpg",
      alt: "Environmental Awareness Campaign",
      category: "Environment",
      location: "Delhi",
      description: "Promoting sustainable menstrual waste management"
    },
    {
      id: 8,
      src: "/images/image8.jpg",
      alt: "Community Outreach in West Bengal",
      category: "Outreach",
      location: "West Bengal",
      description: "Reaching marginalized communities with essential health education"
    },
    {
      id: 9,
      src: "/images/image10.JPG",
      alt: "Product Distribution in Jharkhand",
      category: "Distribution",
      location: "Jharkhand",
      description: "Making menstrual hygiene products accessible to all"
    },
    {
      id: 10,
      src: "/images/image11.JPG",
      alt: "Women's Empowerment Session",
      category: "Workshops",
      location: "Community Centers",
      description: "Building confidence and knowledge among women"
    },
    {
      id: 11,
      src: "/images/image12.JPG",
      alt: "Rural Distribution Program",
      category: "Distribution",
      location: "Rural Communities",
      description: "Ensuring access to menstrual hygiene products"
    },
    {
      id: 12,
      src: "/images/image13.jpg",
      alt: "Training Workshop",
      category: "Training",
      location: "Community Centers",
      description: "Building capacity among local educators"
    },
    {
      id: 13,
      src: "/images/image14.jpg",
      alt: "Awareness Campaign",
      category: "Awareness",
      location: "Urban Areas",
      description: "Spreading awareness about menstrual health"
    },
    {
      id: 14,
      src: "/images/image15.jpg",
      alt: "Field Work Activities",
      category: "Field Work",
      location: "Rural India",
      description: "Direct community engagement and support"
    },
    {
      id: 15,
      src: "/images/image16.jpg",
      alt: "Youth Engagement Program",
      category: "Youth",
      location: "Schools",
      description: "Engaging young people in menstrual health advocacy"
    },
    {
      id: 16,
      src: "/images/image17.JPG",
      alt: "Community Training Session",
      category: "Training",
      location: "Community Centers",
      description: "Empowering community members with knowledge"
    },
    {
      id: 17,
      src: "/images/image18.JPG",
      alt: "Workshop Activities",
      category: "Workshops",
      location: "Various Locations",
      description: "Interactive learning sessions on menstrual health"
    },
    {
      id: 18,
      src: "/images/image19.JPG",
      alt: "Outreach Program",
      category: "Outreach",
      location: "Remote Areas",
      description: "Reaching underserved communities"
    },
    {
      id: 19,
      src: "/images/image20.JPG",
      alt: "Environmental Initiative",
      category: "Environment",
      location: "Multiple States",
      description: "Promoting sustainable menstrual hygiene practices"
    },
    {
      id: 20,
      src: "/images/image21.JPG",
      alt: "Training Program",
      category: "Training",
      location: "Educational Institutions",
      description: "Building capacity in menstrual health education"
    },
    {
      id: 21,
      src: "/images/image22.JPG",
      alt: "Community Workshop",
      category: "Workshops",
      location: "Community Centers",
      description: "Engaging communities in menstrual health discussions"
    },
    {
      id: 22,
      src: "/images/image23.JPG",
      alt: "Field Activities",
      category: "Field Work",
      location: "Rural Communities",
      description: "Direct implementation of menstrual health programs"
    },
    {
      id: 23,
      src: "/images/image24.JPG",
      alt: "Awareness Program",
      category: "Awareness",
      location: "Various Locations",
      description: "Breaking taboos and spreading awareness"
    },
    {
      id: 24,
      src: "/images/image25.JPG",
      alt: "Distribution Initiative",
      category: "Distribution",
      location: "Underserved Areas",
      description: "Ensuring access to menstrual hygiene products"
    },
    {
      id: 25,
      src: "/images/image28.png",
      alt: "Program Documentation",
      category: "Workshops",
      location: "Program Sites",
      description: "Capturing moments of impact and change"
    },
    {
      id: 26,
      src: "/images/image31.jpg",
      alt: "Community Engagement",
      category: "Outreach",
      location: "Community Centers",
      description: "Building strong community connections"
    },
    {
      id: 27,
      src: "/images/image32.jpeg",
      alt: "Training Session",
      category: "Training",
      location: "Educational Centers",
      description: "Capacity building for menstrual health educators"
    },
    {
      id: 28,
      src: "/images/image33.jpeg",
      alt: "Workshop Activities",
      category: "Workshops",
      location: "Community Spaces",
      description: "Interactive learning and skill building"
    },
    {
      id: 29,
      src: "/images/image35.jpeg",
      alt: "Field Implementation",
      category: "Field Work",
      location: "Rural Areas",
      description: "Direct program implementation in communities"
    },
    {
      id: 30,
      src: "/images/image36.jpeg",
      alt: "Awareness Campaign",
      category: "Awareness",
      location: "Public Spaces",
      description: "Public awareness about menstrual health"
    },
    {
      id: 31,
      src: "/images/image37.jpg",
      alt: "Community Training",
      category: "Training",
      location: "Community Centers",
      description: "Building local capacity for menstrual health"
    },
    {
      id: 32,
      src: "/images/image38.jpg",
      alt: "Workshop Session",
      category: "Workshops",
      location: "Educational Institutions",
      description: "Educational workshops on menstrual hygiene"
    },
    {
      id: 33,
      src: "/images/image39.jpg",
      alt: "Outreach Activities",
      category: "Outreach",
      location: "Remote Communities",
      description: "Reaching the most underserved populations"
    },
    {
      id: 34,
      src: "/images/image40.jpg",
      alt: "Field Work Program",
      category: "Field Work",
      location: "Rural India",
      description: "Direct community engagement and support"
    },
    {
      id: 35,
      src: "/images/image41.jpg",
      alt: "Training Workshop",
      category: "Training",
      location: "Community Centers",
      description: "Empowering local educators and advocates"
    },
    {
      id: 36,
      src: "/images/image42.jpg",
      alt: "Awareness Initiative",
      category: "Awareness",
      location: "Various Locations",
      description: "Spreading awareness and breaking taboos"
    },
    {
      id: 37,
      src: "/images/image43.JPG",
      alt: "Community Program",
      category: "Outreach",
      location: "Community Centers",
      description: "Community-based menstrual health programs"
    },
    {
      id: 38,
      src: "/images/image44.JPG",
      alt: "Training Session",
      category: "Training",
      location: "Educational Centers",
      description: "Building capacity in menstrual health education"
    },
    {
      id: 39,
      src: "/images/image45.jpeg",
      alt: "Workshop Activities",
      category: "Workshops",
      location: "Community Spaces",
      description: "Interactive learning and community engagement"
    },
    {
      id: 40,
      src: "/images/image46.JPG",
      alt: "Field Activities",
      category: "Field Work",
      location: "Rural Communities",
      description: "Direct implementation and community support"
    },
    {
      id: 41,
      src: "/images/image47.JPG",
      alt: "Program Implementation",
      category: "Training",
      location: "Program Sites",
      description: "On-ground implementation of menstrual health programs"
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
                transition={{ duration: 0.6, delay: index * 0.05 }}
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


