/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

export const DataContext = createContext();

export const ProfileContext = ({ children, initialState, reducer }) => (
  <DataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataContext.Provider>
);

export const useDataContextValue = () => useContext(DataContext);
