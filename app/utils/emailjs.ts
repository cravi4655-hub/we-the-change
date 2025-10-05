import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_p56njus';
const EMAILJS_PUBLIC_KEY = 'lZUf4BSVQXXJXhPoh';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Email templates
export const EMAIL_TEMPLATES = {
  CONTACT_FORM: 'contact_form',
  DONATION_NOTIFICATION: 'donation_notification',
  VOLUNTEER_APPLICATION: 'volunteer_application',
} as const;

// Email interfaces
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface DonationData {
  donorName: string;
  donorEmail: string;
  amount: number;
  paymentId: string;
  purpose?: string;
}

export interface VolunteerData {
  name: string;
  email: string;
  phone: string;
  age: string;
  skills: string;
  availability: string;
  motivation: string;
}

// Email sending functions
export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      to_email: 'fairy.nz@gmail.com,farheen@wethechangeindia.org',
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_TEMPLATES.CONTACT_FORM,
      templateParams
    );

    console.log('Contact email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

export const sendDonationEmail = async (data: DonationData): Promise<boolean> => {
  try {
    const templateParams = {
      donor_name: data.donorName,
      donor_email: data.donorEmail,
      amount: data.amount,
      payment_id: data.paymentId,
      purpose: data.purpose || 'General Donation',
      to_email: 'fairy.nz@gmail.com,farheen@wethechangeindia.org',
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_TEMPLATES.DONATION_NOTIFICATION,
      templateParams
    );

    console.log('Donation email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending donation email:', error);
    return false;
  }
};

export const sendVolunteerEmail = async (data: VolunteerData): Promise<boolean> => {
  try {
    const templateParams = {
      volunteer_name: data.name,
      volunteer_email: data.email,
      phone: data.phone,
      age: data.age,
      skills: data.skills,
      availability: data.availability,
      motivation: data.motivation,
      to_email: 'fairy.nz@gmail.com,farheen@wethechangeindia.org',
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAIL_TEMPLATES.VOLUNTEER_APPLICATION,
      templateParams
    );

    console.log('Volunteer email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Error sending volunteer email:', error);
    return false;
  }
};

// Utility function to validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +91 XXXXXXXXXX for Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  }
  
  return phone; // Return original if can't format
};
