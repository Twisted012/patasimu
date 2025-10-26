import { useState } from 'react';

// Sample phone data
const phones = [
  {
    id: 1,
    name: 'iPhone 13 Pro Max',
    price: 'KSh 145,000',
    condition: 'Refurbished',
    image: 'https://via.placeholder.com/200',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra',
    price: 'KSh 135,000',
    condition: 'New',
    image: 'https://via.placeholder.com/200',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Google Pixel 6 Pro',
    price: 'KSh 115,000',
    condition: 'Like New',
    image: 'https://via.placeholder.com/200',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'OnePlus 9 Pro',
    price: 'KSh 95,000',
    condition: 'Refurbished',
    image: 'https://via.placeholder.com/200',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Xiaomi Mi 11',
    price: 'KSh 75,000',
    condition: 'New',
    image: 'https://via.placeholder.com/200',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Samsung Galaxy A52',
    price: 'KSh 45,000',
    condition: 'Like New',
    image: 'https://via.placeholder.com/200',
    rating: 4.3,
  },
];

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  const filteredPhones = phones.filter(phone => {
    const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || phone.name.toLowerCase().includes(selectedBrand);
    const matchesCondition = selectedCondition === 'all' || phone.condition.toLowerCase() === selectedCondition;
    
    return matchesSearch && matchesBrand && matchesCondition;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Phones</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search phones..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              id="brand"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="all">All Brands</option>
              <option value="iphone">iPhone</option>
              <option value="samsung">Samsung</option>
              <option value="google">Google</option>
              <option value="oneplus">OnePlus</option>
              <option value="xiaomi">Xiaomi</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              id="condition"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="all">All Conditions</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Phone Grid */}
      {filteredPhones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhones.map((phone) => (
            <div key={phone.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img src={phone.image} alt={phone.name} className="h-40 object-contain" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{phone.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {phone.condition}
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(phone.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{phone.rating}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{phone.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No phones found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Buy;
