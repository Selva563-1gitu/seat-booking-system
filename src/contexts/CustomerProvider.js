import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();
export const useCustomerDetail = () => useContext(CustomerContext);
export function CustomerProvider({ children }) {
  const [cusName, setCusName] = useState("");
   const [gender, setGender] = useState("");
   const [age, setAge] = useState("");
   const [mobile, setMobile] = useState("");


  return (
    <CustomerContext.Provider
      value={{ cusName,setCusName,gender,setGender,age,setAge,mobile,setMobile }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
