import "./index.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserDetails from "./UserDetails";
import NotFound from "./NotFound";
import Signup from "./Signup";

export const GlobalStateContext = React.createContext({});

// for data fetching
interface GenericDataType {
  status: string;
  data?: any;
}

export default function App() {
  const [globalState, setGlobalState] = React.useState<GenericDataType>({
    status: "idle",
  });
  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="u">
            <Route path=":id" element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateContext.Provider>
  );
}
