import React, { createContext, useState, useContext } from "react";

const PartnerContext = createContext();

export const usePartnerContext = () => {
    return useContext(PartnerContext);
};

export const PartnerProvider = ({ children }) => {
    const [showSavedPosts, setShowSavedPosts] = useState(false);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem('currentPage')) || 0);

    return (
        <PartnerContext.Provider value={{ showSavedPosts, setShowSavedPosts, currentPage, setCurrentPage}}>
            {children}
        </PartnerContext.Provider>
    );
};
