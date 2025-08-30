import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import Credits from "./pages/Credits";
import Community from "./pages/Community";
import { assets } from "./assets/assets";
import "./assets/prism.css";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();

  if (pathname === "/loading" || loadingUser) return <Loading />;

  return (
    <>
      <Toaster />
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {user ? (
        <div
          className="h-screen w-screen 
                  bg-gradient-to-b from-[#f9f7f7] from-[#f9f7f7]   
                  dark:from-[#000000] dark:to-[#08061e]          /* Dark Mode Black-Blue */
                  text-black dark:text-white"
        >
          <div className="flex h-full w-full">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>
        </div> 
      ) : (
        <div
          className="h-screen w-screen 
                  bg-gradient-to-b from-[#f9f7f7] from-[#f9f7f7]    
                  dark:from-[#000000] dark:to-[#08061e]          /* Dark Mode Black-Blue */
                  flex items-center justify-center"
        >
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
