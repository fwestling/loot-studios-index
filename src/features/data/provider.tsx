import React from "react";

interface IDataContext {
  loots: Loot[];
}

const DataContext = React.createContext({
  loots: [],
});

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
