/// <reference types="vite/client" />

interface ContactSubmission {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    created_at?: Date;
  }
  
  interface NewsletterSignup {
    id?: number;
    email: string;
    created_at?: Date;
  }
  
  interface DonationRecord {
    id?: number;
    amount: number;
    donor_name: string;
    donor_email: string;
    donor_phone?: string;
    razorpay_payment_id?: string;
    status: 'pending' | 'completed' | 'failed';
    created_at?: Date;
  }
  
  interface VolunteerApplication {
    id?: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    experience: string;
    availability: string;
    motivation: string;
    created_at?: Date;
  }
  
  class DatabaseManager {
    private connectionString: string;
  
    constructor() {
      this.connectionString = import.meta.env.VITE_DATABASE_URL || '';
    }
  
    async executeQuery(query: string, params: any[] = []): Promise<any> {
      try {
        // For now, we'll simulate database operations
        // In production, you'd use a proper PostgreSQL client
        console.log('Database Query:', query, params);
        
        // Simulate successful response
        return { success: true, data: [] };
      } catch (error) {
        console.error('Database Error:', error);
        throw error;
      }
    }
  
    async createTables(): Promise<void> {
      const queries = [
        // Contact submissions table
        `CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        
        // Newsletter signups table
        `CREATE TABLE IF NOT EXISTS newsletter_signups (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        
        // Donations table
        `CREATE TABLE IF NOT EXISTS donations (
          id SERIAL PRIMARY KEY,
          amount DECIMAL(10,2) NOT NULL,
          donor_name VARCHAR(255) NOT NULL,
          donor_email VARCHAR(255) NOT NULL,
          donor_phone VARCHAR(20),
          razorpay_payment_id VARCHAR(255),
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        
        // Volunteer applications table
        `CREATE TABLE IF NOT EXISTS volunteer_applications (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          role VARCHAR(255) NOT NULL,
          experience TEXT,
          availability VARCHAR(255),
          motivation TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
      ];
  
      for (const query of queries) {
        await this.executeQuery(query);
      }
    }
  
    async saveContactSubmission(submission: ContactSubmission): Promise<boolean> {
      const query = `
        INSERT INTO contact_submissions (name, email, phone, subject, message)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const params = [submission.name, submission.email, submission.phone, submission.subject, submission.message];
      
      const result = await this.executeQuery(query, params);
      return result.success;
    }
  
    async saveNewsletterSignup(email: string): Promise<boolean> {
      const query = `
        INSERT INTO newsletter_signups (email)
        VALUES ($1)
        ON CONFLICT (email) DO NOTHING
      `;
      const params = [email];
      
      const result = await this.executeQuery(query, params);
      return result.success;
    }
  
    async saveDonation(donation: DonationRecord): Promise<boolean> {
      const query = `
        INSERT INTO donations (amount, donor_name, donor_email, donor_phone, razorpay_payment_id, status)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const params = [
        donation.amount,
        donation.donor_name,
        donation.donor_email,
        donation.donor_phone,
        donation.razorpay_payment_id,
        donation.status
      ];
      
      const result = await this.executeQuery(query, params);
      return result.success;
    }
  
    async saveVolunteerApplication(application: VolunteerApplication): Promise<boolean> {
      const query = `
        INSERT INTO volunteer_applications (name, email, phone, role, experience, availability, motivation)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const params = [
        application.name,
        application.email,
        application.phone,
        application.role,
        application.experience,
        application.availability,
        application.motivation
      ];
      
      const result = await this.executeQuery(query, params);
      return result.success;
    }
  
    async getContactSubmissions(): Promise<ContactSubmission[]> {
      const query = `SELECT * FROM contact_submissions ORDER BY created_at DESC`;
      const result = await this.executeQuery(query);
      return result.data || [];
    }
  
    async getNewsletterSignups(): Promise<NewsletterSignup[]> {
      const query = `SELECT * FROM newsletter_signups ORDER BY created_at DESC`;
      const result = await this.executeQuery(query);
      return result.data || [];
    }
  
    async getDonations(): Promise<DonationRecord[]> {
      const query = `SELECT * FROM donations ORDER BY created_at DESC`;
      const result = await this.executeQuery(query);
      return result.data || [];
    }
  
    async getVolunteerApplications(): Promise<VolunteerApplication[]> {
      const query = `SELECT * FROM volunteer_applications ORDER BY created_at DESC`;
      const result = await this.executeQuery(query);
      return result.data || [];
    }
  }
  
  export const db = new DatabaseManager();
  export type { ContactSubmission, NewsletterSignup, DonationRecord, VolunteerApplication };