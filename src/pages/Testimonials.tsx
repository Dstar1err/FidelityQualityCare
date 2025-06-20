
import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart, Users } from 'lucide-react';
import { getTestimonials, addTestimonial as saveTestimonial, calculateStats, Testimonial } from '../services/testimonialService';

// Custom hook for managing testimonials and satisfaction statistics
const useTestimonials = () => {
  // State for testimonials and stats
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState(calculateStats());

  // Load testimonials from localStorage on component mount
  useEffect(() => {
    const loadedTestimonials = getTestimonials();
    setTestimonials(loadedTestimonials);
    setStats(calculateStats());
  }, []);

  // Function to add a new testimonial
  const addTestimonial = (newTestimonial: Omit<Testimonial, 'id' | 'date'>) => {
    const savedTestimonial = saveTestimonial(newTestimonial);
    setTestimonials([...testimonials, savedTestimonial]);
    setStats(calculateStats());
  };

  return {
    testimonials,
    stats,
    addTestimonial
  };
};

const Testimonials = () => {
  // Use our custom hook
  const { testimonials, stats, addTestimonial } = useTestimonials();
  
  // Form state
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id' | 'date'>>({ 
    name: '',
    relation: '',
    rating: 0,
    text: '',
    service: ''
  });
  
  // Temporary rating for the hover effect
  const [hoverRating, setHoverRating] = useState(0);
  
  // State for confirmation message
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.text && newTestimonial.rating > 0) {
      addTestimonial(newTestimonial);
      // Reset form
      setNewTestimonial({
        name: '',
        relation: '',
        rating: 0,
        text: '',
        service: ''
      });
      
      // Afficher le message de confirmation
      setShowConfirmation(true);
      
      // Masquer le message après 5 secondes
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    }
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTestimonial({
      ...newTestimonial,
      [name]: value
    });
  };
  
  // Handle star rating selection
  const handleRatingClick = (rating: number) => {
    setNewTestimonial({
      ...newTestimonial,
      rating
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Client Testimonials
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Discover how Fidelity Quality Care has made a difference in the lives 
              of our clients and their families.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each testimonial reflects our commitment to excellence and compassion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                {/* Quote Icon */}
                <div className="text-teal-600 mb-4">
                  <Quote className="h-8 w-8" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                {/* Service */}
                <div className="mb-4">
                  <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
                
                {/* Author */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.relation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl text-white p-8 md:p-12">
            <div className="text-center">
              <Heart className="h-16 w-16 text-amber-300 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Trust, Our Priority
              </h2>
              <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
                For over 10 years, we have been building trust relationships with our clients 
                and their families. Every day, we strive to earn this trust 
                through our professionalism and compassion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                >
                  Join Our Satisfied Clients
                </a>
                <a
                  href="tel:208-613-8918"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-200"
                >
                  208-613-8918
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600">
              A simple process to start your care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Free Assessment
              </h3>
              <p className="text-gray-600">
                We visit your home to assess your needs and create a personalized plan
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Caregiver Selection
              </h3>
              <p className="text-gray-600">
                We assign a qualified caregiver who matches your needs and personality
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Care Begins
              </h3>
              <p className="text-gray-600">
                Your caregiver begins providing compassionate care according to your personalized plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Submission Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-xl text-gray-600">
              Your feedback helps us improve and inspires others
            </p>
          </div>
          
          {showConfirmation && (
            <div className="mb-6 bg-teal-100 border-l-4 border-teal-600 p-4 rounded-md animate-fade-in">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-teal-800">
                    Merci pour votre témoignage ! Il a été ajouté avec succès.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newTestimonial.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="relation" className="block text-gray-700 font-medium mb-2">
                Relationship to Client (e.g., "Client", "Daughter of client")
              </label>
              <input
                type="text"
                id="relation"
                name="relation"
                value={newTestimonial.relation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                Service Received
              </label>
              <select
                id="service"
                name="service"
                value={newTestimonial.service}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Select a service</option>
                <option value="Comprehensive home care">Comprehensive home care</option>
                <option value="Post-hospital assistance">Post-hospital assistance</option>
                <option value="Specialized dementia care">Specialized dementia care</option>
                <option value="Daily assistance">Daily assistance</option>
                <option value="Monitoring and assistance">Monitoring and assistance</option>
                <option value="Multiple services">Multiple services</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Your Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                    
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        (hoverRating || newTestimonial.rating) >= star 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-600">
                  {newTestimonial.rating > 0 ? `${newTestimonial.rating} star${newTestimonial.rating > 1 ? 's' : ''}` : 'Select a rating'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="text" className="block text-gray-700 font-medium mb-2">
                Your Testimonial
              </label>
              <textarea
                id="text"
                name="text"
                value={newTestimonial.text}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
              >
                Submit Your Testimonial
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Story Starts Here
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the hundreds of families who trust Fidelity Quality Care
          </p>
          <a
            href="/contact"
            className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Users className="h-5 w-5" />
            <span>Get Started Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
