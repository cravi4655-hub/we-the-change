import StoriesGrid, { type StoryItem } from "../components/StoriesGrid";

const stories: StoryItem[] = [
  {
    id: "school-1",
    title: "Voices at Sunrise High",
    location: "Pune, Maharashtra",
    quote: "I learned I'm not alone—talking about periods is strength.",
    cover: { src: "/images/image16.jpg", alt: "Students in workshop", width: 800, height: 600 },
    photos: [
      { src: "/images/image15.jpg", alt: "Group activity", width: 800, height: 600 },
      { src: "/images/image14.jpg", alt: "Session poster", width: 800, height: 600 }
    ],
    category: "Schools"
  },
  {
    id: "workshop-1",
    title: "Community Health Workshop",
    location: "Bhubaneswar, Odisha",
    quote: "We broke myths together and built confidence.",
    cover: { src: "/images/image18.JPG", alt: "Workshop circle", width: 800, height: 600 },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Workshops"
  },
  {
    id: "entre-1",
    title: "Red Dignity Entrepreneurs",
    location: "Ranchi, Jharkhand",
    quote: "Selling pads became our path to independence.",
    cover: { src: "/images/image25.JPG", alt: "Entrepreneurship showcase", width: 800, height: 600 },
    photos: [
      { src: "/images/image24.JPG", alt: "Product table", width: 800, height: 600 },
      { src: "/images/image23.JPG", alt: "Community meeting", width: 800, height: 600 }
    ],
    category: "Entrepreneurship"
  },
  {
    id: "training-1",
    title: "Train The Trainer Program",
    location: "Delhi, India",
    quote: "Empowering educators to become menstrual health advocates.",
    cover: { src: "/images/image21.JPG", alt: "Training session", width: 800, height: 600 },
    photos: [
      { src: "/images/image20.JPG", alt: "Group discussion", width: 800, height: 600 },
      { src: "/images/image19.JPG", alt: "Practical session", width: 800, height: 600 }
    ],
    category: "Training"
  },
  {
    id: "awareness-1",
    title: "Breaking Taboos in Rural Communities",
    location: "Rajasthan, India",
    quote: "We created safe spaces for open conversations about menstruation.",
    cover: { src: "/images/image36.jpeg", alt: "Awareness campaign", width: 800, height: 600 },
    photos: [
      { src: "/images/image35.jpeg", alt: "Community meeting", width: 800, height: 600 },
      { src: "/images/image33.jpeg", alt: "Interactive session", width: 800, height: 600 }
    ],
    category: "Awareness"
  },
  {
    id: "field-1",
    title: "Field Implementation Success",
    location: "Assam, India",
    quote: "Direct community engagement that transformed lives.",
    cover: { src: "/images/image40.jpg", alt: "Field work activities", width: 800, height: 600 },
    photos: [
      { src: "/images/image39.jpg", alt: "Community outreach", width: 800, height: 600 },
      { src: "/images/image38.jpg", alt: "Workshop session", width: 800, height: 600 }
    ],
    category: "Field Work"
  },
  {
    id: "youth-1",
    title: "Youth Leadership Initiative",
    location: "Mumbai, Maharashtra",
    quote: "Young leaders are driving change in their communities.",
    cover: { src: "/images/image5.jpg", alt: "Youth program", width: 800, height: 600 },
    photos: [
      { src: "/images/image6.jpg", alt: "Leadership training", width: 800, height: 600 },
      { src: "/images/image7.jpg", alt: "Group activities", width: 800, height: 600 }
    ],
    category: "Youth"
  },
  {
    id: "international-1",
    title: "Global Impact in Kenya",
    location: "Nairobi, Kenya",
    quote: "Expanding our mission to empower women across Africa.",
    cover: { src: "/images/image8.jpg", alt: "International program", width: 800, height: 600 },
    photos: [
      { src: "/images/image9.jpg", alt: "Community engagement", width: 800, height: 600 },
      { src: "/images/image10.JPG", alt: "Training session", width: 800, height: 600 }
    ],
    category: "International"
  },
  {
    id: "environment-1",
    title: "Sustainable Menstrual Health",
    location: "Multiple States, India",
    quote: "Promoting eco-friendly solutions for menstrual hygiene.",
    cover: { src: "/images/image20.JPG", alt: "Environmental initiative", width: 800, height: 600 },
    photos: [
      { src: "/images/image21.JPG", alt: "Sustainability workshop", width: 800, height: 600 },
      { src: "/images/image22.JPG", alt: "Community discussion", width: 800, height: 600 }
    ],
    category: "Environment"
  },
  {
    id: "distribution-1",
    title: "Last Mile Distribution",
    location: "Jharkhand, India",
    quote: "Ensuring menstrual hygiene products reach every woman.",
    cover: { src: "/images/image12.JPG", alt: "Distribution program", width: 800, height: 600 },
    photos: [
      { src: "/images/image11.JPG", alt: "Product distribution", width: 800, height: 600 },
      { src: "/images/image13.jpg", alt: "Community support", width: 800, height: 600 }
    ],
    category: "Distribution"
  }
];

export default function StoriesPage() {
  return (
    <section className="bg-bg">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Stories of Change</h1>
          <p className="text-muted max-w-2xl mx-auto">Photos and videos from our schools, workshops, and entrepreneurship programs.</p>
        </div>
        <StoriesGrid items={stories} />
      </div>
    </section>
  );
}




