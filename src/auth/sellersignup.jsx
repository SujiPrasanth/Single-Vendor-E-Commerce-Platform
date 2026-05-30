import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Sellersignup() {
  const navigate = useNavigate();
  const [selleremail, setselleremail] = useState("");
  const [sellerpassword, setsellerpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("https://single-vendor-e-commerce-platform.onrender.com/api/sellersignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selleremail, sellerpassword }),
    });

    if (response.ok) {
      alert("Signup Successful");
      navigate("/sellerlogin");
    } else {
      alert("Signup Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">

      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-2" >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Seller Sign Up
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setselleremail(e.target.value)} />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition" onChange={(e) => setsellerpassword(e.target.value)} />
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md">
          Sign Up
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/sellerlogin" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Sellersignup;