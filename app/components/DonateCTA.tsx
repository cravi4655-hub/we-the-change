'use client';

import { useState } from 'react';
import { openDonationCheckout } from '../utils/razorpay';

const PRESETS = [500, 1000, 2500];

export default function DonateCTA() {
  const [amount, setAmount] = useState<number>(PRESETS[0]);
  const [loading, setLoading] = useState(false);

  const donate = async () => {
    try {
      setLoading(true);
      await openDonationCheckout({ amountInRupees: amount });
    } catch (e) {
      console.error(e);
      alert('Unable to open donation checkout. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12" style={{ backgroundColor: '#B3202E' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold">Support dignity with your donation</h2>
            <p className="opacity-90 mt-2">Your contribution enables pads, education, and community leaders.</p>
          </div>
          <div className="flex items-center gap-3">
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`px-4 py-2 rounded-md border text-white ${amount === p ? 'bg-white/15 border-white' : 'bg-white/5 border-white/40 hover:bg-white/10'}`}
                aria-pressed={amount === p}
              >₹{p.toLocaleString('en-IN')}</button>
            ))}
            <button
              onClick={donate}
              disabled={loading}
              className="px-6 py-3 rounded-md bg-white text-[#B3202E] font-semibold hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-60"
            >Donate Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}




