'use client';

import { useState } from 'react';
import { openDonationCheckout } from '../utils/razorpay';

interface DonateButtonProps {
  amount?: number; // rupees
  className?: string;
  hostedLinkFallback?: string;
  children?: React.ReactNode;
  onSuccess?: (response: any) => void;
  disabled?: boolean;
}

export default function DonateButton({ amount = 500, className = '', hostedLinkFallback, children, onSuccess, disabled }: DonateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await openDonationCheckout({ 
        amountInRupees: amount, 
        hostedLinkFallback,
        onSuccess: (response) => {
          onSuccess?.(response);
        }
      });
    } catch (e) {
      console.error(e);
      alert('Unable to open donation checkout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center bg-primary text-white rounded-md px-6 py-3 font-medium hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-60 ${className}`}
      aria-busy={loading}
    >
      {children || 'Donate'}
    </button>
  );
}




