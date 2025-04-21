import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating a new context
const ContactUsContext = createContext();

// Custom hook to use ContactUsContext directly
export const useContactUs = () => useContext(ContactUsContext);

// Provider component
export const ContactUsProvider = ({ children }) => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch("/src/JSON/FAQs.json")
            .then(res => res.json())       // Converts the data into JSON format
            .then(data => setFaqs(data))   // Setting the state
            .catch(err => console.error("Failed to load FAQs:", err));  //Catches error if any
    }, []);

    return (
        //Everything returned can be used by the children wrapped inside
        <ContactUsContext.Provider value={{ faqs }}>
            {children}
        </ContactUsContext.Provider>
    );
};
