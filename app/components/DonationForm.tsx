'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DonateButton from './DonateButton';
import { db } from '../utils/database';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleDonationSuccess = async (response: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save donation record to database
      const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
      const success = await db.saveDonation({
        amount: amount,
        donor_name: donorInfo.name,
        donor_email: donorInfo.email,
        donor_phone: donorInfo.phone || undefined,
        razorpay_payment_id: response.razorpay_payment_id,
        status: 'completed'
      });

      if (success) {
        setSubmitStatus('success');
        // Reset form
        setDonorInfo({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setSelectedAmount(500);
        setCustomAmount('');
        // Close form after 3 seconds
        setTimeout(() => onClose(), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error saving donation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Donation submission will be handled by Razorpay
    // Database saving will happen in handleDonationSuccess
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

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✅ Thank you for your donation! Your payment was successful.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">  
              ❌ There was an error processing your donation. Please try again.
            </div>
          )}

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
              className="flex-1 py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              amount={customAmount ? parseInt(customAmount) : selectedAmount}
              onSuccess={(response) => handleDonationSuccess(response)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Donate ₹${customAmount || selectedAmount.toLocaleString()}`}
            </DonateButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
