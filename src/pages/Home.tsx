import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Welcome to</span>
        <span className="block text-blue-600">Pesa Simu</span>
      </h1>
      
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Your trusted platform for buying and selling phones at the best prices in Kenya.
        Get instant quotes and the best deals on your device trade-ins.
      </p>
      
      <div className="mt-10 flex justify-center gap-4">
        <Link 
          to="/buy" 
          className="btn btn-primary text-lg px-8 py-3"
        >
          Browse Phones
        </Link>
        <Link 
          to="/sell" 
          className="btn btn-outline text-lg px-8 py-3"
        >
          Sell Your Phone
        </Link>
      </div>
      
      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Instant Quotes</h3>
          <p className="mt-2 text-gray-600">
            Get an instant quote for your device in seconds. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Best Prices</h3>
          <p className="mt-2 text-gray-600">
            We offer the most competitive prices in the market for your used devices.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Secure Transactions</h3>
          <p className="mt-2 text-gray-600">
            Safe and secure payment methods with instant cash transfers upon verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
