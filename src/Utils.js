import { useState, createContext } from 'react';
import axios from "axios";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [state, setState] = useState({
        threads: [],
        currentThread: '',
        lastUpdate: '',
        color: '',
        startData: false
    });


    return (
        <DataContext.Provider value={{
            ...state,
            setState: (data) => setState({ ...state, ...data })
        }}
        >
            {children}
        </DataContext.Provider>
    );
};
export { DataContext, DataProvider };