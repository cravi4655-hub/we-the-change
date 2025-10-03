'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  PencilIcon, 
  PhotoIcon, 
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  EyeIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface AdminStats {
  totalStories: number;
  totalEvents: number;
  totalPrograms: number;
  totalImages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalStories: 12,
    totalEvents: 8,
    totalPrograms: 4,
    totalImages: 45
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const adminSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: ChartBarIcon,
      description: 'Overview of your content'
    },
    {
      id: 'homepage',
      title: 'Homepage',
      icon: PencilIcon,
      description: 'Edit homepage content'
    },
    {
      id: 'programs',
      title: 'Programs',
      icon: DocumentTextIcon,
      description: 'Manage program details'
    },
    {
      id: 'stories',
      title: 'Stories',
      icon: UserGroupIcon,
      description: 'Add/edit success stories'
    },
    {
      id: 'events',
      title: 'Events',
      icon: CalendarIcon,
      description: 'Manage events and workshops'
    },
    {
      id: 'gallery',
      title: 'Gallery',
      icon: PhotoIcon,
      description: 'Upload and manage images'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: CogIcon,
      description: 'Website settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">We The Change CMS</h1>
              <p className="text-gray-600 mt-1">Manage your website content easily</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <HomeIcon className="w-4 h-4" />
                Back to Website
              </Link>
              <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Stories</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStories}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Programs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPrograms}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <PhotoIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto space-x-4 px-6">
              {adminSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === section.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <section.icon className="w-5 h-5" />
                    {section.title}
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'homepage' && <HomepageEditor />}
            {activeTab === 'programs' && <ProgramsEditor />}
            {activeTab === 'stories' && <StoriesEditor />}
            {activeTab === 'events' && <EventsEditor />}
            {activeTab === 'gallery' && <GalleryEditor />}
            {activeTab === 'settings' && <SettingsEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Welcome to We The Change CMS</h2>
      <p className="text-gray-600">
        Use this panel to manage all your website content. You can edit homepage content, 
        manage programs, add success stories, update events, and more.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Actions</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Add new success story</li>
            <li>• Update program details</li>
            <li>• Upload event photos</li>
            <li>• Edit homepage slider</li>
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Recent Updates</h3>
          <ul className="space-y-2 text-green-800">
            <li>• Updated Paint Me Red program</li>
            <li>• Added 3 new success stories</li>
            <li>• Uploaded event photos</li>
            <li>• Updated contact information</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">📝 How to Use This CMS</h3>
        <ol className="space-y-2 text-yellow-900 list-decimal list-inside">
          <li><strong>Homepage:</strong> Edit slider images and mission statement</li>
          <li><strong>Programs:</strong> Update program descriptions and details</li>
          <li><strong>Stories:</strong> Add or edit success stories and testimonials</li>
          <li><strong>Events:</strong> Manage upcoming and past events</li>
          <li><strong>Gallery:</strong> Upload and organize photos</li>
          <li><strong>Settings:</strong> Update contact info and other settings</li>
        </ol>
      </div>
    </div>
  );
}

// Homepage Editor Component
function HomepageEditor() {
  const [sliderImages, setSliderImages] = useState([
    { id: 1, caption: 'Empowering women through education', active: true },
    { id: 2, caption: 'Community workshops making a difference', active: true },
    { id: 3, caption: 'Sustainable menstrual health solutions', active: true }
  ]);

  const [missionStatement, setMissionStatement] = useState(
    'Empowering women and girls through comprehensive menstrual health education, sustainable hygiene solutions, and community-driven initiatives that break taboos and create lasting change.'
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Homepage Content Editor</h2>
      
      {/* Hero Slider */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Slider Captions</h3>
        <p className="text-sm text-gray-600 mb-4">Edit the captions for your homepage slider images. Images are fetched automatically from Unsplash.</p>
        <div className="space-y-4">
          {sliderImages.map((image, index) => (
            <div key={image.id} className="p-4 bg-white rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slide {index + 1} Caption
                  </label>
                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) => {
                      const newImages = [...sliderImages];
                      newImages[index].caption = e.target.value;
                      setSliderImages(newImages);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Image caption"
                  />
                </div>
                <button className="text-red-600 hover:text-red-800 mt-6">Remove</button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary">
            + Add New Slide
          </button>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission Statement</h3>
        <textarea
          value={missionStatement}
          onChange={(e) => setMissionStatement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          placeholder="Enter your mission statement..."
        />
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          Update Mission
        </button>
      </div>

      {/* Impact Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Statistics</h3>
        <p className="text-sm text-gray-600 mb-4">Update your impact numbers to reflect the latest data.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pads Distributed</label>
            <input
              type="number"
              defaultValue="385000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Menstruators Educated</label>
            <input
              type="number"
              defaultValue="85000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Community Trainers</label>
            <input
              type="number"
              defaultValue="200"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CO2 Avoided (Metric Tons)</label>
            <input
              type="number"
              step="0.01"
              defaultValue="11.55"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          Update Statistics
        </button>
      </div>
    </div>
  );
}

// Programs Editor Component
function ProgramsEditor() {
  const [programs, setPrograms] = useState([
    {
      id: 'paint-me-red',
      title: '#PaintMeRed',
      summary: 'Breaking menstrual taboos through art, storytelling, and community engagement to normalize conversations about periods.',
      description: 'Detailed program description...'
    },
    {
      id: 'red-waste',
      title: '#RedWaste',
      summary: 'Sustainable menstrual waste management solutions promoting environmental responsibility and proper disposal practices.',
      description: 'Detailed program description...'
    },
    {
      id: 'train-the-trainer',
      title: 'Train The Trainer',
      summary: 'Empowering local leaders with comprehensive training to become menstrual health advocates in their communities.',
      description: 'Detailed program description...'
    },
    {
      id: 'project-sachet',
      title: 'Project Sachet',
      summary: 'Innovative sachet-based menstrual hygiene solutions making sustainable products accessible to all communities.',
      description: 'Detailed program description...'
    }
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Programs Management</h2>
      
      {programs.map((program) => (
        <div key={program.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
            <Link 
              to={`/programs/${program.id}`}
              className="text-primary hover:text-primary/80 text-sm"
            >
              View Page →
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary (Short description for homepage)</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
                defaultValue={program.summary}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description (For program detail page)</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
                defaultValue={program.description}
              />
            </div>

            <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
              Update {program.title}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Stories Editor Component
function StoriesEditor() {
  const [stories, setStories] = useState([
    { id: 1, name: 'Priya Sharma', age: 16, location: 'Mumbai, Maharashtra', story: 'After attending the workshop, I learned to manage my periods confidently...' },
    { id: 2, name: 'Anjali Devi', age: 24, location: 'Patna, Bihar', story: 'The reusable pads have changed my life completely...' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Success Stories</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          + Add New Story
        </button>
      </div>
      
      {stories.map((story) => (
        <div key={story.id} className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                defaultValue={story.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                defaultValue={story.age}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                defaultValue={story.location}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Story</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              defaultValue={story.story}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
              Update Story
            </button>
            <button className="text-red-600 hover:text-red-800 px-4 py-2">
              Delete Story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Events Editor Component
function EventsEditor() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Menstrual Health Workshop', date: '2025-11-15', location: 'Mumbai, Maharashtra', type: 'upcoming' },
    { id: 2, title: 'Community Awareness Drive', date: '2025-10-20', location: 'Delhi', type: 'past' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Events Management</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          + Add New Event
        </button>
      </div>
      
      {events.map((event) => (
        <div key={event.id} className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
              <input
                type="text"
                defaultValue={event.title}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                defaultValue={event.date}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                defaultValue={event.location}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select
              defaultValue={event.type}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
              Update Event
            </button>
            <button className="text-red-600 hover:text-red-800 px-4 py-2">
              Delete Event
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Gallery Editor Component
function GalleryEditor() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Image Gallery</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          + Upload Images
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-gray-600 mb-4">Upload and manage your gallery images here.</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
          <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF (Max 5MB per image)</p>
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:opacity-90">
            Browse Files
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Editor Component
function SettingsEditor() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Website Settings</h2>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="info@wethechangeindia.org"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="+91 98765 43210"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              defaultValue="Plot No. 17, Jalvayu Vihar, Sector - 25, Hiranandani Estate, Thane West, Mumbai - 400607"
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          Update Contact Info
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://instagram.com/yourpage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
            <input
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://linkedin.com/company/yourpage"
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          Update Social Links
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Gateway</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Razorpay Key ID</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="rzp_test_xxxxx"
              defaultValue="rzp_test_YOUR_KEY_HERE"
            />
          </div>
        </div>
        <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90">
          Update Payment Settings
        </button>
      </div>
    </div>
  );
}

