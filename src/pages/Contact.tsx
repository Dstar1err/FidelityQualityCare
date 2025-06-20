
import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { EMAIL_CONFIG } from '../config/emailjs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create form data object
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('service', formData.service || 'Not specified');
      formDataObj.append('message', formData.message);
      
      // Add specific FormSubmit.co options
      formDataObj.append('_subject', 'New Contact Form Submission - Fidelity Quality Care');
      formDataObj.append('_captcha', 'false'); // Disable captcha
      formDataObj.append('_template', 'box'); // Use box template for better formatting
      
      // Create HTML content with action buttons
      const confirmUrl = `${window.location.origin}/confirm?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
      const assignUrl = `${window.location.origin}/assign?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
      
      // Add action buttons to the message
      const actionMessage = `

---

ACTIONS REQUISES:

Cliquez sur l'un des liens ci-dessous pour mettre à jour les statistiques:

1. CONFIRMER LA RÉCEPTION: ${confirmUrl}

2. PRENDRE EN CHARGE: ${assignUrl}
      `;
      
      // Append the action message to the original message
      formDataObj.append('message', formData.message + actionMessage);
      
      // Add HTML content for email body with styled buttons
      const htmlContent = `
        <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 20px;">
          <p style="font-weight: bold; font-size: 16px;">ACTIONS REQUISES:</p>
          <p>Cliquez sur l'un des boutons ci-dessous pour mettre à jour les statistiques:</p>
          <div style="margin-top: 15px;">
            <a href="${confirmUrl}" style="display: inline-block; background-color: #0D9488; color: white; padding: 10px 20px; margin-right: 15px; text-decoration: none; border-radius: 5px; font-weight: bold;">CONFIRMER LA RÉCEPTION</a>
            <a href="${assignUrl}" style="display: inline-block; background-color: #0369A1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">PRENDRE EN CHARGE</a>
          </div>
        </div>
      `;
      formDataObj.append('_message', htmlContent);
      
      // Send the form data
      const response = await fetch(EMAIL_CONFIG.FORM_ENDPOINT, {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('Form submitted successfully!');
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: ''
          });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.error('Failed to send form:', err);
      setError('Failed to send your request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              We're here to answer your questions and help you find 
              the best care for you or your loved one.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Call us for immediate consultation
                    </p>
                    <a 
                      href="tel:208-613-8918" 
                      className="text-teal-600 font-semibold hover:text-teal-700"
                    >
                      208-613-8918
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Send us a message, we respond quickly
                    </p>
                    <a 
                      href="mailto:fidelityqualitycare@gmail.com" 
                      className="text-teal-600 font-semibold hover:text-teal-700"
                    >
                      fidelityqualitycare@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Service Area
                    </h3>
                    <p className="text-gray-600">
                      Services at home, hospital, or specialized facilities
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Availability
                    </h3>
                    <p className="text-gray-600">
                      24 hours a day, 7 days a week
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Urgent Need?
                </h3>
                <p className="text-amber-700 mb-4">
                  For urgent situations, contact us immediately
                </p>
                <a
                  href="tel:208-613-8918"
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Free Assessment Request
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Thank you for your request!
                  </h3>
                  <p className="text-green-700">
                    We will contact you as soon as possible to schedule your free assessment.
                  </p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center mb-6">
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    Error
                  </h3>
                  <p className="text-red-700 mb-4">
                    {error}
                  </p>
                  <button 
                    onClick={() => setError('')}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  action={EMAIL_CONFIG.FORM_ENDPOINT}
                  method="POST"
                >
                  {/* Hidden fields for FormSubmit.co configuration */}
                  <input type="hidden" name="_subject" value="New Contact Form - Fidelity Quality Care" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="box" />
                  <input type="hidden" name="_next" value={window.location.href} />
                  <input type="hidden" name="_autoresponse" value="Merci pour votre message. Notre équipe vous contactera sous peu." />
                
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="housekeeping">Light housekeeping</option>
                      <option value="meals">Meal preparation</option>
                      <option value="medication">Medication reminders</option>
                      <option value="bathing">Bathing assistance</option>
                      <option value="personal">Personal care assistance</option>
                      <option value="errands">Shopping and errands</option>
                      <option value="complete">Complete care service</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Describe your needs or ask your questions..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Request</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    * Required fields. We will contact you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the free assessment work?
              </h3>
              <p className="text-gray-600">
                We send a qualified professional to assess the specific needs 
                of the person and create a personalized care plan. This assessment is 
                completely free and without commitment.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are your rates?
              </h3>
              <p className="text-gray-600">
                Our rates vary according to the services required and the frequency of visits. 
                Contact us for a personalized quote.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is your staff insured and certified?
              </h3>
              <p className="text-gray-600">
                Yes, all our staff is fully insured, certified, and has passed a 
                complete background check. We maintain the highest 
                standards of professionalism and safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
