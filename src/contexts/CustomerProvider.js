import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext();
export const useCustomerDetail = () => useContext(CustomerContext);

export function CustomerProvider({ children }) {
  const [cusName, setCusName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [foodOrdered, setFoodOrdered] = useState(false);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      const parsed = JSON.parse(storedCustomer);
      setCusName(parsed.cusName || "");
      setEmail(parsed.email || "");
      setMobile(parsed.mobile || "");
    }
  }, []);

  const login = (customerData) => {
    setCusName(customerData.cusName);
    setEmail(customerData.email);
    setMobile(customerData.mobile);
    setAge(customerData.age);
    setGender(customerData.gender);
    localStorage.setItem("customer", JSON.stringify(customerData));
  };

  const logout = () => {
    setCusName("");
    setEmail("");
    setMobile("");
    setFoodOrdered(false);
    localStorage.removeItem("customer");
  };

  return (
    <CustomerContext.Provider
      value={{
        cusName, setCusName,
        gender, setGender,
        age, setAge,
        mobile, setMobile,
        email, setEmail,
        foodOrdered, setFoodOrdered,
        login, logout,
        isLoggedIn: !!mobile && !!email
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}