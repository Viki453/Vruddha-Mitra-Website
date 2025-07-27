"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { selected: undefined, name: undefined };

function ReservationProvider({ children }) {
  const [{ selected, name }, setSelected] = useState(initialState);
  const resetSelection = () => setSelected(initialState);

  return (
    <ReservationContext.Provider
      value={{ name, selected, setSelected, resetSelection }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("Context used outside provider");

  return context;
}

export { ReservationProvider, useReservation };
