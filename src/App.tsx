import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import DonateButton from '../app/components/DonateButton';
import Home from '../app/page';
import DonatePage from '../app/donate/page';
import EventsPage from '../app/events/page';
import GalleryPage from '../app/gallery/page';
import ContactPage from '../app/contact/page';
import StoriesPage from '../app/stories/page';
import AboutPage from '../app/about/page';
import GetInvolvedPage from '../app/get-involved/page';
import ImpactPage from '../app/impact/page';

// Import Program Pages
import PaintMeRedPage from '../app/programs/paint-me-red/page';
import RedWastePage from '../app/programs/red-waste/page';
import TrainTheTrainerPage from '../app/programs/train-the-trainer/page';
import ProjectSachetPage from '../app/programs/project-sachet/page';

// Import Admin Page
import AdminDashboard from '../app/admin/page';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="antialiased bg-bg text-text font-sans">
      <header className="w-full bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60 border-b border-muted/20 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-lg sm:text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
            onClick={closeMobileMenu}
          >
            We The Change
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors duration-200">About</Link>
            <Link to="/impact" className="hover:text-primary transition-colors duration-200">Impact</Link>
            <Link to="/get-involved" className="hover:text-primary transition-colors duration-200">Get Involved</Link>
            <Link to="/events" className="hover:text-primary transition-colors duration-200">Events</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors duration-200">Gallery</Link>
            <Link to="/stories" className="hover:text-primary transition-colors duration-200">Stories</Link>
            <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link>
          </div>
          
          {/* Mobile Menu Button & Donate */}
          <div className="md:hidden flex items-center gap-3">
            <DonateButton 
              className="text-xs px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" 
              amount={500}
            >
              Donate
            </DonateButton>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg transition-all duration-200 touch-manipulation"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <DonateButton 
            className="hidden md:inline-flex text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors" 
            amount={500}
          >
            Donate Now
          </DonateButton>
        </nav>
        
        {/* Mobile Menu with better animations */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-muted/20 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/impact" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Impact
              </Link>
              <Link 
                to="/get-involved" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Get Involved
              </Link>
              <Link 
                to="/events" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Events
              </Link>
              <Link 
                to="/gallery" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
              <Link 
                to="/stories" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Stories
              </Link>
              <Link 
                to="/contact" 
                className="text-primary py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors duration-200 text-base font-medium" 
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              
              {/* Mobile Donate CTA */}
              <div className="pt-4 mt-4 border-t border-muted/20">
                <DonateButton 
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200" 
                  amount={500}
                  onClick={closeMobileMenu}
                >
                  Support Our Mission
                </DonateButton>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Program Pages */}
          <Route path="/programs/paint-me-red" element={<PaintMeRedPage />} />
          <Route path="/programs/red-waste" element={<RedWastePage />} />
          <Route path="/programs/train-the-trainer" element={<TrainTheTrainerPage />} />
          <Route path="/programs/project-sachet" element={<ProjectSachetPage />} />
          
          {/* Admin Panel */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="w-full border-t border-muted/20 bg-bg-alt">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-col space-y-6 text-center md:text-left">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-sm text-muted mb-2">
                © {new Date().getFullYear()} We The Change. All rights reserved.
              </p>
              <p className="text-sm text-muted">
                Empowering women across India and Africa.
              </p>
            </div>
            
            {/* Mobile footer CTA */}
            <div className="md:hidden">
              <DonateButton 
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full" 
                amount={500}
              >
                Support Our Mission
              </DonateButton>
            </div>
          </div>

          {/* Footer links with better mobile layout */}
          <div className="grid grid-cols-2 md:flex gap-4 md:gap-6 text-sm">
            <Link 
              to="/about" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link 
              to="/impact" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              Our Impact
            </Link>
            <Link 
              to="/events" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link 
              to="/gallery" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>
            <Link 
              to="/stories" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              Stories
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-primary transition-colors py-2 md:py-0" 
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </div>

          {/* Additional footer info */}
          <div className="text-center md:text-left pt-6 border-t border-muted/20">
            <p className="text-xs text-muted">
              Registered as a Section 8 Company in India and trusted by communities across multiple states.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


