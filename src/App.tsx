import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { createContext, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import Alert from "./components/alert/Alert";
import { AlertProps } from "./components/alert/Alert";
import Register from "./pages/Register";

export type UserDetails = {
  id: number | null;
  username: string ;
};

export type AlertContextType = {
  updateAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

export type UserContextType = {
  user: UserDetails;
  updateUser: React.Dispatch<React.SetStateAction<UserDetails>>;
};

const UserContext = createContext<UserContextType>({
  user: { id: null, username: "" },
  updateUser: () => {},
});

const AlertContext = createContext<AlertContextType>({
  updateAlert : ()=>{}
})

function App() {
  const [user, setUser] = useState<UserDetails>({ id: null, username: "" });
  const [alert,setAlert] = useState<AlertProps>({text:"heyy!",position:"left-5",duration:5000,backgroundColor:"bg-green-500"})

  return (
    <>
      <UserContext.Provider value={{ user, updateUser: setUser }}>
        <AlertContext.Provider value = {{updateAlert:setAlert}} >
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/login" element = {<Login/>}></Route>
              <Route path="/register" element = {<Register/>}></Route>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<h1 className="display-6">404 Not found</h1>} />
            </Routes>
            <Alert {...alert} />
          </BrowserRouter>
        </AlertContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext,AlertContext };
