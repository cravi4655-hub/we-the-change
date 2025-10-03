declare global {
  interface Window {
    Razorpay?: any;
  }
}

export async function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (window.Razorpay) return true;
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface OpenCheckoutOptions {
  amountInRupees: number; // e.g., 500 for ₹500
  name?: string;
  description?: string;
  email?: string;
  contact?: string;
  hostedLinkFallback?: string; // opens if no key
  notes?: Record<string, string>;
  onSuccess?: (response: any) => void;
  onDismiss?: () => void;
}

export async function openDonationCheckout(options: OpenCheckoutOptions): Promise<void> {
  const loaded = await loadRazorpayScript();
  const key = (import.meta as any).env?.VITE_RAZORPAY_KEY as string | undefined;

  if (!loaded || !key) {
    if (options.hostedLinkFallback && typeof window !== 'undefined') {
      window.open(options.hostedLinkFallback, '_blank');
      return;
    }
    throw new Error('Razorpay unavailable or key missing. Set VITE_RAZORPAY_KEY.');
  }

  const amountPaise = Math.max(1, Math.round(options.amountInRupees * 100));

  const rzp = new window.Razorpay({
    key,
    amount: amountPaise,
    currency: 'INR',
    name: options.name || 'We The Change',
    description: options.description || 'Donation',
    prefill: {
      email: options.email,
      contact: options.contact,
    },
    notes: options.notes,
    handler: (response: any) => {
      options.onSuccess?.(response);
    },
    modal: {
      ondismiss: () => options.onDismiss?.(),
    },
    theme: { color: '#B3202E' },
  });

  rzp.open();
}




