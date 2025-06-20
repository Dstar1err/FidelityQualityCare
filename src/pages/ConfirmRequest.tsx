import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { incrementFamiliesCountInSupabase } from '../services/supabaseService';
import { useSupabaseInit } from '../hooks/useSupabase';

const ConfirmRequest = () => {
  const [searchParams] = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const name = searchParams.get('name') || 'Client';
  const email = searchParams.get('email') || '';
  
  // Initialize Supabase
  const { isLoading: isInitializing, error: initError } = useSupabaseInit();
  
  useEffect(() => {
    if (isInitializing || initError) return;
    
    const updateStats = async () => {
      try {
        // Increment the families helped counter
        await incrementFamiliesCountInSupabase();
        setConfirmed(true);
      } catch (err) {
        console.error('Error updating stats:', err);
        setError('Unable to update statistics, but your confirmation has been recorded.');
        setConfirmed(true); // Still mark as confirmed even if stats update fails
      }
    };
    
    updateStats();
  }, [isInitializing, initError]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request Confirmation
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Thank you for confirming this request.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Confirmed Successfully!
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You have confirmed the request from <strong>{name}</strong> ({email}).
              This client has been added to your "Families Helped" statistics.
            </p>
            
            <p className="text-gray-600 mb-8">
              Our team will follow up with the client to provide the requested services.
            </p>
            
            <div className="mt-8">
              <Link
                to="/"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmRequest;
