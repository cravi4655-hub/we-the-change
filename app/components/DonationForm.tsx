'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DonateButton from './DonateButton';

interface DonationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationForm({ isOpen, onClose }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation submitted:', { selectedAmount, customAmount, donorInfo });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Make a Donation</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-primary mb-3">
              Select Amount
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedAmount === amount
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted/30 hover:border-primary/50'
                  }`}
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-muted">₹</span>
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={donorInfo.name}
                onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
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
                value={donorInfo.email}
                onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={donorInfo.phone}
                onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Message (Optional)
              </label>
              <textarea
                value={donorInfo.message}
                onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                rows={3}
                className="w-full p-3 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Tell us why you're supporting our mission..."
              />
            </div>
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
            <DonateButton 
              className="flex-1 py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              amount={customAmount ? parseInt(customAmount) : selectedAmount}
            >
              Donate ₹{customAmount || selectedAmount.toLocaleString()}
            </DonateButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
