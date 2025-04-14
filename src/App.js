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

function App() {
  const {selectedRestaurant,setSelectedRestaurant}=useRestaurant(); 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/react-app-demo" element={<MainPage />} />
          <Route path="/react-app-demo/domains" element={<Domains/>} />
          <Route path="/react-app-demo/domains/restaurant" element={<Restaurents />} />
          <Route path="/react-app-demo/domains/timeslots" element={<TimeSlots restaurant={selectedRestaurant}/>} />
          <Route path="/react-app-demo/domains/customerDetail" element={<CustomerDetails/>} />
          <Route path="/react-app-demo/domains/bookSeats" element={<BookSeats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
