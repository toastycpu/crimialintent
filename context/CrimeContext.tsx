import React, { createContext, useContext, useState } from "react";

interface Crime {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}

interface CrimeContextType {
  crimes: Crime[];
  addCrime: (crime: Crime) => void;
}

const CrimeContext = createContext<CrimeContextType | undefined>(undefined);

export const CrimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);

  const addCrime = (crime: Crime) => {
    setCrimes((prev) => [...prev, crime]);
  };

  return (
    <CrimeContext.Provider value={{ crimes, addCrime }}>
      {children}
    </CrimeContext.Provider>
  );
};

export const useCrimes = () => {
  const context = useContext(CrimeContext);
  if (!context) throw new Error("useCrimes must be used within CrimeProvider");
  return context;
};
