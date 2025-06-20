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
  },
  {
    id: 2,
    name: 'John Martin',
    relation: 'Client (78 years old)',
    rating: 5,
    text: 'After my accident, I needed help with daily tasks. The Fidelity team helped me regain my independence gradually. Their patience and professionalism are remarkable.',
    service: 'Post-hospital assistance',
    date: new Date('2025-05-15')
  },
  {
    id: 3,
    name: 'Sophie Wilson',
    relation: 'Wife of Mr. Wilson (82 years old)',
    rating: 5,
    text: 'My husband suffers from dementia and I was exhausted. Thanks to Fidelity Quality Care, I can have moments of respite knowing he is in good hands. Their compassion makes all the difference.',
    service: 'Specialized dementia care',
    date: new Date('2025-05-20')
  },
  {
    id: 4,
    name: 'Paul Davis',
    relation: 'Son of Mr. Davis (90 years old)',
    rating: 5,
    text: 'Dad was reluctant to accept help, but the Fidelity team was able to gain his trust. Now he looks forward to his caregiver\'s visits. Thank you for your professionalism.',
    service: 'Daily assistance',
    date: new Date('2025-05-25')
  },
  {
    id: 5,
    name: 'Lucy Brown',
    relation: 'Daughter of Mrs. Brown (79 years old)',
    rating: 5,
    text: 'My mother lives alone and I live far away. Fidelity Quality Care gives me peace of mind by taking care of her with such care. They regularly keep me informed of her condition.',
    service: 'Monitoring and assistance',
    date: new Date('2025-06-01')
  },
  {
    id: 6,
    name: 'Robert Miller',
    relation: 'Client (75 years old)',
    rating: 5,
    text: 'I highly recommend Fidelity Quality Care. Their help with meals, medications and housekeeping allows me to stay home safely. The staff is wonderful.',
    service: 'Multiple services',
    date: new Date('2025-06-05')
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
