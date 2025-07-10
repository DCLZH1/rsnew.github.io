import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Specs from "@/pages/Specs";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import { useState } from "react";
import Loading from "@/components/Loading";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        user,
        setIsAuthenticated, 
        setUser,
        logout 
      }}
    >
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/specs" element={<Specs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthContext.Provider>
  );
}
