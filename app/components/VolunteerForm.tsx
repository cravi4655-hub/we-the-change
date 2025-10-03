'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface VolunteerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerForm({ isOpen, onClose }: VolunteerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    role: '',
    experience: '',
    availability: '',
    motivation: '',
    skills: ''
  });

  const volunteerRoles = [
    'Field Volunteer',
    'Content Creator', 
    'Event Coordinator',
    'Translator',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle volunteer application submission
    console.log('Volunteer application submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Volunteer Application</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Age *
              </label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Preferred Role *
            </label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a role</option>
              {volunteerRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Relevant Experience
            </label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              rows={3}
              className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tell us about your relevant experience..."
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Availability *
            </label>
            <input
              type="text"
              required
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g., Weekends, 2-4 hours per week"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Skills & Interests
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="e.g., Communication, Event Planning, Social Media"
            />
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Why do you want to volunteer with us? *
            </label>
            <textarea
              required
              value={formData.motivation}
              onChange={(e) => setFormData({...formData, motivation: e.target.value})}
              rows={4}
              className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tell us what motivates you to join our mission..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-muted/30 rounded-lg text-muted hover:bg-muted/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors"
            >
              Submit Application
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
