
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold text-teal-400 mb-4">
              Fidelity Quality Care
            </h3>
            <p className="text-gray-300 mb-4">
              Quality home care services for elderly and those in need. 
              We provide reliable and compassionate assistance.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-400 mr-3" />
                <span>208-613-8538</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-400 mr-3" />
                <span>fidelityqualitycare@mail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-teal-400 mr-3" />
                <span>At home, hospital or facility</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Light housekeeping</li>
              <li>Meal preparation</li>
              <li>Medication assistance</li>
              <li>Bathing and dressing help</li>
              <li>Toileting assistance</li>
              <li>Shopping and errands</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Availability</h4>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-teal-400 mr-3 mt-1" />
              <div>
                <p className="text-gray-300">24 hours a day</p>
                <p className="text-gray-300">7 days a week</p>
                <p className="text-gray-300 text-sm mt-2">
                  Minimum 4 hours per visit
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fidelity Quality Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
