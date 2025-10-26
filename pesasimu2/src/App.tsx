import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Pesa Simu</div>
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                <Link to="/buy" className="hover:text-blue-200 transition">Buy Phones</Link>
                <Link to="/sell" className="hover:text-blue-200 transition">Sell Your Phone</Link>
                <Link to="/about" className="hover:text-blue-200 transition">About Us</Link>
                <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>
              </div>
              <div className="md:hidden">
                {/* Mobile menu button */}
                <button className="text-white focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Pesa Simu</h3>
                <p className="text-gray-400">Your trusted partner in phone exchange and trade-ins.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link to="/buy" className="text-gray-400 hover:text-white">Buy Phones</Link></li>
                  <li><Link to="/sell" className="text-gray-400 hover:text-white">Sell Your Phone</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-400">Email: info@pesasimu.com</p>
                <p className="text-gray-400">Phone: +254 700 000000</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Pesa Simu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
