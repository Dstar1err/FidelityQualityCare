
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Clock, Users, Phone, CheckCircle } from 'lucide-react';
import { getFormattedYearsOfExperience } from '../services/statsService';
import { getStatsFromSupabase, getSatisfactionRateFromSupabase } from '../services/supabaseService';
import { useSupabaseInit } from '../hooks/useSupabase';

const Home = () => {
  // State for dynamic statistics
  const [familiesCount, setFamiliesCount] = useState<number>(95);
  const [satisfactionRate, setSatisfactionRate] = useState<number>(98);
  const [yearsOfExperience, setYearsOfExperience] = useState<string>('6+');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize Supabase
  const { isLoading: isInitializing, error: initError } = useSupabaseInit();
  
  // Load stats from Supabase on component mount
  useEffect(() => {
    if (isInitializing || initError) return;
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const stats = await getStatsFromSupabase();
        const satisfactionRate = await getSatisfactionRateFromSupabase();
        
        setFamiliesCount(stats.familiesCount);
        setSatisfactionRate(satisfactionRate);
        setYearsOfExperience(getFormattedYearsOfExperience());
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Unable to load statistics. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Set up an interval to check for updates
    const interval = setInterval(async () => {
      try {
        const stats = await getStatsFromSupabase();
        const satisfactionRate = await getSatisfactionRateFromSupabase();
        
        setFamiliesCount(stats.familiesCount);
        setSatisfactionRate(satisfactionRate);
        setYearsOfExperience(getFormattedYearsOfExperience());
      } catch (err) {
        console.error('Error updating stats:', err);
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const services = [
    {
      icon: Heart,
      title: 'Personalized care',
      description: 'Care tailored to the specific needs of each person'
    },
    {
      icon: Shield,
      title: 'Trust and safety',
      description: 'Qualified and verified staff for your peace of mind'
    },
    {
      icon: Clock,
      title: 'Available 24/7',
      description: 'Assistance service available at any time, 7 days a week'
    },
    {
      icon: Users,
      title: 'Family support',
      description: 'Support and guidance for families and caregivers'
    }
  ];

  const stats = [
    { number: yearsOfExperience, label: 'Years of experience' },
    { number: `${familiesCount}+`, label: 'Families served' },
    { number: '24h', label: 'Availability' },
    { number: `${satisfactionRate}%`, label: 'Client satisfaction' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Home care
                <span className="block text-teal-200">you can</span>
                <span className="block text-amber-300">trust</span>
              </h1>
              <p className="text-xl text-teal-100 leading-relaxed">
                We provide quality care for you and your family. 
                Personalized services for elderly and those in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 text-center"
                >
                  Free assessment
                </Link>
                <a
                  href="tel:208-613-8918"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-800 transition-colors duration-200 text-center flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  208-613-8918
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-full p-2 shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-200 to-amber-200 opacity-30 animate-pulse"></div>
                <div className="relative p-4 z-10">
                  <img
                    src="/assets/patient-rassurant_1098-10599.avif"
                    alt="Compassionate care"
                    className="w-full h-auto rounded-full object-cover shadow-inner"
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white p-4 rounded-full shadow-lg z-20 transform rotate-12">
                  <span className="font-bold text-sm">Quality Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose Fidelity Quality Care?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional care with compassion and professionalism
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 mb-4">
                  <service.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-teal-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our services include
              </h2>
              <div className="space-y-4">
                {[
                  'Light housekeeping',
                  'Meal preparation and feeding assistance',
                  'Medication reminders',
                  'Bathing and dressing assistance',
                  'Toileting assistance',
                  'Daily assistance and hygiene',
                  'Transfer and mobility assistance',
                  'Shopping and errands'
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{service}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                >
                  View all services
                </Link>
              </div>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 inline-block mb-6">
                  <Clock className="h-12 w-12 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Availability
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Our caregivers are available 24 hours a day, 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Contact us today for a free assessment and discover how we can help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Request an assessment
            </Link>
            <a
              href="tel:208-613-8918"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
