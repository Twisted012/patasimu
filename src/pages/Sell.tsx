import { useState } from 'react';

const Sell = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    condition: 'good',
    storage: '',
    price: '',
    description: '',
    name: '',
    email: '',
    phone: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Device Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="google">Google</option>
                  <option value="oneplus">OnePlus</option>
                  <option value="xiaomi">Xiaomi</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., iPhone 13 Pro"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="new">New (Sealed)</option>
                  <option value="like_new">Like New (Open Box)</option>
                  <option value="good">Good (Minor wear)</option>
                  <option value="fair">Fair (Visible wear)</option>
                  <option value="poor">Poor (Damaged)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-1">
                  Storage Capacity <span className="text-red-500">*</span>
                </label>
                <select
                  id="storage"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Storage</option>
                  <option value="32">32GB</option>
                  <option value="64">64GB</option>
                  <option value="128">128GB</option>
                  <option value="256">256GB</option>
                  <option value="512">512GB</option>
                  <option value="1tb">1TB</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional details about your device..."
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!formData.brand || !formData.model || !formData.storage}
              >
                Next
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Pricing</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Based on the information provided, we suggest a price of <span className="font-semibold">KSh 45,000 - 50,000</span> for your device.
                    You can adjust the price below if needed.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Asking Price (KSh) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">KSh</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-14 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!formData.price}
              >
                Next
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
            <p className="text-gray-600">
              Please provide your contact details so we can get in touch with you about your listing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">Country</label>
                    <select
                      id="country"
                      name="country"
                      className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-l-md"
                    >
                      <option>+254</option>
                      <option>+255</option>
                      <option>+256</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-r-md py-2 border"
                    placeholder="700 123456"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={!formData.name || !formData.email || !formData.phone}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">Listing Submitted Successfully!</h2>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Thank you for listing your device with Pesa Simu. Our team will review your submission and get back to you within 24 hours.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Sell Your Phone</h1>
        <p className="mt-2 text-gray-600">Get the best price for your used phone in just a few simple steps</p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : currentStep > step
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div className={`h-1 w-16 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div className="w-10 text-center">Device</div>
          <div className="w-16 text-center">Pricing</div>
          <div className="w-10 text-center">Contact</div>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800">Why sell with Pesa Simu?</h3>
        <ul className="mt-2 space-y-2 text-blue-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Get paid instantly via M-Pesa or bank transfer</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free device inspection and valuation</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Secure and hassle-free transaction</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sell;
