import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Sellerlogin() {
  const navigate = useNavigate();
  const [selleremail, setselleremail] = useState("");
  const [sellerpassword, setsellerpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selleremail || !sellerpassword) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://localhost:3001/api/sellerlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ selleremail, sellerpassword }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login Successful");
      navigate("/selleroverview");
    } else {
      alert(data.msg || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-2">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Seller Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input type="text" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setselleremail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setsellerpassword(e.target.value)}/>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md">
          Login
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/sellersignup" className="text-blue-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Sellerlogin;