import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { incrementFamiliesCount } from '../services/statsService';

const AssignRequest = () => {
  const [searchParams] = useSearchParams();
  const [assigned, setAssigned] = useState(false);
  
  const name = searchParams.get('name') || 'Client';
  const email = searchParams.get('email') || '';
  
  useEffect(() => {
    // Increment families count when the page loads
    incrementFamiliesCount();
    setAssigned(true);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request Assignment
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Thank you for taking charge of this request.
            </p>
          </div>
        </div>
      </section>

      {/* Assignment Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-blue-500 mx-auto" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Assigned Successfully!
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              You have taken charge of the request from <strong>{name}</strong> ({email}).
              This client has been added to your "Families Served" statistics.
            </p>
            
            <p className="text-gray-600 mb-8">
              Please contact the client as soon as possible to arrange the requested services.
            </p>
            
            <div className="mt-8">
              <Link
                to="/"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
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

export default AssignRequest;
