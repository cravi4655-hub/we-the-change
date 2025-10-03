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

  return (
    <div className="antialiased bg-bg text-text font-sans">
      <header className="w-full bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60 border-b border-muted/20">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-semibold text-primary">We The Change</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/impact" className="hover:text-primary">Impact</Link>
            <Link to="/get-involved" className="hover:text-primary">Get Involved</Link>
            <Link to="/events" className="hover:text-primary">Events</Link>
            <Link to="/gallery" className="hover:text-primary">Gallery</Link>
            <Link to="/stories" className="hover:text-primary">Stories</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DonateButton className="text-xs" amount={500}>Donate</DonateButton>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary hover:text-primary/80"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <DonateButton className="hidden md:inline-flex text-sm" amount={500}>Donate Now</DonateButton>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-bg/95 backdrop-blur border-t border-muted/20">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link to="/" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/impact" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Impact</Link>
              <Link to="/get-involved" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Get Involved</Link>
              <Link to="/events" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              <Link to="/gallery" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/stories" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
              <Link to="/contact" className="hover:text-primary py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} We The Change. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/impact" className="hover:text-primary">Impact</Link>
            <Link to="/events" className="hover:text-primary">Events</Link>
            <Link to="/gallery" className="hover:text-primary">Gallery</Link>
            <Link to="/stories" className="hover:text-primary">Stories</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


