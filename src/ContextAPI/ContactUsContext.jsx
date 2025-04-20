import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactUsContext = createContext();

// Custom hook to use ContactUsContext directly
export const useContactUs = () => useContext(ContactUsContext);

// Provider component
export const ContactUsProvider = ({ children }) => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch("/src/JSON/FAQs.json")
            .then(res => res.json())
            .then(data => setFaqs(data))
            .catch(err => console.error("Failed to load FAQs:", err));
    }, []);

    return (
        <ContactUsContext.Provider value={{ faqs }}>
            {children}
        </ContactUsContext.Provider>
    );
};
