import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("https://single-vendor-e-commerce-platform.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useremail, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup Successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-2"  >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input type="text" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input type="password" placeholder="Enter Your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md">
          Sign Up
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;