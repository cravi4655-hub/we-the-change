'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface StoryItem {
  id: string;
  title: string;
  location: string;
  quote: string;
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  photos?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  videoUrl?: string;
  category: string;
}

interface StoriesGridProps {
  items: StoryItem[];
}

export default function StoriesGrid({ items }: StoriesGridProps) {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Stories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((story, index) => (
          <motion.div
            key={story.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => setSelectedStory(story)}
          >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={story.cover.src}
                alt={story.cover.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">{story.category}</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">{story.title}</h3>
              <p className="text-gray-600 mb-4">{story.location}</p>
              <blockquote className="text-gray-700 italic">
                "{story.quote}"
              </blockquote>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Story Details */}
      {selectedStory && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedStory(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedStory.cover.src}
                alt={selectedStory.cover.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
                onClick={() => setSelectedStory(null)}
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">{selectedStory.category}</div>
                <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
                <p className="text-sm">{selectedStory.location}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <blockquote className="text-xl text-gray-700 italic mb-6">
                "{selectedStory.quote}"
              </blockquote>

              {/* Photos */}
              {selectedStory.photos && selectedStory.photos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Photos</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedStory.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {selectedStory.videoUrl && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Video</h3>
                  <div className="aspect-video">
                    <iframe
                      src={selectedStory.videoUrl}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}




