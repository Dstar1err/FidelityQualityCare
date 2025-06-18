
import React from 'react';
import { Star, Quote, Heart, Users } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Marie Johnson',
      relation: 'Daughter of Mrs. Johnson (85 years old)',
      rating: 5,
      text: 'Fidelity Quality Care has transformed my mother\'s life. Their caregivers are not only professional but also very caring. My mother feels safe and happy at home.',
      service: 'Comprehensive home care'
    },
    {
      name: 'John Martin',
      relation: 'Client (78 years old)',
      rating: 5,
      text: 'After my accident, I needed help with daily tasks. The Fidelity team helped me regain my independence gradually. Their patience and professionalism are remarkable.',
      service: 'Post-hospital assistance'
    },
    {
      name: 'Sophie Wilson',
      relation: 'Wife of Mr. Wilson (82 years old)',
      rating: 5,
      text: 'My husband suffers from dementia and I was exhausted. Thanks to Fidelity Quality Care, I can have moments of respite knowing he is in good hands. Their compassion makes all the difference.',
      service: 'Specialized dementia care'
    },
    {
      name: 'Paul Davis',
      relation: 'Son of Mr. Davis (90 years old)',
      rating: 5,
      text: 'Dad was reluctant to accept help, but the Fidelity team was able to gain his trust. Now he looks forward to his caregiver\'s visits. Thank you for your professionalism.',
      service: 'Daily assistance'
    },
    {
      name: 'Lucy Brown',
      relation: 'Daughter of Mrs. Brown (79 years old)',
      rating: 5,
      text: 'My mother lives alone and I live far away. Fidelity Quality Care gives me peace of mind by taking care of her with such care. They regularly keep me informed of her condition.',
      service: 'Monitoring and assistance'
    },
    {
      name: 'Robert Miller',
      relation: 'Client (75 years old)',
      rating: 5,
      text: 'I highly recommend Fidelity Quality Care. Their help with meals, medications and housekeeping allows me to stay home safely. The staff is wonderful.',
      service: 'Multiple services'
    }
  ];

  const stats = [
    { number: '98%', label: 'Satisfaction rate' },
    { number: '500+', label: 'Families helped' },
    { number: '24/7', label: 'Availability' },
    { number: '10+', label: 'Years of experience' }
  ];

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
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
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
