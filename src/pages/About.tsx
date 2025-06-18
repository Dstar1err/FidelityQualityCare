
import React from 'react';
import { Heart, Shield, Users, Award, CheckCircle, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We treat each person with empathy, respect and dignity'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'A trusted service you can count on in any circumstance'
    },
    {
      icon: Users,
      title: 'Excellence',
      description: 'We strive to exceed expectations in all our services'
    },
    {
      icon: Award,
      title: 'Professionalism',
      description: 'Qualified staff trained to the highest standards'
    }
  ];

  const achievements = [
    'Over 10 years of experience in home care',
    'Certified and regularly trained staff',
    'Service available 24/7',
    'Personalized approach for each client',
    'Partnership with families and healthcare professionals',
    'Commitment to quality and safety'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Fidelity Quality Care
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              For over 10 years, we have been committed to providing 
              exceptional quality home care for elderly and those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Fidelity Quality Care, our mission is to enable elderly people 
                and those in need to maintain their independence and dignity 
                in the comfort of their home.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that every person deserves personalized, compassionate 
                and high-quality care. Our dedicated team works closely 
                with families to create care plans tailored to the unique 
                needs of each individual.
              </p>
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-teal-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Improving quality of life, one person at a time
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 inline-block mb-6">
                  <Heart className="h-12 w-12 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Care with Compassion
                </h3>
                <p className="text-gray-700">
                  We understand the importance of treating each person with the respect, 
                  dignity and compassion they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide each of our actions and interactions with our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 mb-4">
                  <value.icon className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="text-lg text-gray-700 mb-6">
                Fidelity Quality Care was founded with the vision of transforming home care 
                by offering personalized and high-quality service. Our founders recognized 
                the growing need for compassionate care for elderly people who wish 
                to remain in their familiar environment.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Over the years, we have developed a reputation for excellence based on our 
                commitment to quality, reliability and compassion. Our team of qualified 
                professionals shares the same passion for helping others and improving 
                the quality of life of our clients.
              </p>
              <p className="text-lg text-gray-700">
                Today, we continue to evolve and adapt our services to meet the 
                changing needs of our community, while maintaining our commitment to 
                excellence and compassion that defines us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-teal-100">
              What makes us proud of our work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-amber-300 flex-shrink-0" />
                <span className="text-lg">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A team of dedicated professionals, trained and certified to provide 
              the best possible care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Certified Caregivers
              </h3>
              <p className="text-gray-600">
                Qualified staff with ongoing training and up-to-date certifications
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Human Approach
              </h3>
              <p className="text-gray-600">
                Team selected for their human qualities and professionalism
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-12 w-12 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Guaranteed Safety
              </h3>
              <p className="text-gray-600">
                Background checks and comprehensive insurance for your peace of mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Family
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Discover how we can help you and your family
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="tel:208-613-8918"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors duration-200"
            >
              208-613-8918
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
