import React, { useState } from 'react';
import { useNavigate } from 'react';

// Main App Component
const RestaurantBookingApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <MainContent />
      <Footer />
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">TableToast</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Restaurants
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                My Bookings
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Premium Services
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="ml-3 relative">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Book Your Perfect Dining Experience
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Reserve seats, pre-order your meal, and enjoy premium services at your favorite restaurants.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
              >
                Find Restaurants
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
              >
                Premium Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  const [activeTab, setActiveTab] = useState('domains');
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('domains')}
            className={`${
              activeTab === 'domains'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Select Domain
          </button>
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`${
              activeTab === 'restaurants'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Find Restaurants
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`${
              activeTab === 'booking'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Book Seats
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            className={`${
              activeTab === 'customer'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Customer Details
          </button>
        </nav>
      </div>
      
      <div className="mt-8">
        {activeTab === 'domains' && <DomainSelection />}
        {activeTab === 'restaurants' && <RestaurantList />}
        {activeTab === 'booking' && <SeatBooking />}
        {activeTab === 'customer' && <CustomerForm />}
      </div>
    </div>
  );
};

// Domain Selection Component
const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  
  const domains = [
    {
      name: "Restaurant",
      id: "restaurant",
      icon: "🍽️",
      description: "Browse and book tables at your favorite restaurants"
    },
    {
      name: "Cafés",
      id: "cafes",
      icon: "☕",
      description: "Find cozy cafés for your coffee meetings"
    },
    {
      name: "Fine Dining",
      id: "fine-dining",
      icon: "🍷",
      description: "Exclusive fine dining experiences with chef's specials"
    },
    {
      name: "Fast Food",
      id: "fast-food",
      icon: "🍔",
      description: "Quick service restaurants with reserved seating"
    },
  ];

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select your Domain</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => (
            <div 
              key={domain.id}
              className={`relative rounded-lg border p-6 cursor-pointer transition-all duration-300 ${
                selectedDomain === domain.id 
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' 
                  : 'border-gray-300 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedDomain(domain.id)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-2">{domain.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">{domain.name}</h3>
                </div>
                <p className="text-sm text-gray-500 flex-grow">{domain.description}</p>
              </div>
              {selectedDomain === domain.id && (
                <div className="absolute top-2 right-2">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-right">
          <button 
            className={`px-4 py-2 text-base font-medium rounded-md shadow-sm text-white ${
              selectedDomain 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedDomain}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Restaurant List Component
const RestaurantList = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const restaurants = [
    {
      id: 1,
      name: "The Gourmet Kitchen",
      address: "123 Main St, Foodville",
      distance: "1.2km",
      rating: 4.8,
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      name: "Pasta Paradise",
      address: "456 Oak Ave, Foodville",
      distance: "0.8km",
      rating: 4.5,
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      name: "Sushi Supreme",
      address: "789 Pine Rd, Foodville",
      distance: "2.1km",
      rating: 4.7,
      image: "/api/placeholder/400/250"
    }
  ];
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Select Nearby Restaurant</h3>
        
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 pr-0 lg:pr-4 mb-6 lg:mb-0">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedRestaurant?.id === restaurant.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-16 w-16 rounded-md object-cover" 
                        src={restaurant.image} 
                        alt={restaurant.name}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{restaurant.name}</h4>
                      <p className="text-sm text-gray-500">{restaurant.address}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-2">{restaurant.distance}</span>
                        <span className="flex items-center">
                          <svg className="text-yellow-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1">{restaurant.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-3/5 bg-gray-100 rounded-lg">
            <div className="h-96 relative">
              {/* This would be your MapPage component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-gray-500">Interactive map would appear here</p>
                  <p className="text-sm text-gray-400">Select a restaurant to see directions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white ${
              selectedRestaurant 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedRestaurant}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Seat Booking Component
const SeatBooking = () => {
  const [timeSlot, setTimeSlot] = useState("");
  const [seats, setSeats] = useState(2);
  const [date, setDate] = useState("2025-05-08");
  
  const timeSlots = [
    { id: 1, time: "11:00 AM - 12:30 PM" },
    { id: 2, time: "1:00 PM - 2:30 PM" },
    { id: 3, time: "5:00 PM - 6:30 PM" },
    { id: 4, time: "7:00 PM - 8:30 PM" },
    { id: 5, time: "9:00 PM - 10:30 PM" },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Reserve Your Table</h3>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-6">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Seats
              </label>
              <div className="flex items-center">
                <button 
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => seats > 1 && setSeats(seats - 1)}
                >
                  -
                </button>
                <input 
                  type="number" 
                  id="seats"
                  value={seats} 
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-16 text-center border-t border-b border-gray-300 py-1"
                  min="1"
                  max="10"
                />
                <button 
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => seats < 10 && setSeats(seats + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Available Time Slots</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {timeSlots.map((slot) => (
                  <div 
                    key={slot.id} 
                    className={`border rounded-md p-3 cursor-pointer transition-all ${
                      timeSlot === slot.id 
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setTimeSlot(slot.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{slot.time}</span>
                      {timeSlot === slot.id && (
                        <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Pre-order Your Food</h4>
            <p className="text-sm text-gray-500 mb-4">Choose your meals in advance to save time and ensure availability</p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <input
                    id="preorder"
                    name="preorder"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="preorder" className="ml-3 text-sm font-medium text-gray-700">
                    I'd like to pre-order
                  </label>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <input
                    id="premium"
                    name="premium"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="premium" className="ml-3 text-sm font-medium text-gray-700">
                    Add premium services
                  </label>
                </div>
                <p className="mt-1 ml-7 text-xs text-gray-500">Special seating, welcome drinks, and dedicated service</p>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <input
                    id="notes"
                    name="notes"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notes" className="ml-3 text-sm font-medium text-gray-700">
                    Add special requests
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white ${
              timeSlot 
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!timeSlot}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Customer Form Component
const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    mobile: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Enter Your Details</h3>
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-indigo-800 mb-2">Booking Summary</h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-indigo-600">Restaurant:</dt>
                  <dd className="text-sm text-gray-700">The Gourmet Kitchen</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-indigo-600">Date:</dt>
                  <dd className="text-sm text-gray-700">May 8, 2025</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-indigo-600">Time:</dt>
                  <dd className="text-sm text-gray-700">7:00 PM - 8:30 PM</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-indigo-600">Seats:</dt>
                  <dd className="text-sm text-gray-700">2</dd>
                </div>
              </dl>
            </div>
          </div>
            
          <div className="sm:col-span-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Clear
          </button>
          
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white ${
              formData.name && formData.gender && formData.age && formData.mobile
                ? 'bg-indigo-600 hover:bg-indigo-700' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!formData.name || !formData.gender || !formData.age || !formData.mobile}
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// Booking Confirmation Component
const BookingConfirmation = () => {
  const [timer, setTimer] = useState(10);
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Booking Confirmation
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Your table has been successfully reserved! A confirmation has been sent to your email.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-md p-4">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h4>
          
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">Jane Smith</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Restaurant</dt>
              <dd className="mt-1 text-sm text-gray-900">The Gourmet Kitchen</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
              <dd className="mt-1 text-sm text-gray-900">May 8, 2025 at 7:00 PM</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Seats</dt>
              <dd className="mt-1 text-sm text-gray-900">2</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Booking ID</dt>
              <dd className="mt-1 text-sm text-gray-900">BK-2025050812</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Confirmed
                </span>
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Redirecting to homepage in <span className="font-medium">{timer}</span> seconds...
          </p>
        </div>
        
        <div className="mt-5 sm:mt-6 flex justify-center">
          <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Restaurants
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Premium Services
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Blog
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 TableToast, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default RestaurantBookingApp;