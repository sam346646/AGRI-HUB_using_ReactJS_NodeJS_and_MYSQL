import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  return (
    <AppContext.Provider value={{ selectedQuantity, setSelectedQuantity }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };