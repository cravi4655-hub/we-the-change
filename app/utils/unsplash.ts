/// <reference types="vite/client" />

import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '',
});

// Updated interface to match the new code
export interface UnsplashImage {
  id: string;
  urls: { 
    small: string; 
    regular: string; 
    full: string;
    thumb: string; // Keep this for compatibility
  };
  alt_description: string | null;
  color?: string | null; // hex like "#aabbcc" returned by Unsplash
  user: {
    name: string;
    username: string;
  };
  links: {
    download_location: string;
  };
}

// Brand palette (tune as needed)
const BRAND = {
  primary: "#B3202E",   // maroon
  coral:   "#F28B82",
  teal:    "#008080",
  yellow:  "#FFD166",
};

// Convert hex to rgb
const hexToRgb = (hex?: string) => {
  if (!hex) return { r: 255, g: 255, b: 255 };
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
};

// Simple color distance for ranking (lower is closer)
const colorDistance = (a?: string, b?: string) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  const dr = A.r - B.r, dg = A.g - B.g, db = A.b - B.b;
  return Math.sqrt(dr*dr + dg*dg + db*db);
};

// Preferred Unsplash color filter per program
const programColorFilter: Record<string, ("red"|"teal"|"yellow"|"orange")> = {
  "paint-me-red": "red",
  "red-waste": "teal",
  "train-the-trainer": "yellow",
  "project-sachet": "teal",
};

// Updated queries for artistic, non-human content
const programQueries: Record<string, string[]> = {
  "paint-me-red": [
    "abstract red art painting",
    "colorful paint splashes red",
    "artistic brush strokes red",
    "abstract geometric red design",
    "red paint texture abstract",
    "colorful art supplies red",
    "abstract red canvas art",
    "red artistic background pattern"
  ],
  "red-waste": [
    "eco friendly green packaging",
    "sustainable recycling symbols",
    "green environmental icons",
    "eco waste management graphics",
    "sustainable materials abstract",
    "green recycling concept art",
    "environmental protection graphics",
    "eco friendly design elements"
  ],
  "train-the-trainer": [
    "education books learning",
    "workshop materials abstract",
    "learning concept graphics",
    "educational tools illustration",
    "knowledge sharing graphics",
    "training materials design",
    "education concept art",
    "learning resources illustration"
  ],
  "project-sachet": [
    "medical supplies packaging",
    "healthcare kit design",
    "hygiene products graphics",
    "medical packaging abstract",
    "healthcare supplies illustration",
    "sanitary products design",
    "medical kit graphics",
    "healthcare packaging art"
  ],
};

// Keywords we like to see in alt/tags to keep results relevant
const mustMatchHints = [
  "women","girls","community","workshop","school","ngo","training","health","menstrual","hygiene","rural","india"
];

// Your existing searchImages function with options
export async function searchImages(
  query: string, 
  count: number = 6, 
  opts?: { orientation?: "landscape"|"portrait"|"squarish"; color?: string; content_filter?: "high"|"low" }
): Promise<UnsplashImage[]> {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: opts?.orientation ?? "landscape",
      color: opts?.color as any,
      contentFilter: opts?.content_filter ?? "high",
    });

    if (response.errors) {
      console.error('Unsplash API errors:', response.errors);
      return [];
    }

    return (response.response?.results || []) as UnsplashImage[];
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

// Add this function to search specific collections
export async function searchArtisticImages(query: string, count: number = 6): Promise<UnsplashImage[]> {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: 'landscape',
      color: 'red', // or 'teal', 'yellow' based on program
      contentFilter: 'high',
      // Add these filters for better artistic results
      orderBy: 'relevant',
    });

    if (response.errors) {
      console.error('Unsplash API errors:', response.errors);
      return [];
    }

    return (response.response?.results || []) as UnsplashImage[];
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

function rankToBrandPalette(images: UnsplashImage[]): UnsplashImage[] {
  const targets = [BRAND.primary, BRAND.coral, BRAND.teal, BRAND.yellow];
  return images
    .map(img => {
      const d = Math.min(...targets.map(t => colorDistance(img.color || undefined, t)));
      return { img, score: d };
    })
    .sort((a,b) => a.score - b.score)
    .map(x => x.img);
}

function isRelevant(img: UnsplashImage): boolean {
  const s = (img.alt_description || "").toLowerCase();
  // require at least one hint to avoid random studio/product shots
  return mustMatchHints.some(h => s.includes(h));
}

async function getProgramSet(
  program: string,
  queries: string[],
  color: "red"|"teal"|"yellow"|"orange",
  searchFn: (q:string, n:number, opts?: any)=>Promise<UnsplashImage[]>,
  need = 3
): Promise<UnsplashImage[]> {
  const collected: UnsplashImage[] = [];
  for (const q of queries) {
    if (collected.length >= need) break;
    const batch = await searchFn(q, need, { orientation: "landscape", color, content_filter: "high" });
    const filtered = rankToBrandPalette(batch).filter(isRelevant);
    for (const img of filtered) {
      if (!collected.find(x => x.id === img.id)) collected.push(img);
      if (collected.length >= need) break;
    }
  }
  return collected;
}

// Enhanced getProgramImages function
export async function getProgramImages(): Promise<Record<string, UnsplashImage[]>> {
  const images: Record<string, UnsplashImage[]> = {};

  for (const [program, queries] of Object.entries(programQueries)) {
    // shuffle queries so results vary but stay on-theme
    const shuffled = [...queries].sort(() => Math.random() - 0.5);
    const color = programColorFilter[program] ?? "red";
    const set = await getProgramSet(program, shuffled, color, searchImages, 3);

    // If still sparse, relax relevance filter with broader helper queries
    if (set.length < 3) {
      const backup = await getProgramSet(
        program,
        [ `${shuffled[0]} people`, `${shuffled[0]} candid`, `${program.replace(/-/g," ")} India` ],
        color,
        searchImages,
        3 - set.length
      );
      images[program] = [...set, ...backup].slice(0,3);
    } else {
      images[program] = set;
    }
  }

  return images;
}

// Fetch images for the impact slider
export async function fetchUnsplashImages(query: string, count: number = 5): Promise<UnsplashImage[]> {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: 'landscape',
      orderBy: 'relevant'
    });

    if (response.type === 'success') {
      return response.response.results.map(photo => ({
        id: photo.id,
        urls: {
          small: photo.urls.small,
          regular: photo.urls.regular,
          full: photo.urls.full,
          thumb: photo.urls.thumb
        },
        alt_description: photo.alt_description,
        color: photo.color,
        user: {
          name: photo.user.name,
          username: photo.user.username
        },
        links: {
          download_location: photo.links.download_location
        }
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
}

// Track downloads for production compliance
export async function trackDownload(downloadUrl: string): Promise<void> {
  try {
    await fetch(downloadUrl);
  } catch (error) {
    console.error('Error tracking download:', error);
  }
}
