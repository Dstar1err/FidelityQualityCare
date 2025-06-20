// Types for testimonials
export interface Testimonial {
  id: number;
  name: string;
  relation: string;
  rating: number;
  text: string;
  service: string;
  date: Date;
}

// Local storage key
const TESTIMONIALS_STORAGE_KEY = 'fidelity_testimonials';

// Import the stats service
import { getStats,getFormattedYearsOfExperience } from './statsService';

// Initial testimonials data
const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Johnson',
    relation: 'Daughter of Mrs. Johnson (85 years old)',
    rating: 5,
    text: 'Fidelity Quality Care has transformed my mother\'s life. Their caregivers are not only professional but also very caring. My mother feels safe and happy at home.',
    service: 'Comprehensive home care',
    date: new Date('2025-05-10')
  }
];

/**
 * Initialize localStorage with default testimonials if empty
 */
const initializeStorage = (): void => {
  if (!localStorage.getItem(TESTIMONIALS_STORAGE_KEY)) {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(initialTestimonials));
  }
};

/**
 * Get all testimonials from localStorage
 */
export const getTestimonials = (): Testimonial[] => {
  initializeStorage();
  const testimonialsJson = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  const testimonials = JSON.parse(testimonialsJson || '[]');
  
  // Convert string dates back to Date objects
  return testimonials.map((testimonial: any) => ({
    ...testimonial,
    date: new Date(testimonial.date)
  }));
};

/**
 * Add a new testimonial to localStorage
 */
export const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date'>): Testimonial => {
  const testimonials = getTestimonials();
  
  // Create new testimonial with ID and date
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1,
    date: new Date()
  };
  
  // Add to array and save to localStorage
  testimonials.push(newTestimonial);
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
  
  return newTestimonial;
};

/**
 * Get satisfaction rate based on testimonials
 */
export const getSatisfactionRate = (): number => {
  const testimonials = getTestimonials();
  
  // Calculate satisfaction rate
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return testimonials.length > 0 
    ? Math.round((totalRating / (testimonials.length * 5)) * 100) 
    : 98; // Default value if no testimonials
};

/**
 * Calculate statistics based on testimonials
 */
export const calculateStats = () => {
  const testimonials = getTestimonials();
  const stats = getStats();
  
  // Get satisfaction rate
  const satisfactionRate = getSatisfactionRate();
  
  return [
    { number: `${satisfactionRate}%`, label: 'Satisfaction rate' },
    { number: `${stats.familiesCount}+`, label: 'Families helped' },
    { number: '24/7', label: 'Support available' },
    { id: 'experience', number: getFormattedYearsOfExperience(), label: 'Years of experience' }
  ];
};
