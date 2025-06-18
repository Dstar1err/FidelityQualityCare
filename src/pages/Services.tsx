
import React from 'react';
import { Home, Utensils, Pill, Bath, Heart, ShoppingCart, Users, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Light housekeeping',
      description: 'Basic home maintenance to keep a clean and safe environment',
      details: [
        'Surface cleaning',
        'Living space maintenance',
        'General organization',
        'Cleanliness maintenance'
      ]
    },
    {
      icon: Utensils,
      title: 'Meal preparation and feeding assistance',
      description: 'Help with preparing nutritious meals and assistance during meals',
      details: [
        'Menu planning',
        'Balanced meal preparation',
        'Assistance during meals',
        'Dietary restriction compliance'
      ]
    },
    {
      icon: Pill,
      title: 'Medication reminders',
      description: 'Assistance with medication management according to medical prescriptions',
      details: [
        'Medication time reminders',
        'Prescription verification',
        'Pill organizer setup',
        'Treatment monitoring'
      ]
    },
    {
      icon: Bath,
      title: 'Bathing and dressing assistance',
      description: 'Personalized help with hygiene care and daily dressing',
      details: [
        'Bathing assistance',
        'Dressing help',
        'Personal hygiene care',
        'Dignity maintenance'
      ]
    },
    {
      icon: Heart,
      title: 'Daily assistance and hygiene',
      description: 'Support for daily living activities and personal care',
      details: [
        'Daily hygiene care',
        'Transfer assistance',
        'Personal activity help',
        'Caring companionship'
      ]
    },
    {
      icon: ShoppingCart,
      title: 'Shopping and errands',
      description: 'Accompaniment for shopping and necessary outings',
      details: [
        'Grocery shopping',
        'Essential purchases',
        'Appointment accompaniment',
        'Recreational outings'
      ]
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Qualified staff',
      description: 'Experienced and trained caregivers specialized in elderly care'
    },
    {
      icon: Clock,
      title: 'Flexible schedule',
      description: 'Services adapted to your needs, 24/7'
    },
    {
      icon: Heart,
      title: 'Personalized approach',
      description: 'Care plan adapted to each person\'s specific needs'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Home Care Services
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Fidelity Quality Care offers a comprehensive range of services to help elderly 
              and those in need maintain their independence and quality of life at home.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Home Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer personalized services to meet the unique needs of each individual
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="text-teal-600 mb-4">
                    <service.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Clock className="h-16 w-16 text-amber-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Availability and Flexibility
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Our caregivers are available according to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-teal-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">24/7</h3>
              <p className="text-teal-100">Service available at any time</p>
            </div>
            <div className="bg-teal-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">7 days a week</h3>
              <p className="text-teal-100">Every day of the week</p>
            </div>
            <div className="bg-teal-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Minimum 4 hours</h3>
              <p className="text-teal-100">Minimum duration per visit</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us for a free assessment of your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
            >
              Request an assessment
            </a>
            <a
              href="tel:208-613-8538"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
            >
              Call: 208-613-8538
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
