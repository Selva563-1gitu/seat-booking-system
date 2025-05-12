import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/components.css';
import 'leaflet/dist/leaflet.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { RestaurantProvider } from './contexts/RestaurantProvider';
import { CustomerProvider } from './contexts/CustomerProvider';
import RestaurantBookingApp from './RestaurantBookingApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomerProvider>
<RestaurantProvider>
    <App />
    {/* <RestaurantBookingApp/> */}
  </RestaurantProvider>
  </CustomerProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
