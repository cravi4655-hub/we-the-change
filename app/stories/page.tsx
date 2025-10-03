import StoriesGrid, { type StoryItem } from "../components/StoriesGrid";

const stories: StoryItem[] = [
  {
    id: "school-1",
    title: "Voices at Sunrise High",
    location: "Pune, Maharashtra",
    quote: "I learned I’m not alone—talking about periods is strength.",
    cover: { src: "/window.svg", alt: "Students in workshop", width: 800, height: 600 },
    photos: [
      { src: "/next.svg", alt: "Group activity", width: 800, height: 600 },
      { src: "/globe.svg", alt: "Session poster", width: 800, height: 600 }
    ],
    category: "Schools"
  },
  {
    id: "workshop-1",
    title: "Community Health Workshop",
    location: "Bhubaneswar, Odisha",
    quote: "We broke myths together and built confidence.",
    cover: { src: "/file.svg", alt: "Workshop circle", width: 800, height: 600 },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Workshops"
  },
  {
    id: "entre-1",
    title: "Red Dignity Entrepreneurs",
    location: "Ranchi, Jharkhand",
    quote: "Selling pads became our path to independence.",
    cover: { src: "/vercel.svg", alt: "Entrepreneurship showcase", width: 800, height: 600 },
    photos: [
      { src: "/next.svg", alt: "Product table", width: 800, height: 600 },
      { src: "/globe.svg", alt: "Community meeting", width: 800, height: 600 }
    ],
    category: "Entrepreneurship"
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




