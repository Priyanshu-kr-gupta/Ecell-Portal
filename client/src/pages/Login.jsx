import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // State for form fields and loading status
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, handleRole, handleUserId } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || !role) {
      toast.error("Please fill out all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (data.status) {
        toast.success(data.msg);
        setIsAuthenticated(true);
        handleRole(role);
        handleUserId(data.userId);
        if (role === "Admin") {
          navigate("/admin");
        } else if (role === "User") {
          navigate("/user");
        }
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("error while login! please try again");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f7f8fa] to-[#eaeef1] min-h-screen flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white hadow-lg rounded-lg max-w-md w-full p-8 z-0 ">
        <h2 className="text-2xl font-semibold text-center text-[#162243] mb-6">
          Login to Your Account
        </h2>

        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Select Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
        >
          <option>User</option>
          <option>Admin</option>
        </select>

        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#25334d]"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#1a2a6c] to-[#0f1a3d] text-white font-semibold py-2 rounded-md hover:bg-gradient-to-r hover:from-[#25334d] hover:to-[#162243] transition-colors duration-300 flex items-center justify-center"
        >
          {isLoading ? "Wait.." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an Account?
          <Link to={"/register"} className="text-[#25334d] underline">
            {" "}
            Register
          </Link>
        </p>
        {/* <p className="text-center text-sm text-gray-500 mt-6">
          <a href="#" className="text-[#25334d] hover:underline">
            Forgot your password?
          </a>
        </p> */}
      </div>
    </div>
  );
}
