import logo from "./logo.svg";
import "./App.css";
import SeatsShowing from "./BookSeatsForm";
import MainPage from "./components/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Domains from "./components/Domains";
import Restaurents from "./components/Restaurents";
import TimeSlots from "./components/TimeSlots";
import { useRestaurant } from "./contexts/RestaurantProvider";
import CustomerDetails from "./components/CustomerDetails";
import BookSeats from "./components/BookSeats";
import Navbar from "./components/Navbar";
import UserProfile from './components/UserProfile';
import BookingSummary from './components/BookingSummary';
import FoodOrdering from "./components/FoodOrdering";
import AdminDashboard from "./components/AdminDashboard";
import AdminAnalytics from "./components/AdminAnalytics";
import Payment from "./components/Payment";

function App() {
  const {selectedRestaurant,setSelectedRestaurant}=useRestaurant(); 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index path="/react-app-demo" element={<MainPage />} />
          <Route index path="/react-app-demo/profile" element={<UserProfile />} />
          <Route index path="/react-app-demo/bookings" element={<BookingSummary />} />
          <Route path="/react-app-demo/domains" element={<Domains/>} />
          <Route path="/react-app-demo/domains/restaurant" element={<Restaurents />} />
          <Route path="/react-app-demo/domains/timeslots" element={<TimeSlots />} />
          <Route path="/react-app-demo/domains/customerDetail" element={<CustomerDetails/>} />
          <Route path="/react-app-demo/domains/bookSeats" element={<BookSeats />} />
          <Route path="/react-app-demo/domains/food" element={<FoodOrdering/>} />
          <Route path="/react-app-demo/admin/dashboard" element={<AdminAnalytics />} />
          <Route path="/react-app-demo/domains/payment" element={<Payment />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
